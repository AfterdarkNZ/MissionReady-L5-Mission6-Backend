# Using this api

This api connects to a MongoDb database. In this repository there is a json file place this into a mongoDb database.

The distance route uses the google maps api so you will need an api key. Ensure the web javascript api and the distance matrix api is enabled.

To get started npm i to install all the dependencies. Then follow the next instructions.

## .env

The .env file has five variables

1. PORT
   This is the port number the server will be active on

2. API_KEY
   Include your google maps api key

3. MONGODB_URI
   You will need your mongoDb connection string.

4. DATABASE
   This is the name of your database.

5. COLLECTION
   This is the name of the collection your data is stored in.

There are two routes that you can use.

1. /api/stations
   It is a get request that will return all of the stations in the collection.

2. /api/distance-calc
   This is a post request. It takes two parameters. The first is address and the second is fuelType. It will return all stations that are within 20km of the supplied address and the given fuelType. If no fuelType is given then it returns all. (The fuel types that are included within the supplied data are 91, 95 and diesel).
