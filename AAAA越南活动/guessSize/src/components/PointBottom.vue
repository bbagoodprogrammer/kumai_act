<template>
  <div class="point">
    <div class="point1">
      <span v-for="(item,index) in point1" :key="index" :class="{active:activeIndex1 === index}" @click="changPoint1(index,item.key)">
        <img :src="item.img">
        <em>1 : 1</em>
        <div class="title">{{item.choice}}</div>
        <i v-show="activeIndex1 === index"></i>
      </span>
    </div>
    <div class="point2">
      <div class="title">
        Trúng 1 thưởng nhân 1, trúng 2 thưởng nhân 2,</br>
        trúng 3 thưởng nhân 3
      </div>
      <div class="pointItem">
        <span v-for="(item,index) in point2" :key="index" :class="{active:index == activeIndex2}" @click="actPoint(index,item.key)">
          <img :src="item.img" :class="item.key">
          <i v-show="activeIndex2 === index"></i>
        </span>
      </div>
    </div>
    <div class="point3">
      <div class="title">
        Tổng điểm
      </div>
      <div class="pointItem">
        <span v-for="(item,index) in point3" :key="index" @click="actPoint3(index,item.key)" :class="{active:index == activeIndex3}">
          <img :src="item.img" :class="item.key">
          <em>1:{{item.multiple}}</em>
          <i v-show="activeIndex3 === index"></i>
        </span>
      </div>
    </div>
    <act-footer></act-footer>
  </div>
