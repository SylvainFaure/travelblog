(window.webpackJsonp=window.webpackJsonp||[]).push([[18,11,36],{471:function(t,e,n){"use strict";n.r(e);n(57);var l=n(470),o={props:{type:l.a.string.def("primary"),label:l.a.string.def("Save"),iconBtn:l.a.bool.def(!1),icon:l.a.string.def("checkmark"),additionalClasses:l.a.string.def("")},computed:{classes:function(){var t=this.iconBtn?"px-4 py-2":"p-2";return"cursor-pointer bg-".concat(this.type||"primary"," ").concat("raw"===this.type?"":"border text-white"," ").concat(t)}}},c=n(36),component=Object(c.a)(o,(function(){var t=this,e=t._self._c;return e("button",{class:[t.classes,t.additionalClasses,"rounded text-center flex items-center"],attrs:{type:"button"},on:{click:function(e){return t.$emit("click")}}},[t.iconBtn?t._e():e("span",[t._v(t._s(t.label))]),t._v(" "),t.icon&&!t.iconBtn?e("span",{staticClass:"pl-2"},[e("Icon",{attrs:{name:t.icon}})],1):e("span",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.label,expression:"label"}]},[e("Icon",{attrs:{name:t.icon}})],1)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Icon:n(472).default})},472:function(t,e,n){"use strict";n.r(e);n(473),n(26);var l=n(470),o={props:{name:l.a.string.def(""),small:l.a.bool.def(!1)}},c=n(36),component=Object(c.a)(o,(function(){var t=this,e=t._self._c;return e("svg",t._g({class:{"fill-current icon":!0,"cursor-pointer":!!t.$listeners,"w-2 h-2":t.small,"w-4 h-4":!t.small}},t.$listeners),[e("use",{attrs:{"xlink:href":"#icon-".concat(t.name)}})])}),[],!1,null,null,null);e.default=component.exports},473:function(t,e,n){"use strict";var l=n(2),o=n(475);l({target:"String",proto:!0,forced:n(476)("small")},{small:function(){return o(this,"small","","")}})},475:function(t,e,n){var l=n(4),o=n(41),c=n(16),r=/"/g,d=l("".replace);t.exports=function(t,e,n,l){var h=c(o(t)),f="<"+e;return""!==n&&(f+=" "+n+'="'+d(c(l),r,"&quot;")+'"'),f+">"+h+"</"+e+">"}},476:function(t,e,n){var l=n(3);t.exports=function(t){return l((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},477:function(t,e,n){"use strict";n.r(e);var l=n(510),o=n.n(l),c=n(470),r=(n(511),{components:{vSelect:o.a},props:{label:c.a.string.def(null),sublabel:c.a.string.def(null),placeholder:c.a.string.def(null),options:c.a.array.def([]),optionLabel:c.a.string.def("label"),multiple:c.a.bool.def(!1),taggable:c.a.bool.def(!1),pushTags:c.a.bool.def(!1),value:c.a.oneOfType([c.a.object,c.a.array]).def(null),small:c.a.bool.def(!1)}}),d=(n(485),n(36)),component=Object(d.a)(r,(function(){var t=this,e=t._self._c;return e("div",[t.label?e("h4",{staticClass:"label font-bold my-4"},[e("span",{staticClass:"bg-white z-10 pr-6"},[t._v(t._s(t.label))])]):t._e(),t._v(" "),t.sublabel?e("p",[t._v(t._s(t.sublabel))]):t._e(),t._v(" "),e("v-select",{attrs:{options:t.options,label:t.optionLabel,multiple:t.multiple,taggable:t.taggable,"push-tags":t.pushTags,placeholder:t.placeholder,value:t.value},on:{input:function(e){return t.$emit("input",e)}}})],1)}),[],!1,null,null,null);e.default=component.exports},478:function(t,e,n){var content=n(486);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(85).default)("afdcce92",content,!0,{sourceMap:!1})},485:function(t,e,n){"use strict";n(478)},486:function(t,e,n){var l=n(84)(!1);l.push([t.i,'.vs__dropdown-toggle{border-width:1px}.label{position:relative;overflow:hidden;display:flex;align-items:center}.label:after{content:"";position:absolute;padding-left:2px;width:100%;height:1px;background-color:#000}',""]),t.exports=l},530:function(t,e,n){"use strict";n.r(e);n(139),n(57);var l=n(470),o={props:{entity:l.a.object.def(null),type:l.a.string.def(""),unpublished:l.a.bool.def(!1)},data:function(){var t=this.$i18n.locale;return{locale:t,otherLocale:"fr"===t?"it":"fr"}},computed:{title:function(){return this.entity["".concat(this.type,"_title_").concat(this.locale)]?this.entity["".concat(this.type,"_title_").concat(this.locale)]:'<span class="italic text-gray-500">'.concat(this.entity["".concat(this.type,"_title_").concat(this.otherLocale)],"</span>")},articleCountry:function(){return this.entity["".concat(this.type,"_country_").concat(this.locale)]?this.entity["".concat(this.type,"_country_").concat(this.locale)]:'<span class="italic text-gray-500">'.concat(this.entity["".concat(this.type,"_country_").concat(this.otherLocale)],"</span>")},travelCountries:function(){return this.entity["".concat(this.type,"_countries_").concat(this.locale)]?this.entity["".concat(this.type,"_countries_").concat(this.locale)].join(", "):'<span class="italic text-gray-500">'.concat(this.entity["".concat(this.type,"_countries_").concat(this.otherLocale)].join(", "),"</span>")}}},c=n(36),component=Object(c.a)(o,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"flex"},[e("div",{class:[{"bg-gray-200 pointer-events-none":t.unpublished},"w-full border border-gray-500 rounded py-2 px-4 flex"]},[e("div",{staticClass:"font-bold",domProps:{innerHTML:t._s(t.title)}}),t._v(" "),"article"===t.type?e("div",{staticClass:"mx-2",domProps:{innerHTML:t._s(t.articleCountry)}}):t._e(),t._v(" "),"travel"===t.type?e("div",{staticClass:"mx-2",domProps:{innerHTML:t._s(t.travelCountries)}},[t._v("\n      "+t._s(t.entity["".concat(t.type,"_countries_").concat(t.locale)].join(", "))+"\n    ")]):t._e()]),t._v(" "),t.unpublished?e("div",{staticClass:"flex items-center"},[e("Btn",{attrs:{"icon-btn":"",label:t.$t("general.edit"),icon:"pencil",type:"raw"},on:{click:function(e){return t.$emit("edit")}}})],1):e("div",{staticClass:"flex items-center px-2 text-gray-600"},[e("Icon",{attrs:{name:"menu2"}}),t._v(" "),e("Btn",{attrs:{"icon-btn":"",label:t.$t("general.remove"),icon:"cross",type:"raw"},on:{click:function(e){return t.$emit("remove")}}})],1)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Icon:n(472).default,Btn:n(471).default})},563:function(t,e,n){"use strict";n.r(e);n(57),n(11),n(138),n(266),n(51);var l=n(470),o=n(525),c=n.n(o),r=n(552),d=n.n(r),h={components:{draggable:c.a},props:{type:l.a.string.def("travels"),title:l.a.string.def(""),highlighted:l.a.array.def(null),published:l.a.array.def([]),unpublished:l.a.array.def([])},data:function(){return{locale:this.$i18n.locale,selected:[],mounted:!1}},computed:{filteredPublished:function(){var t=this;return this.published.reduce((function(e,n){return t.selected.find((function(e){return n["".concat(t.type,"_id")]===e["".concat(t.type,"_id")]}))||e.push(n),e}),[])}},watch:{highlighted:function(t,e){var n=this,l=t.map((function(t){return t["".concat(n.type,"_id")]})).sort(),o=e.map((function(t){return t["".concat(n.type,"_id")]})).sort();d()(l,o)||(this.selected=t)}},mounted:function(){this.highlighted&&(this.selected=this.highlighted),this.mounted=!0},methods:{handleSelected:function(t){this.selected.push(t)},getSelected:function(){return this.selected}}},f=n(36),component=Object(f.a)(h,(function(){var t=this,e=t._self._c;return t.mounted?e("div",[e("h4",{staticClass:"font-bold text-center text-md"},[t._v(t._s(t.title))]),t._v(" "),e("Select",{staticClass:"min-w-1/3",attrs:{options:t.filteredPublished,label:t.$t("highlights.".concat(t.type,".select")),"option-label":"".concat(t.type,"_title_").concat(t.locale),value:null},on:{input:t.handleSelected}}),t._v(" "),e("div",{staticClass:"my-4"},[e("h4",{staticClass:"font-bold"},[t._v(t._s(t.$t("highlights.".concat(t.type,".selected"))))]),t._v(" "),t.selected.length?t._e():e("p",{staticClass:"text-sm"},[t._v(t._s(t.$t("highlights.".concat(t.type,".selected_empty"))))])]),t._v(" "),e("draggable",{attrs:{list:t.selected}},t._l(t.selected,(function(n){return e("div",{key:"".concat(t.type,"-").concat(n["".concat(t.type,"_id")])},[e("EntityRow",{attrs:{type:t.type,entity:n},on:{remove:function(e){return t.$emit("remove",{type:t.type,id:n["".concat(t.type,"_id")]})}}})],1)})),0),t._v(" "),e("div",{staticClass:"my-4"},[e("h4",{staticClass:"font-bold"},[t._v(t._s(t.$t("highlights.".concat(t.type,".unpublished_title"))))]),t._v(" "),e("p",{staticClass:"text-sm mb-4"},[t._v(t._s(t.$t("highlights.".concat(t.type,".unpublished_subtitle"))))]),t._v(" "),t._l(t.unpublished,(function(n){return e("div",{key:"".concat(t.type,"-").concat(n["".concat(t.type,"_id")])},[e("EntityRow",{attrs:{type:t.type,entity:n,unpublished:""},on:{edit:function(e){return t.$emit("edit",t.type,n["".concat(t.type,"_id")])},publish:function(e){return t.$emit("publish",t.type,n)}}})],1)}))],2)],1):t._e()}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Select:n(477).default,EntityRow:n(530).default})}}]);