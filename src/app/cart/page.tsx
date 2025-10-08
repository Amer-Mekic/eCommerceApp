import { getCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import { formatPrice } from "@/lib/format";
import CheckoutButton from "@/components/CheckoutButton";

export const metadata = {
    title: "Your Cart"
}

export default async function CartPage() {
    const cart = await getCart();
    const tot = formatPrice(cart?.subtotal || 0);
    const subtotal = cart?.subtotal || 0;
return(
    <div>
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {cart?.items.map(item => (
            <CartEntry cartItem={item} key={item.id} setProductQuantity={setProductQuantity}></CartEntry>
        ))}
        {!cart?.items.length && <p>Your Cart is empty!</p>}
        <div className="flex flex-col iitems-end sm:items-center">
            <p className="mb-3 font-bold">
                Total: {tot}
            </p>
            <CheckoutButton cartItems={cart?.items || []} className="btn btn-primary sm:btn-sm md:btn-md lg:btn-lg" total={subtotal}>Go To Checkout</CheckoutButton>
        </div>
    </div>
)
}