</template>
<script>
import ActFooter from '../components/ActFooter'
export default {
  components: { ActFooter },
  data() {
    return {
      activeIndex1: null,
      activeIndex2: null,
      activeIndex3: null,
      point1: [{ choice: 'Lớn 11~17', key: 'first_1', img: require('../assets/img/da.png') },
      { choice: 'Nhỏ 4~10', key: 'first_2', img: require('../assets/img/xiao.png') },
      { choice: 'Số lẻ', key: 'first_3', img: require('../assets/img/dan.png') },
      { choice: 'Số chẵn', key: 'first_4', img: require('../assets/img/shuang.png') }
      ],
      point2: [{ choice: '1', key: 'second_1', img: require('../assets/img/1.png') },
      { choice: '2', key: 'second_2', img: require('../assets/img/2.png') },
      { choice: '3', key: 'second_3', img: require('../assets/img/3.png') },
      { choice: '4', key: 'second_4', img: require('../assets/img/4.png') },
      { choice: '5', key: 'second_5', img: require('../assets/img/5.png') },
      { choice: '6', key: 'second_6', img: require('../assets/img/6.png') },
      ],
      point3: [{ choice: '4,17', multiple: '50', key: 'third_1', img: require('../assets/img/point3-1.png') },
      { choice: '5,16', multiple: '18', key: 'third_2', img: require('../assets/img/point3-2.png') },
      { choice: '6,15', multiple: '14', key: 'third_3', img: require('../assets/img/point3-3.png') },
      { choice: '7,14', multiple: '12', key: 'third_4', img: require('../assets/img/point3-4.png') },
      { choice: '8,13', multiple: '8', key: 'third_5', img: require('../assets/img/point3-5.png') },
      { choice: '9,10,11,12', multiple: '6', key: 'third_6', img: require('../assets/img/point3-6.png') },
      ]
    }
  },
  methods: {
    changPoint1(index) {
      if (this.activeIndex1 == index) {
        this.activeIndex1 = null
        this.$store.commit('changeActPoints1', {})
      } else {
        this.activeIndex1 = index
        this.$store.commit('changeActPoints1', this.point1[index])
      }
    },
    actPoint(index) {
      if (this.activeIndex2 == index) {
        this.activeIndex2 = null
        this.$store.commit('changeActPoints2', {})
      } else {
        this.activeIndex2 = index
        this.$store.commit('changeActPoints2', this.point2[index])
      }
    },
    actPoint3(index) {
      if (this.activeIndex3 == index) {
        this.activeIndex3 = null
        this.$store.commit('changeActPoints3', {})
      } else {
        this.activeIndex3 = index
        this.$store.commit('changeActPoints3', this.point3[index])
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.point {
  position: relative;
  width: 100%;
  .point1 {
    display: flex;
    justify-content: space-between;
    width: 5.75rem;
    margin: 0 auto;
    span {
      display: inline-block;
      width: 1.32rem;
      height: 1.21rem;
      text-align: center;
      // line-height: 1rem;
      background: url(../assets/img/point1.png);
      background-size: 100% 100%;
      position: relative;
      img {
        display: block;
        margin: 0.18rem auto;
      }
      em {
        margin-top: 0.15rem;
        color: #97461a;
        font-size: 70%;
      }
      i {
        display: inline-block;
        width: 0.31rem;
        height: 0.31rem;
        background: url(../assets/img/pointAc.png);
        background-size: 100% 100%;
        position: absolute;
        top: -0.08rem;
        right: -0.08rem;
      }
      .title {
        position: absolute;
        width: 1.32rem;
        top: -0.5rem;
        font-size: 80%;
        color: #22808a;
      }
      &.active {
        background: url(../assets/img/pointAct.png);
        background-size: 100% 100%;
      }
    }
    span:nth-child(1) {
      img {
        width: 0.62rem;
        height: 0.38rem;
      }
    }
    span:nth-child(2) {
      margin-right: 0.2rem;
      img {
        width: 0.69rem;
        height: 0.38rem;
      }
    }
    span:nth-child(3) {
      img {
        width: 0.42rem;
        height: 0.38rem;
      }
    }
    span:nth-child(4) {
      img {
        margin: 0.12rem auto 0.18rem;
        width: 0.86rem;
        height: 0.44rem;
      }
    }
  }
  .point2 {
    padding-top: 0.4rem;
    .title {
      text-align: center;
      font-size: 80%;
      color: #22808a;
    }
    .pointItem {
      display: flex;
      justify-content: space-between;
      width: 5.75rem;
      margin: 0.24rem auto;
      span {
        display: inline-block;
        width: 0.88rem;
        height: 0.83rem;
        background: url(../assets/img/point2Bg.png);
        background-size: 100% 100%;
        position: relative;
        img {
          display: block;
          margin: 0.22rem auto;
          &.second_1 {
            width: 0.21rem;
            height: 0.35rem;
          }
          &.second_2 {
            width: 0.24rem;
            height: 0.36rem;
          }
          &.second_3 {
            width: 0.25rem;
            height: 0.35rem;
          }
          &.second_4 {
            width: 0.27rem;
            height: 0.35rem;
          }
          &.second_5 {
            width: 0.24rem;
            height: 0.35rem;
          }
          &.second_6 {
            width: 0.26rem;
            height: 0.36rem;
          }
        }
        &.active {
          background: url(../assets/img/point2Act.png);
          background-size: 100% 100%;
        }
        i {
          display: inline-block;
          width: 0.31rem;
          height: 0.31rem;
          background: url(../assets/img/pointAc.png);
          background-size: 100% 100%;
          position: absolute;
          top: -0.08rem;
          right: -0.08rem;
        }
      }
    }
  }
  .point3 {
    padding-top: 0.2rem;
    .title {
      text-align: center;
      font-size: 80%;
      color: #22808a;
    }
    .pointItem {
      width: 5.75rem;
      margin: 0.24rem auto;
      span {
        display: inline-block;
        width: 1.71rem;
        height: 1.21rem;
        background: url(../assets/img/point3Bg.png);
        background-size: 100% 100%;
        margin: 0.16rem 0.16rem 0 0;
        position: relative;
        img {
          display: block;
          margin: 0.26rem auto 0;
          &.third_1 {
            width: 1.22rem;
            height: 0.31rem;
          }
          &.third_2 {
            width: 1.19rem;
            height: 0.32rem;
          }
          &.third_3 {
            width: 1.07rem;
            height: 0.32rem;
          }
          &.third_4 {
            width: 1.2rem;
            height: 0.31rem;
          }
          &.third_5 {
            width: 1.19rem;
            height: 0.32rem;
          }
          &.third_6 {
            width: 1.47rem;
            height: 0.25rem;
          }
        }
        em {
          display: block;
          text-align: center;
          color: #97461a;
          font-size: 70%;
          margin: 0.2rem auto;
        }
        &.active {
          background: url(../assets/img/point3Act.png);
          background-size: 100% 100%;
        }
        i {
          display: inline-block;
          width: 0.31rem;
          height: 0.31rem;
          background: url(../assets/img/pointAc.png);
          background-size: 100% 100%;
          position: absolute;
          top: -0.08rem;
          right: -0.08rem;
        }
      }
      span:last-child {
        img {
          width: 1.47rem;
          height: 0.25rem;
          margin: 0.32rem auto 0;
        }
      }
    }
  }
}
</style>
