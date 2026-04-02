'use client';
import { useState, useEffect } from 'react';

const KEY = 'tap-drill-device-id';

export function useDeviceId() {
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(KEY, id);
    }
    setDeviceId(id);
  }, []);

  return { deviceId, isLoaded: deviceId !== null };
}
