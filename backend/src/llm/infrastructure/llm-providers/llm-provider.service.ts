import { LlmRequest } from "src/llm/dto/llm-request.dto";
import { LlmResponse } from "src/llm/dto/llm-response.dto";

export abstract class LlmProviderService {
    abstract send(request: LlmRequest): Promise<LlmResponse>;   
}