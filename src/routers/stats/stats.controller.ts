import { Controller, Get, Query } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { APIRes } from "api-types";
import { GetDataByBHIDDTO } from "src/dto/getDataByBHID.dto";
import { GetDataBySteamIDDTO } from "src/dto/getDataBySteamID.dto";
import { StatsEntity } from "./stats.entity";
import { GetDataBySteamURLDTO } from "src/dto/getDataBySteamURL.dto";
import { GetDataByNameDTO } from "src/dto/getDataByName.dto";
import { RateLimit } from "nestjs-rate-limit";
import CONFIG from "src/config";

@Controller("stats")
export class StatsController {
	constructor(private readonly statsService: StatsService) {}

	@Get("ping")
	public returnPing(): APIRes<null> {
		return this.statsService.returnPing();
	}

	@Get("sync")
	@RateLimit(CONFIG.SYNC_RATELIMIT)
	public async syncStats(
		@Query() getDataByBHIDDTO: GetDataByBHIDDTO,
	): Promise<APIRes<StatsEntity>> {
		return this.statsService.syncStats(getDataByBHIDDTO);
	}

	@Get("id")
	public async getStatsByID(
		@Query() getDataByBHIDDTO: GetDataByBHIDDTO,
	): Promise<APIRes<StatsEntity>> {
		return this.statsService.getStatsByID(getDataByBHIDDTO);
	}

	@Get("steamid")
	public async getStatsBySteamID(
		@Query() getDataBySteamIDDTO: GetDataBySteamIDDTO,
	): Promise<APIRes<StatsEntity>> {
		return this.statsService.getStatsBySteamID(getDataBySteamIDDTO);
	}

	@Get("steamurl")
	public async getStatsBySteamURL(
		@Query() getDataBySteamURLDTO: GetDataBySteamURLDTO,
	): Promise<APIRes<StatsEntity>> {
		return this.statsService.getStatsBySteamURL(getDataBySteamURLDTO);
	}

	@Get("name")
	public async getStatsByName(
		@Query() getDataByNameDTO: GetDataByNameDTO,
	): Promise<APIRes<StatsEntity>> {
		return this.statsService.getStatsByName(getDataByNameDTO);
	}
}
