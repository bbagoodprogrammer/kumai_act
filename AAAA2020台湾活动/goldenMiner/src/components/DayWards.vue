<template>
  <div class="dayWards">
    <p class="title">{{lang.warsds}}</p>
    <div class="wardsList">
      <div class="wardsTitle">
        <span class="lv">{{lang.lv}}</span>
        <span class="score">{{lang.dayScore}}</span>
        <span class="wards">{{lang.wards}}</span>
        <span class="bar">{{lang.bar}}</span>
      </div>
      <ul>
        <li v-for="(item,key,index) in wardsList" :key="index">
          <span class="lv">Lv.{{key}}</span>
          <span class="score">{{item.mineral}}</span>
          <span class="wards" v-html="giftList[key]"></span>
          <span class="bar" :class="'status'+item.status">
            <em v-if="item.receive">{{lang.geted}}</em>
            <em v-else-if="item.able" @click="getGift(key)">{{lang.get}}</em>
            <em v-else>{{lang.getNo}}</em>
          </span>
        </li>
      </ul>
    </div>
    <div class="mask" v-show="showUpgrade">
      <transition name="slide">
        <div class="upgrade" v-if="showUpgrade">
          <i class="close" @click="closeUpgrade()"></i>
          <div class="title">{{lang.lvUp.replace('X',index)}}</div>
          <div class="tips">{{lang.getTips}}</div>
          <div class="giftList" :class="{two:giftArr.length ==2}">
            <span v-for="(item,index) in giftArr" :key="index">
              <span class="otherimg" v-if="item.img">
                <img :src="item.img" alt="">
              </span>
              <img :src="require(`../assets/img/gifts/${item.type}.png`)" alt="" v-else>
              <strong>{{item.name}}</strong>
            </span>
          </div>
          <div class="tips2">{{lang.getBack}}</div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import api from "../api/apiConfig"
import { format } from 'util';
export default {
  data() {
    return {
      showUpgrade: false,
      giftList: [
        '',
        '價值30金豆背包禮物</br>+5金豆',
        '價值60金豆背包禮物</br>+10金豆',
        '價值90金豆背包禮物</br>+15金豆',
        '價值120-180金豆背包禮物+20金豆',
        '價值2金幣背包禮物</br>+25金豆',
        '價值3-4幣背包禮物+1%儲值返利券+50金豆',
        '價值5-6金幣背包禮物+1%儲值返利券+100金豆',
        '價值10金幣背包禮物+2%儲值返利券+200金豆',
        '價值20金幣背包禮物+2%儲值返利券+300金豆'
      ],
      index: 0,
      giftArr: []
    }
  },
  computed: {
    ...mapState(['wardsList'])
  },
  methods: {
    getGift(index) {
      api.getGift(index).then(res => {
        const { response_data, response_status } = res.data
        if (response_status.code == 0) {
          let obj = {
            index: index,
            data: response_data.data
          }
          this.vxc('setGiftStatus', obj)
          this.index = index
          this.giftArr = response_data.data
          this.showUpgrade = true
        } else {
          this.vxc('setToast', {
            msg: response_status.error
          })
        }
      })
    },
    closeUpgrade() {
      this.showUpgrade = false
    },
  }
}
</script>
<style lang="scss" scoped>
.dayWards {
  width: 7.19rem;
  height: 7.89rem;
  background: url(../assets/img/tabBg.png);
  background-size: 100% 100%;
  margin: 0.14rem auto;
  padding-top: 0.5rem;

  .title {
    text-align: center;
    color: #f58662;
    font-size: 0.24rem;
    font-weight: 600;
  }
  .wardsList {
    width: 6.71rem;
    height: 7.52rem;
    margin: 0.05rem auto 0;
    padding: 0 0.27rem 0 0;
    background: url(../assets/img/dayWardsBg.png);
    background-size: 100% 100%;
    .wardsTitle {
      height: 0.5rem;
      padding-top: 0.05rem;
      display: flex;
      align-items: center;
      font-size: 0.24rem;
      color: #d36b38;
      text-align: center;
      .lv {
        width: 1rem;
      }
      .score {
        width: 1.3rem;
      }
      .wards {
        width: 3rem;
      }
      .bar {
        flex: 1;
        margin-left: 0.15rem;
      }
    }
    ul {
      li {
        display: flex;
        min-height: 0.72rem;
        align-items: center;
        font-size: 0.22rem;
        color: #ffeac6;
        font-weight: 500;
        text-align: center;
        margin-bottom: 0.05rem;
        .lv {
          width: 1rem;
        }
        .score {
          width: 1.3rem;
        }
        .wards {
          width: 3rem;
          margin-left: 0.2rem;
        }
        .bar {
          flex: 1;
          margin-left: 0.15rem;
          em {
            display: block;
            width: 1.23rem;
            height: 0.56rem;
            line-height: 0.56rem;
            background: url(../assets/img/noSuc.png);
            background-size: 100% 100%;
            font-size: 0.24rem;
            color: rgba(255, 240, 158, 1);
            -webkit-text-stroke: 0.3px #6d2c06;
            text-stroke: 0.3px #6d2c06;
          }
          &.status2 {
            em {
              background: url(../assets/img/suc.png);
              background-size: 100% 100%;
              color: #b3947c;
              -webkit-text-stroke: 0.5px;
              text-stroke: 0.5px;
            }
          }
          &.status1 {
            em {
              background: url(../assets/img/sucEd.png);
              background-size: 100% 100%;
              -webkit-text-stroke: 0.5px #6d2c06;
              text-stroke: 0.5px #6d2c06;
            }
          }
        }
      }
    }
  }
}
.upgrade {
  width: 5.84rem;
  height: 5rem;
  padding-top: 1.3rem;
  background: url(../assets/img/pupBg.png);
  background-size: 100% 100%;
  position: relative;
  .title {
    font-size: 0.38rem;
    color: #fddd4e;
    font-weight: 700;
    margin-top: 0.15rem;
  }
  .tips {
    font-size: 0.26rem;
    color: #f58662;
    font-weight: 700;
    text-align: center;
    margin: 0.2rem auto 0.15rem;
  }
  .giftList {
    display: flex;
    justify-content: space-between;
    padding: 0 0.36rem;
    &.two {
      padding: 0 1.02rem;
    }
    span {
      .otherimg {
        display: block;
        width: 1.6rem;
        height: 1.6rem;
        background: url(../assets/img/giftbg.png);
        background-size: 100% 100%;
      }
      img {
        display: block;
        width: 1.6rem;
        height: 1.6rem;
        margin: 0 auto;
      }
      strong {
        width: 110%;
        margin-left: -0.08rem;
        display: block;
        margin-top: 0.15rem;
        font-size: 0.24rem;
        color: #c66242;
        font-weight: 500;
        text-align: center;
      }
    }
  }
  .tips2 {
    font-size: 0.22rem;
    color: #9f6151;
    font-weight: 500;
    text-align: center;
    margin-top: 0.15rem;
  }
  .close {
    display: block;
    width: 0.7rem;
    height: 0.7rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.32rem;
    right: 0;
  }
}
</style>
