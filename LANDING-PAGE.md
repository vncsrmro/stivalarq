# Stival — landing page

Landing page em React, TypeScript e Vite, alinhada à identidade aprovada: petróleo, marfim, pedra, cobre e Manrope. Logo oficial em vetor, sem descritor no lockup.

## Executar

Na pasta `stivalarq`, executar `npm run dev -- --host 127.0.0.1 --port 8080` e abrir http://127.0.0.1:8080/.

Para gerar a versão de publicação: `npm run build`. Os arquivos finais ficam em `dist/`. A publicação no domínio não foi realizada.

## Conteúdo e manutenção

- `src/pages/Index.tsx`: estrutura e interações da página.
- `src/styles/stival.css`: identidade visual, responsividade e movimento.
- `src/data/stival.ts`: projetos, serviços, contatos e fundos.
- `public/brand/`: logotipos oficiais e fonte local, com licença.
- `public/media/`: imagens WebP em tamanhos responsivos.
- `public/media/manifest.json`: relação entre imagens usadas e originais fornecidos.
- `scripts/prepare-media.py`: recriação das imagens otimizadas usando Pillow e a pasta original de materiais, preservada.

## Vídeos e abertura

Cinco takes de ambientes em `../videos` foram montados em dois loops sem áudio. `VIDEO-ARCCA-HORI.mp4` foi analisado apenas como referência para o [roteiro do filme conceitual de 20 segundos](ROTEIRO-VIDEO-CONCEITUAL-20S.md) e não integra os vídeos do site:

- Hero: 20 segundos, cinco planos — recepção acolhedora, circulação hospitalar, sala de exame, quarto e atendimento —, transições de 0,5 segundo e retorno suave ao primeiro plano.
- Interlúdio: 13,5 segundos, três planos de arquitetura para a saúde e retorno suave.
- WebM VP9 e MP4 H.264 em 1600 × 900; versões de celular em 800 × 450. Todos em YUV 4:2:0 e 24 fps.
- `public/videos`: arquivos finais e posters. `scripts/edit-videos.py`: edição reproduzível; `video-edit/sources.json`: fontes. Os originais estão preservados.
- Para apenas reexportar os masters existentes, passar `--reuse-masters` ao script. Sem essa opção, a montagem é refeita.

O navegador escolhe WebM ou MP4 e a versão por largura de tela. O vídeo intermediário começa a carregar próximo de sua seção. Os vídeos pausam fora da tela, com a aba oculta ou pelo botão de pausa. Se a reprodução não estiver disponível, a imagem permanece.

O loader utiliza o símbolo aprovado, fundo marfim, linhas verticais e duas cortinas. Aguarda a fonte e o primeiro quadro, com tempo mínimo de 1,3 segundo e limite de 5 segundos, além de opção de entrada imediata. Respeita a preferência de movimento reduzido. Não representa uma porcentagem fictícia de download.

## Interações

Hero com movimento sutil, texto revelado no scroll, portfólio horizontal fixado no desktop e empilhado no celular, galerias ampliadas com navegação por setas/Escape, menu expandido, especialidades em acordeão e formulário que prepara uma mensagem para WhatsApp. O visitante confirma o envio no próprio WhatsApp; não há banco de leads ou envio de e-mail conectado.

Os trabalhos do portfólio são identificados como estudos/visualizações 3D e usam materiais fornecidos. As quatro imagens da seção Especialidade são renders conceituais gerados para ilustrar os serviços, identificados como tais na interface. O retrato da seção Quem está à frente foi atualizado com a foto fornecida do Gustavo. Não foram adicionados números de obras, depoimentos ou resultados não verificados.

## Verificação desta entrega

Build de produção, verificação TypeScript e ESLint dos arquivos alterados. Revisão no navegador em desktop e 390 × 844, incluindo galerias, menu, acordeão, formulário e pausa de movimento. Sem imagens quebradas ou transbordamento horizontal nas larguras verificadas.

## Atualização da seção Especialidade e do contato

Os quatro originais dos renders conceituais estão em `artwork/especialidades/`; `scripts/prepare-specialty-media.py` gera as versões WebP usadas no site. A foto atual do Gustavo está em `artwork/gustavo-stival-atual.png`, e `scripts/prepare-gustavo.py` cria os arquivos leves para a página. O seletor de tipo de projeto é um componente com suporte a teclado e mensagem de validação.
