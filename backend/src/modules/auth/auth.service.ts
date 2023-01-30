import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserCreate } from './dto/user.create.dto';
import { hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registerUser(user: UserCreate) {
    const hashPass = await hash(user.password, 10);
    return await this.userService.createUser(user.email, hashPass);
  }

  async signinUser() {}

  async logoutUser() {}

  async refreshUser() {}
}
