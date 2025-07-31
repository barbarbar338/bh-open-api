import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SteamDataEntity } from "src/routers/steamdata/steamdata.entity";
import { SteamDataService } from "src/routers/steamdata/steamdata.service";
import { GloryModule } from "../glory/glory.module";
import { StatsController } from "./stats.controller";
import { StatsEntity } from "./stats.entity";
import { StatsService } from "./stats.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([StatsEntity, SteamDataEntity]),
		GloryModule,
	],
	controllers: [StatsController],
	providers: [StatsService, SteamDataService],
	exports: [TypeOrmModule, StatsService],
})
export class StatsModule {}
