<template>
  <div class="ebook-menu" v-if="visible">
    <i class="icon icon-progress"></i>
    <i class="icon icon-bright"></i>
    <i class="icon icon-A"></i>
    <i class="icon icon-menu"></i>
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
