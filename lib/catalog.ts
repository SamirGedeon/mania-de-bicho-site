import type { Product } from '../data/products.ts';

export const normalizeSearch = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim();
export type CatalogFilters = {
  query: string;
  brand: string;
  petSize: string;
  lifeStage: string;
  maxPrice: string;
  sort: string;
};
export const emptyFilters: CatalogFilters = {
  query: '',
  brand: '',
  petSize: '',
  lifeStage: '',
  maxPrice: '',
  sort: 'default',
};
export function filterProducts(source: Product[], filters: CatalogFilters) {
  const terms = normalizeSearch(filters.query).split(/\s+/).filter(Boolean);
  const price = Number(filters.maxPrice.replace(',', '.'));
  const result = source.filter((p) => {
    const haystack = normalizeSearch(
      `${p.name} ${p.brand} ${p.size} ${p.description}`,
    );
    return (
      terms.every((term) => haystack.includes(term)) &&
      (!filters.brand || p.brand === filters.brand) &&
      (!filters.petSize || p.petSizes.includes(filters.petSize)) &&
      (!filters.lifeStage || p.lifeStages.includes(filters.lifeStage)) &&
      (!filters.maxPrice ||
        !Number.isFinite(price) ||
        p.priceCents <= Math.max(0, Math.round(price * 100)))
    );
  });
  if (filters.sort === 'price-asc')
    result.sort((a, b) => a.priceCents - b.priceCents);
  if (filters.sort === 'price-desc')
    result.sort((a, b) => b.priceCents - a.priceCents);
  return result;
}
