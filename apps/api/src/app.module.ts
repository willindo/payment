import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PaymentsModule } from "./payment/payments.module";
import { PrismaModule } from "../prisma/prisma.module";
import { StripeModule } from "./stripe/stripe.module";
import { WebhookModule } from "./webhook/webhook.module";
import { MetricsModule } from "./metrics/metrics.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    StripeModule,
    PaymentsModule,
    WebhookModule,
    MetricsModule,
  ],
})
export class AppModule {}
