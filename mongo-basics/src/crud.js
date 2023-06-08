import { MongoClient } from "mongodb";
import { players as playerArray } from "./data.js";

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
    const result = await players.insertOne(doc);
    console.log(`A document was inserted with id = ${result.insertedId}`);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

// insertMany
const createMany = async () => {
  try {
    await client.connect();

    const cName = client.db("Football").collection("players");
    let result = await cName.insertMany(playerArray);
    console.log(`${result.insertedCount} documents were inserted `);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

// query types
const literalQuery = { country: "India" }; // literal
const compareQuery = { goals: { $gt: 500 } }; // comparison
const logicQuery = {
  $and: [
    { goals: { $lt: 500 } },
    { netWorth: { $not: { $eq: "$100 million" } } },
  ],
};
const elementQuery = { country: { $exists: true } };
const evalQuery = { name: { $regex: "L*sM*" } };

// Reading from a database collection
async function read() {
  await client.connect();
  const myColl = client.db("Football").collection("players");
  // literal value queries
  const cursor = myColl.find(elementQuery);
  for await (const doc of cursor) {
    console.dir(doc);
  }
}

// Delete operations
async function Delete() {
  try {
    await client.connect();

    const myColl = client.db("Football").collection("players");
    const result = await myColl.deleteMany();
    console.log(`Deleted ${result.deletedCount} documents`);
  } catch (error) {
    console, log(error);
  } finally {
    client.close();
  }
}

const filter = { name: "Neymar Jr" };
const updateGoals = {
  $set: {
    goals: 490,
    trophies: 23,
  },
};

const replaceDoc = {
  name: "Neymar Jr",
  country: "Brazil",
  goals: 436,
  trophies: 23,
  netWorth: "$200 million",
};

const Update = async () => {
  try {
    await client.connect();

    const database = client.db("Football");
    const myColl = database.collection("players");
    // const result = await myColl.updateOne(filter, updateGoals);
    const result = await myColl.replaceOne(filter, replaceDoc);
    console.log(`${result.modifiedCount} documents modified`);
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

// create().catch(console.dir);
// createMany().catch(console.error);
// read();
// Delete().catch(console.error);

Update();
