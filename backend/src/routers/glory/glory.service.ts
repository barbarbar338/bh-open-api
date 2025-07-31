import {
	BHAPIError,
	getBHIDFromName,
	getGloryByBHID,
} from "@barbarbar338/bhapi";
import {
	HttpStatus,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { APIRes } from "api-types";
import CONFIG from "src/config";
import { GetDataByBHIDDTO } from "src/dto/getDataByBHID.dto";
import { GetDataByNameDTO } from "src/dto/getDataByName.dto";
import { GetDataBySteamIDDTO } from "src/dto/getDataBySteamID.dto";
import { GetDataBySteamURLDTO } from "src/dto/getDataBySteamURL.dto";
import { SteamDataService } from "src/routers/steamdata/steamdata.service";
import { MongoRepository } from "typeorm";
import { BHIDEntity } from "../utils/bhid.entity";
import { GloryEntity } from "./glory.entity";

@Injectable()
export class GloryService {
	constructor(
		@InjectRepository(GloryEntity)
		private readonly gloryRepository: MongoRepository<GloryEntity>,
		@InjectRepository(BHIDEntity)
		private readonly bhidRepository: MongoRepository<BHIDEntity>,
		private readonly steamDataService: SteamDataService,
	) {}

	public returnPing(): APIRes<null> {
		return {
			statusCode: HttpStatus.OK,
			message: "Pong!",
			data: null,
		};
	}

	private async isGloryExists(brawlhalla_id: number): Promise<boolean> {
		const gloryData = await this.gloryRepository.findOne({
			where: {
				brawlhalla_id,
			},
		});

		return !!gloryData;
	}

	private async getGloryData(brawlhalla_id: number): Promise<GloryEntity> {
		const gloryData = await this.gloryRepository.findOne({
			where: {
				brawlhalla_id,
			},
		});

		return gloryData;
	}

	public async syncGlory({
		brawlhalla_id,
	}: GetDataByBHIDDTO): Promise<APIRes<GloryEntity>> {
		try {
			const gloryData = await getGloryByBHID(brawlhalla_id);

			const isExists = await this.isGloryExists(brawlhalla_id);
			const data = new GloryEntity({
				...gloryData,
				lastSynced: Date.now(),
			});

			if (isExists) {
				await this.gloryRepository.updateOne(
					{ brawlhalla_id },
					{ $set: data },
				);
			} else {
				const repository = this.gloryRepository.create(data);
				await this.gloryRepository.save(repository);
			}

			return {
				statusCode: HttpStatus.OK,
				message: `${data.name} synced`,
				data: data,
			};
		} catch (error) {
			console.error(error);

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to sync glory for Brawlhalla ID ${brawlhalla_id}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to sync glory for Brawlhalla ID ${brawlhalla_id}`,
				);
		}
	}

	public async getGloryByID({
		brawlhalla_id,
	}: GetDataByBHIDDTO): Promise<APIRes<GloryEntity>> {
		const gloryData = await this.getGloryData(brawlhalla_id);

		if (!gloryData) return this.syncGlory({ brawlhalla_id });
		else {
			if (Date.now() - gloryData.lastSynced > CONFIG.SYNC_PERIOD)
				return this.syncGlory({ brawlhalla_id });
			else {
				delete gloryData._id;

				return {
					statusCode: HttpStatus.OK,
					message: `${gloryData.name} from database`,
					data: gloryData,
				};
			}
		}
	}

	public async getIDByName(name: string): Promise<number> {
		const bhidData = await this.bhidRepository.findOne({
			where: {
				name,
			},
		});

		try {
			if (!bhidData) {
				const bhid = await getBHIDFromName(name);
				const data = new BHIDEntity({
					bhid,
					name,
					lastSynced: Date.now(),
				});

				const repository = this.bhidRepository.create(data);
				await this.bhidRepository.save(repository);

				return bhid;
			} else {
				if (Date.now() - bhidData.lastSynced > CONFIG.SYNC_PERIOD) {
					const bhid = await getBHIDFromName(name);
					const data = new BHIDEntity({
						bhid,
						name,
						lastSynced: Date.now(),
					});

					await this.bhidRepository.updateOne(
						{ name },
						{ $set: data },
					);

					return bhid;
				} else {
					return bhidData.bhid;
				}
			}
		} catch (error) {
			console.error(error);

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to get Brawlhalla ID for name ${name}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to get Brawlhalla ID for name ${name}`,
				);
		}
	}

	public async getGloryByName({
		name,
	}: GetDataByNameDTO): Promise<APIRes<GloryEntity>> {
		const brawlhalla_id = await this.getIDByName(name);

		return this.getGloryByID({ brawlhalla_id });
	}

	public async getGloryBySteamID({
		steam_id,
	}: GetDataBySteamIDDTO): Promise<APIRes<GloryEntity>> {
		const { data } = await this.steamDataService.getSteamDataByID({
			steam_id,
		});

		return this.getGloryByID({ brawlhalla_id: data.brawlhalla_id });
	}

	public async getGloryBySteamURL({
		steam_url,
	}: GetDataBySteamURLDTO): Promise<APIRes<GloryEntity>> {
		const { data } = await this.steamDataService.getSteamDataByURL({
			steam_url,
		});

		return this.getGloryByID({ brawlhalla_id: data.brawlhalla_id });
	}
}
