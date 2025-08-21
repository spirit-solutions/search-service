import { object, string, z } from "zod";

export const configSchema = object({
	RABBITMQ_CONNECTION_URL: string().startsWith("amqp://"),
	TYPESENSE_HOST: string(),
	TYPESENSE_API_KEY: string()
});

export type ConfigSchema = z.infer<typeof configSchema>;
