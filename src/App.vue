<template>
  <v-app>
    <v-content>
      <v-toolbar :dark="true" flat>
        <v-toolbar-title>Parallel Text Viewer with TEI & IIIF</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click.stop="dialog_settings = true">
          <v-icon>mdi-settings</v-icon>
        </v-btn>
        <!-- 
        <v-btn icon @click.stop="dialog_information = true">
          <v-icon>mdi-information</v-icon>
        </v-btn>
        -->
        <v-toolbar-items v-show="return_url">
          <v-btn text :href="return_url">{{return_label}}</v-btn>
        </v-toolbar-items>
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
                    <h2 class="text--primary">{{label_main}}</h2>

                    <br />

                    <p v-for="(row, index) in data_main_e" :key="index">
                      <span v-if="row.manifest">
                        <!-- <b>p.{{ row.manifest }}</b
                        >-->
                        <img
                          @click="clickIcon(row.id)"
                          src="https://iiif.dl.itc.u-tokyo.ac.jp/images/iiif.png"
                          style="width: 30px"
                          class="mr-2"
                        />
                        <br />
                      </span>
                      <span
                        v-for="(w, index2) in row.words"
                        :key="index2"
                        :style="hightlights.indexOf(w.id) != -1 ? 'background-color : yellow;' : null"
                        :id="w.id"
                        v-on:mouseover="mouseover_main"
                        @click="scroll(w.id)"
                      >{{w.value}}</span>
                    </p>
                  </v-card-text>
                </v-card>
              </pane>
              <pane class="py-2 mx-2">
                <v-card class="scroll vertical" :flat="true" id="sub">
                  <v-list-item>
                    <v-card-text class="mx-2 text--primary">
                      <h2 class="text--primary">{{label_sub}}</h2>

                      <br />

                      <p v-for="(row, index) in data_sub" :key="index">
                        <span
                          :style="hightlights.indexOf(row.id) != -1 ? 'background-color : yellow;' : null"
                          :id="row.id"
                          v-on:mouseover="mouseover"
                          @click="scroll(row.id)"
                        >{{row.value}}</span>
                      </p>
                    </v-card-text>
                  </v-list-item>
                </v-card>
              </pane>
            </splitpanes>
          </pane>
        </splitpanes>
      </div>
    </v-content>

    <v-dialog v-model="dialog_settings" width="600px">
      <v-card>
        <v-card-title class="headline">設定</v-card-title>

        <v-card-text>

          <v-text-field
            v-model="layout"
            label="表示レイアウト Ex. 1x1, 2x2, ..."
            class="my-5"
          ></v-text-field>
        
          <v-switch
            v-for="(obj, index) in selected_manifests"
            :key="index"
            v-model="obj.selected"
            :label="obj.label"
          ></v-switch>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="secondary" @click="dialog_settings = false">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
// In your VueJS component.
import { Splitpanes, Pane } from "splitpanes";
import axios from "axios";

let mirador_prefix =
  "https://nakamura196.github.io/genji/mirador/";

//var convert = require("xml-js");

