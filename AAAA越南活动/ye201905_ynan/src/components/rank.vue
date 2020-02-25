<template>
  <div class="rank">
    <div class="rankTitle">
      <!-- <i class="query" @click="showTipsPup()"></i> -->
      <span :class="{act:showCom=='rank1'}" @click="changTab('rank1')">{{lang.tab1}}</span>
      <span :class="{act:showCom=='rank2'}" @click="changTab('rank2')">{{lang.tab2}}</span>
    </div>
    <div class="rankTips">
      <p v-show="showCom=='rank1'">{{lang.rank1Tips}}</p>
      <p v-show="showCom=='rank2'">{{lang.rank2Tips}}</p>
    </div>
    <!-- 家族榜 -->
    <div class="rankList" v-show="showCom=='rank1'">
      <ul class="list">
        <li v-for="(item,index) in rank1" :key="index" @click="showFamilyCard(item)" :class="'rank'+item.rank">
          <div class="userRank">{{item.rank}}</div>
          <div class="imgBox">
            <span class="topImg" v-if="item.rank <= 3"></span>
            <img v-else src="../assets/img/defaluteImg.png" alt="" class="defalute">
            <img v-lazy="item.avatar" alt="" class="userImg">
          </div>
          <div class="userMsg">
            <div class="userPeople">
              <div class="leftPeople">
                <div class="name">{{item.familyname}}</div>
                <div class="rid">ID:{{item.fid}}</div>
              </div>
              <div class="rightPeople">
                <strong>{{lang.essence}}</strong>
                <div class="peopelAvatar">
                  <span v-for="(item2,index2) in item.family_user_rank" :key="index2" class="pelpleItem" @click.stop="goUser(item2.uid)">
                    <img v-lazy="item2.avatar" alt="" class="people">
                    <img v-if="item2.is_elite == 1" src="../assets/img/jingy.png" alt="" class="imgTips">
                  </span>
                  <span v-for="(item2,index2) in 3-item.family_user_rank.length" :key="index2+'1'" class="pelpleItem">
                    <img v-lazy="item2.avatar" alt="" class="people">
                    <img v-if="item2.is_elite == 1" src="../assets/img/jingy.png" alt="" class="imgTips">
                  </span>
                </div>
              </div>
            </div>
            <div class="userScore">
              <div class="rScore">
                <span>{{lang.familyScore}}</span>
                <strong>{{item.charm_score}}</strong>
              </div>
              <div class="ticketScore">
                <span>{{lang.familyScore2}}</span>
                <strong>{{item.ticket_score}}</strong>
              </div>
              <div class="totalScore">
                <span>{{lang.familyTotalScore}}</span>
                <strong>{{item.score}}</strong>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <p v-if="rank1.length == 0" class="noData">{{lang.noData}}</p>
    </div>
    <!-- 個人榜 -->
    <div class="totalRank" v-show="showCom=='rank2'">
      <ul>
        <li v-for="(item,index) in rank2" :key="index" @click.stop="goUser(item.uid)" :class="'rank'+item.rank">
          <div class="userRank">{{item.rank}}</div>
          <div class="imgBox">
            <img v-if="item.is_elite == 1" src="../assets/img/totalUserBg.png" alt="" class="topImg">
            <img v-lazy="item.avatar" alt="" class="userImg">
          </div>
          <div class="userMsg">
            <div class="name">{{item.nick}}</div>
            <div class="uid">ID:{{item.uid}}</div>
          </div>
          <div class="score">
            <em>{{lang.coinsScore}}</em>
            <strong>{{item.score}}</strong>
          </div>
        </li>
      </ul>
      <p v-if="rank2.length == 0" class="noData">{{lang.noData}}</p>
    </div>
    <div class="mask" v-show="showCard">
      <transition name="slide">
        <div class="failmyCard" v-show="showCard">
          <span class="close" @click="closeCard()"></span>
          <div class="familyMsg">
            <div class="left">
              <div class="imgBox" @click="goFamily(carMsg.fid)">
                <img src="../assets/img/defaluteImg.png" alt="" class="defalute">
                <img v-lazy="carMsg.avatar" alt="" class="familyImg">
              </div>
              <div class="familyName">{{carMsg.familyname}}</div>
              <div class="familyId">ID:{{carMsg.fid}}</div>
            </div>
            <div class="rigth">
              <span>{{lang.familyPoepleNum}}<em>{{carMsg.member_counts}}</em></span>
              <span>{{lang.familyCardScore}}<em>{{carMsg.charm_score}}</em></span>
              <span>{{lang.familyCardScore2}}<em>{{carMsg.ticket_score}}</em></span>
              <span>{{lang.familyCardRank}}<em>{{carMsg.family_rank == 0 ? '100+':carMsg.family_rank}}</em></span>
              <span>{{lang.familyCardAdd}}<em>{{carMsg.family_scale+'%'}}</em></span>
              <span>{{lang.familyCardAdd2}}<em>{{jyAddition}}</em></span>
              <span>{{lang.familyCardTotaScore}}<em>{{carMsg.score}}</em></span>
            </div>
          </div>
          <div class="familyPeople">
            <div v-for="(item,index) in carMsg.family_user_rank" :key="index" class="peopleItem" @click.stop="goUser(item.uid)">
              <div class="imgBox">
                <img src="../assets/img/jingy.png" alt="" v-if="item.is_elite==1" class="defaluteImg">
                <img v-lazy="item.avatar" alt="" class="avatar">
              </div>
              <strong>{{item.score}}</strong>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- <div class="mask" v-show="showTips">
      <transition name="slide">
        <div class="actTips" v-show="showTips">
          <span class="close" @click="closeTipsPup()"></span>
          <p class="tips1">家族積分值=報名後家族成員收穫禮物魅力值（作品+K房）*（1+年度加成）</p>
          <p class="tips2">榮耀票值=贈送家族榮耀票獲得的魅力值</p>
          <p class="tips3">家族菁英為金幣送禮魅力值前3名，每位菁英魅力值超過30萬則家族總榮耀值加成1%，最高加成3%</p>
        </div>
      </transition>
    </div> -->
  </div>
