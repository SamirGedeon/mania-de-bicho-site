# História e vídeo da Home

O botão de patinha usa `public/assets/paw.svg`, uma silhueta simples criada para este botão. Mantém o espaço e a posição do antigo círculo; o texto visível é “Conheça nossa história”.

Edite `data/brand-story.ts` para substituir o texto de exemplo da história e o caminho do vídeo/poster. A fundação e a trajetória ainda não foram informadas; os campos entre colchetes são exemplos explícitos, não fatos.

O vídeo local `public/assets/mania-de-bicho-preview.mp4` é uma prévia animada de oito segundos, sem áudio, com o cachorro já utilizado no hero. Não representa filmagens da loja. Ao inserir o vídeo real, atualize também as legendas em `public/assets/mania-de-bicho-preview.vtt` e retire os avisos de conteúdo ilustrativo em `components/shop/hero-video-dialog.tsx` e `app/pet-site.tsx`.

O modal usa overlay escuro cobrindo a tela, vídeo responsivo com controles, botão de fechar, Escape e fechamento ao clicar fora do painel. A reprodução termina ao fechar. O vídeo só é montado quando aberto. As animações respeitam a preferência de movimento reduzido.
