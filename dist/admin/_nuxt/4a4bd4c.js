(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{376:function(e,t,n){"use strict";n.r(t);n(19),n(27),n(17),n(36),n(37),n(28),n(16),n(38),n(18),n(39);var r=n(9),o=n(15),c=(n(32),n(4)),l=n(20);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function v(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f={asyncData:function(e){return Object(c.a)(regeneratorRuntime.mark((function t(){var n,r,c,l,d,v,f,m,h,x,O,w,$;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.$axios,r=e.route,c=e.app,l=[],d=[],v=[],t.prev=4,!r.params.id||"new"===r.params.id){t.next=10;break}return t.next=8,n.get("/api/anecdotes/".concat(r.params.id));case 8:m=t.sent,f=m?m.data:null;case 10:return t.next=12,Promise.all([n.get("/api/assets"),n.get("/api/travels"),n.get("/api/articles")]);case 12:h=t.sent,x=Object(o.a)(h,3),O=x[0],w=x[1],$=x[2],l=O.data,d=w.data,v=$.data,t.next=25;break;case 22:t.prev=22,t.t0=t.catch(4),console.log(t.t0);case 25:return t.abrupt("return",{assets:l,travels:d,anecdote:f,articles:v,title:f?f.anecdote_title:"",content:f?f.anecdote_content:[],locale:c.i18n.locale,isNew:!f,mounted:!1});case 26:case"end":return t.stop()}}),t,null,[[4,22]])})))()},computed:v({},Object(l.c)("modal",["modalId"])),mounted:function(){this.mounted=!0},methods:v(v({},Object(l.b)("modal",["setVisible","setModalId"])),{},{reloadData:function(){var e=this;return Object(c.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$axios.get("/api/anecdotes/".concat(e.$route.params.id));case 3:e.anecdote=t.sent,t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),console.warn(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})))()},saveAnecdote:function(){var e=this;return Object(c.a)(regeneratorRuntime.mark((function t(){var n,r,o,data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.$refs.anecdoteContent.getBlocks(),(r={anecdote_id:e.anecdote?e.anecdote.anecdote_id:null,anecdote_title:e.title,anecdote_content:JSON.stringify(n)}).anecdote_id){t.next=17;break}return t.prev=3,t.next=6,e.$axios.post("/api/anecdotes",r);case 6:o=t.sent,data=o.data,e.$toast.success(e.$t("anecdotes.save.success")),e.$router.push("/anecdotes/".concat(data[0].anecdote_id)),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(3),e.$toast.error(e.$t("anecdotes.save.error"));case 15:t.next=27;break;case 17:return t.prev=17,t.next=20,e.$axios.put("/api/anecdotes/".concat(r.anecdote_id),r);case 20:e.$toast.success(e.$t("anecdotes.save.success")),e.reloadData(),t.next=27;break;case 24:t.prev=24,t.t1=t.catch(17),e.$toast.error(e.$t("anecdotes.save.error"));case 27:case"end":return t.stop()}}),t,null,[[3,12],[17,24]])})))()},removeAnecdote:function(){var e=this;return Object(c.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$axios.delete("/api/anecdotes/".concat(e.anecdote.anecdote_id));case 3:e.$toast.success(e.$t("anecdotes.remove.success")),e.$router.push("/anecdotes"),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),console.warn(t.t0),e.$toast.error(e.$t("anecdotes.remove.error"));case 11:return t.prev=11,e.closeModal(),t.finish(11);case 14:case"end":return t.stop()}}),t,null,[[0,7,11,14]])})))()},openRemoveModal:function(){this.setModalId("remove-anecdote"),this.setVisible(!0)},closeModal:function(){this.setModalId(null),this.setVisible(!1)}})},m=n(24),component=Object(m.a)(f,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("EntityActions",{attrs:{"save-only":"","can-remove":"","is-new":e.isNew},on:{save:e.saveAnecdote,remove:e.openRemoveModal}},[n("div",{staticClass:"m-8"},[n("InputText",{attrs:{label:e.$t("anecdotes.title")},model:{value:e.title,callback:function(t){e.title=t},expression:"title"}}),e._v(" "),e.mounted?n("BlockEditor",{ref:"anecdoteContent",attrs:{label:e.$t("anecdotes.content"),blocks:e.content,assets:e.assets,data:{travels:e.travels,articles:e.articles}}}):e._e(),e._v(" "),"remove-anecdote"===e.modalId?n("RemoveModal",{on:{confirm:e.removeAnecdote,cancel:e.closeModal}}):e._e()],1)])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{InputText:n(291).default,BlockEditor:n(301).default,RemoveModal:n(293).default,EntityActions:n(302).default})}}]);