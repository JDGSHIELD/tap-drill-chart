import { SizeEntry, FlatRow } from './types';
import { rollFormData } from '@/data/rollFormData';

export function formatDec(dec: number): string {
  if (dec >= 1) return dec.toFixed(3);
  return '.' + dec.toFixed(3).slice(2);
}

export function flattenData(
  tapData: SizeEntry[],
  tapMode: 'chip' | 'roll',
  threadPercent: number,
  clearanceFit: 'close' | 'free',
  commonSizes: string[]
): FlatRow[] {
  const rows: FlatRow[] = [];
  tapData.forEach(item => {
    item.threads.forEach(thread => {
      const key = `${item.size}-${thread.tpi}`;
      const rollEntry = rollFormData[key];
      if (tapMode === 'roll' && !rollEntry) return;
      const tap = tapMode === 'roll'
        ? (threadPercent === 75 ? rollEntry.tap75 : rollEntry.tap65)
        : (threadPercent === 75 ? thread.tap75 : thread.tap50);
      rows.push({
        key,
        size: item.size,
        major: item.major,
        tpi: thread.tpi,
        minor: thread.minor,
        tap,
        clear: clearanceFit === 'close' ? thread.clearClose : thread.clearFree,
        isCommon: commonSizes.includes(key),
      });
    });
  });
  return rows;
}

export function getAllSizeOptions(tapData: SizeEntry[]): { size: string; tpi: number; key: string }[] {
  const options: { size: string; tpi: number; key: string }[] = [];
  tapData.forEach(item => {
    item.threads.forEach(thread => {
      options.push({ size: item.size, tpi: thread.tpi, key: `${item.size}-${thread.tpi}` });
    });
  });
  return options;
}
