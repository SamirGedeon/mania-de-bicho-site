import { CategoryPage } from '@/components/shop/category-page';
export const metadata = {
  title: 'Brinquedos para pets | Mania de Bicho',
  description:
    'Explore nosso catálogo demonstrativo de brinquedos para pets e monte seu carrinho.',
};
export default function Page() {
  return <CategoryPage slug="brinquedos" />;
}
