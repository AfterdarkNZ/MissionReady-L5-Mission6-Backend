const { MongoClient } = require("mongodb");
require("dotenv").config();
const axios = require("axios");

// .env variables
const apiKey = process.env.API_KEY;
const uri = process.env.MONGODB_URI;
const database = process.env.DATABASE;
const collection = process.env.COLLECTION;

const client = new MongoClient(uri);

let thing = [];

const distanceController = async (address) => {
  console.log(address);

  try {
    await client.connect();

    const result = await getZStation();
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

const getZStation = async () => {
  const cursor = await client.db(database).collection(collection).find();
  const stations = await cursor.toArray();
  let distances = [];

  stations.forEach((station) => {
    getDistances(station);
    // console.log("DONE: ", thing);
  });

  return "STUFF";
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
  const floatDistanceInKm = distanceInKm;
  console.log(typeof distanceInKm);
};

module.exports = distanceController;
