<template>
  <div class="ebook-menu" v-if="visible">
    <i class="icon icon-progress"></i>
    <i class="icon icon-bright"></i>
    <i class="icon icon-A" @click="changeFontSizeBarVisible"></i>
    <i class="icon icon-menu"></i>
    <ebook-set-font-size></ebook-set-font-size>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { ebookToolMixin } from '../../utils/mixins.js'
import EbookSetFontSize from './EbookSetFontSize'
import { CHANGE_FONTSIZEBAR_STATUS } from '../../store/constants.js'
export default {
  mixins: [
    ebookToolMixin
  ],
  components: {
    EbookSetFontSize
  },
  methods: {
    ...mapActions('book', {
      changeFontSizeBarVisible: CHANGE_FONTSIZEBAR_STATUS
    })
  }
}
</script>

<style lang="less">
@import '../../assets/mixin.less';
.ebook-menu {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  .border-1px;
  &::after {
    top: 0;
  }
  background-color: #fff;
  .px2rem(height, 60);
  display: flex;
  justify-content: space-around;
  align-items: center;
  .icon {
    padding: 0 16px;
    .px2rem(font-size, 26);
    color: darkslategrey;
  }
}
</style>
