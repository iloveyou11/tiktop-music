<template>
  <transition name="slide">
    <div class="singer-detail">

    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    // 相当于在vue的实例中挂载了singer这个属性
    ...mapGetters(["singer"])
  },
  created() {
    // console.log(this.singer);
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variables.styl';

.singer-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: $color-background;
}

// 从右向左滑入的动画
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave {
  transform: translate3d(100%, 0, 0);
}
</style>