import { Injectable } from "@nestjs/common";
import { TypesenseService } from "../typesense/typesense.service";
import { snippetSchema } from "../schema/snippet";

@Injectable()
export class SnippetService {
	constructor(private readonly typesenseService: TypesenseService) {}

	public async addSnippet(data: any) {
		const client = this.typesenseService.getClient();
		await client.collections(snippetSchema.name).documents().upsert(data);
	}

	public async searchSnippets(query: string) {
		const client = this.typesenseService.getClient();

		const { found } = await client.collections(snippetSchema.name).documents().search({
			q: query,
			query_by: "code,language"
		});

		return found;
	}
}
