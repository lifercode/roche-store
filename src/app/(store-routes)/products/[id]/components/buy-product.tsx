'use client'

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart"
import { toast } from "sonner"
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useShopStore } from "@/store/shop";

interface BuyProductProps {
  productId: string;
}

export function BuyProduct({ productId }: BuyProductProps) {
  const [qty, setQty] = useState(1)
  const { actions } = useCartStore()
  const { state: { products } } = useShopStore();

  function handleClick() {
    const newProduct = products.find(({ id }) => id === productId);
    if (newProduct) {
      actions.addProduct({
        ...newProduct,
        qty
      })
      toast("Product added to the cart.", {
        description: newProduct.title,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      })
    }
  }

  return (
    <div className="flex w-full space-x-5">
      <div className="flex border rounded-full">
        <Button type="button" onClick={() => qty > 1 && setQty(qty-1)} variant="link" className="rounded-full">
          <Minus size={20} />
        </Button>
        <Input className="w-10 px-0 border-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" value={qty} />
        <Button type="button" onClick={() => setQty(qty+1)} variant="link" className="rounded-full">
          <Plus size={20} />
        </Button>
      </div>
      <Button type="button" onClick={handleClick} className="flex-1 uppercase">Comprar</Button>
    </div>
  )
}