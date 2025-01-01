import { formatPrice } from "@/lib/format";


interface PriceTagProps{
    price:number,
    className?:string,
}

export default function priceTag({price, className} : PriceTagProps){
    return (
        <span className={`badge bg-slate-200 font-bold ${className}`}>{formatPrice(price)}</span>
    )
}