import type { Metadata } from 'next';
import './globals.css';
import { BrowsingProvider } from '@/components/shop/browsing-provider';
import { CartProvider } from '@/components/shop/cart-provider';
export const metadata: Metadata = {
  title: 'Mania de Bicho | Pet shop e produtos para pets',
  description:
    'Rações, acessórios, higiene e itens de farmácia pet. Variedade e atendimento próximo na Mania de Bicho.',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <BrowsingProvider>
          <CartProvider>{children}</CartProvider>
        </BrowsingProvider>
      </body>
    </html>
  );
}
