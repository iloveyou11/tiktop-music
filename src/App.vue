<template>
  <div id="app">
    <m-header />
    <tab />
    <!-- 可以将dom缓存到内存中，不需要重新渲染 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from "@/components/m-header";
import Player from "@/components/player";
import Tab from "@/views/tab";
export default {
  components: {
    MHeader,
    Tab,
    Player
  }
};
</script>
