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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("../payment/payment.service");
const stripe_service_1 = require("../stripe/stripe.service");
let WebhookController = class WebhookController {
    constructor(paymentService, stripeService) {
        this.paymentService = paymentService;
        this.stripeService = stripeService;
    }
    async handleStripeWebhook(req, res) {
        const sig = req.headers['stripe-signature'];
        let event;
        try {
            event = await this.stripeService.verifyWebhookSignature(req.body, sig);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(`Webhook verification failed:`, message);
            return res.status(400).send(`Webhook Error: ${message}`);
        }
        switch (event.type) {
            case 'payment_intent.succeeded':
                await this.paymentService.markPaymentSuccess(event.data.object.id);
                break;
            case 'payment_intent.payment_failed':
                await this.paymentService.markPaymentFailed(event.data.object.id);
                break;
        }
        res.json({ received: true });
    }
};
exports.WebhookController = WebhookController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WebhookController.prototype, "handleStripeWebhook", null);
exports.WebhookController = WebhookController = __decorate([
    (0, common_1.Controller)('webhook'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService,
        stripe_service_1.StripeService])
], WebhookController);
//# sourceMappingURL=webhook.controller.js.map