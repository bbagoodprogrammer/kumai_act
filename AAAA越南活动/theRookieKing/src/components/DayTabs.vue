<template>
  <div>
    <div class="dayBox tabs" v-if="isList === 0">
      <span @click="pre()" class="pre"></span>
      <div class="days">
        <a href="" v-for="(item,index) in days" :key=index :class="{'act':day===item}" @click.prevent="changeDay(item)">
          <em>day{{item}}</em>
        </a>
      </div>
      <span @click="next()" class="next"></span>
    </div>
    <div class="dayBox tabs" v-else>
      <span @click="volpre()" class="pre"></span>
      <div class="days">
        <a href="" v-for="(item,index) in volDay" :key=index :class="{'act':day===item}" @click.prevent="volchangeDay(item)">
          <em>VOL{{item}}</em>
        </a>
      </div>
      <span @click="volnext()" class="next"></span>
    </div>
  </div>

</template>
<script>
import api from "../api/apiConfig.js"
import { mapState } from 'vuex'
export default {
  props: ["tab", "isList", "nowVol"],
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
    ...mapState(["totalDay"]),
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
    volDay() {  //出道榜tab计算   22 12  66 46
      if (this.nowVol <= 4) {
        var dayArr = []
        for (var i = 1; i <= this.nowVol; i++) {
          dayArr.push(i)
        }
        return dayArr
      } else if (this.day > 4 && this.day < this.nowVol) {  // 大于4 小于总天数放在第三位
        return [this.day - 2, this.day - 1, this.day, this.day + 1]
      } else if (this.day == this.nowVol) { // 等于总天数放最后一位
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
    volchangeDay(item) {
      // if (this.day = item) return
      // this.day = item
      this.$emit("volchangeClick", item)
    },
    pre() {
      if (this.day == 1) return
      this.day--
      this.$emit("changeClick", this.day)
    },
    volpre() {
      if (this.day == 1) return
      this.day--
      this.$emit("volchangeClick", this.day)
    },
    next() {
      if (this.day >= this.totalDay) return
      this.day++
      this.$emit("changeClick", this.day)
    },
    volnext() {
      if (this.day >= this.nowVol) return
      this.day++
      this.$emit("volchangeClick", this.day)
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
.dayBox {
  display: flex;
  align-items: center;
  margin: 0.29rem auto 0;
  width: 6.15rem;
  .pre {
    width: 0.26rem;
    height: 0.26rem;
    background: url(../assets/img/pre.png);
    background-size: 100% 100%;
  }
  .next {
    width: 0.26rem;
    height: 0.26rem;
    background: url(../assets/img/next.png);
    background-size: 100% 100%;
  }
  .days {
    flex: 1;
    height: 0.66rem;
    a {
      width: 1.38rem;
      display: inline-block;
      height: 100%;
      text-align: center;
      background: url(../assets/img/timeItem.png);
      background-size: 100% 100%;
      line-height: 0.66rem;
      em {
        -webkit-line-clamp: 2;
        background-image: -webkit-linear-gradient(bottom, #e0c4ff, #bb81fb);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 120%;
      }
      &.act {
        background: url(../assets/img/actTIme.png);
        background-size: 100% 100%;
        em {
          -webkit-line-clamp: 2;
          background-image: -webkit-linear-gradient(bottom, #5900b7, #3b007f);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 120%;
        }
      }
    }
  }
  span {
    display: block;
    width: 1rem;
    height: 0.5rem;
    background: blue;
  }
}
</style>
