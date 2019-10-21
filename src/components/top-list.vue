<template>
  <transition name='slide'>
    <music-list
      :title="title"
      :bg-image="bgImage"
      :songs='songs'
      :rank="rank"
    ></music-list>
  </transition>
</template>

<script>
import MusicList from "@/components/music-list";
import { mapGetters } from "vuex";
import { getTopMusicList } from "@/api/rank";
import { ERR_OK } from "@/api/config";
import { createSong } from "@/common/js/song";

export default {
  components: {
    MusicList
  },
  data() {
    return {
      songs: [],
      rank: true
    };
  },
  created() {
    this._getTopList();
  },
  methods: {
    _getTopList() {
      if (!this.topList.id) {
        this.$router.push("/rank");
        return;
      }
      getTopMusicList(this.topList.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.songlist);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(musicData => {
        if (musicData.data.songid && musicData.data.albummid) {
          ret.push(createSong(musicData.data));
        }
      });
      return ret;
    }
  },
  computed: {
    title() {
      return this.topList.topTitle;
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image;
      }
      return "";
    },
    ...mapGetters(["topList"])
  }
};
</script>

<style scoped lang="stylus">
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
