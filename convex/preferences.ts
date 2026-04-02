import { v } from 'convex/values';
import { query, mutation } from './_generated/server';

export const get = query({
  args: { deviceId: v.string() },
  handler: async (ctx, { deviceId }) => {
    return await ctx.db
      .query('preferences')
      .withIndex('by_device', q => q.eq('deviceId', deviceId))
      .unique();
  },
});

export const save = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('preferences')
      .withIndex('by_device', q => q.eq('deviceId', args.deviceId))
      .unique();

    const { deviceId, ...fields } = args;

    if (existing) {
      await ctx.db.patch(existing._id, fields);
    } else {
      await ctx.db.insert('preferences', args);
    }
  },
});
