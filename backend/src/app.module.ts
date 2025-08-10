import { createKeyv as createKeyvRedis } from "@keyv/redis";
import { CacheInterceptor, CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
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
		CacheModule.register({
			isGlobal: true,
			stores: [createKeyvRedis(CONFIG.REDIS_URL)],
			ttl: 1000 * 60 * 10,
		}),
		RateLimiterModule.forRoot({
			points: 60,
			duration: 60 * 10,
			keyPrefix: "global",
		}),
		LegendsModule,
		StatsModule,
		RankedModule,
		GloryModule,
		SteamDataModule,
		UtilsModule,
	],
	providers: [
		{ provide: APP_GUARD, useClass: RateLimiterGuard },
		{
			provide: APP_INTERCEPTOR,
			useClass: CacheInterceptor,
		},
	],
})
export class AppModule {}
