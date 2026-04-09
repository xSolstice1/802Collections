# Firebase Realtime Database Setup Guide

## Overview

The Corporate Monopoly game uses Firebase Realtime Database for multiplayer synchronization. This guide explains how to set up and configure your Firebase Realtime Database.

## Your Firebase Realtime Database URL

```
https://collection-a7a10-default-rtdb.asia-southeast1.firebasedatabase.app
```

## Step 1: Enable Realtime Database

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `collection-a7a10`
3. Navigate to **Build** → **Realtime Database**
4. Click **Create Database** (if not already created)
5. Choose **Asia Southeast (asia-southeast1)** as the location
6. Click **Next** and then **Enable**

## Step 2: Configure Database Rules

In the Firebase Console, go to the **Rules** tab and replace the existing rules with:

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true,
        "room": {
          ".validate": "newData.hasChildren(['id', 'name', 'hostId', 'status', 'maxPlayers', 'minPlayers', 'createdAt', 'settings'])"
        },
        "gameState": {
          ".validate": true
        },
        "players": {
          "$playerId": {
            ".validate": "newData.hasChildren(['id', 'name', 'balance', 'position'])"
          }
        }
      }
    }
  }
}
```

> **Note**: These rules are permissive for development. For production, you should add proper authentication and more restrictive rules.

## Step 3: Database Structure

The game data is stored in the following structure:

```
rooms/
  {roomId}/
    room/
      id: string              # Unique room ID
      name: string            # Room name
      hostId: string          # Host player ID
      status: string          # 'waiting', 'playing', or 'finished'
      maxPlayers: number      # Maximum players (default: 6)
      minPlayers: number      # Minimum players (default: 2)
      createdAt: number       # Timestamp
      startedAt?: number      # When game started
      finishedAt?: number     # When game ended
      settings/
        startingBalance: number
        salaryAmount: number
        luxuryTaxAmount: number
        incomeTaxAmount: number
        jailFines: number
        turnTimer: number
        auctionEnabled: boolean
        tradingEnabled: boolean
        powersEnabled: boolean
      inviteCode: string      # 6-character invite code
    gameState/
      id: string              # Room ID
      phase: string           # 'lobby', 'playing', 'finished'
      currentPlayerIndex: number
      turnPhase: string       # 'rolling', 'action', 'end'
      players/
        {playerId}/
          id: string
          name: string
          balance: number
          position: number
          properties: string[]
          inJail: boolean
          jailTurns: number
          isBankrupt: boolean
          color: string
          power: { type, name, description, cooldown, icon }
          powerUsed: boolean
          powerCooldown: number
      properties/
        {propertyId}/
          id: string
          name: string
          type: string
          tier: string
          price: number
          rent: number
          rentWithHq: number
          upgradeCost: number
          position: number
          color: string
          owner: string | null
          upgrades: number
          mortgaged: boolean
      board: BoardSpace[]
      dice: { die1, die2, total, isDoubles, timestamp } | null
      consecutiveDoubles: number
      marketCrashActive: boolean
      marketCrashPlayer: string | null
      events: GameEvent[]
      turnStartTime: number
      winnerId: string | null
      doublesExtraRoll: boolean
    players/
      {playerId}/
        id: string
        name: string
        balance: number
        position: number
        properties: string[]
        inJail: boolean
        jailTurns: number
        isBankrupt: boolean
        color: string
        power: { type, name, description, cooldown, icon }
        powerUsed: boolean
        powerCooldown: number
```

## Step 4: Test the Connection

You can test the Realtime Database connection by:

1. Open your app and navigate to `/monopoly`
2. Create a new room
3. Check the Firebase Console → Realtime Database to see the data

## Troubleshooting

### Database shows `null`

If the database shows `null`, it means:
1. The Realtime Database is not created yet - follow Step 1
2. The database rules are blocking access - follow Step 2
3. No rooms have been created yet - create a room in the app

### Permission Denied Errors

If you see permission denied errors:
1. Check that the database rules are correctly configured
2. Make sure the Realtime Database is in the correct region (asia-southeast1)
3. Verify that your Firebase configuration in `.env` is correct

### Connection Issues

If the game doesn't sync:
1. Check browser console for errors
2. Verify that `firebase/database` is imported in `src/services/firebase.ts`
3. Make sure the Realtime Database URL is correct

## Production Security

For production deployment, update the rules to:

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": "auth != null",
        ".write": "auth != null && (!data.exists() || data.child('room/hostId').val() === auth.uid || data.child('players').hasChild(auth.uid))",
        ".indexOn": ["inviteCode"],
        "room": {
          ".validate": "newData.hasChildren(['id', 'name', 'hostId', 'status'])"
        },
        "gameState": {
          ".validate": true
        },
        "players": {
          "$playerId": {
            ".validate": "$playerId === auth.uid || root.child('rooms').child($roomId).child('room/hostId').val() === auth.uid"
          }
        }
      }
    }
  }
}
```

This requires Firebase Authentication to be set up.