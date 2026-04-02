'use client';
import { useEffect, useState } from 'react';
import { UserPreferences } from '@/lib/types';
import CommonSizesTab from './SettingsTabs/CommonSizesTab';
import ControlsTab from './SettingsTabs/ControlsTab';
import AboutTab from './SettingsTabs/AboutTab';
import TapTypesTab from './SettingsTabs/TapTypesTab';
import { getAllSizeOptions } from '@/lib/utils';
import { tapData } from '@/data/tapData';

type Tab = 'common' | 'controls' | 'about' | 'taps';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  prefs: UserPreferences;
  onUpdate: (key: keyof UserPreferences, value: unknown) => void;
  onToggleControl: (key: string) => void;
  onToggleCommonSize: (key: string) => void;
}

const tabs: { key: Tab; label: string }[] = [
  { key: 'common', label: 'Sizes' },
  { key: 'controls', label: 'Controls' },
  { key: 'about', label: 'About' },
  { key: 'taps', label: 'Tap Types' },
];

export default function SettingsModal({ isOpen, onClose, prefs, onToggleControl, onToggleCommonSize }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('common');
  const sizeOptions = getAllSizeOptions(tapData);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0d0d0d]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#222] flex-shrink-0">
        <h2 className="text-white font-bold text-lg tracking-wide">Settings</h2>
        <button
          onClick={onClose}
          aria-label="Close settings"
          className="text-[#888] hover:text-white text-xl font-bold p-1 transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#222] flex-shrink-0">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-3 text-xs font-bold tracking-wide transition-colors ${
              activeTab === tab.key
                ? 'text-[#ff6b00] border-b-2 border-[#ff6b00]'
                : 'text-[#666] hover:text-[#999]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {activeTab === 'common' && (
          <CommonSizesTab
            options={sizeOptions}
            commonSizes={prefs.commonSizes}
            onToggle={onToggleCommonSize}
          />
        )}
        {activeTab === 'controls' && (
          <ControlsTab
            enabledControls={prefs.enabledControls}
            onToggle={onToggleControl}
          />
        )}
        {activeTab === 'about' && <AboutTab />}
        {activeTab === 'taps' && <TapTypesTab />}
      </div>
    </div>
  );
}
