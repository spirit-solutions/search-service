import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HealthModule } from "./health/health.module";
import { configSchema } from "./env";
import { SnippetModule } from "./snippet/snippet.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [
				".env",
				".env.dev",
				".env.prod"
			],
			validate(config) {
				return configSchema.parse(config);
			}
		}),
		HealthModule,
		SnippetModule
	]
})
export class AppModule {}
