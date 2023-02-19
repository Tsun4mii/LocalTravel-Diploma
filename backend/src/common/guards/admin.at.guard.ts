import { AuthGuard } from '@nestjs/passport';

export class AdminAccessTokenGuard extends AuthGuard('admin-jwt') {
  constructor() {
    super();
  }
}
