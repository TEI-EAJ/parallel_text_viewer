(function(t){function e(e){for(var s,i,l=e[0],o=e[1],c=e[2],d=0,f=[];d<l.length;d++)i=l[d],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&f.push(n[i][0]),n[i]=0;for(s in o)Object.prototype.hasOwnProperty.call(o,s)&&(t[s]=o[s]);u&&u(e);while(f.length)f.shift()();return r.push.apply(r,c||[]),a()}function a(){for(var t,e=0;e<r.length;e++){for(var a=r[e],s=!0,l=1;l<a.length;l++){var o=a[l];0!==n[o]&&(s=!1)}s&&(r.splice(e--,1),t=i(i.s=a[0]))}return t}var s={},n={app:0},r=[];function i(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=s,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(a,s,function(e){return t[e]}.bind(null,s));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var u=o;r.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var s=a("8a23"),n=a.n(s);n.a},1:function(t,e){},2:function(t,e){},4678:function(t,e,a){var s={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-SG":"cdab","./en-SG.js":"cdab","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function n(t){var e=r(t);return a(e)}function r(t){if(!a.o(s,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return s[t]}n.keys=function(){return Object.keys(s)},n.resolve=r,t.exports=n,n.id="4678"},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var s,n,r,i,l=a("2b0e"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-content",[a("v-toolbar",{attrs:{dark:!0,flat:""}},[a("v-toolbar-title",[t._v("校本風異文可視化ツール")]),a("v-spacer"),a("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.start,expression:"start"}],attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.dialog_chart=!0}}},[a("i",{staticClass:"fas fa-chart-bar"})]),a("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.start,expression:"start"}],attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.dialog_table=!0}}},[a("v-icon",[t._v("mdi-table")])],1),a("v-btn",{attrs:{icon:"",href:"./"}},[a("v-icon",[t._v("mdi-home")])],1)],1),a("v-container",{directives:[{name:"show",rawName:"v-show",value:!t.start,expression:"!start"}],staticClass:"my-5"},[a("h2",{staticClass:"mb-5"},[t._v("校本風異文可視化ツール")]),a("p",[t._v("異文情報を含むTEI/XMLファイルを選択してください。")]),a("input",{attrs:{type:"file",id:"files",multiple:""},on:{change:t.handleFileSelect}}),a("output",{staticClass:"mt-5",attrs:{id:"list"}}),a("br"),a("br"),a("br"),a("p",{staticClass:"mt-5"},[t._v("例１：校異源氏物語")]),a("v-btn",{staticClass:"mx-2 my-1",attrs:{color:"primary",to:"/?u=01_with_wit.xml"}},[t._v("可視化例を見る")]),a("v-btn",{staticClass:"mx-2 my-1",attrs:{href:"01_with_wit.xml",target:"_blank"}},[t._v("サンプルデータを見る")]),a("br"),a("br"),a("p",{staticClass:"mt-5"},[t._v("例２：（ダミーデータ）中村式五十音")]),a("v-btn",{staticClass:"mx-2 my-1",attrs:{color:"primary",to:"/?u=https://nakamura196.github.io/tei/v-machine/data/nakamura.xml"}},[t._v("可視化例を見る")]),a("v-btn",{staticClass:"mx-2 my-1",attrs:{href:"https://nakamura196.github.io/tei/v-machine/data/nakamura.xml",target:"_blank"}},[t._v("サンプルデータを見る")]),a("br"),a("br"),a("p",{staticClass:"mt-5"},[t._v(" 例３：Emily Dickinson ‘Faith is a fine invention’ from "),a("a",{attrs:{href:"http://v-machine.org/samples/"}},[t._v("Versioning Machine")])]),a("v-btn",{staticClass:"mx-2 my-1",attrs:{color:"primary",to:"/?u=faith.xml"}},[t._v("可視化例を見る")]),a("v-btn",{staticClass:"mx-2 my-1",attrs:{href:"http://v-machine.org/samples/faith.xml",target:"_blank"}},[t._v("サンプルデータを見る")]),a("br"),a("br"),a("br"),a("hr"),a("br"),a("p",{staticClass:"text-center my-5"},[a("a",{attrs:{href:"https://github.com/TEI-EAJ"}},[t._v("TEI-C東アジア/日本語分科会")])])],1),a("div",{directives:[{name:"show",rawName:"v-show",value:t.start,expression:"start"}],style:"height: "+t.height+"px;"},[a("splitpanes",{staticClass:"default-theme"},[a("pane",[a("iframe",{staticClass:"py-2 px-2",staticStyle:{border:"none"},attrs:{src:t.mirador_path,seamless:"seamless",width:"100%",height:t.height+"px",allow:"fullscreen"}})]),a("pane",[a("splitpanes",{staticClass:"default-theme",attrs:{horizontal:"horizontal"}},[a("pane",{staticClass:"py-2 mx-2"},[a("v-card",{staticClass:"scroll vertical",attrs:{flat:!0,id:"main"}},[a("v-card-text",{staticClass:"mx-2 text--primary"},[a("h2",{staticClass:"text--primary"},[t._v(" 本文 "),t.target?a("span",[t._v(t._s(t.target))]):t._e()]),a("br"),t._l(t.test_arr,(function(e,s){return a("p",{key:s},t._l(e,(function(e,s){return a("span",{key:s},["zone"==e.type?[a("p",{on:{click:function(a){return t.clickIcon(e.id)}}},[a("img",{staticClass:"mr-2",staticStyle:{width:"30px"},attrs:{src:"https://iiif.dl.itc.u-tokyo.ac.jp/images/iiif.png"}})])]:t._e(),"text"==e.type?[a("span",[t._v(t._s(e.text.trim()))])]:t._e(),"app"==e.type?[a("span",{staticStyle:{"background-color":"#FFFF99"},on:{click:function(a){return t.test(e.app,e.id,e.index)}}},[a("v-tooltip",{attrs:{right:""},scopedSlots:t._u([{key:"activator",fn:function(s){var n=s.on;return[null==t.target?[a("span",t._g({on:{mouseenter:function(a){t.selected_id=e.id,t.scroll(e.id)}}},n),[t._v(t._s(e.text.trim()))])]:[a("span",t._g({on:{mouseenter:function(a){t.selected_id=e.id,t.scroll(e.id)}}},n),[t._l(e.app,(function(e,s){return[-1!=e.attributes.wit.indexOf(t.target)?a("span",{key:s},[t._v(t._s(""!=e.text&&null!=e.text?e.text:" * "))]):t._e()]}))],2)]]}}],null,!0)},[a("span",[t._v(t._s(e.index))])])],1)]:t._e()],2)})),0)}))],2)],1)],1),a("pane",{staticClass:"py-2 mx-2"},[a("v-card",{staticClass:"scroll vertical",attrs:{flat:!0,id:"sub"}},[a("v-list-item",[a("v-card-text",{staticClass:"mx-2 text--primary"},[a("h2",{staticClass:"text--primary ml-4"},[t._v("異文")]),a("p",[a("b",{on:{click:function(e){t.target=null}}},[t._v("Witness List")]),a("v-sheet",{attrs:{color:"grey lighten-3 px-2 py-2 mx-2"}},t._l(t.witness,(function(e,s){return a("span",{key:s,staticClass:"mr-2 mb-2",on:{click:function(e){t.target=s}}},[t._v(t._s(s))])})),0)],1),a("a",{on:{click:function(e){t.test5={}}}},[t._v("Clear Panel")]),a("br"),t._l(t.test5,(function(e,s){return a("v-card",{key:s,staticClass:"mx-5",style:s==t.selected_id?"background-color : #FFFF99;":"",attrs:{id:s}},[a("v-card-text",{staticClass:"mx-2 text--primary"},[a("span",{on:{click:function(e){return t.close_panel(s)}}},[a("i",{staticClass:"fas fa-times-circle"})]),a("span",{staticClass:"mt-2",staticStyle:{color:"red"}},[t._v(t._s(e.index))]),a("br"),t._l(e.wits,(function(e,s){return a("p",{key:s},["lem"==e.type?[t._v(t._s(e.text)+" （"+t._s(s)+"）")]:[a("b",[t._v(t._s(e.text)+" （"+t._s(s)+"）")])]],2)}))],2)],1)}))],2)],1)],1)],1)],1)],1)],1)],1),a("v-dialog",{attrs:{width:"90%"},model:{value:t.dialog_chart,callback:function(e){t.dialog_chart=e},expression:"dialog_chart"}},[a("v-card",[a("v-card-text",[a("br"),a("h3",{staticClass:"mt-5"},[t._v("底本との編集距離")]),a("chart",{staticClass:"mb-4",attrs:{height:300,data:t.test6,witness:t.witness}}),a("br"),a("h3",{staticClass:"mt-5"},[t._v("異文番号毎の異なり数")]),a("Chart4Diff",{staticClass:"mb-4",attrs:{height:300,data:t.test6}})],1)],1)],1),a("v-dialog",{attrs:{width:"600px"},model:{value:t.dialog_table,callback:function(e){t.dialog_table=e},expression:"dialog_table"}},[a("v-container",t._l(t.test6,(function(e,s){return a("div",{key:s,staticClass:"my-5"},[a("v-card",[a("v-card-text",[a("v-simple-table",{scopedSlots:t._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[t._v("Witness")]),a("th",{staticClass:"text-left"},[t._v("異文番号")]),a("th",{staticClass:"text-left"},[t._v("相違点")])])]),a("tbody",t._l(e.wits,(function(s,n){return a("tr",{key:n},[a("td",{attrs:{width:"40%"}},[t._v(t._s(n))]),a("td",{attrs:{width:"20%"}},[t._v(t._s(e.index))]),a("td",{attrs:{width:"40%"}},[t._v(t._s(s.text))])])})),0)]},proxy:!0}],null,!0)})],1)],1)],1)})),0)],1)],1)],1)},c=[],u=(a("c975"),a("a15b"),a("b0c0"),a("a9e3"),a("1276"),a("512e")),d=a("bc3a"),f=a.n(d),h=a("1fca"),p={extends:h["a"],name:"chart",props:["data","witness"],watch:{data:function(){this.init()},witness:function(){this.init()}},methods:{init:function(){var t={};for(var e in this.witness)t[e]=0;for(var a in this.data){var s=this.data[a].wits,n=!1,r="";for(var i in s){var l=i.split(" ");if(n){var o=s[i].text;null==o&&(o="");for(var c=this.levenshtein(r,o),u=0;u<l.length;u++){var d=l[u];t[d]+=c}}else r=s[i].text;n=!0}}var f=[],h=[];for(var p in t)f.push(p),h.push(t[p]);var v={labels:f,datasets:[{label:"編集距離",data:h,borderWidth:1}]},b={responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{scaleLabel:{display:!0,labelString:"Witness"}}],yAxes:[{ticks:{beginAtZero:!0}}]}};this.renderChart(v,b)},levenshtein:function(t,e){if(t==e)return 0;var a=t.length,s=e.length;if(0===a)return s;if(0===s)return a;var n=!1;try{n=!"0"[0]}catch(b){n=!0}n&&(t=t.split(""),e=e.split(""));var r=new Array(a+1),i=new Array(a+1),l=0,o=0,c=0;for(l=0;l<a+1;l++)r[l]=l;var u="",d="";for(o=1;o<=s;o++){for(i[0]=o,d=e[o-1],l=0;l<a;l++){u=t[l],c=u==d?0:1;var f=r[l+1]+1,h=i[l]+1,p=r[l]+c;h<f&&(f=h),p<f&&(f=p),i[l+1]=f}var v=r;r=i,i=v}return r[a]}},mounted:function(){this.init()}},v=p,b=a("2877"),m=Object(b["a"])(v,s,n,!1,null,null,null),j=m.exports,y=(a("b64b"),{extends:h["a"],name:"chart",props:["data"],watch:{data:function(){this.init()}},methods:{init:function(){var t=[],e=[];for(var a in this.data){var s=this.data[a],n=s.wits,r=Object.keys(n).length;t.push(s.index),e.push(r)}var i={labels:t,datasets:[{label:"異なり数",data:e,borderWidth:1}]},l={responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{scaleLabel:{display:!0,labelString:"異文番号"}}],yAxes:[{ticks:{beginAtZero:!0}}]}};this.renderChart(i,l)}},mounted:function(){this.init()}}),g=y,x=Object(b["a"])(g,r,i,!1,null,null,null),_=x.exports,w="mirador/",k=a("c51a"),C={components:{Splitpanes:u["Splitpanes"],Pane:u["Pane"],Chart:j,Chart4Diff:_},data:function(){return{width:window.innerWidth,height:window.innerHeight,url_main:"",data_main:[],data_main_e:[],mirador_path:"",direction:"vertical",layout:"1x1",test_arr:[],test4:{},test5:{},witness:{},test_map:{},start:!1,xmlDoc:null,target:null,test6:{},dialog_table:!1,dialog_chart:!1,selected_id:""}},watch:{$route:function(){this.init()},target:function(){this.list()}},mounted:function(){this.init()},methods:{list:function(){for(var t={},e=1,a=this.test_arr,s=0;s<a.length;s++)for(var n=a[s],r=0;r<n.length;r++){var i=n[r];if("app"==i.type){for(var l=i.app,o={},c=!1,u=0;u<l.length;u++){var d=l[u],f=d.elements,h="";if(d.attributes&&(h=d.attributes.wit),-1!=h.split(" ").indexOf(this.target)&&(c=!0),null!=f)for(var p=0;p<f.length;p++){var v=f[p];""!=h&&(o[h]={text:v.text,type:d.name})}}c&&(t[i.id]={index:e,wits:o}),e+=1}}this.test5=t},scroll:function(t){var e="sub";"vertical"==this.direction?this.$SmoothScroll(document.querySelector("#"+t).getBoundingClientRect().left+document.querySelector("#"+e).scrollLeft-document.querySelector("#"+e).getBoundingClientRect().left-document.querySelector("#"+e).getBoundingClientRect().width/2+document.querySelector("#"+t).getBoundingClientRect().width,.1,null,document.querySelector("#"+e),"x"):this.$SmoothScroll(document.querySelector("#"+t).getBoundingClientRect().top+document.querySelector("#"+e).scrollTop-document.querySelector("#"+e).getBoundingClientRect().top,.1,null,document.querySelector("#"+e),"y")},init:function(){window.addEventListener("resize",this.handleResize);var t=null==this.$route.query.u?null:this.$route.query.u;t&&this.exec2main(t)},conv2json:function(t){t=(new XMLSerializer).serializeToString(t);var e=k.xml2json(t,{compact:!1,spaces:4}),a=JSON.parse(e);return a=a.elements[0],a},clickIcon:function(t){var e=this.test_map[t],a=[{manifest:e.manifest,canvas:e.canvas}];this.mirador_path=w+"?params="+encodeURIComponent(JSON.stringify(a))+"&annotationState=on&layout="+this.layout},handleResize:function(){this.width=window.innerWidth,this.height=window.innerHeight},rec:function(t,e){for(var a=0;a<t.length;a++){var s=t[a];if(e.push(s),s.elements&&"app"!=s.name){var n=s.elements;e=this.rec(n,e)}}return e},handleFileSelect:function(t){for(var e=t.target.files,a=0;a<e.length;a++){var s=e[a],n=new FileReader;n.readAsText(s);var r=this;n.onload=function(){var t=new DOMParser,e=t.parseFromString(n.result,"text/xml");r.handleXml(e)}}},exec2main:function(t){var e=this;f.a.get(t,{responseType:"document"}).then((function(t){var a=t.data;e.handleXml(a)}))},handleXml:function(t){var e=t.querySelector("listWit");if(e=this.conv2json(e).elements,e.length>0){this.start=!0;for(var a=0;a<e.length;a++){var s=e[a];this.witness["#"+s.attributes["xml:id"]]=s.attributes["xml:id"]}var n=t.querySelector("surfaceGrp");if(null!=n){n=this.conv2json(n);for(var r=n.attributes.facs,i=n.elements,l=0;l<i.length;l++)for(var o=i[l].elements,c=o[0].attributes.n,u=1;u<o.length;u++){var d=o[u].attributes,f=d["xml:id"],h=Number(d["ulx"]),p=Number(d["uly"]),v=Number(d["lrx"])-h,b=Number(d["lry"])-p;this.test_map["#"+f]={manifest:r,canvas:c+"#xywh="+h+","+p+","+v+","+b}}var m=[{manifest:r}];this.mirador_path=w+"?params="+encodeURIComponent(JSON.stringify(m))+"&annotationState=on&layout="+this.layout}var j=t.querySelector("body");j=this.conv2json(j).elements;for(var y=this.rec(j,[]),g=[],x=[],_=1,k=0;k<y.length;k++){var C=y[k],S=C.name,z=C.type;if("lb"==S||"p"==S||"l"==S)g.push(x),x=[];else if("text"==z)x.push(C);else if("pb"==S)x.push({id:C.attributes.facs,type:"zone"});else if("app"==S){var O=C.elements;if("lem"==O[0].name){for(var q=[],T=0;T<O.length;T++)if(O[T].attributes)for(var V=O[T].attributes.wit.split(" "),F=0;F<V.length;F++){var R=V[F];-1==q.indexOf(R)&&q.push(R)}O[0].attributes||(O[0].attributes={});var A=[];for(var N in O[0].attributes.wit&&(A=O[0].attributes.wit.split(" ")),this.witness)-1==q.indexOf(N)&&A.push(N);O[0].attributes.wit=A.join(" ")}var P=O[0],E="";P.elements&&(E=P.elements[0].text);for(var L=0;L<O.length;L++){var D="";O[L].elements&&null!=O[L].elements[0].text&&(D+=O[L].elements[0].text),O[L].text=D}x.push({text:E,type:"app",app:O,id:"app_"+k,index:_}),_+=1}}g.push(x),_=1;for(var I=g,M={},B=0;B<I.length;B++)for(var W=I[B],$=0;$<W.length;$++){var J=W[$];if("app"==J.type){for(var X=J.app,U={},G=!0,H=0;H<X.length;H++){var Z=X[H],K="";Z.attributes&&(K=Z.attributes.wit),""!=K&&(U[K]={text:Z.text,type:Z.name})}G&&(M[J.id]={index:_,wits:U}),_+=1}}this.test6=M,this.test_arr=g}else this.start=!1},close_panel:function(t){var e={};for(var a in this.test5)e[a]=this.test5[a];delete e[t],this.test5=e},test:function(t,e,a){var s={};for(var n in this.test5)s[n]=this.test5[n];if(s[e])delete s[e];else{for(var r={},i=0;i<t.length;i++){var l=t[i],o=l.elements,c="";if(l.attributes&&(c=l.attributes.wit),null!=o)for(var u=0;u<o.length;u++){var d=o[u];""!=c&&(r[c]={text:d.text,type:l.name})}else""!=c&&(r[c]={text:"",type:l.name})}s[e]={index:a,wits:r}}this.test5=s}},beforeDestroy:function(){window.removeEventListener("resize",this.handleResize)}},S=C,z=(a("034f"),a("6544")),O=a.n(z),q=a("7496"),T=a("8336"),V=a("b0af"),F=a("99d9"),R=a("a523"),A=a("a75b"),N=a("169a"),P=a("132d"),E=a("da13"),L=a("8dd9"),D=a("1f4f"),I=a("2fa4"),M=a("71d9"),B=a("2a7f"),W=a("3a2f"),$=Object(b["a"])(S,o,c,!1,null,null,null),J=$.exports;O()($,{VApp:q["a"],VBtn:T["a"],VCard:V["a"],VCardText:F["a"],VContainer:R["a"],VContent:A["a"],VDialog:N["a"],VIcon:P["a"],VListItem:E["a"],VSheet:L["a"],VSimpleTable:D["a"],VSpacer:I["a"],VToolbar:M["a"],VToolbarTitle:B["a"],VTooltip:W["a"]});var X=a("8c4f");l["a"].use(X["a"]);var U=[{path:"/",name:"index"}],G=new X["a"]({base:"",routes:U,scrollBehavior:function(){return{x:0,y:0}}}),H=G,Z=a("f309");l["a"].use(Z["a"]);var K=new Z["a"]({}),Q=a("c4e8"),Y=a.n(Q);l["a"].use(Y.a),l["a"].config.productionTip=!1,new l["a"]({router:H,vuetify:K,render:function(t){return t(J)}}).$mount("#app")},"8a23":function(t,e,a){}});
//# sourceMappingURL=app.be63fcae.js.map