import fs from "fs";

const DATABASE_PATH = "./database.json";

export function createPlayer(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Nome do jogador é obrigatório"
    });
  }

  const database = JSON.parse(
    fs.readFileSync(DATABASE_PATH, "utf-8")
  );

  const player = {
    id: Date.now(),
    name: name
  };

  database.players.push(player);

  fs.writeFileSync(
    DATABASE_PATH,
    JSON.stringify(database, null, 2)
  );

  res.status(201).json({
    message: "Jogador criado",
    player: player
  });
}