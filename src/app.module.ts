import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RateLimiterModule, RateLimiterGuard } from "nestjs-rate-limit";
import { HealthModule } from "./routers/health/health.module";
import { PingModule } from "./routers/ping/ping.module";
import { LegendsModule } from "./routers/legends/legends.module";
import { StatsModule } from "./routers/stats/stats.module";
import { RankedModule } from "./routers/ranked/ranked.module";
import { GloryModule } from "./routers/glory/glory.module";
import { SteamDataModule } from "./routers/steamdata/steamdata.module";
import { UtilsModule } from "./routers/utils/utils.module";
import CONFIG from "./config";

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
        HealthModule,
        PingModule,
        LegendsModule,
        StatsModule,
        RankedModule,
        GloryModule,
        SteamDataModule,
        UtilsModule,
    ],
    controllers: [AppController],
    providers: [{ provide: APP_GUARD, useClass: RateLimiterGuard }],
})
export class AppModule {}
