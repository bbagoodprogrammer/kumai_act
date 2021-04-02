<template>
  <div class="rankItem_box">
    <div
      class="rankItem"
      @click="appPro(info.uid)"
      :class="{top:info.ranking<=3, top1:info.ranking==1, top2:info.ranking==2, top3:info.ranking==3}"
    >
      <div class="rank">{{info.ranking}}</div>
      <div class="right">
        <div class="infos">
          <span class="avatar avatar_room" v-if="from==0">
            <img :src="info.pic_url" alt />
          </span>
          <span class="avatar" v-if="from==1">
            <img :src="info.avatar" alt />
          </span>
          <span class="info">
            <strong v-if="from==0">{{info.rname}}</strong>
            <strong v-if="from==1">{{info.nick}}</strong>
            <strong v-if="from==0" class="strong1">
              <img :src="info.avatar" alt />
              <i>{{info.nick}}</i>
            </strong>
            <strong v-if="from==1" class="strong2">
              <em>
                <img :src="getIcon(info.wealthLv)" alt="">
                <i :class="{gt:info.wealthLv>=10,
                bg9:info.wealthLv>=1&&info.wealthLv<10,
                bg10:info.wealthLv>=10&&info.wealthLv<20,
                bg20:info.wealthLv>=20&&info.wealthLv<30,
                bg30:info.wealthLv>=30&&info.wealthLv<40,
                bg40:info.wealthLv>=40&&info.wealthLv<50,
                bg50:info.wealthLv>=50,
                }">{{info.wealthLv}}</i>
              </em>
              <em class="isEnthusiast" v-if="info.isEnthusiast"><img :src="images.isEnthusiast" alt=""></em>
              <em class="medal">
                <img :src="item1" alt="" v-for="(item1,i) in info.medal" :key="i">
              </em>
            </strong>
          </span>
        </div>
        <div class="score">
          <span>{{lang.score}}</span>
          <span>{{info.value}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import mixin from '../utils/mixin';

export default {
  // mixins: [mixin],
  props: ["info", "from"],
  computed: {
    star() {
      if (typeof this.info.cid != "undefined") {
        // return zodiac[this.info.cid];
      }
    }
  },
  components: {
    // Avatar,
  },
  methods: {
    getAvatar(url) {
      return url;
    },
    getIcon(_lv){
      var i = 0
      if(_lv==0){
        i = '0'
      }
      if(_lv>0&&_lv<10){
        i = '1'
      }
      if(_lv>=10&&_lv<20){
        i = '2'
      }
      if(_lv>=20&&_lv<30){
        i = '3'
      }
      if(_lv>=30&&_lv<40){
        i = '4'
      }
      if(_lv>=40&&_lv<50){
        i = '5'
      }
      if(_lv>=50){
        i = '6'
      }
      return require('../img/icon'+i+'.png')
    },
    appPro(id) {
      if (id) {
        location.href = "rid:" + id;
      }
    }
  }
};
</script>

<style lang="scss">
.comeList,.rankList {
  .rankItem {
    height: 1.56rem;
    font-size: 0;
    position: relative;
    display: flex;
    box-sizing: border-box;
    .rank,
    .infos,
    .score {
      display: inline-block;
      vertical-align: middle;
    }
    &.top {
      .rank {
        text-indent: -1000rem;
        position: relative;
        &:after {
          content: "";
          display: inline-block;
          width: 0.7rem;
          height: 0.4rem;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: contain;
          position: absolute;
          top: 0.56rem;
          left: 0.12rem;
        }
      }
      &.top1 {
        .rank:after {
          background-image: url("../img/top1.png");
        }
      }
      &.top2 {
        .rank:after {
          background-image: url("../img/top2.png");
        }
      }
      &.top3 {
        .rank:after {
          background-image: url("../img/top3.png");
        }
      }
    }
    .rank {
      width: 0.97rem;
      height: 1.56rem;
      line-height: 1.56rem;
      text-align: center;
      font-size: 0.28rem;
    }
    .right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 6.53rem;
      box-sizing: border-box;
      padding-right: 0.3rem;
      .infos {
        > span {
          display: inline-block;
          vertical-align: middle;
        }
        .avatar {
          margin-right: 0.1rem;
          img {
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
          }
          &.avatar_room{
             img {
              width: 1.2rem;
              height: 1.2rem;
              border-radius: .1rem;
            }
          }
        }
        .info {
          strong {
            display: block;
          }
          strong:nth-of-type(1) {
            font-size: 0.32rem;
            line-height: 0.45rem;
            color: #ffffff;
            margin-bottom: .04rem;
          }
          .strong1{
            margin-bottom: .04rem;
            img,i{
              display: inline-block;
              vertical-align: middle;
            }
            img{
              width: .4rem;
              height: .4rem;
              background: rgba(0, 0, 0, 0);
              border-radius: 50%;
            }
            i{
              color: #BCBBC7;
              font-size: .24rem;
            }
          }
          .strong2{
            font-size: 0;
            em{
              display: inline-block;
              vertical-align: middle;
            }
            em:nth-of-type(1){
              height: .3rem;
              box-sizing: border-box;
              margin-right: .1rem;
              img,i{
                display: inline-block;
                vertical-align: text-top;
              }
              img{
                display: inline-block;
                width: .3rem;
                height: .3rem;
                position: relative;
              }
              i{
                display: inline-block;
                width: .53rem;
                height: .30rem;
                line-height: .3rem;
                background: linear-gradient(322deg, #8C8995 0%, #BCBBC7 100%);
                border-radius: 0px .25rem .25rem 0;
                margin-left: -.25rem;
                font-size: .2rem;
                font-weight: bold;
                color: #FFFFFF;
                box-sizing: border-box;
                text-align: center;
                padding-left: .1rem;
                &.gt{
                  width: .53rem;
                }
                &.bg9{
                  background: linear-gradient(322deg, #4A85B2 0%, #7BABD2 100%);
                }
                &.bg10{
                  background: linear-gradient(322deg, #40ABA1 0%, #69C9D2 100%);
                }
                &.bg20{
                  background: linear-gradient(322deg, #4AC96C 0%, #94E9AB 100%);
                }
                &.bg30{
                  background: linear-gradient(322deg, #BF883B 0%, #E4C396 100%);
                }
                &.bg40{
                  background: linear-gradient(322deg, #CE7445 0%, #D29473 100%);
                }
                &.bg50{
                  background: linear-gradient(322deg, #C55451 0%, #D46B71 100%);
                }
              }
            }
            .isEnthusiast{
              width: 1.24rem;
              height: .3rem;
              margin-right: .1rem;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .medal{
              height: .3rem;
              img{
                display: inline-block;
                vertical-align: text-top;
                width: .28rem;
                height: .3rem;
                margin-right: .04rem;
              }
            }
          }
        }
      }
      .score {
        text-align: right;
        span {
          display: block;
        }
        span:nth-of-type(1) {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.2rem;
          padding-bottom: 0.15rem;
          line-height: 1;
        }
        span:nth-of-type(2) {
          line-height: 1;
          font-size: 0.36rem;
          color: #fff;
          font-weight: bold;
          transform: skew(-10deg);
          -webkit-transform: skew(-10deg);
        }
      }
    }
  }
  .rank_tips {
    font-size: 0.22rem;
    color: #ffe5a0;
    text-align: right;
    padding: 0rem 0.6rem 0.17rem 0;
  }
}
</style>