<template>
  <div class="bigBox">
    <div class="header">
      <a href="./index2.html" :class="{top:isShare}"></a>
    </div>
    <a href="" class="share" v-if="isShare" @click.prevent="goShare()"></a>
    <div class="bgbox">
      <div class="wardsBox"> </div>
      <div class="bgTop"></div>
      <div class="bgBottom"></div>
    </div>
    <div class="listTab">
      <a href="" class="works" :class="{active:showComponent === 'works'}" @click.prevent="updateWorks('works')">人氣榜</a>
      <a href="" class="kRoom" :class="{active:showComponent === 'kRoom'}" @click.prevent="updateKroom('kRoom')">應援榜</a>
      <a href="" class="wardsList" @click.prevent="showList()"></a>
    </div>
    <component :is="showComponent"></component>
    <div class="footer">
      <a class="singUp" v-if="showFooter === 2" @click.prevent="singUp()">報名</a>
      <span v-if="showFooter === 0">活動未開始</span>
      <span v-if="showFooter === 1">活動已結束</span>
      <div class="myMsg" v-show="showComponent === 'works' && (showFooter === 3 || showFooter == 4)">
        <span class="rank">{{WardsMyMsg.rank}}</span>
        <img v-lazy="WardsMyMsg.avatar" alt="">
        <div class="msgBox">
          <div class="msgTop">
            <span>{{WardsMyMsg.nick}}</span>
          </div>
          <div class="msgBottom">
            排名：<span>{{WardsMyMsg.rank}}</span>
          </div>
        </div>
        <div class="scoreBox">
          <i class="workScore"></i>
          <span class="score">{{WardsMyMsg.score}}</span>
          <span class="got" v-if="WardsMyMsg.scaling>0"><i></i>{{WardsMyMsg.scaling*100 +'%'}}</span>
        </div>
      </div>
      <div class="myMsg" v-show="showComponent === 'kRoom' && (showFooter === 3 || showFooter == 4)">
        <span class="rank">{{kRommMyMsg.rank}}</span>
        <img v-lazy="kRommMyMsg.avatar" alt="">
        <div class="msgBox">
          <div class="msgTop">
            <span>{{kRommMyMsg.nick}}</span>
          </div>
          <div class="msgBottom">
            排名：<span>{{kRommMyMsg.rank}}</span>
          </div>
        </div>
        <div class="scoreBox">
          <i class="kRoomScore"></i>
          <span class="score">{{kRommMyMsg.score}}</span>
          <!-- <span class="got" v-if="kRommMyMsg.scaling>0"><i></i>{{kRommMyMsg.scaling*100 +'%'}}</span> -->
        </div>
      </div>
    </div>
    <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    <wards-list v-show="showWradsList" @closeList="closeList"></wards-list>
    <loading></loading>
    <a href="" @click.prevent="refresh()" class="refresh" :style="{transform:'rotate('+rotatePx+'deg)'}" v-show="showFooter != 0 && !isShare"></a>
  </div>
</template>

<script>

