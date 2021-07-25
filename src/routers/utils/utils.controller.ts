import { Controller, Get, Query } from "@nestjs/common";
import { UtilsService } from "./utils.service";
import { APIRes, IRanking1v1, IRanking2v2 } from "api-types";
import { GetDataByRankingOptionsDTO } from "src/dto/getDataByRankingOptions.dto";
import { GetDataByClanIDDTO } from "src/dto/getDataByClanID.dto";
import { ClanEntity } from "./clan.entity";
import { RateLimit } from "nestjs-rate-limit";
import CONFIG from "src/config";

@Controller("utils")
export class UtilsController {
	constructor(private readonly utilsService: UtilsService) {}

	@Get("ping")
	public returnPing(): APIRes<null> {
		return this.utilsService.returnPing();
	}

	@Get("ranked1v1")
	public async getRanked1v1DataByRankingOptions(
		@Query() getDataByRankingOptionsDTO: GetDataByRankingOptionsDTO,
	): Promise<APIRes<IRanking1v1[]>> {
		return this.utilsService.getRanked1v1DataByRankingOptions(
			getDataByRankingOptionsDTO,
		);
	}

	@Get("ranked1v1/sync")
	@RateLimit(CONFIG.SYNC_RATELIMIT)
	public async syncRanked1v1DataByRankingOptions(
		@Query() getDataByRankingOptionsDTO: GetDataByRankingOptionsDTO,
	): Promise<APIRes<IRanking1v1[]>> {
		return this.utilsService.syncRanked1v1Data(getDataByRankingOptionsDTO);
	}

	@Get("ranked2v2")
	public async getRanked2v2DataByRankingOptions(
		@Query() getDataByRankingOptionsDTO: GetDataByRankingOptionsDTO,
	): Promise<APIRes<IRanking2v2[]>> {
		return this.utilsService.getRanked2v2DataByRankingOptions(
			getDataByRankingOptionsDTO,
		);
	}

	@Get("ranked2v2/sync")
	@RateLimit(CONFIG.SYNC_RATELIMIT)
	public async syncRanked2v2DataByRankingOptions(
		@Query() getDataByRankingOptionsDTO: GetDataByRankingOptionsDTO,
	): Promise<APIRes<IRanking2v2[]>> {
		return this.utilsService.syncRanked2v2Data(getDataByRankingOptionsDTO);
	}

	@Get("rankedseasonal")
	public async getRankedSeasonalDataByRankingOptions(
		@Query() getDataByRankingOptionsDTO: GetDataByRankingOptionsDTO,
	): Promise<APIRes<unknown>> {
		return this.utilsService.getRankedSeasonalDataByRankingOptions(
			getDataByRankingOptionsDTO,
		);
	}

	@Get("rankedseasonal/sync")
	@RateLimit(CONFIG.SYNC_RATELIMIT)
	public async syncRankedSeasonalDataByRankingOptions(
		@Query() getDataByRankingOptionsDTO: GetDataByRankingOptionsDTO,
	): Promise<APIRes<unknown>> {
		return this.utilsService.syncRankedSeasonalData(
			getDataByRankingOptionsDTO,
		);
	}

	@Get("clan")
	public async getDataByClanIDDTO(
		@Query() getDataByClanIDDTO: GetDataByClanIDDTO,
	): Promise<APIRes<ClanEntity>> {
		return this.utilsService.getDataByClanID(getDataByClanIDDTO);
	}

	@Get("clan/sync")
	@RateLimit(CONFIG.SYNC_RATELIMIT)
	public async syncDataByClanIDDTO(
		@Query() getDataByClanIDDTO: GetDataByClanIDDTO,
	): Promise<APIRes<ClanEntity>> {
		return this.utilsService.syncClanData(getDataByClanIDDTO);
	}
}
