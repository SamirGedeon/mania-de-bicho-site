/* Native images and full-page links are intentional for this fully static export. */
/* oxlint-disable next/no-img-element, next/no-html-link-for-pages */
'use client';
import { useState } from 'react';
import {
  ArrowRight,
  Bone,
  ChevronDown,
  Clock3,
  Heart,
  Menu,
  Play,
  Search,
  ShoppingBag,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
const asset = (name: string) => `/assets/${name}`;
const services = [
  {
    name: 'Diagnósticos modernos',
    tag: 'Tecnologia avançada',
    image: 'service-dog.webp',
    text: 'Cuidado individualizado e atenção em cada etapa da vida do seu melhor amigo.',
  },
  {
    name: 'Medicina preventiva',
    tag: 'Cuidado e confiança',
    image: 'service-cat.webp',
    text: 'Prevenção, acompanhamento e bem-estar para cães e gatos.',
  },
  {
    name: 'Atenção especializada',
    tag: 'Carinho em cada detalhe',
    image: 'service-rabbit.webp',
    text: 'Cada pet é único e merece um olhar atento às suas necessidades.',
  },
];
const categories = [
  {
    name: 'Rações e alimentos',
    image: 'category-food.webp',
    text: 'Alimentação para cada fase da vida.',
  },
  {
    name: 'Brinquedos para pets',
    image: 'category-toys.webp',
    text: 'Diversão para a rotina do seu melhor amigo.',
  },
  {
    name: 'Acessórios de passeio',
    image: 'category-walk.webp',
    text: 'Conforto e segurança para passear juntos.',
  },
  {
    name: 'Camas e conforto',
    image: 'category-bed.webp',
    text: 'Um cantinho aconchegante para descansar.',
  },
];
type Detail = { name: string; text: string; image?: string };
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="tag">
      <Bone size={16} />
      {children}
    </span>
  );
}
function Partners() {
  return (
    <div className="partners" aria-label="Marcas ilustrativas da referência">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <span
          key={n}
          className="partner-logo"
          style={{
            maskImage: `url(${asset(`partner-${n}.webp`)})`,
            WebkitMaskImage: `url(${asset(`partner-${n}.webp`)})`,
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
export function PetSite({ shop = false }: { shop?: boolean }) {
  const [detail, setDetail] = useState<Detail | null>(null);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState('');
  const contact = () =>
    setDetail({
      name: 'Vamos cuidar do seu pet',
      text: 'Os canais de atendimento da Mania de Bicho serão disponibilizados aqui em breve.',
    });
  const nav = [
    ['Início', '/'],
    ['Serviços', '/#servicos'],
    ['Cuidados', '/#cuidados'],
    ['Loja', '/loja/'],
    ['Categorias', '/loja/#categorias'],
    ['Contato', '#contato'],
  ];
  const results = [...services, ...categories].filter((x) =>
    x.name
      .toLocaleLowerCase('pt-BR')
      .includes(query.toLocaleLowerCase('pt-BR')),
  );
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <section className={`hero ${shop ? 'hero-shop' : 'hero-clinic'}`}>
        <img
          className="hero-photo"
          src={asset(shop ? 'hero-shop.webp' : 'hero-clinic-green.png')}
          alt={
            shop ? 'Cão usando moletom claro' : 'Retrato de um buldogue branco'
          }
          fetchPriority="high"
        />
        <header className="header">
          <div className="topline">
            <span>
              <Heart size={15} /> Carinho em cada detalhe
            </span>
            <span>
              <Clock3 size={16} /> Cuidado em todas as fases
            </span>
          </div>
          <div className="nav-shell">
            <a className="brand" href="/" aria-label="Mania de Bicho, início">
              <img src={asset('logo.png')} alt="Mania de Bicho" />
            </a>
            <nav aria-label="Navegação principal">
              {nav.map(([label, url], i) => (
                <a
                  key={label}
                  className={(shop ? i === 3 : i === 0) ? 'active' : ''}
                  href={url}
                  onClick={
                    label === 'Contato'
                      ? (e) => {
                          e.preventDefault();
                          contact();
                        }
                      : undefined
                  }
                >
                  {label}
                  {i < 5 && <ChevronDown size={12} />}
                </a>
              ))}
            </nav>
            <div className="nav-actions">
              <button
                className="icon-button"
                aria-label="Ver sacola"
                onClick={() =>
                  setDetail({
                    name: 'Sua sacola está vazia',
                    text: 'Explore as categorias da Mania de Bicho. As compras on-line estarão disponíveis em breve.',
                  })
                }
              >
                <ShoppingBag size={21} />
                <sup>0</sup>
              </button>
              <button
                className="icon-button"
                aria-label="Buscar no site"
                onClick={() => setSearch(true)}
              >
                <Search size={21} />
              </button>
              <button className="pill cta" onClick={contact}>
                Fale com a gente
              </button>
              <button
                className="icon-button mobile-toggle"
                aria-label="Abrir menu"
                onClick={() => setMenu(true)}
              >
                <Menu />
              </button>
            </div>
          </div>
        </header>
        {shop ? (
          <>
            <div className="giant shop-giant" aria-hidden="true">
              pet care
            </div>
            <div className="shop-copy">
              <p>
                Mais saúde e alegria para os pets.
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
                Todo pet merece carinho e cuidado de verdade,
                <br />
                com atenção em cada fase da vida.
              </p>
            </div>
            <button
              className="hero-video"
              onClick={() =>
                setDetail({
                  name: 'Cuidado que aproxima',
                  text: 'Na Mania de Bicho, o bem-estar do seu pet vem primeiro.',
                  image: 'video-dog.webp',
                })
              }
            >
              <img
                src={asset('video-dog.webp')}
                alt="Cachorro olhando para cima"
              />
              <span className="play">
                <Play size={17} fill="currentColor" />
              </span>
              <span>
                Seu parceiro no
                <br />
                cuidado pet
              </span>
            </button>
            <a href="#servicos" className="circle-cta">
              Conheça a Mania
            </a>
            <div className="giant clinic-giant" aria-hidden="true">
              pequenas
              <br />
              patas
            </div>
          </>
        )}
      </section>
      <main id="conteudo">
        {shop ? (
          <>
            <section className="categories-section" id="categorias">
              <div className="section-heading">
                <Tag>Encontre o que seu pet precisa</Tag>
                <h2>Compre por categoria</h2>
              </div>
              <div className="categories">
                {categories.map((c) => (
                  <button
                    className="category"
                    key={c.name}
                    onClick={() => setDetail(c)}
                  >
                    <h3>{c.name}</h3>
                    <img loading="lazy" src={asset(c.image)} alt="" />
                  </button>
                ))}
              </div>
              <Partners />
            </section>
            <section className="double-grid collections" id="colecoes">
              {[
                {
                  name: 'Nova coleção\nde caminhas',
                  image: 'collection-bed.webp',
                  word: 'new',
                  text: 'Um cantinho de conforto para o seu pet.',
                },
                {
                  name: 'Acessórios para\npasseios especiais',
                  image: 'collection-walk.webp',
                  word: 'pro',
                  text: 'Descubra os acessórios para aproveitar cada passeio.',
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
                      <button onClick={() => setDetail(c)}>
                        Ver produtos <ArrowRight size={17} />
                      </button>
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
                <Tag>A saúde do seu pet em primeiro lugar</Tag>
                <h2>
                  Cuidado especializado para
                  <br />
                  pets felizes e saudáveis
                </h2>
              </div>
              <div className="services">
                {services.map((s, i) => (
                  <article className={`service service-${i}`} key={s.name}>
                    <img loading="lazy" src={asset(s.image)} alt={s.name} />
                    <span className="tag">{s.tag}</span>
                    <div className="service-copy">
                      <h3>{s.name}</h3>
                      {i === 0 && <p>{s.text}</p>}
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
                  name: 'Apoio e carinho durante\na recuperação',
                  tag: 'Um novo olhar para o cuidado',
                  image: 'care-pug.webp',
                  word: 'one',
                  text: 'Acolhimento e atenção às necessidades do seu pet em cada fase.',
                },
                {
                  name: 'Um ambiente acolhedor\npara o seu pet',
                  tag: 'Um lugar para se sentir em casa',
                  image: 'care-cat-green.png',
                  word: 'two',
                  text: 'Conforto, tranquilidade e carinho para o seu melhor amigo.',
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
                      <button onClick={() => setDetail(c)}>
                        Saiba mais <ArrowRight size={17} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
            <Partners />
          </>
        )}
      </main>
      <footer id="contato">
        <a href="/" aria-label="Voltar ao início">
          <img src={asset('logo.png')} alt="Mania de Bicho" />
        </a>
        <p>Carinho em cada detalhe.</p>
        <button className="pill cta" onClick={contact}>
          Fale com a gente <ArrowRight size={16} />
        </button>
      </footer>
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
      <Dialog open={search} onOpenChange={setSearch}>
        <DialogContent className="search-dialog">
          <DialogTitle>O que você procura?</DialogTitle>
          <DialogDescription>
            Busque serviços e categorias para seu pet.
          </DialogDescription>
          <input
            aria-label="Buscar serviços e categorias"
            placeholder="Digite para buscar…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="search-results">
            {results.length ? (
              results.map((r) => (
                <button
                  key={r.name}
                  onClick={() => {
                    setSearch(false);
                    setDetail(r);
                  }}
                >
                  {r.name}
                  <ArrowRight size={16} />
                </button>
              ))
            ) : (
              <p>Nenhum resultado encontrado. Tente outro termo.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent className="mobile-menu">
          <SheetTitle>Mania de Bicho</SheetTitle>
          {nav.map(([label, url]) => (
            <a
              href={url}
              key={label}
              onClick={() => {
                setMenu(false);
                if (label === 'Contato') contact();
              }}
            >
              {label}
              <ArrowRight size={18} />
            </a>
          ))}
        </SheetContent>
      </Sheet>
    </>
  );
}
