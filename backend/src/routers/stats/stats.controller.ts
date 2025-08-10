import { PlayerStats } from "@barbarbar338/bhapi";
import { CacheTTL } from "@nestjs/cache-manager";
import { Controller, Get, Query } from "@nestjs/common";
import { APIRes } from "api-types";
import { GetDataByBHIDDTO } from "src/dto/getDataByBHID.dto";
import { GetDataByNameDTO } from "src/dto/getDataByName.dto";
import { GetDataBySteamIDDTO } from "src/dto/getDataBySteamID.dto";
import { GetDataBySteamURLDTO } from "src/dto/getDataBySteamURL.dto";
import { StatsService } from "./stats.service";

@Controller("stats")
export class StatsController {
	constructor(private readonly statsService: StatsService) {}

	@Get("ping")
	@CacheTTL(0)
	public returnPing(): APIRes<null> {
		return this.statsService.returnPing();
	}

	@Get("id")
	public async getStatsByID(
		@Query() getDataByBHIDDTO: GetDataByBHIDDTO,
	): Promise<APIRes<PlayerStats>> {
		return this.statsService.getStatsByID(getDataByBHIDDTO);
	}

	@Get("steamid")
	public async getStatsBySteamID(
		@Query() getDataBySteamIDDTO: GetDataBySteamIDDTO,
	): Promise<APIRes<PlayerStats>> {
		return this.statsService.getStatsBySteamID(getDataBySteamIDDTO);
	}

	@Get("steamurl")
	public async getStatsBySteamURL(
		@Query() getDataBySteamURLDTO: GetDataBySteamURLDTO,
	): Promise<APIRes<PlayerStats>> {
		return this.statsService.getStatsBySteamURL(getDataBySteamURLDTO);
	}

	@Get("name")
	public async getStatsByName(
		@Query() getDataByNameDTO: GetDataByNameDTO,
	): Promise<APIRes<PlayerStats>> {
		return this.statsService.getStatsByName(getDataByNameDTO);
	}
}
