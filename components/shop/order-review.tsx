'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import type { CartItem } from '@/lib/cart';
import type { PaymentMethod } from '@/lib/payments';
import { paymentMethods, selectedPaymentTotal } from '@/lib/payments';
import { cashCents, changeError } from '@/lib/order-details';
import { cartMessage, whatsappHref } from '@/lib/whatsapp';
import { storeInfo } from '@/data/store';
import { productById, formatPrice } from '@/data/products';
export function OrderReview({
  items,
  method,
  totalCents,
  onSend,
}: {
  items: CartItem[];
  method: PaymentMethod | null;
  totalCents: number;
  onSend: () => void;
}) {
  const [notes, setNotes] = useState('');
  const [needsChange, setNeedsChange] = useState(false);
  const [cashAmount, setCashAmount] = useState('');
  const [open, setOpen] = useState(false);
  const details = { notes, needsChange, cashAmount };
  const selected = method ? selectedPaymentTotal(totalCents, method) : null;
  const error =
    method === 'cash' && selected
      ? changeError(details, selected.totalCents)
      : null;
  const href =
    method && !error && items.length
      ? whatsappHref(storeInfo.whatsapp, cartMessage(items, method, details))
      : null;
  return (
    <section className="order-details">
      <label htmlFor="order-notes">Observações do pedido (opcional)</label>
      <Textarea
        id="order-notes"
        value={notes}
        maxLength={500}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Ex.: prefiro a caminha azul; se não tiver esta marca, me avise."
      />
      <small>{notes.length}/500 caracteres</small>
      {method === 'cash' && (
        <div className="cash-details">
          <h3 id="cash-question">Precisa de troco?</h3>
          <RadioGroup
            aria-labelledby="cash-question"
            value={needsChange ? 'yes' : 'no'}
            onValueChange={(v) => setNeedsChange(v === 'yes')}
          >
            <label>
              <RadioGroupItem value="no" />
              Não preciso
            </label>
            <label>
              <RadioGroupItem value="yes" />
              Sim
            </label>
          </RadioGroup>
          {needsChange && (
            <>
              <label htmlFor="cash-amount">Vou pagar com (R$)</label>
              <Input
                id="cash-amount"
                inputMode="decimal"
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value)}
                placeholder="Ex.: 100,00"
                aria-invalid={!!error}
                aria-describedby="cash-feedback"
              />
              <p id="cash-feedback" role="status">
                {error ||
                  `Troco previsto: ${formatPrice(cashCents(cashAmount)! - selected!.totalCents)}`}
              </p>
            </>
          )}
        </div>
      )}
      <Button
        className="pill cta"
        disabled={!href}
        onClick={() => setOpen(true)}
      >
        {method ? 'Revisar pedido' : 'Escolha a forma de pagamento'}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="order-review-dialog" showCloseButton={false}>
          <div className="review-heading">
            <DialogTitle>Revise seu pedido</DialogTitle>
            <DialogClose
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Fechar revisão"
                />
              }
            >
              <X />
            </DialogClose>
          </div>
          <DialogDescription>
            Confira os itens e o pagamento antes de abrir o WhatsApp.
          </DialogDescription>
          <ul className="review-items">
            {items.map((item) => {
              const p = productById.get(item.productId)!;
              return (
                <li key={p.id}>
                  <img src={p.image} alt={p.imageAlt} width={64} height={64} />
                  <div>
                    <strong>{p.name}</strong>
                    <p>
                      {p.size} · {item.quantity} × {formatPrice(p.priceCents)}
                    </p>
                    <p>Subtotal: {formatPrice(item.quantity * p.priceCents)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          {selected && method && (
            <div>
              <p>
                Pagamento: <strong>{paymentMethods[method]}</strong>
              </p>
              <p>Produtos: {formatPrice(totalCents)}</p>
              {selected.discountCents > 0 && (
                <p>Desconto: {formatPrice(selected.discountCents)}</p>
              )}
              <p>
                Total: <strong>{formatPrice(selected.totalCents)}</strong>
              </p>
              {method === 'cash' && (
                <p>
                  {needsChange && !error
                    ? `Troco para ${formatPrice(cashCents(cashAmount)!)}: ${formatPrice(cashCents(cashAmount)! - selected.totalCents)}`
                    : error || 'Não precisa de troco.'}
                </p>
              )}
            </div>
          )}
          <p className="review-notes">
            Observações: {notes.trim() || 'Nenhuma.'}
          </p>
          {items.some(
            (i) => productById.get(i.productId)?.availability === 'demo',
          ) && <p>Catálogo demonstrativo. Produtos e valores ilustrativos.</p>}
          <p>A compra e a disponibilidade serão confirmadas pela loja.</p>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Voltar e corrigir
          </Button>
          {href ? (
            <a
              className="pill cta"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onSend}
            >
              Abrir WhatsApp com o pedido ↗
            </a>
          ) : (
            <p>Volte para corrigir os dados do pedido.</p>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
