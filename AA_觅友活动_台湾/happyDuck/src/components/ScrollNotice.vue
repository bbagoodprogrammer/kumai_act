<template>
  <div class="scrollNotice" v-if="list.length > 0">
    <ul :class="{ scrollActive }">
      <li v-for="(item, index) in list" :key="index">
        {{ item.name }}
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
        }, 3000);
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
        list.forEach((item) => {
          let title;
          if (item.type == "openStageGift") {
            title = this.lang[`gift_title_${item.index}`].replace("\n", "-");
          } else {
            title = this.lang[`award_title_${item.index}`];
            if (item.index < 8) {
              title = title + "-" + this.lang[`award_des_${item.index}`];
            }
          }
          item.name = this.lang.notice
            .replace("{0}", item.nick)
            .replace("{1}", title);
        });
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
  width: 7.5rem;
  height: $h;
  text-align: center;
  overflow: hidden;
  background: rgba($color: #000000, $alpha: 0.4);
  ul {
    width: 100%;
    &.scrollActive {
      transition: all 0.5s;
      margin-top: -$h;
    }
  }
  li {
    color: #fff;
    font-size: 0.2rem;
    width: 100%;
    height: $h;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>