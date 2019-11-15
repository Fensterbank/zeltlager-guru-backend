import { SetMetadata } from '@nestjs/common';
import { PermissionLevel } from './permission-level.enum';

export const Roles = (...roles: PermissionLevel[]) =>
  SetMetadata('roles', roles);
