import { CART_KEY, readCart, serializeCart, updateCart } from './cart.ts';
import type { CartAction, CartItem } from './cart.ts';

export type CartSnapshot = {
  items: CartItem[];
  storageAvailable: boolean;
  ready: boolean;
};
const empty: CartSnapshot = { items: [], storageAvailable: true, ready: false };

// Synchronous writes keep the cart intact even when a full-page link is followed
// immediately after adding a product. SSR always uses the stable empty snapshot.
export function createCartStore(
  getStorage: () => Pick<Storage, 'getItem' | 'setItem'> | null,
) {
  let snapshot = empty;
  const listeners = new Set<() => void>();
  function notify() {
    for (const listener of listeners) listener();
  }
  function restore() {
    if (snapshot.ready) return;
    try {
      const storage = getStorage();
      snapshot = {
        items: readCart(storage?.getItem(CART_KEY) ?? null),
        storageAvailable: !!storage,
        ready: true,
      };
    } catch {
      snapshot = { items: [], storageAvailable: false, ready: true };
    }
  }
  return {
    getSnapshot: () => snapshot,
    getServerSnapshot: () => empty,
    subscribe(this: void, listener: () => void) {
      restore();
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    dispatch(this: void, action: CartAction) {
      restore();
      const items = updateCart(snapshot.items, action);
      let storageAvailable = snapshot.storageAvailable;
      try {
        const storage = getStorage();
        storage?.setItem(CART_KEY, serializeCart(items));
        storageAvailable = !!storage;
      } catch {
        storageAvailable = false;
      }
      snapshot = { items, storageAvailable, ready: true };
      notify();
    },
    sync(this: void, raw: string | null) {
      snapshot = { items: readCart(raw), storageAvailable: true, ready: true };
      notify();
    },
  };
}
