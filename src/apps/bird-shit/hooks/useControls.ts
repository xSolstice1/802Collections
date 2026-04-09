import { useRef, useCallback, useEffect, useState } from 'react';
import type { GameState } from '../types';

const JOYSTICK_SIZE = 120;
const THUMB_SIZE = 50;
const MAX_DIST = (JOYSTICK_SIZE - THUMB_SIZE) / 2;
const DEAD_ZONE = 0.3;

interface UseControlsParams {
  keysRef: React.MutableRefObject<Set<string>>;
  gameStateRef: React.MutableRefObject<GameState>;
  startGameRef: React.MutableRefObject<() => void>;
  dropPoopRef: React.MutableRefObject<() => void>;
  buyUpgradeRef: React.MutableRefObject<(index: number) => void>;
  containerRef: React.RefObject<HTMLDivElement>;
  setIsFullscreen: (b: boolean) => void;
}

export function useControls({
  keysRef,
  gameStateRef,
  startGameRef,
  dropPoopRef,
  buyUpgradeRef,
  containerRef,
  setIsFullscreen,
}: UseControlsParams) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [portraitDismissed, setPortraitDismissed] = useState(false);

  const joystickBaseRef = useRef<HTMLDivElement>(null);
  const joystickThumbRef = useRef<HTMLDivElement>(null);
  const joystickTouchId = useRef<number | null>(null);
  const joystickOrigin = useRef<{ x: number; y: number } | null>(null);

  const updateJoystickFromOrigin = useCallback((clientX: number, clientY: number) => {
    const origin = joystickOrigin.current;
    if (!origin) return;

    let dx = clientX - origin.x;
    let dy = clientY - origin.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > MAX_DIST) {
      dx = (dx / dist) * MAX_DIST;
      dy = (dy / dist) * MAX_DIST;
    }

    if (joystickThumbRef.current) {
      joystickThumbRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
    }

    const threshold = MAX_DIST * DEAD_ZONE;
    const keys = keysRef.current;
    if (dx < -threshold) keys.add('ArrowLeft');
    else keys.delete('ArrowLeft');
    if (dx > threshold) keys.add('ArrowRight');
    else keys.delete('ArrowRight');
    if (dy < -threshold) keys.add('ArrowUp');
    else keys.delete('ArrowUp');
    if (dy > threshold) keys.add('ArrowDown');
    else keys.delete('ArrowDown');
  }, [keysRef]);

  const handleJoystickZoneStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (joystickTouchId.current !== null) return;
    const touch = e.changedTouches[0];
    joystickTouchId.current = touch.identifier;
    joystickOrigin.current = { x: touch.clientX, y: touch.clientY };
    if (joystickBaseRef.current) {
      joystickBaseRef.current.style.left = `${touch.clientX - JOYSTICK_SIZE / 2}px`;
      joystickBaseRef.current.style.top = `${touch.clientY - JOYSTICK_SIZE / 2}px`;
      joystickBaseRef.current.style.opacity = '1';
    }
    if (joystickThumbRef.current) {
      joystickThumbRef.current.style.transform = 'translate(0px, 0px)';
    }
  }, []);

  const handleJoystickZoneMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (joystickTouchId.current === null) return;
    for (let i = 0; i < e.touches.length; i++) {
      if (e.touches[i].identifier === joystickTouchId.current) {
        updateJoystickFromOrigin(e.touches[i].clientX, e.touches[i].clientY);
        return;
      }
    }
  }, [updateJoystickFromOrigin]);

  const handleJoystickZoneEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === joystickTouchId.current) {
        joystickTouchId.current = null;
        joystickOrigin.current = null;
        if (joystickBaseRef.current) joystickBaseRef.current.style.opacity = '0';
        if (joystickThumbRef.current) joystickThumbRef.current.style.transform = 'translate(0px, 0px)';
        keysRef.current.delete('ArrowLeft');
        keysRef.current.delete('ArrowRight');
        keysRef.current.delete('ArrowUp');
        keysRef.current.delete('ArrowDown');
        return;
      }
    }
  }, [keysRef]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        const el = containerRef.current ?? document.documentElement;
        await el.requestFullscreen();
      }
    } catch {
      // fullscreen may not be available
    }
  }, [containerRef]);

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
        e.preventDefault();
      }
      const state = gameStateRef.current;
      if (state === 'upgrading') {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= 6) buyUpgradeRef.current(num - 1);
        return;
      }
      if (state !== 'playing') {
        if (e.code === 'Space' || e.code === 'Enter') startGameRef.current();
        return;
      }
      keysRef.current.add(e.code);
      if (e.code === 'Space') dropPoopRef.current();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.code);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameStateRef, keysRef, startGameRef, dropPoopRef, buyUpgradeRef]);

  // Detect mobile + portrait orientation
  useEffect(() => {
    const checkMobileAndOrientation = () => {
      const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 640;
      setIsMobile(mobile);
      if (mobile) {
        const portrait = window.innerHeight > window.innerWidth;
        setIsPortrait(portrait);
        if (!portrait) setPortraitDismissed(false);
      } else {
        setIsPortrait(false);
      }
    };
    checkMobileAndOrientation();
    window.addEventListener('resize', checkMobileAndOrientation);
    window.addEventListener('orientationchange', checkMobileAndOrientation);
    return () => {
      window.removeEventListener('resize', checkMobileAndOrientation);
      window.removeEventListener('orientationchange', checkMobileAndOrientation);
    };
  }, []);

  // Track fullscreen state
  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, [setIsFullscreen]);

  // Clear stuck controls when window loses focus or visibility changes
  useEffect(() => {
    const clearControls = () => {
      keysRef.current.clear();
      joystickTouchId.current = null;
      joystickOrigin.current = null;
      if (joystickBaseRef.current) joystickBaseRef.current.style.opacity = '0';
      if (joystickThumbRef.current) joystickThumbRef.current.style.transform = 'translate(0px, 0px)';
    };

    const handleGlobalTouchEnd = (e: TouchEvent) => {
      if (joystickTouchId.current === null) return;
      let found = false;
      for (let i = 0; i < e.touches.length; i++) {
        if (e.touches[i].identifier === joystickTouchId.current) {
          found = true;
          break;
        }
      }
      if (!found) clearControls();
    };

    window.addEventListener('blur', clearControls);
    document.addEventListener('visibilitychange', clearControls);
    window.addEventListener('touchend', handleGlobalTouchEnd);
    window.addEventListener('touchcancel', handleGlobalTouchEnd);
    return () => {
      window.removeEventListener('blur', clearControls);
      document.removeEventListener('visibilitychange', clearControls);
      window.removeEventListener('touchend', handleGlobalTouchEnd);
      window.removeEventListener('touchcancel', handleGlobalTouchEnd);
    };
  }, [keysRef]);

  return {
    joystickBaseRef,
    joystickThumbRef,
    handleJoystickZoneStart,
    handleJoystickZoneMove,
    handleJoystickZoneEnd,
    isMobile,
    isPortrait,
    portraitDismissed,
    setPortraitDismissed,
    toggleFullscreen,
    JOYSTICK_SIZE,
    THUMB_SIZE,
  };
}
