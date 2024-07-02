const { MongoClient } = require("mongodb");
require("dotenv").config();

// .env variables
const uri = process.env.MONGODB_URI;
const database = process.env.DATABASE;
const collection = process.env.COLLECTION;

const client = new MongoClient(uri);

// Function to fetch and filter stations
const filterStations = async (req, res) => {
  try {
    await client.connect();
    const databaseObject = client.db(database);
    const collectionObject = databaseObject.collection(collection);

    const { extraFilters } = req.body;

    // Initial query for premium fuel filter
    let query = { "fuelPrices.95": { $exists: true } };

    // Add conditions for extra filters (amenities and services)
    if (extraFilters) {
      const andConditions = [];
      Object.keys(extraFilters).forEach((filter) => {
        if (extraFilters[filter]) {
          if (filter === "ultraFast" || filter === "fast") {
            andConditions.push({ evCharging: filter });
          } else {
            andConditions.push({ facilities: filter });
          }
        }
      });
      if (andConditions.length > 0) {
        query = { $and: [query, ...andConditions] };
      }
    }

    const stations = await collectionObject.find(query).toArray();

    res.json(stations);
  } catch (error) {
    console.error("Error filtering stations: ", error);
    res.status(500).send("Server error");
  } finally {
    await client.close();
  }
};

module.exports = { filterStations };
