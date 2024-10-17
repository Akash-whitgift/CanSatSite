import{G as st,S as at,s as Q,T as pe,U as Se,V as Ae,f as W,i as L,v as k,W as He,k as U,l as b,n as K,X as Me,E as ge,e as E,b as V,d as S,j as z,Y as J,Z as O,C as we,_ as Ke,r as ve,c as be,$ as rt,a0 as ct,u as ye,g as _e,a as ke,a1 as ut,p as ue,w as ce,D as De,x as fe,t as Te,h as Ie,a2 as dt,m as Le,a3 as ht,a4 as q,a5 as ft,a6 as Pe,a7 as mt}from"../chunks/scheduler.5rEqcWWW.js";import{S as te,i as ie,t as A,g as $,a as P,c as ee,b as ne,d as oe,m as le,e as se,f as de}from"../chunks/index.3m18Cu60.js";import{g as Be}from"../chunks/entry.B6_ghXDF.js";function je(t){return(t==null?void 0:t.length)!==void 0?t:Array.from(t)}function pt(t,e){const i={},n={},o={$$scope:1};let r=t.length;for(;r--;){const s=t[r],u=e[r];if(u){for(const l in s)l in u||(n[l]=1);for(const l in u)o[l]||(i[l]=u[l],o[l]=1);t[r]=u}else for(const l in s)o[l]=1}for(const s in n)s in i||(i[s]=void 0);return i}function gt(t){return t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1}function Ve(t,{delay:e=0,duration:i=400,easing:n=gt,amount:o=5,opacity:r=0}={}){const s=getComputedStyle(t),u=+s.opacity,l=s.filter==="none"?"":s.filter,c=u*(1-r),[d,h]=at(o);return{delay:e,duration:i,easing:n,css:(f,w)=>`opacity: ${u-c*w}; filter: ${l} blur(${w*d}${h});`}}function ze(t,{delay:e=0,duration:i=400,easing:n=st}={}){const o=+getComputedStyle(t).opacity;return{delay:e,duration:i,easing:n,css:r=>`opacity: ${r*o}`}}function wt(t){let e,i,n=[t[0],{viewBox:"0 0 20 20"},{fill:"currentColor"}],o={};for(let r=0;r<n.length;r+=1)o=pe(o,n[r]);return{c(){e=Se("svg"),i=Se("path"),this.h()},l(r){e=Ae(r,"svg",{viewBox:!0,fill:!0});var s=W(e);i=Ae(s,"path",{d:!0}),W(i).forEach(L),s.forEach(L),this.h()},h(){k(i,"d","M3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1z"),He(e,o)},m(r,s){U(r,e,s),b(e,i)},p(r,[s]){He(e,o=pt(n,[s&1&&r[0],{viewBox:"0 0 20 20"},{fill:"currentColor"}]))},i:K,o:K,d(r){r&&L(e)}}}function vt(t,e,i){return t.$$set=n=>{i(0,e=pe(pe({},e),Me(n)))},e=Me(e),[e]}class bt extends te{constructor(e){super(),ie(this,e,vt,wt,Q,{})}}function We(t,e,i){const n=t.slice();return n[46]=e[i],n[47]=e,n[48]=i,n}const yt=t=>({heading:t[0]&1}),Oe=t=>({heading:t[46],idx:t[48]}),_t=t=>({}),Ne=t=>({}),kt=t=>({}),Ue=t=>({});function Fe(t){let e,i,n,o;const r=t[36]["open-toc-icon"],s=be(r,t,t[35],Ue),u=s||Tt();return{c(){e=E("button"),u&&u.c(),this.h()},l(l){e=S(l,"BUTTON",{"aria-label":!0,class:!0});var c=W(e);u&&u.l(c),c.forEach(L),this.h()},h(){k(e,"aria-label",t[11]),k(e,"class","svelte-j30iej")},m(l,c){U(l,e,c),u&&u.m(e,null),i=!0,n||(o=O(e,"click",rt(ct(t[40]))),n=!0)},p(l,c){s&&s.p&&(!i||c[1]&16)&&ye(s,r,l,l[35],i?ke(r,l[35],c,kt):_e(l[35]),Ue),(!i||c[0]&2048)&&k(e,"aria-label",l[11])},i(l){i||(A(u,l),i=!0)},o(l){P(u,l),i=!1},d(l){l&&L(e),u&&u.d(l),n=!1,o()}}}function Tt(t){let e,i;return e=new bt({props:{width:"1em"}}),{c(){ne(e.$$.fragment)},l(n){oe(e.$$.fragment,n)},m(n,o){le(e,n,o),i=!0},p:K,i(n){i||(A(e.$$.fragment,n),i=!0)},o(n){P(e.$$.fragment,n),i=!1},d(n){se(e,n)}}}function Re(t){let e,i,n,o,r,s=t[12]&&qe(t),u=je(t[0]),l=[];for(let d=0;d<u.length;d+=1)l[d]=Ye(We(t,u,d));const c=d=>P(l[d],1,1,()=>{l[d]=null});return{c(){e=E("nav"),s&&s.c(),i=V(),n=E("ol");for(let d=0;d<l.length;d+=1)l[d].c();this.h()},l(d){e=S(d,"NAV",{class:!0});var h=W(e);s&&s.l(h),i=z(h),n=S(h,"OL",{class:!0});var f=W(n);for(let w=0;w<l.length;w+=1)l[w].l(f);f.forEach(L),h.forEach(L),this.h()},h(){k(n,"class","svelte-j30iej"),k(e,"class","svelte-j30iej")},m(d,h){U(d,e,h),s&&s.m(e,null),b(e,i),b(e,n);for(let f=0;f<l.length;f+=1)l[f]&&l[f].m(n,null);t[42](e),r=!0},p(d,h){if(t=d,t[12]?s?(s.p(t,h),h[0]&4096&&A(s,1)):(s=qe(t),s.c(),A(s,1),s.m(e,i)):s&&($(),P(s,1,1,()=>{s=null}),ee()),h[0]&1245833|h[1]&16){u=je(t[0]);let f;for(f=0;f<u.length;f+=1){const w=We(t,u,f);l[f]?(l[f].p(w,h),A(l[f],1)):(l[f]=Ye(w),l[f].c(),A(l[f],1),l[f].m(n,null))}for($(),f=u.length;f<l.length;f+=1)c(f);ee()}},i(d){if(!r){A(s);for(let h=0;h<u.length;h+=1)A(l[h]);d&&ge(()=>{r&&(o||(o=de(e,Ve,t[14],!0)),o.run(1))}),r=!0}},o(d){P(s),l=l.filter(Boolean);for(let h=0;h<l.length;h+=1)P(l[h]);d&&(o||(o=de(e,Ve,t[14],!1)),o.run(0)),r=!1},d(d){d&&L(e),s&&s.d(),ut(l,d),t[42](null),d&&o&&o.end()}}}function qe(t){let e;const i=t[36].title,n=be(i,t,t[35],Ne),o=n||It(t);return{c(){o&&o.c()},l(r){o&&o.l(r)},m(r,s){o&&o.m(r,s),e=!0},p(r,s){n?n.p&&(!e||s[1]&16)&&ye(n,i,r,r[35],e?ke(i,r[35],s,_t):_e(r[35]),Ne):o&&o.p&&(!e||s[0]&12288)&&o.p(r,e?s:[-1,-1])},i(r){e||(A(o,r),e=!0)},o(r){P(o,r),e=!1},d(r){o&&o.d(r)}}}function me(t){let e,i;return{c(){e=E(t[13]),i=Te(t[12]),this.h()},l(n){e=S(n,(t[13]||"null").toUpperCase(),{class:!0});var o=W(e);i=Ie(o,t[12]),o.forEach(L),this.h()},h(){dt(t[13])(e,{class:"toc-title toc-exclude svelte-j30iej"})},m(n,o){U(n,e,o),b(e,i)},p(n,o){o[0]&4096&&Le(i,n[12])},d(n){n&&L(e)}}}function It(t){let e=t[13],i,n=t[13]&&me(t);return{c(){n&&n.c(),i=ue()},l(o){n&&n.l(o),i=ue()},m(o,r){n&&n.m(o,r),U(o,i,r)},p(o,r){o[13]?e?Q(e,o[13])?(n.d(1),n=me(o),e=o[13],n.c(),n.m(i.parentNode,i)):n.p(o,r):(n=me(o),e=o[13],n.c(),n.m(i.parentNode,i)):e&&(n.d(1),n=null,e=o[13])},d(o){o&&L(i),n&&n.d(o)}}}function Lt(t){let e=t[9](t[46])+"",i;return{c(){i=Te(e)},l(n){i=Ie(n,e)},m(n,o){U(n,i,o)},p(n,o){o[0]&513&&e!==(e=n[9](n[46])+"")&&Le(i,e)},d(n){n&&L(i)}}}function Ye(t){let e,i,n=t[48],o=`0 0 0 ${t[16][t[48]]-t[17]}em`,r=`${2-.2*(t[16][t[48]]-t[17])}ex`,s,u,l;const c=t[36]["toc-item"],d=be(c,t,t[35],Oe),h=d||Lt(t),f=()=>t[41](e,n),w=()=>t[41](null,n);return{c(){e=E("li"),h&&h.c(),i=V(),this.h()},l(y){e=S(y,"LI",{role:!0,class:!0});var p=W(e);h&&h.l(p),i=z(p),p.forEach(L),this.h()},h(){k(e,"role","menuitem"),k(e,"class","svelte-j30iej"),J(e,"active",t[3]===t[7][t[48]]),ce(e,"margin",o),ce(e,"font-size",r)},m(y,p){U(y,e,p),h&&h.m(e,null),b(e,i),f(),s=!0,u||(l=[O(e,"click",function(){De(t[20](t[46]))&&t[20](t[46]).apply(this,arguments)}),O(e,"keyup",function(){De(t[20](t[46]))&&t[20](t[46]).apply(this,arguments)})],u=!0)},p(y,p){t=y,d?d.p&&(!s||p[0]&1|p[1]&16)&&ye(d,c,t,t[35],s?ke(c,t[35],p,yt):_e(t[35]),Oe):h&&h.p&&(!s||p[0]&513)&&h.p(t,s?p:[-1,-1]),n!==t[48]&&(w(),n=t[48],f()),(!s||p[0]&136)&&J(e,"active",t[3]===t[7][t[48]]),p[0]&196608&&o!==(o=`0 0 0 ${t[16][t[48]]-t[17]}em`)&&ce(e,"margin",o),p[0]&196608&&r!==(r=`${2-.2*(t[16][t[48]]-t[17])}ex`)&&ce(e,"font-size",r)},i(y){s||(A(h,y),s=!0)},o(y){P(h,y),s=!1},d(y){y&&L(e),h&&h.d(y),w(),u=!1,we(l)}}}function Ct(t){let e,i,n,o,r;ge(t[39]);let s=!t[2]&&!t[5]&&t[0].length>=t[10]&&Fe(t),u=(t[2]||t[5]&&t[0].length>=t[10])&&Re(t);return{c(){e=E("aside"),s&&s.c(),i=V(),u&&u.c(),this.h()},l(l){e=S(l,"ASIDE",{class:!0,"aria-hidden":!0});var c=W(e);s&&s.l(c),i=z(c),u&&u.l(c),c.forEach(L),this.h()},h(){k(e,"class","toc svelte-j30iej"),e.hidden=t[6],k(e,"aria-hidden",t[6]),J(e,"desktop",t[5]),J(e,"hidden",t[6]),J(e,"mobile",!t[5])},m(l,c){U(l,e,c),s&&s.m(e,null),b(e,i),u&&u.m(e,null),t[43](e),n=!0,o||(r=[O(window,"scroll",t[19]),O(window,"click",t[18]),O(window,"scrollend",t[37]),O(window,"resize",t[38]),O(window,"keydown",t[22]),O(window,"resize",t[39])],o=!0)},p(l,c){!l[2]&&!l[5]&&l[0].length>=l[10]?s?(s.p(l,c),c[0]&1061&&A(s,1)):(s=Fe(l),s.c(),A(s,1),s.m(e,i)):s&&($(),P(s,1,1,()=>{s=null}),ee()),l[2]||l[5]&&l[0].length>=l[10]?u?(u.p(l,c),c[0]&1061&&A(u,1)):(u=Re(l),u.c(),A(u,1),u.m(e,null)):u&&($(),P(u,1,1,()=>{u=null}),ee()),(!n||c[0]&64)&&(e.hidden=l[6]),(!n||c[0]&64)&&k(e,"aria-hidden",l[6]),(!n||c[0]&32)&&J(e,"desktop",l[5]),(!n||c[0]&64)&&J(e,"hidden",l[6]),(!n||c[0]&32)&&J(e,"mobile",!l[5])},i(l){n||(A(s),A(u),n=!0)},o(l){P(s),P(u),n=!1},d(l){l&&L(e),s&&s.d(),u&&u.d(),t[43](null),o=!1,we(r)}}}function Et(t,e,i){let n,o,{$$slots:r={},$$scope:s}=e,{activeHeading:u=null}=e,{activeHeadingScrollOffset:l=100}=e,{activeTocLi:c=null}=e,{aside:d=void 0}=e,{breakpoint:h=1e3}=e,{desktop:f=!0}=e,{flashClickedHeadingsFor:w=1500}=e,{getHeadingIds:y=a=>a.id}=e,{getHeadingLevels:p=a=>Number(a.nodeName[1])}=e,{getHeadingTitles:T=a=>a.textContent??""}=e,{headings:M=[]}=e,{headingSelector:D=":is(h2, h3, h4):not(.toc-exclude)"}=e,{hide:H=!1}=e,{autoHide:B=!0}=e,{keepActiveTocItemInView:N=!0}=e,{minItems:_=0}=e,{nav:m=void 0}=e,{open:v=!1}=e,{openButtonLabel:I="Open table of contents"}=e,{reactToKeys:C=["ArrowDown","ArrowUp"," ","Enter","Escape","Tab"]}=e,{pageBody:g="body"}=e,{scrollBehavior:j="smooth"}=e,{title:Y="On this page"}=e,{titleTag:X="h2"}=e,{tocItems:R=[]}=e,{warnOnEmpty:Z=!0}=e,{blurParams:Ce={duration:200}}=e,ae;const Xe=Ke();function Qe(a){d!=null&&d.contains(a.target)||i(2,v=!1)}function Ee(){typeof document>"u"||(i(0,M=[...document.querySelectorAll(D)]),re(),M.length===0?(Z&&console.warn(`svelte-toc found no headings for headingSelector='${D}'. ${B?"Hiding":"Showing empty"} table of contents.`),B&&i(6,H=!0)):H&&B&&i(6,H=!1))}Ee(),ve(()=>{if(typeof g=="string"&&(i(24,g=document.querySelector(g)),!g))throw new Error(`Could not find page body element: ${g}`);const a=new MutationObserver(Ee);return a.observe(g,{childList:!0,subtree:!0}),()=>a.disconnect()});function re(){let a=M.length;for(;a--;){const{top:F}=M[a].getBoundingClientRect();if(F<l||a===0){i(23,u=M[a]),i(3,c=R[a]);return}}}const Ze=a=>F=>{var G;if(F instanceof KeyboardEvent&&!["Enter"," "].includes(F.key))return;i(2,v=!1),(G=a.scrollIntoView)==null||G.call(a,{behavior:j,block:"start"});const x=y&&y(a);x&&history.replaceState({},"",`#${x}`),w&&(a.classList.add("toc-clicked"),setTimeout(()=>a.classList.remove("toc-clicked"),w))};function he(a="smooth"){var F;if(N&&c&&m){const x=(c==null?void 0:c.offsetTop)-m.offsetHeight/2;(F=m==null?void 0:m.scrollTo)==null||F.call(m,{top:x,behavior:a})}}function xe(a){if(!C||!C.includes(a.key))return;const F=[...document.querySelectorAll(":hover")].at(-1),x=F&&(m==null?void 0:m.contains(F));if(!(a.key==="Tab"&&!(m!=null&&m.contains(document.activeElement))||!f&&!v||f&&!x)){if(a.preventDefault(),a.key==="Escape"&&v)i(2,v=!1);else if(a.key==="Tab"&&!(d!=null&&d.contains(document.activeElement)))i(2,v=!1);else if(c){if(a.key==="ArrowDown"){const G=c.nextElementSibling;G&&i(3,c=G)}if(a.key==="ArrowUp"){const G=c.previousElementSibling;G&&i(3,c=G)}i(23,u=M[R.indexOf(c)])}c&&[" ","Enter"].includes(a.key)&&(u==null||u.scrollIntoView({behavior:"instant",block:"start"}))}}const $e=()=>{he()},et=()=>{i(5,f=ae>h),re()};function tt(){i(15,ae=window.innerWidth)}const it=()=>i(2,v=!0);function nt(a,F){fe[a?"unshift":"push"](()=>{R[F]=a,i(7,R)})}function ot(a){fe[a?"unshift":"push"](()=>{m=a,i(1,m)})}function lt(a){fe[a?"unshift":"push"](()=>{d=a,i(4,d)})}return t.$$set=a=>{"activeHeading"in a&&i(23,u=a.activeHeading),"activeHeadingScrollOffset"in a&&i(25,l=a.activeHeadingScrollOffset),"activeTocLi"in a&&i(3,c=a.activeTocLi),"aside"in a&&i(4,d=a.aside),"breakpoint"in a&&i(8,h=a.breakpoint),"desktop"in a&&i(5,f=a.desktop),"flashClickedHeadingsFor"in a&&i(26,w=a.flashClickedHeadingsFor),"getHeadingIds"in a&&i(27,y=a.getHeadingIds),"getHeadingLevels"in a&&i(28,p=a.getHeadingLevels),"getHeadingTitles"in a&&i(9,T=a.getHeadingTitles),"headings"in a&&i(0,M=a.headings),"headingSelector"in a&&i(29,D=a.headingSelector),"hide"in a&&i(6,H=a.hide),"autoHide"in a&&i(30,B=a.autoHide),"keepActiveTocItemInView"in a&&i(31,N=a.keepActiveTocItemInView),"minItems"in a&&i(10,_=a.minItems),"nav"in a&&i(1,m=a.nav),"open"in a&&i(2,v=a.open),"openButtonLabel"in a&&i(11,I=a.openButtonLabel),"reactToKeys"in a&&i(32,C=a.reactToKeys),"pageBody"in a&&i(24,g=a.pageBody),"scrollBehavior"in a&&i(33,j=a.scrollBehavior),"title"in a&&i(12,Y=a.title),"titleTag"in a&&i(13,X=a.titleTag),"tocItems"in a&&i(7,R=a.tocItems),"warnOnEmpty"in a&&i(34,Z=a.warnOnEmpty),"blurParams"in a&&i(14,Ce=a.blurParams),"$$scope"in a&&i(35,s=a.$$scope)},t.$$.update=()=>{t.$$.dirty[0]&4&&Xe("open",{open:v}),t.$$.dirty[0]&268435457&&i(16,n=M.map(p)),t.$$.dirty[0]&65536&&i(17,o=Math.min(...n)),t.$$.dirty[0]&33024&&i(5,f=ae>h),t.$$.dirty[0]&6&&v&&m&&(re(),he("instant"))},[M,m,v,c,d,f,H,R,h,T,_,I,Y,X,Ce,ae,n,o,Qe,re,Ze,he,xe,u,g,l,w,y,p,D,B,N,C,j,Z,s,r,$e,et,tt,it,nt,ot,lt]}class St extends te{constructor(e){super(),ie(this,e,Et,Ct,Q,{activeHeading:23,activeHeadingScrollOffset:25,activeTocLi:3,aside:4,breakpoint:8,desktop:5,flashClickedHeadingsFor:26,getHeadingIds:27,getHeadingLevels:28,getHeadingTitles:9,headings:0,headingSelector:29,hide:6,autoHide:30,keepActiveTocItemInView:31,minItems:10,nav:1,open:2,openButtonLabel:11,reactToKeys:32,pageBody:24,scrollBehavior:33,title:12,titleTag:13,tocItems:7,warnOnEmpty:34,blurParams:14},null,[-1,-1])}}function At(t){let e,i,n="×",o,r,s,u,l,c,d=t[3][t[0]].title+"",h,f,w,y,p,T,M,D,H,B,N,_,m,v,I;return y=new St({props:{class:"toc"}}),{c(){e=E("div"),i=E("span"),i.textContent=n,o=V(),r=E("img"),u=V(),l=E("div"),c=E("h1"),h=Te(d),f=V(),w=E("div"),ne(y.$$.fragment),p=V(),T=E("div"),M=E("hr"),D=V(),H=E("div"),B=new ht(!1),this.h()},l(C){e=S(C,"DIV",{class:!0,id:!0});var g=W(e);i=S(g,"SPAN",{class:!0,"data-svelte-h":!0}),q(i)!=="svelte-hhcsdi"&&(i.textContent=n),o=z(g),r=S(g,"IMG",{class:!0,src:!0}),u=z(g),l=S(g,"DIV",{class:!0});var j=W(l);c=S(j,"H1",{class:!0});var Y=W(c);h=Ie(Y,d),Y.forEach(L),f=z(j),w=S(j,"DIV",{class:!0});var X=W(w);oe(y.$$.fragment,X),X.forEach(L),p=z(j),T=S(j,"DIV",{class:!0});var R=W(T);M=S(R,"HR",{}),D=z(R),H=S(R,"DIV",{class:!0});var Z=W(H);B=ft(Z,!1),Z.forEach(L),R.forEach(L),j.forEach(L),g.forEach(L),this.h()},h(){k(i,"class","close svelte-1lf0y8n"),k(r,"class","modal-image svelte-1lf0y8n"),Pe(r.src,s=t[3][t[0]].image)||k(r,"src",s),k(c,"class","svelte-1lf0y8n"),k(w,"class","toc"),B.a=null,k(H,"class","content"),k(T,"class","content-container svelte-1lf0y8n"),k(l,"class","modal-text svelte-1lf0y8n"),k(e,"class",N="modal "+(t[2]?"fade-out":"fade-in")+" svelte-1lf0y8n"),k(e,"id",t[0])},m(C,g){U(C,e,g),b(e,i),b(e,o),b(e,r),b(e,u),b(e,l),b(l,c),b(c,h),b(l,f),b(l,w),le(y,w,null),b(l,p),b(l,T),b(T,M),b(T,D),b(T,H),B.m(t[1],H),m=!0,v||(I=O(i,"click",t[4]),v=!0)},p(C,[g]){(!m||g&1&&!Pe(r.src,s=C[3][C[0]].image))&&k(r,"src",s),(!m||g&1)&&d!==(d=C[3][C[0]].title+"")&&Le(h,d),(!m||g&2)&&B.p(C[1]),(!m||g&4&&N!==(N="modal "+(C[2]?"fade-out":"fade-in")+" svelte-1lf0y8n"))&&k(e,"class",N),(!m||g&1)&&k(e,"id",C[0])},i(C){m||(A(y.$$.fragment,C),C&&ge(()=>{m&&(_||(_=de(e,ze,{duration:300},!0)),_.run(1))}),m=!0)},o(C){P(y.$$.fragment,C),C&&(_||(_=de(e,ze,{duration:300},!1)),_.run(0)),m=!1},d(C){C&&L(e),se(y),C&&_&&_.end(),v=!1,I()}}}function Ht(t){const e=document.createElement("div");e.innerHTML=t;const i=e.querySelectorAll("h2, h3");let n="";return i.forEach((o,r)=>{const s=o.tagName.toLowerCase(),u=o.textContent,l=`section-${r}`;o.id=l;const c=`<li><a href="#${l}"><${s}>${u}</${s}></a></li>`;n+=c}),`<ul>${n}</ul>`}function Mt(t,e,i){let{id:n}=e,{onClose:o}=e,r,s=!1;const u={modal1:{title:"About",content:`
      <p>
          This is my project portfolio from year 9. It took some time to make, but I'm happy with the result. It was developed using Sveltekit (Javascript Framework).
        </p>
        <p>More on Sveltekit here: <a class='fancy' href="https://kit.svelte.dev/">Sveltekit</a></p>
        <p>
          Click on the images to view the content for each section.
        </p>
<style>
  a {
    color:white;
    text-decoration: underline;
  }
  </style>



      `,image:"/about.jpg"},modal2:{title:"Python",content:`
      <h2>Variables</h2>
    <p>Variables are places in memory that can change, they can be assigned using assignment statements ('=' in python) as shown below.</p>
    <pre><code>
x = 13
y = x
    </code></pre>

    <h3>Naming Variables</h3>
    <p>When naming a variable you cannot use the following:</p>
    <ul>
        <li>You cannot start with a number</li>
        <li>You cannot use a reserved word (e.g. int)</li>
        <li>You can only use alphanumeric characters (A-z 0-9)</li>
    </ul>

    <h3>Data Types</h3>
    <p>Each variable has a datatype. The datatypes in python are as below:</p>
    <ul>
        <li><strong>String:</strong> 2 or more characters surrounded by ” or ‘</li>
        <li><strong>Integer:</strong> whole number</li>
        <li><strong>Real:</strong> Number with a decimal part (in python it is float)</li>
        <li><strong>Boolean:</strong> true/false</li>
        <li><strong>Char:</strong> A single character</li>
    </ul>

    <h3>Casting</h3>
    <p>Python automatically assigns data types when defining a variable, although you can manually force it to use a certain data type using the following commands:</p>
    <pre><code>
str()   # forces string datatype
int()   # forces integer datatype
float() # forces real number (floating point) datatype
bool()  # forces boolean datatype
    </code></pre>
    <p>Forcing a datatype is called casting.</p>

    <h3>Strings</h3>
    <p>In python strings are technically immutable (cannot be changed) lists of characters, but we can access individual characters.</p>
    <pre><code>
name = 'Jimmy'
print(name)
print(name[1])
    </code></pre>
    <p>This code outputs:</p>
    <pre><code>i</code></pre>

    <h2>Operators</h2>
    <p>In python we use operators, some of these include:</p>
    <ul>
        <li>+ (addition)</li>
        <li>– (subtraction)</li>
        <li>/ (division)</li>
        <li>* (multiplication)</li>
        <li>% (Modulus – find remainder from division)</li>
        <li>// (Floor division, round down after dividing)</li>
    </ul>
    <p>When doing arithmetic, BIDMAS matters!</p>

    <h2>Inputs</h2>
    <p>A piece of data provided by the user to be used in the program.</p>
    <p>It is used in the structure below:</p>
    <pre><code>variable = input()</code></pre>
    <p>Inputs should always be accompanied by a message (prompt) to the user.</p>
    <pre><code>
print('Enter your name')
name = input()
# or you can do it like this
name = input('Enter your name: ')
    </code></pre>

    <h2>Selection</h2>
    <p>In python, selection is achieved by the if statement.</p>
    <p>Real world example:</p>
    <blockquote>
        Are you good at time management<br>
        If yes: take IB for sixth form<br>
        If no: take A level for sixth form.
    </blockquote>
    <p>In python this can be done as below:</p>
    <pre><code>
name = input('What is your name?')
if name == 'Jimmy':      #condition
    print('Hello Jimmy') # action if condition is true
else:
    print('not Jimmy')   # action if the condition is false
    </code></pre>
    <p>When using selection you use a boolean expression (returns True/False value) to check whether code is run. In python the boolean expressions are:</p>
    <ul>
        <li>==</li>
        <li>&lt;=</li>
        <li>&gt;=</li>
        <li>&lt;</li>
        <li>&gt;</li>
        <li>!=</li>
    </ul>

    <h2>Lists</h2>
    <p>A list in python is a collection of values with a single identifier (These are often called arrays in other languages).</p>
    <pre><code>
Fruits = ['Apple','banana','orange']
Scores = [100,15,61,97]
    </code></pre>
    <p>Each value in an array is an element. The advantages of arrays are that it removes the need for multiple variables, it also allows us as developers to process the values more easily.</p>
    <p>Every element in an array has an index position, these positions always start at 0.</p>
    <p>To add items to an array (list) we use the array.append() command.</p>
    <pre><code>
Fruits.append('Pear')
print('Fruits')
# Before if we printed Fruits we would get:
# ['Apple','banana','orange']
# Now if we print this:
# ['Apple','banana','orange','Pear']
    </code></pre>
    <p>To remove from lists we use the array.remove() command.</p>
    <pre><code>
Fruits.remove('Apple')
# If we print this array we get:
# ['banana','orange','Pear']
    </code></pre>

    <h2>Iteration</h2>
    <p>The process of repeating one or more lines of code – this is accomplished using a loop.</p>
    <p>Examples of repeated actions in technology:</p>
    <ul>
        <li>Sending a Whatsapp message to multiple people in a group</li>
        <li>Updating DNS servers</li>
        <li>Retrieving data from a database</li>
        <li>Updating websockets</li>
        <li>Waiting for data to be received</li>
        <li>Scanning a network</li>
        <li>Multi snap in snapchat</li>
        <li>Repeating animations in a game</li>
        <li>GPS pinging satellites</li>
        <li>Refreshing frames on a screen</li>
        <li>Collaborative team game stats</li>
        <li>Finding images using a search engine</li>
    </ul>

    <h3>Types of Loops</h3>
    <p>A loop is a set of instructions that is repeated until a condition is met. There are two types of loops:</p>
    <ul>
        <li><strong>Condition Controlled</strong> – Repeatedly loops while a condition is true (maximum number of repetitions is infinite)</li>
        <li><strong>Count Controlled</strong> – Repeats a set number of times.</li>
    </ul>

    <h3>Condition Controlled Loops</h3>
    <p>In python the way you do a condition controlled loop is using the while loop function. To use a condition controlled loop you use a While loop. While loops repeatedly execute while the condition is true.</p>
    <pre><code>
name = "" # or name = input()
while name != "Arjun":
    name = input()
    print("Not Arjun, try again")
# This Loop range is 0 to infinite
    </code></pre>
    <p>We use a while loop when we don’t know how many times we need to repeat.</p>

    <h3>Count Controlled Loops</h3>
    <p>A control construct that allows one or more lines of code to be repeatedly executed for a set number of times. – the number of repetitions needs to be known.</p>
    <p>Some examples include:</p>
    <ul>
        <li>Printing group messages</li>
        <li>Syncing changes of a document for multiple people</li>
        <li>Taking inputs for a sequence</li>
        <li>Sending people notifications of a detention</li>
    </ul>
    <p>To use count controlled loops you use a ‘for’ loop.</p>
    <pre><code>
# Syntax of for loops:
for counter in range(0,10):
    print('counter')
# 10 is Up to but not including
# This code runs 10 times.
    </code></pre>
    <p>For Loops containing counters:</p>
    <pre><code>
n = 2
for counter in range(0,30,n):
    print(counter)
# In the code above the variable counter starts at zero and counts up, executing the code while the variable counter is under 30.
# It also uses the range, with the first number being the starting value, the second number being the max value,
# and the final number (3rd) being the increments that counter is increased by (n) in this case that is 2.
    </code></pre>
      `,image:"/Ad01.jpg"},modal3:{title:"HTML",content:`

      <h2>Steps to Connect to a Website</h2>
    <ol>
        <li>You type in a Web address (URL - Uniform Resource Locator) into the address bar in the browser, such as <a href="https://arjun.bond">https://arjun.bond</a></li>
        <li>Once you get the IP address, you connect and then are able to request a page from the Server.</li>
        <li>The server sends the webpage to your computer via the HTTP protocol as HTML code.</li>
        <li>The browser reads the HTML code and renders the page.</li>
    </ol>

    <h2>HTML Basics</h2>
    <p>HTML stands for HyperText Markup Language and it is used for creating webpages.</p>
    <p>A web browser is designed to read HTML and then translate it to the things you can see on the screen.</p>

    <h3>Tags</h3>
    <p>Tags are surrounded by &lt; chevrons &gt;.</p>

    <h3>Boilerplate Code</h3>
    <p>Essential HTML code that all web pages have:</p>
    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
    
    &lt;/head&gt;
    &lt;body&gt;
    
    &lt;/body&gt;
&lt;/html&gt;
    </code></pre>

    <h3>Boilerplate Elements</h3>
    <ul>
        <li>&lt;!DOCTYPE html&gt; is always the first line of an HTML page.</li>
        <li>&lt;html&gt; - tells the browser it is HTML code for the page.</li>
        <li>&lt;head&gt; - contains things that aren't displayed in the main body of your page like the title.</li>
        <li>&lt;body&gt; - contains all the content you want to see displayed.</li>
    </ul>

    <h2>Images and Links</h2>
    <h3>Accessibility</h3>
    <p>Having the ability to access something. Users of IT systems can have a wide range of needs, conditions, or disabilities.</p>
    <ul>
        <li>Use captions in videos.</li>
        <li>Use colors with good contrast.</li>
        <li>Voice recognition.</li>
        <li>Better error messages.</li>
    </ul>

    <h3>Attributes</h3>
    <p>An attribute is an extra piece of information provided in a tag. For example, common image attributes are <code>src</code>, <code>height</code>, and <code>width</code>.</p>
    <p>Pixelation occurs when an image is larger than it should be.</p>

    <h2>CSS - Cascading Style Sheets</h2>
    <p>HTML + CSS: HTML describes the structure of a webpage, then CSS describes the styling (presentation of the page).</p>
    <p>Every time we write CSS, we select the tag we want to work with, say which property we want to adjust, and give it the value we want to assign it.</p>

    <h3>Using CSS in an HTML Page</h3>
    <p>There are 3 options:</p>
    <ol>
        <li>Write the CSS inside of the individual HTML tags.</li>
        <li>Write the CSS styles inside of the <code>&lt;style&gt;&lt;/style&gt;</code> tags in the <code>&lt;head&gt;</code> section of the HTML.</li>
        <li>Create an external CSS file with the styles defined in it and link the HTML page to the CSS file.</li>
    </ol>

    <h2>The DIV Tag</h2>
    <p>The division <code>&lt;div&gt;</code> tag helps us to split the layout of a webpage into sections.</p>
    <p>We can create divisions in our pages by surrounding the blocks with these tags.</p>
    <p>When you group together HTML elements using <code>&lt;div&gt;</code> tags, you can ask CSS to make changes to elements within the DIV.</p>
    <p>We can think of DIVs as a way of breaking our page into boxes or containers. You can also have DIVs inside of DIVs.</p>
      `,image:"/HTML.webp"},modal4:{title:"AI/Emerging Technologies",content:`
      <h2>Autonomous vehicles</h2>
      <h3>Autonomous Vehicles Components</h3>
    <h4>Sensors</h4>
    <ul>
        <li>Lasers</li>
        <li>Radar</li>
        <li>Cameras</li>
        <li>(LiDAR)</li>
        <li>Ultrasonic/IR Sensors at front/rear</li>
    </ul>

    <h3>Properties of Autonomous Vehicles</h3>
    <ul>
        <li>Rounded shape to maximize sensor field of view</li>
        <li>Computer specifically designed for self-driving</li>
        <li>Back up systems for steering, braking, computing, and more</li>
        <li>Electric batteries to power the vehicles</li>
    </ul>

    <h2>Technology Explained</h2>
    <h3>AutoPilot</h3>
    <p>To assist the driver.</p>

    <h3>Anti-Lock Brakes</h3>
    <p>Warns or takes action in case of danger, and applies the brake automatically.</p>

    <h3>Adaptive Cruise Control</h3>
    <p>Keeps the vehicle at a safe distance behind cars ahead of it.</p>

    <h3>Lane Departure Warning System</h3>
    <p>Warns if you are leaving a lane.</p>

    <h3>Intelligent Parking</h3>
    <p>Parks automatically and uses parking sensors.</p>

    <h3>Blind Spot Monitoring</h3>
    <p>Checks the blind spot.</p>

    <h2>Artificial Intelligence</h2>
    <h3>What is AI?</h3>
    <p>Ai is a piece of software that takes an input, and produces an output based on many different factors</p>
    <h4>Types of AI</h4>
    <ul>
      <li>Narrow AI - AI that is designed for a specific task, examples include LLMs (Large Language Models)</li>
      <li>General AI - AI that can perform any intellectual task that a human can do</li>
      </ul>
    <p>Every year, computers become:</p>
    <ul>
        <li>Faster</li>
        <li>Smaller</li>
        <li>Able to store more data</li>
        <li>Better connected</li>
    </ul>
    <p>AI is used in many things, even currently, here are some examples:</p>
    <ul>
        <li>Travel (such as Google Maps)</li>
        <li>Entertainment - Personalised Video Recommendations, such as on platforms like YouTube</li>
        <li>Healthcare - AI can be used to diagnose diseases</li>
        <li>Finance - AI can be used to predict stock prices</li>
        <li>Education - AI can be used to personalise learning</li>
        <li>Security - AI can be used to detect malware</li>
        </ul>
    <h2>Crypto Currencies</h2>
    <h3>Distributed Ledgers</h3>
    <ul>
        <li><strong>Ledger:</strong> a database/record of all transactions.</li>
        <li><strong>Distributed ledger:</strong> multiple parties have a copy of the ledger.
            <ul>
                <li>If 50%+ agree on ledger contents, it's trustworthy.</li>
            </ul>
        </li>
    </ul>
    <h3>Blockchain</h3>
    <p>A system where a record of transactions are maintained across computers in a peer to peer network.  </p>
    <h4>Three benefits of blockchain:</h4>
    <ol>
      <li>More trust, as everyone can check transactions</li>
      <li>Transparent, as the ledger is public and accessible to anyone</li>
      <li>More Secure, as everyone can check transactions and the ledger is public</li>
    </ol>
    <h4>Three drawbacks of blockchain:</h4>
    <ol>
      <li>Slow, as every transaction needs to be verified by multiple computers</li>
      <li>Expensive, as the computers need to be paid for their work</li>
      <li>Not private, as everyone can see the transactions</li>
    </ol>
    <h4>Uses of the blockchain:</h4>
    <ol>
      <li>Voting - If election process is put on blockchain, run by multiple parties, it can prevent corruption, as it is more difficult to manipulate the results.</li>
      <li>Distributed Asset Trading - easily authenticating transactions, instead of much paper.</li>
      <li>Smart Contracts - enforcing a contract via the blockchain.</li>
    </ol>

    <p>for more info on cryptocurrencies watch <a href='https://www.youtube.com/watch?v=rYQgy8QDEBI'>this video</a></p>
    <iframe  src="https://www.youtube.com/embed/rYQgy8QDEBI?si=SHbXdFJN_g3gVSd6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <style>
      a {
        color:white;
        text-decoration: underline;
      }
      iframe {
        width: 75%;
        height: auto;
        aspect-ratio: 16/9;
      }
      `,image:"/AiEmer.jpg"},modal5:{title:"Amazon Technologies Project",content:`
      <h1>Amazon Prime Chat</h1>

<h2>What is it?</h2>
<ul>
    <li>Amazon Prime Chat is an AI chatbot that allows all customers and employees easy access to all things Amazon related.</li>
    <li>Employees such as customer support employees can use it to give quicker assistance to people.</li>
    <li>Employees such as technical support can use it to diagnose and fix issues.</li>
    <li>Customers can use it to find a specific product, or to help them decide what product to purchase.</li>
</ul>

<h2>The Product</h2>
<ul>
    <li>The chatbot consists of a custom model, which is based upon GPT-4 from OpenAI, although this model can also be made in-house.</li>
    <li>The product will be hosted on a section of amazon.com, as well as a custom model in an intranet for employees.</li>
    <li>The backend can be hosted on AWS, but can also be offloaded to Google Cloud Platform or Microsoft Azure.</li>
</ul>

<h2>Cost</h2>
<ul>
    <li>The chatbot will be available to everyone, and therefore free, although Prime subscribers can have more functionality such as order tracking and summaries of recent activity on the first launch/visit.</li>
    <li>The cost of the custom model will be around £600,000 per annum (if using OpenAI custom model).</li>
    <li>Otherwise, the cost will be greater, possibly up to £50 million.</li>
    <li>This product is free, although it will make money by logging user activity and selling products at a marginally higher price.</li>
</ul>

<h2>What does it look like?</h2>
<img src='/Primechat.jpg' alt='Amazon Prime Chat' style='width: 50%%;'>

<h2>How this will benefit Amazon</h2>
<ul>
    <li>Since Amazon makes many transactions, this AI can help users make more due to the suggestion of products.</li>
    <li>It can also recommend more relevant products than the current algorithm.</li>
    <li>It will help support staff provide support, therefore retaining more customers who will pay.</li>
    <li>It will help technical staff help other staff, or to debug issues and resolve them, leading to more productive time or uptime, which will result in more money made.</li>
</ul>

<h2>Development Time</h2>
<h3>OpenAI Custom Model</h3>
<ul>
    <li>Model Training: 1 year</li>
    <li>Testing: 2 months</li>
    <li>Total: 1 year 2 months</li>
</ul>

<h3>In-house Model</h3>
<ul>
    <li>Infrastructure: 4 months</li>
    <li>R&D: 2 years</li>
    <li>Development: 1 year</li>
    <li>Testing: 2 months</li>
    <li>Total: 3 years, 6 months</li>
</ul>
<a href="https://www.arjun.bond/wp-content/uploads/2024/05/Amazon-Prime-Chat-1.pdf" download="" target="__blank"><p>To get the information above in a pdf, click here</p></a>
<style>
  a {
    color:white;
    text-decoration: underline;
  }
  @media (max-width: 600px) {
  img {
    width: 100%;
    height: auto;
  }
}
  </style>
      `,image:"/amazon.jpeg"}};ve(()=>{i(1,r=u[n].content),Ht(r)});function l(){i(2,s=!0),setTimeout(()=>{typeof o=="function"&&o(),i(2,s=!1)},1)}return t.$$set=c=>{"id"in c&&i(0,n=c.id),"onClose"in c&&i(5,o=c.onClose)},[n,r,s,u,l,o]}class Dt extends te{constructor(e){super(),ie(this,e,Mt,At,Q,{id:0,onClose:5})}}function Pt(t){let e,i,n="How to Use the Site",o,r,s="<li><p>This site uses scrolling to move between cards.</p></li> <li><p>To move the cards left or right, use the scroll wheel on your mouse.</p></li> <li><p>To see information about the topic on a card, click on it.</p></li> <li><p>At the top of each card, there is a table of contents, click on a section to scroll there.</p></li> <li><p>To close the card press the &#39;x&#39; in the top right corner</p></li> <li><p>If you cannot scroll please make sure Javascript is enabled in your browser</p></li>",u,l,c="Click the button below to dismiss this message, it will not be shown again.",d,h,f="Got it!",w,y;return{c(){e=E("div"),i=E("h1"),i.textContent=n,o=V(),r=E("ul"),r.innerHTML=s,u=V(),l=E("p"),l.textContent=c,d=V(),h=E("button"),h.textContent=f,this.h()},l(p){e=S(p,"DIV",{class:!0});var T=W(e);i=S(T,"H1",{"data-svelte-h":!0}),q(i)!=="svelte-yqkvhw"&&(i.textContent=n),o=z(T),r=S(T,"UL",{"data-svelte-h":!0}),q(r)!=="svelte-1ffsoj2"&&(r.innerHTML=s),u=z(T),l=S(T,"P",{"data-svelte-h":!0}),q(l)!=="svelte-1sq99no"&&(l.textContent=c),d=z(T),h=S(T,"BUTTON",{class:!0,"data-svelte-h":!0}),q(h)!=="svelte-zzef9w"&&(h.textContent=f),T.forEach(L),this.h()},h(){k(h,"class","svelte-laq1tm"),k(e,"class","instruction-card svelte-laq1tm")},m(p,T){U(p,e,T),b(e,i),b(e,o),b(e,r),b(e,u),b(e,l),b(e,d),b(e,h),w||(y=O(h,"click",t[0]),w=!0)},p:K,i:K,o:K,d(p){p&&L(e),w=!1,y()}}}function Bt(t){const e=Ke();function i(){e("dismiss")}return[i]}class jt extends te{constructor(e){super(),ie(this,e,Bt,Pt,Q,{})}}function Ge(t){let e,i;return e=new jt({}),e.$on("dismiss",t[3]),{c(){ne(e.$$.fragment)},l(n){oe(e.$$.fragment,n)},m(n,o){le(e,n,o),i=!0},p:K,i(n){i||(A(e.$$.fragment,n),i=!0)},o(n){P(e.$$.fragment,n),i=!1},d(n){se(e,n)}}}function Je(t){let e,i;return e=new Dt({props:{id:t[2],onClose:t[5]}}),{c(){ne(e.$$.fragment)},l(n){oe(e.$$.fragment,n)},m(n,o){le(e,n,o),i=!0},p(n,o){const r={};o&4&&(r.id=n[2]),e.$set(r)},i(n){i||(A(e.$$.fragment,n),i=!0)},o(n){P(e.$$.fragment,n),i=!1},d(n){se(e,n)}}}function Vt(t){let e,i,n,o='<img class="image" src="/about.jpg" draggable="false" data-active=""/> <div class="text-overlay svelte-1sh12nl">About</div>',r,s,u='<img class="image" src="/Ad01.jpg" draggable="false" data-active=""/> <div class="text-overlay svelte-1sh12nl">Python</div>',l,c,d='<img class="image darker svelte-1sh12nl" src="/HTML.webp" draggable="false" data-active=""/> <div class="text-overlay svelte-1sh12nl">HTML</div>',h,f,w='<img class="image" src="/AiEmer.jpg" draggable="false" data-active=""/> <div class="text-overlay svelte-1sh12nl">AI/Emerging Technologies</div>',y,p,T='<img class="image darker svelte-1sh12nl" src="/amazon.jpeg" draggable="false" data-active=""/> <div class="text-overlay svelte-1sh12nl">Amazon Technologies Project</div>',M,D,H,B,N,_=t[0]&&Ge(t),m=t[1]&&Je(t);return{c(){e=E("div"),_&&_.c(),i=V(),n=E("div"),n.innerHTML=o,r=V(),s=E("div"),s.innerHTML=u,l=V(),c=E("div"),c.innerHTML=d,h=V(),f=E("div"),f.innerHTML=w,y=V(),p=E("div"),p.innerHTML=T,M=V(),m&&m.c(),D=ue(),this.h()},l(v){e=S(v,"DIV",{id:!0});var I=W(e);_&&_.l(I),i=z(I),n=S(I,"DIV",{class:!0,"data-svelte-h":!0}),q(n)!=="svelte-61tqd3"&&(n.innerHTML=o),r=z(I),s=S(I,"DIV",{class:!0,"data-svelte-h":!0}),q(s)!=="svelte-9bcppm"&&(s.innerHTML=u),l=z(I),c=S(I,"DIV",{class:!0,"data-svelte-h":!0}),q(c)!=="svelte-t3cmh"&&(c.innerHTML=d),h=z(I),f=S(I,"DIV",{class:!0,"data-svelte-h":!0}),q(f)!=="svelte-vrguxo"&&(f.innerHTML=w),y=z(I),p=S(I,"DIV",{class:!0,"data-svelte-h":!0}),q(p)!=="svelte-1ftjppe"&&(p.innerHTML=T),I.forEach(L),M=z(v),m&&m.l(v),D=ue(),this.h()},h(){k(n,"class","image-container"),k(s,"class","image-container"),k(c,"class","image-container "),k(f,"class","image-container"),k(p,"class","image-container"),k(e,"id","image-track")},m(v,I){U(v,e,I),_&&_.m(e,null),b(e,i),b(e,n),b(e,r),b(e,s),b(e,l),b(e,c),b(e,h),b(e,f),b(e,y),b(e,p),U(v,M,I),m&&m.m(v,I),U(v,D,I),H=!0,B||(N=[O(n,"click",t[6]),O(s,"click",t[7]),O(c,"click",t[8]),O(f,"click",t[9]),O(p,"click",t[10])],B=!0)},p(v,[I]){v[0]?_?(_.p(v,I),I&1&&A(_,1)):(_=Ge(v),_.c(),A(_,1),_.m(e,i)):_&&($(),P(_,1,1,()=>{_=null}),ee()),v[1]?m?(m.p(v,I),I&2&&A(m,1)):(m=Je(v),m.c(),A(m,1),m.m(D.parentNode,D)):m&&($(),P(m,1,1,()=>{m=null}),ee())},i(v){H||(A(_),A(m),H=!0)},o(v){P(_),P(m),H=!1},d(v){v&&(L(e),L(M),L(D)),_&&_.d(),m&&m.d(v),B=!1,we(N)}}}let zt=.01,Wt=.2;function Ot(t,e,i){let n=!0,o=!1,r,s,u=!1,l=0,c=-10,d=!1;const h=typeof window<"u";function f(){localStorage.setItem("instructionsDismissed","true"),i(0,n=!1)}function w(g){i(1,o=!0),i(2,r=g),Be(`#${g}`,{replaceState:!0})}function y(){i(1,o=!1),i(2,r=null),Be("/",{replaceState:!0})}function p(g){o||(u=!0,l=g.clientX)}function T(g){if(u&&!o&&!d){const j=l-g.clientX,Y=window.innerWidth/2;c=Math.max(Math.min(c+j/Y*-100*zt,-10),-100),N()}}function M(){d=window.innerWidth<=600,d?(B(-50),window.removeEventListener("mousedown",p),window.removeEventListener("mousemove",T),window.removeEventListener("mouseup",D),window.removeEventListener("wheel",H)):(B(-10),window.addEventListener("mousedown",p),window.addEventListener("mousemove",T),window.addEventListener("mouseup",D),window.addEventListener("wheel",H,{passive:!1}))}function D(){u=!1}function H(g){if(!o&&!d){const Y=(g.deltaY||g.detail||g.wheelDelta)*Wt,X=window.innerHeight/2;c=Math.max(Math.min(c+Y/X*-100,-10),-100),N(),g.preventDefault()}}function B(g){console.log(g),s.style.transform=`translate(${g}%, -50%)`;for(const j of s.getElementsByClassName("image"))j.style.objectPosition="90% center"}function N(){s.style.transform=`translate(${c}%, -50%)`;for(const g of s.getElementsByClassName("image"))g.style.objectPosition=`${100+c}% center`}if(h){let g=function(){i(1,o=!1),i(2,r=null)};ve(()=>{const j=localStorage.getItem("instructionsDismissed");i(0,n=!j),s=document.getElementById("image-track"),M(),d?(window.removeEventListener("mousedown",p),window.removeEventListener("mousemove",T),window.removeEventListener("mouseup",D),window.removeEventListener("wheel",H)):(window.addEventListener("mousedown",p),window.addEventListener("mousemove",T),window.addEventListener("mouseup",D),window.addEventListener("wheel",H,{passive:!1})),window.addEventListener("popstate",g),window.addEventListener("resize",M)}),mt(()=>{window.removeEventListener("mousedown",p),window.removeEventListener("mousemove",T),window.removeEventListener("mouseup",D),window.removeEventListener("wheel",H),window.removeEventListener("popstate",g),window.removeEventListener("resize",M)})}return[n,o,r,f,w,y,()=>w("modal1"),()=>w("modal2"),()=>w("modal3"),()=>w("modal4"),()=>w("modal5")]}class Nt extends te{constructor(e){super(),ie(this,e,Ot,Vt,Q,{})}}function Ut(t){let e,i;return e=new Nt({}),{c(){ne(e.$$.fragment)},l(n){oe(e.$$.fragment,n)},m(n,o){le(e,n,o),i=!0},p:K,i(n){i||(A(e.$$.fragment,n),i=!0)},o(n){P(e.$$.fragment,n),i=!1},d(n){se(e,n)}}}class Yt extends te{constructor(e){super(),ie(this,e,null,Ut,Q,{})}}export{Yt as component};
