import { Injectable } from '@nestjs/common';
import { ParamsTokenFactory } from '@nestjs/core/pipes';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2025-08-27.basil', // updated to match @types/stripe requirement
    });
  }

  async createPaymentIntent(params: Stripe.PaymentIntentCreateParams) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      ...params,
      amount: Math.round(params.amount * 100), // convert to smallest currency unit
      currency: params.currency.toLowerCase(),
      payment_method_types: ['card'],
    });
    return paymentIntent;
  }

  async verifyWebhookSignature(payload: Buffer, sig: string) {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
    return this.stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  }
}
