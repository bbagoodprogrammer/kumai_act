<template>
  <div class="lastRank">
    <div class="title">BXH Bảo Hộ</div>
    <div class="tips">
      Xếp hạng dựa vào mị lực quà xu người dùng đã tặng sau khi báo danh<br />
      Top 10 sẽ được nhận thưởng, BXH chỉ hiện top 100
    </div>
    <p v-if="!list.length" class="noData">Chưa có dữ liệu</p>
    <ul class="list">
      <li v-for="(item,index) in list" :key="index" :class="'rank'+item.rank" @click="goPeople(item.uid)">
        <div class="rank">{{item.rank}}</div>
        <div class="uerImg">
          <img v-if="item.nob > 0" :src="require(`../../assets/img/nob/${item.nob}.png`)" class="nob" alt="">
          <i class="vip" v-else-if="item.vip > 0">VIP{{item.vip}}</i>
          <span class="imgBg" v-if="item.nob ==  0"></span>
          <img v-lazy="item.avatar" alt="" class="imgItem">
        </div>
        <div class="userMsg">
          <!-- <i class="live"></i> -->
          <div class="name"><strong>{{item.nick}} </strong> </div>
          <!-- <div class="score">聚聚聚聚家族</div> -->
        </div>
        <div class="score">
          <div class="star"><i></i> {{item.score}}</div>
        </div>
      </li>
    </ul>
    <div class="myRank" :class="'rank'+rank.rank">
      <div class="rank" v-if="rank.rank >0">{{rank.rank}}</div>
      <div class="rank noTop" v-else>Chưa lên bảng</div>
      <div class="uerImg">
        <img v-if="rank.nob > 0" :src="require(`../../assets/img/nob/${rank.nob}.png`)" class="nob" alt="">
        <i class="vip" v-else-if="rank.vip > 0">VIP{{rank.vip}}</i>
        <span class="imgBg" v-if="rank.nob ==  0"></span>
        <img v-lazy="rank.avatar" alt="" class="imgItem">
      </div>
      <div class="userMsg">
        <div class="name"><strong> {{rank.nick}}</strong> </div>
      </div>
      <div class="score">
        <div class="star"><i></i> {{rank.score}}</div>
      </div>
    </div>
    <Loading />
  </div>
