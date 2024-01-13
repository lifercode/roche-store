import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="flex flex-col max-w-96 mx-auto my-20">
      <CheckCircle size={90} className="text-green-500 mx-auto mb-5" />
      <p className=" text-center mb-8">
        <strong>Congratulations!</strong>
        <br />
        <strong>Purchase made successfully.</strong>
        <br />
        <span>You will receive an email with more details about your order.</span>
      </p>
      <Button variant="default" className="w-auto" asChild>
        <Link href="/store" className="space-x-2 hover:space-x-4 px-0">
          <ChevronLeft size={20} />
          <span className="transition-all">Back to store</span>
        </Link>
      </Button>
    </div>
  )
}