import express from "express";
import { salvarRanking, obterRanking } from "../controllers/trashdash.controller.js";

const router = express.Router();

// Rota POST (Já existia): Salva uma nova pontuação
router.post("/ranking", salvarRanking);

// NOVA Rota GET: Busca o Top 10
router.get("/ranking", obterRanking);

export default router;