<template>
  <div class="roll-msg" v-show="roolmsg.length > 0">
    <div class="popup">
      <div class="roolBox">
        <ul class="lb" :class="{marquee_top:animate}">
          <li v-for="(item, index) in list" :key="index">
            <em>{{getNick(item.nick)}} {{lang.get}} {{getWardName(item)}} <i v-if="item.double>0">*2</i> </em>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
 
<script>
import { wards } from "../config/wards"
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
    getWardName(item) {
      if (item.name) {
        return wards[item.etype].replace('X', item.num || item.day).replace('%', item.name)
      } else {
        return wards[item.etype].replace('X', item.num || item.day)
      }
    },
    getNick(nick) {
      if (nick && nick.length > 6) {
        var reg = /^(.).+(.)$/g;
        return nick.replace(reg, "$1**$2")
      } else {
        return nick
      }
    },
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
          clearInterval(that.timer);
        });
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
  position: absolute;
  top: 0.12rem;
  left: 0.15rem;
  width: 5.23rem;
  height: 0.44rem;
  display: flex;
  justify-content: center;
  background: rgba(175, 111, 76, 0.66);
  border: 0.02rem solid rgba(255, 248, 228, 1);
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
          // justify-content: center;
          margin-top: 0.04rem;
          color: #fff;
          font-size: 80%;
          white-space: nowrap;
          em {
            font-weight: 600;
            font-size: 0.28rem;
          }
        }
      }
    }
  }
}
</style>
