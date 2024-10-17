export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["Ad01.jpg","AiEmer.jpg","HTML.webp","Primechat.jpg","about.jpg","amazon.jpeg","amazon.jpg","favicon.png"]),
	mimeTypes: {".jpg":"image/jpeg",".webp":"image/webp",".jpeg":"image/jpeg",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.BlSkR5Uh.js","app":"_app/immutable/entry/app.DuPzg36Z.js","imports":["_app/immutable/entry/start.BlSkR5Uh.js","_app/immutable/chunks/entry.B6_ghXDF.js","_app/immutable/chunks/scheduler.5rEqcWWW.js","_app/immutable/entry/app.DuPzg36Z.js","_app/immutable/chunks/scheduler.5rEqcWWW.js","_app/immutable/chunks/index.3m18Cu60.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set([]);

export const app_path = "_app";
