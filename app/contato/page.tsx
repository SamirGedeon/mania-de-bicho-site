import { SiteHeader, SiteFooter } from '@/components/shop/site-chrome';
export const metadata = {
  title: 'Contato e localização | Mania de Bicho',
  description:
    'Endereço da Mania de Bicho e contato pelo WhatsApp para produtos, horários e localização.',
};
export default function ContactPage() {
  return (
    <>
      <div className="catalog-header">
        <SiteHeader />
      </div>
      <main className="catalog-page contact-page">
        <h1>Fale com a gente</h1>
        <p>
          Produtos, horários e informações da loja: nossa equipe ajuda você pelo
          WhatsApp.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
