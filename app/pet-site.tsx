/* Native images and full-page links are intentional for this fully static export. */
/* oxlint-disable next/no-img-element, next/no-html-link-for-pages */
'use client';
import { useState } from 'react';
import { ArrowRight, Bone, Play } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { SiteHeader, SiteFooter } from '@/components/shop/site-chrome';
import { categories, categoryHref } from '@/data/products';
import { brandStory } from '@/data/brand-story';
import { HeroVideoDialog } from '@/components/shop/hero-video-dialog';
import { PetShortcuts } from '@/components/shop/pet-shortcuts';
import { services } from '@/data/site-content';
const asset = (name: string) => `/assets/${name}`;
type Detail = { name: string; text: string; image?: string };
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="tag">
      <Bone size={16} />
      {children}
    </span>
  );
}
export function PetSite({ shop = false }: { shop?: boolean }) {
  const [videoOpen, setVideoOpen] = useState(false);
  const [detail, setDetail] = useState<Detail | null>(null);
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <section className={`hero ${shop ? 'hero-shop' : 'hero-clinic'}`}>
        <img
          className="hero-photo"
          src={asset(shop ? 'hero-shop.webp' : 'hero-clinic-green.webp')}
          alt={
            shop ? 'Cão usando moletom claro' : 'Retrato de um buldogue branco'
          }
          fetchPriority="high"
        />
        <SiteHeader shop={shop} />
        {shop ? (
          <>
            <div className="giant shop-giant" aria-hidden="true">
              pet care
            </div>
            <div className="shop-copy">
              <p>
                Mais variedade para o seu pet.
                <br />
                Mais facilidade e carinho para quem cuida.
                <br />
                Tudo para viver bons momentos juntos.
              </p>
              <h1>
                O universo do seu pet.
                <br />
                <span>Do seu jeito.</span>
              </h1>
              <div className="shop-buttons">
                <a className="pill light" href="#colecoes">
                  Novidades
                </a>
                <a className="pill light" href="#categorias">
                  Todos os produtos
                </a>
              </div>
            </div>
            <div className="featured-products">
              {[
                {
                  name: 'Comedouro para pets',
                  image: 'product-bowl.webp',
                  text: 'Praticidade para a hora da refeição.',
                },
                {
                  name: 'Guia retrátil',
                  image: 'product-leash.webp',
                  text: 'Mais liberdade para os passeios.',
                },
              ].map((p) => (
                <button
                  key={p.name}
                  className="product"
                  onClick={() => setDetail(p)}
                >
                  <div>
                    <img src={asset(p.image)} alt={p.name} />
                  </div>
                  <span
                    className="stars"
                    aria-label="Imagem ilustrativa de avaliação"
                  >
                    ★★★★★
                  </span>
                  <strong>{p.name}</strong>
                  <span>Conhecer produto</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="clinic-copy">
              <h1>
                Seu pet.
                <br />
                Nossa maior
                <br />
                prioridade.
              </h1>
              <p>
                Rações, acessórios e higiene para seu pet,
                <br />
                com variedade e praticidade em cada compra.
              </p>
            </div>
            <button
              className="hero-video"
              aria-label="Assistir à apresentação da Mania de Bicho"
              onClick={() => setVideoOpen(true)}
            >
              <img
                src={asset('video-dog.webp')}
                alt="Cachorro olhando para cima"
              />
              <span className="play">
                <Play size={17} fill="currentColor" />
              </span>
              <span>
                Seu parceiro em
                <br />
                produtos pet
              </span>
            </button>
            <button
              className="circle-cta paw-cta"
              aria-label="Conheça a história da Mania de Bicho"
              onClick={() =>
                setDetail({
                  name: brandStory.title,
                  text: `Texto de exemplo — aguardando a história real da loja. ${brandStory.text}`,
                })
              }
            >
              <span>
                Conheça
                <br />
                nossa história
              </span>
            </button>
            <div className="giant clinic-giant" aria-hidden="true">
              pequenas
              <br />
              patas
            </div>
          </>
        )}
      </section>
      <main id="conteudo">
        <PetShortcuts />
        {shop ? (
          <>
            <section className="categories-section" id="categorias">
              <div className="section-heading">
                <Tag>Encontre o que seu pet precisa</Tag>
                <h2>Compre por categoria</h2>
              </div>
              <div className="categories">
                {categories.map((c) => (
                  <a
                    className="category"
                    key={c.name}
                    href={categoryHref(c.slug)}
                  >
                    <h3>{c.name}</h3>
                    <img loading="lazy" src={asset(c.image)} alt="" />
                  </a>
                ))}
              </div>
            </section>
            <section className="double-grid collections" id="colecoes">
              {[
                {
                  name: 'Nova coleção\nde caminhas',
                  image: 'collection-bed.webp',
                  word: 'new',
                  href: categoryHref('camas-e-conforto'),
                  cta: 'Explorar caminhas',
                },
                {
                  name: 'Acessórios para\npasseios especiais',
                  image: 'collection-walk.webp',
                  word: 'pro',
                  href: categoryHref('acessorios-de-passeio'),
                  cta: 'Explorar acessórios',
                },
              ].map((c) => (
                <article className="feature-card collection" key={c.name}>
                  <img
                    loading="lazy"
                    src={asset(c.image)}
                    alt={c.name.replace('\n', ' ')}
                  />
                  <span className="giant card-word" aria-hidden="true">
                    {c.word}
                  </span>
                  <div className="feature-overlay">
                    <Tag>Um carinho para chamar de seu</Tag>
                    <div>
                      <h2>{c.name}</h2>
                      <a href={c.href}>
                        {c.cta} <ArrowRight size={17} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </>
        ) : (
          <>
            <section id="servicos" className="services-section">
              <div className="section-heading">
                <Tag>O melhor para o dia a dia do seu pet</Tag>
                <h2>
                  Rações, produtos e carinho
                  <br />
                  para o seu melhor amigo
                </h2>
              </div>
              <div className="services">
                {services.map((s, i) => (
                  <article className={`service service-${i}`} key={s.name}>
                    <img loading="lazy" src={asset(s.image)} alt={s.name} />
                    <span className="tag">{s.tag}</span>
                    <div className="service-copy">
                      <h3>{s.name}</h3>
                      <p>{s.text}</p>
                      <button
                        className="arrow-button"
                        aria-label={`Saiba mais: ${s.name}`}
                        onClick={() => setDetail(s)}
                      >
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
            <div className="neutral-band" />
            <section id="cuidados" className="double-grid care-grid">
              {[
                {
                  name: 'Rações e alimentos\npara seu pet',
                  tag: 'Encontre a opção para cada fase',
                  image: 'care-pug.webp',
                  word: 'one',
                  href: categoryHref('racoes-e-alimentos'),
                  cta: 'Explorar rações',
                },
                {
                  name: 'Brinquedos para\ndivertir seu pet',
                  tag: 'Mais diversão em cada brincadeira',
                  image: 'care-cat-green.webp',
                  word: 'two',
                  href: categoryHref('brinquedos'),
                  cta: 'Explorar brinquedos',
                },
              ].map((c) => (
                <article className="feature-card" key={c.name}>
                  <img
                    loading="lazy"
                    src={asset(c.image)}
                    alt={c.name.replace('\n', ' ')}
                  />
                  <span className="giant card-word" aria-hidden="true">
                    {c.word}
                  </span>
                  <div className="feature-overlay glass">
                    <Tag>{c.tag}</Tag>
                    <div>
                      <h2>{c.name}</h2>
                      <a href={c.href}>
                        {c.cta} <ArrowRight size={17} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </>
        )}
      </main>
      <SiteFooter />
      <HeroVideoDialog open={videoOpen} onOpenChange={setVideoOpen} />
      <Dialog
        open={!!detail}
        onOpenChange={(open) => {
          if (!open) setDetail(null);
        }}
      >
        <DialogContent className="detail-dialog">
          {detail?.image && (
            <img className="detail-image" src={asset(detail.image)} alt="" />
          )}
          <DialogTitle>{detail?.name}</DialogTitle>
          <DialogDescription>{detail?.text}</DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
