let cityState = {
  pollution: 85,
  water: 25,
  trees: 15,
  energy: 30,
  happiness: 20
};

let missionHistory = [];

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

function getCityProgress() {
  return Math.round(
    (
      (100 - cityState.pollution) +
      cityState.water +
      cityState.trees +
      cityState.energy +
      cityState.happiness
    ) / 5
  );
}

function updateCityState(changes) {
  cityState.pollution = clamp(cityState.pollution + (changes.pollution || 0));
  cityState.water = clamp(cityState.water + (changes.water || 0));
  cityState.trees = clamp(cityState.trees + (changes.trees || 0));
  cityState.energy = clamp(cityState.energy + (changes.energy || 0));
  cityState.happiness = clamp(cityState.happiness + (changes.happiness || 0));

  renderCity();
}