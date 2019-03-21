<template>
  <div class="ebook-font-family-popup" v-if="isShowSetFontFamilyPopup">
    <div class="header">
      <i class="icon-down2" @click="changeFontFamilyPopup(false)"></i>
      <span>{{ $t('book.selectFont') }}</span>
    </div>
    <div class="content">
      <div class="item" v-for="(item, idx) in fontFamilyList" :key="item" @click="changeFontFamily(idx)">
        <span class="text" :class="{active: active(idx)}">{{ item }}</span>
        <i class="icon-check" :class="{active: active(idx)}"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { CHANGE_FONTFAMILYPOPUP_STATUS, CHANGE_FONTFAMILY } from '../../store/constants.js'
import { setFontFamily } from '../../utils/localStorage.js'
export default {
  methods: {
    ...mapActions('book', {
      changeFontFamilyPopup: CHANGE_FONTFAMILYPOPUP_STATUS,
      changeFontFamily: CHANGE_FONTFAMILY
    }),
    active(index) {
      return index === this.currentFontFamilyIndex
    }
  },
  computed: {
    ...mapGetters('book', ['filename', 'isShowSetFontFamilyPopup', 'currentFontFamilyIndex', 'fontFamilyList', 'currentBook'])
  },
  watch: {
    currentFontFamilyIndex(newIndex, oldIndex) {
      // console.log(this.fontFamilyList[newIndex])
      this.currentBook.themes.font(this.fontFamilyList[newIndex])
      setFontFamily(this.filename, this.fontFamilyList[newIndex])
    }
  }
}
</script>

<style lang="less">
@import '../../assets/mixin.less';
.ebook-font-family-popup {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(194, 228, 102);
  z-index: 1000;
  min-height: 180px;
  .header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    .border-1px;
    .px2rem(font-size, 18);
    .icon-down2 {
      position: absolute;
      .px2rem(left, 0);
      padding: 0 20px;
    }
  }
  .content {
    .px2rem(font-size, 16);
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      .active {
        font-weight: 700;
        color: blueviolet;
      }
      .icon-check {
        display: none;
        &.active {
          display: block;
          
        }
      }
    }
  }
}
</style>
