<template>
  <div class="dayBox">
    <span @click="pre()" class="pre"></span>
    <div class="days">
      <a href="" v-for="(item,index) in days" :key="index" :class="{act:day===item,over:item<day}" @click.prevent="changeDay(item)">
        <em>{{getday(dateArr[item-1])}}</em>
        <i v-if="index != 0"></i>
      </a>
    </div>
    <span @click="next()" class="next"></span>
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
    },
    totalDay() {
      return this.dateArr.length
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
  width: 6.66rem;
  height: 0.92rem;
  background: RGBA(147, 27, 0, 1);
  border-radius: 0.46rem;
  padding: 0 0.17rem;
  .pre {
    width: 0.54rem;
    height: 0.54rem;
    background: url(../assets/img/pre.png);
    background-size: 100% 100%;
  }
  .next {
    width: 0.54rem;
    height: 0.54rem;
    background: url(../assets/img/next.png);
    background-size: 100% 100%;
  }
  .days {
    flex: 1;
    height: 0.61rem;
    display: flex;
    align-items: center;
    width: 5.84rem;
    justify-content: space-between;
    a {
      position: relative;
      em {
        width: 1.21rem;
        display: inline-block;
        height: 100%;
        text-align: center;
        background: url(../assets/img/dayTabBg3.png);
        background-size: 100% 100%;
        line-height: 0.63rem;
        color: RGBA(255, 169, 139, 1);
        font-size: 80%;
        position: relative;
        z-index: 10;
      }
      &.act {
        em {
          width: 1.3rem;
          height: 0.7rem;
          line-height: 0.7rem;
          color: #ffffff;
          background: url(../assets/img/dayTabBg2.png);
          background-size: 100% 100%;
        }
        i {
          background: #e5dbc0;
        }
      }
      &.over {
        em {
          color: RGBA(106, 20, 1, 1);
          background: url(../assets/img/dayTabBg1.png);
          background-size: 100% 100%;
        }
        i {
          background: #e5dbc0;
        }
      }
      i {
        position: absolute;
        left: -0.35rem;
        top: 0.35rem;
        display: block;
        width: 0.5rem;
        height: 0.04rem;
        background: #d8a6fd;
        border-radius: 0.015rem;
      }
    }
  }
}
</style>
