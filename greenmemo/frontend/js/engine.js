/* ═══════════════════════════════════════════════════════
   GREENMEMO — engine.js
   Jogo da memória educativo sobre sustentabilidade
   Sem frameworks. Puro HTML/CSS/JS.
═══════════════════════════════════════════════════════ */

"use strict";

/* ──────────────────────────────────────────────────────
   1. DADOS DAS FASES
────────────────────────────────────────────────────── */
const PHASES = [
  {
    id: 1,
    title: "🌊 Guardiões da Água",
    tag: "Fase 1 — Água",
    question: "Encontre os pares e descubra como a água é preciosa para o planeta!",
    answer: "Fechar a torneira ao escovar os dentes economiza até 12 litros por escovação. Um banho de 5 minutos usa em torno de 45 litros — já o banho de banheira pode desperdiçar mais de 300 litros!",
    symbols: ["💧", "🚰", "🌊", "🚿", "🐟", "🌧️"],
    pairs: 6,
    previewTime: 3000,
    theme: {
      gradient:  "linear-gradient(145deg, #b3e5fc 0%, #e1f5fe 50%, #f0f9ff 100%)",
      primary:   "#0288d1",
      light:     "#e1f5fe",
      cardBg:    "linear-gradient(145deg, #29b6f6, #0288d1)",
      cardFace:  "#f0f9ff",
      bodyBg:    "linear-gradient(145deg, #b3e5fc, #e1f5fe, #ffffff)",
    },
  },
  {
    id: 2,
    title: "🌳 Floresta Viva",
    tag: "Fase 2 — Floresta",
    question: "Cada árvore é um lar. Encontre os guardiões da floresta!",
    answer: "Uma única árvore pode absorver até 22 kg de CO₂ por ano. Florestas tropicais abrigam 50% de todas as espécies terrestres do planeta e regulam o ciclo das chuvas de continentes inteiros.",
    symbols: ["🌳", "🦋", "🐦", "🍄", "🦊", "🌿", "🍃", "🌺"],
    pairs: 8,
    previewTime: 3500,
    theme: {
      gradient:  "linear-gradient(145deg, #c8e6c9 0%, #e8f5e9 50%, #f1f8e9 100%)",
      primary:   "#2e7d32",
      light:     "#e8f5e9",
      cardBg:    "linear-gradient(145deg, #66bb6a, #2e7d32)",
      cardFace:  "#f1f8e9",
      bodyBg:    "linear-gradient(145deg, #c8e6c9, #e8f5e9, #ffffff)",
    },
  },
  {
    id: 3,
    title: "⚡ Energia Limpa",
    tag: "Fase 3 — Energia",
    question: "O futuro é renovável! Descubra os pares de energia do planeta.",
    answer: "A energia solar é a mais abundante da Terra: em apenas 1 hora, o Sol envia energia suficiente para abastecer o planeta por um ano inteiro. Turbinas eólicas modernas podem gerar eletricidade para mais de 1.500 casas!",
    symbols: ["☀️", "💨", "🌊", "⚡", "🔋", "🌿", "🏭", "🚗"],
    pairs: 8,
    previewTime: 3500,
    theme: {
      gradient:  "linear-gradient(145deg, #fff9c4 0%, #fff8e1 50%, #fffde7 100%)",
      primary:   "#f57f17",
      light:     "#fff8e1",
      cardBg:    "linear-gradient(145deg, #ffca28, #f57f17)",
      cardFace:  "#fffde7",
      bodyBg:    "linear-gradient(145deg, #fff9c4, #fff8e1, #ffffff)",
    },
  },
  {
    id: 4,
    title: "♻️ Reciclagem Inteligente",
    tag: "Fase 4 — Reciclagem",
    question: "Cada resíduo tem um destino certo. Combine os materiais recicláveis!",
    answer: "Reciclar 1 tonelada de papel poupa 17 árvores e 26.000 litros de água. Uma lata de alumínio reciclada economiza energia suficiente para a TV funcionar por 3 horas. O vidro pode ser reciclado infinitas vezes sem perder qualidade!",
    symbols: ["♻️", "📦", "🥤", "🗑️", "🌍", "🏭", "🧴", "📄", "🔧", "🌱"],
    pairs: 10,
    previewTime: 4000,
    theme: {
      gradient:  "linear-gradient(145deg, #ffe0b2 0%, #fff3e0 50%, #fafafa 100%)",
      primary:   "#e64a19",
      light:     "#fff3e0",
      cardBg:    "linear-gradient(145deg, #ff7043, #e64a19)",
      cardFace:  "#fff3e0",
      bodyBg:    "linear-gradient(145deg, #ffe0b2, #fff3e0, #ffffff)",
    },
  },
  {
    id: 5,
    title: "🐠 Oceanos Vivos",
    tag: "Fase 5 — Oceanos",
    question: "O oceano cobre 71% do planeta. Proteja a vida marinha!",
    answer: "Os oceanos produzem mais de 50% do oxigênio que respiramos. Estima-se que 8 milhões de toneladas de plástico entram nos mares todo ano — afetando mais de 700 espécies marinhas. Recifes de coral, apesar de cobrirem menos de 1% do fundo do mar, abrigam 25% de todas as espécies oceânicas.",
    symbols: ["🐠", "🐋", "🦈", "🐙", "🦀", "🐚", "🌊", "⚓", "🦞", "🐟", "🐬", "🪸"],
    pairs: 12,
    previewTime: 4500,
    theme: {
      gradient:  "linear-gradient(145deg, #1a237e 0%, #283593 40%, #1565c0 70%, #1976d2 100%)",
      primary:   "#0d47a1",
      light:     "#e3f2fd",
      cardBg:    "linear-gradient(145deg, #1565c0, #0d47a1)",
      cardFace:  "#e3f2fd",
      bodyBg:    "linear-gradient(145deg, #b3cde8, #dbeafe, #e0f2fe)",
    },
  },
];


