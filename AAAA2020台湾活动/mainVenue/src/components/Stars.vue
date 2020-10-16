<template>
  <div class="universe">
    <div class="starItem" v-for="(item,index) in starsArr" :key="index" :class="[{ani:aning},'start' +item.ainIndex]" @click="starClick(index)">
      {{item.name}}
    </div>
  </div>
</template>
<script>
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      aning: false,
      starsArr: [
        {
          ainIndex: 0,
          name: '年度人物评选',
        },
        {
          ainIndex: 1,
          name: '年度主持人巅峰战',
        },
        {
          ainIndex: 2,
          name: '年度C位爭奪戰',
        },
        {
          ainIndex: 3,
          name: '年度K房男神女神賽',
        },
        {
          ainIndex: 4,
          name: '年度魅力歌王大賽',
        },
        {
          ainIndex: 5,
          name: '盛典嘉年華',
        },
        {
          ainIndex: 6,
          name: '年度最強音',
        },
        {
          ainIndex: 7,
          name: '年度最強家族戰',
        },
        {
          ainIndex: 8,
          name: '年度演唱會',
        }
      ],
      timer: null
    }
  },
  mounted() {
    this.aniTime(2000)
    this.aning = true
  },
  methods: {
    starClick(index) {
      this.aning = false
      clearInterval(this.timer)
      let num = 0
      for (let i = index; i < 9; i++) {
        this.starsArr[i].ainIndex = num
        num++
      }
      for (let t = 0; t < index; t++) {
        this.starsArr[t].ainIndex = num
        num++
      }
      setTimeout(() => {
        this.aning = true
        this.aniTime(2000)
      }, 3000)
    },
    aniTime(tm) {
      this.timer = setInterval(() => {
        this.starsArr.forEach(element => {
          if (element.ainIndex < 8) {
            element.ainIndex++
          } else {
            element.ainIndex = 0
          }
        });
      }, tm);
    }
  }
}
</script>
<style lang="scss" scoped>
.universe {
  position: relative;
  height: 10rem;
  .starItem {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: red;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    text-align: center;
    white-space: nowrap;
    &.ani {
      transition: all 1s ease;
    }
    &.start0 {
      width: 1.5rem;
      height: 1.5rem;
      top: 0;
      left: 3.1rem;
    }
    &.start1 {
      top: 2rem;
      left: 6rem;
    }
    &.start2 {
      top: 3.5rem;
      left: 5.8rem;
    }
    &.start3 {
      top: 5rem;
      left: 5.2rem;
    }
    &.start4 {
      top: 6.5rem;
      left: 4.1rem;
    }
    &.start5 {
      top: 6.5rem;
      left: 2rem;
    }
    &.start6 {
      top: 5rem;
      left: 1.2rem;
    }
    &.start7 {
      top: 3.5rem;
      left: 0.7rem;
    }
    &.start8 {
      top: 2rem;
      left: 0.5rem;
    }
  }
}
</style>
