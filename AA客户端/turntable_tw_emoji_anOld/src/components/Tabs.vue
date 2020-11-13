<template>
  <div class="tabPup">
    <div class="tabs">
      <span v-for="(item,index) in tabArr" :key="index" :class="'tab' + index" @click="tabClick(index)"><i></i>{{item.name}}</span>
    </div>
    <transition name="moveR">
      <GiftBox v-if="showType == 0" @closeGiftBox="closeGiftBox" />
    </transition>
    <transition name="moveR">
      <LuckBox v-if="showType == 1" @closeGiftBox="closeGiftBox" />
    </transition>
    <transition name="moveR">
      <Emoji v-if="showType == 2" @closeGiftBox="closeGiftBox" />
    </transition>
  </div>

</template>
<script>
import GiftBox from "./GiftBox"
import LuckBox from "./LuckBox"
import Emoji from "./Emoji"
import { mapState } from "vuex"
import getString from "../utils/getString"
export default {
  components: { GiftBox, LuckBox, Emoji },
  computed: {
    ...mapState(['openType', 'userMsg'])
  },
  data() {
    return {
      tabArr: [
        {
          name: '禮盒'
        },
        {
          name: '寶箱獎勵'
        },
        {
          name: '貼圖'
        }
      ],
      showType: -1
    }
  },
  methods: {
    tabClick(index) {
      if (this.openType == 2) {
        sessionStorage.setItem('user_wallet', JSON.stringify(this.userMsg))   //頁面用
        let token = getString("token")
        location.href = `./index${index + 3}.html?token=${token}`
      } else {
        this.showType = index
      }
    },
    closeGiftBox() {
      this.showType = -1
    }
  }
}
</script>
<style lang="scss" scoped>
.tabPup {
  position: relative;
  z-index: 10;
}
.tabs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.49rem;
  margin-top: 0.14rem;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 0.65rem;
    background: rgba(0, 0, 0, 0.12);
    border-radius: 0.33rem;
    font-size: 0.24rem;
    font-weight: 500;
    i {
      display: inline-block;
      width: 0.56rem;
      height: 0.56rem;
      vertical-align: middle;
      margin-right: 0.03rem;
    }
    &.tab0 {
      i {
        background: url(../assets/img/icon1.png);
        background-size: 100% 100%;
      }
    }
    &.tab1 {
      i {
        background: url(../assets/img/icon2.png);
        background-size: 100% 100%;
      }
    }
    &.tab2 {
      i {
        background: url(../assets/img/icon3.png);
        background-size: 100% 100%;
      }
    }
  }
}
.moveR-enter-active,
.moveR-leave-active {
  transition: all 0.1s linear;
  transform: translateX(0);
}
.moveR-enter,
.moveR-leave {
  transform: translateX(100%);
}
.moveR-leave-to {
  transform: translateX(100%);
}
</style>
