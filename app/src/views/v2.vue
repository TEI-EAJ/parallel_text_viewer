<template>
  <v-app>
    <v-content>
      <v-toolbar :dark="true" flat>
        <v-toolbar-title>Parallel Text Viewer with TEI & IIIF</v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- 
        <v-toolbar-items>
          <v-btn text :to="{name : 'test', query : {'u': $route.query.u}}">新しいUIを試す</v-btn>
        </v-toolbar-items>
        -->

        <v-btn icon @click.stop="dialog_settings = true">
          <v-icon>mdi-settings</v-icon>
        </v-btn>
        <v-btn icon @click.stop="dialog_information = true">
          <v-icon>mdi-information</v-icon>
        </v-btn>
        <v-toolbar-items v-show="return_url">
          <v-btn text :href="return_url">{{return_label}}</v-btn>
        </v-toolbar-items>
        <v-btn text @click="changeLocale">
          {{$t("change_locale")}}
        </v-btn>
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
                  <Hello v-if="data_main" :elements="data_main.elements"></Hello>
                </v-card>
              </pane>
              <pane class="py-2 mx-2">
                <v-card class="scroll vertical" :flat="true" id="sub">
                  <Hello v-if="data_sub" :elements="data_sub.elements"></Hello>
                </v-card>
              </pane>
            </splitpanes>
          </pane>
        </splitpanes>
      </div>
    </v-content>

    <v-dialog v-model="dialog_information" width="600px">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{$t("information")}}</v-card-title>
        <v-card-text class="mt-5">
          <a target="_blank" :href="this.$route.query.u">{{this.$route.query.u}}</a>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="dialog_information = false">{{$t("close")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog_settings" width="600px">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{$t("settings")}}</v-card-title>

        <v-card-text class="mt-5">
          <v-text-field v-model="layout" label="Mirador表示レイアウト Ex. 1x1, 2x2, ..." class="mb-5"></v-text-field>

          <v-switch
            v-for="(obj, index) in selected_manifests"
            :key="index"
            v-model="obj.selected"
            :label="obj.label"
          ></v-switch>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="secondary" @click="dialog_settings = false">{{$t("close")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
// In your VueJS component.
import { Splitpanes, Pane } from "splitpanes";
import axios from "axios";

import Hello from "../components/Hello.vue";

let mirador_prefix = "mirador/";

var convert = require("xml-js");

export default {
  components: { Splitpanes, Pane, Hello },
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

      data_main: null,
      data_sub: null,
      
      
      image_map: {},

      label_main: "",
      label_sub: "",
      selected_manifests: [],
      mirador_path: "",
      direction: "vertical",
      layout: "2x2"
    };
  },
  computed: {
    mainLineId : {
      get() { return this.$store.getters.mainLineId},
      set(val) { this.$store.dispatch("setMainLineId", val)}
    },
    subLineId : {
      get() { return this.$store.getters.subLineId},
      set(val) { this.$store.dispatch("setSubLineId", val)}
    },
    selectedObj : {
      get() { return this.$store.getters.selectedObj},
      set(val) { this.$store.dispatch("setSelectedObj", val)}
    }
  },
  mounted: function() {
    window.addEventListener("resize", this.handleResize);

    if (this.$route.query.u == null && location.hostname != "localhost") {
      location.href = "https://github.com/TEI-EAJ/parallel_text_viewer/";
    }

    ///

    let u = this.$route.query.u;

    axios.get(u).then(response => {
      let result = response.data;

      this.return_url = result.returnUrl || result.return_url;
      this.return_label = result.returnLabel || result.return_label;

      this.url_main = result.urlMain || result.url_main;
      this.url_sub = result.urlSub || result.url_sub;

      this.label_main = result.labelMain || result.label_main;
      this.label_sub = result.labelSub || result.label_sub;

      this.direction = result.direction;

      if (result.layout) {
        this.layout = result.layout;
      }

      //画像との対応表の作成
      let image_map_url = result.imageMap || result.image_map;

      axios.get(image_map_url).then(response => {
        //Miradorの初期表示パラメータ
        let params = [];

        let curation_data = response.data;

        let image_map = {};

        let selections = curation_data["selections"];

        const size = selections.length

        if (size === 1) {
          this.layout = '1x1'
        } else {
          const row = 2
          const col = Math.ceil(size / 2)
          this.layout = row + 'x' + col
        }

        for (let i = 0; i < selections.length; i++) {
          let selection = selections[i];

          let members = selection.members;

          //データのバグのため
          if(members.length == 0){
            continue
          }

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
            label: selection_label,
            selected: true
          });

          
          for (let j = 0; j < members.length; j++) {
            let member = members[j];
            let page = Number(member.label.split("p.")[1])
            image_map[selection_label].data[page] = member["@id"];
          }
        }

        //mirador表示用の辞書
        this.image_map = image_map;

        this.mirador_path =
          mirador_prefix +
          "?params=" +
          encodeURIComponent(JSON.stringify(params)) +
          "&annotationState=on&layout=" +
          this.layout;


        this.exec2main(this.url_main);
        this.exec2sub(this.url_sub);
      });
    });
  },
  watch: {
    $route() {
      this.search();
    },
    mainLineId: function(){
      this.scroll("line-"+this.mainLineId, "sub")
      
    },
    subLineId: function(){
      this.scroll("anchor-"+this.subLineId, "main")
    },

    //IIIF対応
    selectedObj: function(){
      let page = Number(this.selectedObj.attributes.n)

      let selected_manifests = this.selected_manifests;
      let params = [];

      for (let i = 0; i < selected_manifests.length; i++) {
        let selected_manifest = selected_manifests[i];

        //表示オプションで選択したmanifestの場合
        if (!selected_manifest.selected) {
          continue;
        }
        let manifest_label = selected_manifest.label;
        let manifest_map = this.image_map[manifest_label].data;

        if (manifest_map[page]) {
          let member_id = manifest_map[page]
          let tmp = member_id.split("#xywh=")
          let canvas = tmp[0]
          let xywh = tmp[1].split(",")
          let y = Number(xywh[1]) - 150
          let h = Number(xywh[3]) + 150
          member_id = canvas+"#xywh="+xywh[0]+","+y + ","+xywh[2] + "," + h
          params.push({
            manifest: this.image_map[manifest_label].manifest,
            canvas: member_id
          });
        }
      }
        
      this.mirador_path =
        mirador_prefix +
        "?params=" +
        encodeURIComponent(JSON.stringify(params)) +
        "&annotationState=on&layout=" +
        this.layout;
      
    }
  },
  methods: {
    scroll(target_id, window_id) {
      if(!document.querySelector("#" + target_id)){
        return
      }

      if (this.direction == "vertical") {
        this.$SmoothScroll(
          document.querySelector("#" + target_id).getBoundingClientRect()
            .left +
            document.querySelector("#" + window_id).scrollLeft -
            document.querySelector("#" + window_id).getBoundingClientRect().left -
            document.querySelector("#" + window_id).getBoundingClientRect()
              .width /
              2 +
            document.querySelector("#" + target_id).getBoundingClientRect()
              .width,
          0.1,
          null,
          document.querySelector("#" + window_id),
          "x"
        );
      } else {
        this.$SmoothScroll(
          document.querySelector("#" + target_id).getBoundingClientRect()
            .top +
            document.querySelector("#" + window_id).scrollTop -
            document.querySelector("#" + window_id).getBoundingClientRect().top,
          0.1,
          null,
          document.querySelector("#" + window_id),
          "y"
        );
      }
    },
    
    handleResize: function() {
      // resizeのたびにこいつが発火するので、ここでやりたいことをやる
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
    
    exec2main(url) {

      axios
        .get(url)
        .then(response => {
          let xml_node = response.data;
          if (typeof xml_node == "string") {
            var dpObj = new DOMParser();
            xml_node = dpObj.parseFromString(xml_node, "text/xml");
          }

          let xml_str = new XMLSerializer().serializeToString(xml_node);
          var result = convert.xml2json(xml_str, { compact: false, spaces: 4 });
          this.data_main = JSON.parse(result);
        });
    },

    exec2sub(url) {
      axios
        .get(url)
        .then(response => {
          let xml_node = response.data;
          if (typeof xml_node == "string") {
            var dpObj = new DOMParser();
            xml_node = dpObj.parseFromString(xml_node, "text/xml");
          }
          let xml_str = new XMLSerializer().serializeToString(xml_node);
          var result = convert.xml2json(xml_str, { compact: false, spaces: 4 });
          this.data_sub = JSON.parse(result);
        });
    },
    changeLocale() {
      this.$emit('change-locale');
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
  overflow-wrap: break-word;
  word-break: break-all;
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
