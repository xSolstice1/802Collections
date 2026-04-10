import { useState } from 'react';
import type { UpgradeCard } from '../cards';
import { RARITY_COLORS, RARITY_BG } from '../cards';

interface Props {
  cards: UpgradeCard[];
  level: number;
  onSelect: (index: number) => void;
}

export const CardSelectionOverlay = ({ cards, level, onSelect }: Props) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (selected !== null) return; // prevent double-click
    setSelected(index);
    setTimeout(() => onSelect(index), 300);
  };

  return (
    <div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
    >
      <div className="text-center mb-6">
        <p className="text-yellow-400 font-bold text-lg">Level {level}</p>
        <p className="text-white text-sm mt-1">Choose an upgrade</p>
      </div>

      <div className="flex gap-3 px-4" style={{ maxWidth: 600 }}>
        {cards.map((card, i) => {
          const color = RARITY_COLORS[card.rarity];
          const bg = RARITY_BG[card.rarity];
          const isSelected = selected === i;
          const isDimmed = selected !== null && !isSelected;

          return (
            <button
              key={card.id}
              onClick={() => handleSelect(i)}
              className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200"
              style={{
                borderColor: isSelected ? color : `${color}66`,
                background: isSelected ? `${color}22` : bg,
                opacity: isDimmed ? 0.4 : 1,
                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                cursor: selected !== null ? 'default' : 'pointer',
                minWidth: 0,
              }}
            >
              <span className="text-3xl">{card.icon}</span>
              <span className="font-bold text-sm text-white leading-tight">{card.name}</span>
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{ background: `${color}33`, color }}
              >
                {card.rarity}
              </span>
              <span className="text-xs text-gray-300 text-center leading-snug">{card.description}</span>
            </button>
          );
        })}
      </div>

      {cards.length === 0 && (
        <p className="text-gray-400 text-sm">No more upgrades available!</p>
      )}
    </div>
  );
};
