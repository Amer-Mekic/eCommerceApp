"use client";

import { useState, useTransition } from "react";

interface AddToCartButtonProps {
  productId: string;
  incrementProductQuantity: (productId: string) => Promise<void>
}

export default function AddToCartButton({ productId , incrementProductQuantity}: AddToCartButtonProps) {
    // calling server action from cient component
    // useTransition() handles errors during loading stage properly (redirects to error page)
    const [isPending, startTransition] = useTransition(); 
const [success, setSuccess] = useState(false); // false passed to make return value boolean
  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-primary sm:btn-sm md:btn-md lg:btn-lg"
        onClick={() => {
            setSuccess(false)
            startTransition(async () => {
                await incrementProductQuantity(productId)
                setSuccess(true)
            })
        }}
        disabled={isPending}
      >
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
        Add To Cart
      </button>
      {isPending && <span className="loading loading-spinner loading-md"></span>}
      {!isPending && success && <span className="text-success">Item Added To Cart</span>}
    </div>
  );
}
