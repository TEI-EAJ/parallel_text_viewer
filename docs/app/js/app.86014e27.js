(function(t){function e(e){for(var i,s,l=e[0],o=e[1],c=e[2],d=0,_=[];d<l.length;d++)s=l[d],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&_.push(n[s][0]),n[s]=0;for(i in o)Object.prototype.hasOwnProperty.call(o,i)&&(t[i]=o[i]);u&&u(e);while(_.length)_.shift()();return r.push.apply(r,c||[]),a()}function a(){for(var t,e=0;e<r.length;e++){for(var a=r[e],i=!0,l=1;l<a.length;l++){var o=a[l];0!==n[o]&&(i=!1)}i&&(r.splice(e--,1),t=s(s.s=a[0]))}return t}var i={},n={app:0},r=[];function s(e){if(i[e])return i[e].exports;var a=i[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=i,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(a,i,function(e){return t[e]}.bind(null,i));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var u=o;r.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},1:function(t,e){},2:function(t,e){},3:function(t,e){},4:function(t,e){},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var i=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("router-view")},r=[],s=a("2877"),l={},o=Object(s["a"])(l,n,r,!1,null,null,null),c=o.exports,u=a("8c4f"),d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-content",[a("v-toolbar",{attrs:{dark:!0,flat:""}},[a("v-toolbar-title",[t._v("Parallel Text Viewer with TEI & IIIF")]),a("v-spacer"),a("v-btn",{attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.dialog_settings=!0}}},[a("v-icon",[t._v("mdi-settings")])],1),a("v-btn",{attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.dialog_information=!0}}},[a("v-icon",[t._v("mdi-information")])],1),a("v-toolbar-items",{directives:[{name:"show",rawName:"v-show",value:t.return_url,expression:"return_url"}]},[a("v-btn",{attrs:{text:"",href:t.return_url}},[t._v(t._s(t.return_label))])],1)],1),a("div",{style:"height: "+t.height+"px;"},[a("splitpanes",{staticClass:"default-theme"},[a("pane",{attrs:{"min-size":"20"}},[a("iframe",{staticClass:"py-2 px-2",staticStyle:{border:"none"},attrs:{src:t.mirador_path,seamless:"seamless",width:"100%",height:t.height+"px",allow:"fullscreen"}})]),a("pane",[a("splitpanes",{staticClass:"default-theme",attrs:{horizontal:"horizontal"}},[a("pane",{staticClass:"py-2 mx-2"},[a("v-card",{staticClass:"scroll vertical",attrs:{flat:!0,id:"main"}},[a("v-card-text",{staticClass:"mx-2 text--primary"},[a("h2",{staticClass:"text--primary"},[t._v(t._s(t.label_main))]),a("br"),t._l(t.data_main_e,(function(e,i){return a("p",{key:i},[e.manifest?a("span",[a("img",{staticClass:"mr-2",staticStyle:{width:"30px"},attrs:{src:"https://iiif.dl.itc.u-tokyo.ac.jp/images/iiif.png"},on:{click:function(a){return t.clickIcon(e.id)}}}),a("br")]):t._e(),t._l(e.words,(function(e,i){return a("span",{key:i,style:-1!=t.hightlights.indexOf(e.id)?"background-color : yellow;":null,attrs:{id:e.id},on:{mouseover:t.mouseover_main,click:function(a){return t.scroll(e.id)}}},[t._v(t._s(e.value))])}))],2)}))],2)],1)],1),a("pane",{staticClass:"py-2 mx-2"},[a("v-card",{staticClass:"scroll vertical",attrs:{flat:!0,id:"sub"}},[a("v-list-item",[a("v-card-text",{staticClass:"mx-2 text--primary"},[a("h2",{staticClass:"text--primary"},[t._v(t._s(t.label_sub))]),a("br"),t._l(t.data_sub,(function(e,i){return a("p",{key:i},[a("span",{style:-1!=t.hightlights.indexOf(e.id)?"background-color : yellow;":null,attrs:{id:e.id},on:{mouseover:t.mouseover,click:function(a){return t.scroll(e.id)}}},[t._v(t._s(e.value))])])}))],2)],1)],1)],1)],1)],1)],1)],1)],1),a("v-dialog",{attrs:{width:"600px"},model:{value:t.dialog_information,callback:function(e){t.dialog_information=e},expression:"dialog_information"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[t._v("Information")]),a("v-card-text",{staticClass:"mt-5"},[a("a",{attrs:{target:"_blank",href:this.$route.query.u}},[t._v(t._s(this.$route.query.u))])]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"secondary"},on:{click:function(e){t.dialog_information=!1}}},[t._v("閉じる")])],1)],1)],1),a("v-dialog",{attrs:{width:"600px"},model:{value:t.dialog_settings,callback:function(e){t.dialog_settings=e},expression:"dialog_settings"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[t._v("Settings")]),a("v-card-text",{staticClass:"mt-5"},[a("v-text-field",{staticClass:"mb-5",attrs:{label:"Mirador表示レイアウト Ex. 1x1, 2x2, ..."},model:{value:t.layout,callback:function(e){t.layout=e},expression:"layout"}}),t._l(t.selected_manifests,(function(e,i){return a("v-switch",{key:i,attrs:{label:e.label},model:{value:e.selected,callback:function(a){t.$set(e,"selected",a)},expression:"obj.selected"}})}))],2),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"secondary"},on:{click:function(e){t.dialog_settings=!1}}},[t._v("閉じる")])],1)],1)],1)],1)},_=[],m=(a("99af"),a("c975"),a("fb6a"),a("b0c0"),a("a9e3"),a("ac1f"),a("841c"),a("1276"),a("498a"),a("512e")),h=a("bc3a"),v=a.n(h),p="mirador/",f=a("1c46");function g(t){var e=f.createHash("md5");return e.update(t,"binary").digest("hex")}var b={components:{Splitpanes:m["Splitpanes"],Pane:m["Pane"]},data:function(){return{width:window.innerWidth,height:window.innerHeight,return_url:null,return_label:null,dialog_information:!1,dialog_settings:!1,url_main:"",url_sub:"",test:"",data_main:[],data_sub:[],data_main_e:[],data_sub_e:[],hightlights:[],m_s_id_map:[],s_m_id_map:[],w_l_id_map:{},l_w_id_map:{},image_map:{},label_main:"",label_sub:"",selected_manifests:[],mirador_path:"",direction:"vertical",layout:"2x2"}},mounted:function(){var t=this;window.addEventListener("resize",this.handleResize),null==this.$route.query.u&&"localhost"!=location.hostname&&(location.href="https://github.com/TEI-EAJ/parallel_text_viewer/");var e=this.$route.query.u;v.a.get(e).then((function(e){var a=e.data;t.return_url=a.return_url,t.return_label=a.return_label,t.url_main=a.url_main,t.label_main=a.label_main,t.label_sub=a.label_sub;var i=a.query_main,n=a.query_sub;t.direction=a.direction,a.layout&&(t.layout=a.layout);var r=a.image_map;v.a.get(r).then((function(e){for(var r=[],s=e.data,l=[],o={},c=s["selections"],u=0;u<c.length;u++){var d=c[u],_=d.within,m=_.label,h=_["@id"];o[m]={manifest:h,data:{}},r.push({manifest:h}),t.selected_manifests.push({label:m,selected:!0});for(var v=d.members,f=0;f<v.length;f++){var g=v[f];if(g.line_id){var b=g.line_id;b=t.convert_uri(b),l[b]||l.push(b),o[m].data[b]=g["@id"]}}}t.image_map=o,t.mirador_path=p+"?params="+encodeURIComponent(JSON.stringify(r))+"&annotationState=on&layout="+t.layout,t.exec2map(a.url_map),t.exec2main(a.url_main,l,i),t.exec2sub(a.url_sub,n)}))}))},watch:{$route:function(){this.search()}},methods:{clickIcon:function(t){for(var e=this.selected_manifests,a=[],i=0;i<e.length;i++){var n=e[i];if(n.selected){var r=n.label,s=this.image_map[r].data;s[t]&&a.push({manifest:this.image_map[r].manifest,canvas:s[t]}),this.mirador_path=p+"?params="+encodeURIComponent(JSON.stringify(a))+"&annotationState=on&layout="+this.layout}}},scroll:function(t){var e=[],a="";if(this.m_s_id_map[this.w_l_id_map[t]]?(e=this.m_s_id_map[this.w_l_id_map[t]],a="sub"):this.l_w_id_map[this.s_m_id_map[t][0]]&&(e=this.l_w_id_map[this.s_m_id_map[t][0]],a="main"),e.length>0){var i=e[0];"vertical"==this.direction?this.$SmoothScroll(document.querySelector("#"+i).getBoundingClientRect().left+document.querySelector("#"+a).scrollLeft-document.querySelector("#"+a).getBoundingClientRect().left-document.querySelector("#"+a).getBoundingClientRect().width/2+document.querySelector("#"+i).getBoundingClientRect().width,.1,null,document.querySelector("#"+a),"x"):this.$SmoothScroll(document.querySelector("#"+i).getBoundingClientRect().top+document.querySelector("#"+a).scrollTop-document.querySelector("#"+a).getBoundingClientRect().top,.1,null,document.querySelector("#"+a),"y")}},mouseover_main:function(t){if(t.target.attributes.length>0&&"id"==t.target.attributes[0].name){var e=t.target.attributes[0].value,a=this.w_l_id_map[e],i=[];if(this.m_s_id_map[a]){var n=this.m_s_id_map[a];i=n;for(var r=0;r<n.length;r++)for(var s=n[r],l=this.s_m_id_map[s],o=0;o<l.length;o++){var c=l[o],u=this.l_w_id_map[c];i=i.concat(u)}}this.hightlights=i}},mouseover:function(t){if(t.target.attributes.length>0&&"id"==t.target.attributes[0].name){var e=t.target.attributes[0].value,a=[e];if(this.s_m_id_map[e])for(var i=this.s_m_id_map[e],n=0;n<i.length;n++){var r=i[n],s=this.l_w_id_map[r];a=a.concat(s)}this.hightlights=a}},handleResize:function(){this.width=window.innerWidth,this.height=window.innerHeight},exec2map:function(t){var e=this;v.a.get(t).then((function(t){var a=t.data;for(var i in a){for(var n=a[i],r=[],s=0;s<n.length;s++){var l=n[s],o=e.convert_uri(l);r.push(o)}a[i]=r}var c={};for(var u in a)for(var d=a[u],_=0;_<d.length;_++){var m=d[_];c[m]||(c[m]=[]),c[m].push(u)}e.m_s_id_map=c,e.s_m_id_map=a;var h={},v={};for(var p in c){var f=p.split("#"),g=f[0],b=f[1].split(":"),y=Number(b[0]),w=Number(b[1]);v[p]=[];for(var x=y;x<w;x++){var C=g+"-"+x;h[C]=p,v[p].push(C)}}e.w_l_id_map=h,e.l_w_id_map=v}))},exec2main:function(t,e,a){var i=this;v.a.get(t,{responseType:"document"}).then((function(t){for(var n=t.data,r=n.querySelectorAll(a),s=[],l=0;l<r.length;l++){var o=r[l],c=o.attributes[0].value;c=i.convert_uri(c);for(var u=o.childNodes,d="",_=[],m=0;m<u.length;m++){var h=u[m],v=h.innerText||h.textContent;d+=v.trim()}for(var p=0;p<d.length;p++){var f=d.slice(p,p+1);_.push({value:f,id:c+"-"+p})}var g={id:c,words:_};-1!=e.indexOf(c)?g["manifest"]=!0:-1!=o.attributes[0].value.indexOf("-01")&&(g["manifest"]=!0),s.push(g),i.data_main_e=s}}))},exec2sub:function(t,e){var a=this;v.a.get(t,{responseType:"document"}).then((function(t){for(var i=t.data,n=i.querySelectorAll(e),r=[],s=0;s<n.length;s++){for(var l=n[s],o=l.attributes[0].value,c=l.childNodes,u="",d=0;d<c.length;d++){var _=c[d],m=_.innerText||_.textContent;u+=m.trim()}var h={id:o,value:u};r.push(h)}a.data_sub=r}))},convert_uri:function(t){var e=t.split("#");return 2!=e.length?"id-"+g(t):"id-"+g(e[0])+"#"+e[1]}},beforeDestroy:function(){window.removeEventListener("resize",this.handleResize)}},y=b,w=(a("8fc1"),a("6544")),x=a.n(w),C=a("7496"),S=a("8336"),k=a("b0af"),q=a("99d9"),V=a("a75b"),T=a("169a"),I=a("132d"),O=a("da13"),R=a("2fa4"),$=a("b73d"),j=a("8654"),B=a("71d9"),P=a("2a7f"),z=Object(s["a"])(y,d,_,!1,null,null,null),E=z.exports;x()(z,{VApp:C["a"],VBtn:S["a"],VCard:k["a"],VCardActions:q["a"],VCardText:q["b"],VCardTitle:q["c"],VContent:V["a"],VDialog:T["a"],VIcon:I["a"],VListItem:O["a"],VSpacer:R["a"],VSwitch:$["a"],VTextField:j["a"],VToolbar:B["a"],VToolbarItems:P["a"],VToolbarTitle:P["b"]});var N=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-content",[a("v-toolbar",{attrs:{dark:!0,flat:""}},[a("v-toolbar-title",[t._v("Parallel Text Viewer with TEI & IIIF")]),a("v-spacer"),a("v-btn",{attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.dialog_settings=!0}}},[a("v-icon",[t._v("mdi-settings")])],1),a("v-btn",{attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.dialog_information=!0}}},[a("v-icon",[t._v("mdi-information")])],1),a("v-toolbar-items",{directives:[{name:"show",rawName:"v-show",value:t.return_url,expression:"return_url"}]},[a("v-btn",{attrs:{text:"",href:t.return_url}},[t._v(t._s(t.return_label))])],1)],1),a("div",{style:"height: "+t.height+"px;"},[a("splitpanes",{staticClass:"default-theme"},[a("pane",{attrs:{"min-size":"20"}},[a("iframe",{staticClass:"py-2 px-2",staticStyle:{border:"none"},attrs:{src:t.mirador_path,seamless:"seamless",width:"100%",height:t.height+"px",allow:"fullscreen"}})]),a("pane",[a("splitpanes",{staticClass:"default-theme",attrs:{horizontal:"horizontal"}},[a("pane",{staticClass:"py-2 mx-2"},[a("v-card",{staticClass:"scroll vertical",attrs:{flat:!0,id:"main"}},[a("v-card-text",{staticClass:"mx-2 text--primary"},[a("h2",{staticClass:"text--primary"},[t._v(t._s(t.label_main))]),a("br"),t._l(t.data_main_e,(function(e,i){return a("p",{key:i},[e.manifest?a("span",[a("img",{staticClass:"mr-2",staticStyle:{width:"30px"},attrs:{src:"https://iiif.dl.itc.u-tokyo.ac.jp/images/iiif.png"},on:{click:function(a){return t.clickIcon(e.id)}}}),a("br")]):t._e(),t._l(e.words,(function(e,i){return a("span",{key:i,style:-1!=t.hightlights.indexOf(e.id)?"background-color : yellow;":null,attrs:{id:e.id},on:{mouseover:t.mouseover_main,click:function(a){return t.scroll(e.id)}}},[t._v(t._s(e.value))])}))],2)}))],2)],1)],1),a("pane",{staticClass:"py-2 mx-2"},[a("v-card",{staticClass:"scroll vertical",attrs:{flat:!0,id:"sub"}},[a("v-list-item",[a("v-card-text",{staticClass:"mx-2 text--primary"},[a("h2",{staticClass:"text--primary"},[t._v(t._s(t.label_sub))]),a("br"),t._l(t.data_sub,(function(e,i){return a("p",{key:i},[a("span",{style:-1!=t.hightlights.indexOf(e.id)?"background-color : yellow;":null,attrs:{id:e.id},on:{mouseover:t.mouseover,click:function(a){return t.scroll(e.id)}}},[t._v(t._s(e.value))])])}))],2)],1)],1)],1)],1)],1)],1)],1)],1),a("v-dialog",{attrs:{width:"600px"},model:{value:t.dialog_information,callback:function(e){t.dialog_information=e},expression:"dialog_information"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[t._v("Information")]),a("v-card-text",{staticClass:"mt-5"},[a("a",{attrs:{target:"_blank",href:this.$route.query.u}},[t._v(t._s(this.$route.query.u))])]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"secondary"},on:{click:function(e){t.dialog_information=!1}}},[t._v("閉じる")])],1)],1)],1),a("v-dialog",{attrs:{width:"600px"},model:{value:t.dialog_settings,callback:function(e){t.dialog_settings=e},expression:"dialog_settings"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[t._v("Settings")]),a("v-card-text",{staticClass:"mt-5"},[a("v-text-field",{staticClass:"mb-5",attrs:{label:"Mirador表示レイアウト Ex. 1x1, 2x2, ..."},model:{value:t.layout,callback:function(e){t.layout=e},expression:"layout"}}),t._l(t.selected_manifests,(function(e,i){return a("v-switch",{key:i,attrs:{label:e.label},model:{value:e.selected,callback:function(a){t.$set(e,"selected",a)},expression:"obj.selected"}})}))],2),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"secondary"},on:{click:function(e){t.dialog_settings=!1}}},[t._v("閉じる")])],1)],1)],1)],1)},A=[],J=a("1c46");function L(t){var e=J.createHash("md5");return e.update(t,"binary").digest("hex")}var H={components:{Splitpanes:m["Splitpanes"],Pane:m["Pane"]},data:function(){return{width:window.innerWidth,height:window.innerHeight,return_url:null,return_label:null,dialog_information:!1,dialog_settings:!1,url_main:"",url_sub:"",test:"",data_main:[],data_sub:[],data_main_e:[],data_sub_e:[],hightlights:[],m_s_id_map:[],s_m_id_map:[],w_l_id_map:{},l_w_id_map:{},image_map:{},label_main:"",label_sub:"",selected_manifests:[],mirador_path:"",direction:"vertical",layout:"2x2"}},mounted:function(){var t=this;window.addEventListener("resize",this.handleResize),null==this.$route.query.u&&"localhost"!=location.hostname&&(location.href="https://github.com/TEI-EAJ/parallel_text_viewer/");var e=this.$route.query.u;v.a.get(e).then((function(e){var a=e.data;t.return_url=a.return_url,t.return_label=a.return_label,t.url_main=a.url_main,t.label_main=a.label_main,t.label_sub=a.label_sub;var i=a.query_main,n=a.query_sub;t.direction=a.direction,a.layout&&(t.layout=a.layout);var r=a.image_map;v.a.get(r).then((function(e){for(var r=[],s=e.data,l=[],o={},c=s["selections"],u=0;u<c.length;u++){var d=c[u],_=d.within,m=_.label,h=_["@id"];o[m]={manifest:h,data:{}},r.push({manifest:h}),t.selected_manifests.push({label:m,selected:!0});for(var v=d.members,p=0;p<v.length;p++){var f=v[p];if(f.line_id){var g=f.line_id;g=t.convert_uri(g),l[g]||l.push(g),o[m].data[g]=f["@id"]}}}t.image_map=o;var b={},y=[];b.windows=y;for(var w=0;w<r.length;w++)y.push({manifestId:r[w].manifest});t.mirador_path="https://mirador.cultural.jp/?config="+encodeURIComponent(JSON.stringify(b)),t.exec2map(a.url_map),t.exec2main(a.url_main,l,i),t.exec2sub(a.url_sub,n)}))}))},watch:{$route:function(){this.search()}},methods:{clickIcon:function(t){for(var e=this.selected_manifests,a=[],i=0;i<e.length;i++){var n=e[i];if(n.selected){var r=n.label,s=this.image_map[r].data;s[t]&&a.push({manifest:this.image_map[r].manifest,canvas:s[t]});var l={displayAllAnnotations:!0,window:{sideBarOpenByDefault:!0,defaultSideBarPanel:"annotations"}},o=[];l.windows=o;for(var c=0;c<a.length;c++)o.push({manifestId:a[c].manifest,canvasId:a[c].canvas,view:"single"});this.mirador_path="https://mirador.cultural.jp/?config="+encodeURIComponent(JSON.stringify(l))}}},scroll:function(t){var e=[],a="";if(this.m_s_id_map[this.w_l_id_map[t]]?(e=this.m_s_id_map[this.w_l_id_map[t]],a="sub"):this.l_w_id_map[this.s_m_id_map[t][0]]&&(e=this.l_w_id_map[this.s_m_id_map[t][0]],a="main"),e.length>0){var i=e[0];"vertical"==this.direction?this.$SmoothScroll(document.querySelector("#"+i).getBoundingClientRect().left+document.querySelector("#"+a).scrollLeft-document.querySelector("#"+a).getBoundingClientRect().left-document.querySelector("#"+a).getBoundingClientRect().width/2+document.querySelector("#"+i).getBoundingClientRect().width,.1,null,document.querySelector("#"+a),"x"):this.$SmoothScroll(document.querySelector("#"+i).getBoundingClientRect().top+document.querySelector("#"+a).scrollTop-document.querySelector("#"+a).getBoundingClientRect().top,.1,null,document.querySelector("#"+a),"y")}},mouseover_main:function(t){if(t.target.attributes.length>0&&"id"==t.target.attributes[0].name){var e=t.target.attributes[0].value,a=this.w_l_id_map[e],i=[];if(this.m_s_id_map[a]){var n=this.m_s_id_map[a];i=n;for(var r=0;r<n.length;r++)for(var s=n[r],l=this.s_m_id_map[s],o=0;o<l.length;o++){var c=l[o],u=this.l_w_id_map[c];i=i.concat(u)}}this.hightlights=i}},mouseover:function(t){if(t.target.attributes.length>0&&"id"==t.target.attributes[0].name){var e=t.target.attributes[0].value,a=[e];if(this.s_m_id_map[e])for(var i=this.s_m_id_map[e],n=0;n<i.length;n++){var r=i[n],s=this.l_w_id_map[r];a=a.concat(s)}this.hightlights=a}},handleResize:function(){this.width=window.innerWidth,this.height=window.innerHeight},exec2map:function(t){var e=this;v.a.get(t).then((function(t){var a=t.data;for(var i in a){for(var n=a[i],r=[],s=0;s<n.length;s++){var l=n[s],o=e.convert_uri(l);r.push(o)}a[i]=r}var c={};for(var u in a)for(var d=a[u],_=0;_<d.length;_++){var m=d[_];c[m]||(c[m]=[]),c[m].push(u)}e.m_s_id_map=c,e.s_m_id_map=a;var h={},v={};for(var p in c){var f=p.split("#"),g=f[0],b=f[1].split(":"),y=Number(b[0]),w=Number(b[1]);v[p]=[];for(var x=y;x<w;x++){var C=g+"-"+x;h[C]=p,v[p].push(C)}}e.w_l_id_map=h,e.l_w_id_map=v}))},exec2main:function(t,e,a){var i=this;v.a.get(t,{responseType:"document"}).then((function(t){for(var n=t.data,r=n.querySelectorAll(a),s=[],l=0;l<r.length;l++){var o=r[l],c=o.attributes[0].value;c=i.convert_uri(c);for(var u=o.childNodes,d="",_=[],m=0;m<u.length;m++){var h=u[m],v=h.innerText||h.textContent;d+=v.trim()}for(var p=0;p<d.length;p++){var f=d.slice(p,p+1);_.push({value:f,id:c+"-"+p})}var g={id:c,words:_};-1!=e.indexOf(c)?g["manifest"]=!0:-1!=o.attributes[0].value.indexOf("-01")&&(g["manifest"]=!0),s.push(g),i.data_main_e=s}}))},exec2sub:function(t,e){var a=this;v.a.get(t,{responseType:"document"}).then((function(t){for(var i=t.data,n=i.querySelectorAll(e),r=[],s=0;s<n.length;s++){for(var l=n[s],o=l.attributes[0].value,c=l.childNodes,u="",d=0;d<c.length;d++){var _=c[d],m=_.innerText||_.textContent;u+=m.trim()}var h={id:o,value:u};r.push(h)}a.data_sub=r}))},convert_uri:function(t){var e=t.split("#");return 2!=e.length?"id-"+L(t):"id-"+L(e[0])+"#"+e[1]}},beforeDestroy:function(){window.removeEventListener("resize",this.handleResize)}},M=H,D=(a("ae10"),Object(s["a"])(M,N,A,!1,null,null,null)),F=D.exports;x()(D,{VApp:C["a"],VBtn:S["a"],VCard:k["a"],VCardActions:q["a"],VCardText:q["b"],VCardTitle:q["c"],VContent:V["a"],VDialog:T["a"],VIcon:I["a"],VListItem:O["a"],VSpacer:R["a"],VSwitch:$["a"],VTextField:j["a"],VToolbar:B["a"],VToolbarItems:P["a"],VToolbarTitle:P["b"]}),i["a"].use(u["a"]);var U=[{path:"/",name:"index",component:E},{path:"/test",name:"test",component:F}],W=new u["a"]({base:"",routes:U,scrollBehavior:function(){return{x:0,y:0}}}),G=W,K=a("f309");i["a"].use(K["a"]);var Q=new K["a"]({}),X=a("c4e8"),Y=a.n(X);i["a"].use(Y.a),i["a"].config.productionTip=!1,new i["a"]({router:G,vuetify:Q,render:function(t){return t(c)}}).$mount("#app")},"6ba2":function(t,e,a){},"8fc1":function(t,e,a){"use strict";var i=a("6ba2"),n=a.n(i);n.a},ae10:function(t,e,a){"use strict";var i=a("fb6e"),n=a.n(i);n.a},fb6e:function(t,e,a){}});
//# sourceMappingURL=app.86014e27.js.map