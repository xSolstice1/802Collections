const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HomeApp-CH58ek_S.js","assets/vendor-DJG0Mpis.js","assets/zustand-DJP8-8FP.js","assets/JsonFormatterApp-hPAsOgW5.js","assets/upload-BZvBmVgC.js","assets/trash-2-BFmUmBvf.js","assets/WheelOfLunchApp-Gc84NPIl.js","assets/rotate-ccw-BLgKv1qr.js","assets/plus-Bw8vOr9q.js","assets/StickerMakerApp-B1ssmi_5.js","assets/ResumeBuilderApp-Cu_-62Ge.js","assets/star-Cd8l62Fc.js","assets/WhenPanggangApp-uUNQ0FEW.js","assets/clock-BrPLekM9.js","assets/play-Db1VY6tr.js","assets/BirdShitApp-CreGEeUA.js","assets/minimize-B3dbcrpN.js","assets/PaydayCountdownApp-BXxYQnKm.js","assets/SnakeApp-BIqbovZJ.js"])))=>i.map(i=>d[i]);
var Q=Object.defineProperty;var Z=(s,t,r)=>t in s?Q(s,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[t]=r;var k=(s,t,r)=>Z(s,typeof t!="symbol"?t+"":t,r);import{r as i,a as K,N as E,O as ee,H as te,b as re,c as j}from"./vendor-DJG0Mpis.js";import{c as se}from"./zustand-DJP8-8FP.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();var z={exports:{}},A={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ae=i,ne=Symbol.for("react.element"),oe=Symbol.for("react.fragment"),le=Object.prototype.hasOwnProperty,ie=ae.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ce={key:!0,ref:!0,__self:!0,__source:!0};function I(s,t,r){var a,n={},o=null,l=null;r!==void 0&&(o=""+r),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(l=t.ref);for(a in t)le.call(t,a)&&!ce.hasOwnProperty(a)&&(n[a]=t[a]);if(s&&s.defaultProps)for(a in t=s.defaultProps,t)n[a]===void 0&&(n[a]=t[a]);return{$$typeof:ne,type:s,key:o,ref:l,props:n,_owner:ie.current}}A.Fragment=oe;A.jsx=I;A.jsxs=I;z.exports=A;var e=z.exports,F,M=K;F=M.createRoot,M.hydrateRoot;const de="modulepreload",he=function(s){return"/802Collections/"+s},R={},f=function(t,r,a){let n=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),h=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));n=Promise.allSettled(r.map(m=>{if(m=he(m),m in R)return;R[m]=!0;const p=m.endsWith(".css"),y=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${m}"]${y}`))return;const x=document.createElement("link");if(x.rel=p?"stylesheet":de,p||(x.as="script"),x.crossOrigin="",x.href=m,h&&x.setAttribute("nonce",h),document.head.appendChild(x),p)return new Promise((v,b)=>{x.addEventListener("load",v),x.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${m}`)))})}))}function o(l){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=l,window.dispatchEvent(h),!h.defaultPrevented)throw l}return n.then(l=>{for(const h of l||[])h.status==="rejected"&&o(h.reason);return t().catch(o)})};/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),$=(...s)=>s.filter((t,r,a)=>!!t&&t.trim()!==""&&a.indexOf(t)===r).join(" ").trim();/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var ue={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=i.forwardRef(({color:s="currentColor",size:t=24,strokeWidth:r=2,absoluteStrokeWidth:a,className:n="",children:o,iconNode:l,...h},m)=>i.createElement("svg",{ref:m,...ue,width:t,height:t,stroke:s,strokeWidth:a?Number(r)*24/Number(t):r,className:$("lucide",n),...h},[...l.map(([p,y])=>i.createElement(p,y)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=(s,t)=>{const r=i.forwardRef(({className:a,...n},o)=>i.createElement(me,{ref:o,iconNode:t,className:$(`lucide-${pe(s)}`,a),...n}));return r.displayName=`${s}`,r};/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=d("Bird",[["path",{d:"M16 7h.01",key:"1kdx03"}],["path",{d:"M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20",key:"oj1oa8"}],["path",{d:"m20 7 2 .5-2 .5",key:"12nv4d"}],["path",{d:"M10 18v3",key:"1yea0a"}],["path",{d:"M14 17.75V21",key:"1pymcb"}],["path",{d:"M7 18a6 6 0 0 0 3.84-10.61",key:"1npnn0"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe=d("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=d("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=d("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const be=d("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=d("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve=d("FileJson",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1",key:"1oajmo"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1",key:"mpwhp6"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=d("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we=d("Flame",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const je=d("Gamepad2",[["line",{x1:"6",x2:"10",y1:"11",y2:"11",key:"1gktln"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13",key:"qnk9ow"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12",key:"krot7o"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10",key:"1lcuu1"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",key:"mfqc10"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=d("Github",[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ae=d("Grid3x3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"M15 3v18",key:"14nvp0"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=d("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Se=d("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee=d("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce=d("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e=d("Ribbon",[["path",{d:"M12 11.22C11 9.997 10 9 10 8a2 2 0 0 1 4 0c0 1-.998 2.002-2.01 3.22",key:"1rnhq3"}],["path",{d:"m12 18 2.57-3.5",key:"116vt7"}],["path",{d:"M6.243 9.016a7 7 0 0 1 11.507-.009",key:"10dq0b"}],["path",{d:"M9.35 14.53 12 11.22",key:"tdsyp2"}],["path",{d:"M9.35 14.53C7.728 12.246 6 10.221 6 7a6 5 0 0 1 12 0c-.005 3.22-1.778 5.235-3.43 7.5l3.557 4.527a1 1 0 0 1-.203 1.43l-1.894 1.36a1 1 0 0 1-1.384-.215L12 18l-2.679 3.593a1 1 0 0 1-1.39.213l-1.865-1.353a1 1 0 0 1-.203-1.422z",key:"nmifey"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Le=d("Sparkles",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Me=d("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re=d("Utensils",[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const De=d("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);class q extends i.Component{constructor(r){super(r);k(this,"handleRetry",()=>{this.setState({hasError:!1,error:null,errorInfo:null})});k(this,"handleGoHome",()=>{window.location.href="/"});this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(r){return{hasError:!0,error:r}}componentDidCatch(r,a){console.error("[ErrorBoundary] Uncaught error:",r,a),this.setState({errorInfo:a})}render(){if(this.state.hasError){if(this.props.fallback)return this.props.fallback;const{appName:r}=this.props,{error:a}=this.state;return e.jsx("div",{className:"flex items-center justify-center min-h-[400px] p-8",children:e.jsxs("div",{className:"card max-w-md w-full text-center",children:[e.jsx("div",{className:"flex justify-center mb-4",children:e.jsx("div",{className:"p-4 rounded-full bg-red-500/10 border border-red-500/30",children:e.jsx(Me,{className:"w-8 h-8 text-red-500"})})}),e.jsx("h2",{className:"text-xl font-semibold text-dark-100 mb-2",children:r?`${r} encountered an error`:"Something went wrong"}),e.jsx("p",{className:"text-dark-400 text-sm mb-4",children:"Don't worry, the rest of the application should still work fine."}),a&&e.jsx("div",{className:"mb-6 p-4 rounded-lg bg-dark-950 border border-dark-700 text-left",children:e.jsx("p",{className:"text-xs font-mono text-red-400 break-words",children:a.toString()})}),e.jsxs("div",{className:"flex gap-3 justify-center",children:[e.jsxs("button",{onClick:this.handleRetry,className:"btn-primary flex items-center gap-2",children:[e.jsx(Ce,{className:"w-4 h-4"}),"Try Again"]}),e.jsxs("button",{onClick:this.handleGoHome,className:"btn-secondary flex items-center gap-2",children:[e.jsx(H,{className:"w-4 h-4"}),"Go Home"]})]})]})})}return this.props.children}}const W=({message:s="Loading...",variant:t="spinner"})=>t==="skeleton"?e.jsxs("div",{className:"flex flex-col items-center justify-center min-h-[300px] p-8",children:[e.jsx("div",{className:"w-full max-w-md space-y-4",children:e.jsxs("div",{className:"animate-pulse",children:[e.jsx("div",{className:"h-4 bg-dark-700 rounded w-3/4 mb-4"}),e.jsx("div",{className:"h-4 bg-dark-700 rounded w-1/2 mb-4"}),e.jsx("div",{className:"h-4 bg-dark-700 rounded w-5/6 mb-4"}),e.jsx("div",{className:"h-4 bg-dark-700 rounded w-2/3"})]})}),s&&e.jsx("p",{className:"mt-6 text-sm text-dark-500 animate-pulse",children:s})]}):t==="progress"?e.jsxs("div",{className:"flex flex-col items-center justify-center min-h-[300px] p-8",children:[e.jsx("div",{className:"w-full max-w-md",children:e.jsx("div",{className:"h-1 bg-dark-800 rounded-full overflow-hidden",children:e.jsx("div",{className:"h-full bg-802 animate-pulse-slow",style:{width:"60%"}})})}),s&&e.jsx("p",{className:"mt-6 text-sm text-dark-500",children:s})]}):e.jsxs("div",{className:"flex flex-col items-center justify-center min-h-[300px] p-8",children:[e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"w-12 h-12 border-2 border-dark-700 rounded-full"}),e.jsx("div",{className:"absolute inset-0 w-12 h-12 border-2 border-transparent border-t-802 border-r-802/50 rounded-full animate-spin"}),e.jsx("div",{className:"absolute inset-2 w-8 h-8 bg-802/10 rounded-full animate-pulse"})]}),s&&e.jsx("p",{className:"mt-6 text-sm text-dark-500 animate-pulse",children:s})]}),D=(s,t)=>{const r=new Date(s,t,27),a=r.getDay();return a===6&&r.setDate(26),a===0&&r.setDate(25),r},Oe=s=>{let t=D(s.getFullYear(),s.getMonth());if(s>t){const r=s.getMonth()+1;t=D(r>11?s.getFullYear()+1:s.getFullYear(),r>11?0:r)}return t},Pe=({variant:s="compact",onClick:t})=>{const[r,a]=i.useState(()=>new Date),[n,o]=i.useState(!1);i.useEffect(()=>{const b=setInterval(()=>a(new Date),1e3);return()=>clearInterval(b)},[]);const l=Oe(r),h=r.getFullYear()===l.getFullYear()&&r.getMonth()===l.getMonth()&&r.getDate()===l.getDate(),m=l.getTime()-r.getTime(),p=Math.max(0,Math.floor(m/1e3)),y=Math.floor(p/86400),x=Math.floor(p%86400/3600),v=h?"🎉 PAYDAY!":`${y}d ${x}h`;return s==="compact"?e.jsxs("button",{onClick:t,className:"flex items-center gap-2 px-3 py-1.5 rounded-lg bg-802/10 border border-802/20 hover:bg-802/20 transition-all duration-200 group",title:"Click to view full countdown",children:[e.jsx(C,{className:"w-4 h-4 text-802"}),e.jsx("span",{className:"text-sm font-mono font-semibold text-802",children:v})]}):e.jsxs("div",{className:"bg-802/10 border border-802/20 rounded-lg p-3",children:[e.jsxs("div",{className:"flex items-center justify-between cursor-pointer",onClick:()=>o(!n),children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(C,{className:"w-4 h-4 text-802"}),e.jsx("span",{className:"text-xs font-medium text-gray-400 uppercase tracking-wider",children:h?"Payday!":"Payday in"})]}),n?e.jsx(be,{className:"w-3 h-3 text-gray-500"}):e.jsx(fe,{className:"w-3 h-3 text-gray-500"})]}),e.jsx("div",{className:"mt-2 text-center",children:h?e.jsx("span",{className:"text-lg font-bold text-802",children:"🎉 IT'S PAYDAY!"}):e.jsxs("div",{className:"flex items-center justify-center gap-1",children:[e.jsx("span",{className:"text-2xl font-mono font-bold text-802",children:y.toString().padStart(2,"0")}),e.jsx("span",{className:"text-xs text-gray-500",children:"d"}),e.jsx("span",{className:"text-2xl font-mono font-bold text-802 ml-1",children:x.toString().padStart(2,"0")}),e.jsx("span",{className:"text-xs text-gray-500",children:"h"})]})}),n&&e.jsx("div",{className:"mt-2 pt-2 border-t border-802/20",children:e.jsxs("p",{className:"text-xs text-gray-500 text-center",children:[l.toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"}),l.getDate()!==27&&" (adjusted)"]})})]})},Te=({apps:s,isOpen:t,onClose:r})=>{const a=s.filter(o=>o.enabled),n=()=>{window.innerWidth<1024&&r()};return e.jsxs(e.Fragment,{children:[t&&e.jsx("div",{className:"fixed inset-0 bg-black/50 z-40 lg:hidden",onClick:r,"aria-hidden":"true"}),e.jsxs("aside",{className:`
          fixed lg:static inset-y-0 left-0 z-50
          flex flex-col bg-black border-r border-black-700
          transition-all duration-300 ease-in-out
          ${t?"translate-x-0 w-72":"-translate-x-full w-72 lg:translate-x-0 lg:w-0 lg:overflow-hidden"}
        `,children:[e.jsxs("div",{className:"flex items-center justify-between p-4 border-b border-black-700",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-8 h-8 rounded-lg bg-802 flex items-center justify-center",children:e.jsx(je,{className:"w-5 h-5 text-black"})}),e.jsx("span",{className:"font-semibold text-black-100 text-sm",children:"802Collections"})]}),e.jsx("button",{onClick:r,className:"lg:hidden p-1 rounded-lg text-black-400 hover:text-black-200 hover:bg-black-800 transition-colors","aria-label":"Close menu",children:e.jsx(De,{className:"w-5 h-5"})})]}),e.jsx("div",{className:"p-4",children:e.jsx(Pe,{variant:"expanded"})}),e.jsxs("div",{className:"flex-1 overflow-y-auto px-4 py-2",children:[e.jsxs("p",{className:"text-xs font-medium text-black-500 uppercase tracking-wider mb-2",children:["Apps (",a.length,")"]}),e.jsx("nav",{className:"space-y-1",role:"navigation",children:a.map(o=>e.jsxs(E,{to:o.route,onClick:n,className:({isActive:l})=>`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200
                  ${l?"bg-802/15 text-802 border border-802/30":"text-black-400 hover:text-black-200 hover:bg-black-800"}`,children:[e.jsx("span",{className:"flex-shrink-0 w-5 h-5",children:o.icon}),e.jsx("span",{className:"truncate",children:o.name})]},o.id))})]}),e.jsxs("div",{className:"border-t border-black-700 p-4 space-y-2",children:[e.jsxs("a",{href:"https://github.com/xSolstice1/802Collections",target:"_blank",rel:"noopener noreferrer",className:"flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-black-400 hover:text-black-200 hover:bg-black-800 transition-colors w-full",children:[e.jsx(Ne,{className:"w-4 h-4"}),"GitHub"]}),e.jsxs("button",{onClick:r,className:"lg:hidden w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-black-400 hover:text-black-200 hover:bg-black-800 transition-colors",children:[e.jsx(Ae,{className:"w-4 h-4"}),"Close"]})]})]})]})},B=se((s,t)=>({apps:[],activeAppId:null,sidebarOpen:!0,sidebarCollapsed:!1,searchQuery:"",categoryFilter:null,setApps:r=>s({apps:r}),addApp:r=>s(a=>({apps:[...a.apps,r]})),removeApp:r=>s(a=>({apps:a.apps.filter(n=>n.id!==r)})),setActiveApp:r=>s({activeAppId:r}),toggleSidebar:()=>s(r=>({sidebarOpen:!r.sidebarOpen})),setSidebarCollapsed:r=>s({sidebarCollapsed:r}),setSearchQuery:r=>s({searchQuery:r}),setCategoryFilter:r=>s({categoryFilter:r}),getFilteredApps:()=>{const{apps:r,searchQuery:a,categoryFilter:n}=t();return r.filter(o=>{const l=!a||o.name.toLowerCase().includes(a.toLowerCase())||o.description.toLowerCase().includes(a.toLowerCase()),h=!n||o.category===n;return l&&h&&o.enabled})}})),ze=()=>B(s=>s.apps),g=class g{constructor(){k(this,"apps",new Map)}static getInstance(){return g.instance||(g.instance=new g),g.instance}register(t){if(this.apps.has(t.id))throw new Error(`App with ID "${t.id}" is already registered`);this.apps.set(t.id,t),console.log(`[AppRegistry] Registered app: ${t.name} (${t.id})`)}registerMany(t){t.forEach(r=>this.register(r))}unregister(t){const r=this.apps.delete(t);return r&&console.log(`[AppRegistry] Unregistered app: ${t}`),r}getById(t){return this.apps.get(t)}getByRoute(t){for(const r of this.apps.values())if(r.route===t)return r}getAll(){return Array.from(this.apps.values())}getEnabled(){return this.getAll().filter(t=>t.enabled)}getByCategory(t){return this.getAll().filter(r=>r.category===t)}exists(t){return this.apps.has(t)}getCount(){return this.apps.size}clear(){this.apps.clear(),console.log("[AppRegistry] Cleared all apps")}export(){const t={};return this.apps.forEach((r,a)=>{t[a]=r}),t}};k(g,"instance");let _=g;const N=_.getInstance(),Ie=({apps:s})=>{const t=i.useRef(null),[r,a]=i.useState(!1),[n,o]=i.useState(!1),[l,h]=i.useState(!1),m=s.filter(c=>c.id!=="dashboard"),p=i.useCallback(()=>{const c=t.current;if(!c)return;const{scrollLeft:u,scrollWidth:w,clientWidth:S}=c;a(u>5),o(u<w-S-5)},[]);i.useEffect(()=>{const c=requestAnimationFrame(()=>{p()});return window.addEventListener("resize",p),()=>{cancelAnimationFrame(c),window.removeEventListener("resize",p)}},[p]),i.useEffect(()=>{const c=setTimeout(()=>{p()},100);return()=>clearTimeout(c)},[p]);const y=c=>{const u=t.current;if(!u)return;const w=u.clientWidth*.8,S=c==="left"?u.scrollLeft-w:u.scrollLeft+w;u.scrollTo({left:S,behavior:"smooth"})},x=c=>{if(c.deltaY!==0){c.preventDefault();const u=t.current;u&&(u.scrollLeft+=c.deltaY)}},[v,b]=i.useState(0),[V,L]=i.useState(0),U=c=>{b(c.touches[0].clientX)},Y=c=>{L(c.touches[0].clientX)},G=()=>{const c=v-V;if(Math.abs(c)>50){const u=t.current;u&&(u.scrollLeft+=c)}b(0),L(0)},X=r,J=n;return e.jsxs("div",{className:"relative",onMouseEnter:()=>h(!0),onMouseLeave:()=>h(!1),children:[e.jsx("button",{onClick:()=>y("left"),className:`
          absolute left-0 top-1/2 -translate-y-1/2 z-10
          w-8 h-8 rounded-full bg-black-800 border border-black-600
          flex items-center justify-center
          text-black-400 hover:text-802 hover:border-802/50
          transition-all duration-200 shadow-lg
          lg:opacity-0 lg:pointer-events-none
          ${X?"lg:opacity-100 lg:pointer-events-auto":""}
          ${l?"opacity-100 pointer-events-auto":"opacity-0 pointer-events-none"}
        `,"aria-label":"Scroll left",children:e.jsx(ye,{className:"w-4 h-4"})}),e.jsxs("div",{ref:t,onScroll:p,onWheel:x,onTouchStart:U,onTouchMove:Y,onTouchEnd:G,className:`\r
          flex items-center gap-1 overflow-x-auto\r
          scrollbar-hide scroll-smooth\r
          px-1\r
        `,style:{scrollbarWidth:"none",msOverflowStyle:"none"},children:[e.jsxs(E,{to:"/",className:({isActive:c})=>`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all duration-200
            ${c?"bg-802/15 text-802 font-medium":"text-black-400 hover:text-black-200 hover:bg-black-800"}`,children:[e.jsx(H,{className:"w-4 h-4 flex-shrink-0"}),e.jsx("span",{className:"hidden sm:inline",children:"Home"})]}),m.map(c=>e.jsxs(E,{to:c.route,className:({isActive:u})=>`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all duration-200
              ${u?"bg-802/15 text-802 font-medium":"text-black-400 hover:text-black-200 hover:bg-black-800"}`,children:[e.jsx("span",{className:"w-4 h-4 flex-shrink-0",children:c.icon}),e.jsx("span",{className:"hidden md:inline flex-shrink-0",children:c.name})]},c.id))]}),e.jsx("button",{onClick:()=>y("right"),className:`
          absolute right-0 top-1/2 -translate-y-1/2 z-10
          w-8 h-8 rounded-full bg-black-800 border border-black-600
          flex items-center justify-center
          text-black-400 hover:text-802 hover:border-802/50
          transition-all duration-200 shadow-lg
          lg:opacity-0 lg:pointer-events-none
          ${J?"lg:opacity-100 lg:pointer-events-auto":""}
          ${l?"opacity-100 pointer-events-auto":"opacity-0 pointer-events-none"}
        `,"aria-label":"Scroll right",children:e.jsx(ge,{className:"w-4 h-4"})}),e.jsx("div",{className:`
        absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent pointer-events-none z-0
        transition-opacity duration-200
        ${l&&r?"opacity-100":"opacity-0"}
      `}),e.jsx("div",{className:`
        absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent pointer-events-none z-0
        transition-opacity duration-200
        ${l&&n?"opacity-100":"opacity-0"}
      `})]})},Fe=({onMenuClick:s})=>{const t=ze(),r=t.length>0?t:N.getEnabled();return e.jsxs("header",{className:"flex items-center gap-4 px-4 lg:px-6 py-3 border-b border-black-700 bg-black/50 backdrop-blur-sm",children:[e.jsx("button",{onClick:s,className:"lg:hidden p-2 rounded-lg text-black-400 hover:text-black-200 hover:bg-black-800 transition-colors flex-shrink-0","aria-label":"Open menu",children:e.jsx(Ee,{className:"w-5 h-5"})}),e.jsx("div",{className:"flex-1 min-w-0",children:e.jsx(Ie,{apps:r})})]})},$e=({apps:s})=>{const[t,r]=i.useState(!1);return i.useEffect(()=>{const a=()=>{r(window.innerWidth>=1024)};return a(),window.addEventListener("resize",a),()=>window.removeEventListener("resize",a)},[]),e.jsxs("div",{className:"flex h-screen bg-black overflow-hidden",children:[e.jsx(Te,{apps:s,isOpen:t,onClose:()=>r(!1)}),e.jsxs("div",{className:"flex-1 flex flex-col min-w-0",children:[e.jsx(Fe,{onMenuClick:()=>r(!0)}),e.jsx("main",{className:"flex-1 overflow-auto p-4 lg:p-6",children:e.jsx(ee,{})})]})]})},He=({app:s})=>{const t=s.component;return e.jsx(q,{appName:s.name,children:e.jsx(i.Suspense,{fallback:e.jsx(W,{message:`Loading ${s.name}...`}),children:e.jsx(t,{})})})},O=i.lazy(()=>f(()=>import("./HomeApp-CH58ek_S.js"),__vite__mapDeps([0,1,2]))),qe=({apps:s})=>{const t=s.filter(r=>r.enabled);return e.jsx(te,{children:e.jsx(re,{children:e.jsxs(j,{path:"/",element:e.jsx($e,{apps:t}),children:[e.jsx(j,{index:!0,element:e.jsx(q,{appName:"Home",children:e.jsx(i.Suspense,{fallback:e.jsx(W,{message:"Loading dashboard..."}),children:e.jsx(O,{})})})}),t.map(r=>e.jsx(j,{path:r.route.replace(/^\//,""),element:e.jsx(He,{app:r})},r.id)),e.jsx(j,{path:"*",element:e.jsx(O,{})})]})})})},We=i.lazy(()=>f(()=>import("./HomeApp-CH58ek_S.js"),__vite__mapDeps([0,1,2]))),Be=i.lazy(()=>f(()=>import("./JsonFormatterApp-hPAsOgW5.js"),__vite__mapDeps([3,1,4,5,2]))),Ve=i.lazy(()=>f(()=>import("./WheelOfLunchApp-Gc84NPIl.js"),__vite__mapDeps([6,1,7,8,5,2]))),Ue=i.lazy(()=>f(()=>import("./StickerMakerApp-B1ssmi_5.js"),__vite__mapDeps([9,1,4,5,2]))),Ye=i.lazy(()=>f(()=>import("./ResumeBuilderApp-Cu_-62Ge.js"),__vite__mapDeps([10,1,4,5,8,11,2]))),Ge=i.lazy(()=>f(()=>import("./WhenPanggangApp-uUNQ0FEW.js"),__vite__mapDeps([12,1,13,14,7,2]))),Xe=i.lazy(()=>f(()=>import("./BirdShitApp-CreGEeUA.js"),__vite__mapDeps([15,1,16,14,2]))),Je=i.lazy(()=>f(()=>import("./PaydayCountdownApp-BXxYQnKm.js"),__vite__mapDeps([17,1,2]))),Qe=i.lazy(()=>f(()=>import("./SnakeApp-BIqbovZJ.js"),__vite__mapDeps([18,1,16,14,13,11,2]))),P=[{id:"dashboard",name:"Dashboard",description:"App launcher - browse all available apps",route:"/",icon:e.jsx(Se,{className:"w-5 h-5"}),component:We,enabled:!0,category:"dashboard"},{id:"json-formatter",name:"JSON Formatter",description:"Format, validate, and minify JSON data",route:"/json-formatter",icon:e.jsx(ve,{className:"w-5 h-5"}),component:Be,enabled:!0,category:"utilities"},{id:"wheel-of-lunch",name:"Wheel of Lunch",description:"Can't decide? Spin the wheel to choose!",route:"/wheel-of-lunch",icon:e.jsx(Re,{className:"w-5 h-5"}),component:Ve,enabled:!0,category:"utilities"},{id:"sticker-maker",name:"Telegram Sticker Maker",description:"Create perfect Telegram stickers from any image",route:"/sticker-maker",icon:e.jsx(Le,{className:"w-5 h-5"}),component:Ue,enabled:!0,category:"media"},{id:"resume-builder",name:"Resume Builder",description:"Create ATS-friendly resumes with multiple templates",route:"/resume-builder",icon:e.jsx(ke,{className:"w-5 h-5"}),component:Ye,enabled:!0,category:"productivity"},{id:"when-panggang",name:"When Panggang?",description:"Find out when you can finally leave the office",route:"/when-panggang",icon:e.jsx(we,{className:"w-5 h-5"}),component:Ge,enabled:!0,category:"utilities"},{id:"bird-shit",name:"Bird Shit Simulator",description:"Fly and poop on pedestrians to score points!",route:"/bird-shit",icon:e.jsx(xe,{className:"w-5 h-5"}),component:Xe,enabled:!0,category:"games"},{id:"snake",name:"Snake",description:"Classic snake game - eat apples and grow!",route:"/snake",icon:e.jsx(_e,{className:"w-5 h-5"}),component:Qe,enabled:!0,category:"games"},{id:"payday-countdown",name:"Payday Countdown",description:"Countdown to the next payday on the 27th",route:"/payday-countdown",icon:e.jsx(C,{className:"w-5 h-5"}),component:Je,enabled:!0,category:"utilities"}],Ze=()=>{N.clear(),N.registerMany(P),console.log(`[AppInit] Registered ${P.length} applications`)},T=()=>N.getEnabled();Ze();function Ke(){const s=B(t=>t.setApps);return i.useEffect(()=>{const t=T();s(t)},[s]),e.jsx(qe,{apps:T()})}F(document.getElementById("root")).render(e.jsx(i.StrictMode,{children:e.jsx(Ke,{})}));"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/802Collections/sw.js").catch(()=>{})});export{xe as B,be as C,C as D,ve as F,Ae as G,_e as R,Le as S,Re as U,f as _,N as a,ke as b,d as c,fe as d,we as e,e as j,ze as u};
//# sourceMappingURL=index-DDUlORdN.js.map
