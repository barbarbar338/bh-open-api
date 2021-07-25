import { Module } from "@nestjs/common";
import { GloryController } from "./glory.controller";
import { GloryService } from "./glory.service";
import { BHAPIService } from "src/libs/BHAPI";
import { SteamDataService } from "src/routers/steamdata/steamdata.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GloryEntity } from "./glory.entity";
import { SteamDataEntity } from "src/routers/steamdata/steamdata.entity";

@Module({
	imports: [TypeOrmModule.forFeature([GloryEntity, SteamDataEntity])],
	controllers: [GloryController],
	providers: [GloryService, BHAPIService, SteamDataService],
	exports: [TypeOrmModule, GloryService],
})
export class GloryModule {}
