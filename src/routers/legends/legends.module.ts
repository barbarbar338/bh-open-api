import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BHAPIService } from "src/libs/BHAPI";
import { LegendsController } from "./legends.controller";
import { LegendsEntity } from "./legends.entity";
import { LegendsService } from "./legends.service";

@Module({
	imports: [TypeOrmModule.forFeature([LegendsEntity])],
	controllers: [LegendsController],
	providers: [LegendsService, BHAPIService],
	exports: [TypeOrmModule, LegendsService],
})
export class LegendsModule {}
