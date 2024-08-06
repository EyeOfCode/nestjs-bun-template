import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthConfig } from 'config/auth.config';

export interface UserAuth {
  sub: string;
  v: string;
}

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'jwt-user') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<AuthConfig>('auth')?.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any): Promise<any> {
    try {
      return {};
    } catch (err) {
      return null;
    }
  }
}
