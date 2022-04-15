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
      </v-toolbar>

      <div :style="`height: ${height - barHeight}px`">
        <splitpanes class="default-theme">
          <pane min-size="20">
            <!-- class="py-2 px-2" -->
            <iframe
              
              :src="miradorPath"
              seamless="seamless"
              width="100%"
              :height="`${height - barHeight}px`"
              style="border: none;"
              allow="fullscreen"
            ></iframe>
          </pane>
          <pane>
            <splitpanes class="default-theme" horizontal="horizontal">
              <pane class=""> <!-- py-2 mx-2 -->
                <v-card id="main" class="scroll vertical" :flat="true">
                  <div class="pa-2">
                    <h2 class="text--primary">{{labelMain}}</h2>

                    <br />

                    <p v-for="(row, index) in dataMainE" :key="index">
                      <span v-if="row.manifest">
                        <!-- <b>p.{{ row.manifest }}</b
                        >-->
                        <img
                          src="https://iiif.dl.itc.u-tokyo.ac.jp/images/iiif.png"
                          style="width: 30px"
                          class="mr-2"
                          @click="clickIcon(row.id)"
                        />
                        <br />
                      </span>
                      <span
                        v-for="(w, index2) in row.words"
                        :id="w.id"
                        :key="index2"
                        :style="hightlights.indexOf(w.id) !== -1 ? 'background-color : yellow;' : null"
                        @mouseover="mouseoverMain"
                        @click="scroll(w.id)"
                      >{{w.value}}</span>
                    </p>
                  </div>
                </v-card>
              </pane>
              <pane><!--  class="py-2 mx-2" -->
                <v-card id="sub" class="scroll vertical" :flat="true">
                  
                    <div class="pa-2"> <!-- mx-2 text--primary -->
                      <h2 class="text--primary">{{labelSub}}</h2>

                      <br />

                      <div v-for="(row, index) in dataSub" :key="index">
                        <span
                          :id="row.id"
                          :style="hightlights.indexOf(row.id) !== -1 ? 'background-color : yellow;' : null"
                          @mouseover="mouseover"
                          @click="scroll(row.id)"
                        >{{row.value}}</span>
                      </div>
                    </div>
                  
                </v-card>
              </pane>
            </splitpanes>
          </pane>
        </splitpanes>
      </div>
    </v-main>

    <v-dialog v-model="dialogInformation" width="600px">
      <v-card>
        <v-card-title class="headline">Information</v-card-title>

        <v-card-text class="mt-5">
          <a target="_blank" :href="$route.query.u">{{$route.query.u}}</a>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="secondary" @click="dialogInformation = false">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogSettings" width="600px">
      <v-card>
        <v-card-title class="headline">Settings</v-card-title>

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

          <v-btn color="secondary" @click="dialogSettings = false">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
// In your VueJS component.
import { Splitpanes, Pane } from "splitpanes";
import axios from "axios";
import 'splitpanes/dist/splitpanes.css'
const miradorPrefix = "mirador/";

const crypto = require("crypto");
const { scroller } = require('vue-scrollto/src/scrollTo')

// var convert = require("xml-js");


function md5hex(str /*: string */) {
  const md5 = crypto.createHash("md5");
  return md5.update(str, "binary").digest("hex");
}

