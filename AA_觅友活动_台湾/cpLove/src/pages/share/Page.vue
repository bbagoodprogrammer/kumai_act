<template>
  <div class="page pageShare">
    <div class="con" v-if="ready==1">
      <div class="love_box" v-if="resInfo.team">
        <div class="top">
          <div class="my_info">
            <div class="avatar"><img :src="resInfo.avatar" alt=""></div>
            <p>{{resInfo.nick}}</p>
          </div>
          <div class="mid">
            <div class="icon"></div>
          </div>
          <div class="cp_info">
            <div class="avatar"><img :src="resInfo.cp_avatar" alt=""></div>
            <p>{{resInfo.cp_nick}}</p>
          </div>
        </div>
        <div class="is_salt" v-if="resInfo.team=='salt'">
          <ul class="ul">
            <li v-for="(item,i) in lang.salt1" :key="i">{{item}}</li>
          </ul>
          <ul>
            <li v-for="(item,i) in lang.salt2" :key="i">{{item}}</li>
          </ul>
          <p class="sign">{{lang.salt_sign}}</p>
        </div>
        <div class="is_sweet" v-if="resInfo.team=='sweet'">
          <ul class="ul">
            <li v-for="(item,i) in lang.sweet1" :key="i">{{item}}</li>
          </ul>
          <ul>
            <li v-for="(item,i) in lang.sweet2" :key="i">{{item}}</li>
          </ul>
          <p class="sign">{{lang.sweet_sign}}</p>
        </div>
        <div class="bottom">
          <div class="gifts">
            <div><img src="../../img/gift1.png?v=3" alt="">
              <p>{{lang.share_gifts1}}</p>
            </div>
            <div><img src="../../img/gift2.png" alt="">
              <p>{{lang.share_gifts2}}</p>
            </div>
            <div><img src="../../img/gift3.png" alt="">
              <p>{{lang.share_gifts3}}</p>
            </div>
          </div>
          <template v-if="resInfo.team">
            <div class="btn" @click="openShare()">{{lang.share_btn1}}</div>
            <p class="slogan">{{lang.share_slogan}}</p>
          </template>
          <template v-else>
            <div class="btn" @click="openShare()">{{lang.share_btn2}}</div>
            <p class="slogan">{{lang.share_slogan}}</p>
          </template>
        </div>
      </div>
      <div class="love_box_null" v-else>
        <div class="top">
          <div class="my_info">
            <div class="avatar"><img :src="resInfo.avatar" alt=""></div>
            <p>{{resInfo.nick}}</p>
          </div>
          <div class="mid">
            <div class="icon"></div>
          </div>
          <div class="cp_info">
            <div class="avatar"><img src="../../img/default.png" alt=""></div>
            <p>{{lang.future_people}}</p>
          </div>
        </div>
        <div class="no_tips" v-html="lang.no_tips"></div>
        <div class="bottom">
          <div class="gifts">
            <div><img src="../../img/gift1.png?v=3" alt="">
              <p>{{lang.share_gifts1}}</p>
            </div>
            <div><img src="../../img/gift2.png" alt="">
              <p>{{lang.share_gifts2}}</p>
            </div>
            <div><img src="../../img/gift3.png" alt="">
              <p>{{lang.share_gifts3}}</p>
            </div>
          </div>
          <div class="btn" @click="openShare()">{{lang.share_btn2}}</div>
          <p class="slogan">{{lang.share_slogan}}</p>
        </div>
      </div>
    </div>
    <Loading v-show="loading" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getShare } from '../../apis'
import { getUrlString, toast } from '../../utils'
import Loading from '../../components/common/Loading'
import openApp from "../../utils/openApp";
const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i)
const lang_str = getUrlString('lang')
console.log(lang_str)
export default {
  data () {
    return {
      resInfo: {},
      has: 0,
      is_type: -1,
      ready: -1,
    }
  },
  created () { },
  mounted () {
    // var response_data = {
    //     avatar: 'http://udatefile.cat1314.com/uc/img/head_10013098_1572938743.png?wsSecret=2466c92401b167aafc7ba954e38f752d&wsTime=1606406400',
    //     nick: '𝓐 𝓣𝓾 𝓛𝓪',
    //     cp_avatar:
    //         'http://udatefile.cat1314.com/uc/img/head_10013061_1592876180.png?wsSecret=718379b7412dfc9dc98c787cc56ef1dd&wsTime=1606406400',
    //     cp_nick: '可爱的你哈哈哈哈哈哈11',
    //     team: 'sweet',
    // }
    // var response_data = {
    //     avatar: 'http://udatefile.cat1314.com/uc/img/head_10013237_1559704806.png?wsSecret=4e7cfefa38df5d135987a441fe1f67c1&wsTime=1606406400',
    //     nick: 'Girl ',
    // }
    // this.resInfo = response_data;
    // return
    (async () => {
      const res = await getShare()
      if (res.data) {
        const { response_status, response_data } = res.data
        if (response_status.error === '') {
          this.resInfo = response_data;
          this.ready = 1;
        } else {
          toast(response_status.error);
        }
      } else {

      }
    })()
  },
  methods: {
    openApp,
    openShare () {
      this.openApp();
    },
  },
  computed: {
    ...mapState(['loading']),
  },
  components: {
    Loading,
  },
}
</script>

