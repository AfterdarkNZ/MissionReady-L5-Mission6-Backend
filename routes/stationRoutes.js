const express = require("express");
const app = express();
app.use(express.json());
const router = express.Router();
require("dotenv").config();

const stationsController = require("../controllers/stationsController");

// GET all stations
router.get("/api/stations", async (req, res) => {
  const stations = await stationsController.getStations();
  res.json(stations);
});

module.exports = router;
