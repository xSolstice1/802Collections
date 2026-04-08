/**
 * Monopoly Custom Hooks
 * 
 * Reusable hooks for the Monopoly game module
 */

import { useCallback, useMemo, useEffect } from 'react';
import { useMonopolyStore } from '../store/gameStore';
import type { Player, Property, GameState, Room } from '../types';
import { monopolySoundEngine } from '../sound/MonopolySound';

// ============================================================================
// Main Game Hook
// ============================================================================

export const useMonopolyGame = () => {
  const {
    room,
    currentUserId,
    gameState,
    selectedProperty,
    showTradeModal,
    showPowerModal,
    notification,
    marketEventDeck,
    corporateActionDeck,
    setCurrentUser,
    createRoom,
    joinRoom,
    leaveRoom,
    startGame,
    rollDice,
    movePlayer,
    buyProperty,
    upgradeProperty,
    payRent,
    endTurn,
    goToJail,
    payJailFine,
    usePower,
    drawMarketEvent,
    drawCorporateAction,
    setSelectedProperty,
    setShowTradeModal,
    setShowPowerModal,
    setNotification,
    syncFromFirebase,
    getCurrentPlayer,
    getPlayerAtPosition,
    getPropertyOwner,
    getActivePlayers,
  } = useMonopolyStore();

  // Sound effect wrappers
  const playSound = useCallback((type: Parameters<typeof monopolySoundEngine.play>[0]) => {
    monopolySoundEngine.play(type);
  }, []);

  // Computed values
  const currentPlayer = useMemo(() => getCurrentPlayer(), [getCurrentPlayer]);
  const activePlayers = useMemo(() => getActivePlayers(), [getActivePlayers]);
  const playerCount = useMemo(() => Object.keys(gameState?.players || {}).length, [gameState?.players]);

  const isMyTurn = useMemo(() => {
    if (!currentUserId || !currentPlayer) return false;
    return currentPlayer.id === currentUserId;
  }, [currentUserId, currentPlayer]);

  const isHost = useMemo(() => {
    if (!room || !currentUserId) return false;
    return room.hostId === currentUserId;
  }, [room, currentUserId]);

  const canStartGame = useMemo(() => {
    return isHost && playerCount >= 2 && room?.status === 'waiting';
  }, [isHost, playerCount, room?.status]);

  const canRollDice = useMemo(() => {
    return isMyTurn && gameState?.turnPhase === 'rolling' && !currentPlayer?.inJail;
  }, [isMyTurn, gameState?.turnPhase, currentPlayer?.inJail]);

  const canBuyProperty = useMemo(() => {
    if (!isMyTurn || !currentPlayer) return false;
    if (gameState?.turnPhase !== 'action') return false;
    
    const currentSpace = gameState?.board[currentPlayer.position];
    if (!currentSpace?.propertyId) return false;
    
    const property = gameState?.properties[currentSpace.propertyId];
    return property?.owner === null && currentPlayer.balance >= property.price;
  }, [isMyTurn, currentPlayer, gameState]);

  const canUpgradeProperty = useCallback((propertyId: string) => {
    if (!isMyTurn || !currentPlayer) return false;
    
    const property = gameState?.properties[propertyId];
    if (!property || property.owner !== currentPlayer.id) return false;
    if (property.upgrades >= 5) return false;
    
    return currentPlayer.balance >= property.upgradeCost;
  }, [isMyTurn, currentPlayer, gameState?.properties]);

  // Game actions with sound
  const handleRollDice = useCallback(() => {
    if (!canRollDice || !currentPlayer) return;
    
    playSound('dice_roll');
    const result = rollDice();
    
    setTimeout(() => {
      playSound('dice_land');
      movePlayer(currentPlayer.id, result.total);
      
      // Handle doubles
      if (result.isDoubles && gameState?.consecutiveDoubles! < 3) {
        // Extra roll
      } else if (result.isDoubles && gameState?.consecutiveDoubles! >= 3) {
        // Three doubles = go to jail
        setTimeout(() => {
          goToJail(currentPlayer.id);
          playSound('jail');
          endTurn();
        }, 500);
      }
    }, 500);
  }, [canRollDice, currentPlayer, rollDice, movePlayer, goToJail, endTurn, playSound, gameState?.consecutiveDoubles]);

  const handleBuyProperty = useCallback(() => {
    if (!canBuyProperty || !currentPlayer) return;
    
    const currentSpace = gameState?.board[currentPlayer.position];
    if (!currentSpace?.propertyId) return;
    
    const success = buyProperty(currentPlayer.id, currentSpace.propertyId);
    if (success) {
      playSound('purchase');
    }
  }, [canBuyProperty, currentPlayer, buyProperty, gameState?.board, playSound]);

  const handleUpgradeProperty = useCallback((propertyId: string) => {
    if (!currentPlayer) return;
    
    const success = upgradeProperty(currentPlayer.id, propertyId);
    if (success) {
      playSound('upgrade');
    }
  }, [currentPlayer, upgradeProperty, playSound]);

  const handleEndTurn = useCallback(() => {
    if (!isMyTurn) return;
    endTurn();
  }, [isMyTurn, endTurn]);

  const handlePayJailFine = useCallback(() => {
    if (!currentPlayer?.inJail) return;
    
    const success = payJailFine(currentPlayer.id);
    if (success) {
      playSound('success');
    }
  }, [currentPlayer, payJailFine, playSound]);

  const handleUsePower = useCallback(() => {
    if (!currentPlayer || currentPlayer.powerUsed) return;
    
    const success = usePower(currentPlayer.id);
    if (success) {
      playSound('power_use');
    }
  }, [currentPlayer, usePower, playSound]);

  const handleDrawMarketEvent = useCallback(() => {
    if (!currentPlayer) return;
    
    playSound('card_draw');
    const card = drawMarketEvent(currentPlayer.id);
    return card;
  }, [currentPlayer, drawMarketEvent, playSound]);

  const handleDrawCorporateAction = useCallback(() => {
    if (!currentPlayer) return;
    
    playSound('card_draw');
    const card = drawCorporateAction(currentPlayer.id);
    return card;
  }, [currentPlayer, drawCorporateAction, playSound]);

  // Player's properties
  const myProperties = useMemo(() => {
    if (!currentPlayer) return [];
    
    return currentPlayer.properties
      .map((propId) => gameState?.properties[propId])
      .filter((p): p is Property => p !== undefined);
  }, [currentPlayer, gameState?.properties]);

  // Player's property groups (for monopoly detection)
  const propertyGroups = useMemo(() => {
    const groups: Record<string, Property[]> = {};
    
    myProperties.forEach((property) => {
      if (property.type === 'property') {
        if (!groups[property.color]) {
          groups[property.color] = [];
        }
        groups[property.color].push(property);
      }
    });
    
    return groups;
  }, [myProperties]);

  // Check for monopolies (owning all properties of a color)
  const hasMonopoly = useCallback((color: string) => {
    const group = propertyGroups[color];
    if (!group) return false;
    
    // Count total properties of this color
    const allOfColor = Object.values(gameState?.properties || {}).filter(
      (p) => p.color === color && p.type === 'property'
    );
    
    return group.length === allOfColor.length;
  }, [propertyGroups, gameState?.properties]);

  const monopolies = useMemo(() => {
    const colors = [...new Set(myProperties.map((p) => p.color))];
    return colors.filter((color) => hasMonopoly(color));
  }, [myProperties, hasMonopoly]);

  // Calculate rent for a property
  const calculateRent = useCallback((property: Property, diceRoll?: number): number => {
    if (property.mortgaged) return 0;
    
    let rent = property.rent;
    
    if (property.type === 'railroad') {
      // Rent based on number of railroads owned
      const owner = gameState?.players[property.owner!];
      if (owner) {
        const railroadCount = owner.properties.filter(
          (pid) => gameState?.properties[pid]?.type === 'railroad'
        ).length;
        rent = 25 * Math.pow(2, railroadCount - 1);
      }
    } else if (property.type === 'utility') {
      // Rent based on dice roll
      const owner = gameState?.players[property.owner!];
      if (owner) {
        const utilityCount = owner.properties.filter(
          (pid) => gameState?.properties[pid]?.type === 'utility'
        ).length;
        rent = (diceRoll || 7) * (utilityCount === 2 ? 10 : 4);
      }
    } else if (property.upgrades > 0) {
      // Rent with upgrades
      if (property.upgrades >= 5) {
        rent = property.rentWithHq;
      } else {
        // Simplified upgrade rent calculation
        rent = property.rent * (property.upgrades + 1);
      }
    }
    
    // Apply market crash if active
    if (gameState?.marketCrashActive) {
      rent = Math.floor(rent / 2);
    }
    
    return rent;
  }, [gameState]);

  // Sound controls
  const toggleSound = useCallback(() => {
    monopolySoundEngine.toggleEnabled();
  }, []);

  const toggleMusic = useCallback(() => {
    monopolySoundEngine.toggleMusic();
  }, []);

  return {
    // State
    room,
    currentUserId,
    gameState,
    selectedProperty,
    showTradeModal,
    showPowerModal,
    notification,
    marketEventDeck,
    corporateActionDeck,
    currentPlayer,
    activePlayers,
    playerCount,
    myProperties,
    propertyGroups,
    monopolies,
    
    // Computed
    isMyTurn,
    isHost,
    canStartGame,
    canRollDice,
    canBuyProperty,
    canUpgradeProperty,
    
    // Actions
    setCurrentUser,
    createRoom,
    joinRoom,
    leaveRoom,
    startGame,
    handleRollDice,
    handleBuyProperty,
    handleUpgradeProperty,
    handleEndTurn,
    handlePayJailFine,
    handleUsePower,
    handleDrawMarketEvent,
    handleDrawCorporateAction,
    setSelectedProperty,
    setShowTradeModal,
    setShowPowerModal,
    setNotification,
    syncFromFirebase,
    toggleSound,
    toggleMusic,
    
    // Getters
    getCurrentPlayer,
    getPlayerAtPosition,
    getPropertyOwner,
    getActivePlayers,
    calculateRent,
    hasMonopoly,
    
    // Sound
    playSound,
    soundEnabled: monopolySoundEngine.isEnabled(),
    musicEnabled: monopolySoundEngine.isMusicEnabled(),
  };
};

