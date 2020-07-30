<template>
  <div class="fSongList">
    <ul :class="{isDown:isDown}" :style="{height:useTotalTop+'rem'}">
      <li v-for="(item,index) in list" :style="{zIndex:-index,top:item.top +'rem'}" :key="index">
        <div class="songName"><em>打擂作品：</em> <strong>《{{item.sname}}》</strong> </div>
        <div class="pkUser">
          <div class="user">
            <span class="results"></span>
            <img v-lazy="item.user[1].avatar" alt="">
            <div class="userNick hsitory">
              <div class="nick">{{item.user[1].nick}}</div>
              <span class="resCode1 black">+1</span>
            </div>
          </div>
          <div class="score">
            <span> {{item.user[1].num}}</span>
            <i> : </i>
            <span>{{item.user[2]?item.user[2].num:'?'}}</span>
          </div>
          <div class="user user2">
            <span class="results results2 victory"></span>
            <img v-lazy="item.user[2]?item.user[2].avatar:''" alt="">
            <div class="userNick hsitory">
              <span class="resCode2 black">-1</span>
              <div class="nick">{{item.user[2]?item.user[2].nick:'???'}}</div>
            </div>
          </div>
        </div>
        <!-- <div class="pkTips">匹配對手中...</div> -->
        <div class="peopleNum">
          <div class="peopleBox">
            <img v-lazy="" alt="" v-for="i in 6" :key="i">
          </div>
          <u>88人支持我 >></u>
        </div>
      </li>
    </ul>
    <div class="listBtn"></div>
    <span @click="setDownStatus()" class="setBtn">{{isDown?'拉起':'展開'}} <i :class="{upper:isDown}"></i></span>
  </div>
</template>
<script>
export default {
  props: ["list"],
  data() {
    return {
      isDown: false,
      useTotalTop: 4.01,
      totalTop: 0,
      topArr: []
    }
  },
  mounted() {
    for (let i = 0; i < this.list.length; i++) {
      this.topArr.push(4.11 * i)
      this.totalTop += 4.11
    }
  },
  methods: {
    setDownStatus() {
      if (!this.isDown) {
        for (let i = 0; i < this.list.length; i++) {
          this.$set(this.list[i], 'top', this.topArr[i])
        }
        this.useTotalTop = this.totalTop
      } else {
        for (let i = 0; i < this.list.length; i++) {
          this.$set(this.list[i], 'top', 0)
          this.useTotalTop = 4.01
        }
      }
      this.isDown = !this.isDown
    }
  }
}
</script>
<style lang="scss">
.fSongList {
  position: relative;
  width: 6.86rem;
  margin: 0 auto;
  ul {
    min-height: 4.01rem;
    position: relative;
    transition: height 0.3s ease-out;
    li {
      width: 100%;
      height: 4.01rem;
      background: url(../assets/img/songCardBg.png);
      background-size: 100% 100%;
      position: absolute;
      transition: top 0.3s ease-out;
      .songName {
        height: 0.67rem;
        text-align: center;
        line-height: 0.3rem;
        em {
          color: rgba(235, 217, 255, 0.6);
          font-size: 0.22rem;
        }
        strong {
          display: block;
          color: rgba(235, 217, 255, 1);
          font-size: 0.28rem;
          font-weight: bold;
        }
      }
      .pkUser {
        padding: 0 0.77rem;
        display: flex;
        align-items: center;
        .user {
          width: 1.67rem;
          position: relative;
          .results {
            width: 0.95rem;
            height: 0.95rem;
            background: url(../assets/img/fail.png);
            background-size: 100% 100%;
            position: absolute;
            left: -0.45rem;
            &.results2 {
              left: 1.15rem;
            }
            &.victory {
              background: url(../assets/img/victory.png);
              background-size: 100% 100%;
            }
          }
          img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            display: block;
            margin: 0.28rem auto 0;
          }
          .userNick {
            margin: 0.14rem 0 0 -0.3rem;
            display: flex;
            align-items: center;
            .nick {
              white-space: nowrap;
              color: rgba(128, 99, 179, 1);
              font-size: 0.24rem;
              width: 1.8rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            span {
              width: 0.58rem;
              height: 0.27rem;
              line-height: 0.3rem;
              font-size: 0.28rem;
              font-weight: bold;
              background: rgba(255, 186, 27, 1);
              border-radius: 0.05rem;
              text-align: center;
              &.black {
                background: rgba(188, 188, 188, 1);
              }
            }
            .resCode1 {
              margin-left: 0.08rem;
            }
            .resCode2 {
              margin-right: 0.08rem;
            }
            &.hsitory {
              width: 2.5rem;
              .nick {
              }
            }
          }
        }
        .score {
          text-align: center;
          margin-top: -0.12rem;
          width: 1.8rem;
          margin-right: 0.15rem;
          i {
            vertical-align: top;
          }
        }
      }
      .pkTips {
        margin-top: 0.17rem;
        color: rgba(110, 255, 216, 1);
        text-align: center;
      }
      .peopleNum {
        height: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.35rem;
        img {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          margin-right: 0.08rem;
        }
        u {
          color: rgba(255, 221, 95, 1);
          font-size: 0.24rem;
          margin-left: 0.13rem;
        }
      }
    }
  }
  .listBtn {
    width: 6.2rem;
    height: 0.98rem;
    background: url(../assets/img/songCardBgbtn.png);
    background-size: 100% 100%;
    margin: 0 auto;
    text-align: center;
    position: absolute;
    z-index: -9999;
    left: 0.3rem;
    bottom: -0.4rem;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  .setBtn {
    margin-top: 0.5rem;
    color: rgba(255, 237, 151, 1);
    position: absolute;
    left: 45%;
    bottom: -0.25rem;
    i {
      display: inline-block;
      width: 0.28rem;
      height: 0.19rem;
      background: url(../assets/img/lower.png);
      background-size: 100% 100%;
      &.upper {
        background: url(../assets/img/upper.png);
        background-size: 100% 100%;
      }
    }
  }
}
</style>
