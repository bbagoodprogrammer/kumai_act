<template>
  <div class="roll-msg">
    <div class="popup" v-show="list.length > 0">
      <div class="roolBox">
        <ul class="lb" :class="{marquee_top:animate}">
          <li v-for="(item, index) in list" :key="index">
            <em> <i class="nick">{{item.nick}}</i> đã chế biến thành công {{item.dessert}}{{item.count}} xuất, nhận {{item.score}} điểm sảng khoái</em>
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
  margin-top: -0.56rem;
}
.nick {
  display: block;
  max-width: 1.8rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.roll-msg {
  height: 0.56rem;
  display: flex;
  justify-content: center;
  .popup {
    width: 100%;
    padding: 0 0.2rem;
    height: 100%;
    min-width: 1.5rem;
    align-items: center;
    color: #fff;
    background: rgba(0, 0, 0, 0.4);
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
          line-height: 0.56rem;
          display: flex;
          justify-content: center;
          // margin-top: 0.04rem;
          font-size: 0.24rem;
          white-space: nowrap;
          em {
            color: rgba(255, 255, 255, 1);
            font-size: 0.24rem;
            margin-left: 0.1rem;
            display: flex;
          }
        }
      }
    }
  }
}
</style>
