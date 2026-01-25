import Groq from "groq-sdk";
import { Injectable } from "@nestjs/common";
import { LlmRequest } from "src/llm/dto/llm-request.dto";
import { LlmResponse } from "src/llm/dto/llm-response.dto";
import { LlmProviderService } from "../llm-provider.service";
import { ConfigService } from "@nestjs/config";
import { AllConfigType } from "src/config/config.type";

@Injectable()
export class GroqService implements LlmProviderService {
    private groq: Groq;

    constructor(
        private readonly configService: ConfigService<AllConfigType>
    ) {
        const groqApiKey = configService.get("llm.groqApiKey", { infer: true });
        this.groq = new Groq({ apiKey: groqApiKey });
    }

    async send(request: LlmRequest): Promise<LlmResponse> {
        const response = await this.groq.chat.completions.create({
            messages: [
            {
                role: "user",
                content: request.content,
            },
            ],
            model: "openai/gpt-oss-20b",
        });

        const result = {
            options: response.choices.map(c => ({ content: c.message.content ?? "" }))
        }

        return result;
    }
}