<template>
  <div class="scrollNotice" v-if="list.length > 0">
    <ul :class="{marquee_top:animate}">
      <li v-for="(item, index) in list" :key="index">
        <p v-if="item.prize.type == 'coin'">{{lang.notice_coin.replace('%nick',item.nick).replace('%s',item.prize.count)}} </p>
        <p v-else-if="item.prize.type == 'bean'">{{lang.notice_bean.replace('%nick',item.nick).replace('%s',item.prize.count)}} </p>
        <p v-else-if="item.prize.type == 'coupon'">{{lang.notice_coupon.replace('%nick',item.nick).replace('%r',item.prize.ratio)}}</p>
        <p v-else-if="item.prize.type == 'rebate'">{{lang.notice_rebate.replace('%nick',item.nick)}}</p>
        <p v-else-if="item.prize.type == 'car'">{{lang.notice_car.replace('%nick',item.nick).replace('%name',item.prize.name)}}</p>
        <p v-else-if="item.prize.type == 'gift'">{{lang.notice_gift.replace('%nick',item.nick).replace('%name',item.prize.name)}}</p>
        <p v-else-if="item.prize.type == 'frame'">{{lang.notice_frame.replace('%nick',item.nick).replace('%name',item.prize.name)}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { notice } from "../apis";
export default {
  name: "ScrollNotice",
  data () {
    return {
      animate: false,
      list: [],
      timer: null,
      scrollActive: false,
    };
  },
  //   watch: {
  //     list (newVal) {
  //       clearInterval(this.timer);
  //       if (this.list.length) {
  //         this.timer = setInterval(() => {
  //           this.scrollActive = true;
  //           setTimeout(() => {
  //             this.list.push(this.list[0]);
  //             this.list.shift();
  //             this.scrollActive = false;
  //           }, 500);
  //         }, 1500);
  //       }
  //     },
  //   },
  created () {
    this.fetchData();
  },
  methods: {
    async fetchData () {
      let res = await notice();
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        let list = response_data.list;
        // list.forEach((item) => {
        //   let title;
        //   if (item.prize.type == "openStageGift") {
        //     title = this.lang[`gift_title_${item.index}`].replace("\n", "-");
        //   } else {
        //     title = this.lang[`award_title_${item.index}`];
        //     if (item.index < 8) {
        //       title = title + "-" + this.lang[`award_des_${item.index}`];
        //     }
        //   }
        //   item.name = this.lang.notice
        //     .replace("{0}", item.nick)
        //     .replace("{1}", title);
        // });
        if (list.length < 3) {
          list = list.concat(list);
        }
        this.list = list;
        this.rool()
      } else {
        //toast(response_status.error);
      }
    },
    rool () {
      let that = this;
      if (that.list.length > 1 && that.timer == null) {
        clearInterval(that.timer)
        that.timer = setInterval(() => {
          this.animate = true;
          setTimeout(() => {
            that.list.push(this.list[0]);
            that.list.shift();
            that.animate = false;
          }, 500);
        }, 3000);
        // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
        // this.$once("hook:beforeDestroy", () => {
        //   clearInterval(that.timer);
        // });
      }
    }
  },
  destroyed () {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss">
.marquee_top {
  transition: all 0.5s;
  margin-top: -0.5rem;
}
.scrollNotice {
  position: absolute;
  top: 0;
  height: 0.5rem;
  overflow: hidden;
  left: 1.6rem;
  top: 2.75rem;
  z-index: 2;
  ul {
    max-width: 4.7rem;
    // &.scrollActive {
    //   transition: all 0.5s;
    //   margin-top: -0.5rem;
    // }
  }
  li {
    p {
      width: 100%;
      height: 0.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      // justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 0.24rem;
      font-weight: bold;
    }
  }
}
</style>