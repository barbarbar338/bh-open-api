import { Controller, Get, Query } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { APIRes } from "api-types";
import { GetDataByBHIDDTO } from "./dto/getDataByBHID.dto";

@Controller("stats")
export class StatsController {
    constructor(private readonly statsService: StatsService) {}
    @Get("ping")
    public returnPing(): APIRes {
        return this.statsService.returnPing();
    }
    @Get("sync")
    public async syncStats(@Query() getDataByBHIDDTO: GetDataByBHIDDTO): Promise<APIRes> {
        return this.statsService.syncStats(getDataByBHIDDTO);
    }
    @Get("bhid")
    public async getStatsByBHID(@Query() getDataByBHIDDTO: GetDataByBHIDDTO): Promise<APIRes> {
        return this.statsService.getStatsByBHID(getDataByBHIDDTO);
    }
}