<style lang="scss">
body {
  background-color: #511c7e;
  padding-top: 0.2rem;
}
img {
  width: 100%;
}
.con {
  .love_box {
    width: 6.76rem;
    height: 12.95rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 0.45rem auto;
    position: relative;
    box-sizing: border-box;
    padding-top: 1.21rem;
    .top {
      text-align: center;
      font-size: 0;
      width: 3rem;
      margin: 0 auto;
      position: relative;
      .my_info {
        z-index: 1;
      }
      .cp_info {
        margin-left: -0.2rem;
      }
      .mid {
        display: inline-block;
        height: 0.54rem;
        width: 0.54rem;
        text-align: center;
        position: absolute;
        top: 0.42rem;
        z-index: 2;
        left: 50%;
        margin-left: -0.27rem;
        .icon {
          width: 0.54rem;
          height: 0.54rem;
          background: url('../../img/share_icon.png') 50% no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .is_salt {
      ul {
        &.ul {
          margin-bottom: 0.25rem;
        }
        li {
          line-height: 0.34rem;
        }
      }
    }
  }
}
.con .love_box .top .cp_info,
.con .love_box .top .my_info {
  display: inline-block;
  position: relative;
}
.con .love_box .top .cp_info .avatar,
.con .love_box .top .my_info .avatar {
  width: 1.42rem;
  height: 1.42rem;
  background: url('../../img/share_avatar_bg.png') 50% no-repeat;
  background-size: 100% 100%;
  text-align: center;
  box-sizing: border-box;
  margin-bottom: 0.19srem;
  position: relative;
}
.con .love_box .top .cp_info .avatar img,
.con .love_box .top .my_info .avatar img {
  width: 1.34rem;
  height: 1.34rem;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -0.67rem 0 0 -0.67rem;
}
.con .love_box .top .cp_info p,
.con .love_box .top .my_info p {
  font-size: 0.24rem;
  color: #994bc6;
  text-align: center;
  margin-top: 0.1rem;
  width: 1.2rem;
  max-width: 1.2rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-left: 0.11rem;
}
.con .love_box .is_salt,
.con .love_box .is_sweet {
  margin-top: 0.34rem;
  padding-left: 1.71rem;
}
.con .love_box .is_salt ul.ul,
.con .love_box .is_sweet ul.ul {
  margin-bottom: 0.35rem;
}
.con .love_box .is_salt ul li,
.con .love_box .is_sweet ul li {
  font-size: 0.24rem;
  color: #7413ad;
  text-align: left;
}
.con .love_box .is_salt .sign,
.con .love_box .is_sweet .sign {
  text-align: right;
  font-size: 0.24rem;
  color: #7413ad;
  padding: 0.09rem 1.6rem 0 0;
}

.con {
  .love_box_null {
    width: 6.76rem;
    height: 10.57rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 0.45rem auto;
    padding-top: 1.21rem;
    position: relative;
    box-sizing: border-box;
    .top {
      text-align: center;
      font-size: 0;
      width: 3rem;
      margin: 0 auto;
      position: relative;
      .my_info {
        z-index: 1;
      }
      .cp_info {
        margin-left: -0.2rem;
      }
      .mid {
        display: inline-block;
        height: 0.54rem;
        width: 0.54rem;
        text-align: center;
        position: absolute;
        top: 0.42rem;
        z-index: 2;
        left: 50%;
        margin-left: -0.27rem;
        .icon {
          width: 0.54rem;
          height: 0.54rem;
          background: url('../../img/share_icon.png') 50% no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .no_tips {
      padding-top: 0.8rem;
      text-align: center;
      font-size: 0.3rem;
      color: #7413ad;
      line-height: 0.4rem;
    }
  }
}
.con .love_box_null .top .cp_info,
.con .love_box_null .top .my_info {
  display: inline-block;
  position: relative;
}
.con .love_box_null .top .cp_info .avatar,
.con .love_box_null .top .my_info .avatar {
  width: 1.42rem;
  height: 1.42rem;
  background: url('../../img/share_avatar_bg.png') 50% no-repeat;
  background-size: 100% 100%;
  text-align: center;
  box-sizing: border-box;
  margin-bottom: 0.19srem;
  position: relative;
}
.con .love_box_null .top .cp_info .avatar img,
.con .love_box_null .top .my_info .avatar img {
  width: 1.34rem;
  height: 1.34rem;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -0.67rem 0 0 -0.67rem;
}
.con .love_box_null .top .cp_info p,
.con .love_box_null .top .my_info p {
  font-size: 0.24rem;
  color: #994bc6;
  text-align: center;
  margin-top: 0.1rem;
  width: 1.2rem;
  height: 0.3rem;
  max-width: 1.2rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-left: 0.11rem;
}

.con {
  .bottom {
    position: absolute;
    width: 6.76rem;
    bottom: 0.3rem;
    .gifts {
      padding-top: 0.4rem;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: center;
      justify-content: center;
      & > div {
        width: 1.61rem;
        text-align: center;
        font-size: 0;
        margin-right: 0.22rem;
        img {
          display: inline-block;
          width: 1.61rem;
          height: 1.61rem;
          margin-bottom: 0.08rem;
        }
        p {
          display: inline-block;
          width: 1.61rem;
          color: #fff;
          font-size: 0.2rem;
          font-family: PingFang SC;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .btn {
      width: 3.85rem;
      height: 1.19rem;
      line-height: 1.19rem;
      text-align: center;
      background: url('../../img/share_btn.png');
      background-size: 100% 100%;
      margin: 0 auto;
      font-size: 0.32rem;
      color: #8c4018;
      font-weight: 500;
    }
    .slogan {
      font-size: 0.18rem;
      color: #dabbfe;
      text-align: center;
    }
  }
}
</style>