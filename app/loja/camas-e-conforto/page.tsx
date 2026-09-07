import { CategoryPage } from '@/components/shop/category-page';
export const metadata = {
  title: 'Camas e conforto | Mania de Bicho',
  description:
    'Explore nosso catálogo demonstrativo de camas e conforto e monte seu carrinho.',
};
export default function Page() {
  return <CategoryPage slug="camas-e-conforto" />;
}
