# Mania de Bicho — especificação de design

## Revisão vigente — 07/09/2026

Esta revisão substitui as decisões correspondentes da reconstrução inicial descrita abaixo. As medições dos prints permanecem como histórico da referência.

- Negócio: **pet shop**, com rações, acessórios, higiene, itens de farmácia pet e banho e tosa. Textos visíveis, detalhes dos cards, busca e metadados não apresentam serviços médicos.
- Seção principal: “Rações, produtos e carinho / para o seu melhor amigo”. Cards: “Melhor nutrição”, “Produtos de qualidade” e “Atendimento especializado”, todos com badge, título e descrição curta.
- Grid desktop: `repeat(3, minmax(0, 1fr))`, gap14 px, altura compartilhada362 px e mesmos ajustes responsivos anteriores. Em até800 px, uma coluna. Não há mais coluna ampliada.
- Cards de serviço, categoria e produto: hover `scale(1.03)`, transição300 ms ease, sombra suave e z-index2. A escala não altera o espaço ocupado no grid.
- Cards duplos: scale1.015; botões: scale1.03; ícones: scale1.1/rotação−5°; setas de links: deslocamento3 px. Cores de repouso e imagens mantidas.
- Menus e links recebem sublinhado animado; animações usam250–300 ms. Badges informativos continuam estáticos, sem sugerir que são clicáveis.
- Transformações de hover são limitadas a ponteiro preciso e preferência sem redução de movimento. Foco por teclado é preservado; `prefers-reduced-motion` elimina transições e escalas.
- Componente de parceiros e todo seu CSS removidos da Home e Loja. Após categorias,64 px até coleções no desktop e40 px no celular. Na Home, mantém-se apenas a margem normal do footer, sem espaço residual da faixa.
- O card antes dedicado a recuperação passa a “As melhores rações e / produtos para seu pet”, badge “Sempre a melhor escolha pro seu pet”. O card acolhedor permanece, com descrição que se refere à loja, sem oferecer hospedagem.

## 1. Referências, escopo e precisão

