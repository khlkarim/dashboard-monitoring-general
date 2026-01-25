import { Module } from "@nestjs/common";
import { GroqService } from "./groq.service";
import { LlmProviderService } from "../llm-provider.service";

@Module({
    providers: [{
        provide: LlmProviderService,
        useClass: GroqService,
    }],
    exports: [LlmProviderService]
})
export class GroqModule { }