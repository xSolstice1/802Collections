Ch/**
 * Leaderboard Service
 * 
 * Handles all database operations for the leaderboard feature.
 * Provides methods to add, retrieve, and manage leaderboard entries.
 * Supports game-specific and mode-specific leaderboards.
 */

import { mongoConnection, getLeaderboardCollection, LeaderboardEntry, ObjectId, GameType } from './mongodb.js';

/**
 * Input for creating a new leaderboard entry
 */
export interface CreateLeaderboardEntry {
  name: string;
  score: number;
  game?: GameType;
  mode?: string;
}

/**
 * Leaderboard service class
 */
class LeaderboardService {
  private readonly limit: number = 20;

  /**
   * Initialize the service by connecting to MongoDB
   */
  public async init(): Promise<void> {
    await mongoConnection.connect();
  }

  /**
   * Get top leaderboard entries (default: top 20)
   * Sorted by score in descending order
   * Optional filters for game and mode
   */
  public async getTopEntries(
    limit: number = this.limit, 
    game?: GameType, 
    mode?: string
  ): Promise<LeaderboardEntry[]> {
    try {
      const collection = getLeaderboardCollection();
      const filter: Record<string, unknown> = {};
      
      if (game) {
        filter.game = game;
      }
      if (mode) {
        filter.mode = mode;
      }
      
      const entries = await collection
        .find<LeaderboardEntry>(filter)
        .sort({ score: -1, createdAt: 1 })
        .limit(limit)
        .toArray();
      
      return entries;
    } catch (error) {
      console.error('Error fetching leaderboard entries:', error);
      throw error;
    }
  }

  /**
   * Add a new entry to the leaderboard
   * If the name already exists and the new score is higher, it will update
   */
  public async addEntry(entry: CreateLeaderboardEntry): Promise<LeaderboardEntry> {
    try {
      const { name, score, game, mode } = entry;
      
      if (!name || name.trim().length === 0) {
        throw new Error('Name is required');
      }
      
      if (typeof score !== 'number' || isNaN(score)) {
        throw new Error('Score must be a valid number');
      }

      const collection = getLeaderboardCollection();
      const now = new Date();

      const existingFilter: Record<string, unknown> = { 
        name: { $regex: new RegExp(`^${name.trim()}$`, 'i') }
      };
      if (game) {
        existingFilter.game = game;
      }
      if (mode) {
        existingFilter.mode = mode;
      }

      const existingEntry = await collection.findOne<LeaderboardEntry>(existingFilter);

      if (existingEntry) {
        if (score > existingEntry.score) {
          const result = await collection.findOneAndUpdate(
            { _id: existingEntry._id },
            { 
              $set: { 
                score, 
                updatedAt: now 
              } 
            },
            { returnDocument: 'after' }
          );
          
          return result as LeaderboardEntry;
        } else {
          return existingEntry;
        }
      } else {
        const newEntry: Omit<LeaderboardEntry, '_id'> = {
          name: name.trim(),
          score,
          game: game || 'general',
          mode: mode,
          createdAt: now,
        };

        const result = await collection.insertOne(newEntry as LeaderboardEntry);
        
        return {
          ...newEntry,
          _id: result.insertedId,
        };
      }
    } catch (error) {
      console.error('Error adding leaderboard entry:', error);
      throw error;
    }
  }

  /**
   * Get a specific entry by ID
   */
  public async getEntryById(id: string): Promise<LeaderboardEntry | null> {
    try {
      const collection = getLeaderboardCollection();
      const entry = await collection.findOne<LeaderboardEntry>({ 
        _id: new ObjectId(id) 
      });
      return entry;
    } catch (error) {
      console.error('Error fetching entry:', error);
      return null;
    }
  }

  /**
   * Get entries by player name
   */
  public async getEntriesByName(name: string): Promise<LeaderboardEntry[]> {
    try {
      const collection = getLeaderboardCollection();
      const entries = await collection
        .find<LeaderboardEntry>({ 
          name: { $regex: new RegExp(name, 'i') } 
        })
        .sort({ score: -1 })
        .toArray();
      
      return entries;
    } catch (error) {
      console.error('Error fetching entries by name:', error);
      throw error;
    }
  }

  /**
   * Get the rank of a specific score
   */
  public async getPlayerRank(score: number, game?: GameType, mode?: string): Promise<number> {
    try {
      const collection = getLeaderboardCollection();
      const filter: Record<string, unknown> = { score: { $gt: score } };
      
      if (game) {
        filter.game = game;
      }
      if (mode) {
        filter.mode = mode;
      }
      
      const count = await collection.countDocuments(filter);
      return count + 1;
    } catch (error) {
      console.error('Error calculating rank:', error);
      return -1;
    }
  }

  /**
   * Delete an entry by ID
   */
  public async deleteEntry(id: string): Promise<boolean> {
    try {
      const collection = getLeaderboardCollection();
      const result = await collection.deleteOne({ 
        _id: new ObjectId(id) 
      });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting entry:', error);
      return false;
    }
  }

  /**
   * Get total count of entries
   */
  public async getTotalCount(game?: GameType, mode?: string): Promise<number> {
    try {
      const collection = getLeaderboardCollection();
      const filter: Record<string, unknown> = {};
      
      if (game) {
        filter.game = game;
      }
      if (mode) {
        filter.mode = mode;
      }
      
      return await collection.countDocuments(filter);
    } catch (error) {
      console.error('Error counting entries:', error);
      return 0;
    }
  }

  /**
   * Clear all entries
   */
  public async clearAll(): Promise<number> {
    try {
      const collection = getLeaderboardCollection();
      const result = await collection.deleteMany({});
      return result.deletedCount;
    } catch (error) {
      console.error('Error clearing entries:', error);
      return 0;
    }
  }
}

// Export singleton instance
export const leaderboardService = new LeaderboardService();

export default leaderboardService;