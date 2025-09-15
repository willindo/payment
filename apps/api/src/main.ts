import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';
import * as bodyParser from 'body-parser';

async function bootstrap() {
const app = await NestFactory.create(AppModule);

// For normal JSON routes
app.use(json());

// For Stripe webhooks we need raw body — allow raw on webhook path
app.use('/webhook', bodyParser.raw({ type: 'application/json' }));

const port = process.env.PORT || 3000;
await app.listen(port);
console.log(`Payment service listening on ${port}`);
}
bootstrap();