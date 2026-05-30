const API_URL = "http://localhost:3000/api";

async function requestApi(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json"
      },
      ...options
    });

    if (!response.ok) {
      throw new Error("Erro na requisição com a API");
    }

    return await response.json();
  } catch (error) {
    console.log("API indisponível:", error.message);
    return null;
  }
}

async function loadGlobalCity() {
  return await requestApi("/city");
}

async function saveMissionResult(data) {
  return await requestApi("/city/mission", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

async function createPlayer(playerName) {
  return await requestApi("/player", {
    method: "POST",
    body: JSON.stringify({
      name: playerName
    })
  });
}

async function getRanking() {
  return await requestApi("/ranking");
}

async function saveRanking(playerName, score) {
  return await requestApi("/ranking", {
    method: "POST",
    body: JSON.stringify({
      name: playerName,
      score: score
    })
  });
}