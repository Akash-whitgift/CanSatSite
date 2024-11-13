

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.Blnk7ZXa.js","_app/immutable/chunks/scheduler.DvBSSsau.js","_app/immutable/chunks/index.DFh_30bs.js","_app/immutable/chunks/entry.ynT9Tddq.js"];
export const stylesheets = ["_app/immutable/assets/2.Dioi1u4B.css"];
export const fonts = [];
