import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, RefreshCw, Medal, User } from 'lucide-react';
import { leaderboardApi, type LeaderboardEntry, type GameType } from '@services/leaderboardApi';

interface GameLeaderboardProps {
  game: GameType;
  mode?: string;
  title?: string;
}

/**
 * Game-specific Leaderboard Component
 * Can be embedded within games like Snake or Bird Shit
 * This is a view-only component - scores are submitted automatically from game events
 */
export const GameLeaderboard: React.FC<GameLeaderboardProps> = ({
  game,
  mode,
  title,
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  /**
   * Fetch leaderboard entries for this game/mode
   */
  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      const data = await leaderboardApi.getTopEntries(20, game, mode);
      setEntries(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch leaderboard entries:', error);
    } finally {
      setLoading(false);
    }
  }, [game, mode]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    return `Updated: ${lastUpdated.toLocaleTimeString()}`;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500 text-white font-bold text-xs">
          <Medal className="w-3 h-3" />
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-400 text-white font-bold text-xs">
          2
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-600 text-white font-bold text-xs">
          3
        </span>
      );
    }
    return (
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-600 text-gray-300 font-bold text-xs">
        {rank}
      </span>
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-gray-900/95 border border-gray-700 rounded-lg p-4 max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-bold text-white">
            {title || `${game === 'snake' ? 'Snake' : game === 'bird-shit' ? 'Bird Shit' : 'Leaderboard'}`}
            {mode && <span className="text-gray-400 text-sm ml-2 capitalize">({mode})</span>}
          </h3>
        </div>
        <button
          onClick={fetchEntries}
          disabled={loading}
          className="p-1 text-gray-400 hover:text-white rounded transition-colors"
          title="Refresh"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Entries List */}
      <div className="space-y-1 max-h-64 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500"></div>
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p className="text-sm">No scores yet</p>
            <p className="text-xs mt-1">Be the first to set a record!</p>
          </div>
        ) : (
          entries.map((entry, index) => (
            <div
              key={entry.id || index}
              className={`flex items-center py-2 px-3 rounded ${
                index === 0
                  ? 'bg-yellow-500/10 border border-yellow-500/20'
                  : index < 3
                  ? 'bg-gray-800/50'
                  : 'bg-gray-800/30'
              }`}
            >
              <span className="w-8 flex-shrink-0">{getRankBadge(index + 1)}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <User className="w-3 h-3 mr-1.5 text-gray-500" />
                  <span className="text-sm font-medium text-white truncate">
                    {entry.name}
                  </span>
                </div>
              </div>
              <div className="text-right ml-2">
                <span className="text-lg font-bold text-yellow-400">
                  {entry.score.toLocaleString()}
                </span>
                <div className="text-xs text-gray-500">
                  {formatDate(entry.createdAt)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {lastUpdated && (
        <div className="mt-2 text-xs text-gray-500 text-center">
          {formatLastUpdated()} • {entries.length} entries
        </div>
      )}
    </div>
  );
};

export default GameLeaderboard;