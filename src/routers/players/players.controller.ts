import { Controller, Get, Query } from "@nestjs/common";
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
}