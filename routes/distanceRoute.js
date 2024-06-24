const express = require("express");
const app = express();
app.use(express.json());
const router = express.Router();
require("dotenv").config();

const distanceController = require("../controllers/distanceController");

router.post("/api/distance-calc", (req, res) => {
  console.log("Distance calc hit");
  console.log(req.body);
  const result = distanceController("70 Baverstock road");
  console.log(result);
  res.send("WORKING");
});

module.exports = router;
