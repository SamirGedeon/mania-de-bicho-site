# Compartilhamento e revisão no celular

- A página de produto permite copiar o link ou preparar uma mensagem no WhatsApp. A mensagem contém nome, marca, tamanho e link; exemplos do catálogo são identificados como demonstrativos. O visitante escolhe o destinatário e envia. A função não modifica a política de acesso do site.
- `lib/product-share.ts` define a origem usada nos links compartilhados. Atualize-a se o site receber domínio próprio. Quando o navegador bloqueia a área de transferência, um campo permite selecionar e copiar o link manualmente.
- Limpar carrinho oferece Desfazer por 15 segundos, inclusive ao fechar o painel. A recuperação conserva novos produtos adicionados nesse intervalo e limita cada quantidade a 99. A limpeza e a recuperação são gravadas no armazenamento local. A possibilidade de desfazer fica em memória e termina ao recarregar ou navegar para outra página.
- A busca global filtra enquanto o visitante digita, aceita vários termos e ignora acentos. Produtos mostram miniatura, preço e identificação de demonstração; categorias e serviços mantêm links próprios. Há contador e estado sem resultados.
- Em telas até 800 pixels, a página de produto mantém tamanho, preço e adicionar ao carrinho na base da tela. A barra respeita a área segura inferior, fica atrás dos modais e reserva espaço no final da página. Produtos indisponíveis e o limite de quantidade também desativam esse botão.

## Verificação

Revisão em navegador com larguras de 320, 360 e 390 pixels: Home, menu, Loja, listagem para gatos, produto, busca, compartilhamento, carrinho e recuperação. Copiar link apresentou confirmação de sucesso; a busca retornou os quatro produtos esperados para “racao frango” e estado vazio para termo inexistente; Desfazer recuperou o produto e o total de R$ 159,90. Não houve rolagem horizontal nas páginas verificadas nem erros de console durante o fluxo. Em telas baixas, o painel mantém rolagem para alcançar todos os controles.

Os testes automatizados cobrem restauração com novos itens, limite de quantidades e composição dos links. A revisão usa simulação de viewport, não aparelho físico, teclado virtual real ou rede móvel.
