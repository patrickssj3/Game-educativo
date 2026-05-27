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

export function getCityData() {
  const database = readDatabase();

  return database.city;
}

export function addMissionResult(missionData) {
  const database = readDatabase();

  database.missions.push({
    id: Date.now(),
    ...missionData
  });

  if (missionData.cityState) {
    database.city = missionData.cityState;
  }

  saveDatabase(database);

  return database.city;
}