import { Controller, Get, Query } from "@nestjs/common";
import { SteamDataService } from "./steamdata.service";
import { APIRes } from "api-types";
import { GetDataBySteamIDDTO } from "src/dto/getDataBySteamID.dto";
import { GetDataBySteamURLDTO } from "src/dto/getDataBySteamURL.dto";
import { SteamDataEntity } from "./steamdata.entity";
import { RateLimit } from "nestjs-rate-limit";
import CONFIG from "src/config";

@Controller("steamdata")
export class SteamDataController {
	constructor(private readonly steamDataService: SteamDataService) {}

	@Get("ping")
	public returnPing(): APIRes<null> {
		return this.steamDataService.returnPing();
	}

	@Get("sync")
	@RateLimit(CONFIG.SYNC_RATELIMIT)
	public async syncSteamData(
		@Query() getDataBySteamIDDTO: GetDataBySteamIDDTO,
	): Promise<APIRes<SteamDataEntity>> {
		return this.steamDataService.syncSteamData(getDataBySteamIDDTO);
	}

	@Get("id")
	public async getSteamDataByID(
		@Query() getDataBySteamIDDTO: GetDataBySteamIDDTO,
	): Promise<APIRes<SteamDataEntity>> {
		return this.steamDataService.getSteamDataByID(getDataBySteamIDDTO);
	}

	@Get("url")
	public async getSteamDataByURL(
		@Query() getDataBySteamURLDTO: GetDataBySteamURLDTO,
	): Promise<APIRes<SteamDataEntity>> {
		return this.steamDataService.getSteamDataByURL(getDataBySteamURLDTO);
	}
}
