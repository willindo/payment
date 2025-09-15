"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
// import Stripe from 'stripe';  // if Stripe is used
// import { CreatePaymentDto } from './dto/create-payment.dto';
// import { UpdatePaymentDto } from './dto/update-payment.dto';
let PaymentService = class PaymentService {
    // private stripe: Stripe;
    constructor() {
        // this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        //   apiVersion: '2024-06-01',
        // });
    }
    async createPayment(dto) {
        // Example implementation
        // const paymentIntent = await this.stripe.paymentIntents.create({
        //   amount: dto.amount,
        //   currency: dto.currency,
        //   metadata: { orderId: dto.orderId },
        // });
        // return paymentIntent;
        return { status: 'pending', ...dto };
    }
    async findAll() {
        return [{ id: 1, status: 'mocked' }];
    }
    async findOne(id) {
        return { id, status: 'mocked-single' };
    }
    async update(id, dto) {
        return { id, ...dto };
    }
    async remove(id) {
        return { id, removed: true };
    }
    async handleWebhookEvent(payload, signature) {
        try {
            // Verify + parse payload here (Stripe, Razorpay, etc.)
            // const event = this.stripe.webhooks.constructEvent(
            //   payload,
            //   signature,
            //   process.env.STRIPE_WEBHOOK_SECRET,
            // );
            // switch (event.type) { ... }
            return { received: true, payload };
        }
        catch (err) {
            if (err instanceof Error) {
                throw new common_1.BadRequestException(`Webhook error: ${err.message}`);
            }
            throw new common_1.BadRequestException('Unknown webhook error');
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PaymentService);
//# sourceMappingURL=payment.service.js.map