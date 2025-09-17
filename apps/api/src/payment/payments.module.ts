import { Module } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { PrismaService } from "../../prisma/prisma.service";
import { PaymentsController } from "./payments.controller";
import { PrismaModule } from "../../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, PrismaService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
