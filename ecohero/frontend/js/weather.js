let currentWeather = "neutral";

function updateWeather() {
  const progress = getCityProgress();

  if (cityState.pollution >= 70) {
    currentWeather = "smog";
  } else if (cityState.water >= 70 && cityState.trees >= 60) {
    currentWeather = "fresh";
  } else if (progress >= 70) {
    currentWeather = "sunny";
  } else {
    currentWeather = "neutral";
  }

  applyWeatherClass();
}

function applyWeatherClass() {
  city.classList.remove(
    "weather-smog",
    "weather-fresh",
    "weather-sunny",
    "weather-neutral"
  );

  city.classList.add(`weather-${currentWeather}`);
}

function randomWeatherEvent() {
  const chance = Math.random();

  if (chance < 0.35 && cityState.pollution > 50) {
    updateCityState({
      pollution: 5,
      happiness: -3
    });

    npcText.textContent =
      "Uma nuvem de poluição passou pelo bairro. Precisamos agir.";

    playWarningSound();
  }

  if (chance > 0.75 && cityState.trees > 40) {
    updateCityState({
      water: 5,
      happiness: 3
    });

    npcText.textContent =
      "Uma chuva leve ajudou as plantas e refrescou o bairro.";
  }
}