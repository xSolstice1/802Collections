import { useState, useRef, useEffect, useCallback } from 'react';
import { Bird, Play, Maximize, Minimize, Trophy, X, Lock, Volume2, VolumeX, Settings } from 'lucide-react';
import { birdShitSound } from './sound';
import { GameLeaderboard } from '@components/leaderboard';
import { CardSelectionOverlay } from './components/CardSelectionOverlay';
import { RelicSelectionOverlay } from './components/RelicSelectionOverlay';
import { MetaUpgradePanel } from './components/MetaUpgradePanel';
import { loadMeta, saveMeta, earnMetaCurrency } from './meta';
import type { MetaState } from './meta';
import { CANVAS_W, CANVAS_H, GROUND_Y, BIRD_W, STORAGE_KEY } from './constants';
import { useGameLoop } from './hooks/useGameLoop';
import { useControls } from './hooks/useControls';
import { BIRD_SKINS, getSkinById } from './skins';
import type { GameState } from './types';
import type { DrawBirdFn } from './skins';

const SkinPreview = ({ draw }: { draw: DrawBirdFn }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, 80, 52);
    draw(ctx, 12, 14, true, false);
  }, [draw]);
  return <canvas ref={ref} width={80} height={52} style={{ imageRendering: 'pixelated' }} />;
};

