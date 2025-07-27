import { Controller, Get, Query } from "@nestjs/common";
import { APIRes } from "api-types";
import { RateLimit } from "nestjs-rate-limit";
import CONFIG from "src/config";
import { GetLegendByIDDTO } from "src/dto/getLegendByID.dto";
import { GetLegendByNameDTO } from "src/dto/getLegendByName.dto";
import { LegendsEntity } from "./legends.entity";
import { LegendsService } from "./legends.service";

@Controller("legends")
export class LegendsController {
	constructor(private readonly legendsService: LegendsService) {}

	@Get("ping")
	public returnPing(): APIRes<null> {
		return this.legendsService.returnPing();
	}

	@Get("all")
	public async getAllLegends(): Promise<APIRes<LegendsEntity[]>> {
		return this.legendsService.getAllLegends();
	}

	@Get("id")
	public async getLegendByID(
		@Query() getLegendByIDDTO: GetLegendByIDDTO,
	): Promise<APIRes<LegendsEntity>> {
		return this.legendsService.getLegendByID(getLegendByIDDTO);
	}

	@Get("name")
	public async getLegendByName(
		@Query() getLegendByNameDTO: GetLegendByNameDTO,
	): Promise<APIRes<LegendsEntity>> {
		return this.legendsService.getLegendByName(getLegendByNameDTO);
	}

	@Get("sync")
	@RateLimit(CONFIG.SYNC_RATELIMIT)
	public async syncLegend(
		@Query() getLegendByIDDTO: GetLegendByIDDTO,
	): Promise<APIRes<LegendsEntity>> {
		return this.legendsService.syncLegend(getLegendByIDDTO);
	}
}
