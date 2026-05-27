const rankingList = document.getElementById("rankingList");

async function renderRanking() {
  const ranking = await getRanking();

  rankingList.innerHTML = "";

  if (!ranking || ranking.length === 0) {
    rankingList.innerHTML =
      "<li>Nenhuma pontuação registrada.</li>";
    return;
  }

  ranking.slice(0, 5).forEach(function (player, index) {
    const li = document.createElement("li");

    li.textContent =
      `${index + 1}º ${player.name} - ${player.score}%`;

    rankingList.appendChild(li);
  });
}