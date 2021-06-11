<template>
  <div>
    <div class="get__map__container" @click="close()"></div>
    <div class="get__map">
      <div class="map_title__box">
        <div class="get">{{ lang.get_treasure_map }}</div>
        <div class="map_title_right">
          <div class="title">{{ lang.treasure_map }}</div>
          <img src="../img/map.png" />
          <div class="colon">:</div>
          <div class="num">
            {{actInfo.mapCount}}
          </div>
        </div>
      </div>
      <ul class="tabs">
        <li
          v-for="item in list"
          :key="item"
          @click="handleTab(item)"
          :class="{ tab_select: index == item }"
        >
          {{ lang.map_num.replace("%s", item) }}
        </li>
      </ul>
      <div @click="handleGetMap" class="btn">{{ lang.get_map }}</div>
      <div class="btn__des">
        {{ lang.get_map_des.replace("{0}", actInfo.mapPrice * index).replace("{1}", index) }}
      </div>
      <div class="store__box">
        <img src="../img/coin.png" />
        <span class="num">{{actInfo.coins}}</span>
        <span @click="goStore" class="title">{{ lang.store }}</span>
        <span @click="goStore" class="arrow_right">></span>
      </div>
    </div>
  </div>
</template>
<script>
import callApp from '../utils/callApp'
import { mapState } from "vuex";
import { toast } from '../utils';
import { gainMap } from '../apis'
export default {
  computed: {
    lang: () => _lang,
    ...mapState([
      "actInfo"
    ])
  },

  props:{
    visible: {
      type: Boolean
    }
  },

  data() {
    return {
      list: [1, 10, 100],
      index: 1,
    };
  },

  methods: {
    handleTab(tab) {
      this.index = tab;
    },

    async handleGetMap () {
      if (this.actInfo.coins < this.index * this.actInfo.mapPrice) {
        toast(this.lang.coins_not_enough)
        return
      }
      const res = await gainMap({num: this.index});
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (response_status && response_status.error === "") {
          toast(this.lang.get_map_succ)
          this.$store.commit('changeMapCount', this.index)
          this.$store.commit('changeCoins', this.index * this.actInfo.mapPrice)
        } else if (response_status.error) {
          toast(response_status.error.replace(/\[\d+\]$/, ''));
        }
      }
    },

    goStore () {
      callApp.wallet()
    },

    close () {
      this.$emit('update:visible', false)
    }
  },
};
</script>
<style lang="scss">
.get__map__container {
  width: 100%;
  height: 9.3rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}
.get__map {
  width: 7.5rem;
  height: 4.22rem;
  background: #ffffff;
  border-radius: 0.3rem 0.3rem 0 0;
  position: absolute;
  bottom: 0;
  z-index: 200;
  box-sizing: border-box;
  .map_title__box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.3rem;
    height: 0.5rem;
    line-height: 0.5rem;
    .get {
      font-size: 0.36rem;
      font-weight: 400;
      color: #333333;
    }
    .map_title_right {
      display: flex;
      align-items: center;
      font-size: 0.24rem;
      font-weight: 400;
      color: #333333;
      img {
        width: 0.3rem;
        height: 0.3rem;
        margin-left: 0.1rem;
      }
      .colon {
        margin-left: 0.1rem;
        margin-right: 0.1rem;
      }
    }
  }

  .tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    li {
      width: 2rem;
      height: 0.58rem;
      border: 0.02rem solid #e5e5e5;
      opacity: 1;
      border-radius: 0.29rem;
      font-size: 0.32rem;
      font-weight: 400;
      color: #999999;
      text-align: center;
      line-height: 0.58rem;
      margin-left: 0.15rem;
      margin-right: 0.15rem;
    }
    .tab_select {
      border: 0.02rem solid #7a68f8;
      color: #7a68f8;
    }
  }

  .btn {
    width: 6.1rem;
    height: 0.88rem;
    background: #7a68f8;
    opacity: 1;
    text-align: center;
    font-size: 0.32rem;
    font-weight: 600;
    line-height: 0.88rem;
    color: #ffffff;
    border-radius: 0.44rem;
    margin: 0.3rem auto 0.2rem auto;
  }
  .btn__des {
    height: 0.33rem;
    font-size: 0.24rem;
    font-weight: 400;
    line-height: 0.33rem;
    color: #999999;
    text-align: center;
  }
  .store__box {
    display: flex;
    align-items: center;
    height: 0.33rem;
    justify-content: flex-end;
    margin-top: 0.2rem;
    line-height: 0.33rem;
    img {
      width: 0.3rem;
      height: 0.3rem;
    }
    .num {
      font-size: 0.24rem;
      font-weight: 400;
      color: #bbbbbb;
      padding-left: 0.04rem;
      padding-right: 0.2rem;
    }
    .title {
      font-size: 0.24rem;
      font-weight: 400;
      color: #ffdd00;
    }
    .arrow_right {
      font-size: 0.24rem;
      font-weight: 400;
      color: #ffdd00;
      padding-left: 0.1rem;
      padding-right: 0.25rem;
    }
  }
}
</style>