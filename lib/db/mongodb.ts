import { MongoClient, Db } from 'mongodb';

const options = {};

let clientPromise: Promise<MongoClient> | null = null;

// Lazy initialization function
function getClientPromise(): Promise<MongoClient> {
  // Validate environment variable at runtime
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set. Please add it to your .env.local file (for local development) or Vercel environment variables (for deployment).');
  }

  const uri: string = process.env.MONGODB_URI;

  // Validate URI format
  if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    throw new Error('Invalid MongoDB URI format. Must start with "mongodb://" or "mongodb+srv://". Current value starts with: ' + uri.substring(0, 10));
  }

  if (clientPromise) {
    return clientPromise;
  }

  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable to preserve the client across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      const client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    const client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }

  return clientPromise;
}

// Export the function, not the result of calling it
export default getClientPromise;

export async function getDatabase(): Promise<Db> {
  const client = await getClientPromise();
  return client.db();
}
