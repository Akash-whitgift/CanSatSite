export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["Ad01.jpg","AiEmer.jpg","HTML.webp","Primechat.jpg","amazon.jpeg","amazon.jpg","d41586-024-02191-1_27293496.jpg","favicon.png"]),
	mimeTypes: {".jpg":"image/jpeg",".webp":"image/webp",".jpeg":"image/jpeg",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.DwZE-IK4.js","app":"_app/immutable/entry/app.CGlvN2py.js","imports":["_app/immutable/entry/start.DwZE-IK4.js","_app/immutable/chunks/entry.Xyt3Gdu4.js","_app/immutable/chunks/scheduler.DTurKcvQ.js","_app/immutable/entry/app.CGlvN2py.js","_app/immutable/chunks/scheduler.DTurKcvQ.js","_app/immutable/chunks/index.CvJRIlCB.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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

export const base_path = "";
