import { useState } from 'react';
import type { Relic } from '../relics';

interface Props {
  relics: Relic[];
  onSelect: (index: number) => void;
}

export const RelicSelectionOverlay = ({ relics, onSelect }: Props) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    setTimeout(() => onSelect(index), 400);
  };

  return (
    <div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)' }}
    >
      <div className="text-center mb-6">
        <p className="text-2xl mb-1">🏆</p>
        <p className="text-yellow-400 font-bold text-lg">Boss Defeated!</p>
        <p className="text-white text-sm mt-1">Choose a Relic</p>
      </div>

      <div className="flex gap-4 px-4" style={{ maxWidth: 500 }}>
        {relics.map((relic, i) => {
          const isSelected = selected === i;
          const isDimmed = selected !== null && !isSelected;

          return (
            <button
              key={relic.id}
              onClick={() => handleSelect(i)}
              className="flex-1 flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all duration-300"
              style={{
                borderColor: isSelected ? '#fbbf24' : 'rgba(251,191,36,0.3)',
                background: isSelected
                  ? 'rgba(251,191,36,0.15)'
                  : 'rgba(251,191,36,0.05)',
                opacity: isDimmed ? 0.3 : 1,
                transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                cursor: selected !== null ? 'default' : 'pointer',
              }}
            >
              <span className="text-4xl">{relic.icon}</span>
              <span className="font-bold text-sm text-white">{relic.name}</span>
              <span className="text-xs text-gray-300 text-center leading-snug">{relic.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
