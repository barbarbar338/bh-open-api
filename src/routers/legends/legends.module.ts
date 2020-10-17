import { Module } from "@nestjs/common";
import { LegendsController } from "./legends.controller";
import { LegendsService } from "./legends.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LegendsEntity } from "./legends.entity";
import { BHAPIService } from "src/libs/BHAPI";

@Module({
    imports: [TypeOrmModule.forFeature([LegendsEntity])],
    controllers: [LegendsController],
    providers: [LegendsService, BHAPIService],
    exports: [TypeOrmModule, LegendsService],
})
export class LegendsModule {}
