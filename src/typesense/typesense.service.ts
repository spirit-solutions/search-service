import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import pRetry from "p-retry";
import { Client } from "typesense";
import { snippetSchema } from "../schema/snippet";
import type { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";

@Injectable()
export class TypesenseService implements OnModuleInit {
	private client: Client;
	private isHealthy: boolean = false;
	private readonly logger = new Logger(TypesenseService.name);

	constructor() {}

	async onModuleInit() {
		await this.initializeWithRetry();
		await this.ensureCollection(snippetSchema);
	}

	async ensureCollection(schema: CollectionCreateSchema) {
		// TODO: Error Handling
		// TODO: Schema Migrations

		if (await this.client.collections(schema.name).exists()) {
			return;
		}

		await this.client.collections().create(schema);
		this.logger.log(`Collection ${schema.name} created successfully`);
	}

	async initializeWithRetry() {
		return await pRetry(async (attempt) => {
			this.logger.log(`Attempt ${attempt} to initialize Typesense client`);

			this.client = new Client({
				nodes: [
					{
						host: process.env.TYPESENSE_HOST,
						port: 8108,
						protocol: "http"
					}
				],
				apiKey: process.env.TYPESENSE_API_KEY,
				connectionTimeoutSeconds: 2
			});

			const health = await this.client.health.retrieve();

			if (!health.ok) {
				throw new Error("Typesense health check failed");
			}

			this.isHealthy = health.ok;

			this.logger.log("Typesense client initialized successfully");
		},
		{
			onFailedAttempt: (error) => {
				this.logger.error(`Failed to initialize Typesense client: ${error}`);
			}
		});
	}

	getClient(): Client {
		return this.client;
	}
}
