import {
	BHAPIError,
	getClanByID,
	getRankings,
	RankedRegion,
	Ranking1v1,
	Ranking2v2,
	RankingSeasonal,
} from "@barbarbar338/bhapi";
import {
	HttpStatus,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { APIRes } from "api-types";
import CONFIG from "src/config";
import { GetDataByClanIDDTO } from "src/dto/getDataByClanID.dto";
import { GetDataByRankingOptionsDTO } from "src/dto/getDataByRankingOptions.dto";
import { MongoRepository } from "typeorm";
import { Ranked1v1Entity } from "./1v1.entity";
import { Ranked2v2Entity } from "./2v2.entity";
import { ClanEntity } from "./clan.entity";
import { RankedSeasonalEntity } from "./seasonal.entity";

@Injectable()
export class UtilsService {
	constructor(
		@InjectRepository(Ranked1v1Entity)
		private readonly ranked1v1Repository: MongoRepository<Ranked1v1Entity>,
		@InjectRepository(Ranked2v2Entity)
		private readonly ranked2v2Repository: MongoRepository<Ranked2v2Entity>,
		@InjectRepository(ClanEntity)
		private readonly clanRepository: MongoRepository<ClanEntity>,
		@InjectRepository(RankedSeasonalEntity)
		private readonly rankedSeasonalRepository: MongoRepository<RankedSeasonalEntity>,
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
			where: {
				region,
				page,
			},
		});

		return !!ranked1v1Data;
	}

	private async getRanked1v1Data(
		region: RankedRegion,
		page: string | number,
	): Promise<Ranked1v1Entity> {
		const ranked1v1Data = await this.ranked1v1Repository.findOne({
			where: {
				region,
				page,
			},
		});

		return ranked1v1Data;
	}

	public async syncRanked1v1Data({
		region,
		page,
	}: GetDataByRankingOptionsDTO): Promise<APIRes<Ranking1v1[]>> {
		try {
			const { data: ranked1v1Data } = await getRankings({
				type: "1v1",
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
		} catch (error) {
			console.error(error);

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to sync ranked for Brawlhalla ID ${region} ${page}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to sync ranked for Brawlhalla ID ${region} ${page}`,
				);
		}
	}

	public async getRanked1v1DataByRankingOptions({
		region,
		page,
	}: GetDataByRankingOptionsDTO): Promise<APIRes<Ranking1v1[]>> {
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
		const ranked2v2Data = await this.ranked2v2Repository.findOne({
			where: {
				region,
				page,
			},
		});

		return !!ranked2v2Data;
	}

	private async getRanked2v2Data(
		region: RankedRegion,
		page: string | number,
	): Promise<Ranked2v2Entity> {
		const ranked2v2Data = await this.ranked2v2Repository.findOne({
			where: {
				region,
				page,
			},
		});

		return ranked2v2Data;
	}

	public async syncRanked2v2Data({
		region,
		page,
	}: GetDataByRankingOptionsDTO): Promise<APIRes<Ranking2v2[]>> {
		try {
			const { data: ranked2v2Data } = await getRankings({
				type: "2v2",
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
		} catch (error) {
			console.error(error);

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to sync ranked for Brawlhalla ID ${region} ${page}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to sync ranked for Brawlhalla ID ${region} ${page}`,
				);
		}
	}

	public async getRanked2v2DataByRankingOptions({
		region,
		page,
	}: GetDataByRankingOptionsDTO): Promise<APIRes<Ranking2v2[]>> {
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

	private async isRankedSeasonalDataExists(
		region: RankedRegion,
		page: string | number,
	): Promise<boolean> {
		const rankedSeasonalData = await this.rankedSeasonalRepository.findOne({
			where: {
				region,
				page,
			},
		});

		return !!rankedSeasonalData;
	}

	private async getRankedSeasonalData(
		region: RankedRegion,
		page: string | number,
	): Promise<RankedSeasonalEntity> {
		const rankedSeasonalData = await this.rankedSeasonalRepository.findOne({
			where: {
				region,
				page,
			},
		});

		return rankedSeasonalData;
	}

	public async syncRankedSeasonalData({
		region,
		page,
	}: GetDataByRankingOptionsDTO): Promise<APIRes<RankingSeasonal[]>> {
		try {
			const { data: rankedSeasonalData } = await getRankings({
				type: "seasonal",
				region,
				page,
			});
			const isExists = await this.isRankedSeasonalDataExists(
				region,
				page,
			);
			const data = new RankedSeasonalEntity({
				region,
				page,
				data: rankedSeasonalData,
				lastSynced: Date.now(),
			});

			if (isExists) {
				await this.rankedSeasonalRepository.updateOne(
					{ region, page },
					{ $set: data },
				);
			} else {
				const repository = this.rankedSeasonalRepository.create(data);
				await this.rankedSeasonalRepository.save(repository);
			}

			return {
				statusCode: HttpStatus.OK,
				message: `${data.region} ${data.page} synced`,
				data: data.data,
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
						`Failed to sync ranked for Brawlhalla ID ${region} ${page}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to sync ranked for Brawlhalla ID ${region} ${page}`,
				);
		}
	}

	public async getRankedSeasonalDataByRankingOptions({
		region,
		page,
	}: GetDataByRankingOptionsDTO): Promise<APIRes<RankingSeasonal[]>> {
		const rankedSeasonalData = await this.getRankedSeasonalData(
			region,
			page,
		);

		if (!rankedSeasonalData)
			return this.syncRankedSeasonalData({ region, page });
		else {
			if (Date.now() - rankedSeasonalData.lastSynced > CONFIG.SYNC_PERIOD)
				return this.syncRankedSeasonalData({ region, page });
			else {
				return {
					statusCode: HttpStatus.OK,
					message: `${rankedSeasonalData.region} ${rankedSeasonalData.page} from database`,
					data: rankedSeasonalData.data,
				};
			}
		}
	}

	private async isClanDataExists(clan_id: number): Promise<boolean> {
		const clanData = await this.clanRepository.findOne({
			where: {
				clan_id,
			},
		});

		return !!clanData;
	}

	private async getClanData(clan_id: number): Promise<ClanEntity> {
		const clanData = await this.clanRepository.findOne({
			where: {
				clan_id,
			},
		});

		return clanData;
	}

	public async syncClanData({
		clan_id,
	}: GetDataByClanIDDTO): Promise<APIRes<ClanEntity>> {
		try {
			const { data: clanData } = await getClanByID(clan_id);
			const isExists = await this.isClanDataExists(clan_id);
			const data = new ClanEntity({
				...clanData,
				lastSynced: Date.now(),
			});

			if (isExists) {
				await this.clanRepository.updateOne(
					{ clan_id },
					{ $set: data },
				);
			} else {
				const repository = this.clanRepository.create(data);
				await this.clanRepository.save(repository);
			}

			return {
				statusCode: HttpStatus.OK,
				message: `${data.clan_name} synced`,
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
						`Failed to sync clan for Brawlhalla ID ${clan_id}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to sync clan for Brawlhalla ID ${clan_id}`,
				);
		}
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
