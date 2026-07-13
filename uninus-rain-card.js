/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$3=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$3&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$5=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$3)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$3?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$4,defineProperty:e$2,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$1,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$4(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$2(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$1(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$3=t=>t,s$1=t$1.trustedTypes,e$1=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$2,r=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$1?e$1.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$3(t).nextSibling;i$3(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.3");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;let i$2 = class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}};i$2._$litElement$=true,i$2["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i$2});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i$2});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1},e=t=>(...e)=>({_$litDirective$:t,values:e});let i$1 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n="important",i=" !"+n,o=e(class extends i$1{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||t$1.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(r)),this.render(r);for(const t of this.ft)null==r[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in r){const e=r[t];if(null!=e){this.ft.add(t);const r="string"==typeof e&&e.endsWith(i);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?n:""):s[t]=e;}}return E}});

const SAFE_COLOR = /^(?:#[0-9a-f]{3,8}|(?:rgb|rgba|hsl|hsla)\([0-9.,%\s-]+\)|[a-z]+)$/i;

const DEFAULT_CONFIG = Object.freeze({
  name: "降雨監測",
  secondary_text: "即時天氣狀態",
  secondary_attribute: "",
  rain_state: "下雨中",
  dry_state: "沒下雨",
  rain_text: "偵測到降雨",
  dry_text: "目前沒有降雨",
  unavailable_text: "感測器無法使用",
  unknown_text: "感測器狀態異常",
  rain_status_text: "請注意",
  dry_status_text: "正常",
  unavailable_status_text: "無資料",
  unknown_status_text: "檢查狀態",
  rain_icon: "mdi:weather-pouring",
  dry_icon: "mdi:weather-partly-cloudy",
  unavailable_icon: "mdi:cloud-question",
  rain_color: "#7f1d1d",
  rain_color_end: "#ea580c",
  rain_accent_color: "#fca5a5",
  dry_color: "#064e59",
  dry_color_end: "#0d9488",
  dry_accent_color: "#67e8f9",
  unknown_color: "#334155",
  unknown_color_end: "#475569",
  text_color: "#ffffff",
  animation: true,
  show_status: true,
  show_secondary: true,
});

function safeColor(value, fallback) {
  if (typeof value !== "string") return fallback;
  const candidate = value.trim();
  if (!candidate || candidate.length > 80 || !SAFE_COLOR.test(candidate)) return fallback;
  return candidate;
}

function text(value, fallback) {
  return typeof value === "string" ? value.trim() || fallback : fallback;
}

function normalizeConfig(input) {
  if (!input || typeof input.entity !== "string" || !input.entity.trim()) {
    throw new Error("Uninus Rain Card requires an entity");
  }

  const config = { ...DEFAULT_CONFIG, ...input, entity: input.entity.trim() };
  const textKeys = [
    "name",
    "rain_state",
    "dry_state",
    "rain_text",
    "dry_text",
    "unavailable_text",
    "unknown_text",
    "rain_status_text",
    "dry_status_text",
    "unavailable_status_text",
    "unknown_status_text",
    "rain_icon",
    "dry_icon",
    "unavailable_icon",
  ];
  for (const key of textKeys) config[key] = text(input[key], DEFAULT_CONFIG[key]);

  config.secondary_text = typeof input.secondary_text === "string"
    ? input.secondary_text.trim()
    : DEFAULT_CONFIG.secondary_text;
  config.secondary_attribute = typeof input.secondary_attribute === "string"
    ? input.secondary_attribute.trim()
    : DEFAULT_CONFIG.secondary_attribute;

  for (const key of [
    "rain_color",
    "rain_color_end",
    "rain_accent_color",
    "dry_color",
    "dry_color_end",
    "dry_accent_color",
    "unknown_color",
    "unknown_color_end",
    "text_color",
  ]) {
    config[key] = safeColor(input[key], DEFAULT_CONFIG[key]);
  }

  for (const key of ["animation", "show_status", "show_secondary"]) {
    config[key] = typeof input[key] === "boolean" ? input[key] : DEFAULT_CONFIG[key];
  }

  return config;
}

function resolveVisualState(state, config) {
  if (state === config.rain_state) {
    return {
      kind: "rain",
      icon: config.rain_icon,
      stateText: config.rain_text,
      statusText: config.rain_status_text,
      color: config.rain_color,
      colorEnd: config.rain_color_end,
      accent: config.rain_accent_color,
    };
  }

  if (state === config.dry_state) {
    return {
      kind: "dry",
      icon: config.dry_icon,
      stateText: config.dry_text,
      statusText: config.dry_status_text,
      color: config.dry_color,
      colorEnd: config.dry_color_end,
      accent: config.dry_accent_color,
    };
  }

  if (state === "unknown" || state === "unavailable" || state == null) {
    return {
      kind: "unavailable",
      icon: config.unavailable_icon,
      stateText: config.unavailable_text,
      statusText: config.unavailable_status_text,
      color: config.unknown_color,
      colorEnd: config.unknown_color_end,
      accent: "#cbd5e1",
    };
  }

  return {
    kind: "unknown",
    icon: config.unavailable_icon,
    stateText: config.unknown_text,
    statusText: config.unknown_status_text,
    color: config.unknown_color,
    colorEnd: config.unknown_color_end,
    accent: "#cbd5e1",
  };
}

function resolveSecondaryText(attributes, config) {
  const attribute = config.secondary_attribute;
  if (attribute && attributes && attributes[attribute] !== undefined && attributes[attribute] !== null) {
    return String(attributes[attribute]);
  }
  return config.secondary_text;
}

function resolveEditorValue(target, detail = undefined) {
  if (target?.dataset?.valueType === "boolean") return Boolean(target.checked);
  return detail?.value ?? target?.value;
}

function applyEditorChange(config, key, value) {
  const next = { ...config };
  if (value === "" || value === undefined || value === null) delete next[key];
  else next[key] = value;
  return next;
}

function getLayoutMode(width, height) {
  if (width < 360 && height >= 120 && height >= width * 1.15) return "portrait";
  if (width < 240) return "tiny";
  if (height >= 112 && width >= 360) return "expanded";
  if (width < 360 || height < 72) return "compact";
  return "regular";
}

const VERSION = "1.0.3";

class UninusRainCard extends i$2 {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _layout: { state: true },
  };

  constructor() {
    super();
    this._layout = "regular";
  }

  static async getConfigElement() {
    return document.createElement("uninus-rain-card-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states ?? {}).find(
      (entityId) => /^(sensor|binary_sensor)\./.test(entityId) && /rain|雨/i.test(entityId),
    );
    return { entity: entity ?? "sensor.rain_state", name: DEFAULT_CONFIG.name };
  }

  setConfig(config) {
    this._config = normalizeConfig(config);
  }

  getCardSize() {
    return this._layout === "expanded" ? 2 : 1;
  }

  getGridOptions() {
    return {
      columns: 6,
      rows: this._layout === "expanded" ? 2 : 1,
      min_columns: 3,
      min_rows: 1,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._ensureResizeObserver();
  }

  firstUpdated() {
    this._ensureResizeObserver();
  }

  _ensureResizeObserver() {
    if (typeof ResizeObserver === "undefined") return;
    if (!this._resizeObserver) {
      this._resizeObserver = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        const next = getLayoutMode(width, height);
        if (next !== this._layout) this._layout = next;
      });
    }
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    this._resizeObserver?.disconnect();
    super.disconnectedCallback();
  }

  _openMoreInfo() {
    if (!this._config?.entity) return;
    this.dispatchEvent(new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId: this._config.entity },
    }));
  }

  _handleKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this._openMoreInfo();
    }
  }

  render() {
    if (!this._config) return A;
    const entity = this.hass?.states?.[this._config.entity];
    const visual = resolveVisualState(entity?.state, this._config);
    const secondary = resolveSecondaryText(entity?.attributes, this._config);
    const raining = visual.kind === "rain";
    const animation = this._config.animation;
    const cardStyle = {
      "--state-color": visual.color,
      "--state-color-end": visual.colorEnd,
      "--state-accent": visual.accent,
      "--state-text": this._config.text_color,
    };

    return b`
      <ha-card
        class="weather-card ${this._layout} ${visual.kind} ${animation ? "animated" : ""}"
        style=${o(cardStyle)}
        role="button"
        tabindex="0"
        aria-label="${this._config.name}：${visual.stateText}"
        @click=${this._openMoreInfo}
        @keydown=${this._handleKeydown}
      >
        <div class="ambient" aria-hidden="true"></div>
        ${raining && animation ? b`
          <div class="rain-fx" aria-hidden="true">
            ${Array.from({ length: 9 }, (_, index) => b`<i style="--drop:${index}"></i>`)}
          </div>
        ` : A}

        <div class="content">
          <div class="icon-wrap" aria-hidden="true">
            <ha-icon icon=${visual.icon}></ha-icon>
          </div>

          <div class="copy">
            <div class="heading-row">
              <span class="name">${this._config.name}</span>
              ${this._config.show_secondary && secondary
                ? b`<span class="secondary">${secondary}</span>`
                : A}
            </div>
            <div class="state-text">${visual.stateText}</div>
          </div>

          ${this._config.show_status ? b`
            <div class="status" title=${visual.statusText}>
              <span class="status-dot"></span>
              <span class="status-label">${visual.statusText}</span>
            </div>
          ` : A}
        </div>
      </ha-card>
    `;
  }

  static styles = i$5`
    :host {
      display: block;
      height: 100%;
      min-width: 0;
      container-type: inline-size;
    }

    ha-card {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 64px;
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
      border-radius: var(--ha-card-border-radius, 16px);
      color: var(--state-text);
      background: linear-gradient(135deg, var(--state-color), var(--state-color-end));
      border: 1px solid color-mix(in srgb, var(--state-accent) 32%, transparent);
      box-shadow: 0 8px 22px color-mix(in srgb, var(--state-color) 34%, transparent),
        inset 0 1px 0 rgba(255, 255, 255, 0.17);
      cursor: pointer;
      isolation: isolate;
      transition: box-shadow 240ms ease, transform 160ms ease, background 240ms ease;
      -webkit-tap-highlight-color: transparent;
    }

    ha-card:hover {
      transform: translateY(-1px);
      box-shadow: 0 10px 28px color-mix(in srgb, var(--state-color) 42%, transparent),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }

    ha-card:focus-visible {
      outline: 3px solid color-mix(in srgb, var(--state-accent) 76%, white);
      outline-offset: 2px;
    }

    .content {
      position: relative;
      z-index: 3;
      height: 100%;
      min-height: 64px;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: clamp(40px, 11cqi, 52px) minmax(0, 1fr) auto;
      align-items: center;
      gap: clamp(8px, 2.6cqi, 14px);
      padding: clamp(7px, 2cqi, 12px) clamp(10px, 3cqi, 18px);
    }

    .icon-wrap {
      width: clamp(38px, 10cqi, 48px);
      aspect-ratio: 1;
      display: grid;
      place-items: center;
      border-radius: clamp(11px, 3cqi, 15px);
      color: var(--state-text);
      background: rgba(255, 255, 255, 0.14);
      border: 1px solid rgba(255, 255, 255, 0.17);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(8px);
    }

    .icon-wrap ha-icon {
      --mdc-icon-size: clamp(24px, 6.8cqi, 33px);
      filter: drop-shadow(0 0 8px color-mix(in srgb, var(--state-accent) 60%, transparent));
    }

    .copy {
      min-width: 0;
      display: grid;
      align-content: center;
      gap: 3px;
    }

    .heading-row {
      min-width: 0;
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    .name {
      flex: 0 0 auto;
      color: rgba(255, 255, 255, 0.82);
      font-size: clamp(10px, 2.7cqi, 13px);
      font-weight: 600;
      letter-spacing: 0.06em;
      line-height: 1.1;
      white-space: nowrap;
    }

    .secondary {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: rgba(255, 255, 255, 0.58);
      font-size: clamp(9px, 2.4cqi, 11px);
      font-weight: 500;
    }

    .state-text {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--state-text);
      font-size: clamp(15px, 4.5cqi, 22px);
      font-weight: 750;
      letter-spacing: 0.01em;
      line-height: 1.15;
      text-shadow: 0 1px 7px rgba(0, 0, 0, 0.18);
    }

    .status {
      min-width: max-content;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border-radius: 999px;
      color: white;
      background: rgba(15, 23, 42, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.22);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(8px);
      font-size: clamp(10px, 2.5cqi, 12px);
      font-weight: 700;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }

    .status-dot {
      width: 7px;
      height: 7px;
      flex: 0 0 7px;
      border-radius: 50%;
      background: var(--state-accent);
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--state-accent) 17%, transparent),
        0 0 10px color-mix(in srgb, var(--state-accent) 78%, transparent);
    }

    .ambient {
      position: absolute;
      z-index: 0;
      top: -60%;
      right: -10%;
      width: min(42cqi, 180px);
      aspect-ratio: 1;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.23), transparent 68%);
    }

    .rain-fx {
      position: absolute;
      inset: 0;
      z-index: 1;
      overflow: hidden;
      pointer-events: none;
      opacity: 0.34;
    }

    .rain-fx i {
      --x: calc(5% + var(--drop) * 12%);
      position: absolute;
      top: -35%;
      left: var(--x);
      width: 2px;
      height: clamp(17px, 5cqi, 28px);
      border-radius: 999px;
      background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.94));
      transform: rotate(12deg);
      animation: rain-drop calc(1.05s + var(--drop) * 0.06s) linear infinite;
      animation-delay: calc(var(--drop) * -0.19s);
    }

    ha-card.rain.animated {
      animation: rain-card-alert 2.5s ease-in-out infinite;
    }

    ha-card.rain.animated .status-dot {
      animation: status-pulse 1.25s ease-in-out infinite;
    }

    ha-card.dry.animated .icon-wrap ha-icon {
      animation: clear-icon-float 4s ease-in-out infinite;
    }

    ha-card.expanded .content {
      min-height: 112px;
      grid-template-columns: clamp(52px, 12cqi, 72px) minmax(0, 1fr) auto;
      padding-block: clamp(14px, 4cqi, 24px);
    }

    ha-card.expanded .icon-wrap {
      width: clamp(52px, 11cqi, 68px);
    }

    ha-card.expanded .icon-wrap ha-icon {
      --mdc-icon-size: clamp(31px, 7cqi, 42px);
    }

    ha-card.expanded .state-text {
      font-size: clamp(21px, 5.2cqi, 30px);
    }

    ha-card.portrait .content {
      min-height: 120px;
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto;
      justify-items: center;
      align-content: center;
      gap: clamp(8px, 5cqi, 16px);
      padding: clamp(12px, 8cqi, 22px) clamp(10px, 8cqi, 20px);
    }

    ha-card.portrait .icon-wrap {
      width: clamp(44px, 28cqi, 64px);
      border-radius: clamp(12px, 8cqi, 18px);
    }

    ha-card.portrait .icon-wrap ha-icon {
      --mdc-icon-size: clamp(27px, 18cqi, 38px);
    }

    ha-card.portrait .copy {
      width: 100%;
      justify-items: center;
      gap: 6px;
      text-align: center;
    }

    ha-card.portrait .heading-row {
      width: 100%;
      flex-direction: column;
      align-items: center;
      gap: 3px;
    }

    ha-card.portrait .name {
      font-size: clamp(10px, 7cqi, 13px);
    }

    ha-card.portrait .secondary {
      max-width: 100%;
      font-size: clamp(9px, 6cqi, 11px);
    }

    ha-card.portrait .state-text {
      display: -webkit-box;
      overflow: hidden;
      overflow-wrap: anywhere;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      white-space: normal;
      text-align: center;
      font-size: clamp(15px, 10cqi, 22px);
    }

    ha-card.portrait .status {
      justify-self: center;
      min-width: 0;
      max-width: 100%;
      box-sizing: border-box;
    }

    ha-card.portrait .status-label {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    ha-card.compact .content {
      grid-template-columns: 40px minmax(0, 1fr) auto;
      gap: 8px;
      padding: 7px 10px;
    }

    ha-card.compact .icon-wrap {
      width: 38px;
    }

    ha-card.compact .status {
      padding: 5px 8px;
    }

    ha-card.tiny .content {
      grid-template-columns: 36px minmax(0, 1fr) 18px;
      gap: 7px;
      padding: 6px 8px;
    }

    ha-card.tiny .icon-wrap {
      width: 34px;
      border-radius: 10px;
    }

    ha-card.tiny .icon-wrap ha-icon {
      --mdc-icon-size: 22px;
    }

    ha-card.tiny .secondary,
    ha-card.tiny .status-label {
      display: none;
    }

    ha-card.tiny .status {
      width: 18px;
      height: 18px;
      min-width: 18px;
      box-sizing: border-box;
      display: grid;
      place-items: center;
      padding: 0;
      border: 0;
      background: transparent;
    }

    ha-card.tiny .state-text {
      font-size: clamp(13px, 7cqi, 16px);
    }

    @keyframes rain-drop {
      0% { transform: translate3d(8px, -25px, 0) rotate(12deg); opacity: 0; }
      14% { opacity: 1; }
      100% { transform: translate3d(-24px, 180px, 0) rotate(12deg); opacity: 0; }
    }

    @keyframes rain-card-alert {
      0%, 100% {
        box-shadow: 0 8px 22px color-mix(in srgb, var(--state-color) 34%, transparent),
          inset 0 1px 0 rgba(255, 255, 255, 0.17);
      }
      50% {
        box-shadow: 0 10px 32px color-mix(in srgb, var(--state-accent) 52%, transparent),
          0 0 0 2px color-mix(in srgb, var(--state-accent) 13%, transparent),
          inset 0 1px 0 rgba(255, 255, 255, 0.22);
      }
    }

    @keyframes clear-icon-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }

    @keyframes status-pulse {
      0%, 100% { transform: scale(0.9); opacity: 0.78; }
      50% { transform: scale(1.18); opacity: 1; }
    }

    @media (prefers-reduced-motion: reduce) {
      ha-card,
      .rain-fx i,
      .status-dot,
      .icon-wrap ha-icon {
        animation: none !important;
        transition: none !important;
      }
    }
  `;
}

