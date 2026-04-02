import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  preferences: defineTable({
    deviceId: v.string(),
    tapMode: v.string(),
    showCommonOnly: v.boolean(),
    commonSizes: v.array(v.string()),
    threadPercent: v.number(),
    clearanceFit: v.string(),
    showMajor: v.boolean(),
    showMinor: v.boolean(),
    enabledControls: v.object({
      chipRollMode: v.boolean(),
      commonFilter: v.boolean(),
      threadPercent: v.boolean(),
      clearanceFit: v.boolean(),
      majorDiameter: v.boolean(),
      minorDiameter: v.boolean(),
    }),
  }).index('by_device', ['deviceId']),
});
