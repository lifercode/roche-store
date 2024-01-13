'use client'

import Image from "next/image"
import { BuyProduct } from "./buy-product"
import { useShopStore } from "@/store/shop"
import { ImageIcon } from "lucide-react";

interface ProductSingleProps {
  productId: string;
}

export function ProductSingle({ productId }: ProductSingleProps) {
  const { state: { products } } = useShopStore();
  const current = products.find(({ id }) => id === productId);

  return (
    <section className="container grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 gap-10 pb-8 mb-10 pt-6 md:py-10">
      <div className="bg-[#f8f8f8] border rounded-lg overflow-hidden">

        {!current?.image ? (
          <div className="relative">
            <Image src={current?.image || ''} alt={current?.title || ''} width={1000} height={1000} className="w-full opacity-0" />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <ImageIcon size={200} className="text-gray-300" />
            </div>
          </div>
        ) : (
          <Image src={current.image} alt={current.title} width={1000} height={1000} className="w-full" />
        )}

      </div>
      <div className="pt-10 flex flex-col items-start gap-2 sm:col-span-2 md:col-span-1">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl mb-2">
          {current?.title}
        </h1>
        <span className="text-3xl font-bold mb-2">${current?.price}</span>
        
        <div className="mt-5 mb-10">
          <p className="max-w-[700px] mb-2 text-lg text-muted-foreground">
            {current?.description}
          </p>
        </div>

        <BuyProduct productId={productId} />
      </div>
    </section>
  )
}
