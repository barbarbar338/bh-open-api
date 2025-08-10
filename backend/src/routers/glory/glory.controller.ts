import { GloryData } from "@barbarbar338/bhapi";
import { CacheTTL } from "@nestjs/cache-manager";
import { Controller, Get, Query } from "@nestjs/common";
import { APIRes } from "api-types";
import { GetDataByBHIDDTO } from "src/dto/getDataByBHID.dto";
import { GetDataByNameDTO } from "src/dto/getDataByName.dto";
import { GetDataBySteamIDDTO } from "src/dto/getDataBySteamID.dto";
import { GetDataBySteamURLDTO } from "src/dto/getDataBySteamURL.dto";
import { GloryService } from "./glory.service";

@Controller("glory")
export class GloryController {
	constructor(private readonly gloryService: GloryService) {}

	@Get("ping")
	@CacheTTL(0)
	public returnPing(): APIRes<null> {
		return this.gloryService.returnPing();
	}

	@Get("id")
	public async getGloryByID(
		@Query() getDataByBHIDDTO: GetDataByBHIDDTO,
	): Promise<APIRes<GloryData>> {
		return this.gloryService.getGloryByID(getDataByBHIDDTO);
	}

	@Get("steamid")
	public async getGloryBySteamID(
		@Query() getDataBySteamIDDTO: GetDataBySteamIDDTO,
	): Promise<APIRes<GloryData>> {
		return this.gloryService.getGloryBySteamID(getDataBySteamIDDTO);
	}

	@Get("steamurl")
	public async getGloryBySteamURL(
		@Query() getDataBySteamURLDTO: GetDataBySteamURLDTO,
	): Promise<APIRes<GloryData>> {
		return this.gloryService.getGloryBySteamURL(getDataBySteamURLDTO);
	}

	@Get("name")
	public async getGloryByName(
		@Query() getDataByNameDTO: GetDataByNameDTO,
	): Promise<APIRes<GloryData>> {
		return this.gloryService.getGloryByName(getDataByNameDTO);
	}
}
