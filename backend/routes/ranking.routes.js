import express from "express";

import {
  getRanking,
  saveRanking
} from "../controllers/ranking.controller.js";

const router = express.Router();

router.get("/", getRanking);
router.post("/", saveRanking);

export default router;