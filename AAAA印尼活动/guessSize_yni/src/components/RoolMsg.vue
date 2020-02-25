<template>
  <div class="roll-msg" v-show="roolmsg.length > 0">
    <div class="popup">
      <div class="box">
        <ul class="lb" :class="{marquee_top:animate}">
          <li v-for="(item, index) in list" :key="index">Selamat {{item.uid}} mendapatkan {{item.odds}} kali / lipat odds!</li>
        </ul>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  props: ['roolmsg'],
  data() {
    return {
      animate: false,
      list: [],
      timer: null
    };
  },
  watch: {
    roolmsg(val) {
      this.list = JSON.parse(JSON.stringify(val))
      this.rool()
    }
  },
  mounted() {
    this.rool()
  },
  methods: {
    rool() {
      let that = this;
      if (that.list.length > 1 && that.timer == null) {
        that.timer = setInterval(() => {
          this.animate = true;
          setTimeout(() => {
            that.list.push(this.list[0]);
            that.list.shift();
            that.animate = false;
          }, 500);
        }, 3000);
        // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
        this.$once("hook:beforeDestroy", () => {
          clearInterval(timer);
        });
      }
    }
  }
};
</script>
 
<style lang="scss">
.marquee_top {
  transition: all 0.5s;
  margin-top: -0.47rem;
}

.red {
  color: #ff0101;
}
@media only screen and (max-width: 320px) and (min-height: 568px) {
  html,
  body {
    font-size: 14px;
  }
}
.roll-msg {
  position: absolute;
  top: 0.12rem;
  left: 0.8rem;
  width: 6rem;
  height: 0.44rem;
  display: flex;
  justify-content: center;
  background: rgba(22, 58, 60, 0.66);
  border: 0.01rem solid rgba(255, 217, 0, 1);
  // opacity: 0.66;
  border-radius: 0.22rem;
  .popup {
    border-radius: 0.2rem;
    width: 100%;
    padding: 0 0.2rem;
    height: 100%;
    min-width: 1.5rem;
    align-items: center;
    color: #fff;
    // background-color: RBG(10, 10, 10, 0.1);
    // opacity: 0.7;
    display: flex;
    box-sizing: border-box;
    .box {
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
          margin-top: 0.04rem;
          color: #fff7b7;
          font-size: 80%;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
