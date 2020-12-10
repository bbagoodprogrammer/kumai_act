<template>
  <div class="gList">
    <div class="groupMsg">
      <div class="title" :class="'title'+groupData.team.tid"></div>
      <div class="groupScore">
        <div class="score"><i></i><em>{{groupData.team.score}}</em></div>
      </div>
    </div>
    <ul class="stage1List">
      <li v-for="(item,index) in groupData.list" :key="index" :class="'rank'+item.rank" @click="goPeople(item.uid)">
        <div class="imgBox" @click="goUser(item.uid)">
          <span class="avBg" v-if="item.rank <=3"></span>
          <img v-else-if="item.frame &&item.frame != ''" :src="item.frame" class="frame">
          <img v-lazy="item.avatar" alt="">
          <span class="rank" v-if="item.rank>3">No.{{item.rank}}</span>
        </div>
        <div class="userMsg">
          <div class="nick">{{item.nick}}</div>
          <div class="uid">ID:{{item.uid}}</div>
          <div class="star"><i></i><em>{{item.score}}</em> </div>
        </div>
        <div class="score">
          <div class="work"><i></i><em>{{item.work}}</em> </div>
          <div class="ktv"><i></i><em>{{item.ktv}}</em></div>
          <div class="room"><i></i><em>{{item.room}}</em></div>
        </div>
      </li>
    </ul>
    <Loading />
  </div>
</template>
<script>

import api from "../../api/apiConfig"
import Loading from "../../components/Loading"
import getString from "../../utils/getString"

export default {
  components: { Loading },
  data() {
    return {
      groupData: {
        team: {},
        list: [],
      },
      loaded: false,
      more: true
    }
  },
  created() {
    document.title = '戰隊內人氣排名'
    let tid = getString('tid')
    api.teamSubRank(tid, 0).then(res => {
      this.groupData = res.data.response_data
    })
  },
  mounted() {
    // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    goUser(uid) {
      location.href = `uid:${uid}`
    },
    onScroll() {
      const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
      if (scrollToBottom && !this.loaded && this.more) {
        this.more = false
        let tid = getString('tid')
        api.teamSubRank(tid, this.groupData.list.length, 'more').then(res => {
          this.more = true
          let newList = res.data.response_data.list
          this.groupData.list = this.groupData.list.concat(newList)
          if (newList.length < 20) {
            this.loaded = true
          }
        })
      }
    }
  }

}
</script>
<style lang="scss">
body {
  background: rgba(28, 21, 44, 1);
  .gList {
    padding: 0.41rem 0.18rem 1rem;
    .groupMsg {
      height: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.53rem 0 0.18rem;
      .title {
        width: 2.25rem;
        height: 0.56rem;
        &.title1 {
          background: url(../../assets/img/groupTitle1.png);
          background-size: 100% 100%;
        }
        &.title2 {
          background: url(../../assets/img/groupTitle2.png);
          background-size: 100% 100%;
        }
        &.title3 {
          background: url(../../assets/img/groupTitle3.png);
          background-size: 100% 100%;
        }
        &.title4 {
          background: url(../../assets/img/groupTitle4.png);
          background-size: 100% 100%;
        }
      }
      .groupScore {
        margin: 0.1rem 0 0 1.38rem;
        .score {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 0.3rem;
          i {
            width: 0.28rem;
            height: 0.26rem;
            background: url(../../assets/img/star.png);
            background-size: 100% 100%;
            margin-top: -0.05rem;
          }
          em {
            color: rgba(254, 242, 140, 1);
            font-size: 0.26rem;
            margin-left: 0.06rem;
            // text-align: center;
          }
        }
        .groupT {
          font-size: 0.2rem;

          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
  .stage1List {
    width: 7.06rem;
    position: relative;
    z-index: 10;
    margin: 0.2rem auto;
    li {
      height: 1.6rem;
      background: url(../../assets/img/type1_bg.png);
      background-size: 100% 100%;
      margin-bottom: 0.04rem;
      display: flex;
      align-items: center;
      .imgBox {
        width: 1.2rem;
        height: 1.2rem;
        position: relative;
        margin: 0 0.15rem 0 0.14rem;
        .frame {
          width: 1.5rem;
          height: 1.5rem;
          position: absolute;
          top: -0.16rem;
          left: -0.16rem;
          z-index: 10;
        }
        .avBg {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 2;
        }
        img {
          width: 0.88rem;
          height: 0.88rem;
          border-radius: 50%;
          position: absolute;
          left: 0.16rem;
          top: 0.16rem;
        }
        .rank {
          display: block;
          width: 0.6rem;
          height: 0.3rem;
          position: absolute;
          bottom: 0.02rem;
          left: 0.3rem;
          z-index: 20;
          color: rgba(251, 250, 185, 1);
          font-size: 0.18rem;
          font-weight: 600;
          text-align: center;
        }
      }
      .userMsg {
        width: 3rem;
        .nick,
        .uid {
          font-size: 0.28rem;
          color: rgba(255, 255, 255, 0.6);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .star {
          display: flex;
          align-items: center;
          i {
            width: 0.36rem;
            height: 0.33rem;
            background: url(../../assets/img/star.png);
            background-size: 100% 100%;
            margin-right: 0.09rem;
          }
          em {
            color: rgba(255, 220, 112, 1);
            font-weight: 600;
          }
        }
      }
      .score {
        margin-left: 0.6rem;
        > div {
          display: flex;
          align-items: center;
          i {
            width: 0.76rem;
            height: 0.26rem;
            margin-right: 0.08rem;
          }
          em {
            color: rgba(254, 254, 254, 0.6);
            font-size: 0.24rem;
          }
          &.work {
            i {
              background: url(../../assets/img/work.png);
              background-size: 100% 100%;
            }
          }
          &.ktv {
            margin: 0.12rem 0;
            i {
              background: url(../../assets/img/ktv.png);
              background-size: 100% 100%;
            }
          }
          &.room {
            i {
              background: url(../../assets/img/room.png);
              background-size: 100% 100%;
            }
          }
        }
      }
      &.rank1 {
        .avBg {
          background: url(../../assets/img/type1_top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        .avBg {
          background: url(../../assets/img/type1_top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        .avBg {
          background: url(../../assets/img/type1_top3.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
