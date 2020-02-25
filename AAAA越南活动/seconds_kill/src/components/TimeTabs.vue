<template>
  <div>
    <div class="tabs">
      <div v-for="(item,index) in days" :key="index" @click.prevent="changeDay(item)" :class="{current:item==day}">
        <span>{{clock_list[item].substring(11)}}</span>
        <em v-if="item==nowTab && rankGroups[nowTab].gift_status == 1">Đang mở</em>
        <em v-else-if="item < nowTab || (item==nowTab && rankGroups[nowTab].gift_status == 2)">Đã hết</em>
        <em v-else>Sắp mở</em>
      </div>
    </div>
  </div>

</template>
<script>
import api from "../api/apiConfig.js"
import { mapState } from 'vuex'
export default {
  props: ["tab", "totalDay", "nowTab"],
  watch: {
    tab(val) {
      this.day = val
    }
  },
  data() {
    return {
      day: null
    }
  },
  created() {
    this.day = this.tab
  },
  computed: {
    ...mapState(['clock_list', 'rankGroups']),
    days() { //日榜tab计算 11 44 24 34 26 28 
      if (this.day < 3 && this.totalDay > 4) {  //总共的天数大于4，返回前四
        return [0, 1, 2, 3]
      } else if (this.day < 3 && this.totalDay <= 4) {//总共的天数小于4，循环完总天数的所有天
        var arr = []
        for (var i = 0; i <= this.totalDay - 1; i++) {
          arr.push(i)
        }
        return arr
      } else if (this.day >= 3 && this.day < (this.totalDay - 1)) {  // 大于4 小于总天数放在第三位
        return [this.day - 2, this.day - 1, this.day, this.day + 1]
      } else if (this.day == (this.totalDay - 1)) { // 等于总天数放最后一位
        return [this.day - 3, this.day - 2, this.day - 1, this.day]
      }
    }
  },
  updated() {
    this.updateList()
  },
  methods: {
    changeDay(item) {
      // if (this.day = item) return
      // this.day = item
      this.$emit("changeClick", item)
    },
    pre() {
      if (this.day == 1) return
      this.day--
      this.$emit("changeClick", this.day)
    },
    next() {
      if (this.day >= this.totalDay) return
      this.day++
      this.$emit("changeClick", this.day)
    },
    updateList() { //更新榜單數據
      // api.getDefault().then((res) => {
      //   console.log(res)
      // })
    }
  }
}
</script>
<style lang="scss">
.tabs {
  width: 6.78rem;
  height: 1.25rem;
  padding: 0 0.16rem;
  background: url(../assets/img/tabsBg.png) no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    display: block;
    width: 1.54rem;
    height: 0.91rem;
    text-align: center;
    color: #f8dfff;
    background: url(../assets/img/tabItem2.png);
    background-size: 100% 100%;
    &.current {
      color: #fff;
      background: url(../assets/img/tabItem1.png);
      background-size: 100% 100%;
    }
    // &.black {
    //   color: #ed8d81;
    //   background: url(../assets/img/tabItem2.png);
    //   background-size: 100% 100%;
    // }
    span {
      display: block;
      height: 50%;
      line-height: 0.55rem;
    }
    em {
      display: block;
      font-size: 80%;
      margin-top: 0.05rem;
    }
  }
}
</style>
