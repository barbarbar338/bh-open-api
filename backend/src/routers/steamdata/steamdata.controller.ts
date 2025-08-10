import { BHIDFromSteamID, SteamData } from "@barbarbar338/bhapi";
import { CacheTTL } from "@nestjs/cache-manager";
import { Controller, Get, Query } from "@nestjs/common";
import { APIRes } from "api-types";
import { GetDataBySteamIDDTO } from "src/dto/getDataBySteamID.dto";
import { GetDataBySteamURLDTO } from "src/dto/getDataBySteamURL.dto";
import { SteamDataService } from "./steamdata.service";

@Controller("steamdata")
@CacheTTL(0) // No cache expiration for Steam data since it is static
export class SteamDataController {
	constructor(private readonly steamDataService: SteamDataService) {}

	@Get("ping")
	public returnPing(): APIRes<null> {
		return this.steamDataService.returnPing();
	}

	@Get("id")
	public async getSteamDataByID(
		@Query() getDataBySteamIDDTO: GetDataBySteamIDDTO,
	): Promise<APIRes<SteamData & BHIDFromSteamID>> {
		return this.steamDataService.getSteamDataByID(getDataBySteamIDDTO);
	}

	@Get("url")
	public async getSteamDataByURL(
		@Query() getDataBySteamURLDTO: GetDataBySteamURLDTO,
	): Promise<APIRes<SteamData & BHIDFromSteamID>> {
		return this.steamDataService.getSteamDataByURL(getDataBySteamURLDTO);
	}
}
