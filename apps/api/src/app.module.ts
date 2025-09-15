import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './payment/payment.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
imports: [
ConfigModule.forRoot({ isGlobal: true }),
MetricsModule,
PaymentModule,
],
})
export class AppModule {}