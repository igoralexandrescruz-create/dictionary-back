import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { SHARED_PORT_TOKENS } from '../../../application/ports/tokens';
import { JwtPort } from '../../../application/ports/jwt.port';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { AuthenticatedUser } from 'src/modules/_shared/application/contracts/authenticated-user.contract';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(SHARED_PORT_TOKENS.JWT)
    private readonly jwtService: JwtPort,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const { isPublic } = this.getDecorators(context);

      if (isPublic) return true;

      const request = context.switchToHttp().getRequest();
      const tokenHeader = this.extractTokenFromHeader(request);
      if (tokenHeader === undefined) {
        throw new UnauthorizedException();
      }

      const { token } = tokenHeader;

      request['user'] = await this.handleToken(token);

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private getDecorators(context: ExecutionContext): {
    isPublic: boolean;
  } {
    return {
      isPublic: this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]),
    };
  }

  private async handleToken(token: string): Promise<AuthenticatedUser> {
    const payload = await this.jwtService.verify<AuthenticatedUser>(token);
    if (payload === null) throw new UnauthorizedException();

    return payload;
  }

  private extractTokenFromHeader(request: Request): TokenHeaderResponse | undefined {
    const token = request.headers.authorization?.split(' ')[1];
    return {
      token,
    };
  }

}

type TokenHeaderResponse = {
  token: string;
}