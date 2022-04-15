export const state = () => ({
  message: '初期メッセージ',
    lineId: null,
    mainLineId: null,
    subLineId: null,
    dialogFlag : false,
    dialogData : {},
    fullJson: {},
    selectedObj: {}
})

export const mutations = {
  setMessage(state, payload){
    state.message = payload
  },
  setLineId(state, payload){
    state.lineId = payload
  },
  setMainLineId(state, payload){
    state.mainLineId = payload
  },
  setSubLineId(state, payload){
    state.subLineId = payload
  },
  setDialogFlag(state, payload){
    state.dialogFlag = payload
  },
  setDialogData(state, payload){
    state.dialogData = payload
  },
  setFullJson(state, payload){
    state.fullJson = payload
  },
  setSelectedObj(state, payload){
    state.selectedObj = payload
  }
}

export const getters = {
  getMessage(state) {
    return state.message
  },
  getLineId(state) {
    return state.lineId
  },
  getMainLineId(state) {
    return state.mainLineId
  },
  getSubLineId(state) {
    return state.subLineId
  },
  getDialogFlag(state) {
    return state.dialogFlag
  },
  getDialogData(state) {
    return state.dialogData
  },
  getFullJson(state) {
    return state.fullJson
  },
  getSelectedObj(state) {
    return state.selectedObj
  },
}
