<template>
  <div class="footerBar" v-if="astState">
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 1">{{lang.noAct}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEd}}</span>
      <div class="actIng" v-if="astState === 3 ">
        <div class="day" v-if="tab ==0" :class="'rank' + now_owner.rank">
          <div class="userRank">{{now_owner.rank}}</div>
          <div class="imgBox">
            <img v-lazy="now_owner.avatar" alt="" class="av1">
            <img v-lazy="now_owner.fans[0]&&now_owner.fans[0].avatar" alt="" class="av2" v-if="now_owner.fans">
          </div>
          <div class="nick">{{now_owner.nick}}</div>
          <div class="score">
            <span>{{now_owner.score}}</span>
            <u @click="shouFriend(now_owner,'promotion')">{{lang.fans_tips}}</u>
          </div>
        </div>
        <div class="day total" v-else :class="'rank' + now_owner.rank">
          <div class=" userRank">{{now_owner.rank}}</div>
          <div class="imgBox">
            <img v-lazy="now_owner.avatar" alt="" class="av1">
          </div>
          <div class="msg">
            <div class="userMsg">
              <div class="nick">{{now_owner.nick}}</div>
              <div class="score">{{now_owner.score}}</div>
            </div>
            <div class="userPeople">
              <div class="peopleItem">
                <img v-lazy="item2.avatar" alt="" v-for="(item2,index2) in now_owner.fans" :key="index2">
              </div>
              <u @click="shouFriend(now_owner,'final')">{{lang.fans_tips}}</u>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" v-show="showFriendList">
      <transition name="slide">
        <div class="userPeopleList" v-if="showFriendList">
          <i class="close" @click="showFriendList = false"></i>
          <div class="list_title">【{{act_item.nick}}】{{lang.user_fan_group}}</div>
          <div class="list_header">
            <span>{{lang.rank_listHeader1}}</span>
            <span>{{lang.user}}</span>
            <span>{{lang.user_score}}</span>
          </div>
          <ul>
            <li v-for="(item,index) in friendList" :key="index">
              <div class="userRank">{{item.rank}}</div>
              <img v-lazy="item.avatar" alt="">
              <div class="nick">{{item.nick}}</div>
              <div class="score">{{item.score}}</div>
            </li>
          </ul>
          <div class="fans_tips">
            {{lang.fans_score_tips}}
          </div>
          <div class="lookmsg" @click="goUser(act_item.uid)">
            {{lang.look_then}}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { userFriend } from "../apis"
