(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{286:function(e,t,r){"use strict";function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function o(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function i(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}function c(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)t.indexOf(r=o[n])>=0||(i[r]=e[r]);return i}function u(e){return 1==(null!=(t=e)&&"object"==typeof t&&!1===Array.isArray(t))&&"[object Object]"===Object.prototype.toString.call(e);var t}var a=Object.prototype,d=a.toString,f=a.hasOwnProperty,v=/^\s*function (\w+)/;function s(e){var t,r=null!==(t=null==e?void 0:e.type)&&void 0!==t?t:e;if(r){var n=r.toString().match(v);return n?n[1]:""}return""}var y=function(e){var t,r;return!1!==u(e)&&"function"==typeof(t=e.constructor)&&!1!==u(r=t.prototype)&&!1!==r.hasOwnProperty("isPrototypeOf")},p=function(e){return e},h=function(e,t){return f.call(e,t)},b=Number.isInteger||function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e},g=Array.isArray||function(e){return"[object Array]"===d.call(e)},m=function(e){return"[object Function]"===d.call(e)},w=function(e){return y(e)&&h(e,"_vueTypes_name")},_=function(e){return y(e)&&(h(e,"type")||["_vueTypes_name","validator","default","required"].some((function(t){return h(e,t)})))};function O(e,t){return Object.defineProperty(e.bind(t),"__original",{value:e})}function j(e,t,r){var n;void 0===r&&(r=!1);var i=!0,o="";n=y(e)?e:{type:e};var u=w(n)?n._vueTypes_name+" - ":"";if(_(n)&&null!==n.type){if(void 0===n.type)return i;if(!n.required&&void 0===t)return i;void 0===n.type?o="any":g(n.type)?(i=n.type.some((function(e){return!0===j(e,t,!0)})),o=n.type.map((function(e){return s(e)})).join(" or ")):i="Array"===(o=s(n))?g(t):"Object"===o?y(t):"String"===o||"Number"===o||"Boolean"===o||"Function"===o?function(e){if(null==e)return"";var t=e.constructor.toString().match(v);return t?t[1]:""}(t)===o:t instanceof n.type}if(!i){var a=u+'value "'+t+'" should be of type "'+o+'"';return!1===r?(p(a),!1):a}if(h(n,"validator")&&m(n.validator)){var l=p,c=[];if(p=function(e){c.push(e)},i=n.validator(t),p=l,!i){var d=(c.length>1?"* ":"")+c.join("\n* ");return c.length=0,!1===r?(p(d),i):d}}return i}function k(e,t){var r=Object.defineProperties(t,{_vueTypes_name:{value:e,writable:!0},isRequired:{get:function(){return this.required=!0,this}},def:{value:function(e){return void 0===e?(h(this,"default")&&delete this.default,this):m(e)||!0===j(this,e,!0)?(this.default=g(e)?function(){return[].concat(e)}:y(e)?function(){return Object.assign({},e)}:e,this):(p(this._vueTypes_name+' - invalid default value: "'+e+'"'),this)}}}),n=r.validator;return m(n)&&(r.validator=O(n,r)),r}function x(e,t){var r=k(e,t);return Object.defineProperty(r,"validate",{value:function(e){return m(this.validator)&&p(this._vueTypes_name+" - calling .validate() will overwrite the current custom validator function. Validator info:\n"+JSON.stringify(this)),this.validator=O(e,this),this}})}function P(e,t,r){var n,i,u=(n=t,i={},Object.getOwnPropertyNames(n).forEach((function(e){i[e]=Object.getOwnPropertyDescriptor(n,e)})),Object.defineProperties({},i));if(u._vueTypes_name=e,!y(r))return u;var a,o,l=r.validator,d=c(r,["validator"]);if(m(l)){var s=u.validator;s&&(s=null!==(o=(a=s).__original)&&void 0!==o?o:a),u.validator=O(s?function(e){return s.call(this,e)&&l.call(this,e)}:l,u)}return Object.assign(u,d)}function $(e){return e.replace(/^(?!\s*$)/gm,"  ")}var T=function(){function e(){}return e.extend=function(e){var t=this;if(g(e))return e.forEach((function(e){return t.extend(e)})),this;var r=e.name,n=e.validate,i=void 0!==n&&n,u=e.getter,a=void 0!==u&&u,o=c(e,["name","validate","getter"]);if(h(this,r))throw new TypeError('[VueTypes error]: Type "'+r+'" already defined');var l,d=o.type;return w(d)?(delete o.type,Object.defineProperty(this,r,a?{get:function(){return P(r,d,o)}}:{value:function(){var e,t=P(r,d,o);return t.validator&&(t.validator=(e=t.validator).bind.apply(e,[t].concat([].slice.call(arguments)))),t}})):(l=a?{get:function(){var e=Object.assign({},o);return i?x(r,e):k(r,e)},enumerable:!0}:{value:function(){var e,t,n=Object.assign({},o);return e=i?x(r,n):k(r,n),n.validator&&(e.validator=(t=n.validator).bind.apply(t,[e].concat([].slice.call(arguments)))),e},enumerable:!0},Object.defineProperty(this,r,l))},o(e,null,[{key:"any",get:function(){return x("any",{})}},{key:"func",get:function(){return x("function",{type:Function}).def(this.defaults.func)}},{key:"bool",get:function(){return x("boolean",{type:Boolean}).def(this.defaults.bool)}},{key:"string",get:function(){return x("string",{type:String}).def(this.defaults.string)}},{key:"number",get:function(){return x("number",{type:Number}).def(this.defaults.number)}},{key:"array",get:function(){return x("array",{type:Array}).def(this.defaults.array)}},{key:"object",get:function(){return x("object",{type:Object}).def(this.defaults.object)}},{key:"integer",get:function(){return k("integer",{type:Number,validator:function(e){return b(e)}}).def(this.defaults.integer)}},{key:"symbol",get:function(){return k("symbol",{validator:function(e){return"symbol"==typeof e}})}}]),e}();T.defaults={},T.custom=function(e,t){if(void 0===t&&(t="custom validation failed"),"function"!=typeof e)throw new TypeError("[VueTypes error]: You must provide a function as argument");return k(e.name||"<<anonymous function>>",{validator:function(r){var n=e(r);return n||p(this._vueTypes_name+" - "+t),n}})},T.oneOf=function(e){if(!g(e))throw new TypeError("[VueTypes error]: You must provide an array as argument.");var t='oneOf - value should be one of "'+e.join('", "')+'."',r=e.reduce((function(e,t){if(null!=t){var r=t.constructor;-1===e.indexOf(r)&&e.push(r)}return e}),[]);return k("oneOf",{type:r.length>0?r:void 0,validator:function(r){var n=-1!==e.indexOf(r);return n||p(t),n}})},T.instanceOf=function(e){return k("instanceOf",{type:e})},T.oneOfType=function(e){if(!g(e))throw new TypeError("[VueTypes error]: You must provide an array as argument");for(var t=!1,r=[],n=0;n<e.length;n+=1){var i=e[n];if(_(i)){if(w(i)&&"oneOf"===i._vueTypes_name){r=r.concat(i.type||[]);continue}if(m(i.validator)&&(t=!0),void 0!==i.type){r=r.concat(i.type);continue}}r.push(i)}return r=r.filter((function(e,t){return r.indexOf(e)===t})),k("oneOfType",t?{type:r,validator:function(t){var r=[],n=e.some((function(e){var n=j(w(e)&&"oneOf"===e._vueTypes_name?e.type||null:e,t,!0);return"string"==typeof n&&r.push(n),!0===n}));return n||p("oneOfType - provided value does not match any of the "+r.length+" passed-in validators:\n"+$(r.join("\n"))),n}}:{type:r})},T.arrayOf=function(e){return k("arrayOf",{type:Array,validator:function(t){var r,n=t.every((function(t){return!0===(r=j(e,t,!0))}));return n||p("arrayOf - value validation error:\n"+$(r)),n}})},T.objectOf=function(e){return k("objectOf",{type:Object,validator:function(t){var r,n=Object.keys(t).every((function(n){return!0===(r=j(e,t[n],!0))}));return n||p("objectOf - value validation error:\n"+$(r)),n}})},T.shape=function(e){var t=Object.keys(e),r=t.filter((function(t){var r;return!!(null===(r=e[t])||void 0===r?void 0:r.required)})),n=k("shape",{type:Object,validator:function(n){var i=this;if(!y(n))return!1;var o=Object.keys(n);if(r.length>0&&r.some((function(e){return-1===o.indexOf(e)}))){var u=r.filter((function(e){return-1===o.indexOf(e)}));return p(1===u.length?'shape - required property "'+u[0]+'" is not defined.':'shape - required properties "'+u.join('", "')+'" are not defined.'),!1}return o.every((function(r){if(-1===t.indexOf(r))return!0===i._vueTypes_isLoose||(p('shape - shape definition does not include a "'+r+'" property. Allowed keys: "'+t.join('", "')+'".'),!1);var o=j(e[r],n[r],!0);return"string"==typeof o&&p('shape - "'+r+'" property validation error:\n '+$(o)),!0===o}))}});return Object.defineProperty(n,"_vueTypes_isLoose",{writable:!0,value:!1}),Object.defineProperty(n,"loose",{get:function(){return this._vueTypes_isLoose=!0,this}}),n},T.utils={validate:function(e,t){return!0===j(t,e,!0)},toType:function(e,t,r){return void 0===r&&(r=!1),r?x(e,t):k(e,t)}};var C=function(e){function t(){return e.apply(this,arguments)||this}return i(t,e),t}(function(e){var t;return void 0===e&&(e={func:function(){},bool:!0,string:"",number:0,array:function(){return[]},object:function(){return{}},integer:0}),(t=function(t){function r(){return t.apply(this,arguments)||this}return i(r,t),o(r,null,[{key:"sensibleDefaults",get:function(){return l({},this.defaults)},set:function(t){this.defaults=!1!==t?l({},!0!==t?t:e):{}}}]),r}(T)).defaults=l({},e),t}());t.a=C},287:function(e,t,r){"use strict";r.r(t);r(62);var n=r(286),o={props:{type:n.a.string.def("primary"),label:n.a.string.def("Save"),iconBtn:n.a.bool.def(!1),icon:n.a.string.def("checkmark"),additionalClasses:n.a.string.def("")},computed:{classes:function(){var e=this.iconBtn?"px-4 py-2":"p-2";return"cursor-pointer bg-".concat(this.type||"primary"," ").concat("raw"===this.type?"":"border text-white"," ").concat(e)}}},l=r(24),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("button",{class:[e.classes,e.additionalClasses,"rounded text-center flex items-center"],attrs:{type:"button"},on:{click:function(t){return e.$emit("click")}}},[e.iconBtn?e._e():r("span",[e._v(e._s(e.label))]),e._v(" "),e.icon&&!e.iconBtn?r("span",{staticClass:"pl-2"},[r("Icon",{attrs:{name:e.icon}})],1):r("span",{directives:[{name:"tooltip",rawName:"v-tooltip",value:e.label,expression:"label"}]},[r("Icon",{attrs:{name:e.icon}})],1)])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Icon:r(288).default})},288:function(e,t,r){"use strict";r.r(t);var n=r(286),o={props:{name:n.a.string.def(""),small:n.a.bool.def(!1)}},l=r(24),component=Object(l.a)(o,(function(){var e=this.$createElement,t=this._self._c||e;return t("svg",this._g({class:{"fill-current icon":!0,"cursor-pointer":!!this.$listeners,"w-2 h-2":this.small,"w-4 h-4":!this.small}},this.$listeners),[t("use",{attrs:{"xlink:href":"#icon-"+this.name}})])}),[],!1,null,null,null);t.default=component.exports},290:function(e,t,r){"use strict";r.r(t);var n=r(286),o={props:{type:n.a.string.def("text"),name:n.a.string.def("input"),id:n.a.string.def("input"),label:n.a.string.def(""),placeholder:n.a.string.def(""),required:n.a.bool.def(!1),disabled:n.a.bool.def(!1),value:n.a.string.def(""),small:n.a.bool.def(!1)}},l=r(24),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{class:{"mt-2 mb-4":!e.small}},[e.label?r("h4",{staticClass:"label font-bold my-4"},[r("span",{staticClass:"bg-white z-10 pr-6"},[e._v(e._s(e.label))])]):e._e(),e._v(" "),r("input",{class:[e.small?"text-xs":"","w-full p-2 rounded border"],attrs:{id:e.id,type:e.type,name:e.name,required:e.required,disabled:e.disabled,placeholder:e.placeholder},domProps:{value:e.value},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.$emit("enter")},input:function(t){return e.$emit("input",t.target.value)}}})])}),[],!1,null,null,null);t.default=component.exports},334:function(e,t,r){var content=r(357);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(61).default)("5f660ca3",content,!0,{sourceMap:!1})},356:function(e,t,r){"use strict";var n=r(334);r.n(n).a},357:function(e,t,r){(t=r(60)(!1)).push([e.i,".login{height:calc(100vh - 72px)}",""]),e.exports=t},379:function(e,t,r){"use strict";r.r(t);r(19),r(27),r(17),r(36),r(37),r(28),r(41),r(64),r(18);var n=r(9),o=(r(32),r(4)),l=r(20);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f={data:function(){return{mounted:!1,isSignin:!0,isResetPasswordRequest:!1,isResetPasswordChange:!1,loginModel:{email:"",password:""},resetPasswordRequestModel:{email:""},resetPasswordChangeModel:{email:"",password:"",confirmPassword:""}}},mounted:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var r,n,data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(r=e.$route.query).email||!r.pwd_token){t.next=18;break}return t.prev=2,t.next=5,e.$axios.get("/api/users/email/".concat(r.email));case 5:n=t.sent,(data=n.data)&&data.user_pwd_token===r.pwd_token&&(e.isSignin=!1,e.isResetPasswordChange=!0,e.resetPasswordChangeModel.email=r.email),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(2),console.warn(t.t0);case 13:return t.prev=13,e.mounted=!0,t.finish(13);case 16:t.next=19;break;case 18:e.mounted=!0;case 19:case"end":return t.stop()}}),t,null,[[2,10,13,16]])})))()},methods:d(d({},Object(l.b)("auth",["setUser","setIsLogged","setToken"])),{},{goToResetPassword:function(){this.isSignin=!1,this.isResetPasswordRequest=!0,this.isResetPasswordChange=!1},goToLogin:function(){this.isSignin=!0,this.isResetPasswordRequest=!1,this.isResetPasswordChange=!1},saveToken:function(e){this.setToken(e);var t=JSON.parse(atob(e.split(".")[1])),r={email:t.email,role:t.role,token:e};window.localStorage.getItem("user")&&window.localStorage.removeItem("user"),window.localStorage.setItem("user",JSON.stringify(r))},handleLogin:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$axios.post("/api/users/signin",d({},e.loginModel));case 3:200===(r=t.sent).status&&200===r.data.status?(e.saveToken(r.data.token),e.$toast.success("You are correctly logged in!"),e.$router.push("/")):e.$toast.error("Your credentials are wrong, try again!"),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),console.warn(t.t0),e.$toast.error("Ops! There is a problem!");case 11:return t.prev=11,e.loginModel={email:"",password:""},t.finish(11);case 14:case"end":return t.stop()}}),t,null,[[0,7,11,14]])})))()},generateToken:function(){for(var e="",i=0;i<=12;i++){e+="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[Math.floor(62*Math.random())]}return e},handleResetPasswordRequest:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$axios.post("/api/users/reset-password",d(d({},e.resetPasswordRequestModel),{},{token:e.generateToken()}));case 3:e.$toast.success(e.$t("login.password_request.success")),t.next=10;break;case 6:t.prev=6,t.t0=t.catch(0),e.$toast.error(e.$t("login.password_request.error")),console.warn(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,6]])})))()},handleResetPasswordChange:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(r=e.resetPasswordChangeModel).password||r.password!==r.confirmPassword){t.next=15;break}return t.prev=2,t.next=5,e.$axios.post("/api/users/confirm-reset-password",{email:r.email,password:r.password});case 5:e.$toast.success(e.$t("login.password_request.changed")),e.goToLogin(),window.history.pushState({},null,"/login"),e.resetPasswordChangeModel={email:"",password:"",confirmPassword:""},t.next=15;break;case 11:t.prev=11,t.t0=t.catch(2),console.warn(t.t0),e.$toast.success(e.$t("login.password_request.not_changed"));case 15:case"end":return t.stop()}}),t,null,[[2,11]])})))()}})},v=(r(356),r(24)),component=Object(v.a)(f,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.mounted?r("div",{staticClass:"login w-screen flex justify-center items-center"},[e.isSignin?r("div",[r("p",[e._v(e._s(e.$t("login.title")))]),e._v(" "),r("InputText",{staticClass:"my-2",attrs:{placeholder:e.$t("login.email")},model:{value:e.loginModel.email,callback:function(t){e.$set(e.loginModel,"email",t)},expression:"loginModel.email"}}),e._v(" "),r("InputText",{staticClass:"my-2",attrs:{type:"password",placeholder:e.$t("login.password")},on:{enter:e.handleLogin},model:{value:e.loginModel.password,callback:function(t){e.$set(e.loginModel,"password",t)},expression:"loginModel.password"}}),e._v(" "),r("div",{staticClass:"flex justify-end"},[r("Btn",{attrs:{"icon-btn":"",label:e.$t("general.send")},on:{click:e.handleLogin}})],1),e._v(" "),r("div",{staticClass:"flex justify-end"},[r("p",{staticClass:"font-bold cursor-pointer text-primary",on:{click:e.goToResetPassword}},[e._v("\n        "+e._s(e.$t("login.forgotten_password"))+"\n      ")])])],1):e._e(),e._v(" "),e.isResetPasswordRequest?r("div",[r("p",[e._v(e._s(e.$t("login.reset_password")))]),e._v(" "),r("InputText",{staticClass:"my-2",attrs:{placeholder:e.$t("login.email")},model:{value:e.resetPasswordRequestModel.email,callback:function(t){e.$set(e.resetPasswordRequestModel,"email",t)},expression:"resetPasswordRequestModel.email"}}),e._v(" "),r("div",{staticClass:"flex justify-between"},[r("p",{staticClass:"font-bold cursor-pointer text-primary",on:{click:e.goToLogin}},[e._v(e._s(e.$t("login.back_to_login")))]),e._v(" "),r("Btn",{attrs:{"icon-btn":"",label:e.$t("general.send")},on:{click:e.handleResetPasswordRequest}})],1)],1):e._e(),e._v(" "),e.isResetPasswordChange?r("div",[r("p",[e._v(e._s(e.$t("login.reset_password")))]),e._v(" "),r("InputText",{staticClass:"my-2",attrs:{placeholder:e.$t("login.email")},model:{value:e.resetPasswordChangeModel.email,callback:function(t){e.$set(e.resetPasswordChangeModel,"email",t)},expression:"resetPasswordChangeModel.email"}}),e._v(" "),r("InputText",{staticClass:"my-2",attrs:{type:"password",placeholder:e.$t("login.password")},model:{value:e.resetPasswordChangeModel.password,callback:function(t){e.$set(e.resetPasswordChangeModel,"password",t)},expression:"resetPasswordChangeModel.password"}}),e._v(" "),r("InputText",{staticClass:"my-2",attrs:{type:"password",placeholder:e.$t("login.confirm_password")},model:{value:e.resetPasswordChangeModel.confirmPassword,callback:function(t){e.$set(e.resetPasswordChangeModel,"confirmPassword",t)},expression:"resetPasswordChangeModel.confirmPassword"}}),e._v(" "),r("div",{staticClass:"flex justify-between"},[r("p",{staticClass:"font-bold cursor-pointer text-primary",on:{click:e.goToLogin}},[e._v(e._s(e.$t("login.back_to_login")))]),e._v(" "),r("Btn",{attrs:{"icon-btn":"",label:e.$t("general.send")},on:{click:e.handleResetPasswordChange}})],1)],1):e._e()]):e._e()}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{InputText:r(290).default,Btn:r(287).default})}}]);