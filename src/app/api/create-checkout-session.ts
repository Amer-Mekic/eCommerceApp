"use server";

import { CartItem } from "@prisma/client";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    throw new Error("STRIPE_SECRET_KEY environment variable is not set");
}
const stripe = new Stripe(stripeSecretKey);

export async function POST(req: Request): Promise<Response> {
    try {
        const { cartItems, total } = await req.json();
        if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
            return new Response(JSON.stringify({ error: "No cart items provided" }), { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: cartItems.map((item: CartItem) => ({
                price_data: {
                    currency: "usd",
                    product_data: { id: item.id },
                    unit_amount: item.price * 100, // convert dollars to cents
                },
                quantity: item.quantity,
            })),
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
        });

        return new Response(JSON.stringify({ url: session.url }), { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
