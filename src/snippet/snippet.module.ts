import { Module } from "@nestjs/common";
import { SnippetController } from "./snippet.controller";
import { SnippetService } from "./snippet.service";
import { TypesenseModule } from "../typesense/typesense.module";

@Module({
	controllers: [SnippetController],
	providers: [SnippetService],
	imports: [TypesenseModule]
})
export class SnippetModule {}
