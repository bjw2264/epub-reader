import Vue from 'vue'
import VueI18N from 'vue-i18n'

import { getLang, setLang } from '../utils/localStorage'

import cn from './cn'
import en from './en'

Vue.use(VueI18N)

const messages = {
  cn,
  en
}

let locale = getLang()
if (!locale) {
  locale = 'cn'
  setLang(locale)
}

export default new VueI18N({
  locale,
  messages
})
