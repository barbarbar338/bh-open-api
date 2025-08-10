import { Module } from "@nestjs/common";
import { GloryController } from "./glory.controller";
import { GloryService } from "./glory.service";

@Module({
	controllers: [GloryController],
	providers: [GloryService],
	exports: [GloryService],
})
export class GloryModule {}
