import { FinalCart } from "./components/final-cart";
import { CheckoutTabs } from "./components/checkout-tabs";

export default function CheckoutPage() {
  return (
    <div className="flex-1">
      <div className="container">
        <div className="flex flex-col-reverse lg:flex-row w-full">
          <div className="flex-1 pb-8 pt-6 md:py-10">
            <div className="w-full lg:w-[520px] py-10 float-right">
              <CheckoutTabs />
            </div>
          </div>
          <div className="border-l ml-20 mr-14"></div>
          <div className="flex-1 pb-8 pt-6 md:py-10">
            <div className="max-w-full lg:max-w-[420px] py-0 lg:py-10">
              <FinalCart />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}