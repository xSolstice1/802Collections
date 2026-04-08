/**
 * Leaderboard API Client
 * 
 * Frontend service for communicating with Firebase Firestore.
 * Handles all leaderboard operations using Firebase SDK.
 */

import {
  type Timestamp,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDoc,
  doc,
  deleteDoc,
  serverTimestamp,
  updateDoc,
  getCountFromServer,
  enableMultiTabIndexedDbPersistence
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Game types for categorizing leaderboards
 */
export type GameType = 'snake' | 'bird-shit' | 'general';

/**
 * Leaderboard entry type for frontend
 */
export interface LeaderboardEntry {
  id?: string;
  name: string;
  score: number;
  game?: GameType;
  mode?: string;
  createdAt: Date;
  updatedAt?: Date;
}

/**
 * Firestore entry type (matches Firestore data structure)
 */
interface FirestoreEntry {
  name: string;
  score: number;
  game?: GameType;
  mode?: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

/**
 * Cache for leaderboard entries to improve performance
 */
interface CacheEntry {
  data: LeaderboardEntry[];
  timestamp: number;
}

/**
 * Leaderboard API client class
 * Uses Firebase Firestore directly
 */
class LeaderboardApiClient {
  private readonly collectionName = '802collection';
  private readonly cache = new Map<string, CacheEntry>();
  private readonly CACHE_TTL = 30000; // 30 seconds cache
  private persistenceInitialized = false;

  /**
   * Initialize Firestore persistence for offline support
   */
  private async initPersistence(): Promise<void> {
    if (this.persistenceInitialized) return;
    
    try {
      await enableMultiTabIndexedDbPersistence(db);
      this.persistenceInitialized = true;
      console.info('Firestore persistence enabled');
    } catch (error) {
      // Persistence may already be enabled or failed
      if ((error as { code?: string }).code === 'failed-precondition') {
        console.warn('Firestore persistence failed: Multiple tabs open');
      } else if ((error as { code?: string }).code === 'unimplemented') {
        console.warn('Firestore persistence not supported in this browser');
      } else {
        console.warn('Firestore persistence error:', error);
      }
      this.persistenceInitialized = true;
    }
  }

  /**
   * Generate cache key for query
   */
  private getCacheKey(limitCount: number, game?: GameType, mode?: string): string {
    return `${limitCount}-${game || 'all'}-${mode || 'all'}`;
  }

  /**
   * Check if cache is valid
   */
  private isCacheValid(key: string): boolean {
    const cached = this.cache.get(key);
    if (!cached) return false;
    return Date.now() - cached.timestamp < this.CACHE_TTL;
  }

  /**
   * Get top leaderboard entries (default: top 20)
   * Optional game and mode filters for game-specific leaderboards
   * Uses caching and optimized fetching for better performance
   */
  async getTopEntries(
    limitCount: number = 20, 
    game?: GameType, 
    mode?: string
  ): Promise<LeaderboardEntry[]> {
    const cacheKey = this.getCacheKey(limitCount, game, mode);
    
    // Check cache first
    if (this.isCacheValid(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      console.debug('Using cached leaderboard data');
      return cached.data;
    }

    // Initialize persistence on first fetch
    await this.initPersistence();
    
    try {
      const colRef = collection(db, this.collectionName);
      
      // Optimized: Fetch only the number of entries we might need
      // We fetch more than limitCount to account for filtering
      const fetchLimit = game || mode ? Math.min(limitCount * 3, 100) : limitCount;
      const q = query(colRef, orderBy('score', 'desc'), limit(fetchLimit));
      
      const snapshot = await getDocs(q);
      
      const entries: LeaderboardEntry[] = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data() as FirestoreEntry;
        
        // Client-side filtering for game and mode
        if (game && data.game !== game) return;
        if (mode && data.mode !== mode) return;
        
        entries.push({
          id: doc.id,
          name: data.name,
          score: data.score,
          game: data.game,
          mode: data.mode,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate(),
        });
      });
      
      // Return only the requested limit
      const result = entries.slice(0, Math.min(limitCount, 20));
      
      // Update cache
      this.cache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      });
      
      return result;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      // Return cached data if available on error
      const cached = this.cache.get(cacheKey);
      if (cached) {
        console.warn('Returning stale cached data due to fetch error');
        return cached.data;
      }
      return [];
    }
  }

  /**
   * Clear the cache (useful after adding/updating entries)
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Invalidate cache for specific query
   */
  invalidateCache(game?: GameType, mode?: string): void {
    if (game || mode) {
      // Invalidate specific cache entries
      const keysToDelete: string[] = [];
      this.cache.forEach((_, key) => {
        if ((game && key.includes(game)) || (mode && key.includes(mode))) {
          keysToDelete.push(key);
        }
      });
      keysToDelete.forEach(key => this.cache.delete(key));
    } else {
      this.clearCache();
    }
  }

  /**
   * Add a new entry to the leaderboard
   * Supports game and mode for game-specific leaderboards
   */
  async addEntry(name: string, score: number, game?: GameType, mode?: string): Promise<LeaderboardEntry | null> {
    try {
      console.info('Adding entry:', { name, score, game, mode });

      if (!name || name.trim().length === 0) {
        throw new Error('Name is required');
      }
      
      if (typeof score !== 'number' || isNaN(score)) {
        throw new Error('Score must be a valid number');
      }

      const colRef = collection(db, this.collectionName);
      const trimmedName = name.trim();

      // Check if entry with same name exists for this game/mode
      const existingFilter: ReturnType<typeof where>[] = [where('name', '==', trimmedName)];
      if (game) {
        existingFilter.push(where('game', '==', game));
      }
      if (mode) {
        existingFilter.push(where('mode', '==', mode));
      }

      const existingQuery = query(colRef, ...existingFilter);
      const existingSnapshot = await getDocs(existingQuery);

      if (!existingSnapshot.empty) {
        // Update existing entry if new score is higher
        const existingDoc = existingSnapshot.docs[0];
        const existingData = existingDoc.data() as FirestoreEntry;
        if (score > existingData.score) {
          await updateDoc(doc(db, this.collectionName, existingDoc.id), {
            score,
            updatedAt: serverTimestamp(),
          });

          return {
            id: existingDoc.id,
            name: trimmedName,
            score,
            game: existingData.game,
            mode: existingData.mode,
            createdAt: existingData.createdAt?.toDate() || new Date(),
            updatedAt: new Date(),
          };
        } else {
          return {
            id: existingDoc.id,
            name: existingData.name,
            score: existingData.score,
            game: existingData.game,
            mode: existingData.mode,
            createdAt: existingData.createdAt?.toDate() || new Date(),
            updatedAt: existingData.updatedAt?.toDate(),
          };
        }
      } else {
        // Create new entry
        const newEntry: Record<string, unknown> = {
          name: trimmedName,
          score,
          game: game || 'general',
        };
        
        // Only add mode if it's defined (Firestore doesn't accept undefined)
        if (mode !== undefined) {
          newEntry.mode = mode;
        }

        const docRef = await addDoc(colRef, {
          ...newEntry,
          createdAt: serverTimestamp(),
        });

        console.info('Entry created with ID:', docRef.id);
        
        // Invalidate cache after successful write
        this.invalidateCache(game, mode);
        
        return {
          id: docRef.id,
          name: trimmedName,
          score,
          game: game || 'general',
          mode,
          createdAt: new Date(),
        };
      }
    } catch (error) {
      console.error('Error adding entry:', error);
      throw error;
    } finally {
      // Always invalidate cache after add/update attempt
      this.invalidateCache(game, mode);
    }
  }

  /**
   * Get entry by ID
   */
  async getEntryById(id: string): Promise<LeaderboardEntry | null> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data() as FirestoreEntry;
        return {
          id: docSnap.id,
          name: data.name,
          score: data.score,
          game: data.game,
          mode: data.mode,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate(),
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching entry:', error);
      return null;
    }
  }

  /**
   * Search entries by name
   */
  async searchByName(name: string): Promise<LeaderboardEntry[]> {
    try {
      const colRef = collection(db, this.collectionName);
      const q = query(
        colRef,
        where('name', '>=', name),
        where('name', '<=', `${name  }\uf8ff`),
        orderBy('score', 'desc')
      );
      
      const snapshot = await getDocs(q);
      const entries: LeaderboardEntry[] = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data() as FirestoreEntry;
        entries.push({
          id: doc.id,
          name: data.name,
          score: data.score,
          game: data.game,
          mode: data.mode,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate(),
        });
      });
      
      return entries;
    } catch (error) {
      console.error('Error searching entries:', error);
      return [];
    }
  }

  /**
   * Get rank for a score
   * Supports game and mode filters
   */
  async getRank(score: number, game?: GameType, mode?: string): Promise<number> {
    try {
      const colRef = collection(db, this.collectionName);
      const constraints = [where('score', '>', score)];
      
      if (game) {
        constraints.push(where('game', '==', game));
      }
      if (mode) {
        constraints.push(where('mode', '==', mode));
      }

      const q = query(colRef, ...constraints);
      const snapshot = await getCountFromServer(q);
      
      return snapshot.data().count + 1;
    } catch (error) {
      console.error('Error fetching rank:', error);
      return -1;
    }
  }

  /**
   * Delete an entry by ID
   */
  async deleteEntry(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, this.collectionName, id));
      return true;
    } catch (error) {
      console.error('Error deleting entry:', error);
      return false;
    }
  }

  /**
   * Get total count of entries
   * Supports game and mode filters
   */
  async getTotalCount(game?: GameType, mode?: string): Promise<number> {
    try {
      const colRef = collection(db, this.collectionName);
      const constraints = [];
      
      if (game) {
        constraints.push(where('game', '==', game));
      }
      if (mode) {
        constraints.push(where('mode', '==', mode));
      }

      const q = query(colRef, ...constraints);
      const snapshot = await getCountFromServer(q);
      
      return snapshot.data().count;
    } catch (error) {
      console.error('Error fetching count:', error);
      return 0;
    }
  }
}

// Export singleton instance
export const leaderboardApi = new LeaderboardApiClient();

export default leaderboardApi;