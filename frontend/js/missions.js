const missionPanel = document.getElementById("missionPanel");
const missionTitle = document.getElementById("missionTitle");
const missionDescription = document.getElementById("missionDescription");
const missionTime = document.getElementById("missionTime");
const missionScore = document.getElementById("missionScore");
const missionArea = document.getElementById("missionArea");

let currentMission = null;
let missionTimer = null;
let spawnTimer = null;
let missionSeconds = 20;
let collectedItems = 0;

const missionConfigs = {
  recycle: {
    title: "Mutirão de reciclagem",
    description:
      "Clique nos resíduos espalhados pelo bairro antes que o tempo acabe.",
    items: ["🥤", "🛍️", "🧃", "🗑️", "📦"],
    successText:
      "O mutirão retirou resíduos das ruas. A coleta seletiva começou a funcionar melhor.",

    getImpact(score) {
      return {
        pollution: -Math.min(25, score * 2),
        happiness: Math.min(15, score)
      };
    }
  },

  water: {
    title: "Cuidar da água",
    description:
      "Clique nos vazamentos para evitar desperdício de água.",
    items: ["💧", "🚰", "🛁"],
    successText:
      "Os vazamentos foram consertados. O rio começa a recuperar sua cor.",

    getImpact(score) {
      return {
        water: Math.min(28, score * 3),
        happiness: Math.min(12, score)
      };
    }
  },

  trees: {
    title: "Plantar árvores",
    description:
      "Clique nas mudas para plantar árvores pelo bairro.",
    items: ["🌱", "🌿", "🌳"],
    successText:
      "Novas árvores foram plantadas. O bairro ficou mais fresco e agradável.",

    getImpact(score) {
      return {
        trees: Math.min(30, score * 3),
        pollution: -Math.min(15, score),
        happiness: Math.min(18, score)
      };
    }
  },

  energy: {
    title: "Economizar energia",
    description:
      "Clique nos aparelhos ligados sem necessidade.",
    items: ["💡", "📺", "🔌", "🖥️"],
    successText:
      "As casas começaram a economizar energia. Menos desperdício, mais consciência.",

    getImpact(score) {
      return {
        energy: Math.min(25, score * 3),
        pollution: -Math.min(12, score),
        happiness: Math.min(12, score)
      };
    }
  }
};

function missionRecycle() {
  startMission("recycle");
}

function missionWater() {
  startMission("water");
}

function missionTrees() {
  startMission("trees");
}

function missionEnergy() {
  startMission("energy");
}

function startMission(type) {
  currentMission = missionConfigs[type];

  missionSeconds = 20;
  collectedItems = 0;

  missionTitle.textContent = currentMission.title;
  missionDescription.textContent = currentMission.description;
  missionTime.textContent = missionSeconds;
  missionScore.textContent = collectedItems;
  missionArea.innerHTML = "";

  missionPanel.classList.remove("escondido");

  spawnMissionItem();

  spawnTimer = setInterval(spawnMissionItem, 700);

  missionTimer = setInterval(function () {
    missionSeconds--;
    missionTime.textContent = missionSeconds;

    if (missionSeconds <= 0) {
      finishCurrentMission();
    }
  }, 1000);
}

function spawnMissionItem() {
  const item = document.createElement("div");

  item.classList.add("mission-item");

  const symbols = currentMission.items;

  item.textContent =
    symbols[Math.floor(Math.random() * symbols.length)];

  const maxX = missionArea.clientWidth - 50;
  const maxY = missionArea.clientHeight - 50;

  item.style.left = Math.floor(Math.random() * maxX) + "px";
  item.style.top = Math.floor(Math.random() * maxY) + "px";

  item.addEventListener("click", function () {
    collectedItems++;
    missionScore.textContent = collectedItems;

    playSuccessSound();

    item.remove();
  });

  missionArea.appendChild(item);

  setTimeout(function () {
    if (item.parentElement) {
      item.remove();
    }
  }, 1800);
}

async function finishCurrentMission() {
  clearInterval(missionTimer);
  clearInterval(spawnTimer);

  missionPanel.classList.add("escondido");
  missionArea.innerHTML = "";

  const impact = currentMission.getImpact(collectedItems);

  updateCityState(impact);

  playMissionEndSound();

  await saveMissionResult({
    mission: currentMission.title,
    actions: collectedItems,
    impact: impact,
    cityState: cityState,
    date: new Date().toISOString()
  });

  await saveRanking("Jogador", getCityProgress());

  renderRanking();

  npcText.textContent =
    currentMission.successText +
    " Resultado: " +
    collectedItems +
    " ações concluídas.";

  showImpactReport(
    currentMission.title,
    collectedItems,
    impact,
    currentMission.successText
  );
}

function resetCity() {
  cityState = {
    pollution: 85,
    water: 25,
    trees: 15,
    energy: 30,
    happiness: 20
  };

  missionHistory = [];

  renderCity();
  renderHistory();

  npcText.textContent = "Nosso bairro precisa de ajuda...";
}