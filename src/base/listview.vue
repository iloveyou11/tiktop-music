<template>
  <scroll
    :data='data'
    class='listview'
    ref="listView"
    :listen-scroll='listenScroll'
    :probe-type="probeType"
    @scroll='scroll'
  >
    <ul>
      <li
        class='list-group'
        v-for='group in data'
        ref='listGroup'
        :key="group.title"
      >
        <h2 class='list-group-title'>{{group.title}}</h2>
        <ul>
          <li
            class='list-group-item'
            v-for='item in group.items'
            :key="item.name"
            @click="selectItem(item)"
          >
            <img
              class="avatar"
              v-lazy="item.avatar"
            >
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="list-shortcut"
      @touchstart.stop.prevent='onShortcutTouchstart'
      @touchmove.stop.prevent='onShortcutTouchmove'
    >
      <ul>
        <li
          v-for='(item,index) in shortcutList'
          :data-index='index'
          class='item'
          :class="{'current':currentIndex===index}"
          :key="index"
        >{{item}}
        </li>
      </ul>
    </div>
    <div
      class="list-fixed"
      ref='fixed'
      v-show='fixedTitle'
    >
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>

    <div
      class="loading-container"
      v-show="!data.length"
    >
      <loading></loading>
    </div>
  </scroll>
</template>


<script>
import Scroll from "@/base/scroll";
import Loading from "@/base/loading";
import { getData } from "@/common/js/dom";
const ANCHOR_HEIGHT = 18;
const TITLE_HEIGHT = 30;

export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      currentIndex: 0,
      scrollY: -1,
      probeType: 3,
      diff: -1
    };
  },
  created() {
    // 作为函数中的共享数据，不放在data中，因为不需要监听数据变化
    this.touch = {};
    this.listenScroll = true;
    this.listHeight = [];
  },
  components: {
    Scroll,
    Loading
  },
  computed: {
    shortcutList() {
      return this.data.map(value => {
        return value.title.substr(0, 1);
      });
    },
    fixedTitle() {
      // 向上滚动不显示
      if (this.scrollY > 0) {
        return "";
      }
      return this.data[this.currentIndex]
        ? this.data[this.currentIndex].title
        : "";
    }
  },
  methods: {
    onShortcutTouchstart(e) {
      let anchorIndex = getData(e.target, "index");
      this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex], 0);
      let firstTouch = e.touches[0];
      this.touch.anchorIndex = anchorIndex;
      this.touch.y1 = firstTouch.pageY;
      this._scrollTo(anchorIndex);
    },
    onShortcutTouchmove(e) {
      let firstTouch = e.touches[0];
      this.touch.y2 = firstTouch.pageY;
      let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0;
      // 注意：这里this.touch.anchorIndex，相加时需要转化为数字（隐藏bug）
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
      this._scrollTo(anchorIndex);
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    selectItem(item) {
      this.$emit("select", item);
    },
    _scrollTo(index) {
      if (!index && index !== 0) return;
      // 处理边界情况
      if (index < 0) index = 0;
      if (index > listHeight.length - 2) index = listHeight.length - 2;

      this.scrollY = -this.listHeight[index];
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
    },
    _calcuHeight() {
      this.listHeight = [];
      const list = this.$refs.listGroup;

      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calcuHeight();
      }, 20);
    },
    scrollY(newY) {
      // 要注意，listHeight总是比列表元素多1个的，因为listHeight是存储上（下）限的数组
      const listHeight = this.listHeight;
      const len = listHeight.length;
      // 1、当滚动到顶部
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }
      // 2、在中间位置盾冬
      for (let i = 0; i < len - 1; i++) {
        let h1 = listHeight[i],
          h2 = listHeight[i + 1];
        if (-newY >= h1 && -newY <= h2) {
          this.currentIndex = i;
          this.diff = h2 + newY;
          return;
        }
      }
      // 3、滚动到底部
      this.currentIndex = len - 2;
    },
    diff(newVal) {
      let fixedTop =
        newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0;

      // 这里是减少DOM操作，未发生改变时不做任何操作
      if (this.fixedTop === fixedTop) return;

      this.fixedTop = fixedTop;
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~common/stylus/variables';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
