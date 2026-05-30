import express from "express";

import {
  createPlayer
} from "../controllers/ecohero.player.controller.js";

const router = express.Router();

router.post("/", createPlayer);

export default router;