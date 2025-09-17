import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PaymentsModule } from "./payment/payments.module";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ Load .env once
    PaymentsModule,
    PrismaModule,
  ],
})
export class AppModule {}
