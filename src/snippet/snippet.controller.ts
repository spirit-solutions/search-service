import { Controller, Logger } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

@Controller("snippet")
export class SnippetController {
	private readonly logger = new Logger(SnippetController.name);

	@MessagePattern("snippet.created")
	getSnippet() {
		this.logger.log("Snippet added");
	}
}
