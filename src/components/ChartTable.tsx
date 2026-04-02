'use client';
import { FlatRow } from '@/lib/types';
import { formatDec } from '@/lib/utils';

interface Props {
  data: FlatRow[];
  showMajor: boolean;
  showMinor: boolean;
  tapMode: 'chip' | 'roll';
  selectedKey: string | null;
  onSelectRow: (key: string | null) => void;
}

export default function ChartTable({ data, showMajor, showMinor, tapMode, selectedKey, onSelectRow }: Props) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Header */}
      <div className="flex bg-[#222] px-3 py-2.5 flex-shrink-0">
        <span className="flex-[1.2] text-[9px] font-bold text-[#888] tracking-wide text-center">SIZE</span>
        <span className="flex-[0.7] text-[9px] font-bold text-[#888] tracking-wide text-center">TPI</span>
        {showMajor && <span className="flex-[0.9] text-[9px] font-bold tracking-wide text-center" style={{ color: '#a855f7' }}>MAJ</span>}
        {showMinor && <span className="flex-[0.9] text-[9px] font-bold tracking-wide text-center" style={{ color: '#00d4ff' }}>MIN</span>}
        <span className="flex-[1.4] text-[9px] font-bold tracking-wide text-center" style={{ color: '#ff6b00' }}>
          {tapMode === 'roll' ? 'PRE-TAP' : 'TAP'}
        </span>
        <span className="flex-[1.4] text-[9px] font-bold tracking-wide text-center" style={{ color: '#22c55e' }}>CLEAR</span>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        {data.map((row, index) => {
          const isSelected = selectedKey === row.key;
          const isDimmed = selectedKey !== null && !isSelected;

          return (
            <button
              key={row.key}
              onClick={() => onSelectRow(isSelected ? null : row.key)}
              className="flex w-full px-3 py-2.5 text-left transition-colors relative"
              style={{
                backgroundColor: isSelected
                  ? '#1f1a14'
                  : index % 2 === 0 ? '#1a1a1a' : '#141414',
                opacity: isDimmed ? 0.3 : 1,
                borderLeft: isSelected ? '3px solid #ff6b00' : '3px solid transparent',
              }}
            >
              {/* SIZE */}
              <div className="flex-[1.2] flex items-center justify-center">
                <span className={`text-[13px] font-bold ${isSelected ? 'text-[#ff6b00]' : 'text-white'}`}>
                  {row.size}
                </span>
              </div>
              {/* TPI */}
              <div className="flex-[0.7] flex items-center justify-center">
                <span className="text-[12px] text-[#aaa] font-mono">{row.tpi}</span>
              </div>
              {/* MAJ */}
              {showMajor && (
                <div className="flex-[0.9] flex items-center justify-center">
                  <span className="text-[12px] font-mono" style={{ color: '#a855f7' }}>{formatDec(row.major)}</span>
                </div>
              )}
              {/* MIN */}
              {showMinor && (
                <div className="flex-[0.9] flex items-center justify-center">
                  <span className="text-[12px] font-mono" style={{ color: '#00d4ff' }}>{formatDec(row.minor)}</span>
                </div>
              )}
              {/* TAP */}
              <div className="flex-[1.4] flex flex-col items-center justify-center">
                <span className="text-[13px] font-bold" style={{ color: '#ff6b00' }}>{row.tap.drill}</span>
                <span className="text-[10px] text-[#666] font-mono">{formatDec(row.tap.dec)}</span>
              </div>
              {/* CLEAR */}
              <div className="flex-[1.4] flex flex-col items-center justify-center">
                <span className="text-[13px] font-bold" style={{ color: '#22c55e' }}>{row.clear.drill}</span>
                <span className="text-[10px] text-[#666] font-mono">{formatDec(row.clear.dec)}</span>
              </div>
            </button>
          );
        })}
        <div className="h-8" />
      </div>
    </div>
  );
}
