import { Controller, Logger } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { SnippetService } from "./snippet.service";

@Controller()
export class SnippetController {
	private readonly logger = new Logger(SnippetController.name);

	constructor(private readonly snippetService: SnippetService) {}

	@MessagePattern("snippet.created")
	async getSnippet(@Payload() data: any, @Ctx() context: RmqContext) {
		this.logger.log("Adding new snippet", data);

		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			await this.snippetService.addSnippet(data);
			channel.ack(message);
		}
		catch (error) {
			this.logger.error("Error adding snippet", error);
		}
	}

	@MessagePattern("snippets.search")
	async searchSnippets(@Payload() query: string, @Ctx() context: RmqContext) {
		this.logger.log(`Searching snippets with query: ${query}`);

		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			return await this.snippetService.searchSnippets(query);
		}
		catch (error) {
			this.logger.error("Error searching snippets", error);
		}
		finally {
			channel.ack(message);
		}
	}
}
