import { Module } from "@nestjs/common";
import { LlmService } from "./llm.service";
import { GroqModule } from "./infrastructure/llm-providers/groq/groq.module";

@Module({
    imports: [GroqModule],
    providers: [LlmService],
    exports: [LlmService, GroqModule]
})
export class LlmModule {}