</template>
<script>
import Loading from "../../components/Loading"
import api from "../../api/apiConfig"
export default {
  components: { Loading },
  data() {
    return {
      list: [],
      showPeopleList: false,
      peopleArr: [],
      actIndex: 0,
      uid: null,
      rank: {},
      ismore: true,
      loaded: false,
    }
  },
  created() {
    document.title = 'Ngôi Sao Gia Tộc'
    api.getLastRank(0).then(res => {
      this.list = res.data.response_data.list
      this.rank = res.data.response_data.rank
    })
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    showList(list, uid) {
      this.uid = uid
      if (list) {
        this.peopleArr = list
      }
      this.showPeopleList = true
    },
    closePeople() {
      this.showPeopleList = false
    },
    goPeople(uid) {
      if (uid) {
        location.href = `uid:${uid}`
      } else {
        location.href = `uid:${this.uid}`
      }
    },
    onScroll() { //滾動加載
      const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
      if (scrollToBottom && this.ismore && !this.loaded) { //加載更多合併數組存入vuex
        this.ismore = false
        api.getLastRank(this.list.length, 'more').then(res => {
          this.ismore = true
          let list = res.data.response_data.list
          if (list.length < 20) {
            this.loaded = true
          } else {
            this.list = this.list.concat(list)
          }
        })
      }
    },
  }
}
</script>
<style lang="scss">
body {
  background-color: rgba(29, 14, 9, 1);
  .lastRank {
    padding: 0.51rem 0.3rem 1.5rem;
  }
  .title {
    font-size: 0.42rem;
    color: rgba(254, 243, 194, 1);
    text-align: center;
  }
  .tips {
    font-size: 0.24rem;
    color: rgba(142, 105, 63, 1);
    text-align: center;
    margin-top: 0.23rem;
  }
  .noData {
    text-align: center;
    margin-top: 1rem;
  }
  .list {
    margin-top: 0.23rem;
  }
  li {
    height: 1.18rem;
    margin-bottom: 0.2rem;
    background: url(../../assets/img/listItem1.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    position: relative;
    .rank {
      width: 0.75rem;
      height: 0.65rem;
      font-size: 0.46rem;
      color: rgba(243, 165, 77, 1);
      text-align: center;
      line-height: 0.72rem;
      margin-left: 0.13rem;
    }
    .uerImg {
      width: 1rem;
      height: 1.01rem;
      position: relative;
      margin: 0 0.15rem 0 0.08rem;
      .imgBg {
        width: 1rem;
        height: 1.01rem;
        background: url(../../assets/img/av4.png);
        background-size: 100% 100%;
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
      .nob {
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        top: -0.1rem;
        left: -0.1rem;
        z-index: 10;
      }
      .vip {
        display: block;
        width: 0.8rem;
        height: 0.3rem;
        background: #fc6161;
        font-size: 0.24rem;
        color: #fffca1;
        position: absolute;
        bottom: 0rem;
        border-radius: 0.3rem;
        text-align: center;
        line-height: 0.3rem;
        left: 0.1rem;
        z-index: 11;
      }
    }
    .userMsg {
      width: 2.7rem;
      margin-right: 0.45rem;
      .name,
      .rName {
        height: 0.4rem;
        display: flex;
        align-items: center;
        strong {
          max-width: 1.85rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 0.26rem;
        }
        .live {
          width: 0.78rem;
          height: 0.33rem;
          background: url(../../assets/img/live.png);
          background-size: 100% 100%;
          margin-left: 0.06rem;
        }
      }
      .rNick {
        color: #ff8cfe;
        margin-top: -0.05rem;
      }
      .score {
        display: flex;
        align-items: center;
        color: rgba(255, 231, 184, 1);
        font-size: 0.22rem;
        font-weight: 500;
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
    > .score {
      flex: 1;
      .star {
        font-size: 0.32rem;
        display: flex;
        align-items: center;
        i {
          width: 0.4rem;
          height: 0.38rem;
          background: url(../../assets/img/star.png);
          background-size: 100% 100%;
          margin-right: 0.1rem;
        }
      }
      .num {
        font-size: 0.22rem;
        color: rgba(255, 231, 184, 1);
      }
    }
    .award {
      display: block;
      width: 0.97rem;
      height: 0.77rem;
      background: url(../../assets/img/award.png);
      background-size: 100% 100%;
      position: absolute;
      bottom: 0;
      right: 1.81rem;
      z-index: 0;
    }
    .userList {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .userItem {
        position: relative;
        .userImgBox {
          display: block;
          width: 0.62rem;
          height: 0.68rem;
          margin: 0 auto;
          position: relative;
          span {
            display: block;
            width: 0.62rem;
            height: 0.68rem;
            position: absolute;
            z-index: 2;
          }
          .user1 {
            background: url(../../assets/img/user1.png);
            background-size: 100% 100%;
          }
          .user2 {
            background: url(../../assets/img/user2.png);
            background-size: 100% 100%;
          }
          .user3 {
            background: url(../../assets/img/user3.png);
            background-size: 100% 100%;
          }
          img {
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 50%;
            position: absolute;
            top: 0.07rem;
            left: 0.01rem;
          }
        }
        strong {
          color: rgba(255, 250, 238, 1);
          font-size: 0.2rem;
        }
      }
    }
    &.rank1 {
      background: url(../../assets/img/listItem2.png);
      background-size: 100% 100%;
      .rank {
        text-indent: -999rem;
        background: url(../../assets/img/top1.png);
        background-size: 100% 100%;
      }
    }
    &.rank2 {
      background: url(../../assets/img/listItem2.png);
      background-size: 100% 100%;
      .rank {
        text-indent: -999rem;
        background: url(../../assets/img/top2.png);
        background-size: 100% 100%;
      }
    }
    &.rank3 {
      background: url(../../assets/img/listItem2.png);
      background-size: 100% 100%;
      .rank {
        text-indent: -999rem;
        background: url(../../assets/img/top3.png);
        background-size: 100% 100%;
      }
    }
  }
  .myRank {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.5rem;
    margin: auto;
    display: flex;
    align-items: center;
    background: url(../../assets/img/footer.png) no-repeat;
    background-size: 100% 100%;
    z-index: 10000;
    .rank {
      width: 0.84rem;
      height: 0.72rem;
      font-size: 0.46rem;
      text-align: center;
      line-height: 0.72rem;
      margin-left: 0.13rem;
      color: rgba(137, 63, 30, 1);
      &.noTop {
        font-size: 0.24rem;
        line-height: 0.3rem;
      }
    }
    .uerImg {
      width: 1.21rem;
      height: 1.01rem;
      position: relative;
      margin-left: 0.21rem;
      .imgBg {
        width: 1rem;
        height: 1.01rem;
        background: url(../../assets/img/av4.png);
        background-size: 100% 100%;
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
      .nob {
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        top: -0.1rem;
        left: -0.1rem;
        z-index: 10;
      }
      .vip {
        display: block;
        width: 0.8rem;
        height: 0.3rem;
        background: #fc6161;
        font-size: 0.24rem;
        color: #fffca1;
        position: absolute;
        bottom: 0rem;
        border-radius: 0.3rem;
        text-align: center;
        line-height: 0.3rem;
        left: 0.1rem;
        z-index: 11;
      }
    }
    .userMsg {
      width: 2.7rem;
      .name {
        display: flex;
        align-items: center;
        max-width: 2.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 0.26rem;
        color: rgba(137, 63, 30, 1);
        strong {
          // flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .star {
          display: flex;
          align-items: center;
          i {
            width: 0.4rem;
            height: 0.38rem;
            background: url(../../assets/img/star.png);
            background-size: 100% 100%;
            margin: 0 0.08rem 0 0.26rem;
          }
        }
      }
    }
    .score {
      .star {
        display: flex;
        align-items: center;
        color: rgba(137, 63, 30, 1);
        i {
          width: 0.4rem;
          height: 0.38rem;
          background: url(../../assets/img/star.png);
          background-size: 100% 100%;
          margin: 0 0.08rem 0 0.26rem;
        }
      }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
