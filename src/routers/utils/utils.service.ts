import { Injectable, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { APIRes, IRanking1v1, IRanking2v2, RankedRegion } from "api-types";
import { MongoRepository } from "typeorm";
import { Ranked1v1Entity } from "./1v1.entity";
import { Ranked2v2Entity } from "./2v2.entity";
import { ClanEntity } from "./clan.entity";
import { GetDataByRankingOptionsDTO } from "src/dto/getDataByRankingOptions.dto";
import { BHAPIService } from "src/libs/BHAPI";
import { GetDataByClanIDDTO } from "src/dto/getDataByClanID.dto";
import CONFIG from "src/config";

@Injectable()
export class UtilsService {
	constructor(
		@InjectRepository(Ranked1v1Entity)
		private readonly ranked1v1Repository: MongoRepository<Ranked1v1Entity>,
		@InjectRepository(Ranked2v2Entity)
		private readonly ranked2v2Repository: MongoRepository<Ranked2v2Entity>,
		@InjectRepository(ClanEntity)
		private readonly clanRepository: MongoRepository<ClanEntity>,
		private readonly bhAPIService: BHAPIService,
	) {}

	public returnPing(): APIRes<null> {
		return {
			statusCode: HttpStatus.OK,
			message: "Pong!",
			data: null,
		};
	}

	private async isRanked1v1DataExists(
		region: RankedRegion,
		page: string | number,
	): Promise<boolean> {
		const ranked1v1Data = await this.ranked1v1Repository.findOne({
			region,
			page,
		});

		return !!ranked1v1Data;
	}

	private async getRanked1v1Data(
		region: RankedRegion,
		page: string | number,
	): Promise<Ranked1v1Entity> {
		const ranked1v1Data = await this.ranked1v1Repository.findOne({
			region,
			page,
		});

		return ranked1v1Data;
	}

	public async syncRanked1v1Data({
		region,
		page,
	}: GetDataByRankingOptionsDTO): Promise<APIRes<IRanking1v1[]>> {
		const ranked1v1Data = await this.bhAPIService.get1v1Rankings({
			region,
			page,
		});
		const isExists = await this.isRanked1v1DataExists(region, page);
		const data = new Ranked1v1Entity({
			region,
			page,
			data: ranked1v1Data,
			lastSynced: Date.now(),
		});

		if (isExists) {
			await this.ranked1v1Repository.updateOne(
				{ region, page },
				{ $set: data },
			);
		} else {
			const repository = this.ranked1v1Repository.create(data);
			await this.ranked1v1Repository.save(repository);
		}

		return {
			statusCode: HttpStatus.OK,
			message: `${data.region} ${data.page} synced`,
			data: data.data,
		};
	}

	public async getRanked1v1DataByRankingOptions({
		region,
		page,
	}: GetDataByRankingOptionsDTO): Promise<APIRes<IRanking1v1[]>> {
		const ranked1v1Data = await this.getRanked1v1Data(region, page);

		if (!ranked1v1Data) return this.syncRanked1v1Data({ region, page });
		else {
			if (Date.now() - ranked1v1Data.lastSynced > CONFIG.SYNC_PERIOD)
				return this.syncRanked1v1Data({ region, page });
			else {
				return {
					statusCode: HttpStatus.OK,
					message: `${ranked1v1Data.region} ${ranked1v1Data.page} from database`,
					data: ranked1v1Data.data,
				};
			}
		}
	}

	private async isRanked2v2DataExists(
		region: RankedRegion,
		page: string | number,
	): Promise<boolean> {
		const ranked1v1Data = await this.ranked2v2Repository.findOne({
			region,
			page,
		});

		return !!ranked1v1Data;
	}

	private async getRanked2v2Data(
		region: RankedRegion,
		page: string | number,
	): Promise<Ranked2v2Entity> {
		const ranked2v2Data = await this.ranked2v2Repository.findOne({
			region,
			page,
		});

		return ranked2v2Data;
	}

	public async syncRanked2v2Data({
		region,
		page,
	}: GetDataByRankingOptionsDTO): Promise<APIRes<IRanking2v2[]>> {
		const ranked2v2Data = await this.bhAPIService.get2v2Rankings({
			region,
			page,
		});
		const isExists = await this.isRanked2v2DataExists(region, page);
		const data = new Ranked2v2Entity({
			region,
			page,
			data: ranked2v2Data,
			lastSynced: Date.now(),
		});

		if (isExists) {
			await this.ranked2v2Repository.updateOne(
				{ region, page },
				{ $set: data },
			);
		} else {
			const repository = this.ranked2v2Repository.create(data);
			await this.ranked2v2Repository.save(repository);
		}

		return {
			statusCode: HttpStatus.OK,
			message: `${data.region} ${data.page} synced`,
			data: data.data,
		};
	}

	public async getRanked2v2DataByRankingOptions({
		region,
		page,
	}: GetDataByRankingOptionsDTO): Promise<APIRes<IRanking2v2[]>> {
		const ranked2v2Data = await this.getRanked2v2Data(region, page);

		if (!ranked2v2Data) return this.syncRanked2v2Data({ region, page });
		else {
			if (Date.now() - ranked2v2Data.lastSynced > CONFIG.SYNC_PERIOD)
				return this.syncRanked2v2Data({ region, page });
			else {
				return {
					statusCode: HttpStatus.OK,
					message: `${ranked2v2Data.region} ${ranked2v2Data.page} from database`,
					data: ranked2v2Data.data,
				};
			}
		}
	}

	private async isClanDataExists(clan_id: number): Promise<boolean> {
		const clanData = await this.clanRepository.findOne({
			clan_id,
		});

		return !!clanData;
	}

	private async getClanData(clan_id: number): Promise<ClanEntity> {
		const clanData = await this.clanRepository.findOne({
			clan_id,
		});

		return clanData;
	}

	public async syncClanData({
		clan_id,
	}: GetDataByClanIDDTO): Promise<APIRes<ClanEntity>> {
		const clanData = await this.bhAPIService.getClanByID(clan_id);
		const isExists = await this.isClanDataExists(clan_id);
		const data = new ClanEntity({ ...clanData, lastSynced: Date.now() });

		if (isExists) {
			await this.clanRepository.updateOne({ clan_id }, { $set: data });
		} else {
			const repository = this.clanRepository.create(data);
			await this.clanRepository.save(repository);
		}

		return {
			statusCode: HttpStatus.OK,
			message: `${data.clan_name} synced`,
			data: data,
		};
	}

	public async getDataByClanID({
		clan_id,
	}: GetDataByClanIDDTO): Promise<APIRes<ClanEntity>> {
		const clanData = await this.getClanData(clan_id);

		if (!clanData) return this.syncClanData({ clan_id });
		else {
			if (Date.now() - clanData.lastSynced > CONFIG.SYNC_PERIOD)
				return this.syncClanData({ clan_id });
			else {
				delete clanData._id;

				return {
					statusCode: HttpStatus.OK,
					message: `${clanData.clan_name} from database`,
					data: clanData,
				};
			}
		}
	}
}
