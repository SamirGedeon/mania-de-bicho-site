import { readCart, serializeCart } from './cart.ts';
import type { CartItem } from './cart.ts';
import { productById } from '../data/products.ts';
export const REORDER_KEY = 'mania-de-bicho:last-whatsapp-cart:v1';
export const REORDER_EVENT = 'mania-de-bicho:reorder-changed';
export function reorderItems(raw: string | null) {
  return readCart(raw).filter(
    (item) => productById.get(item.productId)?.availability !== 'unavailable',
  );
}
export function saveLastBag(items: CartItem[]) {
  try {
    localStorage.setItem(REORDER_KEY, serializeCart(items));
    window.dispatchEvent(new Event(REORDER_EVENT));
    return true;
  } catch {
    return false;
  }
}
