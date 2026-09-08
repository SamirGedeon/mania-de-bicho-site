# Favoritos, histórico e compra por pet

O coração nos cards e detalhes salva/remove favoritos. O coração no header abre `/favoritos`, com os produtos salvos e opção de adicionar ao carrinho. Listas vazias têm um caminho para explorar a loja.

Favoritos e os últimos oito produtos vistos são guardados neste navegador, na chave `mania-de-bicho:browsing:v1`. As alterações são salvas antes de navegar e sincronizadas entre abas. Não há conta nem sincronização entre dispositivos. Se o armazenamento for bloqueado, o estado funciona em memória enquanto a página estiver aberta.

“Vistos recentemente” apresenta até quatro itens, sem repetir o produto atualmente aberto. A seção só aparece quando há histórico. “Limpar histórico” preserva os favoritos e o carrinho.

Os atalhos “Para cães” e “Para gatos” estão na Home, na Loja e nas listagens. As páginas `/loja/caes` e `/loja/gatos` usam o campo explícito `petTypes` em `data/products.ts`, com valores `dog` e/ou `cat`. As indicações atuais são ilustrativas; ao substituir o catálogo, use as informações reais do fabricante.

O botão “Dúvida sobre este produto?” abre o WhatsApp comercial com nome, marca, tamanho e referência preenchidos. Produtos demonstrativos são identificados na mensagem. O visitante revisa e envia; o site não envia mensagens automaticamente.