// ============================================================================
// Player Hook
// ============================================================================

export const useMonopolyPlayer = (playerId?: string) => {
  const { gameState, currentUserId } = useMonopolyStore();
  
  const id = playerId || currentUserId;
  
  const player = useMemo(() => {
    if (!gameState || !id) return null;
    return gameState.players[id] || null;
  }, [gameState, id]);
  
  const properties = useMemo(() => {
    if (!player || !gameState) return [];
    
    return player.properties
      .map((propId) => gameState.properties[propId])
      .filter((p): p is Property => p !== undefined);
  }, [player, gameState]);
  
  const totalValue = useMemo(() => {
    if (!player || !gameState) return 0;
    
    let value = player.balance;
    player.properties.forEach((propId) => {
      const prop = gameState.properties[propId];
      if (prop) {
        value += prop.price + (prop.upgrades * prop.upgradeCost);
      }
    });
    
    return value;
  }, [player, gameState]);
  
  return {
    player,
    properties,
    totalValue,
    isCurrentPlayer: id === currentUserId,
  };
};

// ============================================================================
// Property Hook
// ============================================================================

export const useMonopolyProperty = (propertyId: string) => {
  const { gameState, getPropertyOwner } = useMonopolyStore();
  
  const property = useMemo(() => {
    if (!gameState) return null;
    return gameState.properties[propertyId] || null;
  }, [gameState, propertyId]);
  
  const owner = useMemo(() => {
    return getPropertyOwner(propertyId);
  }, [getPropertyOwner, propertyId]);
  
  const space = useMemo(() => {
    if (!gameState) return null;
    return gameState.board.find((s) => s.position === property?.position) || null;
  }, [gameState, property?.position]);
  
  return {
    property,
    owner,
    space,
    isOwned: owner !== null,
    canBeBought: property?.owner === null,
  };
};

// ============================================================================
// Room Hook
// ============================================================================

export const useMonopolyRoom = () => {
  const { room, gameState, currentUserId } = useMonopolyStore();
  
  const players = useMemo(() => {
    if (!gameState) return [];
    return Object.values(gameState.players);
  }, [gameState]);
  
  const isActive = useMemo(() => {
    return room?.status === 'playing';
  }, [room?.status]);
  
  const isWaiting = useMemo(() => {
    return room?.status === 'waiting';
  }, [room?.status]);
  
  const isFinished = useMemo(() => {
    return room?.status === 'finished';
  }, [room?.status]);
  
  const winner = useMemo(() => {
    if (!gameState?.winnerId) return null;
    return gameState.players[gameState.winnerId] || null;
  }, [gameState]);
  
  return {
    room,
    players,
    isActive,
    isWaiting,
    isFinished,
    winner,
    currentUserId,
  };
};

export default useMonopolyGame;