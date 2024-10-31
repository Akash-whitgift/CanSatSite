

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.HC41LJi3.js","_app/immutable/chunks/scheduler.DTurKcvQ.js","_app/immutable/chunks/index.CvJRIlCB.js","_app/immutable/chunks/entry.Xyt3Gdu4.js"];
export const stylesheets = ["_app/immutable/assets/2.Cju36GS4.css"];
export const fonts = [];
