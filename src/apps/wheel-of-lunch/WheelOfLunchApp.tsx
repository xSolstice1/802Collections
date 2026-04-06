import { useState, useRef, useCallback, useEffect } from 'react';
import { Plus, Trash2, RotateCcw, Utensils, Volume2, VolumeX } from 'lucide-react';

interface WheelOption {
  id: string;
  name: string;
  weight: number;
  color: string;
}

const COLORS = [
  '#44D62C', '#37ad24', '#6ae04a', '#2d8f17', '#55c435',
  '#1e6b0f', '#78e85e', '#0f5507', '#8af072', '#0a3d05'
];

const STORAGE_KEY = 'wheel-of-lunch-options';

const defaultOptions: WheelOption[] = [
  { id: '1', name: 'Timbre+', weight: 1, color: COLORS[0] },
  { id: '2', name: 'Koufu', weight: 1, color: COLORS[1] },
  { id: '3', name: 'Tea Party', weight: 1, color: COLORS[2] },
  { id: '4', name: 'McDonalds', weight: 1, color: COLORS[3] },
  { id: '5', name: 'Le Shrimp', weight: 1, color: COLORS[4] }
];

/**
 * Wheel of Lunch App
 * 
 * A spinning wheel to help decide where to eat or what to choose.
 * Users can add/remove options and set weightage for each.
 */
