'use client'

import { Button } from "@/components/ui/button";
import { shippingAllMethods } from "@/config/shipping-all-methods";
import { useCheckoutStore } from "@/store/checkout";
import { AlertTriangle, ChevronLeft, CreditCard } from "lucide-react";

interface FormPaymentProps {
  goFirstStep: () => void;
  back: () => void;
  goNextStep: () => void;
}

export function FormPayment({ goFirstStep, back, goNextStep }: FormPaymentProps) {
  const { state, actions } = useCheckoutStore();
  const { shippingMethod } = state;

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
        
        <div className="flex space-x-10 py-2">
          <div className="font-semibold text-gray-500 w-20 text-sm">
            Shipping method
          </div>
          <div className="flex-1 text-sm">
            {shippingAllMethods[shippingMethod].label} · <strong>${shippingAllMethods[shippingMethod].price}</strong>
          </div>
          <div className="">
            <Button type="button" onClick={back} variant="link" className="p-0 h-auto text-blue-500">
              Change
            </Button>
          </div>
        </div>

      </div>
      <p className="font-bold">Payment</p>
      <p className="text-gray-600 text-sm mb-3">All transactions are secure and encrypted.</p>
      <div className=" bg-gray-100 rounded-lg p-5 text-center text-gray-400">
        <div className="mx-auto relative w-[90px]">
          <CreditCard size={90}/>
          <AlertTriangle size={40} fill="#f3f4f6" className="absolute top-0 -right-3" />
        </div>
        <p>
          {`This store can’t accept payments right now.`}
        </p>
      </div>
      <div className="flex w-full justify-between mt-5">
        <Button type="button" onClick={back} variant="link" className="px-0 text-blue-500 text-sm space-x-2">
          <ChevronLeft size={18} />
          <span>Back to shipping</span>
        </Button>
        <Button type="button" onClick={goNextStep}>
          Pay  now
        </Button>
      </div>
    </div>
  )
}
