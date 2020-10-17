import { Controller, Get, Query, Param } from "@nestjs/common";
import { LegendsService } from "./legends.service";
import { APIRes } from "api-types";
import { SyncLegendDTO } from "./dto/syncLegend.dto";
import { GetLegendByIDDTO } from "./dto/getLegendByID.dto";

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

    @Get(":legend_id")
    public async getLegendByID(
        @Param() getLegendByIDDTO: GetLegendByIDDTO,
    ): Promise<APIRes> {
        return this.legendsService.getLegendByID(getLegendByIDDTO);
    }

    @Get("sync")
    public async syncLegend(
        @Query() syncLegendDTO: SyncLegendDTO,
    ): Promise<APIRes> {
        return this.legendsService.syncLegend(syncLegendDTO);
    }
}
