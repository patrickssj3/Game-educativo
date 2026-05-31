const musicaFundo = new Audio("./audio/musica-ecohero.mp3");
musicaFundo.loop = true;
musicaFundo.volume = 0.3;

function iniciarMusica() {
  musicaFundo.play().catch(() => {});
}

function enableAllAudio() {
  enableAudio();
  iniciarMusica();
}

async function initializeApp() {
  const globalCity = await loadGlobalCity();

  if (globalCity) {
    cityState = globalCity;
  }

  renderCity();
  renderHistory();
  renderRanking();

  document.body.addEventListener("click", enableAllAudio, { once: true });

  iniciarMusica();

  setInterval(updateNpcMessage, 9000);
  setInterval(randomWeatherEvent, 18000);
}

initializeApp();