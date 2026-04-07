import React, { useState } from 'react';
import { Send, User, Hash, AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface LeaderboardFormProps {
  onSubmit: (name: string, score: number) => Promise<void>;
  loading?: boolean;
}

/**
 * Leaderboard Form Component
 * Allows users to submit their name and score
 */
export const LeaderboardForm: React.FC<LeaderboardFormProps> = ({ onSubmit, loading = false }) => {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validateForm = (): boolean => {
    if (!name.trim()) {
      setError('Name is required');
      return false;
    }
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters');
      return false;
    }
    if (name.trim().length > 50) {
      setError('Name must be less than 50 characters');
      return false;
    }
    if (!score || isNaN(Number(score))) {
      setError('Please enter a valid score');
      return false;
    }
    const scoreNum = Number(score);
    if (scoreNum < 0) {
      setError('Score cannot be negative');
      return false;
    }
    if (scoreNum > Number.MAX_SAFE_INTEGER) {
      setError('Score is too large');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(name.trim(), Number(score));
      setSuccess('Score submitted successfully!');
      setName('');
      setScore('');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit score');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Hash className="w-5 h-5 mr-2 text-blue-500" />
          Submit Your Score
        </h3>

        {/* Name Input */}
        <div>
          <label 
            htmlFor="player-name" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Player Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="player-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              disabled={loading}
              className="pl-10 block w-full rounded-md border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                shadow-sm focus:border-blue-500 focus:ring-blue-500 
                disabled:bg-gray-100 dark:disabled:bg-gray-800
                sm:text-sm px-4 py-2 border"
              maxLength={50}
            />
          </div>
        </div>

        {/* Score Input */}
        <div>
          <label 
            htmlFor="player-score" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Score
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Hash className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="player-score"
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="Enter your score"
              disabled={loading}
              min="0"
              className="pl-10 block w-full rounded-md border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                shadow-sm focus:border-blue-500 focus:ring-blue-500 
                disabled:bg-gray-100 dark:disabled:bg-gray-800
                sm:text-sm px-4 py-2 border"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-md">
            <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="flex items-center text-green-600 dark:text-green-400 text-sm bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-md">
            <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent 
            rounded-md shadow-sm text-sm font-medium text-white 
            bg-blue-600 hover:bg-blue-700 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200"
        >
          {loading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Submit Score
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default LeaderboardForm;