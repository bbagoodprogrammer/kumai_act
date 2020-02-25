<template>
  <div class="match">
    <div class="matchTabs">
      <div class="liner"></div>
      <span v-for="(item,index) in actList" :key="index" :class="[{act:tab == index},'item'+index]" @click="tabsClick(index)">
        <div class="late" v-if="tab == index">
          <div class="slide"></div>
        </div>
        <strong>{{item.name}}</strong>
        <em v-if="item.status == 2">Đã kết thúc</em>
        <em v-else-if="item.status == 1">- Đang diễn ra -</em>
        <em v-else>{{item.actStime}}bắt đầu</em>
      </span>
    </div>
    <div class="goHtml" :class="'act' + nowAct.act_id">
      <div class="actTitle">{{nowAct.act_id==5?`Phòng: ${nowAct.rid}`:nowAct.name}}</div>
      <div class="actState">
        <span v-if="nowAct.status == 2">- Đã kết thúc -</span>
        <span v-else-if="nowAct.status == 1">- Đang diễn ra -</span>
        <span v-else>- {{nowAct.actStime}}bắt đầu -</span>
      </div>
      <div class="goBtn" @click="goHtml(nowAct.act_id,nowAct.rid)">Vào sự kiện</div>
    </div>
    <div class="actRank" v-if="tab !=0 && tab!=5" :class="'rank'+tab">
      <div :class="['title'+tab,'title']"></div>
      <div class="rankTop" :class="{item2:tab==2}">
        <span class="man" v-if="tab==2">Nam Thần Quốc Dân</span>
        <span v-for="(item,index) in nowActRank.total_rank[0]" :key="index" :class="'rankItem'+index">
          <div class="imgBox">
            <img v-lazy="item.avatar" alt="" @click="goUser(item.uid,item.fid)">
          </div>
          <em>{{item.nick}}</em>
        </span>
      </div>
      <div class="rankBton" v-if="tab == 2">
        <span class="gird">Nữ Thần Quốc Dân </span>
        <span v-for="(item,index) in nowActRank.total_rank[1]" :key="index" :class="'rankBtn'+index">
          <div class="imgBox">
            <img v-lazy="item.avatar" alt="" @click="goUser(item.uid,item.fid)">
          </div>
          <em>{{item.nick}}</em>
        </span>
      </div>
    </div>

    <transition name=" slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
  </div>
