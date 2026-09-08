import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  BROWSING_KEY,
  createBrowsingStore,
  readBrowsing,
  updateBrowsing,
} from '../lib/browsing-store.ts';
import { products, productById } from '../data/products.ts';
import { productQuestion, whatsappHref } from '../lib/whatsapp.ts';

void test('favoritos persistem, podem ser removidos e não afetam histórico', () => {
  const values = new Map<string, string>();
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
  };
  const store = createBrowsingStore(() => storage);
  store.dispatch({ type: 'favorite', id: 'pet-001' });
  store.dispatch({ type: 'view', id: 'pet-019' });
  const next = createBrowsingStore(() => storage);
  next.subscribe(() => {});
  assert.deepEqual(next.getSnapshot().favorites, ['pet-001']);
  next.dispatch({ type: 'favorite', id: 'pet-001' });
  assert.deepEqual(readBrowsing(values.get(BROWSING_KEY)!).favorites, []);
  assert.deepEqual(next.getSnapshot().recent, ['pet-019']);
  assert.equal(next.getServerSnapshot().ready, false);
});
void test('histórico mantém oito IDs únicos, mais recente primeiro, e permite limpeza', () => {
  let data = { favorites: ['pet-001'], recent: [] as string[] };
  for (const product of products)
    data = updateBrowsing(data, { type: 'view', id: product.id });
  assert.equal(data.recent.length, 8);
  data = updateBrowsing(data, { type: 'view', id: 'pet-020' });
  assert.equal(data.recent[0], 'pet-020');
  assert.equal(new Set(data.recent).size, 8);
  assert.deepEqual(updateBrowsing(data, { type: 'clear-recent' }), {
    favorites: ['pet-001'],
    recent: [],
  });
});
void test('dados inválidos são descartados e falha de storage mantém funcionamento', () => {
  assert.deepEqual(readBrowsing('{bad'), { favorites: [], recent: [] });
  assert.deepEqual(
    readBrowsing(
      JSON.stringify({
        version: 1,
        favorites: ['unknown', 'pet-001', 'pet-001', 2],
        recent: null,
      }),
    ),
    { favorites: ['pet-001'], recent: [] },
  );
  const store = createBrowsingStore(() => {
    throw Error('blocked');
  });
  store.dispatch({ type: 'favorite', id: 'pet-001' });
  assert.equal(store.getSnapshot().storageAvailable, false);
  assert.deepEqual(store.getSnapshot().favorites, ['pet-001']);
  store.sync(
    JSON.stringify({ version: 1, favorites: ['pet-002'], recent: [] }),
  );
  assert.deepEqual(store.getSnapshot().favorites, ['pet-002']);
});
void test('atalhos de espécie não misturam rações de cães e gatos', () => {
  const dogs = products.filter((p) => p.petTypes.includes('dog'));
  const cats = products.filter((p) => p.petTypes.includes('cat'));
  assert.ok(dogs.length > 0 && cats.length > 0);
  assert.ok(!dogs.some((p) => p.id === 'pet-005'));
  assert.ok(!cats.some((p) => p.id === 'pet-001'));
  assert.ok(cats.some((p) => p.category === 'camas-e-conforto'));
});
void test('pergunta pelo WhatsApp inclui produto, marca, tamanho e aviso de demonstração', () => {
  const p = productById.get('pet-001')!;
  const message = productQuestion(p);
  for (const text of [p.name, p.brand, p.size, p.id, 'demonstrativo'])
    assert.ok(message.includes(text));
  assert.equal(
    new URL(whatsappHref('5524981296449', message)!).searchParams.get('text'),
    message,
  );
});
