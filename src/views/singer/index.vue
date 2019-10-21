<template>
  <div
    class="singer"
    ref='singer'
  >
    <list-view
      :data="singers"
      ref="list"
      @select="selectSinger"
    ></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getSingerList } from "@/api/singer";
import { ERR_OK } from "@/api/config";
import Singer from "@/common/js/singer";
import listView from "@/base/listview";
import { playlistMixin } from "@/common/js/mixin";

const HOT_NAME = "热门";
const HOT_LENGTH = 10;
export default {
  mixins: [playlistMixin],
  data() {
    return {
      singers: []
    };
  },
  mounted() {
    this._getSinger();
  },
  components: {
    listView
  },
  methods: {
    ...mapMutations({
      setSinger: "SET_SINGER"
    }),
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? "60px" : "";
      this.$refs.singer.style.bottom = bottom;
      this.$refs.list.refresh();
    },
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      });
      this.setSinger(singer);
    },
    _getSinger() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list);
        }
      });
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_LENGTH) {
          map.hot.items.push(
            new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            })
          );
        }
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          })
        );
      });

      // 进行排序 包括“热门”、“a-z”
      // let letterArr = map.filter(item => item.title !== HOT_NAME);
      // letterArr.sort((a, b) => {
      //   return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      // });
      // letterArr.unshift(map.filter(item => item.title === HOT_NAME));
      // return letterArr;
      let charArr = [],
        hotArr = [];
      for (let k in map) {
        if (map[k].title.match(/[a-zA-Z]/)) {
          charArr.push(map[k]);
        } else if (map[k].title === HOT_NAME) {
          hotArr.push(map[k]);
        }
      }
      charArr.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hotArr.concat(charArr);
    }
  }
};
</script>

<style lang="stylus" scoped>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>