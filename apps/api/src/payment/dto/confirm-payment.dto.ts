import { IsString, IsEnum } from "class-validator";
import { PaymentStatus } from "@prisma/client";

export class ConfirmPaymentDto {
  @IsString()
  paymentId!: string;

  @IsString()
  providerRef!: string;

  @IsEnum(PaymentStatus)
  status!: PaymentStatus;
}
