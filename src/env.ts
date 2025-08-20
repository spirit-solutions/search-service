import { object, string, z } from "zod";

export const configSchema = object({
	MONGODB_CONNECTION_URL: string(),
	SEARCH_SERVICE_HOST: string().default("localhost")
});

export type ConfigSchema = z.infer<typeof configSchema>;
