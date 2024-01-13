'use client'

import { useCartStore } from "@/store/cart";
import { ChevronLeft, ChevronRight, Store } from "lucide-react";
import { FormPayment } from "./form-payment";
import Link from "next/link";
import { FormInformation } from "./form-information";
import { FormShipping } from "./form-shipping";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/store/checkout";

interface RenderTabProps {
  label: string;
  target: 'information' | 'shipping' | 'payment';
}

export function CheckoutTabs() {
  const { actions, state } = useCartStore()
  const { actions: { setCheckoutStep, resetCheckout }, state: { checkoutStep, shippingMethod, checkoutInformations } } = useCheckoutStore()
  const router = useRouter()

  const step = checkoutStep;
  const setStep = setCheckoutStep;

  function renderTab({ label, target }: RenderTabProps) {
    return target === step
      ? <p className="text-sm font-bold">{label}</p>
      : <p className="text-sm p-0 text-gray-500">{label}</p>
  }

  function onCheckoutFinish() {
    router.push('/checkout/success', { scroll: false })
    console.log({
      checkoutStep,
      shippingMethod,
      checkoutInformations,
      products: state.products
    })
    setTimeout(() => {
      resetCheckout()
      actions.removeAllProducts()
    }, 100)
  }

  if(!Boolean(state.products.length)) {
    return (
      <div className="h-[450px] lg:h-[650px] flex items-center justify-center">
        <div className="text-gray-300 flex flex-col space-y-5 items-center">
          <Store size={180} />
          <span className=" visible lg:hidden">Empty cart</span>
          <Link href="/store" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            <ChevronLeft size={20} className="-ml-2" />
            <span>Return to the store</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2 mb-6">
        {renderTab({ label: 'Information', target: 'information' })}
        <ChevronRight size={15} />
        {renderTab({ label: 'Shipping', target: 'shipping' })}
        <ChevronRight size={15} />
        {renderTab({ label: 'Payment', target: 'payment' })}
      </div>
      <div>
        {step === 'information' && (
          <FormInformation back={() => router.push('/store', { scroll: false })} goNextStep={() => setStep('shipping')} />
        )}
        {step === 'shipping' && (
          <FormShipping
            goFirstStep={() => setStep('information')}
            back={() => setStep('information')}
            goNextStep={() => setStep('payment')}
          />
        )}
        {step === 'payment' && (
          <FormPayment goFirstStep={() => setStep('information')} back={() => setStep('shipping')}
            goNextStep={onCheckoutFinish} />
        )}
      </div>
      <div className="border-t pt-2 mt-20">
        <p className="text-sm text-gray-400">
          All rights reserved Dev Roche Shop
        </p>
      </div>
    </div>
  )
}
