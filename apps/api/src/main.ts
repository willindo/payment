import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { json } from "express";
import * as bodyParser from "body-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Load config
  const configService = app.get(ConfigService);

  // JSON parsing
  app.use(json());

  // Stripe webhook raw body
  app.use("/webhook", bodyParser.raw({ type: "application/json" }));

  // Respect PORT from .env
  const port = configService.get<number>("PORT", 3000);
  await app.listen(port, "0.0.0.0");

  console.log(`🚀 Payment service listening on port ${port}`);
}
bootstrap();
