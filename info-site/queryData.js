import { MongoClient } from "mongodb";

const URI = "mongodb://localhost:27017";
const dbName = "Football";
const collName = "players";
const player = "kylia";

const client = new MongoClient(URI);

export const getPlayerData = async (player) => {
  await client.connect();
  const myColl = client.db(dbName).collection(collName);

  const playerRegex = new RegExp(player, "i");
  const cursor = await myColl.findOne({ name: { $regex: playerRegex } });
  return cursor;
};

getPlayerData(player);
