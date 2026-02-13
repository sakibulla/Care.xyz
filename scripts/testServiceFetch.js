const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

async function test() {
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
    console.log('✅ Connected to MongoDB\n');

    const db = client.db(dbname);
    const coll = db.collection('services');

    // Get all services
    const services = await coll.find().toArray();
    console.log(`📊 Found ${services.length} services:\n`);

    services.forEach((s, i) => {
      console.log(`${i + 1}. ${s.title}`);
      console.log(`   _id: ${s._id}`);
      console.log(`   _id type: ${typeof s._id}`);
      console.log(`   _id string: ${s._id.toString()}`);
      console.log(`   _id length: ${s._id.toString().length}`);
      console.log(`   slug: ${s.slug}`);
      console.log(`   charge_per_hour: $${s.charge_per_hour}`);
      console.log('');
    });

    // Test fetching by ID
    if (services.length > 0) {
      const testId = services[0]._id.toString();
      console.log(`\n🧪 Testing fetch by ID: ${testId}`);
      
      const byObjectId = await coll.findOne({ _id: new ObjectId(testId) });
      console.log(`   By ObjectId: ${byObjectId ? '✅ Found' : '❌ Not found'}`);
      
      const byString = await coll.findOne({ _id: testId });
      console.log(`   By String: ${byString ? '✅ Found' : '❌ Not found'}`);
      
      const bySlug = await coll.findOne({ slug: services[0].slug });
      console.log(`   By Slug (${services[0].slug}): ${bySlug ? '✅ Found' : '❌ Not found'}`);
    }

  } catch (err) {
    console.error('❌ Test failed:', err);
  } finally {
    await client.close();
    console.log('\n✅ Connection closed');
  }
}

test();