class UninusRainCardEditor extends i$2 {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = { ...config };
  }

  _changed(event) {
    const key = event.currentTarget.dataset.key;
    const value = resolveEditorValue(event.currentTarget, event.detail);
    this._emit(key, value);
  }

  _entityChanged(event) {
    this._emit("entity", event.detail?.value ?? event.target.value);
  }

  _emit(key, value) {
    this._config = applyEditorChange(this._config ?? {}, key, value);
    this.dispatchEvent(new CustomEvent("config-changed", {
      bubbles: true,
      composed: true,
      detail: { config: this._config },
    }));
  }

  _textField(key, label) {
    return b`
      <label class="text-field">
        <span>${label}</span>
        <input
          type="text"
          .value=${this._config?.[key] ?? DEFAULT_CONFIG[key] ?? ""}
          data-key=${key}
          @change=${this._changed}
        >
      </label>
    `;
  }

  _colorField(key, label) {
    const value = this._config?.[key] ?? DEFAULT_CONFIG[key];
    const pickerValue = /^#[0-9a-f]{6}$/i.test(value) ? value : DEFAULT_CONFIG[key];
    return b`
      <label class="color-field">
        <span>${label}</span>
        <div>
          <input type="color" .value=${pickerValue} data-key=${key} @change=${this._changed}>
          <code>${value}</code>
        </div>
      </label>
    `;
  }

  render() {
    if (!this.hass || !this._config) return A;
    const entity = this.hass.states?.[this._config.entity];
    const attributes = Object.keys(entity?.attributes ?? {}).sort();

    return b`
      <div class="editor">
        <section>
          <h3>基本設定</h3>
          <label class="field-label">降雨 Entity</label>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._config.entity ?? ""}
            .includeDomains=${["sensor", "binary_sensor"]}
            allow-custom-entity
            @value-changed=${this._entityChanged}
          ></ha-entity-picker>
          <div class="two-columns">
            ${this._textField("name", "卡片名稱")}
            ${this._textField("secondary_text", "左側副標文字")}
          </div>
          <label class="select-field">
            <span>副標 Attribute（有值時優先顯示）</span>
            <select data-key="secondary_attribute" @change=${this._changed}>
              <option value="">不使用 Attribute</option>
              ${attributes.map((attribute) => b`
                <option value=${attribute} ?selected=${this._config.secondary_attribute === attribute}>
                  ${attribute}
                </option>
              `)}
            </select>
          </label>
        </section>

        <section>
          <h3>狀態判斷與文字</h3>
          <div class="two-columns">
            ${this._textField("rain_state", "下雨狀態值")}
            ${this._textField("dry_state", "沒下雨狀態值")}
            ${this._textField("rain_text", "下雨主要文字")}
            ${this._textField("dry_text", "沒下雨主要文字")}
            ${this._textField("unavailable_text", "無法使用主要文字")}
            ${this._textField("unknown_text", "異常主要文字")}
            ${this._textField("rain_status_text", "下雨徽章文字")}
            ${this._textField("dry_status_text", "沒下雨徽章文字")}
            ${this._textField("unavailable_status_text", "無資料徽章文字")}
            ${this._textField("unknown_status_text", "異常徽章文字")}
            ${this._textField("rain_icon", "下雨圖示")}
            ${this._textField("dry_icon", "沒下雨圖示")}
            ${this._textField("unavailable_icon", "異常圖示")}
          </div>
        </section>

        <section>
          <h3>狀態顏色</h3>
          <div class="colors">
            ${this._colorField("rain_color", "下雨起始色")}
            ${this._colorField("rain_color_end", "下雨結束色")}
            ${this._colorField("rain_accent_color", "下雨強調色")}
            ${this._colorField("dry_color", "正常起始色")}
            ${this._colorField("dry_color_end", "正常結束色")}
            ${this._colorField("dry_accent_color", "正常強調色")}
            ${this._colorField("unknown_color", "異常起始色")}
            ${this._colorField("unknown_color_end", "異常結束色")}
            ${this._colorField("text_color", "文字顏色")}
          </div>
        </section>

        <section>
          <h3>顯示與動畫</h3>
          <div class="toggles">
            ${this._switch("animation", "啟用雨滴及狀態動畫")}
            ${this._switch("show_secondary", "顯示左側副標")}
            ${this._switch("show_status", "顯示右側狀態徽章")}
          </div>
        </section>
      </div>
    `;
  }

  _switch(key, label) {
    const checked = this._config?.[key] ?? DEFAULT_CONFIG[key];
    return b`
      <label class="switch-row">
        <span>${label}</span>
        <ha-switch .checked=${checked} data-key=${key} data-value-type="boolean" @change=${this._changed}></ha-switch>
      </label>
    `;
  }

  static styles = i$5`
    :host { display: block; }
    .editor { display: grid; gap: 16px; color: var(--primary-text-color); }
    section {
      display: grid;
      gap: 12px;
      padding: 14px;
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      background: color-mix(in srgb, var(--card-background-color) 94%, var(--primary-color) 6%);
    }
    h3 { margin: 0; font-size: 15px; font-weight: 700; }
    ha-entity-picker { width: 100%; }
    .field-label, .select-field > span, .text-field > span {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .two-columns, .colors { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
    .select-field, .text-field { min-width: 0; display: grid; gap: 7px; }
    .text-field input, select {
      width: 100%;
      box-sizing: border-box;
      min-height: 44px;
      padding: 0 12px;
      font: inherit;
      color: var(--primary-text-color);
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 8px;
    }
    .color-field {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      min-width: 0;
      padding: 8px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
    }
    .color-field > span { min-width: 0; font-size: 12px; }
    .color-field > div { display: flex; align-items: center; gap: 7px; }
    input[type="color"] { width: 30px; height: 30px; padding: 0; border: 0; background: none; cursor: pointer; }
    code { font-size: 10px; color: var(--secondary-text-color); }
    .toggles { display: grid; gap: 4px; }
    .switch-row { min-height: 40px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    @media (max-width: 560px) {
      .two-columns, .colors { grid-template-columns: 1fr; }
    }
  `;
}

if (!customElements.get("uninus-rain-card")) {
  customElements.define("uninus-rain-card", UninusRainCard);
}
if (!customElements.get("uninus-rain-card-editor")) {
  customElements.define("uninus-rain-card-editor", UninusRainCardEditor);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === "uninus-rain-card")) {
  window.customCards.push({
    type: "uninus-rain-card",
    name: "Uninus Rain Card",
    description: "專業、動畫化且自適應的 Home Assistant 降雨感測卡片",
    preview: true,
    documentationURL: "https://github.com/ivanlee1007/uninus-rain-card",
  });
}

export { UninusRainCard, UninusRainCardEditor, VERSION };
