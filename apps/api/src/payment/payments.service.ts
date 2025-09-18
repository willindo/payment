// src/payment/payments.service.ts
import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from "@nestjs/common";
import { PaymentStatus } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { ConfirmPaymentDto } from "./dto/confirm-payment.dto";
import { StripeService } from "../stripe/stripe.service";

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private stripeService: StripeService
  ) {}

  // Creates a Stripe PaymentIntent, persists a payment record and returns clientSecret
  async initiatePayment(dto: CreatePaymentDto) {
    try {
      const currency = process.env.DEFAULT_CURRENCY || "INR";

      const paymentIntent = await this.stripeService.createPaymentIntent({
        amount: dto.amount,
        currency,
        metadata: { userId: dto.userId, provider: dto.provider },
      });

      const payment = await this.prisma.payment.create({
        data: {
          userId: dto.userId,
          amount: dto.amount,
          provider: dto.provider,
          providerRef: (paymentIntent as any).id,
          status: PaymentStatus.PENDING,
        },
      });

      return { payment, clientSecret: (paymentIntent as any).client_secret };
    } catch (err) {
      console.error("initiatePayment error", err);
      throw new InternalServerErrorException("Failed to initiate payment");
    }
  }

  async confirmPayment(dto: ConfirmPaymentDto) {
    try {
      const updated = await this.prisma.payment.update({
        where: { id: dto.paymentId },
        data: {
          providerRef: dto.providerRef,
          status: dto.status,
        },
      });
      return updated;
    } catch (err) {
      console.error("confirmPayment error", err);
      throw new BadRequestException("Failed to confirm payment");
    }
  }

  // These two are called by the webhook controller
  async markPaymentSuccess(paymentIntentId: string) {
    try {
      return this.prisma.payment.updateMany({
        where: { providerRef: paymentIntentId },
        data: { status: PaymentStatus.SUCCESS },
      });
    } catch (err) {
      console.error("markPaymentSuccess error", err);
      throw new InternalServerErrorException("Failed to mark payments success");
    }
  }

  async markPaymentFailed(paymentIntentId: string) {
    try {
      return this.prisma.payment.updateMany({
        where: { providerRef: paymentIntentId },
        data: { status: PaymentStatus.FAILED },
      });
    } catch (err) {
      console.error("markPaymentFailed error", err);
      throw new InternalServerErrorException("Failed to mark payments failed");
    }
  }

  // Read one
  async getPayment(id: string) {
    return this.prisma.payment.findUnique({ where: { id } });
  }

  // Update by ID using UpdatePaymentDto
  async updatePayment(id: string, dto: UpdatePaymentDto) {
    return this.prisma.payment.update({ where: { id }, data: dto });
  }
}
