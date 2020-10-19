import { Controller, Get, Query } from "@nestjs/common";
import { RankedService } from "./ranked.service";
import { APIRes } from "api-types";
import { GetDataByBHIDDTO } from "src/dto/getDataByBHID.dto";

@Controller("ranked")
export class RankedController {
    constructor(private readonly rankedService: RankedService) {}
    @Get("ping")
    public returnPing(): APIRes {
        return this.rankedService.returnPing();
    }
    @Get("sync")
    public async syncRanked(
        @Query() getDataByBHIDDTO: GetDataByBHIDDTO,
    ): Promise<APIRes> {
        return this.rankedService.syncRanked(getDataByBHIDDTO);
    }
    @Get("id")
    public async getRankedByID(
        @Query() getDataByBHIDDTO: GetDataByBHIDDTO,
    ): Promise<APIRes> {
        return this.rankedService.getRankedByBHID(getDataByBHIDDTO);
    }
}
