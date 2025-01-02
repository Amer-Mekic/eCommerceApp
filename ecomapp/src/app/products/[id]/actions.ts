"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(productId: string) {
  // ?? means right side will be executed if getCart returns null
  // (to create a new cart, since cart doesn't exist)
  const cart = (await getCart()) ?? (await createCart());
  // check if item's already in the cart (if productId we pass is the same as item's productId)
  const itemInCart = cart.items.find(item => item.productId === productId)

  if(itemInCart){
    await prisma.cartItem.update({
        where:{id: itemInCart.id},
        data: {quantity: { increment: 1}}
    })
  }
  else{
    await prisma.cartItem.create({
        data:{
            cartId: cart.id,
            productId: productId,
            quantity:1
        }
    })
  }
  revalidatePath("/products/[id]", 'page') //refresh to see updates
}
