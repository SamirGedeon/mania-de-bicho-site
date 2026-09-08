import { productById, formatPrice } from '../data/products.ts';
import { cartTotals } from './cart.ts';
import type { CartItem } from './cart.ts';
import type { Product } from '../data/products.ts';

export function productQuestion(product: Product) {
  return `Olá, Mania de Bicho! Tenho uma dúvida sobre ${product.brand} — ${product.name} (${product.size}), referência ${product.id}.${product.availability === 'demo' ? '\nVi este item no catálogo demonstrativo. Podem me informar as opções reais disponíveis?' : '\nPodem me ajudar com mais informações sobre este produto?'}`;
}

export function whatsappHref(
  phone: string,
  message = 'Olá! Gostaria de falar com a Mania de Bicho.',
) {
  const digits = phone.replace(/\D/g, '');
  if (!/^55\d{10,11}$/.test(digits)) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
export function cartMessage(items: CartItem[]) {
  const valid = items.filter((item) => productById.has(item.productId));
  const demo = valid.some(
    (item) => productById.get(item.productId)!.availability === 'demo',
  );
  return [
    'Olá, Mania de Bicho! Gostaria de consultar este carrinho:',
    ...(demo
      ? ['CATÁLOGO DEMONSTRATIVO — produtos e valores ilustrativos.']
      : []),
    '',
    ...valid.map((item) => {
      const p = productById.get(item.productId)!;
      return `${item.quantity}x ${p.brand} — ${p.name} (${p.size})${p.availability === 'unavailable' ? ' — INDISPONÍVEL, consultar alternativa' : ''}\nUnitário: ${formatPrice(p.priceCents)} | Subtotal: ${formatPrice(p.priceCents * item.quantity)}`;
    }),
    '',
    `Total dos produtos: ${formatPrice(cartTotals(valid).totalCents)}`,
    'Podem confirmar disponibilidade, valores e opções de entrega ou retirada? O envio desta mensagem não confirma a compra.',
  ].join('\n');
}
