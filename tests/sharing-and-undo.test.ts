import { test } from 'node:test';
import assert from 'node:assert/strict';
import { updateCart, cartTotals } from '../lib/cart.ts';
import { productById } from '../data/products.ts';
import { shareProductUrl, shareProductWhatsApp } from '../lib/product-share.ts';
void test('desfazer restaura quantidades sem descartar novos itens e respeita limite', () => {
  const previous = [
    { productId: 'pet-001', quantity: 2 },
    { productId: 'pet-019', quantity: 1 },
  ];
  let items = updateCart(previous, { type: 'clear' });
  items = updateCart(items, { type: 'add', productId: 'pet-007' });
  items = updateCart(items, { type: 'restore', items: previous });
  assert.deepEqual(cartTotals(items), { count: 4, totalCents: 41260 });
  assert.deepEqual(
    updateCart([{ productId: 'pet-001', quantity: 98 }], {
      type: 'restore',
      items: previous,
    })[0],
    { productId: 'pet-001', quantity: 99 },
  );
});
void test('compartilhamento usa link público do produto e identifica demonstração', () => {
  const product = productById.get('pet-001')!;
  const url = shareProductUrl(product.id);
  assert.equal(new URL(url).pathname, '/produto/pet-001');
  const text = new URL(shareProductWhatsApp(product)).searchParams.get('text')!;
  for (const value of [product.name, product.size, url, 'demonstrativo'])
    assert.ok(text.includes(value));
});
