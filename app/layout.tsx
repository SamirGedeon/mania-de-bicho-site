import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Mania de Bicho | Pet shop, produtos e banho e tosa',
  description:
    'Rações, acessórios, higiene, itens de farmácia pet e banho e tosa. Variedade e atendimento próximo na Mania de Bicho.',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
