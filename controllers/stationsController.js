const { MongoClient } = require("mongodb");
require("dotenv").config();

// .env variables
const uri = process.env.MONGODB_URI;
const database = process.env.DATABASE;
const collection = process.env.COLLECTION;

const client = new MongoClient(uri);

// Function to get all stations from the database
const getStations = async () => {
  try {
    await client.connect();
    const databaseObject = client.db(database);
    const collectionObject = databaseObject.collection(collection);
    const stations = await collectionObject.find({}).toArray();
    return stations;
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await client.close();
  }
};

module.exports = { getStations };
