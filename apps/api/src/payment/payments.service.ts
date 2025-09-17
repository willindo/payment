import { Injectable } from "@nestjs/common";
import { PaymentStatus } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { CreatePaymentDto } from "./dto/create-payment.dto";

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async initiatePayment(data: {
    userId: string;
    amount: number;
    provider: string;
  }) {
    return this.prisma.payment.create({
      data: {
        userId: data.userId,
        amount: data.amount,
        provider: data.provider,
        status: PaymentStatus.PENDING,
      },
    });
  }

  async confirmPayment(data: {
    paymentId: string;
    providerRef: string;
    status: string;
  }) {
    return this.prisma.payment.update({
      where: { id: data.paymentId },
      data: {
        providerRef: data.providerRef,
        status: data.status as PaymentStatus,
      },
    });
  }

  // ✅ Use providerRef for TS compatibility until Prisma client is regenerated
  async markPaymentSuccess(paymentIntentId: string) {
    return this.prisma.payment.updateMany({
      where: { providerRef: paymentIntentId },
      data: { status: PaymentStatus.SUCCESS },
    });
  }

  async markPaymentFailed(paymentIntentId: string) {
    return this.prisma.payment.updateMany({
      where: { providerRef: paymentIntentId },
      data: { status: PaymentStatus.FAILED },
    });
  }

  async getPayment(id: string) {
    return this.prisma.payment.findUnique({ where: { id } });
  }
}
