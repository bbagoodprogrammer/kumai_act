<template>
  <div class="propList">
    <i class="close" @click="closeProp()"></i>
    <ul>
      <li v-for="(item,index) in propMissions.missions" :key="index">
        <img :src="require(`../assets/img/prop/tool${item.tool_id}.png`)" alt="">
        <div class="taskMsg">
          <div class="name">{{item.desc}}</div>
          <div class="tips">{{item.tool_desc}}</div>
          <div class="bar" v-if="item.id !=1">
            <span :style="{width:item.rate/item.target*100+'%'}">
            </span>
          </div>
        </div>
        <div class="btn">
          <em v-if="item.status == 2" class="geted"></em>
          <em v-else-if="item.status == 1" class="get" @click="getGifts(item,index)"></em>
          <em v-else-if="item.status == 0" class="goSuc" :class="{goSuc2:item.id !=1}" @click="goHtml(item.link,item.rid)">
            <i v-if="item.id !=1">({{item.finished}}/{{item.limit}})</i>
          </em>
        </div>
      </li>
    </ul>
    <div class="prop">
      <span class="oldinaryTime">
        <img src="../assets/img/prop/ordinaryTime.png" alt="">
        <i>{{propMissions.tools[0].tool_count}}</i>
        <em @click="useProp(propMissions.tools[0].tool_id)" :class="{black:propMissions.tools[0].tool_count <= 0}"></em>
      </span>
      <span class="fastTime">
        <img src="../assets/img/prop/fastTime.png" alt="">
        <i>{{propMissions.tools[1].tool_count}}</i>
        <em @click="useQuickProp(propMissions.tools[1].tool_id)" :class="{black:propMissions.tools[1].tool_count <= 0}"></em>
      </span>
    </div>
  </div>
