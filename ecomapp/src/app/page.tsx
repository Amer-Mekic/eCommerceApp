import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";

export default async function Home() {

  // fetch all products from database and order them by id in descending order (higher id = later creation)
  const products = await prisma.product.findMany({
    orderBy:{id: "desc"}
  })
  return (
    <div>
      <div className=" my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">  
        {products.map(product => (
          <ProductCard product={product} key={product.id}>
          </ProductCard>
        ))}
      </div>
    </div>      
  );
}
