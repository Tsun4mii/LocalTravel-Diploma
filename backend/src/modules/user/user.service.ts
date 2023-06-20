import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto, RegisterDTO } from '../auth/dto';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from '../auth/types';
import { UserAuthHelpers } from 'src/common/helpers';
import { UpdateDTO } from '../auth/dto/update.dto';
import { UserMapper } from './mapper/user.mapper';
import { SubscriptionService } from '../subscription/subscription.service';
import { ROLE } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwt: JwtService,
    private readonly userAuthHelpers: UserAuthHelpers,
    private readonly userMapper: UserMapper,
    private readonly subService: SubscriptionService,
  ) {}

  async createUser(user: RegisterDTO): Promise<Tokens> {
    const passwordHash = await this.userAuthHelpers.hashData(user.password);
    const stripeUserId = await this.subService.createCustomer(user.email);
    const newUser = await this.userRepository.createUser(
      user,
      passwordHash,
      stripeUserId.id,
    );

    const tokens = await this.userAuthHelpers.getTokens(
      newUser.id,
      newUser.email,
      newUser.role,
    );
    await this.userRepository.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async findById(userId: string) {
    return await this.userRepository.findById(userId);
  }

  async updateRtHash(userId: string, refreshToken: string) {
    return await this.userRepository.updateRtHash(userId, refreshToken);
  }

  async updateOnLogout(userId: string) {
    return await this.userRepository.updateOnLogout(userId);
  }

  async updateUser(userId: string, updateData: UpdateDTO) {
    const mappedData =
      this.userMapper.fromUserUpdateToUserUpdateInput(updateData);
    return await this.userRepository.update(userId, mappedData);
  }

  async subscribe(userId: string) {
    const user = await this.userRepository.findById(userId);
    return await this.subService.subscribe(user.stripeId);
  }

  async unsub(userId: string) {
    const user = await this.userRepository.findById(userId);
    const stripeUser = await this.subService.getCustomerById(user.stripeId);
    const subId = stripeUser.data[0].id;
    const updatedUser = await this.userRepository.updateRole(userId, ROLE.USER);
    return await this.subService.delete(subId);
  }

  async updateRole(userId: string, role: ROLE) {
    return await this.userRepository.updateRole(userId, role);
  }
}
