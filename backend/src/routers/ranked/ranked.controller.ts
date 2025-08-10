import { PlayerRanked } from "@barbarbar338/bhapi";
import { CacheTTL } from "@nestjs/cache-manager";
import { Controller, Get, Query } from "@nestjs/common";
import { APIRes } from "api-types";
import { GetDataByBHIDDTO } from "src/dto/getDataByBHID.dto";
import { GetDataByNameDTO } from "src/dto/getDataByName.dto";
import { GetDataBySteamIDDTO } from "src/dto/getDataBySteamID.dto";
import { GetDataBySteamURLDTO } from "src/dto/getDataBySteamURL.dto";
import { RankedService } from "./ranked.service";

@Controller("ranked")
export class RankedController {
	constructor(private readonly rankedService: RankedService) {}

	@Get("ping")
	@CacheTTL(0)
	public returnPing(): APIRes<null> {
		return this.rankedService.returnPing();
	}

	@Get("id")
	public async getRankedByID(
		@Query() getDataByBHIDDTO: GetDataByBHIDDTO,
	): Promise<APIRes<PlayerRanked>> {
		return this.rankedService.getRankedByID(getDataByBHIDDTO);
	}

	@Get("steamid")
	public async getRankedBySteamID(
		@Query() getDataBySteamIDDTO: GetDataBySteamIDDTO,
	): Promise<APIRes<PlayerRanked>> {
		return this.rankedService.getRankedBySteamID(getDataBySteamIDDTO);
	}

	@Get("steamurl")
	public async getStatsBySteamURL(
		@Query() getDataBySteamURLDTO: GetDataBySteamURLDTO,
	): Promise<APIRes<PlayerRanked>> {
		return this.rankedService.getRankedBySteamURL(getDataBySteamURLDTO);
	}

	@Get("name")
	public async getRankedByName(
		@Query() getDataByNameDTO: GetDataByNameDTO,
	): Promise<APIRes<PlayerRanked>> {
		return this.rankedService.getRankedByName(getDataByNameDTO);
	}
}
