<template>
  <div class="scrollNotice">
    <img class="notice__img" src="../../img/notice.png" />
    <div class="scroll__box" ref="scroll__box">
      <ul ref="runing_box" class="runing_box" :style="{ left: boxLeft }">
        <li v-for="(item, index) in list" :key="index">
          <div class="nick">{{ item.nick }}</div>
          <div class="get_text">{{ lang.hunt_get }}</div>
          <div class="imgs" v-for="(prize, prizeIndex) in item.prizeList" :key="prizeIndex">
            <img class="img" :src="prize.image" />
            <div class="num__imgs" v-if="prize.num > 1" v-html="getImgs(prize.num)"></div>
          </div>
          <div v-if="lang.hunt_get2">{{lang.hunt_get2}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getHuntRecord } from "../../apis";
import calcAwardNumImg from "../../utils/calcAwardNumImg";
import { mapState } from "vuex";

export default {
  data () {
    return {
      textTimer: null,
      i: 0,
      distance: 0,
      boxLeft: "0px",
      list: [],
      clientWidth: 0,
    };
  },

  computed: {
    lang: () => _lang,
    ...mapState(["huntRecord"]),
  },

  watch: {
    huntRecord: {
      handler (val) {
        if (val.length > 0) {
          //this.handleLamp();
        }
      },
      immediate: true,
      deep: true,
    },
  },

  mounted () {
    setTimeout(() => {
      this.fetchData()
    }, 500)
  },

  methods: {

    async fetchData () {
      const res = await getHuntRecord();
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (response_status && response_status.error === "") {
          // this.$store.commit('setHuntRecord', Object.freeze(response_data.list))
          this.list = Object.freeze(response_data.list)
          this.handleLamp()
        }
      }
    },

    handleLamp () {
      this.$nextTick(() => {
        this.clientWidth = this.$refs.scroll__box.clientWidth || 0;
        let runing_box = this.$refs.runing_box;
        let clientWidth = runing_box.clientWidth || 0;
        let offsetWidth = runing_box.offsetWidth || 0;
        let scrollWidth = runing_box.scrollWidth || 0;
        this.distance = Math.max(clientWidth, offsetWidth, scrollWidth);
        this.i = 0;
        this.textTimer && clearInterval(this.textTimer);
        this.textTimer = setInterval(() => {
          this.start();
        }, 25);
      });
    },

    start () {
      this.i--;
      if (this.i < -this.distance) {
        this.i = this.clientWidth;
      } else {
        this.boxLeft = this.i + "px";
      }
    },

    getImgs (num) {
      return calcAwardNumImg(num, 18);
    },
  },

  destroyed () {
    clearInterval(this.textTimer);
  },
};
</script>

<style lang="scss">
$h: 0.5rem;

.scrollNotice {
  width: 7.5rem;
  height: $h;
  overflow: hidden;
  position: relative;
  top: -0.05rem;
  .notice__img {
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    left: 0.32rem;
    top: 0.1rem;
  }
  .scroll__box {
    position: absolute;
    left: 0.7rem;
    top: 0rem;
    overflow: hidden;
    height: $h;
    width: 6.8rem;
    // background: red;
  }
  .runing_box {
    height: $h;
    position: absolute;
    top: 0;
    display: flex;
    // background: blue;
    li:last-child {
      padding-right: 0rem;
    }
    li {
      height: $h;
      font-size: 0.24rem;
      font-weight: 400;
      color: #ffffff;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      overflow: hidden;
      flex-shrink: 0;
      padding-right: 0.61rem;
      .nick {
        opacity: 0.8;
        white-space: nowrap;
        margin-right: 0.1rem;
      }
      .get_text {
        opacity: 0.8;
        white-space: nowrap;
      }
      .imgs {
        height: 0.4rem;
        white-space: nowrap;
        position: relative;
        margin-right: 0.1rem;
        .img {
          width: 0.4rem;
          height: 0.4rem;
        }
        .num__imgs {
          position: absolute;
          z-index: 0;
          top: -0.03rem;
          right: -0.05rem;
          white-space: nowrap;
          img:not(:first-child) {
            margin-left: -0.04rem;
          }
        }
      }
    }
  }
}
</style>