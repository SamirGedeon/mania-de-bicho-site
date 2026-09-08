import { test } from 'node:test';
import assert from 'node:assert/strict';
import { products } from '../data/products.ts';
import { emptyFilters, filterProducts } from '../lib/catalog.ts';
import { cartMessage, whatsappHref } from '../lib/whatsapp.ts';

void test('busca ignora acentos e combina marca, fase, porte e preço', () => {
  const result = filterProducts(products, {
    ...emptyFilters,
    query: 'racao frango',
    brand: 'GrãoAmigo',
    petSize: 'Pequeno',
    lifeStage: 'Adulto',
    maxPrice: '70',
  });
  assert.deepEqual(
    result.map((p) => p.id),
    ['pet-003'],
  );
  assert.equal(
    filterProducts(products, { ...emptyFilters, query: 'inexistente' }).length,
    0,
  );
});
void test('ordenação de preços não altera a ordem do catálogo', () => {
  const ids = products.map((p) => p.id);
  const sorted = filterProducts(products, {
    ...emptyFilters,
    sort: 'price-asc',
  });
  assert.ok(
    sorted.every((p, i) => i === 0 || p.priceCents >= sorted[i - 1].priceCents),
  );
  assert.deepEqual(
    products.map((p) => p.id),
    ids,
  );
  assert.ok(
    filterProducts(products, { ...emptyFilters, maxPrice: '12,90' }).every(
      (p) => p.priceCents <= 1290,
    ),
  );
});
void test('WhatsApp preserva produtos, quantidades, subtotais e total em reais', () => {
  const text = cartMessage([
    { productId: 'pet-001', quantity: 2 },
    { productId: 'pet-007', quantity: 1 },
  ]);
  assert.match(text, /2x VivaPata/);
  assert.match(text, /319,80/);
  assert.match(text, /332,70/);
  assert.match(text, /DEMONSTRATIVO/);
  const href = whatsappHref('+55 (24) 98129-6449', text)!;
  assert.equal(new URL(href).pathname, '/5524981296449');
  assert.equal(new URL(href).searchParams.get('text'), text);
  assert.equal(whatsappHref(''), null);
});
