import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { categories, products } from '../data/products.ts';
import {
  CART_KEY,
  MAX_QUANTITY,
  readCart,
  updateCart,
  cartTotals,
  serializeCart,
} from '../lib/cart.ts';
import { createCartStore } from '../lib/cart-store.ts';

test('24 produtos com IDs únicos, imagens locais e seis itens em cada categoria', () => {
  assert.equal(products.length, 24);
  assert.equal(new Set(products.map((p) => p.id)).size, 24);
  for (const category of categories)
    assert.equal(
      products.filter((p) => p.category === category.slug).length,
      6,
    );
  for (const p of products) {
    assert.ok(Number.isSafeInteger(p.priceCents) && p.priceCents > 0);
    assert.ok(p.size);
    assert.ok(existsSync(new URL(`../public${p.image}`, import.meta.url)));
  }
});

test('adiciona de categorias diferentes, agrupa repetições, altera quantidades e remove', () => {
  let items = updateCart([], { type: 'add', productId: 'pet-001' });
  items = updateCart(items, { type: 'add', productId: 'pet-007' });
  items = updateCart(items, { type: 'add', productId: 'pet-001' });
  assert.deepEqual(cartTotals(items), { count: 3, totalCents: 33270 });
  assert.equal(items.length, 2);
  items = updateCart(items, {
    type: 'quantity',
    productId: 'pet-001',
    quantity: 1,
  });
  assert.deepEqual(cartTotals(items), { count: 2, totalCents: 17280 });
  items = updateCart(items, { type: 'remove', productId: 'pet-007' });
  assert.deepEqual(cartTotals(items), { count: 1, totalCents: 15990 });
  assert.deepEqual(
    updateCart(items, { type: 'remove', productId: 'pet-001' }),
    [],
  );
});

test('ignora armazenamento inválido, IDs removidos e preços adulterados', () => {
  assert.deepEqual(readCart('{broken'), []);
  assert.deepEqual(readCart(JSON.stringify({ version: 2, items: [] })), []);
  const items = readCart(
    JSON.stringify({
      version: 1,
      items: [
        { productId: 'pet-001', quantity: 2, priceCents: 1 },
        { productId: 'unknown', quantity: 1 },
        { productId: 'pet-002', quantity: -3 },
        { productId: 'pet-003', quantity: 1.5 },
        { productId: 'pet-004', quantity: '3' },
        null,
      ],
    }),
  );
  assert.deepEqual(items, [{ productId: 'pet-001', quantity: 2 }]);
  assert.equal(cartTotals(items).totalCents, 31980);
});

test('limita quantidades e consolida duplicatas de armazenamento', () => {
  const items = readCart(
    serializeCart([
      { productId: 'pet-001', quantity: 90 },
      { productId: 'pet-001', quantity: 25 },
    ]),
  );
  assert.equal(items[0].quantity, MAX_QUANTITY);
  assert.deepEqual(
    updateCart(items, {
      type: 'quantity',
      productId: 'pet-001',
      quantity: NaN,
    }),
    items,
  );
  assert.deepEqual(
    updateCart(items, { type: 'add', productId: 'unknown' }),
    items,
  );
  assert.equal(
    updateCart(items, { type: 'add', productId: 'pet-001' })[0].quantity,
    MAX_QUANTITY,
  );
});

test('salva antes da navegação e restaura em uma nova instância, inclusive remoção', () => {
  const values = new Map<string, string>();
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
  };
  const home = createCartStore(() => storage);
  home.dispatch({ type: 'add', productId: 'pet-001' });
  const shop = createCartStore(() => storage);
  const unsubscribe = shop.subscribe(() => {});
  assert.equal(shop.getSnapshot().items[0].quantity, 1);
  shop.dispatch({ type: 'add', productId: 'pet-019' });
  assert.equal(readCart(values.get(CART_KEY)!).length, 2);
  shop.dispatch({ type: 'remove', productId: 'pet-001' });
  const reload = createCartStore(() => storage);
  reload.subscribe(() => {});
  assert.deepEqual(reload.getSnapshot().items, [
    { productId: 'pet-019', quantity: 1 },
  ]);
  assert.deepEqual(reload.getServerSnapshot().items, []);
  unsubscribe();
});

test('storage indisponível mantém ações em memória e informa a limitação', () => {
  const store = createCartStore(() => {
    throw new Error('denied');
  });
  store.subscribe(() => {});
  store.dispatch({ type: 'add', productId: 'pet-007' });
  assert.equal(store.getSnapshot().items[0].quantity, 1);
  assert.equal(store.getSnapshot().storageAvailable, false);
  store.dispatch({ type: 'remove', productId: 'pet-007' });
  assert.deepEqual(store.getSnapshot().items, []);
});

test('alterações de outra aba atualizam o mesmo estado observado', () => {
  const store = createCartStore(() => null);
  let notifications = 0;
  const unsubscribe = store.subscribe(() => {
    notifications++;
  });
  store.sync(serializeCart([{ productId: 'pet-013', quantity: 3 }]));
  assert.equal(cartTotals(store.getSnapshot().items).totalCents, 13470);
  assert.equal(notifications, 1);
  store.sync(null);
  assert.deepEqual(store.getSnapshot().items, []);
  unsubscribe();
});

test('limpar remove todos os produtos e persiste o carrinho vazio após reload', () => {
  const values = new Map<string, string>();
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
  };
  const store = createCartStore(() => storage);
  store.dispatch({ type: 'add', productId: 'pet-001' });
  store.dispatch({ type: 'add', productId: 'pet-019' });
  store.dispatch({ type: 'clear' });
  assert.deepEqual(cartTotals(store.getSnapshot().items), {
    count: 0,
    totalCents: 0,
  });
  const restored = createCartStore(() => storage);
  restored.subscribe(() => {});
  assert.deepEqual(restored.getSnapshot().items, []);
  assert.deepEqual(readCart(values.get(CART_KEY)!), []);
});
