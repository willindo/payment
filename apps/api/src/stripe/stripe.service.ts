import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2022-11-15', // compatible with @types/stripe
    });
  }

  async createPaymentIntent(amount: number, currency: string = 'inr') {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert to smallest currency unit
      currency: currency.toLowerCase(),
      payment_method_types: ['card'],
    });
    return paymentIntent;
  }

  async verifyWebhookSignature(payload: Buffer, sig: string) {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
    return this.stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  }
}
