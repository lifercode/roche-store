'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { useCartStore } from "@/store/cart"
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { shippingAllMethods } from "@/config/shipping-all-methods";
import { useCheckoutStore } from "@/store/checkout";

export function FinalCart() {
  const { state } = useCartStore()
  const { state: checkoutState } = useCheckoutStore()
  const { shippingMethod, checkoutStep } = checkoutState

  if(!Boolean(state.products.length)) {
    return (
      <div className="hidden h-[650px] lg:flex items-center justify-center">
        <div className="text-gray-300 flex flex-col space-y-5 items-center">
          <ShoppingBag size={180} />
          <span>Empty cart</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-0 flex flex-col">
      <ScrollArea className="flex-1 overflow-y-auto px-0 lg:px-5">
        <div className="h-5" />
        {state.products.map((item) => (
          <div key={item.id} className="mb-5 flex space-x-3 border-b pb-5">
            <div className="relative">
              <div className="w-20 h-20 overflow-hidden flex items-center rounded-md border">
                <Image src={item.image} alt="tshirt" width={100} height={100} className="w-full" />
              </div>
              <Badge
                className="absolute -top-2 -right-2 px-2"
              >{item.qty}</Badge>
            </div>
            <div className="flex flex-1 flex-col justify-between w-full">
              <div className="flex flex-col space-y-1 w-full mb-2">
                <span className="font-semibold">{item.title}</span>
                <span className="text-gray-400">-</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between w-full">
              <div className="flex flex-row-reverse w-full mb-2">
                <span className="mr-1">${item?.price || '$5.90'}</span>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-0 lg:p-5">
        <div className="w-full">
          <div className="flex justify-between border-b mb-5 pb-1">
            <span className="text-sm">Taxes</span>
            <span className=" font-semibold">$0.00</span>
          </div>
          <div className="flex justify-between border-b mb-5 pb-1">
            <span className="text-sm">Shipping</span>
            {checkoutStep === 'information' ? (
              <span className=" text-gray-500"><small>Calculated at checkout</small></span>
            ) : (
              <span className=" font-semibold">${shippingAllMethods[shippingMethod].price}</span>
            )}
          </div>
          <div className="flex justify-between border-b mb-5 pb-1">
            <span className="text-sm">Total</span>
            <span className=" font-semibold"><small>USD</small> ${state.products.map(({price, qty}) => price*qty).reduce((ac, value) => ac + value, 0).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
