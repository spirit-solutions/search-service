import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ConsoleLogger, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			logger: new ConsoleLogger({
				prefix: "SearchService"
			}),
			transport: Transport.RMQ,
			options: {
				urls: [process.env.RABBITMQ_CONNECTION_URL],
				queue: "search_queue",
				queueOptions: {
					durable: true
				}
			}
		}
	);

	app.enableShutdownHooks();
	app.useGlobalPipes(new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true,
		transform: true
	}));

	await app.listen();
}

bootstrap().catch(console.error);
