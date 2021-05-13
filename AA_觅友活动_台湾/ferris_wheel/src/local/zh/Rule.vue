<template>
  <div class="rule">
    <span @click="showQuery = true">解除心動關係</span>
    <div class="mask" v-show="showQuery">
      <transition name="slide">
        <div class="queryPup" v-if="showQuery">
          <div class="title">是否解除心動關係</div>
          <div class="tips" v-html="tipsArr[1].replace('$',owner.days).replace('$',owner.total_score)">
          </div>
          <div class="btns">
            <span class="st1" @click="showQuery = false">我再想想</span>
            <span class="st2" @click="relieve()">確定解除</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

// import { relieve } from "../../apis"
import { mapState } from "vuex"
export default {
  data () {
    return {
      showQuery: false,
      tipsArr: {
        1: '你們一共花了$天，累積%真愛值真的要解除關系嗎？<br/>解除後，累積的真愛值都會被清零喔',
      }
    }
  },
  computed: {
    ...mapState(['owner'])
  },
  methods: {
    relieve () {
      relieve().then(res => {
        if (res.data.response_status.code == 0) {
          this.toast(`心動傳送中,請耐心等待他/她的回復`)
          this.showQuery = false
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.queryPup {
  width: 6.77rem;
  height: 4.34rem;
  padding-top: 0.28rem;
  background: url(../../img/friend_set.png);
  background-size: 100% 100%;
  .title {
    height: 1.1rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.34rem;
    color: rgba(188, 37, 104, 1);
  }
  .tips {
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.6rem;
    font-size: 0.26rem;
    color: rgba(176, 97, 101, 1);
  }
  .btns {
    padding: 0 0.97rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      width: 2.19rem;
      height: 0.74rem;
      text-align: center;
      line-height: 0.74rem;
      &.st1 {
        background: url(../../img/st1.png);
        background-size: 100% 100%;
      }
      &.st2 {
        background: url(../../img/st12.png);
        background-size: 100% 100%;
      }
    }
  }
}
</style>