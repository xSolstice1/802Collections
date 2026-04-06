import { useState, useCallback, useRef, useEffect } from 'react';
import { Clock, Play, RotateCcw, Flame } from 'lucide-react';

const SLOT_DURATION = 3000;
const SLOT_INTERVAL = 50;

const WhenPanggangApp = () => {
  const [startTime, setStartTime] = useState('17:00');
  const [endTime, setEndTime] = useState('19:00');
  const [result, setResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayDigits, setDisplayDigits] = useState(['--', '--']);
  const [showFireworks, setShowFireworks] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPanggangText, setShowPanggangText] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const timeToMinutes = (time: string): number => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };

  const minutesToTime = (mins: number): string => {
    const h = Math.floor(mins / 60) % 24;
    const m = mins % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  const formatDisplayTime = (time: string): string => {
    const [h, m] = time.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 || 12;
    return `${displayH}:${m.toString().padStart(2, '0')} ${period}`;
  };

  const generateRandomTime = useCallback(() => {
    setError(null);
    const startMins = timeToMinutes(startTime);
    const endMins = timeToMinutes(endTime);

    if (startMins >= endMins) {
      setError('Start time must be before end time!');
      return;
    }

    setIsSpinning(true);
    setShowFireworks(false);
    setResult(null);

    const randomMins = startMins + Math.floor(Math.random() * (endMins - startMins + 1));
    const finalTime = minutesToTime(randomMins);
    const finalH = finalTime.split(':')[0];
    const finalM = finalTime.split(':')[1];

    let elapsed = 0;

    intervalRef.current = setInterval(() => {
      elapsed += SLOT_INTERVAL;
      const progress = elapsed / SLOT_DURATION;

      if (progress < 0.7) {
        // Both digits spinning fast
        const rH = Math.floor(Math.random() * 24).toString().padStart(2, '0');
        const rM = Math.floor(Math.random() * 60).toString().padStart(2, '0');
        setDisplayDigits([rH, rM]);
      } else if (progress < 0.9) {
        // Hour locked, minutes still spinning
        const rM = Math.floor(Math.random() * 60).toString().padStart(2, '0');
        setDisplayDigits([finalH, rM]);
      } else {
        // Both locked
        setDisplayDigits([finalH, finalM]);
        if (intervalRef.current) clearInterval(intervalRef.current);

        timeoutRef.current = setTimeout(() => {
          setIsSpinning(false);
          setResult(finalTime);
          setShowFireworks(true);
          setShowPanggangText(true);
        }, 200);
      }
    }, SLOT_INTERVAL);
  }, [startTime, endTime]);

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setResult(null);
    setIsSpinning(false);
    setDisplayDigits(['--', '--']);
    setShowFireworks(false);
    setShowPanggangText(false);
    setError(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-802/10 rounded-lg">
          <Flame className="w-6 h-6 text-802" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">When Panggang?</h1>
          <p className="text-sm text-gray-400">
            Find out when you can finally leave the office
          </p>
        </div>
      </div>

      {/* Time Range Input */}
      <div className="card p-6">
        <h2 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">
          Set Your Range
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Earliest</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="input w-full text-center text-lg"
              disabled={isSpinning}
            />
          </div>
          <span className="text-gray-500 mt-5 text-lg font-bold">to</span>
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Latest</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="input w-full text-center text-lg"
              disabled={isSpinning}
            />
          </div>
        </div>

        {error && (
          <div className="mt-3 px-3 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Display */}
      <div className="card p-8 relative overflow-hidden">
        {showFireworks && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-802"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `firework-particle ${0.8 + Math.random() * 1.2}s ease-out ${Math.random() * 0.5}s both`,
                }}
              />
            ))}
          </div>
        )}

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            {isSpinning ? 'Generating...' : result ? 'You panggang at:' : 'Ready to find out?'}
          </p>

          {/* Slot Machine Display */}
          <div className="flex items-center justify-center gap-2">
            <div
              className={`
                text-7xl font-mono font-bold tracking-wider px-4 py-2 rounded-xl
                transition-all duration-200
                ${isSpinning ? 'text-802/60 bg-802/5 scale-105' : ''}
                ${result ? 'text-802 text-glow' : 'text-gray-500'}
                ${!isSpinning && !result ? 'text-gray-600' : ''}
              `}
            >
              {displayDigits[0]}
            </div>
            <span
              className={`text-7xl font-mono font-bold ${
                isSpinning ? 'text-802/60 animate-pulse' : result ? 'text-802 text-glow' : 'text-gray-600'
              }`}
            >
              :
            </span>
            <div
              className={`
                text-7xl font-mono font-bold tracking-wider px-4 py-2 rounded-xl
                transition-all duration-200
                ${isSpinning ? 'text-802/60 bg-802/5 scale-105' : ''}
                ${result ? 'text-802 text-glow' : 'text-gray-500'}
                ${!isSpinning && !result ? 'text-gray-600' : ''}
              `}
            >
              {displayDigits[1]}
            </div>
          </div>

          {result && (
            <p className="mt-4 text-lg text-gray-300 animate-fadeIn">
              That's <span className="text-802 font-semibold">{formatDisplayTime(result)}</span>
            </p>
          )}

          {showPanggangText && (
            <div className="mt-6 panggang-banner">
              <span className="panggang-text text-4xl sm:text-5xl font-black tracking-tight">
                PANGGANG LO!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={generateRandomTime}
          disabled={isSpinning}
          className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 text-lg disabled:opacity-50"
        >
          {isSpinning ? (
            <Clock className="w-5 h-5 animate-spin" />
          ) : (
            <Play className="w-5 h-5" />
          )}
          {isSpinning ? 'Generating...' : result ? 'Try Again' : 'Generate!'}
        </button>

        {result && (
          <button
            onClick={handleReset}
            className="btn-secondary flex items-center justify-center gap-2 px-5 py-3"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        )}
      </div>

      {/* Fun Disclaimer */}
      <p className="text-center text-xs text-gray-600">
        Disclaimer: Not responsible for any consequences of leaving work at the generated time.
      </p>

      {/* Inline Styles for Firework Animation */}
      <style>{`
        @keyframes firework-particle {
          0% {
            transform: scale(0) translate(0, 0);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(3) translate(
              ${Math.random() > 0.5 ? '' : '-'}${20 + Math.random() * 40}px,
              ${Math.random() > 0.5 ? '' : '-'}${20 + Math.random() * 40}px
            );
            opacity: 0;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out both;
        }
        .panggang-banner {
          animation: panggangSlam 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .panggang-text {
          background: linear-gradient(135deg, #44D62C, #6ae04a, #fff, #6ae04a, #44D62C);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: panggangShimmer 2s ease-in-out infinite;
          filter: drop-shadow(0 0 20px rgba(68, 214, 44, 0.6)) drop-shadow(0 0 40px rgba(68, 214, 44, 0.3));
        }
        @keyframes panggangSlam {
          0% {
            transform: scale(3) rotate(-5deg);
            opacity: 0;
          }
          60% {
            transform: scale(0.9) rotate(1deg);
            opacity: 1;
          }
          80% {
            transform: scale(1.05) rotate(-0.5deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes panggangShimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default WhenPanggangApp;
