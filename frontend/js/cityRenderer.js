const city = document.getElementById("city");

const pollutionValue = document.getElementById("pollutionValue");
const waterValue = document.getElementById("waterValue");
const treesValue = document.getElementById("treesValue");
const energyValue = document.getElementById("energyValue");
const happinessValue = document.getElementById("happinessValue");

const cityProgressText = document.getElementById("cityProgressText");
const cityProgressBar = document.getElementById("cityProgressBar");

const npcText = document.getElementById("npcText");
const npc = document.getElementById("npc");

function renderCity() {
  pollutionValue.textContent = cityState.pollution;
  waterValue.textContent = cityState.water;
  treesValue.textContent = cityState.trees;
  energyValue.textContent = cityState.energy;
  happinessValue.textContent = cityState.happiness;

  const progress = getCityProgress();

  cityProgressText.textContent = progress + "%";
  cityProgressBar.style.width = progress + "%";

  city.classList.remove("clean", "polluted");

  if (progress >= 65) {
    city.classList.add("clean");
    npc.textContent = "😄";
    npcText.textContent =
      "O bairro está mudando! Dá para ver que as ações estão fazendo diferença.";
  } else if (progress <= 40) {
    city.classList.add("polluted");
    npc.textContent = "😟";
    npcText.textContent =
      "Ainda tem muita coisa para melhorar. O bairro precisa de ajuda.";
  } else {
    npc.textContent = "🙂";
    npcText.textContent =
      "Estamos no caminho. Continue fazendo ações sustentáveis.";
  }

  updateWeather();
}