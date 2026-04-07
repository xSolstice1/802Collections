/**
 * MongoDB Connection Utility
 *
 * Provides a singleton connection to MongoDB database.
 * Uses environment variables for configuration.
 */
import { MongoClient, ObjectId } from 'mongodb';
/**
 * MongoDB configuration from environment variables
 */
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGODB_DB_NAME || '802collections';
const COLLECTION_NAME = process.env.MONGODB_COLLECTION_NAME || 'leaderboard';
/**
 * MongoDB Connection Manager
 * Singleton pattern to ensure single connection instance
 */
class MongoDBConnection {
    constructor() {
        this.client = null;
        this.db = null;
        this.isConnected = false;
    }
    /**
     * Get singleton instance
     */
    static getInstance() {
        if (!MongoDBConnection.instance) {
            MongoDBConnection.instance = new MongoDBConnection();
        }
        return MongoDBConnection.instance;
    }
    /**
     * Establish connection to MongoDB
     */
    async connect() {
        if (this.isConnected && this.db) {
            return this.db;
        }
        try {
            this.client = new MongoClient(MONGODB_URI);
            await this.client.connect();
            this.db = this.client.db(DB_NAME);
            this.isConnected = true;
            console.log(`Connected to MongoDB: ${DB_NAME}`);
            return this.db;
        }
        catch (error) {
            console.error('MongoDB connection error:', error);
            throw error;
        }
    }
    /**
     * Get collection reference
     */
    getCollection(collectionName = COLLECTION_NAME) {
        if (!this.db) {
            throw new Error('Database not connected. Call connect() first.');
        }
        return this.db.collection(collectionName);
    }
    /**
     * Get database instance
     */
    getDb() {
        if (!this.db) {
            throw new Error('Database not connected. Call connect() first.');
        }
        return this.db;
    }
    /**
     * Close connection
     */
    async close() {
        if (this.client) {
            await this.client.close();
            this.isConnected = false;
            this.client = null;
            this.db = null;
            console.log('MongoDB connection closed');
        }
    }
    /**
     * Check if connected
     */
    getConnected() {
        return this.isConnected;
    }
}
// Export singleton instance
export const mongoConnection = MongoDBConnection.getInstance();
// Export convenience methods
export const getDb = () => mongoConnection.getDb();
export const getLeaderboardCollection = () => mongoConnection.getCollection();
// Export ObjectId for convenience
export { ObjectId };
export default mongoConnection;
