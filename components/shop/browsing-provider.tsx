'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from 'react';
import { BROWSING_KEY, createBrowsingStore } from '@/lib/browsing-store';
import type { BrowsingAction } from '@/lib/browsing-store';
type Value = {
  favorites: string[];
  recent: string[];
  ready: boolean;
  storageAvailable: boolean;
  dispatch: (action: BrowsingAction) => void;
};
const Context = createContext<Value | null>(null);
export function useBrowsing() {
  const value = useContext(Context);
  if (!value) throw new Error('BrowsingProvider necessário');
  return value;
}
export function BrowsingProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(() =>
    createBrowsingStore(() =>
      typeof window === 'undefined' ? null : window.localStorage,
    ),
  );
  const snapshot = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === BROWSING_KEY || event.key === null)
        store.sync(event.newValue);
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, [store]);
  return (
    <Context.Provider value={{ ...snapshot, dispatch: store.dispatch }}>
      {children}
    </Context.Provider>
  );
}
