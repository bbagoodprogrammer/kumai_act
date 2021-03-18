<template>
  <div class="top">
    <i class="close" @click="$parent.showTop = false"></i>
    <ul>
      <li v-for="(item,index) in top" :key="index">
        <i class="pNums">{{item.score}} {{lang.people}}</i>
        <img :src="item.info.cover" alt="">
        <div class="rname">{{item.info.title}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  computed: {
    ...mapState(['top'])
  }
}
</script>

<style lang="scss">
.top {
  width: 6.31rem;
  height: 10.8rem;
  background: #FFFFFF;
  border-radius: 0.16rem;
  position: relative;
  .close {
    display: block;
    width: 0.23rem;
    height: 0.23rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.18rem;
    top: 0.18rem;
  }
  ul {
    padding: 0.4rem 0.41rem 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      width: 2.42rem;
      height: 3rem;
      padding: 0.1rem;
      background: url(../img/topListBg.png);
      background-size: 100% 100%;
      position: relative;
      img {
        width: 2.44rem;
        height: 2.44rem;
      }
      .pNums {
        width: 2.44rem;
        height: 0.4rem;
        background: url(../img/pNums.png);
        background-size: 100% 100%;
        position: absolute;
        top: 2.14rem;
        left: 0.1rem;
        text-indent: 0.1rem;
        line-height: 0.4rem;
        font-size: 0.2rem;
      }
      .rname {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 0.6rem;
        line-height: 0.6rem;
        color: rgba(102, 115, 185, 1);
        font-size: 0.24rem;
        text-indent: 0.13rem;
      }
    }
  }
}
</style>