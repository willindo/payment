import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PaymentService } from '../payment/payment.service';
import { StripeService } from '../stripe/stripe.service';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly stripeService: StripeService,
  ) {}

  @Post()
  async handleStripeWebhook(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers['stripe-signature'] as string;
    let event;

    try {
      event = await this.stripeService.verifyWebhookSignature(
        req.body,
        sig,
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`Webhook verification failed:`, message);
      return res.status(400).send(`Webhook Error: ${message}`);
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        await this.paymentService.markPaymentSuccess(
          (event.data.object as any).id,
        );
        break;

      case 'payment_intent.payment_failed':
        await this.paymentService.markPaymentFailed(
          (event.data.object as any).id,
        );
        break;
    }

    res.json({ received: true });
  }
}
