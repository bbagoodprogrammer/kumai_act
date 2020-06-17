<template>
  <div class="roll-msg">
    <div class="popup" v-show="roolMsg.length > 0">
      <div class="roolBox">
        <ul class="lb" :class="{marquee_top:animate}">
          <li v-for="(item, index) in list" :key="index">
            <em v-if="item.name && item.type!='frame'">恭喜 {{item.nick}} 獲得 <i> {{item.name}} {{item.day?`(${item.day}天)`:`*${item.count}`}}</i> </em>
            <em v-else>恭喜 {{item.nick}} 獲得 <i> {{getName(item)}}</i> </em>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
 
<script>
import { clearInterval } from 'timers';
import { mapState } from "vuex"
export default {
  data() {
    return {
      animate: false,
      list: [],
      timer: null
    };
  },
  computed: {
    ...mapState(['roolMsg'])
  },
  watch: {
    roolMsg(val) {
      this.list = JSON.parse(JSON.stringify(val))
      this.rool()
    }
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
      if (nick.length > 6) {
        var reg = /^(.).+(.)$/g;
        return nick.replace(reg, "$1**$2")
      } else {
        return nick
      }
    },
    getName(item) {
      if (item.type == 'coin') {
        return `${item.coins}金幣`
      } else if (item.type == 'frame') {
        return `${item.name}頭像框(${item.days}天) x1`
      } else if (item.type == 'fragment') {
        return `寶藏碎片x${item.count}`
      }
    },
    rool() {
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
          justify-content: center;
          margin-top: 0.04rem;
          color: #fff;
          font-size: 0.24rem;
          white-space: nowrap;
          em {
            font-weight: 600;
            font-size: 0.24rem;
          }
          i {
            color: #f5e53f;
            font-size: 0.24rem;
          }
        }
      }
    }
  }
}
</style>
