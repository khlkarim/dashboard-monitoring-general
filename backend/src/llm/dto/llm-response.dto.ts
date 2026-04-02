import { IsArray } from "class-validator";

export class LlmResponse {
    @IsArray()
    options: {
        content: string;
    }[]
}