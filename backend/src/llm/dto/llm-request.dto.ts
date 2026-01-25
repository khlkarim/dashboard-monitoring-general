import { IsString } from "class-validator";

export class LlmRequest {
    @IsString()
    prompt: string;
}