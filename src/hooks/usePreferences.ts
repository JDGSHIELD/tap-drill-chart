'use client';
import { useQuery, useMutation } from 'convex/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '../../convex/_generated/api';
import { UserPreferences } from '@/lib/types';
import { DEFAULT_PREFERENCES } from '@/lib/constants';

export function usePreferences(deviceId: string | null) {
  const remote = useQuery(api.preferences.get, deviceId ? { deviceId } : 'skip');
  const saveMutation = useMutation(api.preferences.save);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [prefs, setPrefs] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from Convex once loaded
  useEffect(() => {
    if (remote === undefined) return; // still loading
    if (remote !== null && !hydrated) {
      setPrefs({
        tapMode: remote.tapMode as UserPreferences['tapMode'],
        showCommonOnly: remote.showCommonOnly,
        commonSizes: remote.commonSizes,
        threadPercent: remote.threadPercent,
        clearanceFit: remote.clearanceFit as UserPreferences['clearanceFit'],
        showMajor: remote.showMajor,
        showMinor: remote.showMinor,
        enabledControls: remote.enabledControls,
      });
    }
    setHydrated(true);
  }, [remote, hydrated]);

  const updatePreference = useCallback(<K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPrefs(prev => {
      const next = { ...prev, [key]: value };

      if (deviceId) {
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => {
          saveMutation({ deviceId, ...next });
        }, 300);
      }

      return next;
    });
  }, [deviceId, saveMutation]);

  const updatePrefs = useCallback((updater: (prev: UserPreferences) => UserPreferences) => {
    setPrefs(prev => {
      const next = updater(prev);

      if (deviceId) {
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => {
          saveMutation({ deviceId, ...next });
        }, 300);
      }

      return next;
    });
  }, [deviceId, saveMutation]);

  return { prefs, updatePreference, updatePrefs, isLoading: !hydrated };
}
