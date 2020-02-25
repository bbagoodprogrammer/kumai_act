<template>
  <div class="trunbg">
    <i class="horn"></i>
    <div class="trunMsg">
      <p class="msgItem" v-for="(item,index) in top_record" :key="index" v-show="index == msgIndex" :class="{min:item.go_count==1,max:item.go_count==10}">
        <em v-show="item.total_bean > 0">{{item.total_bean}}<i class="dou"></i></em>
        <em v-show="item.total_coin > 0 && item.total_bean > 0">,</em>
        <em v-show="item.total_coin > 0">{{item.total_coin}}<i class="coins"></i></em>
        <span v-if="item.go_count==1" class="nick" v-html="`يحصل <em>${getNick(item.nick)}</em> على ${item.gift_name}، بقيمة `"></span>
        <span v-else class="nick" v-html="`يحصل <em>${getNick(item.nick)}</em> على ${item.gift_name} وغيرها من 10 جوائز، بقيمة`"></span>
      </p>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      msgIndex: 0,
      timer: null
    }
  },
  watch: {
    userMsg(val) {
      if (this.top_record.length > 1) {
        let obj = {
          msgIndex: this.msgIndex + 1,
          msg: val
        }
        this.$store.commit('charuTop_record', obj)
        // this.top_record.splice(this.msgIndex + 1, 0, val)
      } else {
        this.$store.commit('addMsg', val)
        // this.top_record.push(val)
      }
    },
    top_record(val) {
      if (val.length > 0 && this.timer == null) {
        this.msgGo()
      }
    }
  },
  computed: {
    ...mapState(['top_record', 'userMsg']),
  },
  mounted() {
    this.msgGo()
  },
  methods: {
    msgGo() {
      this.timer = setInterval(() => {
        if (this.msgIndex == this.top_record.length - 1) {
          this.msgIndex = 0
        } else {
          this.msgIndex++
        }
      }, 5000);
    },
    getNick(nick) {
      if (String(nick).indexOf('*') > -1) {
        let arr = nick.split(/\*+/)
        return `${arr[1]}****${arr[0]}`
      } else {
        return nick
      }
    }
  }
}
</script>
<style lang="scss">
.trunbg {
  width: 6.16rem;
  height: 0.42rem;
  margin: 0.4rem auto 0;
  background: rgba(66, 0, 100, 1);
  border-radius: 0.21rem;
  display: flex;
  align-items: center;
  .horn {
    display: block;
    width: 0.27rem;
    height: 0.22rem;
    margin: 0 0.47rem 0 0.08rem;
    background: url(../assets/img/horn.png);
    background-size: 100% 100%;
  }
  .trunMsg {
    width: 5.26rem;
    height: 0.42rem;
    position: relative;
    overflow: hidden;
    direction: ltr;
    .msgItem {
      // width: 8rem;
      font-size: 80%;
      display: flex;
      align-items: center;
      position: absolute;
      white-space: nowrap;
      animation: trun linear 5s infinite;
      .nick {
        em {
          direction: ltr;
        }
      }
      &.min {
        left: -5rem;
      }
      &.max {
        left: -8rem;
      }
      > em {
        display: flex;
        align-items: center;
      }
      .coins {
        display: block;
        width: 0.23rem;
        height: 0.23rem;
        margin: 0 0.05rem;
        background: url(../assets/img/coins.png);
        background-size: 100% 100%;
      }
      .dou {
        display: block;
        width: 0.23rem;
        height: 0.23rem;
        margin: 0 0.05rem;
        background: url(../assets/img/dou.png);
        background-size: 100% 100%;
      }
    }
  }
}

@keyframes trun {
  // 0% {
  //   left: -8rem;
  // }
  // 80% {
  //   // top: 0;
  //   left: 5.3rem;
  //   // opacity: 1;
  // }
  100% {
    // top: -0.5rem;
    left: 5.5rem;
    // opacity: 0;
  }
}
</style>
