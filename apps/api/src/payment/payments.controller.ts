import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { ConfirmPaymentDto } from "./dto/confirm-payment.dto";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("initiate")
  async initiatePayment(@Body() dto: CreatePaymentDto) {
    // return this.paymentsService.initiatePayment(dto);
    return {
      status: "success",
      message: `Payment of ${dto.amount} initiated for user ${dto.userId} via ${dto.provider}`,
      paymentId: "pay_12345", // dummy for now
    };
  }

  @Post("confirm")
  async confirmPayment(@Body() dto: ConfirmPaymentDto) {
    return this.paymentsService.confirmPayment(dto);
  }

  @Get(":id")
  async getPayment(@Param("id") id: string) {
    return this.paymentsService.getPayment(id);
  }
}
