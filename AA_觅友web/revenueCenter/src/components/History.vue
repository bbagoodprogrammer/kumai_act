<template>
  <div class="history">
    <div class="app_top" :style="{height:navigatorHeight}"></div>
    <p v-if="!list.length" class="noData">{{lang.noData}}</p>
    <div class="dayHistory" v-for="(item,index) in makeData" :key="index">
      <div class="time">{{item.key}}</div>
      <ul>
        <li v-for="(item2,index2) in item.list" :key="index2">
          <div class="msg">
            <div class="tips" v-html="getName(item2)" @click="addComment($event,item2)"></div>
            <div class="seconed">{{getSeconed(item2.create_time)}}</div>
          </div>
          <div class="score">
            <span :class="{add:item2.type == 0}">{{item2.type==0?'+':'-'}} {{item2.jewel}}</span>
            <i :class="{blue:type == 2}"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

var getKey = function (arr, time) {
  for (let index = 0; index < arr.length; index++) {
    if (arr[index].key == time) {
      return index;
    }
  }
  return -1;
};

import { getHistory } from "../apis"
import getDate from "../utils/getDate"
import { getLangHtml, getTimeObj, getUrlString, getAppVer, getPlatform, getDeviceId } from "../utils";
import { setFullScreen, setStatusBarStyle, getStatusBarHeight, callAppNew } from '../utils/navigation';
import { errorMonitor } from 'events';

