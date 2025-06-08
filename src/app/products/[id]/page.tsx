import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import PriceTag from "@/components/PriceTag";
import { Metadata } from "next";
import { cache } from "react";
import AddToCartButton from "./AddToCartButton";
import { incrementProductQuantity } from "./actions";
import dotenv from 'dotenv'
dotenv.config()

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    notFound();
  }
  return product;
});

export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
  const params = await props.params;

  const {
    id
  } = params;

  const product = await getProduct(id);
  return{
      title:product.name+" - eCommerce Store",
      description: product.description
  }
}

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params;

  const {
    id
  } = params;

  const product = await getProduct(id);

  return (
    <div className="flex justify-center items-center min-h-screen"> {/* Center content in the viewport */}
      <div className="bg-base-200 p-10 rounded-lg shadow-md"> {/* Background with padding */}
        <div className="flex flex-col lg:flex-row justify-center gap-10 items-center">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg"
            priority
          />
          <div>
            <h1 className="text-5xl font-bold">{product.name}</h1>
            <PriceTag price={product.price} className="mt-5 text-lg"></PriceTag>
            <p className="py-6">{product.description}</p>
            <AddToCartButton productId={product.id} incrementProductQuantity={incrementProductQuantity}></AddToCartButton>
          </div>
        </div>
      </div>
    </div>
  );
}
