<template>
  <div class="rankItem_box">
    <div class="rankItem">
      <div class="right">
        <p>{{info.recordTime}}</p>
        <p>{{info.msg}}</p>
      </div>
      <div class="left">
        <span v-for="(item,index) in info.prizeList" :key="index">
          <img v-if="item.image" :src="item.image" alt />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// import mixin from '../utils/mixin';

export default {
  // mixins: [mixin],
  props: ["info", "from"],
  computed: {},
  components: {
    // Avatar,
  },
  methods: {
    getAvatar(url) {
      return url;
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
.record {
  .rankItem {
    height: 1.6rem;
    font-size: 0;
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
    padding: 0 .3rem;
    .right {
      width: 3.9rem;
      p:nth-of-type(1) {
        line-height: 0.33rem;
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.24rem;
      }
      p:nth-of-type(2) {
        font-size: 0.28rem;
        color: #fff;
        line-height: 0.46rem;
      }
    }
    .left{
      span{
        display: inline-block;
        width: 1.4rem;
        height: 1.4rem;
        img{
          width: 100%;
          height: 100%;
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