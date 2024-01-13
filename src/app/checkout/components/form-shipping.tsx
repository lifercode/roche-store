'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { shippingAllMethods } from "@/config/shipping-all-methods";
import { useCheckoutStore } from "@/store/checkout";
import { ChevronLeft } from "lucide-react";

interface FormShippingProps {
  goFirstStep: () => void;
  back: () => void;
  goNextStep: () => void;
}

export function FormShipping({
  goFirstStep,
  back,
  goNextStep
}: FormShippingProps) {
  const { state, actions } = useCheckoutStore();
  const { shippingMethod } = state;
  const { setShippingMethod } = actions;

  return (
    <div className="">
      <div className="border rounded-lg px-5 py-3 mb-10">
        
        <div className="flex space-x-10 border-b py-2">
          <div className="font-semibold text-gray-500 w-20 text-sm">
            Contact
          </div>
          <div className="flex-1 text-sm">
            {state.checkoutInformations?.email}
          </div>
          <div className="">
            <Button type="button" onClick={goFirstStep} variant="link" className="p-0 h-auto text-blue-500">
              Change
            </Button>
          </div>
        </div>
        
        <div className="flex space-x-10 py-2">
          <div className="font-semibold text-gray-500 w-20 text-sm">
            Ship to
          </div>
          <div className="flex-1 text-sm">
            {`
              ${state.checkoutInformations?.address},
              ${state.checkoutInformations?.complement},
              ${state.checkoutInformations?.city}
              ${state.checkoutInformations?.state}
              ${state.checkoutInformations?.zipcode},
              ${state.checkoutInformations?.country}
            `}
          </div>
          <div className="">
            <Button type="button" onClick={goFirstStep} variant="link" className="p-0 h-auto text-blue-500">
              Change
            </Button>
          </div>
        </div>

      </div>
      <p className="font-bold mb-3">Shipping method</p>
      <div className="flex flex-col border rounded-lg">
        <Button type="button" onClick={() => setShippingMethod('economy')} variant="link" className="m-0 w-full h-16 hover:no-underline rounded-bl-none rounded-br-none border-b">
          <div className="flex space-x-4 w-full">
            <div className="">
              <Input type="radio" checked={shippingMethod === 'economy'} className="w-5" />
            </div>
            <div className="flex flex-col flex-1 text-left">
              <span className="font-semibold">{shippingAllMethods.economy.label}</span>
              <span className="text-gray-500">{shippingAllMethods.economy.info}</span>
            </div>
            <span className="font-bold">${shippingAllMethods.economy.price}</span>
          </div>
        </Button>
        <Button type="button" onClick={() => setShippingMethod('standard')} variant="link" className="m-0 w-full h-16 hover:no-underline rounded-tl-none rounded-tr-none">
          <div className="flex space-x-4 w-full">
            <div className="">
              <Input type="radio" checked={shippingMethod === 'standard'} className="w-5" />
            </div>
            <div className="flex flex-col flex-1 text-left">
              <span className="font-semibold">{shippingAllMethods.standard.label}</span>
              <span className="text-gray-500">{shippingAllMethods.standard.info}</span>
            </div>
            <span className="font-bold">${shippingAllMethods.standard.price}</span>
          </div>
        </Button>
      </div>
      <div className="flex w-full justify-between mt-5">
        <Button type="button" onClick={back} variant="link" className="px-0 text-blue-500 text-sm space-x-2">
          <ChevronLeft size={18} />
          <span>Back to information</span>
        </Button>
        <Button type="button" onClick={goNextStep}>
          Continue to payment
        </Button>
      </div>
    </div>
  )
}
