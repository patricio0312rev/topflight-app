# Topflight Storefront

Supplement store UI built with the Next.js App Router. Includes a full browsing-to-checkout flow plus a lightweight provider view for orders.

## Features

- Storefront home with hero, FAQ, and best-seller carousel.
- Product catalog with search, category and price filters, sort options, best-seller toggle, and mobile-friendly filters.
- Product detail pages with gallery, ratings, trust badges, and tabbed nutrition/usage info.
- Cart with quantity guard (1 per product), shipping/tax breakdown, and clear/remove actions.
- Checkout form with validation, toasts, and simulated order creation (in-memory orders for demo).
- Provider/admin orders table (sorting/filtering/pagination) scaffolded for back-office views.

## Tech Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4, Radix UI primitives, `class-variance-authority`, `tailwind-merge`
- Framer Motion animations, Embla Carousel, Lucide icons, Sonner toasts
- TanStack React Table for provider order views

## Getting Started

Prerequisites: Node.js 18+ and either `pnpm` or `npm`.

Install dependencies:

```bash
pnpm install
# or
npm install
```

Run the dev server:

```bash
pnpm dev
# or
npm run dev
```

Then open http://localhost:3000.

Build and start production:

```bash
pnpm build && pnpm start
# or
npm run build && npm start
```

Lint:

```bash
pnpm lint
# or
npm run lint
```