</template>
<script>
import api from "../api/apiConfig"
import { mapState } from "vuex"
import downTime from '../utils/downTime'
import { globalBus } from '../utils/eventBus'
export default {
  computed: {
    ...mapState(['land_info', 'propMissions']),
    isHas () {
      var quey = this.land_info.filter(item => {
        return item.status == 3
      })
      return quey
    }
  },
  methods: {
    closeProp () {
      this.$emit('closePropList')
    },
    getGifts (item, index) {
      globalBus.$emit('commonEvent', () => {
        api.getGifts(item.id).then(res => {
          if (res.data.response_status.code == 0) {
            let obj = {
              index: index,
              type: item.tool_id,
              num: item.reward
            }
            this.toast('領取成功')
            this.vxc('getPrpoWards', obj)
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      })
    },
    useProp (id) {
      if (this.propMissions.tools[0].tool_count > 0) {
        if (this.isHas.length) {
          api.useFunc(id).then(res => {
            if (res.data.response_status.code == 0) {
              this.downAllTime()
              this.reduxProp(0)
            } else {
              this.toast(res.data.response_status.error)
            }
          })
        } else {
          this.vxc('setToast', {
            msg: `沒有適用的食物哦`,
            title: require('../assets/img/prop/title2.png')
          })
        }
      } else {
        this.vxc('setToast', {
          msg: `<span>道具已用完咯~</span>需要完成任務兌換哦`,
        })
      }
    },
    useQuickProp (id) {
      if (this.propMissions.tools[1].tool_count > 0) {
        if (this.isHas.length) {
          api.useFunc(id).then(res => {
            if (res.data.response_status.code == 0) {
              this.downQuickTime()
              this.reduxProp(1)
            } else {
              this.toast(res.data.response_status.error)
            }
          })
        } else {
          this.vxc('setToast', {
            msg: `沒有適用的食物哦`,
            title: require('../assets/img/prop/title4.png')
          })
        }
      } else {
        this.vxc('setToast', {
          msg: `<span>道具已用完咯~</span>需要完成任務兌換哦`,
        })
      }
    },
    downAllTime () {
      for (let i = 0; i < this.land_info.length; i++) {
        var timeKey = 'land' + this.land_info[i].id;
        var timeObj = downTime(timeKey)
        var status = this.land_info[i].status
        var seconds = timeObj.seconds - 180
        if (status == 3) {
          if (seconds > 0) {
            downTime(timeKey, seconds)
          } else {
            downTime(timeKey, 0)
            this.vxc('updateLandInfo', {
              id: this.land_info[i].id,
              status: 4,
            })
          }
        }
      }
      this.vxc('setToast', {
        msg: `已使用！食物成熟時間縮短3min`,
        title: require('../assets/img/prop/title1.png'),
        img: require('../assets/img/prop/pupImg1.png'),
        time: 2000
      })
    },
    downQuickTime () {
      for (let i = 0; i < this.land_info.length; i++) {
        var timeKey = 'land' + this.land_info[i].id;
        var timeObj = downTime(timeKey)
        var status = this.land_info[i].status
        if (status == 3) {
          downTime(timeKey, 0)
          this.vxc('updateLandInfo', {
            id: this.land_info[i].id,
            status: 4,
          })
        }
      }
      this.vxc('setToast', {
        msg: `已使用！食物馬上成熟啦`,
        title: require('../assets/img/prop/title3.png'),
        img: require('../assets/img/prop/pupImg2.png'),
        time: 2000
      })
    },
    goHtml (link, rid) {//0無鏈接，1進房間，2邂逅頁，3儲值頁，4分享活動，5邀請好友
      const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      if (link == 1) {
        try {
          if (ios) {
            sendJsData('app://room?rid=' + rid);
          } else {
            javascript: JSInterface.sendJsData('app://room?rid=' + rid);
          }
        } catch (e) { }
      } else if (link == 2) {
        try {
          if (ios) {
            sendJsData('app://bottlespage');
          } else {
            javascript: JSInterface.sendJsData('app://bottlespage');
          }
        } catch (e) { }
      } else if (link == 3) {
        try {
          if (ios) {
            // goWalletpage()
            sendJsData('app://walletpage');
          } else {
            javascript: JSInterface.sendJsData('app://walletpage');
          }
        } catch (e) { }
      } else if (link == 4) {
        //url title desc image from
        try {
          share({
            from: '1_0',
            url: `http://activities.udateapp.com/static_html/2020/deerMan/index.html?type=1`,
            title: '我正在養梅花鹿，很好玩！',
            desc: '也送你一隻鹿寶寶',
            image: 'http://activities.udateapp.com/static_html/2020/deerMan/share.jpg'
          })
        } catch (e) { }
      } else if (link == 5) {
        this.showFriend()
      }
    },
    reduxProp (type) {
      this.vxc('reduxProp', type)
    }
  }
}
</script>
<style lang="scss" scoped>
.propList {
  width: 6.88rem;
  height: 9.08rem;
  background: url(../assets/img/propBg.png);
  background-size: 100% 100%;
  position: absolute;
  top: 1.08rem;
  left: 0.31rem;
  left: 0.29rem;
  ul {
    width: 6.3rem;
    height: 5rem;
    position: absolute;
    top: 1.57rem;
    left: 0.28rem;
    li {
      height: 1.24rem;
      padding: 0 0.17rem 0 0.3rem;
      display: flex;
      align-items: center;
      background: rgba(226, 255, 194, 1);
      border: 0.04rem solid rgba(202, 255, 148, 1);
      // box-shadow: -1px 1px 31px 1px rgba(255, 255, 255, 0.75);
      border-radius: 0.1rem;
      margin-bottom: 0.18rem;
      img {
        width: 0.98rem;
        height: 0.98rem;
      }
      .taskMsg {
        margin-left: 0.16rem;
        width: 3.5rem;
        .name {
          font-size: 0.28rem;
          color: #2a5103;
          font-weight: bold;
        }
        .tips {
          color: #619035;
          font-weight: 500;
          font-size: 0.24rem;
        }
        .bar {
          width: 2.43rem;
          height: 0.09rem;
          margin-top: 0.1rem;
          background: #ad5021;
          border: 0.04rem solid rgba(58, 165, 79, 1);
          border-radius: 0.3rem;
          position: relative;
          span {
            display: block;
            height: 0.09rem;
            background: url(../assets/img/prop/actBar.png);
            background-size: 100% 100%;
            position: absolute;
          }
        }
      }
      .btn {
        em {
          display: block;
          width: 1.11rem;
          height: 0.52rem;
        }
        .geted {
          background: url(../assets/img/prop/blackGet.png);
          background-size: 100% 100%;
        }
        .get {
          background: url(../assets/img/prop/btn1.png);
          background-size: 100% 100%;
        }
        .goSuc {
          background: url(../assets/img/prop/btn3.png);
          background-size: 100% 100%;
          &.goSuc2 {
            background: url(../assets/img/prop/btn2.png);
            background-size: 100% 100%;
            position: relative;
            i {
              width: 1.11rem;
              font-size: 0.16rem;
              color: #fefab7;
              text-align: center;
              position: absolute;
              bottom: 0rem;
            }
          }
        }
      }
    }
  }
  .prop {
    width: 6.88rem;
    position: absolute;
    top: 6.7rem;
    display: flex;
    justify-content: center;
    span {
      position: relative;
      img {
        width: 1.08rem;
        height: 1.08rem;
        display: block;
        margin: 0 auto 0.05rem;
      }
      i {
        display: block;
        width: 0.3rem;
        height: 0.3rem;
        font-size: 0.22rem;
        text-align: center;
        position: absolute;
        right: 0.02rem;
        top: 0.1rem;
      }
      em {
        display: block;
        width: 1.12rem;
        height: 0.52rem;
        background: url(../assets/img/prop/use.png);
        background-size: 100% 100%;
        &.black {
          background: url(../assets/img/prop/blackUse.png);
          background-size: 100% 100%;
        }
      }
    }
    .fastTime {
      margin-left: 1.14rem;
    }
  }
  .close {
    display: block;
    width: 0.32rem;
    height: 0.32rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.1rem;
    top: 0.4rem;
  }
}
</style>
