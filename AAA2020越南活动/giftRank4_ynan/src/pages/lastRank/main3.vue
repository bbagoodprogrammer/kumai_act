<template>
  <div class="lastRank">
    <div class="title"></div>
    <div class="tips"></div>
    <div class="list">
      <div class="listItem" v-for="(item,index) in list" :key="index">
        <div class="listTitle">
          <span v-if="index === 'creator'">BXH STAR</span>
          <span v-else-if="index === 'room'">BXH Chủ Phòng</span>
          <span v-else>BXH Ca Sĩ</span>
        </div>
        <ul>
          <li v-for="(item2,index2) in item" :key="index2">
            <div class="userAv" :class="'rank' + index2" @click="showList(item2.gg,item2.uid)">
              <div class="imgBg"></div>
              <img v-lazy="item2.userinfo.avatar" alt="" class="av">
            </div>
            <div class="uid">ID:{{item2.userinfo.uid}}</div>
            <div class="socre"><i></i> {{item2.score}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="mask" v-show="showPeopleList">
      <transition name="slide">
        <div class="peopleList" v-if="showPeopleList">
          <i class="close" @click="closePeople()"></i>
          <p class="nodata" v-if="peopleArr.length == 0">Chưa có số liệu!</p>
          <ul>
            <li v-for="(item,index) in peopleArr" :key="index" :class="[{act:actIndex==index},'rank'+index]" @click="goPeople(item.uid)">
              <div class="rank"></div>
              <div class="userImg">
                <span class="imgBg"></span>
                <img v-lazy="item.avatar" alt="" class="imgItem">
              </div>
              <div class="name">{{item.nick}}</div>
              <div class="score"><i></i> <em>{{item.socre}}</em> </div>
            </li>
          </ul>
          <div class="goUerBtn" @click="goPeople()">Vào trang cá nhân</div>
        </div>
      </transition>
    </div>
    <Loading />
  </div>
</template>
<script>
import Loading from "../../components/Loading"
import api from "../../api/apiConfig"
export default {
  components: { Loading },
  data () {
    return {
      list: [],
      showPeopleList: false,
      peopleArr: [],
      actIndex: 0,
      uid: null
    }
  },
  created () {
    document.title = 'Vào Sảnh Danh Vọng '
    api.getLastRank().then(res => {
      this.list = res.data.response_data.data
    })
  },
  methods: {
    showList (list, uid) {
      this.uid = uid
      if (list) {
        this.peopleArr = list
      }
      this.showPeopleList = true
    },
    closePeople () {
      this.showPeopleList = false
    },
    goPeople (uid) {
      if (uid) {
        location.href = `uid:${uid}`
      } else {
        location.href = `uid:${this.uid}`
      }
    }
  }
}
</script>
<style lang="scss">
body {
  background-color: rgba(131, 56, 208, 1);
  .lastRank {
    background: url(../../assets/img/lastRankBg.png) no-repeat;
    background-size: 100% auto;
  }
  .title {
    width: 4.74rem;
    height: 2.11rem;
    background: url(../../assets/img/lastRankTitle.png);
    background-size: 100% auto;
    margin: 0 auto;
  }
  .tips {
    width: 5.74rem;
    height: 1.82rem;
    background: url(../../assets/img/lastRankTips.png);
    background-size: 100% auto;
    margin: 0 auto;
  }
  .list {
    height: 8.77rem;
    padding: 0 0.59rem;
    margin-top: 0.29rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .listItem {
      width: 1.83rem;
      height: 100%;
      .listTitle {
        height: 0.96rem;
        line-height: 0.96rem;
        text-align: center;
        background: rgba(190, 106, 255, 1);
        border-radius: 0.2rem 0.2rem 0 0;
        font-weight: 500;
        span {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 0.35rem;
        }
      }
    }
    ul {
      background: rgba(110, 40, 194, 1);
      padding: 0.27rem 0 0.4rem;
      border-radius: 0 0 0.2rem 0.2rem;
      li {
        margin-bottom: 0.15rem;
        .userAv {
          position: relative;
          width: 1.45rem;
          height: 1.63rem;
          margin: 0 auto;
          .imgBg {
            width: 1.45rem;
            height: 1.63rem;
            position: absolute;
            z-index: 2;
          }
          .av {
            width: 1.3rem;
            height: 1.3rem;
            border-radius: 50%;
            position: absolute;
            top: 0.3rem;
            left: 0.075rem;
          }
          &.rank0 {
            .imgBg {
              background: url(../../assets/img/lastAv1.png);
              background-size: 100% 100%;
            }
          }
          &.rank1 {
            .imgBg {
              background: url(../../assets/img/lastAv2.png);
              background-size: 100% 100%;
            }
          }
          &.rank2 {
            .imgBg {
              background: url(../../assets/img/lastAv3.png);
              background-size: 100% 100%;
            }
          }
        }
        .uid {
          color: #7df5dd;
          font-size: 0.28rem;
          font-weight: 500;
          text-align: center;
        }
        .socre {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffed82;
          font-size: 0.22rem;
          font-weight: 500;
          text-indent: -0.2rem;
          i {
            display: block;
            margin-right: 0.1rem;
            width: 0.22rem;
            height: 0.25rem;
            background: url(../../assets/img/coins.png);
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
.peopleList {
  width: 6.62rem;
  height: 6.14rem;
  background: url(../../assets/img/peopleList.png);
  background-size: 100% 100%;
  position: relative;
  .nodata {
    text-align: center;
    margin-top: 2rem;
  }
  ul {
    width: 5.81rem;
    margin: 1.43rem auto 0;
    li {
      height: 1.27rem;
      display: flex;
      align-items: center;
      background: url(../../assets/img/peopleBg.png);
      background-size: 100% 100%;
      .rank {
        width: 0.75rem;
        height: 0.65rem;
        margin-left: 0.17rem;
      }
      .userImg {
        width: 1.21rem;
        height: 1.01rem;
        position: relative;
        margin-left: 0.21rem;
        .imgBg {
          position: absolute;
          z-index: 10;
        }
        .imgItem {
          width: 0.94rem;
          height: 0.94rem;
          position: absolute;
          top: 0.035rem;
          left: 0.03rem;
          border-radius: 50%;
        }
      }
      .name {
        width: 2rem;
        max-width: 2rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .score {
        display: flex;
        align-items: center;
        margin-left: 0.1rem;
        i {
          display: block;
          width: 0.22rem;
          height: 0.25rem;
          background: url(../../assets/img/coins.png);
          background-size: 100% 100%;
        }
        em {
          font-size: 0.22rem;
          color: #ffed82;
          margin-left: 0.06rem;
        }
      }
      &.act {
        background: url(../../assets/img/peopleBg2.png);
        background-size: 100% 100%;
      }
      &.rank0 {
        .rank {
          background: url(../../assets/img/top1.png);
          background-size: 100% 100%;
        }
        .imgBg {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../../assets/img/av1.png);
          background-size: 100% 100%;
          top: -0.23rem;
          left: -0.06rem;
        }
      }
      &.rank1 {
        .rank {
          background: url(../../assets/img/top2.png);
          background-size: 100% 100%;
        }
        .imgBg {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../../assets/img/av2.png);
          background-size: 100% 100%;
          top: -0.23rem;
          left: -0.06rem;
        }
      }
      &.rank2 {
        .rank {
          background: url(../../assets/img/top3.png);
          background-size: 100% 100%;
        }
        .imgBg {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../../assets/img/av3.png);
          background-size: 100% 100%;
          top: -0.23rem;
          left: -0.06rem;
        }
      }
    }
  }
  .goUerBtn {
    width: 2.76rem;
    height: 0.99rem;
    background: url(../../assets/img/singUp.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.99rem;
    font-size: 0.36rem;
    font-weight: 500;
    position: absolute;
    bottom: -0.38rem;
    left: 1.93rem;
  }
  .close {
    display: block;
    width: 0.95rem;
    height: 0.95rem;
    background: url(../../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.45rem;
    right: 0.25rem;
  }
}
@import '../../assets/scss/common.scss';
</style>
