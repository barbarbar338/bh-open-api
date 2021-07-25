import { Injectable, HttpStatus } from "@nestjs/common";
import { APIRes } from "api-types";
import { BHAPIService } from "src/libs/BHAPI";
import { MongoRepository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RankedEntity } from "./ranked.entity";
import { GetDataByBHIDDTO } from "src/dto/getDataByBHID.dto";
import { GetDataBySteamIDDTO } from "src/dto/getDataBySteamID.dto";
import { SteamDataService } from "src/routers/steamdata/steamdata.service";
import { GetDataBySteamURLDTO } from "src/dto/getDataBySteamURL.dto";
import { GetDataByNameDTO } from "src/dto/getDataByName.dto";
import CONFIG from "src/config";

@Injectable()
export class RankedService {
	constructor(
		@InjectRepository(RankedEntity)
		private readonly rankedRepository: MongoRepository<RankedEntity>,
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

	private async isRankedExists(brawlhalla_id: number): Promise<boolean> {
		const rankedData = await this.rankedRepository.findOne({
			brawlhalla_id,
		});

		return !!rankedData;
	}

	private async getRankedData(brawlhalla_id: number): Promise<RankedEntity> {
		const rankedData = await this.rankedRepository.findOne({
			brawlhalla_id,
		});

		return rankedData;
	}

	public async syncRanked({
		brawlhalla_id,
	}: GetDataByBHIDDTO): Promise<APIRes<RankedEntity>> {
		const rankedData = await this.bhAPIService.getRankedByBHID(
			brawlhalla_id,
		);
		const isExists = await this.isRankedExists(brawlhalla_id);
		const data = new RankedEntity({
			...rankedData,
			lastSynced: Date.now(),
		});

		if (isExists) {
			await this.rankedRepository.updateOne(
				{ brawlhalla_id },
				{ $set: data },
			);
		} else {
			const repository = this.rankedRepository.create(data);
			await this.rankedRepository.save(repository);
		}

		return {
			statusCode: HttpStatus.OK,
			message: `${data.name} synced`,
			data: data,
		};
	}
	public async getRankedByID({
		brawlhalla_id,
	}: GetDataByBHIDDTO): Promise<APIRes<RankedEntity>> {
		const rankedData = await this.getRankedData(brawlhalla_id);

		if (!rankedData) return this.syncRanked({ brawlhalla_id });
		else {
			if (Date.now() - rankedData.lastSynced > CONFIG.SYNC_PERIOD)
				return this.syncRanked({ brawlhalla_id });
			else {
				delete rankedData._id;

				return {
					statusCode: HttpStatus.OK,
					message: `${rankedData.name} from database`,
					data: rankedData,
				};
			}
		}
	}

	public async getRankedBySteamID({
		steam_id,
	}: GetDataBySteamIDDTO): Promise<APIRes<RankedEntity>> {
		const { data } = await this.steamDataService.getSteamDataByID({
			steam_id,
		});

		return this.getRankedByID({ brawlhalla_id: data.brawlhalla_id });
	}

	public async getRankedBySteamURL({
		steam_url,
	}: GetDataBySteamURLDTO): Promise<APIRes<RankedEntity>> {
		const { data } = await this.steamDataService.getSteamDataByURL({
			steam_url,
		});

		return this.getRankedByID({ brawlhalla_id: data.brawlhalla_id });
	}

	public async getRankedByName({
		name,
	}: GetDataByNameDTO): Promise<APIRes<RankedEntity>> {
		const bhid = await this.bhAPIService.getBHIDFromName(name);

		return this.getRankedByID({ brawlhalla_id: bhid });
	}
}
