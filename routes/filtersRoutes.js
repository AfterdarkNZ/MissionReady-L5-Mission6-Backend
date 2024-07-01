const express = require("express");
const router = express.Router();
const filtersController = require("../controllers/filtersController");

// POST route to filter stations by 95 premium fuel price
router.post("/api/filterStations", filtersController.filterStations);

module.exports = router;
