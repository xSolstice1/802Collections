import { useState, useEffect } from 'react';
import { DollarSign, ChevronDown, ChevronUp } from 'lucide-react';

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
  let payday = getPayday(now.getFullYear(), now.getMonth());
  if (now > payday) {
    const nextMonth = now.getMonth() + 1;
    payday = getPayday(
      nextMonth > 11 ? now.getFullYear() + 1 : now.getFullYear(),
      nextMonth > 11 ? 0 : nextMonth
    );
  }
  return payday;
};

interface PaydayCountdownWidgetProps {
  variant?: 'compact' | 'expanded';
  onClick?: () => void;
}

/**
 * PaydayCountdownWidget Component
 * 
 * A persistent widget that shows the countdown to the next payday.
 * Can be displayed in compact mode (for header) or expanded mode (for sidebar/drawer).
 */
export const PaydayCountdownWidget = ({ variant = 'compact', onClick }: PaydayCountdownWidgetProps) => {
  const [now, setNow] = useState(() => new Date());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const payday = getNextPayday(now);
  
  const todayIsPayday =
    now.getFullYear() === payday.getFullYear() &&
    now.getMonth() === payday.getMonth() &&
    now.getDate() === payday.getDate();

  const diff = payday.getTime() - now.getTime();
  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);

  // Compact format: "5d 3h" or "PAYDAY!"
  const compactText = todayIsPayday 
    ? '🎉 PAYDAY!' 
    : `${days}d ${hours}h`;

  if (variant === 'compact') {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-802/10 border border-802/20 hover:bg-802/20 transition-all duration-200 group"
        title="Click to view full countdown"
      >
        <DollarSign className="w-4 h-4 text-802" />
        <span className="text-sm font-mono font-semibold text-802">
          {compactText}
        </span>
      </button>
    );
  }

  // Expanded variant for sidebar/drawer
  return (
    <div className="bg-802/10 border border-802/20 rounded-lg p-3">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-802" />
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            {todayIsPayday ? 'Payday!' : 'Payday in'}
          </span>
        </div>
        {isExpanded ? <ChevronUp className="w-3 h-3 text-gray-500" /> : <ChevronDown className="w-3 h-3 text-gray-500" />}
      </div>
      
      <div className="mt-2 text-center">
        {todayIsPayday ? (
          <span className="text-lg font-bold text-802">🎉 IT'S PAYDAY!</span>
        ) : (
          <div className="flex items-center justify-center gap-1">
            <span className="text-2xl font-mono font-bold text-802">
              {days.toString().padStart(2, '0')}
            </span>
            <span className="text-xs text-gray-500">d</span>
            <span className="text-2xl font-mono font-bold text-802 ml-1">
              {hours.toString().padStart(2, '0')}
            </span>
            <span className="text-xs text-gray-500">h</span>
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="mt-2 pt-2 border-t border-802/20">
          <p className="text-xs text-gray-500 text-center">
            {payday.toLocaleDateString(undefined, { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}
            {payday.getDate() !== 27 && ' (adjusted)'}
          </p>
        </div>
      )}
    </div>
  );
};