import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { StripeService } from '../stripe/stripe.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';


const prisma = new PrismaClient();

@Injectable()
export class PaymentService {
  constructor(private readonly stripe: StripeService) {}

  async createPayment(userId: string, amount: number, provider = 'stripe', currency = 'INR') {
    // DB record as PENDING
    const payment = await prisma.payment.create({
      data: {
        userId,
        amount,
        currency,
        provider: 'stripe',
        status: 'PENDING',
      },
    });

    // Provider payment intent
    const intent = await this.stripe.createPaymentIntent(amount, currency, {
      metadata: { paymentId: payment.id, userId },
    } as any); // Type workaround for metadata

    // Save provider reference
    await prisma.payment.update({
      where: { id: payment.id },
      data: { providerRef: intent.id },
    });

    return { payment, client_secret: intent.client_secret };
  }

  async markPaymentSuccess(providerRef: string) {
    return prisma.payment.updateMany({
      where: { providerRef },
      data: { status: 'SUCCESS' },
    });
  }

  async markPaymentFailed(providerRef: string) {
    return prisma.payment.updateMany({
      where: { providerRef },
      data: { status: 'FAILED' },
    });
  }
}
