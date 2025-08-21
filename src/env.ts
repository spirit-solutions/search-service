import { object, string, z } from "zod";

export const configSchema = object({
	RABBITMQ_CONNECTION_URL: string().startsWith("amqp://")
});

export type ConfigSchema = z.infer<typeof configSchema>;
