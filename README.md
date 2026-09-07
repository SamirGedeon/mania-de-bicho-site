# Mania de Bicho

Recriação visual navegável dos seis prints Happy Tails fornecidos pelo cliente, em duas páginas:

- `/`: pet shop, nutrição, produtos e atendimento.
- `/loja/`: hero de loja, categorias e coleções.

## Executar

Requer Node >=22.13, conforme o scaffold. Execute nesta pasta:

```sh
npm ci
npm run dev
npm run build
```

A saída estática fica em `dist/client`. A configuração mantém Vinext/React, Sites e os componentes acessíveis Shadcn/Base UI. Não há banco de dados nem integração externa. Fontes e imagens são locais.

No ambiente Windows utilizado, o Node 24.14.1 apresentou uma falha nativa ao encerrar o build após gerar os arquivos. O comando `npm run build` inclui um adaptador em `scripts/build.mjs` que permite ao loop de eventos encerrar naturalmente e preserva os códigos de falha. Build validado com saída 0.

## Documentação

Os Markdown principais estão na pasta `../docs`, também copiados para `docs` neste projeto para entrega junto ao código.

## Limites do protótipo

Categorias possuem páginas reais com24 produtos fictícios. O carrinho permite adicionar, ajustar, remover e persistir itens no navegador; sem checkout ou pagamento. Contato e apresentação continuam demonstrações, sem envio ou reprodução de vídeo. Veja `docs/CATALOGO_E_CARRINHO.md`. Não foram inventados telefone, horário, endereço, preço ou parceiros reais. Os serviços e textos são sugestões editoriais a validar com a operação da marca.

As faixas de parceiros foram removidas de ambas as páginas. As fotografias originais foram usadas para reproduzir a referência em estudo privado; verificar licença antes de uso comercial. Há prompts para substituir todas as fotos por material novo. As fotos de hero clínico e siamês tiveram o fundo adaptado para verde via ferramenta integrada de geração de imagens.