</template>
<script>
import { mapState } from "vuex"
import getDate from "../utils/getDate"
import MsgToast from "../components/commonToast"
import api from "../api/apiConfig"
import getString from "../utils/getString"
import { globalBus } from '../utils/eventBus'
export default {
  components: { MsgToast },
  data() {
    return {
      tab: 0,
      tastMsg: '',
      showT: false,
      defalte_rank: [
        [
          {
            "uid": null,
            "score": 1,
            "rank": 1,
            "avatar": "",
            "nick": "Còn trống"
          },
          {
            "uid": null,
            "score": 1,
            "rank": 2,
            "avatar": "",
            "nick": "Còn trống"
          },
          {
            "uid": null,
            "score": 1,
            "rank": 2,
            "avatar": "",
            "nick": "Còn trống"
          }
        ]
        ,
        [
          {
            "uid": null,
            "score": 1,
            "rank": 1,
            "avatar": "",
            "nick": "Còn trống"
          },
          {
            "uid": null,
            "score": 1,
            "rank": 2,
            "avatar": "",
            "nick": "Còn trống"
          },
          {
            "uid": null,
            "score": 1,
            "rank": 2,
            "avatar": "",
            "nick": "Còn trống"
          }
        ]
      ]
    }
  },
  computed: {
    ...mapState(['actList', 'rankGroups']),
    nowAct() {
      return this.actList[this.tab] ? this.actList[this.tab] : ''
    },
    nowActRank() {
      const rank = this.rankGroups[this.tab] ? this.rankGroups[this.tab] : { total_rank: [[], []], }
      return rank
    }
  },
  methods: {
    tabsClick(index) {
      this.tab = index
      this.changTab()
    },
    changTab() {
      if (!this.nowActRank.loaded) {
        api.rank(this.tab).then(res => {
          let total_rank = res.data.response_data.total_rank
          this.$store.commit('updateRankGroups', {
            key: this.tab,
            total_rank: total_rank.length > 0 ? total_rank : this.defalte_rank,
            loaded: true
          })
        })
      }
    },
    getTime(tm) {
      return getDate(new Date(tm * 1000), '~')
    },
    goHtml(tid, rid) {
      globalBus.$emit('commonEvent', () => {
        api.upadateAct(tid)
        if (tid == 5 && rid) {
          location.href = `rid:${rid}`
        } else if (this.actList[this.tab].url != '') {
          let regstr = getString('token')
          let uid = getString("uid")
          let newUrl = this.actList[this.tab].url.replace('#ID#', uid).replace('#TOKEN#', regstr)
          location.href = newUrl
        } else {
          this.tastMsg = 'Sự kiện chưa bắt đầu,Vui lòng đợi'
          this.showT = true
        }
      })
    },
    closeToast() {
      this.showT = false
    },
    goUser(uid, fid) {
      if (fid) {
        location.href = `fid:${fid}`
      } else if (uid) {
        location.href = `uid:${uid}`
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.late {
  width: 2.21rem;
  height: 0.91rem;
  position: absolute;
  top: 0;
  left: 0.05rem;
  background-size: 100% 100%;
  background-position-x: 0;
  -webkit-mask-image: url(../assets/img/matchItemBgAct.png);
  mask-image: url(../assets/img/matchItemBgAct.png);
  mask-repeat: no-repeat;
  mask-size: 100% 100%;
  .slide {
    width: 2.21rem;
    height: 0.91rem;
    position: absolute;
    top: 0;
    left: -1.85rem;
    background: url(../assets/img/late2.png);
    background-size: 100% 100%;
    animation: late 4s linear infinite;
  }
}
.matchTabs {
  position: relative;
  span {
    display: inline-block;
    width: 2.29rem;
    height: 0.91rem;
    background: url(../assets/img/matchItemBg.png);
    background-size: 100% 100%;
    margin-left: 0.05rem;
    margin-top: 0.23rem;
    vertical-align: middle;
    text-align: center;
    overflow: hidden;
    position: relative;
    z-index: 50;
    strong {
      display: block;
      height: 0.3rem;
      padding: 0.15rem 0.1rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fad48f;
      font-size: 72%;
    }
    em {
      display: block;
      height: 0.45rem;
      line-height: 0.45rem;
      white-space: nowrap;
      color: #b38fbd;
      font-size: 70%;
    }
    &.item2 {
      width: 2.15rem;
      height: 0.91rem;
      background: url(../assets/img/matchItemBg2.png);
      background-size: 100% 100%;
      &.act {
        background: url(../assets/img/matchItemBg2Act.png);
        background-size: 100% 100%;
        color: #fff;
      }
    }
    &.item5 {
      width: 2.15rem;
      height: 0.91rem;
      background: url(../assets/img/matchItemBg2.png);
      background-size: 100% 100%;
      &.act {
        background: url(../assets/img/matchItemBg2Act.png);
        background-size: 100% 100%;
        color: #fff;
      }
    }
  }
  .liner {
    width: 4.7rem;
    height: 1.16rem;
    background: url(../assets/img/line.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.66rem;
    left: 1.14rem;
  }
  .act {
    background: url(../assets/img/matchItemBgAct.png);
    background-size: 100% 100%;
    position: relative;
    strong {
      color: #ffffff;
    }
    em {
      color: #ffffff;
    }
  }
  // .act::after {
  //   content: "";
  //   display: block;
  //   width: 2.21rem;
  //   height: 0.91rem;
  //   background: url(../assets/img/late2.png);
  //   background-size: 100% 100%;
  //   position: absolute;
  //   left: -1.85rem;
  //   top: 0;
  //   z-index: 100;
  //   animation: late 4s linear infinite;
  //   -webkit-mask-image: url(../assets/img/matchItemBgAct.png);
  //   mask-image: url(../assets/img/matchItemBgAct.png);
  // }
}
.goHtml {
  width: 6.9rem;
  height: 2.46rem;
  background: url(../assets/img/goHtmlBg.png);
  background-size: 100% 100%;
  margin: 0.27rem auto 0.37rem;
  position: relative;
  &.act0 {
    background: url(../assets/img/act0Bg.png);
    background-size: 100% 100%;
  }
  &.act1 {
    background: url(../assets/img/act1Bg.png);
    background-size: 100% 100%;
  }
  &.act2 {
    background: url(../assets/img/act2Bg.png);
    background-size: 100% 100%;
  }
  &.act3 {
    background: url(../assets/img/act3Bg.png);
    background-size: 100% 100%;
  }
  .actTitle {
    width: 3rem;
    height: 0.5rem;
    line-height: 0.3rem;
    position: absolute;
    top: 0.32rem;
    left: 1.92rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #fad48f;
  }
  .actState {
    display: block;
    width: 3rem;
    height: 0.5rem;
    position: absolute;
    top: 1rem;
    left: 1.92rem;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 80%;
  }
  .goBtn {
    width: 2.35rem;
    height: 0.71rem;
    background: url(../assets/img/goBtnBg.png);
    background-size: 100% 100%;
    position: absolute;
    top: 1.41rem;
    left: 2.28rem;
    text-align: center;
    line-height: 0.71rem;
  }
}
.actRank {
  width: 6.8rem;
  height: 4.1rem;
  background: url(../assets/img/rankBg.png);
  background-size: 100% 100%;
  margin: 0.37rem auto 0;
  padding-top: 0.29rem;
  position: relative;
  .title {
    margin: 0 auto;
  }
  .title1 {
    width: 3.08rem;
    height: 0.45rem;
    background: url(../assets/img/title1.png);
    background-size: 100%;
    margin-top: -0.05rem;
  }
  .title2 {
    width: 3.08rem;
    height: 0.68rem;
    background: url(../assets/img/title2.png);
    background-size: 100%;
    margin-top: -0.15rem;
  }
  .title3 {
    width: 3.08rem;
    height: 0.38rem;
    background: url(../assets/img/title3.png);
    background-size: 100%;
  }
  .title4 {
    width: 3.08rem;
    height: 0.38rem;
    background: url(../assets/img/title4.png);
    background-size: 100%;
  }
  &.rank2 {
    width: 6.8rem;
    height: 10.1rem;
    background: url(../assets/img/rank2Bg.png);
    background-size: 100% 100%;
  }
  .imgBox {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  em {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #23095a;
    font-size: 80%;
    text-align: center;
  }
  .rankTop {
    height: 3.7rem;
    position: relative;
    .man {
      display: block;
      width: 3.15rem;
      height: 0.66rem;
      background: url(../assets/img/six.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.76rem;
      color: rgba(244, 207, 141, 1);
      position: absolute;
      top: -0.45rem;
      left: 1.85rem;
      font-size: 93%;
    }
    .rankItem0 {
      display: block;
      width: 2.07rem;
      height: 3.91rem;
      background: url(../assets/img/top1.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.05rem;
      left: 2.37rem;
      .imgBox {
        width: 1.31rem;
        height: 1.31rem;
        background: url(../assets/img/top1ImgBg.png);
        background-size: 100% 100%;
        position: absolute;
        top: 1.4rem;
        left: 0.38rem;
        img {
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 50%;
        }
      }
      em {
        width: 1.9rem;
        display: block;
        position: absolute;
        top: 2.78rem;
        left: 0.085rem;
        max-width: 1.9rem;
      }
    }
    .rankItem1 {
      display: block;
      width: 1.66rem;
      height: 3.24rem;
      background: url(../assets/img/top2.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.52rem;
      left: 0.49rem;
      .imgBox {
        width: 1.2rem;
        height: 1.2rem;
        background: url(../assets/img/top2ImgBg.png);
        background-size: 100% 100%;
        position: absolute;
        top: 1.17rem;
        left: 0.23rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 50%;
        }
      }
      em {
        width: 1.5rem;
        display: block;
        position: absolute;
        top: 2.3rem;
        left: 0.08rem;
        max-width: 1.5rem;
      }
    }
    .rankItem2 {
      display: block;
      width: 1.66rem;
      height: 3.24rem;
      background: url(../assets/img/top3.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.52rem;
      right: 0.46rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .imgBox {
        width: 1.2rem;
        height: 1.2rem;
        background: url(../assets/img/top3ImgBg.png);
        position: absolute;
        top: 1.17rem;
        left: 0.23rem;
        img {
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 50%;
        }
      }
      em {
        width: 1.5rem;
        display: block;
        position: absolute;
        top: 2.3rem;
        left: 0.08rem;
        max-width: 1.5rem;
      }
    }
    &.item2 {
      top: 1rem;
    }
  }

  .rankBton {
    height: 3.91rem;
    position: absolute;
    top: 6.29rem;
    display: flex;
    .gird {
      display: block;
      width: 3.15rem;
      height: 0.66rem;
      background: url(../assets/img/six.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.76rem;
      color: rgba(244, 207, 141, 1);
      position: absolute;
      top: -0.5rem;
      left: 1.85rem;
      font-size: 93%;
    }
    .rankBtn0 {
      display: block;
      width: 2.07rem;
      height: 3.91rem;
      background: url(../assets/img/top1.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0rem;
      left: 2.37rem;
      .imgBox {
        width: 1.31rem;
        height: 1.31rem;
        background: url(../assets/img/top1ImgBg.png);
        background-size: 100% 100%;
        position: absolute;
        top: 1.4rem;
        left: 0.38rem;
        img {
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 50%;
        }
      }
      em {
        width: 1.9rem;
        display: block;
        position: absolute;
        top: 2.8rem;
        left: 0.085rem;
        max-width: 1.9rem;
      }
    }
    .rankBtn1 {
      display: block;
      width: 1.66rem;
      height: 3.24rem;
      background: url(../assets/img/top2.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.46rem;
      left: 0.49rem;
      .imgBox {
        width: 1.2rem;
        height: 1.2rem;
        background: url(../assets/img/top2ImgBg.png);
        background-size: 100% 100%;
        position: absolute;
        top: 1.17rem;
        left: 0.23rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 50%;
        }
      }
      em {
        width: 1.5rem;
        display: block;
        position: absolute;
        top: 2.3rem;
        left: 0.08rem;
        max-width: 1.5rem;
      }
    }
    .rankBtn2 {
      display: block;
      width: 1.66rem;
      height: 3.24rem;
      background: url(../assets/img/top3.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.46rem;
      left: 4.68rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .imgBox {
        width: 1.2rem;
        height: 1.2rem;
        background: url(../assets/img/top3ImgBg.png);
        position: absolute;
        top: 1.17rem;
        left: 0.23rem;
        img {
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 50%;
        }
      }
      em {
        width: 1.5rem;
        display: block;
        position: absolute;
        top: 2.3rem;
        left: 0.08rem;
        max-width: 1.5rem;
      }
    }
  }
}
</style>
