import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BHAPIService } from "src/libs/BHAPI";
import { SteamDataEntity } from "src/routers/steamdata/steamdata.entity";
import { SteamDataService } from "src/routers/steamdata/steamdata.service";
import { RankedController } from "./ranked.controller";
import { RankedEntity } from "./ranked.entity";
import { RankedService } from "./ranked.service";

@Module({
	imports: [TypeOrmModule.forFeature([RankedEntity, SteamDataEntity])],
	controllers: [RankedController],
	providers: [RankedService, BHAPIService, SteamDataService],
	exports: [TypeOrmModule, RankedService],
})
export class RankedModule {}
