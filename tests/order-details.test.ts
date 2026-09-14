import test from 'node:test';
import assert from 'node:assert/strict';
import { cashCents, changeError } from '../lib/order-details.ts';
import { cartMessage } from '../lib/whatsapp.ts';
test('change validates decimal currency and discounted total', () => {
  assert.equal(cashCents('100,50'), 10050);
  assert.equal(cashCents('100.5'), 10050);
  for (const invalid of ['', '-1', '10,123', 'abc', 'Infinity'])
    assert.equal(cashCents(invalid), null);
  assert.ok(
    changeError({ notes: '', needsChange: true, cashAmount: '47' }, 4750),
  );
  assert.equal(
    changeError({ notes: '', needsChange: true, cashAmount: '47,50' }, 4750),
    null,
  );
});
test('WhatsApp includes notes and change only for cash', () => {
  const items = [{ productId: 'pet-001-3kg', quantity: 2 }];
  const details = {
    notes: 'Prefiro embalagem fechada.\nAvise se faltar.',
    needsChange: true,
    cashAmount: '100',
  };
  const cash = cartMessage(items, 'cash', details);
  assert.ok(
    cash.includes('Observações: Prefiro embalagem fechada.\nAvise se faltar.'),
  );
  assert.ok(cash.includes('Troco previsto: R$ 14,69'));
  assert.ok(!cartMessage(items, 'pix', details).includes('Troco para'));
  assert.ok(
    cartMessage(items, 'cash', { ...details, needsChange: false }).includes(
      'Não preciso de troco.',
    ),
  );
});
