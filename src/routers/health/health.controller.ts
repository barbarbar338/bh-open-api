import { Controller, Get } from "@nestjs/common";
import {
	HttpHealthIndicator,
	HealthCheck,
	HealthCheckResult,
	HealthCheckService,
	HealthIndicatorResult,
} from "@nestjs/terminus";
import { HealthService } from "./health.service";
import { APIRes } from "api-types";
import CONFIG from "src/config";

@Controller("health")
export class HealthController {
	constructor(
		private readonly health: HealthCheckService,
		private readonly http: HttpHealthIndicator,
		private readonly healthService: HealthService,
	) {}

	@Get("ping")
	public returnPing(): APIRes<null> {
		return this.healthService.returnPing();
	}

	@Get()
	@HealthCheck()
	public check(): Promise<HealthCheckResult> {
		return this.health.check([
			(): Promise<HealthIndicatorResult> =>
				this.http.pingCheck("google", "https://google.com"),
			(): Promise<HealthIndicatorResult> =>
				this.http.pingCheck("brawlhallaAPI", CONFIG.BH_API_BASE),
		]);
	}
}
