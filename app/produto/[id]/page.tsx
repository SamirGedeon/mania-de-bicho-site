import { notFound } from 'next/navigation';
import { products, productById } from '@/data/products';
import { ProductPage } from '@/components/shop/product-page';
export const dynamicParams = false;
export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const product = productById.get((await params).id);
  return {
    title: product
      ? `${product.name} | Mania de Bicho`
      : 'Produto não encontrado',
    description: product?.description,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const product = productById.get((await params).id);
  if (!product) notFound();
  return <ProductPage product={product} />;
}