export default {
  components: { Splitpanes, Pane },
  data: function() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      return_url: null,
      return_label: null,
      dialog_information: false,
      dialog_settings: false,
      url_main: "",
      url_sub: "",
      test: "",
      data_main: [],
      data_sub: [],
      data_main_e: [],
      data_sub_e: [],
      hightlights: [],
      m_s_id_map: [],
      s_m_id_map: [],
      w_l_id_map: {},
      l_w_id_map: {},
      image_map: {},
      label_main: "",
      label_sub: "",
      selected_manifests: [],
      mirador_path: "",
      direction: "vertical",
      layout: "2x2"
    };
  },
  mounted: function() {
    window.addEventListener("resize", this.handleResize);

    if(this.$route.query.u == null && location.hostname != "localhost"){
      location.href = "https://github.com/TEI-EAJ/parallel_text_viewer/"
    }

    let u = this.$route.query.u;

    axios.get(u).then(response => {
      let result = response.data;

      this.return_url = result.return_url;
      this.return_label = result.return_label;
      this.url_main = result.url_main;

      this.label_main = result.label_main;
      this.label_sub = result.label_sub;

      let query_main = result.query_main;
      let query_sub = result.query_sub;

      this.direction = result.direction;

      if(result.layout){
        this.layout = result.layout
      }

      //画像との対応表の作成
      let image_map_url = result.image_map;

      axios.get(image_map_url).then(response => {
        //Miradorの初期表示パラメータ
        let params = [];

        let curation_data = response.data;

        let manifest_lines = [];

        let image_map = {};

        let selections = curation_data["selections"];
        for (let i = 0; i < selections.length; i++) {
          let selection = selections[i];
          let within = selection.within;
          let selection_label = within.label;
          let manifest = within["@id"];
          image_map[selection_label] = {
            manifest: manifest,
            data: {}
          };
          //初期表示用パラメータ
          params.push({
            manifest: manifest
          });
          //選択済み（表示用）manifestの一覧
          this.selected_manifests.push({
            "label": selection_label,
            "selected": true
          });

          let members = selection.members;
          for (let j = 0; j < members.length; j++) {
            let member = members[j];
            let manifest_line_id = member.label;
            if (!manifest_lines[manifest_line_id]) {
              manifest_lines.push(manifest_line_id);
            }
            image_map[selection_label].data[manifest_line_id] = member["@id"];
          }
        }
        //mirador表示用の辞書
        this.image_map = image_map;

        this.mirador_path =
          mirador_prefix +
          "?params=" +
          encodeURIComponent(JSON.stringify(params)) +
          "&annotationState=on&layout="+this.layout;

        this.exec2map(result.url_map);
        this.exec2main(result.url_main, manifest_lines, query_main);
        this.exec2sub(result.url_sub, query_sub);
      });
    });
  },
  watch: {
    $route() {
      this.search();
    }
  },
  methods: {
    clickIcon(line_id) {
      let selected_manifests = this.selected_manifests;
      let params = [];
      for (let i = 0; i < selected_manifests.length; i++) {
        let selected_manifest = selected_manifests[i]
        if(!selected_manifest.selected){
          continue
        }
        let manifest_label = selected_manifest.label;
        let manifest_map = this.image_map[manifest_label].data;
        if (manifest_map[line_id]) {
          params.push({
            manifest: this.image_map[manifest_label].manifest,
            canvas: manifest_map[line_id]
          });
        }
        this.mirador_path =
          mirador_prefix +
          "?params=" +
          encodeURIComponent(JSON.stringify(params)) +
          "&annotationState=on&layout="+this.layout;
      }
    },
    scroll(id) {
      let target_ids = [];
      let query = "";
      if (this.m_s_id_map[this.w_l_id_map[id]]) {
        target_ids = this.m_s_id_map[this.w_l_id_map[id]];
        query = "sub";
      } else if (this.l_w_id_map[this.s_m_id_map[id][0]]) {
        target_ids = this.l_w_id_map[this.s_m_id_map[id][0]];
        query = "main";
      }

      if (target_ids != null) {
        let target_id = target_ids[0];
        if (this.direction == "vertical") {
          this.$SmoothScroll(
            document.querySelector("#" + target_id).getBoundingClientRect()
              .left +
              document.querySelector("#" + query).scrollLeft -
              document.querySelector("#" + query).getBoundingClientRect().left -
              document.querySelector("#" + query).getBoundingClientRect()
                .width /
                2 +
              document.querySelector("#" + target_id).getBoundingClientRect()
                .width,
            0.1,
            null,
            document.querySelector("#" + query),
            "x"
          );
        } else {
          this.$SmoothScroll(
            document.querySelector("#" + target_id).getBoundingClientRect()
              .top +
              document.querySelector("#" + query).scrollTop -
              document.querySelector("#" + query).getBoundingClientRect().top,
            0.1,
            null,
            document.querySelector("#" + query),
            "y"
          );
        }
      }
    },
    mouseover_main: function(data) {
      if (
        data.target.attributes.length > 0 &&
        data.target.attributes[0].name == "id"
      ) {
        //単語IDの取得
        let word_id = data.target.attributes[0].value;
        //MainのLine IDの取得
        let line_id = this.w_l_id_map[word_id];
        let hightlights = [];
        if (this.m_s_id_map[line_id]) {
          //SubのLine IDの取得
          let sub_ids = this.m_s_id_map[line_id];
          hightlights = sub_ids;
          //Sub IDについて回す
          for (let i = 0; i < sub_ids.length; i++) {
            let sub_id = sub_ids[i];
            //MainのLine IDを取得する
            let main_ids = this.s_m_id_map[sub_id];
            for (let j = 0; j < main_ids.length; j++) {
              let main_id = main_ids[j];
              //MainのWord IDSを取得する
              let word_ids = this.l_w_id_map[main_id];
              hightlights = hightlights.concat(word_ids);
            }
          }
        }
        this.hightlights = hightlights;
      }
    },
    mouseover: function(data) {
      if (
        data.target.attributes.length > 0 &&
        data.target.attributes[0].name == "id"
      ) {
        let line_id = data.target.attributes[0].value;
        let hightlights = [line_id];
        if (this.s_m_id_map[line_id]) {
          let main_ids = this.s_m_id_map[line_id];
          for (let j = 0; j < main_ids.length; j++) {
            let main_id = main_ids[j];
            //MainのWord IDSを取得する
            let word_ids = this.l_w_id_map[main_id];
            hightlights = hightlights.concat(word_ids);
          }
        }
        this.hightlights = hightlights;
      }
    },
    handleResize: function() {
      // resizeのたびにこいつが発火するので、ここでやりたいことをやる
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
    exec2map(url) {
      axios.get(url).then(response => {
        let s_m_id_map = response.data;

        //create m_s_map
        let m_s_id_map = {};
        for (let sub_id in s_m_id_map) {
          let main_id_arr = s_m_id_map[sub_id];
          for (let i = 0; i < main_id_arr.length; i++) {
            let main_id = main_id_arr[i];
            if (!m_s_id_map[main_id]) {
              m_s_id_map[main_id] = [];
            }
            m_s_id_map[main_id].push(sub_id);
          }
        }

        this.m_s_id_map = m_s_id_map;
        this.s_m_id_map = s_m_id_map;

        //create w_l_id_map
        let w_l_id_map = {};
        let l_w_id_map = {};
        for (let main_id in m_s_id_map) {
          let tmp = main_id.split("#");
          let line_id = tmp[0];
          let range = tmp[1].split(":");
          let start = range[0];
          let end = range[1];

          l_w_id_map[main_id] = [];
          for (let i = start; i < end; i++) {
            let word_id = line_id + "-" + i; //#から置換
            w_l_id_map[word_id] = main_id;
            l_w_id_map[main_id].push(word_id);
          }
        }

        this.w_l_id_map = w_l_id_map;
        this.l_w_id_map = l_w_id_map;
      });
    },
    exec2main(url, manifest_lines, query_main) {
      axios
        .get(url, {
          responseType: "document"
        })
        .then(response => {
          let xml = response.data;

          const lines = xml.querySelectorAll(query_main);

          let data_main_e = [];

          for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            let line_id = line.attributes[0].value;

            let nodes = line.childNodes;

            let line_text = "";

            let words = [];

            for (let j = 0; j < nodes.length; j++) {
              let node = nodes[j];
              let text = node.innerText || node.textContent;
              line_text += text.trim();
            }

            for (let i = 0; i < line_text.length; i++) {
              let w = line_text.slice(i, i + 1);
              words.push({
                value: w,
                id: line_id + "-" + i //#から置換
              });
            }

            let line_obj = {
              id: line_id,
              words: words
            };

            //IIIF Manifestを表示する行の確認
            if (manifest_lines.indexOf(line_id) != -1) {
              line_obj["manifest"] = true;
            }

            data_main_e.push(line_obj);

            this.data_main_e = data_main_e;
          }
        });
    },

    exec2sub(url, query_sub) {
      axios
        .get(url, {
          responseType: "document"
        })
        .then(response => {
          let xml = response.data;

          const lines = xml.querySelectorAll(query_sub);

          let data_sub = [];

          for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            let line_id = line.attributes[0].value;

            let nodes = line.childNodes;

            let line_text = "";

            for (let j = 0; j < nodes.length; j++) {
              let node = nodes[j];
              let text = node.innerText || node.textContent;
              line_text += text.trim();
            }

            let line_obj = {
              id: line_id,
              value: line_text
            };

            data_sub.push(line_obj);
          }

          this.data_sub = data_sub;
        });
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
