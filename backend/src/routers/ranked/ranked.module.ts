import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SteamDataEntity } from "src/routers/steamdata/steamdata.entity";
import { SteamDataService } from "src/routers/steamdata/steamdata.service";
import { GloryModule } from "../glory/glory.module";
import { RankedController } from "./ranked.controller";
import { RankedEntity } from "./ranked.entity";
import { RankedService } from "./ranked.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([RankedEntity, SteamDataEntity]),
		GloryModule,
	],
	controllers: [RankedController],
	providers: [RankedService, SteamDataService],
	exports: [TypeOrmModule, RankedService],
})
export class RankedModule {}
