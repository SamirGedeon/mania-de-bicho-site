import type { Metadata } from 'next';
import './globals.css';
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
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
