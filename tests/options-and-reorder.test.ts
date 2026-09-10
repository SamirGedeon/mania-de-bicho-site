import test from 'node:test';
import assert from 'node:assert/strict';
import {
  allProductSkus,
  productOptions,
  productById,
} from '../data/products.ts';
import { updateCart, cartTotals, serializeCart } from '../lib/cart.ts';
import { reorderItems } from '../lib/reorder.ts';
import { paymentTotals } from '../lib/payments.ts';
test('weight options keep separate quantities and their own prices', () => {
  assert.equal(
    new Set(allProductSkus.map((p) => p.id)).size,
    allProductSkus.length,
  );
  assert.equal(productOptions('pet-001-1kg').length, 3);
  let items = updateCart([], { type: 'add', productId: 'pet-001-1kg' });
  items = updateCart(items, { type: 'add', productId: 'pet-001-3kg' });
  assert.equal(items.length, 2);
  assert.equal(cartTotals(items).totalCents, 6480);
  assert.equal(
    paymentTotals(cartTotals(items).totalCents).cashTotalCents,
    6156,
  );
  assert.deepEqual(reorderItems(serializeCart(items)), items);
});
test('reordering drops invalid entries and unavailable options', () => {
  const option = productById.get('pet-001-1kg')!;
  const original = option.availability;
  try {
    option.availability = 'unavailable';
    assert.deepEqual(
      reorderItems(serializeCart([{ productId: option.id, quantity: 2 }])),
      [],
    );
    assert.deepEqual(updateCart([], { type: 'add', productId: option.id }), []);
  } finally {
    option.availability = original;
  }
  assert.deepEqual(reorderItems('{broken'), []);
});
