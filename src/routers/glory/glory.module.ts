import { Module } from "@nestjs/common";
import { GloryController } from "./glory.controller";
import { GloryService } from "./glory.service";
import { BHAPIService } from "src/libs/BHAPI";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GloryEntity } from "./glory.entity";

@Module({
    imports: [TypeOrmModule.forFeature([GloryEntity])],
    controllers: [GloryController],
    providers: [GloryService, BHAPIService],
    exports: [TypeOrmModule, GloryService]
})
export class GloryModule {}
