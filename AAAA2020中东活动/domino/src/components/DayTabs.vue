<template>
  <div>
    <div class="dayBox tabs">
      <span @click="pre()" class="pre"></span>
      <div class="days">
        <a href="" v-for="(item,index) in days" :key="index" :class="{act:day===item,over:item<day}" @click.prevent="changeDay(item)">
          <em>الدرجة{{item}} </em>
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
      } else if (this.day < 4 && this.totalDay < 4) {//总共的天数小于4，循环完总天数的所有天
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
  margin: 0.21rem auto 0;
  width: 7.09rem;
  height: 0.8rem;
  padding: 0 0.06rem;
  background: url(../assets/img/dayBg.png);
  background-size: 100% 100%;
  .pre {
    width: 0.67rem;
    height: 0.71rem;
    background: url(../assets/img/next.png);
    background-size: 100% 100%;
    margin-left: 0.14rem;
    z-index: 2;
  }
  .next {
    width: 0.67rem;
    height: 0.71rem;
    background: url(../assets/img/pre.png);
    background-size: 100% 100%;
    margin-right: 0.14rem;
    z-index: 2;
  }
  .days {
    flex: 1;
    height: 0.46rem;
    display: flex;
    align-items: center;
    width: 5.84rem;
    justify-content: space-between;
    a {
      position: relative;
      em {
        width: 1.2rem;
        display: inline-block;
        height: 100%;
        text-align: center;
        line-height: 0.46rem;
        font-size: 0.26rem;
        position: relative;
        z-index: 10;
        font-weight: 500;
        color: #b070ff;
      }
      &.act {
        em {
          color: #fff;
          width: 1.2rem;
          height: 0.51rem;
          background: url(../assets/img/actTab.png);
          background-size: 100% 100%;
        }
      }
      &.over {
        em {
          color: #fd70d9;
        }
      }
    }
  }
}
</style>
