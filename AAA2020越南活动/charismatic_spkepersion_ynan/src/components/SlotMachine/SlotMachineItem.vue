<template>
  <div class="slotMachineItem">
    <div class="hide">
      <ul :class="{active}" :style="{transform:'translateY('+translateY+'px)'}">
        <li v-for="(item,index) in items" :key="index">
          <img :src="item.src" alt="">
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  props: ['list', 'id', 'size', 'index', 'updateFlag'],
  data() {
    return {
      oldId: -1,

      offsetY: 0,
      itemHeight: 0,

      active: false,
      translateY: 0,

      timer1: null,
      timer2: null,
    };
  },
  computed: {
    items() {
      const list = Object.assign([], this.list).sort(() => 0.5 - Math.random());
      return list.concat(list).concat(list).concat(list).concat(list);
    },
    nodes() {
      return this.$el.getElementsByTagName('li');
    }
  },
  watch: {
    updateFlag() {
      //监听TransitionEnd事件会有兼容问题，以下timeout保持与css设置时间一致
      if (!isNaN(this.oldId) && this.oldId >= 0) {
        this.translateY = this.getStartY(this.oldId);
      }
      if (!isNaN(this.id) && this.id >= 0) {
        this.oldId = this.id;
        const delay = this.index * 300 + 500;
        this.stopTimer();
        this.timer2 = setTimeout(() => {
          this.active = true;
          this.translateY = this.getEndY(this.id);
          this.timer2 = setTimeout(() => {
            this.active = false;
            if (this.index == this.size - 1) {
              this.$emit('end');
            }
          }, 5000);
        }, delay);
      }
    },
  },
  mounted() {
    setTimeout(() => {
      //Webpack开发模式使用style-loader插入样式时，不延时会导致计算不准
      const itemHeight = this.nodes[0].clientHeight;
      this.itemHeight = itemHeight;
      this.offsetY = (this.$el.clientHeight - itemHeight) / 2;
      this.translateY = this.getDefaultY();
    }, 100);
  },
  destroyed() {
    this.stopTimer();
  },
  methods: {
    getDefaultY() {
      return -(this.nodes[this.list.length - 1].offsetTop + this.offsetY);
    },
    getStartY(id) {
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
    getEndY(id) {
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
    stopTimer() {
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
  overflow: hidden;
  padding-top: 0.1rem;
  .hide {
    height: 2.5rem;
    // margin-top: 0.1rem;
    overflow: hidden;
  }
  ul {
    &.active {
      transition: all 5s ease;
    }
  }
  li {
    width: 100%;
    height: 2.5rem;
    text-align: center;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      display: block;
      width: 100%;
      height: 100%;
      color: red;
    }
    img {
      // margin-top: 0.3rem;
      width: 1.25rem;
      height: 1.25rem;
    }
  }
}
.slotMachineItem:first-child {
  margin-left: 0;
}
</style>