/* ──────────────────────────────────────────────────────
   2. ESTADO DO JOGO
────────────────────────────────────────────────────── */
const State = {
  currentPhase: 0,     // índice em PHASES
  lives: 5,
  score: 0,
  flipped: [],         // cards virados aguardando comparação
  locked: false,       // bloqueia cliques durante animação
  matched: 0,          // pares encontrados nesta fase
  previewing: false,   // durante preview inicial
};

function resetState() {
  State.flipped   = [];
  State.locked    = false;
  State.matched   = 0;
  State.previewing = false;
}


/* ──────────────────────────────────────────────────────
   3. SELETORES DOM
────────────────────────────────────────────────────── */
const $ = id => document.getElementById(id);

const DOM = {
  lobby:         $("lobby"),
  gameScreen:    $("game-screen"),
  endScreen:     $("end-screen"),
  board:         $("game-board"),
  phaseTag:      $("phase-tag"),
  phaseTitle:    $("phase-title"),
  question:      $("question"),
  lives:         $("lives"),
  score:         $("score"),
  indicator:     $("phase-indicator"),
  modalPhase:    $("modal-phase"),
  answerText:    $("answer-text"),
  modalIcon:     $("modal-icon"),
  modalGameover: $("modal-gameover"),
  finalScore:    $("final-score"),
  finalStars:    $("final-stars"),
  startBtn:      $("start-btn"),
  nextPhaseBtn:  $("next-phase"),
  restartBtn:    $("restart"),
  retryBtn:      $("retry-btn"),
  lobbyBtn:      $("lobby-btn"),
  playAgainBtn:  $("play-again"),
};


/* ──────────────────────────────────────────────────────
   4. NAVEGAÇÃO ENTRE TELAS
────────────────────────────────────────────────────── */
function showScreen(id) {
  ["lobby", "game-screen", "end-screen"].forEach(sid => {
    const el = document.getElementById(sid);
    el.classList.remove("active");
    el.classList.add("hidden");
  });
  const target = document.getElementById(id);
  target.classList.remove("hidden");
  target.classList.add("active");
}

function showModal(id) {
  $(id).classList.remove("hidden");
}

function hideModal(id) {
  $(id).classList.add("hidden");
}


/* ──────────────────────────────────────────────────────
   5. TEMA VISUAL DA FASE
────────────────────────────────────────────────────── */
function applyTheme(theme) {
  const r = document.documentElement.style;
  r.setProperty("--phase-primary",   theme.primary);
  r.setProperty("--phase-light",     theme.light);
  r.setProperty("--phase-card-face", theme.cardFace);
  // gradient via body background
  document.body.style.background = theme.bodyBg;
  document.body.style.backgroundSize = "300% 300%";
}


