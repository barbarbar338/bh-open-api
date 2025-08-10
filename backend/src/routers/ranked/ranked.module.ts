import { Module } from "@nestjs/common";
import { RankedController } from "./ranked.controller";
import { RankedService } from "./ranked.service";

@Module({
	controllers: [RankedController],
	providers: [RankedService],
	exports: [RankedService],
})
export class RankedModule {}
