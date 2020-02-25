<template>
  <div class="footer">
    <div class="noStart" v-if="showState ===0">
      Acara belum dimulai
    </div>
    <div class="end" v-if="showState ===1">
      Acara telah berakhir
    </div>
    <div class="end" v-if="showState ===4">
      Anda telah berhasil debut,tidak dapat ikut acara ini
    </div>
    <div class="singUpBox" v-if="showState ===2 || isShare">
      <span class="singUp" @click="goSingUp()">Mendaftar untuk ikut acara</span>
    </div>
    <div class="list" v-if="showState ===3 ">
      <span class="rank">{{myMsg.rank}}</span>
      <div class="imgbox" :class="{minw:myMsg.rank > 3}">
        <img src="../assets/img/top1.png" alt="" class="topimg" v-if="myMsg.rank==1">
        <img src="../assets/img/top2.png" alt="" class="topimg" v-if="myMsg.rank==2">
        <img src="../assets/img/top3.png" alt="" class="topimg" v-if="myMsg.rank==3">
        <img :src="require('../assets/img/'+ myMsg.is_noble +'.png')" alt="" v-if="myMsg.is_noble !==0 && myMsg.rank > 3" class="noble">
        <img v-lazy="myMsg.avatar" alt="" class="img2">
      </div>
      <div class="userMsg">
        <div class="name">{{myMsg.nick}}</div>
        <div class="ID">{{myMsg.uid}}</div>
        <!-- <div class="vip">
          <span class="king" v-if="myMsg.kstatus >0"></span>
          <span class="vipIcon" v-if="myMsg.is_vip > 0"><em>VIP:{{myMsg.is_vip}}</em></span>
        </div> -->
      </div>
      <span class="score"><em></em>{{myMsg.score}}</span>
    </div>
    <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-if="showT"></msg-toast>
  </div>
