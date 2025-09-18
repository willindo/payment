import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as express from "express";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // For Stripe webhook verification we need the raw body
  app.use("/webhook", express.raw({ type: "application/json" }));

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
  );

  const port = parseInt(process.env.PORT || "3002", 10);
  await app.listen(port);
  console.log(`Listening on ${port}`);
}
bootstrap();
