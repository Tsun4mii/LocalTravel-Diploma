import { Body, Controller, Get, Post } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('/create-user')
  async createUser(@Body() body) {
    return await this.subscriptionService.createCustomer(body.email);
  }

  @Post('/checkout')
  async checkout() {
    return await this.subscriptionService.subscribe('cus_NtuQ92YO2vsDC4');
  }

  @Get('/customer')
  async getCustomerById() {
    return await this.subscriptionService.getCustomerById('cus_NtuXLvFStT01fF');
  }

  @Get('/unsub')
  async unsub() {
    return await this.subscriptionService.delete(
      'sub_1N86qqIP4kUO23Fb1J2tNPco',
    );
  }
}
