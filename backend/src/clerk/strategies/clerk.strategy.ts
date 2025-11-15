import { User, verifyToken } from '@clerk/backend';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { Request } from 'express';
import { ClerkClient } from '@clerk/backend';
import { AllConfigType } from 'src/config/config.type';

@Injectable()
export class ClerkStrategy extends PassportStrategy(Strategy, 'clerk') {
  constructor(
    @Inject('ClerkClient')
    private readonly clerkClient: ClerkClient,
    private readonly configService: ConfigService<AllConfigType>,
  ) {
    super();
  }

  async validate(req: Request): Promise<User | false> {
    const token = req.headers.authorization?.split(' ').pop();

    // ❌ Do NOT throw here → allow next strategy in chain
    if (!token) {
      return false; 
    }

    try {
      const tokenPayload = await verifyToken(token, {
        secretKey: this.configService.get('clerk.secretKey', { infer: true }),
      });

      const user = await this.clerkClient.users.getUser(tokenPayload.sub);

      return user;
    } catch (error) {
      // ❌ Authentication failure → return false so chain continues
      if (
        error?.message?.includes('Token') ||
        error?.message?.includes('JWT') ||
        error?.status === 401 ||
        error?.status === 403
      ) {
        return false;
      }

      // ❗ Unexpected errors → throw (this is correct behavior)
      throw error;
    }
  }
}
