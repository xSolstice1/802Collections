/**
 * Monopoly Board Component
 * 
 * The main game board displaying all 40 spaces in a square layout
 */

import React, { useMemo } from 'react';
import { BoardSpace } from '../../types';
import BoardTile from './BoardTile';
import { BOARD_SPACES } from '../../data/board';

interface PlayerPosition {
  position: number;
  color: string;
  name: string;
}

interface BoardProps {
  spaces?: BoardSpace[];
  playerPositions?: Record<string, PlayerPosition>;
  selectedSpace?: number | null;
  onSpaceClick?: (position: number) => void;
  onSpaceHover?: (position: number | null) => void;
  className?: string;
}

interface PlayerAtPosition extends PlayerPosition {
  playerId: string;
}

// Board layout mapping - positions arranged in a square
// The classic Monopoly board has:
// - Bottom row: positions 0-10 (right to left)
// - Left column: positions 11-19 (bottom to top)
// - Top row: positions 20-30 (left to right)
// - Right column: positions 31-39 (top to bottom)
const getBoardPosition = (position: number): { row: number; col: number } => {
  if (position >= 0 && position <= 10) {
    // Bottom row (right to left)
    return { row: 10, col: 10 - position };
  } else if (position >= 11 && position <= 19) {
    // Left column (bottom to top)
    return { row: 10 - (position - 10), col: 0 };
  } else if (position >= 20 && position <= 30) {
    // Top row (left to right)
    return { row: 0, col: position - 20 };
  } else {
    // Right column (top to bottom)
    return { row: position - 30, col: 10 };
  }
};

const Board: React.FC<BoardProps> = ({
  spaces = BOARD_SPACES,
  playerPositions = {},
  selectedSpace = null,
  onSpaceClick,
  onSpaceHover,
  className = '',
}) => {
  // Group spaces by board position
  const boardGrid = useMemo(() => {
    const grid: (BoardSpace | null)[][] = Array.from({ length: 11 }, () =>
      Array.from({ length: 11 }, () => null)
    );

    spaces.forEach((space) => {
      const { row, col } = getBoardPosition(space.position);
      grid[row][col] = space;
    });

    return grid;
  }, [spaces]);

  // Get players at each position
  const playersAtPosition = useMemo(() => {
    const map: Record<number, PlayerAtPosition[]> = {};
    
    Object.entries(playerPositions).forEach(([playerId, player]) => {
      if (!map[player.position]) {
        map[player.position] = [];
      }
      map[player.position].push({ ...player, playerId });
    });
    
    return map;
  }, [playerPositions]);

  // Center area content
  const centerContent = (
    <div className="col-start-2 col-end-10 row-start-2 row-end-10 flex flex-col items-center justify-center p-4 bg-black/80 border border-[#44D62C]/20 rounded-lg">
      <div className="text-[#44D62C] font-bold text-2xl mb-2 tracking-wider" style={{ textShadow: '0 0 20px rgba(68,214,44,0.5)' }}>
        CORPORATE
      </div>
      <div className="text-gray-400 text-xs uppercase tracking-widest mb-4">
        Monopoly Edition
      </div>
      <div className="text-gray-500 text-xs text-center max-w-[200px]">
        Build your empire
      </div>
    </div>
  );

  return (
    <div className={`relative ${className}`}>
      <div 
        className="grid gap-[2px] bg-[#111] p-[2px] rounded-lg"
        style={{
          gridTemplateColumns: 'repeat(11, minmax(0, 1fr))',
          gridTemplateRows: 'repeat(11, minmax(0, 1fr))',
        }}
        onMouseLeave={() => onSpaceHover?.(null)}
      >
        {boardGrid.map((row, rowIdx) =>
          row.map((boardSpace, colIdx) => {
            const gridStyle = { gridRow: rowIdx + 1, gridColumn: colIdx + 1 };

            if (!boardSpace) {
              // Center area
              if (rowIdx > 0 && rowIdx < 10 && colIdx > 0 && colIdx < 10) {
                if (rowIdx === 1 && colIdx === 1) {
                  return (
                    <div
                      key="center"
                      style={{ gridRow: '2 / 11', gridColumn: '2 / 11' }}
                    >
                      {centerContent}
                    </div>
                  );
                }
                return null; // Covered by center content
              }
              return (
                <div
                  key={`empty-${rowIdx}-${colIdx}`}
                  className="bg-black/40 min-h-[60px] min-w-[60px]"
                  style={gridStyle}
                />
              );
            }

            const playersHere = playersAtPosition[boardSpace.position] || [];
            const isSelected = selectedSpace === boardSpace.position;

            return (
              <div key={boardSpace.position} style={gridStyle}>
                <BoardTile
                  space={boardSpace}
                  players={playersHere}
                  isSelected={isSelected}
                  onClick={() => onSpaceClick?.(boardSpace.position)}
                  onHover={() => onSpaceHover?.(boardSpace.position)}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Board;