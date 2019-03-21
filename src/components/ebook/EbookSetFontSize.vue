<template>
  <div class="ebook-set-font-size-wrapper" v-if="isShowSetFontSizeBar">
    <div class="ebook-set-font-size">
      <i class="icon-A"></i>
      <div class="ruler">
        <span class="font-item" @click="changeFontSize(0)"></span>
        <span class="font-item" @click="changeFontSize(1)"></span>
        <span class="font-item" @click="changeFontSize(2)"></span>
        <span class="font-item" @click="changeFontSize(3)"></span>
        <span class="font-item" @click="changeFontSize(4)"></span>
        <span class="font-item" @click="changeFontSize(5)"></span>
        <span class="font-item" @click="changeFontSize(6)"></span>
        <i class="dot" :style="{left:`${left*10/375}rem`}"></i>
      </div>
      <i class="icon-A"></i>
    </div>
    <div class="font-family" @click="changeFontFamilyPopup(true)">
      <span class="font-name">{{ fontFamilyList[currentFontFamilyIndex] }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { CHANGE_FONTSIZE, CHANGE_FONTFAMILYPOPUP_STATUS } from '../../store/constants.js'
import { setFontSize } from '../../utils/localStorage.js'
export default {
  data() {
    return {
      rulerItemWidth: 40,
      halfDotWidth: 8
    }
  },
  methods: {
    ...mapActions('book', {
      changeFontSize: CHANGE_FONTSIZE,
      changeFontFamilyPopup: CHANGE_FONTFAMILYPOPUP_STATUS
    })
  },
  computed: {
    ...mapGetters(
      'book', 
      [
        'isShowSetFontSizeBar', 
        'currentFontSizeIndex', 
        'currentBook', 
        'fontSizeList',
        'currentFontFamilyIndex',
        'fontFamilyList',
        'filename'
      ]
    ),
    left() {
      return this.rulerItemWidth * this.currentFontSizeIndex - this.halfDotWidth
    }
  },
  watch: {
    currentFontSizeIndex(newIndex, oldIndex) {
      // console.log(newIndex, oldIndex)
      this.currentBook.themes.fontSize(this.fontSizeList[newIndex])
      setFontSize(this.filename, this.fontSizeList[newIndex])
    }
  }
}
</script>

<style lang="less">
@import '../../assets/mixin.less';
.ebook-set-font-size-wrapper {
  position: absolute;
  .border-1px;
  &::after {
    top: 0;
  }
  left: 0;
  right: 0;
  background-color: #fff;
  .px2rem(bottom, 60);
  .ebook-set-font-size {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    .icon-A {
      &:first-of-type {
        color: #ccc;
        .px2rem(font-size, 16);
      }
      &:last-of-type {
        color: #666;
        .px2rem(font-size, 26);
      }
    }
    .ruler {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .font-item {
        position: relative;
        display: block;
        .px2rem(height, 10);
        .px2rem(width, 40);
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          .px2rem(height, 6);
          .px2rem(width, 1);
          background-color: #ccc;
        }
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
          .px2rem(height, 1);
          .px2rem(width, 40);
          background-color: #ccc;
        }
        &:first-of-type {
          .px2rem(width, 20);
          &::before {
            left: 0;
          }
          &::after {
            .px2rem(width, 20);
          }
        }
        &:last-of-type {
          .px2rem(width, 20);
          &::before {
            left: 100%;
          }
          &::after {
            .px2rem(width, 20);
          }
        }
      }
      .dot {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        .px2rem(width, 16);
        .px2rem(height, 16);
        position: absolute;
        background-color: #fff;
        .px2rem(border-radius, 8);
        border: 1px solid #ccc;
        &::after {
          content: "";
          display: block;
          .px2rem(width, 4);
          .px2rem(height, 4);
          background-color: #333;
          border-radius: 52%;
        }
      }
    }
  }
  .font-family {
    text-align: center;
    padding: 10px 0 20px;
    .px2rem(font-size, 16);
  }
}
</style>
