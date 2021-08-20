<template>
  <div class="scrollNotice" v-if="list.length > 0">
    <ul :class="{ scrollActive }">
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
  data() {
    return {
      list: [],
      timer: null,
      scrollActive: false,
    };
  },
  watch: {
    list(newVal) {
      clearInterval(this.timer);
      if (this.list.length) {
        this.timer = setInterval(() => {
          this.scrollActive = true;
          setTimeout(() => {
            this.list.push(this.list[0]);
            this.list.shift();
            this.scrollActive = false;
          }, 500);
        }, 1500);
      }
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
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
      } else {
        //toast(response_status.error);
      }
    },
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss">
$h: 0.5rem;

.scrollNotice {
  position: absolute;
  top: 0;
  height: $h;
  text-align: left;
  overflow: hidden;
  ul {
    max-width: 5rem;
    &.scrollActive {
      transition: all 0.5s;
      margin-top: -$h;
    }
  }
  li {
    p{
      width: 100%;
      height: $h;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      // justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 0.28rem;
      font-weight: bold;
    }
  }
}
</style>