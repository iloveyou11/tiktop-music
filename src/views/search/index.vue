<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box @query="queryChange"></search-box>
    </div>

    <div
      class="shortcut-wrapper"
      v-show="!query"
    >
      <div class="shortcut">
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li
              class="item"
              v-for="(item, index) in hotkey"
              :key="index"
            >
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
 
    <div
      class="search-result"
      v-show="query"
    >
      <suggest :query="query"></suggest>
    </div>
  </div>
</template>

<script>
import SearchBox from "@/base/search-box";
import Suggest from "@/components/suggest";
import { getHotKey } from "@/api/search";
import { ERR_OK } from "@/api/config";

export default {
  components: {
    SearchBox,
    Suggest
  },
  data() {
    return {
      hotkey: [],
      query: ""
    };
  },
  created() {
    this._getHotKey();
  },
  methods: {
    queryChange(query) {
      this.query = query;
    },
    _getHotKey() {
      getHotKey().then(res => {
        if (res.code === ERR_OK) {
          this.hotkey = res.data.hotkey.slice(0, 10);
        }
      });
    }
  }
};
</script>

<style lang="stylus">
@import '~common/stylus/variables';
@import '~common/stylus/mixin';

.search {
  .search-box-wrapper {
    margin: 20px;
  }

  .shortcut-wrapper {
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;

    .shortcut {
      height: 100%;
      overflow: hidden;

      .hot-key {
        margin: 0 20px 20px 20px;

        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
        }

        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }

      .search-history {
        position: relative;
        margin: 0 20px;

        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          color: $color-text-l;

          .text {
            flex: 1;
          }

          .clear {
            extend-click();

            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
    }
  }

  .search-result {
    position: fixed;
    width: 100%;
    top: 178px;
    bottom: 0;
  }
}
</style>
