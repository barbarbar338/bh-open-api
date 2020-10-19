import { Controller, Get, Query } from "@nestjs/common";
import { GloryService } from "./glory.service";
import { APIRes } from "api-types";
import { GetDataByBHIDDTO } from "./dto/getDataByBHID.dto";

@Controller("glory")
export class GloryController {
    constructor(private readonly gloryService: GloryService) {}
    @Get("ping")
    public returnPing(): APIRes {
        return this.gloryService.returnPing();
    }
    @Get("sync")
    public async syncGlory(
        @Query() getDataByBHIDDTO: GetDataByBHIDDTO,
    ): Promise<APIRes> {
        return this.gloryService.syncGlory(getDataByBHIDDTO);
    }
    @Get("bhid")
    public async getBHGloryByBHID(
        @Query() getDataByBHIDDTO: GetDataByBHIDDTO,
    ): Promise<APIRes> {
        return this.gloryService.getGloryByBHID(getDataByBHIDDTO);
    }
}
