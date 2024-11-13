export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["Ad01.jpg","AiEmer.jpg","Data Analysis.png","HTML.webp","Primechat.jpg","Satellite Building.png","Satellite Launch.jpeg","Uses of Satellites.jpg","amazon.jpeg","amazon.jpg","d41586-024-02191-1_27293496.jpg","favicon.png"]),
	mimeTypes: {".jpg":"image/jpeg",".png":"image/png",".webp":"image/webp",".jpeg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.DkMMgzNP.js","app":"_app/immutable/entry/app.Bktqkfpa.js","imports":["_app/immutable/entry/start.DkMMgzNP.js","_app/immutable/chunks/entry.ynT9Tddq.js","_app/immutable/chunks/scheduler.DvBSSsau.js","_app/immutable/entry/app.Bktqkfpa.js","_app/immutable/chunks/scheduler.DvBSSsau.js","_app/immutable/chunks/index.DFh_30bs.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
