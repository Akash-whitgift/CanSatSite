

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.BFSrYyex.js","_app/immutable/chunks/scheduler.5rEqcWWW.js","_app/immutable/chunks/index.3m18Cu60.js","_app/immutable/chunks/entry.B6_ghXDF.js"];
export const stylesheets = ["_app/immutable/assets/2.CeuRVgwK.css"];
export const fonts = [];
