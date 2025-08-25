import { ConfigSchema } from "./env";
import type { Channel, Message } from "amqplib";
import "nestjs/microservices";

declare module "@nestjs/microservices/ctx-host" {
	interface RmqContext {
		getChannelRef(): Channel;
		getMessage(): Message;
	}
}

declare global {
	namespace NodeJS {
		// eslint-disable-next-line @typescript-eslint/no-empty-object-type
		interface ProcessEnv extends ConfigSchema {}
	}
}

export {};
