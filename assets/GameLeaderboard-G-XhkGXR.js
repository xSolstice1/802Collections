var El=Object.defineProperty;var Tl=(n,t,e)=>t in n?El(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var Lo=(n,t,e)=>Tl(n,typeof t!="symbol"?t+"":t,e);import{c as br,j as H,f as Il}from"./index-BvZ44gvD.js";import{r as fn}from"./vendor-DJG0Mpis.js";import{U as vl}from"./user-L3gkE2Hu.js";/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yp=br("Maximize",[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Al=br("Medal",[["path",{d:"M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15",key:"143lza"}],["path",{d:"M11 12 5.12 2.2",key:"qhuxz6"}],["path",{d:"m13 12 5.88-9.8",key:"hbye0f"}],["path",{d:"M8 7h8",key:"i86dvs"}],["circle",{cx:"12",cy:"17",r:"5",key:"qbz8iq"}],["path",{d:"M12 18v-2h-.5",key:"fawc4q"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jp=br("Minimize",[["path",{d:"M8 3v3a2 2 0 0 1-2 2H3",key:"hohbtr"}],["path",{d:"M21 8h-3a2 2 0 0 1-2-2V3",key:"5jw1f3"}],["path",{d:"M3 16h3a2 2 0 0 1 2 2v3",key:"198tvr"}],["path",{d:"M16 21v-3a2 2 0 0 1 2-2h3",key:"ph8mxp"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wl=br("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]),Rl=()=>{};var Fo={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ya=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},Sl=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[e++];t[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[e++],a=n[e++],l=n[e++],h=((s&7)<<18|(o&63)<<12|(a&63)<<6|l&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[e++],a=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return t.join("")},Ja={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,l=a?n[s+1]:0,h=s+2<n.length,d=h?n[s+2]:0,m=o>>2,E=(o&3)<<4|l>>4;let R=(l&15)<<2|d>>6,S=d&63;h||(S=64,a||(R=64)),r.push(e[m],e[E],e[R],e[S])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(Ya(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Sl(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=e[n.charAt(s++)],l=s<n.length?e[n.charAt(s)]:0;++s;const d=s<n.length?e[n.charAt(s)]:64;++s;const E=s<n.length?e[n.charAt(s)]:64;if(++s,o==null||l==null||d==null||E==null)throw new Vl;const R=o<<2|l>>4;if(r.push(R),d!==64){const S=l<<4&240|d>>2;if(r.push(S),E!==64){const b=d<<6&192|E;r.push(b)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Vl extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Pl=function(n){const t=Ya(n);return Ja.encodeByteArray(t,!0)},pr=function(n){return Pl(n).replace(/\./g,"")},bl=function(n){try{return Ja.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cl(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dl=()=>Cl().__FIREBASE_DEFAULTS__,Nl=()=>{if(typeof process>"u"||typeof Fo>"u")return;const n=Fo.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},kl=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&bl(n[1]);return t&&JSON.parse(t)},Ws=()=>{try{return Rl()||Dl()||Nl()||kl()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},xl=n=>{var t,e;return(e=(t=Ws())==null?void 0:t.emulatorHosts)==null?void 0:e[n]},Ml=n=>{const t=xl(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},Xa=()=>{var n;return(n=Ws())==null?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ll(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}},...n};return[pr(JSON.stringify(e)),pr(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fl(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ul(){var t;const n=(t=Ws())==null?void 0:t.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Bl(){return!Ul()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function jl(){try{return typeof indexedDB=="object"}catch{return!1}}function ql(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var o;t(((o=s.error)==null?void 0:o.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $l="FirebaseError";class ze extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=$l,Object.setPrototypeOf(this,ze.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Za.prototype.create)}}class Za{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,o=this.errors[t],a=o?zl(o,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new ze(s,l,r)}}function zl(n,t){return n.replace(Gl,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const Gl=/\{\$([^}]+)}/g;function gr(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const o=n[s],a=t[s];if(Uo(o)&&Uo(a)){if(!gr(o,a))return!1}else if(o!==a)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function Uo(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jt(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tc(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Hl(n){return(await fetch(n,{credentials:"include"})).ok}class Rn{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ee="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kl{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new Ol;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Ql(t))try{this.getOrInitializeService({instanceIdentifier:Ee})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(t=Ee){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Ee){return this.instances.has(t)}getOptions(t=Ee){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(o);r===l&&a.resolve(s)}return s}onInit(t,e){const r=this.normalizeInstanceIdentifier(e),s=this.onInitCallbacks.get(r)??new Set;s.add(t),this.onInitCallbacks.set(r,s);const o=this.instances.get(r);return o&&t(o,r),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Wl(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=Ee){return this.component?this.component.multipleInstances?t:Ee:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Wl(n){return n===Ee?void 0:n}function Ql(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yl{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new Kl(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})($||($={}));const Jl={debug:$.DEBUG,verbose:$.VERBOSE,info:$.INFO,warn:$.WARN,error:$.ERROR,silent:$.SILENT},Xl=$.INFO,Zl={[$.DEBUG]:"log",[$.VERBOSE]:"log",[$.INFO]:"info",[$.WARN]:"warn",[$.ERROR]:"error"},th=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=Zl[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class ec{constructor(t){this.name=t,this._logLevel=Xl,this._logHandler=th,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in $))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Jl[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,$.DEBUG,...t),this._logHandler(this,$.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,$.VERBOSE,...t),this._logHandler(this,$.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,$.INFO,...t),this._logHandler(this,$.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,$.WARN,...t),this._logHandler(this,$.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,$.ERROR,...t),this._logHandler(this,$.ERROR,...t)}}const eh=(n,t)=>t.some(e=>n instanceof e);let Bo,jo;function nh(){return Bo||(Bo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function rh(){return jo||(jo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const nc=new WeakMap,Vs=new WeakMap,rc=new WeakMap,_s=new WeakMap,Qs=new WeakMap;function sh(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{e(te(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&nc.set(e,n)}).catch(()=>{}),Qs.set(t,n),t}function ih(n){if(Vs.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{e(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});Vs.set(n,t)}let Ps={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return Vs.get(n);if(t==="objectStoreNames")return n.objectStoreNames||rc.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return te(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function oh(n){Ps=n(Ps)}function ah(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(ys(this),t,...e);return rc.set(r,t.sort?t.sort():[t]),te(r)}:rh().includes(n)?function(...t){return n.apply(ys(this),t),te(nc.get(this))}:function(...t){return te(n.apply(ys(this),t))}}function ch(n){return typeof n=="function"?ah(n):(n instanceof IDBTransaction&&ih(n),eh(n,nh())?new Proxy(n,Ps):n)}function te(n){if(n instanceof IDBRequest)return sh(n);if(_s.has(n))return _s.get(n);const t=ch(n);return t!==n&&(_s.set(n,t),Qs.set(t,n)),t}const ys=n=>Qs.get(n);function uh(n,t,{blocked:e,upgrade:r,blocking:s,terminated:o}={}){const a=indexedDB.open(n,t),l=te(a);return r&&a.addEventListener("upgradeneeded",h=>{r(te(a.result),h.oldVersion,h.newVersion,te(a.transaction),h)}),e&&a.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),l.then(h=>{o&&h.addEventListener("close",()=>o()),s&&h.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const lh=["get","getKey","getAll","getAllKeys","count"],hh=["put","add","delete","clear"],Es=new Map;function qo(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(Es.get(t))return Es.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=hh.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||lh.includes(e)))return;const o=async function(a,...l){const h=this.transaction(a,s?"readwrite":"readonly");let d=h.store;return r&&(d=d.index(l.shift())),(await Promise.all([d[e](...l),s&&h.done]))[0]};return Es.set(t,o),o}oh(n=>({...n,get:(t,e,r)=>qo(t,e)||n.get(t,e,r),has:(t,e)=>!!qo(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dh{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(fh(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function fh(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const bs="@firebase/app",$o="0.14.10";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qt=new ec("@firebase/app"),mh="@firebase/app-compat",ph="@firebase/analytics-compat",gh="@firebase/analytics",_h="@firebase/app-check-compat",yh="@firebase/app-check",Eh="@firebase/auth",Th="@firebase/auth-compat",Ih="@firebase/database",vh="@firebase/data-connect",Ah="@firebase/database-compat",wh="@firebase/functions",Rh="@firebase/functions-compat",Sh="@firebase/installations",Vh="@firebase/installations-compat",Ph="@firebase/messaging",bh="@firebase/messaging-compat",Ch="@firebase/performance",Dh="@firebase/performance-compat",Nh="@firebase/remote-config",kh="@firebase/remote-config-compat",xh="@firebase/storage",Mh="@firebase/storage-compat",Oh="@firebase/firestore",Lh="@firebase/ai",Fh="@firebase/firestore-compat",Uh="firebase",Bh="12.11.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cs="[DEFAULT]",jh={[bs]:"fire-core",[mh]:"fire-core-compat",[gh]:"fire-analytics",[ph]:"fire-analytics-compat",[yh]:"fire-app-check",[_h]:"fire-app-check-compat",[Eh]:"fire-auth",[Th]:"fire-auth-compat",[Ih]:"fire-rtdb",[vh]:"fire-data-connect",[Ah]:"fire-rtdb-compat",[wh]:"fire-fn",[Rh]:"fire-fn-compat",[Sh]:"fire-iid",[Vh]:"fire-iid-compat",[Ph]:"fire-fcm",[bh]:"fire-fcm-compat",[Ch]:"fire-perf",[Dh]:"fire-perf-compat",[Nh]:"fire-rc",[kh]:"fire-rc-compat",[xh]:"fire-gcs",[Mh]:"fire-gcs-compat",[Oh]:"fire-fst",[Fh]:"fire-fst-compat",[Lh]:"fire-vertex","fire-js":"fire-js",[Uh]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sn=new Map,qh=new Map,Ds=new Map;function zo(n,t){try{n.container.addComponent(t)}catch(e){qt.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function _r(n){const t=n.name;if(Ds.has(t))return qt.debug(`There were multiple attempts to register component ${t}.`),!1;Ds.set(t,n);for(const e of Sn.values())zo(e,n);for(const e of qh.values())zo(e,n);return!0}function $h(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function zh(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gh={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ee=new Za("app","Firebase",Gh);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hh{constructor(t,e,r){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Rn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw ee.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kh=Bh;function sc(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r={name:Cs,automaticDataCollectionEnabled:!0,...t},s=r.name;if(typeof s!="string"||!s)throw ee.create("bad-app-name",{appName:String(s)});if(e||(e=Xa()),!e)throw ee.create("no-options");const o=Sn.get(s);if(o){if(gr(e,o.options)&&gr(r,o.config))return o;throw ee.create("duplicate-app",{appName:s})}const a=new Yl(s);for(const h of Ds.values())a.addComponent(h);const l=new Hh(e,r,a);return Sn.set(s,l),l}function ic(n=Cs){const t=Sn.get(n);if(!t&&n===Cs&&Xa())return sc();if(!t)throw ee.create("no-app",{appName:n});return t}function Wh(){return Array.from(Sn.values())}function Me(n,t,e){let r=jh[n]??n;e&&(r+=`-${e}`);const s=r.match(/\s|\//),o=t.match(/\s|\//);if(s||o){const a=[`Unable to register library "${r}" with version "${t}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),qt.warn(a.join(" "));return}_r(new Rn(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qh="firebase-heartbeat-database",Yh=1,Vn="firebase-heartbeat-store";let Ts=null;function oc(){return Ts||(Ts=uh(Qh,Yh,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(Vn)}catch(e){console.warn(e)}}}}).catch(n=>{throw ee.create("idb-open",{originalErrorMessage:n.message})})),Ts}async function Jh(n){try{const e=(await oc()).transaction(Vn),r=await e.objectStore(Vn).get(ac(n));return await e.done,r}catch(t){if(t instanceof ze)qt.warn(t.message);else{const e=ee.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});qt.warn(e.message)}}}async function Go(n,t){try{const r=(await oc()).transaction(Vn,"readwrite");await r.objectStore(Vn).put(t,ac(n)),await r.done}catch(e){if(e instanceof ze)qt.warn(e.message);else{const r=ee.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});qt.warn(r.message)}}}function ac(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xh=1024,Zh=30;class td{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new nd(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Ho();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats.length>Zh){const a=rd(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){qt.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Ho(),{heartbeatsToSend:r,unsentEntries:s}=ed(this._heartbeatsCache.heartbeats),o=pr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return qt.warn(e),""}}}function Ho(){return new Date().toISOString().substring(0,10)}function ed(n,t=Xh){const e=[];let r=n.slice();for(const s of n){const o=e.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),Ko(e)>t){o.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),Ko(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class nd{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return jl()?ql().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await Jh(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return Go(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return Go(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function Ko(n){return pr(JSON.stringify({version:2,heartbeats:n})).length}function rd(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sd(n){_r(new Rn("platform-logger",t=>new dh(t),"PRIVATE")),_r(new Rn("heartbeat",t=>new td(t),"PRIVATE")),Me(bs,$o,n),Me(bs,$o,"esm2020"),Me("fire-js","")}sd("");var Wo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ne,cc;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(T,p){function _(){}_.prototype=p.prototype,T.F=p.prototype,T.prototype=new _,T.prototype.constructor=T,T.D=function(I,y,A){for(var g=Array(arguments.length-2),vt=2;vt<arguments.length;vt++)g[vt-2]=arguments[vt];return p.prototype[y].apply(I,g)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,e),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,p,_){_||(_=0);const I=Array(16);if(typeof p=="string")for(var y=0;y<16;++y)I[y]=p.charCodeAt(_++)|p.charCodeAt(_++)<<8|p.charCodeAt(_++)<<16|p.charCodeAt(_++)<<24;else for(y=0;y<16;++y)I[y]=p[_++]|p[_++]<<8|p[_++]<<16|p[_++]<<24;p=T.g[0],_=T.g[1],y=T.g[2];let A=T.g[3],g;g=p+(A^_&(y^A))+I[0]+3614090360&4294967295,p=_+(g<<7&4294967295|g>>>25),g=A+(y^p&(_^y))+I[1]+3905402710&4294967295,A=p+(g<<12&4294967295|g>>>20),g=y+(_^A&(p^_))+I[2]+606105819&4294967295,y=A+(g<<17&4294967295|g>>>15),g=_+(p^y&(A^p))+I[3]+3250441966&4294967295,_=y+(g<<22&4294967295|g>>>10),g=p+(A^_&(y^A))+I[4]+4118548399&4294967295,p=_+(g<<7&4294967295|g>>>25),g=A+(y^p&(_^y))+I[5]+1200080426&4294967295,A=p+(g<<12&4294967295|g>>>20),g=y+(_^A&(p^_))+I[6]+2821735955&4294967295,y=A+(g<<17&4294967295|g>>>15),g=_+(p^y&(A^p))+I[7]+4249261313&4294967295,_=y+(g<<22&4294967295|g>>>10),g=p+(A^_&(y^A))+I[8]+1770035416&4294967295,p=_+(g<<7&4294967295|g>>>25),g=A+(y^p&(_^y))+I[9]+2336552879&4294967295,A=p+(g<<12&4294967295|g>>>20),g=y+(_^A&(p^_))+I[10]+4294925233&4294967295,y=A+(g<<17&4294967295|g>>>15),g=_+(p^y&(A^p))+I[11]+2304563134&4294967295,_=y+(g<<22&4294967295|g>>>10),g=p+(A^_&(y^A))+I[12]+1804603682&4294967295,p=_+(g<<7&4294967295|g>>>25),g=A+(y^p&(_^y))+I[13]+4254626195&4294967295,A=p+(g<<12&4294967295|g>>>20),g=y+(_^A&(p^_))+I[14]+2792965006&4294967295,y=A+(g<<17&4294967295|g>>>15),g=_+(p^y&(A^p))+I[15]+1236535329&4294967295,_=y+(g<<22&4294967295|g>>>10),g=p+(y^A&(_^y))+I[1]+4129170786&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^y&(p^_))+I[6]+3225465664&4294967295,A=p+(g<<9&4294967295|g>>>23),g=y+(p^_&(A^p))+I[11]+643717713&4294967295,y=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(y^A))+I[0]+3921069994&4294967295,_=y+(g<<20&4294967295|g>>>12),g=p+(y^A&(_^y))+I[5]+3593408605&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^y&(p^_))+I[10]+38016083&4294967295,A=p+(g<<9&4294967295|g>>>23),g=y+(p^_&(A^p))+I[15]+3634488961&4294967295,y=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(y^A))+I[4]+3889429448&4294967295,_=y+(g<<20&4294967295|g>>>12),g=p+(y^A&(_^y))+I[9]+568446438&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^y&(p^_))+I[14]+3275163606&4294967295,A=p+(g<<9&4294967295|g>>>23),g=y+(p^_&(A^p))+I[3]+4107603335&4294967295,y=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(y^A))+I[8]+1163531501&4294967295,_=y+(g<<20&4294967295|g>>>12),g=p+(y^A&(_^y))+I[13]+2850285829&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^y&(p^_))+I[2]+4243563512&4294967295,A=p+(g<<9&4294967295|g>>>23),g=y+(p^_&(A^p))+I[7]+1735328473&4294967295,y=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(y^A))+I[12]+2368359562&4294967295,_=y+(g<<20&4294967295|g>>>12),g=p+(_^y^A)+I[5]+4294588738&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^y)+I[8]+2272392833&4294967295,A=p+(g<<11&4294967295|g>>>21),g=y+(A^p^_)+I[11]+1839030562&4294967295,y=A+(g<<16&4294967295|g>>>16),g=_+(y^A^p)+I[14]+4259657740&4294967295,_=y+(g<<23&4294967295|g>>>9),g=p+(_^y^A)+I[1]+2763975236&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^y)+I[4]+1272893353&4294967295,A=p+(g<<11&4294967295|g>>>21),g=y+(A^p^_)+I[7]+4139469664&4294967295,y=A+(g<<16&4294967295|g>>>16),g=_+(y^A^p)+I[10]+3200236656&4294967295,_=y+(g<<23&4294967295|g>>>9),g=p+(_^y^A)+I[13]+681279174&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^y)+I[0]+3936430074&4294967295,A=p+(g<<11&4294967295|g>>>21),g=y+(A^p^_)+I[3]+3572445317&4294967295,y=A+(g<<16&4294967295|g>>>16),g=_+(y^A^p)+I[6]+76029189&4294967295,_=y+(g<<23&4294967295|g>>>9),g=p+(_^y^A)+I[9]+3654602809&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^y)+I[12]+3873151461&4294967295,A=p+(g<<11&4294967295|g>>>21),g=y+(A^p^_)+I[15]+530742520&4294967295,y=A+(g<<16&4294967295|g>>>16),g=_+(y^A^p)+I[2]+3299628645&4294967295,_=y+(g<<23&4294967295|g>>>9),g=p+(y^(_|~A))+I[0]+4096336452&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~y))+I[7]+1126891415&4294967295,A=p+(g<<10&4294967295|g>>>22),g=y+(p^(A|~_))+I[14]+2878612391&4294967295,y=A+(g<<15&4294967295|g>>>17),g=_+(A^(y|~p))+I[5]+4237533241&4294967295,_=y+(g<<21&4294967295|g>>>11),g=p+(y^(_|~A))+I[12]+1700485571&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~y))+I[3]+2399980690&4294967295,A=p+(g<<10&4294967295|g>>>22),g=y+(p^(A|~_))+I[10]+4293915773&4294967295,y=A+(g<<15&4294967295|g>>>17),g=_+(A^(y|~p))+I[1]+2240044497&4294967295,_=y+(g<<21&4294967295|g>>>11),g=p+(y^(_|~A))+I[8]+1873313359&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~y))+I[15]+4264355552&4294967295,A=p+(g<<10&4294967295|g>>>22),g=y+(p^(A|~_))+I[6]+2734768916&4294967295,y=A+(g<<15&4294967295|g>>>17),g=_+(A^(y|~p))+I[13]+1309151649&4294967295,_=y+(g<<21&4294967295|g>>>11),g=p+(y^(_|~A))+I[4]+4149444226&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~y))+I[11]+3174756917&4294967295,A=p+(g<<10&4294967295|g>>>22),g=y+(p^(A|~_))+I[2]+718787259&4294967295,y=A+(g<<15&4294967295|g>>>17),g=_+(A^(y|~p))+I[9]+3951481745&4294967295,T.g[0]=T.g[0]+p&4294967295,T.g[1]=T.g[1]+(y+(g<<21&4294967295|g>>>11))&4294967295,T.g[2]=T.g[2]+y&4294967295,T.g[3]=T.g[3]+A&4294967295}r.prototype.v=function(T,p){p===void 0&&(p=T.length);const _=p-this.blockSize,I=this.C;let y=this.h,A=0;for(;A<p;){if(y==0)for(;A<=_;)s(this,T,A),A+=this.blockSize;if(typeof T=="string"){for(;A<p;)if(I[y++]=T.charCodeAt(A++),y==this.blockSize){s(this,I),y=0;break}}else for(;A<p;)if(I[y++]=T[A++],y==this.blockSize){s(this,I),y=0;break}}this.h=y,this.o+=p},r.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var p=1;p<T.length-8;++p)T[p]=0;p=this.o*8;for(var _=T.length-8;_<T.length;++_)T[_]=p&255,p/=256;for(this.v(T),T=Array(16),p=0,_=0;_<4;++_)for(let I=0;I<32;I+=8)T[p++]=this.g[_]>>>I&255;return T};function o(T,p){var _=l;return Object.prototype.hasOwnProperty.call(_,T)?_[T]:_[T]=p(T)}function a(T,p){this.h=p;const _=[];let I=!0;for(let y=T.length-1;y>=0;y--){const A=T[y]|0;I&&A==p||(_[y]=A,I=!1)}this.g=_}var l={};function h(T){return-128<=T&&T<128?o(T,function(p){return new a([p|0],p<0?-1:0)}):new a([T|0],T<0?-1:0)}function d(T){if(isNaN(T)||!isFinite(T))return E;if(T<0)return k(d(-T));const p=[];let _=1;for(let I=0;T>=_;I++)p[I]=T/_|0,_*=4294967296;return new a(p,0)}function m(T,p){if(T.length==0)throw Error("number format error: empty string");if(p=p||10,p<2||36<p)throw Error("radix out of range: "+p);if(T.charAt(0)=="-")return k(m(T.substring(1),p));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const _=d(Math.pow(p,8));let I=E;for(let A=0;A<T.length;A+=8){var y=Math.min(8,T.length-A);const g=parseInt(T.substring(A,A+y),p);y<8?(y=d(Math.pow(p,y)),I=I.j(y).add(d(g))):(I=I.j(_),I=I.add(d(g)))}return I}var E=h(0),R=h(1),S=h(16777216);n=a.prototype,n.m=function(){if(x(this))return-k(this).m();let T=0,p=1;for(let _=0;_<this.g.length;_++){const I=this.i(_);T+=(I>=0?I:4294967296+I)*p,p*=4294967296}return T},n.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(b(this))return"0";if(x(this))return"-"+k(this).toString(T);const p=d(Math.pow(T,6));var _=this;let I="";for(;;){const y=St(_,p).g;_=G(_,y.j(p));let A=((_.g.length>0?_.g[0]:_.h)>>>0).toString(T);if(_=y,b(_))return A+I;for(;A.length<6;)A="0"+A;I=A+I}},n.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function b(T){if(T.h!=0)return!1;for(let p=0;p<T.g.length;p++)if(T.g[p]!=0)return!1;return!0}function x(T){return T.h==-1}n.l=function(T){return T=G(this,T),x(T)?-1:b(T)?0:1};function k(T){const p=T.g.length,_=[];for(let I=0;I<p;I++)_[I]=~T.g[I];return new a(_,~T.h).add(R)}n.abs=function(){return x(this)?k(this):this},n.add=function(T){const p=Math.max(this.g.length,T.g.length),_=[];let I=0;for(let y=0;y<=p;y++){let A=I+(this.i(y)&65535)+(T.i(y)&65535),g=(A>>>16)+(this.i(y)>>>16)+(T.i(y)>>>16);I=g>>>16,A&=65535,g&=65535,_[y]=g<<16|A}return new a(_,_[_.length-1]&-2147483648?-1:0)};function G(T,p){return T.add(k(p))}n.j=function(T){if(b(this)||b(T))return E;if(x(this))return x(T)?k(this).j(k(T)):k(k(this).j(T));if(x(T))return k(this.j(k(T)));if(this.l(S)<0&&T.l(S)<0)return d(this.m()*T.m());const p=this.g.length+T.g.length,_=[];for(var I=0;I<2*p;I++)_[I]=0;for(I=0;I<this.g.length;I++)for(let y=0;y<T.g.length;y++){const A=this.i(I)>>>16,g=this.i(I)&65535,vt=T.i(y)>>>16,fe=T.i(y)&65535;_[2*I+2*y]+=g*fe,K(_,2*I+2*y),_[2*I+2*y+1]+=A*fe,K(_,2*I+2*y+1),_[2*I+2*y+1]+=g*vt,K(_,2*I+2*y+1),_[2*I+2*y+2]+=A*vt,K(_,2*I+2*y+2)}for(T=0;T<p;T++)_[T]=_[2*T+1]<<16|_[2*T];for(T=p;T<2*p;T++)_[T]=0;return new a(_,0)};function K(T,p){for(;(T[p]&65535)!=T[p];)T[p+1]+=T[p]>>>16,T[p]&=65535,p++}function Z(T,p){this.g=T,this.h=p}function St(T,p){if(b(p))throw Error("division by zero");if(b(T))return new Z(E,E);if(x(T))return p=St(k(T),p),new Z(k(p.g),k(p.h));if(x(p))return p=St(T,k(p)),new Z(k(p.g),p.h);if(T.g.length>30){if(x(T)||x(p))throw Error("slowDivide_ only works with positive integers.");for(var _=R,I=p;I.l(T)<=0;)_=ft(_),I=ft(I);var y=mt(_,1),A=mt(I,1);for(I=mt(I,2),_=mt(_,2);!b(I);){var g=A.add(I);g.l(T)<=0&&(y=y.add(_),A=g),I=mt(I,1),_=mt(_,1)}return p=G(T,y.j(p)),new Z(y,p)}for(y=E;T.l(p)>=0;){for(_=Math.max(1,Math.floor(T.m()/p.m())),I=Math.ceil(Math.log(_)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),A=d(_),g=A.j(p);x(g)||g.l(T)>0;)_-=I,A=d(_),g=A.j(p);b(A)&&(A=R),y=y.add(A),T=G(T,g)}return new Z(y,T)}n.B=function(T){return St(this,T).h},n.and=function(T){const p=Math.max(this.g.length,T.g.length),_=[];for(let I=0;I<p;I++)_[I]=this.i(I)&T.i(I);return new a(_,this.h&T.h)},n.or=function(T){const p=Math.max(this.g.length,T.g.length),_=[];for(let I=0;I<p;I++)_[I]=this.i(I)|T.i(I);return new a(_,this.h|T.h)},n.xor=function(T){const p=Math.max(this.g.length,T.g.length),_=[];for(let I=0;I<p;I++)_[I]=this.i(I)^T.i(I);return new a(_,this.h^T.h)};function ft(T){const p=T.g.length+1,_=[];for(let I=0;I<p;I++)_[I]=T.i(I)<<1|T.i(I-1)>>>31;return new a(_,T.h)}function mt(T,p){const _=p>>5;p%=32;const I=T.g.length-_,y=[];for(let A=0;A<I;A++)y[A]=p>0?T.i(A+_)>>>p|T.i(A+_+1)<<32-p:T.i(A+_);return new a(y,T.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,cc=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=m,ne=a}).apply(typeof Wo<"u"?Wo:typeof self<"u"?self:typeof window<"u"?window:{});var rr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var uc,_n,lc,cr,Ns,hc,dc,fc;(function(){var n,t=Object.defineProperty;function e(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof rr=="object"&&rr];for(var c=0;c<i.length;++c){var u=i[c];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var r=e(this);function s(i,c){if(c)t:{var u=r;i=i.split(".");for(var f=0;f<i.length-1;f++){var v=i[f];if(!(v in u))break t;u=u[v]}i=i[i.length-1],f=u[i],c=c(f),c!=f&&c!=null&&t(u,i,{configurable:!0,writable:!0,value:c})}}s("Symbol.dispose",function(i){return i||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(i){return i||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(i){return i||function(c){var u=[],f;for(f in c)Object.prototype.hasOwnProperty.call(c,f)&&u.push([f,c[f]]);return u}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function l(i){var c=typeof i;return c=="object"&&i!=null||c=="function"}function h(i,c,u){return i.call.apply(i.bind,arguments)}function d(i,c,u){return d=h,d.apply(null,arguments)}function m(i,c){var u=Array.prototype.slice.call(arguments,1);return function(){var f=u.slice();return f.push.apply(f,arguments),i.apply(this,f)}}function E(i,c){function u(){}u.prototype=c.prototype,i.Z=c.prototype,i.prototype=new u,i.prototype.constructor=i,i.Ob=function(f,v,w){for(var C=Array(arguments.length-2),U=2;U<arguments.length;U++)C[U-2]=arguments[U];return c.prototype[v].apply(f,C)}}var R=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?i=>i&&AsyncContext.Snapshot.wrap(i):i=>i;function S(i){const c=i.length;if(c>0){const u=Array(c);for(let f=0;f<c;f++)u[f]=i[f];return u}return[]}function b(i,c){for(let f=1;f<arguments.length;f++){const v=arguments[f];var u=typeof v;if(u=u!="object"?u:v?Array.isArray(v)?"array":u:"null",u=="array"||u=="object"&&typeof v.length=="number"){u=i.length||0;const w=v.length||0;i.length=u+w;for(let C=0;C<w;C++)i[u+C]=v[C]}else i.push(v)}}class x{constructor(c,u){this.i=c,this.j=u,this.h=0,this.g=null}get(){let c;return this.h>0?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function k(i){a.setTimeout(()=>{throw i},0)}function G(){var i=T;let c=null;return i.g&&(c=i.g,i.g=i.g.next,i.g||(i.h=null),c.next=null),c}class K{constructor(){this.h=this.g=null}add(c,u){const f=Z.get();f.set(c,u),this.h?this.h.next=f:this.g=f,this.h=f}}var Z=new x(()=>new St,i=>i.reset());class St{constructor(){this.next=this.g=this.h=null}set(c,u){this.h=c,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let ft,mt=!1,T=new K,p=()=>{const i=Promise.resolve(void 0);ft=()=>{i.then(_)}};function _(){for(var i;i=G();){try{i.h.call(i.g)}catch(u){k(u)}var c=Z;c.j(i),c.h<100&&(c.h++,i.next=c.g,c.g=i)}mt=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function y(i,c){this.type=i,this.g=this.target=c,this.defaultPrevented=!1}y.prototype.h=function(){this.defaultPrevented=!0};var A=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var i=!1,c=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const u=()=>{};a.addEventListener("test",u,c),a.removeEventListener("test",u,c)}catch{}return i}();function g(i){return/^[\s\xa0]*$/.test(i)}function vt(i,c){y.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i&&this.init(i,c)}E(vt,y),vt.prototype.init=function(i,c){const u=this.type=i.type,f=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;this.target=i.target||i.srcElement,this.g=c,c=i.relatedTarget,c||(u=="mouseover"?c=i.fromElement:u=="mouseout"&&(c=i.toElement)),this.relatedTarget=c,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=i.pointerType,this.state=i.state,this.i=i,i.defaultPrevented&&vt.Z.h.call(this)},vt.prototype.h=function(){vt.Z.h.call(this);const i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var fe="closure_listenable_"+(Math.random()*1e6|0),ju=0;function qu(i,c,u,f,v){this.listener=i,this.proxy=null,this.src=c,this.type=u,this.capture=!!f,this.ha=v,this.key=++ju,this.da=this.fa=!1}function qn(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function $n(i,c,u){for(const f in i)c.call(u,i[f],f,i)}function $u(i,c){for(const u in i)c.call(void 0,i[u],u,i)}function Mi(i){const c={};for(const u in i)c[u]=i[u];return c}const Oi="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Li(i,c){let u,f;for(let v=1;v<arguments.length;v++){f=arguments[v];for(u in f)i[u]=f[u];for(let w=0;w<Oi.length;w++)u=Oi[w],Object.prototype.hasOwnProperty.call(f,u)&&(i[u]=f[u])}}function zn(i){this.src=i,this.g={},this.h=0}zn.prototype.add=function(i,c,u,f,v){const w=i.toString();i=this.g[w],i||(i=this.g[w]=[],this.h++);const C=Wr(i,c,f,v);return C>-1?(c=i[C],u||(c.fa=!1)):(c=new qu(c,this.src,w,!!f,v),c.fa=u,i.push(c)),c};function Kr(i,c){const u=c.type;if(u in i.g){var f=i.g[u],v=Array.prototype.indexOf.call(f,c,void 0),w;(w=v>=0)&&Array.prototype.splice.call(f,v,1),w&&(qn(c),i.g[u].length==0&&(delete i.g[u],i.h--))}}function Wr(i,c,u,f){for(let v=0;v<i.length;++v){const w=i[v];if(!w.da&&w.listener==c&&w.capture==!!u&&w.ha==f)return v}return-1}var Qr="closure_lm_"+(Math.random()*1e6|0),Yr={};function Fi(i,c,u,f,v){if(Array.isArray(c)){for(let w=0;w<c.length;w++)Fi(i,c[w],u,f,v);return null}return u=ji(u),i&&i[fe]?i.J(c,u,l(f)?!!f.capture:!1,v):zu(i,c,u,!1,f,v)}function zu(i,c,u,f,v,w){if(!c)throw Error("Invalid event type");const C=l(v)?!!v.capture:!!v;let U=Xr(i);if(U||(i[Qr]=U=new zn(i)),u=U.add(c,u,f,C,w),u.proxy)return u;if(f=Gu(),u.proxy=f,f.src=i,f.listener=u,i.addEventListener)A||(v=C),v===void 0&&(v=!1),i.addEventListener(c.toString(),f,v);else if(i.attachEvent)i.attachEvent(Bi(c.toString()),f);else if(i.addListener&&i.removeListener)i.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return u}function Gu(){function i(u){return c.call(i.src,i.listener,u)}const c=Hu;return i}function Ui(i,c,u,f,v){if(Array.isArray(c))for(var w=0;w<c.length;w++)Ui(i,c[w],u,f,v);else f=l(f)?!!f.capture:!!f,u=ji(u),i&&i[fe]?(i=i.i,w=String(c).toString(),w in i.g&&(c=i.g[w],u=Wr(c,u,f,v),u>-1&&(qn(c[u]),Array.prototype.splice.call(c,u,1),c.length==0&&(delete i.g[w],i.h--)))):i&&(i=Xr(i))&&(c=i.g[c.toString()],i=-1,c&&(i=Wr(c,u,f,v)),(u=i>-1?c[i]:null)&&Jr(u))}function Jr(i){if(typeof i!="number"&&i&&!i.da){var c=i.src;if(c&&c[fe])Kr(c.i,i);else{var u=i.type,f=i.proxy;c.removeEventListener?c.removeEventListener(u,f,i.capture):c.detachEvent?c.detachEvent(Bi(u),f):c.addListener&&c.removeListener&&c.removeListener(f),(u=Xr(c))?(Kr(u,i),u.h==0&&(u.src=null,c[Qr]=null)):qn(i)}}}function Bi(i){return i in Yr?Yr[i]:Yr[i]="on"+i}function Hu(i,c){if(i.da)i=!0;else{c=new vt(c,this);const u=i.listener,f=i.ha||i.src;i.fa&&Jr(i),i=u.call(f,c)}return i}function Xr(i){return i=i[Qr],i instanceof zn?i:null}var Zr="__closure_events_fn_"+(Math.random()*1e9>>>0);function ji(i){return typeof i=="function"?i:(i[Zr]||(i[Zr]=function(c){return i.handleEvent(c)}),i[Zr])}function pt(){I.call(this),this.i=new zn(this),this.M=this,this.G=null}E(pt,I),pt.prototype[fe]=!0,pt.prototype.removeEventListener=function(i,c,u,f){Ui(this,i,c,u,f)};function Et(i,c){var u,f=i.G;if(f)for(u=[];f;f=f.G)u.push(f);if(i=i.M,f=c.type||c,typeof c=="string")c=new y(c,i);else if(c instanceof y)c.target=c.target||i;else{var v=c;c=new y(f,i),Li(c,v)}v=!0;let w,C;if(u)for(C=u.length-1;C>=0;C--)w=c.g=u[C],v=Gn(w,f,!0,c)&&v;if(w=c.g=i,v=Gn(w,f,!0,c)&&v,v=Gn(w,f,!1,c)&&v,u)for(C=0;C<u.length;C++)w=c.g=u[C],v=Gn(w,f,!1,c)&&v}pt.prototype.N=function(){if(pt.Z.N.call(this),this.i){var i=this.i;for(const c in i.g){const u=i.g[c];for(let f=0;f<u.length;f++)qn(u[f]);delete i.g[c],i.h--}}this.G=null},pt.prototype.J=function(i,c,u,f){return this.i.add(String(i),c,!1,u,f)},pt.prototype.K=function(i,c,u,f){return this.i.add(String(i),c,!0,u,f)};function Gn(i,c,u,f){if(c=i.i.g[String(c)],!c)return!0;c=c.concat();let v=!0;for(let w=0;w<c.length;++w){const C=c[w];if(C&&!C.da&&C.capture==u){const U=C.listener,ot=C.ha||C.src;C.fa&&Kr(i.i,C),v=U.call(ot,f)!==!1&&v}}return v&&!f.defaultPrevented}function Ku(i,c){if(typeof i!="function")if(i&&typeof i.handleEvent=="function")i=d(i.handleEvent,i);else throw Error("Invalid listener argument");return Number(c)>2147483647?-1:a.setTimeout(i,c||0)}function qi(i){i.g=Ku(()=>{i.g=null,i.i&&(i.i=!1,qi(i))},i.l);const c=i.h;i.h=null,i.m.apply(null,c)}class Wu extends I{constructor(c,u){super(),this.m=c,this.l=u,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:qi(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ye(i){I.call(this),this.h=i,this.g={}}E(Ye,I);var $i=[];function zi(i){$n(i.g,function(c,u){this.g.hasOwnProperty(u)&&Jr(c)},i),i.g={}}Ye.prototype.N=function(){Ye.Z.N.call(this),zi(this)},Ye.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ts=a.JSON.stringify,Qu=a.JSON.parse,Yu=class{stringify(i){return a.JSON.stringify(i,void 0)}parse(i){return a.JSON.parse(i,void 0)}};function Gi(){}function Hi(){}var Je={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function es(){y.call(this,"d")}E(es,y);function ns(){y.call(this,"c")}E(ns,y);var me={},Ki=null;function Hn(){return Ki=Ki||new pt}me.Ia="serverreachability";function Wi(i){y.call(this,me.Ia,i)}E(Wi,y);function Xe(i){const c=Hn();Et(c,new Wi(c))}me.STAT_EVENT="statevent";function Qi(i,c){y.call(this,me.STAT_EVENT,i),this.stat=c}E(Qi,y);function Tt(i){const c=Hn();Et(c,new Qi(c,i))}me.Ja="timingevent";function Yi(i,c){y.call(this,me.Ja,i),this.size=c}E(Yi,y);function Ze(i,c){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){i()},c)}function tn(){this.g=!0}tn.prototype.ua=function(){this.g=!1};function Ju(i,c,u,f,v,w){i.info(function(){if(i.g)if(w){var C="",U=w.split("&");for(let W=0;W<U.length;W++){var ot=U[W].split("=");if(ot.length>1){const ct=ot[0];ot=ot[1];const Nt=ct.split("_");C=Nt.length>=2&&Nt[1]=="type"?C+(ct+"="+ot+"&"):C+(ct+"=redacted&")}}}else C=null;else C=w;return"XMLHTTP REQ ("+f+") [attempt "+v+"]: "+c+`
`+u+`
`+C})}function Xu(i,c,u,f,v,w,C){i.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+v+"]: "+c+`
`+u+`
`+w+" "+C})}function be(i,c,u,f){i.info(function(){return"XMLHTTP TEXT ("+c+"): "+tl(i,u)+(f?" "+f:"")})}function Zu(i,c){i.info(function(){return"TIMEOUT: "+c})}tn.prototype.info=function(){};function tl(i,c){if(!i.g)return c;if(!c)return null;try{const w=JSON.parse(c);if(w){for(i=0;i<w.length;i++)if(Array.isArray(w[i])){var u=w[i];if(!(u.length<2)){var f=u[1];if(Array.isArray(f)&&!(f.length<1)){var v=f[0];if(v!="noop"&&v!="stop"&&v!="close")for(let C=1;C<f.length;C++)f[C]=""}}}}return ts(w)}catch{return c}}var Kn={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Ji={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Xi;function rs(){}E(rs,Gi),rs.prototype.g=function(){return new XMLHttpRequest},Xi=new rs;function en(i){return encodeURIComponent(String(i))}function el(i){var c=1;i=i.split(":");const u=[];for(;c>0&&i.length;)u.push(i.shift()),c--;return i.length&&u.push(i.join(":")),u}function Gt(i,c,u,f){this.j=i,this.i=c,this.l=u,this.S=f||1,this.V=new Ye(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Zi}function Zi(){this.i=null,this.g="",this.h=!1}var to={},ss={};function is(i,c,u){i.M=1,i.A=Qn(Dt(c)),i.u=u,i.R=!0,eo(i,null)}function eo(i,c){i.F=Date.now(),Wn(i),i.B=Dt(i.A);var u=i.B,f=i.S;Array.isArray(f)||(f=[String(f)]),po(u.i,"t",f),i.C=0,u=i.j.L,i.h=new Zi,i.g=ko(i.j,u?c:null,!i.u),i.P>0&&(i.O=new Wu(d(i.Y,i,i.g),i.P)),c=i.V,u=i.g,f=i.ba;var v="readystatechange";Array.isArray(v)||(v&&($i[0]=v.toString()),v=$i);for(let w=0;w<v.length;w++){const C=Fi(u,v[w],f||c.handleEvent,!1,c.h||c);if(!C)break;c.g[C.key]=C}c=i.J?Mi(i.J):{},i.u?(i.v||(i.v="POST"),c["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.B,i.v,i.u,c)):(i.v="GET",i.g.ea(i.B,i.v,null,c)),Xe(),Ju(i.i,i.v,i.B,i.l,i.S,i.u)}Gt.prototype.ba=function(i){i=i.target;const c=this.O;c&&Wt(i)==3?c.j():this.Y(i)},Gt.prototype.Y=function(i){try{if(i==this.g)t:{const U=Wt(this.g),ot=this.g.ya(),W=this.g.ca();if(!(U<3)&&(U!=3||this.g&&(this.h.h||this.g.la()||vo(this.g)))){this.K||U!=4||ot==7||(ot==8||W<=0?Xe(3):Xe(2)),os(this);var c=this.g.ca();this.X=c;var u=nl(this);if(this.o=c==200,Xu(this.i,this.v,this.B,this.l,this.S,U,c),this.o){if(this.U&&!this.L){e:{if(this.g){var f,v=this.g;if((f=v.g?v.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!g(f)){var w=f;break e}}w=null}if(i=w)be(this.i,this.l,i,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,as(this,i);else{this.o=!1,this.m=3,Tt(12),pe(this),nn(this);break t}}if(this.R){i=!0;let ct;for(;!this.K&&this.C<u.length;)if(ct=rl(this,u),ct==ss){U==4&&(this.m=4,Tt(14),i=!1),be(this.i,this.l,null,"[Incomplete Response]");break}else if(ct==to){this.m=4,Tt(15),be(this.i,this.l,u,"[Invalid Chunk]"),i=!1;break}else be(this.i,this.l,ct,null),as(this,ct);if(no(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),U!=4||u.length!=0||this.h.h||(this.m=1,Tt(16),i=!1),this.o=this.o&&i,!i)be(this.i,this.l,u,"[Invalid Chunked Response]"),pe(this),nn(this);else if(u.length>0&&!this.W){this.W=!0;var C=this.j;C.g==this&&C.aa&&!C.P&&(C.j.info("Great, no buffering proxy detected. Bytes received: "+u.length),ps(C),C.P=!0,Tt(11))}}else be(this.i,this.l,u,null),as(this,u);U==4&&pe(this),this.o&&!this.K&&(U==4?bo(this.j,this):(this.o=!1,Wn(this)))}else _l(this.g),c==400&&u.indexOf("Unknown SID")>0?(this.m=3,Tt(12)):(this.m=0,Tt(13)),pe(this),nn(this)}}}catch{}finally{}};function nl(i){if(!no(i))return i.g.la();const c=vo(i.g);if(c==="")return"";let u="";const f=c.length,v=Wt(i.g)==4;if(!i.h.i){if(typeof TextDecoder>"u")return pe(i),nn(i),"";i.h.i=new a.TextDecoder}for(let w=0;w<f;w++)i.h.h=!0,u+=i.h.i.decode(c[w],{stream:!(v&&w==f-1)});return c.length=0,i.h.g+=u,i.C=0,i.h.g}function no(i){return i.g?i.v=="GET"&&i.M!=2&&i.j.Aa:!1}function rl(i,c){var u=i.C,f=c.indexOf(`
`,u);return f==-1?ss:(u=Number(c.substring(u,f)),isNaN(u)?to:(f+=1,f+u>c.length?ss:(c=c.slice(f,f+u),i.C=f+u,c)))}Gt.prototype.cancel=function(){this.K=!0,pe(this)};function Wn(i){i.T=Date.now()+i.H,ro(i,i.H)}function ro(i,c){if(i.D!=null)throw Error("WatchDog timer not null");i.D=Ze(d(i.aa,i),c)}function os(i){i.D&&(a.clearTimeout(i.D),i.D=null)}Gt.prototype.aa=function(){this.D=null;const i=Date.now();i-this.T>=0?(Zu(this.i,this.B),this.M!=2&&(Xe(),Tt(17)),pe(this),this.m=2,nn(this)):ro(this,this.T-i)};function nn(i){i.j.I==0||i.K||bo(i.j,i)}function pe(i){os(i);var c=i.O;c&&typeof c.dispose=="function"&&c.dispose(),i.O=null,zi(i.V),i.g&&(c=i.g,i.g=null,c.abort(),c.dispose())}function as(i,c){try{var u=i.j;if(u.I!=0&&(u.g==i||cs(u.h,i))){if(!i.L&&cs(u.h,i)&&u.I==3){try{var f=u.Ba.g.parse(c)}catch{f=null}if(Array.isArray(f)&&f.length==3){var v=f;if(v[0]==0){t:if(!u.v){if(u.g)if(u.g.F+3e3<i.F)tr(u),Xn(u);else break t;ms(u),Tt(18)}}else u.xa=v[1],0<u.xa-u.K&&v[2]<37500&&u.F&&u.A==0&&!u.C&&(u.C=Ze(d(u.Va,u),6e3));oo(u.h)<=1&&u.ta&&(u.ta=void 0)}else _e(u,11)}else if((i.L||u.g==i)&&tr(u),!g(c))for(v=u.Ba.g.parse(c),c=0;c<v.length;c++){let W=v[c];const ct=W[0];if(!(ct<=u.K))if(u.K=ct,W=W[1],u.I==2)if(W[0]=="c"){u.M=W[1],u.ba=W[2];const Nt=W[3];Nt!=null&&(u.ka=Nt,u.j.info("VER="+u.ka));const ye=W[4];ye!=null&&(u.za=ye,u.j.info("SVER="+u.za));const Qt=W[5];Qt!=null&&typeof Qt=="number"&&Qt>0&&(f=1.5*Qt,u.O=f,u.j.info("backChannelRequestTimeoutMs_="+f)),f=u;const Yt=i.g;if(Yt){const nr=Yt.g?Yt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(nr){var w=f.h;w.g||nr.indexOf("spdy")==-1&&nr.indexOf("quic")==-1&&nr.indexOf("h2")==-1||(w.j=w.l,w.g=new Set,w.h&&(us(w,w.h),w.h=null))}if(f.G){const gs=Yt.g?Yt.g.getResponseHeader("X-HTTP-Session-Id"):null;gs&&(f.wa=gs,Y(f.J,f.G,gs))}}u.I=3,u.l&&u.l.ra(),u.aa&&(u.T=Date.now()-i.F,u.j.info("Handshake RTT: "+u.T+"ms")),f=u;var C=i;if(f.na=No(f,f.L?f.ba:null,f.W),C.L){ao(f.h,C);var U=C,ot=f.O;ot&&(U.H=ot),U.D&&(os(U),Wn(U)),f.g=C}else Vo(f);u.i.length>0&&Zn(u)}else W[0]!="stop"&&W[0]!="close"||_e(u,7);else u.I==3&&(W[0]=="stop"||W[0]=="close"?W[0]=="stop"?_e(u,7):fs(u):W[0]!="noop"&&u.l&&u.l.qa(W),u.A=0)}}Xe(4)}catch{}}var sl=class{constructor(i,c){this.g=i,this.map=c}};function so(i){this.l=i||10,a.PerformanceNavigationTiming?(i=a.performance.getEntriesByType("navigation"),i=i.length>0&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function io(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function oo(i){return i.h?1:i.g?i.g.size:0}function cs(i,c){return i.h?i.h==c:i.g?i.g.has(c):!1}function us(i,c){i.g?i.g.add(c):i.h=c}function ao(i,c){i.h&&i.h==c?i.h=null:i.g&&i.g.has(c)&&i.g.delete(c)}so.prototype.cancel=function(){if(this.i=co(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function co(i){if(i.h!=null)return i.i.concat(i.h.G);if(i.g!=null&&i.g.size!==0){let c=i.i;for(const u of i.g.values())c=c.concat(u.G);return c}return S(i.i)}var uo=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function il(i,c){if(i){i=i.split("&");for(let u=0;u<i.length;u++){const f=i[u].indexOf("=");let v,w=null;f>=0?(v=i[u].substring(0,f),w=i[u].substring(f+1)):v=i[u],c(v,w?decodeURIComponent(w.replace(/\+/g," ")):"")}}}function Ht(i){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let c;i instanceof Ht?(this.l=i.l,rn(this,i.j),this.o=i.o,this.g=i.g,sn(this,i.u),this.h=i.h,ls(this,go(i.i)),this.m=i.m):i&&(c=String(i).match(uo))?(this.l=!1,rn(this,c[1]||"",!0),this.o=on(c[2]||""),this.g=on(c[3]||"",!0),sn(this,c[4]),this.h=on(c[5]||"",!0),ls(this,c[6]||"",!0),this.m=on(c[7]||"")):(this.l=!1,this.i=new cn(null,this.l))}Ht.prototype.toString=function(){const i=[];var c=this.j;c&&i.push(an(c,lo,!0),":");var u=this.g;return(u||c=="file")&&(i.push("//"),(c=this.o)&&i.push(an(c,lo,!0),"@"),i.push(en(u).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.u,u!=null&&i.push(":",String(u))),(u=this.h)&&(this.g&&u.charAt(0)!="/"&&i.push("/"),i.push(an(u,u.charAt(0)=="/"?cl:al,!0))),(u=this.i.toString())&&i.push("?",u),(u=this.m)&&i.push("#",an(u,ll)),i.join("")},Ht.prototype.resolve=function(i){const c=Dt(this);let u=!!i.j;u?rn(c,i.j):u=!!i.o,u?c.o=i.o:u=!!i.g,u?c.g=i.g:u=i.u!=null;var f=i.h;if(u)sn(c,i.u);else if(u=!!i.h){if(f.charAt(0)!="/")if(this.g&&!this.h)f="/"+f;else{var v=c.h.lastIndexOf("/");v!=-1&&(f=c.h.slice(0,v+1)+f)}if(v=f,v==".."||v==".")f="";else if(v.indexOf("./")!=-1||v.indexOf("/.")!=-1){f=v.lastIndexOf("/",0)==0,v=v.split("/");const w=[];for(let C=0;C<v.length;){const U=v[C++];U=="."?f&&C==v.length&&w.push(""):U==".."?((w.length>1||w.length==1&&w[0]!="")&&w.pop(),f&&C==v.length&&w.push("")):(w.push(U),f=!0)}f=w.join("/")}else f=v}return u?c.h=f:u=i.i.toString()!=="",u?ls(c,go(i.i)):u=!!i.m,u&&(c.m=i.m),c};function Dt(i){return new Ht(i)}function rn(i,c,u){i.j=u?on(c,!0):c,i.j&&(i.j=i.j.replace(/:$/,""))}function sn(i,c){if(c){if(c=Number(c),isNaN(c)||c<0)throw Error("Bad port number "+c);i.u=c}else i.u=null}function ls(i,c,u){c instanceof cn?(i.i=c,hl(i.i,i.l)):(u||(c=an(c,ul)),i.i=new cn(c,i.l))}function Y(i,c,u){i.i.set(c,u)}function Qn(i){return Y(i,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),i}function on(i,c){return i?c?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function an(i,c,u){return typeof i=="string"?(i=encodeURI(i).replace(c,ol),u&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function ol(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var lo=/[#\/\?@]/g,al=/[#\?:]/g,cl=/[#\?]/g,ul=/[#\?@]/g,ll=/#/g;function cn(i,c){this.h=this.g=null,this.i=i||null,this.j=!!c}function ge(i){i.g||(i.g=new Map,i.h=0,i.i&&il(i.i,function(c,u){i.add(decodeURIComponent(c.replace(/\+/g," ")),u)}))}n=cn.prototype,n.add=function(i,c){ge(this),this.i=null,i=Ce(this,i);let u=this.g.get(i);return u||this.g.set(i,u=[]),u.push(c),this.h+=1,this};function ho(i,c){ge(i),c=Ce(i,c),i.g.has(c)&&(i.i=null,i.h-=i.g.get(c).length,i.g.delete(c))}function fo(i,c){return ge(i),c=Ce(i,c),i.g.has(c)}n.forEach=function(i,c){ge(this),this.g.forEach(function(u,f){u.forEach(function(v){i.call(c,v,f,this)},this)},this)};function mo(i,c){ge(i);let u=[];if(typeof c=="string")fo(i,c)&&(u=u.concat(i.g.get(Ce(i,c))));else for(i=Array.from(i.g.values()),c=0;c<i.length;c++)u=u.concat(i[c]);return u}n.set=function(i,c){return ge(this),this.i=null,i=Ce(this,i),fo(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[c]),this.h+=1,this},n.get=function(i,c){return i?(i=mo(this,i),i.length>0?String(i[0]):c):c};function po(i,c,u){ho(i,c),u.length>0&&(i.i=null,i.g.set(Ce(i,c),S(u)),i.h+=u.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],c=Array.from(this.g.keys());for(let f=0;f<c.length;f++){var u=c[f];const v=en(u);u=mo(this,u);for(let w=0;w<u.length;w++){let C=v;u[w]!==""&&(C+="="+en(u[w])),i.push(C)}}return this.i=i.join("&")};function go(i){const c=new cn;return c.i=i.i,i.g&&(c.g=new Map(i.g),c.h=i.h),c}function Ce(i,c){return c=String(c),i.j&&(c=c.toLowerCase()),c}function hl(i,c){c&&!i.j&&(ge(i),i.i=null,i.g.forEach(function(u,f){const v=f.toLowerCase();f!=v&&(ho(this,f),po(this,v,u))},i)),i.j=c}function dl(i,c){const u=new tn;if(a.Image){const f=new Image;f.onload=m(Kt,u,"TestLoadImage: loaded",!0,c,f),f.onerror=m(Kt,u,"TestLoadImage: error",!1,c,f),f.onabort=m(Kt,u,"TestLoadImage: abort",!1,c,f),f.ontimeout=m(Kt,u,"TestLoadImage: timeout",!1,c,f),a.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=i}else c(!1)}function fl(i,c){const u=new tn,f=new AbortController,v=setTimeout(()=>{f.abort(),Kt(u,"TestPingServer: timeout",!1,c)},1e4);fetch(i,{signal:f.signal}).then(w=>{clearTimeout(v),w.ok?Kt(u,"TestPingServer: ok",!0,c):Kt(u,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(v),Kt(u,"TestPingServer: error",!1,c)})}function Kt(i,c,u,f,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),f(u)}catch{}}function ml(){this.g=new Yu}function hs(i){this.i=i.Sb||null,this.h=i.ab||!1}E(hs,Gi),hs.prototype.g=function(){return new Yn(this.i,this.h)};function Yn(i,c){pt.call(this),this.H=i,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}E(Yn,pt),n=Yn.prototype,n.open=function(i,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=i,this.D=c,this.readyState=1,ln(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const c={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};i&&(c.body=i),(this.H||a).fetch(new Request(this.D,c)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,un(this)),this.readyState=0},n.Pa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,ln(this)),this.g&&(this.readyState=3,ln(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;_o(this)}else i.text().then(this.Oa.bind(this),this.ga.bind(this))};function _o(i){i.j.read().then(i.Ma.bind(i)).catch(i.ga.bind(i))}n.Ma=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var c=i.value?i.value:new Uint8Array(0);(c=this.B.decode(c,{stream:!i.done}))&&(this.response=this.responseText+=c)}i.done?un(this):ln(this),this.readyState==3&&_o(this)}},n.Oa=function(i){this.g&&(this.response=this.responseText=i,un(this))},n.Na=function(i){this.g&&(this.response=i,un(this))},n.ga=function(){this.g&&un(this)};function un(i){i.readyState=4,i.l=null,i.j=null,i.B=null,ln(i)}n.setRequestHeader=function(i,c){this.A.append(i,c)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],c=this.h.entries();for(var u=c.next();!u.done;)u=u.value,i.push(u[0]+": "+u[1]),u=c.next();return i.join(`\r
`)};function ln(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(Yn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function yo(i){let c="";return $n(i,function(u,f){c+=f,c+=":",c+=u,c+=`\r
`}),c}function ds(i,c,u){t:{for(f in u){var f=!1;break t}f=!0}f||(u=yo(u),typeof i=="string"?u!=null&&en(u):Y(i,c,u))}function tt(i){pt.call(this),this.headers=new Map,this.L=i||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}E(tt,pt);var pl=/^https?$/i,gl=["POST","PUT"];n=tt.prototype,n.Fa=function(i){this.H=i},n.ea=function(i,c,u,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);c=c?c.toUpperCase():"GET",this.D=i,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Xi.g(),this.g.onreadystatechange=R(d(this.Ca,this));try{this.B=!0,this.g.open(c,String(i),!0),this.B=!1}catch(w){Eo(this,w);return}if(i=u||"",u=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var v in f)u.set(v,f[v]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const w of f.keys())u.set(w,f.get(w));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(u.keys()).find(w=>w.toLowerCase()=="content-type"),v=a.FormData&&i instanceof a.FormData,!(Array.prototype.indexOf.call(gl,c,void 0)>=0)||f||v||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[w,C]of u)this.g.setRequestHeader(w,C);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(i),this.v=!1}catch(w){Eo(this,w)}};function Eo(i,c){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=c,i.o=5,To(i),Jn(i)}function To(i){i.A||(i.A=!0,Et(i,"complete"),Et(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=i||7,Et(this,"complete"),Et(this,"abort"),Jn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Jn(this,!0)),tt.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Io(this):this.Xa())},n.Xa=function(){Io(this)};function Io(i){if(i.h&&typeof o<"u"){if(i.v&&Wt(i)==4)setTimeout(i.Ca.bind(i),0);else if(Et(i,"readystatechange"),Wt(i)==4){i.h=!1;try{const w=i.ca();t:switch(w){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break t;default:c=!1}var u;if(!(u=c)){var f;if(f=w===0){let C=String(i.D).match(uo)[1]||null;!C&&a.self&&a.self.location&&(C=a.self.location.protocol.slice(0,-1)),f=!pl.test(C?C.toLowerCase():"")}u=f}if(u)Et(i,"complete"),Et(i,"success");else{i.o=6;try{var v=Wt(i)>2?i.g.statusText:""}catch{v=""}i.l=v+" ["+i.ca()+"]",To(i)}}finally{Jn(i)}}}}function Jn(i,c){if(i.g){i.m&&(clearTimeout(i.m),i.m=null);const u=i.g;i.g=null,c||Et(i,"ready");try{u.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Wt(i){return i.g?i.g.readyState:0}n.ca=function(){try{return Wt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(i){if(this.g){var c=this.g.responseText;return i&&c.indexOf(i)==0&&(c=c.substring(i.length)),Qu(c)}};function vo(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.F){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function _l(i){const c={};i=(i.g&&Wt(i)>=2&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<i.length;f++){if(g(i[f]))continue;var u=el(i[f]);const v=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();const w=c[v]||[];c[v]=w,w.push(u)}$u(c,function(f){return f.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function hn(i,c,u){return u&&u.internalChannelParams&&u.internalChannelParams[i]||c}function Ao(i){this.za=0,this.i=[],this.j=new tn,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=hn("failFast",!1,i),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=hn("baseRetryDelayMs",5e3,i),this.Za=hn("retryDelaySeedMs",1e4,i),this.Ta=hn("forwardChannelMaxRetries",2,i),this.va=hn("forwardChannelRequestTimeoutMs",2e4,i),this.ma=i&&i.xmlHttpFactory||void 0,this.Ua=i&&i.Rb||void 0,this.Aa=i&&i.useFetchStreams||!1,this.O=void 0,this.L=i&&i.supportsCrossDomainXhr||!1,this.M="",this.h=new so(i&&i.concurrentRequestLimit),this.Ba=new ml,this.S=i&&i.fastHandshake||!1,this.R=i&&i.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=i&&i.Pb||!1,i&&i.ua&&this.j.ua(),i&&i.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&i&&i.detectBufferingProxy||!1,this.ia=void 0,i&&i.longPollingTimeout&&i.longPollingTimeout>0&&(this.ia=i.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Ao.prototype,n.ka=8,n.I=1,n.connect=function(i,c,u,f){Tt(0),this.W=i,this.H=c||{},u&&f!==void 0&&(this.H.OSID=u,this.H.OAID=f),this.F=this.X,this.J=No(this,null,this.W),Zn(this)};function fs(i){if(wo(i),i.I==3){var c=i.V++,u=Dt(i.J);if(Y(u,"SID",i.M),Y(u,"RID",c),Y(u,"TYPE","terminate"),dn(i,u),c=new Gt(i,i.j,c),c.M=2,c.A=Qn(Dt(u)),u=!1,a.navigator&&a.navigator.sendBeacon)try{u=a.navigator.sendBeacon(c.A.toString(),"")}catch{}!u&&a.Image&&(new Image().src=c.A,u=!0),u||(c.g=ko(c.j,null),c.g.ea(c.A)),c.F=Date.now(),Wn(c)}Do(i)}function Xn(i){i.g&&(ps(i),i.g.cancel(),i.g=null)}function wo(i){Xn(i),i.v&&(a.clearTimeout(i.v),i.v=null),tr(i),i.h.cancel(),i.m&&(typeof i.m=="number"&&a.clearTimeout(i.m),i.m=null)}function Zn(i){if(!io(i.h)&&!i.m){i.m=!0;var c=i.Ea;ft||p(),mt||(ft(),mt=!0),T.add(c,i),i.D=0}}function yl(i,c){return oo(i.h)>=i.h.j-(i.m?1:0)?!1:i.m?(i.i=c.G.concat(i.i),!0):i.I==1||i.I==2||i.D>=(i.Sa?0:i.Ta)?!1:(i.m=Ze(d(i.Ea,i,c),Co(i,i.D)),i.D++,!0)}n.Ea=function(i){if(this.m)if(this.m=null,this.I==1){if(!i){this.V=Math.floor(Math.random()*1e5),i=this.V++;const v=new Gt(this,this.j,i);let w=this.o;if(this.U&&(w?(w=Mi(w),Li(w,this.U)):w=this.U),this.u!==null||this.R||(v.J=w,w=null),this.S)t:{for(var c=0,u=0;u<this.i.length;u++){e:{var f=this.i[u];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break e}f=void 0}if(f===void 0)break;if(c+=f,c>4096){c=u;break t}if(c===4096||u===this.i.length-1){c=u+1;break t}}c=1e3}else c=1e3;c=So(this,v,c),u=Dt(this.J),Y(u,"RID",i),Y(u,"CVER",22),this.G&&Y(u,"X-HTTP-Session-Id",this.G),dn(this,u),w&&(this.R?c="headers="+en(yo(w))+"&"+c:this.u&&ds(u,this.u,w)),us(this.h,v),this.Ra&&Y(u,"TYPE","init"),this.S?(Y(u,"$req",c),Y(u,"SID","null"),v.U=!0,is(v,u,null)):is(v,u,c),this.I=2}}else this.I==3&&(i?Ro(this,i):this.i.length==0||io(this.h)||Ro(this))};function Ro(i,c){var u;c?u=c.l:u=i.V++;const f=Dt(i.J);Y(f,"SID",i.M),Y(f,"RID",u),Y(f,"AID",i.K),dn(i,f),i.u&&i.o&&ds(f,i.u,i.o),u=new Gt(i,i.j,u,i.D+1),i.u===null&&(u.J=i.o),c&&(i.i=c.G.concat(i.i)),c=So(i,u,1e3),u.H=Math.round(i.va*.5)+Math.round(i.va*.5*Math.random()),us(i.h,u),is(u,f,c)}function dn(i,c){i.H&&$n(i.H,function(u,f){Y(c,f,u)}),i.l&&$n({},function(u,f){Y(c,f,u)})}function So(i,c,u){u=Math.min(i.i.length,u);const f=i.l?d(i.l.Ka,i.l,i):null;t:{var v=i.i;let U=-1;for(;;){const ot=["count="+u];U==-1?u>0?(U=v[0].g,ot.push("ofs="+U)):U=0:ot.push("ofs="+U);let W=!0;for(let ct=0;ct<u;ct++){var w=v[ct].g;const Nt=v[ct].map;if(w-=U,w<0)U=Math.max(0,v[ct].g-100),W=!1;else try{w="req"+w+"_"||"";try{var C=Nt instanceof Map?Nt:Object.entries(Nt);for(const[ye,Qt]of C){let Yt=Qt;l(Qt)&&(Yt=ts(Qt)),ot.push(w+ye+"="+encodeURIComponent(Yt))}}catch(ye){throw ot.push(w+"type="+encodeURIComponent("_badmap")),ye}}catch{f&&f(Nt)}}if(W){C=ot.join("&");break t}}C=void 0}return i=i.i.splice(0,u),c.G=i,C}function Vo(i){if(!i.g&&!i.v){i.Y=1;var c=i.Da;ft||p(),mt||(ft(),mt=!0),T.add(c,i),i.A=0}}function ms(i){return i.g||i.v||i.A>=3?!1:(i.Y++,i.v=Ze(d(i.Da,i),Co(i,i.A)),i.A++,!0)}n.Da=function(){if(this.v=null,Po(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var i=4*this.T;this.j.info("BP detection timer enabled: "+i),this.B=Ze(d(this.Wa,this),i)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Tt(10),Xn(this),Po(this))};function ps(i){i.B!=null&&(a.clearTimeout(i.B),i.B=null)}function Po(i){i.g=new Gt(i,i.j,"rpc",i.Y),i.u===null&&(i.g.J=i.o),i.g.P=0;var c=Dt(i.na);Y(c,"RID","rpc"),Y(c,"SID",i.M),Y(c,"AID",i.K),Y(c,"CI",i.F?"0":"1"),!i.F&&i.ia&&Y(c,"TO",i.ia),Y(c,"TYPE","xmlhttp"),dn(i,c),i.u&&i.o&&ds(c,i.u,i.o),i.O&&(i.g.H=i.O);var u=i.g;i=i.ba,u.M=1,u.A=Qn(Dt(c)),u.u=null,u.R=!0,eo(u,i)}n.Va=function(){this.C!=null&&(this.C=null,Xn(this),ms(this),Tt(19))};function tr(i){i.C!=null&&(a.clearTimeout(i.C),i.C=null)}function bo(i,c){var u=null;if(i.g==c){tr(i),ps(i),i.g=null;var f=2}else if(cs(i.h,c))u=c.G,ao(i.h,c),f=1;else return;if(i.I!=0){if(c.o)if(f==1){u=c.u?c.u.length:0,c=Date.now()-c.F;var v=i.D;f=Hn(),Et(f,new Yi(f,u)),Zn(i)}else Vo(i);else if(v=c.m,v==3||v==0&&c.X>0||!(f==1&&yl(i,c)||f==2&&ms(i)))switch(u&&u.length>0&&(c=i.h,c.i=c.i.concat(u)),v){case 1:_e(i,5);break;case 4:_e(i,10);break;case 3:_e(i,6);break;default:_e(i,2)}}}function Co(i,c){let u=i.Qa+Math.floor(Math.random()*i.Za);return i.isActive()||(u*=2),u*c}function _e(i,c){if(i.j.info("Error code "+c),c==2){var u=d(i.bb,i),f=i.Ua;const v=!f;f=new Ht(f||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||rn(f,"https"),Qn(f),v?dl(f.toString(),u):fl(f.toString(),u)}else Tt(2);i.I=0,i.l&&i.l.pa(c),Do(i),wo(i)}n.bb=function(i){i?(this.j.info("Successfully pinged google.com"),Tt(2)):(this.j.info("Failed to ping google.com"),Tt(1))};function Do(i){if(i.I=0,i.ja=[],i.l){const c=co(i.h);(c.length!=0||i.i.length!=0)&&(b(i.ja,c),b(i.ja,i.i),i.h.i.length=0,S(i.i),i.i.length=0),i.l.oa()}}function No(i,c,u){var f=u instanceof Ht?Dt(u):new Ht(u);if(f.g!="")c&&(f.g=c+"."+f.g),sn(f,f.u);else{var v=a.location;f=v.protocol,c=c?c+"."+v.hostname:v.hostname,v=+v.port;const w=new Ht(null);f&&rn(w,f),c&&(w.g=c),v&&sn(w,v),u&&(w.h=u),f=w}return u=i.G,c=i.wa,u&&c&&Y(f,u,c),Y(f,"VER",i.ka),dn(i,f),f}function ko(i,c,u){if(c&&!i.L)throw Error("Can't create secondary domain capable XhrIo object.");return c=i.Aa&&!i.ma?new tt(new hs({ab:u})):new tt(i.ma),c.Fa(i.L),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function xo(){}n=xo.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function er(){}er.prototype.g=function(i,c){return new wt(i,c)};function wt(i,c){pt.call(this),this.g=new Ao(c),this.l=i,this.h=c&&c.messageUrlParams||null,i=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(i?i["X-WebChannel-Content-Type"]=c.messageContentType:i={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.sa&&(i?i["X-WebChannel-Client-Profile"]=c.sa:i={"X-WebChannel-Client-Profile":c.sa}),this.g.U=i,(i=c&&c.Qb)&&!g(i)&&(this.g.u=i),this.A=c&&c.supportsCrossDomainXhr||!1,this.v=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!g(c)&&(this.g.G=c,i=this.h,i!==null&&c in i&&(i=this.h,c in i&&delete i[c])),this.j=new De(this)}E(wt,pt),wt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},wt.prototype.close=function(){fs(this.g)},wt.prototype.o=function(i){var c=this.g;if(typeof i=="string"){var u={};u.__data__=i,i=u}else this.v&&(u={},u.__data__=ts(i),i=u);c.i.push(new sl(c.Ya++,i)),c.I==3&&Zn(c)},wt.prototype.N=function(){this.g.l=null,delete this.j,fs(this.g),delete this.g,wt.Z.N.call(this)};function Mo(i){es.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var c=i.__sm__;if(c){t:{for(const u in c){i=u;break t}i=void 0}(this.i=i)&&(i=this.i,c=c!==null&&i in c?c[i]:void 0),this.data=c}else this.data=i}E(Mo,es);function Oo(){ns.call(this),this.status=1}E(Oo,ns);function De(i){this.g=i}E(De,xo),De.prototype.ra=function(){Et(this.g,"a")},De.prototype.qa=function(i){Et(this.g,new Mo(i))},De.prototype.pa=function(i){Et(this.g,new Oo)},De.prototype.oa=function(){Et(this.g,"b")},er.prototype.createWebChannel=er.prototype.g,wt.prototype.send=wt.prototype.o,wt.prototype.open=wt.prototype.m,wt.prototype.close=wt.prototype.close,fc=function(){return new er},dc=function(){return Hn()},hc=me,Ns={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Kn.NO_ERROR=0,Kn.TIMEOUT=8,Kn.HTTP_ERROR=6,cr=Kn,Ji.COMPLETE="complete",lc=Ji,Hi.EventType=Je,Je.OPEN="a",Je.CLOSE="b",Je.ERROR="c",Je.MESSAGE="d",pt.prototype.listen=pt.prototype.J,_n=Hi,tt.prototype.listenOnce=tt.prototype.K,tt.prototype.getLastError=tt.prototype.Ha,tt.prototype.getLastErrorCode=tt.prototype.ya,tt.prototype.getStatus=tt.prototype.ca,tt.prototype.getResponseJson=tt.prototype.La,tt.prototype.getResponseText=tt.prototype.la,tt.prototype.send=tt.prototype.ea,tt.prototype.setWithCredentials=tt.prototype.Fa,uc=tt}).apply(typeof rr<"u"?rr:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}_t.UNAUTHENTICATED=new _t(null),_t.GOOGLE_CREDENTIALS=new _t("google-credentials-uid"),_t.FIRST_PARTY=new _t("first-party-uid"),_t.MOCK_USER=new _t("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ge="12.11.0";function id(n){Ge=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ve=new ec("@firebase/firestore");function Ne(){return ve.logLevel}function N(n,...t){if(ve.logLevel<=$.DEBUG){const e=t.map(Ys);ve.debug(`Firestore (${Ge}): ${n}`,...e)}}function $t(n,...t){if(ve.logLevel<=$.ERROR){const e=t.map(Ys);ve.error(`Firestore (${Ge}): ${n}`,...e)}}function Ae(n,...t){if(ve.logLevel<=$.WARN){const e=t.map(Ys);ve.warn(`Firestore (${Ge}): ${n}`,...e)}}function Ys(n){if(typeof n=="string")return n;try{return function(e){return JSON.stringify(e)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,mc(n,r,e)}function mc(n,t,e){let r=`FIRESTORE (${Ge}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw $t(r),new Error(r)}function z(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||mc(t,s,r)}function L(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends ze{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class od{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(_t.UNAUTHENTICATED))}shutdown(){}}class ad{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class cd{constructor(t){this.t=t,this.currentUser=_t.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){z(this.o===void 0,42304);let r=this.i;const s=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve();let o=new Mt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Mt,t.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const h=o;t.enqueueRetryable(async()=>{await h.promise,await s(this.currentUser)})},l=h=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>l(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?l(h):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Mt)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(r=>this.i!==t?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(z(typeof r.accessToken=="string",31837,{l:r}),new pc(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return z(t===null||typeof t=="string",2055,{h:t}),new _t(t)}}class ud{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=_t.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const t=this.A();return t&&this.R.set("Authorization",t),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class ld{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new ud(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(_t.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Qo{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class hd{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,zh(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){z(this.o===void 0,3512);const r=o=>{o.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,N("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>r(o))};const s=o=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Qo(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(z(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new Qo(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dd(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=dd(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<e&&(r+=t.charAt(s[o]%62))}return r}}function B(n,t){return n<t?-1:n>t?1:0}function ks(n,t){const e=Math.min(n.length,t.length);for(let r=0;r<e;r++){const s=n.charAt(r),o=t.charAt(r);if(s!==o)return Is(s)===Is(o)?B(s,o):Is(s)?1:-1}return B(n.length,t.length)}const fd=55296,md=57343;function Is(n){const t=n.charCodeAt(0);return t>=fd&&t<=md}function Ue(n,t,e){return n.length===t.length&&n.every((r,s)=>e(r,t[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yo="__name__";class xt{constructor(t,e,r){e===void 0?e=0:e>t.length&&O(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&O(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return xt.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof xt?t.forEach(r=>{e.push(r)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const o=xt.compareSegments(t.get(s),e.get(s));if(o!==0)return o}return B(t.length,e.length)}static compareSegments(t,e){const r=xt.isNumericId(t),s=xt.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?xt.extractNumericId(t).compare(xt.extractNumericId(e)):ks(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return ne.fromString(t.substring(4,t.length-2))}}class Q extends xt{construct(t,e,r){return new Q(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new D(V.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter(s=>s.length>0))}return new Q(e)}static emptyPath(){return new Q([])}}const pd=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ht extends xt{construct(t,e,r){return new ht(t,e,r)}static isValidIdentifier(t){return pd.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ht.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Yo}static keyField(){return new ht([Yo])}static fromServerFormat(t){const e=[];let r="",s=0;const o=()=>{if(r.length===0)throw new D(V.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let a=!1;for(;s<t.length;){const l=t[s];if(l==="\\"){if(s+1===t.length)throw new D(V.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new D(V.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(o(),s++)}if(o(),a)throw new D(V.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ht(e)}static emptyPath(){return new ht([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(t){this.path=t}static fromPath(t){return new M(Q.fromString(t))}static fromName(t){return new M(Q.fromString(t).popFirst(5))}static empty(){return new M(Q.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Q.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return Q.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new M(new Q(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gc(n,t,e){if(!e)throw new D(V.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function gd(n,t,e,r){if(t===!0&&r===!0)throw new D(V.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Jo(n){if(!M.isDocumentKey(n))throw new D(V.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Xo(n){if(M.isDocumentKey(n))throw new D(V.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function _c(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Cr(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(r){return r.constructor?r.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":O(12329,{type:typeof n})}function Ut(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new D(V.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Cr(n);throw new D(V.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function st(n,t){const e={typeString:n};return t&&(e.value=t),e}function On(n,t){if(!_c(n))throw new D(V.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const s=t[r].typeString,o="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){e=`JSON field '${r}' must be a ${s}.`;break}if(o!==void 0&&a!==o.value){e=`Expected '${r}' field to equal '${o.value}'`;break}}if(e)throw new D(V.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zo=-62135596800,ta=1e6;class J{static now(){return J.fromMillis(Date.now())}static fromDate(t){return J.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*ta);return new J(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new D(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new D(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Zo)throw new D(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new D(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/ta}_compareTo(t){return this.seconds===t.seconds?B(this.nanoseconds,t.nanoseconds):B(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:J._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(On(t,J._jsonSchema))return new J(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Zo;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}J._jsonSchemaVersion="firestore/timestamp/1.0",J._jsonSchema={type:st("string",J._jsonSchemaVersion),seconds:st("number"),nanoseconds:st("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{static fromTimestamp(t){return new F(t)}static min(){return new F(new J(0,0))}static max(){return new F(new J(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pn=-1;function _d(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=F.fromTimestamp(r===1e9?new J(e+1,0):new J(e,r));return new se(s,M.empty(),t)}function yd(n){return new se(n.readTime,n.key,Pn)}class se{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new se(F.min(),M.empty(),Pn)}static max(){return new se(F.max(),M.empty(),Pn)}}function Ed(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=M.comparator(n.documentKey,t.documentKey),e!==0?e:B(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Td="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Id{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function He(n){if(n.code!==V.FAILED_PRECONDITION||n.message!==Td)throw n;N("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&O(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new P((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof P?e:P.resolve(e)}catch(e){return P.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):P.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):P.reject(e)}static resolve(t){return new P((e,r)=>{e(t)})}static reject(t){return new P((e,r)=>{r(t)})}static waitFor(t){return new P((e,r)=>{let s=0,o=0,a=!1;t.forEach(l=>{++s,l.next(()=>{++o,a&&o===s&&e()},h=>r(h))}),a=!0,o===s&&e()})}static or(t){let e=P.resolve(!1);for(const r of t)e=e.next(s=>s?P.resolve(s):r());return e}static forEach(t,e){const r=[];return t.forEach((s,o)=>{r.push(e.call(this,s,o))}),this.waitFor(r)}static mapArray(t,e){return new P((r,s)=>{const o=t.length,a=new Array(o);let l=0;for(let h=0;h<o;h++){const d=h;e(t[d]).next(m=>{a[d]=m,++l,l===o&&r(a)},m=>s(m))}})}static doWhile(t,e){return new P((r,s)=>{const o=()=>{t()===!0?e().next(()=>{o()},s):r()};o()})}}function vd(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function Ke(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dr{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>e.writeSequenceNumber(r))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}Dr.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xs=-1;function Nr(n){return n==null}function yr(n){return n===0&&1/n==-1/0}function Ad(n){return typeof n=="number"&&Number.isInteger(n)&&!yr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yc="";function wd(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=ea(t)),t=Rd(n.get(e),t);return ea(t)}function Rd(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const o=n.charAt(s);switch(o){case"\0":e+="";break;case yc:e+="";break;default:e+=o}}return e}function ea(n){return n+yc+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function na(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function le(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function Sd(n,t){const e=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.push(t(n[r],r,n));return e}function Ec(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{constructor(t,e){this.comparator=t,this.root=e||lt.EMPTY}insert(t,e){return new X(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,lt.BLACK,null,null))}remove(t){return new X(this.comparator,this.root.remove(t,this.comparator).copy(null,null,lt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,r)=>(t(e,r),!1))}toString(){const t=[];return this.inorderTraversal((e,r)=>(t.push(`${e}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new sr(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new sr(this.root,t,this.comparator,!1)}getReverseIterator(){return new sr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new sr(this.root,t,this.comparator,!0)}}class sr{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&s&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class lt{constructor(t,e,r,s,o){this.key=t,this.value=e,this.color=r??lt.RED,this.left=s??lt.EMPTY,this.right=o??lt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,o){return new lt(t??this.key,e??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const o=r(t,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(t,e,r),null):o===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return lt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return lt.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,lt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,lt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw O(43730,{key:this.key,value:this.value});if(this.right.isRed())throw O(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw O(27949);return t+(this.isRed()?0:1)}}lt.EMPTY=null,lt.RED=!0,lt.BLACK=!1;lt.EMPTY=new class{constructor(){this.size=0}get key(){throw O(57766)}get value(){throw O(16141)}get color(){throw O(16727)}get left(){throw O(29726)}get right(){throw O(36894)}copy(t,e,r,s,o){return this}insert(t,e,r){return new lt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(t){this.comparator=t,this.data=new X(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,r)=>(t(e),!1))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new ra(this.data.getIterator())}getIteratorFrom(t){return new ra(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(r=>{e=e.add(r)}),e}isEqual(t){if(!(t instanceof at)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new at(this.comparator);return e.data=t,e}}class ra{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(t){this.fields=t,t.sort(ht.comparator)}static empty(){return new Rt([])}unionWith(t){let e=new at(ht.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new Rt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Ue(this.fields,t.fields,(e,r)=>e.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tc extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Tc("Invalid base64 string: "+o):o}}(t);return new dt(e)}static fromUint8Array(t){const e=function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o}(t);return new dt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return B(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}dt.EMPTY_BYTE_STRING=new dt("");const Vd=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ie(n){if(z(!!n,39018),typeof n=="string"){let t=0;const e=Vd.exec(n);if(z(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:et(n.seconds),nanos:et(n.nanos)}}function et(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function oe(n){return typeof n=="string"?dt.fromBase64String(n):dt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ic="server_timestamp",vc="__type__",Ac="__previous_value__",wc="__local_write_time__";function Zs(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[vc])==null?void 0:r.stringValue)===Ic}function kr(n){const t=n.mapValue.fields[Ac];return Zs(t)?kr(t):t}function bn(n){const t=ie(n.mapValue.fields[wc].timestampValue);return new J(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pd{constructor(t,e,r,s,o,a,l,h,d,m,E){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=h,this.useFetchStreams=d,this.isUsingEmulator=m,this.apiKey=E}}const Er="(default)";class Cn{constructor(t,e){this.projectId=t,this.database=e||Er}static empty(){return new Cn("","")}get isDefaultDatabase(){return this.database===Er}isEqual(t){return t instanceof Cn&&t.projectId===this.projectId&&t.database===this.database}}function bd(n,t){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new D(V.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Cn(n.options.projectId,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rc="__type__",Cd="__max__",ir={mapValue:{}},Sc="__vector__",Tr="value";function ae(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Zs(n)?4:Nd(n)?9007199254740991:Dd(n)?10:11:O(28295,{value:n})}function Bt(n,t){if(n===t)return!0;const e=ae(n);if(e!==ae(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return bn(n).isEqual(bn(t));case 3:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const a=ie(s.timestampValue),l=ie(o.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(s,o){return oe(s.bytesValue).isEqual(oe(o.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(s,o){return et(s.geoPointValue.latitude)===et(o.geoPointValue.latitude)&&et(s.geoPointValue.longitude)===et(o.geoPointValue.longitude)}(n,t);case 2:return function(s,o){if("integerValue"in s&&"integerValue"in o)return et(s.integerValue)===et(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const a=et(s.doubleValue),l=et(o.doubleValue);return a===l?yr(a)===yr(l):isNaN(a)&&isNaN(l)}return!1}(n,t);case 9:return Ue(n.arrayValue.values||[],t.arrayValue.values||[],Bt);case 10:case 11:return function(s,o){const a=s.mapValue.fields||{},l=o.mapValue.fields||{};if(na(a)!==na(l))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(l[h]===void 0||!Bt(a[h],l[h])))return!1;return!0}(n,t);default:return O(52216,{left:n})}}function Dn(n,t){return(n.values||[]).find(e=>Bt(e,t))!==void 0}function Be(n,t){if(n===t)return 0;const e=ae(n),r=ae(t);if(e!==r)return B(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return B(n.booleanValue,t.booleanValue);case 2:return function(o,a){const l=et(o.integerValue||o.doubleValue),h=et(a.integerValue||a.doubleValue);return l<h?-1:l>h?1:l===h?0:isNaN(l)?isNaN(h)?0:-1:1}(n,t);case 3:return sa(n.timestampValue,t.timestampValue);case 4:return sa(bn(n),bn(t));case 5:return ks(n.stringValue,t.stringValue);case 6:return function(o,a){const l=oe(o),h=oe(a);return l.compareTo(h)}(n.bytesValue,t.bytesValue);case 7:return function(o,a){const l=o.split("/"),h=a.split("/");for(let d=0;d<l.length&&d<h.length;d++){const m=B(l[d],h[d]);if(m!==0)return m}return B(l.length,h.length)}(n.referenceValue,t.referenceValue);case 8:return function(o,a){const l=B(et(o.latitude),et(a.latitude));return l!==0?l:B(et(o.longitude),et(a.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return ia(n.arrayValue,t.arrayValue);case 10:return function(o,a){var R,S,b,x;const l=o.fields||{},h=a.fields||{},d=(R=l[Tr])==null?void 0:R.arrayValue,m=(S=h[Tr])==null?void 0:S.arrayValue,E=B(((b=d==null?void 0:d.values)==null?void 0:b.length)||0,((x=m==null?void 0:m.values)==null?void 0:x.length)||0);return E!==0?E:ia(d,m)}(n.mapValue,t.mapValue);case 11:return function(o,a){if(o===ir.mapValue&&a===ir.mapValue)return 0;if(o===ir.mapValue)return 1;if(a===ir.mapValue)return-1;const l=o.fields||{},h=Object.keys(l),d=a.fields||{},m=Object.keys(d);h.sort(),m.sort();for(let E=0;E<h.length&&E<m.length;++E){const R=ks(h[E],m[E]);if(R!==0)return R;const S=Be(l[h[E]],d[m[E]]);if(S!==0)return S}return B(h.length,m.length)}(n.mapValue,t.mapValue);default:throw O(23264,{he:e})}}function sa(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return B(n,t);const e=ie(n),r=ie(t),s=B(e.seconds,r.seconds);return s!==0?s:B(e.nanos,r.nanos)}function ia(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const o=Be(e[s],r[s]);if(o)return o}return B(e.length,r.length)}function je(n){return xs(n)}function xs(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){const r=ie(e);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return oe(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return M.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let r="[",s=!0;for(const o of e.values||[])s?s=!1:r+=",",r+=xs(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(e){const r=Object.keys(e.fields||{}).sort();let s="{",o=!0;for(const a of r)o?o=!1:s+=",",s+=`${a}:${xs(e.fields[a])}`;return s+"}"}(n.mapValue):O(61005,{value:n})}function ur(n){switch(ae(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=kr(n);return t?16+ur(t):16;case 5:return 2*n.stringValue.length;case 6:return oe(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,o)=>s+ur(o),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return le(r.fields,(o,a)=>{s+=o.length+ur(a)}),s}(n.mapValue);default:throw O(13486,{value:n})}}function oa(n,t){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${t.path.canonicalString()}`}}function Ms(n){return!!n&&"integerValue"in n}function ti(n){return!!n&&"arrayValue"in n}function aa(n){return!!n&&"nullValue"in n}function ca(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function lr(n){return!!n&&"mapValue"in n}function Dd(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[Rc])==null?void 0:r.stringValue)===Sc}function In(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return le(n.mapValue.fields,(e,r)=>t.mapValue.fields[e]=In(r)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=In(n.arrayValue.values[e]);return t}return{...n}}function Nd(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Cd}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(t){this.value=t}static empty(){return new It({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!lr(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=In(e)}setAll(t){let e=ht.emptyPath(),r={},s=[];t.forEach((a,l)=>{if(!e.isImmediateParentOf(l)){const h=this.getFieldsMap(e);this.applyChanges(h,r,s),r={},s=[],e=l.popLast()}a?r[l.lastSegment()]=In(a):s.push(l.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,r,s)}delete(t){const e=this.field(t.popLast());lr(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Bt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];lr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){le(e,(s,o)=>t[s]=o);for(const s of r)delete t[s]}clone(){return new It(In(this.value))}}function Vc(n){const t=[];return le(n.fields,(e,r)=>{const s=new ht([e]);if(lr(r)){const o=Vc(r.mapValue).fields;if(o.length===0)t.push(s);else for(const a of o)t.push(s.child(a))}else t.push(s)}),new Rt(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(t,e,r,s,o,a,l){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=o,this.data=a,this.documentState=l}static newInvalidDocument(t){return new yt(t,0,F.min(),F.min(),F.min(),It.empty(),0)}static newFoundDocument(t,e,r,s){return new yt(t,1,e,F.min(),r,s,0)}static newNoDocument(t,e){return new yt(t,2,e,F.min(),F.min(),It.empty(),0)}static newUnknownDocument(t,e){return new yt(t,3,e,F.min(),F.min(),It.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(F.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=It.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=It.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=F.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof yt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new yt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(t,e){this.position=t,this.inclusive=e}}function ua(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const o=t[s],a=n.position[s];if(o.field.isKeyField()?r=M.comparator(M.fromName(a.referenceValue),e.key):r=Be(a,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function la(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Bt(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(t,e="asc"){this.field=t,this.dir=e}}function kd(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pc{}class rt extends Pc{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new Md(t,e,r):e==="array-contains"?new Fd(t,r):e==="in"?new Ud(t,r):e==="not-in"?new Bd(t,r):e==="array-contains-any"?new jd(t,r):new rt(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new Od(t,r):new Ld(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Be(e,this.value)):e!==null&&ae(this.value)===ae(e)&&this.matchesComparison(Be(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return O(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ct extends Pc{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new Ct(t,e)}matches(t){return bc(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function bc(n){return n.op==="and"}function Cc(n){return xd(n)&&bc(n)}function xd(n){for(const t of n.filters)if(t instanceof Ct)return!1;return!0}function Os(n){if(n instanceof rt)return n.field.canonicalString()+n.op.toString()+je(n.value);if(Cc(n))return n.filters.map(t=>Os(t)).join(",");{const t=n.filters.map(e=>Os(e)).join(",");return`${n.op}(${t})`}}function Dc(n,t){return n instanceof rt?function(r,s){return s instanceof rt&&r.op===s.op&&r.field.isEqual(s.field)&&Bt(r.value,s.value)}(n,t):n instanceof Ct?function(r,s){return s instanceof Ct&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((o,a,l)=>o&&Dc(a,s.filters[l]),!0):!1}(n,t):void O(19439)}function Nc(n){return n instanceof rt?function(e){return`${e.field.canonicalString()} ${e.op} ${je(e.value)}`}(n):n instanceof Ct?function(e){return e.op.toString()+" {"+e.getFilters().map(Nc).join(" ,")+"}"}(n):"Filter"}class Md extends rt{constructor(t,e,r){super(t,e,r),this.key=M.fromName(r.referenceValue)}matches(t){const e=M.comparator(t.key,this.key);return this.matchesComparison(e)}}class Od extends rt{constructor(t,e){super(t,"in",e),this.keys=kc("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Ld extends rt{constructor(t,e){super(t,"not-in",e),this.keys=kc("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function kc(n,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map(r=>M.fromName(r.referenceValue))}class Fd extends rt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return ti(e)&&Dn(e.arrayValue,this.value)}}class Ud extends rt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Dn(this.value.arrayValue,e)}}class Bd extends rt{constructor(t,e){super(t,"not-in",e)}matches(t){if(Dn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Dn(this.value.arrayValue,e)}}class jd extends rt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!ti(e)||!e.arrayValue.values)&&e.arrayValue.values.some(r=>Dn(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qd{constructor(t,e=null,r=[],s=[],o=null,a=null,l=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=a,this.endAt=l,this.Te=null}}function ha(n,t=null,e=[],r=[],s=null,o=null,a=null){return new qd(n,t,e,r,s,o,a)}function ei(n){const t=L(n);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(r=>Os(r)).join(","),e+="|ob:",e+=t.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),Nr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(r=>je(r)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(r=>je(r)).join(",")),t.Te=e}return t.Te}function ni(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!kd(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!Dc(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!la(n.startAt,t.startAt)&&la(n.endAt,t.endAt)}function Ls(n){return M.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(t,e=null,r=[],s=[],o=null,a="F",l=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=a,this.startAt=l,this.endAt=h,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function $d(n,t,e,r,s,o,a,l){return new We(n,t,e,r,s,o,a,l)}function ri(n){return new We(n)}function da(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function zd(n){return M.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function xc(n){return n.collectionGroup!==null}function vn(n){const t=L(n);if(t.Ee===null){t.Ee=[];const e=new Set;for(const o of t.explicitOrderBy)t.Ee.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new at(ht.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(d=>{d.isInequality()&&(l=l.add(d.field))})}),l})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.Ee.push(new Nn(o,r))}),e.has(ht.keyField().canonicalString())||t.Ee.push(new Nn(ht.keyField(),r))}return t.Ee}function Ot(n){const t=L(n);return t.Ie||(t.Ie=Mc(t,vn(n))),t.Ie}function Gd(n){const t=L(n);return t.Re||(t.Re=Mc(t,n.explicitOrderBy)),t.Re}function Mc(n,t){if(n.limitType==="F")return ha(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(s=>{const o=s.dir==="desc"?"asc":"desc";return new Nn(s.field,o)});const e=n.endAt?new Ir(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Ir(n.startAt.position,n.startAt.inclusive):null;return ha(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function Fs(n,t){const e=n.filters.concat([t]);return new We(n.path,n.collectionGroup,n.explicitOrderBy.slice(),e,n.limit,n.limitType,n.startAt,n.endAt)}function Hd(n,t){const e=n.explicitOrderBy.concat([t]);return new We(n.path,n.collectionGroup,e,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function vr(n,t,e){return new We(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function xr(n,t){return ni(Ot(n),Ot(t))&&n.limitType===t.limitType}function Oc(n){return`${ei(Ot(n))}|lt:${n.limitType}`}function ke(n){return`Query(target=${function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map(s=>Nc(s)).join(", ")}]`),Nr(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map(s=>je(s)).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map(s=>je(s)).join(",")),`Target(${r})`}(Ot(n))}; limitType=${n.limitType})`}function Mr(n,t){return t.isFoundDocument()&&function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):M.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,t)&&function(r,s){for(const o of vn(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0}(n,t)&&function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0}(n,t)&&function(r,s){return!(r.startAt&&!function(a,l,h){const d=ua(a,l,h);return a.inclusive?d<=0:d<0}(r.startAt,vn(r),s)||r.endAt&&!function(a,l,h){const d=ua(a,l,h);return a.inclusive?d>=0:d>0}(r.endAt,vn(r),s))}(n,t)}function Kd(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Lc(n){return(t,e)=>{let r=!1;for(const s of vn(n)){const o=Wd(s,t,e);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function Wd(n,t,e){const r=n.field.isKeyField()?M.comparator(t.key,e.key):function(o,a,l){const h=a.data.field(o),d=l.data.field(o);return h!==null&&d!==null?Be(h,d):O(42886)}(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return O(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],t))return void(s[o]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){le(this.inner,(e,r)=>{for(const[s,o]of r)t(s,o)})}isEmpty(){return Ec(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qd=new X(M.comparator);function zt(){return Qd}const Fc=new X(M.comparator);function yn(...n){let t=Fc;for(const e of n)t=t.insert(e.key,e);return t}function Uc(n){let t=Fc;return n.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function Te(){return An()}function Bc(){return An()}function An(){return new Se(n=>n.toString(),(n,t)=>n.isEqual(t))}const Yd=new X(M.comparator),Jd=new at(M.comparator);function j(...n){let t=Jd;for(const e of n)t=t.add(e);return t}const Xd=new at(B);function Zd(){return Xd}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function si(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:yr(t)?"-0":t}}function jc(n){return{integerValue:""+n}}function tf(n,t){return Ad(t)?jc(t):si(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{constructor(){this._=void 0}}function ef(n,t,e){return n instanceof kn?function(s,o){const a={fields:{[vc]:{stringValue:Ic},[wc]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&Zs(o)&&(o=kr(o)),o&&(a.fields[Ac]=o),{mapValue:a}}(e,t):n instanceof xn?$c(n,t):n instanceof Mn?zc(n,t):function(s,o){const a=qc(s,o),l=fa(a)+fa(s.Ae);return Ms(a)&&Ms(s.Ae)?jc(l):si(s.serializer,l)}(n,t)}function nf(n,t,e){return n instanceof xn?$c(n,t):n instanceof Mn?zc(n,t):e}function qc(n,t){return n instanceof Ar?function(r){return Ms(r)||function(o){return!!o&&"doubleValue"in o}(r)}(t)?t:{integerValue:0}:null}class kn extends Or{}class xn extends Or{constructor(t){super(),this.elements=t}}function $c(n,t){const e=Gc(t);for(const r of n.elements)e.some(s=>Bt(s,r))||e.push(r);return{arrayValue:{values:e}}}class Mn extends Or{constructor(t){super(),this.elements=t}}function zc(n,t){let e=Gc(t);for(const r of n.elements)e=e.filter(s=>!Bt(s,r));return{arrayValue:{values:e}}}class Ar extends Or{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function fa(n){return et(n.integerValue||n.doubleValue)}function Gc(n){return ti(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rf{constructor(t,e){this.field=t,this.transform=e}}function sf(n,t){return n.field.isEqual(t.field)&&function(r,s){return r instanceof xn&&s instanceof xn||r instanceof Mn&&s instanceof Mn?Ue(r.elements,s.elements,Bt):r instanceof Ar&&s instanceof Ar?Bt(r.Ae,s.Ae):r instanceof kn&&s instanceof kn}(n.transform,t.transform)}class of{constructor(t,e){this.version=t,this.transformResults=e}}class Pt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Pt}static exists(t){return new Pt(void 0,t)}static updateTime(t){return new Pt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function hr(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class Lr{}function Hc(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new ii(n.key,Pt.none()):new Ln(n.key,n.data,Pt.none());{const e=n.data,r=It.empty();let s=new at(ht.comparator);for(let o of t.fields)if(!s.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?r.delete(o):r.set(o,a),s=s.add(o)}return new he(n.key,r,new Rt(s.toArray()),Pt.none())}}function af(n,t,e){n instanceof Ln?function(s,o,a){const l=s.value.clone(),h=pa(s.fieldTransforms,o,a.transformResults);l.setAll(h),o.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,t,e):n instanceof he?function(s,o,a){if(!hr(s.precondition,o))return void o.convertToUnknownDocument(a.version);const l=pa(s.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(Kc(s)),h.setAll(l),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,t,e):function(s,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function wn(n,t,e,r){return n instanceof Ln?function(o,a,l,h){if(!hr(o.precondition,a))return l;const d=o.value.clone(),m=ga(o.fieldTransforms,h,a);return d.setAll(m),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,t,e,r):n instanceof he?function(o,a,l,h){if(!hr(o.precondition,a))return l;const d=ga(o.fieldTransforms,h,a),m=a.data;return m.setAll(Kc(o)),m.setAll(d),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),l===null?null:l.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(E=>E.field))}(n,t,e,r):function(o,a,l){return hr(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,t,e)}function cf(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),o=qc(r.transform,s||null);o!=null&&(e===null&&(e=It.empty()),e.set(r.field,o))}return e||null}function ma(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Ue(r,s,(o,a)=>sf(o,a))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class Ln extends Lr{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class he extends Lr{constructor(t,e,r,s,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Kc(n){const t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}}),t}function pa(n,t,e){const r=new Map;z(n.length===e.length,32656,{Ve:e.length,de:n.length});for(let s=0;s<e.length;s++){const o=n[s],a=o.transform,l=t.data.field(o.field);r.set(o.field,nf(a,l,e[s]))}return r}function ga(n,t,e){const r=new Map;for(const s of n){const o=s.transform,a=e.data.field(s.field);r.set(s.field,ef(o,a,t))}return r}class ii extends Lr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class uf extends Lr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lf{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(t.key)&&af(o,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=wn(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=wn(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=Bc();return this.mutations.forEach(s=>{const o=t.get(s.key),a=o.overlayedDocument;let l=this.applyToLocalView(a,o.mutatedFields);l=e.has(s.key)?null:l;const h=Hc(a,l);h!==null&&r.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(F.min())}),r}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),j())}isEqual(t){return this.batchId===t.batchId&&Ue(this.mutations,t.mutations,(e,r)=>ma(e,r))&&Ue(this.baseMutations,t.baseMutations,(e,r)=>ma(e,r))}}class oi{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){z(t.mutations.length===r.length,58842,{me:t.mutations.length,fe:r.length});let s=function(){return Yd}();const o=t.mutations;for(let a=0;a<o.length;a++)s=s.insert(o[a].key,r[a].version);return new oi(t,e,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hf{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class df{constructor(t,e,r){this.alias=t,this.aggregateType=e,this.fieldPath=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ff{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var nt,q;function mf(n){switch(n){case V.OK:return O(64938);case V.CANCELLED:case V.UNKNOWN:case V.DEADLINE_EXCEEDED:case V.RESOURCE_EXHAUSTED:case V.INTERNAL:case V.UNAVAILABLE:case V.UNAUTHENTICATED:return!1;case V.INVALID_ARGUMENT:case V.NOT_FOUND:case V.ALREADY_EXISTS:case V.PERMISSION_DENIED:case V.FAILED_PRECONDITION:case V.ABORTED:case V.OUT_OF_RANGE:case V.UNIMPLEMENTED:case V.DATA_LOSS:return!0;default:return O(15467,{code:n})}}function Wc(n){if(n===void 0)return $t("GRPC error has no .code"),V.UNKNOWN;switch(n){case nt.OK:return V.OK;case nt.CANCELLED:return V.CANCELLED;case nt.UNKNOWN:return V.UNKNOWN;case nt.DEADLINE_EXCEEDED:return V.DEADLINE_EXCEEDED;case nt.RESOURCE_EXHAUSTED:return V.RESOURCE_EXHAUSTED;case nt.INTERNAL:return V.INTERNAL;case nt.UNAVAILABLE:return V.UNAVAILABLE;case nt.UNAUTHENTICATED:return V.UNAUTHENTICATED;case nt.INVALID_ARGUMENT:return V.INVALID_ARGUMENT;case nt.NOT_FOUND:return V.NOT_FOUND;case nt.ALREADY_EXISTS:return V.ALREADY_EXISTS;case nt.PERMISSION_DENIED:return V.PERMISSION_DENIED;case nt.FAILED_PRECONDITION:return V.FAILED_PRECONDITION;case nt.ABORTED:return V.ABORTED;case nt.OUT_OF_RANGE:return V.OUT_OF_RANGE;case nt.UNIMPLEMENTED:return V.UNIMPLEMENTED;case nt.DATA_LOSS:return V.DATA_LOSS;default:return O(39323,{code:n})}}(q=nt||(nt={}))[q.OK=0]="OK",q[q.CANCELLED=1]="CANCELLED",q[q.UNKNOWN=2]="UNKNOWN",q[q.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",q[q.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",q[q.NOT_FOUND=5]="NOT_FOUND",q[q.ALREADY_EXISTS=6]="ALREADY_EXISTS",q[q.PERMISSION_DENIED=7]="PERMISSION_DENIED",q[q.UNAUTHENTICATED=16]="UNAUTHENTICATED",q[q.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",q[q.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",q[q.ABORTED=10]="ABORTED",q[q.OUT_OF_RANGE=11]="OUT_OF_RANGE",q[q.UNIMPLEMENTED=12]="UNIMPLEMENTED",q[q.INTERNAL=13]="INTERNAL",q[q.UNAVAILABLE=14]="UNAVAILABLE",q[q.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pf(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gf=new ne([4294967295,4294967295],0);function _a(n){const t=pf().encode(n),e=new cc;return e.update(t),new Uint8Array(e.digest())}function ya(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new ne([e,r],0),new ne([s,o],0)]}class ai{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new En(`Invalid padding: ${e}`);if(r<0)throw new En(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new En(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new En(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=ne.fromNumber(this.ge)}ye(t,e,r){let s=t.add(e.multiply(ne.fromNumber(r)));return s.compare(gf)===1&&(s=new ne([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=_a(t),[r,s]=ya(e);for(let o=0;o<this.hashCount;o++){const a=this.ye(r,s,o);if(!this.we(a))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new ai(o,s,e);return r.forEach(l=>a.insert(l)),a}insert(t){if(this.ge===0)return;const e=_a(t),[r,s]=ya(e);for(let o=0;o<this.hashCount;o++){const a=this.ye(r,s,o);this.Se(a)}}Se(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class En extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(t,e,r,s,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,Fn.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new Fr(F.min(),s,new X(B),zt(),j())}}class Fn{constructor(t,e,r,s,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new Fn(r,e,j(),j(),j())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(t,e,r,s){this.be=t,this.removedTargetIds=e,this.key=r,this.De=s}}class Qc{constructor(t,e){this.targetId=t,this.Ce=e}}class Yc{constructor(t,e,r=dt.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class Ea{constructor(){this.ve=0,this.Fe=Ta(),this.Me=dt.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=j(),e=j(),r=j();return this.Fe.forEach((s,o)=>{switch(o){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:O(38017,{changeType:o})}}),new Fn(this.Me,this.xe,t,e,r)}qe(){this.Oe=!1,this.Fe=Ta()}Ke(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}Ue(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}$e(){this.ve+=1}We(){this.ve-=1,z(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class _f{constructor(t){this.Ge=t,this.ze=new Map,this.je=zt(),this.Je=or(),this.He=or(),this.Ze=new X(B)}Xe(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Ye(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,e=>{const r=this.nt(e);switch(t.state){case 0:this.rt(e)&&r.Le(t.resumeToken);break;case 1:r.We(),r.Ne||r.qe(),r.Le(t.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(r.Qe(),r.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),r.Le(t.resumeToken));break;default:O(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach((r,s)=>{this.rt(s)&&e(s)})}st(t){const e=t.targetId,r=t.Ce.count,s=this.ot(e);if(s){const o=s.target;if(Ls(o))if(r===0){const a=new M(o.path);this.et(e,a,yt.newNoDocument(a,F.min()))}else z(r===1,20013,{expectedCount:r});else{const a=this._t(e);if(a!==r){const l=this.ut(t),h=l?this.ct(l,t,a):1;if(h!==0){this.it(e);const d=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,d)}}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:o=0}=e;let a,l;try{a=oe(r).toUint8Array()}catch(h){if(h instanceof Tc)return Ae("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{l=new ai(a,s,o)}catch(h){return Ae(h instanceof En?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return l.ge===0?null:l}ct(t,e,r){return e.Ce.count===r-this.Pt(t,e.targetId)?0:2}Pt(t,e){const r=this.Ge.getRemoteKeysForTarget(e);let s=0;return r.forEach(o=>{const a=this.Ge.ht(),l=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(l)||(this.et(e,o,null),s++)}),s}Tt(t){const e=new Map;this.ze.forEach((o,a)=>{const l=this.ot(a);if(l){if(o.current&&Ls(l.target)){const h=new M(l.target.path);this.Et(h).has(a)||this.It(a,h)||this.et(a,h,yt.newNoDocument(h,t))}o.Be&&(e.set(a,o.ke()),o.qe())}});let r=j();this.He.forEach((o,a)=>{let l=!0;a.forEachWhile(h=>{const d=this.ot(h);return!d||d.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(o))}),this.je.forEach((o,a)=>a.setReadTime(t));const s=new Fr(t,e,this.Ze,this.je,r);return this.je=zt(),this.Je=or(),this.He=or(),this.Ze=new X(B),s}Ye(t,e){if(!this.rt(t))return;const r=this.It(t,e.key)?2:0;this.nt(t).Ke(e.key,r),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.Et(e.key).add(t)),this.He=this.He.insert(e.key,this.Rt(e.key).add(t))}et(t,e,r){if(!this.rt(t))return;const s=this.nt(t);this.It(t,e)?s.Ke(e,1):s.Ue(e),this.He=this.He.insert(e,this.Rt(e).delete(t)),this.He=this.He.insert(e,this.Rt(e).add(t)),r&&(this.je=this.je.insert(e,r))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}$e(t){this.nt(t).$e()}nt(t){let e=this.ze.get(t);return e||(e=new Ea,this.ze.set(t,e)),e}Rt(t){let e=this.He.get(t);return e||(e=new at(B),this.He=this.He.insert(t,e)),e}Et(t){let e=this.Je.get(t);return e||(e=new at(B),this.Je=this.Je.insert(t,e)),e}rt(t){const e=this.ot(t)!==null;return e||N("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new Ea),this.Ge.getRemoteKeysForTarget(t).forEach(e=>{this.et(t,e,null)})}It(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function or(){return new X(M.comparator)}function Ta(){return new X(M.comparator)}const yf={asc:"ASCENDING",desc:"DESCENDING"},Ef={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Tf={and:"AND",or:"OR"};class If{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Us(n,t){return n.useProto3Json||Nr(t)?t:{value:t}}function wr(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Jc(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function vf(n,t){return wr(n,t.toTimestamp())}function Lt(n){return z(!!n,49232),F.fromTimestamp(function(e){const r=ie(e);return new J(r.seconds,r.nanos)}(n))}function ci(n,t){return Bs(n,t).canonicalString()}function Bs(n,t){const e=function(s){return new Q(["projects",s.projectId,"databases",s.database])}(n).child("documents");return t===void 0?e:e.child(t)}function Xc(n){const t=Q.fromString(n);return z(su(t),10190,{key:t.toString()}),t}function js(n,t){return ci(n.databaseId,t.path)}function vs(n,t){const e=Xc(t);if(e.get(1)!==n.databaseId.projectId)throw new D(V.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new D(V.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new M(tu(e))}function Zc(n,t){return ci(n.databaseId,t)}function Af(n){const t=Xc(n);return t.length===4?Q.emptyPath():tu(t)}function qs(n){return new Q(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function tu(n){return z(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Ia(n,t,e){return{name:js(n,t),fields:e.value.mapValue.fields}}function wf(n,t){let e;if("targetChange"in t){t.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:O(39313,{state:d})}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],o=function(d,m){return d.useProto3Json?(z(m===void 0||typeof m=="string",58123),dt.fromBase64String(m||"")):(z(m===void 0||m instanceof Buffer||m instanceof Uint8Array,16193),dt.fromUint8Array(m||new Uint8Array))}(n,t.targetChange.resumeToken),a=t.targetChange.cause,l=a&&function(d){const m=d.code===void 0?V.UNKNOWN:Wc(d.code);return new D(m,d.message||"")}(a);e=new Yc(r,s,o,l||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=vs(n,r.document.name),o=Lt(r.document.updateTime),a=r.document.createTime?Lt(r.document.createTime):F.min(),l=new It({mapValue:{fields:r.document.fields}}),h=yt.newFoundDocument(s,o,a,l),d=r.targetIds||[],m=r.removedTargetIds||[];e=new dr(d,m,h.key,h)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=vs(n,r.document),o=r.readTime?Lt(r.readTime):F.min(),a=yt.newNoDocument(s,o),l=r.removedTargetIds||[];e=new dr([],l,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=vs(n,r.document),o=r.removedTargetIds||[];e=new dr([],o,s,null)}else{if(!("filter"in t))return O(11601,{Vt:t});{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:o}=r,a=new ff(s,o),l=r.targetId;e=new Qc(l,a)}}return e}function Rf(n,t){let e;if(t instanceof Ln)e={update:Ia(n,t.key,t.value)};else if(t instanceof ii)e={delete:js(n,t.key)};else if(t instanceof he)e={update:Ia(n,t.key,t.data),updateMask:xf(t.fieldMask)};else{if(!(t instanceof uf))return O(16599,{dt:t.type});e={verify:js(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(r=>function(o,a){const l=a.transform;if(l instanceof kn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof xn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Mn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Ar)return{fieldPath:a.field.canonicalString(),increment:l.Ae};throw O(20930,{transform:a.transform})}(0,r))),t.precondition.isNone||(e.currentDocument=function(s,o){return o.updateTime!==void 0?{updateTime:vf(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:O(27497)}(n,t.precondition)),e}function Sf(n,t){return n&&n.length>0?(z(t!==void 0,14353),n.map(e=>function(s,o){let a=s.updateTime?Lt(s.updateTime):Lt(o);return a.isEqual(F.min())&&(a=Lt(o)),new of(a,s.transformResults||[])}(e,t))):[]}function Vf(n,t){return{documents:[Zc(n,t.path)]}}function eu(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=Zc(n,s);const o=function(d){if(d.length!==0)return ru(Ct.create(d,"and"))}(t.filters);o&&(e.structuredQuery.where=o);const a=function(d){if(d.length!==0)return d.map(m=>function(R){return{field:Xt(R.field),direction:Df(R.dir)}}(m))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const l=Us(n,t.limit);return l!==null&&(e.structuredQuery.limit=l),t.startAt&&(e.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(t.endAt)),{ft:e,parent:s}}function Pf(n,t,e,r){const{ft:s,parent:o}=eu(n,t),a={},l=[];let h=0;return e.forEach(d=>{const m="aggregate_"+h++;a[m]=d.alias,d.aggregateType==="count"?l.push({alias:m,count:{}}):d.aggregateType==="avg"?l.push({alias:m,avg:{field:Xt(d.fieldPath)}}):d.aggregateType==="sum"&&l.push({alias:m,sum:{field:Xt(d.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:l,structuredQuery:s.structuredQuery},parent:s.parent},gt:a,parent:o}}function bf(n){let t=Af(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){z(r===1,65062);const m=e.from[0];m.allDescendants?s=m.collectionId:t=t.child(m.collectionId)}let o=[];e.where&&(o=function(E){const R=nu(E);return R instanceof Ct&&Cc(R)?R.getFilters():[R]}(e.where));let a=[];e.orderBy&&(a=function(E){return E.map(R=>function(b){return new Nn(xe(b.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(b.direction))}(R))}(e.orderBy));let l=null;e.limit&&(l=function(E){let R;return R=typeof E=="object"?E.value:E,Nr(R)?null:R}(e.limit));let h=null;e.startAt&&(h=function(E){const R=!!E.before,S=E.values||[];return new Ir(S,R)}(e.startAt));let d=null;return e.endAt&&(d=function(E){const R=!E.before,S=E.values||[];return new Ir(S,R)}(e.endAt)),$d(t,s,a,o,l,"F",h,d)}function Cf(n,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return O(28987,{purpose:s})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function nu(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=xe(e.unaryFilter.field);return rt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=xe(e.unaryFilter.field);return rt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=xe(e.unaryFilter.field);return rt.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=xe(e.unaryFilter.field);return rt.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return O(61313);default:return O(60726)}}(n):n.fieldFilter!==void 0?function(e){return rt.create(xe(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return O(58110);default:return O(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return Ct.create(e.compositeFilter.filters.map(r=>nu(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return O(1026)}}(e.compositeFilter.op))}(n):O(30097,{filter:n})}function Df(n){return yf[n]}function Nf(n){return Ef[n]}function kf(n){return Tf[n]}function Xt(n){return{fieldPath:n.canonicalString()}}function xe(n){return ht.fromServerFormat(n.fieldPath)}function ru(n){return n instanceof rt?function(e){if(e.op==="=="){if(ca(e.value))return{unaryFilter:{field:Xt(e.field),op:"IS_NAN"}};if(aa(e.value))return{unaryFilter:{field:Xt(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(ca(e.value))return{unaryFilter:{field:Xt(e.field),op:"IS_NOT_NAN"}};if(aa(e.value))return{unaryFilter:{field:Xt(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Xt(e.field),op:Nf(e.op),value:e.value}}}(n):n instanceof Ct?function(e){const r=e.getFilters().map(s=>ru(s));return r.length===1?r[0]:{compositeFilter:{op:kf(e.op),filters:r}}}(n):O(54877,{filter:n})}function xf(n){const t=[];return n.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function su(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function iu(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(t,e,r,s,o=F.min(),a=F.min(),l=dt.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=h}withSequenceNumber(t){return new Zt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Zt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Zt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Zt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mf{constructor(t){this.yt=t}}function Of(n){const t=bf({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?vr(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lf{constructor(){this.bn=new Ff}addToCollectionParentIndex(t,e){return this.bn.add(e),P.resolve()}getCollectionParents(t,e){return P.resolve(this.bn.getEntries(e))}addFieldIndex(t,e){return P.resolve()}deleteFieldIndex(t,e){return P.resolve()}deleteAllFieldIndexes(t){return P.resolve()}createTargetIndexes(t,e){return P.resolve()}getDocumentsMatchingTarget(t,e){return P.resolve(null)}getIndexType(t,e){return P.resolve(0)}getFieldIndexes(t,e){return P.resolve([])}getNextCollectionGroupToUpdate(t){return P.resolve(null)}getMinOffset(t,e){return P.resolve(se.min())}getMinOffsetFromCollectionGroup(t,e){return P.resolve(se.min())}updateCollectionGroup(t,e,r){return P.resolve()}updateIndexEntries(t,e){return P.resolve()}}class Ff{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new at(Q.comparator),o=!s.has(r);return this.index[e]=s.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new at(Q.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const va={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},ou=41943040;class At{static withCacheSize(t){return new At(t,At.DEFAULT_COLLECTION_PERCENTILE,At.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */At.DEFAULT_COLLECTION_PERCENTILE=10,At.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,At.DEFAULT=new At(ou,At.DEFAULT_COLLECTION_PERCENTILE,At.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),At.DISABLED=new At(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(t){this.sr=t}next(){return this.sr+=2,this.sr}static _r(){return new qe(0)}static ar(){return new qe(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Aa="LruGarbageCollector",Uf=1048576;function wa([n,t],[e,r]){const s=B(n,e);return s===0?B(t,r):s}class Bf{constructor(t){this.Pr=t,this.buffer=new at(wa),this.Tr=0}Er(){return++this.Tr}Ir(t){const e=[t,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();wa(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class jf{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(t){N(Aa,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Ke(e)?N(Aa,"Ignoring IndexedDB error during garbage collection: ",e):await He(e)}await this.Ar(3e5)})}}class qf{constructor(t,e){this.Vr=t,this.params=e}calculateTargetCount(t,e){return this.Vr.dr(t).next(r=>Math.floor(e/100*r))}nthSequenceNumber(t,e){if(e===0)return P.resolve(Dr.ce);const r=new Bf(e);return this.Vr.forEachTarget(t,s=>r.Ir(s.sequenceNumber)).next(()=>this.Vr.mr(t,s=>r.Ir(s))).next(()=>r.maxValue)}removeTargets(t,e,r){return this.Vr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.Vr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(N("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(va)):this.getCacheSize(t).next(r=>r<this.params.cacheSizeCollectionThreshold?(N("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),va):this.gr(t,e))}getCacheSize(t){return this.Vr.getCacheSize(t)}gr(t,e){let r,s,o,a,l,h,d;const m=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(E=>(E>this.params.maximumSequenceNumbersToCollect?(N("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${E}`),s=this.params.maximumSequenceNumbersToCollect):s=E,a=Date.now(),this.nthSequenceNumber(t,s))).next(E=>(r=E,l=Date.now(),this.removeTargets(t,r,e))).next(E=>(o=E,h=Date.now(),this.removeOrphanedDocuments(t,r))).next(E=>(d=Date.now(),Ne()<=$.DEBUG&&N("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-m}ms
	Determined least recently used ${s} in `+(l-a)+`ms
	Removed ${o} targets in `+(h-l)+`ms
	Removed ${E} documents in `+(d-h)+`ms
Total Duration: ${d-m}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:o,documentsRemoved:E})))}}function $f(n,t){return new qf(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zf{constructor(){this.changes=new Se(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,yt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?P.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gf{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hf{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(r=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(r!==null&&wn(r.mutation,s,Rt.empty(),J.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.getLocalViewOfDocuments(t,r,j()).next(()=>r))}getLocalViewOfDocuments(t,e,r=j()){const s=Te();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,r).next(o=>{let a=yn();return o.forEach((l,h)=>{a=a.insert(l,h.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const r=Te();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,j()))}populateOverlays(t,e,r){const s=[];return r.forEach(o=>{e.has(o)||s.push(o)}),this.documentOverlayCache.getOverlays(t,s).next(o=>{o.forEach((a,l)=>{e.set(a,l)})})}computeViews(t,e,r,s){let o=zt();const a=An(),l=function(){return An()}();return e.forEach((h,d)=>{const m=r.get(d.key);s.has(d.key)&&(m===void 0||m.mutation instanceof he)?o=o.insert(d.key,d):m!==void 0?(a.set(d.key,m.mutation.getFieldMask()),wn(m.mutation,d,m.mutation.getFieldMask(),J.now())):a.set(d.key,Rt.empty())}),this.recalculateAndSaveOverlays(t,o).next(h=>(h.forEach((d,m)=>a.set(d,m)),e.forEach((d,m)=>l.set(d,new Gf(m,a.get(d)??null))),l))}recalculateAndSaveOverlays(t,e){const r=An();let s=new X((a,l)=>a-l),o=j();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const l of a)l.keys().forEach(h=>{const d=e.get(h);if(d===null)return;let m=r.get(h)||Rt.empty();m=l.applyToLocalView(d,m),r.set(h,m);const E=(s.get(l.batchId)||j()).add(h);s=s.insert(l.batchId,E)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const h=l.getNext(),d=h.key,m=h.value,E=Bc();m.forEach(R=>{if(!o.has(R)){const S=Hc(e.get(R),r.get(R));S!==null&&E.set(R,S),o=o.add(R)}}),a.push(this.documentOverlayCache.saveOverlays(t,d,E))}return P.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.recalculateAndSaveOverlays(t,r))}getDocumentsMatchingQuery(t,e,r,s){return zd(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):xc(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next(o=>{const a=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-o.size):P.resolve(Te());let l=Pn,h=o;return a.next(d=>P.forEach(d,(m,E)=>(l<E.largestBatchId&&(l=E.largestBatchId),o.get(m)?P.resolve():this.remoteDocumentCache.getEntry(t,m).next(R=>{h=h.insert(m,R)}))).next(()=>this.populateOverlays(t,d,o)).next(()=>this.computeViews(t,h,d,j())).next(m=>({batchId:l,changes:Uc(m)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new M(e)).next(r=>{let s=yn();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const o=e.collectionGroup;let a=yn();return this.indexManager.getCollectionParents(t,o).next(l=>P.forEach(l,h=>{const d=function(E,R){return new We(R,null,E.explicitOrderBy.slice(),E.filters.slice(),E.limit,E.limitType,E.startAt,E.endAt)}(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,d,r,s).next(m=>{m.forEach((E,R)=>{a=a.insert(E,R)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,s))).next(a=>{o.forEach((h,d)=>{const m=d.getKey();a.get(m)===null&&(a=a.insert(m,yt.newInvalidDocument(m)))});let l=yn();return a.forEach((h,d)=>{const m=o.get(h);m!==void 0&&wn(m.mutation,d,Rt.empty(),J.now()),Mr(e,d)&&(l=l.insert(h,d))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kf{constructor(t){this.serializer=t,this.Nr=new Map,this.Br=new Map}getBundleMetadata(t,e){return P.resolve(this.Nr.get(e))}saveBundleMetadata(t,e){return this.Nr.set(e.id,function(s){return{id:s.id,version:s.version,createTime:Lt(s.createTime)}}(e)),P.resolve()}getNamedQuery(t,e){return P.resolve(this.Br.get(e))}saveNamedQuery(t,e){return this.Br.set(e.name,function(s){return{name:s.name,query:Of(s.bundledQuery),readTime:Lt(s.readTime)}}(e)),P.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wf{constructor(){this.overlays=new X(M.comparator),this.Lr=new Map}getOverlay(t,e){return P.resolve(this.overlays.get(e))}getOverlays(t,e){const r=Te();return P.forEach(e,s=>this.getOverlay(t,s).next(o=>{o!==null&&r.set(s,o)})).next(()=>r)}saveOverlays(t,e,r){return r.forEach((s,o)=>{this.St(t,e,o)}),P.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.Lr.get(r);return s!==void 0&&(s.forEach(o=>this.overlays=this.overlays.remove(o)),this.Lr.delete(r)),P.resolve()}getOverlaysForCollection(t,e,r){const s=Te(),o=e.length+1,a=new M(e.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const h=l.getNext().value,d=h.getKey();if(!e.isPrefixOf(d.path))break;d.path.length===o&&h.largestBatchId>r&&s.set(h.getKey(),h)}return P.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let o=new X((d,m)=>d-m);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===e&&d.largestBatchId>r){let m=o.get(d.largestBatchId);m===null&&(m=Te(),o=o.insert(d.largestBatchId,m)),m.set(d.getKey(),d)}}const l=Te(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((d,m)=>l.set(d,m)),!(l.size()>=s)););return P.resolve(l)}St(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Lr.get(s.largestBatchId).delete(r.key);this.Lr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new hf(e,r));let o=this.Lr.get(e);o===void 0&&(o=j(),this.Lr.set(e,o)),this.Lr.set(e,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qf{constructor(){this.sessionToken=dt.EMPTY_BYTE_STRING}getSessionToken(t){return P.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,P.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui{constructor(){this.kr=new at(ut.qr),this.Kr=new at(ut.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(t,e){const r=new ut(t,e);this.kr=this.kr.add(r),this.Kr=this.Kr.add(r)}$r(t,e){t.forEach(r=>this.addReference(r,e))}removeReference(t,e){this.Wr(new ut(t,e))}Qr(t,e){t.forEach(r=>this.removeReference(r,e))}Gr(t){const e=new M(new Q([])),r=new ut(e,t),s=new ut(e,t+1),o=[];return this.Kr.forEachInRange([r,s],a=>{this.Wr(a),o.push(a.key)}),o}zr(){this.kr.forEach(t=>this.Wr(t))}Wr(t){this.kr=this.kr.delete(t),this.Kr=this.Kr.delete(t)}jr(t){const e=new M(new Q([])),r=new ut(e,t),s=new ut(e,t+1);let o=j();return this.Kr.forEachInRange([r,s],a=>{o=o.add(a.key)}),o}containsKey(t){const e=new ut(t,0),r=this.kr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class ut{constructor(t,e){this.key=t,this.Jr=e}static qr(t,e){return M.comparator(t.key,e.key)||B(t.Jr,e.Jr)}static Ur(t,e){return B(t.Jr,e.Jr)||M.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yf{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Yn=1,this.Hr=new at(ut.qr)}checkEmpty(t){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const o=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new lf(o,e,r,s);this.mutationQueue.push(a);for(const l of s)this.Hr=this.Hr.add(new ut(l.key,o)),this.indexManager.addToCollectionParentIndex(t,l.key.path.popLast());return P.resolve(a)}lookupMutationBatch(t,e){return P.resolve(this.Zr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.Xr(r),o=s<0?0:s;return P.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?Xs:this.Yn-1)}getAllMutationBatches(t){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new ut(e,0),s=new ut(e,Number.POSITIVE_INFINITY),o=[];return this.Hr.forEachInRange([r,s],a=>{const l=this.Zr(a.Jr);o.push(l)}),P.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new at(B);return e.forEach(s=>{const o=new ut(s,0),a=new ut(s,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([o,a],l=>{r=r.add(l.Jr)})}),P.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let o=r;M.isDocumentKey(o)||(o=o.child(""));const a=new ut(new M(o),0);let l=new at(B);return this.Hr.forEachWhile(h=>{const d=h.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(l=l.add(h.Jr)),!0)},a),P.resolve(this.Yr(l))}Yr(t){const e=[];return t.forEach(r=>{const s=this.Zr(r);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){z(this.ei(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Hr;return P.forEach(e.mutations,s=>{const o=new ut(s.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.Hr=r})}nr(t){}containsKey(t,e){const r=new ut(e,0),s=this.Hr.firstAfterOrEqual(r);return P.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,P.resolve()}ei(t,e){return this.Xr(t)}Xr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Zr(t){const e=this.Xr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jf{constructor(t){this.ti=t,this.docs=function(){return new X(M.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),o=s?s.size:0,a=this.ti(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return P.resolve(r?r.document.mutableCopy():yt.newInvalidDocument(e))}getEntries(t,e){let r=zt();return e.forEach(s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():yt.newInvalidDocument(s))}),P.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let o=zt();const a=e.path,l=new M(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(l);for(;h.hasNext();){const{key:d,value:{document:m}}=h.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Ed(yd(m),r)<=0||(s.has(m.key)||Mr(e,m))&&(o=o.insert(m.key,m.mutableCopy()))}return P.resolve(o)}getAllFromCollectionGroup(t,e,r,s){O(9500)}ni(t,e){return P.forEach(this.docs,r=>e(r))}newChangeBuffer(t){return new Xf(this)}getSize(t){return P.resolve(this.size)}}class Xf extends zf{constructor(t){super(),this.Mr=t}applyChanges(t){const e=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?e.push(this.Mr.addEntry(t,s)):this.Mr.removeEntry(r)}),P.waitFor(e)}getFromCache(t,e){return this.Mr.getEntry(t,e)}getAllFromCache(t,e){return this.Mr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zf{constructor(t){this.persistence=t,this.ri=new Se(e=>ei(e),ni),this.lastRemoteSnapshotVersion=F.min(),this.highestTargetId=0,this.ii=0,this.si=new ui,this.targetCount=0,this.oi=qe._r()}forEachTarget(t,e){return this.ri.forEach((r,s)=>e(s)),P.resolve()}getLastRemoteSnapshotVersion(t){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return P.resolve(this.ii)}allocateTargetId(t){return this.highestTargetId=this.oi.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.ii&&(this.ii=e),P.resolve()}lr(t){this.ri.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.oi=new qe(e),this.highestTargetId=e),t.sequenceNumber>this.ii&&(this.ii=t.sequenceNumber)}addTargetData(t,e){return this.lr(e),this.targetCount+=1,P.resolve()}updateTargetData(t,e){return this.lr(e),P.resolve()}removeTargetData(t,e){return this.ri.delete(e.target),this.si.Gr(e.targetId),this.targetCount-=1,P.resolve()}removeTargets(t,e,r){let s=0;const o=[];return this.ri.forEach((a,l)=>{l.sequenceNumber<=e&&r.get(l.targetId)===null&&(this.ri.delete(a),o.push(this.removeMatchingKeysForTargetId(t,l.targetId)),s++)}),P.waitFor(o).next(()=>s)}getTargetCount(t){return P.resolve(this.targetCount)}getTargetData(t,e){const r=this.ri.get(e)||null;return P.resolve(r)}addMatchingKeys(t,e,r){return this.si.$r(e,r),P.resolve()}removeMatchingKeys(t,e,r){this.si.Qr(e,r);const s=this.persistence.referenceDelegate,o=[];return s&&e.forEach(a=>{o.push(s.markPotentiallyOrphaned(t,a))}),P.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.si.Gr(e),P.resolve()}getMatchingKeysForTargetId(t,e){const r=this.si.jr(e);return P.resolve(r)}containsKey(t,e){return P.resolve(this.si.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class au{constructor(t,e){this._i={},this.overlays={},this.ai=new Dr(0),this.ui=!1,this.ui=!0,this.ci=new Qf,this.referenceDelegate=t(this),this.li=new Zf(this),this.indexManager=new Lf,this.remoteDocumentCache=function(s){return new Jf(s)}(r=>this.referenceDelegate.hi(r)),this.serializer=new Mf(e),this.Pi=new Kf(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Wf,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this._i[t.toKey()];return r||(r=new Yf(e,this.referenceDelegate),this._i[t.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(t,e,r){N("MemoryPersistence","Starting transaction:",t);const s=new tm(this.ai.next());return this.referenceDelegate.Ti(),r(s).next(o=>this.referenceDelegate.Ei(s).next(()=>o)).toPromise().then(o=>(s.raiseOnCommittedEvent(),o))}Ii(t,e){return P.or(Object.values(this._i).map(r=>()=>r.containsKey(t,e)))}}class tm extends Id{constructor(t){super(),this.currentSequenceNumber=t}}class li{constructor(t){this.persistence=t,this.Ri=new ui,this.Ai=null}static Vi(t){return new li(t)}get di(){if(this.Ai)return this.Ai;throw O(60996)}addReference(t,e,r){return this.Ri.addReference(r,e),this.di.delete(r.toString()),P.resolve()}removeReference(t,e,r){return this.Ri.removeReference(r,e),this.di.add(r.toString()),P.resolve()}markPotentiallyOrphaned(t,e){return this.di.add(e.toString()),P.resolve()}removeTarget(t,e){this.Ri.Gr(e.targetId).forEach(s=>this.di.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(o=>this.di.add(o.toString()))}).next(()=>r.removeTargetData(t,e))}Ti(){this.Ai=new Set}Ei(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.di,r=>{const s=M.fromPath(r);return this.mi(t,s).next(o=>{o||e.removeEntry(s,F.min())})}).next(()=>(this.Ai=null,e.apply(t)))}updateLimboDocument(t,e){return this.mi(t,e).next(r=>{r?this.di.delete(e.toString()):this.di.add(e.toString())})}hi(t){return 0}mi(t,e){return P.or([()=>P.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ii(t,e)])}}class Rr{constructor(t,e){this.persistence=t,this.fi=new Se(r=>wd(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=$f(this,e)}static Vi(t,e){return new Rr(t,e)}Ti(){}Ei(t){return P.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}dr(t){const e=this.pr(t);return this.persistence.getTargetCache().getTargetCount(t).next(r=>e.next(s=>r+s))}pr(t){let e=0;return this.mr(t,r=>{e++}).next(()=>e)}mr(t,e){return P.forEach(this.fi,(r,s)=>this.wr(t,r,s).next(o=>o?P.resolve():e(s)))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),o=s.newChangeBuffer();return s.ni(t,a=>this.wr(t,a,e).next(l=>{l||(r++,o.removeEntry(a,F.min()))})).next(()=>o.apply(t)).next(()=>r)}markPotentiallyOrphaned(t,e){return this.fi.set(e,t.currentSequenceNumber),P.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.fi.set(r,t.currentSequenceNumber),P.resolve()}removeReference(t,e,r){return this.fi.set(r,t.currentSequenceNumber),P.resolve()}updateLimboDocument(t,e){return this.fi.set(e,t.currentSequenceNumber),P.resolve()}hi(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=ur(t.data.value)),e}wr(t,e,r){return P.or([()=>this.persistence.Ii(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.fi.get(e);return P.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.Ts=r,this.Es=s}static Is(t,e){let r=j(),s=j();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new hi(t,e.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class em{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=function(){return Bl()?8:vd(Fl())>0?6:4}()}initialize(t,e){this.fs=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,r,s){const o={result:null};return this.gs(t,e).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.ps(t,e,s,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new em;return this.ys(t,e,a).next(l=>{if(o.result=l,this.As)return this.ws(t,e,a,l.size)})}).next(()=>o.result)}ws(t,e,r,s){return r.documentReadCount<this.Vs?(Ne()<=$.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",ke(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),P.resolve()):(Ne()<=$.DEBUG&&N("QueryEngine","Query:",ke(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ds*s?(Ne()<=$.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",ke(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Ot(e))):P.resolve())}gs(t,e){if(da(e))return P.resolve(null);let r=Ot(e);return this.indexManager.getIndexType(t,r).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=vr(e,null,"F"),r=Ot(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next(o=>{const a=j(...o);return this.fs.getDocuments(t,a).next(l=>this.indexManager.getMinOffset(t,r).next(h=>{const d=this.Ss(e,l);return this.bs(e,d,a,h.readTime)?this.gs(t,vr(e,null,"F")):this.Ds(t,d,e,h)}))})))}ps(t,e,r,s){return da(e)||s.isEqual(F.min())?P.resolve(null):this.fs.getDocuments(t,r).next(o=>{const a=this.Ss(e,o);return this.bs(e,a,r,s)?P.resolve(null):(Ne()<=$.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),ke(e)),this.Ds(t,a,e,_d(s,Pn)).next(l=>l))})}Ss(t,e){let r=new at(Lc(t));return e.forEach((s,o)=>{Mr(t,o)&&(r=r.add(o))}),r}bs(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}ys(t,e,r){return Ne()<=$.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",ke(e)),this.fs.getDocumentsMatchingQuery(t,e,se.min(),r)}Ds(t,e,r,s){return this.fs.getDocumentsMatchingQuery(t,r,s).next(o=>(e.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const di="LocalStore",rm=3e8;class sm{constructor(t,e,r,s){this.persistence=t,this.Cs=e,this.serializer=s,this.vs=new X(B),this.Fs=new Se(o=>ei(o),ni),this.Ms=new Map,this.xs=t.getRemoteDocumentCache(),this.li=t.getTargetCache(),this.Pi=t.getBundleCache(),this.Os(r)}Os(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Hf(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.vs))}}function im(n,t,e,r){return new sm(n,t,e,r)}async function cu(n,t){const e=L(n);return await e.persistence.runTransaction("Handle user change","readonly",r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next(o=>(s=o,e.Os(t),e.mutationQueue.getAllMutationBatches(r))).next(o=>{const a=[],l=[];let h=j();for(const d of s){a.push(d.batchId);for(const m of d.mutations)h=h.add(m.key)}for(const d of o){l.push(d.batchId);for(const m of d.mutations)h=h.add(m.key)}return e.localDocuments.getDocuments(r,h).next(d=>({Ns:d,removedBatchIds:a,addedBatchIds:l}))})})}function om(n,t){const e=L(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=t.batch.keys(),o=e.xs.newChangeBuffer({trackRemovals:!0});return function(l,h,d,m){const E=d.batch,R=E.keys();let S=P.resolve();return R.forEach(b=>{S=S.next(()=>m.getEntry(h,b)).next(x=>{const k=d.docVersions.get(b);z(k!==null,48541),x.version.compareTo(k)<0&&(E.applyToRemoteDocument(x,d),x.isValidDocument()&&(x.setReadTime(d.commitVersion),m.addEntry(x)))})}),S.next(()=>l.mutationQueue.removeMutationBatch(h,E))}(e,r,t,o).next(()=>o.apply(r)).next(()=>e.mutationQueue.performConsistencyCheck(r)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let h=j();for(let d=0;d<l.mutationResults.length;++d)l.mutationResults[d].transformResults.length>0&&(h=h.add(l.batch.mutations[d].key));return h}(t))).next(()=>e.localDocuments.getDocuments(r,s))})}function uu(n){const t=L(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.li.getLastRemoteSnapshotVersion(e))}function am(n,t){const e=L(n),r=t.snapshotVersion;let s=e.vs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const a=e.xs.newChangeBuffer({trackRemovals:!0});s=e.vs;const l=[];t.targetChanges.forEach((m,E)=>{const R=s.get(E);if(!R)return;l.push(e.li.removeMatchingKeys(o,m.removedDocuments,E).next(()=>e.li.addMatchingKeys(o,m.addedDocuments,E)));let S=R.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(E)!==null?S=S.withResumeToken(dt.EMPTY_BYTE_STRING,F.min()).withLastLimboFreeSnapshotVersion(F.min()):m.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(m.resumeToken,r)),s=s.insert(E,S),function(x,k,G){return x.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=rm?!0:G.addedDocuments.size+G.modifiedDocuments.size+G.removedDocuments.size>0}(R,S,m)&&l.push(e.li.updateTargetData(o,S))});let h=zt(),d=j();if(t.documentUpdates.forEach(m=>{t.resolvedLimboDocuments.has(m)&&l.push(e.persistence.referenceDelegate.updateLimboDocument(o,m))}),l.push(cm(o,a,t.documentUpdates).next(m=>{h=m.Bs,d=m.Ls})),!r.isEqual(F.min())){const m=e.li.getLastRemoteSnapshotVersion(o).next(E=>e.li.setTargetsMetadata(o,o.currentSequenceNumber,r));l.push(m)}return P.waitFor(l).next(()=>a.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,h,d)).next(()=>h)}).then(o=>(e.vs=s,o))}function cm(n,t,e){let r=j(),s=j();return e.forEach(o=>r=r.add(o)),t.getEntries(n,r).next(o=>{let a=zt();return e.forEach((l,h)=>{const d=o.get(l);h.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(l)),h.isNoDocument()&&h.version.isEqual(F.min())?(t.removeEntry(l,h.readTime),a=a.insert(l,h)):!d.isValidDocument()||h.version.compareTo(d.version)>0||h.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(h),a=a.insert(l,h)):N(di,"Ignoring outdated watch update for ",l,". Current version:",d.version," Watch version:",h.version)}),{Bs:a,Ls:s}})}function um(n,t){const e=L(n);return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(t===void 0&&(t=Xs),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}function lm(n,t){const e=L(n);return e.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return e.li.getTargetData(r,t).next(o=>o?(s=o,P.resolve(s)):e.li.allocateTargetId(r).next(a=>(s=new Zt(t,a,"TargetPurposeListen",r.currentSequenceNumber),e.li.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=e.vs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.vs=e.vs.insert(r.targetId,r),e.Fs.set(t,r.targetId)),r})}async function $s(n,t,e){const r=L(n),s=r.vs.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Ke(a))throw a;N(di,`Failed to update sequence numbers for target ${t}: ${a}`)}r.vs=r.vs.remove(t),r.Fs.delete(s.target)}function Ra(n,t,e){const r=L(n);let s=F.min(),o=j();return r.persistence.runTransaction("Execute query","readwrite",a=>function(h,d,m){const E=L(h),R=E.Fs.get(m);return R!==void 0?P.resolve(E.vs.get(R)):E.li.getTargetData(d,m)}(r,a,Ot(t)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(a,l.targetId).next(h=>{o=h})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,t,e?s:F.min(),e?o:j())).next(l=>(hm(r,Kd(t),l),{documents:l,ks:o})))}function hm(n,t,e){let r=n.Ms.get(t)||F.min();e.forEach((s,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.Ms.set(t,r)}class Sa{constructor(){this.activeTargetIds=Zd()}Qs(t){this.activeTargetIds=this.activeTargetIds.add(t)}Gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ws(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class dm{constructor(){this.vo=new Sa,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.vo.Qs(t),this.Fo[t]||"not-current"}updateQueryState(t,e,r){this.Fo[t]=e}removeLocalQueryTarget(t){this.vo.Gs(t)}isLocalQueryTarget(t){return this.vo.activeTargetIds.has(t)}clearQueryState(t){delete this.Fo[t]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(t){return this.vo.activeTargetIds.has(t)}start(){return this.vo=new Sa,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fm{Mo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Va="ConnectivityMonitor";class Pa{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(t){this.Lo.push(t)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){N(Va,"Network connectivity changed: AVAILABLE");for(const t of this.Lo)t(0)}Bo(){N(Va,"Network connectivity changed: UNAVAILABLE");for(const t of this.Lo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ar=null;function zs(){return ar===null?ar=function(){return 268435456+Math.round(2147483648*Math.random())}():ar++,"0x"+ar.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const As="RestConnection",mm={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class pm{get qo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ko=e+"://"+t.host,this.Uo=`projects/${r}/databases/${s}`,this.$o=this.databaseId.database===Er?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(t,e,r,s,o){const a=zs(),l=this.Qo(t,e.toUriEncodedString());N(As,`Sending RPC '${t}' ${a}:`,l,r);const h={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(h,s,o);const{host:d}=new URL(l),m=tc(d);return this.zo(t,l,h,r,m).then(E=>(N(As,`Received RPC '${t}' ${a}: `,E),E),E=>{throw Ae(As,`RPC '${t}' ${a} failed with error: `,E,"url: ",l,"request:",r),E})}jo(t,e,r,s,o,a){return this.Wo(t,e,r,s,o)}Go(t,e,r){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ge}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((s,o)=>t[o]=s),r&&r.headers.forEach((s,o)=>t[o]=s)}Qo(t,e){const r=mm[t];let s=`${this.Ko}/v1/${e}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gm{constructor(t){this.Jo=t.Jo,this.Ho=t.Ho}Zo(t){this.Xo=t}Yo(t){this.e_=t}t_(t){this.n_=t}onMessage(t){this.r_=t}close(){this.Ho()}send(t){this.Jo(t)}i_(){this.Xo()}s_(){this.e_()}o_(t){this.n_(t)}__(t){this.r_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gt="WebChannelConnection",mn=(n,t,e)=>{n.listen(t,r=>{try{e(r)}catch(s){setTimeout(()=>{throw s},0)}})};class Oe extends pm{constructor(t){super(t),this.a_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}static u_(){if(!Oe.c_){const t=dc();mn(t,hc.STAT_EVENT,e=>{e.stat===Ns.PROXY?N(gt,"STAT_EVENT: detected buffering proxy"):e.stat===Ns.NOPROXY&&N(gt,"STAT_EVENT: detected no buffering proxy")}),Oe.c_=!0}}zo(t,e,r,s,o){const a=zs();return new Promise((l,h)=>{const d=new uc;d.setWithCredentials(!0),d.listenOnce(lc.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case cr.NO_ERROR:const E=d.getResponseJson();N(gt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(E)),l(E);break;case cr.TIMEOUT:N(gt,`RPC '${t}' ${a} timed out`),h(new D(V.DEADLINE_EXCEEDED,"Request time out"));break;case cr.HTTP_ERROR:const R=d.getStatus();if(N(gt,`RPC '${t}' ${a} failed with status:`,R,"response text:",d.getResponseText()),R>0){let S=d.getResponseJson();Array.isArray(S)&&(S=S[0]);const b=S==null?void 0:S.error;if(b&&b.status&&b.message){const x=function(G){const K=G.toLowerCase().replace(/_/g,"-");return Object.values(V).indexOf(K)>=0?K:V.UNKNOWN}(b.status);h(new D(x,b.message))}else h(new D(V.UNKNOWN,"Server responded with status "+d.getStatus()))}else h(new D(V.UNAVAILABLE,"Connection failed."));break;default:O(9055,{l_:t,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{N(gt,`RPC '${t}' ${a} completed.`)}});const m=JSON.stringify(s);N(gt,`RPC '${t}' ${a} sending request:`,s),d.send(e,"POST",m,r,15)})}T_(t,e,r){const s=zs(),o=[this.Ko,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=this.createWebChannelTransport(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Go(l.initMessageHeaders,e,r),l.encodeInitMessageHeaders=!0;const d=o.join("");N(gt,`Creating RPC '${t}' stream ${s}: ${d}`,l);const m=a.createWebChannel(d,l);this.E_(m);let E=!1,R=!1;const S=new gm({Jo:b=>{R?N(gt,`Not sending because RPC '${t}' stream ${s} is closed:`,b):(E||(N(gt,`Opening RPC '${t}' stream ${s} transport.`),m.open(),E=!0),N(gt,`RPC '${t}' stream ${s} sending:`,b),m.send(b))},Ho:()=>m.close()});return mn(m,_n.EventType.OPEN,()=>{R||(N(gt,`RPC '${t}' stream ${s} transport opened.`),S.i_())}),mn(m,_n.EventType.CLOSE,()=>{R||(R=!0,N(gt,`RPC '${t}' stream ${s} transport closed`),S.o_(),this.I_(m))}),mn(m,_n.EventType.ERROR,b=>{R||(R=!0,Ae(gt,`RPC '${t}' stream ${s} transport errored. Name:`,b.name,"Message:",b.message),S.o_(new D(V.UNAVAILABLE,"The operation could not be completed")))}),mn(m,_n.EventType.MESSAGE,b=>{var x;if(!R){const k=b.data[0];z(!!k,16349);const G=k,K=(G==null?void 0:G.error)||((x=G[0])==null?void 0:x.error);if(K){N(gt,`RPC '${t}' stream ${s} received error:`,K);const Z=K.status;let St=function(T){const p=nt[T];if(p!==void 0)return Wc(p)}(Z),ft=K.message;Z==="NOT_FOUND"&&ft.includes("database")&&ft.includes("does not exist")&&ft.includes(this.databaseId.database)&&Ae(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),St===void 0&&(St=V.INTERNAL,ft="Unknown error status: "+Z+" with message "+K.message),R=!0,S.o_(new D(St,ft)),m.close()}else N(gt,`RPC '${t}' stream ${s} received:`,k),S.__(k)}}),Oe.u_(),setTimeout(()=>{S.s_()},0),S}terminate(){this.a_.forEach(t=>t.close()),this.a_=[]}E_(t){this.a_.push(t)}I_(t){this.a_=this.a_.filter(e=>e===t)}Go(t,e,r){super.Go(t,e,r),this.databaseInfo.apiKey&&(t["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return fc()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _m(n){return new Oe(n)}function ws(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ur(n){return new If(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Oe.c_=!1;class lu{constructor(t,e,r=1e3,s=1.5,o=6e4){this.Ci=t,this.timerId=e,this.R_=r,this.A_=s,this.V_=o,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(t){this.cancel();const e=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,e-r);s>0&&N("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),t())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ba="PersistentStream";class hu{constructor(t,e,r,s,o,a,l,h){this.Ci=t,this.S_=r,this.b_=s,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=h,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new lu(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(t){this.K_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.K_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===V.RESOURCE_EXHAUSTED?($t(e.toString()),$t("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===V.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.t_(e)}W_(){}auth(){this.state=1;const t=this.Q_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.D_===e&&this.G_(r,s)},r=>{t(()=>{const s=new D(V.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)})})}G_(t,e){const r=this.Q_(this.D_);this.stream=this.j_(t,e),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.Yo(()=>{r(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(s=>{r(()=>this.z_(s))}),this.stream.onMessage(s=>{r(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(t){return N(ba,`close with error: ${t}`),this.stream=null,this.close(4,t)}Q_(t){return e=>{this.Ci.enqueueAndForget(()=>this.D_===t?e():(N(ba,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class ym extends hu{constructor(t,e,r,s,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}j_(t,e){return this.connection.T_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=wf(this.serializer,t),r=function(o){if(!("targetChange"in o))return F.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?F.min():a.readTime?Lt(a.readTime):F.min()}(t);return this.listener.H_(e,r)}Z_(t){const e={};e.database=qs(this.serializer),e.addTarget=function(o,a){let l;const h=a.target;if(l=Ls(h)?{documents:Vf(o,h)}:{query:eu(o,h).ft},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=Jc(o,a.resumeToken);const d=Us(o,a.expectedCount);d!==null&&(l.expectedCount=d)}else if(a.snapshotVersion.compareTo(F.min())>0){l.readTime=wr(o,a.snapshotVersion.toTimestamp());const d=Us(o,a.expectedCount);d!==null&&(l.expectedCount=d)}return l}(this.serializer,t);const r=Cf(this.serializer,t);r&&(e.labels=r),this.q_(e)}X_(t){const e={};e.database=qs(this.serializer),e.removeTarget=t,this.q_(e)}}class Em extends hu{constructor(t,e,r,s,o,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}J_(t){return z(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,z(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){z(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=Sf(t.writeResults,t.commitTime),r=Lt(t.commitTime);return this.listener.na(r,e)}ra(){const t={};t.database=qs(this.serializer),this.q_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map(r=>Rf(this.serializer,r))};this.q_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tm{}class Im extends Tm{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new D(V.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(t,e,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Wo(t,Bs(e,r),s,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new D(V.UNKNOWN,o.toString())})}jo(t,e,r,s,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.jo(t,Bs(e,r),s,a,l,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new D(V.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function vm(n,t,e,r){return new Im(n,t,e,r)}class Am{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?($t(e),this.aa=!1):N("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const we="RemoteStore";class wm{constructor(t,e,r,s,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=o,this.Aa.Mo(a=>{r.enqueueAndForget(async()=>{Ve(this)&&(N(we,"Restarting streams for network reachability change."),await async function(h){const d=L(h);d.Ia.add(4),await Un(d),d.Va.set("Unknown"),d.Ia.delete(4),await Br(d)}(this))})}),this.Va=new Am(r,s)}}async function Br(n){if(Ve(n))for(const t of n.Ra)await t(!0)}async function Un(n){for(const t of n.Ra)await t(!1)}function du(n,t){const e=L(n);e.Ea.has(t.targetId)||(e.Ea.set(t.targetId,t),gi(e)?pi(e):Qe(e).O_()&&mi(e,t))}function fi(n,t){const e=L(n),r=Qe(e);e.Ea.delete(t),r.O_()&&fu(e,t),e.Ea.size===0&&(r.O_()?r.L_():Ve(e)&&e.Va.set("Unknown"))}function mi(n,t){if(n.da.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(F.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Qe(n).Z_(t)}function fu(n,t){n.da.$e(t),Qe(n).X_(t)}function pi(n){n.da=new _f({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),At:t=>n.Ea.get(t)||null,ht:()=>n.datastore.serializer.databaseId}),Qe(n).start(),n.Va.ua()}function gi(n){return Ve(n)&&!Qe(n).x_()&&n.Ea.size>0}function Ve(n){return L(n).Ia.size===0}function mu(n){n.da=void 0}async function Rm(n){n.Va.set("Online")}async function Sm(n){n.Ea.forEach((t,e)=>{mi(n,t)})}async function Vm(n,t){mu(n),gi(n)?(n.Va.ha(t),pi(n)):n.Va.set("Unknown")}async function Pm(n,t,e){if(n.Va.set("Online"),t instanceof Yc&&t.state===2&&t.cause)try{await async function(s,o){const a=o.cause;for(const l of o.targetIds)s.Ea.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.Ea.delete(l),s.da.removeTarget(l))}(n,t)}catch(r){N(we,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await Sr(n,r)}else if(t instanceof dr?n.da.Xe(t):t instanceof Qc?n.da.st(t):n.da.tt(t),!e.isEqual(F.min()))try{const r=await uu(n.localStore);e.compareTo(r)>=0&&await function(o,a){const l=o.da.Tt(a);return l.targetChanges.forEach((h,d)=>{if(h.resumeToken.approximateByteSize()>0){const m=o.Ea.get(d);m&&o.Ea.set(d,m.withResumeToken(h.resumeToken,a))}}),l.targetMismatches.forEach((h,d)=>{const m=o.Ea.get(h);if(!m)return;o.Ea.set(h,m.withResumeToken(dt.EMPTY_BYTE_STRING,m.snapshotVersion)),fu(o,h);const E=new Zt(m.target,h,d,m.sequenceNumber);mi(o,E)}),o.remoteSyncer.applyRemoteEvent(l)}(n,e)}catch(r){N(we,"Failed to raise snapshot:",r),await Sr(n,r)}}async function Sr(n,t,e){if(!Ke(t))throw t;n.Ia.add(1),await Un(n),n.Va.set("Offline"),e||(e=()=>uu(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{N(we,"Retrying IndexedDB access"),await e(),n.Ia.delete(1),await Br(n)})}function pu(n,t){return t().catch(e=>Sr(n,e,t))}async function jr(n){const t=L(n),e=ce(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:Xs;for(;bm(t);)try{const s=await um(t.localStore,r);if(s===null){t.Ta.length===0&&e.L_();break}r=s.batchId,Cm(t,s)}catch(s){await Sr(t,s)}gu(t)&&_u(t)}function bm(n){return Ve(n)&&n.Ta.length<10}function Cm(n,t){n.Ta.push(t);const e=ce(n);e.O_()&&e.Y_&&e.ea(t.mutations)}function gu(n){return Ve(n)&&!ce(n).x_()&&n.Ta.length>0}function _u(n){ce(n).start()}async function Dm(n){ce(n).ra()}async function Nm(n){const t=ce(n);for(const e of n.Ta)t.ea(e.mutations)}async function km(n,t,e){const r=n.Ta.shift(),s=oi.from(r,t,e);await pu(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await jr(n)}async function xm(n,t){t&&ce(n).Y_&&await async function(r,s){if(function(a){return mf(a)&&a!==V.ABORTED}(s.code)){const o=r.Ta.shift();ce(r).B_(),await pu(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,s)),await jr(r)}}(n,t),gu(n)&&_u(n)}async function Ca(n,t){const e=L(n);e.asyncQueue.verifyOperationInProgress(),N(we,"RemoteStore received new credentials");const r=Ve(e);e.Ia.add(3),await Un(e),r&&e.Va.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ia.delete(3),await Br(e)}async function Mm(n,t){const e=L(n);t?(e.Ia.delete(2),await Br(e)):t||(e.Ia.add(2),await Un(e),e.Va.set("Unknown"))}function Qe(n){return n.ma||(n.ma=function(e,r,s){const o=L(e);return o.sa(),new ym(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Zo:Rm.bind(null,n),Yo:Sm.bind(null,n),t_:Vm.bind(null,n),H_:Pm.bind(null,n)}),n.Ra.push(async t=>{t?(n.ma.B_(),gi(n)?pi(n):n.Va.set("Unknown")):(await n.ma.stop(),mu(n))})),n.ma}function ce(n){return n.fa||(n.fa=function(e,r,s){const o=L(e);return o.sa(),new Em(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:Dm.bind(null,n),t_:xm.bind(null,n),ta:Nm.bind(null,n),na:km.bind(null,n)}),n.Ra.push(async t=>{t?(n.fa.B_(),await jr(n)):(await n.fa.stop(),n.Ta.length>0&&(N(we,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _i{constructor(t,e,r,s,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new Mt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,o){const a=Date.now()+r,l=new _i(t,e,a,s,o);return l.start(r),l}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(V.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function yi(n,t){if($t("AsyncQueue",`${t}: ${n}`),Ke(n))return new D(V.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{static emptySet(t){return new Le(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||M.comparator(e.key,r.key):(e,r)=>M.comparator(e.key,r.key),this.keyedMap=yn(),this.sortedSet=new X(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,r)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof Le)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new Le;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(){this.ga=new X(M.comparator)}track(t){const e=t.doc.key,r=this.ga.get(e);r?t.type!==0&&r.type===3?this.ga=this.ga.insert(e,t):t.type===3&&r.type!==1?this.ga=this.ga.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.ga=this.ga.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.ga=this.ga.remove(e):t.type===1&&r.type===2?this.ga=this.ga.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):O(63341,{Vt:t,pa:r}):this.ga=this.ga.insert(e,t)}ya(){const t=[];return this.ga.inorderTraversal((e,r)=>{t.push(r)}),t}}class $e{constructor(t,e,r,s,o,a,l,h,d){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=h,this.hasCachedResults=d}static fromInitialDocuments(t,e,r,s,o){const a=[];return e.forEach(l=>{a.push({type:0,doc:l})}),new $e(t,e,Le.emptySet(e),a,r,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&xr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Om{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(t=>t.Da())}}class Lm{constructor(){this.queries=Na(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,r){const s=L(e),o=s.queries;s.queries=Na(),o.forEach((a,l)=>{for(const h of l.Sa)h.onError(r)})})(this,new D(V.ABORTED,"Firestore shutting down"))}}function Na(){return new Se(n=>Oc(n),xr)}async function yu(n,t){const e=L(n);let r=3;const s=t.query;let o=e.queries.get(s);o?!o.ba()&&t.Da()&&(r=2):(o=new Om,r=t.Da()?0:1);try{switch(r){case 0:o.wa=await e.onListen(s,!0);break;case 1:o.wa=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const l=yi(a,`Initialization of query '${ke(t.query)}' failed`);return void t.onError(l)}e.queries.set(s,o),o.Sa.push(t),t.va(e.onlineState),o.wa&&t.Fa(o.wa)&&Ei(e)}async function Eu(n,t){const e=L(n),r=t.query;let s=3;const o=e.queries.get(r);if(o){const a=o.Sa.indexOf(t);a>=0&&(o.Sa.splice(a,1),o.Sa.length===0?s=t.Da()?0:1:!o.ba()&&t.Da()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function Fm(n,t){const e=L(n);let r=!1;for(const s of t){const o=s.query,a=e.queries.get(o);if(a){for(const l of a.Sa)l.Fa(s)&&(r=!0);a.wa=s}}r&&Ei(e)}function Um(n,t,e){const r=L(n),s=r.queries.get(t);if(s)for(const o of s.Sa)o.onError(e);r.queries.delete(t)}function Ei(n){n.Ca.forEach(t=>{t.next()})}var Gs,ka;(ka=Gs||(Gs={})).Ma="default",ka.Cache="cache";class Tu{constructor(t,e,r){this.query=t,this.xa=e,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new $e(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),e=!0):this.La(t,this.onlineState)&&(this.ka(t),e=!0),this.Na=t,e}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let e=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),e=!0),e}La(t,e){if(!t.fromCache||!this.Da())return!0;const r=e!=="Offline";return(!this.options.qa||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Ba(t){if(t.docChanges.length>0)return!0;const e=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}ka(t){t=$e.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==Gs.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu{constructor(t){this.key=t}}class vu{constructor(t){this.key=t}}class Bm{constructor(t,e){this.query=t,this.Za=e,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=j(),this.mutatedKeys=j(),this.eu=Lc(t),this.tu=new Le(this.eu)}get nu(){return this.Za}ru(t,e){const r=e?e.iu:new Da,s=e?e.tu:this.tu;let o=e?e.mutatedKeys:this.mutatedKeys,a=s,l=!1;const h=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((m,E)=>{const R=s.get(m),S=Mr(this.query,E)?E:null,b=!!R&&this.mutatedKeys.has(R.key),x=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let k=!1;R&&S?R.data.isEqual(S.data)?b!==x&&(r.track({type:3,doc:S}),k=!0):this.su(R,S)||(r.track({type:2,doc:S}),k=!0,(h&&this.eu(S,h)>0||d&&this.eu(S,d)<0)&&(l=!0)):!R&&S?(r.track({type:0,doc:S}),k=!0):R&&!S&&(r.track({type:1,doc:R}),k=!0,(h||d)&&(l=!0)),k&&(S?(a=a.add(S),o=x?o.add(m):o.delete(m)):(a=a.delete(m),o=o.delete(m)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),o=o.delete(m.key),r.track({type:1,doc:m})}return{tu:a,iu:r,bs:l,mutatedKeys:o}}su(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const o=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const a=t.iu.ya();a.sort((m,E)=>function(S,b){const x=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return O(20277,{Vt:k})}};return x(S)-x(b)}(m.type,E.type)||this.eu(m.doc,E.doc)),this.ou(r),s=s??!1;const l=e&&!s?this._u():[],h=this.Ya.size===0&&this.current&&!s?1:0,d=h!==this.Xa;return this.Xa=h,a.length!==0||d?{snapshot:new $e(this.query,t.tu,o,a,t.mutatedKeys,h===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Da,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(t){return!this.Za.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach(e=>this.Za=this.Za.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Za=this.Za.delete(e)),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Ya;this.Ya=j(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Ya=this.Ya.add(r.key))});const e=[];return t.forEach(r=>{this.Ya.has(r)||e.push(new vu(r))}),this.Ya.forEach(r=>{t.has(r)||e.push(new Iu(r))}),e}cu(t){this.Za=t.ks,this.Ya=j();const e=this.ru(t.documents);return this.applyChanges(e,!0)}lu(){return $e.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const Ti="SyncEngine";class jm{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class qm{constructor(t){this.key=t,this.hu=!1}}class $m{constructor(t,e,r,s,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new Se(l=>Oc(l),xr),this.Eu=new Map,this.Iu=new Set,this.Ru=new X(M.comparator),this.Au=new Map,this.Vu=new ui,this.du={},this.mu=new Map,this.fu=qe.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function zm(n,t,e=!0){const r=Pu(n);let s;const o=r.Tu.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.lu()):s=await Au(r,t,e,!0),s}async function Gm(n,t){const e=Pu(n);await Au(e,t,!0,!1)}async function Au(n,t,e,r){const s=await lm(n.localStore,Ot(t)),o=s.targetId,a=n.sharedClientState.addLocalQueryTarget(o,e);let l;return r&&(l=await Hm(n,t,o,a==="current",s.resumeToken)),n.isPrimaryClient&&e&&du(n.remoteStore,s),l}async function Hm(n,t,e,r,s){n.pu=(E,R,S)=>async function(x,k,G,K){let Z=k.view.ru(G);Z.bs&&(Z=await Ra(x.localStore,k.query,!1).then(({documents:T})=>k.view.ru(T,Z)));const St=K&&K.targetChanges.get(k.targetId),ft=K&&K.targetMismatches.get(k.targetId)!=null,mt=k.view.applyChanges(Z,x.isPrimaryClient,St,ft);return Ma(x,k.targetId,mt.au),mt.snapshot}(n,E,R,S);const o=await Ra(n.localStore,t,!0),a=new Bm(t,o.ks),l=a.ru(o.documents),h=Fn.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),d=a.applyChanges(l,n.isPrimaryClient,h);Ma(n,e,d.au);const m=new jm(t,e,a);return n.Tu.set(t,m),n.Eu.has(e)?n.Eu.get(e).push(t):n.Eu.set(e,[t]),d.snapshot}async function Km(n,t,e){const r=L(n),s=r.Tu.get(t),o=r.Eu.get(s.targetId);if(o.length>1)return r.Eu.set(s.targetId,o.filter(a=>!xr(a,t))),void r.Tu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await $s(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),e&&fi(r.remoteStore,s.targetId),Hs(r,s.targetId)}).catch(He)):(Hs(r,s.targetId),await $s(r.localStore,s.targetId,!0))}async function Wm(n,t){const e=L(n),r=e.Tu.get(t),s=e.Eu.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),fi(e.remoteStore,r.targetId))}async function Qm(n,t,e){const r=np(n);try{const s=await function(a,l){const h=L(a),d=J.now(),m=l.reduce((S,b)=>S.add(b.key),j());let E,R;return h.persistence.runTransaction("Locally write mutations","readwrite",S=>{let b=zt(),x=j();return h.xs.getEntries(S,m).next(k=>{b=k,b.forEach((G,K)=>{K.isValidDocument()||(x=x.add(G))})}).next(()=>h.localDocuments.getOverlayedDocuments(S,b)).next(k=>{E=k;const G=[];for(const K of l){const Z=cf(K,E.get(K.key).overlayedDocument);Z!=null&&G.push(new he(K.key,Z,Vc(Z.value.mapValue),Pt.exists(!0)))}return h.mutationQueue.addMutationBatch(S,d,G,l)}).next(k=>{R=k;const G=k.applyToLocalDocumentSet(E,x);return h.documentOverlayCache.saveOverlays(S,k.batchId,G)})}).then(()=>({batchId:R.batchId,changes:Uc(E)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),function(a,l,h){let d=a.du[a.currentUser.toKey()];d||(d=new X(B)),d=d.insert(l,h),a.du[a.currentUser.toKey()]=d}(r,s.batchId,e),await Bn(r,s.changes),await jr(r.remoteStore)}catch(s){const o=yi(s,"Failed to persist write");e.reject(o)}}async function wu(n,t){const e=L(n);try{const r=await am(e.localStore,t);t.targetChanges.forEach((s,o)=>{const a=e.Au.get(o);a&&(z(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?z(a.hu,14607):s.removedDocuments.size>0&&(z(a.hu,42227),a.hu=!1))}),await Bn(e,r,t)}catch(r){await He(r)}}function xa(n,t,e){const r=L(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.Tu.forEach((o,a)=>{const l=a.view.va(t);l.snapshot&&s.push(l.snapshot)}),function(a,l){const h=L(a);h.onlineState=l;let d=!1;h.queries.forEach((m,E)=>{for(const R of E.Sa)R.va(l)&&(d=!0)}),d&&Ei(h)}(r.eventManager,t),s.length&&r.Pu.H_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Ym(n,t,e){const r=L(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.Au.get(t),o=s&&s.key;if(o){let a=new X(M.comparator);a=a.insert(o,yt.newNoDocument(o,F.min()));const l=j().add(o),h=new Fr(F.min(),new Map,new X(B),a,l);await wu(r,h),r.Ru=r.Ru.remove(o),r.Au.delete(t),Ii(r)}else await $s(r.localStore,t,!1).then(()=>Hs(r,t,e)).catch(He)}async function Jm(n,t){const e=L(n),r=t.batch.batchId;try{const s=await om(e.localStore,t);Su(e,r,null),Ru(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await Bn(e,s)}catch(s){await He(s)}}async function Xm(n,t,e){const r=L(n);try{const s=await function(a,l){const h=L(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let m;return h.mutationQueue.lookupMutationBatch(d,l).next(E=>(z(E!==null,37113),m=E.keys(),h.mutationQueue.removeMutationBatch(d,E))).next(()=>h.mutationQueue.performConsistencyCheck(d)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(d,m,l)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,m)).next(()=>h.localDocuments.getDocuments(d,m))})}(r.localStore,t);Su(r,t,e),Ru(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await Bn(r,s)}catch(s){await He(s)}}function Ru(n,t){(n.mu.get(t)||[]).forEach(e=>{e.resolve()}),n.mu.delete(t)}function Su(n,t,e){const r=L(n);let s=r.du[r.currentUser.toKey()];if(s){const o=s.get(t);o&&(e?o.reject(e):o.resolve(),s=s.remove(t)),r.du[r.currentUser.toKey()]=s}}function Hs(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.Eu.get(t))n.Tu.delete(r),e&&n.Pu.yu(r,e);n.Eu.delete(t),n.isPrimaryClient&&n.Vu.Gr(t).forEach(r=>{n.Vu.containsKey(r)||Vu(n,r)})}function Vu(n,t){n.Iu.delete(t.path.canonicalString());const e=n.Ru.get(t);e!==null&&(fi(n.remoteStore,e),n.Ru=n.Ru.remove(t),n.Au.delete(e),Ii(n))}function Ma(n,t,e){for(const r of e)r instanceof Iu?(n.Vu.addReference(r.key,t),Zm(n,r)):r instanceof vu?(N(Ti,"Document no longer in limbo: "+r.key),n.Vu.removeReference(r.key,t),n.Vu.containsKey(r.key)||Vu(n,r.key)):O(19791,{wu:r})}function Zm(n,t){const e=t.key,r=e.path.canonicalString();n.Ru.get(e)||n.Iu.has(r)||(N(Ti,"New document in limbo: "+e),n.Iu.add(r),Ii(n))}function Ii(n){for(;n.Iu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const t=n.Iu.values().next().value;n.Iu.delete(t);const e=new M(Q.fromString(t)),r=n.fu.next();n.Au.set(r,new qm(e)),n.Ru=n.Ru.insert(e,r),du(n.remoteStore,new Zt(Ot(ri(e.path)),r,"TargetPurposeLimboResolution",Dr.ce))}}async function Bn(n,t,e){const r=L(n),s=[],o=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach((l,h)=>{a.push(r.pu(h,t,e).then(d=>{var m;if((d||e)&&r.isPrimaryClient){const E=d?!d.fromCache:(m=e==null?void 0:e.targetChanges.get(h.targetId))==null?void 0:m.current;r.sharedClientState.updateQueryState(h.targetId,E?"current":"not-current")}if(d){s.push(d);const E=hi.Is(h.targetId,d);o.push(E)}}))}),await Promise.all(a),r.Pu.H_(s),await async function(h,d){const m=L(h);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",E=>P.forEach(d,R=>P.forEach(R.Ts,S=>m.persistence.referenceDelegate.addReference(E,R.targetId,S)).next(()=>P.forEach(R.Es,S=>m.persistence.referenceDelegate.removeReference(E,R.targetId,S)))))}catch(E){if(!Ke(E))throw E;N(di,"Failed to update sequence numbers: "+E)}for(const E of d){const R=E.targetId;if(!E.fromCache){const S=m.vs.get(R),b=S.snapshotVersion,x=S.withLastLimboFreeSnapshotVersion(b);m.vs=m.vs.insert(R,x)}}}(r.localStore,o))}async function tp(n,t){const e=L(n);if(!e.currentUser.isEqual(t)){N(Ti,"User change. New user:",t.toKey());const r=await cu(e.localStore,t);e.currentUser=t,function(o,a){o.mu.forEach(l=>{l.forEach(h=>{h.reject(new D(V.CANCELLED,a))})}),o.mu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await Bn(e,r.Ns)}}function ep(n,t){const e=L(n),r=e.Au.get(t);if(r&&r.hu)return j().add(r.key);{let s=j();const o=e.Eu.get(t);if(!o)return s;for(const a of o){const l=e.Tu.get(a);s=s.unionWith(l.view.nu)}return s}}function Pu(n){const t=L(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=wu.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=ep.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Ym.bind(null,t),t.Pu.H_=Fm.bind(null,t.eventManager),t.Pu.yu=Um.bind(null,t.eventManager),t}function np(n){const t=L(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Jm.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Xm.bind(null,t),t}class Vr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Ur(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return im(this.persistence,new nm,t.initialUser,this.serializer)}Cu(t){return new au(li.Vi,this.serializer)}Du(t){return new dm}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Vr.provider={build:()=>new Vr};class rp extends Vr{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){z(this.persistence.referenceDelegate instanceof Rr,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new jf(r,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?At.withCacheSize(this.cacheSizeBytes):At.DEFAULT;return new au(r=>Rr.Vi(r,e),this.serializer)}}class Ks{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>xa(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=tp.bind(null,this.syncEngine),await Mm(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new Lm}()}createDatastore(t){const e=Ur(t.databaseInfo.databaseId),r=_m(t.databaseInfo);return vm(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return function(r,s,o,a,l){return new wm(r,s,o,a,l)}(this.localStore,this.datastore,t.asyncQueue,e=>xa(this.syncEngine,e,0),function(){return Pa.v()?new Pa:new fm}())}createSyncEngine(t,e){return function(s,o,a,l,h,d,m){const E=new $m(s,o,a,l,h,d);return m&&(E.gu=!0),E}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const o=L(s);N(we,"RemoteStore shutting down."),o.Ia.add(5),await Un(o),o.Aa.shutdown(),o.Va.set("Unknown")}(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}Ks.provider={build:()=>new Ks};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bu{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):$t("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ue="FirestoreClient";class sp{constructor(t,e,r,s,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this._databaseInfo=s,this.user=_t.UNAUTHENTICATED,this.clientId=Js.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async a=>{N(ue,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(N(ue,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Mt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=yi(e,"Failed to shutdown persistence");t.reject(r)}}),t.promise}}async function Rs(n,t){n.asyncQueue.verifyOperationInProgress(),N(ue,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await cu(t.localStore,s),r=s)}),t.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=t}async function Oa(n,t){n.asyncQueue.verifyOperationInProgress();const e=await ip(n);N(ue,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(r=>Ca(t.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Ca(t.remoteStore,s)),n._onlineComponents=t}async function ip(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){N(ue,"Using user provided OfflineComponentProvider");try{await Rs(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===V.FAILED_PRECONDITION||s.code===V.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;Ae("Error using user provided cache. Falling back to memory cache: "+e),await Rs(n,new Vr)}}else N(ue,"Using default OfflineComponentProvider"),await Rs(n,new rp(void 0));return n._offlineComponents}async function vi(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(N(ue,"Using user provided OnlineComponentProvider"),await Oa(n,n._uninitializedComponentsProvider._online)):(N(ue,"Using default OnlineComponentProvider"),await Oa(n,new Ks))),n._onlineComponents}function op(n){return vi(n).then(t=>t.syncEngine)}function ap(n){return vi(n).then(t=>t.datastore)}async function Cu(n){const t=await vi(n),e=t.eventManager;return e.onListen=zm.bind(null,t.syncEngine),e.onUnlisten=Km.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Gm.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=Wm.bind(null,t.syncEngine),e}function cp(n,t,e={}){const r=new Mt;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,l,h,d){const m=new bu({next:R=>{m.Nu(),a.enqueueAndForget(()=>Eu(o,E));const S=R.docs.has(l);!S&&R.fromCache?d.reject(new D(V.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&R.fromCache&&h&&h.source==="server"?d.reject(new D(V.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(R)},error:R=>d.reject(R)}),E=new Tu(ri(l.path),m,{includeMetadataChanges:!0,qa:!0});return yu(o,E)}(await Cu(n),n.asyncQueue,t,e,r)),r.promise}function up(n,t,e={}){const r=new Mt;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,l,h,d){const m=new bu({next:R=>{m.Nu(),a.enqueueAndForget(()=>Eu(o,E)),R.fromCache&&h.source==="server"?d.reject(new D(V.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(R)},error:R=>d.reject(R)}),E=new Tu(l,m,{includeMetadataChanges:!0,qa:!0});return yu(o,E)}(await Cu(n),n.asyncQueue,t,e,r)),r.promise}function lp(n,t,e){const r=new Mt;return n.asyncQueue.enqueueAndForget(async()=>{try{const s=await ap(n);r.resolve(async function(a,l,h){var x;const d=L(a),{request:m,gt:E,parent:R}=Pf(d.serializer,Gd(l),h);d.connection.qo||delete m.parent;const S=(await d.jo("RunAggregationQuery",d.serializer.databaseId,R,m,1)).filter(k=>!!k.result);z(S.length===1,64727);const b=(x=S[0].result)==null?void 0:x.aggregateFields;return Object.keys(b).reduce((k,G)=>(k[E[G]]=b[G],k),{})}(s,t,e))}catch(s){r.reject(s)}}),r.promise}function hp(n,t){const e=new Mt;return n.asyncQueue.enqueueAndForget(async()=>Qm(await op(n),t,e)),e.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Du(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dp="ComponentProvider",La=new Map;function fp(n,t,e,r,s){return new Pd(n,t,e,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Du(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nu="firestore.googleapis.com",Fa=!0;class Ua{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new D(V.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Nu,this.ssl=Fa}else this.host=t.host,this.ssl=t.ssl??Fa;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=ou;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Uf)throw new D(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}gd("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Du(t.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new D(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new D(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new D(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class qr{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ua({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(V.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new D(V.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ua(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new od;switch(r.type){case"firstParty":return new ld(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new D(V.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const r=La.get(e);r&&(N(dp,"Removing Datastore"),La.delete(e),r.terminate())}(this),Promise.resolve()}}function mp(n,t,e,r={}){var d;n=Ut(n,qr);const s=tc(t),o=n._getSettings(),a={...o,emulatorOptions:n._getEmulatorOptions()},l=`${t}:${e}`;s&&Hl(`https://${l}`),o.host!==Nu&&o.host!==l&&Ae("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h={...o,host:l,ssl:s,emulatorOptions:r};if(!gr(h,a)&&(n._setSettings(h),r.mockUserToken)){let m,E;if(typeof r.mockUserToken=="string")m=r.mockUserToken,E=_t.MOCK_USER;else{m=Ll(r.mockUserToken,(d=n._app)==null?void 0:d.options.projectId);const R=r.mockUserToken.sub||r.mockUserToken.user_id;if(!R)throw new D(V.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");E=new _t(R)}n._authCredentials=new ad(new pc(m,E))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new de(this.firestore,t,this._query)}}class it{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new re(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new it(this.firestore,t,this._key)}toJSON(){return{type:it._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(On(e,it._jsonSchema))return new it(t,r||null,new M(Q.fromString(e.referencePath)))}}it._jsonSchemaVersion="firestore/documentReference/1.0",it._jsonSchema={type:st("string",it._jsonSchemaVersion),referencePath:st("string")};class re extends de{constructor(t,e,r){super(t,e,ri(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new it(this.firestore,null,new M(t))}withConverter(t){return new re(this.firestore,t,this._path)}}function pn(n,t,...e){if(n=jt(n),gc("collection","path",t),n instanceof qr){const r=Q.fromString(t,...e);return Xo(r),new re(n,null,r)}{if(!(n instanceof it||n instanceof re))throw new D(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Q.fromString(t,...e));return Xo(r),new re(n.firestore,null,r)}}function fr(n,t,...e){if(n=jt(n),arguments.length===1&&(t=Js.newId()),gc("doc","path",t),n instanceof qr){const r=Q.fromString(t,...e);return Jo(r),new it(n,null,new M(r))}{if(!(n instanceof it||n instanceof re))throw new D(V.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Q.fromString(t,...e));return Jo(r),new it(n.firestore,n instanceof re?n.converter:null,new M(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ba="AsyncQueue";class ja{constructor(t=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new lu(this,"async_queue_retry"),this._c=()=>{const r=ws();r&&N(Ba,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=t;const e=ws();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=ws();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise(()=>{});const e=new Mt;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Yu.push(t),this.lc()))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(t){if(!Ke(t))throw t;N(Ba,"Operation failed with retryable error: "+t)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(t){const e=this.ac.then(()=>(this.rc=!0,t().catch(r=>{throw this.nc=r,this.rc=!1,$t("INTERNAL UNHANDLED ERROR: ",qa(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=e,e}enqueueAfterDelay(t,e,r){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const s=_i.createAndSchedule(this,t,e,r,o=>this.hc(o));return this.tc.push(s),s}uc(){this.nc&&O(47125,{Pc:qa(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ec(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ic(t){return this.Tc().then(()=>{this.tc.sort((e,r)=>e.targetTimeMs-r.targetTimeMs);for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()})}Rc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function qa(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class Pe extends qr{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new ja,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new ja(t),this._firestoreClient=void 0,await t}}}function pp(n,t){const e=typeof n=="object"?n:ic(),r=typeof n=="string"?n:Er,s=$h(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=Ml("firestore");o&&mp(s,...o)}return s}function $r(n){if(n._terminated)throw new D(V.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||gp(n),n._firestoreClient}function gp(n){var r,s,o,a;const t=n._freezeSettings(),e=fp(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,t);n._componentsProvider||(o=t.localCache)!=null&&o._offlineComponentProvider&&((a=t.localCache)!=null&&a._onlineComponentProvider)&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new sp(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&function(h){const d=h==null?void 0:h._online.build();return{_offline:h==null?void 0:h._offline.build(d),_online:d}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Vt(dt.fromBase64String(t))}catch(e){throw new D(V.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Vt(dt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Vt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(On(t,Vt._jsonSchema))return Vt.fromBase64String(t.bytes)}}Vt._jsonSchemaVersion="firestore/bytes/1.0",Vt._jsonSchema={type:st("string",Vt._jsonSchemaVersion),bytes:st("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new D(V.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ht(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new D(V.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new D(V.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return B(this._lat,t._lat)||B(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ft._jsonSchemaVersion}}static fromJSON(t){if(On(t,Ft._jsonSchema))return new Ft(t.latitude,t.longitude)}}Ft._jsonSchemaVersion="firestore/geoPoint/1.0",Ft._jsonSchema={type:st("string",Ft._jsonSchemaVersion),latitude:st("number"),longitude:st("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0}(this._values,t._values)}toJSON(){return{type:bt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(On(t,bt._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every(e=>typeof e=="number"))return new bt(t.vectorValues);throw new D(V.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}bt._jsonSchemaVersion="firestore/vectorValue/1.0",bt._jsonSchema={type:st("string",bt._jsonSchemaVersion),vectorValues:st("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _p=/^__.*__$/;class yp{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new he(t,this.data,this.fieldMask,e,this.fieldTransforms):new Ln(t,this.data,e,this.fieldTransforms)}}class ku{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return new he(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function xu(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw O(40011,{dataSource:n})}}class wi{constructor(t,e,r,s,o,a){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,o===void 0&&this.Ac(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(t){return new wi({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.i({path:e,arrayElement:!1});return r.mc(t),r}fc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.i({path:e,arrayElement:!1});return r.Ac(),r}gc(t){return this.i({path:void 0,arrayElement:!0})}yc(t){return Pr(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}Ac(){if(this.path)for(let t=0;t<this.path.length;t++)this.mc(this.path.get(t))}mc(t){if(t.length===0)throw this.yc("Document fields must not be empty");if(xu(this.dataSource)&&_p.test(t))throw this.yc('Document fields cannot begin and end with "__"')}}class Ep{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||Ur(t)}A(t,e,r,s=!1){return new wi({dataSource:t,methodName:e,targetDoc:r,path:ht.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Ri(n){const t=n._freezeSettings(),e=Ur(n._databaseId);return new Ep(n._databaseId,!!t.ignoreUndefinedProperties,e)}function Tp(n,t,e,r,s,o={}){const a=n.A(o.merge||o.mergeFields?2:0,t,e,s);Vi("Data must be an object, but it was:",a,r);const l=Mu(r,a);let h,d;if(o.merge)h=new Rt(a.fieldMask),d=a.fieldTransforms;else if(o.mergeFields){const m=[];for(const E of o.mergeFields){const R=Re(t,E,e);if(!a.contains(R))throw new D(V.INVALID_ARGUMENT,`Field '${R}' is specified in your field mask but missing from your input data.`);Fu(m,R)||m.push(R)}h=new Rt(m),d=a.fieldTransforms.filter(E=>h.covers(E.field))}else h=null,d=a.fieldTransforms;return new yp(new It(l),h,d)}class Gr extends zr{_toFieldTransform(t){if(t.dataSource!==2)throw t.dataSource===1?t.yc(`${this._methodName}() can only appear at the top level of your update data`):t.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Gr}}class Si extends zr{_toFieldTransform(t){return new rf(t.path,new kn)}isEqual(t){return t instanceof Si}}function Ip(n,t,e,r){const s=n.A(1,t,e);Vi("Data must be an object, but it was:",s,r);const o=[],a=It.empty();le(r,(h,d)=>{const m=Lu(t,h,e);d=jt(d);const E=s.fc(m);if(d instanceof Gr)o.push(m);else{const R=jn(d,E);R!=null&&(o.push(m),a.set(m,R))}});const l=new Rt(o);return new ku(a,l,s.fieldTransforms)}function vp(n,t,e,r,s,o){const a=n.A(1,t,e),l=[Re(t,r,e)],h=[s];if(o.length%2!=0)throw new D(V.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let R=0;R<o.length;R+=2)l.push(Re(t,o[R])),h.push(o[R+1]);const d=[],m=It.empty();for(let R=l.length-1;R>=0;--R)if(!Fu(d,l[R])){const S=l[R];let b=h[R];b=jt(b);const x=a.fc(S);if(b instanceof Gr)d.push(S);else{const k=jn(b,x);k!=null&&(d.push(S),m.set(S,k))}}const E=new Rt(d);return new ku(m,E,a.fieldTransforms)}function Ap(n,t,e,r=!1){return jn(e,n.A(r?4:3,t))}function jn(n,t){if(Ou(n=jt(n)))return Vi("Unsupported field value:",t,n),Mu(n,t);if(n instanceof zr)return function(r,s){if(!xu(s.dataSource))throw s.yc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.yc(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(s);o&&s.fieldTransforms.push(o)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.yc("Nested arrays are not supported");return function(r,s){const o=[];let a=0;for(const l of r){let h=jn(l,s.gc(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}}(n,t)}return function(r,s){if((r=jt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return tf(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=J.fromDate(r);return{timestampValue:wr(s.serializer,o)}}if(r instanceof J){const o=new J(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:wr(s.serializer,o)}}if(r instanceof Ft)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Vt)return{bytesValue:Jc(s.serializer,r._byteString)};if(r instanceof it){const o=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw s.yc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:ci(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof bt)return function(a,l){const h=a instanceof bt?a.toArray():a;return{mapValue:{fields:{[Rc]:{stringValue:Sc},[Tr]:{arrayValue:{values:h.map(m=>{if(typeof m!="number")throw l.yc("VectorValues must only contain numeric values.");return si(l.serializer,m)})}}}}}}(r,s);if(iu(r))return r._toProto(s.serializer);throw s.yc(`Unsupported field value: ${Cr(r)}`)}(n,t)}function Mu(n,t){const e={};return Ec(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):le(n,(r,s)=>{const o=jn(s,t.dc(r));o!=null&&(e[r]=o)}),{mapValue:{fields:e}}}function Ou(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof J||n instanceof Ft||n instanceof Vt||n instanceof it||n instanceof zr||n instanceof bt||iu(n))}function Vi(n,t,e){if(!Ou(e)||!_c(e)){const r=Cr(e);throw r==="an object"?t.yc(n+" a custom object"):t.yc(n+" "+r)}}function Re(n,t,e){if((t=jt(t))instanceof Ai)return t._internalPath;if(typeof t=="string")return Lu(n,t);throw Pr("Field path arguments must be of type string or ",n,!1,void 0,e)}const wp=new RegExp("[~\\*/\\[\\]]");function Lu(n,t,e){if(t.search(wp)>=0)throw Pr(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new Ai(...t.split("."))._internalPath}catch{throw Pr(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function Pr(n,t,e,r,s){const o=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${t}() called with invalid data`;e&&(l+=" (via `toFirestore()`)"),l+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${s}`),h+=")"),new D(V.INVALID_ARGUMENT,l+n+h)}function Fu(n,t){return n.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rp{convertValue(t,e="none"){switch(ae(t)){case 0:return null;case 1:return t.booleanValue;case 2:return et(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(oe(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw O(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return le(t,(s,o)=>{r[s]=this.convertValue(o,e)}),r}convertVectorValue(t){var r,s,o;const e=(o=(s=(r=t.fields)==null?void 0:r[Tr].arrayValue)==null?void 0:s.values)==null?void 0:o.map(a=>et(a.doubleValue));return new bt(e)}convertGeoPoint(t){return new Ft(et(t.latitude),et(t.longitude))}convertArray(t,e){return(t.values||[]).map(r=>this.convertValue(r,e))}convertServerTimestamp(t,e){switch(e){case"previous":const r=kr(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(bn(t));default:return null}}convertTimestamp(t){const e=ie(t);return new J(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=Q.fromString(t);z(su(r),9688,{name:t});const s=new Cn(r.get(1),r.get(3)),o=new M(r.popFirst(5));return s.isEqual(e)||$t(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi extends Rp{constructor(t){super(),this.firestore=t}convertBytes(t){return new Vt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new it(this.firestore,null,e)}}function $a(){return new Si("serverTimestamp")}const za="@firebase/firestore",Ga="4.13.0";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sp{constructor(t="count",e){this._internalFieldPath=e,this.type="AggregateField",this.aggregateType=t}}class Vp{constructor(t,e,r){this._userDataWriter=e,this._data=r,this.type="AggregateQuerySnapshot",this.query=t}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new It({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uu{constructor(t,e,r,s,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new it(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Pp(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var t;return((t=this._document)==null?void 0:t.data.clone().value.mapValue.fields)??void 0}get(t){if(this._document){const e=this._document.data.field(Re("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Pp extends Uu{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bp(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new D(V.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class bi{}class Ci extends bi{}function gn(n,t,...e){let r=[];t instanceof bi&&r.push(t),r=r.concat(e),function(o){const a=o.filter(h=>h instanceof Di).length,l=o.filter(h=>h instanceof Hr).length;if(a>1||a>0&&l>0)throw new D(V.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class Hr extends Ci{constructor(t,e,r){super(),this._field=t,this._op=e,this._value=r,this.type="where"}static _create(t,e,r){return new Hr(t,e,r)}_apply(t){const e=this._parse(t);return Bu(t._query,e),new de(t.firestore,t.converter,Fs(t._query,e))}_parse(t){const e=Ri(t.firestore);return function(o,a,l,h,d,m,E){let R;if(d.isKeyField()){if(m==="array-contains"||m==="array-contains-any")throw new D(V.INVALID_ARGUMENT,`Invalid Query. You can't perform '${m}' queries on documentId().`);if(m==="in"||m==="not-in"){Wa(E,m);const b=[];for(const x of E)b.push(Ka(h,o,x));R={arrayValue:{values:b}}}else R=Ka(h,o,E)}else m!=="in"&&m!=="not-in"&&m!=="array-contains-any"||Wa(E,m),R=Ap(l,a,E,m==="in"||m==="not-in");return rt.create(d,m,R)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function kt(n,t,e){const r=t,s=Re("where",n);return Hr._create(s,r,e)}class Di extends bi{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new Di(t,e)}_parse(t){const e=this._queryConstraints.map(r=>r._parse(t)).filter(r=>r.getFilters().length>0);return e.length===1?e[0]:Ct.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:(function(s,o){let a=s;const l=o.getFlattenedFilters();for(const h of l)Bu(a,h),a=Fs(a,h)}(t._query,e),new de(t.firestore,t.converter,Fs(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Ni extends Ci{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new Ni(t,e)}_apply(t){const e=function(s,o,a){if(s.startAt!==null)throw new D(V.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new D(V.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Nn(o,a)}(t._query,this._field,this._direction);return new de(t.firestore,t.converter,Hd(t._query,e))}}function Ha(n,t="asc"){const e=t,r=Re("orderBy",n);return Ni._create(r,e)}class ki extends Ci{constructor(t,e,r){super(),this.type=t,this._limit=e,this._limitType=r}static _create(t,e,r){return new ki(t,e,r)}_apply(t){return new de(t.firestore,t.converter,vr(t._query,this._limit,this._limitType))}}function Cp(n){return ki._create("limit",n,"F")}function Ka(n,t,e){if(typeof(e=jt(e))=="string"){if(e==="")throw new D(V.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!xc(t)&&e.indexOf("/")!==-1)throw new D(V.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const r=t.path.child(Q.fromString(e));if(!M.isDocumentKey(r))throw new D(V.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return oa(n,new M(r))}if(e instanceof it)return oa(n,e._key);throw new D(V.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Cr(e)}.`)}function Wa(n,t){if(!Array.isArray(n)||n.length===0)throw new D(V.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Bu(n,t){const e=function(s,o){for(const a of s)for(const l of a.getFlattenedFilters())if(o.indexOf(l.op)>=0)return l.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(e!==null)throw e===t.op?new D(V.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new D(V.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}function Dp(n,t,e){let r;return r=n?n.toFirestore(t):t,r}function Np(){return new Sp("count")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qa(n){return kp(n,{count:Np()})}function kp(n,t){const e=Ut(n.firestore,Pe),r=$r(e),s=Sd(t,(o,a)=>new df(a,o.aggregateType,o._internalFieldPath));return lp(r,n._query,s).then(o=>function(l,h,d){const m=new Pi(l);return new Vp(h,m,d)}(e,n,o))}class Tn{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Ie extends Uu{constructor(t,e,r,s,o,a){super(t,e,r,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new mr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(Re("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new D(V.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=Ie._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}Ie._jsonSchemaVersion="firestore/documentSnapshot/1.0",Ie._jsonSchema={type:st("string",Ie._jsonSchemaVersion),bundleSource:st("string","DocumentSnapshot"),bundleName:st("string"),bundle:st("string")};class mr extends Ie{data(t={}){return super.data(t)}}class Fe{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Tn(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(r=>{t.call(e,new mr(this._firestore,this._userDataWriter,r.key,r,new Tn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new D(V.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(s,o){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(l=>{const h=new mr(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Tn(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>o||l.type!==3).map(l=>{const h=new mr(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Tn(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,m=-1;return l.type!==0&&(d=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),m=a.indexOf(l.doc.key)),{type:xp(l.type),doc:h,oldIndex:d,newIndex:m}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new D(V.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=Fe._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=Js.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],s=[];return this.docs.forEach(o=>{o._document!==null&&(e.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),s.push(o.ref.path))}),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function xp(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return O(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Fe._jsonSchemaVersion="firestore/querySnapshot/1.0",Fe._jsonSchema={type:st("string",Fe._jsonSchemaVersion),bundleSource:st("string","QuerySnapshot"),bundleName:st("string"),bundle:st("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mp(n){n=Ut(n,it);const t=Ut(n.firestore,Pe),e=$r(t);return cp(e,n._key).then(r=>Up(t,n,r))}function Ss(n){n=Ut(n,de);const t=Ut(n.firestore,Pe),e=$r(t),r=new Pi(t);return bp(n._query),up(e,n._query).then(s=>new Fe(t,r,n,s))}function Op(n,t,e,...r){n=Ut(n,it);const s=Ut(n.firestore,Pe),o=Ri(s);let a;return a=typeof(t=jt(t))=="string"||t instanceof Ai?vp(o,"updateDoc",n._key,t,e,r):Ip(o,"updateDoc",n._key,t),xi(s,[a.toMutation(n._key,Pt.exists(!0))])}function Lp(n){return xi(Ut(n.firestore,Pe),[new ii(n._key,Pt.none())])}function Fp(n,t){const e=Ut(n.firestore,Pe),r=fr(n),s=Dp(n.converter,t),o=Ri(n.firestore);return xi(e,[Tp(o,"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Pt.exists(!1))]).then(()=>r)}function xi(n,t){const e=$r(n);return hp(e,t)}function Up(n,t,e){const r=e.docs.get(t._key),s=new Pi(n);return new Ie(n,s,t._key,r,new Tn(e.hasPendingWrites,e.fromCache),t.converter)}(function(t,e=!0){id(Kh),_r(new Rn("firestore",(r,{instanceIdentifier:s,options:o})=>{const a=r.getProvider("app").getImmediate(),l=new Pe(new cd(r.getProvider("auth-internal")),new hd(a,r.getProvider("app-check-internal")),bd(a,s),a);return o={useFetchStreams:e,...o},l._setSettings(o),l},"PUBLIC").setMultipleInstances(!0)),Me(za,Ga,t),Me(za,Ga,"esm2020")})();var Bp="firebase",jp="12.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Me(Bp,jp,"app");const qp={apiKey:"AIzaSyCgwUVCfIgpsYZJCLPWZiTi5jAoCdFbAgU",authDomain:"collection-a7a10.firebaseapp.com",projectId:"collection-a7a10",storageBucket:"collection-a7a10.firebasestorage.app",messagingSenderId:"998088577925",appId:"1:998088577925:web:8e735ad92100266afa2aec"},$p=Wh().length?ic():sc(qp),Jt=pp($p);class zp{constructor(){Lo(this,"collectionName","802collection")}async getTopEntries(t=20,e,r){try{const s=pn(Jt,this.collectionName),o=gn(s,Ha("score","desc"),Cp(100));console.log("Fetching leaderboard");const a=await Ss(o);console.log("Got",a.size,"entries");const l=[];return a.forEach(h=>{var m,E;const d=h.data();e&&d.game!==e||r&&d.mode!==r||l.push({id:h.id,name:d.name,score:d.score,game:d.game,mode:d.mode,createdAt:((m=d.createdAt)==null?void 0:m.toDate())||new Date,updatedAt:(E=d.updatedAt)==null?void 0:E.toDate()})}),l.slice(0,Math.min(t,20))}catch(s){return console.error("Error fetching leaderboard:",s),[]}}async addEntry(t,e,r,s){var o,a,l;try{if(console.log("Adding entry:",{name:t,score:e,game:r,mode:s}),!t||t.trim().length===0)throw new Error("Name is required");if(typeof e!="number"||isNaN(e))throw new Error("Score must be a valid number");const h=pn(Jt,this.collectionName),d=t.trim(),m=[kt("name","==",d)];r&&m.push(kt("game","==",r)),s&&m.push(kt("mode","==",s)),console.log("Checking for existing entry with filter:",m);const E=gn(h,...m),R=await Ss(E);if(console.log("Existing entries found:",R.size),R.empty){console.log("Creating new entry");const S={name:d,score:e,game:r||"general"};s!==void 0&&(S.mode=s);const b=await Fp(h,{...S,createdAt:$a()});return console.log("Entry created with ID:",b.id),{id:b.id,name:d,score:e,game:r||"general",mode:s,createdAt:new Date}}else{const S=R.docs[0],b=S.data();return console.log("Existing entry score:",b.score,"New score:",e),e>b.score?(console.log("Updating entry with higher score"),await Op(fr(Jt,this.collectionName,S.id),{score:e,updatedAt:$a()}),{id:S.id,name:d,score:e,game:b.game,mode:b.mode,createdAt:((o=b.createdAt)==null?void 0:o.toDate())||new Date,updatedAt:new Date}):(console.log("Score not higher, returning existing entry"),{id:S.id,name:b.name,score:b.score,game:b.game,mode:b.mode,createdAt:((a=b.createdAt)==null?void 0:a.toDate())||new Date,updatedAt:(l=b.updatedAt)==null?void 0:l.toDate()})}}catch(h){throw console.error("Error adding entry:",h),h}}async getEntryById(t){var e,r;try{const s=fr(Jt,this.collectionName,t),o=await Mp(s);if(o.exists()){const a=o.data();return{id:o.id,name:a.name,score:a.score,game:a.game,mode:a.mode,createdAt:((e=a.createdAt)==null?void 0:e.toDate())||new Date,updatedAt:(r=a.updatedAt)==null?void 0:r.toDate()}}return null}catch(s){return console.error("Error fetching entry:",s),null}}async searchByName(t){try{const e=pn(Jt,this.collectionName),r=gn(e,kt("name",">=",t),kt("name","<=",t+""),Ha("score","desc")),s=await Ss(r),o=[];return s.forEach(a=>{var h,d;const l=a.data();o.push({id:a.id,name:l.name,score:l.score,game:l.game,mode:l.mode,createdAt:((h=l.createdAt)==null?void 0:h.toDate())||new Date,updatedAt:(d=l.updatedAt)==null?void 0:d.toDate()})}),o}catch(e){return console.error("Error searching entries:",e),[]}}async getRank(t,e,r){try{const s=pn(Jt,this.collectionName),o=[kt("score",">",t)];e&&o.push(kt("game","==",e)),r&&o.push(kt("mode","==",r));const a=gn(s,...o);return(await Qa(a)).data().count+1}catch(s){return console.error("Error fetching rank:",s),-1}}async deleteEntry(t){try{return await Lp(fr(Jt,this.collectionName,t)),!0}catch(e){return console.error("Error deleting entry:",e),!1}}async getTotalCount(t,e){try{const r=pn(Jt,this.collectionName),s=[];t&&s.push(kt("game","==",t)),e&&s.push(kt("mode","==",e));const o=gn(r,...s);return(await Qa(o)).data().count}catch(r){return console.error("Error fetching count:",r),0}}}const Gp=new zp,Zp=({game:n,mode:t,title:e})=>{const[r,s]=fn.useState([]),[o,a]=fn.useState(!0),[l,h]=fn.useState(null),d=fn.useCallback(async()=>{try{a(!0);const S=await Gp.getTopEntries(20,n,t);s(S),h(new Date)}catch(S){console.error("Failed to fetch leaderboard entries:",S)}finally{a(!1)}},[n,t]);fn.useEffect(()=>{d()},[d]);const m=()=>l?`Updated: ${l.toLocaleTimeString()}`:"",E=S=>S===1?H.jsx("span",{className:"flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500 text-white font-bold text-xs",children:H.jsx(Al,{className:"w-3 h-3"})}):S===2?H.jsx("span",{className:"flex items-center justify-center w-7 h-7 rounded-full bg-gray-400 text-white font-bold text-xs",children:"2"}):S===3?H.jsx("span",{className:"flex items-center justify-center w-7 h-7 rounded-full bg-amber-600 text-white font-bold text-xs",children:"3"}):H.jsx("span",{className:"flex items-center justify-center w-7 h-7 rounded-full bg-gray-600 text-gray-300 font-bold text-xs",children:S}),R=S=>S.toLocaleDateString("en-US",{month:"short",day:"numeric"});return H.jsxs("div",{className:"bg-gray-900/95 border border-gray-700 rounded-lg p-4 max-w-md",children:[H.jsxs("div",{className:"flex items-center justify-between mb-3",children:[H.jsxs("div",{className:"flex items-center gap-2",children:[H.jsx(wl,{className:"w-5 h-5 text-yellow-500"}),H.jsxs("h3",{className:"text-lg font-bold text-white",children:[e||`${n==="snake"?"Snake":n==="bird-shit"?"Bird Shit":"Leaderboard"}`,t&&H.jsxs("span",{className:"text-gray-400 text-sm ml-2 capitalize",children:["(",t,")"]})]})]}),H.jsx("button",{onClick:d,disabled:o,className:"p-1 text-gray-400 hover:text-white rounded transition-colors",title:"Refresh",children:H.jsx(Il,{className:`w-4 h-4 ${o?"animate-spin":""}`})})]}),H.jsx("div",{className:"space-y-1 max-h-64 overflow-y-auto",children:o?H.jsx("div",{className:"flex items-center justify-center py-8",children:H.jsx("div",{className:"animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500"})}):r.length===0?H.jsxs("div",{className:"text-center py-6 text-gray-500",children:[H.jsx("p",{className:"text-sm",children:"No scores yet"}),H.jsx("p",{className:"text-xs mt-1",children:"Be the first to set a record!"})]}):r.map((S,b)=>H.jsxs("div",{className:`flex items-center py-2 px-3 rounded ${b===0?"bg-yellow-500/10 border border-yellow-500/20":b<3?"bg-gray-800/50":"bg-gray-800/30"}`,children:[H.jsx("span",{className:"w-8 flex-shrink-0",children:E(b+1)}),H.jsx("div",{className:"flex-1 min-w-0",children:H.jsxs("div",{className:"flex items-center",children:[H.jsx(vl,{className:"w-3 h-3 mr-1.5 text-gray-500"}),H.jsx("span",{className:"text-sm font-medium text-white truncate",children:S.name})]})}),H.jsxs("div",{className:"text-right ml-2",children:[H.jsx("span",{className:"text-lg font-bold text-yellow-400",children:S.score.toLocaleString()}),H.jsx("div",{className:"text-xs text-gray-500",children:R(S.createdAt)})]})]},S.id||b))}),l&&H.jsxs("div",{className:"mt-2 text-xs text-gray-500 text-center",children:[m()," • ",r.length," entries"]})]})};export{Zp as G,Jp as M,wl as T,Yp as a,Gp as l};
//# sourceMappingURL=GameLeaderboard-G-XhkGXR.js.map
