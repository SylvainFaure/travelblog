(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{295:function(e,t,r){var content=r(318);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(81).default)("55317c29",content,!0,{sourceMap:!1})},316:function(e,t,r){"use strict";r.d(t,"a",(function(){return d})),r.d(t,"b",(function(){return f}));r(19),r(30),r(82),r(17),r(46),r(47),r(31),r(38),r(61),r(18);var l=r(12),c=r(52);function n(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?n(Object(source),!0).forEach((function(t){Object(l.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):n(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}function d(e,t){var data=t.data,r=t.locale,l=t.otherData,c=void 0===l?{}:l;return h[e].input(data,r,c)}function f(e,t){var data=t.data,r=t.locale,l=t.otherData,c=void 0===l?{}:l;return h[e].output(data,r,c)}var h={travel:{input:function(e,t,r){return{id:e.travel_id,published:!!e["travel_published_".concat(t)],published_date:e["travel_published_date_".concat(t)]||"",same_start_end:!!e.travel_same_start_end,title:e["travel_title_".concat(t)]||"",slug:e["travel_slug_".concat(t)]||"",category:e.travel_category?r.categories.find((function(t){return t.category_id===e.travel_category})):{},cover:e["travel_cover_".concat(t)]?r.assets.find((function(r){return r.asset_id===e["travel_cover_".concat(t)]})):null,countries:e["travel_countries_".concat(t)],dates:[e.travel_start_date,e.travel_end_date],hashtags:e.travel_hashtags||[],playlist:e["travel_playlist_".concat(t)]||"",short_desc:e["travel_desc_".concat(t)]||"",long_desc:e["travel_long_desc_".concat(t)]||[]}},output:function(e,t,r){var n,d=e.id?r.travels.find((function(t){return e.id===t.travel_id})):null;Object.keys(d).forEach((function(e){"object"===Object(c.a)(d[e])&&(d[e]=JSON.stringify(d[e]))}));var f=d||{};return f=o(o({},f),{},(n={},Object(l.a)(n,"travel_title_".concat(t),e.title),Object(l.a)(n,"travel_category",e.category.category_id),Object(l.a)(n,"travel_cover_".concat(t),e.cover?e.cover.asset_id:null),Object(l.a)(n,"travel_countries_".concat(t),JSON.stringify(e.countries)),Object(l.a)(n,"travel_slug_".concat(t),e.slug),Object(l.a)(n,"travel_desc_".concat(t),e.short_desc),Object(l.a)(n,"travel_playlist_".concat(t),e.playlist),Object(l.a)(n,"travel_long_desc_".concat(t),JSON.stringify(e.long_desc)),Object(l.a)(n,"travel_start_date",e.dates[0]),Object(l.a)(n,"travel_end_date",e.dates[1]),Object(l.a)(n,"travel_hashtags",JSON.stringify(e.hashtags)),n))}},article:{input:function(article,e,t){return{id:article.article_id,published:!!article["article_published_".concat(e)],published_date:article["article_published_date_".concat(e)]||"",title:article["article_title_".concat(e)]||"",slug:article["article_slug_".concat(e)]||"",cover:article["article_cover_".concat(e)]?t.assets.find((function(t){return t.asset_id===article["article_cover_".concat(e)]})):null,place:article["article_place_".concat(e)]||"",country:{key:article["article_country_".concat(e)].toLowerCase().replace(" ","_"),label:article["article_country_".concat(e)]},travel:article.article_travel_id?t.travels.find((function(e){return e.travel_id===article.article_travel_id})):null,dates:[article.article_start_date,article.article_end_date],gallery:article["article_gallery_".concat(e)]||[],short_desc:article["article_short_desc_".concat(e)]||"",long_desc:article["article_long_desc_".concat(e)]||[]}},output:function(article,e,t){var r,n=article.id?t.articles.find((function(e){return article.id===e.article_id})):null;Object.keys(n).forEach((function(e){"object"===Object(c.a)(n[e])&&(n[e]=JSON.stringify(n[e]))}));var d=n||{};return d=o(o({},d),{},(r={},Object(l.a)(r,"article_title_".concat(e),article.title),Object(l.a)(r,"article_cover_".concat(e),article.cover?article.cover.asset_id:null),Object(l.a)(r,"article_country_".concat(e),article.country.label),Object(l.a)(r,"article_place_".concat(e),article.place),Object(l.a)(r,"article_slug_".concat(e),article.slug),Object(l.a)(r,"article_short_desc_".concat(e),article.short_desc),Object(l.a)(r,"article_long_desc_".concat(e),JSON.stringify(article.long_desc)),Object(l.a)(r,"article_gallery_".concat(e),JSON.stringify(article.gallery)),Object(l.a)(r,"article_start_date",article.dates[0]),Object(l.a)(r,"article_end_date",article.dates[1]),Object(l.a)(r,"article_travel_id",article.travel.travel_id),r))}}}},317:function(e,t,r){"use strict";var l=r(295);r.n(l).a},318:function(e,t,r){(t=r(80)(!1)).push([e.i,".mx-datepicker{width:100%}.mx-input{border-width:1px;border-color:#e2e8f0}",""]),e.exports=t},324:function(e,t,r){"use strict";r.r(t);r(19),r(30),r(17),r(46),r(47),r(31),r(18);var l=r(12),c=r(283),n=r(26);function o(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(t){Object(l.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f={props:{id:c.a.string.def(""),label:c.a.string.def("Choose an image"),image:c.a.object.def(null),assets:c.a.array.def([]),data:c.a.object.def(null)},data:function(){return{imageModel:null,realId:Math.floor(1e4*Math.random())}},computed:d({},Object(n.c)("modal",["visible","modalId"])),mounted:function(){this.image&&(this.imageModel=this.image),this.id&&(this.realId=this.id)},methods:d(d({},Object(n.b)("modal",["setVisible","setModalId"])),{},{openModal:function(){this.setVisible(!0),this.setModalId("pick-image-".concat(this.id))},confirmImage:function(image){this.imageModel=image,this.$emit("change",image)}})},h=r(23),component=Object(h.a)(f,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.label?r("h4",{staticClass:"label font-bold my-4"},[r("span",{staticClass:"bg-white z-10 pr-6"},[e._v(e._s(e.label))])]):e._e(),e._v(" "),r("div",[e.imageModel?r("div",{staticClass:"justify-self-center"},[r("img",{staticClass:"h-56",attrs:{src:e.imageModel.asset_src}})]):e._e(),e._v(" "),r("div",{staticClass:"flex justify-end w-full"},[r("Btn",{attrs:{"icon-btn":"",icon:e.image?"pencil":"plus"},on:{click:e.openModal}})],1),e._v(" "),e.modalId==="pick-image-"+e.id?r("AssetsModal",{attrs:{assets:e.assets,picked:e.imageModel,data:e.data},on:{confirm:e.confirmImage}}):e._e()],1)])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Btn:r(284).default,AssetsModal:r(301).default})},325:function(e,t,r){"use strict";r.r(t);var l=r(283),c=r(320),n=(r(329),r(330),{components:{DatePicker:c.default},props:{label:l.a.string.def(null),model:l.a.array.def(null),placeholder:l.a.string.def(null)},data:function(){return{dateModel:[new Date,new Date]}},watch:{dateModel:function(e,t){e!==t&&this.$emit("change",e)}},mounted:function(){this.model&&(this.dateModel=this.model)}}),o=(r(317),r(23)),component=Object(o.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.label?r("h4",{staticClass:"label font-bold my-4"},[r("span",{staticClass:"bg-white z-10 pr-6"},[e._v(e._s(e.label))])]):e._e(),e._v(" "),r("date-picker",{attrs:{type:"date",range:"",placeholder:e.placeholder,"value-type":"timestamp"},model:{value:e.dateModel,callback:function(t){e.dateModel=t},expression:"dateModel"}})],1)}),[],!1,null,null,null);t.default=component.exports},358:function(e,t,r){"use strict";r.r(t);r(19),r(30),r(17),r(53),r(46),r(47),r(31),r(38),r(61),r(18),r(32);var l=r(4),c=r(12),n=r(283),o=r(26),d=r(316);function f(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function h(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(t){Object(c.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v={props:{assets:n.a.array.def([]),travels:n.a.array.def([]),articles:n.a.array.def([]),article:n.a.array.def(null)},data:function(){return{isNew:!0,isPublished:!1,mounted:!1,countries:[],model:{id:"",published:!1,published_date:"",title:"",cover:null,travel:null,country:{},place:"",dates:null,slug:"",gallery:[],short_desc:"",long_desc:null}}},computed:h(h({},Object(o.c)("modal",["visible","modalId"])),{},{locale:function(){return this.$i18n.locale}}),mounted:function(){var e=this;if(this.isNew=!this.article||!this.article[0]||!this.article[0].article_id,this.isNew)this.mounted=!0;else try{var t=Object(d.a)("article",{data:this.article[0],locale:this.locale,otherData:{travels:this.travels,assets:this.assets,articles:this.articles}});Object.keys(t).forEach((function(r){e.model[r]=t[r]})),this.isPublished=this.model.published,this.getCountries(t.travel,!1),this.mounted=!0}catch(e){console.warn(e),this.$router.push("/articles")}},methods:h(h({},Object(o.b)("modal",["setVisible","setModalId"])),{},{getCountries:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];t&&this.model.country&&(this.model.country=null);var r=e["travel_countries_".concat(this.locale)];this.countries=r&&r.length?r.map((function(e){return{key:e.toLowerCase().replace(" ","_"),label:e}})):[]},handleGalleryChange:function(e){this.model.gallery=e},reloadData:function(){var e=this;return Object(l.a)(regeneratorRuntime.mark((function t(){var r,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.mounted=!1,t.prev=1,t.next=4,e.$axios.get("/api/articles/".concat(e.$route.params.id));case 4:r=t.sent,r.data?(l=Object(d.a)("article",{data:e.article[0],locale:e.locale,otherData:{travels:e.travels,assets:e.assets,articles:e.articles}}),e.model=l,e.isPublished=e.model.published,e.mounted=!0):e.$router.push("/articles"),t.next=13;break;case 9:t.prev=9,t.t0=t.catch(1),console.warn(t.t0),e.$router.push("/articles");case 13:case"end":return t.stop()}}),t,null,[[1,9]])})))()},saveArticle:function(e){this.model.long_desc=this.$refs.longDescription.getBlocks(),this.model.gallery=this.$refs.gallery.getContent();var t=Object(d.b)("article",{data:this.model,otherData:{travels:this.travels,articles:this.articles,assets:this.assets},locale:this.locale});t.article_id?("publish"===e&&(t["article_published_".concat(this.locale)]=1,t["article_published_date_".concat(this.locale)]=Date.parse(new Date)),"unpublish"===e&&(t["article_published_".concat(this.locale)]=0,t["article_published_date_".concat(this.locale)]=null),this.updateArticle(t,e)):this.createArticle(t)},createArticle:function(article){var e=this;return Object(l.a)(regeneratorRuntime.mark((function t(){var r,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$axios.post("/api/articles",article);case 3:r=t.sent,l=r.data,e.$toast.success(e.$t("article.save.success")),e.$router.push("/articles/".concat(l[0].article_id)),t.next=13;break;case 9:t.prev=9,t.t0=t.catch(0),console.warn(t.t0),e.$toast.error(e.$t("article.save.error"));case 13:case"end":return t.stop()}}),t,null,[[0,9]])})))()},updateArticle:function(article,e){var t=this;return Object(l.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,t.$axios.put("/api/articles/".concat(article.article_id),article);case 3:"publish"===e?t.publishArticle(article):"unpublish"===e?t.unpublishArticle(article.article_id):t.$toast.success(t.$t("article.update.success")),r.next=10;break;case 6:r.prev=6,r.t0=r.catch(0),console.warn(r.t0),t.$toast.error(t.$t("article.update.error"));case 10:return r.prev=10,t.reloadData(),r.finish(10);case 13:case"end":return r.stop()}}),r,null,[[0,6,10,13]])})))()},publishArticle:function(article){var e=this;return Object(l.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$axios.post("/api/articles/published/".concat(article.article_id),article);case 3:e.$toast.success(e.$t("article.published.success")),t.next=10;break;case 6:t.prev=6,t.t0=t.catch(0),console.warn(t.t0),e.$toast.error(e.$t("article.published.error"));case 10:case"end":return t.stop()}}),t,null,[[0,6]])})))()},unpublishArticle:function(e){var t=this;return Object(l.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,t.$axios.delete("/api/articles/published/".concat(e));case 3:t.$toast.success(t.$t("article.unpublished.success")),r.next=10;break;case 6:r.prev=6,r.t0=r.catch(0),console.warn(r.t0),t.$toast.error(t.$t("article.unpublished.error"));case 10:case"end":return r.stop()}}),r,null,[[0,6]])})))()},removeArticle:function(){var e=this;return Object(l.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$axios.delete("/api/articles/".concat(e.model.id));case 3:e.$toast.success(e.$t("article.remove.success")),e.closeRemoveModal(),e.$router.push("/articles"),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(0),console.warn(t.t0),e.$toast.error(e.$t("article.remove.error"));case 12:case"end":return t.stop()}}),t,null,[[0,8]])})))()},openRemoveModal:function(){this.setVisible(!0),this.setModalId("remove-article")},closeRemoveModal:function(){this.setVisible(!1),this.setModalId(null)}})},_=r(23),component=Object(_.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("EntityActions",{attrs:{"is-new":e.isNew,"is-published":e.isPublished},on:{save:e.saveArticle,publish:function(t){return e.saveArticle("publish")},unpublish:function(t){return e.saveArticle("unpublish")},remove:e.openRemoveModal}},[e.mounted?r("form",[r("InputText",{attrs:{label:e.$t("article.title")},model:{value:e.model.title,callback:function(t){e.$set(e.model,"title",t)},expression:"model.title"}}),e._v(" "),r("ChooseImage",{attrs:{image:e.model.cover,assets:e.assets,data:{travels:e.travels,articles:e.articles},label:e.$t("article.cover")},on:{change:function(t){e.model.cover=t}}}),e._v(" "),r("Select",{attrs:{label:e.$t("article.travel"),options:e.travels,"option-label":"travel_title_"+e.locale},on:{input:e.getCountries},model:{value:e.model.travel,callback:function(t){e.$set(e.model,"travel",t)},expression:"model.travel"}}),e._v(" "),r("Select",{attrs:{label:e.$t("article.country"),options:e.countries},model:{value:e.model.country,callback:function(t){e.$set(e.model,"country",t)},expression:"model.country"}}),e._v(" "),r("InputText",{attrs:{label:e.$t("article.place")},model:{value:e.model.place,callback:function(t){e.$set(e.model,"place",t)},expression:"model.place"}}),e._v(" "),r("Datepicker",{attrs:{label:e.$t("article.dates"),model:e.model.dates},on:{change:function(t){e.model.dates=t}}}),e._v(" "),r("InputText",{attrs:{label:e.$t("article.slug")},model:{value:e.model.slug,callback:function(t){e.$set(e.model,"slug",t)},expression:"model.slug"}}),e._v(" "),r("Textarea",{attrs:{label:e.$t("article.short_desc")},model:{value:e.model.short_desc,callback:function(t){e.$set(e.model,"short_desc",t)},expression:"model.short_desc"}}),e._v(" "),r("GalleryEditor",{ref:"gallery",attrs:{label:e.$t("article.gallery"),assets:e.assets,gallery:e.model.gallery,picked:e.model.gallery},on:{"gallery-change":e.handleGalleryChange}}),e._v(" "),r("BlockEditor",{ref:"longDescription",attrs:{label:e.$t("travel.long_desc"),addons:["map-description"],blocks:e.model.long_desc,assets:e.assets,data:{travels:e.travels,articles:e.articles}}})],1):e._e()]),e._v(" "),"remove-article"===e.modalId?r("RemoveModal",{on:{confirm:e.removeArticle,cancel:e.closeRemoveModal}}):e._e()],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{InputText:r(288).default,ChooseImage:r(324).default,Select:r(291).default,Datepicker:r(325).default,Textarea:r(296).default,GalleryEditor:r(362).default,BlockEditor:r(298).default,EntityActions:r(299).default,RemoveModal:r(290).default})},362:function(e,t,r){"use strict";r.r(t);r(19),r(30),r(17),r(46),r(47),r(31),r(18);var l=r(12),c=r(283),n=r(26);function o(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(t){Object(l.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f={props:{id:c.a.string.def(null),label:c.a.string.def("Choose an image"),gallery:c.a.array.def([]),assets:c.a.array.def([])},data:function(){return{galleryModel:[],realId:Math.floor(1e4*Math.random())}},computed:d(d({},Object(n.c)("modal",["visible","modalId"])),{},{isEditable:function(){return this.galleryModel&&this.galleryModel.length<4}}),mounted:function(){this.gallery&&this.gallery.length&&(this.galleryModel=this.gallery),this.id&&(this.realId=this.id)},methods:d(d({},Object(n.b)("modal",["setVisible","setModalId"])),{},{openModal:function(){this.setVisible(!0),this.setModalId("pick-gallery-".concat(this.realId))},confirmGallery:function(e){this.galleryModel=e},removeAsset:function(e){this.galleryModel=this.galleryModel.filter((function(a){return a.asset_id!==e.asset_id}))},getContent:function(){return this.galleryModel}})},h=r(23),component=Object(h.a)(f,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.label?r("h4",{staticClass:"label font-bold my-4"},[r("span",{staticClass:"bg-white z-10 pr-6"},[e._v(e._s(e.label))])]):e._e(),e._v(" "),r("div",[e.galleryModel&&e.galleryModel.length?r("div",{staticClass:"flex"},e._l(e.galleryModel,(function(img){return r("div",{key:img.asset_id,staticClass:"mr-4 relative w-1/4"},[r("span",{staticClass:"absolute top-0 right-0 m-2 text-white",on:{click:function(t){return e.removeAsset(img)}}},[r("Icon",{attrs:{name:"cross"}})],1),e._v(" "),r("img",{staticClass:"mx-2",attrs:{src:img.asset_src}})])})),0):e._e(),e._v(" "),e.isEditable?r("div",{staticClass:"flex justify-end w-full"},[r("Btn",{attrs:{"icon-btn":"",icon:e.galleryModel&&e.galleryModel.length?"pencil":"plus"},on:{click:e.openModal}})],1):e._e(),e._v(" "),e.modalId==="pick-gallery-"+e.realId?r("AssetsModal",{attrs:{assets:e.assets,pick:"multiple",picked:[].concat(e.galleryModel),"pick-limit":4},on:{confirm:e.confirmGallery}}):e._e()],1)])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Icon:r(286).default,Btn:r(284).default,AssetsModal:r(301).default})},374:function(e,t,r){"use strict";r.r(t);r(16),r(36),r(37);var l=r(15),c=(r(32),r(4)),n={asyncData:function(e){return Object(c.a)(regeneratorRuntime.mark((function t(){var r,c,n,o,d,article,f,h,v,_,m,y;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=e.$axios,c=e.route,n=[],o=[],d=[],t.prev=4,!c.params.id||"new"===c.params.id){t.next=10;break}return t.next=8,r.get("/api/articles/".concat(c.params.id));case 8:f=t.sent,article=f?f.data:null;case 10:return t.next=12,Promise.all([r.get("/api/assets"),r.get("/api/travels"),r.get("/api/articles")]);case 12:h=t.sent,v=Object(l.a)(h,3),_=v[0],m=v[1],y=v[2],n=_.data,o=m.data,d=y.data,t.next=25;break;case 22:t.prev=22,t.t0=t.catch(4),console.log(t.t0);case 25:return console.log(article),t.abrupt("return",{assets:n,travels:o,article:article,articles:d});case 27:case"end":return t.stop()}}),t,null,[[4,22]])})))()}},o=r(23),component=Object(o.a)(n,(function(){var e=this.$createElement;return(this._self._c||e)("ArticleForm",{attrs:{assets:this.assets,travels:this.travels,article:this.article,articles:this.articles}})}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{ArticleForm:r(358).default})}}]);