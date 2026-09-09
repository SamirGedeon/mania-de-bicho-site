import { productHref } from '../data/products.ts';
import type { Product } from '../data/products.ts';
// Atualize a origem se o site receber um domínio próprio.
export const siteOrigin =
  'https://mania-de-bicho-referencia.frbsamir.chatgpt.site';
export const shareProductUrl = (id: string) =>
  `${siteOrigin}${productHref(id)}`;
export function shareProductWhatsApp(product: Product) {
  const message = `${product.brand} — ${product.name} (${product.size})${product.availability === 'demo' ? '\nProduto demonstrativo da Mania de Bicho.' : ''}\n${shareProductUrl(product.id)}`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
