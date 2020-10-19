import { Module } from "@nestjs/common";
import { StatsController } from "./stats.controller";
import { StatsService } from "./stats.service";
import { BHAPIService } from "src/libs/BHAPI";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StatsEntity } from "./stats.entity";

@Module({
    imports: [TypeOrmModule.forFeature([StatsEntity])],
    controllers: [StatsController],
    providers: [StatsService, BHAPIService],
    exports: [TypeOrmModule, StatsService],
})
export class StatsModule {}
