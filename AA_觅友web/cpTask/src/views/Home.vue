<template>
  <div id="app">
    <div :style="{background: '#7a68f8', height: navigatorHeight}"></div>
    <div class="main">
      <div class="container__top">
        <div class="envy">{{cp_lv_info.name}}</div>
        <div class="cur__level">{{lang.current_cp_level}}</div>
        <div class="cp__box">
          <img class="cp__box_bg" src="../img/cp_bg.png" />
          <img class="avatar__left" v-if="ownerInfo.avatar" :src="ownerInfo.avatar" />
          <img class="avatar__right" v-if="cpInfo.avatar" :src="cpInfo.avatar" />
          <div class="liner__box">
            <div v-if="cp_id != 0" class="liner" :style="{width:actLinerWidth}"></div>
          </div>
          <div class="cp__heart__box" :style="{left:heartLeft}">
            <img v-if="cp_id != 0" class="cp__heart"  src="../img/cp_heart.png" />
            <div v-show="cp_id != 0" class="level__des">
              <span>{{lang.level_des.replace('{0}', sweet_value).replace('{1}', cp_lv_info.next_score)}}</span>
            </div>
          </div>
        </div>
      </div>
      <ul class="pri__box">
        <li class="privilege" v-for="(item, index) in cp_privilege" :key="index">
          <img v-if="index == 0" :src="images.cp_privilege_1" />
          <img v-else :src="require(`../img/cp_privilege_${index+1}.png`)" />
          <div class="intro__box">
            <div class="name">{{item.name}}</div>
            <div class="intro" v-if="item.intro">{{item.intro}}</div>
          </div>
        </li>
      </ul>
      <div class="cp__task" v-if="cp_task.length > 0">
        <div class="title">{{lang.daily_cp_task}}</div>
        <div class="daily__refresh">{{lang.daily_refresh}}</div>
      </div>
      <ul class="task__container">
        <li class="task" v-for="(item,index) in cp_task" :key="index">
          <div>
            <div class="task__name">
              <div class="name">{{item.name}}</div>
              <div class="time">{{item.time}}</div>
            </div>
            <div class="task__des" v-html="getTaskDes(index)"></div>
          </div>
          <div class="task__right">
            <div v-if="index == 0 || index == 1" class="clock" :class="{clock__lock: item.click_status == 0}" @click="handleClockIn(item)">{{lang.clock_in}}</div>
            <div v-else class="score" :class="{score__finish: item.finish_score >= item.max_add}">{{item.finish_score}}/{{item.max_add}}</div>
          </div>
        </li>
      </ul>

    </div>
    <Loading v-show="loading" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Player } from "svga.lite";
import { urls } from "../config";
import { toast, profile, getPlatform,  getAppVer} from "../utils";
import { init, clockIn } from "../apis";
import { loadSvgaData } from "../utils/svga";
import Loading from "../components/common/Loading";
import ScrollNotice from "../components/common/ScrollNotice";
import { setFullScreen, getStatusBarHeight, callAppNew } from "../utils/navigation";

