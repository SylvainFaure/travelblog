(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{286:function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function i(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}function l(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t.indexOf(n=o[r])>=0||(i[n]=e[n]);return i}function u(e){return 1==(null!=(t=e)&&"object"==typeof t&&!1===Array.isArray(t))&&"[object Object]"===Object.prototype.toString.call(e);var t}var a=Object.prototype,f=a.toString,d=a.hasOwnProperty,v=/^\s*function (\w+)/;function s(e){var t,n=null!==(t=null==e?void 0:e.type)&&void 0!==t?t:e;if(n){var r=n.toString().match(v);return r?r[1]:""}return""}var y=function(e){var t,n;return!1!==u(e)&&"function"==typeof(t=e.constructor)&&!1!==u(n=t.prototype)&&!1!==n.hasOwnProperty("isPrototypeOf")},p=function(e){return e},h=function(e,t){return d.call(e,t)},b=Number.isInteger||function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e},g=Array.isArray||function(e){return"[object Array]"===f.call(e)},m=function(e){return"[object Function]"===f.call(e)},O=function(e){return y(e)&&h(e,"_vueTypes_name")},j=function(e){return y(e)&&(h(e,"type")||["_vueTypes_name","validator","default","required"].some((function(t){return h(e,t)})))};function _(e,t){return Object.defineProperty(e.bind(t),"__original",{value:e})}function w(e,t,n){var r;void 0===n&&(n=!1);var i=!0,o="";r=y(e)?e:{type:e};var u=O(r)?r._vueTypes_name+" - ":"";if(j(r)&&null!==r.type){if(void 0===r.type)return i;if(!r.required&&void 0===t)return i;void 0===r.type?o="any":g(r.type)?(i=r.type.some((function(e){return!0===w(e,t,!0)})),o=r.type.map((function(e){return s(e)})).join(" or ")):i="Array"===(o=s(r))?g(t):"Object"===o?y(t):"String"===o||"Number"===o||"Boolean"===o||"Function"===o?function(e){if(null==e)return"";var t=e.constructor.toString().match(v);return t?t[1]:""}(t)===o:t instanceof r.type}if(!i){var a=u+'value "'+t+'" should be of type "'+o+'"';return!1===n?(p(a),!1):a}if(h(r,"validator")&&m(r.validator)){var c=p,l=[];if(p=function(e){l.push(e)},i=r.validator(t),p=c,!i){var f=(l.length>1?"* ":"")+l.join("\n* ");return l.length=0,!1===n?(p(f),i):f}}return i}function x(e,t){var n=Object.defineProperties(t,{_vueTypes_name:{value:e,writable:!0},isRequired:{get:function(){return this.required=!0,this}},def:{value:function(e){return void 0===e?(h(this,"default")&&delete this.default,this):m(e)||!0===w(this,e,!0)?(this.default=g(e)?function(){return[].concat(e)}:y(e)?function(){return Object.assign({},e)}:e,this):(p(this._vueTypes_name+' - invalid default value: "'+e+'"'),this)}}}),r=n.validator;return m(r)&&(n.validator=_(r,n)),n}function k(e,t){var n=x(e,t);return Object.defineProperty(n,"validate",{value:function(e){return m(this.validator)&&p(this._vueTypes_name+" - calling .validate() will overwrite the current custom validator function. Validator info:\n"+JSON.stringify(this)),this.validator=_(e,this),this}})}function T(e,t,n){var r,i,u=(r=t,i={},Object.getOwnPropertyNames(r).forEach((function(e){i[e]=Object.getOwnPropertyDescriptor(r,e)})),Object.defineProperties({},i));if(u._vueTypes_name=e,!y(n))return u;var a,o,c=n.validator,f=l(n,["validator"]);if(m(c)){var s=u.validator;s&&(s=null!==(o=(a=s).__original)&&void 0!==o?o:a),u.validator=_(s?function(e){return s.call(this,e)&&c.call(this,e)}:c,u)}return Object.assign(u,f)}function P(e){return e.replace(/^(?!\s*$)/gm,"  ")}var $=function(){function e(){}return e.extend=function(e){var t=this;if(g(e))return e.forEach((function(e){return t.extend(e)})),this;var n=e.name,r=e.validate,i=void 0!==r&&r,u=e.getter,a=void 0!==u&&u,o=l(e,["name","validate","getter"]);if(h(this,n))throw new TypeError('[VueTypes error]: Type "'+n+'" already defined');var c,f=o.type;return O(f)?(delete o.type,Object.defineProperty(this,n,a?{get:function(){return T(n,f,o)}}:{value:function(){var e,t=T(n,f,o);return t.validator&&(t.validator=(e=t.validator).bind.apply(e,[t].concat([].slice.call(arguments)))),t}})):(c=a?{get:function(){var e=Object.assign({},o);return i?k(n,e):x(n,e)},enumerable:!0}:{value:function(){var e,t,r=Object.assign({},o);return e=i?k(n,r):x(n,r),r.validator&&(e.validator=(t=r.validator).bind.apply(t,[e].concat([].slice.call(arguments)))),e},enumerable:!0},Object.defineProperty(this,n,c))},o(e,null,[{key:"any",get:function(){return k("any",{})}},{key:"func",get:function(){return k("function",{type:Function}).def(this.defaults.func)}},{key:"bool",get:function(){return k("boolean",{type:Boolean}).def(this.defaults.bool)}},{key:"string",get:function(){return k("string",{type:String}).def(this.defaults.string)}},{key:"number",get:function(){return k("number",{type:Number}).def(this.defaults.number)}},{key:"array",get:function(){return k("array",{type:Array}).def(this.defaults.array)}},{key:"object",get:function(){return k("object",{type:Object}).def(this.defaults.object)}},{key:"integer",get:function(){return x("integer",{type:Number,validator:function(e){return b(e)}}).def(this.defaults.integer)}},{key:"symbol",get:function(){return x("symbol",{validator:function(e){return"symbol"==typeof e}})}}]),e}();$.defaults={},$.custom=function(e,t){if(void 0===t&&(t="custom validation failed"),"function"!=typeof e)throw new TypeError("[VueTypes error]: You must provide a function as argument");return x(e.name||"<<anonymous function>>",{validator:function(n){var r=e(n);return r||p(this._vueTypes_name+" - "+t),r}})},$.oneOf=function(e){if(!g(e))throw new TypeError("[VueTypes error]: You must provide an array as argument.");var t='oneOf - value should be one of "'+e.join('", "')+'."',n=e.reduce((function(e,t){if(null!=t){var n=t.constructor;-1===e.indexOf(n)&&e.push(n)}return e}),[]);return x("oneOf",{type:n.length>0?n:void 0,validator:function(n){var r=-1!==e.indexOf(n);return r||p(t),r}})},$.instanceOf=function(e){return x("instanceOf",{type:e})},$.oneOfType=function(e){if(!g(e))throw new TypeError("[VueTypes error]: You must provide an array as argument");for(var t=!1,n=[],r=0;r<e.length;r+=1){var i=e[r];if(j(i)){if(O(i)&&"oneOf"===i._vueTypes_name){n=n.concat(i.type||[]);continue}if(m(i.validator)&&(t=!0),void 0!==i.type){n=n.concat(i.type);continue}}n.push(i)}return n=n.filter((function(e,t){return n.indexOf(e)===t})),x("oneOfType",t?{type:n,validator:function(t){var n=[],r=e.some((function(e){var r=w(O(e)&&"oneOf"===e._vueTypes_name?e.type||null:e,t,!0);return"string"==typeof r&&n.push(r),!0===r}));return r||p("oneOfType - provided value does not match any of the "+n.length+" passed-in validators:\n"+P(n.join("\n"))),r}}:{type:n})},$.arrayOf=function(e){return x("arrayOf",{type:Array,validator:function(t){var n,r=t.every((function(t){return!0===(n=w(e,t,!0))}));return r||p("arrayOf - value validation error:\n"+P(n)),r}})},$.objectOf=function(e){return x("objectOf",{type:Object,validator:function(t){var n,r=Object.keys(t).every((function(r){return!0===(n=w(e,t[r],!0))}));return r||p("objectOf - value validation error:\n"+P(n)),r}})},$.shape=function(e){var t=Object.keys(e),n=t.filter((function(t){var n;return!!(null===(n=e[t])||void 0===n?void 0:n.required)})),r=x("shape",{type:Object,validator:function(r){var i=this;if(!y(r))return!1;var o=Object.keys(r);if(n.length>0&&n.some((function(e){return-1===o.indexOf(e)}))){var u=n.filter((function(e){return-1===o.indexOf(e)}));return p(1===u.length?'shape - required property "'+u[0]+'" is not defined.':'shape - required properties "'+u.join('", "')+'" are not defined.'),!1}return o.every((function(n){if(-1===t.indexOf(n))return!0===i._vueTypes_isLoose||(p('shape - shape definition does not include a "'+n+'" property. Allowed keys: "'+t.join('", "')+'".'),!1);var o=w(e[n],r[n],!0);return"string"==typeof o&&p('shape - "'+n+'" property validation error:\n '+P(o)),!0===o}))}});return Object.defineProperty(r,"_vueTypes_isLoose",{writable:!0,value:!1}),Object.defineProperty(r,"loose",{get:function(){return this._vueTypes_isLoose=!0,this}}),r},$.utils={validate:function(e,t){return!0===w(t,e,!0)},toType:function(e,t,n){return void 0===n&&(n=!1),n?k(e,t):x(e,t)}};var C=function(e){function t(){return e.apply(this,arguments)||this}return i(t,e),t}(function(e){var t;return void 0===e&&(e={func:function(){},bool:!0,string:"",number:0,array:function(){return[]},object:function(){return{}},integer:0}),(t=function(t){function n(){return t.apply(this,arguments)||this}return i(n,t),o(n,null,[{key:"sensibleDefaults",get:function(){return c({},this.defaults)},set:function(t){this.defaults=!1!==t?c({},!0!==t?t:e):{}}}]),n}($)).defaults=c({},e),t}());t.a=C},287:function(e,t,n){"use strict";n.r(t);n(62);var r=n(286),o={props:{type:r.a.string.def("primary"),label:r.a.string.def("Save"),iconBtn:r.a.bool.def(!1),icon:r.a.string.def("checkmark"),additionalClasses:r.a.string.def("")},computed:{classes:function(){var e=this.iconBtn?"px-4 py-2":"p-2";return"bg-".concat(this.type||"primary"," ").concat("raw"===this.type?"":"border text-white"," ").concat(e)}}},c=n(23),component=Object(c.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{class:[e.classes,e.additionalClasses,"rounded text-center"],attrs:{type:"button"},on:{click:function(t){return e.$emit("click")}}},[e.iconBtn?n("span",{directives:[{name:"tooltip",rawName:"v-tooltip",value:e.label,expression:"label"}]},[n("Icon",{attrs:{name:e.icon}})],1):n("span",[e._v(e._s(e.label))])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Icon:n(289).default})},289:function(e,t,n){"use strict";n.r(t);var r=n(286),o={props:{name:r.a.string.def(""),small:r.a.bool.def(!1)}},c=n(23),component=Object(c.a)(o,(function(){var e=this.$createElement,t=this._self._c||e;return t("svg",this._g({class:{"fill-current icon":!0,"cursor-pointer":!!this.$listeners,"w-2 h-2":this.small,"w-4 h-4":!this.small}},this.$listeners),[t("use",{attrs:{"xlink:href":"#icon-"+this.name}})])}),[],!1,null,null,null);t.default=component.exports},293:function(e,t,n){"use strict";n.r(t);var r={},o=n(23),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("portal",{attrs:{to:"modal"}},[n("div",{staticClass:"flex flex-col justify-center items-center m-16"},[n("h4",{staticClass:"font-bold text-lg text-center mb-4"},[e._v(e._s(e.$t("general.sure")))]),e._v(" "),n("div",{staticClass:"flex justify-center"},[n("Btn",{attrs:{label:e.$t("general.confirm"),"additional-classes":"mr-4"},on:{click:function(t){return e.$emit("confirm")}}}),e._v(" "),n("Btn",{attrs:{label:e.$t("general.cancel"),type:"secondary"},on:{click:function(t){return e.$emit("cancel")}}})],1)])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Btn:n(287).default})},370:function(e,t,n){"use strict";n.r(t);n(19),n(30),n(17),n(46),n(47),n(31),n(16),n(36),n(18),n(37);var r=n(12),o=n(15),c=(n(32),n(4)),l=n(26);function f(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v={asyncData:function(e){return Object(c.a)(regeneratorRuntime.mark((function t(){var n,r,c,l,f,d,v,y,h,m,O;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.app,r=e.$axios,c=n.i18n.locale,l=[],f=[],d=[],t.prev=5,t.next=8,Promise.all([r.get("/api/anecdotes"),r.get("/api/articles"),r.get("/api/assets")]);case 8:v=t.sent,y=Object(o.a)(v,3),h=y[0],m=y[1],O=y[2],l=h.data,f=m.data,d=O.data,t.next=21;break;case 18:t.prev=18,t.t0=t.catch(5),console.warn(t.t0);case 21:return t.abrupt("return",{locale:c,anecdotes:l,articles:f,assets:d,columns:["title","actions"],anecdoteToDelete:null,anecdoteToEdit:null});case 22:case"end":return t.stop()}}),t,null,[[5,18]])})))()},computed:d({},Object(l.c)("modal",["modalId"])),methods:d(d({},Object(l.b)("modal",["setVisible","setModalId"])),{},{reloadData:function(){var e=this;return Object(c.a)(regeneratorRuntime.mark((function t(){var n,data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$axios.get("/api/anecdotes");case 3:n=t.sent,data=n.data,e.anecdotes=data||[],t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.warn(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()},getColumnValue:function(col,e){return e["anecdote_".concat(col)]},openRemoveModal:function(e){this.anecdoteToDelete=e,this.setModalId("remove-anecdote"),this.setVisible(!0)},closeModal:function(){this.setModalId(null),this.setVisible(!1)},removeAnecdote:function(){var e=this;return Object(c.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$axios.delete("/api/anecdotes/".concat(e.anecdoteToDelete.anecdote_id));case 3:e.$toast.success(e.$t("anecdotes.remove.success")),e.closeModal(),e.anecdoteToDelete=null,e.reloadData(),t.next=13;break;case 9:t.prev=9,t.t0=t.catch(0),console.warn(t.t0),e.$toast.error(e.$t("anecdotes.remove.error"));case 13:case"end":return t.stop()}}),t,null,[[0,9]])})))()},goToNewAnecdote:function(){this.$router.push("/anecdotes/new")}})},y=n(23),component=Object(y.a)(v,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"anecdotes-page flex justify-center"},[n("div",{staticClass:"anecdotes-page__container m-4 w-2/3"},[n("table",{staticClass:"table-fixed w-full"},[n("thead",{staticClass:"border-t-2 border-blue-500"},[n("tr",e._l(e.columns,(function(col){return n("th",{key:col,class:{"px-4 py-2":!0,"w-1/4":"desc"!==col,"w-1/2":"desc"===col}},[e._v("\n            "+e._s(e.$t("anecdotes."+col))+"\n          ")])})),0)]),e._v(" "),n("tbody",e._l(e.anecdotes,(function(t,i){return n("tr",{key:t.anecdote_id,class:{"bg-gray-200":i%2==0}},e._l(e.columns,(function(col,r){return n("td",{key:col+"-"+r,staticClass:"border-b-2 border px-4 py-2"},["actions"!==col?n("div",{domProps:{innerHTML:e._s(e.getColumnValue(col,t))}}):n("div",{staticClass:"flex justify-center"},[n("nuxt-link",{attrs:{to:"/anecdotes/"+t.anecdote_id}},[n("Icon",{attrs:{name:"pencil"}})],1),e._v(" "),n("Icon",{staticClass:"mx-4",attrs:{name:"bin"},on:{click:function(n){return e.openRemoveModal(t)}}})],1)])})),0)})),0)]),e._v(" "),n("div",{staticClass:"flex justify-end w-full my-4"},[n("Btn",{attrs:{"icon-btn":"",icon:"plus"},on:{click:e.goToNewAnecdote}})],1)]),e._v(" "),"remove-anecdote"===e.modalId?n("RemoveModal",{on:{confirm:e.removeAnecdote,cancel:e.closeModal}}):e._e()],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Icon:n(289).default,Btn:n(287).default,RemoveModal:n(293).default})}}]);