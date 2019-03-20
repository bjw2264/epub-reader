<template>
  <div id="app">
    <div class="icon-A a"></div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import initRem from './utils/initRem'
export default {
  mounted() {
    console.log(this)
    this.$store.dispatch('setA',{a:1111})
  }
}
initRem()
</script>

<style lang="less">
@import './assets/mixin.less';
#app {
  font-family: 'Days One';
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.a {
  .px2rem(font-size, 30);
}
</style>