import getString from "../utils/getString.js"
import api from "../api/apiConfig.js"
import Loading from "../components/Loading.vue"
import APP from "../utils/openApp.js"
import KRoom from "../components/Kroom.vue"
import Works from "../components/Works.vue"
import msgToast from "../components/commonToast"
import WardsList from "../components/WardsList"
export default {
  components: { KRoom, Works, Loading, msgToast, WardsList },
  data() {
    return {
      isShare: false, //是否分享
      showComponent: "works",
      activite: null,   //活動狀態
      userState: null,    //當前用戶是否報名，0未報名，1已報名
      defaultData: {}, //初始數據 
      wardArr: [],    //作品排行数组长度
      kRoomArr: [],      //k房排行数组长度
      WardsMyMsg: {
      },     //作品底部個人排行信息
      kRommMyMsg: {
      },   //K歌底部个人信息
      isMore: true,     //避免滾動重複請求
      singUped: false,   //报名后要重新加载个人信息的标示
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      could: true,      //避免刷新重复加载
      kRoomLoaded: false,  // K房列表是否家再過
      tastMsg: '',  //提示信息
      showT: false,
      showWradsList: false, //显示送礼人数榜单
    }
  },
  computed: {
    showFooter() {  //底部現實組件
      var activite = this.activite
      if (this.isShare) {  //分享模式显示报名按钮
        return 2
      } else if (activite === 0) { //活動未開始
        return 0
      } else if (activite === 2 && this.userState === 0) { //活動已結束,展示活动已结束字样
        return 1
      } else if (activite === 2 && this.userState === 1) { //活動已結束,用户已报名展示排名
        return 4
      } else if (activite === 1 && this.userState === 0) { //活動開始用戶未報名
        return 2
      } else if (activite === 1 && this.userState === 1) { //活動開始用戶已報名
        return 3
      }
    }
  },
  created() {
    this.judgeShare()  //判斷分享狀態
    this.getDefaultData()   //頁面初始化
  },
  mounted() {
    if (this.isShare) return
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    judgeShare() {
      let that = this
      //判断是否为分享环境,请求相应的接口 
      let regstr = getString('token')
      if (regstr) {
        that.isShare = false
      } else {
        that.isShare = true
      }
      that.$store.commit('changShareState', that.isShare) //分享状态
    },
    getDefaultData() { //獲取數據
      var that = this
      api.getDefault(1).then(function (res) {
        if (res.data.response_status.code == 20000) {  //活动未开始
          that.activite = 0
          that.$store.commit('changActivateState', that.activite) //當前活動狀態
        } else if (res.data.response_status.code == 0) {
          const { rank, step, owner_info } = res.data.response_data
          if (owner_info && owner_info.registered) { //改变用户报名报名状态
            that.userState = 1
          } else {
            that.userState = 0
          }
          that.activite = step //当前活动状态  
          if (!that.isShare && owner_info) {
            that.WardsMyMsg = owner_info  // 作品排行榜底部个人信息 
          }
          that.wardArr = rank // 当前数组（分页用）            
          that.$store.commit('changActivateState', that.activite) //當前活動狀態
          that.$store.commit('changeWorksArr', rank)  //存入作品排行榜
        }
      })
    },
    singUp() { //報名后轉換用戶狀態
      if (this.isShare) {
        APP()
        return
      } else {
        var that = this
        if (that.showComponent === "works") {
          api.singUp(1).then(function (res) {  //报名后修改用户信息和状态
            const { owner_info } = res.data.response_data
            if (owner_info && owner_info != {}) {
              that.WardsMyMsg = owner_info
            }

            that.userState = 1
            that.singUped = true  //切换TAB时更新另一个tab的数据
            if (that.wardArr.length < 20) {
              that.wardArr.push(that.WardsMyMsg)
              that.$store.commit('changeWorksArr', that.wardArr)
            }
          })
        } else if (that.showComponent === "kRoom") {
          api.singUp(3).then(function (res) {
            const { owner_info } = res.data.response_data
            if (owner_info && owner_info != {}) {
              that.kRommMyMsg = owner_info
            }

            that.userState = 1
            that.singUped = true
            if (that.kRoomArr.length < 20) {
              that.kRoomArr.push(that.kRommMyMsg)
              that.$store.commit('changekRoomArr', that.kRoomArr) //存入K歌排行榜
            }
          })
        }
      }
    },
    updateWorks() { //点击时更新个人信息
      var that = this
      if (that.showComponent === "works") {
        return
      }
      if (!that.singUped) {   //如果未点击报名直接切换  否则是刚报完名后重新拉取个人信息
        that.showComponent = "works"
        return
      } else {
        that.showComponent = "works"
        api.getDefault(1).then(function (res) {
          const { owner_info } = res.data.response_data
          if (owner_info && owner_info != {}) {
            that.WardsMyMsg = owner_info  // 作品排行榜底部个人信息 
          }

          that.singUped = false
        })
      }
    },
    updateKroom(val) { //点击时更新个人信息
      var that = this
      if (that.showComponent === "kRoom") {
        return
      }
      if (!this.kRoomLoaded) {  //如果是沒加載過請求數據
        api.getDefault(3).then(function (res) {
          if (res.data.response_status.code == 20000) {
            that.activite = 0
          } else if (res.data.response_status.code == 0) {
            const { rank, owner_info } = res.data.response_data
            if (owner_info && owner_info != {}) {
              that.kRommMyMsg = owner_info       //k房底部个人信息
            }
            that.kRoomArr = rank   //当前数组（分页用） 
            that.$store.commit('changekRoomArr', that.kRoomArr) //存入K歌排行榜
          }
        })
        this.kRoomLoaded = true
      }
      if (!that.singUped) { //如果未点击报名直接切换  否则是刚报完名后重新拉取个人信息
        that.showComponent = "kRoom"
        return
      } else {
        that.showComponent = "kRoom"
        api.getDefault(3).then(function (res) {
          const { owner_info } = res.data.response_data
          if (owner_info && owner_info != {}) {
            that.kRommMyMsg = owner_info       //k房底部个人信息
          }
          that.singUped = false
        })
      }
    },
    onScroll() { //滾動加載
      if (this.showFooter === 0) return
      const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
      var that = this
      if (scrollToBottom) { //加載更多合併數組存入vuex
        if (that.showComponent === "works" && that.isMore && that.wardArr.length >= 20) {
          that.isMore = false
          var from = that.wardArr.length
          api.renqiGetMoreList(from).then(function (val) {
            that.isMore = true   //重置开关
            var newArr = val.data.response_data.rank
            if (newArr.length >= 0) {
              that.wardArr = that.wardArr.concat(newArr)
              that.$store.commit('changeWorksArr', that.wardArr)  //存入作品排行榜
            } else {
              return
            }
          })
        } else if (that.showComponent === "kRoom" && that.isMore && that.kRoomArr.length >= 20) {
          that.isMore = false
          var from = that.kRoomArr.length
          api.yingyuanGetMoreList(from).then(function (val) {
            that.isMore = true   //重置开关
            var newArr = val.data.response_data.rank
            if (newArr.length >= 0) {
              that.kRoomArr = that.kRoomArr.concat(newArr)
              that.$store.commit('changekRoomArr', that.kRoomArr)  //存入作品排行榜
            } else {
              return
            }
          })
        }
      }
    },
    refresh() {
      var that = this
      that.rotatePx = 540 * ++that.rotatec  //旋转动画
      window.removeEventListener("scroll", that.onScroll)  //去除滚动加载事件，避免减少数组后滚动条到底默认加载一次
      if (that.showComponent === "works") {  //刷新当前榜单数据
        if (that.could) {  //避免重复请求
          that.could = false
          var from = 0
          api.getDefault(1).then(function (val) {
            that.could = true   //重置开关
            var newArr = val.data.response_data.rank
            if (newArr.length >= 0) {
              that.wardArr = newArr
              that.$store.commit('changeWorksArr', that.wardArr)  //存入作品排行榜
              setTimeout(function () {  //重新监听事件
                window.addEventListener("scroll", that.onScroll)
              }, 500)
            } else {
              return
            }
            that.WardsMyMsg = val.data.response_data.owner_info  // 作品排行榜底部个人信息 
          })
        }
      } else if (that.showComponent === "kRoom") {
        if (that.could) {  //避免重复请求
          that.could = false
          var from = 0
          api.getDefault(3).then(function (val) {
            that.could = true   //重置开关
            var newArr = val.data.response_data.rank
            if (newArr.length >= 0) {
              that.kRoomArr = newArr
              that.$store.commit('changekRoomArr', that.kRoomArr)  //存入作品排行榜
              setTimeout(function () {
                window.addEventListener("scroll", that.onScroll)
              }, 500)
            } else {
              return
            }
            that.kRommMyMsg = val.data.response_data.owner_info
          })
        }
      }
    },
    showList() {
      if (this.isShare) {
        APP()
        return
      }
      api.getWardsList(0).then((res) => {  //送禮人數榜單
        const { response_data, response_status } = res.data
        if (response_status.code === 0) {
          this.$store.commit('changwardsList', response_data.rank)
          if (response_data.owner_info) {
            this.$store.commit('changwardsListUserMsg', response_data.owner_info)
          }
          this.showWradsList = true
        }
      })

    },
    closeList() {
      this.showWradsList = false
    },
    uploadSong() {
      if (this.isShare) {
        APP()
        return
      } else if (this.activite === 0) {
        this.showT = true
        this.tastMsg = `活動未開始`
        return
      } else if (this.activite === 2) {
        this.showT = true
        this.tastMsg = `活動已結束`
        return
      } else {
        let regstr = getString('token')
        location.href = `./index3.html?token=${regstr}`
      }
    },
    closeToast() {
      this.showT = false
    },
    goShare() {
      APP()
    }
  }
}
</script>
<style lang='scss'>
body {
  max-width: 7.5rem;
  position: relative;
  margin: auto;
  background: #342e8f url(../assets/img/bigBg.png) no-repeat;
  background-size: 100% auto;
}
.bigBox {
  max-width: 7.5rem;
  margin: auto;
  overflow-x: hidden;
  .header {
    height: 9.47rem;
    position: relative;
    a {
      display: block;
      width: 1.54rem;
      height: 0.69rem;
      color: #207ca1;
      font-size: 80%;
      line-height: 0.5rem;
      position: absolute;
      right: 0;
      top: 0.8rem;
      text-align: center;
      text-indent: 0.2rem;
      background: url(../assets/img/ruleBg.png);
      background-size: 100% 100%;
      &.top {
        top: 1.5rem;
      }
    }
  }
  .bgbox {
    position: relative;
    height: 5.5rem;
    .wardsBox {
      width: 7.5rem;
      height: 5.5rem;
      margin: 0 auto;
      background: url(../assets/img/wards.png);
      background-size: 100% 100%;
      z-index: 5;
      position: absolute;
    }
    .bgTop {
      width: 7.5rem;
      height: 12.84rem;
      background: url(../assets/img/bgTop.png);
      background-size: contain;
      position: absolute;
      top: 0.3rem;
    }
    .bgBottom {
      width: 7.5rem;
      height: 12.84rem;
      background: url(../assets/img/bgBootom.png);
      background-size: contain;
      position: absolute;
      top: 6rem;
    }
  }

  .listTab {
    width: 6.9rem;
    height: 0.9rem;
    margin: 0.17rem auto 0;
    background: url(../assets/img/listTabBg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 100;
    > a {
      display: block;
      width: 49%;
      height: 0.79rem;
      text-align: center;
      line-height: 0.79rem;
      color: #ccadd0;
      &.active {
        background: url(../assets/img/listActive.png);
        background-size: 100% 100%;
        color: #fffee7;
      }
      &.works {
        margin: 0.02rem 0 0 0.08rem;
      }
      &.kRoom {
        margin: 0.05rem 0 0.05rem 0;
      }
    }
    .wardsList {
      width: 0.42rem;
      height: 1.43rem;
      background: url(../assets/img/cebian.png);
      background-size: 100% 100%;
      position: absolute;
      top: 1rem;
      right: -0.3rem;
    }
  }
  .footer {
    height: 1.55rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: url(../assets/img/footer.png);
    background-size: 100% 100%;
    .singUp {
      display: block;
      width: 3.08rem;
      height: 0.72rem;
      background: linear-gradient(
        0deg,
        rgba(229, 92, 154, 1),
        rgba(250, 234, 122, 1)
      );
      color: #fffee7;
      box-shadow: 0px 0px 13px 0px rgba(160, 52, 212, 0.6);
      border-radius: 0.1rem;
      font-size: 120%;
      line-height: 0.76rem;
      text-align: center;
      position: absolute;
      left: 2.25rem;
      top: 0.63rem;
    }
    > span {
      width: 3.32rem;
      height: 0.96rem;
      background: url(../assets/img/noAct.png);
      background-size: 100% 100%;
      position: absolute;
      left: 2.08rem;
      top: 0.5rem;
      font-size: 120%;
      text-align: center;
      line-height: 0.96rem;
      color: #f4f4f4;
    }
    .myMsg {
      // width: 7.5rem;
      height: 0.9rem;
      display: flex;
      align-items: center;
      margin: 0.51rem auto 0;
      padding: 0 0.64rem 0 0.63rem;
      .rank {
        display: inline-block;
        width: 0.55rem;
        height: 0.5rem;
        background: url(../assets/img/myRank.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.5rem;
        font-size: 65%;
        color: #fdfdfd;
      }
      img {
        width: 0.86rem;
        height: 0.86rem;
        border-radius: 50%;
        border: 0.04rem solid #fff;
        margin-left: 0.24rem;
      }
      .msgBox {
        width: 1.8rem;
        margin-left: 0.1rem;
        .msgTop {
          font-size: 80%;
          height: 50%;
          max-width: 1.8rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          span {
            color: #fdfdfd;
          }
        }
        .msgBottom {
          font-size: 80%;
          height: 50%;
          white-space: nowrap;
          span {
            color: #63ffe2;
          }
        }
      }
      .scoreBox {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        .workScore {
          display: inline-block;
          width: 0.44rem;
          height: 0.61rem;
          margin-top: -0.15rem;
          background: url(../assets/img/huo.png);
          background-size: 100% 100%;
        }
        .kRoomScore {
          display: inline-block;
          width: 0.43rem;
          height: 0.38rem;
          background: url(../assets/img/start.png);
          background-size: 100% 100%;
        }
        .score {
          color: #fff95b;
          width: 1.3rem;
          margin-left: 0.1rem;
        }
        .got {
          display: inline;
          width: 0.7rem;
          height: 0.3rem;
          margin-left: 0.1rem;
          font-size: 80%;
          color: #ff4cb5;
          i {
            display: inline-block;
            width: 0.21rem;
            height: 0.23rem;
            background: url(../assets/img/goT.png) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .unpload {
        width: 2.47rem;
        height: 0.76rem;
        background: linear-gradient(
          0deg,
          rgba(165, 68, 233, 1),
          rgba(219, 74, 158, 1),
          rgba(255, 204, 106, 1)
        );
        border-radius: 0.38rem;
        margin: 0.15rem 0 0 0.2rem;
        text-align: center;
        line-height: 0.7rem;
      }
    }
  }
  .share {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 1.2rem;
    background: url(../assets/img/share_bar.png);
    background-size: 100% 100%;
    z-index: 999;
  }
  .refresh {
    display: block;
    width: 0.94rem;
    height: 1rem;
    position: fixed;
    right: 0.2rem;
    bottom: 1.2rem;
    z-index: 999;
    background: url(../assets/img/refresh.png);
    background-size: 100% 100%;
    transition: all 1s;
  }
}
</style>


