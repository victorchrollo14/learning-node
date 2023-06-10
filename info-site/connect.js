import { MongoClient } from "mongodb";

const client = new MongoClient();
let dName = "Football";
let myColl = "players";

const connect = async () => {
  await client.connect();
};
