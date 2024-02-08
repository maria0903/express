require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
/**
 * @type {import('mongodb').MongoClient}
 */
const client = new MongoClient(uri);

/**
 * @type {import('mongodb').Db}
 */
const database = client.db('notes');

/**
 * @type {import('mongodb').Collection}
 */
const notes = database.collection('notes');

/**
 * 
 * @param {(...argv: any) => any} cb 
 */
async function query(cb) {
  await client.connect();
  const result = await cb();
  await client.close();

  return result;
}

module.exports = {
  client, database, notes, query
};