</template>
<script>
import { mapState } from "vuex"
import MsgToast from "../components/commonToast.vue"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
export default {
  components: { MsgToast },
  data() {
    return {
      tastMsg: '',
      showT: false,

    }
  },
  computed: {
    ...mapState(["groupsUserMsg", "activeityState", "isShare", "tab", "rankGroups", "isDebut", "nowDay"]),
    showState() {
      if (this.isShare) {
        return 2
      } else if (this.activeityState == 0) {
        //活動未開始
        return 0
      } else if (this.activeityState == 2) {
        //活動已結束
        return 1
      } else if (this.isDebut) { //当前用户已出道
        return 4
      } else if (this.activeityState == 1 && this.groupsUserMsg[this.tab] && (this.groupsUserMsg[this.tab].msg && !this.groupsUserMsg[this.tab].msg.registered)) { //用戶未报名
        return 2
      } else if (this.activeityState == 1 && this.groupsUserMsg[this.tab] && (this.groupsUserMsg[this.tab].msg && this.groupsUserMsg[this.tab].msg.registered)) { //已报名
        return 3
      }
    },
    myMsg() {
      if (this.groupsUserMsg[this.tab]) {
        return this.groupsUserMsg[this.tab].msg
      }

    }
  },
  methods: {
    goSingUp() {
      if (this.isShare) {
        APP()
        return
      }
      var listChang = this.tab == "total" ? "0" : this.tab
      api.singUpMsg(listChang).then((res) => {
        const { response_data, response_status } = res.data
        if (response_status.code === 20007) {  //歌手等级大于四级
          this.tastMsg = "Acara Newcomer King/Pendatang Baru ini hanya tersedia untuk pengguna dengan level penyanyi ≤4!"
          this.showT = true
        } else if (response_status.code === 20005) { //已经报名
          this.tastMsg = "Telah mendaftar!"
          this.showT = true
        } else if (response_status.code === 0) {  //报名成功
          this.tastMsg = "Berhasil mendaftar </br>Buruan masuk kamar karaoke untuk bernyanyi lah~"
          this.showT = true
          //当前天数排行榜添加用户数据
          if (this.rankGroups[this.nowDay] && this.rankGroups[this.nowDay].list.length < 20) {
            this.rankGroups[this.nowDay].list.push(response_data.owner_info)
          }
          //总榜添加用户数据
          if (this.rankGroups['total'] && this.rankGroups['total'].list.length < 20) {
            this.rankGroups['total'].list.push(response_data.owner_info)
          }
          //循环修改缓存好的天数报名状态
          var newGroups = this.groupsUserMsg
          for (let key in newGroups) {
            newGroups[key].msg = response_data.owner_info
          }
          this.$store.commit("changGroupsUserMsg", newGroups)
        }
      })
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style lang="scss">
.footer {
  height: 2.18rem;
  background: url(../assets/img/footer.png);
  background-size: 100% 100%;
  text-align: center;
  // line-height: 1rem;
  position: fixed;
  bottom: -0.1rem;
  left: 0;
  right: 0;
  z-index: 199;
  // padding-top: 1.08rem;
  .noStart {
    margin-top: 1.38rem;
  }
  .end {
    margin-top: 1.38rem;
  }
  .singUp {
    display: inline-block;
    width: 4.51rem;
    height: 0.8rem;
    background: url(../assets/img/singUpBtm.png);
    background-size: 100% 100%;
    font-weight: bold;
    font-size: 120%;
    line-height: 0.8rem;
    margin-top: 1.08rem;
  }
  .list {
    width: 6.5rem;
    height: 1.17rem;
    margin: 0.84rem auto 0;
    // background: url(../assets/img/liItem.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 0.35rem;
    .rank {
      display: inline-block;
      width: 0.7rem;
      height: 0.4rem;
      text-align: center;
      color: #ffee82;
      font-size: 115%;
      margin-top: 0.1rem;
      font-weight: bold;
    }
    .imgbox {
      width: 1.47rem;
      height: 1.36rem;
      position: relative;
      margin: 0.1rem;
      &.minw {
        width: 1.2rem;
        margin-right: 0;
        .noble {
          width: 1.37rem;
          height: 1.59rem;
        }
        .img2 {
          width: 0.92rem;
          height: 0.92rem;
          left: 0.13rem;
        }
      }
      .topimg {
        width: 1.6rem;
        height: 1.6rem;
        position: absolute;
        top: -0.1rem;
        left: 0;
        z-index: 105;
      }
      .img2 {
        width: 1rem;
        height: 1rem;
        position: absolute;
        top: 0.25rem;
        left: 0.32rem;
        border-radius: 50%;
      }
      .noble {
        width: 1.47rem;
        height: 1.69rem;
        position: absolute;
        z-index: 100;
        top: -0.1rem;
        left: -0.1rem;
      }
    }
    .userMsg {
      margin: 0.5rem 0 0 0.1rem;
      width: 2.5rem;
      height: 100%;
      text-align: left;
      > div {
        // height: 50%;
        // line-height: 0.58rem;
      }
      .name {
        font-size: 120%;
        max-width: 2.5rem;
        color: #ffee82;
        overflow: hidden;
        text-overflow: ellipsis; /* 超出部分显示省略号 */
        white-space: nowrap; /*规定段落中的文本不进行换行 */
      }
      .ID {
        font-size: 90%;
      }
      .vip {
        display: flex;
        align-items: center;
        .king {
          display: inline-block;
          width: 1.34rem;
          height: 0.3rem;
          background: url(../assets/img/ked.png);
          background-size: 100% 100%;
        }
        .vipIcon {
          display: inline-block;
          width: 0.67rem;
          height: 0.3rem;
          background: url(../assets/img/VIP.png);
          background-size: 100% 100%;
          margin-left: 0.1rem;
          em {
            display: block;
            width: 0.67rem;
            height: 0.3rem;
            font-size: 80%;
            transform: scale(0.8);
            margin-top: -0.06rem;
            text-align: center;
            color: #5cffdb;
          }
        }
      }
    }
    .score {
      display: inline-block;
      height: 0.5rem;
      line-height: 0.5rem;
      display: flex;
      align-items: center;
      font-size: 90%;
      margin-left: 0.3rem;
      em {
        display: inline-block;
        width: 0.66rem;
        height: 0.5rem;
        background: url(../assets/img/魅力值标志.png);
        background-size: 100% 100%;
      }
    }
  }
}
</style>
