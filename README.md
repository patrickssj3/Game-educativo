<div align="center">

# 🌿 EcoGames — Plataforma de Educação Ambiental Gamificada

**Aprender sobre sustentabilidade nunca foi tão interativo.**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

</div>

---

## 📖 Visão Geral

**EcoGames** (repositório: `game-educativo`) é uma plataforma web educativa que transforma conceitos de sustentabilidade e educação ambiental em experiências gamificadas, interativas e progressivas.

A plataforma é composta por um **lobby central** e múltiplos **minigames independentes**, cada um abordando uma temática ambiental específica. A arquitetura foi projetada para ser modular e escalável, permitindo a adição de novos jogos sem impacto nos módulos existentes.

---

## 🎯 Objetivos do Projeto

- **Educação ambiental** — ensinar conceitos de sustentabilidade de forma lúdica e acessível
- **Gamificação do aprendizado** — transformar conteúdos educativos em experiências interativas e progressivas
- **Arquitetura modular fullstack** — consolidar boas práticas de desenvolvimento com separação de responsabilidades
- **Escalabilidade** — estrutura preparada para receber novos jogos com mínimo de acoplamento
- **Impacto social** — promover consciência ambiental por meio da tecnologia

---

## 🏗️ Arquitetura Geral

```
┌─────────────────────────────────────────────────────┐
│                     index.html                      │
│              (Ponto de entrada / redirect)          │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│                 lobby/lobby.html                    │
│              (Hub central da plataforma)            │
└───────────────┬───────────────────┬─────────────────┘
                │                   │
                ▼                   ▼
┌───────────────────┐   ┌───────────────────┐   ┌─ ─ ─ ─ ─ ─ ┐
│   greenmemo/      │   │    ecohero/       │     Próximos...
│   (frontend)      │   │   (fullstack)     │   └ ─ ─ ─ ─ ─ ─ ┘
└───────────────────┘   └────────┬──────────┘
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │       backend/         │
                    │  Node.js + Express.js  │
                    │    database.json       │
                    └────────────────────────┘
```

A plataforma possui um **único backend Node.js/Express** compartilhado por todos os jogos, mas a lógica de cada jogo é completamente **desacoplada** — com controllers, routes e services próprios por domínio.

---

## 📁 Estrutura de Pastas

```plaintext
game-educativo/
│
├── index.html                  # Ponto de entrada → redireciona para o lobby
│
├── lobby/                      # Hub central da plataforma
│   ├── css/
│   │   └── style.css
│   └── lobby.html
│
├── greenmemo/                  # Jogo 1: Jogo da memória educativo
│   └── frontend/
│       ├── css/
│       │   └── hub.css
│       ├── js/
│       │   └── engine.js
│       └── greenmemo.html
│
├── ecohero/                    # Jogo 2: Jogo fullstack com ranking e cidades
│   └── frontend/
│       ├── css/
│       ├── js/
│       └── ecohero.html
│
└── backend/                    # Backend compartilhado
    ├── controllers/
    │   ├── ecohero.city.controller.js
    │   ├── ecohero.player.controller.js
    │   └── ecohero.ranking.controller.js
    ├── routes/
    │   ├── ecohero.city.routes.js
    │   ├── ecohero.player.routes.js
    │   └── ecohero.ranking.routes.js
    ├── services/
    │   ├── ecohero.city.service.js
    │   ├── ecohero.player.service.js
    │   └── ecohero.ranking.service.js
    ├── database.json
    ├── package.json
    └── server.js
```

---

## 🧩 Filosofia de Modularização

Cada jogo é tratado como um **mini módulo independente** dentro da plataforma. Não existe lógica global de player, ranking, progresso ou pontuação — pois cada jogo possui regras completamente distintas.

| Aspecto | GreenMemo | EcoHero |
|---|---|---|
| Tipo | Frontend standalone | Fullstack |
| Persistência | Local (memória) | JSON Database |
| Ranking | ✗ | ✓ |
| Backend próprio | ✗ | ✓ |
| Lógica de progressão | Fases locais | Cidades + progresso |

