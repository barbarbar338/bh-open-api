import { Controller, Get, Query } from "@nestjs/common";
import { LegendsService } from "./legends.service";
import { APIRes } from "api-types";
import { GetLegendByIDDTO } from "./dto/getLegendByID.dto";
import { GetLegendByNameDTO } from "./dto/getLegendByName.dto";

@Controller("legends")
export class LegendsController {
    constructor(private readonly legendsService: LegendsService) {}
    @Get("ping")
    public returnPing(): APIRes {
        return this.legendsService.returnPing();
    }
    @Get("all")
    public async getAllLegends(): Promise<APIRes> {
        return this.legendsService.getAllLegends();
    }
    @Get("id")
    public async getLegendByID(
        @Query() getLegendByIDDTO: GetLegendByIDDTO,
    ): Promise<APIRes> {
        return this.legendsService.getLegendByID(getLegendByIDDTO);
    }
    @Get("name")
    public async getLegendByName(
        @Query() getLegendByNameDTO: GetLegendByNameDTO,
    ): Promise<APIRes> {
        return this.legendsService.getLegendByName(getLegendByNameDTO);
    }
    @Get("sync")
    public async syncLegend(
        @Query() getLegendByIDDTO: GetLegendByIDDTO,
    ): Promise<APIRes> {
        return this.legendsService.syncLegend(getLegendByIDDTO);
    }
}