</template>
<script>
import { mapState } from "vuex"
import api from "../api/apiConfig"
export default {
  data() {
    return {
      showCom: 'rank1',
      showCard: false,
      showTips: false,
      carMsg: {}, //彈窗家族信息
      isMore: true,
      isLoaded: false,
      arrLength: {
        'rank1': 5,
        'rank2': 20
      }
    }
  },
  computed: {
    ...mapState(['rankGroups']),
    rank1() {
      return this.rankGroups['rank1'] ? this.rankGroups['rank1'].rank : []
    },
    rank2() {
      return this.rankGroups['rank2'] ? this.rankGroups['rank2'].rank : []
    },
    jyAddition() {
      if (this.carMsg.family_user_rank) {
        let count = 0
        this.carMsg.family_user_rank.forEach(element => {
          if (element.is_elite == 1) {
            count++
          }
        });
        return count + '%'
      }

    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  methods: {
    changTab(val) {
      if (!this.rankGroups['rank2']) {
        this.getRank2()
      }
      this.showCom = val
      this.$store.commit('changShowCom', this.showCom)
    },
    getRank2() {
      api.getRank(1, 0).then(res => {
        let rank2 = res.data.response_data.rank
        let owner_msg = res.data.response_data.owner_msg
        this.$store.commit('updateRankGroups', {
          key: 'rank2',
          rank: rank2,
          loaded: rank2 < 20
        })
        this.$store.commit('updateMsgGroups', {
          key: 'rank2',
          userMsg: owner_msg,
        })
      })
    },
    onScroll() {
      if (this.isMore) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
        if (scrollToBottom) { //加載更多
          let tRank = this.rankGroups[this.showCom] ? this.rankGroups[this.showCom] : {}
          if (!tRank.loaded && tRank.rank) {
            let rank_state = this.showCom == 'rank1' ? 0 : 1
            this.isMore = false
            api.getRank(rank_state, tRank.rank.length, 'more').then(res => {
              this.isMore = true
              const { rank } = res.data.response_data
              let rankType = this.showCom == 'rank1' ? this.rank1 : this.rank2
              this.$store.commit('updateRankGroups', {
                key: this.showCom,
                rank: rankType.concat(rank),
                loaded: rank < this.arrLength[this.showCom]
              })
            })
          }
        }
      }
    },
    showFamilyCard(item) {
      this.carMsg = item
      this.showCard = true
    },
    closeCard() {
      this.showCard = false
    },
    goUser(uid) {
      location.href = `uid:${uid}`
    },
    goFamily(fid) {
      location.href = `fid:${fid}`
    },
    showTipsPup() {
      this.showTips = true
    },
    closeTipsPup() {
      this.showTips = false
    }
  }
}
</script>
<style lang="scss" scoped>
.rank {
  position: relative;
  margin-top: 0.45rem;
  padding-bottom: 2rem;
  .rankTitle {
    width: 6.74rem;
    height: 0.9rem;
    background: url(../assets/img/tabBg.png);
    background-size: 100% 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.08rem;
    position: relative;
    .query {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      background: url(../assets/img/query.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0.2rem;
      top: -0.5rem;
    }
    span {
      width: 3.51rem;
      height: 0.79rem;
      text-align: center;
      line-height: 0.79rem;
      color: #fffb8e;
      font-weight: 700;
      &.act {
        color: #fff;
        background: url(../assets/img/tabAct.png);
        background-size: 100% 100%;
      }
    }
  }
  .rankTips {
    color: #ffdb7b;
    font-weight: 500;
    text-align: center;
    margin: 0.14rem auto 0.15rem;
    p {
      font-size: 0.21rem;
    }
  }
  .totalRank {
    padding: 0 0.25rem;
    margin-top: 0.15rem;
    li {
      height: 1.1rem;
      margin-bottom: 0.09rem;
      background: url(../assets/img/totalRankBg.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      .userRank {
        width: 0.75rem;
        height: 0.65rem;
        line-height: 0.65rem;
        text-align: center;
        color: #7f3e0a;
        font-size: 120%;
        font-weight: 800;
        margin-left: 0.08rem;
      }
      .imgBox {
        width: 0.97rem;
        height: 1.02rem;
        position: relative;
        .topImg {
          width: 0.97rem;
          height: 1.02rem;
          position: absolute;
          z-index: 10;
        }
        .userImg {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          border: 0.02rem solid #ffbc96;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .userMsg {
        width: 2rem;
        margin-left: 0.16rem;
        .name {
          max-width: 2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 93%;
          color: #ffeecb;
        }
        .uid {
          font-size: 73%;
          color: #ffde9f;
        }
      }
      .score {
        text-align: center;
        margin-left: 0.8rem;
        em {
          display: block;
          font-size: 73%;
          color: #ffeecb;
        }
        strong {
          color: #ffeecb;
          font-size: 0.28rem;
        }
      }
      &.rank1 {
        background: url(../assets/img/totalTop1Bg.png);
        background-size: 100% 100%;
        .userRank {
          text-indent: -999rem;
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        background: url(../assets/img/totalTop2Bg.png);
        background-size: 100% 100%;
        .userRank {
          text-indent: -999rem;
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        background: url(../assets/img/totalTop2Bg.png);
        background-size: 100% 100%;
        .userRank {
          text-indent: -999rem;
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .rankList {
    padding: 0 0.25rem;
    margin-top: 0.15rem;
    .list {
      margin-top: 0.15rem;
      li {
        height: 1.61rem;
        margin-bottom: 0.13rem;
        background: url(../assets/img/listBg.png);
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        .userRank {
          width: 0.75rem;
          height: 0.65rem;
          line-height: 0.65rem;
          text-align: center;
          color: #7f3e0a;
          font-size: 120%;
          font-weight: 800;
          margin-left: 0.08rem;
        }
        .imgBox {
          width: 1.45rem;
          height: 1.35rem;
          overflow: hidden;
          position: relative;
          .topImg {
            position: absolute;
            z-index: 10;
          }
          .defalute {
            width: 1.2rem;
            height: 1.2rem;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
          }
          .userImg {
            width: 1.15rem;
            height: 1.15rem;
            border-radius: 0.1rem;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .userMsg {
          flex: 1;
          margin-left: 0.06rem;
          .userPeople {
            height: 0.6rem;
            display: flex;
            .leftPeople {
              width: 1.7rem;
              .name {
                color: #ffeecb;
                font-size: 0.28rem;
                font-weight: 600;
                max-width: 1.7rem;
                height: 0.42rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              .rid {
                font-size: 0.22rem;
                color: #ffde9f;
              }
            }
            .rightPeople {
              width: 2.32rem;
              background: linear-gradient(
                -37deg,
                rgba(235, 173, 105, 0.6),
                rgba(169, 101, 58, 0.6)
              );
              border-radius: 0.1rem;
              display: flex;
              align-items: center;
              margin-left: 0.3rem;
              padding: 0 0.12rem;
              strong {
                font-size: 80%;
                color: #ffeecb;
                white-space: nowrap;
              }
              .peopelAvatar {
                width: 1.83rem;
                margin-left: 0.1rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .pelpleItem {
                  width: 0.5rem;
                  height: 0.5rem;
                  position: relative;
                  .people {
                    width: 0.5rem;
                    height: 0.5rem;
                    border-radius: 50%;
                    box-sizing: border-box;
                    border: 0.02rem solid rgba(255, 188, 150, 1);
                    position: absolute;
                  }
                  .imgTips {
                    width: 0.61rem;
                    height: 0.63rem;
                    position: absolute;
                    top: -0.075rem;
                    left: -0.065rem;
                  }
                }
              }
            }
          }
          .userScore {
            display: flex;
            margin-top: 0.1rem;
            span {
              display: block;
              font-size: 0.22rem;
            }
            strong {
              font-size: 0.26rem;
              font-weight: 500;
            }
            .rScore {
              color: #f4d3ff;
              width: 1.5rem;
            }
            .ticketScore {
              width: 1.6rem;
              color: #baf6ff;
              // margin-left: 0.2rem;
            }
            .totalScore {
              color: #ffeecb;
              text-align: center;
              margin-left: 0.1rem;
              flex: 1;
              strong {
                font-size: 0.28rem;
                font-weight: 600;
              }
            }
          }
        }
        &.rank1 {
          background: url(../assets/img/top1Bg.png);
          background-size: 100% 100%;
          .userRank {
            text-indent: -999rem;
            background: url(../assets/img/top1.png);
            background-size: 100% 100%;
          }
          .topImg {
            display: block;
            width: 1.45rem;
            height: 1.35rem;
            background: url(../assets/img/rank1Img.png);
            background-size: 100% 100%;
          }
        }
        &.rank2 {
          background: url(../assets/img/top2Bg.png);
          background-size: 100% 100%;
          .userRank {
            text-indent: -999rem;
            background: url(../assets/img/top2.png);
            background-size: 100% 100%;
          }
          .topImg {
            display: block;
            width: 1.45rem;
            height: 1.35rem;
            background: url(../assets/img/rank2Img.png);
            background-size: 100% 100%;
          }
        }
        &.rank3 {
          background: url(../assets/img/top2Bg.png);
          background-size: 100% 100%;
          .userRank {
            text-indent: -999rem;
            background: url(../assets/img/top3.png);
            background-size: 100% 100%;
          }
          .topImg {
            display: block;
            width: 1.45rem;
            height: 1.35rem;
            background: url(../assets/img/rank3Img.png);
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
.failmyCard {
  width: 4.72rem;
  height: 5.43rem;
  background: url(../assets/img/familyCard.png);
  background-size: 100% 100%;
  position: absolute;
  top: 3.2rem;
  left: 1.41rem;
  .close {
    display: block;
    width: 0.53rem;
    height: 0.53rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: -0.22rem;
    top: -0.8rem;
    transform: translate(-50%, 0);
  }
  .familyMsg {
    width: 4.08rem;
    height: 2.1rem;
    position: absolute;
    top: 1.79rem;
    left: 0.32rem;
    display: flex;
    .left {
      width: 1.8rem;
      height: 1.2rem;
      .imgBox {
        width: 1.2rem;
        height: 1.2rem;
        margin: 0 auto;
        position: relative;
        .defalute {
          width: 1.2rem;
          height: 1.2rem;
          position: absolute;
          z-index: 10;
        }
        .familyImg {
          width: 1.16rem;
          height: 1.16rem;
          position: absolute;
          left: 0.02rem;
          top: 0.02rem;
        }
      }
      .familyName {
        //font-size: 93%;
        height: 0.44rem;
        font-weight: 600;
        text-align: center;
        max-width: 1.8rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: 0.21rem;
      }
      .familyId {
        font-size: 86%;
        color: #ffde9f;
        text-align: center;
      }
    }
    .rigth {
      flex: 1;
      span {
        font-size: 0.22rem;
        display: block;
        line-height: 0.3rem;
        display: flex;
        white-space: nowrap;
        em {
          font-size: 0.22rem;
          font-weight: 500;
          color: #ffdf99;
        }
      }
    }
  }
  .familyPeople {
    width: 3.45rem;
    height: 1.1rem;
    border-radius: 0.15rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 4.08rem;
    left: 0.42rem;
    padding: 0 0.2rem;
    .peopleItem {
      width: 33%;
      .imgBox {
        width: 0.5rem;
        height: 0.5rem;
        position: relative;
        margin: 0 auto;
        .defaluteImg {
          width: 0.61rem;
          height: 0.63rem;
          position: absolute;
          top: -0.075rem;
          left: -0.065rem;
          z-index: 10;
        }
        .avatar {
          width: 0.5rem;
          height: 0.5rem;
          box-sizing: border-box;
          border-radius: 50%;
          border: 0.02rem solid rgba(255, 188, 150, 1);
          position: absolute;
        }
      }
      strong {
        display: block;
        width: 100%;
        color: #ffeecb;
        font-size: 86%;
        text-align: center;
        white-space: nowrap;
        margin-top: 0.05rem;
        font-weight: 500;
      }
    }
  }
}
.actTips {
  width: 4.25rem;
  // height: 2.68rem;
  background: url(../assets/img/pupBg2.png);
  background-size: 100% 100%;
  position: absolute;
  left: 1.45rem;
  top: 4.5rem;
  padding: 0.23rem;
  .close {
    display: block;
    width: 0.53rem;
    height: 0.53rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: -0.22rem;
    top: -0.8rem;
    transform: translate(-50%, 0);
  }
  p {
    // font-size: 80%;
    font-weight: 500;
    &.tips1 {
      color: #f4d3ff;
      margin-bottom: 0.2rem;
    }
    &.tips2 {
      color: #baf6ff;
      margin-bottom: 0.3rem;
    }
    &.tips3 {
      color: #ffeecb;
    }
  }
}
.noData {
  text-align: center;
}
</style>
