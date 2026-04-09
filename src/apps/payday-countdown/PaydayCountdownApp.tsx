import { useState, useEffect } from 'react';
import { DollarSign, CalendarDays, PartyPopper } from 'lucide-react';

/**
 * Get the actual payday for a given month/year.
 * Payday is the 27th, but if it falls on a weekend,
 * it moves to the preceding Friday.
 */
const getPayday = (year: number, month: number): Date => {
  const date = new Date(year, month, 27);
  const day = date.getDay();
  if (day === 6) date.setDate(26); // Saturday → Friday 26th
  if (day === 0) date.setDate(25); // Sunday → Friday 25th
  return date;
};

/**
 * Get the next upcoming payday from now.
 */
const getNextPayday = (now: Date): Date => {
  // Check this month's payday first
  let payday = getPayday(now.getFullYear(), now.getMonth());

  // If today's payday and still the same calendar day, return it
  // If payday already passed this month, get next month's
  if (now > payday) {
    const nextMonth = now.getMonth() + 1;
    payday = getPayday(
      nextMonth > 11 ? now.getFullYear() + 1 : now.getFullYear(),
      nextMonth > 11 ? 0 : nextMonth
    );
  }

  return payday;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const PaydayCountdownApp = () => {
  const [now, setNow] = useState(() => new Date());
  const [isPayday, setIsPayday] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const payday = getNextPayday(now);

  // Check if today IS payday
  const todayIsPayday =
    now.getFullYear() === payday.getFullYear() &&
    now.getMonth() === payday.getMonth() &&
    now.getDate() === payday.getDate();

  useEffect(() => {
    setIsPayday(todayIsPayday);
  }, [todayIsPayday]);

  // Calculate time remaining until end of payday (midnight) or until payday starts
  const diff = payday.getTime() - now.getTime();
  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Next 3 paydays for the schedule
  const upcomingPaydays: Date[] = [];
  let cursor = new Date(now);
  for (let i = 0; i < 3; i++) {
    const pd = getNextPayday(cursor);
    upcomingPaydays.push(pd);
    // Move cursor past this payday to find the next one
    cursor = new Date(pd);
    cursor.setDate(cursor.getDate() + 1);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-802/10 rounded-lg">
          <DollarSign className="w-6 h-6 text-802" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Payday Countdown</h1>
          <p className="text-sm text-gray-400">
            Counting down to the 27th (or nearest Friday)
          </p>
        </div>
      </div>

      {/* Main Countdown */}
      <div className="card p-8 relative overflow-hidden">
        {isPayday && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: ['#44D62C', '#fbbf24', '#60a5fa', '#f472b6'][i % 4],
                  animation: `confetti-fall ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
                }}
              />
            ))}
          </div>
        )}

        <div className="text-center">
          {isPayday ? (
            <>
              <PartyPopper className="w-12 h-12 text-802 mx-auto mb-4 animate-bounce" />
              <h2 className="payday-text text-4xl sm:text-5xl font-black mb-3">
                IT'S PAYDAY!
              </h2>
              <p className="text-gray-400 text-lg">
                Time to treat yourself
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-6 uppercase tracking-wider">
                Next payday in
              </p>

              {/* Countdown Digits */}
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-5xl sm:text-6xl font-mono font-bold text-802 text-glow tabular-nums">
                    {days.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs text-gray-500 mt-2 uppercase tracking-wider">Days</span>
                </div>
                <span className="text-4xl sm:text-5xl font-mono font-bold text-802/40 -mt-6">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-5xl sm:text-6xl font-mono font-bold text-802 text-glow tabular-nums">
                    {hours.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs text-gray-500 mt-2 uppercase tracking-wider">Hours</span>
                </div>
                <span className="text-4xl sm:text-5xl font-mono font-bold text-802/40 -mt-6">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-5xl sm:text-6xl font-mono font-bold text-802 text-glow tabular-nums">
                    {minutes.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs text-gray-500 mt-2 uppercase tracking-wider">Mins</span>
                </div>
                <span className="text-4xl sm:text-5xl font-mono font-bold text-802/40 -mt-6">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-5xl sm:text-6xl font-mono font-bold text-802 text-glow tabular-nums">
                    {seconds.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs text-gray-500 mt-2 uppercase tracking-wider">Secs</span>
                </div>
              </div>

              {/* Payday date */}
              <div className="mt-6 pt-4 border-t border-gray-800">
                <p className="text-gray-400">
                  <CalendarDays className="w-4 h-4 inline-block mr-1.5 -mt-0.5 text-802" />
                  {formatDate(payday)}
                </p>
                {payday.getDate() !== 27 && (
                  <p className="text-xs text-gray-600 mt-1">
                    27th falls on a weekend — adjusted to Friday
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {!isPayday && (
        <div className="card p-5">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>Last payday</span>
            <span>Next payday</span>
          </div>
          {(() => {
            // Calculate progress between last and next payday
            const prevCursor = new Date(payday);
            prevCursor.setDate(prevCursor.getDate() - 1);
            // Go back to find previous month's payday
            const prevPayday = getPayday(
              prevCursor.getMonth() === 0 ? prevCursor.getFullYear() - 1 : prevCursor.getFullYear(),
              prevCursor.getMonth() === 0 ? 11 : prevCursor.getMonth() - 1
            );
            const totalSpan = payday.getTime() - prevPayday.getTime();
            const elapsed = now.getTime() - prevPayday.getTime();
            const progress = Math.min(100, Math.max(0, (elapsed / totalSpan) * 100));

            return (
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #44D62C, #6ae04a)',
                    boxShadow: '0 0 12px rgba(68, 214, 44, 0.5)',
                  }}
                />
              </div>
            );
          })()}
        </div>
      )}

      {/* Upcoming Paydays */}
      <div className="card p-5">
        <h2 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">
          Upcoming Paydays
        </h2>
        <div className="space-y-3">
          {upcomingPaydays.map((pd, i) => (
            <div
              key={i}
              className={`flex items-center justify-between py-2 px-3 rounded-lg ${
                i === 0 ? 'bg-802/10 border border-802/20' : 'bg-gray-900/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <CalendarDays className={`w-4 h-4 ${i === 0 ? 'text-802' : 'text-gray-600'}`} />
                <span className={i === 0 ? 'text-white font-medium' : 'text-gray-400'}>
                  {formatDate(pd)}
                </span>
              </div>
              {pd.getDate() !== 27 && (
                <span className="text-xs text-gray-600 bg-gray-800 px-2 py-0.5 rounded">
                  Adjusted
                </span>
              )}
              {i === 0 && (
                <span className="text-xs text-802 font-medium">Next</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <p className="text-center text-xs text-gray-600">
        Based on your local time. Payday is the 27th, adjusted to Friday if it falls on a weekend.
      </p>

      {/* Animations */}
      <style>{`
        @keyframes confetti-fall {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 0.8;
          }
          25% {
            transform: translateY(-20px) rotate(90deg) scale(1.5);
            opacity: 1;
          }
          50% {
            transform: translateY(10px) rotate(180deg) scale(1);
            opacity: 0.6;
          }
          75% {
            transform: translateY(-10px) rotate(270deg) scale(1.3);
            opacity: 1;
          }
        }
        .payday-text {
          background: linear-gradient(135deg, #44D62C, #6ae04a, #fbbf24, #6ae04a, #44D62C);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: paydayShimmer 2s ease-in-out infinite;
          filter: drop-shadow(0 0 20px rgba(68, 214, 44, 0.6));
        }
        @keyframes paydayShimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};

export default PaydayCountdownApp;
