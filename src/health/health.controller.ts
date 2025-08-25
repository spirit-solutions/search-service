import { Controller, Get } from "@nestjs/common";
import { HealthCheck, HealthCheckService } from "@nestjs/terminus";

@Controller("health")
export class HealthController {
	constructor(private health: HealthCheckService) {}

	@Get()
	@HealthCheck()
	check() {
		// TODO: Check TypeSense connection
		return this.health.check([]);
	}
}
