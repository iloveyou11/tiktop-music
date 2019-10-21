<template>
  <transition name="slide">
    <music-list
      :songs="songs"
      :title="title"
      :bgImage="bgImage"
    ></music-list>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { getSingerDetail } from "@/api/singer.js";
import { ERR_OK } from "@/api/config";
import { createSong } from "@/common/js/song";
import musicList from "@/components/music-list/music-list";

export default {
  data() {
    return {
      songs: []
    };
  },
  components: {
    musicList
  },
  computed: {
    // 相当于在vue的实例中挂载了singer这个属性
    ...mapGetters(["singer"]),
    title() {
      return this.singer.name;
    },
    bgImage() {
      return this.singer.avatar;
    }
  },
  created() {
    this._getDetail();
  },
  methods: {
    _getDetail() {
      // 处理边界情况，如用户刷新详情页面，获取不到id，则自动返回歌手页面
      if (!this.singer.id) {
        this.$router.push("/singer");
        return;
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list);
          // console.log(this.songs);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(item => {
        let { musicData } = item;
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variables.styl';

// 从右向左滑入的动画
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave {
  transform: translate3d(100%, 0, 0);
}
</style>