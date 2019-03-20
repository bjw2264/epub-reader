<template>
  <div class="ebook-reader">
    <ebook-title :visible="isShow"></ebook-title>
    <div id="read"></div>
    <ebook-menu :visible="isShow"></ebook-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Epub from 'epubjs'
import { SET_FILENAME } from '../../store/constants.js'
import { baseUrl } from '../../apis'
import EbookTitle from './EbookTitle'
import EbookMenu from './EbookMenu'
export default {
  data() {
    return {
      isShow: false
    }
  },
  components: {
    EbookTitle,
    EbookMenu
  },
  mounted() {
    const { filename } = this.$route.params
    this.setFilename(filename).then(() => {
      this.initEpub()
    })
  },
  methods: {
    ...mapActions('book', {
      setFilename: SET_FILENAME
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
    },
    initEpub() {
      const url = `${baseUrl}${this.filename.split('|').join('/')}.epub`
      // 初始化显示
      this.book = new Epub(url)
      this.renditiion = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight,
        method: 'default'
      })
      this.renditiion.display()
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
    }
  },
  computed: {
    ...mapGetters('book', ['filename'])
  }
}
</script>

<style lang="less">

</style>
