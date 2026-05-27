const npcMessages = {
  low: [
    "Tem muito lixo acumulado perto das casas.",
    "O rio ainda está escuro. A água precisa de cuidado.",
    "A fábrica está soltando muita fumaça.",
    "O bairro parece abandonado, mas ainda dá para recuperar."
  ],
  medium: [
    "Já dá para notar uma pequena melhora.",
    "As pessoas começaram a participar das ações.",
    "O bairro está no caminho certo.",
    "Mais algumas missões e isso aqui vai mudar bastante."
  ],
  high: [
    "O bairro está ficando bonito de novo!",
    "As árvores trouxeram vida para a comunidade.",
    "Agora as pessoas parecem mais felizes.",
    "Esse lugar virou exemplo de cuidado ambiental."
  ]
};

function updateNpcMessage() {
  const progress = getCityProgress();

  let list;

  if (progress < 40) {
    list = npcMessages.low;
  } else if (progress < 70) {
    list = npcMessages.medium;
  } else {
    list = npcMessages.high;
  }

  const message = list[Math.floor(Math.random() * list.length)];
  npcText.textContent = message;
}