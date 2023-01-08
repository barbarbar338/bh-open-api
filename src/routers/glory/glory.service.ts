import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { APIRes } from "api-types";
import CONFIG from "src/config";
import { GetDataByBHIDDTO } from "src/dto/getDataByBHID.dto";
import { GetDataBySteamIDDTO } from "src/dto/getDataBySteamID.dto";
import { GetDataBySteamURLDTO } from "src/dto/getDataBySteamURL.dto";
import { BHAPIService } from "src/libs/BHAPI";
import { SteamDataService } from "src/routers/steamdata/steamdata.service";
import { MongoRepository } from "typeorm";
import { GloryEntity } from "./glory.entity";

@Injectable()
export class GloryService {
	constructor(
		@InjectRepository(GloryEntity)
		private readonly gloryRepository: MongoRepository<GloryEntity>,
		private readonly bhAPIService: BHAPIService,
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
		const gloryData = await this.bhAPIService.getGloryByBHID(brawlhalla_id);
		const isExists = await this.isGloryExists(brawlhalla_id);
		const data = new GloryEntity({ ...gloryData, lastSynced: Date.now() });

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
