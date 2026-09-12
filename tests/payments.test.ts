import test from 'node:test';
import assert from 'node:assert/strict';
import {
  paymentTotals,
  selectedPaymentTotal,
  paymentMethods,
} from '../lib/payments.ts';
import type { PaymentMethod } from '../lib/payments.ts';
import { cartTotals } from '../lib/cart.ts';
import { productById, formatPrice } from '../data/products.ts';
import { cartMessage } from '../lib/whatsapp.ts';
test('chosen payment applies discount only to Pix and cash and matches WhatsApp', () => {
  const items = [{ productId: 'pet-001', quantity: 1 }];
  const total = cartTotals(items).totalCents;
  for (const method of Object.keys(paymentMethods) as PaymentMethod[]) {
    const result = selectedPaymentTotal(total, method);
    assert.equal(
      result.discountCents,
      method === 'pix' || method === 'cash'
        ? paymentTotals(total).discountCents
        : 0,
    );
    const message = cartMessage(items, method);
    assert.ok(
      message.includes(`Forma de pagamento: ${paymentMethods[method]}.`),
    );
    assert.ok(
      message.includes(
        `Total no pagamento escolhido: ${formatPrice(result.totalCents)}.`,
      ),
    );
    assert.equal(
      message.includes('Parcelamento no crédito disponível'),
      method === 'credit',
    );
    assert.equal(selectedPaymentTotal(4999, method).totalCents, 4999);
  }
  assert.equal(selectedPaymentTotal(5000, 'pix').totalCents, 4750);
  assert.equal(selectedPaymentTotal(5000, 'debit').totalCents, 5000);
});

test('5% starts at R$50; credit installments start at R$80 before any cash discount', () => {
  assert.deepEqual(paymentTotals(4999), {
    discountCents: 0,
    cashTotalCents: 4999,
    installmentEligible: false,
  });
  assert.deepEqual(paymentTotals(5000), {
    discountCents: 250,
    cashTotalCents: 4750,
    installmentEligible: false,
  });
  assert.equal(paymentTotals(7999).installmentEligible, false);
  assert.deepEqual(paymentTotals(8000), {
    discountCents: 400,
    cashTotalCents: 7600,
    installmentEligible: true,
  });
  assert.equal(paymentTotals(5010).discountCents, 251);
  assert.equal(paymentTotals(0).discountCents, 0);
});
test('combined quantities qualify and WhatsApp uses the same discount calculation', () => {
  const product = [...productById.values()].find((p) => p.priceCents < 5000)!;
  const quantity = Math.ceil(5000 / product.priceCents);
  const items = [{ productId: product.id, quantity }];
  const totals = paymentTotals(cartTotals(items).totalCents);
  assert.ok(totals.discountCents > 0);
  assert.ok(
    cartMessage(items).includes(
      `No Pix ou dinheiro: ${formatPrice(totals.cashTotalCents)}`,
    ),
  );
  assert.equal(paymentTotals(product.priceCents).discountCents, 0);
});
