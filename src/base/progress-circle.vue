<template>
  <div class="progress-circle">
    <!-- width、height采用外部传入的形式，使组件的可复用性更强 -->
    <!-- viewBox为绘制大小，能很好地使用外部地实际长度 -->
    <svg
      :width='diameter'
      :height='diameter'
      viewBox='0 0 100 100'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
    >
      <!-- 外层圆 -->
      <circle
        class='progress-background'
        r='50'
        cx='50'
        cy='50'
        fill='transparent'
      ></circle>
      <!-- 内层圆，表示进度-->
      <!-- stroke-dasharray属性用来设置描边的点划线的图案范式。就是设置实线和虚线的宽度
      stroke-dashoffset则指定了dash模式到路径开始的距离，就是实线虚线绘制的起点距路径开始的距离 -->
      <circle
        class='progress-bar'
        r='50'
        cx='50'
        cy='50'
        fill='transparent'
        :stroke-dasharray='dashArray'
        :stroke-dashoffset='dashOffset'
      ></circle>
    </svg>
    <!--资料文档 http://www.w3cplus.com/svg/svg-fill-stroke.html  -->
    <slot></slot>
  </div>
</template>

<script>
/*
   stroke-dasharray 是用于设置虚线的属性。你可以使用它来设置每条划线长度以及划线之间空格的大
   第一个值是划线的长度，第二个值是各个划线之间的空格大小。如果你只设置了一个值（如上面的最后一个示例），它会默认设置相同划线长度和划线空格。
   stroke-dashoffset 它可以让你设置需要图案延迟绘制的距离。它可以接受任何单位的值，同样的，如果使用的是百分比，就是相对于当前视图的百分比。
   */
export default {
  props: {
    diameter: {
      type: Number,
      default: 32
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dashArray: Math.PI * 100
    };
  },
  computed: {
    // percent为0时，dashOffset为this.dashArray
    // percent为100时，dashOffset为0
    dashOffset() {
      return (1 - this.percent) * this.dashArray;
    }
  }
};
</script>


<style scoped lang="stylus">
@import '~common/stylus/variables';

.progress-circle {
  position: relative;

  circle {
    stroke-width: 8px;
    transform-origin: center;

    &.progress-background {
      transform: scale(0.9);
      stroke: $color-theme-d;
    }

    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: $color-theme;
    }
  }
}
</style>
