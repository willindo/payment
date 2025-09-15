import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { StripeService } from '../stripe/stripe.service';

@Module({
providers: [PaymentService, StripeService],
controllers: [PaymentController],
})
export class PaymentModule {}