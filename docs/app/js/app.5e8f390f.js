(function(t){function e(e){for(var n,s,l=e[0],o=e[1],c=e[2],p=0,h=[];p<l.length;p++)s=l[p],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&h.push(r[s][0]),r[s]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n]);u&&u(e);while(h.length)h.shift()();return i.push.apply(i,c||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],n=!0,l=1;l<a.length;l++){var o=a[l];0!==r[o]&&(n=!1)}n&&(i.splice(e--,1),t=s(s.s=a[0]))}return t}var n={},r={app:0},i=[];function s(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=n,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(a,n,function(e){return t[e]}.bind(null,n));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var u=o;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var n=a("8a23"),r=a.n(n);r.a},1:function(t,e){},2:function(t,e){},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-content",[a("v-toolbar",{attrs:{dark:!0,flat:""}},[a("v-toolbar-title",[t._v("校本風異文可視化ツール")]),a("v-spacer"),a("v-btn",{attrs:{icon:"",href:"./"}},[a("v-icon",[t._v("mdi-home")])],1)],1),a("v-container",{directives:[{name:"show",rawName:"v-show",value:!t.start,expression:"!start"}],staticClass:"my-5"},[a("h2",{staticClass:"mb-5"},[t._v("校本風異文可視化ツール")]),a("p",[t._v("異文情報を含むTEI/XMLファイルを選択してください。")]),a("input",{attrs:{type:"file",id:"files",multiple:""},on:{change:t.handleFileSelect}}),a("output",{staticClass:"mt-5",attrs:{id:"list"}}),a("br"),a("br"),a("br"),a("p",{staticClass:"mt-5"},[t._v("例１：校異源氏物語")]),a("v-btn",{staticClass:"mx-2",attrs:{color:"primary",to:"/?u=01_with_wit.xml"}},[t._v("可視化例を見る")]),a("v-btn",{staticClass:"mx-2",attrs:{href:"01_with_wit.xml",target:"_blank"}},[t._v("サンプルデータを見る")]),a("br"),a("br"),a("p",{staticClass:"mt-5"},[t._v("例２：（ダミーデータ）中村式五十音")]),a("v-btn",{staticClass:"mx-2",attrs:{color:"primary",to:"/?u=https://nakamura196.github.io/tei/v-machine/data/nakamura.xml"}},[t._v("可視化例を見る")]),a("v-btn",{staticClass:"mx-2",attrs:{href:"https://nakamura196.github.io/tei/v-machine/data/nakamura.xml",target:"_blank"}},[t._v("サンプルデータを見る")]),a("br"),a("br"),a("p",{staticClass:"mt-5"},[t._v("例３：Emily Dickinson ‘Faith is a fine invention’ from "),a("a",{attrs:{href:"http://v-machine.org/samples/"}},[t._v("Versioning Machine")])]),a("v-btn",{staticClass:"mx-2",attrs:{color:"primary",to:"/?u=faith.xml"}},[t._v("可視化例を見る")]),a("v-btn",{staticClass:"mx-2",attrs:{href:"http://v-machine.org/samples/faith.xml",target:"_blank"}},[t._v("サンプルデータを見る")]),a("br"),a("br"),a("br"),a("hr"),a("br"),a("p",{staticClass:"text-center my-5"},[a("a",{attrs:{href:"https://github.com/TEI-EAJ"}},[t._v("TEI-C東アジア/日本語分科会")])])],1),a("div",{directives:[{name:"show",rawName:"v-show",value:t.start,expression:"start"}],style:"height: "+t.height+"px;"},[a("splitpanes",{staticClass:"default-theme"},[a("pane",[a("iframe",{staticClass:"py-2 px-2",staticStyle:{border:"none"},attrs:{src:t.mirador_path,seamless:"seamless",width:"100%",height:t.height+"px",allow:"fullscreen"}})]),a("pane",[a("splitpanes",{staticClass:"default-theme",attrs:{horizontal:"horizontal"}},[a("pane",{staticClass:"py-2 mx-2"},[a("v-card",{staticClass:"scroll vertical",attrs:{flat:!0,id:"main"}},[a("v-card-text",{staticClass:"mx-2 text--primary"},[a("h2",{staticClass:"text--primary"},[t._v(" 本文 "),t.target?a("span",[t._v(t._s(t.target))]):t._e()]),a("br"),t._l(t.test_arr,(function(e,n){return a("p",{key:n},t._l(e,(function(e,n){return a("span",{key:n},["zone"==e.type?[a("p",{on:{click:function(a){return t.clickIcon(e.id)}}},[a("img",{staticClass:"mr-2",staticStyle:{width:"30px"},attrs:{src:"https://iiif.dl.itc.u-tokyo.ac.jp/images/iiif.png"}})])]:t._e(),"text"==e.type?[t._v(t._s(e.text))]:t._e(),"app"==e.type?[a("span",{staticStyle:{"background-color":"yellow"},on:{click:function(a){return t.test(e.app,e.id,e.index)}}},[a("span",{staticStyle:{color:"red"}},[t._v(" "+t._s(e.index)+" ")]),null==t.target?[t._v(t._s(e.text))]:[t._l(e.app,(function(e,n){return[null!=e.attributes&&-1!=e.attributes.wit.indexOf(t.target)?a("span",{key:n},t._l(e.elements,(function(e,n){return a("span",{key:n},[t._v(t._s(e.text))])})),0):t._e()]}))]],2)]:t._e()],2)})),0)}))],2)],1)],1),a("pane",{staticClass:"py-2 mx-2"},[a("v-card",{staticClass:"scroll vertical",attrs:{flat:!0,id:"sub"}},[a("v-list-item",[a("v-card-text",{staticClass:"mx-2 text--primary"},[a("h2",{staticClass:"text--primary ml-4"},[t._v("異文")]),a("p",[a("b",{on:{click:function(e){t.target=null}}},[t._v("Witness List")]),a("v-sheet",{attrs:{color:"grey lighten-3 px-2 py-2 mx-2"}},t._l(t.witness,(function(e,n){return a("span",{key:n,staticClass:"mr-2 mb-2",on:{click:function(e){t.target=n}}},[t._v(t._s(n))])})),0)],1),a("a",{on:{click:function(e){t.test5={}}}},[t._v("Clear Panel")]),a("br"),t._l(t.test5,(function(e,n){return a("v-card",{key:n,staticClass:"mx-5"},[a("v-card-text",{staticClass:"mx-2 text--primary"},[a("span",{on:{click:function(e){return t.close_panel(n)}}},[a("i",{staticClass:"fas fa-times-circle"})]),a("span",{staticClass:"mt-2",staticStyle:{color:"red"}},[t._v(t._s(e.index))]),a("br"),t._l(e.wits,(function(e,n){return a("p",{key:n},["lem"==e.type?[t._v(t._s(e.text)+" （"+t._s(n)+"）")]:[a("b",[t._v(t._s(e.text)+" （"+t._s(n)+"）")])]],2)}))],2)],1)}))],2)],1)],1)],1)],1)],1)],1)],1)],1)],1)},i=[],s=(a("c975"),a("a15b"),a("b0c0"),a("a9e3"),a("1276"),a("512e")),l=a("bc3a"),o=a.n(l),c="mirador/",u=a("c51a"),p={components:{Splitpanes:s["Splitpanes"],Pane:s["Pane"]},data:function(){return{width:window.innerWidth,height:window.innerHeight,url_main:"",data_main:[],data_main_e:[],mirador_path:"",direction:"vertical",layout:"1x1",test_arr:[],test4:{},test5:{},witness:{},test_map:{},start:!1,xmlDoc:null,target:null}},watch:{$route:function(){this.init()},target:function(){this.list()}},mounted:function(){this.init()},methods:{list:function(){for(var t={},e=1,a=this.test_arr,n=0;n<a.length;n++)for(var r=a[n],i=0;i<r.length;i++){var s=r[i];if("app"==s.type){for(var l=s.app,o={},c=!1,u=0;u<l.length;u++){var p=l[u],h=p.elements,f="";if(p.attributes&&(f=p.attributes.wit),-1!=f.split(" ").indexOf(this.target)&&(c=!0),null!=h)for(var v=0;v<h.length;v++){var m=h[v];""!=f&&(o[f]={text:m.text,type:p.name})}}c&&(t[s.id]={index:e,wits:o}),e+=1}}this.test5=t},init:function(){window.addEventListener("resize",this.handleResize);var t=null==this.$route.query.u?null:this.$route.query.u;t&&this.exec2main(t)},conv2json:function(t){t=(new XMLSerializer).serializeToString(t);var e=u.xml2json(t,{compact:!1,spaces:4}),a=JSON.parse(e);return a=a.elements[0],a},clickIcon:function(t){var e=this.test_map[t],a=[{manifest:e.manifest,canvas:e.canvas}];this.mirador_path=c+"?params="+encodeURIComponent(JSON.stringify(a))+"&annotationState=on&layout="+this.layout},handleResize:function(){this.width=window.innerWidth,this.height=window.innerHeight},rec:function(t,e){for(var a=0;a<t.length;a++){var n=t[a];if(e.push(n),n.elements&&"app"!=n.name){var r=n.elements;e=this.rec(r,e)}}return e},handleFileSelect:function(t){for(var e=t.target.files,a=0;a<e.length;a++){var n=e[a],r=new FileReader;r.readAsText(n);var i=this;r.onload=function(){var t=new DOMParser,e=t.parseFromString(r.result,"text/xml");i.handleXml(e)}}},exec2main:function(t){var e=this;o.a.get(t,{responseType:"document"}).then((function(t){var a=t.data;e.handleXml(a)}))},handleXml:function(t){var e=t.querySelector("listWit");if(e=this.conv2json(e).elements,e.length>0){this.start=!0;for(var a=0;a<e.length;a++){var n=e[a];this.witness["#"+n.attributes["xml:id"]]=n.attributes["xml:id"]}var r=t.querySelector("surfaceGrp");if(null!=r){r=this.conv2json(r);for(var i=r.attributes.facs,s=r.elements,l=0;l<s.length;l++)for(var o=s[l].elements,u=o[0].attributes.n,p=1;p<o.length;p++){var h=o[p].attributes,f=h["xml:id"],v=Number(h["ulx"]),m=Number(h["uly"]),d=Number(h["lrx"])-v,b=Number(h["lry"])-m;this.test_map["#"+f]={manifest:i,canvas:u+"#xywh="+v+","+m+","+d+","+b}}var _=[{manifest:i}];this.mirador_path=c+"?params="+encodeURIComponent(JSON.stringify(_))+"&annotationState=on&layout="+this.layout}var x=t.querySelector("body");x=this.conv2json(x).elements;for(var y=this.rec(x,[]),g=[],w=[],C=1,k=0;k<y.length;k++){var S=y[k],O=S.name,j=S.type;if("lb"==O||"p"==O||"l"==O)g.push(w),w=[];else if("text"==j)w.push(S);else if("pb"==O)w.push({id:S.attributes.facs,type:"zone"});else if("app"==O){var T=S.elements;if("lem"==T[0].name){for(var V=[],z=0;z<T.length;z++)if(T[z].attributes)for(var P=T[z].attributes.wit.split(" "),I=0;I<P.length;I++){var N=P[I];-1==V.indexOf(N)&&V.push(N)}T[0].attributes||(T[0].attributes={});var E=[];for(var M in T[0].attributes.wit&&(E=T[0].attributes.wit.split(" ")),this.witness)-1==V.indexOf(M)&&E.push(M);T[0].attributes.wit=E.join(" ")}var J=T[0],L="";J.elements&&(L=J.elements[0].text),w.push({text:L,type:"app",app:T,id:"app_"+k,index:C}),C+=1}}g.push(w),this.test_arr=g}else this.start=!1},close_panel:function(t){var e={};for(var a in this.test5)e[a]=this.test5[a];delete e[t],this.test5=e},test:function(t,e,a){var n={};for(var r in this.test5)n[r]=this.test5[r];if(n[e])delete n[e];else{for(var i={},s=0;s<t.length;s++){var l=t[s],o=l.elements,c="";if(l.attributes&&(c=l.attributes.wit),null!=o)for(var u=0;u<o.length;u++){var p=o[u];""!=c&&(i[c]={text:p.text,type:l.name})}else""!=c&&(i[c]={text:"",type:l.name})}n[e]={index:a,wits:i}}this.test5=n}},beforeDestroy:function(){window.removeEventListener("resize",this.handleResize)}},h=p,f=(a("034f"),a("2877")),v=a("6544"),m=a.n(v),d=a("7496"),b=a("8336"),_=a("b0af"),x=a("99d9"),y=a("a523"),g=a("a75b"),w=a("132d"),C=a("da13"),k=a("8dd9"),S=a("2fa4"),O=a("71d9"),j=a("2a7f"),T=Object(f["a"])(h,r,i,!1,null,null,null),V=T.exports;m()(T,{VApp:d["a"],VBtn:b["a"],VCard:_["a"],VCardText:x["a"],VContainer:y["a"],VContent:g["a"],VIcon:w["a"],VListItem:C["a"],VSheet:k["a"],VSpacer:S["a"],VToolbar:O["a"],VToolbarTitle:j["a"]});var z=a("8c4f");n["a"].use(z["a"]);var P=[{path:"/",name:"index"}],I=new z["a"]({base:"",routes:P,scrollBehavior:function(){return{x:0,y:0}}}),N=I,E=a("f309");n["a"].use(E["a"]);var M=new E["a"]({}),J=a("c4e8"),L=a.n(J);n["a"].use(L.a),n["a"].config.productionTip=!1,new n["a"]({router:N,vuetify:M,render:function(t){return t(V)}}).$mount("#app")},"8a23":function(t,e,a){}});
//# sourceMappingURL=app.5e8f390f.js.map