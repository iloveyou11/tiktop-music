<template>
  <div id="app">
    <m-header />
    <tab />
    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from "@/components/m-header/m-header";
import Tab from "@/views/tab/tab";
export default {
  components: {
    MHeader,
    Tab
  }
};
</script>

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
