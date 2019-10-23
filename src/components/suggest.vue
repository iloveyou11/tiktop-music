<template>
  <scroll
    class="suggest"
    :data="result"
    :pullup="pullup"
    @end="searchMore"
  >
    <ul class="suggest-list">
      <li
        class="suggest-item"
        v-for="(item, index) in result"
        :key="index"
      >
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p
            class="text"
            v-html="getName(item)"
          ></p>
        </div>
      </li>
    </ul>
  </scroll>
</template>

<script>
import { search } from "@/api/search";
import Scroll from "@/base/scroll";
import { ERR_OK } from "@/api/config";
import { filterSinger } from "@/common/js/song";

const TYPE_SINGER = "singer";
const PERPAGE = 20;

export default {
  components: {
    Scroll
  },
  props: {
    query: {
      type: String,
      default: ""
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      result: [],
      pullup: true,
      hasMore: true
    };
  },
  methods: {
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return "icon-mine";
      } else {
        return "icon-music";
      }
    },
    getName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername;
      } else {
        return `${item.songname}-${filterSinger(item.singer)}`;
      }
    },
    searchMore() {
      const song = data.song;
      if (
        !song.list.length ||
        song.curnum + song.curpage * perpage > song.totalnum
      ) {
        this.hasMore = false;
      }
    },
    checkMore() {
      const song = data.song;
      if (
        !song.list.length ||
        song.curnum + song.curpage * perpage > song.totalnum
      ) {
        this.hasMore = false;
      }
    },
    _search() {
      search(this.searchMsg, this.page, this.showSinger, PERPAGE).then(res => {
        if (res.code === ERR_OK) {
          this.result = this._genResult(res.data);
          //  在这里 我们需要检测一下 是否还有更多的项
          this.checkMore(res.data);
        }
      });
    },
    _genResult(data) {
      let ret = [];
      if (data.zhida && data.zhida.singerid) {
        ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } });
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list));
      }
      return ret;
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(musicData => {
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
  },
  watch: {
    query() {
      this._search();
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~common/stylus/variables';
@import '~common/stylus/mixin';

.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    padding: 0 30px;

    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }

    .icon {
      flex: 0 0 30px;
      width: 30px;

      [class^='icon-'] {
        font-size: 14px;
        color: $color-text-d;
      }
    }

    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;

      .text {
        no-wrap();
      }
    }
  }

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
