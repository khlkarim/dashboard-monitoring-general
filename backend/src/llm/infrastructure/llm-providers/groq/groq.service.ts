import Groq from "groq-sdk";
import {
    Injectable,
    UnauthorizedException,
    InternalServerErrorException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AllConfigType } from "src/config/config.type";
import { LlmRequest } from "src/llm/dto/llm-request.dto";
import { LlmResponse } from "src/llm/dto/llm-response.dto";
import { LlmProviderService } from "../llm-provider.service";

@Injectable()
export class GroqService implements LlmProviderService {
    private readonly groq: Groq;

    constructor(
        private readonly configService: ConfigService<AllConfigType>,
    ) {
        const groqApiKey = this.configService.get("llm.groqApiKey", {
            infer: true,
        });

        if (groqApiKey) {
            this.groq = new Groq({ apiKey: groqApiKey });
        }
    }

    async send(request: LlmRequest): Promise<LlmResponse> {
        if (!this.groq) {
            return {
                options: [],
            };
        }

        try {
            const response = await this.groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: request.content,
                    },
                ],
                model: "openai/gpt-oss-20b",
            });

            return {
                options: response.choices.map((c) => ({
                    content: c.message?.content ?? "",
                })),
            };
        } catch (error: any) {
            if (error?.status === 401) {
                throw new UnauthorizedException("Invalid GROQ API key");
            }

            throw new InternalServerErrorException(
                "Failed to communicate with Groq provider",
            );
        }
    }
}

