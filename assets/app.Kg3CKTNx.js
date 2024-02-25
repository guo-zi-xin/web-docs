import{y as K,v as R,u as ne,b6 as oe,L as Ae,j as ae,P as Oe,b7 as Se,b8 as Te,b9 as _e,ba as xe,bb as Pe,bc as Ie,bd as je,be as Ne,bf as Me,bg as ke,U as Re,d as Be,z as De,bh as Fe,bi as Ue,bj as Ze}from"./chunks/framework.AonOEUEq.js";import{t as J}from"./chunks/theme.CxPyPdQp.js";/*! medium-zoom 1.1.0 | MIT License | https://github.com/francoischalifour/medium-zoom */var w=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var d in o)Object.prototype.hasOwnProperty.call(o,d)&&(t[d]=o[d])}return t},j=function(e){return e.tagName==="IMG"},qe=function(e){return NodeList.prototype.isPrototypeOf(e)},k=function(e){return e&&e.nodeType===1},Q=function(e){var o=e.currentSrc||e.src;return o.substr(-4).toLowerCase()===".svg"},ee=function(e){try{return Array.isArray(e)?e.filter(j):qe(e)?[].slice.call(e).filter(j):k(e)?[e].filter(j):typeof e=="string"?[].slice.call(document.querySelectorAll(e)).filter(j):[]}catch{throw new TypeError(`The provided selector is invalid.
Expects a CSS selector, a Node element, a NodeList or an array.
See: https://github.com/francoischalifour/medium-zoom`)}},Ye=function(e){var o=document.createElement("div");return o.classList.add("medium-zoom-overlay"),o.style.background=e,o},We=function(e){var o=e.getBoundingClientRect(),d=o.top,c=o.left,B=o.width,D=o.height,h=e.cloneNode(),F=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,_=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;return h.removeAttribute("id"),h.style.position="absolute",h.style.top=d+F+"px",h.style.left=c+_+"px",h.style.width=B+"px",h.style.height=D+"px",h.style.transform="",h},H=function(e,o){var d=w({bubbles:!1,cancelable:!1,detail:void 0},o);if(typeof window.CustomEvent=="function")return new CustomEvent(e,d);var c=document.createEvent("CustomEvent");return c.initCustomEvent(e,d.bubbles,d.cancelable,d.detail),c},$e=function t(e){var o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},d=window.Promise||function(a){function r(){}a(r,r)},c=function(a){var r=a.target;if(r===P){y();return}v.indexOf(r)!==-1&&V({target:r})},B=function(){if(!(C||!n.original)){var a=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;Math.abs(X-a)>m.scrollOffset&&setTimeout(y,150)}},D=function(a){var r=a.key||a.keyCode;(r==="Escape"||r==="Esc"||r===27)&&y()},h=function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=a;if(a.background&&(P.style.background=a.background),a.container&&a.container instanceof Object&&(r.container=w({},m.container,a.container)),a.template){var u=k(a.template)?a.template:document.querySelector(a.template);r.template=u}return m=w({},m,r),v.forEach(function(s){s.dispatchEvent(H("medium-zoom:update",{detail:{zoom:l}}))}),l},F=function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return t(w({},m,a))},_=function(){for(var a=arguments.length,r=Array(a),u=0;u<a;u++)r[u]=arguments[u];var s=r.reduce(function(i,p){return[].concat(i,ee(p))},[]);return s.filter(function(i){return v.indexOf(i)===-1}).forEach(function(i){v.push(i),i.classList.add("medium-zoom-image")}),x.forEach(function(i){var p=i.type,g=i.listener,L=i.options;s.forEach(function(b){b.addEventListener(p,g,L)})}),l},ue=function(){for(var a=arguments.length,r=Array(a),u=0;u<a;u++)r[u]=arguments[u];n.zoomed&&y();var s=r.length>0?r.reduce(function(i,p){return[].concat(i,ee(p))},[]):v;return s.forEach(function(i){i.classList.remove("medium-zoom-image"),i.dispatchEvent(H("medium-zoom:detach",{detail:{zoom:l}}))}),v=v.filter(function(i){return s.indexOf(i)===-1}),l},se=function(a,r){var u=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return v.forEach(function(s){s.addEventListener("medium-zoom:"+a,r,u)}),x.push({type:"medium-zoom:"+a,listener:r,options:u}),l},le=function(a,r){var u=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return v.forEach(function(s){s.removeEventListener("medium-zoom:"+a,r,u)}),x=x.filter(function(s){return!(s.type==="medium-zoom:"+a&&s.listener.toString()===r.toString())}),l},$=function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=a.target,u=function(){var i={width:document.documentElement.clientWidth,height:document.documentElement.clientHeight,left:0,top:0,right:0,bottom:0},p=void 0,g=void 0;if(m.container)if(m.container instanceof Object)i=w({},i,m.container),p=i.width-i.left-i.right-m.margin*2,g=i.height-i.top-i.bottom-m.margin*2;else{var L=k(m.container)?m.container:document.querySelector(m.container),b=L.getBoundingClientRect(),U=b.width,ve=b.height,ge=b.left,he=b.top;i=w({},i,{width:U,height:ve,left:ge,top:he})}p=p||i.width-m.margin*2,g=g||i.height-m.margin*2;var T=n.zoomedHd||n.original,ye=Q(T)?p:T.naturalWidth||p,ze=Q(T)?g:T.naturalHeight||g,I=T.getBoundingClientRect(),be=I.top,Ee=I.left,Z=I.width,q=I.height,we=Math.min(Math.max(Z,ye),p)/Z,Ce=Math.min(Math.max(q,ze),g)/q,Y=Math.min(we,Ce),Le=(-Ee+(p-Z)/2+m.margin+i.left)/Y,He=(-be+(g-q)/2+m.margin+i.top)/Y,G="scale("+Y+") translate3d("+Le+"px, "+He+"px, 0)";n.zoomed.style.transform=G,n.zoomedHd&&(n.zoomedHd.style.transform=G)};return new d(function(s){if(r&&v.indexOf(r)===-1){s(l);return}var i=function U(){C=!1,n.zoomed.removeEventListener("transitionend",U),n.original.dispatchEvent(H("medium-zoom:opened",{detail:{zoom:l}})),s(l)};if(n.zoomed){s(l);return}if(r)n.original=r;else if(v.length>0){var p=v;n.original=p[0]}else{s(l);return}if(n.original.dispatchEvent(H("medium-zoom:open",{detail:{zoom:l}})),X=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,C=!0,n.zoomed=We(n.original),document.body.appendChild(P),m.template){var g=k(m.template)?m.template:document.querySelector(m.template);n.template=document.createElement("div"),n.template.appendChild(g.content.cloneNode(!0)),document.body.appendChild(n.template)}if(n.original.parentElement&&n.original.parentElement.tagName==="PICTURE"&&n.original.currentSrc&&(n.zoomed.src=n.original.currentSrc),document.body.appendChild(n.zoomed),window.requestAnimationFrame(function(){document.body.classList.add("medium-zoom--opened")}),n.original.classList.add("medium-zoom-image--hidden"),n.zoomed.classList.add("medium-zoom-image--opened"),n.zoomed.addEventListener("click",y),n.zoomed.addEventListener("transitionend",i),n.original.getAttribute("data-zoom-src")){n.zoomedHd=n.zoomed.cloneNode(),n.zoomedHd.removeAttribute("srcset"),n.zoomedHd.removeAttribute("sizes"),n.zoomedHd.removeAttribute("loading"),n.zoomedHd.src=n.zoomed.getAttribute("data-zoom-src"),n.zoomedHd.onerror=function(){clearInterval(L),console.warn("Unable to reach the zoom image target "+n.zoomedHd.src),n.zoomedHd=null,u()};var L=setInterval(function(){n.zoomedHd.complete&&(clearInterval(L),n.zoomedHd.classList.add("medium-zoom-image--opened"),n.zoomedHd.addEventListener("click",y),document.body.appendChild(n.zoomedHd),u())},10)}else if(n.original.hasAttribute("srcset")){n.zoomedHd=n.zoomed.cloneNode(),n.zoomedHd.removeAttribute("sizes"),n.zoomedHd.removeAttribute("loading");var b=n.zoomedHd.addEventListener("load",function(){n.zoomedHd.removeEventListener("load",b),n.zoomedHd.classList.add("medium-zoom-image--opened"),n.zoomedHd.addEventListener("click",y),document.body.appendChild(n.zoomedHd),u()})}else u()})},y=function(){return new d(function(a){if(C||!n.original){a(l);return}var r=function u(){n.original.classList.remove("medium-zoom-image--hidden"),document.body.removeChild(n.zoomed),n.zoomedHd&&document.body.removeChild(n.zoomedHd),document.body.removeChild(P),n.zoomed.classList.remove("medium-zoom-image--opened"),n.template&&document.body.removeChild(n.template),C=!1,n.zoomed.removeEventListener("transitionend",u),n.original.dispatchEvent(H("medium-zoom:closed",{detail:{zoom:l}})),n.original=null,n.zoomed=null,n.zoomedHd=null,n.template=null,a(l)};C=!0,document.body.classList.remove("medium-zoom--opened"),n.zoomed.style.transform="",n.zoomedHd&&(n.zoomedHd.style.transform=""),n.template&&(n.template.style.transition="opacity 150ms",n.template.style.opacity=0),n.original.dispatchEvent(H("medium-zoom:close",{detail:{zoom:l}})),n.zoomed.addEventListener("transitionend",r)})},V=function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=a.target;return n.original?y():$({target:r})},ce=function(){return m},fe=function(){return v},pe=function(){return n.original},v=[],x=[],C=!1,X=0,m=o,n={original:null,zoomed:null,zoomedHd:null,template:null};Object.prototype.toString.call(e)==="[object Object]"?m=e:(e||typeof e=="string")&&_(e),m=w({margin:0,background:"#fff",scrollOffset:40,container:null,template:null},m);var P=Ye(m.background);document.addEventListener("click",c),document.addEventListener("keyup",D),document.addEventListener("scroll",B),window.addEventListener("resize",y);var l={open:$,close:y,toggle:V,update:h,clone:F,attach:_,detach:ue,on:se,off:le,getOptions:ce,getImages:fe,getZoomedImage:pe};return l};function Ve(t,e){e===void 0&&(e={});var o=e.insertAt;if(!(!t||typeof document>"u")){var d=document.head||document.getElementsByTagName("head")[0],c=document.createElement("style");c.type="text/css",o==="top"&&d.firstChild?d.insertBefore(c,d.firstChild):d.appendChild(c),c.styleSheet?c.styleSheet.cssText=t:c.appendChild(document.createTextNode(t))}}var Xe=".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}";Ve(Xe);const Ge=$e;function Ke(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var re,O,z,ie,W,te,A,N=!1,M=[];typeof document<"u"&&(ie=function(t){return N||document.readyState==="interactive"||document.readyState==="complete"?t.call(document):M.push(function(){return t.call(this)}),this},te=function(){for(var t=0,e=M.length;t<e;t++)M[t].apply(document);M=[]},A=function(){N||(N=!0,te.call(window),document.removeEventListener?document.removeEventListener("DOMContentLoaded",A,!1):document.attachEvent&&(document.detachEvent("onreadystatechange",A),window==window.top&&(clearInterval(W),W=null)))},document.addEventListener?document.addEventListener("DOMContentLoaded",A,!1):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){/loaded|complete/.test(document.readyState)&&A()}),window==window.top&&(W=setInterval(function(){try{N||document.documentElement.doScroll("left")}catch{return}A()},5))));re={fetch:function(t,e){var o="BusuanziCallback_"+Math.floor(1099511627776*Math.random());t=t.replace("=BusuanziCallback","="+o),z=document.createElement("SCRIPT"),z.type="text/javascript",z.defer=!0,z.src=t,document.getElementsByTagName("HEAD")[0].appendChild(z),window[o]=this.evalCall(e)},evalCall:function(t){return function(e){ie(function(){try{t(e),z&&z.parentElement&&z.parentElement.removeChild&&z.parentElement.removeChild(z)}catch(o){console.log(o),O.hides()}})}}};const de=()=>{O&&O.hides(),re.fetch("//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback",function(t){O.texts(t),O.shows()})};O={bszs:["site_pv","page_pv","site_uv"],texts:function(t){this.bszs.map(function(e){var o=document.getElementById("busuanzi_value_"+e);o&&(o.innerHTML=t[e])})},hides:function(){this.bszs.map(function(t){var e=document.getElementById("busuanzi_container_"+t);e&&(e.style.display="none")})},shows:function(){this.bszs.map(function(t){var e=document.getElementById("busuanzi_container_"+t);e&&(e.style.display="inline")})}};typeof document<"u"&&de();var Je={fetch:de},Qe=Je;const et=Ke(Qe);let E;const tt={...J,enhanceApp({app:t,router:e}){typeof window<"u"&&K(()=>e.route.data.relativePath,()=>nt(location.pathname==="/"||location.pathname==="/web-docs/"),{immediate:!0}),R&&(e.onAfterRouteChanged=o=>{et.fetch()})},Layout:()=>{var o;const t={},{frontmatter:e}=ne();return(o=e.value)!=null&&o.layoutClass&&(t.class=e.value.layoutClass),oe(J.Layout,t)},setup(){const t=Ae(),e=()=>{Ge(".main img",{background:"var(--vp-c-bg)"})};ae(()=>{e()}),K(()=>t.path,()=>Oe(()=>e()))}};if(typeof window<"u"){const t=navigator.userAgent.toLowerCase();t.includes("chrome")?document.documentElement.classList.add("browser-chrome"):t.includes("firefox")?document.documentElement.classList.add("browser-firefox"):t.includes("safari")&&document.documentElement.classList.add("browser-safari")}function nt(t){if(t){if(E)return;E=document.createElement("style"),E.innerHTML=`
    :root {
      animation: rainbow 12s linear infinite;
    }`,document.body.appendChild(E)}else{if(!E)return;E.remove(),E=void 0}}function me(t){if(t.extends){const e=me(t.extends);return{...e,...t,async enhanceApp(o){e.enhanceApp&&await e.enhanceApp(o),t.enhanceApp&&await t.enhanceApp(o)}}}return t}const S=me(tt),ot=Be({name:"VitePressApp",setup(){const{site:t}=ne();return ae(()=>{De(()=>{document.documentElement.lang=t.value.lang,document.documentElement.dir=t.value.dir})}),t.value.router.prefetchLinks&&Fe(),Ue(),Ze(),S.setup&&S.setup(),()=>oe(S.Layout)}});async function at(){const t=it(),e=rt();e.provide(Te,t);const o=_e(t.route);return e.provide(xe,o),e.component("Content",Pe),e.component("ClientOnly",Ie),Object.defineProperties(e.config.globalProperties,{$frontmatter:{get(){return o.frontmatter.value}},$params:{get(){return o.page.value.params}}}),S.enhanceApp&&await S.enhanceApp({app:e,router:t,siteData:je}),{app:e,router:t,data:o}}function rt(){return Ne(ot)}function it(){let t=R,e;return Me(o=>{let d=ke(o),c=null;return d&&(t&&(e=d),(t||e===d)&&(d=d.replace(/\.js$/,".lean.js")),c=Re(()=>import(d),__vite__mapDeps([]))),R&&(t=!1),c},S.NotFound)}R&&at().then(({app:t,router:e,data:o})=>{e.go().then(()=>{Se(e.route,o.site),t.mount("#app")})});export{at as createApp};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}