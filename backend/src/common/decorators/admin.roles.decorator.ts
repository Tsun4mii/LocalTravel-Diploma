import { SetMetadata } from '@nestjs/common';
import { ADMIN_ROLE } from '@prisma/client';

export const ROLES_KEY = 'role';
export const AdminRoles = (...roles: ADMIN_ROLE[]) =>
  SetMetadata(ROLES_KEY, roles);
