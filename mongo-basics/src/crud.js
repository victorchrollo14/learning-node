import { MongoClient } from "mongodb";
// import { URI } from "../src/env.js";

const URI = "mongodb://localhost:27017";
const doc = { _id: crypto.randomUUID(), name: "Pogba", country: "France" };

const client = new MongoClient(URI);

// create document inside collection
const create = async () => {
  try {
    await client.connect();
    console.log("connection established");

    const database = client.db("Football");
    const players = database.collection("players");
    const result = await players.insertOne(doc, { forceServerObjectId: true });
    console.log(`A document was inserted with id = ${result.insertedId}`);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

create().catch(console.dir);