export default {
  data () {
    return {
      navigatorHeight: 0,
      list: [
        // {
        //   "id": 6,       // 流水id
        //   "jewel": 3000, // 钻石数
        //   "gid": 53, // 礼物id，活动兑换的商品id
        //   "from": 4, // 表示不同来源
        //   "type": 1, // 0-增加钻石，1-减少钻石
        //   "gift_num": 1,         // 礼物个数
        //   "radio_time": 0,       // 表示语音通话时长
        //   "sender": 10012714,    // 操作者
        //   "reciver": 10013299,   // 接收者
        //   "create_time": 1617939623,
        //   "remark": "sendSongGift", // 备注
        //   "name": "飛天杖"  // 礼物名称，兑换奖励
        // },
        // {
        //   "id": 6,       // 流水id
        //   "jewel": 3000, // 钻石数
        //   "gid": 53, // 礼物id，活动兑换的商品id
        //   "from": 4, // 表示不同来源
        //   "type": 0, // 0-增加钻石，1-减少钻石
        //   "gift_num": 1,         // 礼物个数
        //   "radio_time": 0,       // 表示语音通话时长
        //   "sender": 10012714,    // 操作者
        //   "reciver": 10013299,   // 接收者
        //   "create_time": 1617939623,
        //   "remark": "sendSongGift", // 备注
        //   "name": "飛天杖"  // 礼物名称，兑换奖励
        // },
        // {
        //   "id": 6,       // 流水id
        //   "jewel": 3000, // 钻石数
        //   "gid": 53, // 礼物id，活动兑换的商品id
        //   "from": 4, // 表示不同来源
        //   "type": 0, // 0-增加钻石，1-减少钻石
        //   "gift_num": 1,         // 礼物个数
        //   "radio_time": 0,       // 表示语音通话时长
        //   "sender": 10012714,    // 操作者
        //   "reciver": 10013299,   // 接收者
        //   "create_time": 1617939623,
        //   "remark": "sendSongGift", // 备注
        //   "name": "飛天杖"  // 礼物名称，兑换奖励
        // },
        // {
        //   "id": 6,       // 流水id
        //   "jewel": 3000, // 钻石数
        //   "gid": 53, // 礼物id，活动兑换的商品id
        //   "from": 0, // 表示不同来源
        //   "type": 0, // 0-增加钻石，1-减少钻石
        //   "gift_num": 1,         // 礼物个数
        //   "radio_time": 0,       // 表示语音通话时长
        //   "sender": 10012714,    // 操作者
        //   "reciver": 10013299,   // 接收者
        //   "create_time": 1617639623,
        //   "remark": "sendSongGift", // 备注
        //   "name": "飛天杖"  // 礼物名称，兑换奖励
        // },
      ],
      //   strTips: { // 0  -收礼  1  -语聊-匹配   2-提现现金 3-兑换金币 4-语聊-拨打 5-内部赠送 6-搭讪 7-聊天 8-每日任务 9-活动 （预埋给活动用） 10-商城兑换
      //     0: '收到<em class="uid">@</em>贈送的禮物$',
      //     1: '與<em class="uid">@</em>語音配對%分鐘',
      //     2: '提現結算',
      //     3: '兌換%金幣',
      //     4: '與<em class="uid">@</em>通話%分鐘',
      //     5: '系統發放',
      //     6: '回復<em class="uid">@</em>的搭訕',
      //     7: '回復<em class="uid">@</em>的私聊',
      //     8: '完成$任務',
      //     9: '活動發放',
      //     10: '兌換$',
      //     11: '新人獎勵'
      //   },
      type: 1,
      year: 0,
      from: 0,
      more: true,
      loaded: false
    }
  },
  computed: {
    makeData () {
      var arr = [];
      for (let i = 0; i < this.list.length; i++) {
        var times = this.list[i].create_time;
        var day = getDate(new Date(times * 1000), 3)
        var index = getKey(arr, day);
        if (index == -1) {
          arr.push({ key: day, list: [this.list[i]] })
        } else {
          arr[index].list.push(this.list[i]);
        }
      }
      console.log(arr)
      return arr;
    },
    strTips () {
      return this.lang.strTips
    }
  },
  created () {
    const type = getUrlString('type')
    document.title = type == 1 ? this.lang.history_title1 : this.lang.history_title2
    this.type = type
    this.init(type)
  },
  mounted () {
    setTimeout(() => {
      //   this.onScroll();
      window.addEventListener('scroll', this.onScroll);
      const pt = getPlatform();
      const ver = getAppVer();
      if ((pt == 'ios' && ver >= 165) || pt == 'android') {
        setFullScreen(false);
      }
    }, 0)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    init (type) {
      getHistory(type == 1 ? 1 : 0, this.year, this.from).then(res => {
        if (res.data.response_data) {
          this.list = res.data.response_data.list
          this.from = this.list.length
          this.year = this.list[0] ? new Date(this.list[0].create_time * 1000).getFullYear() : ''
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    getName (item) {
      return this.strTips[item.from].replace('@', item.sender).replace('%', Math.floor(item.radio_time / 60)).replace('$', item.name).replace('&', item.coins)
    },
    addComment (event, item) {
      if (event.target.className === 'uid') {
        var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
        if (isiOS) {
          sendJsData('app://userInfo?uid=' + item.sender);
        } else {
          javascript: JSInterface.sendJsData('app://userInfo?uid=' + item.sender);
        }
      }
    },
    onScroll () {
      const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 20;
      if (scrollToBottom && !this.loaded && this.more) {
        this.more = false
        getHistory(this.type == 1 ? 1 : 0, this.year, this.from, 'more').then(res => {
          this.more = true
          let list = res.data.response_data.list
          if (list.length) {
            this.from += list.length
            this.list = this.list.concat(list)
          } else {
            if (this.year > 2020) {
              this.year -= 1
              this.onScroll()
              return
            }
            this.loaded = true
          }
        })
      }
    },
    getSeconed (tm) {
      return getDate(new Date(tm * 1000), 4)
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  background: RGBA(245, 245, 249, 1);
  .app_top {
    width: 100%;
    position: fixed;
    z-index: 5;
    &.app_top_fit {
      position: fixed;
      background-color: #10093C;
    }
  }
  .noData {
    text-align: center;
    margin-top: 0.4rem;
    color: rgba(44, 43, 54, 1);
  }
  .history {
    padding: 0 0.3rem 0.3rem;
    .dayHistory {
      .time {
        height: 1.05rem;
        text-indent: 0.1rem;
        font-weight: 600;
        color: rgba(92, 91, 103, 1);
        line-height: 1.2rem;
      }
      ul {
        background: #fff;
        border-radius: 0.2rem;
        padding: 0.2rem 0;
        li {
          padding: 0.22rem 0.3rem;
          min-height: 0.8rem;
          //   padding: 0.22rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .msg {
            width: 4.44rem;
            .tips {
              font-size: 0.32rem;
              color: rgba(44, 43, 54, 1);
              >>> .uid {
                color: RGBA(122, 104, 248, 1);
                margin: 0 0.1rem;
              }
            }
            .seconed {
              font-size: 0.24rem;
              margin-top: 0.05rem;
              color: rgba(188, 187, 199, 1);
            }
          }
          .score {
            display: flex;
            align-items: center;
            span {
              font-size: 0.28rem;
              color: rgba(255, 161, 67, 1);
              font-weight: 600;
              white-space: nowrap;
              &.add {
                color: rgba(122, 104, 248, 1);
              }
            }
            i {
              width: 0.36rem;
              height: 0.36rem;
              background: url(../img/masonry.png);
              background-size: 100% 100%;
              margin-left: 0.16rem;
              &.blue {
                background: url(../img/masonry2.png);
                background-size: 100% 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>