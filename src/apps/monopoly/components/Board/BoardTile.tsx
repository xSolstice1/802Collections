/**
 * BoardTile Component
 * 
 * Individual tile component for the Monopoly board
 */

import React from 'react';
import { BoardSpace, Property } from '../../types';
import { PROPERTIES } from '../../data/board';

interface PlayerToken {
  id: string;
  color: string;
  name: string;
}

interface BoardTileProps {
  space: BoardSpace;
  property?: Property | null;
  players?: PlayerToken[];
  isSelected?: boolean;
  isHighlighted?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  className?: string;
}

const getSpaceEmoji = (type: BoardSpace['type']): string => {
  switch (type) {
    case 'corner':
      return '🏛';
    case 'chance':
      return '📊';
    case 'communityChest':
      return '🏢';
    case 'tax':
      return '💸';
    case 'property':
      return '🏠';
    case 'railroad':
      return '🚂';
    case 'utility':
      return '⚡';
    default:
      return '📍';
  }
};

const getSpaceShortName = (space: BoardSpace): string => {
  switch (space.position) {
    case 0: return 'GO';
    case 10: return 'HQ';
    case 20: return '🅿️';
    case 30: return '🚔';
    default: return space.name;
  }
};

const BoardTile: React.FC<BoardTileProps> = ({
  space,
  property,
  players = [],
  isSelected = false,
  isHighlighted = false,
  onClick,
  onHover,
  className = '',
}) => {
  // Get property data if this space has one
  const propertyData = property || PROPERTIES.find(p => p.position === space.position);

  const isCorner = space.type === 'corner';
  const hasOwner = propertyData?.owner !== null && propertyData?.owner !== undefined;
  const ownerColor = hasOwner ? propertyData?.owner : null;

  // Determine tile styles based on space type
  const getTileStyles = () => {
    const base = 'relative flex flex-col items-center justify-center p-1 transition-all duration-200 cursor-pointer border';
    
    let bgColor = 'bg-gray-900/80';
    let borderColor = 'border-gray-700/50';
    let hoverEffect = 'hover:border-[#44D62C]/50 hover:bg-gray-800';
    
    if (isSelected) {
      borderColor = 'border-[#44D62C]';
      hoverEffect = 'shadow-[0_0_15px_rgba(68,214,44,0.3)]';
    }
    
    if (isHighlighted) {
      bgColor = 'bg-[#44D62C]/10';
      borderColor = 'border-[#44D62C]/70';
    }
    
    if (propertyData?.color && space.type === 'property') {
      // Add color bar at top
      bgColor = `${bgColor}`;
    }
    
    if (space.type === 'corner') {
      bgColor = 'bg-gray-800/80';
      borderColor = 'border-[#44D62C]/30';
    }
    
    return `${base} ${bgColor} ${borderColor} ${hoverEffect} ${className}`;
  };

  // Render property color bar
  const renderColorBar = () => {
    if (!propertyData?.color || space.type !== 'property') return null;
    
    return (
      <div
        className="absolute top-0 left-0 right-0 h-1.5 rounded-t-sm"
        style={{ backgroundColor: propertyData.color }}
      />
    );
  };

  // Render ownership indicator
  const renderOwnershipIndicator = () => {
    if (!hasOwner || !propertyData?.owner) return null;
    
    return (
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ backgroundColor: ownerColor || '#44D62C' }}
      />
    );
  };

  // Render upgrade indicators
  const renderUpgrades = () => {
    if (!propertyData || propertyData.upgrades === 0) return null;
    
    const upgradeCount = Math.min(propertyData.upgrades, 4);
    const isHQ = propertyData.upgrades >= 5;
    
    return (
      <div className="absolute top-2 right-1 flex gap-0.5">
        {isHQ ? (
          <span className="text-[8px] text-yellow-400">🏢</span>
        ) : (
          Array.from({ length: upgradeCount }).map((_, i) => (
            <span key={i} className="text-[6px] text-[#44D62C]">▲</span>
          ))
        )}
      </div>
    );
  };

  // Render player tokens
  const renderPlayerTokens = () => {
    if (players.length === 0) return null;
    
    return (
      <div className="absolute -top-1 -right-1 flex -space-x-1 z-10">
        {players.map((player) => (
          <div
            key={player.id}
            className="w-3 h-3 rounded-full border border-white/50 shadow-sm"
            style={{ backgroundColor: player.color }}
            title={player.name}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className={getTileStyles()}
      onClick={onClick}
      onMouseEnter={onHover}
      role="button"
      tabIndex={0}
      aria-label={`${space.name} - ${space.type}`}
    >
      {renderColorBar()}
      {renderOwnershipIndicator()}
      {renderUpgrades()}
      {renderPlayerTokens()}
      
      <span className="text-[10px] font-medium text-gray-300 text-center leading-tight">
        {getSpaceShortName(space)}
      </span>
      
      {space.type !== 'corner' && (
        <span className="text-[8px] text-gray-500 mt-0.5">
          {propertyData ? `$${propertyData.price}` : ''}
        </span>
      )}
      
      {/* Corner special styling */}
      {isCorner && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg opacity-50">{getSpaceEmoji(space.type)}</span>
        </div>
      )}
    </div>
  );
};

export default BoardTile;