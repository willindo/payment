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
const client_1 = require("@prisma/client");
const stripe_service_1 = require("../stripe/stripe.service");
const prisma = new client_1.PrismaClient();
let PaymentService = class PaymentService {
    constructor(stripe) {
        this.stripe = stripe;
    }
    async createPayment(userId, amount, provider = 'stripe', currency = 'INR') {
        // DB record as PENDING
        const payment = await prisma.payment.create({
            data: {
                userId,
                amount,
                currency,
                provider: 'stripe',
                status: 'PENDING',
            },
        });
        // Provider payment intent
        const intent = await this.stripe.createPaymentIntent(amount, currency, {
            metadata: { paymentId: payment.id, userId },
        }); // Type workaround for metadata
        // Save provider reference
        await prisma.payment.update({
            where: { id: payment.id },
            data: { providerRef: intent.id },
        });
        return { payment, client_secret: intent.client_secret };
    }
    async markPaymentSuccess(providerRef) {
        return prisma.payment.updateMany({
            where: { providerRef },
            data: { status: 'SUCCESS' },
        });
    }
    async markPaymentFailed(providerRef) {
        return prisma.payment.updateMany({
            where: { providerRef },
            data: { status: 'FAILED' },
        });
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [stripe_service_1.StripeService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map