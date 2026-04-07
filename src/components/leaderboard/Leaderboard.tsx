import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, RefreshCw } from 'lucide-react';
import { LeaderboardList } from './LeaderboardList';
import { LeaderboardForm } from './LeaderboardForm';
import { leaderboardApi, type LeaderboardEntry } from '@services/leaderboardApi';

/**
 * Main Leaderboard Component
 * Manages state and combines the form and list components
 */
export const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  /**
   * Fetch leaderboard entries from the API
   */
  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      const data = await leaderboardApi.getTopEntries(20);
      setEntries(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch leaderboard entries:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Handle form submission
   */
  const handleSubmit = async (name: string, score: number) => {
    try {
      setSubmitting(true);
      await leaderboardApi.addEntry(name, score);
      // Refresh the leaderboard after successful submission
      await fetchEntries();
    } finally {
      setSubmitting(false);
    }
  };

  // Fetch entries on mount
  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    return `Updated: ${lastUpdated.toLocaleTimeString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-12 h-12 text-yellow-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Leaderboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Top 20 Players • {entries.length} entries
          </p>
          {lastUpdated && (
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              {formatLastUpdated()}
            </p>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Leaderboard List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Rankings
                </h2>
                <button
                  onClick={fetchEntries}
                  disabled={loading}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 
                    rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                    disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Refresh"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <LeaderboardList entries={entries} loading={loading} />
            </div>
          </div>

          {/* Submit Form */}
          <div className="lg:col-span-2 flex justify-center">
            <LeaderboardForm onSubmit={handleSubmit} loading={submitting} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Submit your score to join the leaderboard. Only top 20 scores are displayed.</p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;