/* ──────────────────────────────────────────────────────
   6. CARREGAR FASE
────────────────────────────────────────────────────── */
function loadPhase() {
  const phase = PHASES[State.currentPhase];
  resetState();
  applyTheme(phase.theme);

  // HUD
  DOM.phaseTag.textContent   = phase.tag;
  DOM.phaseTitle.textContent = phase.title;
  DOM.question.textContent   = phase.question;
  DOM.indicator.textContent  = `${State.currentPhase + 1}/${PHASES.length}`;
  updateHUD();

  // Board layout
  const cols = calcCols(phase.pairs * 2);
  DOM.board.style.setProperty("--cols", cols);

  buildBoard(phase);
}

function calcCols(total) {
  if (total <= 8)  return 4;
  if (total <= 12) return 4;
  if (total <= 16) return 4;
  if (total <= 20) return 5;
  return 6;
}

/* ──────────────────────────────────────────────────────
   7. CONSTRUIR TABULEIRO
────────────────────────────────────────────────────── */
function buildBoard(phase) {
  DOM.board.innerHTML = "";

  // Duplicar símbolos e embaralhar
  const symbols = shuffle([...phase.symbols, ...phase.symbols]);

  // Calcular tamanho de carta responsivo
  const cardSize = getCardSize(symbols.length);

  symbols.forEach((symbol, idx) => {
    const card = createCard(symbol, cardSize, phase.theme);
    card.dataset.index = idx;
    DOM.board.appendChild(card);
  });

  startPreview(phase.previewTime);
}

function getCardSize(total) {
  const vw = window.innerWidth;
  if (vw <= 380) return total > 16 ? 58 : 68;
  if (vw <= 520) return total > 16 ? 64 : 76;
  return total > 16 ? 76 : 90;
}

function createCard(symbol, size, theme) {
  const card = document.createElement("div");
  card.classList.add("card", "flipped"); // começa revelada no preview
  card.style.width  = size + "px";
  card.style.height = size + "px";
  card.dataset.symbol = symbol;

  const inner = document.createElement("div");
  inner.classList.add("card-inner");

  const back = document.createElement("div");
  back.classList.add("card-back");
  back.style.background = theme.cardBg;

  const front = document.createElement("div");
  front.classList.add("card-front");
  front.style.background = theme.cardFace;
  front.textContent = symbol;

  inner.appendChild(back);
  inner.appendChild(front);
  card.appendChild(inner);

  card.addEventListener("click", onCardClick);
  return card;
}


/* ──────────────────────────────────────────────────────
   8. PREVIEW DAS CARTAS
────────────────────────────────────────────────────── */
function startPreview(duration) {
  State.previewing = true;
  State.locked = true;

  // Barra de progresso do preview
  injectPreviewBanner(duration);

  setTimeout(() => {
    hideAllCards();
    removePreviewBanner();
    State.previewing = false;
    State.locked = false;
  }, duration);
}

function hideAllCards() {
  document.querySelectorAll(".card").forEach(card => {
    card.classList.remove("flipped");
  });
}

function injectPreviewBanner(duration) {
  removePreviewBanner();
  const banner = document.createElement("div");
  banner.id = "preview-banner";
  banner.innerHTML = `
    <p class="preview-banner">👀 Memorize as cartas!</p>
    <div class="preview-bar">
      <div class="preview-bar-fill" style="--preview-time:${duration}ms"></div>
    </div>
  `;
  DOM.board.insertAdjacentElement("beforebegin", banner);
}

function removePreviewBanner() {
  const old = document.getElementById("preview-banner");
  if (old) old.remove();
}


/* ──────────────────────────────────────────────────────
   9. LÓGICA DE CLIQUE E COMPARAÇÃO
────────────────────────────────────────────────────── */
function onCardClick() {
  if (State.locked)  return;
  if (State.previewing) return;
  if (this.classList.contains("flipped"))  return;
  if (this.classList.contains("matched"))  return;
  if (State.flipped.length === 2) return;

  this.classList.add("flipped");
  State.flipped.push(this);

  if (State.flipped.length === 2) {
    State.locked = true;
    checkMatch();
  }
}

