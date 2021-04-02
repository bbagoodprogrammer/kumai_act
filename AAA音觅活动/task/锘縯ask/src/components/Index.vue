<template>
  <div class="page pageIndex">
    <div class="con">
      <div class="my_bean">
        <p class="tips">{{lang.my_total_bean}}</p>
        <span class="my_bean_num">{{beans}}</span>
      </div>
      <div class="news_task" v-if="newuser.length>0">
        <p class="title">{{lang.news_task}}</p>
        <ul>
          <li v-for="(item,index) in newuser" :key="index">
            <span>
              <img src="../img/pic.png" alt v-if="item.id=='2005'" />
              <img src="../img/attention.png" alt v-if="item.id=='2006'" />
              <img src="../img/snatchsinging.png" alt v-if="item.id=='2007'" />
              <img src="../img/glory.png" alt v-if="item.id=='2008'" />
              <img src="../img/make.png" alt v-if="item.id=='2009'" />
              <img src="../img/head.png" alt v-if="item.id=='2010'" />
            </span>
            <span>
              <strong>{{item.name}}</strong>
              <em>+{{item.beans}}</em>
            </span>
            <span v-if="item.giveBeans=='1'" class="get_ed">{{lang.is_get}}</span>
            <span
              v-if="item.flag=='1' && item.giveBeans=='0'"
              class="get"
              @click="get(item)"
            >{{lang.get}}</span>
            <span
              v-if="item.flag=='0' && item.giveBeans=='0'"
              class="go_done"
              @click="go_done(item.id)"
            >{{lang.go}}</span>
          </li>
        </ul>
      </div>
      <div class="line"></div>
      <div class="days_task">
        <p class="title">{{lang.days_task}}</p>
        <ul>
          <li v-for="(item,index) in daily" :key="index">
            <span>
              <img src="../img/signin.png" alt v-if="item.id=='2001'" />
              <img src="../img/glory.png" alt v-if="item.id=='2002'" />
              <img src="../img/burstlamp.png" alt v-if="item.id=='2003'" />
              <img src="../img/attention.png" alt v-if="item.id=='2004'" />
              <img src="../img/make.png" alt v-if="item.id=='2015'" />
              <img src="../img/judge.png" alt v-if="item.id=='2016'" />
            </span>
            <span>
              <strong>{{item.name}}</strong>
              <em>+{{item.beans}}</em>
            </span>
            <span v-if="item.giveBeans=='1'" class="get_ed">{{lang.is_get}}</span>
            <span
              v-if="item.flag=='1' && item.giveBeans=='0'"
              class="get"
              @click="get(item)"
            >{{lang.get}}</span>
            <span
              v-if="item.flag=='0' && item.giveBeans=='0'"
              class="go_done"
              @click="go_done(item.id)"
            >{{lang.go}}</span>
          </li>
        </ul>
      </div>
      <transition name="bounce">
        <div class="pro" v-if="pro_show==1">
          <div class="pro_inner"></div>
          <div class="img">
            <img src="../img/pro_bean.png" alt class="pro_bean" />
            <img src="../img/star.png" alt class="star star1" />
            <img src="../img/star.png" alt class="star star2" />
            <img src="../img/star.png" alt class="star star3" />
            <p>
              {{lang.get_beans}}
              <span>X{{get_bean}}</span>
            </p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { appClose, toast, callApp, getUrlString } from "../utils";
import SvgaPreview from "./SvgaPreview";
import { getTaskList, getWalletInfo, giveBeans } from "../apis";
import downTime from "../utils/downTime";
const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);

export default {
  data() {
    return {
      beans: 0,
      daily: [],
      newuser: [],
      pro_show: -1,
      get_bean: 0
    };
  },
  computed: {
    ...mapState([])
  },
  mounted() {
    (async () => {
      const res = await getTaskList();
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (!response_status.error) {
          this.daily = response_data.daily;
          this.newuser = response_data.newuser;
        } else {
          toast(response_status.error.replace(/\[[\s\d]+\]/, ""));
        }
      }
    })();
    (async () => {
      const res = await getWalletInfo();
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (!response_status.error) {
          this.beans = response_data.beans;
        } else {
          toast(response_status.error.replace(/\[[\s\d]+\]/, ""));
        }
      }
    })();
  },
  methods: {
    go_done(id) {
      if (id == "2005") {
        if (ios) {
          goPhotoAlbum();
        } else {
          javascript: JSInterface.goPhotoAlbum();
        }
      } else if (id == "2001") {
        if (ios) {
          goHomepage();
        } else {
          javascript: JSInterface.goHomepage();
        }
      } else if (id == "2010") {
        if (ios) {
          goUserInfo();
        } else {
          javascript: JSInterface.goUserInfo();
        }
      } else if (id == "2016") {
        if (ios) {
          goJudgeFunction();
        } else {
          javascript: JSInterface.goJudgeFunction();
        }
      } else if (id == "2009") {
        if (ios) {
          goLeadingSinger();
        } else {
          javascript: JSInterface.goLeadingSinger();
        }
      } else if (id == "2015") {
        //漂流瓶
        if (ios) {
          goLeadingSinger();
        } else {
          javascript: JSInterface.sendJsData("app://makeSoundBottlespage");
        }
      } else {
        if (ios) {
          goGame();
        } else {
          javascript: JSInterface.goGame();
        }
      }
    },
    async get(obj) {
      const res = await giveBeans(obj.id);
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (!response_status.error) {
          obj.giveBeans = "1";
          this.beans = this.beans - 0 + obj.beans;
          this.get_bean = obj.beans;
          this.pro_show = 1;
          setTimeout(() => {
            this.pro_show = -1;
          }, 1500);
        } else {
          toast(response_status.error.replace(/\[[\s\d]+\]/, ""));
        }
      }
    }
  },
  components: {
    SvgaPreview
  }
};
</script>

