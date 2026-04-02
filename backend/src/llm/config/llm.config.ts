import { registerAs } from '@nestjs/config';

import { LlmConfig } from './llm-config.type';
import { IsOptional, IsString } from 'class-validator';
import validateConfig from '../../utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  GROQ_API_KEY: string;
}

export default registerAs<LlmConfig>('llm', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    groqApiKey: process.env.GROQ_API_KEY,
  };
});
