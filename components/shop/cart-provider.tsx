/* oxlint-disable next/no-img-element, next/no-html-link-for-pages */
'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { productById, formatPrice } from '@/data/products';
import { CART_KEY, MAX_QUANTITY, cartTotals } from '@/lib/cart';
import type { CartAction, CartItem } from '@/lib/cart';
import { createCartStore } from '@/lib/cart-store';

type CartContextValue = {
  items: CartItem[];
  count: number;
  totalCents: number;
  ready: boolean;
  openCart: () => void;
  addItem: (id: string) => void;
  dispatch: (action: CartAction) => void;
};
const CartContext = createContext<CartContextValue | null>(null);
export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('Carrinho requer CartProvider');
  return value;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(() =>
    createCartStore(() =>
      typeof window === 'undefined' ? null : window.localStorage,
    ),
  );
  const { items, ready, storageAvailable } = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  const [open, setOpen] = useState(false);
  const { count, totalCents } = cartTotals(items);
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === CART_KEY || event.key === null)
        store.sync(event.newValue);
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, [store]);
  function addItem(productId: string) {
    store.dispatch({ type: 'add', productId });
    setOpen(true);
  }
  return (
    <CartContext.Provider
      value={{
        items,
        ready,
        count,
        totalCents,
        openCart: () => setOpen(true),
        addItem,
        dispatch: store.dispatch,
      }}
    >
      {children}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="cart-drawer" showCloseButton={false}>
          <div className="cart-heading">
            <div>
              <SheetTitle>
                Seu carrinho <span>({count})</span>
              </SheetTitle>
              <SheetDescription>Seus favoritos, todos juntos.</SheetDescription>
            </div>
            <SheetClose
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Fechar carrinho"
                />
              }
            >
              <X size={21} />
            </SheetClose>
          </div>
          {!items.length ? (
            <div className="cart-empty">
              <ShoppingBag size={44} strokeWidth={1.3} />
              <h2>Seu carrinho está vazio</h2>
              <p>
                Explore as categorias e encontre algo especial para seu pet.
              </p>
              <a
                className="pill cta"
                href="/loja/#categorias"
                onClick={() => setOpen(false)}
              >
                Explorar produtos
              </a>
            </div>
          ) : (
            <>
              <ul className="cart-items">
                {items.map((item) => {
                  const product = productById.get(item.productId)!;
                  return (
                    <li className="cart-item" key={item.productId}>
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        width={88}
                        height={88}
                      />
                      <div className="cart-item-info">
                        <span className="product-brand">{product.brand}</span>
                        <h3>{product.name}</h3>
                        <p>{product.size}</p>
                        <p>{formatPrice(product.priceCents)} / unidade</p>
                        <div className="cart-item-controls">
                          <div className="quantity-control">
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label={`Diminuir quantidade de ${product.name}`}
                              disabled={item.quantity <= 1}
                              onClick={() =>
                                store.dispatch({
                                  type: 'quantity',
                                  productId: item.productId,
                                  quantity: item.quantity - 1,
                                })
                              }
                            >
                              <Minus size={16} />
                            </Button>
                            <span aria-label={`Quantidade de ${product.name}`}>
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label={`Aumentar quantidade de ${product.name}`}
                              disabled={item.quantity >= MAX_QUANTITY}
                              onClick={() =>
                                store.dispatch({
                                  type: 'quantity',
                                  productId: item.productId,
                                  quantity: item.quantity + 1,
                                })
                              }
                            >
                              <Plus size={16} />
                            </Button>
                          </div>
                          <Button
                            className="remove-item"
                            variant="ghost"
                            size="icon"
                            aria-label={`Remover ${product.name}`}
                            onClick={() =>
                              store.dispatch({
                                type: 'remove',
                                productId: item.productId,
                              })
                            }
                          >
                            <Trash2 size={17} />
                          </Button>
                        </div>
                        <p className="item-subtotal">
                          Subtotal{' '}
                          <strong>
                            {formatPrice(product.priceCents * item.quantity)}
                          </strong>
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="cart-summary">
                <div>
                  <span>Total dos produtos</span>
                  <strong>{formatPrice(totalCents)}</strong>
                </div>
                <p>Catálogo demonstrativo. Sem cobrança ou pagamento.</p>
                <Button className="pill cta" onClick={() => setOpen(false)}>
                  Continuar escolhendo
                </Button>
              </div>
            </>
          )}
          {!storageAvailable && (
            <output className="storage-notice">
              Este navegador não permitiu salvar o carrinho. Os itens ficam
              disponíveis enquanto esta página estiver aberta.
            </output>
          )}
          <output className="sr-only" aria-live="polite">
            {count} itens no carrinho. Total {formatPrice(totalCents)}.
          </output>
        </SheetContent>
      </Sheet>
    </CartContext.Provider>
  );
}
