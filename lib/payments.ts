export const paymentRules = {
  discountPercent: 5,
  discountMinimumCents: 5000,
  installmentMinimumCents: 8000,
} as const;
export const paymentMethods = {
  pix: 'Pix',
  cash: 'Dinheiro',
  debit: 'Cartão de débito',
  credit: 'Cartão de crédito',
} as const;
export type PaymentMethod = keyof typeof paymentMethods;
export function selectedPaymentTotal(
  totalCents: number,
  method: PaymentMethod,
) {
  const totals = paymentTotals(totalCents);
  const discountCents =
    method === 'pix' || method === 'cash' ? totals.discountCents : 0;
  return { discountCents, totalCents: totalCents - discountCents };
}

// O mínimo considera a soma dos produtos antes do desconto.
export function paymentTotals(totalCents: number) {
  const subtotal =
    Number.isSafeInteger(totalCents) && totalCents > 0 ? totalCents : 0;
  const discountCents =
    subtotal >= paymentRules.discountMinimumCents
      ? Math.round((subtotal * paymentRules.discountPercent) / 100)
      : 0;
  return {
    discountCents,
    cashTotalCents: subtotal - discountCents,
    installmentEligible: subtotal >= paymentRules.installmentMinimumCents,
  };
}
