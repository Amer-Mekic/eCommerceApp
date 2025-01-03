import Link from "next/link";
import Image from 'next/image'
import logo from '@/assets/amazon.png'
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function searchProduct(formData: FormData){
    'use server'

    const searchQuery = formData.get("searchQuery")?.toString();

    if(searchQuery){
        redirect("/search?query="+searchQuery);
    }

}

export default async function Navbar(){
    const session = await getServerSession(authOptions)
    const cart = await getCart();
    return(
        <div className="bg-black">
            <div className="navbar max-w-7xl m-auto flex-col sm:flex-row">
                <div className="flex-1">
                    <Link className="btn btn-ghost text-xl normal-case" href="/"><Image src={logo} height={100} width={100} alt="eCommerce logo"></Image></Link>
                </div>
                <div className="flex-none gap-2">
                    <form action={searchProduct}>
                        <div className="form-control">
                            <input className="input input-bordered w-full min-w-[100px]" name="searchQuery" placeholder="Search"/>
                        </div>
                    </form>
                    <ShoppingCartButton cart={cart}></ShoppingCartButton>
                    <UserMenuButton session={session}></UserMenuButton>
                </div>                
            </div>
        </div>
    )
}