const WheelOfLunchApp = () => {
  // Load options from localStorage or use defaults
  const loadOptions = (): WheelOption[] => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore errors
    }
    return defaultOptions;
  };

  const [options, setOptions] = useState<WheelOption[]>(loadOptions);
  const [newOption, setNewOption] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const lastClickSliceRef = useRef<number>(-1);

  // Save options to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(options));
  }, [options]);

  // Calculate total weight
  const totalWeight = options.reduce((sum, opt) => sum + opt.weight, 0);

  // Draw the wheel with weighted slices
  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 400;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 10;

    canvas.width = size;
    canvas.height = size;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    if (options.length === 0 || totalWeight === 0) {
      ctx.fillStyle = '#111';
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#666';
      ctx.font = '16px Inter';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Add options to spin', centerX, centerY);
      return;
    }

    // Calculate weighted slices
    let currentAngle = -Math.PI / 2; // Start from top
    const twoPI = 2 * Math.PI;

    // Draw outer ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 5, 0, Math.PI * 2);
    ctx.strokeStyle = '#44D62C';
    ctx.lineWidth = 4;
    ctx.stroke();

    options.forEach((option) => {
      const sliceAngle = (option.weight / totalWeight) * twoPI;
      const endAngle = currentAngle + sliceAngle;
      const midAngle = currentAngle + sliceAngle / 2;

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, endAngle);
      ctx.closePath();
      
      // Fill with color
      ctx.fillStyle = option.color;
      ctx.fill();
      
      // Draw border
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Only draw text if slice is big enough
      if (sliceAngle > 0.2) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(midAngle);
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000';
        ctx.font = `bold ${Math.min(14, 10 + sliceAngle * 5)}px Inter`;
        
        // Truncate text if too long
        const maxWidth = radius - 40;
        let displayName = option.name;
        if (ctx.measureText(displayName).width > maxWidth) {
          while (ctx.measureText(displayName + '...').width > maxWidth && displayName.length > 0) {
            displayName = displayName.slice(0, -1);
          }
          displayName += '...';
        }
        
        ctx.fillText(displayName, radius - 15, 0);
        ctx.restore();
      }

      currentAngle = endAngle;
    });

    // Draw center circle with glow effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.strokeStyle = '#44D62C';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw center icon (fork and knife)
    ctx.fillStyle = '#44D62C';
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🍽️', centerX, centerY);
  }, [options, totalWeight]);

  // Redraw wheel when options change
  useEffect(() => {
    drawWheel();
  }, [options, drawWheel]);

  // Play click sound for wheel
  const playClickSound = useCallback(() => {
    if (muted) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'square';
      gainNode.gain.value = 0.05;
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio not supported
    }
  }, [muted]);

  // Play celebration sound
  const playCelebrationSound = useCallback(() => {
    if (muted) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      const ctx = audioContextRef.current;
      
      // Play a short fanfare
      const notes = [523, 659, 784]; // C5, E5, G5
      notes.forEach((freq, i) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.2;
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.3);

        oscillator.start(ctx.currentTime + i * 0.15);
        oscillator.stop(ctx.currentTime + i * 0.15 + 0.3);
      });
    } catch {
      // Audio not supported
    }
  }, [muted]);

  // Spin the wheel
  const spin = useCallback(() => {
    if (spinning || options.length === 0 || totalWeight === 0) return;

    setSpinning(true);
    setWinner(null);
    lastClickSliceRef.current = -1;

    // Random rotation between 5-10 full spins + random position
    const spins = 5 + Math.random() * 5;
    const randomOffset = Math.random() * totalWeight;
    const totalRotation = spins * 360 + (randomOffset / totalWeight) * 360;
    const newRotation = rotation + totalRotation;

    setRotation(newRotation);

    // Play click sounds during spin
    const clickInterval = setInterval(() => {
      if (!spinning) {
        clearInterval(clickInterval);
        return;
      }
      playClickSound();
    }, 150);

    // Calculate winner after animation
    setTimeout(() => {
      clearInterval(clickInterval);
      
      // Normalize rotation to 0-360
      const normalizedRotation = newRotation % 360;
      
      // The wheel starts drawing at -90° (top), and pointer is at top pointing down.
      // After rotation, the angle at the pointer (top) is: (360 - normalizedRotation) % 360
      // But since the wheel starts at -90° (270°), we need to account for that offset.
      // The pointer is at angle 270° (top) in standard position.
      // Effective angle on the wheel = (270 - normalizedRotation + 360) % 360
      // But since slices are drawn clockwise from -90°, the angle within the wheel is:
      const effectiveAngle = (360 - normalizedRotation) % 360;
      const pointerFraction = effectiveAngle / 360;
      const targetWeight = pointerFraction * totalWeight;
      
      // Find which option this weight falls into
      let cumulativeWeight = 0;
      let winnerOption = options[0];
      
      for (const option of options) {
        cumulativeWeight += option.weight;
        if (cumulativeWeight > targetWeight) {
          winnerOption = option;
          break;
        }
      }
      
      setWinner(winnerOption.name);
      setSpinning(false);

      // Play celebration sound, then announce winner
      playCelebrationSound();
      if (!muted && 'speechSynthesis' in window) {
        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(`Today we eat ${winnerOption.name}`);
          utterance.rate = 1;
          utterance.pitch = 1.1;
          window.speechSynthesis.speak(utterance);
        }, 600);
      }
    }, 4000);
  }, [spinning, options, rotation, totalWeight, muted, playCelebrationSound, playClickSound]);

  // Add new option
  const addOption = () => {
    if (!newOption.trim()) return;

    const newOpt: WheelOption = {
      id: Date.now().toString(),
      name: newOption.trim(),
      weight: 1,
      color: COLORS[options.length % COLORS.length],
    };

    setOptions([...options, newOpt]);
    setNewOption('');
  };

  // Remove option
  const removeOption = (id: string) => {
    if (options.length <= 1) return;
    setOptions(options.filter(opt => opt.id !== id));
  };

  // Update weight
  const updateWeight = (id: string, delta: number) => {
    setOptions(options.map(opt => {
      if (opt.id === id) {
        return { ...opt, weight: Math.max(1, opt.weight + delta) };
      }
      return opt;
    }));
  };

  // Update color
  const updateColor = (id: string, color: string) => {
    setOptions(options.map(opt => {
      if (opt.id === id) {
        return { ...opt, color };
      }
      return opt;
    }));
  };

  // Reset wheel
  const reset = () => {
    setRotation(0);
    setWinner(null);
    setSpinning(false);
  };

  // Clear all and reset to defaults
  const clearAll = () => {
    if (confirm('Reset to default options?')) {
      setOptions(defaultOptions);
      reset();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-802/10 flex items-center justify-center">
            <Utensils className="w-5 h-5 text-802" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-black-100">Wheel of Lunch</h2>
            <p className="text-sm text-black-400">Can't decide? Let the wheel choose!</p>
          </div>
        </div>
        <button onClick={clearAll} className="btn-ghost text-sm">
          Reset Defaults
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Wheel Section */}
        <div className="card flex flex-col items-center">
          <div className="relative">
            {/* Pointer - pointing inward (down) from top */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-10" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
              {/* Triangle pointing DOWN into the wheel */}
              <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                <path d="M12 28 L2 4 L22 4 Z" fill="#44D62C" stroke="#44D62C" strokeWidth="1"/>
              </svg>
            </div>

            {/* Wheel Canvas */}
            <div 
              className="relative"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
              }}
            >
              <canvas ref={canvasRef} className="w-64 h-64 md:w-80 md:h-80" />
            </div>
          </div>

          {/* Winner Display */}
          {winner && !spinning && (
            <div className="mt-6 text-center animate-fade-in">
              <p className="text-black-400 text-sm mb-1">The wheel has spoken!</p>
              <p className="text-3xl font-bold text-802 text-glow">{winner}</p>
            </div>
          )}

          {/* Spin Button */}
          <button
            onClick={spin}
            disabled={spinning || options.length === 0}
            className="mt-6 btn-primary px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {spinning ? 'Spinning...' : '🎰 SPIN!'}
          </button>

          {/* Controls */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={reset}
              className="btn-ghost flex items-center gap-1"
              disabled={spinning}
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={() => setMuted(!muted)}
              className="btn-ghost flex items-center gap-1"
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              {muted ? 'Unmute' : 'Mute'}
            </button>
          </div>

          {/* Weight indicator */}
          <div className="mt-4 text-xs text-black-500">
            Total weight: {totalWeight}
          </div>
        </div>

        {/* Options Section */}
        <div className="card">
          <h3 className="text-lg font-semibold text-black-100 mb-4">Options ({options.length})</h3>

          {/* Add Option */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addOption()}
              placeholder="Add option..."
              maxLength={20}
              className="input flex-1"
            />
            <button
              onClick={addOption}
              disabled={!newOption.trim()}
              className="btn-primary flex items-center gap-1 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          {/* Options List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-black-800/50 border border-black-700"
              >
                {/* Color Picker */}
                <div className="relative flex-shrink-0">
                  <input
                    type="color"
                    value={option.color}
                    onChange={(e) => updateColor(option.id, e.target.value)}
                    className="w-7 h-7 rounded cursor-pointer border-0 p-0"
                    style={{ backgroundColor: option.color }}
                  />
                  <div
                    className="absolute inset-0 w-7 h-7 rounded pointer-events-none border border-black-500"
                    style={{ backgroundColor: option.color }}
                  />
                </div>

                <span className="flex-1 text-black-100 truncate font-medium">{option.name}</span>
                
                {/* Weight Controls */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-black-400 w-12 text-center font-medium">
                    ×{option.weight}
                  </span>
                  <button
                    onClick={() => updateWeight(option.id, -1)}
                    disabled={option.weight <= 1}
                    className="w-6 h-6 flex items-center justify-center rounded bg-black-700 text-black-200 hover:text-802 disabled:opacity-30"
                  >
                    −
                  </button>
                  <button
                    onClick={() => updateWeight(option.id, 1)}
                    disabled={option.weight >= 5}
                    className="w-6 h-6 flex items-center justify-center rounded bg-black-700 text-black-200 hover:text-802 disabled:opacity-30"
                  >
                    +
                  </button>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => removeOption(option.id)}
                  disabled={options.length <= 1}
                  className="w-8 h-8 flex items-center justify-center rounded text-black-400 hover:text-red-400 hover:bg-red-500/10 disabled:opacity-30"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Info */}
          <div className="mt-4 p-3 rounded-lg bg-black-800/50 border border-black-700">
            <p className="text-xs text-black-400">
              <span className="font-bold text-black-200">Tip:</span> Higher weight = bigger slice = more likely to win! Your options are saved automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WheelOfLunchApp;