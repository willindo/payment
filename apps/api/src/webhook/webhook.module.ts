import { Global, Module } from "@nestjs/common";
import { StripeService } from "../stripe/stripe.service";

@Global()
@Module({
  providers: [StripeService],
  exports: [StripeService],
})
export class WebhookModule {}
