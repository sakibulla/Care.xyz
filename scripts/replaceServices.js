const { MongoClient } = require('mongodb');

const uri = 'mongodb://care:a6dp4E3X0oQa52fQ@ac-rpgx4wz-shard-00-00.p0p1zby.mongodb.net:27017,ac-rpgx4wz-shard-00-01.p0p1zby.mongodb.net:27017,ac-rpgx4wz-shard-00-02.p0p1zby.mongodb.net:27017/?ssl=true&replicaSet=atlas-2etvjm-shard-0&authSource=admin';

const client = new MongoClient(uri, { useUnifiedTopology: true });

const newServices = [
  {
    "id": "1",
    "title": "Babysitting Service",
    "subtitle": "Safe and Reliable Childcare at Home",
    "image": "https://images.unsplash.com/photo-1503454537688-e47a5cb0b7e8?w=500&h=500&fit=crop",
    "price": 350,
    "discount": 10,
    "sizes": [],
    "color": [],
    "description": "Trusted babysitting service providing safe and engaging care for children. Our caregivers assist with feeding, playtime, homework support, and bedtime routines in a secure and friendly environment.",
    "qna": [
      {
        "question": "What age group is this service suitable for?",
        "answer": "This service is suitable for children aged 6 months to 10 years."
      },
      {
        "question": "Are caregivers background verified?",
        "answer": "Yes, all caregivers go through background checks and training."
      }
    ],
    "reviews": 25,
    "sold": 40,
    "ratings": 4.7,
    "info": [
      {
        "label": "Service Duration",
        "value": "Hourly / Daily"
      },
      {
        "label": "Care Type",
        "value": "In-Home Childcare"
      },
      {
        "label": "Support Includes",
        "value": "Feeding, Playtime, Homework Help"
      }
    ]
  },
  {
    "id": "2",
    "title": "Elderly Care Service",
    "subtitle": "Compassionate Care for Senior Citizens",
    "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=500&fit=crop",
    "price": 450,
    "discount": 8,
    "sizes": [],
    "color": [],
    "description": "Professional elderly care with compassionate support for daily living, medication management, companionship, and mobility assistance. Our trained caregivers ensure dignity and comfort for seniors.",
    "qna": [
      {
        "question": "Do you provide 24/7 care?",
        "answer": "Yes, we offer round-the-clock care services with flexible scheduling."
      },
      {
        "question": "What health conditions can you assist with?",
        "answer": "We support seniors with arthritis, diabetes, mobility issues, and general wellness."
      }
    ],
    "reviews": 32,
    "sold": 55,
    "ratings": 4.8,
    "info": [
      {
        "label": "Service Duration",
        "value": "Full-time / Part-time"
      },
      {
        "label": "Care Type",
        "value": "Senior Care"
      },
      {
        "label": "Support Includes",
        "value": "Medication, Mobility, Companionship"
      }
    ]
  },
  {
    "id": "3",
    "title": "Post-Surgery Care",
    "subtitle": "Recovery Support After Medical Procedures",
    "image": "https://images.unsplash.com/photo-1631217314831-c6227db76b6e?w=500&h=500&fit=crop",
    "price": 550,
    "discount": 12,
    "sizes": [],
    "color": [],
    "description": "Specialized post-operative care including wound management, pain monitoring, prescribed exercise guidance, and recovery support. Caregivers work closely with medical professionals.",
    "qna": [
      {
        "question": "Do you work with hospitals?",
        "answer": "Yes, we coordinate with surgeons and hospitals for proper recovery protocols."
      },
      {
        "question": "What types of surgeries do you support?",
        "answer": "We support recovery from orthopedic, abdominal, and general surgeries."
      }
    ],
    "reviews": 18,
    "sold": 28,
    "ratings": 4.9,
    "info": [
      {
        "label": "Service Duration",
        "value": "Weeks / Months"
      },
      {
        "label": "Care Type",
        "value": "Medical Recovery"
      },
      {
        "label": "Support Includes",
        "value": "Wound Care, Pain Management, PT"
      }
    ]
  },
  {
    "id": "4",
    "title": "Hospital Companion Service",
    "subtitle": "Supportive Presence During Hospital Stays",
    "image": "https://images.unsplash.com/photo-1559839734335-efb0c4cb3f46?w=500&h=500&fit=crop",
    "price": 300,
    "discount": 5,
    "sizes": [],
    "color": [],
    "description": "Compassionate companions provide emotional support, assist with daily needs, help with communication with medical staff, and ensure patient comfort during hospital stays.",
    "qna": [
      {
        "question": "Can companions help with paperwork?",
        "answer": "Yes, we assist with medical forms and insurance documentation."
      },
      {
        "question": "Are companions allowed overnight?",
        "answer": "Yes, overnight companion services are available at most hospitals."
      }
    ],
    "reviews": 20,
    "sold": 35,
    "ratings": 4.6,
    "info": [
      {
        "label": "Service Duration",
        "value": "Hourly / Daily"
      },
      {
        "label": "Care Type",
        "value": "Hospital Support"
      },
      {
        "label": "Support Includes",
        "value": "Companionship, Advocacy, Daily Needs"
      }
    ]
  },
  {
    "id": "5",
    "title": "Special Needs Care",
    "subtitle": "Expert Care for Children with Special Needs",
    "image": "https://images.unsplash.com/photo-1516627145497-ae3dba47c77a?w=500&h=500&fit=crop",
    "price": 600,
    "discount": 15,
    "sizes": [],
    "color": [],
    "description": "Specialized care for children with autism, cerebral palsy, Down syndrome, and other developmental conditions. Our caregivers are trained in behavioral support and therapeutic activities.",
    "qna": [
      {
        "question": "What special needs do you support?",
        "answer": "We support autism, cerebral palsy, Down syndrome, ADHD, and other developmental disorders."
      },
      {
        "question": "Are caregivers certified?",
        "answer": "Yes, all caregivers have special needs training certifications."
      }
    ],
    "reviews": 22,
    "sold": 38,
    "ratings": 4.85,
    "info": [
      {
        "label": "Service Duration",
        "value": "Hourly / Daily"
      },
      {
        "label": "Care Type",
        "value": "Special Needs Support"
      },
      {
        "label": "Support Includes",
        "value": "Behavioral Support, Therapy, Education"
      }
    ]
  },
  {
    "id": "6",
    "title": "Newborn Care Service",
    "subtitle": "Expert Care for Newborns and Infants",
    "image": "https://images.unsplash.com/photo-1575912621128-dd44dc1709d4?w=500&h=500&fit=crop",
    "price": 500,
    "discount": 10,
    "sizes": [],
    "color": [],
    "description": "Professional newborn care including feeding assistance, diaper changes, sleep support, bathing, and guidance on infant development. Perfect for new parents needing extra support.",
    "qna": [
      {
        "question": "Do you provide lactation support?",
        "answer": "Yes, we assist with breastfeeding and bottle feeding guidance."
      },
      {
        "question": "What age range do you cover?",
        "answer": "We care for newborns from birth to 12 months."
      }
    ],
    "reviews": 28,
    "sold": 45,
    "ratings": 4.75,
    "info": [
      {
        "label": "Service Duration",
        "value": "24/7 / Hourly"
      },
      {
        "label": "Care Type",
        "value": "Newborn Care"
      },
      {
        "label": "Support Includes",
        "value": "Feeding, Bathing, Sleep Support"
      }
    ]
  },
  {
    "id": "7",
    "title": "Physiotherapy Support",
    "subtitle": "At-Home Physical Therapy Assistance",
    "image": "https://images.unsplash.com/photo-1576091160550-112173f7f869?w=500&h=500&fit=crop",
    "price": 650,
    "discount": 6,
    "sizes": [],
    "color": [],
    "description": "Professional physiotherapy support at home to help patients recover mobility and strength through guided exercises and therapy routines. Our therapists work with recovery plans.",
    "qna": [
      {
        "question": "Is this service doctor recommended?",
        "answer": "Yes, it is recommended after medical consultation with your physician."
      },
      {
        "question": "Do therapists bring equipment?",
        "answer": "Yes, basic therapy equipment and tools are provided for sessions."
      }
    ],
    "reviews": 16,
    "sold": 24,
    "ratings": 4.6,
    "info": [
      {
        "label": "Service Duration",
        "value": "Per Session / Weekly"
      },
      {
        "label": "Care Type",
        "value": "Rehabilitation Support"
      },
      {
        "label": "Support Includes",
        "value": "Guided Exercises, Mobility Training"
      }
    ]
  },
  {
    "id": "8",
    "title": "Home Nursing Service",
    "subtitle": "Professional Nursing Care at Your Home",
    "image": "https://images.unsplash.com/photo-1631217314831-c6227db76b6e?w=500&h=500&fit=crop",
    "price": 700,
    "discount": 12,
    "sizes": [],
    "color": [],
    "description": "Certified nurses providing professional healthcare at home including injections, wound care, vital monitoring, catheter care, and chronic disease management with doctor coordination.",
    "qna": [
      {
        "question": "Are nurses registered and certified?",
        "answer": "Yes, all nurses are RN certified with years of experience."
      },
      {
        "question": "Do you handle complex medical needs?",
        "answer": "Yes, we manage complex conditions including dialysis support and post-operative care."
      }
    ],
    "reviews": 35,
    "sold": 60,
    "ratings": 4.9,
    "info": [
      {
        "label": "Service Duration",
        "value": "24/7 / Scheduled"
      },
      {
        "label": "Care Type",
        "value": "Medical Nursing"
      },
      {
        "label": "Support Includes",
        "value": "Injections, Wound Care, Monitoring"
      }
    ]
  }
];

async function replaceServices() {
  try {
    await client.connect();
    const db = client.db('care');
    const services = db.collection('services');

    // Delete all existing services
    const deleteResult = await services.deleteMany({});
    console.log(`✅ Deleted ${deleteResult.deletedCount} old services`);

    // Insert new services
    const insertResult = await services.insertMany(newServices);
    console.log(`✅ Inserted ${insertResult.insertedCount} new services`);

    console.log('\n✅ All services replaced successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

replaceServices();
