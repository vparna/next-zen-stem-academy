import { MongoClient, Db } from 'mongodb';

const options = {};

let clientPromise: Promise<MongoClient> | null = null;
let cachedDbName: string | null = null;

// Extract database name from MongoDB URI
function extractDatabaseName(uri: string): string {
  try {
    // First check if URI has a path after the host
    // mongodb://host:port/dbname or mongodb+srv://host/dbname
    const pathMatch = uri.match(/^mongodb(\+srv)?:\/\/[^\/]+\/([^\/\?]+)(\?.*)?$/);
    
    if (pathMatch && pathMatch[2]) {
      const dbName = pathMatch[2];
      // Validate database name is not empty and not just whitespace
      if (dbName.trim().length === 0) {
        throw new Error('Database name in MONGODB_URI is empty');
      }
      return dbName;
    }
    
    throw new Error('Database name not found in MONGODB_URI. Please include the database name in your connection string (e.g., mongodb://host:port/databasename or mongodb+srv://host/databasename)');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to parse database name from MONGODB_URI');
  }
}

// Lazy initialization function
function getClientPromise(): Promise<MongoClient> {
  // Validate environment variable at runtime
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set. Please add it to your .env.local file (for local development) or Vercel environment variables (for deployment).');
  }

  // Trim whitespace, newlines, and other invisible characters that might have been copied accidentally
  const uri: string = process.env.MONGODB_URI.trim().replace(/[\r\n\t]/g, '');

  // Check if URI is empty after trimming
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is empty or contains only whitespace. Please check your environment variable configuration in Vercel or .env.local file.');
  }

  // Validate URI format with detailed error message
  if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    const uriLength = uri.length;
    const uriPreview = uri.substring(0, Math.min(50, uri.length));
    throw new Error(
      `Invalid MongoDB URI format. Must start with "mongodb://" or "mongodb+srv://". ` +
      `Current value (length: ${uriLength}, preview: "${uriPreview}${uriLength > 50 ? '...' : ''}") does not match expected format. ` +
      `Please check your MONGODB_URI environment variable in Vercel dashboard or .env.local file for typos, truncation, or unwanted characters.`
    );
  }

  // Extract and cache the database name (only once)
  if (!cachedDbName) {
    cachedDbName = extractDatabaseName(uri);
    console.log('MongoDB: Using database:', cachedDbName);
  }

  if (clientPromise) {
    return clientPromise;
  }

  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable to preserve the client across module reloads caused by HMR (Hot Module Replacement).
    const globalWithMongo = global as typeof globalThis & {
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
  try {
    const client = await getClientPromise();
    
    // Explicitly use the cached database name
    if (!cachedDbName) {
      throw new Error('Database name not initialized. This should not happen.');
    }
    
    const db = client.db(cachedDbName);
    return db;
  } catch (error) {
    // Enhanced error logging for debugging
    console.error('MongoDB connection error:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}
