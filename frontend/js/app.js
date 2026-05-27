async function initializeApp() {
  const globalCity = await loadGlobalCity();

  if (globalCity) {
    cityState = globalCity;
  }

  renderCity();
  renderHistory();
  renderRanking();

  document.body.addEventListener(
    "click",
    enableAudio,
    { once: true }
  );

  setInterval(updateNpcMessage, 9000);
  setInterval(randomWeatherEvent, 18000);
}

initializeApp();