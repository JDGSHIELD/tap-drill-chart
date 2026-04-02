'use client';
import SegmentedControl from './ui/SegmentedControl';
import ToggleButton from './ui/ToggleButton';
import { UserPreferences } from '@/lib/types';

interface Props {
  prefs: UserPreferences;
  onUpdate: (key: keyof UserPreferences, value: unknown) => void;
}

export default function ControlBar({ prefs, onUpdate }: Props) {
  const { tapMode, showCommonOnly, threadPercent, clearanceFit, showMajor, showMinor, enabledControls } = prefs;

  const showAnyRow2 = enabledControls.commonFilter || enabledControls.threadPercent;
  const showAnyRow3 = enabledControls.majorDiameter || enabledControls.minorDiameter || enabledControls.clearanceFit;

  return (
    <div className="px-3 py-2 flex flex-col gap-1.5">
      {/* Row 1: Chip / Roll */}
      {enabledControls.chipRollMode && (
        <SegmentedControl
          options={[
            { label: 'CHIP (CUT)', value: 'chip' },
            { label: 'ROLL FORM', value: 'roll' },
          ]}
          value={tapMode}
          onChange={(v) => onUpdate('tapMode', v)}
          activeColor="#3b82f6"
        />
      )}

      {/* Row 2: Common filter + Thread % */}
      {showAnyRow2 && (
        <div className="flex gap-2 items-start">
          {enabledControls.commonFilter && (
            <div className="flex-1 flex flex-col gap-1">
              <ToggleButton
                label={showCommonOnly ? 'Show All Sizes' : 'Show Common Sizes'}
                active={showCommonOnly}
                onToggle={() => onUpdate('showCommonOnly', !showCommonOnly)}
              />
              <span className="text-[8px] text-[#555] text-center">Edit common sizes in ⚙️</span>
            </div>
          )}
          {enabledControls.threadPercent && (
            <div className="flex flex-col gap-1" style={{ flex: enabledControls.commonFilter ? 1 : undefined, minWidth: 120 }}>
              <SegmentedControl
                options={[
                  { label: '75%', value: '75' },
                  { label: tapMode === 'roll' ? '65%' : '50%', value: '50' },
                ]}
                value={String(threadPercent)}
                onChange={(v) => onUpdate('threadPercent', Number(v))}
                activeColor="#ff6b00"
              />
              <span className="text-[8px] text-[#555] text-center">
                {tapMode === 'roll'
                  ? (threadPercent === 75 ? 'Tighter / Stronger' : 'Standard / Easier')
                  : (threadPercent === 75 ? 'Alum, Brass, Plastic' : 'Steel, Stainless, Iron')}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Row 3: MAJ / MIN / Clearance */}
      {showAnyRow3 && (
        <div className="flex gap-1.5 items-center">
          {enabledControls.majorDiameter && (
            <button
              onClick={() => onUpdate('showMajor', !showMajor)}
              aria-pressed={showMajor}
              className="flex-1 py-2 rounded-md text-[12px] font-extrabold tracking-widest transition-colors border-2"
              style={
                showMajor
                  ? { backgroundColor: '#a855f7', borderColor: '#a855f7', color: '#000' }
                  : { backgroundColor: '#1a1a1a', borderColor: '#444', color: '#888' }
              }
            >
              MAJ
            </button>
          )}
          {enabledControls.minorDiameter && (
            <button
              onClick={() => onUpdate('showMinor', !showMinor)}
              aria-pressed={showMinor}
              className="flex-1 py-2 rounded-md text-[12px] font-extrabold tracking-widest transition-colors border-2"
              style={
                showMinor
                  ? { backgroundColor: '#00d4ff', borderColor: '#00d4ff', color: '#000' }
                  : { backgroundColor: '#1a1a1a', borderColor: '#444', color: '#888' }
              }
            >
              MIN
            </button>
          )}
          {enabledControls.clearanceFit && (
            <div className="flex-[2]">
              <SegmentedControl
                options={[
                  { label: 'CLOSE', value: 'close' },
                  { label: 'FREE', value: 'free' },
                ]}
                value={clearanceFit}
                onChange={(v) => onUpdate('clearanceFit', v)}
                activeColor="#22c55e"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
