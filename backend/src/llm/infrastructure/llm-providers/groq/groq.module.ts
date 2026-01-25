import { Module } from "@nestjs/common";
import { GroqService } from "./groq.service";
import { LlmProviderService } from "../llm-provider.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule],
    providers: [{
        provide: LlmProviderService,
        useClass: GroqService,
    }],
    exports: [LlmProviderService]
})
export class GroqModule { }