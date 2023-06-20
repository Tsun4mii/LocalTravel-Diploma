import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';

@Injectable()
export class SubscriptionService {
  private stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async createCustomer(email: string) {
    return await this.stripe.customers.create({ email: email });
  }

  async subscribe(customerId: string) {
    return await this.stripe.checkout.sessions.create({
      success_url: process.env.CLIENT_URL,
      mode: 'subscription',
      customer: customerId,
      line_items: [{ price: 'price_1N85UxIP4kUO23FbRBqXCRmE', quantity: 1 }],
    });
  }

  async getCustomerById(id: string) {
    return await this.stripe.subscriptions.list({ customer: id });
  }

  async delete(subId: string) {
    return await this.stripe.subscriptions.cancel(subId);
  }
}
