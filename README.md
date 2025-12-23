# Topflight Storefront

A modern supplement store application built with Next.js App Router, featuring a customer-facing storefront and an administrative provider portal.

## Features

### Storefront (Customer-Facing)

- **Homepage**: Hero section, best-seller carousel, and FAQ accordion
- **Product Catalog**:
  - Search by product name or description
  - Filter by category, price range, and best-sellers
  - Sort by price, name, or popularity
  - Responsive mobile filters with slide-out sheet
- **Product Details**:
  - Image gallery with multiple photos
  - Product ratings and reviews
  - Tabbed information (description, benefits, ingredients, directions)
  - Trust badges (free shipping, secure checkout, easy returns)
- **Shopping Cart**:
  - Quantity limited to 1 per product
  - Real-time price calculations (subtotal, shipping, tax)
  - Clear cart and remove individual items
  - Free shipping threshold indicator
- **Checkout**:
  - Validated shipping information form
  - Order summary with toast notifications
  - In-memory order storage (resets on page refresh)

### Provider Portal (Admin)

- **Orders Table**:
  - Paginated order list with sorting
  - Search by order ID, customer name, or product name
  - Filter by status and date range
  - Responsive table design
- **Order Details**:
  - Comprehensive order information
  - Customer contact and shipping details
  - Order status management with dropdown
  - Order timeline and summary

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui (New York style)
- **UI Components**: Radix UI primitives, `class-variance-authority`, `tailwind-merge`
- **Animations**: Framer Motion, smooth scroll animations
- **Features**:
  - Embla Carousel for product carousels
  - Lucide React icons
  - Sonner for toast notifications
  - TanStack Table (React Table v8) for order management
  - React Context API for cart state management

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd topflight-app
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Run the development server:

```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
# or
npm run build
npm start
```

### Linting

```bash
pnpm lint
# or
npm run lint
```

## Project Structure

```
topflight-app/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                 # Homepage
│   ├── products/                # Product pages
│   ├── cart/                    # Shopping cart
│   ├── checkout/                # Checkout flow
│   └── provider/                # Provider portal
│       └── orders/              # Order management
├── src/
│   ├── components/
│   │   ├── layout/              # Header, Footer, MainLayout
│   │   ├── storefront/          # Customer-facing components
│   │   ├── provider/            # Admin components
│   │   └── ui/                  # shadcn/ui components
│   ├── contexts/                # React Context (Cart)
│   ├── hooks/                   # Custom hooks (useDebounce)
│   └── lib/
│       └── data/                # Data models and in-memory storage
└── public/                      # Static assets
```

## Key Features & Implementation Notes

- **Cart Management**: Uses React Context API for global state, persists only during session
- **Orders**: Stored in-memory for demonstration purposes (clears on page refresh)
- **Product Data**: Static dummy data with 15+ products across multiple categories
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Optimizations**: Debounced search, memoized filters, optimized re-renders

## Demo Data

- The application includes pre-populated product data with various categories (Protein, Performance, Health, Recovery)
- Orders created through checkout are stored in memory and viewable in the Provider Portal
- Data resets on page refresh (by design for demonstration purposes)

## Future Enhancements

- Backend API integration
- Database persistence
- User authentication
- Payment gateway integration
- Email notifications
- Advanced analytics dashboard
