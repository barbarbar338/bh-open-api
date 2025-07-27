import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BHAPIService } from "src/libs/BHAPI";
import { SteamDataEntity } from "src/routers/steamdata/steamdata.entity";
import { SteamDataService } from "src/routers/steamdata/steamdata.service";
import { BHIDEntity } from "../utils/bhid.entity";
import { GloryController } from "./glory.controller";
import { GloryEntity } from "./glory.entity";
import { GloryService } from "./glory.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([GloryEntity, SteamDataEntity, BHIDEntity]),
	],
	controllers: [GloryController],
	providers: [GloryService, BHAPIService, SteamDataService],
	exports: [TypeOrmModule, GloryService],
})
export class GloryModule {}
