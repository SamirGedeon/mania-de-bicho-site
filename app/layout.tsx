import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Mania de Bicho | Cuidado em cada detalhe',
  description:
    'Carinho, cuidado e bem-estar para o seu pet. Conheça a Mania de Bicho.',
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
