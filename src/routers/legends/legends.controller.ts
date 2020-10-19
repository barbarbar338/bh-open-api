import { Controller, Get, Query } from "@nestjs/common";
import { LegendsService } from "./legends.service";
import { APIRes } from "api-types";
import { GetLegendByIDDTO } from "src/dto/getLegendByID.dto";
import { GetLegendByNameDTO } from "src/dto/getLegendByName.dto";
import { LegendsEntity } from "./legends.entity";
import { RateLimit } from "nestjs-rate-limit";

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
    @RateLimit({ points: 1, duration: 60 * 2 })
    public async syncLegend(
        @Query() getLegendByIDDTO: GetLegendByIDDTO,
    ): Promise<APIRes<LegendsEntity>> {
        return this.legendsService.syncLegend(getLegendByIDDTO);
    }
}
