const { MongoClient } = require('mongodb');

const uri = 'mongodb://care:a6dp4E3X0oQa52fQ@ac-rpgx4wz-shard-00-00.p0p1zby.mongodb.net:27017,ac-rpgx4wz-shard-00-01.p0p1zby.mongodb.net:27017,ac-rpgx4wz-shard-00-02.p0p1zby.mongodb.net:27017/?ssl=true&replicaSet=atlas-2etvjm-shard-0&authSource=admin';

const client = new MongoClient(uri, { useUnifiedTopology: true });

async function updateServices() {
  try {
    await client.connect();
    const db = client.db('care');
    const services = db.collection('services');

    const imageUpdates = {
      'Babysitting Service': 'https://images.unsplash.com/photo-1503454537688-e47a5cb0b7e8?w=500&h=500&fit=crop',
      'Elderly Care Service': 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=500&h=500&fit=crop',
      'Post-Surgery Care': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=500&fit=crop',
      'Hospital Companion Service': 'https://images.unsplash.com/photo-1631217314831-c6227db76b6e?w=500&h=500&fit=crop',
      'Special Needs Care': 'https://images.unsplash.com/photo-1559839734335-efb0c4cb3f46?w=500&h=500&fit=crop',
      'Newborn Care Service': 'https://images.unsplash.com/photo-1516627145497-ae3dba47c77a?w=500&h=500&fit=crop',
      'Physiotherapy Support': 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=500&h=500&fit=crop',
      'Home Nursing Service': 'https://images.unsplash.com/photo-1631217314831-c6227db76b6e?w=500&h=500&fit=crop'
    };

    for (const [title, imageUrl] of Object.entries(imageUpdates)) {
      const result = await services.updateOne(
        { title },
        { $set: { image: imageUrl } }
      );
      console.log(`✅ Updated ${title}: ${result.modifiedCount} modified`);
    }

    console.log('\n✅ All service images updated!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

updateServices();
