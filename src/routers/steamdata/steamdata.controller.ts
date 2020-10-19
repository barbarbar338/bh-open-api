import { Controller, Get, Query } from "@nestjs/common";
import { SteamDataService } from "./steamdata.service";
import { APIRes } from "api-types";
import { GetDataBySteamIDDTO } from "./dto/getDataBySteamID.dto";

@Controller("steamdata")
export class SteamDataController {
    constructor(private readonly steamDataService: SteamDataService) {}
    @Get("ping")
    public returnPing(): APIRes {
        return this.steamDataService.returnPing();
    }
    @Get("sync")
    public async syncStats(
        @Query() getDataBySteamIDDTO: GetDataBySteamIDDTO,
    ): Promise<APIRes> {
        return this.steamDataService.syncSteamData(getDataBySteamIDDTO);
    }
    @Get("steamid")
    public async getStatsByBHID(
        @Query() getDataBySteamIDDTO: GetDataBySteamIDDTO,
    ): Promise<APIRes> {
        return this.steamDataService.getSteamDataByID(getDataBySteamIDDTO);
    }
}
