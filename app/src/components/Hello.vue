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
            v-on:parentMessage="messageLog"
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
          <Hello
            v-on:parentMessage="messageLog"
            :key="key"
            v-if="obj.elements"
            :elements="obj.elements"
            :parent="obj.name"
          ></Hello>
        </v-sheet>
      </template>
      <template v-else-if="obj.name == 'title'">
        <h2 :key="key" class="my-5">
          <Hello
            v-on:parentMessage="messageLog"
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
              @click="parent != 'person' && parent != 'respStmt' ? $emit('parentMessage', obj) : ''"
              :id="obj.id"
            >
              <Hello
                v-on:parentMessage="messageLog"
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
              v-on:parentMessage="messageLog"
              :key="key"
              v-if="obj.elements"
              :elements="obj.elements"
              :parent="obj.name"
            ></Hello>
          </span>
      </template>

      <template v-else-if="obj.name != 'figure'">
        <span :class="'tei-'+obj.name" :key="key">
          <span
            v-if="obj.attributes && obj.attributes.facs && obj.attributes.facs.startsWith('#')"
            @click="$emit('parentMessage', obj)"
          >
          <img
              src="https://iiif.dl.itc.u-tokyo.ac.jp/images/iiif.png"
              style="width: 30px"
              class="mr-2"
            />
          </span>
          <Hello
            v-on:parentMessage="messageLog"
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
import { uuid } from "vue-uuid";

export default {
  name: "Hello",
  props: ["elements", "flg", "parent"],
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  /*
  watch: {
    elements: function() {
      this.init();
    }
  },
  */
  methods: {
    init() {
      let elements = this.elements;
      if (elements != null) {
        for (let i = 0; i < elements.length; i++) {
          let obj = elements[i];
          obj.id = uuid.v1();
        }
      }
    },
    messageLog(dat) {
      this.$emit("parentMessage", dat);
    },
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
      console.log("color", color)
      return "" //"background-color : rgba(" + color + ", 0.2);";
    }
  }
};
</script>