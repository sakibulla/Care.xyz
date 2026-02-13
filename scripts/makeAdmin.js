const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const { MongoClient } = require('mongodb');
require('dotenv').config();

async function makeAdmin() {
  const uri = process.env.MONGODB_URI;
  const dbname = process.env.DBNAME || 'carexyz';
  
  if (!uri) {
    console.error('❌ MONGODB_URI not set in .env');
    process.exit(1);
  }

  // Get email from command line argument
  const email = process.argv[2];
  
  if (!email) {
    console.error('❌ Please provide an email address');
    console.log('Usage: node scripts/makeAdmin.js user@example.com');
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
    const usersCollection = db.collection('users');

    // Find user
    const user = await usersCollection.findOne({ email });
    
    if (!user) {
      console.error(`❌ User with email "${email}" not found`);
      console.log('\n💡 Available users:');
      const allUsers = await usersCollection.find({}, { projection: { email: 1, name: 1, role: 1 } }).toArray();
      allUsers.forEach(u => {
        console.log(`   - ${u.email} (${u.name}) - Role: ${u.role || 'user'}`);
      });
      process.exit(1);
    }

    // Check if already admin
    if (user.role === 'admin') {
      console.log(`✅ User "${email}" is already an admin`);
      process.exit(0);
    }

    // Update to admin
    const result = await usersCollection.updateOne(
      { email },
      { $set: { role: 'admin' } }
    );

    if (result.modifiedCount > 0) {
      console.log(`✅ Successfully made "${email}" an admin!`);
      console.log(`\n👤 User Details:`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: admin (updated)`);
    } else {
      console.error('❌ Failed to update user role');
    }

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.close();
    console.log('\n✅ Connection closed');
  }
}

makeAdmin();
