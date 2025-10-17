# E-Commerce App

This is a full-stack e-commerce application built with Next.js, TypeScript, MongoDB, Prisma, NextAuth and TailwindCSS, with utilization of styled components from DaisyUI. The App has also Payment integration which I added by using Stripe.

### Live Demo

Visit the deployed app here:  
[https://e-commerce-app-one-eta-25.vercel.app/](https://e-commerce-app-one-eta-25.vercel.app/)

### Tech Stack

- **Frontend & Backend**: Next.js
- **Authentication**: NextAuth with Google
- **Database**: MongoDB with Prisma ORM
- **Deployment**: Vercel

### Features

- Stripe Payment integration
- User login with Google OAuth
- Products display
- Product addition 
- Cart
- Pagination
- Responsive UI

---

**Note:** Make sure to set up environment variables (inside .env file) if running locally:
- DATABASE_URL= 
- GOOGLE_CLIENT_ID =
- GOOGLE_CLIENT_SECRET =
- NEXTAUTH_URL=\[Set this to 'http://localhost:3000']
- NEXTAUTH_SECRET=
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
- STRIPE_SECRET_KEY=
- NEXT_PUBLIC_BASE_URL= \[Set this to 'http://localhost:3000']