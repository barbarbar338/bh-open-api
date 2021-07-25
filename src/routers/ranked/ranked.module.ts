import { Module } from "@nestjs/common";
import { RankedController } from "./ranked.controller";
import { RankedService } from "./ranked.service";
import { BHAPIService } from "src/libs/BHAPI";
import { SteamDataService } from "src/routers/steamdata/steamdata.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RankedEntity } from "./ranked.entity";
import { SteamDataEntity } from "src/routers/steamdata/steamdata.entity";

@Module({
	imports: [TypeOrmModule.forFeature([RankedEntity, SteamDataEntity])],
	controllers: [RankedController],
	providers: [RankedService, BHAPIService, SteamDataService],
	exports: [TypeOrmModule, RankedService],
})
export class RankedModule {}
