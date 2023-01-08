import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BHAPIService } from "src/libs/BHAPI";
import { Ranked1v1Entity } from "./1v1.entity";
import { Ranked2v2Entity } from "./2v2.entity";
import { ClanEntity } from "./clan.entity";
import { RankedSeasonalEntity } from "./seasonal.entity";
import { UtilsController } from "./utils.controller";
import { UtilsService } from "./utils.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Ranked2v2Entity,
			Ranked1v1Entity,
			ClanEntity,
			RankedSeasonalEntity,
		]),
	],
	controllers: [UtilsController],
	providers: [UtilsService, BHAPIService],
	exports: [TypeOrmModule, UtilsService],
})
export class UtilsModule {}
