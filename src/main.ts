import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ConsoleLogger, ValidationPipe } from "@nestjs/common";

const PORT = 14000 as const;

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: new ConsoleLogger({
			prefix: "SearchService"
		})
	});

	app.enableShutdownHooks();
	app.useGlobalPipes(new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true,
		transform: true
	}));

	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.RMQ,
		options: {
			urls: [process.env.RABBITMQ_CONNECTION_URL],
			queue: "search_queue",
			noAck: false,
			queueOptions: {
				durable: true
			}
		}
	}, { inheritAppConfig: true });

	await app.startAllMicroservices();
	await app.listen(PORT + 1);
}

bootstrap().catch(console.error);
