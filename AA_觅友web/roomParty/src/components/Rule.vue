<template>
  <div class="rule">
    <div class="title">
      <strong>發佈活動預告</strong>
      <i class="close" @click="close()"></i>
    </div>
    <p class="firstTips">
      發起房間活動預告，邀請好友們參與可在活動中獲得豐富獎勵，並享有以下活動特權：
    </p>
    <ul>
      <li v-for="(item,index) in tipsArr" :key="index">
        <span class="iconImg" :class="'icon'+index"> </span>
        <div class="tipsMsg">
          <img :src="item.titleImg" alt="" class="tipsTitle">
          <div class="msg">{{item.tips}}</div>
        </div>
      </li>
    </ul>
    <div class="create" v-if="isOwner">
      <div class="btn" @click="$router.push({name:'CreatAct'})">發布活動預告</div>
    </div>
  </div>

</template>

<script>
import { mapState } from "vuex"
import { closeWeb } from "../utils/miyouCallApp"

export default {
  data () {
    return {
      routeFrom: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log(to)
    console.log(from)
    // this.routeFrom = JSON.stringify(JSON.parse(from.name))
    next(vm => {
      // 通过 `vm` 访问组件实例,将值传入newPath
      //beforeRouteEnter守卫在导航确认前被调用，因此守卫不能访问 this
      //在template里已经可以用this.newPath来获取到from所带的name值
      vm.routeFrom = from.name
    });
  },
  computed: {
    ...mapState(['isOwner', 'ListLength']),
    tipsArr: () => _lang.tipsArr
  },
  methods: {
    close () {
      if (this.routeFrom && this.ListLength) {
        this.$router.go(-1)
      } else {
        console.log('close')
        closeWeb()
      }
    }
  }
}
</script>

<style lang="scss">
.rule {
  position: relative;
  > .title {
    text-align: center;
    height: 0.88rem;
    line-height: 0.88rem;
    color: #2C2B36;
    position: relative;
    strong {
      font-size: 0.32rem;
      font-weight: bold;
    }
    .close {
      display: block;
      width: 0.48rem;
      height: 0.48rem;
      background: url(../img/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.2rem;
      right: 0.3rem;
    }
  }
  .firstTips {
    padding: 0 0.48rem 0 0.31rem;
    font-size: 0.26rem;
    color: #8C8995;
    line-height: 0.38rem;
    margin-top: 0.3rem;
  }
  ul {
    padding: 0 0.52rem 0 0.29rem;
    margin-top: 0.55rem;
    height: 5.21rem;
    overflow-y: scroll;
    padding-bottom: 1.4rem;
    li {
      min-height: 1.48rem;
      margin-bottom: 0.43rem;
      display: flex;
      .iconImg {
        width: 1.48rem;
        height: 1.48rem;
        &.icon0 {
          background: url(../img/icon0.png);
          background-size: 100% 100%;
        }
        &.icon1 {
          background: url(../img/icon1.png);
          background-size: 100% 100%;
        }
        &.icon2 {
          background: url(../img/icon2.png);
          background-size: 100% 100%;
        }
        &.icon3 {
          background: url(../img/icon3.png);
          background-size: 100% 100%;
        }
      }
      .tipsMsg {
        flex: 1;
        margin-left: 0.28rem;
        padding-top: 0.11rem;
        .tipsTitle {
          width: 2.85rem;
          height: 0.44rem;
        }
        .msg {
          color: rgba(44, 43, 54, 0.7);
          font-size: 0.26rem;
          line-height: 0.36rem;
          margin-top: 0.12rem;
        }
      }
    }
  }
  .create {
    width: 100%;
    height: 1.08rem;
    padding-top: 1.02rem;
    background: linear-gradient(0deg, #FFFFFF, rgba(255, 255, 255, 0));
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    .btn {
      width: 5.61rem;
      height: 0.84rem;
      background: linear-gradient(90deg, #7A68F8, #9585FF);
      border-radius: 0.41rem;
      text-align: center;
      line-height: 0.84rem;
      font-size: 0.32rem;
      margin: 0 auto;
    }
  }
}
</style>