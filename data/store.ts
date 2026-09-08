// Preencha somente com informações confirmadas pela loja.
export const storeInfo: {
  whatsapp: string;
  address: string;
  hours: string[];
  mapsUrl: string;
  reviews: { name: string; text: string; sourceUrl: string }[];
} = {
  whatsapp: '5524981296449', // Formato internacional: 55 + DDD + número, somente dígitos.
  address: 'Rua Dr. Osório de Almeida, 173',
  hours: [
    'Segunda a sexta: 9h às 18h',
    'Sábado: fechado',
    'Domingo: 9h às 13h',
  ],
  mapsUrl: 'https://share.google/d9krJSwj30yqpu7Q6',
  reviews: [],
};
