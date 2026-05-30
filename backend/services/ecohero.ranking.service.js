import fs from "fs";

const DATABASE_PATH = "./database.json";

function readDatabase() {
  return JSON.parse(
    fs.readFileSync(DATABASE_PATH, "utf-8")
  );
}

function saveDatabase(database) {
  fs.writeFileSync(
    DATABASE_PATH,
    JSON.stringify(database, null, 2)
  );
}

export function getRankingData() {
  const database = readDatabase();

  return database.ranking.sort(function (a, b) {
    return b.score - a.score;
  });
}

export function addRankingScore(name, score) {
  const database = readDatabase();

  const rankingEntry = {
    id: Date.now(),
    name: name,
    score: score,
    createdAt: new Date().toISOString()
  };

  database.ranking.push(rankingEntry);

  database.ranking.sort(function (a, b) {
    return b.score - a.score;
  });

  saveDatabase(database);

  return database.ranking;
}