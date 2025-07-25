// lib/db.js  — native driver helper
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

let cachedDB;                                // reuse on subsequent calls

async function getDB() {
  if (cachedDB) return cachedDB;             // already connected
  if (!client.topology) await client.connect();
  cachedDB = client.db('Allpacstore');       // default DB name
  return cachedDB;
}

module.exports = getDB;