Isso garante que a adição de um novo jogo não impacte os demais e que cada módulo evolua de forma independente.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** — estrutura semântica das páginas e jogos
- **CSS3** — animações, flip 3D, responsividade e temas visuais por fase
- **JavaScript Vanilla** — lógica de jogo, manipulação de DOM e estados

### Backend
- **Node.js** — runtime do servidor
- **Express.js** — roteamento e API REST

### Persistência
- **JSON Database** (`database.json`) — banco de dados leve, sem dependência de SGBDs externos

---

## 🕹️ Jogos da Plataforma

### 🌿 GreenMemo — Jogo da Memória Sustentável

Jogo da memória educativo desenvolvido inteiramente com HTML, CSS e JavaScript puro — sem frameworks. Aborda temáticas ambientais através de 5 fases progressivas.

**Mecânica principal:**
- Flip 3D real via CSS (`rotateY`, `backface-visibility`, `transform-style: preserve-3d`)
- Animação `shake` para erros e opacidade reduzida para pares acertados
- Sistema de HUD com vidas, pontuação e fase atual

**Sistema de fases:**

| Fase | Tema | Emoji |
|------|------|-------|
| 1 | Guardiões da Água | 🌊 |
| 2 | Floresta Viva | 🌳 |
| 3 | Energia Limpa | ⚡ |
| 4 | Reciclagem Inteligente | ♻️ |
| 5 | Oceanos Vivos | 🐠 |

Cada fase possui tema visual próprio com variáveis CSS customizadas e uma curiosidade educativa exibida ao final.

**Regras:**
- 5 vidas por fase
- +10 pontos por par encontrado
- Erro desconta uma vida
- Ao zerar vidas: game over
- Fase 5 concluída: tela final com troféu animado, pontuação total, sistema de estrelas e badges

**Telas do jogo:**
1. Lobby interno com partículas flutuantes e pills das fases
2. Tabuleiro com HUD ativo
3. Modal de fase concluída com curiosidade educativa
4. Modal de game over com opções de retry ou volta ao lobby
5. Tela final com animações e conquistas

**Engine — 15 seções organizadas:**

```
1. Dados das fases        6. Carregamento        11. Reinício
2. Estado global          7. Construção do board  12. HUD
3. Seletores DOM          8. Preview inicial      13. Utilitários
4. Navegação              9. Lógica de clique     14. Event listeners
5. Aplicação de tema     10. Eventos              15. Init
```

**Fontes:** Righteous + Nunito | **Responsivo:** até 380px

---

### 🦸 EcoHero — Jogo Fullstack de Gestão Ambiental

EcoHero é o jogo fullstack da plataforma, com integração completa ao backend, persistência em JSON e sistema de ranking.

**Funcionalidades:**
- Gerenciamento de jogadores e perfis
- Sistema de cidades com progresso individual
- Ranking global persistido
- APIs REST dedicadas por domínio

**Módulos do backend:**

```plaintext
controllers/
├── ecohero.city.controller.js      # Lógica de cidades
├── ecohero.player.controller.js    # Gestão de jogadores
└── ecohero.ranking.controller.js   # Sistema de ranking

routes/
├── ecohero.city.routes.js
├── ecohero.player.routes.js
└── ecohero.ranking.routes.js

services/
├── ecohero.city.service.js
├── ecohero.player.service.js
└── ecohero.ranking.service.js
```

Cada camada (controller → service → persistência) segue separação clara de responsabilidades.

---

## 🖥️ Lobby Principal

O lobby funciona como homepage da plataforma e ponto de navegação central.

**Componentes:**

| Seção | Descrição |
|---|---|
| Header | Nome EcoGames + tagline "Educação Ambiental Interativa" |
| Hero | "Bem-vindo, Guardião do Planeta" + botão "Iniciar Missão" |
| Missão | Apresentação do propósito educacional |
| Stat Cards | 3 jogos · 100% interativo · Impacto Sustentável |
| Grid de jogos | Cards clicáveis para cada minigame |
| Footer | Copyright 2026 |

