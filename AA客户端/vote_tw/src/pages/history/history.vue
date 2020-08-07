<template>
  <div class="historyCon">
    <div class="header"></div>
    <div class="con">
      <div class="hItem" v-for="(item,index) in hData" :key="index">
        <div class="desc" @click="showList(index)">
          <h3>{{item.descriptions}}</h3>
          <div class="time">{{item.created_date}}</div>
          <span class="status" :class="{ing:item.status==1}">{{item.status==1?'進行中':'已結束'}}</span>
          <i class="arrow" :class="{last:item.open}"></i>
        </div>
        <ul :class="'desc'+index">
          <li v-for="(item2,index2) in item.options" :key="index2">
            <div class="txt" v-if="item.option_type == 1">{{item2.txt}}</div>
            <div class="user" v-else>
              <img v-lazy="item2.avatar" alt="">
              <span class="nick">{{item2.nick}}</span>
            </div>
          </li>
        </ul>
      </div>
      <p class="lastTips">仅显示最近3天发起的投票</p>
    </div>
    <Loading />
  </div>
</template>
<script>
import api from "../../api/apiConfig"
import Loading from "../../components/Loading"
export default {
  components: { Loading },
  data() {
    return {
      hData: [],
      ismore: true,
      loaded: false
    }
  },
  created() {
    api.getVoteHistory(0).then(res => {
      if (res.data.response_data) {
        this.hData = [
          {
            "id": "4",
            "rid": "15",
            "status": "1",
            "descriptions": "test111",
            "option_type": "2",
            "options": [
              {
                "avatar": "http://img.17sing.tw/uc/img/head_2233806_1515642245.png",
                "nick": "10name",
                "uid": 10
              },
              {
                "avatar": "http://img.17sing.tw/uc/img/head_2233806_1515642245.png",
                "nick": "15name",
                "uid": 15
              }
            ],
            "results": [
              1,
              0
            ],
            "created_date": "2020-08-04 09:55"
          },
          {
            "id": "3",
            "rid": "15",
            "status": "2",
            "descriptions": "test111",
            "option_type": "1",
            "options": [
              {
                "txt": "a"
              },
              {
                "txt": "b"
              }
            ],
            "results": [
              0,
              2
            ],
            "created_date": "2020-08-03 19:03"
          },
          {
            "id": "2",
            "rid": "15",
            "status": "2",
            "descriptions": "test111",
            "option_type": "1",
            "options": [
              {
                "txt": "a"
              },
              {
                "txt": "b"
              }
            ],
            "results": [
              0,
              0
            ],
            "created_date": "2020-08-03 18:55"
          },
          {
            "id": "1",
            "rid": "15",
            "status": "2",
            "descriptions": "test111",
            "option_type": "1",
            "options": [
              {
                "txt": "a"
              },
              {
                "txt": "b"
              }
            ],
            "results": [
              0,
              0
            ],
            "created_date": "2020-08-03 18:49"
          }
        ]
      } else {
        this.toast(res.data.response_status.error)
      }
    })
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    showList(index) {
      if (!this.hData[index].open) {
        document.getElementsByClassName('desc' + index)[0].style.height = .9 * this.hData[index].options.length + 'rem'
        this.$set(this.hData[index], 'open', true)
      } else {
        document.getElementsByClassName('desc' + index)[0].style.height = '0rem'
        this.$set(this.hData[index], 'open', false)
      }
    },
    onScroll() { //滾動加載
      const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
      if (scrollToBottom && this.ismore && !this.loaded) { //加載更多合併數組存入vuex
        this.ismore = false
        api.getVoteHistory(this.hData.length, 'more').then(res => {
          this.ismore = true
          let list = res.data.response_data
          if (!list.length) {
            this.loaded = true
          } else {
            this.hData = this.hData.concat(list)
          }
        })
      }
    },
  }
}
</script>
<style lang="scss">
body {
  background: RGBA(250, 250, 250, 1);
}
.header {
  height: 0.8rem;
}
.con {
  padding: 0.2rem 0.3rem;
  .hItem {
    margin-bottom: 0.3rem;
    border-radius: 0.1rem;
    border: 0.01rem solid rgba(230, 230, 230, 1);
    overflow: hidden;
    .desc {
      min-height: 0.9rem;
      padding: 0.24rem 0.3rem;
      background: rgba(255, 255, 255, 1);
      opacity: 1;
      box-sizing: border-box;
      position: relative;
      h3 {
        color: rgba(55, 55, 55, 1);
        padding-right: 1.3rem;
        line-height: 0.4rem;
      }
      .time {
        margin-top: 0.2rem;
        font-size: 0.28rem;
        color: rgba(178, 178, 178, 1);
      }
      .status {
        display: block;
        width: 1.45rem;
        height: 0.48rem;
        font-size: 0.28rem;
        text-align: center;
        line-height: 0.48rem;
        background: rgba(224, 224, 224, 1);
        border-radius: 0 0.1rem 0 0.28rem;
        position: absolute;
        right: 0;
        top: 0;
        &.ing {
          background: rgba(124, 164, 255, 1);
        }
      }
      .arrow {
        display: block;
        width: 0.2rem;
        height: 0.12rem;
        background: url(../../assets/img/arrow.png);
        background-size: 100% 100%;
        position: absolute;
        right: 0.16rem;
        bottom: 0.16rem;
        transition: all 0.1s linear;
        &.last {
          transform: rotate(180deg);
        }
      }
    }
    ul {
      background: #fff;
      height: 0;
      transition: height 0.1s ease-out;
      li {
        height: 0.9rem;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        border-top: 0.01rem solid rgba(230, 230, 230, 1);
        .txt {
          color: rgba(55, 55, 55, 1);
          padding: 0 0.3rem;
        }
        .user {
          display: flex;
          align-items: center;
          img {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            margin-left: 0.3rem;
          }
          .nick {
            margin-left: 0.11rem;
            color: rgba(55, 55, 55, 1);
            max-width: 6.7rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
      li:last-child {
        border-bottom: none;
        border-radius: 0 0 0.1rem 0.1rem;
      }
    }
  }
  .lastTips {
    color: rgba(216, 216, 216, 1);
    font-size: 0.28rem;
    text-align: center;
  }
}
</style>
