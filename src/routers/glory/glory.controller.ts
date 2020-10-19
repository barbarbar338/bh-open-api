import { Controller, Get, Query } from "@nestjs/common";
import { GloryService } from "./glory.service";
import { APIRes } from "api-types";
import { GetDataByBHIDDTO } from "src/dto/getDataByBHID.dto";
import { GloryEntity } from "./glory.entity";
import { GetDataBySteamIDDTO } from "src/dto/getDataBySteamID.dto";

@Controller("glory")
export class GloryController {
    constructor(private readonly gloryService: GloryService) {}
    @Get("ping")
    public returnPing(): APIRes<null> {
        return this.gloryService.returnPing();
    }
    @Get("sync")
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
    public async getStatsBySteamID(
        @Query() getDataBySteamIDDTO: GetDataBySteamIDDTO,
    ): Promise<APIRes<GloryEntity>> {
        return this.gloryService.getGloryBySteamID(getDataBySteamIDDTO);
    }
}
