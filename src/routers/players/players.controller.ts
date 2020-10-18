import { Controller, Get, Query, Param } from "@nestjs/common";
import { PlayersService } from "./players.service";
import { APIRes } from "api-types";
import { SyncDataDTO } from "./dto/syncData.dto";

@Controller("players")
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}
    @Get("ping")
    public returnPing(): APIRes {
        return this.playersService.returnPing();
    }
    @Get("stats/sync")
    public async syncStats(@Query() syncDataDTO: SyncDataDTO): Promise<APIRes> {
        return this.playersService.syncStats(syncDataDTO);
    }
    @Get("stats/bhid/:brawlhalla_id")
    public async getBHStatsByBHID(@Param() syncDataDTO: SyncDataDTO): Promise<APIRes> {
        return this.playersService.getBHStatsByBHID(syncDataDTO);
    }

    @Get("ranked/sync")
    public async syncRanked(@Query() syncDataDTO: SyncDataDTO): Promise<APIRes> {
        return this.playersService.syncRanked(syncDataDTO);
    }
    @Get("ranked/bhid/:brawlhalla_id")
    public async getBHRankedByBHID(@Param() syncDataDTO: SyncDataDTO): Promise<APIRes> {
        return this.playersService.getBHRankedByBHID(syncDataDTO);
    }
}
