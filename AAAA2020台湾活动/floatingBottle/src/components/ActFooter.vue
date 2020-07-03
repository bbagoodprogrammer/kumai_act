<template>
  <div class="footerBar">
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 0">{{lang.noAct}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEd}}</span>
      <span class="goAct" v-if="astState === 1">現在是投瓶時間，可以開始投瓶</span>
      <span class="actIng" v-if="astState === 3">今日可撈取的次數:{{chance}}</span>
    </div>
    <span class="dBottle" @click="dBootle()">拋</span>
    <span class="gBottle" @click="lBootle()">撈</span>
    <!-- 投瓶歌曲彈窗 -->
    <div class="mask" v-show="showDsongPup">
      <transition name="slide">
        <DsongPup v-show="showDsongPup" :dSongList="dSongList" />
      </transition>
    </div>
    <!-- 撈瓶彈窗 -->
    <div class="mask" v-show="showBottle">
      <transition name="slide">
        <Song v-if="showBottle" :prize="prize" @setFollow="setFollow" />
      </transition>
    </div>
    <!-- 撈到幾個瓶子 -->
    <div class=" mask" v-show="showBootleTips">
      <transition name="slide">
        <div class="getBootle" v-show="showBootleTips">
          <p>撈取了{{prize.length}}個瓶子</p>
          <em v-if="senior!=0">(有{{senior}}個高級瓶子)</em>
          <div @click="openBootle()">打開瓶子</div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Song from "../components/Song"
import DsongPup from "../components/DsongPup"
import { globalBus } from '../utils/eventBus'
import getDate from "../utils/getDate"
import api from "../api/apiConfig"
export default {
  components: { Song, DsongPup },
  props: ["dstime", "detime", "gstime", "getime"],
  data() {
    return {
      showBottle: false,
      showDsongPup: false,
      dSongList: [],
      showBootleTips: false,
      prize: [
        {
          "type": 2, //类型 1 礼物 2 普通瓶子 3 高级瓶子 4 碎片
          "tid": "activity_drifting_bottle_100861_80912664_1_1593680861", //瓶子id
          "sid": 80912664, //作品id
          "name": "體面", //作品名称 背包礼物时为礼物明 为礼物时 img字段为礼物图片
          "url": "http://song.17sing.tw/uc/song/100861_1593513133.mp3", //作品地址
          "suid": "100861", //作品所有者
          "nick": "嘎sellyyrghiiiggfd", //昵称
          "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small", //头像
          "attension": false //是否关注
        },
        {
          "type": 1,
          "img": ``,
          "name": "xxxx"
        },
        {
          "type": 4,
          "tid": 0
        },
        {
          "type": 3, //类型 1 礼物 2 普通瓶子 3 高级瓶子 4 碎片
          "tid": "activity_drifting_bottle_100861_80912664_1_1593680861", //瓶子id
          "sid": 80912664, //作品id
          "name": "體面", //作品名称 背包礼物时为礼物明 为礼物时 img字段为礼物图片
          "url": "http://song.17sing.tw/uc/song/100861_1593513133.mp3", //作品地址
          "suid": "100861", //作品所有者
          "nick": "嘎sellyyrghiiiggfd", //昵称
          "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small", //头像
          "attension": false //是否关注
        },
      ]
    }
  },
  computed: {
    ...mapState(['actStatus', 'dstep', 'gstep', 'chance', 'userMsg', 'isShare']),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if (this.dstep == 1 && this.gstep == 0) { //投瓶開啟，撈瓶未開始
        return 1
      } else if (this.gstep == 1) { //撈瓶時間
        return 3
      }
    },
    senior() {
      let num = 0
      this.prize.forEach(element => {
        if (element.type == 3) {
          num++
        }
      });
      return num
    }
  },
  methods: {
    dBootle() {
      globalBus.$emit("commonEvent", () => {
        if (this.dstep != 1) {
          this.vxc('setToast', {
            msg: `現在不是投瓶時間<br/>投瓶時間為${getDate(new Date(this.dstime * 1000), 1)} - ${getDate(new Date(this.detime * 1000), 1)}`
          })
        } else {
          api.throwClick().then(res => {
            this.dSongList = res.data.response_data.list
            this.vxc('setFirst', res.data.response_data.first)
            this.showDsongPup = true
          })
        }
      })
    },
    lBootle() {
      globalBus.$emit("commonEvent", () => {
        if (this.gstep != 1) {
          this.vxc('setToast', {
            msg: `現在不是撈瓶時間<br/>撈瓶時間為${getDate(new Date(this.gstime * 1000), 1)} - ${getDate(new Date(this.getime * 1000), 1)}`
          })
        } else if (this.chance > 0) {
          // api.getBottle().then(res => {
          //   this.prize = res.data.response_data.prize
          this.showBootleTips = true
          //   this.vxc('reduxChance')
          // })
        } else {
          this.toast(`當前撈瓶次數已用完~`)
        }
      })
    },
    openBootle() {
      this.showBootleTips = false
      this.showBottle = true
    },
    setFollow(index) {
      this.prize[index].attension = true
    }
  }
}
</script>
<style lang="scss">
.footerBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  .acrStatus {
    width: 7.5rem;
    height: 1.75rem;
    margin: auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    // background: url() no-repeat;
    // background-size: contain;
    span {
      display: inline-block;
    }
  }
  .dBottle {
    display: block;
    width: 1rem;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    border-radius: 50%;
    background: orange;
    position: absolute;
    bottom: 3rem;
    left: 2rem;
  }
  .gBottle {
    display: block;
    width: 1rem;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    border-radius: 50%;
    background: green;
    position: absolute;
    bottom: 3rem;
    left: 5rem;
  }
}
</style>
