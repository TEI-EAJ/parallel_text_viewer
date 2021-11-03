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
      <template v-else-if="obj.name == 'teiHeader'">
        <v-sheet :key="key" class="pa-5" color="grey lighten-3">
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
      <template v-else-if="(obj.name == 'eaj:ruby') || (obj.attributes && obj.attributes.type == 'ruby')">
        <ruby :key="key">
          <Hello
            :elements="obj.elements[0].elements"
          ></Hello>
          <rt>{{obj.elements[2].elements[0].text}}</rt>
        </ruby>
      </template>
      <template
        v-else-if="obj.name == 'persName' || 
        obj.name == 'placeName' || 
        obj.name == 'name' || 
        obj.name == 'rs' ||
        obj.name == 'speaker'
        "
      >
        <span
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
      <template v-else-if="obj.name != 'figure'">
        <span :class="'tei-'+obj.name" :key="key">
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
    let elements = this.elements;
    for (let i = 0; i < elements.length; i++) {
      let obj = elements[i];
      obj.id = uuid.v1();
    }
  },
  methods: {
    messageLog(dat) {
      this.$emit("parentMessage", dat);
    },
    style(dat) {
      let color = "0,0,255"; //blue
      if (dat == "persName" || dat == "rs") {
        color = "0,255,0"; //green
      } else if (dat == "placeName") {
        color = "255,0,0"; //red
      }
      return "background-color : rgba(" + color + ", 0.2);";
    }
  }
};
</script>