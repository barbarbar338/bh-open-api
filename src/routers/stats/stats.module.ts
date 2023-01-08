import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BHAPIService } from "src/libs/BHAPI";
import { SteamDataEntity } from "src/routers/steamdata/steamdata.entity";
import { SteamDataService } from "src/routers/steamdata/steamdata.service";
import { StatsController } from "./stats.controller";
import { StatsEntity } from "./stats.entity";
import { StatsService } from "./stats.service";

@Module({
	imports: [TypeOrmModule.forFeature([StatsEntity, SteamDataEntity])],
	controllers: [StatsController],
	providers: [StatsService, BHAPIService, SteamDataService],
	exports: [TypeOrmModule, StatsService],
})
export class StatsModule {}
