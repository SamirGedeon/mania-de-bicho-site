import { formatPrice } from '@/data/products';
import { paymentTotals, paymentRules } from '@/lib/payments';
export function PaymentSummary({
  totalCents,
  progress = false,
}: {
  totalCents: number;
  progress?: boolean;
}) {
  const totals = paymentTotals(totalCents);
  if (totalCents <= 0) return null;
  return (
    <section
      className="payment-summary"
      aria-label="Valores por forma de pagamento"
      aria-live="polite"
    >
      {progress && (
        <>
          <strong>
            {totals.discountCents > 0
              ? 'Desconto liberado!'
              : `Faltam ${formatPrice(paymentRules.discountMinimumCents - totalCents)} para ganhar 5% no Pix ou dinheiro.`}
          </strong>
          <progress
            className="discount-progress"
            aria-label="Progresso para o desconto"
            max={paymentRules.discountMinimumCents}
            value={Math.min(totalCents, paymentRules.discountMinimumCents)}
          />
        </>
      )}
      {totals.discountCents > 0 ? (
        <>
          <p>
            Economize {formatPrice(totals.discountCents)} (
            {paymentRules.discountPercent}%) no Pix ou dinheiro.
          </p>
          <p>
            <span>Total no Pix ou dinheiro</span>{' '}
            <strong>{formatPrice(totals.cashTotalCents)}</strong>
          </p>
          <p>No débito ou crédito: {formatPrice(totalCents)}.</p>
        </>
      ) : (
        <p>
          {paymentRules.discountPercent}% de desconto no Pix ou dinheiro quando
          a soma dos produtos atingir{' '}
          {formatPrice(paymentRules.discountMinimumCents)}.
        </p>
      )}
      {totals.installmentEligible && (
        <p>
          Parcelamento no crédito disponível. Consulte a loja sobre número de
          parcelas e juros.
        </p>
      )}
    </section>
  );
}
