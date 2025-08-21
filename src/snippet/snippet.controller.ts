import { Controller, Logger } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { SnippetService } from "./snippet.service";

@Controller()
export class SnippetController {
	private readonly logger = new Logger(SnippetController.name);

	constructor(private readonly snippetService: SnippetService) {}

	@MessagePattern("snippet.created")
	async getSnippet(data: any) {
		this.logger.log("Snippet added", data);
		return await this.snippetService.addSnippet(data);
	}

	@MessagePattern("snippets.search")
	async searchSnippets(query: string) {
		this.logger.log(`Searching snippets with query: ${query}`);
		return await this.snippetService.searchSnippets(query);
	}
}
