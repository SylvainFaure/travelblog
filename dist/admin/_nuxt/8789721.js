(window.webpackJsonp=window.webpackJsonp||[]).push([[14,15,16],{479:function(t,e,n){var content=n(488);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(85).default)("e8fc41cc",content,!0,{sourceMap:!1})},480:function(t,e,n){var content=n(493);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(85).default)("158f622b",content,!0,{sourceMap:!1})},481:function(t,e,n){"use strict";n.r(e);n(25),n(18),n(39),n(20),n(40);var o=n(13),r=(n(30),n(11),n(470)),c=n(31);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={props:{assets:r.a.array.def([]),picked:r.a.oneOfType([r.a.object,r.a.array]).def(null),pick:r.a.string.def("one"),pickLimit:r.a.number.def(null),data:r.a.object.def(null)},data:function(){return{pickedImage:null,pickedImages:[]}},mounted:function(){this.picked&&("one"===this.pick?this.pickedImage=this.picked:"multiple"===this.pick&&(this.pickedImages=this.picked))},methods:d(d({},Object(c.b)("modal",["setVisible","setModalId"])),{},{handlePick:function(image){this.pickedImage=image},handlePicks:function(t,e,n){"add"===n?this.pickedImages.push(e):this.pickedImages=this.pickedImages.filter((function(a){return a.asset_id!==e.asset_id}))},handleConfirm:function(){var t="one"===this.pick?this.pickedImage:this.pickedImages;this.$emit("confirm",t),this.setModalId(null),this.setVisible(!1)},handleCancel:function(){this.setModalId(null),this.setVisible(!1)}})},m=n(36),component=Object(m.a)(f,(function(){var t=this,e=t._self._c;return e("portal",{attrs:{to:"modal"}},[e("div",{staticClass:"relative h-full"},["one"===t.pick&&t.pickedImage?e("div",{staticClass:"m-8"},[e("img",{staticClass:"h-48",attrs:{src:t.pickedImage.asset_src}})]):"multiple"===t.pick&&t.pickedImages?e("div",{staticClass:"m-8 flex flex-wrap"},t._l(t.pickedImages,(function(img){return e("div",{key:img.asset_id,staticClass:"mr-4"},[e("img",{staticClass:"h-32 m-2",attrs:{src:img.asset_src}})])})),0):t._e(),t._v(" "),e("AssetPickerLibrary",{attrs:{assets:t.assets,picked:t.picked,pick:t.pick,"pick-limit":t.pickLimit,data:t.data},on:{pick:t.handlePick,picks:t.handlePicks}}),t._v(" "),e("div",{staticClass:"sticky bottom-0 w-full translate-x-0 p-2 bg-white border-t-2 border-gray-500"},[e("div",{staticClass:"flex justify-end"},[e("Btn",{attrs:{label:t.$t("general.confirm")},on:{click:t.handleConfirm}}),t._v(" "),e("Btn",{attrs:{label:t.$t("general.cancel"),type:"secondary"},on:{click:t.handleCancel}})],1)])],1)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{AssetPickerLibrary:n(495).default,Btn:n(471).default})},483:function(t,e,n){"use strict";n.r(e);n(25),n(18),n(30),n(11),n(39),n(20),n(40);var o=n(6),r=n(13),c=(n(52),n(44),n(470)),l=n(31);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={props:{id:c.a.string.def("new-block"),type:c.a.string.def("paragraph"),content:c.a.any.def(null),edit:c.a.bool.def(!1),assets:c.a.array.def([]),data:c.a.object.def({})},data:function(){return{imageType:"desktop",model:{desktop:null,mobile:null,playlist:""}}},computed:f({},Object(l.c)("modal",["modalId"])),methods:f(f({},Object(l.b)("modal",["setVisible","setModalId"])),{},{getTools:function(t){return"map-description"===t?["map"]:"anecdote"===t?["anecdote"]:[]},selectImage:function(t){this.imageType=t,this.setModalId("editor-asset"),this.setVisible(!0)},handleConfirm:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var content;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(content="",["image","playlist"].includes(t.type)){e.next=7;break}return e.next=4,t.$refs.textEditor.saveContent();case 4:content=e.sent,e.next=8;break;case 7:"image"===t.type?content={content:{desktop:t.model.desktop||t.content.desktop,mobile:t.model.mobile||t.content.mobile}}:"playlist"===t.type&&(content={content:t.model[t.type]});case 8:t.$emit("confirm",t.type,content,t.id);case 9:case"end":return e.stop()}}),e)})))()},handleCancel:function(){this.$emit("cancel")},handleConfirmImage:function(t){this.model[this.imageType]=t}})},h=n(36),component=Object(h.a)(m,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"my-2"},["image"===t.type?e("div",{staticClass:"flex justify-center"},[e("div",{staticClass:"h-full flex justify-center"},[t.edit||t.model.desktop?e("img",{staticClass:"h-48",attrs:{src:t.model.desktop?t.model.desktop.asset_src:t.content.desktop.asset_src}}):t._e(),t._v(" "),e("div",{class:{"h-full flex items-center ml-4":t.edit||t.model.desktop,"flex justify-center mx-4":!t.edit}},[e("Btn",{attrs:{"icon-btn":"",icon:"pencil",label:t.$t("general.desktop")},on:{click:function(e){return t.selectImage("desktop")}}})],1)]),t._v(" "),e("div",{staticClass:"h-full flex justify-center"},[t.edit||t.model.mobile?e("img",{staticClass:"h-48",attrs:{src:t.model.mobile?t.model.mobile.asset_src:t.content.mobile.asset_src}}):t._e(),t._v(" "),e("div",{class:{"h-full flex items-center ml-4":t.edit||t.model.mobile,"flex justify-center mx-4":!t.edit}},[e("Btn",{attrs:{"icon-btn":"",icon:"pencil",label:t.$t("general.mobile")},on:{click:function(e){return t.selectImage("mobile")}}})],1)])]):"playlist"===t.type?e("div",[e("InputText",{attrs:{value:t.edit?t.content:""},model:{value:t.model.playlist,callback:function(e){t.$set(t.model,"playlist",e)},expression:"model.playlist"}})],1):e("div",[e("TextEditor",{ref:"textEditor",attrs:{name:"block-editor-comp-".concat(t.type),data:t.edit?t.content:null,anecdotes:t.data?t.data.anecdotes:null,tools:t.getTools(t.type)}})],1),t._v(" "),e("div",{staticClass:"flex justify-center my-2"},[e("Btn",{attrs:{label:t.$t("general.confirm")},on:{click:t.handleConfirm}}),t._v(" "),e("Btn",{attrs:{label:t.$t("general.cancel"),type:"secondary"},on:{click:t.handleCancel}})],1),t._v(" "),"editor-asset"===t.modalId?e("AssetsModal",{attrs:{assets:t.assets,data:t.data,picked:t.edit?t.content[t.imageType]:null},on:{confirm:t.handleConfirmImage}}):t._e()],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Btn:n(471).default,InputText:n(474).default,TextEditor:n(494).default,AssetsModal:n(481).default})},487:function(t,e,n){"use strict";n(479)},488:function(t,e,n){var o=n(84)(!1);o.push([t.i,"#map{height:100%;min-height:400px}#infowindow-content .title{font-weight:700}#infowindow-content{display:none}#map #infowindow-content{display:inline}",""]),t.exports=o},489:function(t,e,n){"use strict";n.r(e);n(25),n(18),n(30),n(11),n(39),n(20),n(40);var o=n(13),r=n(470),c=n(31);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={props:{anecdotes:r.a.array.def([])},data:function(){return{anecdoteModel:{}}},methods:d(d({},Object(c.b)("editor",["setValue"])),{},{handleInput:function(input){this.setValue(input),this.anecdoteModel=input}})},m=n(36),component=Object(m.a)(f,(function(){var t=this,e=t._self._c;return e("portal",{attrs:{to:"modal"}},[e("div",{staticClass:"p-8"},[e("Select",{attrs:{options:t.anecdotes,"option-label":"anecdote_title",value:t.anecdoteModel},on:{input:t.handleInput}}),t._v(" "),e("div",{staticClass:"flex justify-end my-4"},[e("Btn",{attrs:{label:t.$t("general.confirm"),"additional-classes":"confirm-anecdote"}})],1)],1)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Select:n(477).default,Btn:n(471).default})},490:function(t,e,n){"use strict";n.r(e);var o={},r=(n(487),n(36)),component=Object(r.a)(o,(function(){var t=this,e=t._self._c;return e("portal",{attrs:{to:"modal"}},[e("div",{staticClass:"p-8"},[e("input-text",{attrs:{id:"pac-input",type:"text",placeholder:"Lieu - Luogo"}}),t._v(" "),e("div",{attrs:{id:"map"}}),t._v(" "),e("div",{attrs:{id:"infowindow-content"}},[e("img",{attrs:{id:"place-icon",src:"",width:"16",height:"16"}}),t._v(" "),e("span",{staticClass:"title",attrs:{id:"place-name"}}),e("br"),t._v(" "),e("span",{attrs:{id:"place-address"}})]),t._v(" "),e("div",{staticClass:"flex justify-end my-4"},[e("Btn",{attrs:{label:t.$t("general.confirm"),"additional-classes":"confirm-map-point"}})],1)],1)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{InputText:n(474).default,Btn:n(471).default})},492:function(t,e,n){"use strict";n(480)},493:function(t,e,n){var o=n(84)(!1);o.push([t.i,"[id^=editor]{width:100%;min-width:50vw;padding:20px;border:1px solid #d3d3d3;min-height:200px}",""]),t.exports=o},494:function(t,e,n){"use strict";n.r(e);n(26),n(25),n(18),n(30),n(11),n(39),n(20),n(40);var o=n(6),r=n(179),c=n(13),l=(n(52),n(57),n(51),n(470)),d=n(31),f=n(513),m=n.n(f),h=n(514),v=n.n(h),y=n(180),k=n(181),w=(n(44),n(58),n(45),n(32),n(106),n(139),function(){function t(e){var n=e.api;e.config;Object(y.a)(this,t),this.api=n,this.store=window.$nuxt.$store,this.button=null,this._state=!1,this.address=void 0,this.input=null,this.mapInitialized=!1,this.tag="SPAN",this.class="map-point"}return Object(k.a)(t,[{key:"state",get:function(){return this._state},set:function(t){this._state=t,this.button.classList.toggle(this.api.styles.inlineToolButtonActive,t)}},{key:"render",value:function(){return this.button=document.createElement("button"),this.button.type="button",this.button.innerHTML='<svg class="fill-current w-4 h-4 icon cursor-pointer">\n                              <use xlink:href="#icon-location"></use>\n                            </svg>',this.button}},{key:"surround",value:function(t){this.state?this.unwrap(t):this.wrap(t)}},{key:"wrap",value:function(t){var e=t.extractContents(),n=document.createElement(this.tag),o=Math.floor(1e4*Math.random());n.classList.add(this.class),n.setAttribute("id","map-point-".concat(o)),n.appendChild(e),t.insertNode(n),this.api.selection.expandToTag(n)}},{key:"unwrap",value:function(t){var e=this.api.selection.findParentTag(this.tag,this.class),text=t.extractContents();e.remove(),t.insertNode(text)}},{key:"checkState",value:function(){var t=this.api.selection.findParentTag(this.tag);this.state=t&&Array.from(t.classList).includes("map-point"),this.mapPointId=t&&t.getAttribute("id"),this.state?this.showActions():this.hideActions()}},{key:"renderActions",value:function(){return this.anecdotePicker=document.createElement("input"),this.anecdotePicker.type="text",this.anecdotePicker.value="",this.anecdotePicker.hidden=!0,this.anecdotePicker}},{key:"showActions",value:function(){var t=this;console.log("show action",this.mapPointId),this.store.commit("modal/setVisible",!0),this.store.commit("modal/setModalId","map-point"),setTimeout((function(){t.mapInitialized||t.initMap(),document.querySelector(".confirm-map-point").addEventListener("click",(function(e){if(t.address){var n=t.address,address=n.address,o=n.lat,r=n.lng,c=document.querySelector("#".concat(t.mapPointId));c.getAttribute("data-address")||(c.setAttribute("data-address",address),c.setAttribute("data-lat",o),c.setAttribute("data-lng",r)),t.address=null,t.input.value="",t.store.commit("modal/setVisible",!1),t.store.commit("modal/setModalId",null),t.mapPoint=null,t.mapPointId=null}}))}))}},{key:"initMap",value:function(){var t=this,map=new window.google.maps.Map(document.getElementById("map"),{center:{lat:-33.8688,lng:151.2195},zoom:13});this.mapInitialized=!0,this.input=document.getElementById("pac-input");var e=new window.google.maps.places.Autocomplete(this.input);e.bindTo("bounds",map),e.setFields(["address_components","geometry","icon","name"]);var n=new window.google.maps.InfoWindow,o=document.getElementById("infowindow-content");n.setContent(o);var marker=new window.google.maps.Marker({map:map,anchorPoint:new window.google.maps.Point(0,-29)});e.addListener("place_changed",(function(){n.close(),marker.setVisible(!1);var r=e.getPlace();if(r.geometry){r.geometry.viewport?map.fitBounds(r.geometry.viewport):(map.setCenter(r.geometry.location),map.setZoom(17)),marker.setPosition(r.geometry.location),marker.setVisible(!0);var c=r.geometry.location.lat(),l=r.geometry.location.lng(),address="";r.address_components&&(address=[r.address_components[0]&&r.address_components[0].short_name||"",r.address_components[1]&&r.address_components[1].short_name||"",r.address_components[2]&&r.address_components[2].short_name||""].join(" ")),o&&(o.children["place-icon"].src=r.icon,o.children["place-name"].textContent=r.name,o.children["place-address"].textContent=address),n.open(map,marker),t.address={address:address,lat:c,lng:l}}else window.alert("No details available for input: '"+r.name+"'")}))}},{key:"hideActions",value:function(){}}],[{key:"isInline",get:function(){return!0}},{key:"sanitize",get:function(){return{span:!0}}}]),t}()),O=function(){function t(e){var n=e.api;e.config;Object(y.a)(this,t),this.store=window.$nuxt.$store,this.api=n,this.button=null,this._state=!1,this.tag="SPAN",this.class="anecdote"}return Object(k.a)(t,[{key:"state",get:function(){return this._state},set:function(t){this._state=t,this.button.classList.toggle(this.api.styles.inlineToolButtonActive,t)}},{key:"render",value:function(){return this.button=document.createElement("button"),this.button.type="button",this.button.innerHTML=' <svg class="fill-current w-4 h-4 icon cursor-pointer">\n                                <use xlink:href="#icon-file-empty"></use>\n                              </svg>',this.button}},{key:"surround",value:function(t){this.state?this.unwrap(t):this.wrap(t)}},{key:"wrap",value:function(t){var e=t.extractContents(),n=document.createElement(this.tag);n.classList.add(this.class),n.appendChild(e),t.insertNode(n),this.api.selection.expandToTag(n)}},{key:"unwrap",value:function(t){var e=this.api.selection.findParentTag(this.tag,this.class),text=t.extractContents();e.remove(),t.insertNode(text)}},{key:"checkState",value:function(){var t=this.api.selection.findParentTag(this.tag);this.state=t&&Array.from(t.classList).includes("anecdote"),this.state?this.showActions(t):this.hideActions()}},{key:"renderActions",value:function(){return this.anecdotePicker=document.createElement("input"),this.anecdotePicker.type="text",this.anecdotePicker.value="",this.anecdotePicker.hidden=!0,this.anecdotePicker}},{key:"showActions",value:function(t){var e=this;this.store.commit("modal/setVisible",!0),this.store.commit("modal/setModalId","anecdote"),setTimeout((function(){document.querySelector(".confirm-anecdote").addEventListener("click",(function(n){var o=e.store.state.editor.value;t.classList.add("anecdote-".concat(o.anecdote_id)),t.setAttribute("data-title",o.anecdote_title),e.store.commit("modal/setVisible",!1),e.store.commit("modal/setModalId",null)}))}))}},{key:"hideActions",value:function(){}}],[{key:"isInline",get:function(){return!0}},{key:"sanitize",get:function(){return{span:!0}}}]),t}(),j=function(t){var e={paragraph:"p"};return t.blocks.map((function(t){var n=document.createElement(e[t.type]);n.innerHTML=t.data.text;return function t(e){Array.from(e.children).forEach((function(e){e.getAttribute("style")&&e.removeAttribute("style"),Array.from(e.children).length&&t(e)}))}(n),n.outerHTML})).join("")};function _(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var P={props:{name:l.a.string.def("editor"),data:l.a.object.def({}),anecdotes:l.a.array.def([]),tools:l.a.array.def([])},data:function(){return{editor:null,saveTrigger:!1,toolsMap:{list:v.a,map:{class:w,inlineToolbar:!0,config:{}},anecdote:{class:O,inlineToolbar:!0}}}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?_(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):_(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(d.c)("modal",["modalId"])),watch:{saveTrigger:function(t,e){t!==e&&this.saveContent()}},mounted:function(){this.editor=new m.a({holder:"editor-".concat(this.name),tools:this.getTools(),data:this.data})},methods:{getTools:function(){var t=this,e={};return[].concat(Object(r.a)(this.tools),["list"]).map((function(n){e[n]=t.toolsMap[n]})),e},saveContent:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n,content;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.editor.save();case 2:return n=e.sent,content=j(n),t.$emit("save",{content:content,rawContent:n}),e.abrupt("return",{content:content,rawContent:n});case 6:case"end":return e.stop()}}),e)})))()}}},C=P,x=(n(492),n(36)),component=Object(x.a)(C,(function(){var t=this,e=t._self._c;return e("div",[e("div",{attrs:{id:"editor-".concat(t.name)}}),t._v(" "),"anecdote"===t.modalId?e("AnecdoteModal",{attrs:{anecdotes:t.anecdotes}}):t._e(),t._v(" "),"map-point"===t.modalId?e("MapPointModal"):t._e()],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{AnecdoteModal:n(489).default,MapPointModal:n(490).default})},497:function(t,e,n){"use strict";n.r(e);n(44);var o=n(470),r={props:{id:o.a.string.def("block"),position:o.a.number.def(0),type:o.a.string.def(null),content:o.a.any.def(null),assets:o.a.array.def([]),data:o.a.object.def({}),rawContent:o.a.object.def({})},data:function(){return{isEditing:!1,actions:[{key:"edit",icon:"pencil"},{key:"remove",icon:"cross"},{key:"up",icon:"arrow-up2"},{key:"down",icon:"arrow-down2"}]}},methods:{handleAction:function(t){this.$emit(t.key,this.id),"edit"===t.key&&(this.isEditing=!0)},confirmModification:function(t,content,e){this.$emit("confirm",t,content,e),this.isEditing=!1}}},c=n(36),component=Object(c.a)(r,(function(){var t=this,e=t._self._c;return e("div",[t.isEditing?e("div",[e("hr"),t._v(" "),e("BlockEditorComp",{attrs:{id:t.id,edit:"",type:t.type,assets:t.assets,data:t.data,content:["image","playlist"].includes(t.type)?t.content:t.rawContent},on:{confirm:t.confirmModification,cancel:function(e){t.isEditing=!1}}})],1):e("div",[e("hr"),t._v(" "),e("div",{staticClass:"my-4"},[e("div",{staticClass:"flex justify-between mb-2"},[e("p",{staticClass:"uppercase"},[t._v(t._s(t.type))]),t._v(" "),e("div",{staticClass:"flex"},t._l(t.actions,(function(n){return e("div",{key:n.key,staticClass:"rounded-full w-8 h-8 mx-1 flex justify-center items-center cursor-pointer border-2 border-black",on:{click:function(e){return t.handleAction(n)}}},[e("Icon",{attrs:{name:n.icon}})],1)})),0)]),t._v(" "),"image"===t.type?e("div",{staticClass:"flex"},[e("div",{staticClass:"mr-2"},[e("img",{staticClass:"h-48",attrs:{src:t.content.desktop?t.content.desktop.asset_src:""}}),t._v(" "),e("p",[t._v(t._s(t.$t("general.desktop")))])]),t._v(" "),e("div",[e("img",{staticClass:"h-48",attrs:{src:t.content.mobile?t.content.mobile.asset_src:""}}),t._v(" "),e("p",[t._v(t._s(t.$t("general.mobile")))])])]):e("p",{domProps:{innerHTML:t._s(t.content)}})])])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Icon:n(472).default,BlockEditorComp:n(483).default})},501:function(t,e,n){"use strict";n.r(e);n(57),n(25),n(18),n(39),n(20),n(40);var o=n(13),r=n(179),c=(n(51),n(30),n(11),n(44),n(58),n(266),n(138),n(470));function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={props:{label:c.a.string.def(""),blocks:c.a.array.def([]),addons:c.a.array.def(null),assets:c.a.array.def([]),data:c.a.object.def({}),removeActions:c.a.array.def([])},data:function(){var t=this,e=this.addons.map((function(t){return"map-description"===t&&(t={key:"map-description",label:"Description avec carte",icon:"map"}),"anecdote"===t&&(t={key:"anecdote",label:"Description avec anecdotes",icon:"file-empty"}),t}));return{orderedBlocks:[],activeAction:null,actions:[].concat([{key:"paragraph",label:"Paragraphe",icon:"paragraph-left"},{key:"subtitle",label:"Sous-titre",icon:"pilcrow"},{key:"image",label:"Image",icon:"image"},{key:"catch",label:"Phrase d'accroche",icon:"bold"},{key:"playlist",label:"Playlist",icon:"spotify"}],Object(r.a)(e)).filter((function(e){return!t.removeActions.includes(e.key)}))}},mounted:function(){this.orderedBlocks=this.blocks?this.blocks.sort((function(a,b){return a.position-b.position})):[]},methods:{confirmModification:function(t,content,e){"new-block"===e?(this.createNewBlock(t,content),this.activeAction=null):this.orderedBlocks=this.orderedBlocks.map((function(n){return n.id===e&&("image"===t?n.content=content.content:n=d(d({},n),content)),n}))},createNewBlock:function(t,content){var e=Math.floor(1e3*Math.random()),component=d({id:"".concat(t,"-").concat(e),type:t,position:this.orderedBlocks.length},content);this.orderedBlocks.push(component)},handleOrder:function(t,e){var n=this.orderedBlocks.find((function(t){return t.id===e}));if("up"===t&&n.position>0){var o=this.orderedBlocks.find((function(t){return t.position===n.position-1})).id;this.orderedBlocks=this.orderedBlocks.map((function(b){return b.id===e?b.position-=1:b.id===o&&(b.position+=1),b})).sort((function(a,b){return a.position-b.position}))}else if("down"===t&&n.position<this.orderedBlocks.length-1){var r=this.orderedBlocks.find((function(t){return t.position===n.position+1})).id;this.orderedBlocks=this.orderedBlocks.map((function(b){return b.id===e?b.position+=1:b.id===r&&(b.position-=1),b})).sort((function(a,b){return a.position-b.position}))}},handleRemove:function(t){var e=this.orderedBlocks.find((function(b){return b.id===t}));this.orderedBlocks=this.orderedBlocks.map((function(b){return b.position>e.position&&(b.position-=1),b})).filter((function(b){return b.id!==t}))},getBlocks:function(){return this.orderedBlocks}}},m=f,h=n(36),component=Object(h.a)(m,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"mt-16"},[t.label?e("h4",{staticClass:"label font-bold my-4"},[e("span",{staticClass:"bg-white z-10 pr-6"},[t._v(t._s(t.label))])]):t._e(),t._v(" "),e("div",{staticClass:"flex justify-center flex-wrap mb-4"},t._l(t.actions,(function(n){return e("div",{key:n.key,staticClass:"border-2 border-black w-24 h-24 rounded-full flex flex-col items-center justify-center text-sm font-bold cursor-pointer text-center p-4 m-2",on:{click:function(e){t.activeAction=n.key}}},[e("p",[t._v(t._s(n.label))]),t._v(" "),e("div",[e("Icon",{attrs:{name:n.icon}})],1)])})),0),t._v(" "),t.activeAction?e("div",{staticClass:"my-4"},[e("BlockEditorComp",{attrs:{type:t.activeAction,assets:t.assets,data:t.data},on:{confirm:t.confirmModification,cancel:function(e){t.activeAction=null}}})],1):t._e(),t._v(" "),e("div",{staticClass:"my-4"},t._l(t.orderedBlocks,(function(n,i){return e("BlockPreview",t._b({key:"".concat(n.type,"-").concat(i,"-").concat(n.position),attrs:{data:t.data,assets:t.assets},on:{up:function(e){return t.handleOrder("up",e)},down:function(e){return t.handleOrder("down",e)},remove:t.handleRemove,confirm:t.confirmModification}},"BlockPreview",n,!1))})),1)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Icon:n(472).default,BlockEditorComp:n(483).default,BlockPreview:n(497).default})}}]);