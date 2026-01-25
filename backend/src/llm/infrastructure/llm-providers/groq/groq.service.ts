import Groq from "groq-sdk";
import { Injectable } from "@nestjs/common";
import { LlmRequest } from "src/llm/dto/llm-request.dto";
import { LlmResponse } from "src/llm/dto/llm-response.dto";
import { LlmProviderService } from "../llm-provider.service";

@Injectable()
export class GroqService implements LlmProviderService {
    private groq: Groq;

    constructor() {
        this.groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    }

    async send(request: LlmRequest): Promise<LlmResponse> {
        const response = await this.groq.chat.completions.create({
            messages: [
            {
                role: "user",
                content: request.prompt,
            },
            ],
            model: "openai/gpt-oss-20b",
        });

        const result = {
            options: response.choices.map(c => ({ reply: c.message.content ?? "" }))
        }

        return result;
    }
}