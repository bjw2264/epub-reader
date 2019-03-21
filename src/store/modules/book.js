import { 
  SET_FILENAME, 
  CHANGE_FONTSIZEBAR_STATUS, 
  CHANGE_FONTSIZE,
  SET_CURRENT_BOOK,
  CHANGE_FONTFAMILYPOPUP_STATUS,
  CHANGE_FONTFAMILY
} from '../constants'

export default {
  namespaced: true,
  state: {
    filename: '',
    isShowSetFontSizeBar: false,
    fontSizeList: [12, 14, 16, 18, 20, 22, 24],
    currentFontSizeIndex: 2,
    currentBook: null,
    isShowSetFontFamilyPopup: false,
    fontFamilyList: ['微软雅黑', 'Cabin', 'Days One', 'Montserrat', 'Tangerine'],
    currentFontFamilyIndex: 0
  },
  mutations: {
    [SET_FILENAME](state, payload) {
      state.filename = payload
    },
    [SET_CURRENT_BOOK](state, payload) {
      state.currentBook = payload
    },
    [CHANGE_FONTSIZEBAR_STATUS](state) {
      state.isShowSetFontSizeBar = !state.isShowSetFontSizeBar
    },
    [CHANGE_FONTSIZE](state, payload) {
      state.currentFontSizeIndex = payload
    },
    [CHANGE_FONTFAMILYPOPUP_STATUS](state, payload) {
      state.isShowSetFontFamilyPopup = payload
    },
    [CHANGE_FONTFAMILY](state, payload) {
      state.currentFontFamilyIndex = payload
    }
  },
  actions: {
    [SET_FILENAME]({ commit }, payload) {
      return commit(SET_FILENAME, payload)
    },
    [SET_CURRENT_BOOK]({ commit }, payload) {
      return commit(SET_CURRENT_BOOK, payload)
    },
    [CHANGE_FONTSIZEBAR_STATUS]({ commit }) {
      return commit(CHANGE_FONTSIZEBAR_STATUS)
    },
    [CHANGE_FONTSIZE]({ commit }, payload) {
      return commit(CHANGE_FONTSIZE, payload)
    },
    [CHANGE_FONTFAMILYPOPUP_STATUS]({ commit }, payload) {
      return commit(CHANGE_FONTFAMILYPOPUP_STATUS, payload)
    },
    [CHANGE_FONTFAMILY]({ commit }, payload) {
      return commit(CHANGE_FONTFAMILY, payload)
    }
  },
  getters: {
    filename: ({ filename }) => filename,
    isShowSetFontSizeBar: ({ isShowSetFontSizeBar }) => isShowSetFontSizeBar,
    currentFontSizeIndex: ({ currentFontSizeIndex }) => currentFontSizeIndex,
    fontSizeList: ({ fontSizeList }) => fontSizeList,
    currentBook: ({ currentBook }) => currentBook,
    isShowSetFontFamilyPopup: ({ isShowSetFontFamilyPopup }) => isShowSetFontFamilyPopup,
    currentFontFamilyIndex: ({ currentFontFamilyIndex }) => currentFontFamilyIndex,
    fontFamilyList: ({ fontFamilyList }) => fontFamilyList
  }
}
