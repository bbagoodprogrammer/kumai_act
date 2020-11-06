<template>
  <div class="playing5">
    <p class="tips">以下活動指定時間段，21:00:00-21:10:00獲得的分數額外加成10%</p>
    <div class="timeImg"></div>
    <div class="actListTime">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <div class="msg">
            <div class="name">{{item.name}}</div>
            <div class="actTime">{{getTime(item)}}</div>
          </div>
          <div class="actStatus" :class="{start:item.url}" @click="goAct(item.url,item.step)"></div>
        </li>
      </ul>
    </div>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
  </div>
</template>
<script>
import api from "../api/apiConfig"
import getDate from "../utils/getDate"
import getString from "../utils/getString"
import APP from "../utils/openApp"
import { mapState } from "vuex"
export default {
  data() {
    return {
      list: [],
      rotatePx: 0,    //刷新旋转动画
    }
  },
  created() {
    this.init()
  },
  computed: {
    ...mapState(['isShare'])
  },
  methods: {
    init() {
      api.page5(0).then(res => {
        this.list = res.data.response_data.list
      })
    },
    getTime(item) {
      return getDate(new Date(item.stime * 1000), 2) + '-' + getDate(new Date(item.etime * 1000), 2)
    },
    goAct(url, step) {
      if (this.isShare) {
        APP()
        return
      }
      if (url) {
        let regstr = getString('token')
        let uid = getString('uid')
        location.href = `${url}?uid=${uid}&token=${regstr}`
      }
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      this.init()
    }
  }
}
</script>
<style lang="scss">
.playing5 {
  .tips {
    padding: 0 0.25rem;
    margin: 0.33rem 0 0.2rem;
    text-align: center;
    font-size: 0.28rem;
    font-weight: bold;
  }
  .timeImg {
    width: 7.28rem;
    height: 0.96rem;
    background: url(../assets/img/actTimeBg.png);
    background-size: 100% 100%;
    margin: 0 auto;
  }
  .actListTime {
    width: 6.59rem;
    height: 6.3rem;
    padding: 0.3rem 0.34rem 0;
    background: url(../assets/img/petsBg.png);
    background-size: 100% 100%;
    margin: 0.49rem auto 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    ul {
      width: 6.23rem;
      margin: 0 auto;
      li {
        height: 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.4);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .msg {
          .name {
            font-size: 0.32rem;
          }
          .actTime {
            margin-top: 0.1rem;
            color: rgba(255, 253, 117, 1);
            font-size: 0.24rem;
          }
        }
        .actStatus {
          width: 1.74rem;
          height: 0.72rem;
          background: url(../assets/img/act_not.png);
          background-size: 100% 100%;
          &.start {
            background: url(../assets/img/act_start.png);
            background-size: 100% 100%;
          }
        }
      }
      li:last-child {
        border: none;
      }
    }
  }
}
</style>