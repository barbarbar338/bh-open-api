import { Module } from "@nestjs/common";
import { LegendsController } from "./legends.controller";
import { LegendsService } from "./legends.service";

@Module({
	controllers: [LegendsController],
	providers: [LegendsService],
	exports: [LegendsService],
})
export class LegendsModule {}
