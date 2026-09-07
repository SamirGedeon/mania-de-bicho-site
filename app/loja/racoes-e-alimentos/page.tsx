import { CategoryPage } from '@/components/shop/category-page';
export const metadata = {
  title: 'Rações e alimentos | Mania de Bicho',
  description:
    'Explore nosso catálogo demonstrativo de rações e alimentos e monte seu carrinho.',
};
export default function Page() {
  return <CategoryPage slug="racoes-e-alimentos" />;
}
