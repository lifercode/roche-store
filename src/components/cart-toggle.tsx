"use client"

import { ShoppingCart } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CartSheet } from "./cart-sheet"
import { useCartStore } from "@/store/cart"

export function CartToggle() {
  const { actions, state } = useCartStore()
  return (
    <CartSheet>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
      >
        <ShoppingCart className="h-5 w-5" />
        
        {state.products.length > 0 && (
          <Badge className="px-1 py-0 absolute top-1 right-0">
            {state.products.length}
          </Badge>
        )}
        <span className="sr-only">Toggle cart</span>
      </Button>
    </CartSheet>
  )
}
