import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("initiate")
  async initiatePayment(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.initiatePayment(dto);
  }

  @Post("confirm")
  async confirmPayment(
    @Body() dto: { paymentId: string; providerRef: string; status: string }
  ) {
    return this.paymentsService.confirmPayment(dto);
  }

  @Get(":id")
  async getPayment(@Param("id") id: string) {
    return this.paymentsService.getPayment(id);
  }
}
