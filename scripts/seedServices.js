const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const { MongoClient } = require('mongodb');
require('dotenv').config();
const path = require('path');
const services = require('../src/data/services.json');

async function seed() {
  const uri = process.env.MONGODB_URI;
  const dbname = process.env.DBNAME || 'carexyz';
  if (!uri) {
    console.error('MONGODB_URI not set in .env');
    process.exit(1);
  }

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(dbname);
    const coll = db.collection('services');

    // wipe and insert
    await coll.deleteMany({});
    const result = await coll.insertMany(services.map(s => {
      const copy = { ...s };
      delete copy._id; // let Mongo generate ObjectId
      return copy;
    }));

    console.log(`Inserted ${result.insertedCount} services into ${dbname}.services`);
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await client.close();
  }
}

seed();
