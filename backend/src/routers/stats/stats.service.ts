import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { APIRes } from "api-types";
import CONFIG from "src/config";
import { GetDataByBHIDDTO } from "src/dto/getDataByBHID.dto";
import { GetDataByNameDTO } from "src/dto/getDataByName.dto";
import { GetDataBySteamIDDTO } from "src/dto/getDataBySteamID.dto";
import { GetDataBySteamURLDTO } from "src/dto/getDataBySteamURL.dto";
import { BHAPIService } from "src/libs/BHAPI";
import { SteamDataService } from "src/routers/steamdata/steamdata.service";
import { MongoRepository } from "typeorm";
import { GloryService } from "../glory/glory.service";
import { StatsEntity } from "./stats.entity";

@Injectable()
export class StatsService {
	constructor(
		@InjectRepository(StatsEntity)
		private readonly statsRepository: MongoRepository<StatsEntity>,
		private readonly bhAPIService: BHAPIService,
		private readonly steamDataService: SteamDataService,
		private readonly gloryService: GloryService,
	) {}

	public returnPing(): APIRes<null> {
		return {
			statusCode: HttpStatus.OK,
			message: "Pong!",
			data: null,
		};
	}

	private async isStatsExists(brawlhalla_id: number): Promise<boolean> {
		const statsData = await this.statsRepository.findOne({
			where: {
				brawlhalla_id,
			},
		});

		return !!statsData;
	}

	private async getStatsData(brawlhalla_id: number): Promise<StatsEntity> {
		const statsData = await this.statsRepository.findOne({
			where: {
				brawlhalla_id,
			},
		});

		return statsData;
	}

	public async syncStats({
		brawlhalla_id,
	}: GetDataByBHIDDTO): Promise<APIRes<StatsEntity>> {
		const statsData = await this.bhAPIService.getStatsByBHID(brawlhalla_id);
		const isExists = await this.isStatsExists(brawlhalla_id);
		const data = new StatsEntity({ ...statsData, lastSynced: Date.now() });

		if (isExists) {
			await this.statsRepository.updateOne(
				{ brawlhalla_id },
				{ $set: data },
			);
		} else {
			const repository = this.statsRepository.create(data);
			await this.statsRepository.save(repository);
		}

		return {
			statusCode: HttpStatus.OK,
			message: `${data.name} synced`,
			data: data,
		};
	}

	public async getStatsByID({
		brawlhalla_id,
	}: GetDataByBHIDDTO): Promise<APIRes<StatsEntity>> {
		const statsData = await this.getStatsData(brawlhalla_id);

		if (!statsData) return this.syncStats({ brawlhalla_id });
		else {
			if (Date.now() - statsData.lastSynced > CONFIG.SYNC_PERIOD)
				return this.syncStats({ brawlhalla_id });
			else {
				delete statsData._id;

				return {
					statusCode: HttpStatus.OK,
					message: `${statsData.name} from database`,
					data: statsData,
				};
			}
		}
	}

	public async getStatsByName({
		name,
	}: GetDataByNameDTO): Promise<APIRes<StatsEntity>> {
		const brawlhalla_id = await this.gloryService.getIDByName(name);

		return this.getStatsByID({ brawlhalla_id });
	}

	public async getStatsBySteamID({
		steam_id,
	}: GetDataBySteamIDDTO): Promise<APIRes<StatsEntity>> {
		const { data } = await this.steamDataService.getSteamDataByID({
			steam_id,
		});

		return this.getStatsByID({ brawlhalla_id: data.brawlhalla_id });
	}

	public async getStatsBySteamURL({
		steam_url,
	}: GetDataBySteamURLDTO): Promise<APIRes<StatsEntity>> {
		const { data } = await this.steamDataService.getSteamDataByURL({
			steam_url,
		});

		return this.getStatsByID({ brawlhalla_id: data.brawlhalla_id });
	}
}
