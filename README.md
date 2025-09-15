# reload-ops - payment-service

This service handles payments (checkout, webhooks, status). It is provider-agnostic (Stripe adapter included).

ENV variables (see .env.example):

- DATABASE_URL
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- DOCKER_IMAGE
- NODE_ENV
- PORT

Run locally:

```bash
# dev
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run start:dev
```

<!-- tree -I 'node_modules|dist|.git|.next|coverage|*.log' -->
