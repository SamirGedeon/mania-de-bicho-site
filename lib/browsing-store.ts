import { productById } from '../data/products.ts';
export const BROWSING_KEY = 'mania-de-bicho:browsing:v1';
export type BrowsingData = { favorites: string[]; recent: string[] };
export type BrowsingAction =
  | { type: 'favorite' | 'view'; id: string }
  | { type: 'clear-recent' };
const emptyData: BrowsingData = { favorites: [], recent: [] };
export function readBrowsing(raw: string | null): BrowsingData {
  try {
    const value = JSON.parse(raw ?? 'null');
    if (value?.version !== 1) return { ...emptyData };
    const ids = (list: unknown, limit: number) =>
      Array.isArray(list)
        ? [
            ...new Set(
              list.filter(
                (id): id is string =>
                  typeof id === 'string' && productById.has(id),
              ),
            ),
          ].slice(0, limit)
        : [];
    return {
      favorites: ids(value.favorites, productById.size),
      recent: ids(value.recent, 8),
    };
  } catch {
    return { ...emptyData };
  }
}
export function updateBrowsing(
  data: BrowsingData,
  action: BrowsingAction,
): BrowsingData {
  if (action.type === 'clear-recent') return { ...data, recent: [] };
  if (!productById.has(action.id)) return data;
  if (action.type === 'view')
    return {
      ...data,
      recent: [
        action.id,
        ...data.recent.filter((id) => id !== action.id),
      ].slice(0, 8),
    };
  return {
    ...data,
    favorites: data.favorites.includes(action.id)
      ? data.favorites.filter((id) => id !== action.id)
      : [...data.favorites, action.id],
  };
}
export function createBrowsingStore(
  getStorage: () => Pick<Storage, 'getItem' | 'setItem'> | null,
) {
  const initial = { ...emptyData, ready: false, storageAvailable: true };
  let snapshot = initial;
  const listeners = new Set<() => void>();
  const notify = () => listeners.forEach((listener) => listener());
  function restore() {
    if (snapshot.ready) return;
    try {
      const storage = getStorage();
      snapshot = {
        ...readBrowsing(storage?.getItem(BROWSING_KEY) ?? null),
        ready: true,
        storageAvailable: !!storage,
      };
    } catch {
      snapshot = { ...emptyData, ready: true, storageAvailable: false };
    }
  }
  return {
    getSnapshot: () => snapshot,
    getServerSnapshot: () => initial,
    subscribe(this: void, listener: () => void) {
      restore();
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    dispatch(this: void, action: BrowsingAction) {
      restore();
      const data = updateBrowsing(snapshot, action);
      let storageAvailable = true;
      try {
        const storage = getStorage();
        storage?.setItem(
          BROWSING_KEY,
          JSON.stringify({
            version: 1,
            favorites: data.favorites,
            recent: data.recent,
          }),
        );
        storageAvailable = !!storage;
      } catch {
        storageAvailable = false;
      }
      snapshot = { ...data, ready: true, storageAvailable };
      notify();
    },
    sync(this: void, raw: string | null) {
      snapshot = {
        ...readBrowsing(raw),
        ready: true,
        storageAvailable: snapshot.storageAvailable,
      };
      notify();
    },
  };
}