export default {
  props: ['type'],
  data () {
    return {
      act_item: {},
      friendList: [],
      showFriendList: false
    }
  },
  computed: {
    ...mapState(['activity', 'tab', 'groupsUserMsg']),
    astState () {
      if (this.activity.status === 0) { //活动未开始
        return 1
      } else if (this.activity.status === 2) { //活动已结束
        return 2
      } else if (this.now_owner) { //活动开始已报名
        return 3
      }
    },
    now_owner () {
      return this.groupsUserMsg[this.tab] ? this.groupsUserMsg[this.tab].msg : false
    }
  },
  methods: {
    shouFriend (item, type) {
      userFriend(item.uid, type).then(res => {
        this.act_item = item
        this.friendList = res.data.response_data.fans
        this.showFriendList = true
      })
    },
    goUser (uid) { //跳转
      console.log(uid)
      var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      if (isiOS) {
        sendJsData('app://userInfo?uid=' + uid);
      } else {
        javascript: JSInterface.sendJsData('app://userInfo?uid=' + uid);
      }
    },
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
    height: 2.4rem;
    margin: auto;
    display: flex;
    // align-now_owners: center;
    justify-content: center;
    background: url(../img/footer.png);
    background-size: 100% 100%;
    span {
      display: inline-block;
    }
    .noAct {
      font-size: 0.36rem;
      font-weight: 600;
      margin-top: 1.65rem;
    }
    .goAct {
      display: block;
      width: 100%;
      height: 0.96rem;
      position: fixed;
      bottom: 0;
    }
    .actIng {
      width: 100%;
      height: 1.43rem;
      display: flex;
      align-items: center;
      margin-top: 1rem;
      > div {
        display: flex;
        align-items: center;
        .userRank {
          width: 0.72rem;
          height: 0.58rem;
          line-height: 0.58rem;
          margin: 0 0.47rem 0 0.19rem;
          text-align: center;
          font-size: 0.34rem;
          font-weight: bold;
          font-style: italic;
        }
        .imgBox {
          width: 1.6rem;
          height: 1.21rem;
          position: relative;
          img {
            box-sizing: border-box;
            border: 0.02rem solid #F2DA7E;
          }
          .av1 {
            width: 1.21rem;
            height: 1.21rem;
            border-radius: 50%;
            position: absolute;
            top: 0;
            left: 0;
          }
          .av2 {
            width: 0.76rem;
            height: 0.76rem;
            border-radius: 50%;
            position: absolute;
            right: 0rem;
            top: 0.4rem;
          }
        }
        .nick {
          width: 2rem;
          margin-left: 0.25rem;
          text-align: center;
          font-size: 0.26rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .score {
          flex: 1;
          margin-left: 0.25rem;
          text-align: center;
          font-size: 0.34rem;
          color: #FFF83B;
          span {
            display: block;
            text-align: center;
            font-weight: bold;
            font-style: italic;
          }
          u {
            font-size: 0.26rem;
            color: #1AEDE6;
          }
        }
        &.total {
          .imgBox {
            width: 1.4rem;
            margin-left: 0.2rem;
          }
          .msg {
            flex: 1;
            padding-right: 0.2rem;
            .userMsg {
              display: flex;
              align-items: center;
              justify-content: space-between;
              > div {
                margin: 0;
                &.nick {
                  text-align: left;
                }
                &.score {
                  margin-left: 0.6rem;
                }
              }
            }
            .userPeople {
              display: flex;
              align-items: center;
              justify-content: flex-end;
              margin-top: 0.1rem;
              .peopleItem {
                display: flex;
                align-items: center;
                justify-content: space-between;
                img {
                  width: 0.31rem;
                  height: 0.31rem;
                  margin-left: 0.05rem;
                  border-radius: 50%;
                }
              }
              u {
                font-size: 0.24rem;
                color: #1AEDE6;
                margin-left: 0.05rem;
              }
            }
          }
        }
        &.rank1 {
          .userRank {
            text-indent: -99rem;
            background: url(../img/top1.png);
            background-size: 100% 100%;
          }
        }
        &.rank2 {
          .userRank {
            text-indent: -99rem;
            background: url(../img/top2.png);
            background-size: 100% 100%;
          }
        }
        &.rank3 {
          .userRank {
            text-indent: -99rem;
            background: url(../img/top3.png);
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
.userPeopleList {
  width: 7.24rem;
  height: 10.36rem;
  background: url(../img/people_bg.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    display: block;
    width: 0.74rem;
    height: 0.74rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -0.4rem;
  }
  .list_title {
    height: 1.07rem;
    line-height: 1.07rem;
    text-align: center;
    font-size: 0.33rem;
    font-weight: bold;
  }
  .list_header {
    padding: 0 0.34rem;
    height: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #F785C1;
    span {
      font-size: 0.22rem;
    }
  }
  ul {
    height: 6.18rem;
    overflow-y: scroll;
    li {
      width: 7.22rem;
      height: 1.03rem;
      display: flex;
      align-items: center;
      .userRank {
        width: 1rem;
        text-align: center;
        margin-left: 0.05rem;
      }
      img {
        width: 0.83rem;
        height: 0.83rem;
        border-radius: 50%;
        margin-left: 0.34rem;
      }
      .nick {
        width: 2.2rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-left: 0.21rem;
        font-size: 0.28rem;
      }
      .score {
        flex: 1;
        margin-left: 0.8rem;
        text-align: center;
        color: #FFEA59;
        font-size: 0.28rem;
      }
    }
  }
  .fans_tips {
    font-size: 0.28rem;
    color: #E585BD;
    padding: 0 0.48rem;
    margin-top: 0.36rem;
    line-height: 0.34rem;
  }
  .lookmsg {
    width: 3.72rem;
    height: 0.7rem;
    font-size: 0.33rem;
    background: url(../img/lookmsg.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.7rem;
    margin: 0.36rem auto 0;
  }
}
</style>
