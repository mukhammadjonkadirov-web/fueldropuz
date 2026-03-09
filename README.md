# FuelDrop — On-demand fuel delivery

A mobile-first website for an on-demand car fuel delivery service with B2C (individual drivers) and B2B (company fuel budgets) flows.

## Value proposition

**Fuel delivered directly to your car, and smarter fuel budget control for companies.**

- **Drivers:** Order fuel to your location in a few simple steps — no trip to the gas station.
- **Companies:** Transfer monthly fuel budgets to FuelDrop; we deliver fuel to employee vehicles and provide full visibility and control.

## Tech stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**

## Pages

1. **Home** — Hero, benefits, how it works, trust & safety, testimonials, footer
2. **Order fuel** (`/order`) — Multi-step flow: location → fuel & quantity → vehicle & contact → delivery time → payment → confirmation
3. **For companies** (`/for-companies`) — B2B value prop, monthly budgets, controlled usage, reporting
4. **Company dashboard** (`/dashboard`) — Demo UI: total budget, employees table, usage, alerts, order history
5. **About** (`/about`) — Professional service, safety, trained staff, transparent pricing
6. **Contact** (`/contact`) — Support details, business inquiries, contact form

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Design

- Mobile-first, responsive layout
- Clean, minimal UI with soft slate/sky palette
- Accessible focus states and semantics
- Reusable components: Logo, Button, Card, Input, Select, Header, Footer
