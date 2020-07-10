<template>
  <div class="history">
    <div class="tabs">
      <span :class="{act:showType==1}" @click="tabClick(1)">投瓶記錄</span>
      <span :class="{act:showType==2}" @click="tabClick(2)">撈瓶記錄</span>
    </div>
    <ul v-if="showType==1">
      <li v-for="(item,index) in list.list" :key="index" @click="goSid(item.sid)">
        <img v-lazy="item.avatar" alt="">
        <div class="userMsg">
          <div class="user">
            <strong class="nick">{{item.name}}</strong>
            <i class="ding" v-if="item.pay"></i>
            <em v-if="item.ban">(取消參賽資格)</em>
          </div>
          <div class="dStatus">
            <strong>當前狀態:<em>{{item.step==1?'投放中':'投放結束'}}</em></strong>
            <strong>投放時間:<em>{{item.time}}</em></strong>
          </div>
          <div class="dScore">
            <strong>收聽人數:<em>{{item.hear}}</em></strong>
            <strong>關注人數:<em>{{item.attension}}</em></strong>
            <strong v-if="item.like">人氣值:<em>{{item.like}}</em></strong>
          </div>
        </div>
      </li>
    </ul>
    <ul v-else>
      <li v-for="(item,index) in list.list" :key="index" @click="goSid(item.sid)">
        <img v-lazy="item.avatar" alt="">
        <div class="guserMsg">
          <div class="nick">{{item.name}}</div>
          <div class="suid">{{item.suid}}</div>
        </div>
        <div class="time">{{item.time}} 撈取</div>
      </li>
    </ul>
    <p class="hLoading" v-if="list.loading">加載中...</p>
    <p class="hLoading" v-if="list.list.length == 0 && !list.loading">暫無數據</p>
    <Loading />
  </div>
</template>
<script>
import Loading from "../../components/Loading"
import api from "../../api/apiConfig"
export default {
  components: { Loading },
  data() {
    return {
      showType: 1,
      dList: {
        loadCount: 0,
        loading: false,
        loaded: false,
        list: []
      },
      gList: {
        loadCount: 0,
        loading: false,
        loaded: false,
        list: []
      }
    }
  },
  computed: {
    list() {
      return this.showType == 1 ? this.dList : this.gList
    }
  },
  created() {
    document.title = '我的記錄'
    this.dList.loading = true
    api.getMyBottleHistory(0).then(res => {
      this.dList.loading = false
      this.dList.loadCount++
      this.dList.list = res.data.response_data.list
    })
  },
  mounted() {
    // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    tabClick(val) {
      this.showType = val
      if (val == 2 && this.gList.loadCount == 0) {
        this.gList.loading = true
        this.gList.loadCount++
        api.getMyGetBottle(0).then(res => {
          this.gList.loading = false
          this.gList.list = res.data.response_data.list
        })
      }
    },
    onScroll() {
      const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
      // const notFull = document.body.scrollHeight < window.innerHeigh;
      if (scrollToBottom && !this.list.loaded && !this.list.loading) {
        let nApi = this.showType == 1 ? api.getMyBottleHistory : api.getMyGetBottle
        if (this.showType == 1) {
          this.dList.loading = true
        } else {
          this.gList.loading = true
        }
        nApi(this.list.list.length).then(res => {
          let newList = res.data.response_data.list
          if (this.showType == 1) {
            this.dList.loading = false
            this.dList.list = this.dList.list.concat(newList)
            this.dList.loadCount++
            if (newList.length < 20) {
              this.dList.loaded = true
            }
          } else {
            this.gList.loading = false
            this.gList.list = this.gList.list.concat(newList)
            this.gList.loadCount++
            if (newList.length < 20) {
              this.gList.loaded = true
            }
          }
        })
      }
    },
    goSid(sid) {
      location.href = 'songid:{"songlist":[' + sid + ' ],"index":0}';
    }
  }
}
</script>
<style lang="scss">
body {
  background: rgba(16, 128, 208, 1);
}
.hLoading {
  text-align: center;
  margin-top: 0.5rem;
}
.history {
  padding: 0.25rem;
  .tabs {
    width: 6.88rem;
    height: 0.98rem;
    display: flex;
    align-items: center;
    padding: 0 0.05rem;
    background: url(../../assets/img/ruleTabs.png);
    background-size: 100% 100%;
    span {
      width: 3.66rem;
      height: 0.9rem;
      text-align: center;
      line-height: 0.9rem;
      color: rgba(255, 220, 42, 1);
      font-weight: 700;
      font-size: 0.32rem;
      &.act {
        color: rgba(174, 72, 0, 1);
        background: url(../../assets/img/ruleAct.png);
        background-size: 100% 100%;
      }
    }
  }
  ul {
    margin-top: 0.36rem;
    li {
      display: flex;
      align-items: center;
      margin-bottom: 0.29rem;
      img {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        border: 0.03rem solid RGBA(211, 112, 104, 1);
        margin-left: 0.22rem;
      }
      .userMsg {
        margin-left: 0.11rem;
        .user {
          display: flex;
          align-items: center;
          .nick {
            font-size: 0.28rem;
            font-weight: 600;
          }
          .ding {
            width: 0.96rem;
            height: 0.3rem;
            background: url(../../assets/img/pay.png);
            background-size: 100% 100%;
            margin: 0 0.15rem 0 0.19rem;
          }
          em {
            font-size: 0.22rem;
            color: rgba(255, 127, 49, 1);
            font-weight: 600;
          }
        }
        .dStatus,
        .dScore {
          strong {
            color: rgba(196, 181, 255, 1);
            font-size: 0.22rem;
            font-weight: 600;
            em {
              color: rgba(255, 181, 181, 1);
              font-size: 0.22rem;
              font-weight: 600;
              margin-left: 0.1rem;
            }
          }
        }
      }
      .guserMsg {
        width: 3.2rem;
        margin-left: 0.11rem;
        .nick {
          font-size: 0.28rem;
          min-width: 3.2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .uid {
          font-size: 0.22rem;
          color: rgba(255, 184, 100, 1);
          font-weight: 600;
        }
      }
      .time {
        font-size: 0.24rem;
        font-weight: 600;
        color: rgba(255, 181, 181, 1);
      }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
