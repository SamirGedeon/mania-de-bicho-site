import { readCart, serializeCart } from './cart.ts';
import type { CartItem } from './cart.ts';
import { siteOrigin } from './product-share.ts';
export function sharedCartUrl(items: CartItem[], origin = siteOrigin) {
  return `${origin}/sacola/#${encodeURIComponent(serializeCart(readCart(serializeCart(items))))}`;
}
export function parseSharedCart(hash: string) {
  if (hash.length > 20000) return [];
  try {
    return readCart(decodeURIComponent(hash.replace(/^#/, '')));
  } catch {
    return [];
  }
}
