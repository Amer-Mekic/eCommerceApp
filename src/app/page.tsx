import PaginationBar from "@/components/PaginationBar";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";

interface HomeProps {
  searchParams: Promise<{
    page: string
  }> // to append ?page= to url to get correct page
}
export default async function Home(props: HomeProps) {
  const searchParams = await props.searchParams;

  const {
    page = "1"
  } = searchParams;

  const currentPage = parseInt(page)
  const pageSize = 6
  const totalItemCount = await prisma.product.count()
  const totalPages =Math.ceil(totalItemCount/pageSize)
  // fetch all products from database and order them by id in descending order (higher id = later creation)
  const products = await prisma.product.findMany({
    orderBy:{id: "desc"},
    skip:(currentPage-1)*pageSize, // if page = 2, this will skip (2-1)*6 items (6), which is 1 whole page
    take:pageSize // take this many items (6) to display
  })
  return (
    <div className="flex flex-col items-center">
      <div className=" my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">  
        {products.map(product => (
          <ProductCard product={product} key={product.id}>
          </ProductCard>
        ))}
      </div>
      {totalPages>1 &&
      <PaginationBar currentPage={currentPage} totalPages={totalPages}></PaginationBar>
}
    </div>      
  );
}