---

## 🚀 Como Executar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm v9 ou superior

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/game-educativo.git
cd game-educativo
```

### 2. Instale as dependências do backend

```bash
cd backend
npm install
```

### 3. Inicie o servidor

```bash
npm start
```

O servidor estará disponível em `http://localhost:3000` (ou a porta configurada no `server.js`).

### 4. Acesse a plataforma

Abra o `index.html` diretamente no navegador ou configure um servidor estático para a raiz do projeto.

```bash
# Opção com Live Server (VS Code) ou npx serve
npx serve .
```

Acesse: `http://localhost:5000`

---

## 📜 Scripts Disponíveis

Execute os comandos a partir da pasta `/backend`:

| Script | Comando | Descrição |
|---|---|---|
| Iniciar servidor | `npm start` | Sobe o Express em produção |
| Modo desenvolvimento | `npm run dev` | Reinício automático com nodemon |

---

## 🔭 Roadmap

- [x] Lobby central com navegação entre jogos
- [x] GreenMemo — jogo da memória com 5 fases
- [x] EcoHero — jogo fullstack com ranking e cidades
- [ ] Novo jogo: **EcoQuiz** — quiz de perguntas ambientais com timer
- [ ] Novo jogo: **EcoBuilder** — construtor de cidades sustentáveis
- [ ] Sistema de autenticação global (login/perfil unificado)
- [ ] Painel de administração para professores
- [ ] PWA — suporte offline para os jogos frontend-only
- [ ] Internacionalização (i18n) — suporte a inglês e espanhol

---

## ⚙️ Decisões Arquiteturais

### Backend único, módulos independentes

Optou-se por um único servidor Express para toda a plataforma, evitando a complexidade de múltiplos processos. A independência é garantida pelo prefixo de nomenclatura por jogo em todos os arquivos do backend:

```
ecohero.city.controller.js
ecohero.player.routes.js
ecohero.ranking.service.js
```

### Sem estado global entre jogos

Não existe entidade global de `player`, `ranking` ou `score`. Cada jogo define seu próprio modelo de dados, permitindo que as regras evoluam sem impacto nos demais módulos.

### JSON como banco de dados

O uso de `database.json` elimina a necessidade de configurar um SGBD, tornando o projeto simples de executar localmente e ideal para fins educacionais e de portfólio.

### Frontend desacoplado

Jogos com lógica apenas no cliente (como GreenMemo) não dependem do backend de forma alguma. Isso permite que rodem de forma standalone, sem que o servidor esteja ativo.

---

## 🌟 Diferenciais Técnicos

- **Flip 3D real via CSS puro** — sem bibliotecas externas para as animações de carta
- **Temas visuais por fase** — sistema de variáveis CSS customizadas trocadas dinamicamente em runtime
- **Engine organizada em seções** — arquivo único de 15 módulos funcionais para facilitar manutenção
- **Arquitetura prefix-based** — convenção de nomenclatura que escala naturalmente para N jogos
- **Zero frameworks no frontend** — HTML, CSS e JS Vanilla em todos os jogos, demonstrando domínio dos fundamentos
- **Design responsivo** — layout adaptado até 380px de largura

---

## 🤝 Como Contribuir

Contribuições são bem-vindas! Para adicionar um novo minigame ou melhorar os existentes:

1. Faça um fork do repositório
2. Crie uma branch com o nome do seu jogo: `git checkout -b feat/nome-do-jogo`
3. Siga a estrutura modular estabelecida:
   - Frontend isolado em `nome-do-jogo/frontend/`
   - Se necessário, adicione módulos no backend com prefixo `nome-do-jogo.*`
   - Integre o card do jogo no lobby
4. Abra um Pull Request com a descrição do jogo e suas mecânicas

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

<div align="center">

**EcoGames** — Transformando educação ambiental em experiência.

Feito com 💚 e compromisso com o futuro do planeta.

</div>
