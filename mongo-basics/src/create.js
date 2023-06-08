import { MongoClient } from "mongodb";
const URI = "mongodb://localhost:27017/";

const print = (value) => {
  console.log(value);
};

const main = async () => {
  const client = new MongoClient(URI);
  try {
    // connect to your mongo server
    await client.connect();
    print("connection established");

    // creating database and collection
    const database = client.db("Football");
    database.createCollection("players");
    client.close();
  } catch (error) {
    print(error);
  }
};

main();
