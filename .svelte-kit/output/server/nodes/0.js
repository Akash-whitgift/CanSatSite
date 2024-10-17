

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.Dn_LOdW3.js","_app/immutable/chunks/scheduler.5rEqcWWW.js","_app/immutable/chunks/index.3m18Cu60.js"];
export const stylesheets = [];
export const fonts = [];
