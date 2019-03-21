import Storage from 'web-storage-cache'

const FONTFAMILY_KEY = 'fontFamily'
const FONTSIZE_KEY = 'fontSize'
const LANGUAGE_KEY = 'lang'

const localStorage = new Storage()

export const getCache = key => {
  return localStorage.get(key)
}

export const setCache = (key, value) => {
  return localStorage.set(key, value)
}

export const removeCache = key => {
  return localStorage.delete(key)
}

export const clearCache = () => {
  return localStorage.clear()
}

export const setBookInfo = (filename, key, value) => {
  let book = getCache(`${filename}-info`)
  if (!book) {
    book = {}
  }
  book[key] = value
  return setCache(`${filename}-info`, book)
}

export const getBookInfo = (filename, key) => {
  let book = getCache(`${filename}-info`)
  if (book) {
    return book[key]
  } else {
    return null
  }
}

export const setFontFamily = (filename, font) => {
  return setBookInfo(filename, FONTFAMILY_KEY, font)
}

export const getFontFamily = filename => {
  return getBookInfo(filename, FONTFAMILY_KEY)
}

export const setFontSize = (filename, size) => {
  return setBookInfo(filename, FONTSIZE_KEY, size)
}

export const getFontSize = filename => {
  return getBookInfo(filename, FONTSIZE_KEY)
}

export const setLang = value => {
  return setCache(LANGUAGE_KEY, value)
}

export const getLang = () => {
  return getCache(LANGUAGE_KEY)
}
