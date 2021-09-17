<template>
  <div id="app">
    <div class="main">
      <div class="title"><img :src="images.title"></div>
      <div class="scrollArea">
        <div class="coins">
          <div class="svga"><canvas id="canvas"></canvas></div>
          <div class="num"><span><i></i><strong>{{coins}}</strong></span></div>
          <div class="txt">{{lang.coins_pool}}</div>
        </div>
        <ScrollNotice :list="record" />
        <ol class="rule">
          <li v-html="replaceLang(lang.rule1, `<em>${gift}</em>`, `<strong>${lang.gift_rebate}</strong>`)"></li>
          <li><em>{{replaceLang(lang.rule2, gift)}}</em></li>
          <li>{{lang.rule3}}</li>
          <li>{{lang.rule4}}</li>
        </ol>
        <h5><strong>{{lang.rank_title}}</strong></h5>
        <div class="desc"><span v-html="replaceLang(lang.rank_desc, `<strong>${lang.rank_hour}</strong>`)"></span><img :src="frame"></div>
        <div class="rank">
          <ul>
            <li v-for="(item,index) in rank" :key="index">
              <i>{{item.rank | rank}}</i>
              <img @click="profile(item.uid)" v-lazy="item.avatar">
              <strong>{{item.nick}}</strong>
              <em>{{replaceLang(lang.get_coins, item.score)}}</em>
            </li>
          </ul>
        </div>
        <div v-if="isIOS" class="tips">{{lang.ios_tips}}</div>
      </div>
      <div class="owner">
        <div>
          <h6>{{lang.owner_coins}}</h6>
          <p><i></i><strong>{{owner_coins}}</strong></p>
        </div>
      </div>
    </div>
    <Loading v-show="loading" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Player } from 'svga.lite';
import { urls } from './config';
import { toast, profile } from './utils';
import { init } from './apis';
import { loadSvgaData } from './utils/svga';
import Loading from './components/common/Loading';
import ScrollNotice from './components/common/ScrollNotice';

export default {
  data () {
    return {
      coins: 0,
      owner_coins: 0,
      record: [],
      rank: [],
      gift: '',
      frame: '',
    };
  },
  computed: {
    ...mapState(['loading']),
    viewHeight: () => window.innerHeight,
    isIOS: () => _platform == 'ios',
  },
  filters: {
    rank (value) {
      return value < 10 ? '0' + value : value;
    },
  },
  mounted () {
    this.initSvga();
    this.loadData();
  },
  methods: {
    profile,
    async initSvga () {
      const svgaData = await loadSvgaData(urls.svga);
      const player = new Player('#canvas');
      await player.mount(svgaData);
      player.start();
    },
    async loadData () {
      const res = await init();
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (response_status && response_status.error === '') {
          Object.assign(this, response_data);
          const { gift_info, mall_info } = response_data;
          this.gift = gift_info.name;
          this.frame = mall_info.url_front;
        } else if (response_status.error) {
          toast(response_status.error);
        }
      }
    },
  },
  components: {
    Loading,
    ScrollNotice,
  },
};
</script>

