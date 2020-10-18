import { Module } from "@nestjs/common";
import { PlayersController } from "./players.controller";
import { PlayersService } from "./players.service";
import { BHAPIService } from "src/libs/BHAPI";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StatsEntity } from "./stats.entity";
import { RankedEntity } from "./ranked.entity";
import { GloryEntity } from "./glory.entity";

@Module({
    imports: [TypeOrmModule.forFeature([StatsEntity, RankedEntity, GloryEntity])],
    controllers: [PlayersController],
    providers: [PlayersService, BHAPIService],
    exports: [TypeOrmModule, PlayersService]
})
export class PlayersModule {}
