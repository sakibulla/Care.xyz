const { MongoClient } = require('mongodb');

const uri = 'mongodb://care:a6dp4E3X0oQa52fQ@ac-rpgx4wz-shard-00-00.p0p1zby.mongodb.net:27017,ac-rpgx4wz-shard-00-01.p0p1zby.mongodb.net:27017,ac-rpgx4wz-shard-00-02.p0p1zby.mongodb.net:27017/?ssl=true&replicaSet=atlas-2etvjm-shard-0&authSource=admin';

const client = new MongoClient(uri, { useUnifiedTopology: true });

async function fixServicePricing() {
  try {
    await client.connect();
    const db = client.db('care');
    const services = db.collection('services');

    // Map of service titles to their hourly and daily rates
    const pricingMap = {
      'Babysitting Service': { charge_per_hour: 50, charge_per_day: 350 },
      'Elderly Care Service': { charge_per_hour: 60, charge_per_day: 450 },
      'Post-Surgery Care': { charge_per_hour: 75, charge_per_day: 550 },
      'Hospital Companion Service': { charge_per_hour: 40, charge_per_day: 300 },
      'Special Needs Care': { charge_per_hour: 80, charge_per_day: 600 },
      'Newborn Care Service': { charge_per_hour: 65, charge_per_day: 500 },
      'Physiotherapy Support': { charge_per_hour: 85, charge_per_day: 650 },
      'Home Nursing Service': { charge_per_hour: 95, charge_per_day: 700 }
    };

    for (const [title, pricing] of Object.entries(pricingMap)) {
      const result = await services.updateOne(
        { title },
        { 
          $set: { 
            charge_per_hour: pricing.charge_per_hour,
            charge_per_day: pricing.charge_per_day
          }
        }
      );
      console.log(`✅ Updated ${title}: charge_per_hour=$${pricing.charge_per_hour}, charge_per_day=$${pricing.charge_per_day}`);
    }

    console.log('\n✅ All service pricing updated!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

fixServicePricing();
