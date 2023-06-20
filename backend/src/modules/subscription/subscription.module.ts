import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { UserModule } from '../user/user.module';

@Module({
  providers: [SubscriptionService],
  controllers: [SubscriptionController],
  imports: [UserModule],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
