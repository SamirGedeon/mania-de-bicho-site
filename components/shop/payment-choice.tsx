'use client';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  paymentMethods,
  selectedPaymentTotal,
  paymentRules,
} from '@/lib/payments';
import type { PaymentMethod } from '@/lib/payments';
import { formatPrice } from '@/data/products';
export function PaymentChoice({
  value,
  onChange,
  totalCents,
}: {
  value: PaymentMethod | null;
  onChange: (value: PaymentMethod) => void;
  totalCents: number;
}) {
  const selected = value ? selectedPaymentTotal(totalCents, value) : null;
  return (
    <section className="payment-choice">
      <h3 id="payment-choice-title">Como você prefere pagar?</h3>
      <RadioGroup
        aria-labelledby="payment-choice-title"
        value={value ?? ''}
        onValueChange={(next) => {
          if (typeof next === 'string' && next in paymentMethods)
            onChange(next as PaymentMethod);
        }}
        className="payment-choice-grid"
      >
        {(Object.keys(paymentMethods) as PaymentMethod[]).map((method) => (
          <label key={method} className="payment-choice-option">
            <RadioGroupItem value={method} />
            <span>{paymentMethods[method]}</span>
          </label>
        ))}
      </RadioGroup>
      <div aria-live="polite">
        {selected && value ? (
          <>
            <p>
              Total com {paymentMethods[value]}:{' '}
              <strong>{formatPrice(selected.totalCents)}</strong>
            </p>
            {selected.discountCents > 0 ? (
              <p>
                5% de desconto aplicado. Economia de{' '}
                {formatPrice(selected.discountCents)}.
              </p>
            ) : (
              <p>Sem desconto nesta opção ou valor de compra.</p>
            )}
            {value === 'credit' && (
              <p>
                {totalCents >= paymentRules.installmentMinimumCents
                  ? 'Parcelamento disponível. Consulte número de parcelas e juros com a loja.'
                  : 'Parcelamento disponível em compras a partir de R$ 80,00.'}
              </p>
            )}
          </>
        ) : (
          <p>Escolha uma opção para enviar seu carrinho pelo WhatsApp.</p>
        )}
      </div>
    </section>
  );
}
