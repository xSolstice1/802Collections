/**
 * Monopoly Custom Hooks
 *
 * Reusable hooks for the Monopoly game module
 */

import { useCallback, useMemo } from 'react';
import { useMonopolyStore } from '../store/gameStore';
import type { Property } from '../types';
import { monopolySoundEngine } from '../sound/MonopolySound';
import { updateGameState } from '../services/firebaseMonopoly';

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
    syncPlayers,
    getCurrentPlayer,
    getPlayerAtPosition,
    getPropertyOwner,
    getActivePlayers,
    processLanding,
    rollDiceInJail,
    calculateRent: storeCalculateRent,
  } = useMonopolyStore();

  // Sound effect wrapper
  const playSound = useCallback((type: Parameters<typeof monopolySoundEngine.play>[0]) => {
    monopolySoundEngine.play(type);
  }, []);

  // Computed values
  const currentPlayer = useMemo(() => getCurrentPlayer(), [getCurrentPlayer]);
  const activePlayers = useMemo(() => getActivePlayers(), [getActivePlayers]);
  const playerCount = useMemo(() => Object.keys(gameState?.players || {}).length, [gameState?.players]);

  // Our own player (always us, regardless of whose turn it is)
  const myPlayer = useMemo(() => {
    if (!currentUserId || !gameState) return null;
    return gameState.players[currentUserId] || null;
  }, [currentUserId, gameState]);

  const mySpace = useMemo(() => {
    if (!myPlayer || !gameState) return null;
    return gameState.board[myPlayer.position] || null;
  }, [myPlayer, gameState]);

  // The player whose turn it is
  const currentTurnPlayer = useMemo(() => {
    if (!gameState?.playerOrder) return null;
    const id = gameState.playerOrder[gameState.currentPlayerIndex];
    return id ? gameState.players[id] || null : null;
  }, [gameState]);

  const isMyTurn = useMemo(() => {
    if (!currentUserId || !gameState?.playerOrder) return false;
    const currentTurnPlayerId = gameState.playerOrder[gameState.currentPlayerIndex];
    return currentTurnPlayerId === currentUserId;
  }, [currentUserId, gameState?.playerOrder, gameState?.currentPlayerIndex]);

  const isHost = useMemo(() => {
    if (!room || !currentUserId) return false;
    return room.hostId === currentUserId;
  }, [room, currentUserId]);

  const canStartGame = useMemo(() => {
    return isHost && playerCount >= 2 && room?.status === 'waiting';
  }, [isHost, playerCount, room?.status]);

  const canRollDice = useMemo(() => {
    return isMyTurn && gameState?.turnPhase === 'rolling' && !myPlayer?.inJail;
  }, [isMyTurn, gameState?.turnPhase, myPlayer?.inJail]);

  const canBuyProperty = useMemo(() => {
    if (!isMyTurn || !myPlayer) return false;
    if (gameState?.turnPhase !== 'action') return false;

    const currentSpace = gameState?.board[myPlayer.position];
    if (!currentSpace?.propertyId) return false;

    const property = gameState?.properties[currentSpace.propertyId];
    return !property?.owner && myPlayer.balance >= property.price;
  }, [isMyTurn, myPlayer, gameState]);

  const canUpgradeProperty = useCallback((propertyId: string) => {
    if (!isMyTurn || !myPlayer || !gameState) return false;

    const property = gameState.properties[propertyId];
    if (!property || property.owner !== myPlayer.id) return false;
    if (property.type !== 'property') return false; // Can't upgrade railroads/utilities
    if (property.upgrades >= 5) return false; // Max: 4 houses + 1 hotel
    if (myPlayer.balance < property.upgradeCost) return false;

    // Must own all properties of the color group (monopoly required)
    const allOfColor = Object.values(gameState.properties).filter(
      p => p.color === property.color && p.type === 'property'
    );
    if (!allOfColor.every(p => p.owner === myPlayer.id)) return false;

    // Even building rule: can only build on property with fewest houses
    const minUpgrades = Math.min(...allOfColor.map(p => p.upgrades));
    if (property.upgrades > minUpgrades) return false;

    return true;
  }, [isMyTurn, myPlayer, gameState]);

  // ============================================================================
  // Firebase Sync Helper
  // ============================================================================

  const syncGameStateToFirebase = useCallback(async () => {
    const state = useMonopolyStore.getState();
    if (!state.room?.id || !state.gameState) return;
    try {
      await updateGameState(state.room.id, state.gameState);
    } catch (err) {
      console.error('Failed to sync game state to Firebase:', err);
    }
  }, []);

  // ============================================================================
  // Game Action Handlers
  // ============================================================================

  const handleRollDice = useCallback(() => {
    if (!canRollDice || !myPlayer) return;

    playSound('dice_roll');
    const result = rollDice();

    // Check for 3 consecutive doubles -> go to jail
    const stateAfterRoll = useMonopolyStore.getState();
    if (result.isDoubles && (stateAfterRoll.gameState?.consecutiveDoubles || 0) >= 3) {
      goToJail(myPlayer.id);
      playSound('jail');
      setNotification({ message: 'Three doubles! Sent to HQ Jail!', type: 'error' });
      endTurn();
      syncGameStateToFirebase();
      return;
    }

    // Move player
    movePlayer(myPlayer.id, result.total);

    // Process landing (auto-handles rent, tax, cards, jail)
    const landing = processLanding(myPlayer.id, result.total);

    // Show notification
    if (landing.message) {
      const notifType = (landing.type === 'rent' || landing.type === 'tax' || landing.type === 'jail')
        ? 'error' as const
        : landing.type === 'unowned_property'
          ? 'success' as const
          : 'info' as const;
      setNotification({ message: landing.message, type: notifType });
    }

    // Handle doubles extra roll (unless jailed by landing)
    if (result.isDoubles && landing.type !== 'jail') {
      const afterLanding = useMonopolyStore.getState();
      if (afterLanding.gameState && !afterLanding.gameState.players[myPlayer.id]?.inJail) {
        useMonopolyStore.setState((s) => ({
          gameState: s.gameState ? {
            ...s.gameState,
            doublesExtraRoll: true,
          } : s.gameState,
        }));
      }
    }

    syncGameStateToFirebase();
  }, [canRollDice, myPlayer, rollDice, movePlayer, processLanding, goToJail, endTurn, playSound, setNotification, syncGameStateToFirebase]);

  const handleBuyProperty = useCallback(() => {
    if (!canBuyProperty || !myPlayer) return;

    const currentSpace = gameState?.board[myPlayer.position];
    if (!currentSpace?.propertyId) return;

    const success = buyProperty(myPlayer.id, currentSpace.propertyId);
    if (success) {
      playSound('purchase');
      const prop = gameState?.properties[currentSpace.propertyId];
      setNotification({ message: `Purchased ${prop?.name} for $${prop?.price}!`, type: 'success' });
    }

    syncGameStateToFirebase();
  }, [canBuyProperty, myPlayer, buyProperty, gameState, playSound, setNotification, syncGameStateToFirebase]);

  const handleUpgradeProperty = useCallback((propertyId: string) => {
    if (!myPlayer) return;

    const success = upgradeProperty(myPlayer.id, propertyId);
    if (success) {
      playSound('upgrade');
      syncGameStateToFirebase();
    }
  }, [myPlayer, upgradeProperty, playSound, syncGameStateToFirebase]);

  const handleEndTurn = useCallback(() => {
    if (!isMyTurn) return;

    // Check for doubles extra roll
    const state = useMonopolyStore.getState();
    if (state.gameState?.doublesExtraRoll) {
      // Reset to rolling for extra roll instead of ending turn
      useMonopolyStore.setState((s) => ({
        gameState: s.gameState ? {
          ...s.gameState,
          turnPhase: 'rolling',
          doublesExtraRoll: false,
        } : s.gameState,
      }));
      setNotification({ message: 'Doubles! Roll again!', type: 'info' });
      syncGameStateToFirebase();
      return;
    }

    endTurn();
    syncGameStateToFirebase();
  }, [isMyTurn, endTurn, setNotification, syncGameStateToFirebase]);

  const handlePayJailFine = useCallback(() => {
    if (!myPlayer?.inJail || !isMyTurn) return;

    const success = payJailFine(myPlayer.id);
    if (success) {
      playSound('success');
      setNotification({ message: 'Paid fine and freed from HQ!', type: 'success' });
      // Set to rolling so they can roll this turn
      useMonopolyStore.setState((s) => ({
        gameState: s.gameState ? {
          ...s.gameState,
          turnPhase: 'rolling',
        } : s.gameState,
      }));
      syncGameStateToFirebase();
    } else {
      setNotification({ message: 'Not enough money to pay fine!', type: 'error' });
    }
  }, [myPlayer, isMyTurn, payJailFine, playSound, setNotification, syncGameStateToFirebase]);

  const handleRollDiceInJail = useCallback(() => {
    if (!myPlayer?.inJail || !isMyTurn) return;

    playSound('dice_roll');
    const result = rollDiceInJail(myPlayer.id);

    if (result.freed) {
      playSound('success');

      // If not doubles (3rd failed attempt forced fine), move manually
      if (!result.dice.isDoubles) {
        movePlayer(myPlayer.id, result.dice.total);
      }

      // Process landing at new position
      const landing = processLanding(myPlayer.id, result.dice.total);

      if (landing.message) {
        setNotification({ message: `Freed! ${landing.message}`, type: 'info' });
      } else {
        setNotification({ message: 'Freed from HQ!', type: 'success' });
      }

      // Set to action phase
      useMonopolyStore.setState((s) => ({
        gameState: s.gameState ? {
          ...s.gameState,
          turnPhase: 'action',
        } : s.gameState,
      }));
    } else {
      // Failed to roll doubles, turn over
      const state = useMonopolyStore.getState();
      const jailTurns = state.gameState?.players[myPlayer.id]?.jailTurns || 0;
      setNotification({
        message: `Failed to roll doubles (attempt ${jailTurns}/3)`,
        type: 'error',
      });
      endTurn();
    }

    syncGameStateToFirebase();
  }, [myPlayer, isMyTurn, rollDiceInJail, movePlayer, processLanding, endTurn, playSound, setNotification, syncGameStateToFirebase]);

  const handleUsePower = useCallback(() => {
    if (!myPlayer || myPlayer.powerUsed) return;

    const success = usePower(myPlayer.id);
    if (success) {
      playSound('power_use');
      setNotification({ message: `Used ${myPlayer.power?.name}!`, type: 'success' });
      syncGameStateToFirebase();
    }
  }, [myPlayer, usePower, playSound, setNotification, syncGameStateToFirebase]);

  const handleDrawMarketEvent = useCallback(() => {
    if (!myPlayer) return;
    playSound('card_draw');
    return drawMarketEvent(myPlayer.id);
  }, [myPlayer, drawMarketEvent, playSound]);

  const handleDrawCorporateAction = useCallback(() => {
    if (!myPlayer) return;
    playSound('card_draw');
    return drawCorporateAction(myPlayer.id);
  }, [myPlayer, drawCorporateAction, playSound]);

  // ============================================================================
  // Computed Properties
  // ============================================================================

  const myProperties = useMemo(() => {
    if (!myPlayer) return [];
    return (myPlayer.properties || [])
      .map((propId) => gameState?.properties[propId])
      .filter((p): p is Property => p !== undefined);
  }, [myPlayer, gameState?.properties]);

  const propertyGroups = useMemo(() => {
    const groups: Record<string, Property[]> = {};
    myProperties.forEach((property) => {
      if (property.type === 'property') {
        if (!groups[property.color]) groups[property.color] = [];
        groups[property.color].push(property);
      }
    });
    return groups;
  }, [myProperties]);

  const hasMonopoly = useCallback((color: string) => {
    const group = propertyGroups[color];
    if (!group) return false;
    const allOfColor = Object.values(gameState?.properties || {}).filter(
      (p) => p.color === color && p.type === 'property'
    );
    return group.length === allOfColor.length;
  }, [propertyGroups, gameState?.properties]);

  const monopolies = useMemo(() => {
    const colors = [...new Set(myProperties.map((p) => p.color))];
    return colors.filter((color) => hasMonopoly(color));
  }, [myProperties, hasMonopoly]);

  const calculateRent = useCallback((property: Property, diceRoll?: number): number => {
    return storeCalculateRent(property, diceRoll);
  }, [storeCalculateRent]);

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
    myPlayer,
    mySpace,
    myProperties,
    propertyGroups,
    monopolies,
    currentTurnPlayer,

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
    handleRollDiceInJail,
    handleUsePower,
    handleDrawMarketEvent,
    handleDrawCorporateAction,
    setSelectedProperty,
    setShowTradeModal,
    setShowPowerModal,
    setNotification,
    syncFromFirebase,
    syncPlayers,
    syncGameStateToFirebase,
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
    return (player.properties || [])
      .map((propId) => gameState.properties[propId])
      .filter((p): p is Property => p !== undefined);
  }, [player, gameState]);

  const totalValue = useMemo(() => {
    if (!player || !gameState) return 0;
    let value = player.balance;
    (player.properties || []).forEach((propId) => {
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
    canBeBought: !property?.owner,
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

  const isActive = useMemo(() => room?.status === 'playing', [room?.status]);
  const isWaiting = useMemo(() => room?.status === 'waiting', [room?.status]);
  const isFinished = useMemo(() => room?.status === 'finished', [room?.status]);

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
