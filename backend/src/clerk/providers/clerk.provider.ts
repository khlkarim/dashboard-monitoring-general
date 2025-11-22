import { createClerkClient } from '@clerk/backend';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';

export const ClerkClientProvider = {
  provide: 'ClerkClient',
  useFactory: (configService: ConfigService<AllConfigType>) => {
    return createClerkClient({
      publishableKey: configService.get('clerk.publishableKey', { infer: true }),
      secretKey: configService.get('clerk.secretKey', { infer: true }),
    });
  },
  inject: [ConfigService],
};