export default {
  components: { Splitpanes, Pane },
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
      test: "",
      dataMain: [],
      dataSub: [],
      dataMainE: [],
      dataSubE: [],
      hightlights: [],
      mSIdMap: [],
      sMIdMap: [],
      wLIdMap: {},
      lWIdMap: {},
      imageMap: {},
      labelMain: "",
      labelSub: "",
      selectedManifests: [],
      miradorPath: "",
      direction: "vertical",
      layout: "2x2"
    };
  },
  watch: {
    $route() {
      this.search();
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

    if (this.$route.query.u === null && location.hostname !== "localhost") {
      location.href = "https://github.com/TEI-EAJ/parallelText_viewer/";
    }

    ///

    const u = this.$route.query.u;

    axios.get(u).then(response => {
      const result = response.data;

      this.returnUrl = result.return_url;
      this.returnLabel = result.return_label;
      this.urlMain = result.url_main;

      this.labelMain = result.label_main;
      this.labelSub = result.label_sub;

      const queryMain = result.query_main;
      const querySub = result.query_sub;

      this.direction = result.direction;

      if (result.layout) {
        this.layout = result.layout;
      }

      // 画像との対応表の作成
      const imageMapUrl = result.image_map;

      axios.get(imageMapUrl).then(response => {
        // Miradorの初期表示パラメータ
        const params = [];

        const curationData = response.data;

        const manifestLines = [];

        const imageMap = {};

        const selections = curationData.selections;
        for (let i = 0; i < selections.length; i++) {
          const selection = selections[i];
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

          const members = selection.members;
          for (let j = 0; j < members.length; j++) {
            const member = members[j];

            if (!member.lineId) {
              continue;
            }

            let manifestLineId = member.lineId;
            // line idの置換（http対応）
            manifestLineId = this.convertUri(manifestLineId);
            if (!manifestLines[manifestLineId]) {
              manifestLines.push(manifestLineId);
            }
            imageMap[selectionLabel].data[manifestLineId] = member["@id"];
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

        this.exec2map(result.url_map);
        this.exec2main(result.url_main, manifestLines, queryMain);
        this.exec2sub(result.url_sub, querySub);
      });
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    clickIcon(lineId) {
    
      const selectedManifests = this.selectedManifests;
      const params = [];

      for (let i = 0; i < selectedManifests.length; i++) {
        const selectedManifest = selectedManifests[i];
        if (!selectedManifest.selected) {
          continue;
        }
        const manifestLabel = selectedManifest.label;
        const manifestMap = this.imageMap[manifestLabel].data;

        if (manifestMap[lineId]) {
          let memberId = manifestMap[lineId]
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
        
        this.miradorPath =
          miradorPrefix +
          "?params=" +
          encodeURIComponent(JSON.stringify(params)) +
          "&annotationState=on&layout=" +
          this.layout;
        
      }
    },
    scroll(id) {
      let targetIds = [];
      let query = "";
      if (this.mSIdMap[this.wLIdMap[id]]) {
        targetIds = this.mSIdMap[this.wLIdMap[id]];
        query = "sub";
      } else if (this.lWIdMap[this.sMIdMap[id][0]]) {
        targetIds = this.lWIdMap[this.sMIdMap[id][0]];
        query = "main";
      }

      if (targetIds.length > 0) {
        let options = null
        const targetId = targetIds[0];
        /*
        if (this.direction === "vertical") {
          this.$SmoothScroll(
            document.querySelector("#" + targetId).getBoundingClientRect()
              .left +
              document.querySelector("#" + query).scrollLeft -
              document.querySelector("#" + query).getBoundingClientRect().left -
              document.querySelector("#" + query).getBoundingClientRect()
                .width /
                2 +
              document.querySelector("#" + targetId).getBoundingClientRect()
                .width,
            0.1,
            null,
            document.querySelector("#" + query),
            "x"
          );
        } else {
          this.$SmoothScroll(
            document.querySelector("#" + targetId).getBoundingClientRect()
              .top +
              document.querySelector("#" + query).scrollTop -
              document.querySelector("#" + query).getBoundingClientRect().top,
            0.1,
            null,
            document.querySelector("#" + query),
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
      }
    },
    mouseoverMain(data) {
      if (
        data.target.attributes.length > 0 &&
        data.target.attributes[0].name === "id"
      ) {
        // 単語IDの取得
        const wordId = data.target.attributes[0].value;
        // MainのLine IDの取得
        const lineId = this.wLIdMap[wordId];
        let hightlights = [];
        if (this.mSIdMap[lineId]) {
          // SubのLine IDの取得
          const subIds = this.mSIdMap[lineId];
          hightlights = subIds;
          // Sub IDについて回す
          for (let i = 0; i < subIds.length; i++) {
            const subId = subIds[i];
            // MainのLine IDを取得する
            const mainIds = this.sMIdMap[subId];
            for (let j = 0; j < mainIds.length; j++) {
              const mainId = mainIds[j];
              // MainのWord IDSを取得する
              const wordIds = this.lWIdMap[mainId];
              hightlights = hightlights.concat(wordIds);
            }
          }
        }
        this.hightlights = hightlights;
      }
    },
    mouseover(data) {
      if(Object.keys(this.wLIdMap) === 0){
        return
      }
      if (
        data.target.attributes.length > 0 &&
        data.target.attributes[0].name === "id"
      ) {
        const lineId = data.target.attributes[0].value;
        let hightlights = [lineId];
        if (this.sMIdMap[lineId]) {
          const mainIds = this.sMIdMap[lineId];
          for (let j = 0; j < mainIds.length; j++) {
            const mainId = mainIds[j];
            // MainのWord IDSを取得する
            const wordIds = this.lWIdMap[mainId];
            hightlights = hightlights.concat(wordIds);
          }
        }
        this.hightlights = hightlights;
      }
    },
    handleResize() {
      // resizeのたびにこいつが発火するので、ここでやりたいことをやる
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
    exec2map(url) {
      axios.get(url).then(response => {
        const sMIdMap = response.data;

        // scroll用にidの置換
        for (const subId in sMIdMap) {
          const mainIdArr = sMIdMap[subId];
          const newMainIdArr = [];
          for (let i = 0; i < mainIdArr.length; i++) {
            const mainId = mainIdArr[i];
            const newMainId = this.convertUri(mainId);
            newMainIdArr.push(newMainId);
          }
          sMIdMap[subId] = newMainIdArr;
        }

        // create mSMap
        const mSIdMap = {};
        for (const subId in sMIdMap) {
          const mainIdArr = sMIdMap[subId];
          for (let i = 0; i < mainIdArr.length; i++) {
            const mainId = mainIdArr[i];
            if (!mSIdMap[mainId]) {
              mSIdMap[mainId] = [];
            }
            mSIdMap[mainId].push(subId);
          }
        }

        this.mSIdMap = mSIdMap;
        this.sMIdMap = sMIdMap;

        // create wLIdMap
        const wLIdMap = {};
        const lWIdMap = {};
        for (const mainId in mSIdMap) {
          const tmp = mainId.split("#");
          const lineId = tmp[0];
          const range = tmp[1].split(":");
          const start = Number(range[0]);
          const end = Number(range[1]);

          lWIdMap[mainId] = [];
          for (let i = start; i < end; i++) {
            const wordId = lineId + "-" + i; // #から置換
            wLIdMap[wordId] = mainId;
            lWIdMap[mainId].push(wordId);
          }
        }

        this.wLIdMap = wLIdMap;
        this.lWIdMap = lWIdMap;
      });
    },
    exec2main(url, manifestLines, queryMain) {
      axios
        .get(url, {
          responseType: "document"
        })
        .then(response => {
          const xml = response.data;

          const lines = xml.querySelectorAll(queryMain);

          const dataMainE = [];

          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            let lineId = line.attributes[0].value;
            // scroll用にidの置換
            lineId = this.convertUri(lineId);

            const nodes = line.childNodes;

            let lineText = "";

            const words = [];

            for (let j = 0; j < nodes.length; j++) {
              const node = nodes[j];
              const text = node.innerText || node.textContent;
              lineText += text.trim();
            }

            for (let i = 0; i < lineText.length; i++) {
              const w = lineText.slice(i, i + 1);
              words.push({
                value: w,
                id: lineId + "-" + i // #から置換
              });
            }

            const lineObj = {
              id: lineId,
              words
            };

            // IIIF Manifestを表示する行の確認
            if (manifestLines.includes(lineId)) {
              lineObj.manifest = true;
            } else if (line.attributes[0].value.includes("-01")) {
              lineObj.manifest = true;
            }

            dataMainE.push(lineObj);

            this.dataMainE = dataMainE;
          }
        });
    },

    exec2sub(url, querySub) {
      axios
        .get(url, {
          responseType: "document"
        })
        .then(response => {
          const xml = response.data;

          const lines = xml.querySelectorAll(querySub);

          const dataSub = [];

          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const lineId = line.attributes[0].value;

            const nodes = line.childNodes;

            let lineText = "";

            for (let j = 0; j < nodes.length; j++) {
              const node = nodes[j];
              const text = node.innerText || node.textContent;
              lineText += text.trim();
            }

            const lineObj = {
              id: lineId,
              value: lineText
            };

            dataSub.push(lineObj);
          }

          this.dataSub = dataSub;
        });
    },
    convertUri(id) {
      const tmp = id.split("#");
      if (tmp.length !== 2) {
        return "id-" + md5hex(id);
      }

      return "id-" + md5hex(tmp[0]) + "#" + tmp[1];
    }
  }
};
</script>

<style>
.scroll {
  height: 100%;
  overflow-y: auto;
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
</style>
