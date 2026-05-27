import express from "express";
import cors from "cors";

import cityRoutes from "./routes/city.routes.js";
import playerRoutes from "./routes/player.routes.js";
import rankingRoutes from "./routes/ranking.routes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.json({
    message: "EcoHero API funcionando"
  });
});

app.use("/api/city", cityRoutes);
app.use("/api/player", playerRoutes);
app.use("/api/ranking", rankingRoutes);

app.listen(PORT, function () {
  console.log(`EcoHero API rodando em http://localhost:${PORT}`);
});