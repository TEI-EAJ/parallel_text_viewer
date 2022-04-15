<template>
  <v-app>
    <v-main>
      <v-toolbar id="bar" :dark="true" flat>
        <v-toolbar-title>Parallel Text Viewer with TEI & IIIF</v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- 
        <v-toolbar-items>
          <v-btn text :to="{name : 'test', query : {'u': $route.query.u}}">新しいUIを試す</v-btn>
        </v-toolbar-items>
        -->

        <v-btn icon @click.stop="dialogSettings = true">
          <v-icon>mdi-settings</v-icon>
        </v-btn>
        <v-btn icon @click.stop="dialogInformation = true">
          <v-icon>mdi-information</v-icon>
        </v-btn>
        <v-toolbar-items v-show="returnUrl">
          <v-btn text :href="returnUrl">{{returnLabel}}</v-btn>
        </v-toolbar-items>
        <v-btn text @click="changeLocale">
          {{$t("change_locale")}}
        </v-btn>
      </v-toolbar>

      <div :style="`height: ${height - barHeight}px`">
        <splitpanes class="default-theme">
          <pane :size="paneSize"> <!-- min-size="20"  -->
            <iframe
              :src="miradorPath"
              seamless="seamless"
              width="100%"
              :height="`${height - barHeight}px`"
              style="border: none;"
              allow="fullscreen"
            ></iframe>
          </pane>
          <pane :size="100 - paneSize">
            <splitpanes class="default-theme" horizontal="horizontal">
              <pane>
                <v-card id="main" class="scroll vertical" :flat="true">
                  <Hello v-if="dataMain" :elements="dataMain.elements"></Hello>
                </v-card>
              </pane>
              <pane>
                <v-card id="sub" class="scroll vertical" :flat="true"> <!--   -->
                  <Hello v-if="dataSub" :elements="dataSub.elements"></Hello>
                </v-card>
              </pane>
            </splitpanes>
          </pane>
        </splitpanes>
      </div>
    </v-main>

    <v-dialog v-model="dialogInformation" width="600px">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{$t("information")}}</v-card-title>
        <v-card-text class="mt-5">
          <a target="_blank" :href="$route.query.u">{{$route.query.u}}</a>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="dialogInformation = false">{{$t("close")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogSettings" width="600px">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{$t("settings")}}</v-card-title>

        <v-card-text class="mt-5">
          <v-text-field v-model="layout" label="Mirador表示レイアウト Ex. 1x1, 2x2, ..." class="mb-5"></v-text-field>

          <v-switch
            v-for="(obj, index) in selectedManifests"
            :key="index"
            v-model="obj.selected"
            :label="obj.label"
          ></v-switch>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="secondary" @click="dialogSettings = false">{{$t("close")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
// In your VueJS component.
import { Splitpanes, Pane } from "splitpanes";
import 'splitpanes/dist/splitpanes.css'
import axios from "axios";
import Hello from "@/components/Hello.vue";

const { scroller } = require('vue-scrollto/src/scrollTo')

const miradorPrefix = process.env.baseUrl + "/mirador/"; // 要修正

const convert = require("xml-js");

export default {
  components: { Splitpanes, Pane, Hello },
  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      barHeight: 0,
      returnUrl: null,
      returnLabel: null,
      dialogInformation: false,
      dialogSettings: false,

      urlMain: "",
      urlSub: "",

      dataMain: null,
      dataSub: null,
      
      
      imageMap: {},

      labelMain: "",
      labelSub: "",
      selectedManifests: [],
      miradorPath: "",
      direction: "vertical",
      layout: "2x2",

      paneSize: 50
    };
  },
  computed: {
    mainLineId : {
      get() { return this.$store.getters.getMainLineId},
      set(val) { this.$store.commit("setMainLineId", val)}
    },
    subLineId : {
      get() { return this.$store.getters.getSubLineId},
      set(val) { this.$store.commit("setSubLineId", val)}
    },
    selectedObj : {
      get() { return this.$store.getters.getSelectedObj},
      set(val) { this.$store.commit("setSelectedObj", val)}
    }
  },
  watch: {
    $route() {
      this.search();
    },
    mainLineId(){
      this.scroll("line-"+this.mainLineId, "sub")
      
    },
    subLineId(){
      this.scroll("anchor-"+this.subLineId, "main")
    },

    // IIIF対応
    selectedObj(){
      const page = Number(this.selectedObj.attributes.n)

      const selectedManifests = this.selectedManifests;
      const params = [];

      for (let i = 0; i < selectedManifests.length; i++) {
        const selectedManifest = selectedManifests[i];

        // 表示オプションで選択したmanifestの場合
        if (!selectedManifest.selected) {
          continue;
        }
        const manifestLabel = selectedManifest.label;
        const manifestMap = this.imageMap[manifestLabel].data;

        if (manifestMap[page]) {
          let memberId = manifestMap[page]
          const tmp = memberId.split("#xywh=")
          const canvas = tmp[0]
          const xywh = tmp[1].split(",")
          const y = Number(xywh[1]) - 150
          const h = Number(xywh[3]) + 150
          memberId = canvas+"#xywh="+xywh[0]+","+y + ","+xywh[2] + "," + h
          params.push({
            manifest: this.imageMap[manifestLabel].manifest,
            canvas: memberId
          });
        }
      }
        
      this.miradorPath =
        miradorPrefix +
        "?params=" +
        encodeURIComponent(JSON.stringify(params)) +
        "&annotationState=on&layout=" +
        this.layout;

      
      
    }
  },
  mounted() {
    const bar = document.getElementById('bar')
    if (bar) {
      this.barHeight = bar.clientHeight
    }

    const containerMain = document.getElementById('main')
    containerMain.addEventListener('wheel', (e) => {
      containerMain.scrollLeft -= e.deltaY
    })

    const containerSub = document.getElementById('sub')
    containerSub.addEventListener('wheel', (e) => {
      containerSub.scrollLeft -= e.deltaY
    })

    // -------------

    window.addEventListener("resize", this.handleResize);

    if (this.$route.query.u===null && location.hostname !== "localhost") {
      location.href = "https://github.com/TEI-EAJ/parallel_text_viewer/";
    }

    ///

    const u = this.$route.query.u;

    const self = this
    axios.get(u).then(response => {
      const result = response.data;

      this.returnUrl = result.return_url || result.returnUrl;
      this.returnLabel = result.return_label || result.returnLabel;

      this.urlMain = result.urlMain || result.url_main;
      this.urlSub = result.urlSub || result.url_sub;

      this.labelMain = result.labelMain || result.label_main;
      this.labelSub = result.labelSub || result.labelsub;

      this.direction = result.direction;

      if (result.layout) {
        this.layout = result.layout;
      }

      // 画像との対応表の作成
      const imageMapUrl = result.imageMap || result.image_map;

      axios.get(imageMapUrl).then(response => {
        // Miradorの初期表示パラメータ
        const params = [];

        const curationData = response.data;

        const imageMap = {};

        const selections = curationData.selections;

        const size = selections.length

        if (size === 1) {
          this.layout = '1x1'
        } else {
          const row = 2
          const col = Math.ceil(size / 2)
          this.layout = row + 'x' + col
        }

        for (let i = 0; i < selections.length; i++) {
          const selection = selections[i];

          const members = selection.members;

          // データのバグのため
          if(members.length===0){
            continue
          }

          const within = selection.within;
          const selectionLabel = within.label;
          const manifest = within["@id"];
          imageMap[selectionLabel] = {
            manifest,
            data: {}
          };
          // 初期表示用パラメータ
          params.push({
            manifest
          });
          // 選択済み（表示用）manifestの一覧
          this.selectedManifests.push({
            label: selectionLabel,
            selected: true
          });

          
          for (let j = 0; j < members.length; j++) {
            const member = members[j];
            const page = Number(member.label.split("p.")[1])
            imageMap[selectionLabel].data[page] = member["@id"];
          }
        }

        // mirador表示用の辞書
        this.imageMap = imageMap;

        this.miradorPath =
          miradorPrefix +
          "?params=" +
          encodeURIComponent(JSON.stringify(params)) +
          "&annotationState=on&layout=" +
          this.layout;


        self.exec2main(this.urlMain);
        self.exec2sub(this.urlSub);

        
        setTimeout(() => {
          this.paneSize = 49.9}
          ,1000
        )
      
      });
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    scroll(targetId, windowId) {
      if(!document.querySelector("#" + targetId)){
        return
      }

      let options = null
      const query = windowId

      /*

      if (this.direction==="vertical") {
        this.$SmoothScroll(
          document.querySelector("#" + targetId).getBoundingClientRect()
            .left +
            document.querySelector("#" + windowId).scrollLeft -
            document.querySelector("#" + windowId).getBoundingClientRect().left -
            document.querySelector("#" + windowId).getBoundingClientRect()
              .width /
              2 +
            document.querySelector("#" + targetId).getBoundingClientRect()
              .width,
          0.1,
          null,
          document.querySelector("#" + windowId),
          "x"
        );
      } else {
        this.$SmoothScroll(
          document.querySelector("#" + targetId).getBoundingClientRect()
            .top +
            document.querySelector("#" + windowId).scrollTop -
            document.querySelector("#" + windowId).getBoundingClientRect().top,
          0.1,
          null,
          document.querySelector("#" + windowId),
          "y"
        );
      }

      */

      if (this.direction === 'vertical') {
        const containerDiv = document.querySelector('#' + query)
        const idDiv = document.querySelector('#' + targetId)

        const containerDivWidth = containerDiv.getBoundingClientRect().width

        // 対象divの幅だけ、右にずらす
        const idDivWidth = idDiv ? idDiv.getBoundingClientRect().width : 0

        const offset = -1 * containerDivWidth + idDivWidth

        options = {
          container: '#' + query,
          offset,
          x: true,
        }
      } else {
        options = {
          container: '#' + query,
          y: true,
        }
      }
      const scrollTo = scroller()
      scrollTo('#' + targetId, 500, options)
    },
    
    handleResize() {
      // resizeのたびにこいつが発火するので、ここでやりたいことをやる
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
    
    async exec2main(url) {

      await axios
        .get(url)
        .then(response => {
          let xmlNode = response.data;
          if (typeof xmlNode === "string") {
            const dpObj = new DOMParser();
            xmlNode = dpObj.parseFromString(xmlNode, "text/xml");
          }

          const xmlStr = new XMLSerializer().serializeToString(xmlNode);
          const result = convert.xml2json(xmlStr, { compact: false, spaces: 4 });
          this.dataMain = JSON.parse(result);
        });
    },

    async exec2sub(url) {
      await axios
        .get(url)
        .then(response => {
          let xmlNode = response.data;
          if (typeof xmlNode === "string") {
            const dpObj = new DOMParser();
            xmlNode = dpObj.parseFromString(xmlNode, "text/xml");
          }
          const xmlStr = new XMLSerializer().serializeToString(xmlNode);
          const result = convert.xml2json(xmlStr, { compact: false, spaces: 4 });
          this.dataSub = JSON.parse(result);
        });
    },
    changeLocale() {
      this.$emit('change-locale');
    }
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
  writing-mode: vertical-rl;
}

html,
body,
#app {
  height: 100%;
  margin: 0;
}

/*
.splitpanes_Pane {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Helvetica, Arial, sans-serif;
  color: rgba(255 255 255 / 60%);
}
*/
</style>
