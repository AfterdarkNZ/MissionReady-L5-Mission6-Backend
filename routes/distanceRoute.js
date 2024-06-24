const express = require("express");
const app = express();
app.use(express.json());
const router = express.Router();
require("dotenv").config();

const distanceController = require("../controllers/distanceController");

router.post("/api/distance-calc", (req, res) => {
  console.log("Distance calc hit");
  const address = req.body.address;
  const fuelType = req.body.fuelType ? req.body.fuelType : "all";
  distanceController(address).then((result) => {
    res.send({ fuelType: fuelType, result });
  });
});

module.exports = router;
