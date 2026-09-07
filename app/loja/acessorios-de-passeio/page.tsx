import { CategoryPage } from '@/components/shop/category-page';
export const metadata = {
  title: 'Acessórios de passeio | Mania de Bicho',
  description:
    'Explore nosso catálogo demonstrativo de acessórios de passeio e monte seu carrinho.',
};
export default function Page() {
  return <CategoryPage slug="acessorios-de-passeio" />;
}
