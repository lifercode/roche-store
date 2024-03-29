import { getServerSession } from "next-auth";
import { FormCreateProduct } from "./components/form-create-product";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "@/config/auth";

export default async function CreateProduct() {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="container max-w-[500px] my-10">
      <FormCreateProduct />
    </div>
  )
}