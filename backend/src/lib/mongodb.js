import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  
  retryWrites: true,
};
if (!uri) {
  throw new Error("Please define MONGODB_URI in .env.local");
}
let client = global._mongoClient;
let clientPromise;
if (!client) {
  client = new MongoClient(uri, options);
  global._mongoClient = client;
  clientPromise = client.connect();
} else {
  clientPromise = Promise.resolve(client);
}
export default clientPromise;
