var nm=Object.defineProperty;var rm=(r,t,e)=>t in r?nm(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var fr=(r,t,e)=>rm(r,typeof t!="symbol"?t+"":t,e);import{c as hi,j as X,f as sm}from"./index-BM7vLfIZ.js";import{r as mr}from"./vendor-DJG0Mpis.js";import{U as im}from"./user-Bi1LxaPT.js";/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KI=hi("Maximize",[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const om=hi("Medal",[["path",{d:"M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15",key:"143lza"}],["path",{d:"M11 12 5.12 2.2",key:"qhuxz6"}],["path",{d:"m13 12 5.88-9.8",key:"hbye0f"}],["path",{d:"M8 7h8",key:"i86dvs"}],["circle",{cx:"12",cy:"17",r:"5",key:"qbz8iq"}],["path",{d:"M12 18v-2h-.5",key:"fawc4q"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GI=hi("Minimize",[["path",{d:"M8 3v3a2 2 0 0 1-2 2H3",key:"hohbtr"}],["path",{d:"M21 8h-3a2 2 0 0 1-2-2V3",key:"5jw1f3"}],["path",{d:"M3 16h3a2 2 0 0 1 2 2v3",key:"198tvr"}],["path",{d:"M16 21v-3a2 2 0 0 1 2-2h3",key:"ph8mxp"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const am=hi("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]),cm=()=>{};var tu={};/**
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
 */const Ol=function(r){const t=[];let e=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},um=function(r){const t=[];let e=0,n=0;for(;e<r.length;){const s=r[e++];if(s<128)t[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[e++];t[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[e++],a=r[e++],c=r[e++],l=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;t[n++]=String.fromCharCode(55296+(l>>10)),t[n++]=String.fromCharCode(56320+(l&1023))}else{const i=r[e++],a=r[e++];t[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return t.join("")},Fl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,t){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],a=s+1<r.length,c=a?r[s+1]:0,l=s+2<r.length,h=l?r[s+2]:0,f=i>>2,g=(i&3)<<4|c>>4;let I=(c&15)<<2|h>>6,b=h&63;l||(b=64,a||(I=64)),n.push(e[f],e[g],e[I],e[b])}return n.join("")},encodeString(r,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(r):this.encodeByteArray(Ol(r),t)},decodeString(r,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(r):um(this.decodeStringToByteArray(r,t))},decodeStringToByteArray(r,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=e[r.charAt(s++)],c=s<r.length?e[r.charAt(s)]:0;++s;const h=s<r.length?e[r.charAt(s)]:64;++s;const g=s<r.length?e[r.charAt(s)]:64;if(++s,i==null||c==null||h==null||g==null)throw new lm;const I=i<<2|c>>4;if(n.push(I),h!==64){const b=c<<4&240|h>>2;if(n.push(b),g!==64){const P=h<<6&192|g;n.push(P)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class lm extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const hm=function(r){const t=Ol(r);return Fl.encodeByteArray(t,!0)},qs=function(r){return hm(r).replace(/\./g,"")},dm=function(r){try{return Fl.decodeString(r,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function Ll(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const fm=()=>Ll().__FIREBASE_DEFAULTS__,mm=()=>{if(typeof process>"u"||typeof tu>"u")return;const r=tu.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},gm=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=r&&dm(r[1]);return t&&JSON.parse(t)},Zo=()=>{try{return cm()||fm()||mm()||gm()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},pm=r=>{var t,e;return(e=(t=Zo())==null?void 0:t.emulatorHosts)==null?void 0:e[r]},_m=r=>{const t=pm(r);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const n=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),n]:[t.substring(0,e),n]},Bl=()=>{var r;return(r=Zo())==null?void 0:r.config};/**
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
 */class ym{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,n))}}}/**
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
 */function Im(r,t){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},n=t||"demo-project",s=r.iat||0,i=r.sub||r.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...r};return[qs(JSON.stringify(e)),qs(JSON.stringify(a)),""].join(".")}/**
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
 */function js(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ul(){var t;const r=(t=Zo())==null?void 0:t.forceEnvironment;if(r==="node")return!0;if(r==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function ql(){return!Ul()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function jl(){return!Ul()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function $l(){try{return typeof indexedDB=="object"}catch{return!1}}function Em(){return new Promise((r,t)=>{try{let e=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var i;t(((i=s.error)==null?void 0:i.message)||"")}}catch(e){t(e)}})}/**
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
 */const Tm="FirebaseError";class zn extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name=Tm,Object.setPrototypeOf(this,zn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,zl.prototype.create)}}class zl{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},s=`${this.service}/${t}`,i=this.errors[t],a=i?wm(i,n):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new zn(s,c,n)}}function wm(r,t){return r.replace(Am,(e,n)=>{const s=t[n];return s!=null?String(s):`<${n}?>`})}const Am=/\{\$([^}]+)}/g;function $s(r,t){if(r===t)return!0;const e=Object.keys(r),n=Object.keys(t);for(const s of e){if(!n.includes(s))return!1;const i=r[s],a=t[s];if(eu(i)&&eu(a)){if(!$s(i,a))return!1}else if(i!==a)return!1}for(const s of n)if(!e.includes(s))return!1;return!0}function eu(r){return r!==null&&typeof r=="object"}/**
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
 */function te(r){return r&&r._delegate?r._delegate:r}/**
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
 */function Kl(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function vm(r){return(await fetch(r,{credentials:"include"})).ok}class Fr{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */const qe="[DEFAULT]";/**
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
 */class bm{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const n=new ym;if(this.instancesDeferred.set(e,n),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),n=(t==null?void 0:t.optional)??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(s){if(n)return null;throw s}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Sm(t))try{this.getOrInitializeService({instanceIdentifier:qe})}catch{}for(const[e,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(t=qe){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=qe){return this.instances.has(t)}getOptions(t=qe){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);n===c&&a.resolve(s)}return s}onInit(t,e){const n=this.normalizeInstanceIdentifier(e),s=this.onInitCallbacks.get(n)??new Set;s.add(t),this.onInitCallbacks.set(n,s);const i=this.instances.get(n);return i&&t(i,n),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const s of n)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:Rm(t),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch{}return n||null}normalizeInstanceIdentifier(t=qe){return this.component?this.component.multipleInstances?t:qe:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Rm(r){return r===qe?void 0:r}function Sm(r){return r.instantiationMode==="EAGER"}/**
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
 */class Vm{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new bm(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var Q;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(Q||(Q={}));const Pm={debug:Q.DEBUG,verbose:Q.VERBOSE,info:Q.INFO,warn:Q.WARN,error:Q.ERROR,silent:Q.SILENT},Cm=Q.INFO,Dm={[Q.DEBUG]:"log",[Q.VERBOSE]:"log",[Q.INFO]:"info",[Q.WARN]:"warn",[Q.ERROR]:"error"},xm=(r,t,...e)=>{if(t<r.logLevel)return;const n=new Date().toISOString(),s=Dm[t];if(s)console[s](`[${n}]  ${r.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Gl{constructor(t){this.name=t,this._logLevel=Cm,this._logHandler=xm,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in Q))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Pm[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,Q.DEBUG,...t),this._logHandler(this,Q.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,Q.VERBOSE,...t),this._logHandler(this,Q.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,Q.INFO,...t),this._logHandler(this,Q.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,Q.WARN,...t),this._logHandler(this,Q.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,Q.ERROR,...t),this._logHandler(this,Q.ERROR,...t)}}const Nm=(r,t)=>t.some(e=>r instanceof e);let nu,ru;function km(){return nu||(nu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Mm(){return ru||(ru=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Hl=new WeakMap,wo=new WeakMap,Ql=new WeakMap,ao=new WeakMap,ta=new WeakMap;function Om(r){const t=new Promise((e,n)=>{const s=()=>{r.removeEventListener("success",i),r.removeEventListener("error",a)},i=()=>{e(ye(r.result)),s()},a=()=>{n(r.error),s()};r.addEventListener("success",i),r.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&Hl.set(e,r)}).catch(()=>{}),ta.set(t,r),t}function Fm(r){if(wo.has(r))return;const t=new Promise((e,n)=>{const s=()=>{r.removeEventListener("complete",i),r.removeEventListener("error",a),r.removeEventListener("abort",a)},i=()=>{e(),s()},a=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",i),r.addEventListener("error",a),r.addEventListener("abort",a)});wo.set(r,t)}let Ao={get(r,t,e){if(r instanceof IDBTransaction){if(t==="done")return wo.get(r);if(t==="objectStoreNames")return r.objectStoreNames||Ql.get(r);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return ye(r[t])},set(r,t,e){return r[t]=e,!0},has(r,t){return r instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in r}};function Lm(r){Ao=r(Ao)}function Bm(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const n=r.call(co(this),t,...e);return Ql.set(n,t.sort?t.sort():[t]),ye(n)}:Mm().includes(r)?function(...t){return r.apply(co(this),t),ye(Hl.get(this))}:function(...t){return ye(r.apply(co(this),t))}}function Um(r){return typeof r=="function"?Bm(r):(r instanceof IDBTransaction&&Fm(r),Nm(r,km())?new Proxy(r,Ao):r)}function ye(r){if(r instanceof IDBRequest)return Om(r);if(ao.has(r))return ao.get(r);const t=Um(r);return t!==r&&(ao.set(r,t),ta.set(t,r)),t}const co=r=>ta.get(r);function qm(r,t,{blocked:e,upgrade:n,blocking:s,terminated:i}={}){const a=indexedDB.open(r,t),c=ye(a);return n&&a.addEventListener("upgradeneeded",l=>{n(ye(a.result),l.oldVersion,l.newVersion,ye(a.transaction),l)}),e&&a.addEventListener("blocked",l=>e(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const jm=["get","getKey","getAll","getAllKeys","count"],$m=["put","add","delete","clear"],uo=new Map;function su(r,t){if(!(r instanceof IDBDatabase&&!(t in r)&&typeof t=="string"))return;if(uo.get(t))return uo.get(t);const e=t.replace(/FromIndex$/,""),n=t!==e,s=$m.includes(e);if(!(e in(n?IDBIndex:IDBObjectStore).prototype)||!(s||jm.includes(e)))return;const i=async function(a,...c){const l=this.transaction(a,s?"readwrite":"readonly");let h=l.store;return n&&(h=h.index(c.shift())),(await Promise.all([h[e](...c),s&&l.done]))[0]};return uo.set(t,i),i}Lm(r=>({...r,get:(t,e,n)=>su(t,e)||r.get(t,e,n),has:(t,e)=>!!su(t,e)||r.has(t,e)}));/**
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
 */class zm{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(Km(e)){const n=e.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(e=>e).join(" ")}}function Km(r){const t=r.getComponent();return(t==null?void 0:t.type)==="VERSION"}const vo="@firebase/app",iu="0.14.10";/**
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
 */const ee=new Gl("@firebase/app"),Gm="@firebase/app-compat",Hm="@firebase/analytics-compat",Qm="@firebase/analytics",Wm="@firebase/app-check-compat",Jm="@firebase/app-check",Ym="@firebase/auth",Xm="@firebase/auth-compat",Zm="@firebase/database",tg="@firebase/data-connect",eg="@firebase/database-compat",ng="@firebase/functions",rg="@firebase/functions-compat",sg="@firebase/installations",ig="@firebase/installations-compat",og="@firebase/messaging",ag="@firebase/messaging-compat",cg="@firebase/performance",ug="@firebase/performance-compat",lg="@firebase/remote-config",hg="@firebase/remote-config-compat",dg="@firebase/storage",fg="@firebase/storage-compat",mg="@firebase/firestore",gg="@firebase/ai",pg="@firebase/firestore-compat",_g="firebase",yg="12.11.0";/**
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
 */const bo="[DEFAULT]",Ig={[vo]:"fire-core",[Gm]:"fire-core-compat",[Qm]:"fire-analytics",[Hm]:"fire-analytics-compat",[Jm]:"fire-app-check",[Wm]:"fire-app-check-compat",[Ym]:"fire-auth",[Xm]:"fire-auth-compat",[Zm]:"fire-rtdb",[tg]:"fire-data-connect",[eg]:"fire-rtdb-compat",[ng]:"fire-fn",[rg]:"fire-fn-compat",[sg]:"fire-iid",[ig]:"fire-iid-compat",[og]:"fire-fcm",[ag]:"fire-fcm-compat",[cg]:"fire-perf",[ug]:"fire-perf-compat",[lg]:"fire-rc",[hg]:"fire-rc-compat",[dg]:"fire-gcs",[fg]:"fire-gcs-compat",[mg]:"fire-fst",[pg]:"fire-fst-compat",[gg]:"fire-vertex","fire-js":"fire-js",[_g]:"fire-js-all"};/**
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
 */const Lr=new Map,Eg=new Map,Ro=new Map;function ou(r,t){try{r.container.addComponent(t)}catch(e){ee.debug(`Component ${t.name} failed to register with FirebaseApp ${r.name}`,e)}}function zs(r){const t=r.name;if(Ro.has(t))return ee.debug(`There were multiple attempts to register component ${t}.`),!1;Ro.set(t,r);for(const e of Lr.values())ou(e,r);for(const e of Eg.values())ou(e,r);return!0}function Tg(r,t){const e=r.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),r.container.getProvider(t)}function wg(r){return r==null?!1:r.settings!==void 0}/**
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
 */const Ag={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ie=new zl("app","Firebase",Ag);/**
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
 */class vg{constructor(t,e,n){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Fr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Ie.create("app-deleted",{appName:this._name})}}/**
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
 */const bg=yg;function Wl(r,t={}){let e=r;typeof t!="object"&&(t={name:t});const n={name:bo,automaticDataCollectionEnabled:!0,...t},s=n.name;if(typeof s!="string"||!s)throw Ie.create("bad-app-name",{appName:String(s)});if(e||(e=Bl()),!e)throw Ie.create("no-options");const i=Lr.get(s);if(i){if($s(e,i.options)&&$s(n,i.config))return i;throw Ie.create("duplicate-app",{appName:s})}const a=new Vm(s);for(const l of Ro.values())a.addComponent(l);const c=new vg(e,n,a);return Lr.set(s,c),c}function Jl(r=bo){const t=Lr.get(r);if(!t&&r===bo&&Bl())return Wl();if(!t)throw Ie.create("no-app",{appName:r});return t}function Rg(){return Array.from(Lr.values())}function wn(r,t,e){let n=Ig[r]??r;e&&(n+=`-${e}`);const s=n.match(/\s|\//),i=t.match(/\s|\//);if(s||i){const a=[`Unable to register library "${n}" with version "${t}":`];s&&a.push(`library name "${n}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),ee.warn(a.join(" "));return}zs(new Fr(`${n}-version`,()=>({library:n,version:t}),"VERSION"))}/**
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
 */const Sg="firebase-heartbeat-database",Vg=1,Br="firebase-heartbeat-store";let lo=null;function Yl(){return lo||(lo=qm(Sg,Vg,{upgrade:(r,t)=>{switch(t){case 0:try{r.createObjectStore(Br)}catch(e){console.warn(e)}}}}).catch(r=>{throw Ie.create("idb-open",{originalErrorMessage:r.message})})),lo}async function Pg(r){try{const e=(await Yl()).transaction(Br),n=await e.objectStore(Br).get(Xl(r));return await e.done,n}catch(t){if(t instanceof zn)ee.warn(t.message);else{const e=Ie.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});ee.warn(e.message)}}}async function au(r,t){try{const n=(await Yl()).transaction(Br,"readwrite");await n.objectStore(Br).put(t,Xl(r)),await n.done}catch(e){if(e instanceof zn)ee.warn(e.message);else{const n=Ie.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});ee.warn(n.message)}}}function Xl(r){return`${r.name}!${r.options.appId}`}/**
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
 */const Cg=1024,Dg=30;class xg{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new kg(e),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=cu();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Dg){const a=Mg(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){ee.warn(n)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=cu(),{heartbeatsToSend:n,unsentEntries:s}=Ng(this._heartbeatsCache.heartbeats),i=qs(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return ee.warn(e),""}}}function cu(){return new Date().toISOString().substring(0,10)}function Ng(r,t=Cg){const e=[];let n=r.slice();for(const s of r){const i=e.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),uu(e)>t){i.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),uu(e)>t){e.pop();break}n=n.slice(1)}return{heartbeatsToSend:e,unsentEntries:n}}class kg{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return $l()?Em().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await Pg(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const n=await this.read();return au(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const n=await this.read();return au(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...t.heartbeats]})}else return}}function uu(r){return qs(JSON.stringify({version:2,heartbeats:r})).length}function Mg(r){if(r.length===0)return-1;let t=0,e=r[0].date;for(let n=1;n<r.length;n++)r[n].date<e&&(e=r[n].date,t=n);return t}/**
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
 */function Og(r){zs(new Fr("platform-logger",t=>new zm(t),"PRIVATE")),zs(new Fr("heartbeat",t=>new xg(t),"PRIVATE")),wn(vo,iu,r),wn(vo,iu,"esm2020"),wn("fire-js","")}Og("");var lu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ee,Zl;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(E,p){function y(){}y.prototype=p.prototype,E.F=p.prototype,E.prototype=new y,E.prototype.constructor=E,E.D=function(w,T,R){for(var _=Array(arguments.length-2),Ct=2;Ct<arguments.length;Ct++)_[Ct-2]=arguments[Ct];return p.prototype[T].apply(w,_)}}function e(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(n,e),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,p,y){y||(y=0);const w=Array(16);if(typeof p=="string")for(var T=0;T<16;++T)w[T]=p.charCodeAt(y++)|p.charCodeAt(y++)<<8|p.charCodeAt(y++)<<16|p.charCodeAt(y++)<<24;else for(T=0;T<16;++T)w[T]=p[y++]|p[y++]<<8|p[y++]<<16|p[y++]<<24;p=E.g[0],y=E.g[1],T=E.g[2];let R=E.g[3],_;_=p+(R^y&(T^R))+w[0]+3614090360&4294967295,p=y+(_<<7&4294967295|_>>>25),_=R+(T^p&(y^T))+w[1]+3905402710&4294967295,R=p+(_<<12&4294967295|_>>>20),_=T+(y^R&(p^y))+w[2]+606105819&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(p^T&(R^p))+w[3]+3250441966&4294967295,y=T+(_<<22&4294967295|_>>>10),_=p+(R^y&(T^R))+w[4]+4118548399&4294967295,p=y+(_<<7&4294967295|_>>>25),_=R+(T^p&(y^T))+w[5]+1200080426&4294967295,R=p+(_<<12&4294967295|_>>>20),_=T+(y^R&(p^y))+w[6]+2821735955&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(p^T&(R^p))+w[7]+4249261313&4294967295,y=T+(_<<22&4294967295|_>>>10),_=p+(R^y&(T^R))+w[8]+1770035416&4294967295,p=y+(_<<7&4294967295|_>>>25),_=R+(T^p&(y^T))+w[9]+2336552879&4294967295,R=p+(_<<12&4294967295|_>>>20),_=T+(y^R&(p^y))+w[10]+4294925233&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(p^T&(R^p))+w[11]+2304563134&4294967295,y=T+(_<<22&4294967295|_>>>10),_=p+(R^y&(T^R))+w[12]+1804603682&4294967295,p=y+(_<<7&4294967295|_>>>25),_=R+(T^p&(y^T))+w[13]+4254626195&4294967295,R=p+(_<<12&4294967295|_>>>20),_=T+(y^R&(p^y))+w[14]+2792965006&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(p^T&(R^p))+w[15]+1236535329&4294967295,y=T+(_<<22&4294967295|_>>>10),_=p+(T^R&(y^T))+w[1]+4129170786&4294967295,p=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(p^y))+w[6]+3225465664&4294967295,R=p+(_<<9&4294967295|_>>>23),_=T+(p^y&(R^p))+w[11]+643717713&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^p&(T^R))+w[0]+3921069994&4294967295,y=T+(_<<20&4294967295|_>>>12),_=p+(T^R&(y^T))+w[5]+3593408605&4294967295,p=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(p^y))+w[10]+38016083&4294967295,R=p+(_<<9&4294967295|_>>>23),_=T+(p^y&(R^p))+w[15]+3634488961&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^p&(T^R))+w[4]+3889429448&4294967295,y=T+(_<<20&4294967295|_>>>12),_=p+(T^R&(y^T))+w[9]+568446438&4294967295,p=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(p^y))+w[14]+3275163606&4294967295,R=p+(_<<9&4294967295|_>>>23),_=T+(p^y&(R^p))+w[3]+4107603335&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^p&(T^R))+w[8]+1163531501&4294967295,y=T+(_<<20&4294967295|_>>>12),_=p+(T^R&(y^T))+w[13]+2850285829&4294967295,p=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(p^y))+w[2]+4243563512&4294967295,R=p+(_<<9&4294967295|_>>>23),_=T+(p^y&(R^p))+w[7]+1735328473&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^p&(T^R))+w[12]+2368359562&4294967295,y=T+(_<<20&4294967295|_>>>12),_=p+(y^T^R)+w[5]+4294588738&4294967295,p=y+(_<<4&4294967295|_>>>28),_=R+(p^y^T)+w[8]+2272392833&4294967295,R=p+(_<<11&4294967295|_>>>21),_=T+(R^p^y)+w[11]+1839030562&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^p)+w[14]+4259657740&4294967295,y=T+(_<<23&4294967295|_>>>9),_=p+(y^T^R)+w[1]+2763975236&4294967295,p=y+(_<<4&4294967295|_>>>28),_=R+(p^y^T)+w[4]+1272893353&4294967295,R=p+(_<<11&4294967295|_>>>21),_=T+(R^p^y)+w[7]+4139469664&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^p)+w[10]+3200236656&4294967295,y=T+(_<<23&4294967295|_>>>9),_=p+(y^T^R)+w[13]+681279174&4294967295,p=y+(_<<4&4294967295|_>>>28),_=R+(p^y^T)+w[0]+3936430074&4294967295,R=p+(_<<11&4294967295|_>>>21),_=T+(R^p^y)+w[3]+3572445317&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^p)+w[6]+76029189&4294967295,y=T+(_<<23&4294967295|_>>>9),_=p+(y^T^R)+w[9]+3654602809&4294967295,p=y+(_<<4&4294967295|_>>>28),_=R+(p^y^T)+w[12]+3873151461&4294967295,R=p+(_<<11&4294967295|_>>>21),_=T+(R^p^y)+w[15]+530742520&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^p)+w[2]+3299628645&4294967295,y=T+(_<<23&4294967295|_>>>9),_=p+(T^(y|~R))+w[0]+4096336452&4294967295,p=y+(_<<6&4294967295|_>>>26),_=R+(y^(p|~T))+w[7]+1126891415&4294967295,R=p+(_<<10&4294967295|_>>>22),_=T+(p^(R|~y))+w[14]+2878612391&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~p))+w[5]+4237533241&4294967295,y=T+(_<<21&4294967295|_>>>11),_=p+(T^(y|~R))+w[12]+1700485571&4294967295,p=y+(_<<6&4294967295|_>>>26),_=R+(y^(p|~T))+w[3]+2399980690&4294967295,R=p+(_<<10&4294967295|_>>>22),_=T+(p^(R|~y))+w[10]+4293915773&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~p))+w[1]+2240044497&4294967295,y=T+(_<<21&4294967295|_>>>11),_=p+(T^(y|~R))+w[8]+1873313359&4294967295,p=y+(_<<6&4294967295|_>>>26),_=R+(y^(p|~T))+w[15]+4264355552&4294967295,R=p+(_<<10&4294967295|_>>>22),_=T+(p^(R|~y))+w[6]+2734768916&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~p))+w[13]+1309151649&4294967295,y=T+(_<<21&4294967295|_>>>11),_=p+(T^(y|~R))+w[4]+4149444226&4294967295,p=y+(_<<6&4294967295|_>>>26),_=R+(y^(p|~T))+w[11]+3174756917&4294967295,R=p+(_<<10&4294967295|_>>>22),_=T+(p^(R|~y))+w[2]+718787259&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~p))+w[9]+3951481745&4294967295,E.g[0]=E.g[0]+p&4294967295,E.g[1]=E.g[1]+(T+(_<<21&4294967295|_>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+R&4294967295}n.prototype.v=function(E,p){p===void 0&&(p=E.length);const y=p-this.blockSize,w=this.C;let T=this.h,R=0;for(;R<p;){if(T==0)for(;R<=y;)s(this,E,R),R+=this.blockSize;if(typeof E=="string"){for(;R<p;)if(w[T++]=E.charCodeAt(R++),T==this.blockSize){s(this,w),T=0;break}}else for(;R<p;)if(w[T++]=E[R++],T==this.blockSize){s(this,w),T=0;break}}this.h=T,this.o+=p},n.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var p=1;p<E.length-8;++p)E[p]=0;p=this.o*8;for(var y=E.length-8;y<E.length;++y)E[y]=p&255,p/=256;for(this.v(E),E=Array(16),p=0,y=0;y<4;++y)for(let w=0;w<32;w+=8)E[p++]=this.g[y]>>>w&255;return E};function i(E,p){var y=c;return Object.prototype.hasOwnProperty.call(y,E)?y[E]:y[E]=p(E)}function a(E,p){this.h=p;const y=[];let w=!0;for(let T=E.length-1;T>=0;T--){const R=E[T]|0;w&&R==p||(y[T]=R,w=!1)}this.g=y}var c={};function l(E){return-128<=E&&E<128?i(E,function(p){return new a([p|0],p<0?-1:0)}):new a([E|0],E<0?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return g;if(E<0)return N(h(-E));const p=[];let y=1;for(let w=0;E>=y;w++)p[w]=E/y|0,y*=4294967296;return new a(p,0)}function f(E,p){if(E.length==0)throw Error("number format error: empty string");if(p=p||10,p<2||36<p)throw Error("radix out of range: "+p);if(E.charAt(0)=="-")return N(f(E.substring(1),p));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=h(Math.pow(p,8));let w=g;for(let R=0;R<E.length;R+=8){var T=Math.min(8,E.length-R);const _=parseInt(E.substring(R,R+T),p);T<8?(T=h(Math.pow(p,T)),w=w.j(T).add(h(_))):(w=w.j(y),w=w.add(h(_)))}return w}var g=l(0),I=l(1),b=l(16777216);r=a.prototype,r.m=function(){if(M(this))return-N(this).m();let E=0,p=1;for(let y=0;y<this.g.length;y++){const w=this.i(y);E+=(w>=0?w:4294967296+w)*p,p*=4294967296}return E},r.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(P(this))return"0";if(M(this))return"-"+N(this).toString(E);const p=h(Math.pow(E,6));var y=this;let w="";for(;;){const T=st(y,p).g;y=K(y,T.j(p));let R=((y.g.length>0?y.g[0]:y.h)>>>0).toString(E);if(y=T,P(y))return R+w;for(;R.length<6;)R="0"+R;w=R+w}},r.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function P(E){if(E.h!=0)return!1;for(let p=0;p<E.g.length;p++)if(E.g[p]!=0)return!1;return!0}function M(E){return E.h==-1}r.l=function(E){return E=K(this,E),M(E)?-1:P(E)?0:1};function N(E){const p=E.g.length,y=[];for(let w=0;w<p;w++)y[w]=~E.g[w];return new a(y,~E.h).add(I)}r.abs=function(){return M(this)?N(this):this},r.add=function(E){const p=Math.max(this.g.length,E.g.length),y=[];let w=0;for(let T=0;T<=p;T++){let R=w+(this.i(T)&65535)+(E.i(T)&65535),_=(R>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);w=_>>>16,R&=65535,_&=65535,y[T]=_<<16|R}return new a(y,y[y.length-1]&-2147483648?-1:0)};function K(E,p){return E.add(N(p))}r.j=function(E){if(P(this)||P(E))return g;if(M(this))return M(E)?N(this).j(N(E)):N(N(this).j(E));if(M(E))return N(this.j(N(E)));if(this.l(b)<0&&E.l(b)<0)return h(this.m()*E.m());const p=this.g.length+E.g.length,y=[];for(var w=0;w<2*p;w++)y[w]=0;for(w=0;w<this.g.length;w++)for(let T=0;T<E.g.length;T++){const R=this.i(w)>>>16,_=this.i(w)&65535,Ct=E.i(T)>>>16,ke=E.i(T)&65535;y[2*w+2*T]+=_*ke,j(y,2*w+2*T),y[2*w+2*T+1]+=R*ke,j(y,2*w+2*T+1),y[2*w+2*T+1]+=_*Ct,j(y,2*w+2*T+1),y[2*w+2*T+2]+=R*Ct,j(y,2*w+2*T+2)}for(E=0;E<p;E++)y[E]=y[2*E+1]<<16|y[2*E];for(E=p;E<2*p;E++)y[E]=0;return new a(y,0)};function j(E,p){for(;(E[p]&65535)!=E[p];)E[p+1]+=E[p]>>>16,E[p]&=65535,p++}function q(E,p){this.g=E,this.h=p}function st(E,p){if(P(p))throw Error("division by zero");if(P(E))return new q(g,g);if(M(E))return p=st(N(E),p),new q(N(p.g),N(p.h));if(M(p))return p=st(E,N(p)),new q(N(p.g),p.h);if(E.g.length>30){if(M(E)||M(p))throw Error("slowDivide_ only works with positive integers.");for(var y=I,w=p;w.l(E)<=0;)y=W(y),w=W(w);var T=J(y,1),R=J(w,1);for(w=J(w,2),y=J(y,2);!P(w);){var _=R.add(w);_.l(E)<=0&&(T=T.add(y),R=_),w=J(w,1),y=J(y,1)}return p=K(E,T.j(p)),new q(T,p)}for(T=g;E.l(p)>=0;){for(y=Math.max(1,Math.floor(E.m()/p.m())),w=Math.ceil(Math.log(y)/Math.LN2),w=w<=48?1:Math.pow(2,w-48),R=h(y),_=R.j(p);M(_)||_.l(E)>0;)y-=w,R=h(y),_=R.j(p);P(R)&&(R=I),T=T.add(R),E=K(E,_)}return new q(T,E)}r.B=function(E){return st(this,E).h},r.and=function(E){const p=Math.max(this.g.length,E.g.length),y=[];for(let w=0;w<p;w++)y[w]=this.i(w)&E.i(w);return new a(y,this.h&E.h)},r.or=function(E){const p=Math.max(this.g.length,E.g.length),y=[];for(let w=0;w<p;w++)y[w]=this.i(w)|E.i(w);return new a(y,this.h|E.h)},r.xor=function(E){const p=Math.max(this.g.length,E.g.length),y=[];for(let w=0;w<p;w++)y[w]=this.i(w)^E.i(w);return new a(y,this.h^E.h)};function W(E){const p=E.g.length+1,y=[];for(let w=0;w<p;w++)y[w]=E.i(w)<<1|E.i(w-1)>>>31;return new a(y,E.h)}function J(E,p){const y=p>>5;p%=32;const w=E.g.length-y,T=[];for(let R=0;R<w;R++)T[R]=p>0?E.i(R+y)>>>p|E.i(R+y+1)<<32-p:E.i(R+y);return new a(T,E.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,Zl=n,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,Ee=a}).apply(typeof lu<"u"?lu:typeof self<"u"?self:typeof window<"u"?window:{});var Ts=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var th,Ar,eh,Vs,So,nh,rh,sh;(function(){var r,t=Object.defineProperty;function e(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ts=="object"&&Ts];for(var u=0;u<o.length;++u){var d=o[u];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=e(this);function s(o,u){if(u)t:{var d=n;o=o.split(".");for(var m=0;m<o.length-1;m++){var v=o[m];if(!(v in d))break t;d=d[v]}o=o[o.length-1],m=d[o],u=u(m),u!=m&&u!=null&&t(d,o,{configurable:!0,writable:!0,value:u})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(u){var d=[],m;for(m in u)Object.prototype.hasOwnProperty.call(u,m)&&d.push([m,u[m]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function c(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function l(o,u,d){return o.call.apply(o.bind,arguments)}function h(o,u,d){return h=l,h.apply(null,arguments)}function f(o,u){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function g(o,u){function d(){}d.prototype=u.prototype,o.Z=u.prototype,o.prototype=new d,o.prototype.constructor=o,o.Ob=function(m,v,S){for(var x=Array(arguments.length-2),$=2;$<arguments.length;$++)x[$-2]=arguments[$];return u.prototype[v].apply(m,x)}}var I=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function b(o){const u=o.length;if(u>0){const d=Array(u);for(let m=0;m<u;m++)d[m]=o[m];return d}return[]}function P(o,u){for(let m=1;m<arguments.length;m++){const v=arguments[m];var d=typeof v;if(d=d!="object"?d:v?Array.isArray(v)?"array":d:"null",d=="array"||d=="object"&&typeof v.length=="number"){d=o.length||0;const S=v.length||0;o.length=d+S;for(let x=0;x<S;x++)o[d+x]=v[x]}else o.push(v)}}class M{constructor(u,d){this.i=u,this.j=d,this.h=0,this.g=null}get(){let u;return this.h>0?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function N(o){a.setTimeout(()=>{throw o},0)}function K(){var o=E;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class j{constructor(){this.h=this.g=null}add(u,d){const m=q.get();m.set(u,d),this.h?this.h.next=m:this.g=m,this.h=m}}var q=new M(()=>new st,o=>o.reset());class st{constructor(){this.next=this.g=this.h=null}set(u,d){this.h=u,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let W,J=!1,E=new j,p=()=>{const o=Promise.resolve(void 0);W=()=>{o.then(y)}};function y(){for(var o;o=K();){try{o.h.call(o.g)}catch(d){N(d)}var u=q;u.j(o),u.h<100&&(u.h++,o.next=u.g,u.g=o)}J=!1}function w(){this.u=this.u,this.C=this.C}w.prototype.u=!1,w.prototype.dispose=function(){this.u||(this.u=!0,this.N())},w.prototype[Symbol.dispose]=function(){this.dispose()},w.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var R=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};a.addEventListener("test",d,u),a.removeEventListener("test",d,u)}catch{}return o}();function _(o){return/^[\s\xa0]*$/.test(o)}function Ct(o,u){T.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,u)}g(Ct,T),Ct.prototype.init=function(o,u){const d=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget,u||(d=="mouseover"?u=o.fromElement:d=="mouseout"&&(u=o.toElement)),this.relatedTarget=u,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&Ct.Z.h.call(this)},Ct.prototype.h=function(){Ct.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var ke="closure_listenable_"+(Math.random()*1e6|0),vf=0;function bf(o,u,d,m,v){this.listener=o,this.proxy=null,this.src=u,this.type=d,this.capture=!!m,this.ha=v,this.key=++vf,this.da=this.fa=!1}function os(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function as(o,u,d){for(const m in o)u.call(d,o[m],m,o)}function Rf(o,u){for(const d in o)u.call(void 0,o[d],d,o)}function Za(o){const u={};for(const d in o)u[d]=o[d];return u}const tc="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function ec(o,u){let d,m;for(let v=1;v<arguments.length;v++){m=arguments[v];for(d in m)o[d]=m[d];for(let S=0;S<tc.length;S++)d=tc[S],Object.prototype.hasOwnProperty.call(m,d)&&(o[d]=m[d])}}function cs(o){this.src=o,this.g={},this.h=0}cs.prototype.add=function(o,u,d,m,v){const S=o.toString();o=this.g[S],o||(o=this.g[S]=[],this.h++);const x=Li(o,u,m,v);return x>-1?(u=o[x],d||(u.fa=!1)):(u=new bf(u,this.src,S,!!m,v),u.fa=d,o.push(u)),u};function Fi(o,u){const d=u.type;if(d in o.g){var m=o.g[d],v=Array.prototype.indexOf.call(m,u,void 0),S;(S=v>=0)&&Array.prototype.splice.call(m,v,1),S&&(os(u),o.g[d].length==0&&(delete o.g[d],o.h--))}}function Li(o,u,d,m){for(let v=0;v<o.length;++v){const S=o[v];if(!S.da&&S.listener==u&&S.capture==!!d&&S.ha==m)return v}return-1}var Bi="closure_lm_"+(Math.random()*1e6|0),Ui={};function nc(o,u,d,m,v){if(Array.isArray(u)){for(let S=0;S<u.length;S++)nc(o,u[S],d,m,v);return null}return d=ic(d),o&&o[ke]?o.J(u,d,c(m)?!!m.capture:!1,v):Sf(o,u,d,!1,m,v)}function Sf(o,u,d,m,v,S){if(!u)throw Error("Invalid event type");const x=c(v)?!!v.capture:!!v;let $=ji(o);if($||(o[Bi]=$=new cs(o)),d=$.add(u,d,m,x,S),d.proxy)return d;if(m=Vf(),d.proxy=m,m.src=o,m.listener=d,o.addEventListener)R||(v=x),v===void 0&&(v=!1),o.addEventListener(u.toString(),m,v);else if(o.attachEvent)o.attachEvent(sc(u.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Vf(){function o(d){return u.call(o.src,o.listener,d)}const u=Pf;return o}function rc(o,u,d,m,v){if(Array.isArray(u))for(var S=0;S<u.length;S++)rc(o,u[S],d,m,v);else m=c(m)?!!m.capture:!!m,d=ic(d),o&&o[ke]?(o=o.i,S=String(u).toString(),S in o.g&&(u=o.g[S],d=Li(u,d,m,v),d>-1&&(os(u[d]),Array.prototype.splice.call(u,d,1),u.length==0&&(delete o.g[S],o.h--)))):o&&(o=ji(o))&&(u=o.g[u.toString()],o=-1,u&&(o=Li(u,d,m,v)),(d=o>-1?u[o]:null)&&qi(d))}function qi(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[ke])Fi(u.i,o);else{var d=o.type,m=o.proxy;u.removeEventListener?u.removeEventListener(d,m,o.capture):u.detachEvent?u.detachEvent(sc(d),m):u.addListener&&u.removeListener&&u.removeListener(m),(d=ji(u))?(Fi(d,o),d.h==0&&(d.src=null,u[Bi]=null)):os(o)}}}function sc(o){return o in Ui?Ui[o]:Ui[o]="on"+o}function Pf(o,u){if(o.da)o=!0;else{u=new Ct(u,this);const d=o.listener,m=o.ha||o.src;o.fa&&qi(o),o=d.call(m,u)}return o}function ji(o){return o=o[Bi],o instanceof cs?o:null}var $i="__closure_events_fn_"+(Math.random()*1e9>>>0);function ic(o){return typeof o=="function"?o:(o[$i]||(o[$i]=function(u){return o.handleEvent(u)}),o[$i])}function wt(){w.call(this),this.i=new cs(this),this.M=this,this.G=null}g(wt,w),wt.prototype[ke]=!0,wt.prototype.removeEventListener=function(o,u,d,m){rc(this,o,u,d,m)};function Rt(o,u){var d,m=o.G;if(m)for(d=[];m;m=m.G)d.push(m);if(o=o.M,m=u.type||u,typeof u=="string")u=new T(u,o);else if(u instanceof T)u.target=u.target||o;else{var v=u;u=new T(m,o),ec(u,v)}v=!0;let S,x;if(d)for(x=d.length-1;x>=0;x--)S=u.g=d[x],v=us(S,m,!0,u)&&v;if(S=u.g=o,v=us(S,m,!0,u)&&v,v=us(S,m,!1,u)&&v,d)for(x=0;x<d.length;x++)S=u.g=d[x],v=us(S,m,!1,u)&&v}wt.prototype.N=function(){if(wt.Z.N.call(this),this.i){var o=this.i;for(const u in o.g){const d=o.g[u];for(let m=0;m<d.length;m++)os(d[m]);delete o.g[u],o.h--}}this.G=null},wt.prototype.J=function(o,u,d,m){return this.i.add(String(o),u,!1,d,m)},wt.prototype.K=function(o,u,d,m){return this.i.add(String(o),u,!0,d,m)};function us(o,u,d,m){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();let v=!0;for(let S=0;S<u.length;++S){const x=u[S];if(x&&!x.da&&x.capture==d){const $=x.listener,gt=x.ha||x.src;x.fa&&Fi(o.i,x),v=$.call(gt,m)!==!1&&v}}return v&&!m.defaultPrevented}function Cf(o,u){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=h(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(u)>2147483647?-1:a.setTimeout(o,u||0)}function oc(o){o.g=Cf(()=>{o.g=null,o.i&&(o.i=!1,oc(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class Df extends w{constructor(u,d){super(),this.m=u,this.l=d,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:oc(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Yn(o){w.call(this),this.h=o,this.g={}}g(Yn,w);var ac=[];function cc(o){as(o.g,function(u,d){this.g.hasOwnProperty(d)&&qi(u)},o),o.g={}}Yn.prototype.N=function(){Yn.Z.N.call(this),cc(this)},Yn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var zi=a.JSON.stringify,xf=a.JSON.parse,Nf=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function uc(){}function lc(){}var Xn={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Ki(){T.call(this,"d")}g(Ki,T);function Gi(){T.call(this,"c")}g(Gi,T);var Me={},hc=null;function ls(){return hc=hc||new wt}Me.Ia="serverreachability";function dc(o){T.call(this,Me.Ia,o)}g(dc,T);function Zn(o){const u=ls();Rt(u,new dc(u))}Me.STAT_EVENT="statevent";function fc(o,u){T.call(this,Me.STAT_EVENT,o),this.stat=u}g(fc,T);function St(o){const u=ls();Rt(u,new fc(u,o))}Me.Ja="timingevent";function mc(o,u){T.call(this,Me.Ja,o),this.size=u}g(mc,T);function tr(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},u)}function er(){this.g=!0}er.prototype.ua=function(){this.g=!1};function kf(o,u,d,m,v,S){o.info(function(){if(o.g)if(S){var x="",$=S.split("&");for(let nt=0;nt<$.length;nt++){var gt=$[nt].split("=");if(gt.length>1){const _t=gt[0];gt=gt[1];const zt=_t.split("_");x=zt.length>=2&&zt[1]=="type"?x+(_t+"="+gt+"&"):x+(_t+"=redacted&")}}}else x=null;else x=S;return"XMLHTTP REQ ("+m+") [attempt "+v+"]: "+u+`
`+d+`
`+x})}function Mf(o,u,d,m,v,S,x){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+v+"]: "+u+`
`+d+`
`+S+" "+x})}function un(o,u,d,m){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+Ff(o,d)+(m?" "+m:"")})}function Of(o,u){o.info(function(){return"TIMEOUT: "+u})}er.prototype.info=function(){};function Ff(o,u){if(!o.g)return u;if(!u)return null;try{const S=JSON.parse(u);if(S){for(o=0;o<S.length;o++)if(Array.isArray(S[o])){var d=S[o];if(!(d.length<2)){var m=d[1];if(Array.isArray(m)&&!(m.length<1)){var v=m[0];if(v!="noop"&&v!="stop"&&v!="close")for(let x=1;x<m.length;x++)m[x]=""}}}}return zi(S)}catch{return u}}var hs={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},gc={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},pc;function Hi(){}g(Hi,uc),Hi.prototype.g=function(){return new XMLHttpRequest},pc=new Hi;function nr(o){return encodeURIComponent(String(o))}function Lf(o){var u=1;o=o.split(":");const d=[];for(;u>0&&o.length;)d.push(o.shift()),u--;return o.length&&d.push(o.join(":")),d}function oe(o,u,d,m){this.j=o,this.i=u,this.l=d,this.S=m||1,this.V=new Yn(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new _c}function _c(){this.i=null,this.g="",this.h=!1}var yc={},Qi={};function Wi(o,u,d){o.M=1,o.A=fs($t(u)),o.u=d,o.R=!0,Ic(o,null)}function Ic(o,u){o.F=Date.now(),ds(o),o.B=$t(o.A);var d=o.B,m=o.S;Array.isArray(m)||(m=[String(m)]),xc(d.i,"t",m),o.C=0,d=o.j.L,o.h=new _c,o.g=Jc(o.j,d?u:null,!o.u),o.P>0&&(o.O=new Df(h(o.Y,o,o.g),o.P)),u=o.V,d=o.g,m=o.ba;var v="readystatechange";Array.isArray(v)||(v&&(ac[0]=v.toString()),v=ac);for(let S=0;S<v.length;S++){const x=nc(d,v[S],m||u.handleEvent,!1,u.h||u);if(!x)break;u.g[x.key]=x}u=o.J?Za(o.J):{},o.u?(o.v||(o.v="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,u)):(o.v="GET",o.g.ea(o.B,o.v,null,u)),Zn(),kf(o.i,o.v,o.B,o.l,o.S,o.u)}oe.prototype.ba=function(o){o=o.target;const u=this.O;u&&ue(o)==3?u.j():this.Y(o)},oe.prototype.Y=function(o){try{if(o==this.g)t:{const $=ue(this.g),gt=this.g.ya(),nt=this.g.ca();if(!($<3)&&($!=3||this.g&&(this.h.h||this.g.la()||Bc(this.g)))){this.K||$!=4||gt==7||(gt==8||nt<=0?Zn(3):Zn(2)),Ji(this);var u=this.g.ca();this.X=u;var d=Bf(this);if(this.o=u==200,Mf(this.i,this.v,this.B,this.l,this.S,$,u),this.o){if(this.U&&!this.L){e:{if(this.g){var m,v=this.g;if((m=v.g?v.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(m)){var S=m;break e}}S=null}if(o=S)un(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Yi(this,o);else{this.o=!1,this.m=3,St(12),Oe(this),rr(this);break t}}if(this.R){o=!0;let _t;for(;!this.K&&this.C<d.length;)if(_t=Uf(this,d),_t==Qi){$==4&&(this.m=4,St(14),o=!1),un(this.i,this.l,null,"[Incomplete Response]");break}else if(_t==yc){this.m=4,St(15),un(this.i,this.l,d,"[Invalid Chunk]"),o=!1;break}else un(this.i,this.l,_t,null),Yi(this,_t);if(Ec(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),$!=4||d.length!=0||this.h.h||(this.m=1,St(16),o=!1),this.o=this.o&&o,!o)un(this.i,this.l,d,"[Invalid Chunked Response]"),Oe(this),rr(this);else if(d.length>0&&!this.W){this.W=!0;var x=this.j;x.g==this&&x.aa&&!x.P&&(x.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),io(x),x.P=!0,St(11))}}else un(this.i,this.l,d,null),Yi(this,d);$==4&&Oe(this),this.o&&!this.K&&($==4?Gc(this.j,this):(this.o=!1,ds(this)))}else tm(this.g),u==400&&d.indexOf("Unknown SID")>0?(this.m=3,St(12)):(this.m=0,St(13)),Oe(this),rr(this)}}}catch{}finally{}};function Bf(o){if(!Ec(o))return o.g.la();const u=Bc(o.g);if(u==="")return"";let d="";const m=u.length,v=ue(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return Oe(o),rr(o),"";o.h.i=new a.TextDecoder}for(let S=0;S<m;S++)o.h.h=!0,d+=o.h.i.decode(u[S],{stream:!(v&&S==m-1)});return u.length=0,o.h.g+=d,o.C=0,o.h.g}function Ec(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function Uf(o,u){var d=o.C,m=u.indexOf(`
`,d);return m==-1?Qi:(d=Number(u.substring(d,m)),isNaN(d)?yc:(m+=1,m+d>u.length?Qi:(u=u.slice(m,m+d),o.C=m+d,u)))}oe.prototype.cancel=function(){this.K=!0,Oe(this)};function ds(o){o.T=Date.now()+o.H,Tc(o,o.H)}function Tc(o,u){if(o.D!=null)throw Error("WatchDog timer not null");o.D=tr(h(o.aa,o),u)}function Ji(o){o.D&&(a.clearTimeout(o.D),o.D=null)}oe.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(Of(this.i,this.B),this.M!=2&&(Zn(),St(17)),Oe(this),this.m=2,rr(this)):Tc(this,this.T-o)};function rr(o){o.j.I==0||o.K||Gc(o.j,o)}function Oe(o){Ji(o);var u=o.O;u&&typeof u.dispose=="function"&&u.dispose(),o.O=null,cc(o.V),o.g&&(u=o.g,o.g=null,u.abort(),u.dispose())}function Yi(o,u){try{var d=o.j;if(d.I!=0&&(d.g==o||Xi(d.h,o))){if(!o.L&&Xi(d.h,o)&&d.I==3){try{var m=d.Ba.g.parse(u)}catch{m=null}if(Array.isArray(m)&&m.length==3){var v=m;if(v[0]==0){t:if(!d.v){if(d.g)if(d.g.F+3e3<o.F)ys(d),ps(d);else break t;so(d),St(18)}}else d.xa=v[1],0<d.xa-d.K&&v[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=tr(h(d.Va,d),6e3));vc(d.h)<=1&&d.ta&&(d.ta=void 0)}else Le(d,11)}else if((o.L||d.g==o)&&ys(d),!_(u))for(v=d.Ba.g.parse(u),u=0;u<v.length;u++){let nt=v[u];const _t=nt[0];if(!(_t<=d.K))if(d.K=_t,nt=nt[1],d.I==2)if(nt[0]=="c"){d.M=nt[1],d.ba=nt[2];const zt=nt[3];zt!=null&&(d.ka=zt,d.j.info("VER="+d.ka));const Be=nt[4];Be!=null&&(d.za=Be,d.j.info("SVER="+d.za));const le=nt[5];le!=null&&typeof le=="number"&&le>0&&(m=1.5*le,d.O=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const he=o.g;if(he){const Es=he.g?he.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Es){var S=m.h;S.g||Es.indexOf("spdy")==-1&&Es.indexOf("quic")==-1&&Es.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(Zi(S,S.h),S.h=null))}if(m.G){const oo=he.g?he.g.getResponseHeader("X-HTTP-Session-Id"):null;oo&&(m.wa=oo,it(m.J,m.G,oo))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-o.F,d.j.info("Handshake RTT: "+d.T+"ms")),m=d;var x=o;if(m.na=Wc(m,m.L?m.ba:null,m.W),x.L){bc(m.h,x);var $=x,gt=m.O;gt&&($.H=gt),$.D&&(Ji($),ds($)),m.g=x}else zc(m);d.i.length>0&&_s(d)}else nt[0]!="stop"&&nt[0]!="close"||Le(d,7);else d.I==3&&(nt[0]=="stop"||nt[0]=="close"?nt[0]=="stop"?Le(d,7):ro(d):nt[0]!="noop"&&d.l&&d.l.qa(nt),d.A=0)}}Zn(4)}catch{}}var qf=class{constructor(o,u){this.g=o,this.map=u}};function wc(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Ac(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function vc(o){return o.h?1:o.g?o.g.size:0}function Xi(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function Zi(o,u){o.g?o.g.add(u):o.h=u}function bc(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}wc.prototype.cancel=function(){if(this.i=Rc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Rc(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const d of o.g.values())u=u.concat(d.G);return u}return b(o.i)}var Sc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function jf(o,u){if(o){o=o.split("&");for(let d=0;d<o.length;d++){const m=o[d].indexOf("=");let v,S=null;m>=0?(v=o[d].substring(0,m),S=o[d].substring(m+1)):v=o[d],u(v,S?decodeURIComponent(S.replace(/\+/g," ")):"")}}}function ae(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let u;o instanceof ae?(this.l=o.l,sr(this,o.j),this.o=o.o,this.g=o.g,ir(this,o.u),this.h=o.h,to(this,Nc(o.i)),this.m=o.m):o&&(u=String(o).match(Sc))?(this.l=!1,sr(this,u[1]||"",!0),this.o=or(u[2]||""),this.g=or(u[3]||"",!0),ir(this,u[4]),this.h=or(u[5]||"",!0),to(this,u[6]||"",!0),this.m=or(u[7]||"")):(this.l=!1,this.i=new cr(null,this.l))}ae.prototype.toString=function(){const o=[];var u=this.j;u&&o.push(ar(u,Vc,!0),":");var d=this.g;return(d||u=="file")&&(o.push("//"),(u=this.o)&&o.push(ar(u,Vc,!0),"@"),o.push(nr(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&o.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(ar(d,d.charAt(0)=="/"?Kf:zf,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",ar(d,Hf)),o.join("")},ae.prototype.resolve=function(o){const u=$t(this);let d=!!o.j;d?sr(u,o.j):d=!!o.o,d?u.o=o.o:d=!!o.g,d?u.g=o.g:d=o.u!=null;var m=o.h;if(d)ir(u,o.u);else if(d=!!o.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var v=u.h.lastIndexOf("/");v!=-1&&(m=u.h.slice(0,v+1)+m)}if(v=m,v==".."||v==".")m="";else if(v.indexOf("./")!=-1||v.indexOf("/.")!=-1){m=v.lastIndexOf("/",0)==0,v=v.split("/");const S=[];for(let x=0;x<v.length;){const $=v[x++];$=="."?m&&x==v.length&&S.push(""):$==".."?((S.length>1||S.length==1&&S[0]!="")&&S.pop(),m&&x==v.length&&S.push("")):(S.push($),m=!0)}m=S.join("/")}else m=v}return d?u.h=m:d=o.i.toString()!=="",d?to(u,Nc(o.i)):d=!!o.m,d&&(u.m=o.m),u};function $t(o){return new ae(o)}function sr(o,u,d){o.j=d?or(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function ir(o,u){if(u){if(u=Number(u),isNaN(u)||u<0)throw Error("Bad port number "+u);o.u=u}else o.u=null}function to(o,u,d){u instanceof cr?(o.i=u,Qf(o.i,o.l)):(d||(u=ar(u,Gf)),o.i=new cr(u,o.l))}function it(o,u,d){o.i.set(u,d)}function fs(o){return it(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function or(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function ar(o,u,d){return typeof o=="string"?(o=encodeURI(o).replace(u,$f),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function $f(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Vc=/[#\/\?@]/g,zf=/[#\?:]/g,Kf=/[#\?]/g,Gf=/[#\?@]/g,Hf=/#/g;function cr(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function Fe(o){o.g||(o.g=new Map,o.h=0,o.i&&jf(o.i,function(u,d){o.add(decodeURIComponent(u.replace(/\+/g," ")),d)}))}r=cr.prototype,r.add=function(o,u){Fe(this),this.i=null,o=ln(this,o);let d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(u),this.h+=1,this};function Pc(o,u){Fe(o),u=ln(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function Cc(o,u){return Fe(o),u=ln(o,u),o.g.has(u)}r.forEach=function(o,u){Fe(this),this.g.forEach(function(d,m){d.forEach(function(v){o.call(u,v,m,this)},this)},this)};function Dc(o,u){Fe(o);let d=[];if(typeof u=="string")Cc(o,u)&&(d=d.concat(o.g.get(ln(o,u))));else for(o=Array.from(o.g.values()),u=0;u<o.length;u++)d=d.concat(o[u]);return d}r.set=function(o,u){return Fe(this),this.i=null,o=ln(this,o),Cc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},r.get=function(o,u){return o?(o=Dc(this,o),o.length>0?String(o[0]):u):u};function xc(o,u,d){Pc(o,u),d.length>0&&(o.i=null,o.g.set(ln(o,u),b(d)),o.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(let m=0;m<u.length;m++){var d=u[m];const v=nr(d);d=Dc(this,d);for(let S=0;S<d.length;S++){let x=v;d[S]!==""&&(x+="="+nr(d[S])),o.push(x)}}return this.i=o.join("&")};function Nc(o){const u=new cr;return u.i=o.i,o.g&&(u.g=new Map(o.g),u.h=o.h),u}function ln(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function Qf(o,u){u&&!o.j&&(Fe(o),o.i=null,o.g.forEach(function(d,m){const v=m.toLowerCase();m!=v&&(Pc(this,m),xc(this,v,d))},o)),o.j=u}function Wf(o,u){const d=new er;if(a.Image){const m=new Image;m.onload=f(ce,d,"TestLoadImage: loaded",!0,u,m),m.onerror=f(ce,d,"TestLoadImage: error",!1,u,m),m.onabort=f(ce,d,"TestLoadImage: abort",!1,u,m),m.ontimeout=f(ce,d,"TestLoadImage: timeout",!1,u,m),a.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else u(!1)}function Jf(o,u){const d=new er,m=new AbortController,v=setTimeout(()=>{m.abort(),ce(d,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:m.signal}).then(S=>{clearTimeout(v),S.ok?ce(d,"TestPingServer: ok",!0,u):ce(d,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(v),ce(d,"TestPingServer: error",!1,u)})}function ce(o,u,d,m,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),m(d)}catch{}}function Yf(){this.g=new Nf}function eo(o){this.i=o.Sb||null,this.h=o.ab||!1}g(eo,uc),eo.prototype.g=function(){return new ms(this.i,this.h)};function ms(o,u){wt.call(this),this.H=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}g(ms,wt),r=ms.prototype,r.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=u,this.readyState=1,lr(this)},r.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const u={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(u.body=o),(this.H||a).fetch(new Request(this.D,u)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,ur(this)),this.readyState=0},r.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,lr(this)),this.g&&(this.readyState=3,lr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;kc(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function kc(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}r.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.B.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?ur(this):lr(this),this.readyState==3&&kc(this)}},r.Oa=function(o){this.g&&(this.response=this.responseText=o,ur(this))},r.Na=function(o){this.g&&(this.response=o,ur(this))},r.ga=function(){this.g&&ur(this)};function ur(o){o.readyState=4,o.l=null,o.j=null,o.B=null,lr(o)}r.setRequestHeader=function(o,u){this.A.append(o,u)},r.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var d=u.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=u.next();return o.join(`\r
`)};function lr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(ms.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Mc(o){let u="";return as(o,function(d,m){u+=m,u+=":",u+=d,u+=`\r
`}),u}function no(o,u,d){t:{for(m in d){var m=!1;break t}m=!0}m||(d=Mc(d),typeof o=="string"?d!=null&&nr(d):it(o,u,d))}function ct(o){wt.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}g(ct,wt);var Xf=/^https?$/i,Zf=["POST","PUT"];r=ct.prototype,r.Fa=function(o){this.H=o},r.ea=function(o,u,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():pc.g(),this.g.onreadystatechange=I(h(this.Ca,this));try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(S){Oc(this,S);return}if(o=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var v in m)d.set(v,m[v]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const S of m.keys())d.set(S,m.get(S));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(S=>S.toLowerCase()=="content-type"),v=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(Zf,u,void 0)>=0)||m||v||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,x]of d)this.g.setRequestHeader(S,x);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(S){Oc(this,S)}};function Oc(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.o=5,Fc(o),gs(o)}function Fc(o){o.A||(o.A=!0,Rt(o,"complete"),Rt(o,"error"))}r.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,Rt(this,"complete"),Rt(this,"abort"),gs(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),gs(this,!0)),ct.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?Lc(this):this.Xa())},r.Xa=function(){Lc(this)};function Lc(o){if(o.h&&typeof i<"u"){if(o.v&&ue(o)==4)setTimeout(o.Ca.bind(o),0);else if(Rt(o,"readystatechange"),ue(o)==4){o.h=!1;try{const S=o.ca();t:switch(S){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break t;default:u=!1}var d;if(!(d=u)){var m;if(m=S===0){let x=String(o.D).match(Sc)[1]||null;!x&&a.self&&a.self.location&&(x=a.self.location.protocol.slice(0,-1)),m=!Xf.test(x?x.toLowerCase():"")}d=m}if(d)Rt(o,"complete"),Rt(o,"success");else{o.o=6;try{var v=ue(o)>2?o.g.statusText:""}catch{v=""}o.l=v+" ["+o.ca()+"]",Fc(o)}}finally{gs(o)}}}}function gs(o,u){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const d=o.g;o.g=null,u||Rt(o,"ready");try{d.onreadystatechange=null}catch{}}}r.isActive=function(){return!!this.g};function ue(o){return o.g?o.g.readyState:0}r.ca=function(){try{return ue(this)>2?this.g.status:-1}catch{return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.La=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),xf(u)}};function Bc(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function tm(o){const u={};o=(o.g&&ue(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(_(o[m]))continue;var d=Lf(o[m]);const v=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const S=u[v]||[];u[v]=S,S.push(d)}Rf(u,function(m){return m.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function hr(o,u,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||u}function Uc(o){this.za=0,this.i=[],this.j=new er,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=hr("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=hr("baseRetryDelayMs",5e3,o),this.Za=hr("retryDelaySeedMs",1e4,o),this.Ta=hr("forwardChannelMaxRetries",2,o),this.va=hr("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new wc(o&&o.concurrentRequestLimit),this.Ba=new Yf,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=Uc.prototype,r.ka=8,r.I=1,r.connect=function(o,u,d,m){St(0),this.W=o,this.H=u||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.J=Wc(this,null,this.W),_s(this)};function ro(o){if(qc(o),o.I==3){var u=o.V++,d=$t(o.J);if(it(d,"SID",o.M),it(d,"RID",u),it(d,"TYPE","terminate"),dr(o,d),u=new oe(o,o.j,u),u.M=2,u.A=fs($t(d)),d=!1,a.navigator&&a.navigator.sendBeacon)try{d=a.navigator.sendBeacon(u.A.toString(),"")}catch{}!d&&a.Image&&(new Image().src=u.A,d=!0),d||(u.g=Jc(u.j,null),u.g.ea(u.A)),u.F=Date.now(),ds(u)}Qc(o)}function ps(o){o.g&&(io(o),o.g.cancel(),o.g=null)}function qc(o){ps(o),o.v&&(a.clearTimeout(o.v),o.v=null),ys(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function _s(o){if(!Ac(o.h)&&!o.m){o.m=!0;var u=o.Ea;W||p(),J||(W(),J=!0),E.add(u,o),o.D=0}}function em(o,u){return vc(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=u.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=tr(h(o.Ea,o,u),Hc(o,o.D)),o.D++,!0)}r.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const v=new oe(this,this.j,o);let S=this.o;if(this.U&&(S?(S=Za(S),ec(S,this.U)):S=this.U),this.u!==null||this.R||(v.J=S,S=null),this.S)t:{for(var u=0,d=0;d<this.i.length;d++){e:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break e}m=void 0}if(m===void 0)break;if(u+=m,u>4096){u=d;break t}if(u===4096||d===this.i.length-1){u=d+1;break t}}u=1e3}else u=1e3;u=$c(this,v,u),d=$t(this.J),it(d,"RID",o),it(d,"CVER",22),this.G&&it(d,"X-HTTP-Session-Id",this.G),dr(this,d),S&&(this.R?u="headers="+nr(Mc(S))+"&"+u:this.u&&no(d,this.u,S)),Zi(this.h,v),this.Ra&&it(d,"TYPE","init"),this.S?(it(d,"$req",u),it(d,"SID","null"),v.U=!0,Wi(v,d,null)):Wi(v,d,u),this.I=2}}else this.I==3&&(o?jc(this,o):this.i.length==0||Ac(this.h)||jc(this))};function jc(o,u){var d;u?d=u.l:d=o.V++;const m=$t(o.J);it(m,"SID",o.M),it(m,"RID",d),it(m,"AID",o.K),dr(o,m),o.u&&o.o&&no(m,o.u,o.o),d=new oe(o,o.j,d,o.D+1),o.u===null&&(d.J=o.o),u&&(o.i=u.G.concat(o.i)),u=$c(o,d,1e3),d.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),Zi(o.h,d),Wi(d,m,u)}function dr(o,u){o.H&&as(o.H,function(d,m){it(u,m,d)}),o.l&&as({},function(d,m){it(u,m,d)})}function $c(o,u,d){d=Math.min(o.i.length,d);const m=o.l?h(o.l.Ka,o.l,o):null;t:{var v=o.i;let $=-1;for(;;){const gt=["count="+d];$==-1?d>0?($=v[0].g,gt.push("ofs="+$)):$=0:gt.push("ofs="+$);let nt=!0;for(let _t=0;_t<d;_t++){var S=v[_t].g;const zt=v[_t].map;if(S-=$,S<0)$=Math.max(0,v[_t].g-100),nt=!1;else try{S="req"+S+"_"||"";try{var x=zt instanceof Map?zt:Object.entries(zt);for(const[Be,le]of x){let he=le;c(le)&&(he=zi(le)),gt.push(S+Be+"="+encodeURIComponent(he))}}catch(Be){throw gt.push(S+"type="+encodeURIComponent("_badmap")),Be}}catch{m&&m(zt)}}if(nt){x=gt.join("&");break t}}x=void 0}return o=o.i.splice(0,d),u.G=o,x}function zc(o){if(!o.g&&!o.v){o.Y=1;var u=o.Da;W||p(),J||(W(),J=!0),E.add(u,o),o.A=0}}function so(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=tr(h(o.Da,o),Hc(o,o.A)),o.A++,!0)}r.Da=function(){if(this.v=null,Kc(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=tr(h(this.Wa,this),o)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,St(10),ps(this),Kc(this))};function io(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function Kc(o){o.g=new oe(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var u=$t(o.na);it(u,"RID","rpc"),it(u,"SID",o.M),it(u,"AID",o.K),it(u,"CI",o.F?"0":"1"),!o.F&&o.ia&&it(u,"TO",o.ia),it(u,"TYPE","xmlhttp"),dr(o,u),o.u&&o.o&&no(u,o.u,o.o),o.O&&(o.g.H=o.O);var d=o.g;o=o.ba,d.M=1,d.A=fs($t(u)),d.u=null,d.R=!0,Ic(d,o)}r.Va=function(){this.C!=null&&(this.C=null,ps(this),so(this),St(19))};function ys(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function Gc(o,u){var d=null;if(o.g==u){ys(o),io(o),o.g=null;var m=2}else if(Xi(o.h,u))d=u.G,bc(o.h,u),m=1;else return;if(o.I!=0){if(u.o)if(m==1){d=u.u?u.u.length:0,u=Date.now()-u.F;var v=o.D;m=ls(),Rt(m,new mc(m,d)),_s(o)}else zc(o);else if(v=u.m,v==3||v==0&&u.X>0||!(m==1&&em(o,u)||m==2&&so(o)))switch(d&&d.length>0&&(u=o.h,u.i=u.i.concat(d)),v){case 1:Le(o,5);break;case 4:Le(o,10);break;case 3:Le(o,6);break;default:Le(o,2)}}}function Hc(o,u){let d=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(d*=2),d*u}function Le(o,u){if(o.j.info("Error code "+u),u==2){var d=h(o.bb,o),m=o.Ua;const v=!m;m=new ae(m||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||sr(m,"https"),fs(m),v?Wf(m.toString(),d):Jf(m.toString(),d)}else St(2);o.I=0,o.l&&o.l.pa(u),Qc(o),qc(o)}r.bb=function(o){o?(this.j.info("Successfully pinged google.com"),St(2)):(this.j.info("Failed to ping google.com"),St(1))};function Qc(o){if(o.I=0,o.ja=[],o.l){const u=Rc(o.h);(u.length!=0||o.i.length!=0)&&(P(o.ja,u),P(o.ja,o.i),o.h.i.length=0,b(o.i),o.i.length=0),o.l.oa()}}function Wc(o,u,d){var m=d instanceof ae?$t(d):new ae(d);if(m.g!="")u&&(m.g=u+"."+m.g),ir(m,m.u);else{var v=a.location;m=v.protocol,u=u?u+"."+v.hostname:v.hostname,v=+v.port;const S=new ae(null);m&&sr(S,m),u&&(S.g=u),v&&ir(S,v),d&&(S.h=d),m=S}return d=o.G,u=o.wa,d&&u&&it(m,d,u),it(m,"VER",o.ka),dr(o,m),m}function Jc(o,u,d){if(u&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Aa&&!o.ma?new ct(new eo({ab:d})):new ct(o.ma),u.Fa(o.L),u}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Yc(){}r=Yc.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function Is(){}Is.prototype.g=function(o,u){return new Nt(o,u)};function Nt(o,u){wt.call(this),this.g=new Uc(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.sa&&(o?o["X-WebChannel-Client-Profile"]=u.sa:o={"X-WebChannel-Client-Profile":u.sa}),this.g.U=o,(o=u&&u.Qb)&&!_(o)&&(this.g.u=o),this.A=u&&u.supportsCrossDomainXhr||!1,this.v=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!_(u)&&(this.g.G=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new hn(this)}g(Nt,wt),Nt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Nt.prototype.close=function(){ro(this.g)},Nt.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.v&&(d={},d.__data__=zi(o),o=d);u.i.push(new qf(u.Ya++,o)),u.I==3&&_s(u)},Nt.prototype.N=function(){this.g.l=null,delete this.j,ro(this.g),delete this.g,Nt.Z.N.call(this)};function Xc(o){Ki.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){t:{for(const d in u){o=d;break t}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}g(Xc,Ki);function Zc(){Gi.call(this),this.status=1}g(Zc,Gi);function hn(o){this.g=o}g(hn,Yc),hn.prototype.ra=function(){Rt(this.g,"a")},hn.prototype.qa=function(o){Rt(this.g,new Xc(o))},hn.prototype.pa=function(o){Rt(this.g,new Zc)},hn.prototype.oa=function(){Rt(this.g,"b")},Is.prototype.createWebChannel=Is.prototype.g,Nt.prototype.send=Nt.prototype.o,Nt.prototype.open=Nt.prototype.m,Nt.prototype.close=Nt.prototype.close,sh=function(){return new Is},rh=function(){return ls()},nh=Me,So={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},hs.NO_ERROR=0,hs.TIMEOUT=8,hs.HTTP_ERROR=6,Vs=hs,gc.COMPLETE="complete",eh=gc,lc.EventType=Xn,Xn.OPEN="a",Xn.CLOSE="b",Xn.ERROR="c",Xn.MESSAGE="d",wt.prototype.listen=wt.prototype.J,Ar=lc,ct.prototype.listenOnce=ct.prototype.K,ct.prototype.getLastError=ct.prototype.Ha,ct.prototype.getLastErrorCode=ct.prototype.ya,ct.prototype.getStatus=ct.prototype.ca,ct.prototype.getResponseJson=ct.prototype.La,ct.prototype.getResponseText=ct.prototype.la,ct.prototype.send=ct.prototype.ea,ct.prototype.setWithCredentials=ct.prototype.Fa,th=ct}).apply(typeof Ts<"u"?Ts:typeof self<"u"?self:typeof window<"u"?window:{});/**
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
 */class It{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}It.UNAUTHENTICATED=new It(null),It.GOOGLE_CREDENTIALS=new It("google-credentials-uid"),It.FIRST_PARTY=new It("first-party-uid"),It.MOCK_USER=new It("mock-user");/**
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
 */let Kn="12.11.0";function Fg(r){Kn=r}/**
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
 */const Ze=new Gl("@firebase/firestore");function yn(){return Ze.logLevel}function C(r,...t){if(Ze.logLevel<=Q.DEBUG){const e=t.map(ea);Ze.debug(`Firestore (${Kn}): ${r}`,...e)}}function lt(r,...t){if(Ze.logLevel<=Q.ERROR){const e=t.map(ea);Ze.error(`Firestore (${Kn}): ${r}`,...e)}}function Ae(r,...t){if(Ze.logLevel<=Q.WARN){const e=t.map(ea);Ze.warn(`Firestore (${Kn}): ${r}`,...e)}}function ea(r){if(typeof r=="string")return r;try{return function(e){return JSON.stringify(e)}(r)}catch{return r}}/**
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
 */function O(r,t,e){let n="Unexpected state";typeof t=="string"?n=t:e=t,ih(r,n,e)}function ih(r,t,e){let n=`FIRESTORE (${Kn}) INTERNAL ASSERTION FAILED: ${t} (ID: ${r.toString(16)})`;if(e!==void 0)try{n+=" CONTEXT: "+JSON.stringify(e)}catch{n+=" CONTEXT: "+e}throw lt(n),new Error(n)}function L(r,t,e,n){let s="Unexpected state";typeof e=="string"?s=e:n=e,r||ih(t,s,n)}function F(r,t){return r}/**
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
 */const V={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends zn{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Ut{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
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
 */class oh{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Lg{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(It.UNAUTHENTICATED))}shutdown(){}}class Bg{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class Ug{constructor(t){this.t=t,this.currentUser=It.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){L(this.o===void 0,42304);let n=this.i;const s=l=>this.i!==n?(n=this.i,e(l)):Promise.resolve();let i=new Ut;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ut,t.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const l=i;t.enqueueRetryable(async()=>{await l.promise,await s(this.currentUser)})},c=l=>{C("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(C("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ut)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(n=>this.i!==t?(C("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(L(typeof n.accessToken=="string",31837,{l:n}),new oh(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return L(t===null||typeof t=="string",2055,{h:t}),new It(t)}}class qg{constructor(t,e,n){this.P=t,this.T=e,this.I=n,this.type="FirstParty",this.user=It.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const t=this.A();return t&&this.R.set("Authorization",t),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class jg{constructor(t,e,n){this.P=t,this.T=e,this.I=n}getToken(){return Promise.resolve(new qg(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(It.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class hu{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class $g{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,wg(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){L(this.o===void 0,3512);const n=i=>{i.error!=null&&C("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,C("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable(()=>n(i))};const s=i=>{C("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):C("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new hu(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(L(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new hu(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function zg(r){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(r);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let n=0;n<r;n++)e[n]=Math.floor(256*Math.random());return e}/**
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
 */class na{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=zg(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<e&&(n+=t.charAt(s[i]%62))}return n}}function U(r,t){return r<t?-1:r>t?1:0}function Vo(r,t){const e=Math.min(r.length,t.length);for(let n=0;n<e;n++){const s=r.charAt(n),i=t.charAt(n);if(s!==i)return ho(s)===ho(i)?U(s,i):ho(s)?1:-1}return U(r.length,t.length)}const Kg=55296,Gg=57343;function ho(r){const t=r.charCodeAt(0);return t>=Kg&&t<=Gg}function Rn(r,t,e){return r.length===t.length&&r.every((n,s)=>e(n,t[s]))}function ah(r){return r+"\0"}/**
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
 */const du="__name__";class Ht{constructor(t,e,n){e===void 0?e=0:e>t.length&&O(637,{offset:e,range:t.length}),n===void 0?n=t.length-e:n>t.length-e&&O(1746,{length:n,range:t.length-e}),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return Ht.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Ht?t.forEach(n=>{e.push(n)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const i=Ht.compareSegments(t.get(s),e.get(s));if(i!==0)return i}return U(t.length,e.length)}static compareSegments(t,e){const n=Ht.isNumericId(t),s=Ht.isNumericId(e);return n&&!s?-1:!n&&s?1:n&&s?Ht.extractNumericId(t).compare(Ht.extractNumericId(e)):Vo(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Ee.fromString(t.substring(4,t.length-2))}}class Y extends Ht{construct(t,e,n){return new Y(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new D(V.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter(s=>s.length>0))}return new Y(e)}static emptyPath(){return new Y([])}}const Hg=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class at extends Ht{construct(t,e,n){return new at(t,e,n)}static isValidIdentifier(t){return Hg.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),at.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===du}static keyField(){return new at([du])}static fromServerFormat(t){const e=[];let n="",s=0;const i=()=>{if(n.length===0)throw new D(V.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let a=!1;for(;s<t.length;){const c=t[s];if(c==="\\"){if(s+1===t.length)throw new D(V.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const l=t[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new D(V.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=l,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(n+=c,s++):(i(),s++)}if(i(),a)throw new D(V.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new at(e)}static emptyPath(){return new at([])}}/**
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
 */class k{constructor(t){this.path=t}static fromPath(t){return new k(Y.fromString(t))}static fromName(t){return new k(Y.fromString(t).popFirst(5))}static empty(){return new k(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Y.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return Y.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new k(new Y(t.slice()))}}/**
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
 */function ch(r,t,e){if(!e)throw new D(V.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${t}.`)}function Qg(r,t,e,n){if(t===!0&&n===!0)throw new D(V.INVALID_ARGUMENT,`${r} and ${e} cannot be used together.`)}function fu(r){if(!k.isDocumentKey(r))throw new D(V.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function mu(r){if(k.isDocumentKey(r))throw new D(V.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function uh(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function di(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const t=function(n){return n.constructor?n.constructor.name:null}(r);return t?`a custom ${t} object`:"an object"}}return typeof r=="function"?"a function":O(12329,{type:typeof r})}function jt(r,t){if("_delegate"in r&&(r=r._delegate),!(r instanceof t)){if(t.name===r.constructor.name)throw new D(V.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=di(r);throw new D(V.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return r}function Wg(r,t){if(t<=0)throw new D(V.INVALID_ARGUMENT,`Function ${r}() requires a positive number, but it was: ${t}.`)}/**
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
 */function ft(r,t){const e={typeString:r};return t&&(e.value=t),e}function Xr(r,t){if(!uh(r))throw new D(V.INVALID_ARGUMENT,"JSON must be an object");let e;for(const n in t)if(t[n]){const s=t[n].typeString,i="value"in t[n]?{value:t[n].value}:void 0;if(!(n in r)){e=`JSON missing required field: '${n}'`;break}const a=r[n];if(s&&typeof a!==s){e=`JSON field '${n}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){e=`Expected '${n}' field to equal '${i.value}'`;break}}if(e)throw new D(V.INVALID_ARGUMENT,e);return!0}/**
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
 */const gu=-62135596800,pu=1e6;class Z{static now(){return Z.fromMillis(Date.now())}static fromDate(t){return Z.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*pu);return new Z(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new D(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new D(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<gu)throw new D(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new D(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/pu}_compareTo(t){return this.seconds===t.seconds?U(this.nanoseconds,t.nanoseconds):U(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Z._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(Xr(t,Z._jsonSchema))return new Z(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-gu;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Z._jsonSchemaVersion="firestore/timestamp/1.0",Z._jsonSchema={type:ft("string",Z._jsonSchemaVersion),seconds:ft("number"),nanoseconds:ft("number")};/**
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
 */class B{static fromTimestamp(t){return new B(t)}static min(){return new B(new Z(0,0))}static max(){return new B(new Z(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Sn=-1;class Ks{constructor(t,e,n,s){this.indexId=t,this.collectionGroup=e,this.fields=n,this.indexState=s}}function Po(r){return r.fields.find(t=>t.kind===2)}function je(r){return r.fields.filter(t=>t.kind!==2)}Ks.UNKNOWN_ID=-1;class Ps{constructor(t,e){this.fieldPath=t,this.kind=e}}class Ur{constructor(t,e){this.sequenceNumber=t,this.offset=e}static empty(){return new Ur(0,Ft.min())}}function lh(r,t){const e=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=B.fromTimestamp(n===1e9?new Z(e+1,0):new Z(e,n));return new Ft(s,k.empty(),t)}function hh(r){return new Ft(r.readTime,r.key,Sn)}class Ft{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new Ft(B.min(),k.empty(),Sn)}static max(){return new Ft(B.max(),k.empty(),Sn)}}function ra(r,t){let e=r.readTime.compareTo(t.readTime);return e!==0?e:(e=k.comparator(r.documentKey,t.documentKey),e!==0?e:U(r.largestBatchId,t.largestBatchId))}/**
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
 */const dh="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class fh{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
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
 */async function Ve(r){if(r.code!==V.FAILED_PRECONDITION||r.message!==dh)throw r;C("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class A{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&O(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new A((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(e,i).next(n,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof A?e:A.resolve(e)}catch(e){return A.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):A.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):A.reject(e)}static resolve(t){return new A((e,n)=>{e(t)})}static reject(t){return new A((e,n)=>{n(t)})}static waitFor(t){return new A((e,n)=>{let s=0,i=0,a=!1;t.forEach(c=>{++s,c.next(()=>{++i,a&&i===s&&e()},l=>n(l))}),a=!0,i===s&&e()})}static or(t){let e=A.resolve(!1);for(const n of t)e=e.next(s=>s?A.resolve(s):n());return e}static forEach(t,e){const n=[];return t.forEach((s,i)=>{n.push(e.call(this,s,i))}),this.waitFor(n)}static mapArray(t,e){return new A((n,s)=>{const i=t.length,a=new Array(i);let c=0;for(let l=0;l<i;l++){const h=l;e(t[h]).next(f=>{a[h]=f,++c,c===i&&n(a)},f=>s(f))}})}static doWhile(t,e){return new A((n,s)=>{const i=()=>{t()===!0?e().next(()=>{i()},s):n()};i()})}}/**
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
 */const kt="SimpleDb";class fi{static open(t,e,n,s){try{return new fi(e,t.transaction(s,n))}catch(i){throw new Vr(e,i)}}constructor(t,e){this.action=t,this.transaction=e,this.aborted=!1,this.S=new Ut,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{e.error?this.S.reject(new Vr(t,e.error)):this.S.resolve()},this.transaction.onerror=n=>{const s=sa(n.target.error);this.S.reject(new Vr(t,s))}}get D(){return this.S.promise}abort(t){t&&this.S.reject(t),this.aborted||(C(kt,"Aborting transaction:",t?t.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const t=this.transaction;this.aborted||typeof t.commit!="function"||t.commit()}store(t){const e=this.transaction.objectStore(t);return new Yg(e)}}class Te{static delete(t){return C(kt,"Removing database:",t),ze(Ll().indexedDB.deleteDatabase(t)).toPromise()}static v(){if(!$l())return!1;if(Te.F())return!0;const t=js(),e=Te.M(t),n=0<e&&e<10,s=mh(t),i=0<s&&s<4.5;return!(t.indexOf("MSIE ")>0||t.indexOf("Trident/")>0||t.indexOf("Edge/")>0||n||i)}static F(){var t;return typeof process<"u"&&((t=process.__PRIVATE_env)==null?void 0:t.__PRIVATE_USE_MOCK_PERSISTENCE)==="YES"}static O(t,e){return t.store(e)}static M(t){const e=t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=e?e[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(t,e,n){this.name=t,this.version=e,this.N=n,this.B=null,Te.M(js())===12.2&&lt("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(t){return this.db||(C(kt,"Opening database:",this.name),this.db=await new Promise((e,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const a=i.target.result;e(a)},s.onblocked=()=>{n(new Vr(t,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const a=i.target.error;a.name==="VersionError"?n(new D(V.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):a.name==="InvalidStateError"?n(new D(V.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+a)):n(new Vr(t,a))},s.onupgradeneeded=i=>{C(kt,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const a=i.target.result;this.N.k(a,s.transaction,i.oldVersion,this.version).next(()=>{C(kt,"Database upgrade to version "+this.version+" complete")})}})),this.q&&(this.db.onversionchange=e=>this.q(e)),this.db}K(t){this.q=t,this.db&&(this.db.onversionchange=e=>t(e))}async runTransaction(t,e,n,s){const i=e==="readonly";let a=0;for(;;){++a;try{this.db=await this.L(t);const c=fi.open(this.db,t,i?"readonly":"readwrite",n),l=s(c).next(h=>(c.C(),h)).catch(h=>(c.abort(h),A.reject(h))).toPromise();return l.catch(()=>{}),await c.D,l}catch(c){const l=c,h=l.name!=="FirebaseError"&&a<3;if(C(kt,"Transaction failed with error:",l.message,"Retrying:",h),this.close(),!h)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function mh(r){const t=r.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}class Jg{constructor(t){this.U=t,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(t){this.U=t}done(){this.$=!0}j(t){this.W=t}delete(){return ze(this.U.delete())}}class Vr extends D{constructor(t,e){super(V.UNAVAILABLE,`IndexedDB transaction '${t}' failed: ${e}`),this.name="IndexedDbTransactionError"}}function Pe(r){return r.name==="IndexedDbTransactionError"}class Yg{constructor(t){this.store=t}put(t,e){let n;return e!==void 0?(C(kt,"PUT",this.store.name,t,e),n=this.store.put(e,t)):(C(kt,"PUT",this.store.name,"<auto-key>",t),n=this.store.put(t)),ze(n)}add(t){return C(kt,"ADD",this.store.name,t,t),ze(this.store.add(t))}get(t){return ze(this.store.get(t)).next(e=>(e===void 0&&(e=null),C(kt,"GET",this.store.name,t,e),e))}delete(t){return C(kt,"DELETE",this.store.name,t),ze(this.store.delete(t))}count(){return C(kt,"COUNT",this.store.name),ze(this.store.count())}J(t,e){const n=this.options(t,e),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new A((a,c)=>{i.onerror=l=>{c(l.target.error)},i.onsuccess=l=>{a(l.target.result)}})}{const i=this.cursor(n),a=[];return this.H(i,(c,l)=>{a.push(l)}).next(()=>a)}}Z(t,e){const n=this.store.getAll(t,e===null?void 0:e);return new A((s,i)=>{n.onerror=a=>{i(a.target.error)},n.onsuccess=a=>{s(a.target.result)}})}X(t,e){C(kt,"DELETE ALL",this.store.name);const n=this.options(t,e);n.Y=!1;const s=this.cursor(n);return this.H(s,(i,a,c)=>c.delete())}ee(t,e){let n;e?n=t:(n={},e=t);const s=this.cursor(n);return this.H(s,e)}te(t){const e=this.cursor({});return new A((n,s)=>{e.onerror=i=>{const a=sa(i.target.error);s(a)},e.onsuccess=i=>{const a=i.target.result;a?t(a.primaryKey,a.value).next(c=>{c?a.continue():n()}):n()}})}H(t,e){const n=[];return new A((s,i)=>{t.onerror=a=>{i(a.target.error)},t.onsuccess=a=>{const c=a.target.result;if(!c)return void s();const l=new Jg(c),h=e(c.primaryKey,c.value,l);if(h instanceof A){const f=h.catch(g=>(l.done(),A.reject(g)));n.push(f)}l.isDone?s():l.G===null?c.continue():c.continue(l.G)}}).next(()=>A.waitFor(n))}options(t,e){let n;return t!==void 0&&(typeof t=="string"?n=t:e=t),{index:n,range:e}}cursor(t){let e="next";if(t.reverse&&(e="prev"),t.index){const n=this.store.index(t.index);return t.Y?n.openKeyCursor(t.range,e):n.openCursor(t.range,e)}return this.store.openCursor(t.range,e)}}function ze(r){return new A((t,e)=>{r.onsuccess=n=>{const s=n.target.result;t(s)},r.onerror=n=>{const s=sa(n.target.error);e(s)}})}let _u=!1;function sa(r){const t=Te.M(js());if(t>=12.2&&t<13){const e="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(e)>=0){const n=new D("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return _u||(_u=!0,setTimeout(()=>{throw n},0)),n}}return r}const Pr="IndexBackfiller";class Xg{constructor(t,e){this.asyncQueue=t,this.ne=e,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(t){C(Pr,`Scheduled in ${t}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",t,async()=>{this.task=null;try{const e=await this.ne.ie();C(Pr,`Documents written: ${e}`)}catch(e){Pe(e)?C(Pr,"Ignoring IndexedDB error during index backfill: ",e):await Ve(e)}await this.re(6e4)})}}class Zg{constructor(t,e){this.localStore=t,this.persistence=e}async ie(t=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",e=>this.se(e,t))}se(t,e){const n=new Set;let s=e,i=!0;return A.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(t).next(a=>{if(a!==null&&!n.has(a))return C(Pr,`Processing collection: ${a}`),this.oe(t,a,s).next(c=>{s-=c,n.add(a)});i=!1})).next(()=>e-s)}oe(t,e,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(t,e).next(s=>this.localStore.localDocuments.getNextDocuments(t,e,s,n).next(i=>{const a=i.changes;return this.localStore.indexManager.updateIndexEntries(t,a).next(()=>this._e(s,i)).next(c=>(C(Pr,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(t,e,c))).next(()=>a.size)}))}_e(t,e){let n=t;return e.changes.forEach((s,i)=>{const a=hh(i);ra(a,n)>0&&(n=a)}),new Ft(n.readTime,n.documentKey,Math.max(e.batchId,t.largestBatchId))}}/**
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
 */class Dt{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>e.writeSequenceNumber(n))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}Dt.ce=-1;/**
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
 */const We=-1;function mi(r){return r==null}function qr(r){return r===0&&1/r==-1/0}function gh(r){return typeof r=="number"&&Number.isInteger(r)&&!qr(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
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
 */const Gs="";function bt(r){let t="";for(let e=0;e<r.length;e++)t.length>0&&(t=yu(t)),t=tp(r.get(e),t);return yu(t)}function tp(r,t){let e=t;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":e+="";break;case Gs:e+="";break;default:e+=i}}return e}function yu(r){return r+Gs+""}function Wt(r){const t=r.length;if(L(t>=2,64408,{path:r}),t===2)return L(r.charAt(0)===Gs&&r.charAt(1)==="",56145,{path:r}),Y.emptyPath();const e=t-2,n=[];let s="";for(let i=0;i<t;){const a=r.indexOf(Gs,i);switch((a<0||a>e)&&O(50515,{path:r}),r.charAt(a+1)){case"":const c=r.substring(i,a);let l;s.length===0?l=c:(s+=c,l=s,s=""),n.push(l);break;case"":s+=r.substring(i,a),s+="\0";break;case"":s+=r.substring(i,a+1);break;default:O(61167,{path:r})}i=a+2}return new Y(n)}/**
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
 */const $e="remoteDocuments",Zr="owner",dn="owner",jr="mutationQueues",ep="userId",Bt="mutations",Iu="batchId",Qe="userMutationsIndex",Eu=["userId","batchId"];/**
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
 */function Cs(r,t){return[r,bt(t)]}function ph(r,t,e){return[r,bt(t),e]}const np={},Vn="documentMutations",Hs="remoteDocumentsV14",rp=["prefixPath","collectionGroup","readTime","documentId"],Ds="documentKeyIndex",sp=["prefixPath","collectionGroup","documentId"],_h="collectionGroupIndex",ip=["collectionGroup","readTime","prefixPath","documentId"],$r="remoteDocumentGlobal",Co="remoteDocumentGlobalKey",Pn="targets",yh="queryTargetsIndex",op=["canonicalId","targetId"],Cn="targetDocuments",ap=["targetId","path"],ia="documentTargetsIndex",cp=["path","targetId"],Qs="targetGlobalKey",Je="targetGlobal",zr="collectionParents",up=["collectionId","parent"],Dn="clientMetadata",lp="clientId",gi="bundles",hp="bundleId",pi="namedQueries",dp="name",oa="indexConfiguration",fp="indexId",Do="collectionGroupIndex",mp="collectionGroup",Cr="indexState",gp=["indexId","uid"],Ih="sequenceNumberIndex",pp=["uid","sequenceNumber"],Dr="indexEntries",_p=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Eh="documentKeyIndex",yp=["indexId","uid","orderedDocumentKey"],_i="documentOverlays",Ip=["userId","collectionPath","documentId"],xo="collectionPathOverlayIndex",Ep=["userId","collectionPath","largestBatchId"],Th="collectionGroupOverlayIndex",Tp=["userId","collectionGroup","largestBatchId"],aa="globals",wp="name",wh=[jr,Bt,Vn,$e,Pn,Zr,Je,Cn,Dn,$r,zr,gi,pi],Ap=[...wh,_i],Ah=[jr,Bt,Vn,Hs,Pn,Zr,Je,Cn,Dn,$r,zr,gi,pi,_i],vh=Ah,ca=[...vh,oa,Cr,Dr],vp=ca,bh=[...ca,aa],bp=bh;/**
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
 */class No extends fh{constructor(t,e){super(),this.le=t,this.currentSequenceNumber=e}}function pt(r,t){const e=F(r);return Te.O(e.le,t)}/**
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
 */function Tu(r){let t=0;for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t++;return t}function Ce(r,t){for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t(e,r[e])}function Rp(r,t){const e=[];for(const n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.push(t(r[n],n,r));return e}function Rh(r){for(const t in r)if(Object.prototype.hasOwnProperty.call(r,t))return!1;return!0}/**
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
 */class rt{constructor(t,e){this.comparator=t,this.root=e||Et.EMPTY}insert(t,e){return new rt(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Et.BLACK,null,null))}remove(t){return new rt(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Et.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(n===0)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(t,n.key);if(s===0)return e+n.left.size;s<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push(`${e}:${n}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new ws(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new ws(this.root,t,this.comparator,!1)}getReverseIterator(){return new ws(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new ws(this.root,t,this.comparator,!0)}}class ws{constructor(t,e,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?n(t.key,e):1,e&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Et{constructor(t,e,n,s,i){this.key=t,this.value=e,this.color=n??Et.RED,this.left=s??Et.EMPTY,this.right=i??Et.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,s,i){return new Et(t??this.key,e??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let s=this;const i=n(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,e,n),null):i===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Et.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return Et.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Et.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Et.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw O(43730,{key:this.key,value:this.value});if(this.right.isRed())throw O(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw O(27949);return t+(this.isRed()?0:1)}}Et.EMPTY=null,Et.RED=!0,Et.BLACK=!1;Et.EMPTY=new class{constructor(){this.size=0}get key(){throw O(57766)}get value(){throw O(16141)}get color(){throw O(16727)}get left(){throw O(29726)}get right(){throw O(36894)}copy(t,e,n,s,i){return this}insert(t,e,n){return new Et(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class et{constructor(t){this.comparator=t,this.data=new rt(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let n;for(n=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new wu(this.data.getIterator())}getIteratorFrom(t){return new wu(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(n=>{e=e.add(n)}),e}isEqual(t){if(!(t instanceof et)||this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new et(this.comparator);return e.data=t,e}}class wu{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function fn(r){return r.hasNext()?r.getNext():void 0}/**
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
 */class xt{constructor(t){this.fields=t,t.sort(at.comparator)}static empty(){return new xt([])}unionWith(t){let e=new et(at.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new xt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Rn(this.fields,t.fields,(e,n)=>e.isEqual(n))}}/**
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
 */class Sh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class ht{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Sh("Invalid base64 string: "+i):i}}(t);return new ht(e)}static fromUint8Array(t){const e=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(t);return new ht(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return U(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ht.EMPTY_BYTE_STRING=new ht("");const Sp=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ne(r){if(L(!!r,39018),typeof r=="string"){let t=0;const e=Sp.exec(r);if(L(!!e,46558,{timestamp:r}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:ot(r.seconds),nanos:ot(r.nanos)}}function ot(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function re(r){return typeof r=="string"?ht.fromBase64String(r):ht.fromUint8Array(r)}/**
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
 */const Vh="server_timestamp",Ph="__type__",Ch="__previous_value__",Dh="__local_write_time__";function ua(r){var e,n;return((n=(((e=r==null?void 0:r.mapValue)==null?void 0:e.fields)||{})[Ph])==null?void 0:n.stringValue)===Vh}function yi(r){const t=r.mapValue.fields[Ch];return ua(t)?yi(t):t}function Kr(r){const t=ne(r.mapValue.fields[Dh].timestampValue);return new Z(t.seconds,t.nanos)}/**
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
 */class Vp{constructor(t,e,n,s,i,a,c,l,h,f,g){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=h,this.isUsingEmulator=f,this.apiKey=g}}const Ws="(default)";class tn{constructor(t,e){this.projectId=t,this.database=e||Ws}static empty(){return new tn("","")}get isDefaultDatabase(){return this.database===Ws}isEqual(t){return t instanceof tn&&t.projectId===this.projectId&&t.database===this.database}}function Pp(r,t){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new D(V.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new tn(r.options.projectId,t)}/**
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
 */const la="__type__",xh="__max__",_e={mapValue:{fields:{__type__:{stringValue:xh}}}},ha="__vector__",xn="value",xs={nullValue:"NULL_VALUE"};function ve(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?ua(r)?4:Nh(r)?9007199254740991:Ii(r)?10:11:O(28295,{value:r})}function Xt(r,t){if(r===t)return!0;const e=ve(r);if(e!==ve(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===t.booleanValue;case 4:return Kr(r).isEqual(Kr(t));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=ne(s.timestampValue),c=ne(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(r,t);case 5:return r.stringValue===t.stringValue;case 6:return function(s,i){return re(s.bytesValue).isEqual(re(i.bytesValue))}(r,t);case 7:return r.referenceValue===t.referenceValue;case 8:return function(s,i){return ot(s.geoPointValue.latitude)===ot(i.geoPointValue.latitude)&&ot(s.geoPointValue.longitude)===ot(i.geoPointValue.longitude)}(r,t);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return ot(s.integerValue)===ot(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=ot(s.doubleValue),c=ot(i.doubleValue);return a===c?qr(a)===qr(c):isNaN(a)&&isNaN(c)}return!1}(r,t);case 9:return Rn(r.arrayValue.values||[],t.arrayValue.values||[],Xt);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Tu(a)!==Tu(c))return!1;for(const l in a)if(a.hasOwnProperty(l)&&(c[l]===void 0||!Xt(a[l],c[l])))return!1;return!0}(r,t);default:return O(52216,{left:r})}}function Gr(r,t){return(r.values||[]).find(e=>Xt(e,t))!==void 0}function be(r,t){if(r===t)return 0;const e=ve(r),n=ve(t);if(e!==n)return U(e,n);switch(e){case 0:case 9007199254740991:return 0;case 1:return U(r.booleanValue,t.booleanValue);case 2:return function(i,a){const c=ot(i.integerValue||i.doubleValue),l=ot(a.integerValue||a.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(r,t);case 3:return Au(r.timestampValue,t.timestampValue);case 4:return Au(Kr(r),Kr(t));case 5:return Vo(r.stringValue,t.stringValue);case 6:return function(i,a){const c=re(i),l=re(a);return c.compareTo(l)}(r.bytesValue,t.bytesValue);case 7:return function(i,a){const c=i.split("/"),l=a.split("/");for(let h=0;h<c.length&&h<l.length;h++){const f=U(c[h],l[h]);if(f!==0)return f}return U(c.length,l.length)}(r.referenceValue,t.referenceValue);case 8:return function(i,a){const c=U(ot(i.latitude),ot(a.latitude));return c!==0?c:U(ot(i.longitude),ot(a.longitude))}(r.geoPointValue,t.geoPointValue);case 9:return vu(r.arrayValue,t.arrayValue);case 10:return function(i,a){var I,b,P,M;const c=i.fields||{},l=a.fields||{},h=(I=c[xn])==null?void 0:I.arrayValue,f=(b=l[xn])==null?void 0:b.arrayValue,g=U(((P=h==null?void 0:h.values)==null?void 0:P.length)||0,((M=f==null?void 0:f.values)==null?void 0:M.length)||0);return g!==0?g:vu(h,f)}(r.mapValue,t.mapValue);case 11:return function(i,a){if(i===_e.mapValue&&a===_e.mapValue)return 0;if(i===_e.mapValue)return 1;if(a===_e.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),h=a.fields||{},f=Object.keys(h);l.sort(),f.sort();for(let g=0;g<l.length&&g<f.length;++g){const I=Vo(l[g],f[g]);if(I!==0)return I;const b=be(c[l[g]],h[f[g]]);if(b!==0)return b}return U(l.length,f.length)}(r.mapValue,t.mapValue);default:throw O(23264,{he:e})}}function Au(r,t){if(typeof r=="string"&&typeof t=="string"&&r.length===t.length)return U(r,t);const e=ne(r),n=ne(t),s=U(e.seconds,n.seconds);return s!==0?s:U(e.nanos,n.nanos)}function vu(r,t){const e=r.values||[],n=t.values||[];for(let s=0;s<e.length&&s<n.length;++s){const i=be(e[s],n[s]);if(i)return i}return U(e.length,n.length)}function Nn(r){return ko(r)}function ko(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(e){const n=ne(e);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(e){return re(e).toBase64()}(r.bytesValue):"referenceValue"in r?function(e){return k.fromName(e).toString()}(r.referenceValue):"geoPointValue"in r?function(e){return`geo(${e.latitude},${e.longitude})`}(r.geoPointValue):"arrayValue"in r?function(e){let n="[",s=!0;for(const i of e.values||[])s?s=!1:n+=",",n+=ko(i);return n+"]"}(r.arrayValue):"mapValue"in r?function(e){const n=Object.keys(e.fields||{}).sort();let s="{",i=!0;for(const a of n)i?i=!1:s+=",",s+=`${a}:${ko(e.fields[a])}`;return s+"}"}(r.mapValue):O(61005,{value:r})}function Ns(r){switch(ve(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=yi(r);return t?16+Ns(t):16;case 5:return 2*r.stringValue.length;case 6:return re(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((s,i)=>s+Ns(i),0)}(r.arrayValue);case 10:case 11:return function(n){let s=0;return Ce(n.fields,(i,a)=>{s+=i.length+Ns(a)}),s}(r.mapValue);default:throw O(13486,{value:r})}}function Hr(r,t){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${t.path.canonicalString()}`}}function Mo(r){return!!r&&"integerValue"in r}function Qr(r){return!!r&&"arrayValue"in r}function bu(r){return!!r&&"nullValue"in r}function Ru(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function ks(r){return!!r&&"mapValue"in r}function Ii(r){var e,n;return((n=(((e=r==null?void 0:r.mapValue)==null?void 0:e.fields)||{})[la])==null?void 0:n.stringValue)===ha}function xr(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const t={mapValue:{fields:{}}};return Ce(r.mapValue.fields,(e,n)=>t.mapValue.fields[e]=xr(n)),t}if(r.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(r.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=xr(r.arrayValue.values[e]);return t}return{...r}}function Nh(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===xh}const kh={mapValue:{fields:{[la]:{stringValue:ha},[xn]:{arrayValue:{}}}}};function Cp(r){return"nullValue"in r?xs:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?Hr(tn.empty(),k.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?Ii(r)?kh:{mapValue:{}}:O(35942,{value:r})}function Dp(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?Hr(tn.empty(),k.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?kh:"mapValue"in r?Ii(r)?{mapValue:{}}:_e:O(61959,{value:r})}function Su(r,t){const e=be(r.value,t.value);return e!==0?e:r.inclusive&&!t.inclusive?-1:!r.inclusive&&t.inclusive?1:0}function Vu(r,t){const e=be(r.value,t.value);return e!==0?e:r.inclusive&&!t.inclusive?1:!r.inclusive&&t.inclusive?-1:0}/**
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
 */class Tt{constructor(t){this.value=t}static empty(){return new Tt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!ks(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=xr(e)}setAll(t){let e=at.emptyPath(),n={},s=[];t.forEach((a,c)=>{if(!e.isImmediateParentOf(c)){const l=this.getFieldsMap(e);this.applyChanges(l,n,s),n={},s=[],e=c.popLast()}a?n[c.lastSegment()]=xr(a):s.push(c.lastSegment())});const i=this.getFieldsMap(e);this.applyChanges(i,n,s)}delete(t){const e=this.field(t.popLast());ks(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Xt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let s=e.mapValue.fields[t.get(n)];ks(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,n){Ce(e,(s,i)=>t[s]=i);for(const s of n)delete t[s]}clone(){return new Tt(xr(this.value))}}function Mh(r){const t=[];return Ce(r.fields,(e,n)=>{const s=new at([e]);if(ks(n)){const i=Mh(n.mapValue).fields;if(i.length===0)t.push(s);else for(const a of i)t.push(s.child(a))}else t.push(s)}),new xt(t)}/**
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
 */class ut{constructor(t,e,n,s,i,a,c){this.key=t,this.documentType=e,this.version=n,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(t){return new ut(t,0,B.min(),B.min(),B.min(),Tt.empty(),0)}static newFoundDocument(t,e,n,s){return new ut(t,1,e,B.min(),n,s,0)}static newNoDocument(t,e){return new ut(t,2,e,B.min(),B.min(),Tt.empty(),0)}static newUnknownDocument(t,e){return new ut(t,3,e,B.min(),B.min(),Tt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(B.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Tt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Tt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=B.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof ut&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new ut(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class kn{constructor(t,e){this.position=t,this.inclusive=e}}function Pu(r,t,e){let n=0;for(let s=0;s<r.position.length;s++){const i=t[s],a=r.position[s];if(i.field.isKeyField()?n=k.comparator(k.fromName(a.referenceValue),e.key):n=be(a,e.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function Cu(r,t){if(r===null)return t===null;if(t===null||r.inclusive!==t.inclusive||r.position.length!==t.position.length)return!1;for(let e=0;e<r.position.length;e++)if(!Xt(r.position[e],t.position[e]))return!1;return!0}/**
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
 */class Wr{constructor(t,e="asc"){this.field=t,this.dir=e}}function xp(r,t){return r.dir===t.dir&&r.field.isEqual(t.field)}/**
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
 */class Oh{}class G extends Oh{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,n):new Np(t,e,n):e==="array-contains"?new Op(t,n):e==="in"?new jh(t,n):e==="not-in"?new Fp(t,n):e==="array-contains-any"?new Lp(t,n):new G(t,e,n)}static createKeyFieldInFilter(t,e,n){return e==="in"?new kp(t,n):new Mp(t,n)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(be(e,this.value)):e!==null&&ve(this.value)===ve(e)&&this.matchesComparison(be(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return O(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class tt extends Oh{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new tt(t,e)}matches(t){return Mn(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Mn(r){return r.op==="and"}function Oo(r){return r.op==="or"}function da(r){return Fh(r)&&Mn(r)}function Fh(r){for(const t of r.filters)if(t instanceof tt)return!1;return!0}function Fo(r){if(r instanceof G)return r.field.canonicalString()+r.op.toString()+Nn(r.value);if(da(r))return r.filters.map(t=>Fo(t)).join(",");{const t=r.filters.map(e=>Fo(e)).join(",");return`${r.op}(${t})`}}function Lh(r,t){return r instanceof G?function(n,s){return s instanceof G&&n.op===s.op&&n.field.isEqual(s.field)&&Xt(n.value,s.value)}(r,t):r instanceof tt?function(n,s){return s instanceof tt&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce((i,a,c)=>i&&Lh(a,s.filters[c]),!0):!1}(r,t):void O(19439)}function Bh(r,t){const e=r.filters.concat(t);return tt.create(e,r.op)}function Uh(r){return r instanceof G?function(e){return`${e.field.canonicalString()} ${e.op} ${Nn(e.value)}`}(r):r instanceof tt?function(e){return e.op.toString()+" {"+e.getFilters().map(Uh).join(" ,")+"}"}(r):"Filter"}class Np extends G{constructor(t,e,n){super(t,e,n),this.key=k.fromName(n.referenceValue)}matches(t){const e=k.comparator(t.key,this.key);return this.matchesComparison(e)}}class kp extends G{constructor(t,e){super(t,"in",e),this.keys=qh("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Mp extends G{constructor(t,e){super(t,"not-in",e),this.keys=qh("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function qh(r,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map(n=>k.fromName(n.referenceValue))}class Op extends G{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Qr(e)&&Gr(e.arrayValue,this.value)}}class jh extends G{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Gr(this.value.arrayValue,e)}}class Fp extends G{constructor(t,e){super(t,"not-in",e)}matches(t){if(Gr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Gr(this.value.arrayValue,e)}}class Lp extends G{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Qr(e)||!e.arrayValue.values)&&e.arrayValue.values.some(n=>Gr(this.value.arrayValue,n))}}/**
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
 */class Bp{constructor(t,e=null,n=[],s=[],i=null,a=null,c=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.Te=null}}function Lo(r,t=null,e=[],n=[],s=null,i=null,a=null){return new Bp(r,t,e,n,s,i,a)}function en(r){const t=F(r);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(n=>Fo(n)).join(","),e+="|ob:",e+=t.orderBy.map(n=>function(i){return i.field.canonicalString()+i.dir}(n)).join(","),mi(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(n=>Nn(n)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(n=>Nn(n)).join(",")),t.Te=e}return t.Te}function ts(r,t){if(r.limit!==t.limit||r.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<r.orderBy.length;e++)if(!xp(r.orderBy[e],t.orderBy[e]))return!1;if(r.filters.length!==t.filters.length)return!1;for(let e=0;e<r.filters.length;e++)if(!Lh(r.filters[e],t.filters[e]))return!1;return r.collectionGroup===t.collectionGroup&&!!r.path.isEqual(t.path)&&!!Cu(r.startAt,t.startAt)&&Cu(r.endAt,t.endAt)}function Js(r){return k.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Ys(r,t){return r.filters.filter(e=>e instanceof G&&e.field.isEqual(t))}function Du(r,t,e){let n=xs,s=!0;for(const i of Ys(r,t)){let a=xs,c=!0;switch(i.op){case"<":case"<=":a=Cp(i.value);break;case"==":case"in":case">=":a=i.value;break;case">":a=i.value,c=!1;break;case"!=":case"not-in":a=xs}Su({value:n,inclusive:s},{value:a,inclusive:c})<0&&(n=a,s=c)}if(e!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(t)){const a=e.position[i];Su({value:n,inclusive:s},{value:a,inclusive:e.inclusive})<0&&(n=a,s=e.inclusive);break}}return{value:n,inclusive:s}}function xu(r,t,e){let n=_e,s=!0;for(const i of Ys(r,t)){let a=_e,c=!0;switch(i.op){case">=":case">":a=Dp(i.value),c=!1;break;case"==":case"in":case"<=":a=i.value;break;case"<":a=i.value,c=!1;break;case"!=":case"not-in":a=_e}Vu({value:n,inclusive:s},{value:a,inclusive:c})>0&&(n=a,s=c)}if(e!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(t)){const a=e.position[i];Vu({value:n,inclusive:s},{value:a,inclusive:e.inclusive})>0&&(n=a,s=e.inclusive);break}}return{value:n,inclusive:s}}/**
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
 */class Gn{constructor(t,e=null,n=[],s=[],i=null,a="F",c=null,l=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=l,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function $h(r,t,e,n,s,i,a,c){return new Gn(r,t,e,n,s,i,a,c)}function Ei(r){return new Gn(r)}function Nu(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function Up(r){return k.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function zh(r){return r.collectionGroup!==null}function Nr(r){const t=F(r);if(t.Ee===null){t.Ee=[];const e=new Set;for(const i of t.explicitOrderBy)t.Ee.push(i),e.add(i.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new et(at.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(t).forEach(i=>{e.has(i.canonicalString())||i.isKeyField()||t.Ee.push(new Wr(i,n))}),e.has(at.keyField().canonicalString())||t.Ee.push(new Wr(at.keyField(),n))}return t.Ee}function Ot(r){const t=F(r);return t.Ie||(t.Ie=Kh(t,Nr(r))),t.Ie}function qp(r){const t=F(r);return t.Re||(t.Re=Kh(t,r.explicitOrderBy)),t.Re}function Kh(r,t){if(r.limitType==="F")return Lo(r.path,r.collectionGroup,t,r.filters,r.limit,r.startAt,r.endAt);{t=t.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Wr(s.field,i)});const e=r.endAt?new kn(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new kn(r.startAt.position,r.startAt.inclusive):null;return Lo(r.path,r.collectionGroup,t,r.filters,r.limit,e,n)}}function Bo(r,t){const e=r.filters.concat([t]);return new Gn(r.path,r.collectionGroup,r.explicitOrderBy.slice(),e,r.limit,r.limitType,r.startAt,r.endAt)}function jp(r,t){const e=r.explicitOrderBy.concat([t]);return new Gn(r.path,r.collectionGroup,e,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}function Xs(r,t,e){return new Gn(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),t,e,r.startAt,r.endAt)}function Ti(r,t){return ts(Ot(r),Ot(t))&&r.limitType===t.limitType}function Gh(r){return`${en(Ot(r))}|lt:${r.limitType}`}function In(r){return`Query(target=${function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map(s=>Uh(s)).join(", ")}]`),mi(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>Nn(s)).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>Nn(s)).join(",")),`Target(${n})`}(Ot(r))}; limitType=${r.limitType})`}function es(r,t){return t.isFoundDocument()&&function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):k.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)}(r,t)&&function(n,s){for(const i of Nr(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(r,t)&&function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0}(r,t)&&function(n,s){return!(n.startAt&&!function(a,c,l){const h=Pu(a,c,l);return a.inclusive?h<=0:h<0}(n.startAt,Nr(n),s)||n.endAt&&!function(a,c,l){const h=Pu(a,c,l);return a.inclusive?h>=0:h>0}(n.endAt,Nr(n),s))}(r,t)}function Hh(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Qh(r){return(t,e)=>{let n=!1;for(const s of Nr(r)){const i=$p(s,t,e);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function $p(r,t,e){const n=r.field.isKeyField()?k.comparator(t.key,e.key):function(i,a,c){const l=a.data.field(i),h=c.data.field(i);return l!==null&&h!==null?be(l,h):O(42886)}(r.field,t,e);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return O(19790,{direction:r.dir})}}/**
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
 */class se{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,e){const n=this.mapKeyFn(t),s=this.inner[n];if(s===void 0)return this.inner[n]=[[t,e]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],t))return n.length===1?delete this.inner[e]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(t){Ce(this.inner,(e,n)=>{for(const[s,i]of n)t(s,i)})}isEmpty(){return Rh(this.inner)}size(){return this.innerSize}}/**
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
 */const zp=new rt(k.comparator);function Mt(){return zp}const Wh=new rt(k.comparator);function vr(...r){let t=Wh;for(const e of r)t=t.insert(e.key,e);return t}function Jh(r){let t=Wh;return r.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function Jt(){return kr()}function Yh(){return kr()}function kr(){return new se(r=>r.toString(),(r,t)=>r.isEqual(t))}const Kp=new rt(k.comparator),Gp=new et(k.comparator);function z(...r){let t=Gp;for(const e of r)t=t.add(e);return t}const Hp=new et(U);function fa(){return Hp}/**
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
 */function ma(r,t){if(r.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:qr(t)?"-0":t}}function Xh(r){return{integerValue:""+r}}function Qp(r,t){return gh(t)?Xh(t):ma(r,t)}/**
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
 */class wi{constructor(){this._=void 0}}function Wp(r,t,e){return r instanceof On?function(s,i){const a={fields:{[Ph]:{stringValue:Vh},[Dh]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&ua(i)&&(i=yi(i)),i&&(a.fields[Ch]=i),{mapValue:a}}(e,t):r instanceof Fn?td(r,t):r instanceof Ln?ed(r,t):function(s,i){const a=Zh(s,i),c=ku(a)+ku(s.Ae);return Mo(a)&&Mo(s.Ae)?Xh(c):ma(s.serializer,c)}(r,t)}function Jp(r,t,e){return r instanceof Fn?td(r,t):r instanceof Ln?ed(r,t):e}function Zh(r,t){return r instanceof Jr?function(n){return Mo(n)||function(i){return!!i&&"doubleValue"in i}(n)}(t)?t:{integerValue:0}:null}class On extends wi{}class Fn extends wi{constructor(t){super(),this.elements=t}}function td(r,t){const e=nd(t);for(const n of r.elements)e.some(s=>Xt(s,n))||e.push(n);return{arrayValue:{values:e}}}class Ln extends wi{constructor(t){super(),this.elements=t}}function ed(r,t){let e=nd(t);for(const n of r.elements)e=e.filter(s=>!Xt(s,n));return{arrayValue:{values:e}}}class Jr extends wi{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function ku(r){return ot(r.integerValue||r.doubleValue)}function nd(r){return Qr(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
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
 */class rd{constructor(t,e){this.field=t,this.transform=e}}function Yp(r,t){return r.field.isEqual(t.field)&&function(n,s){return n instanceof Fn&&s instanceof Fn||n instanceof Ln&&s instanceof Ln?Rn(n.elements,s.elements,Xt):n instanceof Jr&&s instanceof Jr?Xt(n.Ae,s.Ae):n instanceof On&&s instanceof On}(r.transform,t.transform)}class Xp{constructor(t,e){this.version=t,this.transformResults=e}}class Vt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Vt}static exists(t){return new Vt(void 0,t)}static updateTime(t){return new Vt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Ms(r,t){return r.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(r.updateTime):r.exists===void 0||r.exists===t.isFoundDocument()}class Ai{}function sd(r,t){if(!r.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return r.isNoDocument()?new vi(r.key,Vt.none()):new Hn(r.key,r.data,Vt.none());{const e=r.data,n=Tt.empty();let s=new et(at.comparator);for(let i of t.fields)if(!s.has(i)){let a=e.field(i);a===null&&i.length>1&&(i=i.popLast(),a=e.field(i)),a===null?n.delete(i):n.set(i,a),s=s.add(i)}return new ie(r.key,n,new xt(s.toArray()),Vt.none())}}function Zp(r,t,e){r instanceof Hn?function(s,i,a){const c=s.value.clone(),l=Ou(s.fieldTransforms,i,a.transformResults);c.setAll(l),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(r,t,e):r instanceof ie?function(s,i,a){if(!Ms(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=Ou(s.fieldTransforms,i,a.transformResults),l=i.data;l.setAll(id(s)),l.setAll(c),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(r,t,e):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function Mr(r,t,e,n){return r instanceof Hn?function(i,a,c,l){if(!Ms(i.precondition,a))return c;const h=i.value.clone(),f=Fu(i.fieldTransforms,l,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(r,t,e,n):r instanceof ie?function(i,a,c,l){if(!Ms(i.precondition,a))return c;const h=Fu(i.fieldTransforms,l,a),f=a.data;return f.setAll(id(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(g=>g.field))}(r,t,e,n):function(i,a,c){return Ms(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(r,t,e)}function t_(r,t){let e=null;for(const n of r.fieldTransforms){const s=t.data.field(n.field),i=Zh(n.transform,s||null);i!=null&&(e===null&&(e=Tt.empty()),e.set(n.field,i))}return e||null}function Mu(r,t){return r.type===t.type&&!!r.key.isEqual(t.key)&&!!r.precondition.isEqual(t.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&Rn(n,s,(i,a)=>Yp(i,a))}(r.fieldTransforms,t.fieldTransforms)&&(r.type===0?r.value.isEqual(t.value):r.type!==1||r.data.isEqual(t.data)&&r.fieldMask.isEqual(t.fieldMask))}class Hn extends Ai{constructor(t,e,n,s=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class ie extends Ai{constructor(t,e,n,s,i=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function id(r){const t=new Map;return r.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const n=r.data.field(e);t.set(e,n)}}),t}function Ou(r,t,e){const n=new Map;L(r.length===e.length,32656,{Ve:e.length,de:r.length});for(let s=0;s<e.length;s++){const i=r[s],a=i.transform,c=t.data.field(i.field);n.set(i.field,Jp(a,c,e[s]))}return n}function Fu(r,t,e){const n=new Map;for(const s of r){const i=s.transform,a=e.data.field(s.field);n.set(s.field,Wp(i,a,t))}return n}class vi extends Ai{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class od extends Ai{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class ga{constructor(t,e,n,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&Zp(i,t,n[s])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=Mr(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=Mr(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=Yh();return this.mutations.forEach(s=>{const i=t.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=e.has(s.key)?null:c;const l=sd(a,c);l!==null&&n.set(s.key,l),a.isValidDocument()||a.convertToNoDocument(B.min())}),n}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),z())}isEqual(t){return this.batchId===t.batchId&&Rn(this.mutations,t.mutations,(e,n)=>Mu(e,n))&&Rn(this.baseMutations,t.baseMutations,(e,n)=>Mu(e,n))}}class pa{constructor(t,e,n,s){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=s}static from(t,e,n){L(t.mutations.length===n.length,58842,{me:t.mutations.length,fe:n.length});let s=function(){return Kp}();const i=t.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,n[a].version);return new pa(t,e,n,s)}}/**
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
 */class _a{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
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
 */class e_{constructor(t,e,n){this.alias=t,this.aggregateType=e,this.fieldPath=n}}/**
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
 */class n_{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
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
 */var dt,H;function r_(r){switch(r){case V.OK:return O(64938);case V.CANCELLED:case V.UNKNOWN:case V.DEADLINE_EXCEEDED:case V.RESOURCE_EXHAUSTED:case V.INTERNAL:case V.UNAVAILABLE:case V.UNAUTHENTICATED:return!1;case V.INVALID_ARGUMENT:case V.NOT_FOUND:case V.ALREADY_EXISTS:case V.PERMISSION_DENIED:case V.FAILED_PRECONDITION:case V.ABORTED:case V.OUT_OF_RANGE:case V.UNIMPLEMENTED:case V.DATA_LOSS:return!0;default:return O(15467,{code:r})}}function ad(r){if(r===void 0)return lt("GRPC error has no .code"),V.UNKNOWN;switch(r){case dt.OK:return V.OK;case dt.CANCELLED:return V.CANCELLED;case dt.UNKNOWN:return V.UNKNOWN;case dt.DEADLINE_EXCEEDED:return V.DEADLINE_EXCEEDED;case dt.RESOURCE_EXHAUSTED:return V.RESOURCE_EXHAUSTED;case dt.INTERNAL:return V.INTERNAL;case dt.UNAVAILABLE:return V.UNAVAILABLE;case dt.UNAUTHENTICATED:return V.UNAUTHENTICATED;case dt.INVALID_ARGUMENT:return V.INVALID_ARGUMENT;case dt.NOT_FOUND:return V.NOT_FOUND;case dt.ALREADY_EXISTS:return V.ALREADY_EXISTS;case dt.PERMISSION_DENIED:return V.PERMISSION_DENIED;case dt.FAILED_PRECONDITION:return V.FAILED_PRECONDITION;case dt.ABORTED:return V.ABORTED;case dt.OUT_OF_RANGE:return V.OUT_OF_RANGE;case dt.UNIMPLEMENTED:return V.UNIMPLEMENTED;case dt.DATA_LOSS:return V.DATA_LOSS;default:return O(39323,{code:r})}}(H=dt||(dt={}))[H.OK=0]="OK",H[H.CANCELLED=1]="CANCELLED",H[H.UNKNOWN=2]="UNKNOWN",H[H.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",H[H.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",H[H.NOT_FOUND=5]="NOT_FOUND",H[H.ALREADY_EXISTS=6]="ALREADY_EXISTS",H[H.PERMISSION_DENIED=7]="PERMISSION_DENIED",H[H.UNAUTHENTICATED=16]="UNAUTHENTICATED",H[H.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",H[H.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",H[H.ABORTED=10]="ABORTED",H[H.OUT_OF_RANGE=11]="OUT_OF_RANGE",H[H.UNIMPLEMENTED=12]="UNIMPLEMENTED",H[H.INTERNAL=13]="INTERNAL",H[H.UNAVAILABLE=14]="UNAVAILABLE",H[H.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function s_(){return new TextEncoder}/**
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
 */const i_=new Ee([4294967295,4294967295],0);function Lu(r){const t=s_().encode(r),e=new Zl;return e.update(t),new Uint8Array(e.digest())}function Bu(r){const t=new DataView(r.buffer),e=t.getUint32(0,!0),n=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new Ee([e,n],0),new Ee([s,i],0)]}class ya{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new br(`Invalid padding: ${e}`);if(n<0)throw new br(`Invalid hash count: ${n}`);if(t.length>0&&this.hashCount===0)throw new br(`Invalid hash count: ${n}`);if(t.length===0&&e!==0)throw new br(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=Ee.fromNumber(this.ge)}ye(t,e,n){let s=t.add(e.multiply(Ee.fromNumber(n)));return s.compare(i_)===1&&(s=new Ee([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=Lu(t),[n,s]=Bu(e);for(let i=0;i<this.hashCount;i++){const a=this.ye(n,s,i);if(!this.we(a))return!1}return!0}static create(t,e,n){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),a=new ya(i,s,e);return n.forEach(c=>a.insert(c)),a}insert(t){if(this.ge===0)return;const e=Lu(t),[n,s]=Bu(e);for(let i=0;i<this.hashCount;i++){const a=this.ye(n,s,i);this.Se(a)}}Se(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class br extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class ns{constructor(t,e,n,s,i){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const s=new Map;return s.set(t,rs.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new ns(B.min(),s,new rt(U),Mt(),z())}}class rs{constructor(t,e,n,s,i){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new rs(n,e,z(),z(),z())}}/**
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
 */class Os{constructor(t,e,n,s){this.be=t,this.removedTargetIds=e,this.key=n,this.De=s}}class cd{constructor(t,e){this.targetId=t,this.Ce=e}}class ud{constructor(t,e,n=ht.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=s}}class Uu{constructor(){this.ve=0,this.Fe=qu(),this.Me=ht.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=z(),e=z(),n=z();return this.Fe.forEach((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:n=n.add(s);break;default:O(38017,{changeType:i})}}),new rs(this.Me,this.xe,t,e,n)}qe(){this.Oe=!1,this.Fe=qu()}Ke(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}Ue(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}$e(){this.ve+=1}We(){this.ve-=1,L(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class o_{constructor(t){this.Ge=t,this.ze=new Map,this.je=Mt(),this.Je=As(),this.He=As(),this.Ze=new rt(U)}Xe(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Ye(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,e=>{const n=this.nt(e);switch(t.state){case 0:this.rt(e)&&n.Le(t.resumeToken);break;case 1:n.We(),n.Ne||n.qe(),n.Le(t.resumeToken);break;case 2:n.We(),n.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(n.Qe(),n.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),n.Le(t.resumeToken));break;default:O(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach((n,s)=>{this.rt(s)&&e(s)})}st(t){const e=t.targetId,n=t.Ce.count,s=this.ot(e);if(s){const i=s.target;if(Js(i))if(n===0){const a=new k(i.path);this.et(e,a,ut.newNoDocument(a,B.min()))}else L(n===1,20013,{expectedCount:n});else{const a=this._t(e);if(a!==n){const c=this.ut(t),l=c?this.ct(c,t,a):1;if(l!==0){this.it(e);const h=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,h)}}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=e;let a,c;try{a=re(n).toUint8Array()}catch(l){if(l instanceof Sh)return Ae("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new ya(a,s,i)}catch(l){return Ae(l instanceof br?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.ge===0?null:c}ct(t,e,n){return e.Ce.count===n-this.Pt(t,e.targetId)?0:2}Pt(t,e){const n=this.Ge.getRemoteKeysForTarget(e);let s=0;return n.forEach(i=>{const a=this.Ge.ht(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;t.mightContain(c)||(this.et(e,i,null),s++)}),s}Tt(t){const e=new Map;this.ze.forEach((i,a)=>{const c=this.ot(a);if(c){if(i.current&&Js(c.target)){const l=new k(c.target.path);this.Et(l).has(a)||this.It(a,l)||this.et(a,l,ut.newNoDocument(l,t))}i.Be&&(e.set(a,i.ke()),i.qe())}});let n=z();this.He.forEach((i,a)=>{let c=!0;a.forEachWhile(l=>{const h=this.ot(l);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(n=n.add(i))}),this.je.forEach((i,a)=>a.setReadTime(t));const s=new ns(t,e,this.Ze,this.je,n);return this.je=Mt(),this.Je=As(),this.He=As(),this.Ze=new rt(U),s}Ye(t,e){if(!this.rt(t))return;const n=this.It(t,e.key)?2:0;this.nt(t).Ke(e.key,n),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.Et(e.key).add(t)),this.He=this.He.insert(e.key,this.Rt(e.key).add(t))}et(t,e,n){if(!this.rt(t))return;const s=this.nt(t);this.It(t,e)?s.Ke(e,1):s.Ue(e),this.He=this.He.insert(e,this.Rt(e).delete(t)),this.He=this.He.insert(e,this.Rt(e).add(t)),n&&(this.je=this.je.insert(e,n))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}$e(t){this.nt(t).$e()}nt(t){let e=this.ze.get(t);return e||(e=new Uu,this.ze.set(t,e)),e}Rt(t){let e=this.He.get(t);return e||(e=new et(U),this.He=this.He.insert(t,e)),e}Et(t){let e=this.Je.get(t);return e||(e=new et(U),this.Je=this.Je.insert(t,e)),e}rt(t){const e=this.ot(t)!==null;return e||C("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new Uu),this.Ge.getRemoteKeysForTarget(t).forEach(e=>{this.et(t,e,null)})}It(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function As(){return new rt(k.comparator)}function qu(){return new rt(k.comparator)}const a_={asc:"ASCENDING",desc:"DESCENDING"},c_={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},u_={and:"AND",or:"OR"};class l_{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Uo(r,t){return r.useProto3Json||mi(t)?t:{value:t}}function Bn(r,t){return r.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function ld(r,t){return r.useProto3Json?t.toBase64():t.toUint8Array()}function h_(r,t){return Bn(r,t.toTimestamp())}function Pt(r){return L(!!r,49232),B.fromTimestamp(function(e){const n=ne(e);return new Z(n.seconds,n.nanos)}(r))}function Ia(r,t){return qo(r,t).canonicalString()}function qo(r,t){const e=function(s){return new Y(["projects",s.projectId,"databases",s.database])}(r).child("documents");return t===void 0?e:e.child(t)}function hd(r){const t=Y.fromString(r);return L(Id(t),10190,{key:t.toString()}),t}function Zs(r,t){return Ia(r.databaseId,t.path)}function Ye(r,t){const e=hd(t);if(e.get(1)!==r.databaseId.projectId)throw new D(V.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+r.databaseId.projectId);if(e.get(3)!==r.databaseId.database)throw new D(V.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+r.databaseId.database);return new k(md(e))}function dd(r,t){return Ia(r.databaseId,t)}function fd(r){const t=hd(r);return t.length===4?Y.emptyPath():md(t)}function jo(r){return new Y(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function md(r){return L(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function ju(r,t,e){return{name:Zs(r,t),fields:e.value.mapValue.fields}}function d_(r,t,e){const n=Ye(r,t.name),s=Pt(t.updateTime),i=t.createTime?Pt(t.createTime):B.min(),a=new Tt({mapValue:{fields:t.fields}}),c=ut.newFoundDocument(n,s,i,a);return e&&c.setHasCommittedMutations(),e?c.setHasCommittedMutations():c}function f_(r,t){let e;if("targetChange"in t){t.targetChange;const n=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:O(39313,{state:h})}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=function(h,f){return h.useProto3Json?(L(f===void 0||typeof f=="string",58123),ht.fromBase64String(f||"")):(L(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),ht.fromUint8Array(f||new Uint8Array))}(r,t.targetChange.resumeToken),a=t.targetChange.cause,c=a&&function(h){const f=h.code===void 0?V.UNKNOWN:ad(h.code);return new D(f,h.message||"")}(a);e=new ud(n,s,i,c||null)}else if("documentChange"in t){t.documentChange;const n=t.documentChange;n.document,n.document.name,n.document.updateTime;const s=Ye(r,n.document.name),i=Pt(n.document.updateTime),a=n.document.createTime?Pt(n.document.createTime):B.min(),c=new Tt({mapValue:{fields:n.document.fields}}),l=ut.newFoundDocument(s,i,a,c),h=n.targetIds||[],f=n.removedTargetIds||[];e=new Os(h,f,l.key,l)}else if("documentDelete"in t){t.documentDelete;const n=t.documentDelete;n.document;const s=Ye(r,n.document),i=n.readTime?Pt(n.readTime):B.min(),a=ut.newNoDocument(s,i),c=n.removedTargetIds||[];e=new Os([],c,a.key,a)}else if("documentRemove"in t){t.documentRemove;const n=t.documentRemove;n.document;const s=Ye(r,n.document),i=n.removedTargetIds||[];e=new Os([],i,s,null)}else{if(!("filter"in t))return O(11601,{Vt:t});{t.filter;const n=t.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,a=new n_(s,i),c=n.targetId;e=new cd(c,a)}}return e}function ti(r,t){let e;if(t instanceof Hn)e={update:ju(r,t.key,t.value)};else if(t instanceof vi)e={delete:Zs(r,t.key)};else if(t instanceof ie)e={update:ju(r,t.key,t.data),updateMask:E_(t.fieldMask)};else{if(!(t instanceof od))return O(16599,{dt:t.type});e={verify:Zs(r,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(n=>function(i,a){const c=a.transform;if(c instanceof On)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Fn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Ln)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Jr)return{fieldPath:a.field.canonicalString(),increment:c.Ae};throw O(20930,{transform:a.transform})}(0,n))),t.precondition.isNone||(e.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:h_(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:O(27497)}(r,t.precondition)),e}function $o(r,t){const e=t.currentDocument?function(i){return i.updateTime!==void 0?Vt.updateTime(Pt(i.updateTime)):i.exists!==void 0?Vt.exists(i.exists):Vt.none()}(t.currentDocument):Vt.none(),n=t.updateTransforms?t.updateTransforms.map(s=>function(a,c){let l=null;if("setToServerValue"in c)L(c.setToServerValue==="REQUEST_TIME",16630,{proto:c}),l=new On;else if("appendMissingElements"in c){const f=c.appendMissingElements.values||[];l=new Fn(f)}else if("removeAllFromArray"in c){const f=c.removeAllFromArray.values||[];l=new Ln(f)}else"increment"in c?l=new Jr(a,c.increment):O(16584,{proto:c});const h=at.fromServerFormat(c.fieldPath);return new rd(h,l)}(r,s)):[];if(t.update){t.update.name;const s=Ye(r,t.update.name),i=new Tt({mapValue:{fields:t.update.fields}});if(t.updateMask){const a=function(l){const h=l.fieldPaths||[];return new xt(h.map(f=>at.fromServerFormat(f)))}(t.updateMask);return new ie(s,i,a,e,n)}return new Hn(s,i,e,n)}if(t.delete){const s=Ye(r,t.delete);return new vi(s,e)}if(t.verify){const s=Ye(r,t.verify);return new od(s,e)}return O(1463,{proto:t})}function m_(r,t){return r&&r.length>0?(L(t!==void 0,14353),r.map(e=>function(s,i){let a=s.updateTime?Pt(s.updateTime):Pt(i);return a.isEqual(B.min())&&(a=Pt(i)),new Xp(a,s.transformResults||[])}(e,t))):[]}function gd(r,t){return{documents:[dd(r,t.path)]}}function Ea(r,t){const e={structuredQuery:{}},n=t.path;let s;t.collectionGroup!==null?(s=n,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=n.popLast(),e.structuredQuery.from=[{collectionId:n.lastSegment()}]),e.parent=dd(r,s);const i=function(h){if(h.length!==0)return yd(tt.create(h,"and"))}(t.filters);i&&(e.structuredQuery.where=i);const a=function(h){if(h.length!==0)return h.map(f=>function(I){return{field:ge(I.field),direction:__(I.dir)}}(f))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const c=Uo(r,t.limit);return c!==null&&(e.structuredQuery.limit=c),t.startAt&&(e.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(t.endAt)),{ft:e,parent:s}}function g_(r,t,e,n){const{ft:s,parent:i}=Ea(r,t),a={},c=[];let l=0;return e.forEach(h=>{const f="aggregate_"+l++;a[f]=h.alias,h.aggregateType==="count"?c.push({alias:f,count:{}}):h.aggregateType==="avg"?c.push({alias:f,avg:{field:ge(h.fieldPath)}}):h.aggregateType==="sum"&&c.push({alias:f,sum:{field:ge(h.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:c,structuredQuery:s.structuredQuery},parent:s.parent},gt:a,parent:i}}function pd(r){let t=fd(r.parent);const e=r.structuredQuery,n=e.from?e.from.length:0;let s=null;if(n>0){L(n===1,65062);const f=e.from[0];f.allDescendants?s=f.collectionId:t=t.child(f.collectionId)}let i=[];e.where&&(i=function(g){const I=_d(g);return I instanceof tt&&da(I)?I.getFilters():[I]}(e.where));let a=[];e.orderBy&&(a=function(g){return g.map(I=>function(P){return new Wr(En(P.field),function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(P.direction))}(I))}(e.orderBy));let c=null;e.limit&&(c=function(g){let I;return I=typeof g=="object"?g.value:g,mi(I)?null:I}(e.limit));let l=null;e.startAt&&(l=function(g){const I=!!g.before,b=g.values||[];return new kn(b,I)}(e.startAt));let h=null;return e.endAt&&(h=function(g){const I=!g.before,b=g.values||[];return new kn(b,I)}(e.endAt)),$h(t,s,a,i,c,"F",l,h)}function p_(r,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return O(28987,{purpose:s})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function _d(r){return r.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=En(e.unaryFilter.field);return G.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=En(e.unaryFilter.field);return G.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=En(e.unaryFilter.field);return G.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=En(e.unaryFilter.field);return G.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return O(61313);default:return O(60726)}}(r):r.fieldFilter!==void 0?function(e){return G.create(En(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return O(58110);default:return O(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(e){return tt.create(e.compositeFilter.filters.map(n=>_d(n)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return O(1026)}}(e.compositeFilter.op))}(r):O(30097,{filter:r})}function __(r){return a_[r]}function y_(r){return c_[r]}function I_(r){return u_[r]}function ge(r){return{fieldPath:r.canonicalString()}}function En(r){return at.fromServerFormat(r.fieldPath)}function yd(r){return r instanceof G?function(e){if(e.op==="=="){if(Ru(e.value))return{unaryFilter:{field:ge(e.field),op:"IS_NAN"}};if(bu(e.value))return{unaryFilter:{field:ge(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Ru(e.value))return{unaryFilter:{field:ge(e.field),op:"IS_NOT_NAN"}};if(bu(e.value))return{unaryFilter:{field:ge(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ge(e.field),op:y_(e.op),value:e.value}}}(r):r instanceof tt?function(e){const n=e.getFilters().map(s=>yd(s));return n.length===1?n[0]:{compositeFilter:{op:I_(e.op),filters:n}}}(r):O(54877,{filter:r})}function E_(r){const t=[];return r.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Id(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}function Ed(r){return!!r&&typeof r._toProto=="function"&&r._protoValueType==="ProtoValue"}/**
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
 */class Zt{constructor(t,e,n,s,i=B.min(),a=B.min(),c=ht.EMPTY_BYTE_STRING,l=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(t){return new Zt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Zt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Zt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Zt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
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
 */class Td{constructor(t){this.yt=t}}function T_(r,t){let e;if(t.document)e=d_(r.yt,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const n=k.fromSegments(t.noDocument.path),s=rn(t.noDocument.readTime);e=ut.newNoDocument(n,s),t.hasCommittedMutations&&e.setHasCommittedMutations()}else{if(!t.unknownDocument)return O(56709);{const n=k.fromSegments(t.unknownDocument.path),s=rn(t.unknownDocument.version);e=ut.newUnknownDocument(n,s)}}return t.readTime&&e.setReadTime(function(s){const i=new Z(s[0],s[1]);return B.fromTimestamp(i)}(t.readTime)),e}function $u(r,t){const e=t.key,n={prefixPath:e.getCollectionPath().popLast().toArray(),collectionGroup:e.collectionGroup,documentId:e.path.lastSegment(),readTime:ei(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())n.document=function(i,a){return{name:Zs(i,a.key),fields:a.data.value.mapValue.fields,updateTime:Bn(i,a.version.toTimestamp()),createTime:Bn(i,a.createTime.toTimestamp())}}(r.yt,t);else if(t.isNoDocument())n.noDocument={path:e.path.toArray(),readTime:nn(t.version)};else{if(!t.isUnknownDocument())return O(57904,{document:t});n.unknownDocument={path:e.path.toArray(),version:nn(t.version)}}return n}function ei(r){const t=r.toTimestamp();return[t.seconds,t.nanoseconds]}function nn(r){const t=r.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function rn(r){const t=new Z(r.seconds,r.nanoseconds);return B.fromTimestamp(t)}function Ke(r,t){const e=(t.baseMutations||[]).map(i=>$o(r.yt,i));for(let i=0;i<t.mutations.length-1;++i){const a=t.mutations[i];if(i+1<t.mutations.length&&t.mutations[i+1].transform!==void 0){const c=t.mutations[i+1];a.updateTransforms=c.transform.fieldTransforms,t.mutations.splice(i+1,1),++i}}const n=t.mutations.map(i=>$o(r.yt,i)),s=Z.fromMillis(t.localWriteTimeMs);return new ga(t.batchId,s,e,n)}function Rr(r){const t=rn(r.readTime),e=r.lastLimboFreeSnapshotVersion!==void 0?rn(r.lastLimboFreeSnapshotVersion):B.min();let n;return n=function(i){return i.documents!==void 0}(r.query)?function(i){const a=i.documents.length;return L(a===1,1966,{count:a}),Ot(Ei(fd(i.documents[0])))}(r.query):function(i){return Ot(pd(i))}(r.query),new Zt(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,t,e,ht.fromBase64String(r.resumeToken))}function wd(r,t){const e=nn(t.snapshotVersion),n=nn(t.lastLimboFreeSnapshotVersion);let s;s=Js(t.target)?gd(r.yt,t.target):Ea(r.yt,t.target).ft;const i=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:en(t.target),readTime:e,resumeToken:i,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function Ad(r){const t=pd({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?Xs(t,t.limit,"L"):t}function fo(r,t){return new _a(t.largestBatchId,$o(r.yt,t.overlayMutation))}function zu(r,t){const e=t.path.lastSegment();return[r,bt(t.path.popLast()),e]}function Ku(r,t,e,n){return{indexId:r,uid:t,sequenceNumber:e,readTime:nn(n.readTime),documentKey:bt(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
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
 */class w_{getBundleMetadata(t,e){return Gu(t).get(e).next(n=>{if(n)return function(i){return{id:i.bundleId,createTime:rn(i.createTime),version:i.version}}(n)})}saveBundleMetadata(t,e){return Gu(t).put(function(s){return{bundleId:s.id,createTime:nn(Pt(s.createTime)),version:s.version}}(e))}getNamedQuery(t,e){return Hu(t).get(e).next(n=>{if(n)return function(i){return{name:i.name,query:Ad(i.bundledQuery),readTime:rn(i.readTime)}}(n)})}saveNamedQuery(t,e){return Hu(t).put(function(s){return{name:s.name,readTime:nn(Pt(s.readTime)),bundledQuery:s.bundledQuery}}(e))}}function Gu(r){return pt(r,gi)}function Hu(r){return pt(r,pi)}/**
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
 */class bi{constructor(t,e){this.serializer=t,this.userId=e}static wt(t,e){const n=e.uid||"";return new bi(t,n)}getOverlay(t,e){return gr(t).get(zu(this.userId,e)).next(n=>n?fo(this.serializer,n):null)}getOverlays(t,e){const n=Jt();return A.forEach(e,s=>this.getOverlay(t,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(t,e,n){const s=[];return n.forEach((i,a)=>{const c=new _a(e,a);s.push(this.St(t,c))}),A.waitFor(s)}removeOverlaysForBatchId(t,e,n){const s=new Set;e.forEach(a=>s.add(bt(a.getCollectionPath())));const i=[];return s.forEach(a=>{const c=IDBKeyRange.bound([this.userId,a,n],[this.userId,a,n+1],!1,!0);i.push(gr(t).X(xo,c))}),A.waitFor(i)}getOverlaysForCollection(t,e,n){const s=Jt(),i=bt(e),a=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return gr(t).J(xo,a).next(c=>{for(const l of c){const h=fo(this.serializer,l);s.set(h.getKey(),h)}return s})}getOverlaysForCollectionGroup(t,e,n,s){const i=Jt();let a;const c=IDBKeyRange.bound([this.userId,e,n],[this.userId,e,Number.POSITIVE_INFINITY],!0);return gr(t).ee({index:Th,range:c},(l,h,f)=>{const g=fo(this.serializer,h);i.size()<s||g.largestBatchId===a?(i.set(g.getKey(),g),a=g.largestBatchId):f.done()}).next(()=>i)}St(t,e){return gr(t).put(function(s,i,a){const[c,l,h]=zu(i,a.mutation.key);return{userId:i,collectionPath:l,documentId:h,collectionGroup:a.mutation.key.getCollectionGroup(),largestBatchId:a.largestBatchId,overlayMutation:ti(s.yt,a.mutation)}}(this.serializer,this.userId,e))}}function gr(r){return pt(r,_i)}/**
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
 */class A_{bt(t){return pt(t,aa)}getSessionToken(t){return this.bt(t).get("sessionToken").next(e=>{const n=e==null?void 0:e.value;return n?ht.fromUint8Array(n):ht.EMPTY_BYTE_STRING})}setSessionToken(t,e){return this.bt(t).put({name:"sessionToken",value:e.toUint8Array()})}}/**
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
 */class Ge{constructor(){}Dt(t,e){this.Ct(t,e),e.vt()}Ct(t,e){if("nullValue"in t)this.Ft(e,5);else if("booleanValue"in t)this.Ft(e,10),e.Mt(t.booleanValue?1:0);else if("integerValue"in t)this.Ft(e,15),e.Mt(ot(t.integerValue));else if("doubleValue"in t){const n=ot(t.doubleValue);isNaN(n)?this.Ft(e,13):(this.Ft(e,15),qr(n)?e.Mt(0):e.Mt(n))}else if("timestampValue"in t){let n=t.timestampValue;this.Ft(e,20),typeof n=="string"&&(n=ne(n)),e.xt(`${n.seconds||""}`),e.Mt(n.nanos||0)}else if("stringValue"in t)this.Ot(t.stringValue,e),this.Nt(e);else if("bytesValue"in t)this.Ft(e,30),e.Bt(re(t.bytesValue)),this.Nt(e);else if("referenceValue"in t)this.Lt(t.referenceValue,e);else if("geoPointValue"in t){const n=t.geoPointValue;this.Ft(e,45),e.Mt(n.latitude||0),e.Mt(n.longitude||0)}else"mapValue"in t?Nh(t)?this.Ft(e,Number.MAX_SAFE_INTEGER):Ii(t)?this.kt(t.mapValue,e):(this.qt(t.mapValue,e),this.Nt(e)):"arrayValue"in t?(this.Kt(t.arrayValue,e),this.Nt(e)):O(19022,{Ut:t})}Ot(t,e){this.Ft(e,25),this.$t(t,e)}$t(t,e){e.xt(t)}qt(t,e){const n=t.fields||{};this.Ft(e,55);for(const s of Object.keys(n))this.Ot(s,e),this.Ct(n[s],e)}kt(t,e){var a,c;const n=t.fields||{};this.Ft(e,53);const s=xn,i=((c=(a=n[s].arrayValue)==null?void 0:a.values)==null?void 0:c.length)||0;this.Ft(e,15),e.Mt(ot(i)),this.Ot(s,e),this.Ct(n[s],e)}Kt(t,e){const n=t.values||[];this.Ft(e,50);for(const s of n)this.Ct(s,e)}Lt(t,e){this.Ft(e,37),k.fromName(t).path.forEach(n=>{this.Ft(e,60),this.$t(n,e)})}Ft(t,e){t.Mt(e)}Nt(t){t.Mt(2)}}Ge.Wt=new Ge;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mn=255;function v_(r){if(r===0)return 8;let t=0;return r>>4||(t+=4,r<<=4),r>>6||(t+=2,r<<=2),r>>7||(t+=1),t}function Qu(r){const t=64-function(n){let s=0;for(let i=0;i<8;++i){const a=v_(255&n[i]);if(s+=a,a!==8)break}return s}(r);return Math.ceil(t/8)}class b_{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(t){const e=t[Symbol.iterator]();let n=e.next();for(;!n.done;)this.Gt(n.value),n=e.next();this.zt()}jt(t){const e=t[Symbol.iterator]();let n=e.next();for(;!n.done;)this.Jt(n.value),n=e.next();this.Ht()}Zt(t){for(const e of t){const n=e.charCodeAt(0);if(n<128)this.Gt(n);else if(n<2048)this.Gt(960|n>>>6),this.Gt(128|63&n);else if(e<"\uD800"||"\uDBFF"<e)this.Gt(480|n>>>12),this.Gt(128|63&n>>>6),this.Gt(128|63&n);else{const s=e.codePointAt(0);this.Gt(240|s>>>18),this.Gt(128|63&s>>>12),this.Gt(128|63&s>>>6),this.Gt(128|63&s)}}this.zt()}Xt(t){for(const e of t){const n=e.charCodeAt(0);if(n<128)this.Jt(n);else if(n<2048)this.Jt(960|n>>>6),this.Jt(128|63&n);else if(e<"\uD800"||"\uDBFF"<e)this.Jt(480|n>>>12),this.Jt(128|63&n>>>6),this.Jt(128|63&n);else{const s=e.codePointAt(0);this.Jt(240|s>>>18),this.Jt(128|63&s>>>12),this.Jt(128|63&s>>>6),this.Jt(128|63&s)}}this.Ht()}Yt(t){const e=this.en(t),n=Qu(e);this.tn(1+n),this.buffer[this.position++]=255&n;for(let s=e.length-n;s<e.length;++s)this.buffer[this.position++]=255&e[s]}nn(t){const e=this.en(t),n=Qu(e);this.tn(1+n),this.buffer[this.position++]=~(255&n);for(let s=e.length-n;s<e.length;++s)this.buffer[this.position++]=~(255&e[s])}rn(){this.sn(mn),this.sn(255)}_n(){this.an(mn),this.an(255)}reset(){this.position=0}seed(t){this.tn(t.length),this.buffer.set(t,this.position),this.position+=t.length}un(){return this.buffer.slice(0,this.position)}en(t){const e=function(i){const a=new DataView(new ArrayBuffer(8));return a.setFloat64(0,i,!1),new Uint8Array(a.buffer)}(t),n=!!(128&e[0]);e[0]^=n?255:128;for(let s=1;s<e.length;++s)e[s]^=n?255:0;return e}Gt(t){const e=255&t;e===0?(this.sn(0),this.sn(255)):e===mn?(this.sn(mn),this.sn(0)):this.sn(e)}Jt(t){const e=255&t;e===0?(this.an(0),this.an(255)):e===mn?(this.an(mn),this.an(0)):this.an(t)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(t){this.tn(1),this.buffer[this.position++]=t}an(t){this.tn(1),this.buffer[this.position++]=~t}tn(t){const e=t+this.position;if(e<=this.buffer.length)return;let n=2*this.buffer.length;n<e&&(n=e);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class R_{constructor(t){this.cn=t}Bt(t){this.cn.Qt(t)}xt(t){this.cn.Zt(t)}Mt(t){this.cn.Yt(t)}vt(){this.cn.rn()}}class S_{constructor(t){this.cn=t}Bt(t){this.cn.jt(t)}xt(t){this.cn.Xt(t)}Mt(t){this.cn.nn(t)}vt(){this.cn._n()}}class pr{constructor(){this.cn=new b_,this.ascending=new R_(this.cn),this.descending=new S_(this.cn)}seed(t){this.cn.seed(t)}ln(t){return t===0?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
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
 */class He{constructor(t,e,n,s){this.hn=t,this.Pn=e,this.Tn=n,this.En=s}In(){const t=this.En.length,e=t===0||this.En[t-1]===255?t+1:t,n=new Uint8Array(e);return n.set(this.En,0),e!==t?n.set([0],this.En.length):++n[n.length-1],new He(this.hn,this.Pn,this.Tn,n)}Rn(t,e,n){return{indexId:this.hn,uid:t,arrayValue:Fs(this.Tn),directionalValue:Fs(this.En),orderedDocumentKey:Fs(e),documentKey:n.path.toArray()}}An(t,e,n){const s=this.Rn(t,e,n);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function de(r,t){let e=r.hn-t.hn;return e!==0?e:(e=Wu(r.Tn,t.Tn),e!==0?e:(e=Wu(r.En,t.En),e!==0?e:k.comparator(r.Pn,t.Pn)))}function Wu(r,t){for(let e=0;e<r.length&&e<t.length;++e){const n=r[e]-t[e];if(n!==0)return n}return r.length-t.length}function Fs(r){return jl()?function(e){let n="";for(let s=0;s<e.length;s++)n+=String.fromCharCode(e[s]);return n}(r):r}function Ju(r){return typeof r!="string"?r:function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n}(r)}class Yu{constructor(t){this.Vn=new et((e,n)=>at.comparator(e.field,n.field)),this.collectionId=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment(),this.dn=t.orderBy,this.mn=[];for(const e of t.filters){const n=e;n.isInequality()?this.Vn=this.Vn.add(n):this.mn.push(n)}}get fn(){return this.Vn.size>1}gn(t){if(L(t.collectionGroup===this.collectionId,49279),this.fn)return!1;const e=Po(t);if(e!==void 0&&!this.pn(e))return!1;const n=je(t);let s=new Set,i=0,a=0;for(;i<n.length&&this.pn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.Vn.size>0){const c=this.Vn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const l=n[i];if(!this.yn(c,l)||!this.wn(this.dn[a++],l))return!1}++i}for(;i<n.length;++i){const c=n[i];if(a>=this.dn.length||!this.wn(this.dn[a++],c))return!1}return!0}Sn(){if(this.fn)return null;let t=new et(at.comparator);const e=[];for(const n of this.mn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")e.push(new Ps(n.field,2));else{if(t.has(n.field))continue;t=t.add(n.field),e.push(new Ps(n.field,0))}for(const n of this.dn)n.field.isKeyField()||t.has(n.field)||(t=t.add(n.field),e.push(new Ps(n.field,n.dir==="asc"?0:1)));return new Ks(Ks.UNKNOWN_ID,this.collectionId,e,Ur.empty())}pn(t){for(const e of this.mn)if(this.yn(e,t))return!0;return!1}yn(t,e){if(t===void 0||!t.field.isEqual(e.fieldPath))return!1;const n=t.op==="array-contains"||t.op==="array-contains-any";return e.kind===2===n}wn(t,e){return!!t.field.isEqual(e.fieldPath)&&(e.kind===0&&t.dir==="asc"||e.kind===1&&t.dir==="desc")}}/**
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
 */function vd(r){var e,n;if(L(r instanceof G||r instanceof tt,20012),r instanceof G){if(r instanceof jh){const s=((n=(e=r.value.arrayValue)==null?void 0:e.values)==null?void 0:n.map(i=>G.create(r.field,"==",i)))||[];return tt.create(s,"or")}return r}const t=r.filters.map(s=>vd(s));return tt.create(t,r.op)}function V_(r){if(r.getFilters().length===0)return[];const t=Go(vd(r));return L(bd(t),7391),zo(t)||Ko(t)?[t]:t.getFilters()}function zo(r){return r instanceof G}function Ko(r){return r instanceof tt&&da(r)}function bd(r){return zo(r)||Ko(r)||function(e){if(e instanceof tt&&Oo(e)){for(const n of e.getFilters())if(!zo(n)&&!Ko(n))return!1;return!0}return!1}(r)}function Go(r){if(L(r instanceof G||r instanceof tt,34018),r instanceof G)return r;if(r.filters.length===1)return Go(r.filters[0]);const t=r.filters.map(n=>Go(n));let e=tt.create(t,r.op);return e=ni(e),bd(e)?e:(L(e instanceof tt,64498),L(Mn(e),40251),L(e.filters.length>1,57927),e.filters.reduce((n,s)=>Ta(n,s)))}function Ta(r,t){let e;return L(r instanceof G||r instanceof tt,38388),L(t instanceof G||t instanceof tt,25473),e=r instanceof G?t instanceof G?function(s,i){return tt.create([s,i],"and")}(r,t):Xu(r,t):t instanceof G?Xu(t,r):function(s,i){if(L(s.filters.length>0&&i.filters.length>0,48005),Mn(s)&&Mn(i))return Bh(s,i.getFilters());const a=Oo(s)?s:i,c=Oo(s)?i:s,l=a.filters.map(h=>Ta(h,c));return tt.create(l,"or")}(r,t),ni(e)}function Xu(r,t){if(Mn(t))return Bh(t,r.getFilters());{const e=t.filters.map(n=>Ta(r,n));return tt.create(e,"or")}}function ni(r){if(L(r instanceof G||r instanceof tt,11850),r instanceof G)return r;const t=r.getFilters();if(t.length===1)return ni(t[0]);if(Fh(r))return r;const e=t.map(s=>ni(s)),n=[];return e.forEach(s=>{s instanceof G?n.push(s):s instanceof tt&&(s.op===r.op?n.push(...s.filters):n.push(s))}),n.length===1?n[0]:tt.create(n,r.op)}/**
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
 */class P_{constructor(){this.bn=new wa}addToCollectionParentIndex(t,e){return this.bn.add(e),A.resolve()}getCollectionParents(t,e){return A.resolve(this.bn.getEntries(e))}addFieldIndex(t,e){return A.resolve()}deleteFieldIndex(t,e){return A.resolve()}deleteAllFieldIndexes(t){return A.resolve()}createTargetIndexes(t,e){return A.resolve()}getDocumentsMatchingTarget(t,e){return A.resolve(null)}getIndexType(t,e){return A.resolve(0)}getFieldIndexes(t,e){return A.resolve([])}getNextCollectionGroupToUpdate(t){return A.resolve(null)}getMinOffset(t,e){return A.resolve(Ft.min())}getMinOffsetFromCollectionGroup(t,e){return A.resolve(Ft.min())}updateCollectionGroup(t,e,n){return A.resolve()}updateIndexEntries(t,e){return A.resolve()}}class wa{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e]||new et(Y.comparator),i=!s.has(n);return this.index[e]=s.add(n),i}has(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e];return s&&s.has(n)}getEntries(t){return(this.index[t]||new et(Y.comparator)).toArray()}}/**
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
 */const Zu="IndexedDbIndexManager",vs=new Uint8Array(0);class C_{constructor(t,e){this.databaseId=e,this.Dn=new wa,this.Cn=new se(n=>en(n),(n,s)=>ts(n,s)),this.uid=t.uid||""}addToCollectionParentIndex(t,e){if(!this.Dn.has(e)){const n=e.lastSegment(),s=e.popLast();t.addOnCommittedListener(()=>{this.Dn.add(e)});const i={collectionId:n,parent:bt(s)};return tl(t).put(i)}return A.resolve()}getCollectionParents(t,e){const n=[],s=IDBKeyRange.bound([e,""],[ah(e),""],!1,!0);return tl(t).J(s).next(i=>{for(const a of i){if(a.collectionId!==e)break;n.push(Wt(a.parent))}return n})}addFieldIndex(t,e){const n=_r(t),s=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(l=>[l.fieldPath.canonicalString(),l.kind])}}(e);delete s.indexId;const i=n.add(s);if(e.indexState){const a=pn(t);return i.next(c=>{a.put(Ku(c,this.uid,e.indexState.sequenceNumber,e.indexState.offset))})}return i.next()}deleteFieldIndex(t,e){const n=_r(t),s=pn(t),i=gn(t);return n.delete(e.indexId).next(()=>s.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0)))}deleteAllFieldIndexes(t){const e=_r(t),n=gn(t),s=pn(t);return e.X().next(()=>n.X()).next(()=>s.X())}createTargetIndexes(t,e){return A.forEach(this.vn(e),n=>this.getIndexType(t,n).next(s=>{if(s===0||s===1){const i=new Yu(n).Sn();if(i!=null)return this.addFieldIndex(t,i)}}))}getDocumentsMatchingTarget(t,e){const n=gn(t);let s=!0;const i=new Map;return A.forEach(this.vn(e),a=>this.Fn(t,a).next(c=>{s&&(s=!!c),i.set(a,c)})).next(()=>{if(s){let a=z();const c=[];return A.forEach(i,(l,h)=>{C(Zu,`Using index ${function(q){return`id=${q.indexId}|cg=${q.collectionGroup}|f=${q.fields.map(st=>`${st.fieldPath}:${st.kind}`).join(",")}`}(l)} to execute ${en(e)}`);const f=function(q,st){const W=Po(st);if(W===void 0)return null;for(const J of Ys(q,W.fieldPath))switch(J.op){case"array-contains-any":return J.value.arrayValue.values||[];case"array-contains":return[J.value]}return null}(h,l),g=function(q,st){const W=new Map;for(const J of je(st))for(const E of Ys(q,J.fieldPath))switch(E.op){case"==":case"in":W.set(J.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return W.set(J.fieldPath.canonicalString(),E.value),Array.from(W.values())}return null}(h,l),I=function(q,st){const W=[];let J=!0;for(const E of je(st)){const p=E.kind===0?Du(q,E.fieldPath,q.startAt):xu(q,E.fieldPath,q.startAt);W.push(p.value),J&&(J=p.inclusive)}return new kn(W,J)}(h,l),b=function(q,st){const W=[];let J=!0;for(const E of je(st)){const p=E.kind===0?xu(q,E.fieldPath,q.endAt):Du(q,E.fieldPath,q.endAt);W.push(p.value),J&&(J=p.inclusive)}return new kn(W,J)}(h,l),P=this.Mn(l,h,I),M=this.Mn(l,h,b),N=this.xn(l,h,g),K=this.On(l.indexId,f,P,I.inclusive,M,b.inclusive,N);return A.forEach(K,j=>n.Z(j,e.limit).next(q=>{q.forEach(st=>{const W=k.fromSegments(st.documentKey);a.has(W)||(a=a.add(W),c.push(W))})}))}).next(()=>c)}return A.resolve(null)})}vn(t){let e=this.Cn.get(t);return e||(t.filters.length===0?e=[t]:e=V_(tt.create(t.filters,"and")).map(n=>Lo(t.path,t.collectionGroup,t.orderBy,n.getFilters(),t.limit,t.startAt,t.endAt)),this.Cn.set(t,e),e)}On(t,e,n,s,i,a,c){const l=(e!=null?e.length:1)*Math.max(n.length,i.length),h=l/(e!=null?e.length:1),f=[];for(let g=0;g<l;++g){const I=e?this.Nn(e[g/h]):vs,b=this.Bn(t,I,n[g%h],s),P=this.Ln(t,I,i[g%h],a),M=c.map(N=>this.Bn(t,I,N,!0));f.push(...this.createRange(b,P,M))}return f}Bn(t,e,n,s){const i=new He(t,k.empty(),e,n);return s?i:i.In()}Ln(t,e,n,s){const i=new He(t,k.empty(),e,n);return s?i.In():i}Fn(t,e){const n=new Yu(e),s=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment();return this.getFieldIndexes(t,s).next(i=>{let a=null;for(const c of i)n.gn(c)&&(!a||c.fields.length>a.fields.length)&&(a=c);return a})}getIndexType(t,e){let n=2;const s=this.vn(e);return A.forEach(s,i=>this.Fn(t,i).next(a=>{a?n!==0&&a.fields.length<function(l){let h=new et(at.comparator),f=!1;for(const g of l.filters)for(const I of g.getFlattenedFilters())I.field.isKeyField()||(I.op==="array-contains"||I.op==="array-contains-any"?f=!0:h=h.add(I.field));for(const g of l.orderBy)g.field.isKeyField()||(h=h.add(g.field));return h.size+(f?1:0)}(i)&&(n=1):n=0})).next(()=>function(a){return a.limit!==null}(e)&&s.length>1&&n===2?1:n)}kn(t,e){const n=new pr;for(const s of je(t)){const i=e.data.field(s.fieldPath);if(i==null)return null;const a=n.ln(s.kind);Ge.Wt.Dt(i,a)}return n.un()}Nn(t){const e=new pr;return Ge.Wt.Dt(t,e.ln(0)),e.un()}qn(t,e){const n=new pr;return Ge.Wt.Dt(Hr(this.databaseId,e),n.ln(function(i){const a=je(i);return a.length===0?0:a[a.length-1].kind}(t))),n.un()}xn(t,e,n){if(n===null)return[];let s=[];s.push(new pr);let i=0;for(const a of je(t)){const c=n[i++];for(const l of s)if(this.Kn(e,a.fieldPath)&&Qr(c))s=this.Un(s,a,c);else{const h=l.ln(a.kind);Ge.Wt.Dt(c,h)}}return this.$n(s)}Mn(t,e,n){return this.xn(t,e,n.position)}$n(t){const e=[];for(let n=0;n<t.length;++n)e[n]=t[n].un();return e}Un(t,e,n){const s=[...t],i=[];for(const a of n.arrayValue.values||[])for(const c of s){const l=new pr;l.seed(c.un()),Ge.Wt.Dt(a,l.ln(e.kind)),i.push(l)}return i}Kn(t,e){return!!t.filters.find(n=>n instanceof G&&n.field.isEqual(e)&&(n.op==="in"||n.op==="not-in"))}getFieldIndexes(t,e){const n=_r(t),s=pn(t);return(e?n.J(Do,IDBKeyRange.bound(e,e)):n.J()).next(i=>{const a=[];return A.forEach(i,c=>s.get([c.indexId,this.uid]).next(l=>{a.push(function(f,g){const I=g?new Ur(g.sequenceNumber,new Ft(rn(g.readTime),new k(Wt(g.documentKey)),g.largestBatchId)):Ur.empty(),b=f.fields.map(([P,M])=>new Ps(at.fromServerFormat(P),M));return new Ks(f.indexId,f.collectionGroup,b,I)}(c,l))})).next(()=>a)})}getNextCollectionGroupToUpdate(t){return this.getFieldIndexes(t).next(e=>e.length===0?null:(e.sort((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:U(n.collectionGroup,s.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(t,e,n){const s=_r(t),i=pn(t);return this.Wn(t).next(a=>s.J(Do,IDBKeyRange.bound(e,e)).next(c=>A.forEach(c,l=>i.put(Ku(l.indexId,this.uid,a,n)))))}updateIndexEntries(t,e){const n=new Map;return A.forEach(e,(s,i)=>{const a=n.get(s.collectionGroup);return(a?A.resolve(a):this.getFieldIndexes(t,s.collectionGroup)).next(c=>(n.set(s.collectionGroup,c),A.forEach(c,l=>this.Qn(t,s,l).next(h=>{const f=this.Gn(i,l);return h.isEqual(f)?A.resolve():this.zn(t,i,l,h,f)}))))})}jn(t,e,n,s){return gn(t).put(s.Rn(this.uid,this.qn(n,e.key),e.key))}Jn(t,e,n,s){return gn(t).delete(s.An(this.uid,this.qn(n,e.key),e.key))}Qn(t,e,n){const s=gn(t);let i=new et(de);return s.ee({index:Eh,range:IDBKeyRange.only([n.indexId,this.uid,Fs(this.qn(n,e))])},(a,c)=>{i=i.add(new He(n.indexId,e,Ju(c.arrayValue),Ju(c.directionalValue)))}).next(()=>i)}Gn(t,e){let n=new et(de);const s=this.kn(e,t);if(s==null)return n;const i=Po(e);if(i!=null){const a=t.data.field(i.fieldPath);if(Qr(a))for(const c of a.arrayValue.values||[])n=n.add(new He(e.indexId,t.key,this.Nn(c),s))}else n=n.add(new He(e.indexId,t.key,vs,s));return n}zn(t,e,n,s,i){C(Zu,"Updating index entries for document '%s'",e.key);const a=[];return function(l,h,f,g,I){const b=l.getIterator(),P=h.getIterator();let M=fn(b),N=fn(P);for(;M||N;){let K=!1,j=!1;if(M&&N){const q=f(M,N);q<0?j=!0:q>0&&(K=!0)}else M!=null?j=!0:K=!0;K?(g(N),N=fn(P)):j?(I(M),M=fn(b)):(M=fn(b),N=fn(P))}}(s,i,de,c=>{a.push(this.jn(t,e,n,c))},c=>{a.push(this.Jn(t,e,n,c))}),A.waitFor(a)}Wn(t){let e=1;return pn(t).ee({index:Ih,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(n,s,i)=>{i.done(),e=s.sequenceNumber+1}).next(()=>e)}createRange(t,e,n){n=n.sort((a,c)=>de(a,c)).filter((a,c,l)=>!c||de(a,l[c-1])!==0);const s=[];s.push(t);for(const a of n){const c=de(a,t),l=de(a,e);if(c===0)s[0]=t.In();else if(c>0&&l<0)s.push(a),s.push(a.In());else if(l>0)break}s.push(e);const i=[];for(let a=0;a<s.length;a+=2){if(this.Hn(s[a],s[a+1]))return[];const c=s[a].An(this.uid,vs,k.empty()),l=s[a+1].An(this.uid,vs,k.empty());i.push(IDBKeyRange.bound(c,l))}return i}Hn(t,e){return de(t,e)>0}getMinOffsetFromCollectionGroup(t,e){return this.getFieldIndexes(t,e).next(el)}getMinOffset(t,e){return A.mapArray(this.vn(e),n=>this.Fn(t,n).next(s=>s||O(44426))).next(el)}}function tl(r){return pt(r,zr)}function gn(r){return pt(r,Dr)}function _r(r){return pt(r,oa)}function pn(r){return pt(r,Cr)}function el(r){L(r.length!==0,28825);let t=r[0].indexState.offset,e=t.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;ra(s,t)<0&&(t=s),e<s.largestBatchId&&(e=s.largestBatchId)}return new Ft(t.readTime,t.documentKey,e)}/**
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
 */const nl={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Rd=41943040;class vt{static withCacheSize(t){return new vt(t,vt.DEFAULT_COLLECTION_PERCENTILE,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}/**
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
 */function Sd(r,t,e){const n=r.store(Bt),s=r.store(Vn),i=[],a=IDBKeyRange.only(e.batchId);let c=0;const l=n.ee({range:a},(f,g,I)=>(c++,I.delete()));i.push(l.next(()=>{L(c===1,47070,{batchId:e.batchId})}));const h=[];for(const f of e.mutations){const g=ph(t,f.key.path,e.batchId);i.push(s.delete(g)),h.push(f.key)}return A.waitFor(i).next(()=>h)}function ri(r){if(!r)return 0;let t;if(r.document)t=r.document;else if(r.unknownDocument)t=r.unknownDocument;else{if(!r.noDocument)throw O(14731);t=r.noDocument}return JSON.stringify(t).length}/**
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
 */vt.DEFAULT_COLLECTION_PERCENTILE=10,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,vt.DEFAULT=new vt(Rd,vt.DEFAULT_COLLECTION_PERCENTILE,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),vt.DISABLED=new vt(-1,0,0);class Ri{constructor(t,e,n,s){this.userId=t,this.serializer=e,this.indexManager=n,this.referenceDelegate=s,this.Zn={}}static wt(t,e,n,s){L(t.uid!=="",64387);const i=t.isAuthenticated()?t.uid:"";return new Ri(i,e,n,s)}checkEmpty(t){let e=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return fe(t).ee({index:Qe,range:n},(s,i,a)=>{e=!1,a.done()}).next(()=>e)}addMutationBatch(t,e,n,s){const i=Tn(t),a=fe(t);return a.add({}).next(c=>{L(typeof c=="number",49019);const l=new ga(c,e,n,s),h=function(b,P,M){const N=M.baseMutations.map(j=>ti(b.yt,j)),K=M.mutations.map(j=>ti(b.yt,j));return{userId:P,batchId:M.batchId,localWriteTimeMs:M.localWriteTime.toMillis(),baseMutations:N,mutations:K}}(this.serializer,this.userId,l),f=[];let g=new et((I,b)=>U(I.canonicalString(),b.canonicalString()));for(const I of s){const b=ph(this.userId,I.key.path,c);g=g.add(I.key.path.popLast()),f.push(a.put(h)),f.push(i.put(b,np))}return g.forEach(I=>{f.push(this.indexManager.addToCollectionParentIndex(t,I))}),t.addOnCommittedListener(()=>{this.Zn[c]=l.keys()}),A.waitFor(f).next(()=>l)})}lookupMutationBatch(t,e){return fe(t).get(e).next(n=>n?(L(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:e}),Ke(this.serializer,n)):null)}Xn(t,e){return this.Zn[e]?A.resolve(this.Zn[e]):this.lookupMutationBatch(t,e).next(n=>{if(n){const s=n.keys();return this.Zn[e]=s,s}return null})}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return fe(t).ee({index:Qe,range:s},(a,c,l)=>{c.userId===this.userId&&(L(c.batchId>=n,47524,{Yn:n}),i=Ke(this.serializer,c)),l.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(t){const e=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=We;return fe(t).ee({index:Qe,range:e,reverse:!0},(s,i,a)=>{n=i.batchId,a.done()}).next(()=>n)}getAllMutationBatches(t){const e=IDBKeyRange.bound([this.userId,We],[this.userId,Number.POSITIVE_INFINITY]);return fe(t).J(Qe,e).next(n=>n.map(s=>Ke(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(t,e){const n=Cs(this.userId,e.path),s=IDBKeyRange.lowerBound(n),i=[];return Tn(t).ee({range:s},(a,c,l)=>{const[h,f,g]=a,I=Wt(f);if(h===this.userId&&e.path.isEqual(I))return fe(t).get(g).next(b=>{if(!b)throw O(61480,{er:a,batchId:g});L(b.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:b.userId,batchId:g}),i.push(Ke(this.serializer,b))});l.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new et(U);const s=[];return e.forEach(i=>{const a=Cs(this.userId,i.path),c=IDBKeyRange.lowerBound(a),l=Tn(t).ee({range:c},(h,f,g)=>{const[I,b,P]=h,M=Wt(b);I===this.userId&&i.path.isEqual(M)?n=n.add(P):g.done()});s.push(l)}),A.waitFor(s).next(()=>this.tr(t,n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1,i=Cs(this.userId,n),a=IDBKeyRange.lowerBound(i);let c=new et(U);return Tn(t).ee({range:a},(l,h,f)=>{const[g,I,b]=l,P=Wt(I);g===this.userId&&n.isPrefixOf(P)?P.length===s&&(c=c.add(b)):f.done()}).next(()=>this.tr(t,c))}tr(t,e){const n=[],s=[];return e.forEach(i=>{s.push(fe(t).get(i).next(a=>{if(a===null)throw O(35274,{batchId:i});L(a.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:a.userId,batchId:i}),n.push(Ke(this.serializer,a))}))}),A.waitFor(s).next(()=>n)}removeMutationBatch(t,e){return Sd(t.le,this.userId,e).next(n=>(t.addOnCommittedListener(()=>{this.nr(e.batchId)}),A.forEach(n,s=>this.referenceDelegate.markPotentiallyOrphaned(t,s))))}nr(t){delete this.Zn[t]}performConsistencyCheck(t){return this.checkEmpty(t).next(e=>{if(!e)return A.resolve();const n=IDBKeyRange.lowerBound(function(a){return[a]}(this.userId)),s=[];return Tn(t).ee({range:n},(i,a,c)=>{if(i[0]===this.userId){const l=Wt(i[1]);s.push(l)}else c.done()}).next(()=>{L(s.length===0,56720,{rr:s.map(i=>i.canonicalString())})})})}containsKey(t,e){return Vd(t,this.userId,e)}ir(t){return Pd(t).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:We,lastStreamToken:""})}}function Vd(r,t,e){const n=Cs(t,e.path),s=n[1],i=IDBKeyRange.lowerBound(n);let a=!1;return Tn(r).ee({range:i,Y:!0},(c,l,h)=>{const[f,g,I]=c;f===t&&g===s&&(a=!0),h.done()}).next(()=>a)}function fe(r){return pt(r,Bt)}function Tn(r){return pt(r,Vn)}function Pd(r){return pt(r,jr)}/**
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
 */class sn{constructor(t){this.sr=t}next(){return this.sr+=2,this.sr}static _r(){return new sn(0)}static ar(){return new sn(-1)}}/**
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
 */class D_{constructor(t,e){this.referenceDelegate=t,this.serializer=e}allocateTargetId(t){return this.ur(t).next(e=>{const n=new sn(e.highestTargetId);return e.highestTargetId=n.next(),this.cr(t,e).next(()=>e.highestTargetId)})}getLastRemoteSnapshotVersion(t){return this.ur(t).next(e=>B.fromTimestamp(new Z(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(t){return this.ur(t).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(t,e,n){return this.ur(t).next(s=>(s.highestListenSequenceNumber=e,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),e>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=e),this.cr(t,s)))}addTargetData(t,e){return this.lr(t,e).next(()=>this.ur(t).next(n=>(n.targetCount+=1,this.hr(e,n),this.cr(t,n))))}updateTargetData(t,e){return this.lr(t,e)}removeTargetData(t,e){return this.removeMatchingKeysForTargetId(t,e.targetId).next(()=>_n(t).delete(e.targetId)).next(()=>this.ur(t)).next(n=>(L(n.targetCount>0,8065),n.targetCount-=1,this.cr(t,n)))}removeTargets(t,e,n){let s=0;const i=[];return _n(t).ee((a,c)=>{const l=Rr(c);l.sequenceNumber<=e&&n.get(l.targetId)===null&&(s++,i.push(this.removeTargetData(t,l)))}).next(()=>A.waitFor(i)).next(()=>s)}forEachTarget(t,e){return _n(t).ee((n,s)=>{const i=Rr(s);e(i)})}ur(t){return rl(t).get(Qs).next(e=>(L(e!==null,2888),e))}cr(t,e){return rl(t).put(Qs,e)}lr(t,e){return _n(t).put(wd(this.serializer,e))}hr(t,e){let n=!1;return t.targetId>e.highestTargetId&&(e.highestTargetId=t.targetId,n=!0),t.sequenceNumber>e.highestListenSequenceNumber&&(e.highestListenSequenceNumber=t.sequenceNumber,n=!0),n}getTargetCount(t){return this.ur(t).next(e=>e.targetCount)}getTargetData(t,e){const n=en(e),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return _n(t).ee({range:s,index:yh},(a,c,l)=>{const h=Rr(c);ts(e,h.target)&&(i=h,l.done())}).next(()=>i)}addMatchingKeys(t,e,n){const s=[],i=pe(t);return e.forEach(a=>{const c=bt(a.path);s.push(i.put({targetId:n,path:c})),s.push(this.referenceDelegate.addReference(t,n,a))}),A.waitFor(s)}removeMatchingKeys(t,e,n){const s=pe(t);return A.forEach(e,i=>{const a=bt(i.path);return A.waitFor([s.delete([n,a]),this.referenceDelegate.removeReference(t,n,i)])})}removeMatchingKeysForTargetId(t,e){const n=pe(t),s=IDBKeyRange.bound([e],[e+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(t,e){const n=IDBKeyRange.bound([e],[e+1],!1,!0),s=pe(t);let i=z();return s.ee({range:n,Y:!0},(a,c,l)=>{const h=Wt(a[1]),f=new k(h);i=i.add(f)}).next(()=>i)}containsKey(t,e){const n=bt(e.path),s=IDBKeyRange.bound([n],[ah(n)],!1,!0);let i=0;return pe(t).ee({index:ia,Y:!0,range:s},([a,c],l,h)=>{a!==0&&(i++,h.done())}).next(()=>i>0)}At(t,e){return _n(t).get(e).next(n=>n?Rr(n):null)}}function _n(r){return pt(r,Pn)}function rl(r){return pt(r,Je)}function pe(r){return pt(r,Cn)}/**
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
 */const sl="LruGarbageCollector",x_=1048576;function il([r,t],[e,n]){const s=U(r,e);return s===0?U(t,n):s}class N_{constructor(t){this.Pr=t,this.buffer=new et(il),this.Tr=0}Er(){return++this.Tr}Ir(t){const e=[t,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(e);else{const n=this.buffer.last();il(e,n)<0&&(this.buffer=this.buffer.delete(n).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Cd{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(t){C(sl,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Pe(e)?C(sl,"Ignoring IndexedDB error during garbage collection: ",e):await Ve(e)}await this.Ar(3e5)})}}class k_{constructor(t,e){this.Vr=t,this.params=e}calculateTargetCount(t,e){return this.Vr.dr(t).next(n=>Math.floor(e/100*n))}nthSequenceNumber(t,e){if(e===0)return A.resolve(Dt.ce);const n=new N_(e);return this.Vr.forEachTarget(t,s=>n.Ir(s.sequenceNumber)).next(()=>this.Vr.mr(t,s=>n.Ir(s))).next(()=>n.maxValue)}removeTargets(t,e,n){return this.Vr.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.Vr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(C("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(nl)):this.getCacheSize(t).next(n=>n<this.params.cacheSizeCollectionThreshold?(C("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),nl):this.gr(t,e))}getCacheSize(t){return this.Vr.getCacheSize(t)}gr(t,e){let n,s,i,a,c,l,h;const f=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(g=>(g>this.params.maximumSequenceNumbersToCollect?(C("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),s=this.params.maximumSequenceNumbersToCollect):s=g,a=Date.now(),this.nthSequenceNumber(t,s))).next(g=>(n=g,c=Date.now(),this.removeTargets(t,n,e))).next(g=>(i=g,l=Date.now(),this.removeOrphanedDocuments(t,n))).next(g=>(h=Date.now(),yn()<=Q.DEBUG&&C("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${g} documents in `+(h-l)+`ms
Total Duration: ${h-f}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:g})))}}function Dd(r,t){return new k_(r,t)}/**
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
 */class M_{constructor(t,e){this.db=t,this.garbageCollector=Dd(this,e)}dr(t){const e=this.pr(t);return this.db.getTargetCache().getTargetCount(t).next(n=>e.next(s=>n+s))}pr(t){let e=0;return this.mr(t,n=>{e++}).next(()=>e)}forEachTarget(t,e){return this.db.getTargetCache().forEachTarget(t,e)}mr(t,e){return this.yr(t,(n,s)=>e(s))}addReference(t,e,n){return bs(t,n)}removeReference(t,e,n){return bs(t,n)}removeTargets(t,e,n){return this.db.getTargetCache().removeTargets(t,e,n)}markPotentiallyOrphaned(t,e){return bs(t,e)}wr(t,e){return function(s,i){let a=!1;return Pd(s).te(c=>Vd(s,c,i).next(l=>(l&&(a=!0),A.resolve(!l)))).next(()=>a)}(t,e)}removeOrphanedDocuments(t,e){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.yr(t,(a,c)=>{if(c<=e){const l=this.wr(t,a).next(h=>{if(!h)return i++,n.getEntry(t,a).next(()=>(n.removeEntry(a,B.min()),pe(t).delete(function(g){return[0,bt(g.path)]}(a))))});s.push(l)}}).next(()=>A.waitFor(s)).next(()=>n.apply(t)).next(()=>i)}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(t,n)}updateLimboDocument(t,e){return bs(t,e)}yr(t,e){const n=pe(t);let s,i=Dt.ce;return n.ee({index:ia},([a,c],{path:l,sequenceNumber:h})=>{a===0?(i!==Dt.ce&&e(new k(Wt(s)),i),i=h,s=l):i=Dt.ce}).next(()=>{i!==Dt.ce&&e(new k(Wt(s)),i)})}getCacheSize(t){return this.db.getRemoteDocumentCache().getSize(t)}}function bs(r,t){return pe(r).put(function(n,s){return{targetId:0,path:bt(n.path),sequenceNumber:s}}(t,r.currentSequenceNumber))}/**
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
 */class xd{constructor(){this.changes=new se(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,ut.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return n!==void 0?A.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
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
 */class O_{constructor(t){this.serializer=t}setIndexManager(t){this.indexManager=t}addEntry(t,e,n){return Ue(t).put(n)}removeEntry(t,e,n){return Ue(t).delete(function(i,a){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],ei(a),c[c.length-1]]}(e,n))}updateMetadata(t,e){return this.getMetadata(t).next(n=>(n.byteSize+=e,this.Sr(t,n)))}getEntry(t,e){let n=ut.newInvalidDocument(e);return Ue(t).ee({index:Ds,range:IDBKeyRange.only(yr(e))},(s,i)=>{n=this.br(e,i)}).next(()=>n)}Dr(t,e){let n={size:0,document:ut.newInvalidDocument(e)};return Ue(t).ee({index:Ds,range:IDBKeyRange.only(yr(e))},(s,i)=>{n={document:this.br(e,i),size:ri(i)}}).next(()=>n)}getEntries(t,e){let n=Mt();return this.Cr(t,e,(s,i)=>{const a=this.br(s,i);n=n.insert(s,a)}).next(()=>n)}vr(t,e){let n=Mt(),s=new rt(k.comparator);return this.Cr(t,e,(i,a)=>{const c=this.br(i,a);n=n.insert(i,c),s=s.insert(i,ri(a))}).next(()=>({documents:n,Fr:s}))}Cr(t,e,n){if(e.isEmpty())return A.resolve();let s=new et(cl);e.forEach(l=>s=s.add(l));const i=IDBKeyRange.bound(yr(s.first()),yr(s.last())),a=s.getIterator();let c=a.getNext();return Ue(t).ee({index:Ds,range:i},(l,h,f)=>{const g=k.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;c&&cl(c,g)<0;)n(c,null),c=a.getNext();c&&c.isEqual(g)&&(n(c,h),c=a.hasNext()?a.getNext():null),c?f.j(yr(c)):f.done()}).next(()=>{for(;c;)n(c,null),c=a.hasNext()?a.getNext():null})}getDocumentsMatchingQuery(t,e,n,s,i){const a=e.path,c=[a.popLast().toArray(),a.lastSegment(),ei(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],l=[a.popLast().toArray(),a.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Ue(t).J(IDBKeyRange.bound(c,l,!0)).next(h=>{i==null||i.incrementDocumentReadCount(h.length);let f=Mt();for(const g of h){const I=this.br(k.fromSegments(g.prefixPath.concat(g.collectionGroup,g.documentId)),g);I.isFoundDocument()&&(es(e,I)||s.has(I.key))&&(f=f.insert(I.key,I))}return f})}getAllFromCollectionGroup(t,e,n,s){let i=Mt();const a=al(e,n),c=al(e,Ft.max());return Ue(t).ee({index:_h,range:IDBKeyRange.bound(a,c,!0)},(l,h,f)=>{const g=this.br(k.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(g.key,g),i.size===s&&f.done()}).next(()=>i)}newChangeBuffer(t){return new F_(this,!!t&&t.trackRemovals)}getSize(t){return this.getMetadata(t).next(e=>e.byteSize)}getMetadata(t){return ol(t).get(Co).next(e=>(L(!!e,20021),e))}Sr(t,e){return ol(t).put(Co,e)}br(t,e){if(e){const n=T_(this.serializer,e);if(!(n.isNoDocument()&&n.version.isEqual(B.min())))return n}return ut.newInvalidDocument(t)}}function Nd(r){return new O_(r)}class F_ extends xd{constructor(t,e){super(),this.Mr=t,this.trackRemovals=e,this.Or=new se(n=>n.toString(),(n,s)=>n.isEqual(s))}applyChanges(t){const e=[];let n=0,s=new et((i,a)=>U(i.canonicalString(),a.canonicalString()));return this.changes.forEach((i,a)=>{const c=this.Or.get(i);if(e.push(this.Mr.removeEntry(t,i,c.readTime)),a.isValidDocument()){const l=$u(this.Mr.serializer,a);s=s.add(i.path.popLast());const h=ri(l);n+=h-c.size,e.push(this.Mr.addEntry(t,i,l))}else if(n-=c.size,this.trackRemovals){const l=$u(this.Mr.serializer,a.convertToNoDocument(B.min()));e.push(this.Mr.addEntry(t,i,l))}}),s.forEach(i=>{e.push(this.Mr.indexManager.addToCollectionParentIndex(t,i))}),e.push(this.Mr.updateMetadata(t,n)),A.waitFor(e)}getFromCache(t,e){return this.Mr.Dr(t,e).next(n=>(this.Or.set(e,{size:n.size,readTime:n.document.readTime}),n.document))}getAllFromCache(t,e){return this.Mr.vr(t,e).next(({documents:n,Fr:s})=>(s.forEach((i,a)=>{this.Or.set(i,{size:a,readTime:n.get(i).readTime})}),n))}}function ol(r){return pt(r,$r)}function Ue(r){return pt(r,Hs)}function yr(r){const t=r.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function al(r,t){const e=t.documentKey.path.toArray();return[r,ei(t.readTime),e.slice(0,e.length-2),e.length>0?e[e.length-1]:""]}function cl(r,t){const e=r.path.toArray(),n=t.path.toArray();let s=0;for(let i=0;i<e.length-2&&i<n.length-2;++i)if(s=U(e[i],n[i]),s)return s;return s=U(e.length,n.length),s||(s=U(e[e.length-2],n[n.length-2]),s||U(e[e.length-1],n[n.length-1]))}/**
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
 */class L_{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
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
 */class kd{constructor(t,e,n,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=s}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(n=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(n!==null&&Mr(n.mutation,s,xt.empty(),Z.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.getLocalViewOfDocuments(t,n,z()).next(()=>n))}getLocalViewOfDocuments(t,e,n=z()){const s=Jt();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,n).next(i=>{let a=vr();return i.forEach((c,l)=>{a=a.insert(c,l.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const n=Jt();return this.populateOverlays(t,n,e).next(()=>this.computeViews(t,e,n,z()))}populateOverlays(t,e,n){const s=[];return n.forEach(i=>{e.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(t,s).next(i=>{i.forEach((a,c)=>{e.set(a,c)})})}computeViews(t,e,n,s){let i=Mt();const a=kr(),c=function(){return kr()}();return e.forEach((l,h)=>{const f=n.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof ie)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),Mr(f.mutation,h,f.mutation.getFieldMask(),Z.now())):a.set(h.key,xt.empty())}),this.recalculateAndSaveOverlays(t,i).next(l=>(l.forEach((h,f)=>a.set(h,f)),e.forEach((h,f)=>c.set(h,new L_(f,a.get(h)??null))),c))}recalculateAndSaveOverlays(t,e){const n=kr();let s=new rt((a,c)=>a-c),i=z();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const c of a)c.keys().forEach(l=>{const h=e.get(l);if(h===null)return;let f=n.get(l)||xt.empty();f=c.applyToLocalView(h,f),n.set(l,f);const g=(s.get(c.batchId)||z()).add(l);s=s.insert(c.batchId,g)})}).next(()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),h=l.key,f=l.value,g=Yh();f.forEach(I=>{if(!i.has(I)){const b=sd(e.get(I),n.get(I));b!==null&&g.set(I,b),i=i.add(I)}}),a.push(this.documentOverlayCache.saveOverlays(t,h,g))}return A.waitFor(a)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.recalculateAndSaveOverlays(t,n))}getDocumentsMatchingQuery(t,e,n,s){return Up(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):zh(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,s):this.getDocumentsMatchingCollectionQuery(t,e,n,s)}getNextDocuments(t,e,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,s-i.size):A.resolve(Jt());let c=Sn,l=i;return a.next(h=>A.forEach(h,(f,g)=>(c<g.largestBatchId&&(c=g.largestBatchId),i.get(f)?A.resolve():this.remoteDocumentCache.getEntry(t,f).next(I=>{l=l.insert(f,I)}))).next(()=>this.populateOverlays(t,h,i)).next(()=>this.computeViews(t,l,h,z())).next(f=>({batchId:c,changes:Jh(f)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new k(e)).next(n=>{let s=vr();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,n,s){const i=e.collectionGroup;let a=vr();return this.indexManager.getCollectionParents(t,i).next(c=>A.forEach(c,l=>{const h=function(g,I){return new Gn(I,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(e,l.child(i));return this.getDocumentsMatchingCollectionQuery(t,h,n,s).next(f=>{f.forEach((g,I)=>{a=a.insert(g,I)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,i,s))).next(a=>{i.forEach((l,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,ut.newInvalidDocument(f)))});let c=vr();return a.forEach((l,h)=>{const f=i.get(l);f!==void 0&&Mr(f.mutation,h,xt.empty(),Z.now()),es(e,h)&&(c=c.insert(l,h))}),c})}}/**
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
 */class B_{constructor(t){this.serializer=t,this.Nr=new Map,this.Br=new Map}getBundleMetadata(t,e){return A.resolve(this.Nr.get(e))}saveBundleMetadata(t,e){return this.Nr.set(e.id,function(s){return{id:s.id,version:s.version,createTime:Pt(s.createTime)}}(e)),A.resolve()}getNamedQuery(t,e){return A.resolve(this.Br.get(e))}saveNamedQuery(t,e){return this.Br.set(e.name,function(s){return{name:s.name,query:Ad(s.bundledQuery),readTime:Pt(s.readTime)}}(e)),A.resolve()}}/**
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
 */class U_{constructor(){this.overlays=new rt(k.comparator),this.Lr=new Map}getOverlay(t,e){return A.resolve(this.overlays.get(e))}getOverlays(t,e){const n=Jt();return A.forEach(e,s=>this.getOverlay(t,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(t,e,n){return n.forEach((s,i)=>{this.St(t,e,i)}),A.resolve()}removeOverlaysForBatchId(t,e,n){const s=this.Lr.get(n);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Lr.delete(n)),A.resolve()}getOverlaysForCollection(t,e,n){const s=Jt(),i=e.length+1,a=new k(e.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const l=c.getNext().value,h=l.getKey();if(!e.isPrefixOf(h.path))break;h.path.length===i&&l.largestBatchId>n&&s.set(l.getKey(),l)}return A.resolve(s)}getOverlaysForCollectionGroup(t,e,n,s){let i=new rt((h,f)=>h-f);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===e&&h.largestBatchId>n){let f=i.get(h.largestBatchId);f===null&&(f=Jt(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=Jt(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((h,f)=>c.set(h,f)),!(c.size()>=s)););return A.resolve(c)}St(t,e,n){const s=this.overlays.get(n.key);if(s!==null){const a=this.Lr.get(s.largestBatchId).delete(n.key);this.Lr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new _a(e,n));let i=this.Lr.get(e);i===void 0&&(i=z(),this.Lr.set(e,i)),this.Lr.set(e,i.add(n.key))}}/**
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
 */class q_{constructor(){this.sessionToken=ht.EMPTY_BYTE_STRING}getSessionToken(t){return A.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,A.resolve()}}/**
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
 */class Aa{constructor(){this.kr=new et(yt.qr),this.Kr=new et(yt.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(t,e){const n=new yt(t,e);this.kr=this.kr.add(n),this.Kr=this.Kr.add(n)}$r(t,e){t.forEach(n=>this.addReference(n,e))}removeReference(t,e){this.Wr(new yt(t,e))}Qr(t,e){t.forEach(n=>this.removeReference(n,e))}Gr(t){const e=new k(new Y([])),n=new yt(e,t),s=new yt(e,t+1),i=[];return this.Kr.forEachInRange([n,s],a=>{this.Wr(a),i.push(a.key)}),i}zr(){this.kr.forEach(t=>this.Wr(t))}Wr(t){this.kr=this.kr.delete(t),this.Kr=this.Kr.delete(t)}jr(t){const e=new k(new Y([])),n=new yt(e,t),s=new yt(e,t+1);let i=z();return this.Kr.forEachInRange([n,s],a=>{i=i.add(a.key)}),i}containsKey(t){const e=new yt(t,0),n=this.kr.firstAfterOrEqual(e);return n!==null&&t.isEqual(n.key)}}class yt{constructor(t,e){this.key=t,this.Jr=e}static qr(t,e){return k.comparator(t.key,e.key)||U(t.Jr,e.Jr)}static Ur(t,e){return U(t.Jr,e.Jr)||k.comparator(t.key,e.key)}}/**
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
 */class j_{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Yn=1,this.Hr=new et(yt.qr)}checkEmpty(t){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,n,s){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new ga(i,e,n,s);this.mutationQueue.push(a);for(const c of s)this.Hr=this.Hr.add(new yt(c.key,i)),this.indexManager.addToCollectionParentIndex(t,c.key.path.popLast());return A.resolve(a)}lookupMutationBatch(t,e){return A.resolve(this.Zr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=this.Xr(n),i=s<0?0:s;return A.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?We:this.Yn-1)}getAllMutationBatches(t){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new yt(e,0),s=new yt(e,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([n,s],a=>{const c=this.Zr(a.Jr);i.push(c)}),A.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new et(U);return e.forEach(s=>{const i=new yt(s,0),a=new yt(s,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([i,a],c=>{n=n.add(c.Jr)})}),A.resolve(this.Yr(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1;let i=n;k.isDocumentKey(i)||(i=i.child(""));const a=new yt(new k(i),0);let c=new et(U);return this.Hr.forEachWhile(l=>{const h=l.key.path;return!!n.isPrefixOf(h)&&(h.length===s&&(c=c.add(l.Jr)),!0)},a),A.resolve(this.Yr(c))}Yr(t){const e=[];return t.forEach(n=>{const s=this.Zr(n);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){L(this.ei(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Hr;return A.forEach(e.mutations,s=>{const i=new yt(s.key,e.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.Hr=n})}nr(t){}containsKey(t,e){const n=new yt(e,0),s=this.Hr.firstAfterOrEqual(n);return A.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,A.resolve()}ei(t,e){return this.Xr(t)}Xr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Zr(t){const e=this.Xr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
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
 */class $_{constructor(t){this.ti=t,this.docs=function(){return new rt(k.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,s=this.docs.get(n),i=s?s.size:0,a=this.ti(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return A.resolve(n?n.document.mutableCopy():ut.newInvalidDocument(e))}getEntries(t,e){let n=Mt();return e.forEach(s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():ut.newInvalidDocument(s))}),A.resolve(n)}getDocumentsMatchingQuery(t,e,n,s){let i=Mt();const a=e.path,c=new k(a.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:h,value:{document:f}}=l.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||ra(hh(f),n)<=0||(s.has(f.key)||es(e,f))&&(i=i.insert(f.key,f.mutableCopy()))}return A.resolve(i)}getAllFromCollectionGroup(t,e,n,s){O(9500)}ni(t,e){return A.forEach(this.docs,n=>e(n))}newChangeBuffer(t){return new z_(this)}getSize(t){return A.resolve(this.size)}}class z_ extends xd{constructor(t){super(),this.Mr=t}applyChanges(t){const e=[];return this.changes.forEach((n,s)=>{s.isValidDocument()?e.push(this.Mr.addEntry(t,s)):this.Mr.removeEntry(n)}),A.waitFor(e)}getFromCache(t,e){return this.Mr.getEntry(t,e)}getAllFromCache(t,e){return this.Mr.getEntries(t,e)}}/**
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
 */class K_{constructor(t){this.persistence=t,this.ri=new se(e=>en(e),ts),this.lastRemoteSnapshotVersion=B.min(),this.highestTargetId=0,this.ii=0,this.si=new Aa,this.targetCount=0,this.oi=sn._r()}forEachTarget(t,e){return this.ri.forEach((n,s)=>e(s)),A.resolve()}getLastRemoteSnapshotVersion(t){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return A.resolve(this.ii)}allocateTargetId(t){return this.highestTargetId=this.oi.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.ii&&(this.ii=e),A.resolve()}lr(t){this.ri.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.oi=new sn(e),this.highestTargetId=e),t.sequenceNumber>this.ii&&(this.ii=t.sequenceNumber)}addTargetData(t,e){return this.lr(e),this.targetCount+=1,A.resolve()}updateTargetData(t,e){return this.lr(e),A.resolve()}removeTargetData(t,e){return this.ri.delete(e.target),this.si.Gr(e.targetId),this.targetCount-=1,A.resolve()}removeTargets(t,e,n){let s=0;const i=[];return this.ri.forEach((a,c)=>{c.sequenceNumber<=e&&n.get(c.targetId)===null&&(this.ri.delete(a),i.push(this.removeMatchingKeysForTargetId(t,c.targetId)),s++)}),A.waitFor(i).next(()=>s)}getTargetCount(t){return A.resolve(this.targetCount)}getTargetData(t,e){const n=this.ri.get(e)||null;return A.resolve(n)}addMatchingKeys(t,e,n){return this.si.$r(e,n),A.resolve()}removeMatchingKeys(t,e,n){this.si.Qr(e,n);const s=this.persistence.referenceDelegate,i=[];return s&&e.forEach(a=>{i.push(s.markPotentiallyOrphaned(t,a))}),A.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this.si.Gr(e),A.resolve()}getMatchingKeysForTargetId(t,e){const n=this.si.jr(e);return A.resolve(n)}containsKey(t,e){return A.resolve(this.si.containsKey(e))}}/**
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
 */class va{constructor(t,e){this._i={},this.overlays={},this.ai=new Dt(0),this.ui=!1,this.ui=!0,this.ci=new q_,this.referenceDelegate=t(this),this.li=new K_(this),this.indexManager=new P_,this.remoteDocumentCache=function(s){return new $_(s)}(n=>this.referenceDelegate.hi(n)),this.serializer=new Td(e),this.Pi=new B_(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new U_,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this._i[t.toKey()];return n||(n=new j_(e,this.referenceDelegate),this._i[t.toKey()]=n),n}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(t,e,n){C("MemoryPersistence","Starting transaction:",t);const s=new G_(this.ai.next());return this.referenceDelegate.Ti(),n(s).next(i=>this.referenceDelegate.Ei(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ii(t,e){return A.or(Object.values(this._i).map(n=>()=>n.containsKey(t,e)))}}class G_ extends fh{constructor(t){super(),this.currentSequenceNumber=t}}class Si{constructor(t){this.persistence=t,this.Ri=new Aa,this.Ai=null}static Vi(t){return new Si(t)}get di(){if(this.Ai)return this.Ai;throw O(60996)}addReference(t,e,n){return this.Ri.addReference(n,e),this.di.delete(n.toString()),A.resolve()}removeReference(t,e,n){return this.Ri.removeReference(n,e),this.di.add(n.toString()),A.resolve()}markPotentiallyOrphaned(t,e){return this.di.add(e.toString()),A.resolve()}removeTarget(t,e){this.Ri.Gr(e.targetId).forEach(s=>this.di.add(s.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(i=>this.di.add(i.toString()))}).next(()=>n.removeTargetData(t,e))}Ti(){this.Ai=new Set}Ei(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.di,n=>{const s=k.fromPath(n);return this.mi(t,s).next(i=>{i||e.removeEntry(s,B.min())})}).next(()=>(this.Ai=null,e.apply(t)))}updateLimboDocument(t,e){return this.mi(t,e).next(n=>{n?this.di.delete(e.toString()):this.di.add(e.toString())})}hi(t){return 0}mi(t,e){return A.or([()=>A.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ii(t,e)])}}class si{constructor(t,e){this.persistence=t,this.fi=new se(n=>bt(n.path),(n,s)=>n.isEqual(s)),this.garbageCollector=Dd(this,e)}static Vi(t,e){return new si(t,e)}Ti(){}Ei(t){return A.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}dr(t){const e=this.pr(t);return this.persistence.getTargetCache().getTargetCount(t).next(n=>e.next(s=>n+s))}pr(t){let e=0;return this.mr(t,n=>{e++}).next(()=>e)}mr(t,e){return A.forEach(this.fi,(n,s)=>this.wr(t,n,s).next(i=>i?A.resolve():e(s)))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ni(t,a=>this.wr(t,a,e).next(c=>{c||(n++,i.removeEntry(a,B.min()))})).next(()=>i.apply(t)).next(()=>n)}markPotentiallyOrphaned(t,e){return this.fi.set(e,t.currentSequenceNumber),A.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.fi.set(n,t.currentSequenceNumber),A.resolve()}removeReference(t,e,n){return this.fi.set(n,t.currentSequenceNumber),A.resolve()}updateLimboDocument(t,e){return this.fi.set(e,t.currentSequenceNumber),A.resolve()}hi(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Ns(t.data.value)),e}wr(t,e,n){return A.or([()=>this.persistence.Ii(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.fi.get(e);return A.resolve(s!==void 0&&s>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
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
 */class H_{constructor(t){this.serializer=t}k(t,e,n,s){const i=new fi("createOrUpgrade",e);n<1&&s>=1&&(function(l){l.createObjectStore(Zr)}(t),function(l){l.createObjectStore(jr,{keyPath:ep}),l.createObjectStore(Bt,{keyPath:Iu,autoIncrement:!0}).createIndex(Qe,Eu,{unique:!0}),l.createObjectStore(Vn)}(t),ul(t),function(l){l.createObjectStore($e)}(t));let a=A.resolve();return n<3&&s>=3&&(n!==0&&(function(l){l.deleteObjectStore(Cn),l.deleteObjectStore(Pn),l.deleteObjectStore(Je)}(t),ul(t)),a=a.next(()=>function(l){const h=l.store(Je),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:B.min().toTimestamp(),targetCount:0};return h.put(Qs,f)}(i))),n<4&&s>=4&&(n!==0&&(a=a.next(()=>function(l,h){return h.store(Bt).J().next(g=>{l.deleteObjectStore(Bt),l.createObjectStore(Bt,{keyPath:Iu,autoIncrement:!0}).createIndex(Qe,Eu,{unique:!0});const I=h.store(Bt),b=g.map(P=>I.put(P));return A.waitFor(b)})}(t,i))),a=a.next(()=>{(function(l){l.createObjectStore(Dn,{keyPath:lp})})(t)})),n<5&&s>=5&&(a=a.next(()=>this.gi(i))),n<6&&s>=6&&(a=a.next(()=>(function(l){l.createObjectStore($r)}(t),this.pi(i)))),n<7&&s>=7&&(a=a.next(()=>this.yi(i))),n<8&&s>=8&&(a=a.next(()=>this.wi(t,i))),n<9&&s>=9&&(a=a.next(()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(t)})),n<10&&s>=10&&(a=a.next(()=>this.Si(i))),n<11&&s>=11&&(a=a.next(()=>{(function(l){l.createObjectStore(gi,{keyPath:hp})})(t),function(l){l.createObjectStore(pi,{keyPath:dp})}(t)})),n<12&&s>=12&&(a=a.next(()=>{(function(l){const h=l.createObjectStore(_i,{keyPath:Ip});h.createIndex(xo,Ep,{unique:!1}),h.createIndex(Th,Tp,{unique:!1})})(t)})),n<13&&s>=13&&(a=a.next(()=>function(l){const h=l.createObjectStore(Hs,{keyPath:rp});h.createIndex(Ds,sp),h.createIndex(_h,ip)}(t)).next(()=>this.bi(t,i)).next(()=>t.deleteObjectStore($e))),n<14&&s>=14&&(a=a.next(()=>this.Di(t,i))),n<15&&s>=15&&(a=a.next(()=>function(l){l.createObjectStore(oa,{keyPath:fp,autoIncrement:!0}).createIndex(Do,mp,{unique:!1}),l.createObjectStore(Cr,{keyPath:gp}).createIndex(Ih,pp,{unique:!1}),l.createObjectStore(Dr,{keyPath:_p}).createIndex(Eh,yp,{unique:!1})}(t))),n<16&&s>=16&&(a=a.next(()=>{e.objectStore(Cr).clear()}).next(()=>{e.objectStore(Dr).clear()})),n<17&&s>=17&&(a=a.next(()=>{(function(l){l.createObjectStore(aa,{keyPath:wp})})(t)})),n<18&&s>=18&&jl()&&(a=a.next(()=>{e.objectStore(Cr).clear()}).next(()=>{e.objectStore(Dr).clear()})),a}pi(t){let e=0;return t.store($e).ee((n,s)=>{e+=ri(s)}).next(()=>{const n={byteSize:e};return t.store($r).put(Co,n)})}gi(t){const e=t.store(jr),n=t.store(Bt);return e.J().next(s=>A.forEach(s,i=>{const a=IDBKeyRange.bound([i.userId,We],[i.userId,i.lastAcknowledgedBatchId]);return n.J(Qe,a).next(c=>A.forEach(c,l=>{L(l.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:l.batchId});const h=Ke(this.serializer,l);return Sd(t,i.userId,h).next(()=>{})}))}))}yi(t){const e=t.store(Cn),n=t.store($e);return t.store(Je).get(Qs).next(s=>{const i=[];return n.ee((a,c)=>{const l=new Y(a),h=function(g){return[0,bt(g)]}(l);i.push(e.get(h).next(f=>f?A.resolve():(g=>e.put({targetId:0,path:bt(g),sequenceNumber:s.highestListenSequenceNumber}))(l)))}).next(()=>A.waitFor(i))})}wi(t,e){t.createObjectStore(zr,{keyPath:up});const n=e.store(zr),s=new wa,i=a=>{if(s.add(a)){const c=a.lastSegment(),l=a.popLast();return n.put({collectionId:c,parent:bt(l)})}};return e.store($e).ee({Y:!0},(a,c)=>{const l=new Y(a);return i(l.popLast())}).next(()=>e.store(Vn).ee({Y:!0},([a,c,l],h)=>{const f=Wt(c);return i(f.popLast())}))}Si(t){const e=t.store(Pn);return e.ee((n,s)=>{const i=Rr(s),a=wd(this.serializer,i);return e.put(a)})}bi(t,e){const n=e.store($e),s=[];return n.ee((i,a)=>{const c=e.store(Hs),l=function(g){return g.document?new k(Y.fromString(g.document.name).popFirst(5)):g.noDocument?k.fromSegments(g.noDocument.path):g.unknownDocument?k.fromSegments(g.unknownDocument.path):O(36783)}(a).path.toArray(),h={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:a.readTime||[0,0],unknownDocument:a.unknownDocument,noDocument:a.noDocument,document:a.document,hasCommittedMutations:!!a.hasCommittedMutations};s.push(c.put(h))}).next(()=>A.waitFor(s))}Di(t,e){const n=e.store(Bt),s=Nd(this.serializer),i=new va(Si.Vi,this.serializer.yt);return n.J().next(a=>{const c=new Map;return a.forEach(l=>{let h=c.get(l.userId)??z();Ke(this.serializer,l).keys().forEach(f=>h=h.add(f)),c.set(l.userId,h)}),A.forEach(c,(l,h)=>{const f=new It(h),g=bi.wt(this.serializer,f),I=i.getIndexManager(f),b=Ri.wt(f,this.serializer,I,i.referenceDelegate);return new kd(s,b,g,I).recalculateAndSaveOverlaysForDocumentKeys(new No(e,Dt.ce),l).next()})})}}function ul(r){r.createObjectStore(Cn,{keyPath:ap}).createIndex(ia,cp,{unique:!0}),r.createObjectStore(Pn,{keyPath:"targetId"}).createIndex(yh,op,{unique:!0}),r.createObjectStore(Je)}const me="IndexedDbPersistence",mo=18e5,go=5e3,po="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",Q_="main";class ba{constructor(t,e,n,s,i,a,c,l,h,f,g=18){if(this.allowTabSynchronization=t,this.persistenceKey=e,this.clientId=n,this.Ci=i,this.window=a,this.document=c,this.Fi=h,this.Mi=f,this.xi=g,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=I=>Promise.resolve(),!ba.v())throw new D(V.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new M_(this,s),this.qi=e+Q_,this.serializer=new Td(l),this.Ki=new Te(this.qi,this.xi,new H_(this.serializer)),this.ci=new A_,this.li=new D_(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Nd(this.serializer),this.Pi=new w_,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,f===!1&&lt(me,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new D(V.FAILED_PRECONDITION,po);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",t=>this.li.getHighestSequenceNumber(t))}).then(t=>{this.ai=new Dt(t,this.Fi)}).then(()=>{this.ui=!0}).catch(t=>(this.Ki&&this.Ki.close(),Promise.reject(t)))}zi(t){return this.ki=async e=>{if(this.started)return t(e)},t(this.isPrimary)}setDatabaseDeletedListener(t){this.Ki.K(async e=>{e.newVersion===null&&await t()})}setNetworkEnabled(t){this.networkEnabled!==t&&(this.networkEnabled=t,this.Ci.enqueueAndForget(async()=>{this.started&&await this.$i()}))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",t=>Rs(t).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.ji(t).next(e=>{e||(this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)))})}).next(()=>this.Ji(t)).next(e=>this.isPrimary&&!e?this.Hi(t).next(()=>!1):!!e&&this.Zi(t).next(()=>!0))).catch(t=>{if(Pe(t))return C(me,"Failed to extend owner lease: ",t),this.isPrimary;if(!this.allowTabSynchronization)throw t;return C(me,"Releasing owner lease after error during lease refresh",t),!1}).then(t=>{this.isPrimary!==t&&this.Ci.enqueueRetryable(()=>this.ki(t)),this.isPrimary=t})}ji(t){return Ir(t).get(dn).next(e=>A.resolve(this.Xi(e)))}Yi(t){return Rs(t).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,mo)){this.Li=Date.now();const t=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{const n=pt(e,Dn);return n.J().next(s=>{const i=this.ns(s,mo),a=s.filter(c=>i.indexOf(c)===-1);return A.forEach(a,c=>n.delete(c.clientId)).next(()=>a)})}).catch(()=>[]);if(this.Ui)for(const e of t)this.Ui.removeItem(this.rs(e.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.$i().then(()=>this.es()).then(()=>this.Gi()))}Xi(t){return!!t&&t.ownerId===this.clientId}Ji(t){return this.Mi?A.resolve(!0):Ir(t).get(dn).next(e=>{if(e!==null&&this.ts(e.leaseTimestampMs,go)&&!this.ss(e.ownerId)){if(this.Xi(e)&&this.networkEnabled)return!0;if(!this.Xi(e)){if(!e.allowTabSynchronization)throw new D(V.FAILED_PRECONDITION,po);return!1}}return!(!this.networkEnabled||!this.inForeground)||Rs(t).J().next(n=>this.ns(n,go).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,a=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||a&&c)return!0}return!1})===void 0)}).next(e=>(this.isPrimary!==e&&C(me,`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.Ki.runTransaction("shutdown","readwrite",[Zr,Dn],t=>{const e=new No(t,Dt.ce);return this.Hi(e).next(()=>this.Yi(e))}),this.Ki.close(),this.ls()}ns(t,e){return t.filter(n=>this.ts(n.updateTimeMs,e)&&!this.ss(n.clientId))}hs(){return this.runTransaction("getActiveClients","readonly",t=>Rs(t).J().next(e=>this.ns(e,mo).map(n=>n.clientId)))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(t,e){return Ri.wt(t,this.serializer,e,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(t){return new C_(t,this.serializer.yt.databaseId)}getDocumentOverlayCache(t){return bi.wt(this.serializer,t)}getBundleCache(){return this.Pi}runTransaction(t,e,n){C(me,"Starting transaction:",t);const s=e==="readonly"?"readonly":"readwrite",i=function(l){return l===18?bp:l===17?bh:l===16?vp:l===15?ca:l===14?vh:l===13?Ah:l===12?Ap:l===11?wh:void O(60245)}(this.xi);let a;return this.Ki.runTransaction(t,s,i,c=>(a=new No(c,this.ai?this.ai.next():Dt.ce),e==="readwrite-primary"?this.ji(a).next(l=>!!l||this.Ji(a)).next(l=>{if(!l)throw lt(`Failed to obtain primary lease for action '${t}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)),new D(V.FAILED_PRECONDITION,dh);return n(a)}).next(l=>this.Zi(a).next(()=>l)):this.Ps(a).next(()=>n(a)))).then(c=>(a.raiseOnCommittedEvent(),c))}Ps(t){return Ir(t).get(dn).next(e=>{if(e!==null&&this.ts(e.leaseTimestampMs,go)&&!this.ss(e.ownerId)&&!this.Xi(e)&&!(this.Mi||this.allowTabSynchronization&&e.allowTabSynchronization))throw new D(V.FAILED_PRECONDITION,po)})}Zi(t){const e={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Ir(t).put(dn,e)}static v(){return Te.v()}Hi(t){const e=Ir(t);return e.get(dn).next(n=>this.Xi(n)?(C(me,"Releasing primary lease."),e.delete(dn)):A.resolve())}ts(t,e){const n=Date.now();return!(t<n-e)&&(!(t>n)||(lt(`Detected an update time that is in the future: ${t} > ${n}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ni=()=>{this.Ci.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.$i()))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground=this.document.visibilityState==="visible")}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){var t;typeof((t=this.window)==null?void 0:t.addEventListener)=="function"&&(this.Oi=()=>{this._s();const e=/(?:Version|Mobile)\/1[456]/;ql()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(t){var e;try{const n=((e=this.Ui)==null?void 0:e.getItem(this.rs(t)))!==null;return C(me,`Client '${t}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return lt(me,"Failed to get zombied client id.",n),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(t){lt("Failed to set zombie client id.",t)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch{}}rs(t){return`firestore_zombie_${this.persistenceKey}_${t}`}}function Ir(r){return pt(r,Zr)}function Rs(r){return pt(r,Dn)}function Md(r,t){let e=r.projectId;return r.isDefaultDatabase||(e+="."+r.database),"firestore/"+t+"/"+e+"/"}/**
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
 */class Ra{constructor(t,e,n,s){this.targetId=t,this.fromCache=e,this.Ts=n,this.Es=s}static Is(t,e){let n=z(),s=z();for(const i of e.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Ra(t,e.fromCache,n,s)}}/**
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
 */class W_{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
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
 */class Od{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=function(){return ql()?8:mh(js())>0?6:4}()}initialize(t,e){this.fs=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,n,s){const i={result:null};return this.gs(t,e).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ps(t,e,s,n).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new W_;return this.ys(t,e,a).next(c=>{if(i.result=c,this.As)return this.ws(t,e,a,c.size)})}).next(()=>i.result)}ws(t,e,n,s){return n.documentReadCount<this.Vs?(yn()<=Q.DEBUG&&C("QueryEngine","SDK will not create cache indexes for query:",In(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),A.resolve()):(yn()<=Q.DEBUG&&C("QueryEngine","Query:",In(e),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.ds*s?(yn()<=Q.DEBUG&&C("QueryEngine","The SDK decides to create cache indexes for query:",In(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Ot(e))):A.resolve())}gs(t,e){if(Nu(e))return A.resolve(null);let n=Ot(e);return this.indexManager.getIndexType(t,n).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=Xs(e,null,"F"),n=Ot(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next(i=>{const a=z(...i);return this.fs.getDocuments(t,a).next(c=>this.indexManager.getMinOffset(t,n).next(l=>{const h=this.Ss(e,c);return this.bs(e,h,a,l.readTime)?this.gs(t,Xs(e,null,"F")):this.Ds(t,h,e,l)}))})))}ps(t,e,n,s){return Nu(e)||s.isEqual(B.min())?A.resolve(null):this.fs.getDocuments(t,n).next(i=>{const a=this.Ss(e,i);return this.bs(e,a,n,s)?A.resolve(null):(yn()<=Q.DEBUG&&C("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),In(e)),this.Ds(t,a,e,lh(s,Sn)).next(c=>c))})}Ss(t,e){let n=new et(Qh(t));return e.forEach((s,i)=>{es(t,i)&&(n=n.add(i))}),n}bs(t,e,n,s){if(t.limit===null)return!1;if(n.size!==e.size)return!0;const i=t.limitType==="F"?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ys(t,e,n){return yn()<=Q.DEBUG&&C("QueryEngine","Using full collection scan to execute query:",In(e)),this.fs.getDocumentsMatchingQuery(t,e,Ft.min(),n)}Ds(t,e,n,s){return this.fs.getDocumentsMatchingQuery(t,n,s).next(i=>(e.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
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
 */const Sa="LocalStore",J_=3e8;class Y_{constructor(t,e,n,s){this.persistence=t,this.Cs=e,this.serializer=s,this.vs=new rt(U),this.Fs=new se(i=>en(i),ts),this.Ms=new Map,this.xs=t.getRemoteDocumentCache(),this.li=t.getTargetCache(),this.Pi=t.getBundleCache(),this.Os(n)}Os(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new kd(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.vs))}}function Fd(r,t,e,n){return new Y_(r,t,e,n)}async function Ld(r,t){const e=F(r);return await e.persistence.runTransaction("Handle user change","readonly",n=>{let s;return e.mutationQueue.getAllMutationBatches(n).next(i=>(s=i,e.Os(t),e.mutationQueue.getAllMutationBatches(n))).next(i=>{const a=[],c=[];let l=z();for(const h of s){a.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}return e.localDocuments.getDocuments(n,l).next(h=>({Ns:h,removedBatchIds:a,addedBatchIds:c}))})})}function X_(r,t){const e=F(r);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const s=t.batch.keys(),i=e.xs.newChangeBuffer({trackRemovals:!0});return function(c,l,h,f){const g=h.batch,I=g.keys();let b=A.resolve();return I.forEach(P=>{b=b.next(()=>f.getEntry(l,P)).next(M=>{const N=h.docVersions.get(P);L(N!==null,48541),M.version.compareTo(N)<0&&(g.applyToRemoteDocument(M,h),M.isValidDocument()&&(M.setReadTime(h.commitVersion),f.addEntry(M)))})}),b.next(()=>c.mutationQueue.removeMutationBatch(l,g))}(e,n,t,i).next(()=>i.apply(n)).next(()=>e.mutationQueue.performConsistencyCheck(n)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(n,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(c){let l=z();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(l=l.add(c.batch.mutations[h].key));return l}(t))).next(()=>e.localDocuments.getDocuments(n,s))})}function Bd(r){const t=F(r);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.li.getLastRemoteSnapshotVersion(e))}function Z_(r,t){const e=F(r),n=t.snapshotVersion;let s=e.vs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=e.xs.newChangeBuffer({trackRemovals:!0});s=e.vs;const c=[];t.targetChanges.forEach((f,g)=>{const I=s.get(g);if(!I)return;c.push(e.li.removeMatchingKeys(i,f.removedDocuments,g).next(()=>e.li.addMatchingKeys(i,f.addedDocuments,g)));let b=I.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(g)!==null?b=b.withResumeToken(ht.EMPTY_BYTE_STRING,B.min()).withLastLimboFreeSnapshotVersion(B.min()):f.resumeToken.approximateByteSize()>0&&(b=b.withResumeToken(f.resumeToken,n)),s=s.insert(g,b),function(M,N,K){return M.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-M.snapshotVersion.toMicroseconds()>=J_?!0:K.addedDocuments.size+K.modifiedDocuments.size+K.removedDocuments.size>0}(I,b,f)&&c.push(e.li.updateTargetData(i,b))});let l=Mt(),h=z();if(t.documentUpdates.forEach(f=>{t.resolvedLimboDocuments.has(f)&&c.push(e.persistence.referenceDelegate.updateLimboDocument(i,f))}),c.push(ty(i,a,t.documentUpdates).next(f=>{l=f.Bs,h=f.Ls})),!n.isEqual(B.min())){const f=e.li.getLastRemoteSnapshotVersion(i).next(g=>e.li.setTargetsMetadata(i,i.currentSequenceNumber,n));c.push(f)}return A.waitFor(c).next(()=>a.apply(i)).next(()=>e.localDocuments.getLocalViewOfDocuments(i,l,h)).next(()=>l)}).then(i=>(e.vs=s,i))}function ty(r,t,e){let n=z(),s=z();return e.forEach(i=>n=n.add(i)),t.getEntries(r,n).next(i=>{let a=Mt();return e.forEach((c,l)=>{const h=i.get(c);l.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(B.min())?(t.removeEntry(c,l.readTime),a=a.insert(c,l)):!h.isValidDocument()||l.version.compareTo(h.version)>0||l.version.compareTo(h.version)===0&&h.hasPendingWrites?(t.addEntry(l),a=a.insert(c,l)):C(Sa,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",l.version)}),{Bs:a,Ls:s}})}function ey(r,t){const e=F(r);return e.persistence.runTransaction("Get next mutation batch","readonly",n=>(t===void 0&&(t=We),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t)))}function ii(r,t){const e=F(r);return e.persistence.runTransaction("Allocate target","readwrite",n=>{let s;return e.li.getTargetData(n,t).next(i=>i?(s=i,A.resolve(s)):e.li.allocateTargetId(n).next(a=>(s=new Zt(t,a,"TargetPurposeListen",n.currentSequenceNumber),e.li.addTargetData(n,s).next(()=>s))))}).then(n=>{const s=e.vs.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.vs=e.vs.insert(n.targetId,n),e.Fs.set(t,n.targetId)),n})}async function Un(r,t,e){const n=F(r),s=n.vs.get(t),i=e?"readwrite":"readwrite-primary";try{e||await n.persistence.runTransaction("Release target",i,a=>n.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Pe(a))throw a;C(Sa,`Failed to update sequence numbers for target ${t}: ${a}`)}n.vs=n.vs.remove(t),n.Fs.delete(s.target)}function Ho(r,t,e){const n=F(r);let s=B.min(),i=z();return n.persistence.runTransaction("Execute query","readwrite",a=>function(l,h,f){const g=F(l),I=g.Fs.get(f);return I!==void 0?A.resolve(g.vs.get(I)):g.li.getTargetData(h,f)}(n,a,Ot(t)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,n.li.getMatchingKeysForTargetId(a,c.targetId).next(l=>{i=l})}).next(()=>n.Cs.getDocumentsMatchingQuery(a,t,e?s:B.min(),e?i:z())).next(c=>(jd(n,Hh(t),c),{documents:c,ks:i})))}function Ud(r,t){const e=F(r),n=F(e.li),s=e.vs.get(t);return s?Promise.resolve(s.target):e.persistence.runTransaction("Get target data","readonly",i=>n.At(i,t).next(a=>a?a.target:null))}function qd(r,t){const e=F(r),n=e.Ms.get(t)||B.min();return e.persistence.runTransaction("Get new document changes","readonly",s=>e.xs.getAllFromCollectionGroup(s,t,lh(n,Sn),Number.MAX_SAFE_INTEGER)).then(s=>(jd(e,t,s),s))}function jd(r,t,e){let n=r.Ms.get(t)||B.min();e.forEach((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)}),r.Ms.set(t,n)}/**
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
 */const $d="firestore_clients";function ll(r,t){return`${$d}_${r}_${t}`}const zd="firestore_mutations";function hl(r,t,e){let n=`${zd}_${r}_${e}`;return t.isAuthenticated()&&(n+=`_${t.uid}`),n}const Kd="firestore_targets";function _o(r,t){return`${Kd}_${r}_${t}`}/**
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
 */const Qt="SharedClientState";class oi{constructor(t,e,n,s){this.user=t,this.batchId=e,this.state=n,this.error=s}static $s(t,e,n){const s=JSON.parse(n);let i,a=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return a&&s.error&&(a=typeof s.error.message=="string"&&typeof s.error.code=="string",a&&(i=new D(s.error.code,s.error.message))),a?new oi(t,e,s.state,i):(lt(Qt,`Failed to parse mutation state for ID '${e}': ${n}`),null)}Ws(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class Or{constructor(t,e,n){this.targetId=t,this.state=e,this.error=n}static $s(t,e){const n=JSON.parse(e);let s,i=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return i&&n.error&&(i=typeof n.error.message=="string"&&typeof n.error.code=="string",i&&(s=new D(n.error.code,n.error.message))),i?new Or(t,n.state,s):(lt(Qt,`Failed to parse target state for ID '${t}': ${e}`),null)}Ws(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class ai{constructor(t,e){this.clientId=t,this.activeTargetIds=e}static $s(t,e){const n=JSON.parse(e);let s=typeof n=="object"&&n.activeTargetIds instanceof Array,i=fa();for(let a=0;s&&a<n.activeTargetIds.length;++a)s=gh(n.activeTargetIds[a]),i=i.add(n.activeTargetIds[a]);return s?new ai(t,i):(lt(Qt,`Failed to parse client data for instance '${t}': ${e}`),null)}}class Va{constructor(t,e){this.clientId=t,this.onlineState=e}static $s(t){const e=JSON.parse(t);return typeof e=="object"&&["Unknown","Online","Offline"].indexOf(e.onlineState)!==-1&&typeof e.clientId=="string"?new Va(e.clientId,e.onlineState):(lt(Qt,`Failed to parse online state: ${t}`),null)}}class Qo{constructor(){this.activeTargetIds=fa()}Qs(t){this.activeTargetIds=this.activeTargetIds.add(t)}Gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ws(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class yo{constructor(t,e,n,s,i){this.window=t,this.Ci=e,this.persistenceKey=n,this.zs=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.js=this.Js.bind(this),this.Hs=new rt(U),this.started=!1,this.Zs=[];const a=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.Xs=ll(this.persistenceKey,this.zs),this.Ys=function(l){return`firestore_sequence_number_${l}`}(this.persistenceKey),this.Hs=this.Hs.insert(this.zs,new Qo),this.eo=new RegExp(`^${$d}_${a}_([^_]*)$`),this.no=new RegExp(`^${zd}_${a}_(\\d+)(?:_(.*))?$`),this.ro=new RegExp(`^${Kd}_${a}_(\\d+)$`),this.io=function(l){return`firestore_online_state_${l}`}(this.persistenceKey),this.so=function(l){return`firestore_bundle_loaded_v2_${l}`}(this.persistenceKey),this.window.addEventListener("storage",this.js)}static v(t){return!(!t||!t.localStorage)}async start(){const t=await this.syncEngine.hs();for(const n of t){if(n===this.zs)continue;const s=this.getItem(ll(this.persistenceKey,n));if(s){const i=ai.$s(n,s);i&&(this.Hs=this.Hs.insert(i.clientId,i))}}this.oo();const e=this.storage.getItem(this.io);if(e){const n=this._o(e);n&&this.ao(n)}for(const n of this.Zs)this.Js(n);this.Zs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(t){this.setItem(this.Ys,JSON.stringify(t))}getAllActiveQueryTargets(){return this.uo(this.Hs)}isActiveQueryTarget(t){let e=!1;return this.Hs.forEach((n,s)=>{s.activeTargetIds.has(t)&&(e=!0)}),e}addPendingMutation(t){this.co(t,"pending")}updateMutationState(t,e,n){this.co(t,e,n),this.lo(t)}addLocalQueryTarget(t,e=!0){let n="not-current";if(this.isActiveQueryTarget(t)){const s=this.storage.getItem(_o(this.persistenceKey,t));if(s){const i=Or.$s(t,s);i&&(n=i.state)}}return e&&this.ho.Qs(t),this.oo(),n}removeLocalQueryTarget(t){this.ho.Gs(t),this.oo()}isLocalQueryTarget(t){return this.ho.activeTargetIds.has(t)}clearQueryState(t){this.removeItem(_o(this.persistenceKey,t))}updateQueryState(t,e,n){this.Po(t,e,n)}handleUserChange(t,e,n){e.forEach(s=>{this.lo(s)}),this.currentUser=t,n.forEach(s=>{this.addPendingMutation(s)})}setOnlineState(t){this.To(t)}notifyBundleLoaded(t){this.Eo(t)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.js),this.removeItem(this.Xs),this.started=!1)}getItem(t){const e=this.storage.getItem(t);return C(Qt,"READ",t,e),e}setItem(t,e){C(Qt,"SET",t,e),this.storage.setItem(t,e)}removeItem(t){C(Qt,"REMOVE",t),this.storage.removeItem(t)}Js(t){const e=t;if(e.storageArea===this.storage){if(C(Qt,"EVENT",e.key,e.newValue),e.key===this.Xs)return void lt("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Ci.enqueueRetryable(async()=>{if(this.started){if(e.key!==null){if(this.eo.test(e.key)){if(e.newValue==null){const n=this.Io(e.key);return this.Ro(n,null)}{const n=this.Ao(e.key,e.newValue);if(n)return this.Ro(n.clientId,n)}}else if(this.no.test(e.key)){if(e.newValue!==null){const n=this.Vo(e.key,e.newValue);if(n)return this.mo(n)}}else if(this.ro.test(e.key)){if(e.newValue!==null){const n=this.fo(e.key,e.newValue);if(n)return this.po(n)}}else if(e.key===this.io){if(e.newValue!==null){const n=this._o(e.newValue);if(n)return this.ao(n)}}else if(e.key===this.Ys){const n=function(i){let a=Dt.ce;if(i!=null)try{const c=JSON.parse(i);L(typeof c=="number",30636,{yo:i}),a=c}catch(c){lt(Qt,"Failed to read sequence number from WebStorage",c)}return a}(e.newValue);n!==Dt.ce&&this.sequenceNumberHandler(n)}else if(e.key===this.so){const n=this.wo(e.newValue);await Promise.all(n.map(s=>this.syncEngine.So(s)))}}}else this.Zs.push(e)})}}get ho(){return this.Hs.get(this.zs)}oo(){this.setItem(this.Xs,this.ho.Ws())}co(t,e,n){const s=new oi(this.currentUser,t,e,n),i=hl(this.persistenceKey,this.currentUser,t);this.setItem(i,s.Ws())}lo(t){const e=hl(this.persistenceKey,this.currentUser,t);this.removeItem(e)}To(t){const e={clientId:this.zs,onlineState:t};this.storage.setItem(this.io,JSON.stringify(e))}Po(t,e,n){const s=_o(this.persistenceKey,t),i=new Or(t,e,n);this.setItem(s,i.Ws())}Eo(t){const e=JSON.stringify(Array.from(t));this.setItem(this.so,e)}Io(t){const e=this.eo.exec(t);return e?e[1]:null}Ao(t,e){const n=this.Io(t);return ai.$s(n,e)}Vo(t,e){const n=this.no.exec(t),s=Number(n[1]),i=n[2]!==void 0?n[2]:null;return oi.$s(new It(i),s,e)}fo(t,e){const n=this.ro.exec(t),s=Number(n[1]);return Or.$s(s,e)}_o(t){return Va.$s(t)}wo(t){return JSON.parse(t)}async mo(t){if(t.user.uid===this.currentUser.uid)return this.syncEngine.bo(t.batchId,t.state,t.error);C(Qt,`Ignoring mutation for non-active user ${t.user.uid}`)}po(t){return this.syncEngine.Do(t.targetId,t.state,t.error)}Ro(t,e){const n=e?this.Hs.insert(t,e):this.Hs.remove(t),s=this.uo(this.Hs),i=this.uo(n),a=[],c=[];return i.forEach(l=>{s.has(l)||a.push(l)}),s.forEach(l=>{i.has(l)||c.push(l)}),this.syncEngine.Co(a,c).then(()=>{this.Hs=n})}ao(t){this.Hs.get(t.clientId)&&this.onlineStateHandler(t.onlineState)}uo(t){let e=fa();return t.forEach((n,s)=>{e=e.unionWith(s.activeTargetIds)}),e}}class Gd{constructor(){this.vo=new Qo,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.vo.Qs(t),this.Fo[t]||"not-current"}updateQueryState(t,e,n){this.Fo[t]=e}removeLocalQueryTarget(t){this.vo.Gs(t)}isLocalQueryTarget(t){return this.vo.activeTargetIds.has(t)}clearQueryState(t){delete this.Fo[t]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(t){return this.vo.activeTargetIds.has(t)}start(){return this.vo=new Qo,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
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
 */class ny{Mo(t){}shutdown(){}}/**
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
 */const dl="ConnectivityMonitor";class fl{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(t){this.Lo.push(t)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){C(dl,"Network connectivity changed: AVAILABLE");for(const t of this.Lo)t(0)}Bo(){C(dl,"Network connectivity changed: UNAVAILABLE");for(const t of this.Lo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Ss=null;function Wo(){return Ss===null?Ss=function(){return 268435456+Math.round(2147483648*Math.random())}():Ss++,"0x"+Ss.toString(16)}/**
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
 */const Io="RestConnection",ry={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class sy{get qo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ko=e+"://"+t.host,this.Uo=`projects/${n}/databases/${s}`,this.$o=this.databaseId.database===Ws?`project_id=${n}`:`project_id=${n}&database_id=${s}`}Wo(t,e,n,s,i){const a=Wo(),c=this.Qo(t,e.toUriEncodedString());C(Io,`Sending RPC '${t}' ${a}:`,c,n);const l={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(l,s,i);const{host:h}=new URL(c),f=Kl(h);return this.zo(t,c,l,n,f).then(g=>(C(Io,`Received RPC '${t}' ${a}: `,g),g),g=>{throw Ae(Io,`RPC '${t}' ${a} failed with error: `,g,"url: ",c,"request:",n),g})}jo(t,e,n,s,i,a){return this.Wo(t,e,n,s,i)}Go(t,e,n){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Kn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((s,i)=>t[i]=s),n&&n.headers.forEach((s,i)=>t[i]=s)}Qo(t,e){const n=ry[t];let s=`${this.Ko}/v1/${e}:${n}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
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
 */class iy{constructor(t){this.Jo=t.Jo,this.Ho=t.Ho}Zo(t){this.Xo=t}Yo(t){this.e_=t}t_(t){this.n_=t}onMessage(t){this.r_=t}close(){this.Ho()}send(t){this.Jo(t)}i_(){this.Xo()}s_(){this.e_()}o_(t){this.n_(t)}__(t){this.r_(t)}}/**
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
 */const At="WebChannelConnection",Er=(r,t,e)=>{r.listen(t,n=>{try{e(n)}catch(s){setTimeout(()=>{throw s},0)}})};class An extends sy{constructor(t){super(t),this.a_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}static u_(){if(!An.c_){const t=rh();Er(t,nh.STAT_EVENT,e=>{e.stat===So.PROXY?C(At,"STAT_EVENT: detected buffering proxy"):e.stat===So.NOPROXY&&C(At,"STAT_EVENT: detected no buffering proxy")}),An.c_=!0}}zo(t,e,n,s,i){const a=Wo();return new Promise((c,l)=>{const h=new th;h.setWithCredentials(!0),h.listenOnce(eh.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case Vs.NO_ERROR:const g=h.getResponseJson();C(At,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(g)),c(g);break;case Vs.TIMEOUT:C(At,`RPC '${t}' ${a} timed out`),l(new D(V.DEADLINE_EXCEEDED,"Request time out"));break;case Vs.HTTP_ERROR:const I=h.getStatus();if(C(At,`RPC '${t}' ${a} failed with status:`,I,"response text:",h.getResponseText()),I>0){let b=h.getResponseJson();Array.isArray(b)&&(b=b[0]);const P=b==null?void 0:b.error;if(P&&P.status&&P.message){const M=function(K){const j=K.toLowerCase().replace(/_/g,"-");return Object.values(V).indexOf(j)>=0?j:V.UNKNOWN}(P.status);l(new D(M,P.message))}else l(new D(V.UNKNOWN,"Server responded with status "+h.getStatus()))}else l(new D(V.UNAVAILABLE,"Connection failed."));break;default:O(9055,{l_:t,streamId:a,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{C(At,`RPC '${t}' ${a} completed.`)}});const f=JSON.stringify(s);C(At,`RPC '${t}' ${a} sending request:`,s),h.send(e,"POST",f,n,15)})}T_(t,e,n){const s=Wo(),i=[this.Ko,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(c.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Go(c.initMessageHeaders,e,n),c.encodeInitMessageHeaders=!0;const h=i.join("");C(At,`Creating RPC '${t}' stream ${s}: ${h}`,c);const f=a.createWebChannel(h,c);this.E_(f);let g=!1,I=!1;const b=new iy({Jo:P=>{I?C(At,`Not sending because RPC '${t}' stream ${s} is closed:`,P):(g||(C(At,`Opening RPC '${t}' stream ${s} transport.`),f.open(),g=!0),C(At,`RPC '${t}' stream ${s} sending:`,P),f.send(P))},Ho:()=>f.close()});return Er(f,Ar.EventType.OPEN,()=>{I||(C(At,`RPC '${t}' stream ${s} transport opened.`),b.i_())}),Er(f,Ar.EventType.CLOSE,()=>{I||(I=!0,C(At,`RPC '${t}' stream ${s} transport closed`),b.o_(),this.I_(f))}),Er(f,Ar.EventType.ERROR,P=>{I||(I=!0,Ae(At,`RPC '${t}' stream ${s} transport errored. Name:`,P.name,"Message:",P.message),b.o_(new D(V.UNAVAILABLE,"The operation could not be completed")))}),Er(f,Ar.EventType.MESSAGE,P=>{var M;if(!I){const N=P.data[0];L(!!N,16349);const K=N,j=(K==null?void 0:K.error)||((M=K[0])==null?void 0:M.error);if(j){C(At,`RPC '${t}' stream ${s} received error:`,j);const q=j.status;let st=function(E){const p=dt[E];if(p!==void 0)return ad(p)}(q),W=j.message;q==="NOT_FOUND"&&W.includes("database")&&W.includes("does not exist")&&W.includes(this.databaseId.database)&&Ae(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),st===void 0&&(st=V.INTERNAL,W="Unknown error status: "+q+" with message "+j.message),I=!0,b.o_(new D(st,W)),f.close()}else C(At,`RPC '${t}' stream ${s} received:`,N),b.__(N)}}),An.u_(),setTimeout(()=>{b.s_()},0),b}terminate(){this.a_.forEach(t=>t.close()),this.a_=[]}E_(t){this.a_.push(t)}I_(t){this.a_=this.a_.filter(e=>e===t)}Go(t,e,n){super.Go(t,e,n),this.databaseInfo.apiKey&&(t["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return sh()}}/**
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
 */function oy(r){return new An(r)}/**
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
 */function Hd(){return typeof window<"u"?window:null}function Ls(){return typeof document<"u"?document:null}/**
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
 */function Vi(r){return new l_(r,!0)}/**
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
 */An.c_=!1;class Qd{constructor(t,e,n=1e3,s=1.5,i=6e4){this.Ci=t,this.timerId=e,this.R_=n,this.A_=s,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(t){this.cancel();const e=Math.floor(this.d_+this.y_()),n=Math.max(0,Date.now()-this.f_),s=Math.max(0,e-n);s>0&&C("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),t())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
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
 */const ml="PersistentStream";class Wd{constructor(t,e,n,s,i,a,c,l){this.Ci=t,this.S_=n,this.b_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Qd(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(t){this.K_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.K_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===V.RESOURCE_EXHAUSTED?(lt(e.toString()),lt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===V.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.t_(e)}W_(){}auth(){this.state=1;const t=this.Q_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,s])=>{this.D_===e&&this.G_(n,s)},n=>{t(()=>{const s=new D(V.UNKNOWN,"Fetching auth token failed: "+n.message);return this.z_(s)})})}G_(t,e){const n=this.Q_(this.D_);this.stream=this.j_(t,e),this.stream.Zo(()=>{n(()=>this.listener.Zo())}),this.stream.Yo(()=>{n(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(s=>{n(()=>this.z_(s))}),this.stream.onMessage(s=>{n(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(t){return C(ml,`close with error: ${t}`),this.stream=null,this.close(4,t)}Q_(t){return e=>{this.Ci.enqueueAndForget(()=>this.D_===t?e():(C(ml,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class ay extends Wd{constructor(t,e,n,s,i,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,s,a),this.serializer=i}j_(t,e){return this.connection.T_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=f_(this.serializer,t),n=function(i){if(!("targetChange"in i))return B.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?B.min():a.readTime?Pt(a.readTime):B.min()}(t);return this.listener.H_(e,n)}Z_(t){const e={};e.database=jo(this.serializer),e.addTarget=function(i,a){let c;const l=a.target;if(c=Js(l)?{documents:gd(i,l)}:{query:Ea(i,l).ft},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=ld(i,a.resumeToken);const h=Uo(i,a.expectedCount);h!==null&&(c.expectedCount=h)}else if(a.snapshotVersion.compareTo(B.min())>0){c.readTime=Bn(i,a.snapshotVersion.toTimestamp());const h=Uo(i,a.expectedCount);h!==null&&(c.expectedCount=h)}return c}(this.serializer,t);const n=p_(this.serializer,t);n&&(e.labels=n),this.q_(e)}X_(t){const e={};e.database=jo(this.serializer),e.removeTarget=t,this.q_(e)}}class cy extends Wd{constructor(t,e,n,s,i,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,s,a),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}J_(t){return L(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,L(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){L(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=m_(t.writeResults,t.commitTime),n=Pt(t.commitTime);return this.listener.na(n,e)}ra(){const t={};t.database=jo(this.serializer),this.q_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map(n=>ti(this.serializer,n))};this.q_(e)}}/**
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
 */class uy{}class ly extends uy{constructor(t,e,n,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new D(V.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(t,e,n,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Wo(t,qo(e,n),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new D(V.UNKNOWN,i.toString())})}jo(t,e,n,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.jo(t,qo(e,n),s,a,c,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new D(V.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function hy(r,t,e,n){return new ly(r,t,e,n)}class dy{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(lt(e),this.aa=!1):C("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const on="RemoteStore";class fy{constructor(t,e,n,s,i){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo(a=>{n.enqueueAndForget(async()=>{cn(this)&&(C(on,"Restarting streams for network reachability change."),await async function(l){const h=F(l);h.Ia.add(4),await ss(h),h.Va.set("Unknown"),h.Ia.delete(4),await Pi(h)}(this))})}),this.Va=new dy(n,s)}}async function Pi(r){if(cn(r))for(const t of r.Ra)await t(!0)}async function ss(r){for(const t of r.Ra)await t(!1)}function Ci(r,t){const e=F(r);e.Ea.has(t.targetId)||(e.Ea.set(t.targetId,t),Da(e)?Ca(e):Wn(e).O_()&&Pa(e,t))}function qn(r,t){const e=F(r),n=Wn(e);e.Ea.delete(t),n.O_()&&Jd(e,t),e.Ea.size===0&&(n.O_()?n.L_():cn(e)&&e.Va.set("Unknown"))}function Pa(r,t){if(r.da.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(B.min())>0){const e=r.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Wn(r).Z_(t)}function Jd(r,t){r.da.$e(t),Wn(r).X_(t)}function Ca(r){r.da=new o_({getRemoteKeysForTarget:t=>r.remoteSyncer.getRemoteKeysForTarget(t),At:t=>r.Ea.get(t)||null,ht:()=>r.datastore.serializer.databaseId}),Wn(r).start(),r.Va.ua()}function Da(r){return cn(r)&&!Wn(r).x_()&&r.Ea.size>0}function cn(r){return F(r).Ia.size===0}function Yd(r){r.da=void 0}async function my(r){r.Va.set("Online")}async function gy(r){r.Ea.forEach((t,e)=>{Pa(r,t)})}async function py(r,t){Yd(r),Da(r)?(r.Va.ha(t),Ca(r)):r.Va.set("Unknown")}async function _y(r,t,e){if(r.Va.set("Online"),t instanceof ud&&t.state===2&&t.cause)try{await async function(s,i){const a=i.cause;for(const c of i.targetIds)s.Ea.has(c)&&(await s.remoteSyncer.rejectListen(c,a),s.Ea.delete(c),s.da.removeTarget(c))}(r,t)}catch(n){C(on,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await ci(r,n)}else if(t instanceof Os?r.da.Xe(t):t instanceof cd?r.da.st(t):r.da.tt(t),!e.isEqual(B.min()))try{const n=await Bd(r.localStore);e.compareTo(n)>=0&&await function(i,a){const c=i.da.Tt(a);return c.targetChanges.forEach((l,h)=>{if(l.resumeToken.approximateByteSize()>0){const f=i.Ea.get(h);f&&i.Ea.set(h,f.withResumeToken(l.resumeToken,a))}}),c.targetMismatches.forEach((l,h)=>{const f=i.Ea.get(l);if(!f)return;i.Ea.set(l,f.withResumeToken(ht.EMPTY_BYTE_STRING,f.snapshotVersion)),Jd(i,l);const g=new Zt(f.target,l,h,f.sequenceNumber);Pa(i,g)}),i.remoteSyncer.applyRemoteEvent(c)}(r,e)}catch(n){C(on,"Failed to raise snapshot:",n),await ci(r,n)}}async function ci(r,t,e){if(!Pe(t))throw t;r.Ia.add(1),await ss(r),r.Va.set("Offline"),e||(e=()=>Bd(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{C(on,"Retrying IndexedDB access"),await e(),r.Ia.delete(1),await Pi(r)})}function Xd(r,t){return t().catch(e=>ci(r,e,t))}async function Qn(r){const t=F(r),e=Re(t);let n=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:We;for(;yy(t);)try{const s=await ey(t.localStore,n);if(s===null){t.Ta.length===0&&e.L_();break}n=s.batchId,Iy(t,s)}catch(s){await ci(t,s)}Zd(t)&&tf(t)}function yy(r){return cn(r)&&r.Ta.length<10}function Iy(r,t){r.Ta.push(t);const e=Re(r);e.O_()&&e.Y_&&e.ea(t.mutations)}function Zd(r){return cn(r)&&!Re(r).x_()&&r.Ta.length>0}function tf(r){Re(r).start()}async function Ey(r){Re(r).ra()}async function Ty(r){const t=Re(r);for(const e of r.Ta)t.ea(e.mutations)}async function wy(r,t,e){const n=r.Ta.shift(),s=pa.from(n,t,e);await Xd(r,()=>r.remoteSyncer.applySuccessfulWrite(s)),await Qn(r)}async function Ay(r,t){t&&Re(r).Y_&&await async function(n,s){if(function(a){return r_(a)&&a!==V.ABORTED}(s.code)){const i=n.Ta.shift();Re(n).B_(),await Xd(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Qn(n)}}(r,t),Zd(r)&&tf(r)}async function gl(r,t){const e=F(r);e.asyncQueue.verifyOperationInProgress(),C(on,"RemoteStore received new credentials");const n=cn(e);e.Ia.add(3),await ss(e),n&&e.Va.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ia.delete(3),await Pi(e)}async function Jo(r,t){const e=F(r);t?(e.Ia.delete(2),await Pi(e)):t||(e.Ia.add(2),await ss(e),e.Va.set("Unknown"))}function Wn(r){return r.ma||(r.ma=function(e,n,s){const i=F(e);return i.sa(),new ay(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Zo:my.bind(null,r),Yo:gy.bind(null,r),t_:py.bind(null,r),H_:_y.bind(null,r)}),r.Ra.push(async t=>{t?(r.ma.B_(),Da(r)?Ca(r):r.Va.set("Unknown")):(await r.ma.stop(),Yd(r))})),r.ma}function Re(r){return r.fa||(r.fa=function(e,n,s){const i=F(e);return i.sa(),new cy(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Zo:()=>Promise.resolve(),Yo:Ey.bind(null,r),t_:Ay.bind(null,r),ta:Ty.bind(null,r),na:wy.bind(null,r)}),r.Ra.push(async t=>{t?(r.fa.B_(),await Qn(r)):(await r.fa.stop(),r.Ta.length>0&&(C(on,`Stopping write stream with ${r.Ta.length} pending writes`),r.Ta=[]))})),r.fa}/**
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
 */class xa{constructor(t,e,n,s,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new Ut,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,s,i){const a=Date.now()+n,c=new xa(t,e,a,s,i);return c.start(n),c}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(V.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Na(r,t){if(lt("AsyncQueue",`${t}: ${r}`),Pe(r))return new D(V.UNAVAILABLE,`${t}: ${r}`);throw r}/**
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
 */class vn{static emptySet(t){return new vn(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||k.comparator(e.key,n.key):(e,n)=>k.comparator(e.key,n.key),this.keyedMap=vr(),this.sortedSet=new rt(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,n)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof vn)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const n=new vn;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}/**
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
 */class pl{constructor(){this.ga=new rt(k.comparator)}track(t){const e=t.doc.key,n=this.ga.get(e);n?t.type!==0&&n.type===3?this.ga=this.ga.insert(e,t):t.type===3&&n.type!==1?this.ga=this.ga.insert(e,{type:n.type,doc:t.doc}):t.type===2&&n.type===2?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):t.type===2&&n.type===0?this.ga=this.ga.insert(e,{type:0,doc:t.doc}):t.type===1&&n.type===0?this.ga=this.ga.remove(e):t.type===1&&n.type===2?this.ga=this.ga.insert(e,{type:1,doc:n.doc}):t.type===0&&n.type===1?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):O(63341,{Vt:t,pa:n}):this.ga=this.ga.insert(e,t)}ya(){const t=[];return this.ga.inorderTraversal((e,n)=>{t.push(n)}),t}}class jn{constructor(t,e,n,s,i,a,c,l,h){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=h}static fromInitialDocuments(t,e,n,s,i){const a=[];return e.forEach(c=>{a.push({type:0,doc:c})}),new jn(t,e,vn.emptySet(e),a,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Ti(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==n[s].type||!e[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
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
 */class vy{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(t=>t.Da())}}class by{constructor(){this.queries=_l(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,n){const s=F(e),i=s.queries;s.queries=_l(),i.forEach((a,c)=>{for(const l of c.Sa)l.onError(n)})})(this,new D(V.ABORTED,"Firestore shutting down"))}}function _l(){return new se(r=>Gh(r),Ti)}async function ef(r,t){const e=F(r);let n=3;const s=t.query;let i=e.queries.get(s);i?!i.ba()&&t.Da()&&(n=2):(i=new vy,n=t.Da()?0:1);try{switch(n){case 0:i.wa=await e.onListen(s,!0);break;case 1:i.wa=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const c=Na(a,`Initialization of query '${In(t.query)}' failed`);return void t.onError(c)}e.queries.set(s,i),i.Sa.push(t),t.va(e.onlineState),i.wa&&t.Fa(i.wa)&&ka(e)}async function nf(r,t){const e=F(r),n=t.query;let s=3;const i=e.queries.get(n);if(i){const a=i.Sa.indexOf(t);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?s=t.Da()?0:1:!i.ba()&&t.Da()&&(s=2))}switch(s){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function Ry(r,t){const e=F(r);let n=!1;for(const s of t){const i=s.query,a=e.queries.get(i);if(a){for(const c of a.Sa)c.Fa(s)&&(n=!0);a.wa=s}}n&&ka(e)}function Sy(r,t,e){const n=F(r),s=n.queries.get(t);if(s)for(const i of s.Sa)i.onError(e);n.queries.delete(t)}function ka(r){r.Ca.forEach(t=>{t.next()})}var Yo,yl;(yl=Yo||(Yo={})).Ma="default",yl.Cache="cache";class rf{constructor(t,e,n){this.query=t,this.xa=e,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(t){if(!this.options.includeMetadataChanges){const n=[];for(const s of t.docChanges)s.type!==3&&n.push(s);t=new jn(t.query,t.docs,t.oldDocs,n,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),e=!0):this.La(t,this.onlineState)&&(this.ka(t),e=!0),this.Na=t,e}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let e=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),e=!0),e}La(t,e){if(!t.fromCache||!this.Da())return!0;const n=e!=="Offline";return(!this.options.qa||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Ba(t){if(t.docChanges.length>0)return!0;const e=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}ka(t){t=jn.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==Yo.Cache}}/**
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
 */class sf{constructor(t){this.key=t}}class of{constructor(t){this.key=t}}class Vy{constructor(t,e){this.query=t,this.Za=e,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=z(),this.mutatedKeys=z(),this.eu=Qh(t),this.tu=new vn(this.eu)}get nu(){return this.Za}ru(t,e){const n=e?e.iu:new pl,s=e?e.tu:this.tu;let i=e?e.mutatedKeys:this.mutatedKeys,a=s,c=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((f,g)=>{const I=s.get(f),b=es(this.query,g)?g:null,P=!!I&&this.mutatedKeys.has(I.key),M=!!b&&(b.hasLocalMutations||this.mutatedKeys.has(b.key)&&b.hasCommittedMutations);let N=!1;I&&b?I.data.isEqual(b.data)?P!==M&&(n.track({type:3,doc:b}),N=!0):this.su(I,b)||(n.track({type:2,doc:b}),N=!0,(l&&this.eu(b,l)>0||h&&this.eu(b,h)<0)&&(c=!0)):!I&&b?(n.track({type:0,doc:b}),N=!0):I&&!b&&(n.track({type:1,doc:I}),N=!0,(l||h)&&(c=!0)),N&&(b?(a=a.add(b),i=M?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),n.track({type:1,doc:f})}return{tu:a,iu:n,bs:c,mutatedKeys:i}}su(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,s){const i=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const a=t.iu.ya();a.sort((f,g)=>function(b,P){const M=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return O(20277,{Vt:N})}};return M(b)-M(P)}(f.type,g.type)||this.eu(f.doc,g.doc)),this.ou(n),s=s??!1;const c=e&&!s?this._u():[],l=this.Ya.size===0&&this.current&&!s?1:0,h=l!==this.Xa;return this.Xa=l,a.length!==0||h?{snapshot:new jn(this.query,t.tu,i,a,t.mutatedKeys,l===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new pl,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(t){return!this.Za.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach(e=>this.Za=this.Za.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Za=this.Za.delete(e)),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Ya;this.Ya=z(),this.tu.forEach(n=>{this.uu(n.key)&&(this.Ya=this.Ya.add(n.key))});const e=[];return t.forEach(n=>{this.Ya.has(n)||e.push(new of(n))}),this.Ya.forEach(n=>{t.has(n)||e.push(new sf(n))}),e}cu(t){this.Za=t.ks,this.Ya=z();const e=this.ru(t.documents);return this.applyChanges(e,!0)}lu(){return jn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const Jn="SyncEngine";class Py{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class Cy{constructor(t){this.key=t,this.hu=!1}}class Dy{constructor(t,e,n,s,i,a){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new se(c=>Gh(c),Ti),this.Eu=new Map,this.Iu=new Set,this.Ru=new rt(k.comparator),this.Au=new Map,this.Vu=new Aa,this.du={},this.mu=new Map,this.fu=sn.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function xy(r,t,e=!0){const n=Di(r);let s;const i=n.Tu.get(t);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await af(n,t,e,!0),s}async function Ny(r,t){const e=Di(r);await af(e,t,!0,!1)}async function af(r,t,e,n){const s=await ii(r.localStore,Ot(t)),i=s.targetId,a=r.sharedClientState.addLocalQueryTarget(i,e);let c;return n&&(c=await Ma(r,t,i,a==="current",s.resumeToken)),r.isPrimaryClient&&e&&Ci(r.remoteStore,s),c}async function Ma(r,t,e,n,s){r.pu=(g,I,b)=>async function(M,N,K,j){let q=N.view.ru(K);q.bs&&(q=await Ho(M.localStore,N.query,!1).then(({documents:E})=>N.view.ru(E,q)));const st=j&&j.targetChanges.get(N.targetId),W=j&&j.targetMismatches.get(N.targetId)!=null,J=N.view.applyChanges(q,M.isPrimaryClient,st,W);return Xo(M,N.targetId,J.au),J.snapshot}(r,g,I,b);const i=await Ho(r.localStore,t,!0),a=new Vy(t,i.ks),c=a.ru(i.documents),l=rs.createSynthesizedTargetChangeForCurrentChange(e,n&&r.onlineState!=="Offline",s),h=a.applyChanges(c,r.isPrimaryClient,l);Xo(r,e,h.au);const f=new Py(t,e,a);return r.Tu.set(t,f),r.Eu.has(e)?r.Eu.get(e).push(t):r.Eu.set(e,[t]),h.snapshot}async function ky(r,t,e){const n=F(r),s=n.Tu.get(t),i=n.Eu.get(s.targetId);if(i.length>1)return n.Eu.set(s.targetId,i.filter(a=>!Ti(a,t))),void n.Tu.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await Un(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),e&&qn(n.remoteStore,s.targetId),$n(n,s.targetId)}).catch(Ve)):($n(n,s.targetId),await Un(n.localStore,s.targetId,!0))}async function My(r,t){const e=F(r),n=e.Tu.get(t),s=e.Eu.get(n.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),qn(e.remoteStore,n.targetId))}async function Oy(r,t,e){const n=Ba(r);try{const s=await function(a,c){const l=F(a),h=Z.now(),f=c.reduce((b,P)=>b.add(P.key),z());let g,I;return l.persistence.runTransaction("Locally write mutations","readwrite",b=>{let P=Mt(),M=z();return l.xs.getEntries(b,f).next(N=>{P=N,P.forEach((K,j)=>{j.isValidDocument()||(M=M.add(K))})}).next(()=>l.localDocuments.getOverlayedDocuments(b,P)).next(N=>{g=N;const K=[];for(const j of c){const q=t_(j,g.get(j.key).overlayedDocument);q!=null&&K.push(new ie(j.key,q,Mh(q.value.mapValue),Vt.exists(!0)))}return l.mutationQueue.addMutationBatch(b,h,K,c)}).next(N=>{I=N;const K=N.applyToLocalDocumentSet(g,M);return l.documentOverlayCache.saveOverlays(b,N.batchId,K)})}).then(()=>({batchId:I.batchId,changes:Jh(g)}))}(n.localStore,t);n.sharedClientState.addPendingMutation(s.batchId),function(a,c,l){let h=a.du[a.currentUser.toKey()];h||(h=new rt(U)),h=h.insert(c,l),a.du[a.currentUser.toKey()]=h}(n,s.batchId,e),await De(n,s.changes),await Qn(n.remoteStore)}catch(s){const i=Na(s,"Failed to persist write");e.reject(i)}}async function cf(r,t){const e=F(r);try{const n=await Z_(e.localStore,t);t.targetChanges.forEach((s,i)=>{const a=e.Au.get(i);a&&(L(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?L(a.hu,14607):s.removedDocuments.size>0&&(L(a.hu,42227),a.hu=!1))}),await De(e,n,t)}catch(n){await Ve(n)}}function Il(r,t,e){const n=F(r);if(n.isPrimaryClient&&e===0||!n.isPrimaryClient&&e===1){const s=[];n.Tu.forEach((i,a)=>{const c=a.view.va(t);c.snapshot&&s.push(c.snapshot)}),function(a,c){const l=F(a);l.onlineState=c;let h=!1;l.queries.forEach((f,g)=>{for(const I of g.Sa)I.va(c)&&(h=!0)}),h&&ka(l)}(n.eventManager,t),s.length&&n.Pu.H_(s),n.onlineState=t,n.isPrimaryClient&&n.sharedClientState.setOnlineState(t)}}async function Fy(r,t,e){const n=F(r);n.sharedClientState.updateQueryState(t,"rejected",e);const s=n.Au.get(t),i=s&&s.key;if(i){let a=new rt(k.comparator);a=a.insert(i,ut.newNoDocument(i,B.min()));const c=z().add(i),l=new ns(B.min(),new Map,new rt(U),a,c);await cf(n,l),n.Ru=n.Ru.remove(i),n.Au.delete(t),La(n)}else await Un(n.localStore,t,!1).then(()=>$n(n,t,e)).catch(Ve)}async function Ly(r,t){const e=F(r),n=t.batch.batchId;try{const s=await X_(e.localStore,t);Fa(e,n,null),Oa(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await De(e,s)}catch(s){await Ve(s)}}async function By(r,t,e){const n=F(r);try{const s=await function(a,c){const l=F(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return l.mutationQueue.lookupMutationBatch(h,c).next(g=>(L(g!==null,37113),f=g.keys(),l.mutationQueue.removeMutationBatch(h,g))).next(()=>l.mutationQueue.performConsistencyCheck(h)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(h,f,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>l.localDocuments.getDocuments(h,f))})}(n.localStore,t);Fa(n,t,e),Oa(n,t),n.sharedClientState.updateMutationState(t,"rejected",e),await De(n,s)}catch(s){await Ve(s)}}function Oa(r,t){(r.mu.get(t)||[]).forEach(e=>{e.resolve()}),r.mu.delete(t)}function Fa(r,t,e){const n=F(r);let s=n.du[n.currentUser.toKey()];if(s){const i=s.get(t);i&&(e?i.reject(e):i.resolve(),s=s.remove(t)),n.du[n.currentUser.toKey()]=s}}function $n(r,t,e=null){r.sharedClientState.removeLocalQueryTarget(t);for(const n of r.Eu.get(t))r.Tu.delete(n),e&&r.Pu.yu(n,e);r.Eu.delete(t),r.isPrimaryClient&&r.Vu.Gr(t).forEach(n=>{r.Vu.containsKey(n)||uf(r,n)})}function uf(r,t){r.Iu.delete(t.path.canonicalString());const e=r.Ru.get(t);e!==null&&(qn(r.remoteStore,e),r.Ru=r.Ru.remove(t),r.Au.delete(e),La(r))}function Xo(r,t,e){for(const n of e)n instanceof sf?(r.Vu.addReference(n.key,t),Uy(r,n)):n instanceof of?(C(Jn,"Document no longer in limbo: "+n.key),r.Vu.removeReference(n.key,t),r.Vu.containsKey(n.key)||uf(r,n.key)):O(19791,{wu:n})}function Uy(r,t){const e=t.key,n=e.path.canonicalString();r.Ru.get(e)||r.Iu.has(n)||(C(Jn,"New document in limbo: "+e),r.Iu.add(n),La(r))}function La(r){for(;r.Iu.size>0&&r.Ru.size<r.maxConcurrentLimboResolutions;){const t=r.Iu.values().next().value;r.Iu.delete(t);const e=new k(Y.fromString(t)),n=r.fu.next();r.Au.set(n,new Cy(e)),r.Ru=r.Ru.insert(e,n),Ci(r.remoteStore,new Zt(Ot(Ei(e.path)),n,"TargetPurposeLimboResolution",Dt.ce))}}async function De(r,t,e){const n=F(r),s=[],i=[],a=[];n.Tu.isEmpty()||(n.Tu.forEach((c,l)=>{a.push(n.pu(l,t,e).then(h=>{var f;if((h||e)&&n.isPrimaryClient){const g=h?!h.fromCache:(f=e==null?void 0:e.targetChanges.get(l.targetId))==null?void 0:f.current;n.sharedClientState.updateQueryState(l.targetId,g?"current":"not-current")}if(h){s.push(h);const g=Ra.Is(l.targetId,h);i.push(g)}}))}),await Promise.all(a),n.Pu.H_(s),await async function(l,h){const f=F(l);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>A.forEach(h,I=>A.forEach(I.Ts,b=>f.persistence.referenceDelegate.addReference(g,I.targetId,b)).next(()=>A.forEach(I.Es,b=>f.persistence.referenceDelegate.removeReference(g,I.targetId,b)))))}catch(g){if(!Pe(g))throw g;C(Sa,"Failed to update sequence numbers: "+g)}for(const g of h){const I=g.targetId;if(!g.fromCache){const b=f.vs.get(I),P=b.snapshotVersion,M=b.withLastLimboFreeSnapshotVersion(P);f.vs=f.vs.insert(I,M)}}}(n.localStore,i))}async function qy(r,t){const e=F(r);if(!e.currentUser.isEqual(t)){C(Jn,"User change. New user:",t.toKey());const n=await Ld(e.localStore,t);e.currentUser=t,function(i,a){i.mu.forEach(c=>{c.forEach(l=>{l.reject(new D(V.CANCELLED,a))})}),i.mu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await De(e,n.Ns)}}function jy(r,t){const e=F(r),n=e.Au.get(t);if(n&&n.hu)return z().add(n.key);{let s=z();const i=e.Eu.get(t);if(!i)return s;for(const a of i){const c=e.Tu.get(a);s=s.unionWith(c.view.nu)}return s}}async function $y(r,t){const e=F(r),n=await Ho(e.localStore,t.query,!0),s=t.view.cu(n);return e.isPrimaryClient&&Xo(e,t.targetId,s.au),s}async function zy(r,t){const e=F(r);return qd(e.localStore,t).then(n=>De(e,n))}async function Ky(r,t,e,n){const s=F(r),i=await function(c,l){const h=F(c),f=F(h.mutationQueue);return h.persistence.runTransaction("Lookup mutation documents","readonly",g=>f.Xn(g,l).next(I=>I?h.localDocuments.getDocuments(g,I):A.resolve(null)))}(s.localStore,t);i!==null?(e==="pending"?await Qn(s.remoteStore):e==="acknowledged"||e==="rejected"?(Fa(s,t,n||null),Oa(s,t),function(c,l){F(F(c).mutationQueue).nr(l)}(s.localStore,t)):O(6720,"Unknown batchState",{Su:e}),await De(s,i)):C(Jn,"Cannot apply mutation batch with id: "+t)}async function Gy(r,t){const e=F(r);if(Di(e),Ba(e),t===!0&&e.gu!==!0){const n=e.sharedClientState.getAllActiveQueryTargets(),s=await El(e,n.toArray());e.gu=!0,await Jo(e.remoteStore,!0);for(const i of s)Ci(e.remoteStore,i)}else if(t===!1&&e.gu!==!1){const n=[];let s=Promise.resolve();e.Eu.forEach((i,a)=>{e.sharedClientState.isLocalQueryTarget(a)?n.push(a):s=s.then(()=>($n(e,a),Un(e.localStore,a,!0))),qn(e.remoteStore,a)}),await s,await El(e,n),function(a){const c=F(a);c.Au.forEach((l,h)=>{qn(c.remoteStore,h)}),c.Vu.zr(),c.Au=new Map,c.Ru=new rt(k.comparator)}(e),e.gu=!1,await Jo(e.remoteStore,!1)}}async function El(r,t,e){const n=F(r),s=[],i=[];for(const a of t){let c;const l=n.Eu.get(a);if(l&&l.length!==0){c=await ii(n.localStore,Ot(l[0]));for(const h of l){const f=n.Tu.get(h),g=await $y(n,f);g.snapshot&&i.push(g.snapshot)}}else{const h=await Ud(n.localStore,a);c=await ii(n.localStore,h),await Ma(n,lf(h),a,!1,c.resumeToken)}s.push(c)}return n.Pu.H_(i),s}function lf(r){return $h(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function Hy(r){return function(e){return F(F(e).persistence).hs()}(F(r).localStore)}async function Qy(r,t,e,n){const s=F(r);if(s.gu)return void C(Jn,"Ignoring unexpected query state notification.");const i=s.Eu.get(t);if(i&&i.length>0)switch(e){case"current":case"not-current":{const a=await qd(s.localStore,Hh(i[0])),c=ns.createSynthesizedRemoteEventForCurrentChange(t,e==="current",ht.EMPTY_BYTE_STRING);await De(s,a,c);break}case"rejected":await Un(s.localStore,t,!0),$n(s,t,n);break;default:O(64155,e)}}async function Wy(r,t,e){const n=Di(r);if(n.gu){for(const s of t){if(n.Eu.has(s)&&n.sharedClientState.isActiveQueryTarget(s)){C(Jn,"Adding an already active target "+s);continue}const i=await Ud(n.localStore,s),a=await ii(n.localStore,i);await Ma(n,lf(i),a.targetId,!1,a.resumeToken),Ci(n.remoteStore,a)}for(const s of e)n.Eu.has(s)&&await Un(n.localStore,s,!1).then(()=>{qn(n.remoteStore,s),$n(n,s)}).catch(Ve)}}function Di(r){const t=F(r);return t.remoteStore.remoteSyncer.applyRemoteEvent=cf.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=jy.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Fy.bind(null,t),t.Pu.H_=Ry.bind(null,t.eventManager),t.Pu.yu=Sy.bind(null,t.eventManager),t}function Ba(r){const t=F(r);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Ly.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=By.bind(null,t),t}class Yr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Vi(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return Fd(this.persistence,new Od,t.initialUser,this.serializer)}Cu(t){return new va(Si.Vi,this.serializer)}Du(t){return new Gd}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Yr.provider={build:()=>new Yr};class Jy extends Yr{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){L(this.persistence.referenceDelegate instanceof si,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new Cd(n,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?vt.withCacheSize(this.cacheSizeBytes):vt.DEFAULT;return new va(n=>si.Vi(n,e),this.serializer)}}class Yy extends Yr{constructor(t,e,n){super(),this.xu=t,this.cacheSizeBytes=e,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(t){await super.initialize(t),await this.xu.initialize(this,t),await Ba(this.xu.syncEngine),await Qn(this.xu.remoteStore),await this.persistence.zi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}vu(t){return Fd(this.persistence,new Od,t.initialUser,this.serializer)}Fu(t,e){const n=this.persistence.referenceDelegate.garbageCollector;return new Cd(n,t.asyncQueue,e)}Mu(t,e){const n=new Zg(e,this.persistence);return new Xg(t.asyncQueue,n)}Cu(t){const e=Md(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?vt.withCacheSize(this.cacheSizeBytes):vt.DEFAULT;return new ba(this.synchronizeTabs,e,t.clientId,n,t.asyncQueue,Hd(),Ls(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(t){return new Gd}}class Xy extends Yy{constructor(t,e){super(t,e,!1),this.xu=t,this.cacheSizeBytes=e,this.synchronizeTabs=!0}async initialize(t){await super.initialize(t);const e=this.xu.syncEngine;this.sharedClientState instanceof yo&&(this.sharedClientState.syncEngine={bo:Ky.bind(null,e),Do:Qy.bind(null,e),Co:Wy.bind(null,e),hs:Hy.bind(null,e),So:zy.bind(null,e)},await this.sharedClientState.start()),await this.persistence.zi(async n=>{await Gy(this.xu.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())})}Du(t){const e=Hd();if(!yo.v(e))throw new D(V.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=Md(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey);return new yo(e,t.asyncQueue,n,t.clientId,t.initialUser)}}class ui{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Il(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=qy.bind(null,this.syncEngine),await Jo(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new by}()}createDatastore(t){const e=Vi(t.databaseInfo.databaseId),n=oy(t.databaseInfo);return hy(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return function(n,s,i,a,c){return new fy(n,s,i,a,c)}(this.localStore,this.datastore,t.asyncQueue,e=>Il(this.syncEngine,e,0),function(){return fl.v()?new fl:new ny}())}createSyncEngine(t,e){return function(s,i,a,c,l,h,f){const g=new Dy(s,i,a,c,l,h);return f&&(g.gu=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const i=F(s);C(on,"RemoteStore shutting down."),i.Ia.add(5),await ss(i),i.Aa.shutdown(),i.Va.set("Unknown")}(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}ui.provider={build:()=>new ui};/**
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
 */class hf{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):lt("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
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
 */const Se="FirestoreClient";class Zy{constructor(t,e,n,s,i){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this._databaseInfo=s,this.user=It.UNAUTHENTICATED,this.clientId=na.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,async a=>{C(Se,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(n,a=>(C(Se,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Ut;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=Na(e,"Failed to shutdown persistence");t.reject(n)}}),t.promise}}async function Eo(r,t){r.asyncQueue.verifyOperationInProgress(),C(Se,"Initializing OfflineComponentProvider");const e=r.configuration;await t.initialize(e);let n=e.initialUser;r.setCredentialChangeListener(async s=>{n.isEqual(s)||(await Ld(t.localStore,s),n=s)}),t.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=t}async function Tl(r,t){r.asyncQueue.verifyOperationInProgress();const e=await tI(r);C(Se,"Initializing OnlineComponentProvider"),await t.initialize(e,r.configuration),r.setCredentialChangeListener(n=>gl(t.remoteStore,n)),r.setAppCheckTokenChangeListener((n,s)=>gl(t.remoteStore,s)),r._onlineComponents=t}async function tI(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){C(Se,"Using user provided OfflineComponentProvider");try{await Eo(r,r._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===V.FAILED_PRECONDITION||s.code===V.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;Ae("Error using user provided cache. Falling back to memory cache: "+e),await Eo(r,new Yr)}}else C(Se,"Using default OfflineComponentProvider"),await Eo(r,new Jy(void 0));return r._offlineComponents}async function Ua(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(C(Se,"Using user provided OnlineComponentProvider"),await Tl(r,r._uninitializedComponentsProvider._online)):(C(Se,"Using default OnlineComponentProvider"),await Tl(r,new ui))),r._onlineComponents}function eI(r){return Ua(r).then(t=>t.syncEngine)}function nI(r){return Ua(r).then(t=>t.datastore)}async function df(r){const t=await Ua(r),e=t.eventManager;return e.onListen=xy.bind(null,t.syncEngine),e.onUnlisten=ky.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Ny.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=My.bind(null,t.syncEngine),e}function rI(r,t,e={}){const n=new Ut;return r.asyncQueue.enqueueAndForget(async()=>function(i,a,c,l,h){const f=new hf({next:I=>{f.Nu(),a.enqueueAndForget(()=>nf(i,g));const b=I.docs.has(c);!b&&I.fromCache?h.reject(new D(V.UNAVAILABLE,"Failed to get document because the client is offline.")):b&&I.fromCache&&l&&l.source==="server"?h.reject(new D(V.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(I)},error:I=>h.reject(I)}),g=new rf(Ei(c.path),f,{includeMetadataChanges:!0,qa:!0});return ef(i,g)}(await df(r),r.asyncQueue,t,e,n)),n.promise}function sI(r,t,e={}){const n=new Ut;return r.asyncQueue.enqueueAndForget(async()=>function(i,a,c,l,h){const f=new hf({next:I=>{f.Nu(),a.enqueueAndForget(()=>nf(i,g)),I.fromCache&&l.source==="server"?h.reject(new D(V.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(I)},error:I=>h.reject(I)}),g=new rf(c,f,{includeMetadataChanges:!0,qa:!0});return ef(i,g)}(await df(r),r.asyncQueue,t,e,n)),n.promise}function iI(r,t,e){const n=new Ut;return r.asyncQueue.enqueueAndForget(async()=>{try{const s=await nI(r);n.resolve(async function(a,c,l){var M;const h=F(a),{request:f,gt:g,parent:I}=g_(h.serializer,qp(c),l);h.connection.qo||delete f.parent;const b=(await h.jo("RunAggregationQuery",h.serializer.databaseId,I,f,1)).filter(N=>!!N.result);L(b.length===1,64727);const P=(M=b[0].result)==null?void 0:M.aggregateFields;return Object.keys(P).reduce((N,K)=>(N[g[K]]=P[K],N),{})}(s,t,e))}catch(s){n.reject(s)}}),n.promise}function oI(r,t){const e=new Ut;return r.asyncQueue.enqueueAndForget(async()=>Oy(await eI(r),t,e)),e.promise}/**
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
 */function ff(r){const t={};return r.timeoutSeconds!==void 0&&(t.timeoutSeconds=r.timeoutSeconds),t}/**
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
 */const aI="ComponentProvider",wl=new Map;function cI(r,t,e,n,s){return new Vp(r,t,e,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,ff(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,n)}/**
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
 */const mf="firestore.googleapis.com",Al=!0;class vl{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new D(V.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=mf,this.ssl=Al}else this.host=t.host,this.ssl=t.ssl??Al;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=Rd;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<x_)throw new D(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Qg("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ff(t.experimentalLongPollingOptions??{}),function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new D(V.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new D(V.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new D(V.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(n,s){return n.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class xi{constructor(t,e,n,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new vl({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(V.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new D(V.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new vl(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new Lg;switch(n.type){case"firstParty":return new jg(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new D(V.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=wl.get(e);n&&(C(aI,"Removing Datastore"),wl.delete(e),n.terminate())}(this),Promise.resolve()}}function uI(r,t,e,n={}){var h;r=jt(r,xi);const s=Kl(t),i=r._getSettings(),a={...i,emulatorOptions:r._getEmulatorOptions()},c=`${t}:${e}`;s&&vm(`https://${c}`),i.host!==mf&&i.host!==c&&Ae("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...i,host:c,ssl:s,emulatorOptions:n};if(!$s(l,a)&&(r._setSettings(l),n.mockUserToken)){let f,g;if(typeof n.mockUserToken=="string")f=n.mockUserToken,g=It.MOCK_USER;else{f=Im(n.mockUserToken,(h=r._app)==null?void 0:h.options.projectId);const I=n.mockUserToken.sub||n.mockUserToken.user_id;if(!I)throw new D(V.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");g=new It(I)}r._authCredentials=new Bg(new oh(f,g))}}/**
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
 */class xe{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new xe(this.firestore,t,this._query)}}class mt{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new we(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new mt(this.firestore,t,this._key)}toJSON(){return{type:mt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,n){if(Xr(e,mt._jsonSchema))return new mt(t,n||null,new k(Y.fromString(e.referencePath)))}}mt._jsonSchemaVersion="firestore/documentReference/1.0",mt._jsonSchema={type:ft("string",mt._jsonSchemaVersion),referencePath:ft("string")};class we extends xe{constructor(t,e,n){super(t,e,Ei(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new mt(this.firestore,null,new k(t))}withConverter(t){return new we(this.firestore,t,this._path)}}function Tr(r,t,...e){if(r=te(r),ch("collection","path",t),r instanceof xi){const n=Y.fromString(t,...e);return mu(n),new we(r,null,n)}{if(!(r instanceof mt||r instanceof we))throw new D(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Y.fromString(t,...e));return mu(n),new we(r.firestore,null,n)}}function Bs(r,t,...e){if(r=te(r),arguments.length===1&&(t=na.newId()),ch("doc","path",t),r instanceof xi){const n=Y.fromString(t,...e);return fu(n),new mt(r,null,new k(n))}{if(!(r instanceof mt||r instanceof we))throw new D(V.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Y.fromString(t,...e));return fu(n),new mt(r.firestore,r instanceof we?r.converter:null,new k(n))}}/**
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
 */const bl="AsyncQueue";class Rl{constructor(t=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Qd(this,"async_queue_retry"),this._c=()=>{const n=Ls();n&&C(bl,"Visibility state changed to "+n.visibilityState),this.M_.w_()},this.ac=t;const e=Ls();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=Ls();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise(()=>{});const e=new Ut;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Yu.push(t),this.lc()))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(t){if(!Pe(t))throw t;C(bl,"Operation failed with retryable error: "+t)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(t){const e=this.ac.then(()=>(this.rc=!0,t().catch(n=>{throw this.nc=n,this.rc=!1,lt("INTERNAL UNHANDLED ERROR: ",Sl(n)),n}).then(n=>(this.rc=!1,n))));return this.ac=e,e}enqueueAfterDelay(t,e,n){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const s=xa.createAndSchedule(this,t,e,n,i=>this.hc(i));return this.tc.push(s),s}uc(){this.nc&&O(47125,{Pc:Sl(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ec(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ic(t){return this.Tc().then(()=>{this.tc.sort((e,n)=>e.targetTimeMs-n.targetTimeMs);for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()})}Rc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function Sl(r){let t=r.message||"";return r.stack&&(t=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),t}class Ne extends xi{constructor(t,e,n,s){super(t,e,n,s),this.type="firestore",this._queue=new Rl,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new Rl(t),this._firestoreClient=void 0,await t}}}function lI(r,t){const e=typeof r=="object"?r:Jl(),n=typeof r=="string"?r:Ws,s=Tg(e,"firestore").getImmediate({identifier:n});if(!s._initialized){const i=_m("firestore");i&&uI(s,...i)}return s}function Ni(r){if(r._terminated)throw new D(V.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||gf(r),r._firestoreClient}function gf(r){var n,s,i,a;const t=r._freezeSettings(),e=cI(r._databaseId,((n=r._app)==null?void 0:n.options.appId)||"",r._persistenceKey,(s=r._app)==null?void 0:s.options.apiKey,t);r._componentsProvider||(i=t.localCache)!=null&&i._offlineComponentProvider&&((a=t.localCache)!=null&&a._onlineComponentProvider)&&(r._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),r._firestoreClient=new Zy(r._authCredentials,r._appCheckCredentials,r._queue,e,r._componentsProvider&&function(l){const h=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(h),_online:h}}(r._componentsProvider))}async function Vl(r){Ae("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=r._freezeSettings();hI(r,ui.provider,{build:e=>new Xy(e,t.cacheSizeBytes)})}function hI(r,t,e){if((r=jt(r,Ne))._firestoreClient||r._terminated)throw new D(V.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(r._componentsProvider||r._getSettings().localCache)throw new D(V.FAILED_PRECONDITION,"SDK cache is already specified.");r._componentsProvider={_online:t,_offline:e},gf(r)}/**
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
 */class Lt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Lt(ht.fromBase64String(t))}catch(e){throw new D(V.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Lt(ht.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Lt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(Xr(t,Lt._jsonSchema))return Lt.fromBase64String(t.bytes)}}Lt._jsonSchemaVersion="firestore/bytes/1.0",Lt._jsonSchema={type:ft("string",Lt._jsonSchemaVersion),bytes:ft("string")};/**
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
 */class qa{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new D(V.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new at(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
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
 */class ki{constructor(t){this._methodName=t}}/**
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
 */class Yt{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new D(V.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new D(V.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return U(this._lat,t._lat)||U(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Yt._jsonSchemaVersion}}static fromJSON(t){if(Xr(t,Yt._jsonSchema))return new Yt(t.latitude,t.longitude)}}Yt._jsonSchemaVersion="firestore/geoPoint/1.0",Yt._jsonSchema={type:ft("string",Yt._jsonSchemaVersion),latitude:ft("number"),longitude:ft("number")};/**
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
 */class qt{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0}(this._values,t._values)}toJSON(){return{type:qt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(Xr(t,qt._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every(e=>typeof e=="number"))return new qt(t.vectorValues);throw new D(V.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}qt._jsonSchemaVersion="firestore/vectorValue/1.0",qt._jsonSchema={type:ft("string",qt._jsonSchemaVersion),vectorValues:ft("object")};/**
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
 */const dI=/^__.*__$/;class fI{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return this.fieldMask!==null?new ie(t,this.data,this.fieldMask,e,this.fieldTransforms):new Hn(t,this.data,e,this.fieldTransforms)}}class pf{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new ie(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function _f(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw O(40011,{dataSource:r})}}class ja{constructor(t,e,n,s,i,a){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(t){return new ja({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),n=this.i({path:e,arrayElement:!1});return n.mc(t),n}fc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),n=this.i({path:e,arrayElement:!1});return n.Ac(),n}gc(t){return this.i({path:void 0,arrayElement:!0})}yc(t){return li(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}Ac(){if(this.path)for(let t=0;t<this.path.length;t++)this.mc(this.path.get(t))}mc(t){if(t.length===0)throw this.yc("Document fields must not be empty");if(_f(this.dataSource)&&dI.test(t))throw this.yc('Document fields cannot begin and end with "__"')}}class mI{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||Vi(t)}A(t,e,n,s=!1){return new ja({dataSource:t,methodName:e,targetDoc:n,path:at.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function $a(r){const t=r._freezeSettings(),e=Vi(r._databaseId);return new mI(r._databaseId,!!t.ignoreUndefinedProperties,e)}function gI(r,t,e,n,s,i={}){const a=r.A(i.merge||i.mergeFields?2:0,t,e,s);Ka("Data must be an object, but it was:",a,n);const c=yf(n,a);let l,h;if(i.merge)l=new xt(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const g of i.mergeFields){const I=an(t,g,e);if(!a.contains(I))throw new D(V.INVALID_ARGUMENT,`Field '${I}' is specified in your field mask but missing from your input data.`);Tf(f,I)||f.push(I)}l=new xt(f),h=a.fieldTransforms.filter(g=>l.covers(g.field))}else l=null,h=a.fieldTransforms;return new fI(new Tt(c),l,h)}class Mi extends ki{_toFieldTransform(t){if(t.dataSource!==2)throw t.dataSource===1?t.yc(`${this._methodName}() can only appear at the top level of your update data`):t.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Mi}}class za extends ki{_toFieldTransform(t){return new rd(t.path,new On)}isEqual(t){return t instanceof za}}function pI(r,t,e,n){const s=r.A(1,t,e);Ka("Data must be an object, but it was:",s,n);const i=[],a=Tt.empty();Ce(n,(l,h)=>{const f=Ef(t,l,e);h=te(h);const g=s.fc(f);if(h instanceof Mi)i.push(f);else{const I=is(h,g);I!=null&&(i.push(f),a.set(f,I))}});const c=new xt(i);return new pf(a,c,s.fieldTransforms)}function _I(r,t,e,n,s,i){const a=r.A(1,t,e),c=[an(t,n,e)],l=[s];if(i.length%2!=0)throw new D(V.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let I=0;I<i.length;I+=2)c.push(an(t,i[I])),l.push(i[I+1]);const h=[],f=Tt.empty();for(let I=c.length-1;I>=0;--I)if(!Tf(h,c[I])){const b=c[I];let P=l[I];P=te(P);const M=a.fc(b);if(P instanceof Mi)h.push(b);else{const N=is(P,M);N!=null&&(h.push(b),f.set(b,N))}}const g=new xt(h);return new pf(f,g,a.fieldTransforms)}function yI(r,t,e,n=!1){return is(e,r.A(n?4:3,t))}function is(r,t){if(If(r=te(r)))return Ka("Unsupported field value:",t,r),yf(r,t);if(r instanceof ki)return function(n,s){if(!_f(s.dataSource))throw s.yc(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.yc(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(r,t),null;if(r===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),r instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.yc("Nested arrays are not supported");return function(n,s){const i=[];let a=0;for(const c of n){let l=is(c,s.gc(a));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),a++}return{arrayValue:{values:i}}}(r,t)}return function(n,s){if((n=te(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Qp(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=Z.fromDate(n);return{timestampValue:Bn(s.serializer,i)}}if(n instanceof Z){const i=new Z(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Bn(s.serializer,i)}}if(n instanceof Yt)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Lt)return{bytesValue:ld(s.serializer,n._byteString)};if(n instanceof mt){const i=s.databaseId,a=n.firestore._databaseId;if(!a.isEqual(i))throw s.yc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Ia(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof qt)return function(a,c){const l=a instanceof qt?a.toArray():a;return{mapValue:{fields:{[la]:{stringValue:ha},[xn]:{arrayValue:{values:l.map(f=>{if(typeof f!="number")throw c.yc("VectorValues must only contain numeric values.");return ma(c.serializer,f)})}}}}}}(n,s);if(Ed(n))return n._toProto(s.serializer);throw s.yc(`Unsupported field value: ${di(n)}`)}(r,t)}function yf(r,t){const e={};return Rh(r)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Ce(r,(n,s)=>{const i=is(s,t.dc(n));i!=null&&(e[n]=i)}),{mapValue:{fields:e}}}function If(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof Z||r instanceof Yt||r instanceof Lt||r instanceof mt||r instanceof ki||r instanceof qt||Ed(r))}function Ka(r,t,e){if(!If(e)||!uh(e)){const n=di(e);throw n==="an object"?t.yc(r+" a custom object"):t.yc(r+" "+n)}}function an(r,t,e){if((t=te(t))instanceof qa)return t._internalPath;if(typeof t=="string")return Ef(r,t);throw li("Field path arguments must be of type string or ",r,!1,void 0,e)}const II=new RegExp("[~\\*/\\[\\]]");function Ef(r,t,e){if(t.search(II)>=0)throw li(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,e);try{return new qa(...t.split("."))._internalPath}catch{throw li(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,e)}}function li(r,t,e,n,s){const i=n&&!n.isEmpty(),a=s!==void 0;let c=`Function ${t}() called with invalid data`;e&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=` in field ${n}`),a&&(l+=` in document ${s}`),l+=")"),new D(V.INVALID_ARGUMENT,c+r+l)}function Tf(r,t){return r.some(e=>e.isEqual(t))}/**
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
 */class EI{convertValue(t,e="none"){switch(ve(t)){case 0:return null;case 1:return t.booleanValue;case 2:return ot(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(re(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw O(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return Ce(t,(s,i)=>{n[s]=this.convertValue(i,e)}),n}convertVectorValue(t){var n,s,i;const e=(i=(s=(n=t.fields)==null?void 0:n[xn].arrayValue)==null?void 0:s.values)==null?void 0:i.map(a=>ot(a.doubleValue));return new qt(e)}convertGeoPoint(t){return new Yt(ot(t.latitude),ot(t.longitude))}convertArray(t,e){return(t.values||[]).map(n=>this.convertValue(n,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=yi(t);return n==null?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(Kr(t));default:return null}}convertTimestamp(t){const e=ne(t);return new Z(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=Y.fromString(t);L(Id(n),9688,{name:t});const s=new tn(n.get(1),n.get(3)),i=new k(n.popFirst(5));return s.isEqual(e)||lt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}/**
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
 */class Ga extends EI{constructor(t){super(),this.firestore=t}convertBytes(t){return new Lt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new mt(this.firestore,null,e)}}function Pl(){return new za("serverTimestamp")}const Cl="@firebase/firestore",Dl="4.13.0";/**
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
 */class TI{constructor(t="count",e){this._internalFieldPath=e,this.type="AggregateField",this.aggregateType=t}}class wI{constructor(t,e,n){this._userDataWriter=e,this._data=n,this.type="AggregateQuerySnapshot",this.query=t}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new Tt({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}/**
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
 */class wf{constructor(t,e,n,s,i){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new mt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new AI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var t;return((t=this._document)==null?void 0:t.data.clone().value.mapValue.fields)??void 0}get(t){if(this._document){const e=this._document.data.field(an("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class AI extends wf{data(){return super.data()}}/**
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
 */function vI(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new D(V.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Ha{}class Qa extends Ha{}function wr(r,t,...e){let n=[];t instanceof Ha&&n.push(t),n=n.concat(e),function(i){const a=i.filter(l=>l instanceof Wa).length,c=i.filter(l=>l instanceof Oi).length;if(a>1||a>0&&c>0)throw new D(V.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(const s of n)r=s._apply(r);return r}class Oi extends Qa{constructor(t,e,n){super(),this._field=t,this._op=e,this._value=n,this.type="where"}static _create(t,e,n){return new Oi(t,e,n)}_apply(t){const e=this._parse(t);return Af(t._query,e),new xe(t.firestore,t.converter,Bo(t._query,e))}_parse(t){const e=$a(t.firestore);return function(i,a,c,l,h,f,g){let I;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new D(V.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){kl(g,f);const P=[];for(const M of g)P.push(Nl(l,i,M));I={arrayValue:{values:P}}}else I=Nl(l,i,g)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||kl(g,f),I=yI(c,a,g,f==="in"||f==="not-in");return G.create(h,f,I)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function Kt(r,t,e){const n=t,s=an("where",r);return Oi._create(s,n,e)}class Wa extends Ha{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new Wa(t,e)}_parse(t){const e=this._queryConstraints.map(n=>n._parse(t)).filter(n=>n.getFilters().length>0);return e.length===1?e[0]:tt.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:(function(s,i){let a=s;const c=i.getFlattenedFilters();for(const l of c)Af(a,l),a=Bo(a,l)}(t._query,e),new xe(t.firestore,t.converter,Bo(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Ja extends Qa{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new Ja(t,e)}_apply(t){const e=function(s,i,a){if(s.startAt!==null)throw new D(V.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new D(V.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Wr(i,a)}(t._query,this._field,this._direction);return new xe(t.firestore,t.converter,jp(t._query,e))}}function xl(r,t="asc"){const e=t,n=an("orderBy",r);return Ja._create(n,e)}class Ya extends Qa{constructor(t,e,n){super(),this.type=t,this._limit=e,this._limitType=n}static _create(t,e,n){return new Ya(t,e,n)}_apply(t){return new xe(t.firestore,t.converter,Xs(t._query,this._limit,this._limitType))}}function bI(r){return Wg("limit",r),Ya._create("limit",r,"F")}function Nl(r,t,e){if(typeof(e=te(e))=="string"){if(e==="")throw new D(V.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!zh(t)&&e.indexOf("/")!==-1)throw new D(V.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const n=t.path.child(Y.fromString(e));if(!k.isDocumentKey(n))throw new D(V.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return Hr(r,new k(n))}if(e instanceof mt)return Hr(r,e._key);throw new D(V.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${di(e)}.`)}function kl(r,t){if(!Array.isArray(r)||r.length===0)throw new D(V.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Af(r,t){const e=function(s,i){for(const a of s)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(r.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(e!==null)throw e===t.op?new D(V.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new D(V.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}function RI(r,t,e){let n;return n=r?r.toFirestore(t):t,n}function SI(){return new TI("count")}/**
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
 */function Ml(r){return VI(r,{count:SI()})}function VI(r,t){const e=jt(r.firestore,Ne),n=Ni(e),s=Rp(t,(i,a)=>new e_(a,i.aggregateType,i._internalFieldPath));return iI(n,r._query,s).then(i=>function(c,l,h){const f=new Ga(c);return new wI(l,f,h)}(e,r,i))}class Sr{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Xe extends wf{constructor(t,e,n,s,i,a){super(t,e,n,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Us(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(an("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new D(V.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=Xe._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}Xe._jsonSchemaVersion="firestore/documentSnapshot/1.0",Xe._jsonSchema={type:ft("string",Xe._jsonSchemaVersion),bundleSource:ft("string","DocumentSnapshot"),bundleName:ft("string"),bundle:ft("string")};class Us extends Xe{data(t={}){return super.data(t)}}class bn{constructor(t,e,n,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Sr(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(n=>{t.call(e,new Us(this._firestore,this._userDataWriter,n.key,n,new Sr(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new D(V.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(c=>{const l=new Us(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Sr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const l=new Us(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Sr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:PI(c.type),doc:l,oldIndex:h,newIndex:f}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new D(V.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=bn._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=na.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],n=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(e.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function PI(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return O(61501,{type:r})}}/**
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
 */bn._jsonSchemaVersion="firestore/querySnapshot/1.0",bn._jsonSchema={type:ft("string",bn._jsonSchemaVersion),bundleSource:ft("string","QuerySnapshot"),bundleName:ft("string"),bundle:ft("string")};/**
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
 */function CI(r){r=jt(r,mt);const t=jt(r.firestore,Ne),e=Ni(t);return rI(e,r._key).then(n=>kI(t,r,n))}function To(r){r=jt(r,xe);const t=jt(r.firestore,Ne),e=Ni(t),n=new Ga(t);return vI(r._query),sI(e,r._query).then(s=>new bn(t,n,r,s))}function DI(r,t,e,...n){r=jt(r,mt);const s=jt(r.firestore,Ne),i=$a(s);let a;return a=typeof(t=te(t))=="string"||t instanceof qa?_I(i,"updateDoc",r._key,t,e,n):pI(i,"updateDoc",r._key,t),Xa(s,[a.toMutation(r._key,Vt.exists(!0))])}function xI(r){return Xa(jt(r.firestore,Ne),[new vi(r._key,Vt.none())])}function NI(r,t){const e=jt(r.firestore,Ne),n=Bs(r),s=RI(r.converter,t),i=$a(r.firestore);return Xa(e,[gI(i,"addDoc",n._key,s,r.converter!==null,{}).toMutation(n._key,Vt.exists(!1))]).then(()=>n)}function Xa(r,t){const e=Ni(r);return oI(e,t)}function kI(r,t,e){const n=e.docs.get(t._key),s=new Ga(r);return new Xe(r,s,t._key,n,new Sr(e.hasPendingWrites,e.fromCache),t.converter)}(function(t,e=!0){Fg(bg),zs(new Fr("firestore",(n,{instanceIdentifier:s,options:i})=>{const a=n.getProvider("app").getImmediate(),c=new Ne(new Ug(n.getProvider("auth-internal")),new $g(a,n.getProvider("app-check-internal")),Pp(a,s),a);return i={useFetchStreams:e,...i},c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),wn(Cl,Dl,t),wn(Cl,Dl,"esm2020")})();var MI="firebase",OI="12.11.0";/**
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
 */wn(MI,OI,"app");const FI={apiKey:"AIzaSyCgwUVCfIgpsYZJCLPWZiTi5jAoCdFbAgU",authDomain:"collection-a7a10.firebaseapp.com",projectId:"collection-a7a10",storageBucket:"collection-a7a10.firebasestorage.app",messagingSenderId:"998088577925",appId:"1:998088577925:web:8e735ad92100266afa2aec"},LI=Rg().length?Jl():Wl(FI),Gt=lI(LI);class BI{constructor(){fr(this,"collectionName","802collection");fr(this,"cache",new Map);fr(this,"CACHE_TTL",3e4);fr(this,"persistenceInitialized",!1)}async initPersistence(){if(!this.persistenceInitialized)try{await Vl(Gt),this.persistenceInitialized=!0,console.info("Firestore persistence enabled")}catch(t){const e=t.code;if(e==="failed-precondition")console.warn("Firestore persistence failed: Multiple tabs open");else if(e==="unimplemented")console.warn("Firestore persistence not supported in this browser");else if(e==="failed"){console.warn("Firestore persistence failed, attempting recovery...");try{const n=indexedDB.deleteDatabase("firebaseLocalStorage");await new Promise((s,i)=>{n.onsuccess=s,n.onerror=i}),await Vl(Gt),console.info("Firestore persistence enabled after recovery")}catch(n){console.error("Failed to recover persistence:",n)}}else console.warn("Firestore persistence error:",t);this.persistenceInitialized=!0}}getCacheKey(t,e,n){return`${t}-${e||"all"}-${n||"all"}`}isCacheValid(t){const e=this.cache.get(t);return e?Date.now()-e.timestamp<this.CACHE_TTL:!1}async getTopEntries(t=20,e,n){const s=this.getCacheKey(t,e,n);if(this.isCacheValid(s)){const i=this.cache.get(s);return console.debug("Using cached leaderboard data"),i.data}await this.initPersistence();try{const i=Tr(Gt,this.collectionName),a=e||n?Math.min(t*3,100):t,c=wr(i,xl("score","desc"),bI(a)),l=await To(c),h=[];l.forEach(g=>{var b,P;const I=g.data();e&&I.game!==e||n&&I.mode!==n||h.push({id:g.id,name:I.name,score:I.score,game:I.game,mode:I.mode,createdAt:((b=I.createdAt)==null?void 0:b.toDate())||new Date,updatedAt:(P=I.updatedAt)==null?void 0:P.toDate()})});const f=h.slice(0,Math.min(t,20));return this.cache.set(s,{data:f,timestamp:Date.now()}),f}catch(i){console.error("Error fetching leaderboard:",i);const a=this.cache.get(s);return a?(console.warn("Returning stale cached data due to fetch error"),a.data):[]}}clearCache(){this.cache.clear()}invalidateCache(t,e){if(t||e){const n=[];this.cache.forEach((s,i)=>{(t&&i.includes(t)||e&&i.includes(e))&&n.push(i)}),n.forEach(s=>this.cache.delete(s))}else this.clearCache()}async addEntry(t,e,n,s){var i,a,c;try{if(console.info("Adding entry:",{name:t,score:e,game:n,mode:s}),!t||t.trim().length===0)throw new Error("Name is required");if(typeof e!="number"||isNaN(e))throw new Error("Score must be a valid number");const l=Tr(Gt,this.collectionName),h=t.trim(),f=[Kt("name","==",h)];n&&f.push(Kt("game","==",n)),s&&f.push(Kt("mode","==",s));const g=wr(l,...f),I=await To(g);if(I.empty){const b={name:h,score:e,game:n||"general"};s!==void 0&&(b.mode=s);const P=await NI(l,{...b,createdAt:Pl()});return console.info("Entry created with ID:",P.id),this.invalidateCache(n,s),{id:P.id,name:h,score:e,game:n||"general",mode:s,createdAt:new Date}}else{const b=I.docs[0],P=b.data();return e>P.score?(await DI(Bs(Gt,this.collectionName,b.id),{score:e,updatedAt:Pl()}),{id:b.id,name:h,score:e,game:P.game,mode:P.mode,createdAt:((i=P.createdAt)==null?void 0:i.toDate())||new Date,updatedAt:new Date}):{id:b.id,name:P.name,score:P.score,game:P.game,mode:P.mode,createdAt:((a=P.createdAt)==null?void 0:a.toDate())||new Date,updatedAt:(c=P.updatedAt)==null?void 0:c.toDate()}}}catch(l){throw console.error("Error adding entry:",l),l}finally{this.invalidateCache(n,s)}}async getEntryById(t){var e,n;try{const s=Bs(Gt,this.collectionName,t),i=await CI(s);if(i.exists()){const a=i.data();return{id:i.id,name:a.name,score:a.score,game:a.game,mode:a.mode,createdAt:((e=a.createdAt)==null?void 0:e.toDate())||new Date,updatedAt:(n=a.updatedAt)==null?void 0:n.toDate()}}return null}catch(s){return console.error("Error fetching entry:",s),null}}async searchByName(t){try{const e=Tr(Gt,this.collectionName),n=wr(e,Kt("name",">=",t),Kt("name","<=",`${t}`),xl("score","desc")),s=await To(n),i=[];return s.forEach(a=>{var l,h;const c=a.data();i.push({id:a.id,name:c.name,score:c.score,game:c.game,mode:c.mode,createdAt:((l=c.createdAt)==null?void 0:l.toDate())||new Date,updatedAt:(h=c.updatedAt)==null?void 0:h.toDate()})}),i}catch(e){return console.error("Error searching entries:",e),[]}}async getRank(t,e,n){try{const s=Tr(Gt,this.collectionName),i=[Kt("score",">",t)];e&&i.push(Kt("game","==",e)),n&&i.push(Kt("mode","==",n));const a=wr(s,...i);return(await Ml(a)).data().count+1}catch(s){return console.error("Error fetching rank:",s),-1}}async deleteEntry(t){try{return await xI(Bs(Gt,this.collectionName,t)),!0}catch(e){return console.error("Error deleting entry:",e),!1}}async getTotalCount(t,e){try{const n=Tr(Gt,this.collectionName),s=[];t&&s.push(Kt("game","==",t)),e&&s.push(Kt("mode","==",e));const i=wr(n,...s);return(await Ml(i)).data().count}catch(n){return console.error("Error fetching count:",n),0}}}const UI=new BI,QI=({game:r,mode:t,title:e})=>{const[n,s]=mr.useState([]),[i,a]=mr.useState(!0),[c,l]=mr.useState(null),h=mr.useCallback(async()=>{try{a(!0);const b=await UI.getTopEntries(20,r,t);s(b),l(new Date)}catch(b){console.error("Failed to fetch leaderboard entries:",b)}finally{a(!1)}},[r,t]);mr.useEffect(()=>{h()},[h]);const f=()=>c?`Updated: ${c.toLocaleTimeString()}`:"",g=b=>b===1?X.jsx("span",{className:"flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500 text-white font-bold text-xs",children:X.jsx(om,{className:"w-3 h-3"})}):b===2?X.jsx("span",{className:"flex items-center justify-center w-7 h-7 rounded-full bg-gray-400 text-white font-bold text-xs",children:"2"}):b===3?X.jsx("span",{className:"flex items-center justify-center w-7 h-7 rounded-full bg-amber-600 text-white font-bold text-xs",children:"3"}):X.jsx("span",{className:"flex items-center justify-center w-7 h-7 rounded-full bg-gray-600 text-gray-300 font-bold text-xs",children:b}),I=b=>b.toLocaleDateString("en-US",{month:"short",day:"numeric"});return X.jsxs("div",{className:"bg-gray-900/95 border border-gray-700 rounded-lg p-4 max-w-md",children:[X.jsxs("div",{className:"flex items-center justify-between mb-3",children:[X.jsxs("div",{className:"flex items-center gap-2",children:[X.jsx(am,{className:"w-5 h-5 text-yellow-500"}),X.jsxs("h3",{className:"text-lg font-bold text-white",children:[e||`${r==="snake"?"Snake":r==="bird-shit"?"Bird Shit":"Leaderboard"}`,t&&X.jsxs("span",{className:"text-gray-400 text-sm ml-2 capitalize",children:["(",t,")"]})]})]}),X.jsx("button",{onClick:h,disabled:i,className:"p-1 text-gray-400 hover:text-white rounded transition-colors",title:"Refresh",children:X.jsx(sm,{className:`w-4 h-4 ${i?"animate-spin":""}`})})]}),X.jsx("div",{className:"space-y-1 max-h-64 overflow-y-auto",children:i?X.jsx("div",{className:"flex items-center justify-center py-8",children:X.jsx("div",{className:"animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500"})}):n.length===0?X.jsxs("div",{className:"text-center py-6 text-gray-500",children:[X.jsx("p",{className:"text-sm",children:"No scores yet"}),X.jsx("p",{className:"text-xs mt-1",children:"Be the first to set a record!"})]}):n.map((b,P)=>X.jsxs("div",{className:`flex items-center py-2 px-3 rounded ${P===0?"bg-yellow-500/10 border border-yellow-500/20":P<3?"bg-gray-800/50":"bg-gray-800/30"}`,children:[X.jsx("span",{className:"w-8 flex-shrink-0",children:g(P+1)}),X.jsx("div",{className:"flex-1 min-w-0",children:X.jsxs("div",{className:"flex items-center",children:[X.jsx(im,{className:"w-3 h-3 mr-1.5 text-gray-500"}),X.jsx("span",{className:"text-sm font-medium text-white truncate",children:b.name})]})}),X.jsxs("div",{className:"text-right ml-2",children:[X.jsx("span",{className:"text-lg font-bold text-yellow-400",children:b.score.toLocaleString()}),X.jsx("div",{className:"text-xs text-gray-500",children:I(b.createdAt)})]})]},b.id||P))}),c&&X.jsxs("div",{className:"mt-2 text-xs text-gray-500 text-center",children:[f()," • ",n.length," entries"]})]})};export{QI as G,GI as M,am as T,KI as a,UI as l};
//# sourceMappingURL=GameLeaderboard-DskqnU3P.js.map
