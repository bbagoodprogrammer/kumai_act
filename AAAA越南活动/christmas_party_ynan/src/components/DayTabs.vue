<template>
  <div>
    <div class="dayBox tabs">
      <span @click="pre()" class="pre"></span>
      <div class="days">
        <a href="" v-for="(item,index) in days" :key=index :class="{'act':day===item}" @click.prevent="changeDay(item)">
          <em>{{getday(dateArr[item-1])}}</em>
        </a>
      </div>
      <span @click="next()" class="next"></span>
    </div>
  </div>

</template>
<script>
import api from "../api/apiConfig.js"
import { mapState } from 'vuex'
import getDate from "../utils/getDate"
export default {
  props: ["tab"],
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
    ...mapState(["totalDay", "dateArr"]),
    days() { //日榜tab计算 11 44 24 34 26 28 
      if (this.day < 4 && this.totalDay > 4) {  //总共的天数大于4，返回前四
        return [1, 2, 3, 4]
      } else if (this.day < 4 && this.totalDay <= 4) {//总共的天数小于4，循环完总天数的所有天
        var arr = []
        for (var i = 1; i <= this.totalDay; i++) {
          arr.push(i)
        }
        return arr
      } else if (this.day >= 4 && this.day < this.totalDay) {  // 大于4 小于总天数放在第三位
        return [this.day - 2, this.day - 1, this.day, this.day + 1]
      } else if (this.day == this.totalDay) { // 等于总天数放最后一位
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
    },
    getday(time) {
      return getDate(new Date(time * 1000), '1')
    }
  }
}
</script>
<style lang="scss">
.dayBox {
  display: flex;
  align-items: center;
  margin: 0.29rem auto 0;
  width: 6.65rem;
  .pre {
    width: 0.39rem;
    height: 0.5rem;
    background: url(../assets/img/pre.png);
    background-size: 100% 100%;
    margin-right: 0.1rem;
  }
  .next {
    width: 0.39rem;
    height: 0.5rem;
    background: url(../assets/img/next.png);
    background-size: 100% 100%;
    margin-left: 0.1rem;
  }
  .days {
    flex: 1;
    height: 0.63rem;
    display: flex;
    align-items: center;
    width: 5.84rem;
    justify-content: space-between;
    a {
      width: 1.37rem;
      display: inline-block;
      height: 100%;
      text-align: center;
      background: url(../assets/img/timeItem.png);
      background-size: 100% 100%;
      line-height: 0.63rem;
      em {
        font-size: 80%;
      }
      &.act {
        background: url(../assets/img/actTIme.png);
        background-size: 100% 100%;
      }
    }
  }
}
</style>
