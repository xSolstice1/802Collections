import React from 'react';
import { Trophy, User, Calendar, Medal } from 'lucide-react';
import type { LeaderboardEntry } from '@services/leaderboardApi';

interface LeaderboardListProps {
  entries: LeaderboardEntry[];
  loading?: boolean;
}

/**
 * Leaderboard List Component
 * Displays the top 20 leaderboard entries in a ranked table
 */
export const LeaderboardList: React.FC<LeaderboardListProps> = ({ entries, loading = false }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <Trophy className="mx-auto h-12 w-12 mb-4 opacity-50" />
        <p className="text-lg">No entries yet</p>
        <p className="text-sm mt-2">Be the first to join the leaderboard!</p>
      </div>
    );
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 text-white font-bold">
          <Medal className="w-4 h-4" />
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-400 text-white font-bold">
          2
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-600 text-white font-bold">
          3
        </span>
      );
    }
    return (
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-sm">
        {rank}
      </span>
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-200 dark:border-gray-700">
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Rank
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Player
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Score
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr
              key={entry.id || index}
              className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                index < 3 ? 'bg-gradient-to-r from-yellow-50/50 to-transparent dark:from-yellow-900/10' : ''
              }`}
            >
              <td className="px-4 py-3 whitespace-nowrap">
                {getRankBadge(index + 1)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {entry.name}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-right">
                <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
                  {entry.score.toLocaleString()}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-right hidden sm:table-cell">
                <div className="flex items-center justify-end text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(entry.createdAt)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardList;