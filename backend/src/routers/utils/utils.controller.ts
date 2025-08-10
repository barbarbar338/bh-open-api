import {
	Clan,
	Ranking1v1,
	Ranking2v2,
	RankingSeasonal,
} from "@barbarbar338/bhapi";
import { CacheTTL } from "@nestjs/cache-manager";
import { Controller, Get, Query } from "@nestjs/common";
import { APIRes } from "api-types";
import { GetDataByClanIDDTO } from "src/dto/getDataByClanID.dto";
import { GetDataByRankingOptionsDTO } from "src/dto/getDataByRankingOptions.dto";
import { UtilsService } from "./utils.service";

@Controller("utils")
export class UtilsController {
	constructor(private readonly utilsService: UtilsService) {}

	@Get("ping")
	@CacheTTL(0)
	public returnPing(): APIRes<null> {
		return this.utilsService.returnPing();
	}

	@Get("rankings")
	public async getRankedDataByRankingOptions(
		@Query() getDataByRankingOptionsDTO: GetDataByRankingOptionsDTO,
	): Promise<APIRes<Ranking1v1[] | Ranking2v2[] | RankingSeasonal[]>> {
		return this.utilsService.getRankedDataByRankingOptions(
			getDataByRankingOptionsDTO,
		);
	}

	@Get("clan")
	public async getDataByClanIDDTO(
		@Query() getDataByClanIDDTO: GetDataByClanIDDTO,
	): Promise<APIRes<Clan>> {
		return this.utilsService.getDataByClanID(getDataByClanIDDTO);
	}
}
