const { MongoClient } = require("mongodb");
require("dotenv").config();
const axios = require("axios");

// .env variables
const apiKey = process.env.API_KEY;
const uri = process.env.MONGODB_URI;
const database = process.env.DATABASE;
const collection = process.env.COLLECTION;

const client = new MongoClient(uri);

const distanceController = async (address) => {
  try {
    return new Promise(async (resolve, reject) => {
      await client.connect();
      const cursor = client.db(database).collection(collection).find();
      const stations = await cursor.toArray();
      let stationsInTwentyKm = [];

      stations.forEach(async (station, index) => {
        getDistances(station).then(async (result) => {
          if (result.inTwenty) {
            // Add all stations that are within twenty kms of origin
            thisStation = { ...station, distance: result.distance };
            stationsInTwentyKm = [...stationsInTwentyKm, thisStation];
          }
          if (index == stations.length - 1) {
            // console.log("STATIONS", stationsInTwentyKm);
            resolve(stationsInTwentyKm);
            await client.close();
            return;
          }
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const getDistances = async (station) => {
  const origin = "70 Baverstock Road, Flat Bush, Auckland 2016, New Zealand";
  const destination = `${station.location.lat}, ${station.location.lng}`;
  let distanceText;

  await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`
  )
    .then((response) => response.json())
    .then((result) => {
      //   console.log(result.rows[0].elements[0].distance.text);
      distanceText = result.rows[0].elements[0].distance.text;
    });
  const distanceInKm = distanceText.substring(0, 4);
  // The distance as a float
  const floatDistanceInKm = parseFloat(distanceInKm);
  // Declares wether or not the location is within 20 kms
  const inTwenty = floatDistanceInKm <= 20 ? true : false;
  return { inTwenty: inTwenty, distance: floatDistanceInKm };
};

module.exports = distanceController;
