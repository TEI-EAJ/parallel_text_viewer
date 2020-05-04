import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

  debug: true,

  //state:コンポーネントでいうdata
  state: {
    message: '初期メッセージ',
    lineId: null,
    mainLineId: null,
    subLineId: null,
    dialogFlag : false,
    dialogData : {},
    fullJson: {},
    selectedObj: {}
  },

  //getters:コンポーネントでいうcomputed的なもの
  getters:{
    //messageを使用するgetter
    message(state) {
      return state.message
    },
    lineId(state) {
      return state.lineId
    },
    mainLineId(state) {
      return state.mainLineId
    },
    subLineId(state) {
      return state.subLineId
    },
    dialogFlag(state) {
      return state.dialogFlag
    },
    dialogData(state) {
      return state.dialogData
    },
    fullJson(state) {
      return state.fullJson
    },
    selectedObj(state) {
      return state.selectedObj
    },
  },

  //mutations:コンポーネントでいうmethod（と言うかsetter）
  //stateを唯一変更できるもの
  mutations: {
    //vuexでは引数をpayloadと呼ぶっぽい
    //payloadはオブジェクトにするべき（いっぱい入れれるし）
    setMessage(state, payload){
      state.message = payload.message
    },
    setLineId(state, payload){
      state.lineId = payload.lineId
    },
    setMainLineId(state, payload){
      state.mainLineId = payload.mainLineId
    },
    setSubLineId(state, payload){
      state.subLineId = payload.subLineId
    },
    setDialogFlag(state, payload){
      state.dialogFlag = payload.dialogFlag
    },
    setDialogData(state, payload){
      state.dialogData = payload.dialogData
    },
    setFullJson(state, payload){
      state.fullJson = payload.fullJson
    },
    setSelectedObj(state, payload){
      state.selectedObj = payload.selectedObj
    }
  },

  //actionのコミットを使うことでミューテーションを呼び出す（コンポーネントには無い概念）
  actions: {
    doUpdate({commit}, payload){
      commit('setMessage',{payload})
    },
    setLineId({commit}, lineId){
      commit('setLineId',{lineId})
    },
    setMainLineId({commit}, mainLineId){
      commit('setMainLineId',{mainLineId})
    },
    setSubLineId({commit}, subLineId){
      commit('setSubLineId',{subLineId})
    },
    setDialogFlag({commit}, dialogFlag){
      commit('setDialogFlag',{dialogFlag})
    },
    setDialogData({commit}, dialogData){
      commit('setDialogData',{dialogData})
    },
    setFullJson({commit}, fullJson){
      commit('setFullJson',{fullJson})
    },
    setSelectedObj({commit}, selectedObj){
      commit('setSelectedObj',{selectedObj})
    }
  }
})
export default store