import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { ProductsList } from './components/products-list'
import { getServerSession } from "next-auth"
import { revalidateTag } from "next/cache"
import { nextAuthOptions } from "@/config/auth"

export default async function StorePage() {
  const session = await getServerSession(nextAuthOptions)
  revalidateTag('/store')

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      {Boolean(session) && (
        <>
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              Welcome to the largest marketplace <br className="hidden sm:inline" />
              dedicated to personalized t-shirts on the planet.
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Create a idea and publish your products now to take advantage of the <br className="hidden sm:inline" />
              custom t-shirt market on the best marketplace today.
            </p>
          </div>
          <div className="flex gap-4 mb-6">
            <Link
              href="/products/create"
              className={buttonVariants()}
            >
              Create Product
            </Link>
            <Link
              href="/about"
              className={buttonVariants({ variant: "outline" })}
            >
              About Roche
            </Link>
          </div>
        </>
      )}
      <ProductsList />
    </section>
  )
}
