/**
 * Firebase service for Wheel of Lunch
 *
 * Stores options under /wheelOfLunch/options in the Realtime Database.
 * Completely isolated from other apps (e.g. Monopoly uses /rooms/).
 */

import {
  ref,
  set,
  remove,
  update,
  onValue,
  off,
  DataSnapshot,
} from 'firebase/database';
import { rtdb } from '@services/firebase';

export interface WheelOption {
  id: string;
  name: string;
  weight: number;
  color: string;
}

const OPTIONS_REF = ref(rtdb, 'wheelOfLunch/options');
const optionRef = (id: string) => ref(rtdb, `wheelOfLunch/options/${id}`);

/**
 * Check whether the provided key matches the build-time WHEEL_KEY secret.
 */
export const isKeyValid = (key: string): boolean => {
  const expected = import.meta.env.VITE_WHEEL_KEY;
  return !!expected && key === expected;
};

/**
 * Write the full options list to Firebase (used for reset / initial seed).
 * Requires valid WHEEL_KEY.
 */
export const setAllOptions = async (key: string, options: WheelOption[]): Promise<void> => {
  if (!isKeyValid(key)) throw new Error('Invalid wheel key');
  const record: Record<string, WheelOption> = {};
  options.forEach((opt) => {
    record[opt.id] = opt;
  });
  await set(OPTIONS_REF, record);
};

/**
 * Add or update a single option. Requires valid WHEEL_KEY.
 */
export const upsertOption = async (key: string, option: WheelOption): Promise<void> => {
  if (!isKeyValid(key)) throw new Error('Invalid wheel key');
  await set(optionRef(option.id), option);
};

/**
 * Update fields on an existing option (e.g. weight or color). Requires valid WHEEL_KEY.
 */
export const updateOption = async (
  key: string,
  id: string,
  fields: Partial<WheelOption>,
): Promise<void> => {
  if (!isKeyValid(key)) throw new Error('Invalid wheel key');
  await update(optionRef(id), fields);
};

/**
 * Remove an option by ID. Requires valid WHEEL_KEY.
 */
export const removeOption = async (key: string, id: string): Promise<void> => {
  if (!isKeyValid(key)) throw new Error('Invalid wheel key');
  await remove(optionRef(id));
};

/**
 * Subscribe to real-time option changes.
 * Returns an unsubscribe function.
 */
export const subscribeToOptions = (
  callback: (options: WheelOption[]) => void,
): (() => void) => {
  onValue(OPTIONS_REF, (snapshot: DataSnapshot) => {
    if (!snapshot.exists()) {
      callback([]);
      return;
    }
    const data = snapshot.val() as Record<string, WheelOption>;
    // Preserve insertion order by sorting on id (timestamp-based)
    const options = Object.values(data).sort((a, b) => {
      // IDs are string timestamps for user-created entries, or small numbers for defaults
      const aNum = Number(a.id);
      const bNum = Number(b.id);
      return aNum - bNum;
    });
    callback(options);
  });

  return () => off(OPTIONS_REF);
};
