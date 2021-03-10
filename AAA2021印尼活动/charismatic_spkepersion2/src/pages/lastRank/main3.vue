<template>
  <div class="lastRank">
    <div class="title">{{title}}</div>
    <div class="top1">
      <img :src="top1.avatar" alt="" @click="goUser(top1.uid)">
      <strong>{{top1.nick}}</strong>
    </div>
    <ul>
      <li v-for="(item,index) in shouList" :key="index">
        <i class="mounthIcon" v-if="mark[index+1]">{{mark[index+1]}}</i>
        <i class="mounthIcon" v-else>Tháng{{index +1}}</i>
        <img :src="item.avatar" alt="" @click="goUser(item.uid)">
        <strong>{{item.nick}}</strong>
      </li>
    </ul>
    <h5>Paket hadiah besar juru bicara pesona:</h5>
    <p>Anda akan didapatkan 1 paket hadiah besar jika setiap kali menjadi juru bicara pesona Wekara : 1 lagu yg direkomendasikan dengan tag lagu juru bicara pesona di beranda+2000 koin emas, yang akan
      dikirimkan dalam 7 hari setelah acara berakhir.</p>
  </div>
</template>
<script>

import api from "../../api/apiConfig"
export default {
  data () {
    return {
      default: {
        nick: 'Tunggumu naik',
        avatar: require(`../../assets/img/rank/empty.png`)
      },
      list: [],
      title: '',
      mark: {}
    }
  },
  computed: {
    top1 () {
      if (this.list.length) {
        return this.list[this.list.length - 1]
      }
      return this.default
    },
    shouList () {
      let arr = JSON.parse(JSON.stringify(this.list))
      for (let i = 0; i < 12 - this.list.length; i++) {
        arr.push(this.default)
      }
      return arr
    },

  },
  created () {
    document.title = 'Juru bicara sebelumnya'
    api.mounth().then(res => {
      this.list = res.data.response_data.list
      this.title = res.data.response_data.title
      this.mark = res.data.response_data.mark
    })
  },
  methods: {
    goUser (uid) {
      location.href = `uid:${uid}`
    }
  }
}
</script>
<style lang="scss">
body {
  background: RGBA(255, 126, 108, 1);
  .lastRank {
    .title {
      width: 5.21rem;
      height: 1.02rem;
      background: url(../../assets/img/rank/lastRankTitle.png);
      background-size: 100% 100%;
      margin: 0.4rem auto 0;
      text-align: center;
      line-height: 1.02rem;
      font-size: 0.36rem;
      font-weight: bold;
      color: #fff9eb;
    }
    .top1 {
      width: 7.25rem;
      height: 4.48rem;
      background: url(../../assets/img/rank/fire.png);
      background-size: 100% 100%;
      margin: 0 auto;
      padding-top: 0.4rem;
      img {
        display: block;
        width: 3.35rem;
        height: 3.35rem;
        border-radius: 0.12rem;
        margin: 0 auto;
      }
      strong {
        display: block;
        width: 2rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        font-size: 0.28rem;
        margin: 0.2rem auto;
      }
    }
    ul {
      padding: 0 0.35rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        position: relative;
        margin-bottom: 0.3rem;
        i {
          display: block;
          // width: 0.6rem;
          padding: 0 0.15rem;
          height: 0.32rem;
          background: linear-gradient(0deg, #fdf0d3, #ffdabd);
          position: absolute;
          text-align: center;
          line-height: 0.32rem;
          font-size: 0.22rem;
          color: rgba(133, 88, 14, 1);
          border-radius: 0.12rem 0 0.12rem 0;
        }
        img {
          width: 2rem;
          height: 2rem;
          border-radius: 0.12rem;
        }
        strong {
          display: block;
          width: 2rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          font-size: 0.28rem;
        }
      }
    }
    h5 {
      font-size: 0.28rem;
      color: rgba(253, 245, 210, 1);
      padding: 0 0.4rem;
      margin: 0.15rem auto;
    }
    p {
      font-size: 0.28rem;

      padding: 0 0.4rem;
    }
  }
}
@import '../../assets/scss/common.scss';
</style>
