

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.DRbh7SrI.js","_app/immutable/chunks/scheduler.5rEqcWWW.js","_app/immutable/chunks/index.3m18Cu60.js","_app/immutable/chunks/entry.xbmA0_Ly.js"];
export const stylesheets = [];
export const fonts = [];
