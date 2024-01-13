import { ProductSingle } from "./components/product-single";

interface ProductPageProps {
  params: {
    id: string;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  return (
    <ProductSingle productId={params.id} />
  )
}
