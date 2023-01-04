import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ALLOW_UNAUTHORIZED } from '../../../auth/constant/allow-unauthorized.constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest<Request>();
  }

  canActivate(context: ExecutionContext) {
    const allowUnauthorized = this.reflector.getAllAndOverride<boolean>(
      ALLOW_UNAUTHORIZED,
      [context.getHandler(), context.getClass()]
    );
    if (allowUnauthorized) return true;

    return super.canActivate(context);
  }
}