// Glass-style icon button used in both desktop toolbar and mobile HUD
const IconBtn = ({ onClick, children, title, glass }: { onClick: () => void; children: React.ReactNode; title: string; glass?: boolean }) => (
  <button
    onClick={onClick} title={title}
    className={glass
      ? 'p-2 rounded-lg active:scale-90'
      : 'p-2 rounded-lg border border-gray-700 bg-gray-800/60 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors'
    }
    style={glass ? { background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', touchAction: 'none' } : undefined}
  >
    {children}
  </button>
);

const BirdShitApp = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const keysRef = useRef<Set<string>>(new Set());

  // Skin
  const [selectedSkinId, setSelectedSkinId] = useState<string>(() =>
    localStorage.getItem('birdshit-skin') ?? 'classic'
  );
  const selectedSkin = getSkinById(selectedSkinId);
  const selectedSkinRef = useRef<DrawBirdFn>(selectedSkin.draw);
  selectedSkinRef.current = selectedSkin.draw;

  // Late-bound callback refs
  const startGameRef = useRef<() => void>(() => {});
  const dropPoopRef = useRef<() => void>(() => {});
  const buyUpgradeRef = useRef<(index: number) => void>(() => {});
  const submitScoreRef = useRef<(score: number) => void>(() => {});

  // React-visible game state
  const [gameState, _setGameState] = useState<GameState>('idle');
  const gameStateRef = useRef<GameState>('idle');
  const setGameState = useCallback((s: GameState) => { gameStateRef.current = s; _setGameState(s); }, []);

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [coins, setCoins] = useState(0);
  const [level, setLevel] = useState(1);

  const [highScore, _setHighScore] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });
  const highScoreRef = useRef(highScore);
  const setHighScore = useCallback((s: number) => { highScoreRef.current = s; _setHighScore(s); }, []);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playerName, setPlayerName] = useState(() => localStorage.getItem('birdshit-player-name') || '');
  const playerNameRef = useRef(playerName);
  playerNameRef.current = playerName;

  // UI panels
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPreGame, setShowPreGame] = useState(false);
  const [meta, setMeta] = useState<MetaState>(() => loadMeta());
  const [soundMuted, setSoundMuted] = useState(false);
  const [sfxVol, setSfxVol] = useState(0.3);
  const [bgmVol, setBgmVol] = useState(0.15);
  const [devMode, setDevMode] = useState(false);
  const devModeRef = useRef(false);
  devModeRef.current = devMode;

  // Game loop hook
  const { gameRef, redrawUpgradeScreen, startGame, dropPoop, selectCard, selectRelic, continueFromUpgrade, startWithMode } =
    useGameLoop({
      canvasRef, keysRef, selectedSkinRef, startGameRef, dropPoopRef, buyUpgradeRef, submitScoreRef,
      setGameState, setScore, setLives, setCoins, setLevel, setHighScore, highScoreRef, playerNameRef,
      devModeRef,
    });

  // Controls hook
  const {
    joystickBaseRef, joystickThumbRef,
    handleJoystickZoneStart, handleJoystickZoneMove, handleJoystickZoneEnd,
    isMobile, isPortrait, portraitDismissed, setPortraitDismissed,
    toggleFullscreen, pseudoFullscreen, JOYSTICK_SIZE, THUMB_SIZE,
  } = useControls({
    keysRef, gameStateRef, startGameRef, dropPoopRef, buyUpgradeRef, containerRef, setIsFullscreen,
  });

  const handleCardSelect = useCallback((index: number) => { selectCard(index); continueFromUpgrade(); }, [selectCard, continueFromUpgrade]);

  const handleCanvasInteraction = useCallback((_cx: number, _cy: number) => {
    if (gameState === 'upgrading' || gameState === 'relic_select') return;
    if (gameState === 'playing') dropPoop();
    else startGame();
  }, [gameState, dropPoop, startGame]);

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => { handleCanvasInteraction(e.clientX, e.clientY); }, [handleCanvasInteraction]);
  const handleCanvasTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    if (gameState === 'playing') return;
    e.preventDefault();
    handleCanvasInteraction(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  }, [gameState, handleCanvasInteraction]);

  // Earn meta currency on game over
  useEffect(() => {
    if (gameState === 'over' && score > 0) {
      setMeta((prev) => { const updated = earnMetaCurrency(score, prev); saveMeta(updated); return updated; });
    }
  }, [gameState, score]);

  // Draw idle / game-over screens
  useEffect(() => {
    if (gameState === 'playing') return;
    if (gameState === 'upgrading') { redrawUpgradeScreen(); return; }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const skyGrad = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
    skyGrad.addColorStop(0, '#0a0a0a');
    skyGrad.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, CANVAS_W, GROUND_Y);
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, GROUND_Y, CANVAS_W, CANVAS_H - GROUND_Y);
    ctx.strokeStyle = '#44D62C';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, GROUND_Y); ctx.lineTo(CANVAS_W, GROUND_Y); ctx.stroke();

    selectedSkin.draw(ctx, CANVAS_W / 2 - BIRD_W / 2, 140, true, false);
    ctx.textAlign = 'center';

    if (gameState === 'over') {
      ctx.fillStyle = '#ef4444'; ctx.font = 'bold 36px Inter, sans-serif';
      ctx.fillText('GAME OVER', CANVAS_W / 2, 100);
      ctx.fillStyle = '#44D62C'; ctx.font = 'bold 24px "JetBrains Mono", monospace';
      ctx.fillText(`Score: ${score}`, CANVAS_W / 2, 210);
      ctx.fillStyle = '#fbbf24'; ctx.font = '16px "JetBrains Mono", monospace';
      ctx.fillText(`Level ${level}`, CANVAS_W / 2, 235);
      if (score >= highScore && score > 0) {
        ctx.fillStyle = '#fbbf24'; ctx.font = '16px Inter, sans-serif';
        ctx.fillText('New High Score!', CANVAS_W / 2, 260);
      }
    } else {
      ctx.fillStyle = '#44D62C'; ctx.font = 'bold 28px Inter, sans-serif';
      ctx.fillText('Bird Shit Simulator', CANVAS_W / 2, 100);
    }
    ctx.fillStyle = '#6b7280'; ctx.font = '16px Inter, sans-serif';
    ctx.fillText('Press SPACE to start', CANVAS_W / 2, 290);
    ctx.font = '13px Inter, sans-serif';
    ctx.fillText('WASD / Arrows = Move  |  SPACE = Poop', CANVAS_W / 2, 320);
  }, [gameState, score, highScore, level, redrawUpgradeScreen, selectedSkin]);

  const mobilePlay = isMobile && gameState !== 'idle';
  const isIdle = gameState === 'idle';
  const isOver = gameState === 'over';
  const isPlaying = gameState === 'playing';
  const canStart = isIdle || isOver;
  const toggleMute = useCallback(() => { const m = !soundMuted; setSoundMuted(m); birdShitSound.setMuted(m); }, [soundMuted]);

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto space-y-4">
      {/* Portrait orientation overlay */}
      {mobilePlay && isPortrait && !portraitDismissed && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4" style={{ background: 'rgba(10,10,14,0.92)' }}>
          <div className="text-6xl" style={{ animation: 'bss-rotate 2s ease-in-out infinite' }}>📱</div>
          <p className="text-lg font-bold text-white">Rotate your device</p>
          <p className="text-sm text-gray-400 text-center px-8">Best in landscape mode</p>
          <button onClick={() => setPortraitDismissed(true)} className="mt-2 px-5 py-2 text-sm text-gray-300 border border-gray-600 rounded-lg active:bg-gray-800">Continue anyway</button>
          <style>{`@keyframes bss-rotate { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(90deg); } }`}</style>
        </div>
      )}

      {/* ── Header (desktop only, non-playing) ── */}
      {!mobilePlay && (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-802/10 rounded-lg"><Bird className="w-6 h-6 text-802" /></div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">Bird Shit Simulator</h1>
            <p className="text-sm text-gray-400">Fly freely, poop on pedestrians, dodge the hunters!</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">High Score</p>
            <p className="text-lg font-mono font-bold text-802">{highScore}</p>
          </div>
        </div>
      )}

      {/* ── Game area ── */}
      <div
        className={mobilePlay ? 'relative w-full h-full' : 'card p-4 flex flex-col items-center relative'}
        style={pseudoFullscreen ? { position: 'fixed', inset: 0, zIndex: 9999, background: '#000' } : undefined}
      >
        <canvas
          ref={canvasRef} width={CANVAS_W} height={CANVAS_H}
          className={mobilePlay ? '' : 'rounded-lg border border-gray-800 w-full'}
          style={mobilePlay
            ? { width: '100dvw', height: '100dvh', objectFit: 'contain', background: '#000', imageRendering: 'pixelated', touchAction: 'none', userSelect: 'none', WebkitTouchCallout: 'none' } as React.CSSProperties
            : { maxWidth: CANVAS_W, imageRendering: 'pixelated', touchAction: 'none', userSelect: 'none', WebkitTouchCallout: 'none' } as React.CSSProperties}
          onClick={handleCanvasClick} onTouchStart={handleCanvasTouchStart} onContextMenu={(e) => e.preventDefault()}
        />

        {/* ── Mobile HUD: top-right icons (ALWAYS visible during mobile play) ── */}
        {mobilePlay && (
          <div className="absolute top-2 right-2 z-10 flex gap-1.5">
            <IconBtn glass onClick={toggleMute} title="Sound">
              {soundMuted ? <VolumeX className="w-4 h-4 text-white/70" /> : <Volume2 className="w-4 h-4 text-white/70" />}
            </IconBtn>
            <IconBtn glass onClick={() => setShowLeaderboard(true)} title="Leaderboard">
              <Trophy className="w-4 h-4 text-white/70" />
            </IconBtn>
            <IconBtn glass onClick={() => setShowSettings(true)} title="Settings">
              <Settings className="w-4 h-4 text-white/70" />
            </IconBtn>
            <IconBtn glass onClick={toggleFullscreen} title="Fullscreen">
              {isFullscreen ? <Minimize className="w-4 h-4 text-white/70" /> : <Maximize className="w-4 h-4 text-white/70" />}
            </IconBtn>
          </div>
        )}

        {/* Mobile joystick + poop button */}
        {isPlaying && mobilePlay && (
          <>
            <div className="absolute top-0 left-0"
              style={{ width: '50%', height: '100%', touchAction: 'none', userSelect: 'none', WebkitTouchCallout: 'none' } as React.CSSProperties}
              onTouchStart={handleJoystickZoneStart} onTouchMove={handleJoystickZoneMove}
              onTouchEnd={handleJoystickZoneEnd} onTouchCancel={handleJoystickZoneEnd} onContextMenu={(e) => e.preventDefault()} />
            <div ref={joystickBaseRef} className="fixed pointer-events-none flex items-center justify-center"
              style={{ width: JOYSTICK_SIZE, height: JOYSTICK_SIZE, borderRadius: '50%', background: 'radial-gradient(circle, rgba(68,214,44,0.12) 0%, rgba(68,214,44,0.04) 70%, transparent 100%)', border: '2px solid rgba(68,214,44,0.3)', opacity: 0, transition: 'opacity 0.1s' }}>
              <div className="absolute inset-0 flex items-center justify-center"><div style={{ width: '40%', height: 1, background: 'rgba(68,214,44,0.15)' }} /></div>
              <div className="absolute inset-0 flex items-center justify-center"><div style={{ width: 1, height: '40%', background: 'rgba(68,214,44,0.15)' }} /></div>
              <div ref={joystickThumbRef} style={{ width: THUMB_SIZE, height: THUMB_SIZE, borderRadius: '50%', background: 'radial-gradient(circle at 40% 38%, rgba(68,214,44,0.6), rgba(68,214,44,0.25))', border: '2px solid rgba(68,214,44,0.7)', boxShadow: '0 0 12px rgba(68,214,44,0.2)' }} />
            </div>
            <div onTouchStart={(e) => { e.preventDefault(); dropPoop(); }} onContextMenu={(e) => e.preventDefault()}
              className="absolute flex items-center justify-center active:scale-90"
              style={{ right: '5dvw', bottom: '5dvh', width: '20dvh', height: '20dvh', maxWidth: 100, maxHeight: 100, borderRadius: '50%', background: 'radial-gradient(circle at 40% 38%, rgba(133,77,14,0.85), rgba(107,58,10,0.85))', border: '3px solid rgba(161,98,7,0.7)', boxShadow: '0 0 20px rgba(133,77,14,0.3), inset 0 -3px 6px rgba(0,0,0,0.3)', touchAction: 'none', userSelect: 'none', WebkitTouchCallout: 'none' } as React.CSSProperties}>
              <span className="text-3xl select-none" style={{ lineHeight: 1 }}>💩</span>
            </div>
          </>
        )}

        {/* Overlays */}
        {gameState === 'relic_select' && <RelicSelectionOverlay relics={gameRef.current.offeredRelics} onSelect={selectRelic} />}
        {gameState === 'upgrading' && <CardSelectionOverlay cards={gameRef.current.offeredCards} level={level} onSelect={handleCardSelect} />}

        {/* Mobile start/restart buttons */}
        {mobilePlay && canStart && (
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 pointer-events-none gap-3">
            <button onClick={startGame} className="btn-primary flex items-center gap-2 px-6 py-3 text-lg pointer-events-auto">
              <Play className="w-5 h-5" /> {isOver ? 'Play Again' : 'Start Game'}
            </button>
            <button onClick={() => startWithMode('daily')}
              className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 active:bg-purple-700 text-white text-sm font-medium rounded pointer-events-auto">
              📅 Daily Challenge
            </button>
          </div>
        )}

        {/* ── Desktop toolbar (ALWAYS visible when not mobile-play) ── */}
        {!mobilePlay && (
          <div className="flex items-center justify-between w-full mt-3" style={{ maxWidth: CANVAS_W }}>
            {/* Left: action buttons / stats */}
            <div className="flex items-center gap-3">
              {canStart && (
                <>
                  <button onClick={startGame} className="btn-primary flex items-center gap-2 px-5 py-2">
                    <Play className="w-4 h-4" /> {isOver ? 'Play Again' : 'Start Game'}
                  </button>
                  <button onClick={() => startWithMode('daily')} title="Same seed for all players today — compete for the best score!"
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded transition-colors">
                    📅 Daily
                  </button>
                </>
              )}
              {isPlaying && (
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-500 font-mono">Score: <span className="text-802 font-bold">{score}</span></p>
                  <p className="text-sm text-gray-500 font-mono">Lv.<span className="text-yellow-400 font-bold">{level}</span></p>
                  <p className="text-sm text-gray-500 font-mono"><span className="text-red-400 font-bold">{lives}</span> HP</p>
                  <p className="text-sm text-gray-500 font-mono"><span className="text-yellow-400 font-bold">{coins}</span> 🪙</p>
                  {devMode && <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">DEV</span>}
                </div>
              )}
            </div>

            {/* Right: toolbar icons — ALWAYS visible */}
            <div className="flex items-center gap-2">
              <IconBtn onClick={toggleMute} title="Toggle sound">
                {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </IconBtn>
              <IconBtn onClick={() => setShowLeaderboard(true)} title="Leaderboard">
                <Trophy className="w-4 h-4" />
              </IconBtn>
              {canStart && (
                <IconBtn onClick={() => setShowPreGame(true)} title="Bird skins & upgrades">
                  <Bird className="w-4 h-4" />
                </IconBtn>
              )}
              <IconBtn onClick={() => setShowSettings(true)} title="Settings">
                <Settings className="w-4 h-4" />
              </IconBtn>
            </div>
          </div>
        )}
      </div>

      {/* ── Leaderboard Modal ── */}
      {showLeaderboard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowLeaderboard(false)}>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowLeaderboard(false)} className="absolute -top-12 right-0 p-2 text-gray-400 hover:text-white rounded-lg transition-colors"><X className="w-6 h-6" /></button>
            <GameLeaderboard game="bird-shit" title="Bird Shit - High Scores" />
          </div>
        </div>
      )}

      {/* ── Settings Modal (always accessible — sound, name, controls) ── */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowSettings(false)}>
          <div className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-xl border border-gray-700 bg-gray-900 p-5 space-y-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2"><Settings className="w-5 h-5 text-802" /> Settings</h2>
              <button onClick={() => setShowSettings(false)} className="p-1.5 text-gray-400 hover:text-white rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>

            {/* Player Name */}
            <div>
              <label className="text-xs text-gray-400 block mb-1">Player Name</label>
              <div className="flex gap-2">
                <input type="text" value={playerName}
                  onChange={(e) => { const n = e.target.value.slice(0, 50); setPlayerName(n); localStorage.setItem('birdshit-player-name', n); }}
                  onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}
                  placeholder="Enter your name..." maxLength={50}
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-802 focus:ring-1 focus:ring-802" />
                {playerName && <button onClick={() => { setPlayerName(''); localStorage.removeItem('birdshit-player-name'); }} className="p-2 text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>}
              </div>
              <p className="text-xs text-gray-500 mt-1">Used for leaderboard</p>
            </div>

            {/* Sound */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <button onClick={toggleMute} className="p-1 rounded hover:bg-gray-800 transition-colors">
                  {soundMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-802" />}
                </button>
                <span className="text-sm text-white font-medium">Sound</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-400">SFX
                  <input type="range" min="0" max="100" value={Math.round(sfxVol * 100)}
                    onChange={(e) => { const v = Number(e.target.value) / 100; setSfxVol(v); birdShitSound.setSFXVolume(v); }} className="flex-1 accent-802" />
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-400">Music
                  <input type="range" min="0" max="100" value={Math.round(bgmVol * 100)}
                    onChange={(e) => { const v = Number(e.target.value) / 100; setBgmVol(v); birdShitSound.setBGMVolume(v); }} className="flex-1 accent-802" />
                </label>
              </div>
            </div>

            {/* Controls */}
            <div>
              <p className="text-xs text-gray-500 font-medium mb-2">Controls</p>
              <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                <span><kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-802 font-mono">WASD</kbd> Move</span>
                <span><kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-802 font-mono">SPACE</kbd> Poop</span>
                <span><span className="text-802 font-bold">+10</span> Ped</span>
                <span><span className="text-802 font-bold">+25</span> Hunter</span>
              </div>
            </div>

            {/* Daily Challenge explanation */}
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">📅 Daily Challenge</p>
              <p className="text-xs text-gray-400">Same seed for all players today. Enemy spawns and card offerings are identical — compete for the best score on a level playing field!</p>
            </div>

            {/* Dev Mode — localhost only */}
            {window.location.hostname === 'localhost' && <div className="border-t border-gray-700 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono font-bold text-orange-400">DEV MODE</p>
                  <p className="text-xs text-gray-500 mt-0.5">Invincibility · All upgrade cards</p>
                </div>
                <button
                  onClick={() => setDevMode((v) => !v)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${devMode ? 'bg-orange-500' : 'bg-gray-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${devMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>}
          </div>
        </div>
      )}

      {/* ── Pre-Game Modal (skins + meta upgrades — only when not playing) ── */}
      {showPreGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowPreGame(false)}>
          <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl border border-gray-700 bg-gray-900 p-5 space-y-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2"><Bird className="w-5 h-5 text-802" /> Loadout</h2>
              <button onClick={() => setShowPreGame(false)} className="p-1.5 text-gray-400 hover:text-white rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>

            {/* Bird Skin */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Bird className="w-4 h-4 text-802" />
                <span className="text-sm text-white font-medium">Bird Skin</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {BIRD_SKINS.map((skin) => {
                  const locked = highScore < skin.unlockScore;
                  const active = selectedSkinId === skin.id;
                  return (
                    <button key={skin.id} disabled={locked}
                      onClick={() => { if (!locked) { setSelectedSkinId(skin.id); localStorage.setItem('birdshit-skin', skin.id); } }}
                      className={['relative flex flex-col items-center gap-1 p-2 rounded-lg border transition-all',
                        active ? 'border-802 bg-802/10' : locked ? 'border-gray-800 bg-gray-900/40 opacity-50 cursor-not-allowed' : 'border-gray-700 bg-gray-800/40 hover:border-gray-500',
                      ].join(' ')}
                      title={locked ? `Unlock at ${skin.unlockScore} pts` : skin.name}>
                      <SkinPreview draw={skin.draw} />
                      <span className={`text-xs font-medium leading-none ${active ? 'text-802' : 'text-gray-400'}`}>{skin.name}</span>
                      {locked && <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black/40"><Lock className="w-4 h-4 text-gray-400" /><span className="text-gray-400 text-xs mt-0.5">{skin.unlockScore}</span></div>}
                      {active && !locked && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-802" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Meta Upgrades */}
            <MetaUpgradePanel meta={meta} onUpdate={(m) => { setMeta(m); saveMeta(m); }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BirdShitApp;
