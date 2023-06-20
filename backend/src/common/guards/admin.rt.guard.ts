import { AuthGuard } from '@nestjs/passport';

export class AdminRefreshTokenGuard extends AuthGuard('admin-jwt-refresh') {
  constructor() {
    super();
  }
}