<style lang="scss">
$margin: 0.3rem;
.main {
  // APP房间网页区域高宽比1020/750
  position: relative;
  margin-top: 2rem;
  padding-top: 1rem;
  height: 7.2rem;
  background: linear-gradient(#9339E9, #5E0CBF);
  border-radius: 0.4rem 0.4rem 0 0;
  .title {
    position: absolute;
    left: 0;
    right: 0;
    top: -1.8rem;
    img {
      display: block;
      width: 100%;
      margin: auto;
    }
  }

  .scrollArea {
    padding: 0 $margin;
    height: 7.1rem;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .coins {
    height: 2.8rem;
    // background: #540AA9;
    // border-radius: .1rem;
    position: relative;
    overflow: hidden;
    .svga,
    .num {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .svga {
      canvas {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .num {
      display: flex;
      justify-content: center;
      align-items: center;
      i,
      strong {
        display: inline-block;
        margin: 0 0.1rem;
        vertical-align: middle;
      }
      i {
        width: 0.6rem;
        height: 0.6rem;
        background: url('./img/coin.png');
        background-size: 100% 100%;
      }
      strong {
        color: #FFDD00;
        font-size: 0.56rem;
        font-weight: bold;
      }
    }
    .txt {
      color: #fff;
      font-size: 0.26rem;
      box-sizing: border-box;
      padding: 0 0.15rem;
      min-width: 1.4rem;
      height: 0.46rem;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 0.2rem;
      bottom: 0.2rem;
      background: rgba(#fff, 0.1);
      border-radius: 0.23rem;
    }
  }
  .scrollNotice {
    margin: 0.2rem 0;
  }
  .rule {
    margin-bottom: 0.4rem;
    color: rgba(#fff, 0.6);
    li,
    em,
    strong {
      font-size: 0.26rem;
      line-height: 0.45rem;
    }
    em {
      color: #fff;
    }
    strong {
      color: #FFDD00;
    }
  }
  h5 {
    text-align: center;
    &:before,
    &:after {
      content: '';
      display: inline-block;
      vertical-align: middle;
      width: 0.28rem;
      height: 0.34rem;
      background-size: 100% 100%;
    }
    &:before {
      background-image: url('./img/rank_left.png');
    }
    &:after {
      background-image: url('./img/rank_right.png');
    }
    strong {
      display: inline-block;
      vertical-align: middle;
      font-size: 0.46rem;
      color: #fff;
      font-weight: 400;
      margin: 0 0.4rem;
    }
  }
  .desc {
    margin: 0.4rem 0 0.19rem 0;
    padding: 0.2rem 0.5rem;
    background: #fff;
    border-radius: 0.1rem;
    color: #5707B4;
    font-size: 0.32rem;
    display: flex;
    align-items: center;
    span,
    img {
      display: block;
    }
    span {
      padding-right: 0.4rem;
      flex: 1;
      strong {
        color: #FF5C61;
        font-size: 0.32rem;
      }
    }
    img {
      width: 1.8rem;
      height: 1.8rem;
    }
  }
  .rank {
    padding-bottom: 0.1rem;
    li {
      padding: 0.19rem 0;
      font-size: 0;
      display: flex;
      align-items: center;
      i {
        width: 0.64rem;
        font-size: 0.28rem;
        font-weight: 400;
        color: rgba(#fff, 0.3);
      }
      img {
        display: block;
        width: 1.1rem;
        height: 1.1rem;
        border: 0.02rem solid #fff;
        border-radius: 1.1rem;
      }
      strong {
        flex: 1;
        color: #fff;
        font-size: 0.32rem;
        padding: 0 0.28rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      em {
        font-size: 0.28rem;
        color: rgba(#fff, 0.6);
      }
    }
  }
  .tips {
    text-align: center;
    font-size: 0.28rem;
    color: rgba(#fff, 0.6);
    padding: 0.1rem 0;
  }

  .owner {
    position: absolute;
    top: 0.76rem;
    right: 0rem;
    z-index: 100;
    width: 2.4rem;
    height: 0.86rem;
    overflow: hidden;
    div {
      // position: absolute;
      // top: 0;
      // right: -.1rem;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      color: #FD0;
      background: rgba(#FD0, 0.3);
      border: 0.02rem solid #FD0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 0.42rem 0 0 0.42rem;
      line-height: 1em;
      h6,
      strong {
        font-size: 0.24rem;
        text-align: center;
        padding: 0 0.1rem;
      }
      i,
      strong {
        display: inline-block;
        vertical-align: middle;
        margin: 0 0.03rem;
      }
      i {
        width: 0.3rem;
        height: 0.3rem;
        background: url('./img/coin_small.png');
        background-size: 100% 100%;
      }
      strong {
        font-weight: bold;
      }
    }
  }
}
</style>