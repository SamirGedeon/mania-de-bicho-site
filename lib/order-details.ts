export type OrderDetails = {
  notes: string;
  needsChange: boolean;
  cashAmount: string;
};
export function cashCents(value: string): number | null {
  const normalized = value.trim().replace(',', '.');
  if (!/^\d{1,7}(\.\d{1,2})?$/.test(normalized)) return null;
  return Math.round(Number(normalized) * 100);
}
export function changeError(details: OrderDetails, totalCents: number) {
  if (!details.needsChange) return null;
  const amount = cashCents(details.cashAmount);
  return amount === null
    ? 'Informe um valor válido, por exemplo 100,00.'
    : amount < totalCents
      ? 'O valor entregue precisa ser igual ou maior que o total.'
      : null;
}
