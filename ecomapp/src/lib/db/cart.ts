import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";

// Type for cart with all product information
export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;
// Type for Cart whish is intersection (&) of CartWithProducts AND size and subtotal properties
export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

export async function createCart(): Promise<ShoppingCart> {
  const newCart = await prisma.cart.create({
    data: {},
  });

  // if user is logged out and browses and adds products to car, we want to still associate this anonymous
  // cart with him after he logs out, so he didn't just add products for nothing.
  // we handle these anonymous carts by storing their id in user's cookies on browser.
  (await cookies()).set({
    name: "anonymousCartId",
    value: newCart.id,
    path: "/", // Make the cookie available across the entire site
    sameSite: "strict", // Prevent CSRF attacks
    httpOnly: true, // Prevent client-side access
    maxAge: 60 * 60 * 24 // Keep this cookie alive for a day, if user returns later in the day to add new items
  });

  return {
    ...newCart,
    size: 0,
    subtotal: 0,
    items: [],
  };
}

export async function getCart(): Promise<ShoppingCart | null> {
  const anonymousCartId = (await cookies()).get("anonymousCartId")?.value;
  const cart = anonymousCartId
    ? await prisma.cart.findUnique({
        where: { id: anonymousCartId },
        // Put items from anonymous cart into actual user cart fetched from database,
        // have to include all product information, hence the nested include:'s
        include: { items: { include: { product: true } } },
      })
    : null; //Can't fetched cart => null

  if (!cart) return null;

  // return java object, hence the {} instead of ()
  return {
    ...cart,
    //Total size = sum of quantities of all items
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    ),
  };
}
