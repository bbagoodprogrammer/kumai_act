<template>
  <div class="roll-msg" v-show="list.length > 0">
    <i class="laba"></i>
    <div class="popup">
      <div class="msgBox">
        <ul class="lb" :class="{marquee_top:animate}">
          <li v-for="(item, index) in list" :key="index">Selamat <em>{{item.nick}}</em> Menangkan <em>{{item.name}}</em></li>
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
      if (that.list.length >= 1 && that.timer == null) {
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
  margin-top: -0.44rem;
}

.roll-msg {
  width: 6.3rem;
  height: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  // opacity: 0.66;
  border-radius: 0.2rem;
  margin: 0.21rem 0 0 0.3rem;
  .laba {
    display: block;
    width: 0.32rem;
    height: 0.28rem;
    background: url(../assets/img/laba.png);
    background-size: 100% 100%;
    margin-left: 0.12rem;
  }
  .popup {
    flex: 1;
    border-radius: 0.2rem;
    padding: 0 0.2rem;
    height: 100%;
    min-width: 1.5rem;
    align-items: center;
    color: #fff;
    display: flex;
    box-sizing: border-box;
    .msgBox {
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
          line-height: 0.4rem;
          display: flex;
          justify-content: flex-start;
          margin-top: 0.04rem;
          color: #fff7b7;
          font-size: 80%;
          white-space: nowrap;
          color: #cccccc;
          em {
            color: #fedd29;
            margin: 0 0.1rem;
            font-size: 0.24rem;
          }
        }
      }
    }
  }
}
</style>