export default {
  data() {
    return {
      cp_privilege: [],
      cp_task: [],
      ownerInfo: {},
      cpInfo: {},
      cp_lv_info: {
        next_score: 0,
        score: 0,
        name:''
      },
      sweet_value: 0,
      cp_id: 0,
      act: 0,
      width: 0,
      navigatorHeight: '0px'
    };
  },
  computed: {
    ...mapState(["loading"]),
    lang: () => _lang,
    images: () => _images,
    viewHeight: () => window.innerHeight,
    actLinerWidth () {

      let min = this.cp_lv_info.score //当前等级要求最低的分数
      let max = this.sweet_value + this.cp_lv_info.next_score//当前等级要求最高的分数
      let sweet_value = this.sweet_value

      //数值低时展示30%的进度条
      let ten = (max - min) * 0.3
      if (sweet_value <= ten + min) {
        this.act = 0.264 * 3
        return '30%'
      }

      if (min == sweet_value) {
        this.act = 0
        return '0%'
      } else if (sweet_value >= max) {
        this.act = 2.64
        return '100%'
      } else {
        let total = max - min
        let diff = sweet_value - min
        let value = 2.64 * diff / total
        this.act = value
        return value + 'rem'
      }
    },
    heartLeft () {
      //1.18是左边头像的宽度 0.6是心形图片的一半，这样心形图片的中心与端点是对齐的
      let value = +this.act + 1.18 - 0.6
      // 主要是为了当actLinerWidth过小或者过大时，图片不遮挡左右的头像
      if (value > 2.9) {
        return '2.9rem'
      }
      if (value < 0.8) {
        return '0.8rem'
      }
      return value + 'rem'
    },
  },
  filters: {
    rank(value) {
      return value < 10 ? "0" + value : value;
    },
  },
  created() {
    document.title='\u200E';
    const pt = getPlatform();
    const ver = getAppVer();
    if ((pt == 'ios' && ver >= 165) || pt == 'android') {
      setFullScreen();
      this.navigatorHeight = getStatusBarHeight() + 'px';   
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    profile,
    async loadData() {
      const res = await init();
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (response_status && response_status.error === "") {
          this.cp_task = response_data.cp_task
          this.cp_task.forEach((item,index) => {
            if (index == 0 || index == 1) {
              let timeIndex = item.name.indexOf('（')
              if (timeIndex == -1) {
                timeIndex = item.name.indexOf('(')
              }
              item.time = item.name.slice(timeIndex)
              item.name = item.name.slice(0, timeIndex)
            }
          })
          this.cp_privilege = response_data.cp_privilege
          this.cp_privilege.push({name: this.lang.coming_soon})
          this.ownerInfo = response_data.ownerInfo || {}
          this.cpInfo = response_data.cpInfo || {}
          this.sweet_value = response_data.sweet_value
          this.cp_id = response_data.cp_id
          this.cp_lv_info = response_data.cp_lv_info || {}
          this.$nextTick(() => {
            this.getLevelDesWidth()
          })
        } else if (response_status.error) {
          toast(response_status.error.replace(/\[\d+\]$/, ''));
        }
      }
    },

    async handleClockIn (item) {
      if (item.click_status == 0) {
        return
      }
      const res = await clockIn();
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (response_status && response_status.error === "") {
          try {
            const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
            if(ios){
              onCoupleClockInTask(JSON.stringify(response_data));
            }else{
              javascript:JSInterface.onCoupleClockInTask(JSON.stringify(response_data));
            }
          } catch (error) {
            console.log('try error: ')
          }

          toast(this.lang.clock_in_succ)
          this.loadData()
        } else if (response_status.error) {
          toast(response_status.error.replace(/\[\d+\]$/, ''));
        }
      }
    },
 
    getLevelDesWidth() {
      this.width = document.getElementsByClassName('level__des')[0].clientWidth
    },

    jumpLevel () {
      this.$router.push("/level");
    },

    getTaskDes (index) {
      return this.lang[`task_des_${index+1}`]
        .replace(/%s/g, `<img src="${require('../img/heart.png')}" />`)
        .replace(/%0/g, '<span class="color">')
        .replace(/%1/g, '</span>')
    }
  },
  components: {
    Loading,
    ScrollNotice,
  },
};
</script>

