export interface TapDrill {
  drill: string;
  dec: number;
}

export interface ThreadData {
  tpi: number;
  minor: number;
  tap75: TapDrill;
  tap50: TapDrill;
  clearClose: TapDrill;
  clearFree: TapDrill;
}

export interface SizeEntry {
  size: string;
  major: number;
  threads: ThreadData[];
}

export interface RollFormEntry {
  tap75: TapDrill;
  tap65: TapDrill;
}

export interface FlatRow {
  key: string;
  size: string;
  major: number;
  tpi: number;
  minor: number;
  tap: TapDrill;
  clear: TapDrill;
  isCommon: boolean;
}

export interface UserPreferences {
  tapMode: 'chip' | 'roll';
  showCommonOnly: boolean;
  commonSizes: string[];
  threadPercent: number;
  clearanceFit: 'close' | 'free';
  showMajor: boolean;
  showMinor: boolean;
  enabledControls: {
    chipRollMode: boolean;
    commonFilter: boolean;
    threadPercent: boolean;
    clearanceFit: boolean;
    majorDiameter: boolean;
    minorDiameter: boolean;
  };
}
