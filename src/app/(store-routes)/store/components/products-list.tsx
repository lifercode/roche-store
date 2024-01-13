'use client'

import Link from "next/link"
import Image from "next/image"
import { useShopStore } from "@/store/shop";
import { ImageIcon } from "lucide-react";

export function ProductsList() {
  const { state: { products } } = useShopStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {products.map((item) => (
        <div key={item.id}>
          <Link href={`/products/${item.id}`}>
            <div className="border text-center rounded-lg overflow-hidden ring-offset-2 ring-black hover:ring-4 transition-all">
              {!item?.image ? (
                <div className="relative bg-[#f8f8f8]">
                  <Image src={item.image} alt={item.title} width={200} height={200} className="w-full opacity-0" />
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <ImageIcon size={200} className="text-gray-300" />
                  </div>
                </div>
              ) : (
                <Image src={item.image} alt={item.title} width={200} height={200} className="w-full" />
              )}
            </div>
          </Link>
          <div className="flex px-1 py-3 items-center space-x-5">
            <span className="flex flex-1 text-lg">
              <Link href={`/products/${item.id}`}>{item.title}</Link>
            </span>
            <span className="font-bold">${item.price}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
