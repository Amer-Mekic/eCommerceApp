import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/amazon.png";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function searchProduct(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const cart = await getCart();
  return (
    <div className="bg-black">
      <div className="navbar max-w-7xl m-auto flex-col sm:flex-row">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl normal-case" href="/">
            <Image
              src={logo}
              height={100}
              width={100}
              alt="eCommerce logo"
            ></Image>
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProduct}>
            
              <label className="input input-bordered flex items-center gap-2">
                <input
                  className="grow min-w-[100px]"
                  name="searchQuery"
                  placeholder="Search"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            
          </form>
          <ShoppingCartButton cart={cart}></ShoppingCartButton>
          <UserMenuButton session={session}></UserMenuButton>
        </div>
      </div>
    </div>
  );
}
