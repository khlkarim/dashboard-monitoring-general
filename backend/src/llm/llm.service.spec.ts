import { configDotenv } from "dotenv";
import { LlmService } from "./llm.service";
import { GroqService } from "./infrastructure/llm-providers/groq/groq.service";
import { LlmProviderService } from "./infrastructure/llm-providers/llm-provider.service";

describe('CatService', () => {
    let llmService: LlmService;
    let llmProviderService: LlmProviderService;

    configDotenv();

    beforeEach(() => {
        llmProviderService = new GroqService();
        llmService = new LlmService(llmProviderService);
    });

    describe('send', () => {
        it('should eco the request', async () => {
            const request = {
                prompt: "Explain the importance of fast language models."
            }
            await llmService.send(request);
        });
    });
});