<style lang="scss">
body {
  background-color: #fff;
}
.con {
  padding: 0 0.3rem 1rem 0.29rem;
}
.my_bean {
  width: 100%;
  padding: 0.6rem 0 0.8rem 0;
  .tips {
    color: #000;
    font-size: 0.32rem;
    background: url("../img/bean.png") center left no-repeat;
    background-size: 0.36rem 0.36rem;
    padding-left: 0.44rem;
    margin-bottom: 0.2rem;
  }
  .my_bean_num {
    color: #000;
    font-size: 0.7rem;
  }
  .record {
    width: 1.34rem;
    height: 0.54rem;
    line-height: 0.54rem;
    text-align: center;
    border: 0.02rem solid #878787;
    color: #878787;
    font-size: 0.26rem;
    border-radius: 0.27rem;
    position: absolute;
    right: 0.4rem;
    top: 0.6rem;
  }
}
.news_task,
.days_task {
  .title {
    color: #000;
    font-size: 0.32rem;
    padding-bottom: 0.1rem;
  }
  ul {
    li {
      padding: 0.31rem 0;
      font-size: 0;
      > span {
        display: inline-block;
        vertical-align: middle;
      }
      span:nth-of-type(1) {
        margin-right: 0.2rem;
        img {
          width: 1.1rem;
          height: 1.1rem;
        }
      }
      span:nth-of-type(2) {
        width: 4.15rem;
        strong {
          display: block;
          font-size: 0.32rem;
          color: #333;
          padding-bottom: 0.04rem;
        }
        em {
          display: inline-block;
          color: #f0b404;
          font-size: 0.26rem;
          background: url("../img/bean_small.png") center right no-repeat;
          -webkit-background: url("../img/bean_small.png") center no-repeat;
          background-size: 0.24rem 0.24rem;
          -webkit-background-size: 0.24rem 0.24rem;
          padding-right: 0.35rem;
        }
      }
      .go_done,
      .get {
        width: 1.4rem;
        height: 0.58rem;
        line-height: 0.58rem;
        border-radius: 0.27rem;
        font-size: 0.26rem;
        color: #fff;
        text-align: center;
      }
      .go_done {
        background: #7a68f8;
      }
      .get {
        background: linear-gradient(
          270deg,
          #f65a6e 0%,
          #cb6dc5 43%,
          #b676f0 64%,
          #7d7df6 100%
        );
      }
      .get_ed {
        font-size: 0.26rem;
        color: #878787;
        width: 1.34rem;
        text-align: center;
      }
    }
    li:last-child {
      border: none;
    }
  }
}
.news_task {
  margin-bottom: 0.5rem;
}
.pro {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 3;
  .pro_inner {
    width: 5.09rem;
    height: 5.17rem;
    background: url("../img/bling.png") center left no-repeat;
    -webkit-background: url("../img/bling.png") center no-repeat;
    background-size: 5.09rem 5.17rem;
    -webkit-background-size: 5.09rem 5.17rem;
    animation: rotate 5s linear infinite;
    position: absolute;
    left: 50%;
    margin-left: -2.5045rem;
    top: 3rem;
  }
  .img {
    width: 5.09rem;
    height: 5.17rem;
    position: absolute;
    left: 50%;
    margin-left: -2.5045rem;
    top: 3rem;
    text-align: center;
    .pro_bean {
      margin-top: 1.6rem;
      width: 1.76rem;
      height: 1.48rem;
    }
    .star {
      width: 0.45rem;
      height: 0.41rem;
      position: absolute;
    }
    .star1 {
      top: 1.8rem;
      left: 1.2rem;
      animation: opacity-change 1.5s ease-in-out infinite;
      animation-delay: 0.5s;
    }
    .star2 {
      top: 1.5rem;
      left: 2.7rem;
      animation: opacity-change 1.75s ease-in-out infinite;
      animation-delay: 0.6s;
    }
    .star3 {
      top: 2.4rem;
      left: 3.4rem;
      animation: opacity-change 2s ease-in-out infinite;
      animation-delay: 0.8s;
    }
    p {
      color: #fff;
      font-size: 0.4rem;
      font-weight: normal;
      padding-top: 0.74rem;
      span {
        color: #ffa800;
      }
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes opacity-change {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-webkit-keyframes opacity-change {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.bounce-enter-active {
  animation: bounce-in 0.6s;
}
.bounce-leave-active {
  animation: bounce-in 0s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
.line {
  display: none;
  width: 7.5rem;
  height: 0.16rem;
  // background:rgba(240,240,240,1);
  margin-left: -0.4rem;
  margin-bottom: 0.6rem;
}
</style>