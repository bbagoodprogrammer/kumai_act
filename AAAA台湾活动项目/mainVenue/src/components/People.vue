<template>
  <div class="people">
    <div class="rankItem" :class="'item'+item.act_id" v-for="(item,index) in newArr" :key="index">
      <div :class="['title'+item.act_id,'title']"></div>
      <div class="rankTop" :class="{item2:item.act_id==2}">
        <span class="man" v-if="item.act_id==2">人氣男神</span>
        <span v-for="(item,index) in item.total_rank[0]" :key="index" :class="'rankItem'+index">
          <div class="imgBox">
            <img v-lazy="item.avatar" alt="" @click="goUser(item.uid,item.fid)">
          </div>
          <em>{{item.nick}}</em>
        </span>
      </div>
      <div class="rankBton" v-if="item.act_id == 2">
        <span class="gird">人氣女神</span>
        <span v-for="(item,index) in item.total_rank[1]" :key="index" :class="'rankBtn'+index">
          <div class="imgBox">
            <img v-lazy="item.avatar" alt="" @click="goUser(item.uid,item.fid)">
          </div>
          <em>{{item.nick}}</em>
        </span>
      </div>
      <span class="element1 element" v-if="index == 0"></span>
      <span class="element2 element" v-if="index == 1"></span>
      <span class="element3 element" v-if="index == 1"></span>
      <span class="element4 element" v-if="index == 2"></span>
      <span class="element5 element" v-if="index == 3"></span>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      defalte_rank: [
        [
          {
            "uid": null,
            "score": 1,
            "rank": 1,
            "avatar": "",
            "nick": "虚位以待"
          },
          {
            "uid": null,
            "score": 1,
            "rank": 2,
            "avatar": "",
            "nick": "虚位以待"
          },
          {
            "uid": null,
            "score": 1,
            "rank": 2,
            "avatar": "",
            "nick": "虚位以待"
          }
        ]
        ,
        [
          {
            "uid": null,
            "score": 1,
            "rank": 1,
            "avatar": "",
            "nick": "虚位以待"
          },
          {
            "uid": null,
            "score": 1,
            "rank": 2,
            "avatar": "",
            "nick": "虚位以待"
          },
          {
            "uid": null,
            "score": 1,
            "rank": 2,
            "avatar": "",
            "nick": "虚位以待"
          }
        ]
      ]
    }
  },
  computed: {
    ...mapState(["allRank"]),
    newArr() {
      let newRank = JSON.parse(JSON.stringify(this.allRank))
      for (let i = 0; i < newRank.length; i++) {
        if (newRank[i].total_rank.length == 0) {
          newRank[i].total_rank = this.defalte_rank
        }
      }
      return newRank
    }
  },
  methods: {
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
.rankItem {
  width: 6.8rem;
  height: 4.19rem;
  background: url(../assets/img/rankBg.png);
  background-size: 100% 100%;
  margin: 0.37rem auto 0;
  padding-top: 0.29rem;
  position: relative;
  .title {
    margin: 0 auto;
  }
  .title1 {
    width: 2.15rem;
    height: 0.35rem;
    background: url(../assets/img/title1.png);
    background-size: 100%;
  }
  .title2 {
    width: 2.49rem;
    height: 0.35rem;
    background: url(../assets/img/title2.png);
    background-size: 100%;
  }
  .title3 {
    width: 1.79rem;
    height: 0.35rem;
    background: url(../assets/img/title3.png);
    background-size: 100%;
  }
  .title4 {
    width: 2.15rem;
    height: 0.35rem;
    background: url(../assets/img/title4.png);
    background-size: 100%;
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
      width: 2.35rem;
      height: 0.66rem;
      background: url(../assets/img/six.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.66rem;
      color: rgba(244, 207, 141, 1);
      position: absolute;
      top: -0.45rem;
      left: 2.23rem;
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
      width: 2.35rem;
      height: 0.66rem;
      background: url(../assets/img/six.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.66rem;
      color: rgba(244, 207, 141, 1);
      position: absolute;
      top: -0.5rem;
      left: 2.23rem;
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
  .man {
    display: block;
    width: 2.35rem;
    height: 0.66rem;
    background: url(../assets/img/six.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.66rem;
    color: rgba(244, 207, 141, 1);
    position: absolute;
    top: -0.45rem;
    left: 2.23rem;
  }
  .gird {
    display: block;
    width: 2.35rem;
    height: 0.66rem;
    background: url(../assets/img/six.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.66rem;
    color: rgba(244, 207, 141, 1);
    position: absolute;
    top: -0.5rem;
    left: 2.23rem;
  }
  &.item2 {
    width: 6.8rem;
    height: 10.1rem;
    background: url(../assets/img/rank2Bg.png);
    background-size: 100% 100%;
  }
  .element {
    display: block;
    position: absolute;
  }
  .element1 {
    width: 1.07rem;
    height: 0.6rem;
    background: url(../assets/img/element1.png);
    background-size: 100% 100%;
    top: 0.16rem;
    left: 0.12rem;
  }
  .element2 {
    width: 0.57rem;
    height: 0.5rem;
    background: url(../assets/img/element2.png);
    background-size: 100% 100%;
    top: 0.25rem;
    right: 0.21rem;
  }
  .element3 {
    width: 0.78rem;
    height: 0.57rem;
    background: url(../assets/img/element3.png);
    background-size: 100% 100%;
    top: 0.88rem;
    left: -0.35rem;
  }
  .element4 {
    width: 0.23rem;
    height: 0.22rem;
    background: url(../assets/img/element4.png);
    background-size: 100% 100%;
    top: -0.21rem;
    right: 0.21rem;
  }
  .element5 {
    width: 0.86rem;
    height: 0.69rem;
    background: url(../assets/img/element5.png);
    background-size: 100% 100%;
    right: 0.25rem;
    bottom: -0.87rem;
  }
}
</style>
