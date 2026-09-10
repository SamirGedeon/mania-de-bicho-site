import { CreditCard, Banknote, QrCode } from 'lucide-react';
import { paymentRules } from '@/lib/payments';
import { formatPrice } from '@/data/products';
export function PaymentInfo() {
  return (
    <section className="payment-info" aria-label="Formas de pagamento">
      <strong>Formas de pagamento na loja</strong>
      <ul>
        <li>
          <QrCode size={18} />
          Pix
        </li>
        <li>
          <Banknote size={18} />
          Dinheiro
        </li>
        <li>
          <CreditCard size={18} />
          Débito e crédito
        </li>
      </ul>
      <p>
        {paymentRules.discountPercent}% de desconto no Pix ou dinheiro em
        compras a partir de {formatPrice(paymentRules.discountMinimumCents)}, em
        um produto ou na soma deles.
      </p>
      <p>
        Parcelamento no crédito em compras a partir de{' '}
        {formatPrice(paymentRules.installmentMinimumCents)}. Consulte a loja
        sobre número de parcelas e juros.
      </p>
    </section>
  );
}
