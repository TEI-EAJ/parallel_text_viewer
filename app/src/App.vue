<template>
  <v-app>
    <v-content>
      <v-toolbar :dark="true" flat>
        <v-toolbar-title>校本風異文可視化ツール</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="dialog_table = true" v-show="start">
          <v-icon>mdi-table</v-icon>
        </v-btn>
        <v-btn icon href="./">
          <v-icon>mdi-home</v-icon>
        </v-btn>
        
      </v-toolbar>

      <v-container class="my-5" v-show="!start">
        <h2 class="mb-5">校本風異文可視化ツール</h2>
        <p>異文情報を含むTEI/XMLファイルを選択してください。</p>
        <input type="file" id="files" @change="handleFileSelect" multiple />

        <output id="list" class="mt-5"></output>

        <br />
        <br />
        <br />

        <p class="mt-5">例１：校異源氏物語</p>

        <v-btn color="primary" to="/?u=01_with_wit.xml" class="mx-2">可視化例を見る</v-btn>
        <v-btn href="01_with_wit.xml" target="_blank" class="mx-2">サンプルデータを見る</v-btn>

        <br />
        <br />

        <p class="mt-5">例２：（ダミーデータ）中村式五十音</p>

        <v-btn
          color="primary"
          to="/?u=https://nakamura196.github.io/tei/v-machine/data/nakamura.xml"
          class="mx-2"
        >可視化例を見る</v-btn>
        <v-btn
          href="https://nakamura196.github.io/tei/v-machine/data/nakamura.xml"
          target="_blank"
          class="mx-2"
        >サンプルデータを見る</v-btn>

        <br />
        <br />

        <p class="mt-5">例３：Emily Dickinson ‘Faith is a fine invention’ from <a href="http://v-machine.org/samples/">Versioning Machine</a></p>

        <v-btn
          color="primary"
          to="/?u=faith.xml"
          class="mx-2"
        >可視化例を見る</v-btn>
        <v-btn
          href="http://v-machine.org/samples/faith.xml"
          target="_blank"
          class="mx-2"
        >サンプルデータを見る</v-btn>

        <br />
        <br />
        <br />

        <hr />

        <br />

        <p class="text-center my-5">
          <a href="https://github.com/TEI-EAJ">TEI-C東アジア/日本語分科会</a>
        </p>
      </v-container>

      <div :style="'height: '+height+'px;'" v-show="start">
        <splitpanes class="default-theme">
          <pane>
            <iframe
              class="py-2 px-2"
              :src="mirador_path"
              seamless="seamless"
              width="100%"
              :height="height+'px'"
              style="border: none;"
              allow="fullscreen"
            ></iframe>
          </pane>
          <pane>
            <splitpanes class="default-theme" horizontal="horizontal">
              <pane class="py-2 mx-2">
                <v-card class="scroll vertical" :flat="true" id="main">
                  <v-card-text class="mx-2 text--primary">
                    <h2 class="text--primary">
                      本文
                      <span v-if="target">{{target}}</span>
                    </h2>

                    <br />

                    <p v-for="(test_arr2, index) in test_arr" :key="index">
                      <span v-for="(element, index2) in test_arr2" :key="index2">
                        <template v-if="element.type == 'zone'">
                          <p @click="clickIcon(element.id)">
                            <img
                              src="https://iiif.dl.itc.u-tokyo.ac.jp/images/iiif.png"
                              style="width: 30px"
                              class="mr-2"
                            />
                          </p>
                        </template>
                        <template v-if="element.type == 'text'">{{element.text}}</template>
                        <template v-if="element.type == 'app'">
                          <span
                            style="background-color : yellow;"
                            @click="test(element.app, element.id, element.index)"
                          >
                            <span style="color: red;">&nbsp;{{element.index}}&nbsp;</span>
                            <template v-if="target == null">{{element.text}}</template>
                            <template v-else>
                              <template v-for="(app, index2) in element.app">
                                <span
                                  v-if="app.attributes != null && app.attributes.wit.indexOf(target) != -1"
                                  :key="index2"
                                >
                                  <span v-for="(e, index3) in app.elements" :key="index3">{{e.text}}</span>
                                </span>
                              </template>
                            </template>
                          </span>
                        </template>
                      </span>
                    </p>
                  </v-card-text>
                </v-card>
              </pane>
              <pane class="py-2 mx-2">
                <v-card class="scroll vertical" :flat="true" id="sub">
                  <v-list-item>
                    <v-card-text class="mx-2 text--primary">
                      <h2 class="text--primary ml-4">異文</h2>
                      <p>
                        <b @click="target=null">Witness List</b>
                        <v-sheet color="grey lighten-3 px-2 py-2 mx-2">
                          <span
                            @click="target=index"
                            class="mr-2 mb-2"
                            v-for="(obj, index) in witness"
                            :key="index"
                          >{{index}}</span>
                        </v-sheet>
                      </p>

                      <a @click="test5 = {}">Clear Panel</a>
                      <br />

                      <v-card v-for="(test4, index2) in test5" :key="index2" class="mx-5">
                        <v-card-text class="mx-2 text--primary">
                          <span @click="close_panel(index2)">
                            <i class="fas fa-times-circle"></i>
                          </span>

                          <span class="mt-2" style="color: red;">{{test4.index}}</span>

                          <br />
                          <p v-for="(element, index) in test4.wits" :key="index">
                            <template v-if="element.type=='lem'">{{element.text}} （{{index}}）</template>
                            <template v-else>
                              <b>{{element.text}} （{{index}}）</b>
                            </template>
                          </p>
                        </v-card-text>
                      </v-card>
                    </v-card-text>
                  </v-list-item>
                </v-card>
              </pane>
            </splitpanes>
          </pane>
        </splitpanes>
      </div>

      <v-dialog v-model="dialog_table" width="600px">
        <v-container>
          <div v-for="(obj, index) in test6" :key="index" class="my-5">
            <v-card>
              <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Winess</th>
                    <th class="text-left">index</th>
                    <th class="text-left">相違点</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(value, index2) in obj.wits" :key="index2">
                    <td width="40%">{{ index2 }}</td>
                    <td width="20%">{{ obj.index }}</td>
                    <td width="40%">{{ value.text }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            
              </v-card-text>
              </v-card>
          </div>
        </v-container>
      </v-dialog>

    </v-content>
  </v-app>
</template>

<script>
// In your VueJS component.
import { Splitpanes, Pane } from "splitpanes";
import axios from "axios";

let mirador_prefix = "mirador/";
var convert = require("xml-js");

export default {
  components: { Splitpanes, Pane },
  data: function() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      url_main: "",
      data_main: [],
      data_main_e: [],
      mirador_path: "",
      direction: "vertical",
      layout: "1x1",

      test_arr: [],
      test4: {},
      test5: {},
      witness: {},
      test_map: {},

      start: false,
      xmlDoc: null,

      target: null,

      test6 : {},

      dialog_table : false
    };
  },
  watch: {
    $route: function() {
      this.init();
    },
    target: function() {
      this.list();
    }
  },
  mounted: function() {
    this.init();
  },
  methods: {
    list() {
      let test5 = {};

      let index = 1;

      let all = this.test_arr;
      for (let i = 0; i < all.length; i++) {
        let objs = all[i];
        for (let j = 0; j < objs.length; j++) {
          let obj = objs[j];
          if (obj.type == "app") {
            let apps = obj.app;

            let test2 = {};

            let contain_flg = false;

            for (let k = 0; k < apps.length; k++) {
              let app = apps[k];

              let elements = app.elements;
              let wit = "";
              if (app.attributes) {
                wit = app.attributes.wit;
              }

              if (wit.split(" ").indexOf(this.target) != -1) {
                contain_flg = true;
              }

              if (elements != null) {
                for (let j = 0; j < elements.length; j++) {
                  let element = elements[j];

                  if (wit != "") {
                    test2[wit] = {
                      text: element.text,
                      type: app.name
                    };
                  }
                }
              }
            }

            if (contain_flg) {
              test5[obj.id] = {
                index: index,
                wits: test2
              };
            }

            index += 1;
          }
        }
      }

      this.test5 = test5;
    },
    init() {
      window.addEventListener("resize", this.handleResize);
      let u = this.$route.query.u == null ? null : this.$route.query.u; //"01_with_wit.xml"
      if (u) {
        this.exec2main(u);
      }
    },
    conv2json(xml) {
      xml = new XMLSerializer().serializeToString(xml);
      var result = convert.xml2json(xml, { compact: false, spaces: 4 });

      let data = JSON.parse(result);
      data = data.elements[0];
      return data;
    },
    clickIcon(zone_id) {
      let obj = this.test_map[zone_id];

      let params = [
        {
          manifest: obj.manifest,
          canvas: obj.canvas
        }
      ];

      this.mirador_path =
        mirador_prefix +
        "?params=" +
        encodeURIComponent(JSON.stringify(params)) +
        "&annotationState=on&layout=" +
        this.layout;
    },

    handleResize: function() {
      // resizeのたびにこいつが発火するので、ここでやりたいことをやる
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
    rec(arr, data) {
      for (let i = 0; i < arr.length; i++) {
        let obj = arr[i];
        data.push(obj);

        if (obj.elements && obj.name != "app") {
          let elements = obj.elements;
          data = this.rec(elements, data);
        }
      }
      return data;
    },
    handleFileSelect(evt) {
      var files = evt.target.files; // FileList object

      for (var i = 0; i < files.length; i++) {
        let f = files[i];
        var reader = new FileReader();
        reader.readAsText(f);

        var vm = this;
        reader.onload = function() {
          var dpObj = new DOMParser();
          let xmlDoc = dpObj.parseFromString(reader.result, "text/xml");
          vm.handleXml(xmlDoc);
        };
      }
    },
    exec2main(url) {
      axios
        .get(url, {
          responseType: "document"
        })
        .then(response => {
          let xml = response.data;
          this.handleXml(xml);
        });
    },
    handleXml(xml) {
      //witness
      let listWit = xml.querySelector("listWit");
      listWit = this.conv2json(listWit).elements;

      if (listWit.length > 0) {
        this.start = true;
      } else {
        this.start = false;
        return;
      }

      for (let i = 0; i < listWit.length; i++) {
        let wit = listWit[i];
        this.witness["#" + wit.attributes["xml:id"]] = wit.attributes["xml:id"];
      }

      //facs

      let facs = xml.querySelector("surfaceGrp");
      if (facs != null) {
        facs = this.conv2json(facs);
        let manifest = facs.attributes.facs;

        let surfaces = facs.elements;
        for (let i = 0; i < surfaces.length; i++) {
          let surface = surfaces[i].elements;
          let canvas = surface[0].attributes.n;
          for (let j = 1; j < surface.length; j++) {
            let zone = surface[j].attributes;
            let id = zone["xml:id"];
            let x = Number(zone["ulx"]);
            let y = Number(zone["uly"]);
            let w = Number(zone["lrx"]) - x;
            let h = Number(zone["lry"]) - y;
            this.test_map["#" + id] = {
              manifest: manifest,
              canvas: canvas + "#xywh=" + x + "," + y + "," + w + "," + h
            };
          }
        }

        let params = [
          {
            manifest: manifest
          }
        ];

        this.mirador_path =
          mirador_prefix +
          "?params=" +
          encodeURIComponent(JSON.stringify(params)) +
          "&annotationState=on&layout=" +
          this.layout;
      }

      //text

      let body = xml.querySelector("body");
      body = this.conv2json(body).elements;

      let arr = this.rec(body, []);

      let data10 = [];

      let pa = [];

      let index = 1;

      for (let i = 0; i < arr.length; i++) {
        let obj = arr[i];
        let name = obj.name;
        let type = obj.type;
        if (name == "lb" || name == "p" || name == "l") {
          data10.push(pa);
          pa = [];
        } else if (type == "text") {
          pa.push(obj);
        } else if (name == "pb") {
          pa.push({
            id: obj.attributes.facs,
            type: "zone"
          });
        } else if (name == "app") {
          let apps = obj.elements;

          //明示されていないwitを補足
          if(apps[0].name == "lem"){
            let wits = []
            for(let m = 0; m < apps.length; m++){
              if(apps[m].attributes){
                let wits_tmp = apps[m].attributes.wit.split(" ")
                for(let l = 0; l < wits_tmp.length; l++){
                  let wit_tmp = wits_tmp[l]
                  if(wits.indexOf(wit_tmp) == -1){
                    wits.push(wit_tmp)
                  }
                }
              }
            }

            //err対策
            if(!apps[0].attributes){
              apps[0].attributes = {}
            }

            let wit_org = []
            if(apps[0].attributes.wit){
              //元々明示されていたlemのwitness
              wit_org = apps[0].attributes.wit.split(" ")
            }

            //リストに上がっているwitnessについて、
            for(let wit in this.witness){
              //明示されていない場合に、
              if(wits.indexOf(wit) == -1){
                //元のwitnessに追加
                wit_org.push(wit)
              }
            }

            apps[0].attributes.wit = wit_org.join(" ")
          }

          let lem = apps[0];
          let text_lem = "";
          if (lem.elements) {
            text_lem = lem.elements[0].text;
          }
          pa.push({
            text: text_lem,
            type: "app",
            app: apps,
            id: "app_" + i,
            index: index
          });
          index += 1;
        }
      }

      data10.push(pa);

      let all = data10
      let test5 = {}
      for (let i = 0; i < all.length; i++) {
        let objs = all[i];
        for (let j = 0; j < objs.length; j++) {
          let obj = objs[j];
          if (obj.type == "app") {
            let apps = obj.app;

            let test2 = {};

            let contain_flg = true;

            for (let k = 0; k < apps.length; k++) {
              let app = apps[k];

              let elements = app.elements;
              let wit = "";
              if (app.attributes) {
                wit = app.attributes.wit;
              }

              if (elements != null) {
                for (let j = 0; j < elements.length; j++) {
                  let element = elements[j];

                  if (wit != "") {
                    test2[wit] = {
                      text: element.text,
                      type: app.name
                    };
                  }
                }
              }
            }

            if (contain_flg) {
              test5[obj.id] = {
                index: index,
                wits: test2
              };
            }

            index += 1;
          }
        }
      }

      this.test6 = test5;

      this.test_arr = data10;
    },

    close_panel: function(id) {
      let test5 = {};

      for (let key in this.test5) {
        test5[key] = this.test5[key];
      }

      delete test5[id];

      this.test5 = test5;
    },
    test: function(apps, id, index) {
      let test5 = {};

      for (let key in this.test5) {
        test5[key] = this.test5[key];
      }

      if (test5[id]) {
        delete test5[id];
      } else {
        let test2 = {};
        for (let i = 0; i < apps.length; i++) {
          let app = apps[i];

          let elements = app.elements;
          let wit = "";
          if (app.attributes) {
            wit = app.attributes.wit;
          }

          if (elements != null) {
            for (let j = 0; j < elements.length; j++) {
              let element = elements[j];

              if (wit != "") {
                test2[wit] = {
                  text: element.text,
                  type: app.name
                };
              }
            }
          } else {
            if (wit != "") {
              test2[wit] = {
                text: "",
                type: app.name
              };
            }
          }
        }

        test5[id] = {
          index: index,
          wits: test2
        };
      }

      this.test5 = test5;
    }
  },

  beforeDestroy: function() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>

<style>
.scroll {
  height: 100%;
  overflow-y: auto;
}

.vertical {
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;
}

html,
body,
#app {
  height: 100%;
  margin: 0;
}
</style>
