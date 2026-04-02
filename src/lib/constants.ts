import { UserPreferences } from './types';

export const DEFAULT_COMMON_SIZES = ['6-32', '8-32', '10-32', '1/4-20'];

export const DEFAULT_ENABLED_CONTROLS = {
  chipRollMode: true,
  commonFilter: true,
  threadPercent: true,
  clearanceFit: true,
  majorDiameter: true,
  minorDiameter: true,
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  tapMode: 'chip',
  showCommonOnly: false,
  commonSizes: DEFAULT_COMMON_SIZES,
  threadPercent: 75,
  clearanceFit: 'close',
  showMajor: false,
  showMinor: false,
  enabledControls: DEFAULT_ENABLED_CONTROLS,
};
