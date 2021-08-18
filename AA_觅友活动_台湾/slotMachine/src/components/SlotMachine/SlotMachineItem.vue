<template>
  <div class="slotMachineItem">
    <div class="hide">
      <ul :class="{active:active && slotIndex == 0,active2:active&& slotIndex == 1,active3:active&& slotIndex == 2}" :style="{transform:'translateY('+translateY+'px)'}">
        <li v-for="(item,index) in items" :key="index">
          <!-- luckCoins && icons.length &&  -->
          <div class="coinsNums" v-if="nums.length  && item.id == nowIndex && luckCoins">
            <img :src="item.defalutSrc" alt="">
            <div class="nums">
              <img :src="require(`../../img/nums/${item2}.png`)" v-for="(item2,index2) in numsStr" :key="index2" alt="">
            </div>
          </div>
          <img :src="item.src" alt="" v-else>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list', 'id', 'size', 'slotIndex', 'updateFlag', 'nums', 'icons', 'nowIndex'],
  data () {
    return {
      oldId: -1,

      offsetY: 0,
      itemHeight: 0,

      active: false,
      translateY: 0,

      timer1: null,
      timer2: null,
      luckCoins: false
    };
  },
  computed: {
    items () {
      const list = Object.assign([], this.list).sort(() => 0.5 - Math.random());
      return list.concat(list).concat(list).concat(list).concat(list)
    },
    nodes () {
      return this.$el.getElementsByTagName('li');
    },
    numsStr () {
      let nowNums = this.nums[this.slotIndex]
      if (nowNums > 1000) {

        return `${nowNums / 1000}k`.split('')
      } else {
        return String(nowNums).split('')
      }
    }
  },
  watch: {
    updateFlag () {
      //监听TransitionEnd事件会有兼容问题，以下timeout保持与css设置时间一致
      if (!isNaN(this.oldId) && this.oldId >= 0) {
        this.translateY = this.getStartY(this.oldId);
      }
      if (!isNaN(this.id) && this.id >= 0) {
        this.oldId = this.id;
        const delay = this.slotIndex * 300 + 500;
        this.stopTimer();
        this.timer2 = setTimeout(() => {
          this.active = true;
          this.translateY = this.getEndY(this.id);
          this.timer2 = setTimeout(() => {
            this.active = false;
            this.luckCoins = true
            if (this.slotIndex == this.size - 1) {
              let liList = document.getElementsByTagName('li')
              this.$emit('end');
            }
          }, 1000 * (this.slotIndex + 1));
        }, delay);
      }
    },
    nowIndex (val) {
      console.log(val)
    }
  },
  mounted () {
    setTimeout(() => {
      //Webpack开发模式使用style-loader插入样式时，不延时会导致计算不准
      const itemHeight = this.nodes[0].clientHeight;
      this.itemHeight = itemHeight;

      this.offsetY = (this.$el.clientHeight - itemHeight) / 2;
      var ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      if (ios) {
        this.offsetY -= itemHeight
      }
      this.translateY = this.getDefaultY();
    }, 100);
  },
  destroyed () {
    this.stopTimer();
  },
  methods: {
    getDefaultY () {
      return -(this.nodes[this.list.length - 1].offsetTop + this.offsetY);
    },
    getStartY (id) {
      let find = 0;
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].id == id) {
          find++;
          if (find == 2) {
            return -(this.nodes[i].offsetTop + this.offsetY);
          }
        }
      }
    },
    getEndY (id) {
      let find = 0;
      for (let i = this.items.length - 1; i > 0; i--) {
        if (this.items[i].id == id) {
          find++;
          if (find == 2) {
            return -(this.nodes[i].offsetTop + this.offsetY);
          }
        }
      }
    },
    stopTimer () {
      clearTimeout(this.timer1);
      clearTimeout(this.timer2);
    },
  },
}
</script>

<style lang="scss">
.slotMachineItem {
  width: 1.51rem;
  height: 2.5rem;
  // overflow: hidden;
  padding-top: 0.1rem;
  .coinsNums {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    > img {
      width: 1.1rem;
      height: 1.1rem;
    }
    .nums {
      position: absolute;
      bottom: 0.15rem;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 0.3rem;
        height: 0.34rem;
        margin-left: -0.06rem;
      }
    }
  }
  .hide {
    height: 2.5rem;
    // margin-top: 0.1rem;
    // overflow: hidden;
  }
  ul {
    &.active {
      transition: all 1s ease;
    }
    &.active2 {
      transition: all 2s ease;
    }
    &.active3 {
      transition: all 3s ease;
    }
  }
  li {
    i {
      color: red;
    }
    width: 100%;
    height: 1.25rem;
    text-align: center;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    // span {
    //   display: block;
    //   width: 100%;
    //   height: 100%;
    //   color: red;
    // }
    > img {
      // margin-top: 0.3rem;
      width: 1.1rem;
      height: 1.1rem;
    }
  }
}
.slotMachineItem:nth-child(2) {
  margin-left: 0.1rem;
}
.slotMachineItem:nth-child(3) {
  margin-left: 0.2rem;
}
.slotMachineItem:first-child {
  margin-left: 0;
}
</style>
