import { Module } from "@nestjs/common";
import { StatsController } from "./stats.controller";
import { StatsService } from "./stats.service";
import { BHAPIService } from "src/libs/BHAPI";
import { SteamDataService } from "src/routers/steamdata/steamdata.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StatsEntity } from "./stats.entity";
import { SteamDataEntity } from "src/routers/steamdata/steamdata.entity";

@Module({
    imports: [TypeOrmModule.forFeature([StatsEntity, SteamDataEntity])],
    controllers: [StatsController],
    providers: [StatsService, BHAPIService, SteamDataService],
    exports: [TypeOrmModule, StatsService],
})
export class StatsModule {}
