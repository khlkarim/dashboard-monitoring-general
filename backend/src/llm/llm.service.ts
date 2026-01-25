import { Injectable } from "@nestjs/common";
import { LlmRequest } from "./dto/llm-request.dto";
import { LlmResponse } from "./dto/llm-response.dto";
import { LlmProviderService } from "./infrastructure/llm-providers/llm-provider.service";

@Injectable()
export class LlmService {
    constructor(
        private readonly llmProviderService: LlmProviderService
    ) {}

    async send(request: LlmRequest): Promise<LlmResponse> {
        console.log(this.llmProviderService);
        return await this.llmProviderService.send(request);
    }
}