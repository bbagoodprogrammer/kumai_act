<template>
  <div class="recordItem">
    <div class="list">
      <div>
        <span>
          <img v-if="info.award_type==0" src="../img/gift.png" alt="" />
          <img v-else :src="info.award_img" alt="" />
        </span>
        <span>
          <img src="../img/coins.png" alt="" />
          <i>{{ info.award_value }}</i>
        </span>
      </div>
      <div>
        <span>
          {{ getTime(info.award_time) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getTimeObj } from "../utils";
export default {
  props: ["info", "from"],
  components: {
    // Avatar,
  },
  methods: {
    getTime(t) {
      return getTimeObj(t).day+'-'+getTimeObj(t).month+'-'+getTimeObj(t).year+' '+getTimeObj(t).hour+':'+getTimeObj(t).minute+':'+getTimeObj(t).second
    },
  },
};
</script>

<style lang="scss">
.recordItem {
  .list {
    height: 1.62rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.54rem;
    position: relative;
    &::after {
      content: "";
      display: inline-block;
      background: url("../img/line.png");
      width: 7.5rem;
      height: 0.02rem;
      background-size: 100% 100%;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    > div:nth-of-type(1) {
      display: flex;
      align-items: center;
      span:nth-of-type(1) {
        width: 1.12rem;
        height: 1.12rem;
        background: url("../img/icon.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          display: inline-block;
          width: 0.8rem;
          height: 0.8rem;
        }
      }
      span:nth-of-type(2) {
        margin: 0 0.17rem;
        img,
        i {
          display: inline-block;
          vertical-align: middle;
        }
        img {
          width: 0.26rem;
          height: 0.26rem;
        }
        i {
          font-size: 0.26rem;
          color: #ffffff;
        }
      }
    }

    > div:nth-of-type(2) {
      span {
        font-size: 0.22rem;
        color: rgba(126, 126, 199, 0.6);
      }
    }

    span {
      display: inline-block;
    }
  }
}
</style>