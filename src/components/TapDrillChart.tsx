'use client';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { UserPreferences } from '@/lib/types';
import { flattenData } from '@/lib/utils';
import { tapData } from '@/data/tapData';
import { useDeviceId } from '@/hooks/useDeviceId';
import { usePreferences } from '@/hooks/usePreferences';
import ControlBar from './ControlBar';
import ChartTable from './ChartTable';
import SettingsModal from './SettingsModal';

export default function TapDrillChart() {
  const { deviceId } = useDeviceId();
  const { prefs, updatePreference, updatePrefs } = usePreferences(deviceId);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const flatRows = useMemo(() =>
    flattenData(tapData, prefs.tapMode, prefs.threadPercent, prefs.clearanceFit, prefs.commonSizes),
    [prefs.tapMode, prefs.threadPercent, prefs.clearanceFit, prefs.commonSizes]
  );

  const filteredRows = useMemo(() =>
    prefs.showCommonOnly ? flatRows.filter(r => r.isCommon) : flatRows,
    [flatRows, prefs.showCommonOnly]
  );

  const toggleControl = useCallback((key: string) => {
    updatePrefs(prev => {
      const next = { ...prev, enabledControls: { ...prev.enabledControls, [key]: !prev.enabledControls[key as keyof typeof prev.enabledControls] } };
      if (key === 'chipRollMode' && !next.enabledControls.chipRollMode) next.tapMode = 'chip';
      if (key === 'majorDiameter' && !next.enabledControls.majorDiameter) next.showMajor = false;
      if (key === 'minorDiameter' && !next.enabledControls.minorDiameter) next.showMinor = false;
      if (key === 'clearanceFit' && !next.enabledControls.clearanceFit) next.clearanceFit = 'close';
      if (key === 'commonFilter' && !next.enabledControls.commonFilter) next.showCommonOnly = false;
      if (key === 'threadPercent' && !next.enabledControls.threadPercent) next.threadPercent = 75;
      return next;
    });
  }, [updatePrefs]);

  const toggleCommonSize = useCallback((key: string) => {
    updatePrefs(prev => ({
      ...prev,
      commonSizes: prev.commonSizes.includes(key)
        ? prev.commonSizes.filter(k => k !== key)
        : [...prev.commonSizes, key],
    }));
  }, [updatePrefs]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (settingsOpen) return;
      if (e.key === 'Escape') {
        setSelectedKey(null);
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedKey(prev => {
          const idx = prev ? filteredRows.findIndex(r => r.key === prev) : -1;
          if (e.key === 'ArrowDown') {
            const next = Math.min(idx + 1, filteredRows.length - 1);
            return filteredRows[next]?.key ?? null;
          } else {
            const next = Math.max(idx - 1, 0);
            return filteredRows[next]?.key ?? null;
          }
        });
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [filteredRows, settingsOpen]);

  return (
    <div className="flex flex-col h-screen bg-[#0d0d0d] max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center px-4 py-2 border-b border-[#222] flex-shrink-0">
        <div className="flex-1">
          <a
            href="https://www.buymeacoffee.com/Josephdigiuseppe"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-black bg-[#FFDD00] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.02] hover:brightness-95"
          >
            <span aria-hidden="true" className="text-sm leading-none">☕</span>
            <span className="hidden sm:inline">Buy Me a Coffee</span>
            <span className="sm:hidden">Support</span>
          </a>
        </div>
        <div className="flex flex-col items-center flex-[2]">
          <span className="text-[9px] tracking-[3px] text-[#666] uppercase">Machinist Reference</span>
          <span className="text-[18px] font-extrabold text-white tracking-wide">TAP &amp; DRILL CHART</span>
        </div>
        <div className="flex-1 flex justify-end">
          <button
            onClick={() => setSettingsOpen(true)}
            aria-label="Open settings"
            className="text-xl p-2 hover:text-white text-[#888] transition-colors"
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex-shrink-0 border-b border-[#1a1a1a]">
        <ControlBar prefs={prefs} onUpdate={updatePreference as (key: keyof UserPreferences, value: unknown) => void} />
      </div>

      {/* Table */}
      <ChartTable
        data={filteredRows}
        showMajor={prefs.showMajor}
        showMinor={prefs.showMinor}
        tapMode={prefs.tapMode}
        selectedKey={selectedKey}
        onSelectRow={setSelectedKey}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        prefs={prefs}
        onUpdate={updatePreference as (key: keyof UserPreferences, value: unknown) => void}
        onToggleControl={toggleControl}
        onToggleCommonSize={toggleCommonSize}
      />
    </div>
  );
}