function checkMatch() {
  const [c1, c2] = State.flipped;

  if (c1.dataset.symbol === c2.dataset.symbol) {
    // Par encontrado!
    State.score += 10;
    State.matched++;

    setTimeout(() => {
      c1.classList.add("matched");
      c2.classList.add("matched");
      State.flipped = [];
      State.locked  = false;
      updateHUD();

      const phase = PHASES[State.currentPhase];
      if (State.matched === phase.pairs) {
        setTimeout(onPhaseComplete, 450);
      }
    }, 400);

  } else {
    // Errou
    State.lives--;
    updateHUD();

    c1.classList.add("wrong");
    c2.classList.add("wrong");

    setTimeout(() => {
      c1.classList.remove("flipped", "wrong");
      c2.classList.remove("flipped", "wrong");
      State.flipped = [];
      State.locked  = false;

      if (State.lives <= 0) {
        onGameOver();
      }
    }, 700);
  }
}


/* ──────────────────────────────────────────────────────
   10. EVENTOS DE FASE / JOGO
────────────────────────────────────────────────────── */
function onPhaseComplete() {
  const phase = PHASES[State.currentPhase];
  const isLast = State.currentPhase === PHASES.length - 1;

  DOM.answerText.textContent = phase.answer;
  DOM.modalIcon.textContent = isLast ? "🏆" : "✨";

  const nextBtn = DOM.nextPhaseBtn;
  nextBtn.textContent = isLast ? "Ver Resultado Final 🌍" : "Próxima Fase →";

  showModal("modal-phase");
}

function onGameOver() {
  showModal("modal-gameover");
}

function advancePhase() {
  hideModal("modal-phase");

  if (State.currentPhase < PHASES.length - 1) {
    State.currentPhase++;
    loadPhase();
  } else {
    showEndScreen();
  }
}

function showEndScreen() {
  DOM.finalScore.textContent = State.score;
  DOM.finalStars.textContent = calcStars(State.score);
  showScreen("end-screen");
}

function calcStars(score) {
  if (score >= 200) return "⭐⭐⭐";
  if (score >= 100) return "⭐⭐";
  return "⭐";
}


/* ──────────────────────────────────────────────────────
   11. REINÍCIO
────────────────────────────────────────────────────── */
function restartCurrentPhase() {
  State.lives   = 5;
  State.flipped = [];
  State.locked  = false;
  State.matched = 0;
  updateHUD();
  buildBoard(PHASES[State.currentPhase]);
}

function goToLobby() {
  hideModal("modal-gameover");
  State.currentPhase = 0;
  State.lives  = 5;
  State.score  = 0;
  resetState();
  document.body.style.background = "";
  document.documentElement.style.removeProperty("--phase-primary");
  document.documentElement.style.removeProperty("--phase-light");
  showScreen("lobby");
}

function startFreshGame() {
  State.currentPhase = 0;
  State.lives  = 5;
  State.score  = 0;
  resetState();
  showScreen("game-screen");
  loadPhase();
}


/* ──────────────────────────────────────────────────────
   12. HUD
────────────────────────────────────────────────────── */
function updateHUD() {
  DOM.lives.textContent     = State.lives;
  DOM.score.textContent     = State.score;
  DOM.indicator.textContent = `${State.currentPhase + 1}/${PHASES.length}`;

  // Pulsa quando perde vida
  DOM.lives.parentElement.style.animation = "none";
  requestAnimationFrame(() => {
    DOM.lives.parentElement.style.animation = "";
  });
}


/* ──────────────────────────────────────────────────────
   13. UTILITÁRIOS
────────────────────────────────────────────────────── */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


/* ──────────────────────────────────────────────────────
   14. EVENT LISTENERS
────────────────────────────────────────────────────── */
DOM.startBtn.addEventListener("click", () => {
  startFreshGame();
});

DOM.nextPhaseBtn.addEventListener("click", advancePhase);

DOM.restartBtn.addEventListener("click", () => {
  restartCurrentPhase();
});

DOM.retryBtn.addEventListener("click", () => {
  hideModal("modal-gameover");
  restartCurrentPhase();
});

DOM.lobbyBtn.addEventListener("click", goToLobby);

DOM.playAgainBtn.addEventListener("click", () => {
  goToLobby();
});


/* ──────────────────────────────────────────────────────
   15. INIT
────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  showScreen("lobby");
});
