import { Controller, Get, Query } from "@nestjs/common";
import { RankedService } from "./ranked.service";
import { APIRes } from "api-types";
import { GetDataByBHIDDTO } from "src/dto/getDataByBHID.dto";
import { GetDataBySteamIDDTO } from "src/dto/getDataBySteamID.dto";
import { RankedEntity } from "./ranked.entity";
import { GetDataBySteamURLDTO } from "src/dto/getDataBySteamURL.dto";

@Controller("ranked")
export class RankedController {
    constructor(private readonly rankedService: RankedService) {}
    @Get("ping")
    public returnPing(): APIRes<null> {
        return this.rankedService.returnPing();
    }
    @Get("sync")
    public async syncRanked(
        @Query() getDataByBHIDDTO: GetDataByBHIDDTO,
    ): Promise<APIRes<RankedEntity>> {
        return this.rankedService.syncRanked(getDataByBHIDDTO);
    }
    @Get("id")
    public async getRankedByID(
        @Query() getDataByBHIDDTO: GetDataByBHIDDTO,
    ): Promise<APIRes<RankedEntity>> {
        return this.rankedService.getRankedByID(getDataByBHIDDTO);
    }
    @Get("steamid")
    public async getRankedBySteamID(
        @Query() getDataBySteamIDDTO: GetDataBySteamIDDTO,
    ): Promise<APIRes<RankedEntity>> {
        return this.rankedService.getRankedBySteamID(getDataBySteamIDDTO);
    }
    @Get("steamurl")
    public async getStatsBySteamURL(
        @Query() getDataBySteamURLDTO: GetDataBySteamURLDTO,
    ): Promise<APIRes<RankedEntity>> {
        return this.rankedService.getRankedBySteamURL(getDataBySteamURLDTO);
    }
}
