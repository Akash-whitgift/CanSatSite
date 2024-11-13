

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.BxxEr2Gr.js","_app/immutable/chunks/scheduler.DvBSSsau.js","_app/immutable/chunks/index.DFh_30bs.js","_app/immutable/chunks/entry.ynT9Tddq.js"];
export const stylesheets = [];
export const fonts = [];
