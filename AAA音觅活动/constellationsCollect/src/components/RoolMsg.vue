<template>
  <div class="roll-msg">
    <div class="popup" v-show="list.length > 0">
      <div class="roolBox">
        <ul class="lb" :class="{marquee_top:animate}">
          <li v-for="(item, index) in list" :key="index">
            <em v-if="item.type == 'getPrize'"> {{item.nick}} 获得奖励【{{item.name}}】</em>
            <em v-else> {{item.nick}} 獲得所有獎勵</em>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      animate: false,
      list: [],
      timer: null
    };
  },
  props: ["roolMsgs"],
  watch: {
    roolMsgs (val) {
      this.list = JSON.parse(JSON.stringify(val))
      this.rool()
    }
  },
  methods: {
    rool () {
      let that = this;
      if (that.list.length > 1 && that.timer == null) {
        clearInterval(that.timer)
        that.timer = setInterval(() => {
          this.animate = true;
          setTimeout(() => {
            that.list.push(this.list[0]);
            that.list.shift();
            that.animate = false;
          }, 500);
        }, 3000);
        // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
        // this.$once("hook:beforeDestroy", () => {
        //   clearInterval(that.timer);
        // });
      }
    }
  }
};
</script>
 
<style lang="scss">
.marquee_top {
  transition: all 0.5s;
  margin-top: -0.48rem;
}

.roll-msg {
  height: 0.44rem;
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.47);
  .popup {
    border-radius: 0.2rem;
    width: 100%;
    padding: 0 0.2rem;
    height: 100%;
    min-width: 1.5rem;
    align-items: center;
    color: #fff;
    display: flex;
    box-sizing: border-box;
    .roolBox {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .lb {
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        li {
          height: 100%;
          line-height: 0.35rem;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 0.04rem;
          color: #fff;
          font-size: 0.24rem;
          white-space: nowrap;
          em {
            color: rgba(255, 255, 255, 1);
            font-size: 0.24rem;
            margin: 0 0.15rem;
          }
          img {
            width: 0.41rem;
            height: 0.41rem;
            margin-left: 0.1rem;
          }
        }
      }
    }
  }
}
</style>
