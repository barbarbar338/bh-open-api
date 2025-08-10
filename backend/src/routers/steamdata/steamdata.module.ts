import { Module } from "@nestjs/common";
import { SteamDataController } from "./steamdata.controller";
import { SteamDataService } from "./steamdata.service";

@Module({
	controllers: [SteamDataController],
	providers: [SteamDataService],
	exports: [SteamDataService],
})
export class SteamDataModule {}
