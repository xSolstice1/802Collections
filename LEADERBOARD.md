# Leaderboard Feature

A Firebase Firestore-backed leaderboard feature that allows users to submit their scores and view the top 20 players. The leaderboard is integrated directly into games (Snake and Bird Shit Simulator) with support for game-specific and mode-specific leaderboards.

## Overview

The leaderboard feature uses Firebase Firestore for data persistence. No backend server is required - all operations are handled directly through the Firebase SDK.

## Features

- Submit player name and score
- View top 20 leaderboard entries per game/mode
- Game-specific leaderboards (Snake, Bird Shit)
- Mode-specific leaderboards for Snake (classic, modern, crazy)
- Automatic score updates (only higher scores replace existing entries)
- Real-time refresh functionality
- Responsive design with dark mode support

## Firebase Setup

### Prerequisites

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore database in your Firebase project
3. Get your Firebase configuration from Project Settings

### Firestore Security Rules

Set up Firestore security rules to allow read/write access to the `802collection` collection:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /802collection/{document=**} {
      allow read, write: if true;
    }
  }
}
```

> **Important**: Make sure your Firestore security rules match the collection name exactly. The collection name is `802collection`.

> **Note**: For production, you should implement proper security rules to prevent abuse.

### Configuration

#### Local Development
Update your `.env` file with your Firebase configuration:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

#### GitHub Pages Deployment
For GitHub Pages deployment, you need to set up GitHub Actions with repository secrets:

1. Go to your GitHub repository → Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `FIREBASE_API_KEY`
   - `FIREBASE_AUTH_DOMAIN`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_STORAGE_BUCKET`
   - `FIREBASE_MESSAGING_SENDER_ID`
   - `FIREBASE_APP_ID`

The GitHub Actions workflow will automatically build and deploy your app with the correct environment variables.

## Usage

### Running Locally

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

### Building for Production

```bash
npm run build
```

### Deploying to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init hosting

# Deploy
firebase deploy
```

## Data Model

```typescript
interface LeaderboardEntry {
  id?: string;
  name: string;
  score: number;
  game?: 'snake' | 'bird-shit' | 'general';
  mode?: string;  // e.g., 'classic', 'modern', 'crazy' for snake
  createdAt: Date;
  updatedAt?: Date;
}
```

## API Usage

### Submit a Score

```typescript
import { leaderboardApi } from '@services/leaderboardApi';

// Submit a score (automatically updates if higher)
await leaderboardApi.addEntry('PlayerName', 1000, 'snake', 'classic');
```

### Get Top Entries

```typescript
// Get top 20 entries for snake classic mode
const entries = await leaderboardApi.getTopEntries(20, 'snake', 'classic');

// Get overall top entries
const entries = await leaderboardApi.getTopEntries(20);
```

### Get Player Rank

```typescript
// Get rank for a score in snake classic mode
const rank = await leaderboardApi.getRank(1000, 'snake', 'classic');
```

## Game Integration

The leaderboard is automatically integrated into the games:

1. **Snake**: Separate leaderboards for each mode (classic, modern, crazy)
2. **Bird Shit**: Overall leaderboard for the game

Scores are automatically submitted when a game ends (no manual submission required).

## Notes

- Only the top 20 scores per game/mode combination are displayed
- If a player submits a higher score, it replaces their previous entry for that game/mode
- Scores cannot be negative
- Player names must be 2-50 characters
- The leaderboard is NOT a standalone feature - it's integrated into games