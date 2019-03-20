<template>
  <div class="ebook-title" v-if="visible">
    <div class="left">
      <i class="icon icon-back"></i>
    </div>
    <div class="right">
      <i class="icon icon-shelf"></i>
      <i class="icon icon-cart"></i>
      <i class="icon icon-more"></i>
    </div>
  </div>
</template>

<script>
import { ebookToolMixin } from '../../utils/mixins.js'
export default {
  mixins: [
    ebookToolMixin
  ]
}
</script>

<style lang="less">
@import '../../assets/mixin.less';
.ebook-title {
  position: fixed;
  z-index: 999;
  background-color: #fff;
  top: 0;
  left: 0;
  right: 0;
  .px2rem(height, 60);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .border-1px;
  .left, .right {
    font-size: 0;
    .icon {
      padding: 0 16px;
      .px2rem(font-size, 26);
    }
  }
}
</style>
