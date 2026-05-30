import {
  getRankingData,
  addRankingScore
} from "../services/ecohero.ranking.service.js";

export function getRanking(req, res) {
  const ranking = getRankingData();

  res.json(ranking);
}

export function saveRanking(req, res) {
  const { name, score } = req.body;

  if (!name || score === undefined) {
    return res.status(400).json({
      message: "Nome e pontuação são obrigatórios"
    });
  }

  const ranking = addRankingScore(name, score);

  res.status(201).json({
    message: "Pontuação salva",
    ranking: ranking
  });
}