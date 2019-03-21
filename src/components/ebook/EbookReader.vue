<template>
  <div class="ebook-reader">
    <ebook-title :visible="isShow"></ebook-title>
    <div id="read"></div>
    <ebook-menu :visible="isShow"></ebook-menu>
    <ebook-font-family-popup></ebook-font-family-popup>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Epub from 'epubjs'
import { 
  SET_FILENAME, 
  CHANGE_FONTSIZEBAR_STATUS, 
  SET_CURRENT_BOOK, 
  CHANGE_FONTFAMILYPOPUP_STATUS, 
  CHANGE_FONTFAMILY,
  CHANGE_FONTSIZE
} from '../../store/constants.js'
import EbookTitle from './EbookTitle'
import EbookMenu from './EbookMenu'
import EbookFontFamilyPopup from './EbookFontFamilyPopup'
import { getFontFamily, setFontFamily, getFontSize, setFontSize } from '../../utils/localStorage.js'
export default {
  data() {
    return {
      isShow: false
    }
  },
  components: {
    EbookTitle,
    EbookMenu,
    EbookFontFamilyPopup
  },
  mounted() {
    const { filename } = this.$route.params
    this.setFilename(filename).then(() => {
      this.initEpub()
      this.setCurrentBook(this.renditiion)
    })
  },
  methods: {
    ...mapActions('book', {
      setFilename: SET_FILENAME,
      changeFontSizeBarVisible: CHANGE_FONTSIZEBAR_STATUS,
      setCurrentBook: SET_CURRENT_BOOK,
      changeFontFamilyPopup: CHANGE_FONTFAMILYPOPUP_STATUS,
      changeFontFamily: CHANGE_FONTFAMILY,
      changeFontSize: CHANGE_FONTSIZE
    }),
    prev() {
      this.renditiion && this.renditiion.prev()
      this.isShow && this.toggleMenu()
    },
    next() {
      this.renditiion && this.renditiion.next()
      this.isShow && this.toggleMenu()
    },
    toggleMenu() {
      this.isShow = !this.isShow
      if (!this.isShow && this.isShowSetFontSizeBar) {
        this.changeFontSizeBarVisible()
      }
      if (!this.isShow && this.isShowSetFontFamilyPopup) {
        this.changeFontFamilyPopup(false)
      }
    },
    initEpub() {
      const url = `${process.env.VUE_APP_BASE_URL}/epub/${this.filename.split('|').join('/')}.epub`
      // 初始化显示
      this.book = new Epub(url)
      this.renditiion = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight,
        method: 'default'
      })
      this.renditiion.display().then(res => {
        const font = getFontFamily(this.filename)
        const size = getFontSize(this.filename)
        if (!font) {
          setFontFamily(this.filename, this.fontFamilyList[this.currentFontFamilyIndex])
        } else {
          this.renditiion.themes.font(font)
          this.changeFontFamily(this.fontFamilyList.indexOf(font))
        }
        if (!size) {
          setFontSize(this.filename, this.fontSizeList[this.currentFontSizeIndex])
        } else {
          this.renditiion.themes.fontSize(size)
          this.changeFontSize(this.fontSizeList.indexOf(size))
        }
      })
      // 绑定事件
      this.renditiion.on('touchstart', e => {
        this.startX = e.changedTouches[0].pageX
        this.startTime = e.timeStamp
      })
      this.renditiion.on('touchend', e => {
        e.stopPropagation()
        const offsetX = e.changedTouches[0].pageX - this.startX
        const deferTime = e.timeStamp - this.startTime
        if (offsetX < -50 && deferTime < 500) {
          this.next()
        } else if (offsetX > 50 && deferTime < 500) {
          this.prev()
        } else {
          this.toggleMenu()
        }
      })
      this.renditiion.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_BASE_URL}/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_BASE_URL}/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_BASE_URL}/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_BASE_URL}/fonts/tangerine.css`)
        ]).then(res => {
          console.log('字体加载完成')
        })
      })
    }
  },
  computed: {
    ...mapGetters(
      'book', 
      [
        'filename', 
        'isShowSetFontSizeBar', 
        'currentBook', 
        'isShowSetFontFamilyPopup',
        'fontFamilyList',
        'currentFontFamilyIndex',
        'fontSizeList',
        'currentFontSizeIndex'
      ]
    )
  }
}
</script>

<style lang="less">

</style>
