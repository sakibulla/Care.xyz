const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI;
const dbname = process.env.DBNAME;

export const collections = {
  PRODUCTS: "products",
  USERS: "users",
  CART: "cart",
  ORDER: "order",
  SERVICES: "services",
  BOOKINGS: "bookings",
};

let client;
let clientPromise;

if (!uri) {
  throw new Error('MONGODB_URI environment variable is not set');
} else {
  const options = {
    maxPoolSize: 10,
    minPoolSize: 2,
    maxIdleTimeMS: 30000,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 30000,
    serverSelectionTimeoutMS: 5000,
    useUnifiedTopology: true,
  };

  if (ServerApiVersion && ServerApiVersion.v1) {
    options.serverApi = {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    };
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export const dbConnect = async (cname) => {
  const client = await clientPromise;
  return client.db(dbname).collection(cname);
};

export default clientPromise;
