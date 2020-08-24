<template>
  <span>
    <template v-for="(obj, key) in elements">
      <template v-if="obj.text">
        <span :key="key">{{obj.text}}</span>
      </template>
      <template
        v-else-if="obj.name == 'p' || 
        obj.name == 'head' || 
        obj.name == 'ab' || 
        obj.name == 'list' || 
        obj.name == 'listPerson' || 
        obj.name == 'item' || 
        obj.name == 'person'"
      >
        <span :class="'tei-'+obj.name" class="my-5" :key="key">
          <Hello
            :key="key"
            v-if="obj.elements"
            :elements="obj.elements"
            :parent="obj.name"
          ></Hello>
        </span>
      </template>
      <template v-else-if="obj.name == 'date'">
        <v-tooltip bottom :key="key">
          <template v-slot:activator="{ on }">
            <span v-on="on" :style="style(obj.name)">
              <Hello :key="key" v-if="obj.elements" :elements="obj.elements" :parent="obj.name"></Hello>
            </span>
          </template>
          <span>{{obj.attributes}}</span>
        </v-tooltip>
      </template>
      <template v-else-if="obj.name == 'teiHeader'">
        <v-sheet :key="key" class="pa-5 ma-5" color="grey lighten-3">
          <small>
          <Hello
            :key="key"
            v-if="obj.elements"
            :elements="obj.elements"
            :parent="obj.name"
          ></Hello>
          </small>
        </v-sheet>
      </template>
      <template v-else-if="obj.name == 'title'">
        <h2 :key="key" class="my-5">
          <Hello
            :key="key"
            v-if="obj.elements"
            :elements="obj.elements"
            :parent="obj.name"
          ></Hello>
        </h2>
      </template>
      <template
        v-else-if="(obj.name == 'eaj:ruby') || (obj.attributes && obj.attributes.type == 'ruby')"
      >
        <ruby :key="key">
          <Hello :elements="obj.elements[0].elements"></Hello>
          <rt>{{obj.elements[2].elements[0].text}}</rt>
        </ruby>
      </template>
      <template
        v-else-if="obj.name == 'persName' || 
        obj.name == 'placeName' || 
        obj.name == 'name' || 
        obj.name == 'rs' ||
        obj.name == 'speaker' || 
        obj.name == 'bibl'
        "
      >
        <v-tooltip bottom :key="key">
          <template v-slot:activator="{ on }">
            <span
              v-on="obj.attributes ? on : null"
              :class="'tei-'+obj.name"
              :key="key"
              :style="parent != 'person' && parent != 'respStmt' ? style(obj.name) : 'margin-right : 10px; margin-left : 10px;'"
              :id="obj.id"
            >
              <Hello
                :key="key"
                v-if="obj.elements"
                :elements="obj.elements"
                :parent="obj.name"
              ></Hello>
            </span>
          </template>
          <span>{{obj.attributes}}</span>
        </v-tooltip>
      </template>

      <!-- 青空自動TEI用 -->
      <template v-else-if="obj.name == 'seg' && obj.attributes && obj.attributes.rendition">
          <span :class="'tei-'+obj.attributes.rendition" :style="obj.attributes.style" :key="key">
            <Hello
              
              :key="key"
              v-if="obj.elements"
              :elements="obj.elements"
              :parent="obj.name"
            ></Hello>
          </span>
      </template>

      <!-- Main @click="anchorClick(obj)" -->

      <!-- アンカー -->
      <template v-else-if="obj.name == 'anchor'">
        <span :key="key" 
        :id="'anchor-'+getAnchorId(obj)"
        @click="anchorClick(getAnchorId(obj))" dark
        v-on:mouseover="mouseover(getAnchorId(obj))" :style="getAnchorId(obj) === lineId ? 'background-color : rgba(255,165,0, 0.5);' : ''"
        >
          <v-icon small color="blue darken-2">mdi-anchor</v-icon>
        </span>
      </template>

      <!-- Main画面の編集ボタンつきのLine -->
      <template v-else-if="obj.name == 'seg' && obj.attributes.corresp">
        <span :key="key">

          <!-- 
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon color="primary" 
              @click="editBtnClick(obj)" dark v-on="on"
              class="mb-5"
              >
              <v-icon>mdi-tooltip-edit</v-icon>
            </v-btn>
            </template>
            {{obj.attributes.corresp}}
          </v-tooltip>
          -->
          
          <span :class="'tei-'+obj.name">
            <Hello
              :key="key"
              v-if="obj.elements"
              :elements="obj.elements"
              :parent="obj.name"
            ></Hello>
          </span>
        </span>
      </template>

      <!-- サブ画面のIDつきのライン -->
      <template v-else-if="obj.name == 's'">
        <component :is="childDiv(obj) == 'div' ? 'div' : 'span'" :key="key" :style="obj.attributes['xml:id'] === lineId ? 'background-color : rgba(255,165,0, 0.5);' : ''"
        v-on:mouseover="mouseover(obj.attributes['xml:id'])" @click="selectSub(obj.attributes['xml:id'])"
        >
          <!-- 
          <span :id="'line-'+obj.attributes['xml:id']" style="color : #1976D2;" :style="obj.attributes['xml:id'] === subLineId ? 'color : #ff5252;' : ''">{{obj.attributes["xml:id"]}}</span>
          -->

          <span :class="'tei-'+obj.name" >
            <Hello
              :id="'line-'+obj.attributes['xml:id']"
              :key="key"
              v-if="obj.elements"
              :elements="obj.elements"
              :parent="obj.name"
            ></Hello>
          </span>
        </component>
      </template>

      <template v-else-if="obj.name != 'figure'">
        <span :class="'tei-'+obj.name" :key="key">
          <span
            v-if="obj.attributes && obj.attributes.facs && obj.attributes.facs.startsWith('#')"
            @click="selectManifest(obj)"
          >
          <img
              src="https://iiif.dl.itc.u-tokyo.ac.jp/images/iiif.png"
              style="width: 30px"
              class="mr-2"
            />
          </span>
          <Hello
            :key="key"
            v-if="obj.elements"
            :elements="obj.elements"
            :parent="obj.name"
          ></Hello>
        </span>
      </template>
    </template>
  </span>
