(window.webpackJsonp=window.webpackJsonp||[]).push([[21,11,29],{470:function(t,e,r){"use strict";function n(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function o(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}function c(){return(c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t}).apply(this,arguments)}function i(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}function l(t,e){if(null==t)return{};var r,n,i={},o=Object.keys(t);for(n=0;n<o.length;n++)e.indexOf(r=o[n])>=0||(i[r]=t[r]);return i}function u(t){return 1==(null!=(e=t)&&"object"==typeof e&&!1===Array.isArray(e))&&"[object Object]"===Object.prototype.toString.call(t);var e}var a=Object.prototype,f=a.toString,d=a.hasOwnProperty,v=/^\s*function (\w+)/;function s(t){var e,r=null!==(e=null==t?void 0:t.type)&&void 0!==e?e:t;if(r){var n=r.toString().match(v);return n?n[1]:""}return""}var y=function(t){var e,r;return!1!==u(t)&&"function"==typeof(e=t.constructor)&&!1!==u(r=e.prototype)&&!1!==r.hasOwnProperty("isPrototypeOf")},p=function(t){return t},h=function(t,e){return d.call(t,e)},b=Number.isInteger||function(t){return"number"==typeof t&&isFinite(t)&&Math.floor(t)===t},g=Array.isArray||function(t){return"[object Array]"===f.call(t)},_=function(t){return"[object Function]"===f.call(t)},m=function(t){return y(t)&&h(t,"_vueTypes_name")},O=function(t){return y(t)&&(h(t,"type")||["_vueTypes_name","validator","default","required"].some((function(e){return h(t,e)})))};function j(t,e){return Object.defineProperty(t.bind(e),"__original",{value:t})}function T(t,e,r){var n;void 0===r&&(r=!1);var i=!0,o="";n=y(t)?t:{type:t};var u=m(n)?n._vueTypes_name+" - ":"";if(O(n)&&null!==n.type){if(void 0===n.type)return i;if(!n.required&&void 0===e)return i;void 0===n.type?o="any":g(n.type)?(i=n.type.some((function(t){return!0===T(t,e,!0)})),o=n.type.map((function(t){return s(t)})).join(" or ")):i="Array"===(o=s(n))?g(e):"Object"===o?y(e):"String"===o||"Number"===o||"Boolean"===o||"Function"===o?function(t){if(null==t)return"";var e=t.constructor.toString().match(v);return e?e[1]:""}(e)===o:e instanceof n.type}if(!i){var a=u+'value "'+e+'" should be of type "'+o+'"';return!1===r?(p(a),!1):a}if(h(n,"validator")&&_(n.validator)){var c=p,l=[];if(p=function(t){l.push(t)},i=n.validator(e),p=c,!i){var f=(l.length>1?"* ":"")+l.join("\n* ");return l.length=0,!1===r?(p(f),i):f}}return i}function w(t,e){var r=Object.defineProperties(e,{_vueTypes_name:{value:t,writable:!0},isRequired:{get:function(){return this.required=!0,this}},def:{value:function(t){return void 0===t?(h(this,"default")&&delete this.default,this):_(t)||!0===T(this,t,!0)?(this.default=g(t)?function(){return[].concat(t)}:y(t)?function(){return Object.assign({},t)}:t,this):(p(this._vueTypes_name+' - invalid default value: "'+t+'"'),this)}}}),n=r.validator;return _(n)&&(r.validator=j(n,r)),r}function A(t,e){var r=w(t,e);return Object.defineProperty(r,"validate",{value:function(t){return _(this.validator)&&p(this._vueTypes_name+" - calling .validate() will overwrite the current custom validator function. Validator info:\n"+JSON.stringify(this)),this.validator=j(t,this),this}})}function S(t,e,r){var n,i,u=(n=e,i={},Object.getOwnPropertyNames(n).forEach((function(t){i[t]=Object.getOwnPropertyDescriptor(n,t)})),Object.defineProperties({},i));if(u._vueTypes_name=t,!y(r))return u;var a,o,c=r.validator,f=l(r,["validator"]);if(_(c)){var s=u.validator;s&&(s=null!==(o=(a=s).__original)&&void 0!==o?o:a),u.validator=j(s?function(t){return s.call(this,t)&&c.call(this,t)}:c,u)}return Object.assign(u,f)}function I(t){return t.replace(/^(?!\s*$)/gm,"  ")}var R=function(){function t(){}return t.extend=function(t){var e=this;if(g(t))return t.forEach((function(t){return e.extend(t)})),this;var r=t.name,n=t.validate,i=void 0!==n&&n,u=t.getter,a=void 0!==u&&u,o=l(t,["name","validate","getter"]);if(h(this,r))throw new TypeError('[VueTypes error]: Type "'+r+'" already defined');var c,f=o.type;return m(f)?(delete o.type,Object.defineProperty(this,r,a?{get:function(){return S(r,f,o)}}:{value:function(){var t,e=S(r,f,o);return e.validator&&(e.validator=(t=e.validator).bind.apply(t,[e].concat([].slice.call(arguments)))),e}})):(c=a?{get:function(){var t=Object.assign({},o);return i?A(r,t):w(r,t)},enumerable:!0}:{value:function(){var t,e,n=Object.assign({},o);return t=i?A(r,n):w(r,n),n.validator&&(t.validator=(e=n.validator).bind.apply(e,[t].concat([].slice.call(arguments)))),t},enumerable:!0},Object.defineProperty(this,r,c))},o(t,null,[{key:"any",get:function(){return A("any",{})}},{key:"func",get:function(){return A("function",{type:Function}).def(this.defaults.func)}},{key:"bool",get:function(){return A("boolean",{type:Boolean}).def(this.defaults.bool)}},{key:"string",get:function(){return A("string",{type:String}).def(this.defaults.string)}},{key:"number",get:function(){return A("number",{type:Number}).def(this.defaults.number)}},{key:"array",get:function(){return A("array",{type:Array}).def(this.defaults.array)}},{key:"object",get:function(){return A("object",{type:Object}).def(this.defaults.object)}},{key:"integer",get:function(){return w("integer",{type:Number,validator:function(t){return b(t)}}).def(this.defaults.integer)}},{key:"symbol",get:function(){return w("symbol",{validator:function(t){return"symbol"==typeof t}})}}]),t}();R.defaults={},R.custom=function(t,e){if(void 0===e&&(e="custom validation failed"),"function"!=typeof t)throw new TypeError("[VueTypes error]: You must provide a function as argument");return w(t.name||"<<anonymous function>>",{validator:function(r){var n=t(r);return n||p(this._vueTypes_name+" - "+e),n}})},R.oneOf=function(t){if(!g(t))throw new TypeError("[VueTypes error]: You must provide an array as argument.");var e='oneOf - value should be one of "'+t.join('", "')+'".',r=t.reduce((function(t,e){if(null!=e){var r=e.constructor;-1===t.indexOf(r)&&t.push(r)}return t}),[]);return w("oneOf",{type:r.length>0?r:void 0,validator:function(r){var n=-1!==t.indexOf(r);return n||p(e),n}})},R.instanceOf=function(t){return w("instanceOf",{type:t})},R.oneOfType=function(t){if(!g(t))throw new TypeError("[VueTypes error]: You must provide an array as argument");for(var e=!1,r=[],n=0;n<t.length;n+=1){var i=t[n];if(O(i)){if(m(i)&&"oneOf"===i._vueTypes_name){r=r.concat(i.type||[]);continue}if(_(i.validator)&&(e=!0),void 0!==i.type){r=r.concat(i.type);continue}}r.push(i)}return r=r.filter((function(t,e){return r.indexOf(t)===e})),w("oneOfType",e?{type:r,validator:function(e){var r=[],n=t.some((function(t){var n=T(m(t)&&"oneOf"===t._vueTypes_name?t.type||null:t,e,!0);return"string"==typeof n&&r.push(n),!0===n}));return n||p("oneOfType - provided value does not match any of the "+r.length+" passed-in validators:\n"+I(r.join("\n"))),n}}:{type:r})},R.arrayOf=function(t){return w("arrayOf",{type:Array,validator:function(e){var r,n=e.every((function(e){return!0===(r=T(t,e,!0))}));return n||p("arrayOf - value validation error:\n"+I(r)),n}})},R.objectOf=function(t){return w("objectOf",{type:Object,validator:function(e){var r,n=Object.keys(e).every((function(n){return!0===(r=T(t,e[n],!0))}));return n||p("objectOf - value validation error:\n"+I(r)),n}})},R.shape=function(t){var e=Object.keys(t),r=e.filter((function(e){var r;return!!(null===(r=t[e])||void 0===r?void 0:r.required)})),n=w("shape",{type:Object,validator:function(n){var i=this;if(!y(n))return!1;var o=Object.keys(n);if(r.length>0&&r.some((function(t){return-1===o.indexOf(t)}))){var u=r.filter((function(t){return-1===o.indexOf(t)}));return p(1===u.length?'shape - required property "'+u[0]+'" is not defined.':'shape - required properties "'+u.join('", "')+'" are not defined.'),!1}return o.every((function(r){if(-1===e.indexOf(r))return!0===i._vueTypes_isLoose||(p('shape - shape definition does not include a "'+r+'" property. Allowed keys: "'+e.join('", "')+'".'),!1);var o=T(t[r],n[r],!0);return"string"==typeof o&&p('shape - "'+r+'" property validation error:\n '+I(o)),!0===o}))}});return Object.defineProperty(n,"_vueTypes_isLoose",{writable:!0,value:!1}),Object.defineProperty(n,"loose",{get:function(){return this._vueTypes_isLoose=!0,this}}),n},R.utils={validate:function(t,e){return!0===T(e,t,!0)},toType:function(t,e,r){return void 0===r&&(r=!1),r?A(t,e):w(t,e)}};var E=function(t){function e(){return t.apply(this,arguments)||this}return i(e,t),e}(function(t){var e;return void 0===t&&(t={func:function(){},bool:!0,string:"",number:0,array:function(){return[]},object:function(){return{}},integer:0}),(e=function(e){function r(){return e.apply(this,arguments)||this}return i(r,e),o(r,null,[{key:"sensibleDefaults",get:function(){return c({},this.defaults)},set:function(e){this.defaults=!1!==e?c({},!0!==e?e:t):{}}}]),r}(R)).defaults=c({},t),e}());e.a=E},472:function(t,e,r){"use strict";r.r(e);r(473),r(26);var n=r(470),o={props:{name:n.a.string.def(""),small:n.a.bool.def(!1)}},c=r(36),component=Object(c.a)(o,(function(){var t=this,e=t._self._c;return e("svg",t._g({class:{"fill-current icon":!0,"cursor-pointer":!!t.$listeners,"w-2 h-2":t.small,"w-4 h-4":!t.small}},t.$listeners),[e("use",{attrs:{"xlink:href":"#icon-".concat(t.name)}})])}),[],!1,null,null,null);e.default=component.exports},473:function(t,e,r){"use strict";var n=r(2),o=r(475);n({target:"String",proto:!0,forced:r(476)("small")},{small:function(){return o(this,"small","","")}})},475:function(t,e,r){var n=r(4),o=r(41),c=r(16),l=/"/g,f=n("".replace);t.exports=function(t,e,r,n){var d=c(o(t)),v="<"+e;return""!==r&&(v+=" "+r+'="'+f(c(n),l,"&quot;")+'"'),v+">"+d+"</"+e+">"}},476:function(t,e,r){var n=r(3);t.exports=function(t){return n((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},509:function(t,e,r){var n=r(8);t.exports=function(t){return n(Set.prototype.values,t)}},533:function(t,e,r){r(534)},534:function(t,e,r){"use strict";r(270)("Set",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),r(271))},535:function(t,e,r){"use strict";r(2)({target:"Set",proto:!0,real:!0,forced:!0},{addAll:r(536)})},536:function(t,e,r){"use strict";var n=r(8),o=r(22),c=r(5);t.exports=function(){for(var t=c(this),e=o(t.add),r=0,l=arguments.length;r<l;r++)n(e,t,arguments[r]);return t}},537:function(t,e,r){"use strict";r(2)({target:"Set",proto:!0,real:!0,forced:!0},{deleteAll:r(272)})},538:function(t,e,r){"use strict";var n=r(2),o=r(23),c=r(8),l=r(22),f=r(5),d=r(71),v=r(21);n({target:"Set",proto:!0,real:!0,forced:!0},{difference:function(t){var e=f(this),r=new(d(e,o("Set")))(e),n=l(r.delete);return v(t,(function(t){c(n,r,t)})),r}})},539:function(t,e,r){"use strict";var n=r(2),o=r(5),c=r(28),l=r(509),f=r(21);n({target:"Set",proto:!0,real:!0,forced:!0},{every:function(t){var e=o(this),r=l(e),n=c(t,arguments.length>1?arguments[1]:void 0);return!f(r,(function(t,r){if(!n(t,t,e))return r()}),{IS_ITERATOR:!0,INTERRUPTED:!0}).stopped}})},540:function(t,e,r){"use strict";var n=r(2),o=r(23),c=r(8),l=r(22),f=r(5),d=r(28),v=r(71),y=r(509),h=r(21);n({target:"Set",proto:!0,real:!0,forced:!0},{filter:function(t){var e=f(this),r=y(e),n=d(t,arguments.length>1?arguments[1]:void 0),_=new(v(e,o("Set"))),m=l(_.add);return h(r,(function(t){n(t,t,e)&&c(m,_,t)}),{IS_ITERATOR:!0}),_}})},541:function(t,e,r){"use strict";var n=r(2),o=r(5),c=r(28),l=r(509),f=r(21);n({target:"Set",proto:!0,real:!0,forced:!0},{find:function(t){var e=o(this),r=l(e),n=c(t,arguments.length>1?arguments[1]:void 0);return f(r,(function(t,r){if(n(t,t,e))return r(t)}),{IS_ITERATOR:!0,INTERRUPTED:!0}).result}})},542:function(t,e,r){"use strict";var n=r(2),o=r(23),c=r(8),l=r(22),f=r(5),d=r(71),v=r(21);n({target:"Set",proto:!0,real:!0,forced:!0},{intersection:function(t){var e=f(this),r=new(d(e,o("Set"))),n=l(e.has),y=l(r.add);return v(t,(function(t){c(n,e,t)&&c(y,r,t)})),r}})},543:function(t,e,r){"use strict";var n=r(2),o=r(8),c=r(22),l=r(5),f=r(21);n({target:"Set",proto:!0,real:!0,forced:!0},{isDisjointFrom:function(t){var e=l(this),r=c(e.has);return!f(t,(function(t,n){if(!0===o(r,e,t))return n()}),{INTERRUPTED:!0}).stopped}})},544:function(t,e,r){"use strict";var n=r(2),o=r(23),c=r(8),l=r(22),f=r(9),d=r(5),v=r(141),y=r(21);n({target:"Set",proto:!0,real:!0,forced:!0},{isSubsetOf:function(t){var e=v(this),r=d(t),n=r.has;return f(n)||(r=new(o("Set"))(t),n=l(r.has)),!y(e,(function(t,e){if(!1===c(n,r,t))return e()}),{IS_ITERATOR:!0,INTERRUPTED:!0}).stopped}})},545:function(t,e,r){"use strict";var n=r(2),o=r(8),c=r(22),l=r(5),f=r(21);n({target:"Set",proto:!0,real:!0,forced:!0},{isSupersetOf:function(t){var e=l(this),r=c(e.has);return!f(t,(function(t,n){if(!1===o(r,e,t))return n()}),{INTERRUPTED:!0}).stopped}})},546:function(t,e,r){"use strict";var n=r(2),o=r(4),c=r(5),l=r(16),f=r(509),d=r(21),v=o([].join),y=[].push;n({target:"Set",proto:!0,real:!0,forced:!0},{join:function(t){var e=c(this),r=f(e),n=void 0===t?",":l(t),o=[];return d(r,y,{that:o,IS_ITERATOR:!0}),v(o,n)}})},547:function(t,e,r){"use strict";var n=r(2),o=r(23),c=r(28),l=r(8),f=r(22),d=r(5),v=r(71),y=r(509),h=r(21);n({target:"Set",proto:!0,real:!0,forced:!0},{map:function(t){var e=d(this),r=y(e),n=c(t,arguments.length>1?arguments[1]:void 0),_=new(v(e,o("Set"))),m=f(_.add);return h(r,(function(t){l(m,_,n(t,t,e))}),{IS_ITERATOR:!0}),_}})},548:function(t,e,r){"use strict";var n=r(2),o=r(22),c=r(5),l=r(509),f=r(21),d=TypeError;n({target:"Set",proto:!0,real:!0,forced:!0},{reduce:function(t){var e=c(this),r=l(e),n=arguments.length<2,v=n?void 0:arguments[1];if(o(t),f(r,(function(r){n?(n=!1,v=r):v=t(v,r,r,e)}),{IS_ITERATOR:!0}),n)throw d("Reduce of empty set with no initial value");return v}})},549:function(t,e,r){"use strict";var n=r(2),o=r(5),c=r(28),l=r(509),f=r(21);n({target:"Set",proto:!0,real:!0,forced:!0},{some:function(t){var e=o(this),r=l(e),n=c(t,arguments.length>1?arguments[1]:void 0);return f(r,(function(t,r){if(n(t,t,e))return r()}),{IS_ITERATOR:!0,INTERRUPTED:!0}).stopped}})},550:function(t,e,r){"use strict";var n=r(2),o=r(23),c=r(8),l=r(22),f=r(5),d=r(71),v=r(21);n({target:"Set",proto:!0,real:!0,forced:!0},{symmetricDifference:function(t){var e=f(this),r=new(d(e,o("Set")))(e),n=l(r.delete),y=l(r.add);return v(t,(function(t){c(n,r,t)||c(y,r,t)})),r}})},551:function(t,e,r){"use strict";var n=r(2),o=r(23),c=r(22),l=r(5),f=r(71),d=r(21);n({target:"Set",proto:!0,real:!0,forced:!0},{union:function(t){var e=l(this),r=new(f(e,o("Set")))(e);return d(t,c(r.add),{that:r}),r}})},562:function(t,e,r){"use strict";r.r(e);var n=r(179),o=(r(11),r(20),r(30),r(44),r(58),r(57),r(45),r(32),r(533),r(535),r(537),r(538),r(539),r(540),r(541),r(542),r(543),r(544),r(545),r(546),r(547),r(548),r(549),r(550),r(551),r(33),r(470)),c=r(525),l={components:{draggable:r.n(c).a},props:{assets:o.a.array.def([]),travels:o.a.array.def([]),articles:o.a.array.def([])},data:function(){var t=this.$i18n.locale;return{locale:t,otherLocale:"fr"===t?"it":"fr",mounted:!1,assetsByArticle:{},modifiedAssetsIds:{}}},mounted:function(){var t=this;this.locale=this.$i18n.locale,this.articles.forEach((function(article){t.$set(t.assetsByArticle,article.article_id,t.assets.filter((function(t){return t.asset_article_ids.includes(article.article_id)})))})),this.mounted=!0},methods:{handleAssetChange:function(t,e){if(t.added){var r=t.added.element,o=!!this.modifiedAssetsIds[r.asset_id]?[].concat(Object(n.a)(r.asset_article_ids),Object(n.a)(this.modifiedAssetsIds[r.asset_id].present)):Object(n.a)(r.asset_article_ids);this.modifiedAssetsIds[r.asset_id]={past:r.asset_article_ids,present:Array.from(new Set([].concat(Object(n.a)(o),[e])))}}},removeAssetFromArticle:function(t,e){var r=!!this.modifiedAssetsIds[t.asset_id];this.modifiedAssetsIds[t.asset_id]={past:t.asset_article_ids,present:r?this.modifiedAssetsIds[t.asset_id].present.filter((function(a){return a!==t.asset_id})):t.asset_article_ids.filter((function(a){return a!==e}))},this.assetsByArticle[e]=this.assetsByArticle[e].filter((function(a){return a.asset_id!==t.asset_id}))},getModifiedAssets:function(){return this.modifiedAssetsIds}}},f=r(36),component=Object(f.a)(l,(function(){var t=this,e=t._self._c;return t.mounted?e("div",{staticClass:"flex"},[e("div",{staticClass:"assets-list w-1/3 p-4 h-3/4 overflow-y-scroll"},[e("h3",[t._v(t._s(t.$t("assets.non_associated")))]),t._v(" "),e("draggable",{class:{"flex flex-wrap py-8":!!t.assets.length},attrs:{list:t.assets,group:{name:"assets",pull:"clone",put:!1}},on:{change:t.handleAssetChange}},t._l(t.assets,(function(t){return e("div",{key:"asset-".concat(t.asset_id),staticClass:"draggable-asset__container mr-2 mb-2"},[e("img",{staticClass:"w-24",attrs:{src:t.asset_src}})])})),0)],1),t._v(" "),e("div",{staticClass:"articles-list w-2/3 bg-gray-200 p-4 h-3/4 overflow-y-scroll"},t._l(t.articles,(function(article){return e("div",{key:"article-".concat(article.article_id)},[e("h3",{class:article["article_title_".concat(t.locale)]?"":"italic text-gray-500"},[t._v("\n        "+t._s(article["article_title_".concat(t.locale)]?article["article_title_".concat(t.locale)]:article["article_title_".concat(t.otherLocale)])+"\n      ")]),t._v(" "),e("draggable",{class:{"flex flex-wrap py-4":!!t.assetsByArticle[article.article_id].length},attrs:{list:t.assetsByArticle[article.article_id],group:{name:"assets",pull:!1,put:!0}},on:{change:function(e){return t.handleAssetChange(e,article.article_id)}}},t._l(t.assetsByArticle[article.article_id],(function(r){return e("div",{key:"asset-article-".concat(r.asset_id),staticClass:"relative"},[e("span",{staticClass:"absolute top-0 right-0 my-2 mr-4 text-white",on:{click:function(e){return t.removeAssetFromArticle(r,article.article_id)}}},[e("Icon",{attrs:{name:"cross",small:""}})],1),t._v(" "),e("img",{staticClass:"w-24 mr-2 mb-2",attrs:{src:r.asset_src}})])})),0),t._v(" "),t.assetsByArticle[article.article_id].length?t._e():e("div",{staticClass:"my-4 text-xs"},[t._v("\n        "+t._s(t.$t("assets.article_empty"))+"\n      ")])],1)})),0)]):t._e()}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Icon:r(472).default})}}]);