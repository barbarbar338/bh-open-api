import { Controller, Get, Query } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { APIRes } from "api-types";
import { GetDataByBHIDDTO } from "src/dto/getDataByBHID.dto";
import { GetDataBySteamIDDTO } from "src/dto/getDataBySteamID.dto";
import { StatsEntity } from "./stats.entity";

@Controller("stats")
export class StatsController {
    constructor(private readonly statsService: StatsService) {}
    @Get("ping")
    public returnPing(): APIRes<null> {
        return this.statsService.returnPing();
    }
    @Get("sync")
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
}
