import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { PermissionLevel } from './permission-level.enum';
import { User } from './user.entity';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<PermissionLevel[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles) return true;

    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user as User;

    if (user instanceof UnauthorizedException)
      throw user;
      
    if (!user) return false;

    return roles.includes(user.permissionLevel);
  }
}
