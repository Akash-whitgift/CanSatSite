

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.ef3de2a6.js","_app/immutable/chunks/scheduler.cbf234a0.js","_app/immutable/chunks/index.200976ee.js","_app/immutable/chunks/stores.0428cf09.js","_app/immutable/chunks/singletons.ef65cb30.js","_app/immutable/chunks/index.14349a18.js"];
export const stylesheets = [];
export const fonts = [];
