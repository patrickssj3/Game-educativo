import {
  getCityData,
  addMissionResult
} from "../services/ecohero.city.service.js";

export function getCity(req, res) {
  const city = getCityData();

  res.json(city);
}

export function saveMission(req, res) {
  const missionData = req.body;

  const updatedCity = addMissionResult(missionData);

  res.status(201).json({
    message: "Missão salva com sucesso",
    city: updatedCity
  });
}