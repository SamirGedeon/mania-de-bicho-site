// Catálogo demonstrativo. Marcas e preços fictícios; valores em centavos de real.
// Edite este arquivo para substituir os produtos. IDs devem ser únicos e estáveis.
import { extraFoodOptions, optionGroups } from './product-options.ts';
export const categories = [
  {
    slug: 'racoes-e-alimentos',
    name: 'Rações e alimentos',
    image: 'category-food.webp',
    text: 'Alimentação para cada fase da vida.',
  },
  {
    slug: 'brinquedos',
    name: 'Brinquedos para pets',
    image: 'category-toys.webp',
    text: 'Diversão para a rotina do seu melhor amigo.',
  },
  {
    slug: 'acessorios-de-passeio',
    name: 'Acessórios de passeio',
    image: 'category-walk.webp',
    text: 'Conforto e segurança para passear juntos.',
  },
  {
    slug: 'camas-e-conforto',
    name: 'Camas e conforto',
    image: 'category-bed.webp',
    text: 'Um cantinho aconchegante para descansar.',
  },
] as const;
export type CategorySlug = (typeof categories)[number]['slug'];
export type Product = {
  id: string;
  category: CategorySlug;
  brand: string;
  petTypes: ('dog' | 'cat')[];
  name: string;
  size: string;
  priceCents: number;
  image: string;
  imageAlt: string;
  description: string;
  petSizes: string[];
  lifeStages: string[];
  availability: 'demo' | 'available' | 'unavailable';
  images?: string[];
};
export const products: Product[] = [
  {
    id: 'pet-001',
    petTypes: ['dog'],
    category: 'racoes-e-alimentos',
    brand: 'VivaPata',
    name: 'Ração para cães adultos — carne e arroz',
    size: '15 kg',
    priceCents: 15990,
    image: '/assets/category-food.webp',
    imageAlt: 'Ração seca ilustrativa',
    description:
      'Alimento seco para a rotina do seu pet. Compare a fase da vida e o peso da embalagem ao escolher. Composição e orientações de uso serão informadas no catálogo real.',
    petSizes: ['Pequeno', 'Médio', 'Grande'],
    lifeStages: ['Adulto'],
    availability: 'demo',
  },
  {
    id: 'pet-002',
    petTypes: ['dog'],
    category: 'racoes-e-alimentos',
    brand: 'VivaPata',
    name: 'Ração para filhotes — frango e arroz',
    size: '10 kg',
    priceCents: 13990,
    image: '/assets/category-food.webp',
    imageAlt: 'Ração seca ilustrativa',
    description:
      'Alimento seco para a rotina do seu pet. Compare a fase da vida e o peso da embalagem ao escolher. Composição e orientações de uso serão informadas no catálogo real.',
    petSizes: ['Pequeno', 'Médio', 'Grande'],
    lifeStages: ['Filhote'],
    availability: 'demo',
  },
  {
    id: 'pet-003',
    petTypes: ['dog'],
    category: 'racoes-e-alimentos',
    brand: 'GrãoAmigo',
    name: 'Ração para cães de pequeno porte — frango',
    size: '3 kg',
    priceCents: 6490,
    image: '/assets/category-food.webp',
    imageAlt: 'Ração seca ilustrativa',
    description:
      'Alimento seco para a rotina do seu pet. Compare a fase da vida e o peso da embalagem ao escolher. Composição e orientações de uso serão informadas no catálogo real.',
    petSizes: ['Pequeno'],
    lifeStages: ['Adulto'],
    availability: 'demo',
  },
  {
    id: 'pet-004',
    petTypes: ['dog'],
    category: 'racoes-e-alimentos',
    brand: 'GrãoAmigo',
    name: 'Ração para cães sêniores — frango e aveia',
    size: '10 kg',
    priceCents: 18990,
    image: '/assets/category-food.webp',
    imageAlt: 'Ração seca ilustrativa',
    description:
      'Alimento seco para a rotina do seu pet. Compare a fase da vida e o peso da embalagem ao escolher. Composição e orientações de uso serão informadas no catálogo real.',
    petSizes: ['Pequeno', 'Médio', 'Grande'],
    lifeStages: ['Sênior'],
    availability: 'demo',
  },
  {
    id: 'pet-005',
    petTypes: ['cat'],
    category: 'racoes-e-alimentos',
    brand: 'MiauMesa',
    name: 'Ração para gatos adultos — salmão',
    size: '3 kg',
    priceCents: 7990,
    image: '/assets/category-food.webp',
    imageAlt: 'Ração seca ilustrativa',
    description:
      'Alimento seco para a rotina do seu pet. Compare a fase da vida e o peso da embalagem ao escolher. Composição e orientações de uso serão informadas no catálogo real.',
    petSizes: ['Pequeno', 'Médio', 'Grande'],
    lifeStages: ['Adulto'],
    availability: 'demo',
  },
  {
    id: 'pet-006',
    petTypes: ['cat'],
    category: 'racoes-e-alimentos',
    brand: 'MiauMesa',
    name: 'Ração para gatos castrados — frango',
    size: '3 kg',
    priceCents: 8990,
    image: '/assets/category-food.webp',
    imageAlt: 'Ração seca ilustrativa',
    description:
      'Alimento seco para a rotina do seu pet. Compare a fase da vida e o peso da embalagem ao escolher. Composição e orientações de uso serão informadas no catálogo real.',
    petSizes: ['Pequeno', 'Médio', 'Grande'],
    lifeStages: ['Adulto'],
    availability: 'demo',
  },
  {
    id: 'pet-007',
    petTypes: ['dog'],
    category: 'brinquedos',
    brand: 'PulaPata',
    name: 'Bola de feltro Patinha — mini',
    size: 'Diâmetro 5 cm',
    priceCents: 1290,
    image: '/assets/category-toys.webp',
    imageAlt: 'Bola de feltro ilustrativa',
    description:
      'Bolinha para brincadeiras acompanhadas. Confira o diâmetro e escolha um tamanho adequado ao seu pet. Substitua o brinquedo se apresentar desgaste.',
    petSizes: ['Pequeno'],
    lifeStages: ['Filhote', 'Adulto', 'Sênior'],
    availability: 'demo',
  },
  {
    id: 'pet-008',
    petTypes: ['dog'],
    category: 'brinquedos',
    brand: 'PulaPata',
    name: 'Bola de feltro Patinha — clássica',
    size: 'Diâmetro 6,5 cm',
    priceCents: 1690,
    image: '/assets/category-toys.webp',
    imageAlt: 'Bola de feltro ilustrativa',
    description:
      'Bolinha para brincadeiras acompanhadas. Confira o diâmetro e escolha um tamanho adequado ao seu pet. Substitua o brinquedo se apresentar desgaste.',
    petSizes: ['Médio'],
    lifeStages: ['Filhote', 'Adulto', 'Sênior'],
    availability: 'demo',
  },
  {
    id: 'pet-009',
    petTypes: ['dog'],
    category: 'brinquedos',
    brand: 'PulaPata',
    name: 'Bola de feltro Patinha — grande',
    size: 'Diâmetro 8 cm',
    priceCents: 2290,
    image: '/assets/category-toys.webp',
    imageAlt: 'Bola de feltro ilustrativa',
    description:
      'Bolinha para brincadeiras acompanhadas. Confira o diâmetro e escolha um tamanho adequado ao seu pet. Substitua o brinquedo se apresentar desgaste.',
    petSizes: ['Grande'],
    lifeStages: ['Filhote', 'Adulto', 'Sênior'],
    availability: 'demo',
  },
  {
    id: 'pet-010',
    petTypes: ['dog'],
    category: 'brinquedos',
    brand: 'BrincaBicho',
    name: 'Bola de feltro para buscar — pequena',
    size: 'Diâmetro 5,5 cm',
    priceCents: 1490,
    image: '/assets/category-toys.webp',
    imageAlt: 'Bola de feltro ilustrativa',
    description:
      'Bolinha para brincadeiras acompanhadas. Confira o diâmetro e escolha um tamanho adequado ao seu pet. Substitua o brinquedo se apresentar desgaste.',
    petSizes: ['Pequeno'],
    lifeStages: ['Filhote', 'Adulto', 'Sênior'],
    availability: 'demo',
  },
  {
    id: 'pet-011',
    petTypes: ['dog'],
    category: 'brinquedos',
    brand: 'BrincaBicho',
    name: 'Bola de feltro para buscar — média',
    size: 'Diâmetro 7 cm',
    priceCents: 1990,
    image: '/assets/category-toys.webp',
    imageAlt: 'Bola de feltro ilustrativa',
    description:
      'Bolinha para brincadeiras acompanhadas. Confira o diâmetro e escolha um tamanho adequado ao seu pet. Substitua o brinquedo se apresentar desgaste.',
    petSizes: ['Médio'],
    lifeStages: ['Filhote', 'Adulto', 'Sênior'],
    availability: 'demo',
  },
  {
    id: 'pet-012',
    petTypes: ['dog'],
    category: 'brinquedos',
    brand: 'BrincaBicho',
    name: 'Bola de feltro para buscar — gigante',
    size: 'Diâmetro 10 cm',
    priceCents: 3290,
    image: '/assets/category-toys.webp',
    imageAlt: 'Bola de feltro ilustrativa',
    description:
      'Bolinha para brincadeiras acompanhadas. Confira o diâmetro e escolha um tamanho adequado ao seu pet. Substitua o brinquedo se apresentar desgaste.',
    petSizes: ['Grande'],
    lifeStages: ['Filhote', 'Adulto', 'Sênior'],
    availability: 'demo',
  },
  {
    id: 'pet-013',
    petTypes: ['dog'],
    category: 'acessorios-de-passeio',
    brand: 'PassoPet',
    name: 'Guia retrátil Essencial — mini',
    size: '2 m • porte mini',
    priceCents: 4490,
    image: '/assets/product-leash.webp',
    imageAlt: 'Guia retrátil ilustrativa',
    description:
      'Guia retrátil para os passeios do dia a dia. Confira o comprimento antes de escolher. A resistência e o peso máximo suportado devem ser confirmados com a loja.',
    petSizes: ['Pequeno'],
    lifeStages: ['Filhote', 'Adulto', 'Sênior'],
    availability: 'demo',
  },
  {
    id: 'pet-014',
    petTypes: ['dog'],
    category: 'acessorios-de-passeio',
    brand: 'PassoPet',
    name: 'Guia retrátil Essencial — pequena',
    size: '3 m • porte pequeno',
    priceCents: 5990,
    image: '/assets/product-leash.webp',
    imageAlt: 'Guia retrátil ilustrativa',
    description:
      'Guia retrátil para os passeios do dia a dia. Confira o comprimento antes de escolher. A resistência e o peso máximo suportado devem ser confirmados com a loja.',
    petSizes: ['Pequeno'],
    lifeStages: ['Filhote', 'Adulto', 'Sênior'],
    availability: 'demo',
  },
  {
    id: 'pet-015',
    petTypes: ['dog'],
    category: 'acessorios-de-passeio',
    brand: 'PassoPet',
    name: 'Guia retrátil Essencial — média',
    size: '5 m • porte médio',
    priceCents: 8990,
    image: '/assets/product-leash.webp',
    imageAlt: 'Guia retrátil ilustrativa',
    description:
      'Guia retrátil para os passeios do dia a dia. Confira o comprimento antes de escolher. A resistência e o peso máximo suportado devem ser confirmados com a loja.',
    petSizes: ['Médio'],
    lifeStages: ['Filhote', 'Adulto', 'Sênior'],
    availability: 'demo',
  },
  {
    id: 'pet-016',
    petTypes: ['dog'],
    category: 'acessorios-de-passeio',
    brand: 'TrilhaPata',
    name: 'Guia retrátil Passeio — compacta',
    size: '3 m • porte pequeno',
    priceCents: 6990,
    image: '/assets/product-leash.webp',
    imageAlt: 'Guia retrátil ilustrativa',
    description:
      'Guia retrátil para os passeios do dia a dia. Confira o comprimento antes de escolher. A resistência e o peso máximo suportado devem ser confirmados com a loja.',
    petSizes: ['Pequeno'],
    lifeStages: ['Filhote', 'Adulto', 'Sênior'],
    availability: 'demo',
  },
  {
    id: 'pet-017',
    petTypes: ['dog'],
    category: 'acessorios-de-passeio',
    brand: 'TrilhaPata',
    name: 'Guia retrátil Passeio — conforto',
    size: '5 m • porte médio',
    priceCents: 11990,
    image: '/assets/product-leash.webp',
    imageAlt: 'Guia retrátil ilustrativa',
    description:
      'Guia retrátil para os passeios do dia a dia. Confira o comprimento antes de escolher. A resistência e o peso máximo suportado devem ser confirmados com a loja.',
    petSizes: ['Médio'],
    lifeStages: ['Filhote', 'Adulto', 'Sênior'],
    availability: 'demo',
  },
  {
    id: 'pet-018',
    petTypes: ['dog'],
    category: 'acessorios-de-passeio',
    brand: 'TrilhaPata',
    name: 'Guia retrátil Passeio — longa',
    size: '8 m • porte grande',
    priceCents: 15990,
    image: '/assets/product-leash.webp',
    imageAlt: 'Guia retrátil ilustrativa',
    description:
      'Guia retrátil para os passeios do dia a dia. Confira o comprimento antes de escolher. A resistência e o peso máximo suportado devem ser confirmados com a loja.',
    petSizes: ['Grande'],
    lifeStages: ['Filhote', 'Adulto', 'Sênior'],
    availability: 'demo',
  },
  {
    id: 'pet-019',
    petTypes: ['dog', 'cat'],
    category: 'camas-e-conforto',
    brand: 'NinhoBicho',
    name: 'Cama redonda Aconchego — PP',
    size: '40 × 40 cm',
    priceCents: 7990,
    image: '/assets/category-bed.webp',
    imageAlt: 'Cama redonda ilustrativa',
    description:
      'Cama redonda para o cantinho de descanso do seu pet. Compare as medidas com o espaço que ele ocupa deitado. Material e instruções de limpeza serão confirmados no catálogo real.',
    petSizes: ['Pequeno'],
    lifeStages: ['Filhote', 'Adulto', 'Sênior'],
    availability: 'demo',
  },
  {
    id: 'pet-020',
    petTypes: ['dog', 'cat'],
    category: 'camas-e-conforto',
    brand: 'NinhoBicho',
    name: 'Cama redonda Aconchego — P',
    size: '50 × 50 cm',
    priceCents: 10990,
    image: '/assets/category-bed.webp',
    imageAlt: 'Cama redonda ilustrativa',
    description:
      'Cama redonda para o cantinho de descanso do seu pet. Compare as medidas com o espaço que ele ocupa deitado. Material e instruções de limpeza serão confirmados no catálogo real.',
    petSizes: ['Pequeno'],
    lifeStages: ['Filhote', 'Adulto', 'Sênior'],
    availability: 'demo',
  },
  {
    id: 'pet-021',
    petTypes: ['dog', 'cat'],
    category: 'camas-e-conforto',
    brand: 'NinhoBicho',
    name: 'Cama redonda Aconchego — M',
    size: '60 × 60 cm',
    priceCents: 14990,
    image: '/assets/category-bed.webp',
    imageAlt: 'Cama redonda ilustrativa',
    description:
      'Cama redonda para o cantinho de descanso do seu pet. Compare as medidas com o espaço que ele ocupa deitado. Material e instruções de limpeza serão confirmados no catálogo real.',
    petSizes: ['Médio'],
    lifeStages: ['Filhote', 'Adulto', 'Sênior'],
    availability: 'demo',
  },
  {
    id: 'pet-022',
    petTypes: ['dog', 'cat'],
    category: 'camas-e-conforto',
    brand: 'NinhoBicho',
    name: 'Cama redonda Aconchego — G',
    size: '70 × 70 cm',
    priceCents: 19990,
    image: '/assets/category-bed.webp',
    imageAlt: 'Cama redonda ilustrativa',
    description:
      'Cama redonda para o cantinho de descanso do seu pet. Compare as medidas com o espaço que ele ocupa deitado. Material e instruções de limpeza serão confirmados no catálogo real.',
    petSizes: ['Grande'],
    lifeStages: ['Filhote', 'Adulto', 'Sênior'],
    availability: 'demo',
  },
  {
    id: 'pet-023',
    petTypes: ['dog', 'cat'],
    category: 'camas-e-conforto',
    brand: 'SonoPata',
    name: 'Cama redonda Maciez — M',
    size: '65 × 65 cm',
    priceCents: 17990,
    image: '/assets/category-bed.webp',
    imageAlt: 'Cama redonda ilustrativa',
    description:
      'Cama redonda para o cantinho de descanso do seu pet. Compare as medidas com o espaço que ele ocupa deitado. Material e instruções de limpeza serão confirmados no catálogo real.',
    petSizes: ['Médio'],
    lifeStages: ['Filhote', 'Adulto', 'Sênior'],
    availability: 'demo',
  },
  {
    id: 'pet-024',
    petTypes: ['dog', 'cat'],
    category: 'camas-e-conforto',
    brand: 'SonoPata',
    name: 'Cama redonda Maciez — GG',
    size: '90 × 90 cm',
    priceCents: 26990,
    image: '/assets/category-bed.webp',
    imageAlt: 'Cama redonda ilustrativa',
    description:
      'Cama redonda para o cantinho de descanso do seu pet. Compare as medidas com o espaço que ele ocupa deitado. Material e instruções de limpeza serão confirmados no catálogo real.',
    petSizes: ['Grande'],
    lifeStages: ['Filhote', 'Adulto', 'Sênior'],
    availability: 'demo',
  },
];
export const categoryHref = (slug: CategorySlug) => `/loja/${slug}`;
export const allProductSkus: Product[] = [
  ...products,
  ...extraFoodOptions.map((option) => ({
    ...products.find((p) => p.id === option.baseId)!,
    ...option,
  })),
];
export const productById = new Map(
  allProductSkus.map((product) => [product.id, product]),
);
export const productOptions = (id: string) =>
  (optionGroups.find((group) => group.includes(id)) ?? [id])
    .map((key) => productById.get(key)!)
    .filter(Boolean);
export const formatPrice = (cents: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    cents / 100,
  );

export const productHref = (id: string) => `/produto/${id}`;
export const availabilityLabel = (product: Product) =>
  ({
    demo: 'Produto demonstrativo',
    available: 'Disponível',
    unavailable: 'Indisponível',
  })[product.availability];
