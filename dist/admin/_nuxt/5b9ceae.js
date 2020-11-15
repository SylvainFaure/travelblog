(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{287:function(e,t,r){"use strict";r.r(t);r(60);var n=r(286),c={props:{type:n.a.string.def("primary"),label:n.a.string.def("Save"),iconBtn:n.a.bool.def(!1),icon:n.a.string.def("checkmark"),additionalClasses:n.a.string.def("")},computed:{classes:function(){var e=this.iconBtn?"px-4 py-2":"p-2";return"bg-".concat(this.type||"primary"," ").concat("raw"===this.type?"":"border text-white"," ").concat(e)}}},l=r(24),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("button",{class:[e.classes,e.additionalClasses,"rounded text-center flex items-center"],attrs:{type:"button"},on:{click:function(t){return e.$emit("click")}}},[e.iconBtn?e._e():r("span",[e._v(e._s(e.label))]),e._v(" "),e.icon&&!e.iconBtn?r("span",{staticClass:"pl-2"},[r("Icon",{attrs:{name:e.icon}})],1):r("span",{directives:[{name:"tooltip",rawName:"v-tooltip",value:e.label,expression:"label"}]},[r("Icon",{attrs:{name:e.icon}})],1)])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Icon:r(289).default})},289:function(e,t,r){"use strict";r.r(t);var n=r(286),c={props:{name:n.a.string.def(""),small:n.a.bool.def(!1)}},l=r(24),component=Object(l.a)(c,(function(){var e=this.$createElement,t=this._self._c||e;return t("svg",this._g({class:{"fill-current icon":!0,"cursor-pointer":!!this.$listeners,"w-2 h-2":this.small,"w-4 h-4":!this.small}},this.$listeners),[t("use",{attrs:{"xlink:href":"#icon-"+this.name}})])}),[],!1,null,null,null);t.default=component.exports},293:function(e,t,r){"use strict";r.r(t);var n={},c=r(24),component=Object(c.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("portal",{attrs:{to:"modal"}},[r("div",{staticClass:"flex flex-col justify-center items-center m-16"},[r("h4",{staticClass:"font-bold text-lg text-center mb-4"},[e._v(e._s(e.$t("general.sure")))]),e._v(" "),r("div",{staticClass:"flex justify-center"},[r("Btn",{attrs:{label:e.$t("general.confirm"),"additional-classes":"mr-4"},on:{click:function(t){return e.$emit("confirm")}}}),e._v(" "),r("Btn",{attrs:{label:e.$t("general.cancel"),type:"secondary"},on:{click:function(t){return e.$emit("cancel")}}})],1)])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Btn:r(287).default})},371:function(e,t,r){"use strict";r.r(t);r(19),r(60),r(27),r(82),r(17),r(36),r(37),r(28),r(16),r(38),r(18),r(39);var n=r(9),c=r(15),l=(r(32),r(4)),o=r(20),d=r(369);function f(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function v(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var m={asyncData:function(e){return Object(l.a)(regeneratorRuntime.mark((function t(){var r,n,l,o,d,f,v,m,h;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.app,n=e.$axios,l=r.i18n.locale,o=[],d=[],t.prev=4,t.next=7,Promise.all([n.get("/api/travels"),n.get("/api/articles")]);case 7:f=t.sent,v=Object(c.a)(f,2),m=v[0],h=v[1],o=m.data,d=h.data,t.next=18;break;case 15:t.prev=15,t.t0=t.catch(4),console.warn(t.t0);case 18:return t.abrupt("return",{locale:l,travels:o,articles:d});case 19:case"end":return t.stop()}}),t,null,[[4,15]])})))()},data:function(){return{columns:["place","title","travel","country","published","actions"],articleToDelete:null}},computed:v({},Object(o.c)("modal",["modalId"])),methods:v(v({},Object(o.b)("modal",["setVisible","setModalId"])),{},{reloadData:function(){var e=this;return Object(l.a)(regeneratorRuntime.mark((function t(){var r,n,l,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Promise.all([e.$axios.get("/api/travels"),e.$axios.get("/api/articles")]);case 3:r=t.sent,n=Object(c.a)(r,2),l=n[0],o=n[1],e.travels=l?l.data:[],e.articles=o?o.data:[],t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.warn(t.t0);case 14:case"end":return t.stop()}}),t,null,[[0,11]])})))()},getTravel:function(article){var e=this.travels.find((function(e){return e.travel_id===article.article_travel_id})),title=e["travel_title_".concat(this.locale)];return'<a href="/travels/'.concat(e.travel_id,'">').concat(title,"</a>")},getColumnValue:function(col,article){switch(col){case"travel":return this.getTravel(article);case"published":return article["article_".concat(col,"_").concat(this.locale)]?Object(d.a)(new Date(article["article_published_date_".concat(this.locale)]),"dd/MM/yyyy"):"";default:return article["article_".concat(col,"_").concat(this.locale)]}},openRemoveModal:function(article){this.articleToDelete=article,this.setModalId("remove-article"),this.setVisible(!0)},closeRemoveModal:function(){this.setModalId(null),this.setVisible(!1)},removeArticle:function(){var e=this;return Object(l.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$axios.delete("/api/articles/".concat(e.articleToDelete.article_id));case 3:e.$toast.success(e.$t("article.remove.success")),e.closeRemoveModal(),e.reloadData(),e.articleToDelete=null,t.next=13;break;case 9:t.prev=9,t.t0=t.catch(0),console.warn(t.t0),e.$toast.error(e.$t("article.remove.error"));case 13:case"end":return t.stop()}}),t,null,[[0,9]])})))()},openNewArticle:function(){this.$router.push("/articles/new")}})},h=r(24),component=Object(h.a)(m,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"articles-page flex justify-center"},[r("div",{staticClass:"articles-page__container m-4"},[r("table",{staticClass:"table-fixed"},[r("thead",{staticClass:"border-t-2 border-blue-500"},[r("tr",e._l(e.columns,(function(col){return r("th",{key:col,class:{"px-4 py-2":!0,"w-1/4":"desc"!==col,"w-1/2":"desc"===col}},[e._v("\n            "+e._s(e.$t("articles."+col))+"\n          ")])})),0)]),e._v(" "),r("tbody",e._l(e.articles,(function(article,i){return r("tr",{key:article.article_id,class:{"bg-gray-200":i%2==0}},e._l(e.columns,(function(col,t){return r("td",{key:col+"-"+t,staticClass:"border-b-2 border px-4 py-2"},["actions"!==col?r("div",{domProps:{innerHTML:e._s(e.getColumnValue(col,article))}}):r("div",{staticClass:"flex justify-between"},[r("nuxt-link",{attrs:{to:"/articles/"+article.article_id}},[r("Icon",{attrs:{name:"pencil"}})],1),e._v(" "),r("Icon",{attrs:{name:"bin"},on:{click:function(t){return e.openRemoveModal(article)}}})],1)])})),0)})),0)]),e._v(" "),r("div",{staticClass:"flex justify-end w-full my-4"},[r("Btn",{attrs:{"icon-btn":"",icon:"plus"},on:{click:e.openNewArticle}})],1)]),e._v(" "),"remove-article"===e.modalId?r("RemoveModal",{on:{confirm:e.removeArticle,cancel:e.closeRemoveModal}}):e._e()],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Icon:r(289).default,Btn:r(287).default,RemoveModal:r(293).default})}}]);