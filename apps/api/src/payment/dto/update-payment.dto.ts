import { IsString, IsNumber, IsPositive } from "class-validator";

export class UpdatePaymentDto {
  @IsString()
  userId!: string;

  @IsNumber()
  @IsPositive()
  amount!: number;

  @IsString()
  provider!: string;
}
