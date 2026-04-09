/**
 * Leaderboard Service
 *
 * Handles all database operations for the leaderboard feature.
 * Provides methods to add, retrieve, and manage leaderboard entries.
 */
import { mongoConnection, getLeaderboardCollection, ObjectId } from './mongodb';
/**
 * Leaderboard service class
 */
class LeaderboardService {
    constructor() {
        this.limit = 20;
    }
    /**
     * Initialize the service by connecting to MongoDB
     */
    async init() {
        await mongoConnection.connect();
    }
    /**
     * Get top leaderboard entries (default: top 20)
     * Sorted by score in descending order
     */
    async getTopEntries(limit = this.limit) {
        try {
            const collection = getLeaderboardCollection();
            const entries = await collection
                .find({})
                .sort({ score: -1, createdAt: 1 }) // Higher scores first, then by earliest entry
                .limit(limit)
                .toArray();
            return entries;
        }
        catch (error) {
            console.error('Error fetching leaderboard entries:', error);
            throw error;
        }
    }
    /**
     * Add a new entry to the leaderboard
     * If the name already exists and the new score is higher, it will update
     */
    async addEntry(entry) {
        try {
            const { name, score } = entry;
            // Validate input
            if (!name || name.trim().length === 0) {
                throw new Error('Name is required');
            }
            if (typeof score !== 'number' || isNaN(score)) {
                throw new Error('Score must be a valid number');
            }
            const collection = getLeaderboardCollection();
            const now = new Date();
            // Check if entry with same name exists
            const existingEntry = await collection.findOne({
                name: { $regex: new RegExp(`^${name.trim()}$`, 'i') } // Case-insensitive match
            });
            if (existingEntry) {
                // Update if new score is higher
                if (score > existingEntry.score) {
                    const result = await collection.findOneAndUpdate({ _id: existingEntry._id }, {
                        $set: {
                            score,
                            updatedAt: now
                        }
                    }, { returnDocument: 'after' });
                    return result;
                }
                else {
                    // Return existing entry if score is not higher
                    return existingEntry;
                }
            }
            else {
                // Create new entry
                const newEntry = {
                    name: name.trim(),
                    score,
                    createdAt: now,
                };
                const result = await collection.insertOne(newEntry);
                return {
                    ...newEntry,
                    _id: result.insertedId,
                };
            }
        }
        catch (error) {
            console.error('Error adding leaderboard entry:', error);
            throw error;
        }
    }
    /**
     * Get a specific entry by ID
     */
    async getEntryById(id) {
        try {
            const collection = getLeaderboardCollection();
            const entry = await collection.findOne({
                _id: new ObjectId(id)
            });
            return entry;
        }
        catch (error) {
            console.error('Error fetching entry:', error);
            return null;
        }
    }
    /**
     * Get entries by player name
     */
    async getEntriesByName(name) {
        try {
            const collection = getLeaderboardCollection();
            const entries = await collection
                .find({
                name: { $regex: new RegExp(name, 'i') }
            })
                .sort({ score: -1 })
                .toArray();
            return entries;
        }
        catch (error) {
            console.error('Error fetching entries by name:', error);
            throw error;
        }
    }
    /**
     * Get the rank of a specific score
     */
    async getPlayerRank(score) {
        try {
            const collection = getLeaderboardCollection();
            const count = await collection.countDocuments({ score: { $gt: score } });
            return count + 1;
        }
        catch (error) {
            console.error('Error calculating rank:', error);
            return -1;
        }
    }
    /**
     * Delete an entry by ID
     */
    async deleteEntry(id) {
        try {
            const collection = getLeaderboardCollection();
            const result = await collection.deleteOne({
                _id: new ObjectId(id)
            });
            return result.deletedCount > 0;
        }
        catch (error) {
            console.error('Error deleting entry:', error);
            return false;
        }
    }
    /**
     * Get total count of entries
     */
    async getTotalCount() {
        try {
            const collection = getLeaderboardCollection();
            return await collection.countDocuments();
        }
        catch (error) {
            console.error('Error counting entries:', error);
            return 0;
        }
    }
    /**
     * Clear all entries (use with caution)
     */
    async clearAll() {
        try {
            const collection = getLeaderboardCollection();
            const result = await collection.deleteMany({});
            return result.deletedCount;
        }
        catch (error) {
            console.error('Error clearing entries:', error);
            return 0;
        }
    }
}
// Export singleton instance
export const leaderboardService = new LeaderboardService();
export default leaderboardService;
