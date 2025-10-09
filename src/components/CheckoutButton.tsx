"use client";
import { CartItem } from "@prisma/client";
import { useState } from "react";

interface CheckoutButtonProps {
    className?: string;
    children?: React.ReactNode;
    cartItems: CartItem[];
}

export default function CheckoutButton({ cartItems, className, children} : CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems }),
    });

    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={className}
    >
      {loading ? "Processing..." : children}
    </button>
  );
}
