import express from "express";

import {
  getCity,
  saveMission
} from "../controllers/ecohero.city.controller.js";

const router = express.Router();

router.get("/", getCity);
router.post("/mission", saveMission);

export default router;