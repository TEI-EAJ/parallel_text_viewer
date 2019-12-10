<template>
  <v-app>
    <v-content>
      <v-toolbar :dark="true" flat>
        <v-toolbar-title>日本風な校本を作るための可視化ツール</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-toolbar>

      <div :style="'height: '+height+'px;'">
        <splitpanes class="default-theme">
          <pane min-size="20">
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
                    <h2 class="text--primary">本文</h2>

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
                            <span style="color: red;"> {{element.index}} </span>

                            {{element.text}}
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
                      <h2 class="text--primary">異文</h2>
                      <br />

                      <v-card v-for="(test4, index2) in test5" :key="index2" class="mx-5">
                        <v-card-text class="mx-2 text--primary">
                          <span @click="close_panel(index2)">
                            <i class="fas fa-times-circle"></i>
                          </span>

                          <span class="mt-2" style="color: red;"> {{test4.index}} </span>

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
    </v-content>

    
  </v-app>
</template>

<script>



// In your VueJS component.
import { Splitpanes, Pane } from "splitpanes";
import axios from "axios";

let mirador_prefix = "mirador/";

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
      test_map: {}
    };
  },
  mounted: function() {
    window.addEventListener("resize", this.handleResize);
    this.exec2main("01_with_wit.xml");    
  },
  methods: {
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

    exec2main(url) {
      axios
        .get(url, {
          responseType: "document"
        })
        .then(response => {
          let xml = response.data;

          var convert = require("xml-js");

          let test_arr2 = [];
          let test_arr = [];

          xml = new XMLSerializer().serializeToString(xml);
          var result = convert.xml2json(xml, { compact: false, spaces: 4 });

          let data = JSON.parse(result);

          //witness

          let listWit =
            data.elements[0].elements[0].elements[0].elements[2].elements[1]
              .elements;
          for (let i = 0; i < listWit.length; i++) {
            let wit = listWit[i];
            this.witness["#" + wit.attributes["xml:id"]] =
              wit.attributes["xml:id"];
          }

          //facs

          let facs = data.elements[0].elements[1].elements[0];
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

          //text

          let index = 1;

          let p = data.elements[0].elements[2].elements[0].elements[0];
          let elements = p.elements;
          for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            let name = element.name;
            let type = element.type;

            if (name == "app") {
              let apps = element.elements;
              let lem = apps[0];
              let text_lem = "";
              if (lem.elements) {
                text_lem = lem.elements[0].text;
              }
              test_arr.push({
                text: text_lem,
                type: "app",
                app: apps,
                id: "app_" + i,
                index: index
              });
              index += 1;
            } else if (type == "text") {
              test_arr.push({
                text: element.text,
                type: "text"
              });
            } else if (name == "lb") {
              test_arr2.push(test_arr);
              test_arr = [];
            } else if (name == "pb") {
              test_arr.push({
                id: element.attributes.facs,
                type: "zone"
              });
            }
          }

          this.test_arr = test_arr2;
        });
    },
    close_panel: function(id) {
      //let test3 = this.test3;

      let test5 = {};

      for (let key in this.test5) {
        test5[key] = this.test5[key];
      }

      delete test5[id];

      this.test5 = test5;
    },
    test: function(apps, id, index) {
      //let test3 = this.test3;

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
