"use server";

import { prisma } from "@/lib/db/prisma";
import { CartItem } from "@prisma/client";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    throw new Error("STRIPE_SECRET_KEY environment variable is not set");
}
const stripe = new Stripe(stripeSecretKey);

export async function POST(req: Request): Promise<Response> {
    try {
        const { cartItems } = await req.json();
        if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
            return new Response(JSON.stringify({ error: "No cart items provided" }), { status: 400 });
        }

        // Fetch all products for the cart items in a single query
        const productIds = cartItems.map((item: CartItem) => item.productId);
        const products = await prisma.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, price: true, name: true },
        });

        // Map productId to product for quick lookup
        const productMap = new Map(products.map(product => [product.id, product]));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: cartItems.map((item: CartItem) => {
            const product = productMap.get(item.productId);
            if (!product) {
                throw new Error(`Product with id ${item.productId} not found`);
            }
            return {
                price_data: {
                currency: "usd",
                product_data: { name: product.name },
                unit_amount: Math.round(product.price), // convert dollars to cents
                },
                quantity: item.quantity,
            };
            }),
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
        });

        return new Response(JSON.stringify({ url: session.url }), { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
