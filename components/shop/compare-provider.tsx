'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { Scale, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import {
  productById,
  productHref,
  formatPrice,
  availabilityLabel,
} from '@/data/products';
const KEY = 'mania-de-bicho:compare:v1';
const Context = createContext<{
  ids: string[];
  ready: boolean;
  toggle: (id: string) => void;
} | null>(null);
export function CompareButton({ id, name }: { id: string; name: string }) {
  const value = useContext(Context);
  if (!value) return null;
  const selected = value.ids.includes(id);
  return (
    <Button
      variant="outline"
      className="compare-select"
      disabled={!value.ready || (!selected && value.ids.length === 3)}
      aria-pressed={selected}
      aria-label={`${selected ? 'Retirar da comparação' : 'Comparar'}: ${name}`}
      onClick={() => value.toggle(id)}
    >
      <Scale size={17} />
      {selected ? 'Selecionado para comparar' : 'Comparar produto'}
    </Button>
  );
}
export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(sessionStorage.getItem(KEY) || '[]');
      if (Array.isArray(saved))
        setIds(
          [
            ...new Set(
              saved.filter(
                (id): id is string =>
                  typeof id === 'string' && productById.has(id),
              ),
            ),
          ].slice(0, 3),
        );
    } catch {
      /* A comparação funciona em memória quando o armazenamento está bloqueado. */
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      try {
        sessionStorage.setItem(KEY, JSON.stringify(ids));
      } catch {
        /* Armazenamento opcional. */
      }
    }
  }, [ids, ready]);
  const toggle = (id: string) =>
    setIds((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : current.length < 3 && productById.has(id)
          ? [...current, id]
          : current,
    );
  const selected = ids.map((id) => productById.get(id)!);
  return (
    <Context.Provider value={{ ids, ready, toggle }}>
      {children}
      {ids.length > 0 && (
        <aside className="compare-bar" aria-label="Produtos para comparar">
          <span aria-live="polite">
            {ids.length}/3 selecionados
            {ids.length === 1 ? ' · Escolha mais um' : ''}
          </span>
          <Button
            className="pill cta"
            disabled={ids.length < 2}
            onClick={() => setOpen(true)}
          >
            <Scale size={17} />
            Comparar
          </Button>
          <Button variant="ghost" onClick={() => setIds([])}>
            Limpar
          </Button>
        </aside>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="compare-dialog" showCloseButton={false}>
          <div className="compare-heading">
            <DialogTitle>Compare os produtos</DialogTitle>
            <DialogClose
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Fechar comparação"
                />
              }
            >
              <X />
            </DialogClose>
          </div>
          <DialogDescription>
            Confira as diferenças antes de escolher. No celular, deslize a
            tabela para os lados.
          </DialogDescription>
          {selected.length ? (
            <div
              className="compare-scroll"
              tabIndex={0}
              role="region"
              aria-label="Tabela de comparação"
            >
              <table className="compare-table">
                <thead>
                  <tr>
                    <th scope="col">Produto</th>
                    {selected.map((p) => (
                      <th scope="col" key={p.id}>
                        <img
                          src={p.image}
                          alt={p.imageAlt}
                          width={180}
                          height={150}
                        />
                        <a href={productHref(p.id)}>{p.name}</a>
                        <Button
                          variant="ghost"
                          onClick={() => toggle(p.id)}
                          aria-label={`Retirar ${p.name} da comparação`}
                        >
                          Remover
                        </Button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Preço</th>
                    {selected.map((p) => (
                      <td key={p.id}>
                        <strong>{formatPrice(p.priceCents)}</strong>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Marca</th>
                    {selected.map((p) => (
                      <td key={p.id}>{p.brand}</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Peso / tamanho</th>
                    {selected.map((p) => (
                      <td key={p.id}>{p.size}</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Descrição</th>
                    {selected.map((p) => (
                      <td key={p.id}>{p.description}</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Disponibilidade</th>
                    {selected.map((p) => (
                      <td key={p.id}>{availabilityLabel(p)}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p>
              Nenhum produto selecionado. Feche e escolha outros produtos na
              loja.
            </p>
          )}
          {selected.some((p) => p.availability === 'demo') && (
            <p className="demo-note">
              Produtos e preços demonstrativos. Consulte as opções reais com a
              loja.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </Context.Provider>
  );
}
