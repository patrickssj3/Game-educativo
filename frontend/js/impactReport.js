const impactPanel = document.getElementById("impactPanel");
const impactTitle = document.getElementById("impactTitle");
const impactSummary = document.getElementById("impactSummary");
const impactDetails = document.getElementById("impactDetails");
const historyList = document.getElementById("historyList");

function showImpactReport(missionName, actions, impact, message) {
  impactTitle.textContent = missionName;
  impactSummary.textContent = message;

  impactDetails.innerHTML = "";

  const impactItems = buildImpactItems(actions, impact);

  impactItems.forEach(function (item) {
    const card = document.createElement("div");
    card.classList.add("impact-card");

    card.innerHTML = `
      <span>${item.label}</span>
      <strong>${item.value}</strong>
    `;

    impactDetails.appendChild(card);
  });

  missionHistory.unshift({
    missionName: missionName,
    actions: actions,
    impact: impact
  });

  renderHistory();

  impactPanel.classList.remove("escondido");
}

function buildImpactItems(actions, impact) {
  const items = [
    {
      label: "Ações concluídas",
      value: actions
    }
  ];

  if (impact.pollution) {
    items.push({
      label: "Poluição",
      value: impact.pollution + "%"
    });
  }

  if (impact.water) {
    items.push({
      label: "Água",
      value: "+" + impact.water + "%"
    });
  }

  if (impact.trees) {
    items.push({
      label: "Árvores",
      value: "+" + impact.trees + "%"
    });
  }

  if (impact.energy) {
    items.push({
      label: "Energia",
      value: "+" + impact.energy + "%"
    });
  }

  if (impact.happiness) {
    items.push({
      label: "Felicidade",
      value: "+" + impact.happiness + "%"
    });
  }

  items.push({
    label: "Progresso atual",
    value: getCityProgress() + "%"
  });

  return items;
}

function renderHistory() {
  historyList.innerHTML = "";

  if (missionHistory.length === 0) {
    historyList.innerHTML = "<li>Nenhuma missão concluída ainda.</li>";
    return;
  }

  missionHistory.slice(0, 6).forEach(function (item) {
    const li = document.createElement("li");
    li.textContent =
      item.missionName + ": " + item.actions + " ações realizadas.";
    historyList.appendChild(li);
  });
}

function closeImpactReport() {
  impactPanel.classList.add("escondido");
}