import { Module } from "@nestjs/common";
import { SteamDataController } from "./steamdata.controller";
import { SteamDataService } from "./steamdata.service";
import { BHAPIService } from "src/libs/BHAPI";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SteamDataEntity } from "./steamdata.entity";

@Module({
	imports: [TypeOrmModule.forFeature([SteamDataEntity])],
	controllers: [SteamDataController],
	providers: [SteamDataService, BHAPIService],
	exports: [TypeOrmModule, SteamDataService],
})
export class SteamDataModule {}
