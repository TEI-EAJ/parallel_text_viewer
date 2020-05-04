import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import smoothScroll from "vue-smoothscroll";
import store from './store'
Vue.use(smoothScroll)

import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage)

Vue.config.productionTip = false

const messages = {
  en: {
    title: "TEI Anchor Editor",

    yes : "Yes",
    no : "No",

    add : "Add",
    update : "Update",
    close: "Close",
    import: 'Import',
    export: 'Export',
    change_locale: '日本語',
   
    text_helper : 'Input Text after where the anchor is inserted.',
    id_helper : 'Input text ID which is inserted.',

    confirm_text  : "There is an ongoing data. Do you use it?",

    advanced_option : "Advanced Option",
    json_editor : "JSON Editor",

    edit_dialog : "Edit Dialog",
    confirm_dialog : "Confirm Dialog",

    add_dialog : "Input Dialog",

    left_window : "Left Window",
    right_window : "Right Window",

    divide_err_message : "Error in Input Text.",

    sample : "Example",

    information : "Information",
    settings : "Settings",
  },
  ja: {
    title: "TEI Anchor Editor",

    yes : "はい",
    no : "いいえ",

    add : "追加",
    update : "更新",

    close: "閉じる",
    import: 'インポート',
    export: "エクスポート",
    change_locale: "English",

    text_helper : 'アンカーの挿入箇所より後のテキスト部分を入力してください。',
    id_helper : '挿入対象テキストのIDを入力してください。',

    confirm_text  : "編集中のデータがあります。そのデータを読み込みますか？",

    advanced_option : "高度なオプション",
    json_editor : "JSONエディタ",

    edit_dialog : "編集ダイアログ",
    confirm_dialog : "確認ダイアログ",

    add_dialog : "登録ダイアログ",

    left_window : "左ウインドウ",
    right_window : "右ウインドウ",

    divide_err_message : "入力されたテキストに誤りがあります。",

    sample : "サンプル",

    information : "情報",
    settings : "設定",
  }
}

const i18n = new VueI18n({
  locale: 'ja',
  messages,
})


new Vue({
  store,
  router,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
