import { META_UPGRADES, buyMetaUpgrade } from '../meta';
import type { MetaState } from '../meta';

interface Props {
  meta: MetaState;
  onUpdate: (newMeta: MetaState) => void;
}

export const MetaUpgradePanel = ({ meta, onUpdate }: Props) => {
  const handleBuy = (id: string) => {
    const result = buyMetaUpgrade(id, meta);
    if (result) onUpdate(result);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🧬</span>
        <span className="text-white font-medium text-sm">Permanent Upgrades</span>
        <span className="ml-auto text-yellow-400 font-mono text-sm font-bold">
          {meta.currency} 🪙
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-3">Earned from runs. Modest bonuses — skill still matters most.</p>
      <div className="space-y-2">
        {META_UPGRADES.map((def) => {
          const level = meta.upgrades[def.id] ?? 0;
          const maxed = level >= def.maxLevel;
          const cost = maxed ? 0 : def.costs[level];
          const canBuy = !maxed && meta.currency >= cost;

          return (
            <div key={def.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/40">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-medium">{def.name}</span>
                  <span className="text-xs text-gray-500">Lv.{level}/{def.maxLevel}</span>
                </div>
                <p className="text-xs text-gray-400">{def.description}</p>
              </div>
              {maxed ? (
                <span className="text-xs text-green-400 font-medium px-3 py-1">MAX</span>
              ) : (
                <button
                  onClick={() => handleBuy(def.id)}
                  disabled={!canBuy}
                  className={`text-xs font-medium px-3 py-1.5 rounded transition-colors ${
                    canBuy
                      ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {cost} 🪙
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
