import { MongoClient } from "mongodb";

async function listDatabases(client) {
  let databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function main() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await listDatabases(client);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

main().catch(console.e);
