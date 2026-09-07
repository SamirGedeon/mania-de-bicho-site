# Catálogo e carrinho — Mania de Bicho

## Editar os produtos

Edite `data/products.ts`. O arquivo contém as quatro categorias e24 produtos fictícios (seis por categoria). As marcas são inventadas; as fotografias existentes são ilustrativas e compartilhadas entre variantes de tamanho/peso. Os nomes descrevem o tipo de produto mostrado.

Cada produto contém:

- `id`: identificador único e estável. Não reutilize um ID para um produto diferente, pois o carrinho salvo o referencia.
- `category`: slug de uma das quatro categorias existentes.
- `brand`, `name`, `size`: textos apresentados no catálogo e carrinho.
- `priceCents`: preço inteiro em centavos. Exemplo:15990 significa R$159,90.
- `image`: caminho público local, por exemplo `/assets/produto.webp`.
- `imageAlt`: descrição acessível da imagem.

Para trocar por produtos reais, substitua nomes, tamanhos, imagens e preços e remova o aviso de catálogo demonstrativo somente quando os dados forem confirmados. Refaça o build/publicação após editar o catálogo. Arquivos de imagem devem ficar em `public/assets`.

## Rotas

- `/loja/racoes-e-alimentos`
- `/loja/brinquedos`
- `/loja/acessorios-de-passeio`
- `/loja/camas-e-conforto`

As quatro páginas compartilham `components/shop/category-page.tsx`; o header/footer compartilhado está em `components/shop/site-chrome.tsx`. Os cards da seção “Compre por categoria” são links reais. A busca do header também encontra os produtos do catálogo.

## Carrinho

`CartProvider` envolve todas as rotas no layout raiz. O estado observado via Context/useSyncExternalStore usa as mesmas operações em toda a aplicação. O drawer lateral usa Sheet/Base UI para foco, teclado, Escape e fechamento.

- Adicionar abre o painel e agrupa repetições do mesmo ID.
- O contador do header soma as unidades, não apenas produtos diferentes.
- Quantidade entre1 e99 por produto; o botão de remoção exclui a linha.
- Totais e subtotais usam apenas centavos inteiros e os preços atuais de `products.ts`.
- `localStorage`, chave `mania-de-bicho:cart:v1`, salva somente IDs e quantidades; não confia em preços do armazenamento.
- Escrita síncrona antes da navegação preserva o carrinho mesmo com links de página inteira. Reload restaura os itens; abas recebem atualizações pelo evento `storage`.
- Dados corrompidos, IDs antigos, quantidades inválidas e versões desconhecidas são descartados; duplicatas são agrupadas.
- Se o navegador bloquear armazenamento, o carrinho funciona em memória e informa que não será restaurado em outra página/reload.
- Não há checkout, frete, cobrança, pedido, reserva de estoque, autenticação ou pagamento.

## Preços fictícios e referências

Consulta em07/09/2026. Os preços escolhidos são estimativas coerentes para demonstrar o fluxo; não constituem levantamento estatístico nem preços reais da Mania de Bicho.

- Rações: referência de15 kg aR$179,99 em [Petz — rações](https://www.petz.com.br/cachorro/racao?page=1), com faixas mais altas para linhas diferenciadas. Mock: R$64,90–R$189,90 conforme peso/fase.
- Brinquedos: referência de bolas e brinquedos simples na faixa deR$21,90–R$29,90 em [Cobasi — brinquedos](https://ecommerce.cobasi.com.br/c/cachorro/brinquedos/brinquedos-educativos). Mock: R$12,90–R$32,90 conforme diâmetro.
- Guias retráteis: referências deR$43,90 no [modelo Classic](https://www.cobasi.com.br/guia-retratil-preto-pet-flex-3506699/p?idsku=506699) e linhas deR$99,90–R$159,90 em [Cobasi — guias](https://ecommerce.cobasi.com.br/c/gatos/acessorios-para-transporte/guia). Mock: R$44,90–R$159,90.
- Camas: referência deR$229,99 em [Petz — camas](https://www.petz.com.br/cachorro/camas-e-cobertores). Mock: R$79,90–R$269,90, considerando versões simples pequenas atéGG; valores estimados.

## Validação

`node --test tests/cart.test.ts` (Node24 utilizado) cobre catálogo, imagens locais, agrupamento entre categorias, cálculos, ajustes, remoção, reload, armazenamento indisponível e dados inválidos. `npx tsc --noEmit` e lint do código da loja complementam os testes. O build exporta Home, Loja e as quatro categorias.

Não foram feitos testes visuais de navegador. A validação funcional automatizada cobre as operações do carrinho e sua persistência simulando novas instâncias e armazenamento.
