# Catálogo e atendimento

WhatsApp confirmado: (24) 98129-6449. Endereço informado: Rua Dr. Osório de Almeida, 173. O link do Google Maps é o fornecido pelo proprietário. Horários confirmados: segunda a sexta, 9h às 18h; sábado fechado; domingo, 9h às 13h. A loja não oferece banho e tosa.

## Para substituir os produtos de demonstração

Edite `data/products.ts`. Cada produto contém `id` estável, categoria, marca, nome, tamanho, preço em centavos, imagem, descrição, portes (`petSizes`), fases (`lifeStages`) e `availability`:

- `demo`: exemplo ilustrativo, identificado na loja, detalhes e mensagem do WhatsApp.
- `available`: disponível para consulta/pedido.
- `unavailable`: botão de adicionar desativado. Itens já salvos são sinalizados no carrinho e na mensagem.

Fotos próprias podem ser colocadas em `public/assets/produtos/`. `image` é a foto principal; `images` é uma lista opcional para a galeria. Atualize `imageAlt` com uma descrição objetiva. Não reutilize o ID de um produto antigo para outro produto diferente, pois clientes podem ter carrinhos salvos.

Para cada produto real, envie: nome, marca, categoria, peso/tamanho, preço, disponibilidade, descrição, porte/fase indicados pelo fabricante e fotos. Os portes, fases e descrições atuais são apenas dados de demonstração.

As rotas `/produto/{id}` são geradas automaticamente durante a publicação. Busca, filtros de marca/porte/fase/preço máximo e ordenação usam os mesmos dados, sem duplicar catálogo.

## Atendimento

Edite `data/store.ts` para horários, endereço e link do mapa. Avaliações só aparecem quando a lista `reviews` recebe depoimentos reais autorizados, com nome, texto e link da fonte.

O botão do WhatsApp abre uma mensagem para revisão e envio pelo visitante; o site não envia mensagens automaticamente nem confirma pagamento, entrega, estoque ou reserva. O total representa apenas produtos; frete e condições são confirmados pela loja.

## Revisão

Busca combinada, ordenação, cálculo em centavos, persistência e mensagem do WhatsApp possuem testes automatizados. Navegação, produto e carrinho foram revisados no navegador em larguras de 360 e 390 pixels. Isso é uma simulação de tela, não um teste em aparelho físico ou rede móvel real.

As duas imagens PNG maiores da Home receberam versões WebP: juntas passaram de 4.098.847 para 270.822 bytes, preservando os originais. Fotos abaixo da dobra mantêm carregamento tardio; a imagem principal recebe prioridade.

O botão Limpar carrinho remove todos os itens, zera o contador e o total e persiste a limpeza no navegador.
