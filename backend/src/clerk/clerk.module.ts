import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ClerkStrategy } from './strategies/clerk.strategy';
import { ClerkClientProvider } from './providers/clerk.provider';

@Module({
  imports: [ConfigModule, PassportModule],
  providers: [ClerkClientProvider, ClerkStrategy],
  exports: [PassportModule],
})
export class ClerkModule {}
