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
		client: {"start":"_app/immutable/entry/start.0GTmlCVE.js","app":"_app/immutable/entry/app.Cx_Qe42z.js","imports":["_app/immutable/entry/start.0GTmlCVE.js","_app/immutable/chunks/entry.xbmA0_Ly.js","_app/immutable/chunks/scheduler.5rEqcWWW.js","_app/immutable/entry/app.Cx_Qe42z.js","_app/immutable/chunks/scheduler.5rEqcWWW.js","_app/immutable/chunks/index.3m18Cu60.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
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
