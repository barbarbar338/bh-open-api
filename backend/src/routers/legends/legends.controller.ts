import { StaticAllLegends, StaticLegend } from "@barbarbar338/bhapi";
import { CacheTTL } from "@nestjs/cache-manager";
import { Controller, Get, Query } from "@nestjs/common";
import { APIRes } from "api-types";
import { GetLegendByIDDTO } from "src/dto/getLegendByID.dto";
import { GetLegendByNameDTO } from "src/dto/getLegendByName.dto";
import { LegendsService } from "./legends.service";

@Controller("legends")
@CacheTTL(0) // No cache expiration for legend details since they are static
export class LegendsController {
	constructor(private readonly legendsService: LegendsService) {}

	@Get("ping")
	public returnPing(): APIRes<null> {
		return this.legendsService.returnPing();
	}

	@Get("all")
	public async getAllLegends(): Promise<APIRes<StaticAllLegends[]>> {
		return this.legendsService.getAllLegends();
	}

	@Get("id")
	public async getLegendByID(
		@Query() getLegendByIDDTO: GetLegendByIDDTO,
	): Promise<APIRes<StaticLegend>> {
		return this.legendsService.getLegendByID(getLegendByIDDTO);
	}

	@Get("name")
	public async getLegendByName(
		@Query() getLegendByNameDTO: GetLegendByNameDTO,
	): Promise<APIRes<StaticLegend>> {
		return this.legendsService.getLegendByName(getLegendByNameDTO);
	}
}
