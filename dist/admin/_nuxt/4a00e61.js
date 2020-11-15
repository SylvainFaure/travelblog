(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{287:function(e,t,r){"use strict";r.r(t);r(60);var n=r(286),o={props:{type:n.a.string.def("primary"),label:n.a.string.def("Save"),iconBtn:n.a.bool.def(!1),icon:n.a.string.def("checkmark"),additionalClasses:n.a.string.def("")},computed:{classes:function(){var e=this.iconBtn?"px-4 py-2":"p-2";return"bg-".concat(this.type||"primary"," ").concat("raw"===this.type?"":"border text-white"," ").concat(e)}}},c=r(24),component=Object(c.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("button",{class:[e.classes,e.additionalClasses,"rounded text-center flex items-center"],attrs:{type:"button"},on:{click:function(t){return e.$emit("click")}}},[e.iconBtn?e._e():r("span",[e._v(e._s(e.label))]),e._v(" "),e.icon&&!e.iconBtn?r("span",{staticClass:"pl-2"},[r("Icon",{attrs:{name:e.icon}})],1):r("span",{directives:[{name:"tooltip",rawName:"v-tooltip",value:e.label,expression:"label"}]},[r("Icon",{attrs:{name:e.icon}})],1)])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Icon:r(289).default})},289:function(e,t,r){"use strict";r.r(t);var n=r(286),o={props:{name:n.a.string.def(""),small:n.a.bool.def(!1)}},c=r(24),component=Object(c.a)(o,(function(){var e=this.$createElement,t=this._self._c||e;return t("svg",this._g({class:{"fill-current icon":!0,"cursor-pointer":!!this.$listeners,"w-2 h-2":this.small,"w-4 h-4":!this.small}},this.$listeners),[t("use",{attrs:{"xlink:href":"#icon-"+this.name}})])}),[],!1,null,null,null);t.default=component.exports},291:function(e,t,r){"use strict";r.r(t);var n=r(286),o={props:{type:n.a.string.def("text"),name:n.a.string.def("input"),id:n.a.string.def("input"),label:n.a.string.def(""),placeholder:n.a.string.def(""),required:n.a.bool.def(!1),disabled:n.a.bool.def(!1),value:n.a.string.def(""),small:n.a.bool.def(!1)}},c=r(24),component=Object(c.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{class:{"mt-2 mb-4":!e.small}},[e.label?r("h4",{staticClass:"label font-bold my-4"},[r("span",{staticClass:"bg-white z-10 pr-6"},[e._v(e._s(e.label))])]):e._e(),e._v(" "),r("input",{class:[e.small?"text-xs":"","w-full p-2 rounded border"],attrs:{id:e.id,type:e.type,name:e.name,required:e.required,disabled:e.disabled,placeholder:e.placeholder},domProps:{value:e.value},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.$emit("enter")},input:function(t){return e.$emit("input",t.target.value)}}})])}),[],!1,null,null,null);t.default=component.exports},293:function(e,t,r){"use strict";r.r(t);var n={},o=r(24),component=Object(o.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("portal",{attrs:{to:"modal"}},[r("div",{staticClass:"flex flex-col justify-center items-center m-16"},[r("h4",{staticClass:"font-bold text-lg text-center mb-4"},[e._v(e._s(e.$t("general.sure")))]),e._v(" "),r("div",{staticClass:"flex justify-center"},[r("Btn",{attrs:{label:e.$t("general.confirm"),"additional-classes":"mr-4"},on:{click:function(t){return e.$emit("confirm")}}}),e._v(" "),r("Btn",{attrs:{label:e.$t("general.cancel"),type:"secondary"},on:{click:function(t){return e.$emit("cancel")}}})],1)])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Btn:r(287).default})},360:function(e,t,r){"use strict";r.r(t);r(19),r(27),r(17),r(21),r(36),r(37),r(28),r(18);var n=r(9),o=r(286),c=r(20);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f={props:{category:o.a.object.def({})},data:function(){return{name:"",label:"",locale:"",mounted:!1}},mounted:function(){this.locale=this.$i18n.locale,this.name=this.category&&this.category.category_name?this.category.category_name:"",this.label=this.category&&this.category["category_label_".concat(this.locale)]?this.category["category_label_".concat(this.locale)]:"",this.mounted=!0},methods:d(d({},Object(c.b)("modal",["setVisible","setModalId"])),{},{handleConfirm:function(){var e,t="fr"===this.locale?"it":"fr";this.$emit("confirm",(e={category_id:this.category.category_id,category_name:this.name},Object(n.a)(e,"category_label_".concat(this.locale),this.label),Object(n.a)(e,"category_label_".concat(t),this.category["category_label_".concat(t)]||""),e)),this.closeModal()},handleCancel:function(){this.closeModal()},closeModal:function(){this.setModalId(null),this.setVisible(!1)}})},v=r(24),component=Object(v.a)(f,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("portal",{attrs:{to:"modal"}},[r("div",[r("div",{staticClass:"m-8"},[r("InputText",{attrs:{label:e.$t("categories.name")},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),r("InputText",{attrs:{label:e.$t("categories.label")},model:{value:e.label,callback:function(t){e.label=t},expression:"label"}})],1),e._v(" "),r("div",{staticClass:"sticky bottom-0 w-full translate-x-0 p-2 bg-white border-t-2 border-gray-500"},[r("div",{staticClass:"flex justify-end"},[r("Btn",{attrs:{label:e.$t("general.confirm")},on:{click:e.handleConfirm}}),e._v(" "),r("Btn",{attrs:{label:e.$t("general.cancel"),type:"secondary"},on:{click:e.handleCancel}})],1)])])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{InputText:r(291).default,Btn:r(287).default})},375:function(e,t,r){"use strict";r.r(t);r(19),r(60),r(27),r(17),r(134),r(53),r(36),r(37),r(28),r(16),r(38),r(18),r(39);var n=r(9),o=r(15),c=(r(32),r(4)),l=r(20),d=r(369);function f(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function v(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var m={asyncData:function(e){return Object(c.a)(regeneratorRuntime.mark((function t(){var r,n,c,l,d,f,v,m,y,h,_;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.app,n=e.$axios,c=r.i18n.locale,l=[],d=[],f=[],t.prev=5,t.next=8,Promise.all([n.get("/api/travels"),n.get("/api/articles"),n.get("/api/categories")]);case 8:v=t.sent,m=Object(o.a)(v,3),y=m[0],h=m[1],_=m[2],l=y.data,d=h.data,f=_.data,t.next=21;break;case 18:t.prev=18,t.t0=t.catch(5),console.warn(t.t0);case 21:return t.abrupt("return",{locale:c,travels:l,articles:d,categories:f});case 22:case"end":return t.stop()}}),t,null,[[5,18]])})))()},data:function(){return{columns:["title","countries","desc","steps","published","actions"],categoriesColumns:["label","name","actions"],travelToDelete:null,categoryToEdit:{},categoryToDelete:null}},computed:v({},Object(l.c)("modal",["modalId"])),methods:v(v({},Object(l.b)("modal",["setVisible","setModalId"])),{},{reloadData:function(){var e=this;return Object(c.a)(regeneratorRuntime.mark((function t(){var r,n,c,l,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Promise.all([e.$axios.get("/api/travels"),e.$axios.get("/api/articles"),e.$axios.get("/api/categories")]);case 3:r=t.sent,n=Object(o.a)(r,3),c=n[0],l=n[1],d=n[2],e.travels=c?c.data:[],e.articles=l?l.data:[],e.categories=d?d.data:[],t.next=16;break;case 13:t.prev=13,t.t0=t.catch(0),console.warn(t.t0);case 16:case"end":return t.stop()}}),t,null,[[0,13]])})))()},getTravelSteps:function(e){var t=this;return this.articles.filter((function(t){return t.article_travel_id===e.travel_id})).map((function(a){return'<a href="/articles/'.concat(a.article_id,'">').concat(a["article_place_".concat(t.locale)],"</a>")})).join(", ")},getColumnValue:function(col,e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"travel";switch(col){case"steps":return this.getTravelSteps(e);case"countries":return e["".concat(t,"_").concat(col,"_").concat(this.locale)].join(", ");case"published":return e["".concat(t,"_").concat(col,"_").concat(this.locale)]?Object(d.a)(new Date(e["".concat(t,"_published_date_").concat(this.locale)]),"dd/MM/yyyy"):"";case"name":return e["".concat(t,"_").concat(col)];default:return e["".concat(t,"_").concat(col,"_").concat(this.locale)]}},openRemoveModal:function(e,t){"travel"===e?(this.travelToDelete=t,this.setModalId("remove-travel")):(this.categoryToDelete=t,this.setModalId("remove-category")),this.setVisible(!0)},closeRemoveModal:function(){this.setModalId(null),this.setVisible(!1)},removeEntity:function(){var e=arguments,t=this;return Object(c.a)(regeneratorRuntime.mark((function r(){var n,o;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=e.length>0&&void 0!==e[0]?e[0]:"travel",o={travel:{endpoint:"travels",i18n:"travel",id:t.travelToDelete?t.travelToDelete.travel_id:""},category:{endpoint:"categories",i18n:"categories",id:t.categoryToDelete?t.categoryToDelete.category_id:""}},r.prev=2,r.next=5,t.$axios.delete("/api/".concat(o[n].endpoint,"/").concat(o[n].id));case 5:t.$toast.success(t.$t("".concat(o[n].i18n,".remove.success"))),t.closeRemoveModal(),t.travelToDelete=null,t.reloadData(),r.next=15;break;case 11:r.prev=11,r.t0=r.catch(2),console.warn(r.t0),t.$toast.error(t.$t("".concat(o[n].i18n,".remove.error")));case 15:case"end":return r.stop()}}),r,null,[[2,11]])})))()},saveCategory:function(e){var t=this;return Object(c.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(e.category_id){r.next=13;break}return r.prev=1,r.next=4,t.$axios.post("/api/categories",e);case 4:t.$toast.success(t.$t("categories.save.success")),t.reloadData(),r.next=11;break;case 8:r.prev=8,r.t0=r.catch(1),t.$toast.error(t.$t("categories.save.error"));case 11:r.next=23;break;case 13:return r.prev=13,r.next=16,t.$axios.put("/api/categories/".concat(e.category_id),e);case 16:t.$toast.success(t.$t("categories.save.success")),t.reloadData(),r.next=23;break;case 20:r.prev=20,r.t1=r.catch(13),t.$toast.error(t.$t("categories.save.error"));case 23:case"end":return r.stop()}}),r,null,[[1,8],[13,20]])})))()},openNewTravel:function(){this.$router.push("/travels/new")},openEditCategory:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.categoryToEdit=e,this.setModalId("category-edit"),this.setVisible(!0)}})},y=r(24),component=Object(y.a)(m,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"travels-page flex flex-wrap justify-between"},[r("div",{staticClass:"sidebar"}),e._v(" "),r("div",{staticClass:"travels-page__container m-4"},[r("table",{staticClass:"table-fixed"},[r("thead",{staticClass:"border-t-2 border-blue-500"},[r("tr",e._l(e.columns,(function(col){return r("th",{key:col,class:{"px-4 py-2":!0,"w-1/4":"desc"!==col,"w-1/2":"desc"===col}},[e._v("\n            "+e._s(e.$t("travels."+col))+"\n          ")])})),0)]),e._v(" "),r("tbody",e._l(e.travels,(function(t,i){return r("tr",{key:t.travel_id,class:{"bg-gray-200":i%2==0}},e._l(e.columns,(function(col,n){return r("td",{key:col+"-"+n,staticClass:"border-b-2 border px-4 py-2"},["actions"!==col?r("div",{domProps:{innerHTML:e._s(e.getColumnValue(col,t))}}):r("div",{staticClass:"flex justify-between"},[r("nuxt-link",{attrs:{to:"/travels/"+t.travel_id}},[r("Icon",{attrs:{name:"pencil"}})],1),e._v(" "),r("Icon",{attrs:{name:"bin"},on:{click:function(r){return e.openRemoveModal("travel",t)}}})],1)])})),0)})),0)]),e._v(" "),r("div",{staticClass:"flex justify-end w-full my-4"},[r("Btn",{attrs:{"icon-btn":"",icon:"plus"},on:{click:e.openNewTravel}})],1)]),e._v(" "),"remove-travel"===e.modalId?r("RemoveModal",{on:{confirm:e.removeEntity,cancel:e.closeRemoveModal}}):e._e(),e._v(" "),r("div",{staticClass:"categories-page__container m-4"},[r("table",{staticClass:"table-fixed"},[r("thead",{staticClass:"border-t-2 border-blue-500"},[r("tr",e._l(e.categoriesColumns,(function(col){return r("th",{key:col,class:{"px-4 py-2":!0,"w-1/4":"desc"!==col,"w-1/2":"desc"===col}},[e._v("\n            "+e._s(e.$t("categories."+col))+"\n          ")])})),0)]),e._v(" "),r("tbody",e._l(e.categories,(function(t,i){return r("tr",{key:t.category_id,class:{"bg-gray-200":i%2==0}},e._l(e.categoriesColumns,(function(col,n){return r("td",{key:col+"-"+n,staticClass:"border-b-2 border px-4 py-2"},["actions"!==col?r("div",{domProps:{innerHTML:e._s(e.getColumnValue(col,t,"category"))}}):r("div",{staticClass:"flex justify-between"},[r("Icon",{staticClass:"mx-4",attrs:{name:"pencil"},on:{click:function(r){return e.openEditCategory(t)}}}),e._v(" "),r("Icon",{staticClass:"mx-4",attrs:{name:"bin"},on:{click:function(r){return e.openRemoveModal("category",t)}}})],1)])})),0)})),0)]),e._v(" "),r("div",{staticClass:"flex justify-end w-full my-4"},[r("Btn",{attrs:{"icon-btn":"",icon:"plus"},on:{click:e.openEditCategory}})],1)]),e._v(" "),"remove-category"===e.modalId?r("RemoveModal",{on:{confirm:function(t){return e.removeEntity("category")},cancel:e.closeRemoveModal}}):e._e(),e._v(" "),"category-edit"===e.modalId?r("EditCategoryModal",{attrs:{category:e.categoryToEdit},on:{confirm:e.saveCategory,cancel:e.closeRemoveModal}}):e._e()],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Icon:r(289).default,Btn:r(287).default,RemoveModal:r(293).default,EditCategoryModal:r(360).default})}}]);