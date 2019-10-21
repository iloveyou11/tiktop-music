<template>
  <div
    class="progress-bar"
    ref="progressBar"
    @click="progressClick"
  >
    <div class="bar-inner">
      <div
        class="progress"
        ref="progress"
      ></div>
      <div
        class="progress-btn-wrapper"
        ref="progressBtn"
        @touchstart.prevent="touchstart"
        @touchmove.prevent="touchmove"
        @touchend.prevent="touchend"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getfixStyle } from "@/common/js/dom";
const transform = getfixStyle("transform");
const BTN_WIDTH = 16;

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.touch = {};
  },
  methods: {
    touchstart(e) {
      this.touch.initiated = true;
      this.touch.startX = e.touches[0].pageX;
      this.touch.left = this.$refs.progress.clientWidth;
    },
    touchmove(e) {
      if (!this.touch.initiated) return;
      const delta = e.touches[0].pageX - this.touch.startX;
      const offsetWidth = Math.min(
        Math.max(0, this.touch.left + delta),
        this.$refs.progressBar.clientWidth - BTN_WIDTH
      );
      this._offset(offsetWidth);
      this._triggerPercent();
    },
    touchend(e) {
      this.touch.initiated = false;
    },
    progressClick(e) {
      this._offset(e.offsetX);
      this._triggerPercent();
    },
    _offset(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`;
      this.$refs.progressBtn.style[
        transform
      ] = `translate3d(${offsetWidth},0,0)`;
    },
    _triggerPercent() {
      const percent = this.$refs.progress.clientWidth / this.barWidth;
      this.$emit("percentChange", percent);
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth - BTN_WIDTH;
        const offsetWidth = newPercent * this.barWidth;
        this._offset(offsetWidth);
      }
    }
  }
};
</script>


<style scoped lang="stylus">
@import '~common/stylus/variables';

.progress-bar {
  height: 30px;

  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);

    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;

      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>
