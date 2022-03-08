import { Low, JSONFile } from "lowdb";

let db;

async function connectToDB() {
  const adapter = new JSONFile("./db/db.json");
  db = new Low(adapter);
  await db.read();
  db.data = db.data || { messages: [] };
  console.log("Connected to LowDB");
}

const getDB = () => db;

export { connectToDB, getDB };
