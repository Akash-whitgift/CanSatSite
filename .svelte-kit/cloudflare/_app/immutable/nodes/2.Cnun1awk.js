import{G as at,S as rt,s as ee,T as we,U as Me,V as Se,f as N,i as y,v as L,W as De,k as R,l as g,n as $,X as je,E as be,e as E,b as j,d as T,j as A,Y as x,Z as W,C as ke,_ as Ze,r as he,c as pe,$ as ct,a0 as ft,u as Le,g as Ee,a as Te,a1 as ut,p as de,w as ue,D as Ae,x as ge,t as He,h as ye,a2 as dt,m as Ie,a3 as mt,a4 as K,a5 as ht,a6 as Be,a7 as _t}from"../chunks/scheduler.5rEqcWWW.js";import{S as ie,i as se,t as S,g as ne,a as z,c as le,b as oe,d as ae,m as re,e as ce,f as me}from"../chunks/index.3m18Cu60.js";import{g as Ve}from"../chunks/entry.xbmA0_Ly.js";function Oe(t){return(t==null?void 0:t.length)!==void 0?t:Array.from(t)}function gt(t,e){const n={},l={},i={$$scope:1};let a=t.length;for(;a--;){const s=t[a],f=e[a];if(f){for(const o in s)o in f||(l[o]=1);for(const o in f)i[o]||(n[o]=f[o],i[o]=1);t[a]=f}else for(const o in s)i[o]=1}for(const s in l)s in n||(n[s]=void 0);return n}function vt(t){return t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1}function ze(t,{delay:e=0,duration:n=400,easing:l=vt,amount:i=5,opacity:a=0}={}){const s=getComputedStyle(t),f=+s.opacity,o=s.filter==="none"?"":s.filter,c=f*(1-a),[u,d]=rt(i);return{delay:e,duration:n,easing:l,css:(m,b)=>`opacity: ${f-c*b}; filter: ${o} blur(${b*u}${d});`}}function qe(t,{delay:e=0,duration:n=400,easing:l=at}={}){const i=+getComputedStyle(t).opacity;return{delay:e,duration:n,easing:l,css:a=>`opacity: ${a*i}`}}function wt(t){let e,n,l=[t[0],{viewBox:"0 0 20 20"},{fill:"currentColor"}],i={};for(let a=0;a<l.length;a+=1)i=we(i,l[a]);return{c(){e=Me("svg"),n=Me("path"),this.h()},l(a){e=Se(a,"svg",{viewBox:!0,fill:!0});var s=N(e);n=Se(s,"path",{d:!0}),N(n).forEach(y),s.forEach(y),this.h()},h(){L(n,"d","M3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1z"),De(e,i)},m(a,s){R(a,e,s),g(e,n)},p(a,[s]){De(e,i=gt(l,[s&1&&a[0],{viewBox:"0 0 20 20"},{fill:"currentColor"}]))},i:$,o:$,d(a){a&&y(e)}}}function bt(t,e,n){return t.$$set=l=>{n(0,e=we(we({},e),je(l)))},e=je(e),[e]}class kt extends ie{constructor(e){super(),se(this,e,bt,wt,ee,{})}}function Pe(t,e,n){const l=t.slice();return l[46]=e[n],l[47]=e,l[48]=n,l}const pt=t=>({heading:t[0]&1}),Ne=t=>({heading:t[46],idx:t[48]}),Lt=t=>({}),Ue=t=>({}),Et=t=>({}),Fe=t=>({});function Ke(t){let e,n,l,i;const a=t[36]["open-toc-icon"],s=pe(a,t,t[35],Fe),f=s||Tt();return{c(){e=E("button"),f&&f.c(),this.h()},l(o){e=T(o,"BUTTON",{"aria-label":!0,class:!0});var c=N(e);f&&f.l(c),c.forEach(y),this.h()},h(){L(e,"aria-label",t[11]),L(e,"class","svelte-j30iej")},m(o,c){R(o,e,c),f&&f.m(e,null),n=!0,l||(i=W(e,"click",ct(ft(t[40]))),l=!0)},p(o,c){s&&s.p&&(!n||c[1]&16)&&Le(s,a,o,o[35],n?Te(a,o[35],c,Et):Ee(o[35]),Fe),(!n||c[0]&2048)&&L(e,"aria-label",o[11])},i(o){n||(S(f,o),n=!0)},o(o){z(f,o),n=!1},d(o){o&&y(e),f&&f.d(o),l=!1,i()}}}function Tt(t){let e,n;return e=new kt({props:{width:"1em"}}),{c(){oe(e.$$.fragment)},l(l){ae(e.$$.fragment,l)},m(l,i){re(e,l,i),n=!0},p:$,i(l){n||(S(e.$$.fragment,l),n=!0)},o(l){z(e.$$.fragment,l),n=!1},d(l){ce(e,l)}}}function We(t){let e,n,l,i,a,s=t[12]&&Xe(t),f=Oe(t[0]),o=[];for(let u=0;u<f.length;u+=1)o[u]=Ge(Pe(t,f,u));const c=u=>z(o[u],1,1,()=>{o[u]=null});return{c(){e=E("nav"),s&&s.c(),n=j(),l=E("ol");for(let u=0;u<o.length;u+=1)o[u].c();this.h()},l(u){e=T(u,"NAV",{class:!0});var d=N(e);s&&s.l(d),n=A(d),l=T(d,"OL",{class:!0});var m=N(l);for(let b=0;b<o.length;b+=1)o[b].l(m);m.forEach(y),d.forEach(y),this.h()},h(){L(l,"class","svelte-j30iej"),L(e,"class","svelte-j30iej")},m(u,d){R(u,e,d),s&&s.m(e,null),g(e,n),g(e,l);for(let m=0;m<o.length;m+=1)o[m]&&o[m].m(l,null);t[42](e),a=!0},p(u,d){if(t=u,t[12]?s?(s.p(t,d),d[0]&4096&&S(s,1)):(s=Xe(t),s.c(),S(s,1),s.m(e,n)):s&&(ne(),z(s,1,1,()=>{s=null}),le()),d[0]&1245833|d[1]&16){f=Oe(t[0]);let m;for(m=0;m<f.length;m+=1){const b=Pe(t,f,m);o[m]?(o[m].p(b,d),S(o[m],1)):(o[m]=Ge(b),o[m].c(),S(o[m],1),o[m].m(l,null))}for(ne(),m=f.length;m<o.length;m+=1)c(m);le()}},i(u){if(!a){S(s);for(let d=0;d<f.length;d+=1)S(o[d]);u&&be(()=>{a&&(i||(i=me(e,ze,t[14],!0)),i.run(1))}),a=!0}},o(u){z(s),o=o.filter(Boolean);for(let d=0;d<o.length;d+=1)z(o[d]);u&&(i||(i=me(e,ze,t[14],!1)),i.run(0)),a=!1},d(u){u&&y(e),s&&s.d(),ut(o,u),t[42](null),u&&i&&i.end()}}}function Xe(t){let e;const n=t[36].title,l=pe(n,t,t[35],Ue),i=l||Ht(t);return{c(){i&&i.c()},l(a){i&&i.l(a)},m(a,s){i&&i.m(a,s),e=!0},p(a,s){l?l.p&&(!e||s[1]&16)&&Le(l,n,a,a[35],e?Te(n,a[35],s,Lt):Ee(a[35]),Ue):i&&i.p&&(!e||s[0]&12288)&&i.p(a,e?s:[-1,-1])},i(a){e||(S(i,a),e=!0)},o(a){z(i,a),e=!1},d(a){i&&i.d(a)}}}function ve(t){let e,n;return{c(){e=E(t[13]),n=He(t[12]),this.h()},l(l){e=T(l,(t[13]||"null").toUpperCase(),{class:!0});var i=N(e);n=ye(i,t[12]),i.forEach(y),this.h()},h(){dt(t[13])(e,{class:"toc-title toc-exclude svelte-j30iej"})},m(l,i){R(l,e,i),g(e,n)},p(l,i){i[0]&4096&&Ie(n,l[12])},d(l){l&&y(e)}}}function Ht(t){let e=t[13],n,l=t[13]&&ve(t);return{c(){l&&l.c(),n=de()},l(i){l&&l.l(i),n=de()},m(i,a){l&&l.m(i,a),R(i,n,a)},p(i,a){i[13]?e?ee(e,i[13])?(l.d(1),l=ve(i),e=i[13],l.c(),l.m(n.parentNode,n)):l.p(i,a):(l=ve(i),e=i[13],l.c(),l.m(n.parentNode,n)):e&&(l.d(1),l=null,e=i[13])},d(i){i&&y(n),l&&l.d(i)}}}function yt(t){let e=t[9](t[46])+"",n;return{c(){n=He(e)},l(l){n=ye(l,e)},m(l,i){R(l,n,i)},p(l,i){i[0]&513&&e!==(e=l[9](l[46])+"")&&Ie(n,e)},d(l){l&&y(n)}}}function Ge(t){let e,n,l=t[48],i=`0 0 0 ${t[16][t[48]]-t[17]}em`,a=`${2-.2*(t[16][t[48]]-t[17])}ex`,s,f,o;const c=t[36]["toc-item"],u=pe(c,t,t[35],Ne),d=u||yt(t),m=()=>t[41](e,l),b=()=>t[41](null,l);return{c(){e=E("li"),d&&d.c(),n=j(),this.h()},l(H){e=T(H,"LI",{role:!0,class:!0});var w=N(e);d&&d.l(w),n=A(w),w.forEach(y),this.h()},h(){L(e,"role","menuitem"),L(e,"class","svelte-j30iej"),x(e,"active",t[3]===t[7][t[48]]),ue(e,"margin",i),ue(e,"font-size",a)},m(H,w){R(H,e,w),d&&d.m(e,null),g(e,n),m(),s=!0,f||(o=[W(e,"click",function(){Ae(t[20](t[46]))&&t[20](t[46]).apply(this,arguments)}),W(e,"keyup",function(){Ae(t[20](t[46]))&&t[20](t[46]).apply(this,arguments)})],f=!0)},p(H,w){t=H,u?u.p&&(!s||w[0]&1|w[1]&16)&&Le(u,c,t,t[35],s?Te(c,t[35],w,pt):Ee(t[35]),Ne):d&&d.p&&(!s||w[0]&513)&&d.p(t,s?w:[-1,-1]),l!==t[48]&&(b(),l=t[48],m()),(!s||w[0]&136)&&x(e,"active",t[3]===t[7][t[48]]),w[0]&196608&&i!==(i=`0 0 0 ${t[16][t[48]]-t[17]}em`)&&ue(e,"margin",i),w[0]&196608&&a!==(a=`${2-.2*(t[16][t[48]]-t[17])}ex`)&&ue(e,"font-size",a)},i(H){s||(S(d,H),s=!0)},o(H){z(d,H),s=!1},d(H){H&&y(e),d&&d.d(H),b(),f=!1,ke(o)}}}function It(t){let e,n,l,i,a;be(t[39]);let s=!t[2]&&!t[5]&&t[0].length>=t[10]&&Ke(t),f=(t[2]||t[5]&&t[0].length>=t[10])&&We(t);return{c(){e=E("aside"),s&&s.c(),n=j(),f&&f.c(),this.h()},l(o){e=T(o,"ASIDE",{class:!0,"aria-hidden":!0});var c=N(e);s&&s.l(c),n=A(c),f&&f.l(c),c.forEach(y),this.h()},h(){L(e,"class","toc svelte-j30iej"),e.hidden=t[6],L(e,"aria-hidden",t[6]),x(e,"desktop",t[5]),x(e,"hidden",t[6]),x(e,"mobile",!t[5])},m(o,c){R(o,e,c),s&&s.m(e,null),g(e,n),f&&f.m(e,null),t[43](e),l=!0,i||(a=[W(window,"scroll",t[19]),W(window,"click",t[18]),W(window,"scrollend",t[37]),W(window,"resize",t[38]),W(window,"keydown",t[22]),W(window,"resize",t[39])],i=!0)},p(o,c){!o[2]&&!o[5]&&o[0].length>=o[10]?s?(s.p(o,c),c[0]&1061&&S(s,1)):(s=Ke(o),s.c(),S(s,1),s.m(e,n)):s&&(ne(),z(s,1,1,()=>{s=null}),le()),o[2]||o[5]&&o[0].length>=o[10]?f?(f.p(o,c),c[0]&1061&&S(f,1)):(f=We(o),f.c(),S(f,1),f.m(e,null)):f&&(ne(),z(f,1,1,()=>{f=null}),le()),(!l||c[0]&64)&&(e.hidden=o[6]),(!l||c[0]&64)&&L(e,"aria-hidden",o[6]),(!l||c[0]&32)&&x(e,"desktop",o[5]),(!l||c[0]&64)&&x(e,"hidden",o[6]),(!l||c[0]&32)&&x(e,"mobile",!o[5])},i(o){l||(S(s),S(f),l=!0)},o(o){z(s),z(f),l=!1},d(o){o&&y(e),s&&s.d(),f&&f.d(),t[43](null),i=!1,ke(a)}}}function Ct(t,e,n){let l,i,{$$slots:a={},$$scope:s}=e,{activeHeading:f=null}=e,{activeHeadingScrollOffset:o=100}=e,{activeTocLi:c=null}=e,{aside:u=void 0}=e,{breakpoint:d=1e3}=e,{desktop:m=!0}=e,{flashClickedHeadingsFor:b=1500}=e,{getHeadingIds:H=r=>r.id}=e,{getHeadingLevels:w=r=>Number(r.nodeName[1])}=e,{getHeadingTitles:B=r=>r.textContent??""}=e,{headings:I=[]}=e,{headingSelector:D=":is(h2, h3, h4):not(.toc-exclude)"}=e,{hide:M=!1}=e,{autoHide:V=!0}=e,{keepActiveTocItemInView:q=!0}=e,{minItems:p=0}=e,{nav:_=void 0}=e,{open:v=!1}=e,{openButtonLabel:k="Open table of contents"}=e,{reactToKeys:Z=["ArrowDown","ArrowUp"," ","Enter","Escape","Tab"]}=e,{pageBody:h="body"}=e,{scrollBehavior:C="smooth"}=e,{title:U="On this page"}=e,{titleTag:X="h2"}=e,{tocItems:Y=[]}=e,{warnOnEmpty:O=!0}=e,{blurParams:G={duration:200}}=e,P;const F=Ze();function Qe(r){u!=null&&u.contains(r.target)||n(2,v=!1)}function Ce(){typeof document>"u"||(n(0,I=[...document.querySelectorAll(D)]),fe(),I.length===0?(O&&console.warn(`svelte-toc found no headings for headingSelector='${D}'. ${V?"Hiding":"Showing empty"} table of contents.`),V&&n(6,M=!0)):M&&V&&n(6,M=!1))}Ce(),he(()=>{if(typeof h=="string"&&(n(24,h=document.querySelector(h)),!h))throw new Error(`Could not find page body element: ${h}`);const r=new MutationObserver(Ce);return r.observe(h,{childList:!0,subtree:!0}),()=>r.disconnect()});function fe(){let r=I.length;for(;r--;){const{top:J}=I[r].getBoundingClientRect();if(J<o||r===0){n(23,f=I[r]),n(3,c=Y[r]);return}}}const xe=r=>J=>{var Q;if(J instanceof KeyboardEvent&&!["Enter"," "].includes(J.key))return;n(2,v=!1),(Q=r.scrollIntoView)==null||Q.call(r,{behavior:C,block:"start"});const te=H&&H(r);te&&history.replaceState({},"",`#${te}`),b&&(r.classList.add("toc-clicked"),setTimeout(()=>r.classList.remove("toc-clicked"),b))};function _e(r="smooth"){var J;if(q&&c&&_){const te=(c==null?void 0:c.offsetTop)-_.offsetHeight/2;(J=_==null?void 0:_.scrollTo)==null||J.call(_,{top:te,behavior:r})}}function $e(r){if(!Z||!Z.includes(r.key))return;const J=[...document.querySelectorAll(":hover")].at(-1),te=J&&(_==null?void 0:_.contains(J));if(!(r.key==="Tab"&&!(_!=null&&_.contains(document.activeElement))||!m&&!v||m&&!te)){if(r.preventDefault(),r.key==="Escape"&&v)n(2,v=!1);else if(r.key==="Tab"&&!(u!=null&&u.contains(document.activeElement)))n(2,v=!1);else if(c){if(r.key==="ArrowDown"){const Q=c.nextElementSibling;Q&&n(3,c=Q)}if(r.key==="ArrowUp"){const Q=c.previousElementSibling;Q&&n(3,c=Q)}n(23,f=I[Y.indexOf(c)])}c&&[" ","Enter"].includes(r.key)&&(f==null||f.scrollIntoView({behavior:"instant",block:"start"}))}}const et=()=>{_e()},tt=()=>{n(5,m=P>d),fe()};function nt(){n(15,P=window.innerWidth)}const lt=()=>n(2,v=!0);function it(r,J){ge[r?"unshift":"push"](()=>{Y[J]=r,n(7,Y)})}function st(r){ge[r?"unshift":"push"](()=>{_=r,n(1,_)})}function ot(r){ge[r?"unshift":"push"](()=>{u=r,n(4,u)})}return t.$$set=r=>{"activeHeading"in r&&n(23,f=r.activeHeading),"activeHeadingScrollOffset"in r&&n(25,o=r.activeHeadingScrollOffset),"activeTocLi"in r&&n(3,c=r.activeTocLi),"aside"in r&&n(4,u=r.aside),"breakpoint"in r&&n(8,d=r.breakpoint),"desktop"in r&&n(5,m=r.desktop),"flashClickedHeadingsFor"in r&&n(26,b=r.flashClickedHeadingsFor),"getHeadingIds"in r&&n(27,H=r.getHeadingIds),"getHeadingLevels"in r&&n(28,w=r.getHeadingLevels),"getHeadingTitles"in r&&n(9,B=r.getHeadingTitles),"headings"in r&&n(0,I=r.headings),"headingSelector"in r&&n(29,D=r.headingSelector),"hide"in r&&n(6,M=r.hide),"autoHide"in r&&n(30,V=r.autoHide),"keepActiveTocItemInView"in r&&n(31,q=r.keepActiveTocItemInView),"minItems"in r&&n(10,p=r.minItems),"nav"in r&&n(1,_=r.nav),"open"in r&&n(2,v=r.open),"openButtonLabel"in r&&n(11,k=r.openButtonLabel),"reactToKeys"in r&&n(32,Z=r.reactToKeys),"pageBody"in r&&n(24,h=r.pageBody),"scrollBehavior"in r&&n(33,C=r.scrollBehavior),"title"in r&&n(12,U=r.title),"titleTag"in r&&n(13,X=r.titleTag),"tocItems"in r&&n(7,Y=r.tocItems),"warnOnEmpty"in r&&n(34,O=r.warnOnEmpty),"blurParams"in r&&n(14,G=r.blurParams),"$$scope"in r&&n(35,s=r.$$scope)},t.$$.update=()=>{t.$$.dirty[0]&4&&F("open",{open:v}),t.$$.dirty[0]&268435457&&n(16,l=I.map(w)),t.$$.dirty[0]&65536&&n(17,i=Math.min(...l)),t.$$.dirty[0]&33024&&n(5,m=P>d),t.$$.dirty[0]&6&&v&&_&&(fe(),_e("instant"))},[I,_,v,c,u,m,M,Y,d,B,p,k,U,X,G,P,l,i,Qe,fe,xe,_e,$e,f,h,o,b,H,w,D,V,q,Z,C,O,s,a,et,tt,nt,lt,it,st,ot]}class Mt extends ie{constructor(e){super(),se(this,e,Ct,It,ee,{activeHeading:23,activeHeadingScrollOffset:25,activeTocLi:3,aside:4,breakpoint:8,desktop:5,flashClickedHeadingsFor:26,getHeadingIds:27,getHeadingLevels:28,getHeadingTitles:9,headings:0,headingSelector:29,hide:6,autoHide:30,keepActiveTocItemInView:31,minItems:10,nav:1,open:2,openButtonLabel:11,reactToKeys:32,pageBody:24,scrollBehavior:33,title:12,titleTag:13,tocItems:7,warnOnEmpty:34,blurParams:14},null,[-1,-1])}}function St(t){let e,n,l,i="×",a,s,f,o,c,u,d=t[3][t[0]].title+"",m,b,H,w,B,I,D,M,V,q,p,_,v,k,Z;return w=new Mt({props:{class:"toc"}}),{c(){e=E("div"),n=E("div"),l=E("span"),l.textContent=i,a=j(),s=E("img"),o=j(),c=E("div"),u=E("h1"),m=He(d),b=j(),H=E("div"),oe(w.$$.fragment),B=j(),I=E("div"),D=E("hr"),M=j(),V=E("div"),q=new mt(!1),this.h()},l(h){e=T(h,"DIV",{class:!0,id:!0});var C=N(e);n=T(C,"DIV",{class:!0});var U=N(n);l=T(U,"SPAN",{class:!0,id:!0,"data-svelte-h":!0}),K(l)!=="svelte-1l7plis"&&(l.textContent=i),a=A(U),s=T(U,"IMG",{class:!0,src:!0}),o=A(U),c=T(U,"DIV",{class:!0});var X=N(c);u=T(X,"H1",{class:!0});var Y=N(u);m=ye(Y,d),Y.forEach(y),b=A(X),H=T(X,"DIV",{class:!0});var O=N(H);ae(w.$$.fragment,O),O.forEach(y),B=A(X),I=T(X,"DIV",{class:!0});var G=N(I);D=T(G,"HR",{}),M=A(G),V=T(G,"DIV",{class:!0});var P=N(V);q=ht(P,!1),P.forEach(y),G.forEach(y),X.forEach(y),U.forEach(y),C.forEach(y),this.h()},h(){L(l,"class","close svelte-181otsg"),L(l,"id","closecross"),L(s,"class","modal-image svelte-181otsg"),Be(s.src,f=t[3][t[0]].image)||L(s,"src",f),L(u,"class","svelte-181otsg"),L(H,"class","toc"),q.a=null,L(V,"class","content"),L(I,"class","content-container svelte-181otsg"),L(c,"class","modal-text svelte-181otsg"),L(n,"class","container svelte-181otsg"),L(e,"class",p="modal "+(t[2]?"fade-out":"fade-in")+" svelte-181otsg"),L(e,"id",t[0])},m(h,C){R(h,e,C),g(e,n),g(n,l),g(n,a),g(n,s),g(n,o),g(n,c),g(c,u),g(u,m),g(c,b),g(c,H),re(w,H,null),g(c,B),g(c,I),g(I,D),g(I,M),g(I,V),q.m(t[1],V),v=!0,k||(Z=W(l,"click",t[4]),k=!0)},p(h,[C]){(!v||C&1&&!Be(s.src,f=h[3][h[0]].image))&&L(s,"src",f),(!v||C&1)&&d!==(d=h[3][h[0]].title+"")&&Ie(m,d),(!v||C&2)&&q.p(h[1]),(!v||C&4&&p!==(p="modal "+(h[2]?"fade-out":"fade-in")+" svelte-181otsg"))&&L(e,"class",p),(!v||C&1)&&L(e,"id",h[0])},i(h){v||(S(w.$$.fragment,h),h&&be(()=>{v&&(_||(_=me(e,qe,{duration:300},!0)),_.run(1))}),v=!0)},o(h){z(w.$$.fragment,h),h&&(_||(_=me(e,qe,{duration:300},!1)),_.run(0)),v=!1},d(h){h&&y(e),ce(w),h&&_&&_.end(),k=!1,Z()}}}function Dt(t){const e=document.createElement("div");e.innerHTML=t;const n=e.querySelectorAll("h2, h3");let l="";return n.forEach((i,a)=>{const s=i.tagName.toLowerCase(),f=i.textContent,o=`section-${a}`;i.id=o;const c=`<li><a href="#${o}"><${s}>${f}</${s}></a></li>`;l+=c}),`<ul>${l}</ul>`}function jt(t,e,n){let{id:l}=e,{onClose:i}=e,a,s=!1;const f={modal1:{title:"Engineering",content:`
      <p>Engineering page</p>
<style>
  a {
    color:white;
    text-decoration: underline;
  }
  </style>



      `,image:"/d41586-024-02191-1_27293496.jpg"},modal2:{title:"Sample",content:`
      <h2>Sample</h2>
    <p>Sample</p>
      `,image:"/Ad01.jpg"},modal3:{title:"Sample",content:`

     <h2>Sample</h2>
    <p>Sample</p>
      `,image:"/HTML.webp"},modal4:{title:"Sample",content:`
     <h2>Sample</h2>
    <p>Sample</p>
      `,image:"/AiEmer.jpg"},modal5:{title:"Sample",content:`
      <h2>Sample</h2>
    <p>Sample</p>
      `,image:"/amazon.jpeg"}};he(()=>{n(1,a=f[l].content),Dt(a)});function o(){n(2,s=!0),setTimeout(()=>{typeof i=="function"&&i(),n(2,s=!1)},1)}return t.$$set=c=>{"id"in c&&n(0,l=c.id),"onClose"in c&&n(5,i=c.onClose)},[l,a,s,f,o,i]}class At extends ie{constructor(e){super(),se(this,e,jt,St,ee,{id:0,onClose:5})}}function Re(t){let e,n='<p style="font-size: 1.8em;"><b><u>Firefox is known to have issues with the table of contents, for the best experience use chrome</u></b></p>';return{c(){e=E("li"),e.innerHTML=n},l(l){e=T(l,"LI",{"data-svelte-h":!0}),K(e)!=="svelte-te8ida"&&(e.innerHTML=n)},m(l,i){R(l,e,i)},d(l){l&&y(e)}}}function Bt(t){let e,n,l="How to Use the Site",i,a,s,f,o="<p>This site uses scrolling to move between cards.</p>",c,u,d="<p>To move the cards left or right, use the scroll wheel on your mouse.</p>",m,b,H="<p>To see information about the topic on a card, click on it.</p>",w,B,I="<p>At the top of each card, there is a table of contents, click on a section to scroll there.</p>",D,M,V="<p>To close the card press the &#39;x&#39; in the top right corner</p>",q,p,_="<p>If you cannot scroll please make sure Javascript is enabled in your browser</p>",v,k,Z="Click the button below to dismiss this message, it will not be shown again.",h,C,U="Got it!",X,Y,O=t[0]&&Re();return{c(){e=E("div"),n=E("h1"),n.textContent=l,i=j(),a=E("ul"),O&&O.c(),s=j(),f=E("li"),f.innerHTML=o,c=j(),u=E("li"),u.innerHTML=d,m=j(),b=E("li"),b.innerHTML=H,w=j(),B=E("li"),B.innerHTML=I,D=j(),M=E("li"),M.innerHTML=V,q=j(),p=E("li"),p.innerHTML=_,v=j(),k=E("p"),k.textContent=Z,h=j(),C=E("button"),C.textContent=U,this.h()},l(G){e=T(G,"DIV",{class:!0});var P=N(e);n=T(P,"H1",{"data-svelte-h":!0}),K(n)!=="svelte-yqkvhw"&&(n.textContent=l),i=A(P),a=T(P,"UL",{});var F=N(a);O&&O.l(F),s=A(F),f=T(F,"LI",{"data-svelte-h":!0}),K(f)!=="svelte-54qq1q"&&(f.innerHTML=o),c=A(F),u=T(F,"LI",{"data-svelte-h":!0}),K(u)!=="svelte-1bbx9lk"&&(u.innerHTML=d),m=A(F),b=T(F,"LI",{"data-svelte-h":!0}),K(b)!=="svelte-1iurnme"&&(b.innerHTML=H),w=A(F),B=T(F,"LI",{"data-svelte-h":!0}),K(B)!=="svelte-15uymth"&&(B.innerHTML=I),D=A(F),M=T(F,"LI",{"data-svelte-h":!0}),K(M)!=="svelte-18sr52j"&&(M.innerHTML=V),q=A(F),p=T(F,"LI",{"data-svelte-h":!0}),K(p)!=="svelte-xnpchy"&&(p.innerHTML=_),F.forEach(y),v=A(P),k=T(P,"P",{"data-svelte-h":!0}),K(k)!=="svelte-1sq99no"&&(k.textContent=Z),h=A(P),C=T(P,"BUTTON",{class:!0,"data-svelte-h":!0}),K(C)!=="svelte-zzef9w"&&(C.textContent=U),P.forEach(y),this.h()},h(){L(C,"class","svelte-laq1tm"),L(e,"class","instruction-card svelte-laq1tm")},m(G,P){R(G,e,P),g(e,n),g(e,i),g(e,a),O&&O.m(a,null),g(a,s),g(a,f),g(a,c),g(a,u),g(a,m),g(a,b),g(a,w),g(a,B),g(a,D),g(a,M),g(a,q),g(a,p),g(e,v),g(e,k),g(e,h),g(e,C),X||(Y=W(C,"click",t[1]),X=!0)},p(G,[P]){G[0]?O||(O=Re(),O.c(),O.m(a,s)):O&&(O.d(1),O=null)},i:$,o:$,d(G){G&&y(e),O&&O.d(),X=!1,Y()}}}function Vt(t,e,n){let l=!1;he(()=>{n(0,l=navigator.userAgent.indexOf("Firefox")!==-1),l&&console.log("firefox detected")});const i=Ze();function a(){i("dismiss")}return[l,a]}class Ot extends ie{constructor(e){super(),se(this,e,Vt,Bt,ee,{})}}function Ye(t){let e,n;return e=new Ot({}),e.$on("dismiss",t[3]),{c(){oe(e.$$.fragment)},l(l){ae(e.$$.fragment,l)},m(l,i){re(e,l,i),n=!0},p:$,i(l){n||(S(e.$$.fragment,l),n=!0)},o(l){z(e.$$.fragment,l),n=!1},d(l){ce(e,l)}}}function Je(t){let e,n;return e=new At({props:{id:t[2],onClose:t[5]}}),{c(){oe(e.$$.fragment)},l(l){ae(e.$$.fragment,l)},m(l,i){re(e,l,i),n=!0},p(l,i){const a={};i&4&&(a.id=l[2]),e.$set(a)},i(l){n||(S(e.$$.fragment,l),n=!0)},o(l){z(e.$$.fragment,l),n=!1},d(l){ce(e,l)}}}function zt(t){let e,n,l,i='<img class="image" src="/d41586-024-02191-1_27293496.jpg" draggable="false" data-active=""/> <div class="text-overlay svelte-1sh12nl">Engineering</div>',a,s,f='<img class="image" src="/Ad01.jpg" draggable="false" data-active=""/> <div class="text-overlay svelte-1sh12nl">Python</div>',o,c,u='<img class="image darker svelte-1sh12nl" src="/HTML.webp" draggable="false" data-active=""/> <div class="text-overlay svelte-1sh12nl">HTML</div>',d,m,b='<img class="image" src="/AiEmer.jpg" draggable="false" data-active=""/> <div class="text-overlay svelte-1sh12nl">AI/Emerging Technologies</div>',H,w,B='<img class="image darker svelte-1sh12nl" src="/amazon.jpeg" draggable="false" data-active=""/> <div class="text-overlay svelte-1sh12nl">Amazon Technologies Project</div>',I,D,M,V,q,p=t[0]&&Ye(t),_=t[1]&&Je(t);return{c(){e=E("div"),p&&p.c(),n=j(),l=E("div"),l.innerHTML=i,a=j(),s=E("div"),s.innerHTML=f,o=j(),c=E("div"),c.innerHTML=u,d=j(),m=E("div"),m.innerHTML=b,H=j(),w=E("div"),w.innerHTML=B,I=j(),_&&_.c(),D=de(),this.h()},l(v){e=T(v,"DIV",{id:!0});var k=N(e);p&&p.l(k),n=A(k),l=T(k,"DIV",{class:!0,"data-svelte-h":!0}),K(l)!=="svelte-1akrkvj"&&(l.innerHTML=i),a=A(k),s=T(k,"DIV",{class:!0,"data-svelte-h":!0}),K(s)!=="svelte-9bcppm"&&(s.innerHTML=f),o=A(k),c=T(k,"DIV",{class:!0,"data-svelte-h":!0}),K(c)!=="svelte-t3cmh"&&(c.innerHTML=u),d=A(k),m=T(k,"DIV",{class:!0,"data-svelte-h":!0}),K(m)!=="svelte-vrguxo"&&(m.innerHTML=b),H=A(k),w=T(k,"DIV",{class:!0,"data-svelte-h":!0}),K(w)!=="svelte-1ftjppe"&&(w.innerHTML=B),k.forEach(y),I=A(v),_&&_.l(v),D=de(),this.h()},h(){L(l,"class","image-container"),L(s,"class","image-container"),L(c,"class","image-container "),L(m,"class","image-container"),L(w,"class","image-container"),L(e,"id","image-track")},m(v,k){R(v,e,k),p&&p.m(e,null),g(e,n),g(e,l),g(e,a),g(e,s),g(e,o),g(e,c),g(e,d),g(e,m),g(e,H),g(e,w),R(v,I,k),_&&_.m(v,k),R(v,D,k),M=!0,V||(q=[W(l,"click",t[6]),W(s,"click",t[7]),W(c,"click",t[8]),W(m,"click",t[9]),W(w,"click",t[10])],V=!0)},p(v,[k]){v[0]?p?(p.p(v,k),k&1&&S(p,1)):(p=Ye(v),p.c(),S(p,1),p.m(e,n)):p&&(ne(),z(p,1,1,()=>{p=null}),le()),v[1]?_?(_.p(v,k),k&2&&S(_,1)):(_=Je(v),_.c(),S(_,1),_.m(D.parentNode,D)):_&&(ne(),z(_,1,1,()=>{_=null}),le())},i(v){M||(S(p),S(_),M=!0)},o(v){z(p),z(_),M=!1},d(v){v&&(y(e),y(I),y(D)),p&&p.d(),_&&_.d(v),V=!1,ke(q)}}}let qt=.01,Pt=.2;function Nt(t,e,n){let l=!0,i=!1,a,s,f=!1,o=0,c=-10,u=!1;const d=typeof window<"u";function m(){localStorage.setItem("instructionsDismissed","true"),n(0,l=!1)}function b(h){n(1,i=!0),n(2,a=h),Ve(`#${h}`,{replaceState:!0})}function H(){n(1,i=!1),n(2,a=null),Ve("/",{replaceState:!0})}function w(h){i||(f=!0,o=h.clientX)}function B(h){if(f&&!i&&!u){const C=o-h.clientX,U=window.innerWidth/2;c=Math.max(Math.min(c+C/U*-100*qt,-10),-100),q()}}function I(){u=window.innerWidth<=600,u?(V(-50),window.removeEventListener("mousedown",w),window.removeEventListener("mousemove",B),window.removeEventListener("mouseup",D),window.removeEventListener("wheel",M)):(V(-10),window.addEventListener("mousedown",w),window.addEventListener("mousemove",B),window.addEventListener("mouseup",D),window.addEventListener("wheel",M,{passive:!1}))}function D(){f=!1}function M(h){if(!i&&!u){const U=(h.deltaY||h.detail||h.wheelDelta)*Pt,X=window.innerHeight/2;c=Math.max(Math.min(c+U/X*-100,-10),-100),q(),h.preventDefault()}}function V(h){console.log(h),s.style.transform=`translate(${h}%, -50%)`;for(const C of s.getElementsByClassName("image"))C.style.objectPosition="90% center"}function q(){s.style.transform=`translate(${c}%, -50%)`;for(const h of s.getElementsByClassName("image"))h.style.objectPosition=`${100+c}% center`}if(d){let h=function(){n(1,i=!1),n(2,a=null)};he(()=>{const C=localStorage.getItem("instructionsDismissed");n(0,l=!C),s=document.getElementById("image-track"),I(),u?(window.removeEventListener("mousedown",w),window.removeEventListener("mousemove",B),window.removeEventListener("mouseup",D),window.removeEventListener("wheel",M)):(window.addEventListener("mousedown",w),window.addEventListener("mousemove",B),window.addEventListener("mouseup",D),window.addEventListener("wheel",M,{passive:!1})),window.addEventListener("popstate",h),window.addEventListener("resize",I)}),_t(()=>{window.removeEventListener("mousedown",w),window.removeEventListener("mousemove",B),window.removeEventListener("mouseup",D),window.removeEventListener("wheel",M),window.removeEventListener("popstate",h),window.removeEventListener("resize",I)})}return[l,i,a,m,b,H,()=>b("modal1"),()=>b("modal2"),()=>b("modal3"),()=>b("modal4"),()=>b("modal5")]}class Ut extends ie{constructor(e){super(),se(this,e,Nt,zt,ee,{})}}function Ft(t){let e,n;return e=new Ut({}),{c(){oe(e.$$.fragment)},l(l){ae(e.$$.fragment,l)},m(l,i){re(e,l,i),n=!0},p:$,i(l){n||(S(e.$$.fragment,l),n=!0)},o(l){z(e.$$.fragment,l),n=!1},d(l){ce(e,l)}}}class Gt extends ie{constructor(e){super(),se(this,e,null,Ft,ee,{})}}export{Gt as component};
