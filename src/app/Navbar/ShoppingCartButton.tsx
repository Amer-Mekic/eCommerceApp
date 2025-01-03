'use client'
import { ShoppingCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Link from "next/link";

interface ShoppingCartButtonProps {
  cart: ShoppingCart | null;
}

export default function ShoppingCartButton({ cart }: ShoppingCartButtonProps) {
    function closeDropdown(){
        const element = document.activeElement as HTMLElement
        element.blur();
    }
  return (
    <div className="dropdown dropdown-end bg-white rounded-full">
      <label htmlFor="" tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          <span className="badge badge-sm indicator-item text-red-600 font-bold">
            {cart?.size || 0}
          </span>
        </div>
      </label>
      <div tabIndex={0} className="card dropdown-content card-compact mt-1 w-52 bg-base-200 shadow z-30">
        <div className="card-body">
            <span className="text-lg font-bold">{cart?.size || 0} Items</span>
            <span className="text-info">
                Subtotal: {formatPrice(cart?.subtotal || 0)}
            </span>
            <div className="card-actions">
                <Link href="/cart" className="btn btn-primary btn-block font-bold"
                onClick={closeDropdown}>
                    Check Cart
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
