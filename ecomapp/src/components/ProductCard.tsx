import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import PriceTag from "./PriceTag";

// Define props used in interface,
// type not needed here since we don't combine our own with ComponentProps
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={"/products/" + product.id}
      className="card w-full bg-base-200 hover:shadow-xl transition-shadow"
    >
        <figure>
            <Image src={product.imageUrl} alt={product.name} width={800} height={400} className="h-48 object-cover"/>
        </figure>
        <div className="card-body">
            <h2 className="card-title font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <PriceTag price={product.price}></PriceTag>
        </div>
    </Link>
  );
}
