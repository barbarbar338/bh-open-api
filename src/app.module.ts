import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RateLimiterGuard, RateLimiterModule } from "nestjs-rate-limit";
import CONFIG from "./config";
import { GloryModule } from "./routers/glory/glory.module";
import { LegendsModule } from "./routers/legends/legends.module";
import { RankedModule } from "./routers/ranked/ranked.module";
import { StatsModule } from "./routers/stats/stats.module";
import { SteamDataModule } from "./routers/steamdata/steamdata.module";
import { UtilsModule } from "./routers/utils/utils.module";

@Module({
	imports: [
		RateLimiterModule.forRoot({
			points: 60,
			duration: 60 * 10,
			keyPrefix: "global",
		}),
		TypeOrmModule.forRoot({
			type: "mongodb",
			url: CONFIG.MONGODB_URI,
			database: "bhapi",
			synchronize: true,
			logger: "debug",
			useUnifiedTopology: true,
			useNewUrlParser: true,
			autoLoadEntities: true,
		}),
		LegendsModule,
		StatsModule,
		RankedModule,
		GloryModule,
		SteamDataModule,
		UtilsModule,
	],
	providers: [{ provide: APP_GUARD, useClass: RateLimiterGuard }],
})
export class AppModule {}