Referência visual: [Happy Tails — Pet Care & Veterinary WordPress Theme, WebGeniusLab / Karina Alfimova](https://www.behance.net/gallery/253883069/Happy-Tails-Pet-Care-Veterinary-WordPress-Theme). Conferência técnica: [clínica original](https://wgl-dsites.net/happytails/homepage-1/) e [loja original](https://wgl-dsites.net/happytails/homepage-2/), consultadas em 04/09/2026. Os prints locais prevalecem sobre eventuais alterações da demonstração.

Implementação em `../site`: duas páginas, `/` (clínica; prints 1–3) e `/loja/` (loja; prints 4–6). Não concatenar os dois headers numa só página. O rodapé mínimo é uma inferência, pois não aparece nos prints. O trecho cortado no fim do print 6 não oferece conteúdo suficiente para reconstruir uma seção adicional; termina-se após os cards completos.

Legenda de precisão:

- **Confirmado:** token encontrado no HTML/CSS público original ou cor fornecida pelo cliente.
- **Medido:** coordenada aproximada do raster fornecido, em pixels do print; tolerância de 1–3 px para bordas e 2–5 px para texto.
- **Inferido:** comportamento, breakpoint ou detalhe não visível; decisão de implementação documentada.

Não existe correspondência garantida entre pixels do print e pixels CSS do site original: zoom, escala do dispositivo e recortes não foram fornecidos. As medidas abaixo reproduzem a geometria visível no tamanho de referência. Fotos editadas por IA e textos adaptados ao português impedem afirmar equivalência pixel a pixel absoluta.

## 2. Paleta e substituição semântica

| Papel | Original | Mania de Bicho | Evidência / uso |
|---|---|---|---|
| Identidade institucional | #7A1F11 e fundo fotográfico alaranjado | **#105A3D** | Marca fornecida; fundo da clínica, identidade e foco |
| Ação / CTA | **#7A1F11** | **#5C2D38** | Confirmado em `--happytails-button-bg-idle`; botões, setas, bordas de chips/cards e marcas monocromáticas |
| Branco | #FFFFFF | #FFFFFF | Confirmado; página, header, cards e texto sobre fotos |
| Texto principal | #181818 | #181818 | Confirmado no CSS; pixels do print variam perto de #101010 e #191919 |
| Texto secundário | #4B4B4B | #4B4B4B | Confirmado |
| Fundo neutro do tema | #E8E3DB | #E9E3DC | Token CSS original / amostra raster dominante da faixa do print 3 |
| Superfície suave | #F5F3F0 | #F5F3F0 | Confirmado; botão quadrado de seta |
| Item ativo do menu | aproximadamente #F1EEEA | #F1EEEA | Medido/aproximado |
| Hero loja | #D9D9D9 | #D9D9D9 | Amostra dominante no print 4 |
| Card de produto | #E4E4E4 | #E4E4E4 | Amostra dominante no print 4 |
| Texto claro do hero loja | aproximadamente #989898 | #989898 | Aproximado; segunda linha do título |
| Gradiente fotográfico original | tons #7A2011, #A73F20, #D98C46, #E1AB72 | direção #105A3D → #60927E | Cores originais amostradas; novo gradiente é orientação fotográfica, não preenchimento CSS uniforme |

Aplicar verde na identidade e no campo cromático institucional; bordô em todas as ocorrências funcionais do antigo terracota. Preservar a lógica do CTA branco circular sobre fotografia. Não tingir pelagem nem produtos com filtro global. Neutros permanecem neutros. O bordô da logo fornecida varia levemente no raster; os tokens CSS usam exatamente os HEX solicitados.

Tokens implementados em `site/app/globals.css`: `--primary`, `--action`, `--background`, `--foreground`, `--muted`, `--neutral`. A experiência é clara, sem modo escuro automático.

## 3. Tipografia

**Manrope**, confirmada no tema. Arquivos locais 400, 500, 600 e 700, sem solicitação de fonte externa em tempo de execução. Fallback Arial/sans-serif. Playfair Display itálica aparece na configuração geral do tema, mas não tem uso identificável nos seis recortes e não foi incluída.

| Componente | Tamanho no print / implementação desktop | Peso | Entrelinha | Tracking |
|---|---:|---:|---:|---:|
| Título hero clínica | ~70 px a 1414 px; `clamp(62px,4.96vw,94px)` | 500 | 1 | −0,05em |
| H2 de seção | 46 px | 500 | 1,2 | −0,05em |
| H2 cards duplos | 34 px | 500 | 1,28 | −0,045em |
| H3 serviço/categoria | 24 px | 500 | 1,2–1,27 | −0,03em |
| Hero loja | 46 px | 500 | 1,22 | −0,045em |
| Texto hero / cards | 12–13 px | 400 | 1,8 | normal |
| Menu | 12 px | 600 | normal | normal |
| Chips e CTAs | 12 px | 400 | 1,2 / normal | −0,02em / normal |
| Palavra decorativa clínica | `clamp(110px,13.5vw,260px)` | 400 | 0,76 | −0,07em |
| Palavra decorativa loja | 25vw | 400 | 0,68 | −0,07em |
| Palavra decorativa card | 17vw | 400 | 0,68 | −0,07em |

O CSS original define corpo 16 px/1,875, menu 16 px/30 e H2 48 px/60. Isso não prova que o raster esteja em escala 1:1. A reconstrução prioriza os tamanhos aparentes dos prints, inclusive textos pequenos de 12 px. Para um produto com prioridade de legibilidade, aumentar esses textos para 14–16 px é uma alteração de design a aprovar depois.

A copy foi adaptada para português. Quebras principais são explícitas para manter a silhueta: três linhas no hero clínico, duas no H2 de serviços e nos cards duplos. Elementos decorativos são HTML, selecionáveis apenas quando relevantes; `aria-hidden` nos que não carregam informação.

## 4. Medições dos prints

Coordenadas x/y têm origem no canto superior esquerdo de cada imagem, não na página contínua. Interfaces flutuantes do navegador e faixas escuras nas bordas foram excluídas.

| Arquivo | Raster | Elementos medidos (x, y, largura, altura) |
|---|---|---|
| Screenshot_1.png | 1414×852 | Área útil x3–1403; header (54,38,1298,74); H1 começa (52,172); mini-card (1184,183,168,182); círculo (55,594,193,193) |
| Screenshot_2.png | 1395×670 | Chip y35–63; H2 y77–173; cards (15,217,595,362), (624,217,374,362), (1012,217,374,362) |
| Screenshot_3.png | 1413×861 | Faixa neutra y3–86; cards (18,101,679,584), (711,101,679,584); vidro esquerdo (26,491,663,186); logos y780–833 |
| Screenshot_4.png | 1413×859 | Hero x0–1399, y37–730: ~1400×693; header (50,73,1299,74); cards de produto x958 e x1160, y398–679; copy x50, y426–679 |
| Screenshot_5.png | 1404×601 | Chip y35–63; H2 y78–120; categorias x279,498,717,936 / y162 / ~197×209; logos y465–518 |
| Screenshot_6.png | 1411×830 | Cards (15,95,679,584), (708,95,679,584); título decorativo y130; chip y515; títulos y566–642; CTA y634 |

## 5. Estrutura — clínica (`/`)

### Header e barra superior

- Margens laterais ~3,6% (50–54 px a 1400 px), largura 92,8%.
- Barra de informações: 38 px; alinhada à direita; intervalo 44 px.
- Header: 74 px, branco, raio 17 px, padding 10×15 px, sombra `0 4px 10px #00000009`.
- Logo fornecida, recortada da prancha; caixa 110×54 px. A proporção da marca difere da Happy Tails; `object-fit:contain` evita distorção.
- Seis itens de navegação, ícones de seta para baixo de 12 px, item ativo com fundo neutro e raio 9 px.
- Sacola, busca e CTA bordô de 44 px de altura. A navegação abre apenas destinos implementados; sem inventar páginas de blog/portfólio.
- Os textos de telefone e horários originais não foram transferidos, pois não pertencem à Mania de Bicho. Usadas frases institucionais com a mesma distribuição.

### Hero

- Altura `min(60.65vw,1100px)` e mínimo 740 px no desktop; a 1414 px, cerca de 858 px.
- Fotografia full bleed, proporção nativa ~1,64, `object-fit:cover`, posição central.
- Copy x3,8%, y20,3%; título 3 linhas; texto abaixo com margem 44 px.
- Botão circular branco: diâmetro 13,7vw, máximo 240 px; x3,8%, bottom7,5%.
- Mini-card: right3,8%, top21,5%, width12%, height21,3%; raio13 px; fundo branco a 15%; círculo play35 px.
- Grande composição tipográfica: right3,8%, bottom11%; degradê branco para transparente. Português exige ajuste de corpo para manter palavras dentro da área original.
- Foto adaptada com imagem generativa: fundo verde, anatomia e enquadramento preservados de forma aproximada. Não prometer fundo fotográfico integralmente igual a um único HEX.

### Serviços

- Fundo branco; padding36 px 15 px 90 px; título central; 38 px entre cabeçalho e grid.
- Grid **1,59fr 1fr 1fr**, gap14 px: reproduz ~43,4% / 27,3% / 27,3% da área dos cards.
- Altura362 px; raio16 px; borda1 px, 70% do bordô misturado com branco.
- Padding31 px 28 px; chip no topo; texto no canto inferior esquerdo, bottom31 px.
- Fotografia recortada ocupando a direita. O primeiro card contém descrição; os dois seguintes apenas título e seta, exatamente como o print.
- Seta35×35 px, raio7 px, margin-top23 px, ícone20 px bordô.

### Faixa e dois cards de cuidado

- Faixa neutra84 px (medida no print 3; continuidade exata com o print 2 é inferida).
- Margens18 px, gap14 px, duas colunas iguais, proporção **1,1625:1** (~679×584 px).
- Fotografia completa, raio16 px, overflow hidden.
- Palavra decorativa gigante no topo, vazando apenas dentro do recorte do card.
- Painel inferior inset8 px, raio15 px, padding29 px 28 px 24 px, branco a14%, `backdrop-filter:blur(28px)`.
- Chip branco; título com duas linhas e CTA no canto inferior direito. Desfocagem é inferida visualmente, não identificável com precisão pelo raster.

### Parceiros

- Seis logos distribuídos uniformemente; caixa112×55 px; padding90 px 6,4% 30 px; gap35 px.
- Máscara CSS com a imagem original e preenchimento #5C2D38, preservando geometria.
- **Marcas ilustrativas herdadas da referência**, sem confirmação de parceria real com Mania de Bicho. Substituir pelos arquivos reais antes de uso comercial público.

## 6. Estrutura — loja (`/loja/`)

### Hero de loja

- 693 px de altura no desktop até1600 px; em telas maiores,49,5vw.
- Fundo #D9D9D9; mesmo header. A faixa branca acima do print é recorte de captura, não seção.
- Basenji recortado: altura100%, centralizado horizontalmente, bottom0; camada entre palavra decorativa e copy.
- Palavra “pet care”: top29%, left−2%, corpo25vw; branco → transparente; atrás do cachorro.
- Copy: left3,55%, bottom50 px, descrição de três linhas, título2 linhas e botões brancos em linha; gap8 px, margin-top28 px.
- Dois cards: right3,8%, bottom50 px; conjunto27,8% da largura; gap15 px.
- Card cinza #E4E4E4; raio16 px; padding7 px; sombra `0 20px 22px #00000012`; imagem branca com raio15 px e proporção0,875.
- Estrelas são detalhe visual ilustrativo. Preços de demonstração não foram atribuídos à marca; substituídos por “Conhecer produto”.

### Categorias

- Padding-top94 px; cabeçalho central.
- Grid máximo854 px, largura90%, quatro colunas iguais; gap22 px.
- Card ~197×209 px; proporção0,947; borda1 px; raio15 px; padding17×22 px.
- Título no topo esquerdo, fotografia na área inferior/direita; usar assets recortados sem incluir letras na imagem.
- Parceiros depois dos cards, padding superior94 px, inferior84 px.

### Coleções duplas

- Duas colunas iguais, gap14 px, margens18 px; topo95 px, inferior94 px.
- Mesma proporção1,1625 e raio16 px dos cards de cuidado.
- Fotos: filhote de gato em caminha / golden com coleira. Palavras “new” e “pro” recortadas no topo.
- Texto na base, padding30×34 px; degradê transparente → preto38%, sem painel de vidro separado.
- Chip, título2 linhas, CTA alinhado à direita no desktop.

## 7. Responsividade inferida

Os arquivos fornecidos mostram apenas desktop. Os seguintes comportamentos são decisões novas, não medições da referência:

- **Acima1600 px:** serviços e títulos aumentam proporcionalmente; hero limitado a1100 px.
- **801–1100 px:** reduzir espaços do menu; títulos de cards duplos27 px; ações dos cards podem ir para nova linha.
- **Até800 px:** header com menu lateral acessível; serviços e cards duplos em uma coluna; categorias2×2; parceiros3×2. Hero clínica830 px; hero loja880 px; produtos organizados abaixo da copy.
- **Até480 px:** título clínico52 px, seção31 px; cards310 px de altura; hero790 px; categorias com títulos21 px; CTAs compactos. Ocultar apenas metadado redundante e atalho de sacola do header.
- Respeitar `prefers-reduced-motion`; foco de3 px verde, offset5 px; link “Pular para o conteúdo”; navegação por teclado e modais com primitivos Base UI/Shadcn.

## 8. Componentes e comportamento

`PetSite` compartilha header, parceiros, modais e footer. Props `shop` selecionam a composição; arquivos de rota independentes. Componentes lógicos: Tag, Partners, ServiceCard, FeatureCard, CategoryCard e ProductCard (os quatro últimos compostos diretamente no JSX).

Busca filtra localmente nomes de serviços/categorias; estado vazio explicado. Cards abrem detalhes ilustrativos, sem transações. Sacola informa ausência de itens. Contato informa que os canais serão disponibilizados; não coleta dados nem envia mensagem. Mini-card com play abre apresentação estática, pois nenhum vídeo foi fornecido. O site é uma **recriação visual navegável**, não uma loja com checkout, estoque ou agendamento integrados.

Hovers: CTA bordô → branco com borda/texto bordô; seta neutra → bordô com branco; botões brancos → bordô; links sublinham quando pertinente. Transição200 ms. Sem animações de entrada especulativas.

## 9. Arquivos, imagens e entrega técnica

- `site/app/pet-site.tsx`: composição e interações.
- `site/app/globals.css`: tokens, medidas, estados e breakpoints.
- `site/app/page.tsx` e `site/app/loja/page.tsx`: rotas.
- `site/public/assets/`: logo, Manrope e fotografias locais.
- `PROMPTS_DE_IMAGENS.md`: prompts completos por foto, com base repetida.
- `site/README.md`: execução e limites funcionais.

Fontes fotográficas originais: `https://wgl-dsites.net/happytails/wp-content/uploads/2026/07/`. Nomes: hp1-1 (hero), hp1-2 (mini-card), striped-1/2/3 (serviços), hp1-3/4 (cuidado), hp2-1 (hero loja), hp2-2/3/4/5 (categorias), hp2-6/7 (coleções), shop-1-5-540x620 e shop-1-10-540x620 (produtos), clients-1 a6 (marcas). Material usado como referência visual; a disponibilidade pública não comprova licença de uso comercial. Para publicação comercial, usar material licenciado ou substituir as fotos pelos prompts entregues e confirmar parceiros e serviços reais.

Imagens verdes produzidas com a ferramenta integrada imagegen: `hero-clinic-green.png` e `care-cat-green.png`. Prompt de edição: “Replace only orange/brown background with deep green gradient #105A3D left through #60927E right; neutralize orange rim lighting; preserve exact anatomy, pose, fur, eyes, composition, and aspect ratio. No text/UI/objects.”

## 10. Critérios de conferência para o desenvolvedor

1. Abrir cada rota na largura correspondente ao print e comparar a área útil, excluindo chrome do navegador.
2. Conferir posição e dimensão de header, H1, chips, grids e recortes antes de ajustar detalhes.
3. Verificar #105A3D/#5C2D38 nos tokens computados; fotografias possuem variações naturais.
4. Não transformar a página em um print único: textos, cards e navegação devem permanecer elementos reais.
5. Usar as fotos recortadas corretas; evitar `contain` nos grandes cards com fotografia de fundo.
6. Confirmar contraste no texto sobre fotografia, navegação a200% de zoom, foco, modais e ausência de overflow nas larguras375,768,1400 px.
7. Não assumir dados comerciais presentes na referência como informações da Mania de Bicho.

A implementação teve build de produção e checagem de tipos como validação técnica. Não foi realizada comparação automatizada de screenshots ou teste de navegador; as medidas foram extraídas dos arquivos fornecidos e o CSS foi construído a partir delas.

### Registro de validação

- Build de produção: duas rotas estáticas e404 geradas, zero rotas ignoradas; saída0 após ajustar encerramento do CLI no Windows com `scripts/build.mjs`.
- TypeScript: `tsc --noEmit` aprovado.
- As duas rotas responderam HTTP200 no servidor local.
- Lint global identifica problemas nos componentes genéricos distribuídos com o scaffold Shadcn (não modificados); lint restrito ao código desta implementação é verificado separadamente. Imagens nativas e links HTML são escolhas deliberadas para exportação totalmente estática.
- Nenhum teste visual automatizado de navegador foi executado.

