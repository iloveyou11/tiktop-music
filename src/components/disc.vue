<template>
  <transition name='slide'>
    <music-list
      :title="title"
      :bg-image="bgImage"
      :songs="songs"
    ></music-list>
  </transition>
</template>

<script>
import MusicList from "@/components/music-list";
import { mapGetters } from "vuex";
import { getSongList } from "@/api/recommend";
import { createSong } from "@/common/js/song";

export default {
  props: {},
  components: {
    MusicList
  },
  data() {
    return {
      songs: []
    };
  },
  created() {
    this._getSongListDetail();
  },
  computed: {
    title() {
      return this.disc.dissname;
    },
    bgImage() {
      return this.disc.imgurl;
    },
    ...mapGetters(["disc"])
  },
  methods: {
    _getSongListDetail() {
      if (!this.disc.dissid) {
        this.$router.push("/recommend");
        return;
      }
      getSongList(this.disc.dissid).then(res => {
        if (res.code === 0) {
          this.songs = this._normalizeSongs(res.cdlis[0].songlist);
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

<style scoped lang="stylus">
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