<style lang="scss">
.main {
  .container__top {
    height: 4.84rem;
    background: url('../img/header_bg.png') no-repeat;
    background-size: 100%;
    .envy {
      text-align: center;
      height: 0.7rem;
      font-size: 0.5rem;
      font-weight: 400;
      line-height: 0.7rem;
      color: #FFFFFF;
      opacity: 1;
      padding-top: 0.27rem;
    }
    .cur__level {
      text-align: center;
      height: 0.37rem;
      font-size: 0.26rem;
      font-weight: 400;
      line-height: 0.37rem;
      color: #FFFFFF;
      opacity: 0.6;
    }
    .cp__box {
      width: 5rem;
      height: 1.18rem;
      margin: 0.2rem auto 0 auto;
      position: relative;
      z-index: 10;
      .cp__box_bg {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 10;
      }
      .avatar__left {
        width: 1.08rem;
        height: 1.08rem;
        position: absolute;
        left: 0.05rem;
        top: 0.05rem;
        border-radius: 50%;
        z-index: 20;
      }
      .avatar__right {
        width: 1.08rem;
        height: 1.08rem;
        position: absolute;
        right: 0.05rem;
        top: 0.05rem;
        border-radius: 50%;
        z-index: 20;
      }
      .liner__box {
        width: 2.64rem;
        height: 0.12rem;
        position: absolute;
        left: 1.17rem;
        top: 50%;
        transform: translateY(-50%);
        z-index: 20;
        .liner {
          height: 0.12rem;
          background: linear-gradient(90deg, #FFFFFF 0%, #F597E3 30%, #FF6A98 100%);
          opacity: 1;
          border-radius: 0.06rem;
        }
      }
      .cp__heart__box {
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        z-index: 20;
        .cp__heart {
          width: 1.2rem;
          height: 1.2rem;
        }
        .level__des {
          height: 0.41rem;
          font-size: 0.24rem;
          font-weight: 400;
          line-height: 0.41rem;
          background: #9080F9;
          display: inline-block;
          padding-left: 0.13rem;
          padding-right: 0.13rem;
          border-radius: 0.41rem;
          position: absolute;
          bottom: -0.64rem;
          white-space: nowrap;
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          span {
            color: #FFFFFF;
            opacity: 1;
          }
        }
        .level__des::before {
          content: '';
          position: absolute;
          top: -0.14rem;
          left: 50%;
          transform: translateX(-50%);
          width:0; 
          height:0; 
          border-width:0.07rem; 
          border-style:solid; 
          border-color:transparent transparent #957AF3 transparent; 
        }
      }
      
    }
  }
  .pri__box {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0.15rem;
    margin-top: -1.11rem;
    background: #FFFFFF;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    .privilege {
      width: 2.2rem;
      margin-left: 0.15rem;
      margin-top: 0.3rem;
      img {
        width: 100%;
        display: block;
      }
      .intro__box {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 0.73rem;
        margin-top: 0.1rem;
        .name {
          height: 0.4rem;
          font-size: 0.28rem;
          font-weight: 400;
          line-height: 0.4rem;
          color: #333333;
          opacity: 1;
          text-align: center;
        }
        .intro {
          height: 0.33rem;
          font-size: 0.24rem;
          font-weight: 400;
          line-height: 0.33rem;
          color: #999999;
          opacity: 1;
          text-align: center;
        }
      }
    }
  }
  .cp__task {
    margin-top: 0.66rem;
    margin-left: 0.3rem;
    display: flex;
    align-items: flex-end;
    .title {
      height: 0.45rem;
      font-size: 0.32rem;
      font-weight: bold;
      line-height: 0.45rem;
      color: #000000;
      opacity: 1;
    }
    .daily__refresh {
      height: 0.37rem;
      font-size: 0.26rem;
      font-weight: 400;
      line-height: 0.37rem;
      color: #999999;
      opacity: 1;
      margin-left: 0.2rem;
    }
  }
  .task__container {
    padding-bottom: 0.1rem;
    padding-top: 0.2rem;
    .task:nth-child(3),.task:nth-child(4),.task:nth-child(5) {
      //height: 1.33rem;
    }
    .task {
      width: 6.9rem;
      //height: 1.64rem;
      background: #F5F5F5;
      opacity: 1;
      border-radius: 0.18rem;
      margin: 0 auto 0.2rem auto;
      box-sizing: border-box;
      padding: 0.26rem 0.2rem 0.26rem 0.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .task__name {
        display: flex;
        align-items: flex-end;
        .name {
          height: 0.45rem;
          font-size: 0.32rem;
          font-weight: 400;
          line-height: 0.45rem;
          color: #333333;
          opacity: 1;
        }
        .time {
          height: 0.37rem;
          font-size: 0.26rem;
          font-weight: 400;
          line-height: 0.37rem;
          color: #999999;
          opacity: 1;
        }
      }
      .task__des {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        font-size: 0.26rem;
        font-weight: 400;
        line-height: 0.33rem;
        color: #999999;
        opacity: 1;
        margin-top: 0.04rem;
        img {
          width: 0.46rem;
          height: 0.46rem;
        }
        .color {
          color: #7A68F8;
          //word-wrap: break-word !important;
          // display: flex;
          // flex-wrap: wrap;
        }
      }
      .task__right {
        //width: 1.34rem;
        height: 0.54rem;
        flex-shrink: 0;
        .clock {
          //width: 1.34rem;
          padding-left: 0.26rem;
          padding-right: 0.26rem;
          height: 0.54rem;
          background: #7A68F8;
          opacity: 1;
          border-radius: 0.27rem;
          font-size: 0.26rem;
          font-weight: 400;
          line-height: 0.54rem;
          text-align: center;
          color: #FFFFFF;
        }
        .clock__lock {
          background: #BBBBBB;
        }
        .score {
          width: 100%;
          height: 0.54rem;
          line-height: 0.54rem;
          text-align: center;
          font-size: 0.24rem;
          font-weight: 400;
          color: #7A68F8;
          opacity: 1;
          padding-right: 0.44rem;
        }
        .score__finish {
          color: #BBBBBB;
        }
      }
    }
  }
}
</style>