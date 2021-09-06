<template>
  <div v-if="owner_msg" class="landsBox">
    <div class="title">
      <a @click.prevent="" href=""><img :src="owner_msg.avatar" @error="onAvatarError($event)"></a>
      <div><strong>{{owner_msg.nick}}</strong><em>總成長值：{{owner_msg.total_score}}　排名：{{owner_msg.total_rank}}</em></div>
      <p>總成長值=胡蘿蔔數量+點讚值+作品/K房收禮魅力值</p>
    </div>

    <div class="btns">
      <a @click.prevent="getSeed" href="" class="get"></a>
      <a @click.prevent="getHelp" href="" class="help"></a>
    </div>

    <div class="nums">
      <div><span>{{owner_msg.radish}}</span></div>
      <div><span>{{owner_msg.praise}}</span></div>
    </div>

    <div class="role">
      <div><img :src="getRoleGif(owner_msg.rabbit_lv)"></div>
      <p><span>Lv {{owner_msg.rabbit_lv}}</span></p>
    </div>
    <div class="lands">
      <land v-for="land in land_info" :info="land" :key="land.id" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Land from './Land';
import { preloadImages } from '../utils';

export default {
  computed: {
    ...mapState(['owner_msg', 'land_info']),
  },
  mounted () {
    preloadImages(
      require('../img/carrot.png'),

      // require('../img/common_seed.png'),
      // require('../img/crazy_seed.png'),

      // require('../img/x5.png'),
      // require('../img/x100.png'),
      // require('../img/x110.png'),

      // require('../img/finger.png'),
      // require('../img/shovel.png'),
      // require('../img/rabbit_done.png'),
    );
  },
  methods: {
    onAvatarError (event) {
      event.target.src = require('../img/default.png');
    },
    getRoleGif (lv) {
      return [
        '',
        require('../img/1.gif'),
        require('../img/2.gif'),
        require('../img/3.gif'),
        require('../img/4.gif'),
        require('../img/5.gif'),
      ][lv];
    },
    getSeed () {
      alert('領種子');
    },
    getHelp () {
      alert('種植攻略');
    }
  },
  components: {
    Land,
  },
}
</script>

<style lang="scss">
@keyframes getSeed {
  100% {
    transform: scale(0.96);
  }
}
@keyframes role {
  55% {
    transform: translateY(0);
  }
  60% {
    transform: translateY(-5px);
  }
  65% {
    transform: translateY(0);
  }
}

