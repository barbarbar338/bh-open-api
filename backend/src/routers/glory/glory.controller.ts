import { Controller, Get, Query } from "@nestjs/common";
import { APIRes } from "api-types";
import { RateLimit } from "nestjs-rate-limit";
import CONFIG from "src/config";
import { GetDataByBHIDDTO } from "src/dto/getDataByBHID.dto";
import { GetDataByNameDTO } from "src/dto/getDataByName.dto";
import { GetDataBySteamIDDTO } from "src/dto/getDataBySteamID.dto";
import { GetDataBySteamURLDTO } from "src/dto/getDataBySteamURL.dto";
import { GloryEntity } from "./glory.entity";
import { GloryService } from "./glory.service";
@Controller("glory")
export class GloryController {
	constructor(private readonly gloryService: GloryService) {}

	@Get("ping")
	public returnPing(): APIRes<null> {
		return this.gloryService.returnPing();
	}

	@Get("sync")
	@RateLimit(CONFIG.SYNC_RATELIMIT)
	public async syncGlory(
		@Query() getDataByBHIDDTO: GetDataByBHIDDTO,
	): Promise<APIRes<GloryEntity>> {
		return this.gloryService.syncGlory(getDataByBHIDDTO);
	}

	@Get("id")
	public async getGloryByID(
		@Query() getDataByBHIDDTO: GetDataByBHIDDTO,
	): Promise<APIRes<GloryEntity>> {
		return this.gloryService.getGloryByID(getDataByBHIDDTO);
	}

	@Get("steamid")
	public async getGloryBySteamID(
		@Query() getDataBySteamIDDTO: GetDataBySteamIDDTO,
	): Promise<APIRes<GloryEntity>> {
		return this.gloryService.getGloryBySteamID(getDataBySteamIDDTO);
	}

	@Get("steamurl")
	public async getGloryBySteamURL(
		@Query() getDataBySteamURLDTO: GetDataBySteamURLDTO,
	): Promise<APIRes<GloryEntity>> {
		return this.gloryService.getGloryBySteamURL(getDataBySteamURLDTO);
	}

	@Get("name")
	public async getGloryByName(
		@Query() getDataByNameDTO: GetDataByNameDTO,
	): Promise<APIRes<GloryEntity>> {
		return this.gloryService.getGloryByName(getDataByNameDTO);
	}
}
