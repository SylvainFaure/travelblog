(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{312:function(t,e,l){var content=l(339);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,l(81).default)("53c19743",content,!0,{sourceMap:!1})},338:function(t,e,l){"use strict";var n=l(312);l.n(n).a},339:function(t,e,l){(e=l(80)(!1)).push([t.i,".fade-enter-active,.fade-leave-active{transition:opacity .5s}.fade-enter,.fade-leave-to{opacity:0}",""]),t.exports=e},356:function(t,e,l){"use strict";l.r(e);l(82),l(195);var n=l(283),r=l(311),c={components:{draggable:l.n(r).a},props:{type:n.a.string.def("travels"),title:n.a.string.def(""),highlighted:n.a.array.def(null),published:n.a.array.def([]),unpublished:n.a.array.def([])},data:function(){return{locale:"fr",selected:[],mounted:!1}},computed:{filteredPublished:function(){var t=this;return this.published.reduce((function(e,l){return t.selected.find((function(e){return l["".concat(t.type,"_id")]===e["".concat(t.type,"_id")]}))||e.push(l),e}),[])}},mounted:function(){this.locale=this.$i18n.locale,this.highlighted&&(this.selected=this.highlighted),console.log(this.selected),this.mounted=!0},methods:{handleSelected:function(t){this.selected.push(t)},getSelected:function(){return this.selected}}},o=l(23),component=Object(o.a)(c,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return t.mounted?l("div",[l("h4",{staticClass:"font-bold text-center text-md"},[t._v(t._s(t.title))]),t._v(" "),l("Select",{staticClass:"min-w-1/3",attrs:{options:t.filteredPublished,label:t.$t("highlights."+t.type+".select"),"option-label":t.type+"_title_"+t.locale,value:null},on:{input:t.handleSelected}}),t._v(" "),l("div",{staticClass:"my-4"},[l("h4",{staticClass:"font-bold"},[t._v(t._s(t.$t("highlights."+t.type+".selected")))]),t._v(" "),t.selected.length?t._e():l("p",{staticClass:"text-sm"},[t._v(t._s(t.$t("highlights."+t.type+".selected_empty")))])]),t._v(" "),l("draggable",{attrs:{list:t.selected}},t._l(t.selected,(function(e){return l("div",{key:t.type+"-"+e[t.type+"_id"]},[l("EntityRow",{attrs:{type:t.type,entity:e}})],1)})),0),t._v(" "),l("div",{staticClass:"my-4"},[l("h4",{staticClass:"font-bold"},[t._v(t._s(t.$t("highlights."+t.type+".unpublished_title")))]),t._v(" "),l("p",{staticClass:"text-sm mb-4"},[t._v(t._s(t.$t("highlights."+t.type+".unpublished_subtitle")))]),t._v(" "),t._l(t.unpublished,(function(e){return l("div",{key:t.type+"-"+e[t.type+"_id"]},[l("EntityRow",{attrs:{type:t.type,entity:e,unpublished:""},on:{edit:function(l){return t.$emit("edit",t.type,e[t.type+"_id"])},publish:function(l){return t.$emit("publish",t.type,e)}}})],1)}))],2)],1):t._e()}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Select:l(291).default,EntityRow:l(360).default})},360:function(t,e,l){"use strict";l.r(e);var n=l(283),r={props:{entity:n.a.object.def(null),type:n.a.string.def(""),unpublished:n.a.bool.def(!1)},data:function(){return{locale:"fr"}},mounted:function(){this.locale=this.$i18n.locale}},c=l(23),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"flex"},[l("div",{class:[{"bg-gray-200 pointer-events-none":t.unpublished},"w-full border border-gray-500 rounded py-2 px-4 flex"]},[l("div",{staticClass:"font-bold"},[t._v(t._s(t.entity[t.type+"_title_"+t.locale]))]),t._v(" "),"article"===t.type?l("div",{staticClass:"mx-2"},[t._v("\n      "+t._s(t.entity[t.type+"_country_"+t.locale])+"\n    ")]):t._e(),t._v(" "),"travel"===t.type?l("div",{staticClass:"mx-2"},[t._v("\n      "+t._s(t.entity[t.type+"_countries_"+t.locale].join(", "))+"\n    ")]):t._e()]),t._v(" "),t.unpublished?l("div",{staticClass:"flex items-center"},[l("Btn",{attrs:{"icon-btn":"",label:t.$t("general.edit"),icon:"pencil",type:"raw"},on:{click:function(e){return t.$emit("edit")}}})],1):l("div",{staticClass:"flex items-center px-2 text-gray-600"},[l("Icon",{attrs:{name:"menu2"}})],1)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Icon:l(286).default,Btn:l(284).default})},370:function(t,e,l){"use strict";l.r(e);l(19),l(60),l(30),l(82),l(17),l(53),l(46),l(47),l(31),l(16),l(36),l(18),l(37);var n=l(12),r=l(15),c=(l(32),l(4)),o=l(26);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(object);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,l)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={asyncData:function(t){return Object(c.a)(regeneratorRuntime.mark((function e(){var l,c,o,d,h,f,v,_,y,m,O,j,C,$,x,w,E;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=t.$axios,o=t.app,e.next=3,Promise.all([c.get("/api/travels/published"),c.get("/api/articles/published"),c.get("/api/travels"),c.get("/api/articles"),c.get("/api/settings")]);case 3:return d=e.sent,h=Object(r.a)(d,5),f=h[0],v=h[1],_=h[2],y=h[3],m=h[4],O=f?f.data:[],j=v?v.data:[],C=_?_.data.filter((function(t){return!t["travel_published_".concat(o.i18n.locale)]})):[],$=y?y.data.filter((function(article){return!article["article_published_".concat(o.i18n.locale)]})):[],x=m?m.data:[],w=o.i18n.locale,l={},Object(n.a)(l,"desc_".concat(w),x["desc_".concat(w)]),Object(n.a)(l,"slider_".concat(w),x["slider_".concat(w)].map((function(t){return O.find((function(e){return e.travel_id===t}))}))),Object(n.a)(l,"highlighted_travels_".concat(w),x["highlighted_travels_".concat(w)].map((function(t){return O.find((function(e){return e.travel_id===t}))}))),Object(n.a)(l,"highlighted_articles_".concat(w),x["highlighted_articles_".concat(w)].map((function(t){return j.find((function(article){return article.article_id===t}))}))),E=l,e.abrupt("return",{publishedTravels:O,publishedArticles:j,travels:C,articles:$,settings:x,model:E,locale:w});case 18:case"end":return e.stop()}}),e)})))()},computed:h({},Object(o.c)(["loading"])),methods:{handleEdit:function(t,e){window.open("/".concat(t,"s/").concat(e),"_blank")},saveSettings:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var l,desc,r,c,o,d,f,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return desc=t.$refs.homepageDescription.getBlocks(),r=t.$refs.slider.getSelected(),c=t.$refs.highlightsTravels.getSelected(),o=t.$refs.highlightsArticles.getSelected(),d=h(h({},t.settings),{},(l={},Object(n.a)(l,"desc_".concat(t.locale),JSON.stringify(desc)),Object(n.a)(l,"slider_".concat(t.locale),JSON.stringify(r.map((function(t){return t.travel_id})))),Object(n.a)(l,"highlighted_travels_".concat(t.locale),JSON.stringify(c.map((function(t){return t.travel_id})))),Object(n.a)(l,"highlighted_articles_".concat(t.locale),JSON.stringify(o.map((function(a){return a.article_id})))),l)),e.prev=5,e.next=8,t.$axios.put("/api/settings",d);case 8:f=e.sent,data=f.data,console.debug(data),t.$toast.success(t.$t("settings.save.success")),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(5),console.warn(e.t0),t.$toast.error(t.$t("settings.save.error"));case 18:case"end":return e.stop()}}),e,null,[[5,14]])})))()}}},v=(l(338),l(23)),component=Object(v.a)(f,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("EntityActions",{attrs:{"save-only":""},on:{save:t.saveSettings}},[l("div",[l("div",{staticClass:"flex justify-center"},[l("div",{staticClass:"w-1/2"},[l("ChooseHighlights",{ref:"slider",staticClass:"mr-2",attrs:{title:t.$t("highlights.slider_title"),type:"travel",published:t.publishedTravels,unpublished:t.travels,highlighted:t.model["slider_"+t.locale]},on:{edit:t.handleEdit}})],1)]),t._v(" "),l("div",{staticClass:"py-8"},[l("BlockEditor",{ref:"homepageDescription",attrs:{label:t.$t("homepage.description"),"remove-actions":["image","playlist"],blocks:t.model["desc_"+t.locale]}})],1),t._v(" "),l("div",{staticClass:"py-8 flex justify-center"},[l("ChooseHighlights",{ref:"highlightsTravels",staticClass:"mr-2",attrs:{title:t.$t("highlights.travel_title"),type:"travel",published:t.publishedTravels,unpublished:t.travels,highlighted:t.model["highlighted_travels_"+t.locale]},on:{edit:t.handleEdit}}),t._v(" "),l("ChooseHighlights",{ref:"highlightsArticles",staticClass:"ml-2",attrs:{title:t.$t("highlights.article_title"),type:"article",published:t.publishedArticles,unpublished:t.articles,highlighted:t.model["highlighted_articles_"+t.locale]},on:{edit:t.handleEdit}})],1)])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ChooseHighlights:l(356).default,BlockEditor:l(298).default,EntityActions:l(299).default})}}]);