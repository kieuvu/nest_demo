import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtConfig } from 'src/common/configs/JwtConfig';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConfig().secret,
    });
  }

  public async validate(payload: any): Promise<any> {
    return {
      id: payload.sub,
      email: payload.email,
      username: payload.username,
      isActive: payload.isActive,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
    };
  }
}
