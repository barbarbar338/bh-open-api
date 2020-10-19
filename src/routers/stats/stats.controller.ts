import { Controller, Get, Query } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { APIRes } from "api-types";
import { GetDataByBHIDDTO } from "src/dto/getDataByBHID.dto";
import { GetDataBySteamIDDTO } from "src/dto/getDataBySteamID.dto";
import { StatsEntity } from "./stats.entity";
import { GetDataBySteamURLDTO } from "src/dto/getDataBySteamURL.dto";
import { GetDataByNameDTO } from "src/dto/getDataByName.dto";

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
    @Get("steamurl")
    public async getStatsBySteamURL(
        @Query() getDataBySteamURLDTO: GetDataBySteamURLDTO,
    ): Promise<APIRes<StatsEntity>> {
        return this.statsService.getStatsBySteamURL(getDataBySteamURLDTO);
    }
    @Get("name")
    public async getStatsByName(
        getDataByNameDTO: GetDataByNameDTO,
    ): Promise<APIRes<StatsEntity>> {
        return this.statsService.getStatsByName(getDataByNameDTO);
    }
}
