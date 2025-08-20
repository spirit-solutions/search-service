import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HealthModule } from "./health/health.module";
import { MongooseModule } from "@nestjs/mongoose";
import { configSchema } from "./env";

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
		MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URL),
		HealthModule
	]
})
export class AppModule {}
