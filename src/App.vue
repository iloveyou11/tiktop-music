<template>
  <div id="app">
    <m-header />
    <tab />
    <!-- 可以将dom缓存到内存中，不需要重新渲染 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
