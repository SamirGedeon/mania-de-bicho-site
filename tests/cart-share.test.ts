import test from 'node:test';
import assert from 'node:assert/strict';
import { sharedCartUrl, parseSharedCart } from '../lib/cart-share.ts';
import { updateCart } from '../lib/cart.ts';
test('shared selection round trips and merges without replacing existing cart', () => {
  const items = [
    { productId: 'pet-001', quantity: 2 },
    { productId: 'pet-002', quantity: 3 },
  ];
  const result = parseSharedCart(new URL(sharedCartUrl(items)).hash);
  assert.deepEqual(result, items);
  assert.deepEqual(
    updateCart([{ productId: 'pet-001', quantity: 98 }], {
      type: 'restore',
      items: result,
    }),
    [
      { productId: 'pet-001', quantity: 99 },
      { productId: 'pet-002', quantity: 3 },
    ],
  );
});
test('malformed, oversized, unknown and invalid shared entries cannot become cart items', () => {
  assert.deepEqual(parseSharedCart('#%broken'), []);
  assert.deepEqual(parseSharedCart('#' + 'x'.repeat(20001)), []);
  const payload = {
    version: 1,
    items: [
      { productId: 'missing', quantity: 1 },
      { productId: 'pet-001', quantity: -1 },
      { productId: 'pet-002', quantity: 1.5 },
    ],
  };
  assert.deepEqual(
    parseSharedCart('#' + encodeURIComponent(JSON.stringify(payload))),
    [],
  );
});