</template>

<script>

export default {
  name: "Hello",
  props: ["elements", "parent"], //parentは表示対策
  computed: {
    lineId : {
      get() { return this.$store.getters.lineId}
    },
    subLineId : {
      get() { return this.$store.getters.subLineId}
    }
  },
  methods: {
    style(dat) {
      let color = "0,0,255"; //blue
      if (dat == "persName" || dat == "rs") {
        color = "0,255,0"; //green
      } else if (dat == "placeName") {
        color = "255,0,0"; //red
      } else if (dat == "date") {
        color = "255,165,0"; //
      } else if (dat == "bibl") {
        color = "128,0,128"; //
      }
      return "background-color : rgba(" + color + ", 0.2);";
    },
    mouseover: function(line_id){
      this.highlight_line = line_id
      this.$store.dispatch("setLineId", line_id)
    },
    selectSub: function(line_id){
      this.$store.dispatch("setSubLineId", line_id)
    },
    editBtnClick: function(obj){
      this.$store.dispatch("setDialogFlag", true)
      this.$store.dispatch("setDialogData", obj)
    },
    anchorClick: function(mainLineId){
      this.$store.dispatch("setMainLineId", mainLineId)
    },
    childDiv: function(obj){
      if(!obj.elements[0].attributes){
        return null
      } else {
        if(obj.elements[0].attributes.rendition == "div"){
          return "div"
        } else {
          return "span"
        } 
      }
    },
    getAnchorId(obj){
      let tmp = obj.attributes['corresp'].split('#')
      if(tmp.length == 2){
        return tmp[1]
      } else if(tmp.length == 1){
        return tmp[0]
      } else {
        return null
      }
    },
    selectManifest: function(obj){
      this.$store.dispatch("setSelectedObj", obj)
    }
  }
};
</script>