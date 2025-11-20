import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define MONGODB_URI in Vercel");
}

let client = global._mongoClient;
let clientPromise;

if (!client) {
  client = new MongoClient(uri, {
    tls: true,        // <-- Required for Atlas
    retryWrites: true,
  });
  global._mongoClient = client;
  clientPromise = client.connect();
} else {
  clientPromise = Promise.resolve(client);
}

export default clientPromise;
