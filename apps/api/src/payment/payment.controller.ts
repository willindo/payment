import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly svc: PaymentService) {}

  @Post('checkout')
  async checkout(@Body() body: CreatePaymentDto) {
    const { userId, amount, provider } = body;
    return this.svc.createPayment(userId, amount, provider);
  }

  @Get(':id')
  async getPayment(@Param('id') id: string) {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    return prisma.payment.findUnique({ where: { id } });
  }
}
