<template>
  <div class="page pageIndex" :class="{bg:!showBannerBg}">
    <canvas id="bannerBg" v-show="!showBannerBg"></canvas>
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="nums">
        <div @click="showLuck = true" :class="{carrotValueAnim2:chance >= 20}"><span>{{lang.luck}} </span>
          <div class="value"><i class="x"></i> <img v-for="(item,index) in String(chance).split('')" :key="index" :src="require(`../img/numbers/${item}.png`)" alt=""></div>
        </div>
        <div @click="showStrategy = true"><span>{{lang.Strategy}}</span></div>
        <div @click="$router.push('rule')"><span>{{lang.rule}}</span></div>
      </div>
    </div>
    <LandsBox />
    <UserSeedNums />
    <Rank ref='rank' />
    <ActFooter />
    <div class="mask" v-show="showLuck">
      <transition name="slide">
        <Luck v-show="showLuck" />
      </transition>
    </div>
    <div class="mask" v-show="showStrategy">
      <transition name="slide">
        <Strategy v-show="showStrategy" />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getUrlString, isSupportedTouch } from '../utils'
import APP from "../utils/openApp"
import LandsBox from './LandsBox';
import { init } from "../apis"
import UserSeedNums from "./UserSeedNums"
import Rank from "./Rank"
import ActFooter from "./ActFooter"
import { globalBus } from '../utils/eventBus'
import Luck from "./Luck"
import Strategy from "./Strategy"

import { Downloader, Parser, Player } from 'svga.lite'

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })
export default {
  data () {
    return {
      isShare: false,
      showLuck: false,
      showStrategy: false,
      showBannerBg: true,
    }
  },
  computed: {
    ...mapState(['chance'])
  },
  created () {
    this.judgeShare()
    this.init()
  },
  mounted () {
    this.bannerGo()
    document.addEventListener(isSupportedTouch ? 'touchend' : 'click', this.resetLandSteps);
    this.$store.commit('setLandInfo');
  },
  methods: {
    init () {
      init().then(res => {
        console.log(res)
        const { extension, day_flower, task_day, garden, first, seed, seed1, hoping, chance, schule, stime, etime, task_day_gift, user_info, step, load, charge, charge_get } = res.data.response_data
        this.createdLandData(garden)
        this.vxc('setFirst', first)
        this.vxc('setSeed', seed)
        this.vxc('setSeed1', seed1)
        this.vxc('setHoping', hoping)
        this.vxc('setChance', chance)
        this.vxc('setSchule', schule)
        this.vxc('setStime', stime)
        this.vxc('setEtime', etime)
        this.vxc('setStep', step)
        this.vxc('setLoad', load)
        this.vxc('setReg', user_info.registered)
        this.vxc('setTask_day_gift', task_day_gift)
        this.vxc('setDay_flower', day_flower)
        this.vxc('setTask_day', task_day)
        this.vxc('setCharge_get', charge_get)
        this.vxc('setCharge', charge)
        this.vxc('setextension', extension)
      })
    },
    createdLandData (garden) {
      for (let i in garden) {
        if (garden[i].able) {
          garden[i]['land_id'] = i * 1
          garden[i]['value'] = garden[i].flower
          garden[i]['seed'] = garden[i].type + 1

          if (!garden[i].mature_time) {
            garden[i]['status'] = 0
          } else if (garden[i].status) {
            garden[i]['status'] = 2
          } else {
            garden[i]['status'] = 1
          }
        } else {
          garden[i]['land_id'] = i * 1
        }
      }
      this.$store.commit('setLandInfo', garden);
    },
    resetLandSteps () {
      this.$store.commit('resetLandSteps');
    },
    judgeShare () {//判断是否为分享环境,请求相应的接口 
      this.isShare = getUrlString('token') ? false : true
      this.vxc('setShareState', this.isShare) //分享状态
    },
    downApp () {
      APP()
    },
    async bannerGo () {
      let canvas = document.getElementById('bannerBg')
      let addres = ''
      if (_app == 'hsing') {
        addres = `http://fstatic.cat1314.com/uc/svga/8f6a7b9695945d9de2515f0d45ff6ac3_1615357987.svga`
      } else if (_app == 'singnow') {
        addres = `http://fstatic.cat1314.com/uc/svga/ec12435be441b98da96ac0ae3a75edbf_1615792726.svga`
      } else if (_app == 'wekara') {
        addres = `https://fstatic.cat1314.com/uc/svga/8e328d7e0cbcf5a5868504b654660ce2_1617954923.svga`
      }
      const fileData = await downloader.get(addres);
      const data = await parser.do(fileData);
      let player = new Player(canvas)
      await player.mount(data)
      this.showBannerBg = false
      player.start()
    }
  },
  components: {
    LandsBox,
    UserSeedNums,
    Rank,
    ActFooter,
    Luck,
    Strategy
  },
}
</script>

<style lang="scss" secoped>
.carrotValueAnim2 {
  animation: headShake 2s linear infinite;
}

.pageIndex {
  //   background: rgba(101, 98, 229, 1) url(../img/banner.png) no-repeat;
  //   background-size: 100% auto;
  //   padding-bottom: 2rem;
  &.bg {
    // background: url(../assets/img/banner1.jpg) center 0 no-repeat;
    // background-size: 100% auto;
    background: rgba(101, 98, 229, 1);
  }
  #bannerBg {
    width: 7.5rem;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
  .header {
    height: 4.85rem;
  }
  .nums {
    position: absolute;
    top: 0.54rem;
    right: 0.1rem;
    overflow: hidden;
    width: 1.8rem;
    > div {
      margin: 0 auto 0.1rem;
      width: 1.46rem;
      height: 1.23rem;
      background-size: 100% 100%;
      position: relative;
      span {
        display: block;
        width: 1.46rem;
        height: 0.4rem;
        text-align: center;
        font-size: 0.22rem;
        color: rgba(101, 72, 209, 1);
        font-weight: 600;
        z-index: 3;
        position: absolute;
        bottom: 0;
        em {
          position: absolute;
          right: 0;
          top: 0;
        }
      }
      &:first-child {
        background-image: url('../img/carrot_bg.png');
      }
      &:last-child {
        background-image: url('../img/like_bg.png');
      }
      &:nth-child(2) {
        background-image: url('../img/rule_bg.png');
      }
    }
  }
  .value {
    width: 100%;
    height: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
    img {
      width: 0.23rem;
      height: 0.3rem;
      margin-left: -0.05rem;
    }
    .x {
      display: block;
      width: 0.28rem;
      height: 0.3rem;
      background: url(../img/numbers/C.png);
      background-size: 100% 100%;
    }
  }
}
</style>