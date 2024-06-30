# Using this api

<p>This api connects to a MongoDb database. In this repository there is a json file place this into a mongoDb database.</p>

<p>The distance route uses the google maps api so you will need an api key. Ensure the web javascript api and the distance matrix api is enabled.</p>

<p>To get started npm i to install all the dependencies. Then follow the next instructions.</p>

## .env

<p>The .env file has five variables.</p>

1. PORT
<p>This is the port number the server will be active on.</p>

2. API_KEY
   <p>Include your google maps api key.</p>

3. MONGODB_URI
   <p>You will need your mongoDb connection string.</p>

4. DATABASE
   <p>This is the name of your database.</p>

5. COLLECTION
   <p>This is the name of the collection your data is stored in.</p>

## Routes

<p>There are two routes that you can use.</p>

1. /api/stations
   <p>It is a get request that will return all of the stations in the collection.</p>

2. /api/distance-calc
   <p>This is a post request. It takes two parameters. The first is address and the second is fuelType. It will return all stations that are within 20km of the supplied address and the given fuelType. If no fuelType is given then it returns all. (The fuel types that are included within the supplied data are 91, 95 and diesel).</p>
