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
  getCountFromServer
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
 * Leaderboard API client class
 * Uses Firebase Firestore directly
 */
class LeaderboardApiClient {
  private readonly collectionName = '802collection';

  /**
   * Get top leaderboard entries (default: top 20)
   * Optional game and mode filters for game-specific leaderboards
   * Note: Uses client-side filtering to avoid Firestore index requirements
   */
  async getTopEntries(
    limitCount: number = 20, 
    game?: GameType, 
    mode?: string
  ): Promise<LeaderboardEntry[]> {
    try {
      const colRef = collection(db, this.collectionName);
      
      // Fetch all entries ordered by score (no where clause = no index needed)
      const q = query(colRef, orderBy('score', 'desc'), limit(100));
      
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
      return entries.slice(0, Math.min(limitCount, 20));
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
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