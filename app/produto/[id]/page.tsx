import { notFound } from 'next/navigation';
import { allProductSkus, productById } from '@/data/products';
import { ProductPage } from '@/components/shop/product-page';
export const dynamicParams = false;
export function generateStaticParams() {
  return allProductSkus.map((p) => ({ id: p.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const product = productById.get((await params).id);
  return {
    title: product
      ? `${product.name} — ${product.size} | Mania de Bicho`
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
