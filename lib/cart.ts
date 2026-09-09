import { productById } from '../data/products.ts';

export const CART_KEY = 'mania-de-bicho:cart:v1';
export const MAX_QUANTITY = 99;
export type CartItem = { productId: string; quantity: number };
export type CartAction =
  | { type: 'restore'; items: CartItem[] }
  | { type: 'clear' }
  | { type: 'add'; productId: string }
  | { type: 'quantity'; productId: string; quantity: number }
  | { type: 'remove'; productId: string };

export function readCart(raw: string | null): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(raw ?? 'null');
    if (
      !parsed ||
      typeof parsed !== 'object' ||
      !('version' in parsed) ||
      parsed.version !== 1 ||
      !('items' in parsed) ||
      !Array.isArray(parsed.items)
    )
      return [];
    const merged = new Map<string, number>();
    for (const item of parsed.items as unknown[]) {
      if (
        !item ||
        typeof item !== 'object' ||
        !('productId' in item) ||
        typeof item.productId !== 'string' ||
        !productById.has(item.productId) ||
        !('quantity' in item) ||
        typeof item.quantity !== 'number' ||
        !Number.isSafeInteger(item.quantity) ||
        item.quantity < 1
      )
        continue;
      merged.set(
        item.productId,
        Math.min(
          MAX_QUANTITY,
          (merged.get(item.productId) ?? 0) + item.quantity,
        ),
      );
    }
    return [...merged].map(([productId, quantity]) => ({
      productId,
      quantity,
    }));
  } catch {
    return [];
  }
}

export function updateCart(items: CartItem[], action: CartAction): CartItem[] {
  if (action.type === 'restore')
    return readCart(serializeCart([...items, ...action.items]));
  if (action.type === 'clear') return [];
  if (!productById.has(action.productId)) return items;
  if (action.type === 'remove')
    return items.filter((item) => item.productId !== action.productId);
  const current = items.find((item) => item.productId === action.productId);
  if (
    productById.get(action.productId)?.availability === 'unavailable' &&
    (action.type === 'add' || action.quantity > (current?.quantity ?? 0))
  )
    return items;
  const quantity =
    action.type === 'add' ? (current?.quantity ?? 0) + 1 : action.quantity;
  if (!Number.isSafeInteger(quantity) || quantity < 0) return items;
  if (quantity === 0)
    return items.filter((item) => item.productId !== action.productId);
  const next = {
    productId: action.productId,
    quantity: Math.min(quantity, MAX_QUANTITY),
  };
  return current
    ? items.map((item) => (item.productId === action.productId ? next : item))
    : [...items, next];
}

export function cartTotals(items: CartItem[]) {
  return items.reduce(
    (total, item) => {
      const product = productById.get(item.productId);
      if (product) {
        total.count += item.quantity;
        total.totalCents += product.priceCents * item.quantity;
      }
      return total;
    },
    { count: 0, totalCents: 0 },
  );
}

export function serializeCart(items: CartItem[]) {
  return JSON.stringify({ version: 1, items });
}
