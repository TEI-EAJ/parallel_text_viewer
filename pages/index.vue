<template>
  <v-app>
    <v-main>
      <v-toolbar id="bar" :dark="true" flat>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-show="start" icon @click.stop="dialog_info = true">
          <v-icon>mdi-information</v-icon>
        </v-btn>
        <v-btn v-show="start" icon @click.stop="dialog_chart = true">
          <v-icon>mdi-chart-bar</v-icon>
        </v-btn>
        <v-btn v-show="start" icon @click.stop="dialog_table = true">
          <v-icon>mdi-table</v-icon>
        </v-btn>
        <v-btn icon href="./">
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- 登録画面 -->
      <v-container v-show="!start" class="my-5">
        <h2 class="mb-5">校本風異文可視化ツール</h2>
        <p>異文情報を含むTEI/XMLファイルを選択してください。</p>
        <input id="files" type="file" multiple @change="handleFileSelect" />

        <output id="list" class="mt-5"></output>

        <br />
        <br />
        <br />

        <p class="mt-5">例１：校異源氏物語</p>

        <v-btn
          color="primary"
          to="?u=https://tei-eaj.github.io/koui/data/01_with_wit.xml"
          class="mx-2 my-1"
          >可視化例を見る</v-btn
        >
        <v-btn
          href="https://tei-eaj.github.io/koui/data/01_with_wit.xml"
          target="_blank"
          class="mx-2 my-1"
          >サンプルデータを見る</v-btn
        >

        <br />
        <br />

        <p class="mt-5">例２：（ダミーデータ）中村式五十音</p>

        <v-btn
          color="primary"
          to="?u=https://tei-eaj.github.io/koui/data/nakamura.xml"
          class="mx-2 my-1"
          >可視化例を見る</v-btn
        >
        <v-btn
          href="https://tei-eaj.github.io/koui/data/nakamura.xml"
          target="_blank"
          class="mx-2 my-1"
          >サンプルデータを見る</v-btn
        >

        <br />
        <br />

        <p class="mt-5">
          例３：Emily Dickinson ‘Faith is a fine invention’ from
          <a href="http://v-machine.org/samples/">Versioning Machine</a>
        </p>

        <v-btn
          color="primary"
          to="?u=https://tei-eaj.github.io/koui/data/faith.xml"
          class="mx-2 my-1"
          >可視化例を見る</v-btn
        >
        <v-btn
          href="http://v-machine.org/samples/faith.xml"
          target="_blank"
          class="mx-2 my-1"
          >サンプルデータを見る</v-btn
        >

        <br />
        <br />
        <br />

        <hr />

        <br />

        <p class="text-center my-5">
          <a href="https://github.com/TEI-EAJ">TEI-C東アジア/日本語分科会</a>
        </p>
      </v-container>

      <div v-show="start" :style="`height: ${height - barHeight}px`">
        <splitpanes class="default-theme">
          <pane>
            <iframe
              class="py-2 px-2"
              :src="mirador_path"
              seamless="seamless"
              width="100%"
              :height="height + 'px'"
              style="border: none"
              allow="fullscreen"
            ></iframe>
          </pane>
          <pane>
            <splitpanes class="default-theme" horizontal="horizontal">
              <pane class="py-2 px-2">
                <v-card id="main" class="scroll vertical" :flat="true">
                  <v-card-text class="text--primary">
                    <h2 class="text--primary">
                      本文
                      <span v-if="target">{{ target }}</span>
                    </h2>

                    <br />

                    <!-- <Hello :elements="data.elements"></Hello> -->

                    <p v-for="(pArr2, index) in pArr" :key="index">
                      <span v-for="(element, index2) in pArr2" :key="index2">
                        <template v-if="element.type === 'zone'">
                          <p @click="clickIcon(element.id)">
                            <img
                              src="https://iiif.dl.itc.u-tokyo.ac.jp/images/iiif.png"
                              style="width: 30px; cursor: pointer"
                              class="mr-2"
                            />
                          </p>
                        </template>
                        <template v-if="element.type === 'p'">
                          <br />
                        </template>
                        <template v-if="element.type === 'text'">
                          <span>{{
                            element.text != null ? element.text.trim() : ''
                          }}</span>
                        </template>
                        <template v-if="element.type === 'app'">
                          <!-- 
                          <span
                            :style="selected_id === element.id ? 'border-style: solid; border-color : #ff5252; background-color : #FFFF99;' : 'background-color : #FFFF99;'"
                            :id="'main_'+element.id"
                          >
                          -->
                          <span
                            :id="'main_' + element.id"
                            :style="
                              selected_id === element.id
                                ? 'border: solid 1px #ff5252; background-color : #fed8b1;'
                                : 'background-color : #FFFF99;'
                            "
                          >
                            <!-- @click="test(element.app, element.id, element.index)" -->
                            <!-- 
                            <v-tooltip right>
                            <template v-slot:activator="{ on }">
                              
                              v-on="on"
                              v-on="on"

                            -->
                            <span
                              :style="
                                element.iiifParam.length > 0
                                  ? 'background-color : #BBDEFB;'
                                  : ''
                              "
                            >
                              <template v-if="target === null">
                                <span
                                  @click="
                                    selected_id = element.id
                                    scroll(element.id, 'sub')
                                    show_iiif(element.iiifParam)
                                  "
                                  >{{
                                    element.text != null
                                      ? element.text.trim()
                                      : ''
                                  }}</span
                                >
                              </template>
                              <template v-else>
                                <span
                                  @click="
                                    selected_id = element.id
                                    scroll(element.id, 'sub')
                                    show_iiif(element.iiifParam)
                                  "
                                >
                                  <template
                                    v-for="(app, index2) in element.app"
                                  >
                                    <span
                                      v-if="
                                        app.attributes &&
                                        app.attributes.wit &&
                                        app.attributes.wit
                                          .split(' ')
                                          .indexOf(target) != -1
                                      "
                                      :key="index2"
                                      v-html="app.text"
                                    >
                                      <!-- :style="app.name === 'rdg' ? 'color : #ff5252' : ''" -->
                                    </span>
                                  </template>
                                </span>
                              </template>
                            </span>
                            <!-- 
                              </template>
                              <span>{{element.index}}</span>
                            </v-tooltip>-->
                          </span>
                        </template>
                      </span>
                    </p>
                  </v-card-text>
                </v-card>
              </pane>
              <pane class="py-2 px-2">
                <v-card id="sub" class="scroll vertical" :flat="true">
                  <v-list-item>
                    <v-card-text class="text--primary">
                      <h2 class="text--primary ml-4" @click="target = null">
                        異文
                      </h2>

                      <v-card
                        v-for="(app, index2) in ibunMap"
                        :id="index2"
                        :key="index2"
                        flat
                        outlined
                        class="mx-5"
                        :style="
                          index2 === selected_id
                            ? 'background-color : #FFFF99;'
                            : ''
                        "
                      >
                        <v-card-text class="mx-2 text--primary">
                          <a
                            @click="
                              scroll('main_' + index2, 'main')
                              selected_id = index2
                            "
                          >
                            <b>{{ app.index }}</b>
                          </a>

                          <br />

                          <ul class="mt-2">
                            <li
                              v-for="(element, index) in app.wits"
                              :key="index"
                            >
                              <template v-if="element.type === 'rdg'">
                                <span
                                  v-html="
                                    (element.text = '' ? ' * ' : element.text)
                                  "
                                ></span>
                              </template>
                              <template v-else>
                                <!-- Temporal -->
                                <b
                                  v-if="element.type === 'other'"
                                  style="color: green; border: solid 2px green"
                                  >???</b
                                >
                                <span
                                  :style="
                                    element.type === 'other'
                                      ? 'color : gray'
                                      : ''
                                  "
                                  v-html="
                                    (element.text = '' ? ' * ' : element.text)
                                  "
                                ></span>
                              </template>

                              <template v-if="index != 'undefined'">
                                <span class="mt-5">(</span>
                                <span
                                  v-for="(e, index3) in index.split(' ')"
                                  :key="index3"
                                  class="mb-1"
                                  :style="
                                    e === target
                                      ? 'background-color : #fed8b1;'
                                      : ''
                                  "
                                  @click="
                                    target = e
                                    scroll('main_' + index2, 'main')
                                    selected_id = index2
                                  "
                                  >{{ e }}</span
                                >
                                <span>)</span>
                              </template>
                            </li>
                          </ul>
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

      <v-dialog v-model="dialog_info" width="80%">
        <v-card>
          <v-card-text>
            <br />

            <h2 class="mt-5">{{ title }}</h2>

            <br />

            <h3 class="mt-5">Witness List</h3>

            <ul class="mt-5">
              <li
                v-for="(obj, index) in witness"
                :key="index"
                class="mr-2 mb-2"
              >
                <b>{{ index }}:</b>
                {{ obj }}
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog_chart" width="80%">
        <v-card>
          <v-card-text>
            <br />

            <h3 class="mt-5">底本との編集距離</h3>

            <chart
              v-if="Object.keys(ibunMap).length > 0"
              style="height: 300px"
              class="mb-4"
              :data="ibunMap"
              :witness="witness"
            ></chart>

            <br />

            <h3 class="mt-5">異文番号毎の異なり数</h3>

            <Chart4Diff
              style="height: 300px"
              class="mb-4"
              :data="ibunMap"
            ></Chart4Diff>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog_table" width="80%">
        <v-card style="border-radius: 0; background-color: lightgray">
          <v-container>
            <div v-for="(obj, index) in ibunMap" :key="index" class="my-5">
              <v-simple-table>
                <template #default>
                  <thead>
                    <tr>
                      <th class="text-left">Witness</th>
                      <th class="text-left">異文番号</th>
                      <th class="text-left">相違点</th>
                      <th class="text-left">タイプ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(value, index2) in obj.wits" :key="index2">
                      <td width="40%" class="py-2">
                        <ul>
                          <li
                            v-for="(e, index3) in index2.split(' ')"
                            :key="index3"
                          >
                            {{ witness[e] }}
                            <br />
                          </li>
                        </ul>
                      </td>
                      <td width="10%">{{ obj.index }}</td>
                      <td width="40%" v-html="value.text"></td>
                      <td width="10%">{{ value.type }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </div>
          </v-container>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
// In your VueJS component.
import 'splitpanes/dist/splitpanes.css'
import axios from 'axios'
import Chart4Diff from '~/components/Chart4Diff.vue'
import Chart from '~/components/Chart.vue'
const { Splitpanes, Pane } = require('splitpanes')

const { scroller } = require('vue-scrollto/src/scrollTo')

const miradorPrefix = 'mirador/'
const convert = require('xml-js')

export default {
  components: { Splitpanes, Pane, Chart, Chart4Diff /*, Hello */ },
  layout: 'empty',
  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      barHeight: 0,
      url_main: '',
      data_main: [],
      data_main_e: [],
      mirador_path: '',
      direction: 'vertical',
      layout: '1x1',

      pArr: [],
      witness: {},
      zoneMap: {},

      start: false,
      xmlDoc: null,

      target: null,

      ibunMap: {},

      dialog_table: false,
      dialog_chart: false,
      dialog_info: false,
      selected_id: '',

      title: '校本風異文可視化ツール',

      // パラメータ
      data: {},
      e: null,
      xml: null,
    }
  },
  watch: {
    $route() {
      this.init()
    },
  },
  mounted() {
    this.init()

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
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    show_iiif(iiifParam) {
      if (iiifParam.length > 0) {
        this.mirador_path =
          miradorPrefix +
          '?params=' +
          encodeURIComponent(JSON.stringify(iiifParam)) +
          '&annotationState=on'
      }
    },
    scroll(targetId, query) {
      let options = null
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
    init() {
      window.addEventListener('resize', this.handleResize)
      const u = this.$route.query.u === null ? null : this.$route.query.u // "01_with_wit.xml"
      if (u) {
        this.exec2main(u)
      }
    },
    conv2json(xml) {
      xml = new XMLSerializer().serializeToString(xml)
      const result = convert.xml2json(xml, { compact: false, spaces: 4 })

      let data = JSON.parse(result)
      data = data.elements[0]
      return data
    },
    clickIcon(zoneId) {
      const zoneMap = this.zoneMap
      const obj = zoneMap[zoneId]

      const params = [
        {
          manifest: obj.manifest,
          canvas: obj.canvas,
        },
      ]

      this.mirador_path =
        miradorPrefix +
        '?params=' +
        encodeURIComponent(JSON.stringify(params)) +
        '&annotationState=on&layout=' +
        this.layout
    },

    handleResize() {
      // resizeのたびにこいつが発火するので、ここでやりたいことをやる
      this.width = window.innerWidth
      this.height = window.innerHeight
    },
    rec(arr, data) {
      for (let i = 0; i < arr.length; i++) {
        const obj = arr[i]
        data.push(obj)

        if (obj.elements && obj.name !== 'app') {
          const elements = obj.elements
          data = this.rec(elements, data)
        }
      }
      return data
    },
    handleFileSelect(evt) {
      const files = evt.target.files // FileList object

      for (let i = 0; i < files.length; i++) {
        const f = files[i]
        const reader = new FileReader()
        reader.readAsText(f)

        const vm = this
        reader.onload = function () {
          const dpObj = new DOMParser()
          const xmlDoc = dpObj.parseFromString(reader.result, 'text/xml')
          vm.handleXml(xmlDoc)
        }
      }
    },
    exec2main(url) {
      axios
        .get(url, {
          responseType: 'document',
        })
        .then((response) => {
          const xml = response.data
          this.handleXml(xml)
        })
    },
    handleXml(xml) {
      const title = xml.querySelector('title')
      if (title) {
        this.title = title.textContent
      }

      let listWit = xml.querySelector('listWit')
      listWit = this.conv2json(listWit).elements

      if (listWit.length > 0) {
        this.start = true
      } else {
        this.start = false
        return
      }

      for (let i = 0; i < listWit.length; i++) {
        const wit = listWit[i]
        this.witness['#' + wit.attributes['xml:id']] = wit.elements[0].text // wit.attributes["xml:id"];
      }

      // facs

      const facses = xml.querySelectorAll('surfaceGrp')

      for (let i = 0; i < facses.length; i++) {
        const facs = this.conv2json(facses[i])
        const manifest = facs.attributes.facs

        const surfaces = facs.elements
        for (let i = 0; i < surfaces.length; i++) {
          const surface = surfaces[i].elements
          const canvas = surface[0].attributes.n
          for (let j = 1; j < surface.length; j++) {
            const zone = surface[j].attributes
            const id = zone['xml:id']
            const x = Number(zone.ulx)
            const y = Number(zone.uly)
            const w = Number(zone.lrx) - x
            const h = Number(zone.lry) - y
            this.zoneMap['#' + id] = {
              manifest,
              canvas: canvas + '#xywh=' + x + ',' + y + ',' + w + ',' + h,
            }
          }
        }

        if (i === 0) {
          const params = [
            {
              manifest,
            },
          ]

          this.mirador_path =
            miradorPrefix +
            '?params=' +
            encodeURIComponent(JSON.stringify(params)) +
            '&annotationState=on&layout=' +
            this.layout
        }
      }

      // facs 2
      const facs = xml.querySelector('facsimile')
      if (facs) {
        const source = facs.attributes.source
        if (source) {
          const manifest = source.value
          const surfaces = xml.querySelectorAll('surface')
          for (let i = 0; i < surfaces.length; i++) {
            const surface = surfaces[i]
            const canvas = surface.attributes.source.value
            const zone = surface.querySelector('zone')
            const id = zone.attributes['xml:id'].value
            this.zoneMap['#' + id] = {
              manifest,
              canvas,
            }

            if (i === 0) {
              const params = [
                {
                  manifest,
                },
              ]

              this.mirador_path =
                miradorPrefix +
                '?params=' +
                encodeURIComponent(JSON.stringify(params)) +
                '&annotationState=on&layout=' +
                this.layout
            }
          }
        }
      }

      // text

      /** ********** */

      // xmlの読み込みのために必須
      const xmlStr = new XMLSerializer().serializeToString(
        xml.querySelector('body')
      )
      const result = convert.xml2json(xmlStr, { compact: false, spaces: 4 })
      this.data = JSON.parse(result)

      /** ********** */

      let body = xml.querySelector('body')
      body = this.conv2json(body).elements

      const bodyArr = this.rec(body, [])

      const pArr = []

      let rowArr = []

      let index = 1

      for (let i = 0; i < bodyArr.length; i++) {
        const obj = bodyArr[i]
        const name = obj.name
        const type = obj.type
        if (name === 'lb' || name === 'l') {
          pArr.push(rowArr)
          rowArr = []
        } else if (name === 'p') {
          pArr.push(rowArr)
          rowArr = [
            {
              type: 'p',
            },
          ]
          pArr.push(rowArr)
          rowArr = []
        } else if (type === 'text') {
          rowArr.push(obj)
        } else if (name === 'pb' && obj.attributes && obj.attributes.facs) {
          rowArr.push({
            id: obj.attributes.facs,
            type: 'zone',
          })
        } else if (name === 'app') {
          const apps = obj.elements

          // 該当箇所のIIIF対応用データ
          const iiifParam = []
          if (obj.attributes && obj.attributes.facs) {
            const facs = obj.attributes.facs.split(' ')
            for (let i = 0; i < facs.length; i++) {
              const id = facs[i]
              const obj = this.zoneMap[id]
              iiifParam.push(obj)
            }
          }

          // 明示されていないwitを補足
          if (apps[0].name === 'lem') {
            const wits = []
            for (let m = 0; m < apps.length; m++) {
              if (apps[m].attributes) {
                const witsTmp = apps[m].attributes.wit.split(' ')
                for (let l = 0; l < witsTmp.length; l++) {
                  const witTmp = witsTmp[l]
                  if (!wits.includes(witTmp)) {
                    wits.push(witTmp)
                  }
                }
              }
            }

            // err対策
            if (!apps[0].attributes) {
              apps[0].attributes = {}
            }

            const witOther = []

            // リストに上がっているwitnessについて、
            for (const wit in this.witness) {
              // 明示されていない場合に、
              if (!wits.includes(wit)) {
                // 元のwitnessに追加
                witOther.push(wit)
              }
            }

            const appOther = {
              attributes: {
                wit: witOther.join(' '),
              },
              elements: apps[0].elements,
              name: 'other',
            }

            apps[apps.length] = appOther
          }

          // テキスト作成
          let textLem = ''
          for (let i = 0; i < apps.length; i++) {
            let text = ''
            const app = apps[i]
            if (app.elements) {
              const elements = app.elements

              for (let j = 0; j < elements.length; j++) {
                const lemRdg = elements[j]
                if (lemRdg != null) {
                  if (lemRdg.type === 'text') {
                    text += lemRdg.text
                  } else if (lemRdg.name === 'del') {
                    text +=
                      "<del style='color : #990000;'>" +
                      lemRdg.elements[0].text +
                      '</del>'
                  } else if (lemRdg.name === 'add' && lemRdg.elements) {
                    // text += "<span style='border: dotted 1px black;'>" + lemRdg.elements[0].text + "</span>";
                    text +=
                      "<span style='color : green;'>" +
                      lemRdg.elements[0].text +
                      '</span>'
                  } else if (lemRdg.elements && lemRdg.elements[0].text) {
                    text += lemRdg.elements[0].text
                  }
                }
              }
            }

            if (text === '') {
              text += '' // " * ";
            }

            app.text = text

            if (app.name === 'lem') {
              textLem = text
            }
          }

          rowArr.push({
            text: textLem,
            type: 'app',
            app: apps,
            id: 'app_' + i,
            index,
            iiifParam,
          })
          index += 1
        }
      }

      pArr.push(rowArr)

      // -- テーブル用 --

      index = 1

      const all = pArr
      const ibunMap = {}
      for (let i = 0; i < all.length; i++) {
        const objs = all[i]
        for (let j = 0; j < objs.length; j++) {
          const obj = objs[j]
          if (obj.type === 'app') {
            const apps = obj.app

            const test2 = {}

            const containFlg = true

            for (let k = 0; k < apps.length; k++) {
              const app = apps[k]

              let wit = ''
              if (app.attributes) {
                wit = app.attributes.wit
              }

              if (wit !== '') {
                test2[wit] = {
                  text: app.text,
                  type: app.name,
                }
              }
            }

            if (containFlg) {
              ibunMap[obj.id] = {
                index,
                wits: test2,
              }
            }

            index += 1
          }
        }
      }

      this.ibunMap = ibunMap

      // ------------

      this.pArr = pArr
    },
  },
  /*,
  messageLog(message) {
    this.e = message;
  },
  */
}
</script>

<style>
.scroll {
  height: 100%;
  overflow-y: auto;
}

.vertical {
  /* -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: tb-rl; */
  writing-mode: vertical-rl;
}

html,
body,
#app {
  height: 100%;
  margin: 0;
}

.v-btn {
  text-transform: none !important;
}
</style>
