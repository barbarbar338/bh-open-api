import { Module } from "@nestjs/common";
import { RankedController } from "./ranked.controller";
import { RankedService } from "./ranked.service";
import { BHAPIService } from "src/libs/BHAPI";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RankedEntity } from "./ranked.entity";

@Module({
    imports: [TypeOrmModule.forFeature([RankedEntity])],
    controllers: [RankedController],
    providers: [RankedService, BHAPIService],
    exports: [TypeOrmModule, RankedService]
})
export class RankedModule {}
