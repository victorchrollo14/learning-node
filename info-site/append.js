import { MongoClient } from "mongodb";
import { players } from "./data.js";

const URI = "mongodb://localhost:27017";
const client = new MongoClient(URI);
const dbName = "Football";
const collName = "players";
let existingData = [];
console.log(players.length);

const getData = async (collection) => {
  const cursor = await collection.find();
  for await (let doc of cursor) {
    existingData.push(doc);
  }

  return existingData;
};

const getUniqueData = (data) => {
  const newList = players.filter((player) => {
    let isNotPresent = !data.some(
      (existingPlayer) => existingPlayer.name === player.name
    );
    if (isNotPresent) return player;
  });
  return newList;
};

const options = { ordered: true };

async function append() {
  try {
    await client.connect();
    const myColl = client.db(dbName).collection(collName);
    const data = await getData(myColl);
    const uniqueList = getUniqueData(data);

    const result = await myColl.insertMany(uniqueList, options);
    console.log(`inserted ${result.insertedCount} documents`);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

append().catch(console.error);
