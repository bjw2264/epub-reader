<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import initRem from './utils/initRem'
export default {}
initRem()
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
}
</style>