.landsBox {
  font-size: 0.3rem;
  width: 7.33rem;
  height: 10.64rem;
  margin: 1rem auto;
  position: relative;
  background: url('../img/feed_box.png');
  background-size: 100% 100%;

  .title {
    width: 5.6rem;
    height: 1rem;
    padding-left: 1.1rem;
    position: relative;
    background: url('../img/feed_box_title.png');
    background-size: 100% 100%;
    margin: auto;
    top: -0.4rem;
    a {
      display: block;
      width: 0.98rem;
      height: 1.19rem;
      position: absolute;
      left: 0;
      top: -0.25rem;
      img {
        width: 0.87rem;
        height: 0.87rem;
        border-radius: 1rem;
        position: absolute;
        left: 0.05rem;
        bottom: 0.05rem;
      }
      &:after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: url('../img/self_avatar_bg.png');
        background-size: 100% 100%;
      }
    }
    div {
      padding-top: 0.08rem;
      strong,
      em {
        display: inline-block;
        vertical-align: middle;
      }
      strong {
        color: #fff;
        margin-right: 0.4rem;
        font-size: 90%;
        width: 1.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      em {
        font-size: 80%;
        color: #FFE479;
      }
    }
    p {
      font-size: 74%;
      color: #0CF8D0;
      white-space: nowrap;
    }
  }

  .btns {
    position: absolute;
    left: 0.3rem;
    top: 0.7rem;
    a {
      display: inline-block;
      background-size: 100% 100%;
      vertical-align: top;
      &.get {
        width: 1.08rem;
        height: 1.32rem;
        background-image: url('../img/get_seed.png');
        animation: getSeed 0.5s linear infinite alternate;
      }
      &.help {
        width: 1.66rem;
        height: 0.67rem;
        background-image: url('../img/plant_strategy.png');
      }
    }
  }

  .nums {
    position: absolute;
    top: 0.7rem;
    right: 0.3rem;
    div {
      span {
        font-size: 90%;
        display: inline-block;
        width: 0.94rem;
        padding-left: 0.6rem;
        background-size: 100% 100%;
        overflow: hidden;
      }
      &:first-child span {
        height: 0.76rem;
        line-height: 1rem;
        background-image: url('../img/carrot_bg.png');
      }
      &:last-child span {
        height: 0.67rem;
        line-height: 0.8rem;
        background-image: url('../img/like_bg.png');
      }
    }
  }

  .role {
    width: 1.8rem;
    position: absolute;
    left: 2.7rem;
    top: 1.2rem;
    text-align: center;
    div {
      img {
        height: 1.8rem;
        animation: role 8s linear infinite alternate;
      }
    }
    p {
      span {
        display: inline-block;
        padding: 0 0.3rem;
        color: #fff;
        height: 0.45rem;
        line-height: 0.45rem;
        background: #56C78A;
        border-radius: 1rem;
        font-size: 90%;
      }
    }
  }

  .seeds {
    position: absolute;
    left: 0.3rem;
    top: 9.35rem;
    right: 0.3rem;
    height: 1rem;
    li {
      float: left;
      box-sizing: border-box;
      border-radius: 0.4rem;
      padding: 0.05rem 0.2rem 0.05rem 0.7rem;
      position: relative;
      i,
      span {
        display: inline-block;
      }
      i {
        color: #fff;
        position: absolute;
        left: 0.2rem;
        bottom: 0.1rem;
        font-size: 70%;
        padding: 0 0.08rem;
        border-radius: 1rem;
        border-width: 2px;
        border-style: solid;
      }
      strong,
      em {
        display: block;
      }
      strong {
        font-size: 80%;
      }
      em {
        font-size: 70%;
        color: #BEFFCF;
        white-space: nowrap;
      }
      &:first-child {
        width: 41%;
        background: #1e8c66 url('../img/icon_common_seed.png') 0.1rem center
          no-repeat;
        background-size: 0.5rem 0.6rem;
        margin-right: 1%;
        i {
          background: #aa755e;
          border-color: #dba673;
        }
        strong {
          color: #F1FF8F;
        }
      }
      &:last-child {
        width: 58%;
        background: #1f8081 url('../img/icon_crazy_seed.png') 0.1rem center
          no-repeat;
        background-size: 0.5rem 0.6rem;
        i {
          background: #a05a8e;
          border-color: #df9bc1;
        }
        strong {
          color: #FFA4C5;
        }
      }
    }
  }

  .lands {
    width: 6.7rem;
    height: 5rem;
    position: absolute;
    left: 0.3rem;
    top: 4.2rem;
    .land0,
    .land1,
    .land2 {
      position: absolute;
      bottom: 3.28rem;
      transform: scale(0.7);
    }
    .land0 {
      left: 0.5rem;
    }
    .land1 {
      left: 2.25rem;
    }
    .land2 {
      right: 0.5rem;
    }

    .land3,
    .land4,
    .land5 {
      position: absolute;
      bottom: 1.8rem;
      transform: scale(0.8);
    }
    .land3 {
      left: 0.3rem;
    }
    .land4 {
      left: 2.25rem;
    }
    .land5 {
      right: 0.3rem;
    }

    .land6,
    .land7,
    .land8 {
      position: absolute;
      bottom: 0;
    }
    .land6 {
      left: 0;
    }
    .land7 {
      left: 2.2rem;
    }
    .land8 {
      right: 0.1rem;
    }
  }
}
</style>