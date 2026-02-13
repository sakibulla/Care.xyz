const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const { MongoClient } = require('mongodb');
require('dotenv').config();
const services = require('../src/data/services-full.json');

async function seed() {
  const uri = process.env.MONGODB_URI;
  const dbname = process.env.DBNAME || 'carexyz';
  
  if (!uri) {
    console.error('❌ MONGODB_URI not set in .env');
    process.exit(1);
  }

  const client = new MongoClient(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  });

  try {
    console.log('🔄 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db(dbname);
    const coll = db.collection('services');

    // Clear existing services
    console.log('🗑️  Clearing existing services...');
    await coll.deleteMany({});

    // Insert new services
    console.log('📝 Inserting new services...');
    const result = await coll.insertMany(services.map(s => {
      const copy = { ...s };
      delete copy._id; // Let MongoDB generate ObjectId
      return copy;
    }));

    console.log(`✅ Successfully inserted ${result.insertedCount} services into ${dbname}.services`);
    console.log('\n📋 Services added:');
    services.forEach((s, i) => {
      console.log(`   ${i + 1}. ${s.title} - $${s.charge_per_hour}/hour, $${s.charge_per_day}/day`);
    });

  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n✅ Database connection closed');
  }
}

seed();
