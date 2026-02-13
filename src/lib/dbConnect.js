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
  console.warn("⚠️  MongoDB URI not found in environment variables");
  clientPromise = Promise.resolve({
    db: () => ({
      collection: () => ({
        find: () => ({ toArray: async () => [] }),
        findOne: async () => null,
        insertOne: async () => ({ acknowledged: false }),
        insertMany: async () => ({ acknowledged: false }),
        updateOne: async () => ({ modifiedCount: 0 }),
        deleteOne: async () => ({ deletedCount: 0 }),
        deleteMany: async () => ({ deletedCount: 0 }),
      }),
    }),
  });
} else {
  const options = {
    maxPoolSize: 10,
    minPoolSize: 2,
    maxIdleTimeMS: 30000,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 30000,
    serverSelectionTimeoutMS: 5000,
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
      global._mongoClientPromise = client.connect().catch(err => {
        console.error("❌ MongoDB connection failed:", err.message);
        return {
          db: () => ({
            collection: () => ({
              find: () => ({ toArray: async () => [] }),
              findOne: async () => null,
              insertOne: async () => ({ acknowledged: false }),
              insertMany: async () => ({ acknowledged: false }),
              updateOne: async () => ({ modifiedCount: 0 }),
              deleteOne: async () => ({ deletedCount: 0 }),
              deleteMany: async () => ({ deletedCount: 0 }),
            }),
          }),
        };
      });
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect().catch(err => {
      console.error("❌ MongoDB connection failed:", err.message);
      return {
        db: () => ({
          collection: () => ({
            find: () => ({ toArray: async () => [] }),
            findOne: async () => null,
            insertOne: async () => ({ acknowledged: false }),
            insertMany: async () => ({ acknowledged: false }),
            updateOne: async () => ({ modifiedCount: 0 }),
            deleteOne: async () => ({ deletedCount: 0 }),
            deleteMany: async () => ({ deletedCount: 0 }),
          }),
        }),
      };
    });
  }
}

export const dbConnect = async (cname) => {
  try {
    const client = await clientPromise;
    return client.db(dbname).collection(cname);
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    return {
      find: () => ({ toArray: async () => [] }),
      findOne: async () => null,
      insertOne: async () => ({ acknowledged: false }),
      insertMany: async () => ({ acknowledged: false }),
      updateOne: async () => ({ modifiedCount: 0 }),
      deleteOne: async () => ({ deletedCount: 0 }),
      deleteMany: async () => ({ deletedCount: 0 }),
    };
  }
};

export default clientPromise;
