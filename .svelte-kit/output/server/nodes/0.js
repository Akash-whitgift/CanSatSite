

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.QbHOYBhi.js","_app/immutable/chunks/scheduler.DvBSSsau.js","_app/immutable/chunks/index.DFh_30bs.js"];
export const stylesheets = [];
export const fonts = [];
