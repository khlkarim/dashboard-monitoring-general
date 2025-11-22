import { registerAs } from '@nestjs/config';

import { IsOptional, IsString } from 'class-validator';
import validateConfig from '../../utils/validate-config';
import { ClerkConfig } from './clerk-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  CLERK_PUBLISHABLE_KEY: string;

  @IsString()
  @IsOptional()
  CLERK_SECRET_KEY: string;
}

export default registerAs<ClerkConfig>('clerk', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  };
});
