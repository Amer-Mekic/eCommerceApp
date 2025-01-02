import { getCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import { formatPrice } from "@/lib/format";

export const metadata = {
    title: "Your Cart"
}

export default async function CartPage() {
    const cart = await getCart();
return(
    <div>
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {cart?.items.map(item => (
            <CartEntry cartItem={item} key={item.id} setProductQuantity={setProductQuantity}></CartEntry>
        ))}
        {!cart?.items.length && <p>Your Cart is empty!</p>}
        <div className="flex flex-col iitems-end sm:items-center">
            <p className="mb-3 font-bold">
                Total: {formatPrice(cart?.subtotal || 0)}
            </p>
            <button className="btn btn-primary sm:btn-sm md:btn-md lg:btn-lg">Go To Checkout</button>
        </div>
    </div>
)
}