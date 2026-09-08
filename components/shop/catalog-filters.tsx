'use client';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Product } from '@/data/products';
import { emptyFilters } from '@/lib/catalog';
import type { CatalogFilters as Filters } from '@/lib/catalog';

function Choice({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="filter-field">
      <span>{label}</span>
      <Select value={value} onValueChange={(v) => onChange(v ?? '')}>
        <SelectTrigger aria-label={label}>
          <SelectValue>
            {options.find((o) => o.value === value)?.label}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
export function CatalogFilters({
  products,
  value,
  onChange,
}: {
  products: Product[];
  value: Filters;
  onChange: (value: Filters) => void;
}) {
  const update = (key: keyof Filters, next: string) =>
    onChange({ ...value, [key]: next });
  const options = (values: string[]) => [
    { value: '', label: 'Todos' },
    ...Array.from(new Set(values))
      .sort()
      .map((v) => ({ value: v, label: v })),
  ];
  return (
    <section className="catalog-filters" aria-label="Filtrar produtos">
      <label className="filter-field filter-search" htmlFor="category-query">
        Buscar nesta categoria
        <Input
          id="category-query"
          type="search"
          value={value.query}
          onChange={(e) => update('query', e.target.value)}
          placeholder="Nome, marca ou tamanho"
        />
      </label>
      <Choice
        label="Marca"
        value={value.brand}
        options={options(products.map((p) => p.brand))}
        onChange={(v) => update('brand', v)}
      />
      <Choice
        label="Porte"
        value={value.petSize}
        options={options(products.flatMap((p) => p.petSizes))}
        onChange={(v) => update('petSize', v)}
      />
      <Choice
        label="Fase da vida"
        value={value.lifeStage}
        options={options(products.flatMap((p) => p.lifeStages))}
        onChange={(v) => update('lifeStage', v)}
      />
      <label className="filter-field" htmlFor="category-price">
        Preço máximo (R$)
        <Input
          id="category-price"
          type="number"
          inputMode="decimal"
          min="0"
          step="0.01"
          placeholder="Sem limite"
          value={value.maxPrice}
          onChange={(e) => update('maxPrice', e.target.value)}
        />
      </label>
      <Choice
        label="Ordenar"
        value={value.sort}
        options={[
          { value: 'default', label: 'Ordem do catálogo' },
          { value: 'price-asc', label: 'Menor preço' },
          { value: 'price-desc', label: 'Maior preço' },
        ]}
        onChange={(v) => update('sort', v)}
      />
      <Button
        variant="ghost"
        className="clear-filters"
        onClick={() => onChange({ ...emptyFilters })}
      >
        Limpar filtros
      </Button>
    </section>
  );
}
