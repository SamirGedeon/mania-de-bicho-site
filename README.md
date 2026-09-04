# Mania de Bicho

Recriação visual navegável dos seis prints Happy Tails fornecidos pelo cliente, em duas páginas:

- `/`: clínica, serviços, cuidado e parceiros.
- `/loja/`: hero de loja, categorias, parceiros e coleções.

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

Busca e navegação funcionam; cards abrem detalhes. Sacola, contato e apresentação são demonstrações, sem envio, compra ou reprodução de vídeo. Não foram inventados telefone, horário, endereço, preço ou parceiros reais. Os serviços e textos são sugestões editoriais a validar com a operação da marca.

Os logos de parceiros e fotografias originais foram usados para reproduzir a referência em estudo privado; verificar licença e parceiros antes de uso comercial. Há prompts para substituir todas as fotos por material novo. As fotos de hero clínico e siamês tiveram o fundo adaptado para verde via ferramenta integrada de geração de imagens.

