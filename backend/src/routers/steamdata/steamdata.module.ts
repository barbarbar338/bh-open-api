import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SteamDataController } from "./steamdata.controller";
import { SteamDataEntity } from "./steamdata.entity";
import { SteamDataService } from "./steamdata.service";

@Module({
	imports: [TypeOrmModule.forFeature([SteamDataEntity])],
	controllers: [SteamDataController],
	providers: [SteamDataService],
	exports: [TypeOrmModule, SteamDataService],
})
export class SteamDataModule {}
