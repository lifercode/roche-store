'use client'

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCartStore } from "@/store/cart"
import Image from "next/image";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { Input } from "./ui/input";
import Link from "next/link"

interface CartSheetProps {
  children: React.ReactNode
}

export function CartSheet({ children }: CartSheetProps) {

  const { actions, state } = useCartStore()

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="p-0 flex flex-col">
          <div className="p-5">
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>
        </div>
        {!Boolean(state.products.length) && (
          <div className="h-full flex items-center justify-center">
            <div className="text-gray-300 flex flex-col space-y-5 items-center">
              <ShoppingBag size={180} />
              <span>Empty cart</span>
            </div>
          </div>
        )}
        <ScrollArea className="flex-1 overflow-y-auto px-5">
          <div className="h-5" />
          {state.products.map((item) => (
            <div key={item.id} className="mb-5 flex space-x-3 border-b pb-5">
              <div className="relative">
                <div className="w-20 h-20 overflow-hidden flex items-center rounded-md border">
                  <Image src={item.image} alt="tshirt" width={100} height={100} className="w-full" />
                </div>
                <Button type="button" onClick={() => actions.removeProduct(item.id)} variant="secondary" className="absolute -top-2 -right-2 border rounded-full w-5 h-5 p-0">
                  <X size={13} />
                </Button>
              </div>
              <div className="flex flex-1 flex-col justify-between w-full">
                <div className="flex flex-col space-y-1 w-full mb-2">
                  <span className="font-semibold">{item.title}</span>
                  <span className="text-gray-400">-</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between w-full">
                <div className="flex flex-row-reverse w-full mb-2">
                  <span className="mr-1">${item?.price || '$5.90'} <small className="opacity-60">USD</small></span>
                </div>
                <div className="flex flex-row-reverse">
                  <div className="flex border rounded-full px-0">
                    <Button type="button" onClick={() => item.qty === 1 ? actions.removeProduct(item.id) : actions.updateProduct(item.id, { qty: item.qty-1 })} variant="link" className=" text-gray-500 rounded-full p-0 w-10 h-8" size="sm">
                      <Minus size={20} />
                    </Button>
                    <Input className="w-5 h-8 px-0 border-0 text-xs text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" value={item.qty} />
                    <Button type="button" onClick={() => actions.updateProduct(item.id, { qty: item.qty+1 })} variant="link" className=" text-gray-500 rounded-full p-0 w-10 h-8" size="sm">
                      <Plus size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="p-5">
          {Boolean(state.products.length) && (
            <div className="w-full">
              <div className="flex justify-between border-b mb-5 pb-1">
                <span className="text-sm">Taxes</span>
                <span className=" font-semibold">$0.00 <small>USD</small></span>
              </div>
              <div className="flex justify-between border-b mb-5 pb-1">
                <span className="text-sm">Shipping</span>
                <span className=" text-gray-500"><small>Calculated at checkout</small></span>
              </div>
              <div className="flex justify-between border-b mb-5 pb-1">
                <span className="text-sm">Total</span>
                <span className=" font-semibold">${state.products.map(({price, qty}) => price*qty).reduce((ac, value) => ac + value, 0).toFixed(2)} <small>USD</small></span>
              </div>
            </div>
          )}
          {Boolean(state.products.length) && (
            <SheetFooter>
              <SheetClose asChild>
                <Link href="/checkout" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                  Proceed to Checkout
                </Link>
              </SheetClose>
            </SheetFooter>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
