<template>
  <div class="giftGruop">
    <div class="select" @click="showSelect = true">
      <div class="giftName"> {{selectIndex == -1?gift[0].name:gift[selectIndex].name}}
        {{lang.list2_groundNums.replace('$',selectIndex == -1?gift[0].start:gift[selectIndex].start)}}</div>
      <div class="icon"></div>
    </div>
    <p class="noData" v-if="giftList.length == 0">{{lang.list2_noData}}</p>
    <ul class='scrollable'>
      <li v-for="(item,index) in giftList" :key="index" :class="{over: item.num - item.group_num <=1 || step != 1}">
        <div class="imgBox">
          <img :src="item.ginfo.img" alt="">
        </div>
        <div class="msg">
          <div class="giftName">{{item.ginfo.name}} <i>{{item.ginfo.kind*1?lang.people_Kroom:lang.people_song}}</i></div>
          <div class="pNums" v-html="lang.people_groupMsg.replace('$',item.num).replace('%',item.surplus)"></div>
          <div class="price">
            <span><em>{{item.price}}</em></span> <i class="icon"></i><del>{{item.max_price}}{{lang.list1_icon}}</del>
          </div>
        </div>
        <div class="buy" @click="showGetGiftPup(item)">
          {{lang.list2_go}}
        </div>
      </li>
    </ul>
    <!-- 選擇列表 -->
    <div class="mask" v-show="showSelect">
      <transition name="slide">
        <div class="selectGiftList" v-if="showSelect">
          <i class="close" @click="showSelect = false"></i>
          <div class="selectItem">
            {{selectIndex == -1?gift[0].name:gift[selectIndex].name}} <em> {{lang.list2_groundNums.replace('$',selectIndex == -1?gift[0].start:gift[selectIndex].start)}}</em>
          </div>
          <ul>
            <li v-for="(item,index) in gift" :key="index" :class="{act:selectIndex == index}" @click=" setGindex(index)">
              {{item.name}}
            </li>
          </ul>
          <div class="ok" @click=" search()">
            {{lang.ok}}
          </div>
        </div>
      </transition>
    </div>
    <!-- 拼團 -->
    <div class="mask" v-show="showGetGift">
      <transition name="slide">
        <div class="getGift" v-if="showGetGift">
          <i class="close" @click=" closePup()"></i>
          <div class="giftItemMsg">
            <div class="imgBox">
              <img :src="act_item.ginfo.img" alt="">
            </div>
            <div class="msg">
              <div class="giftName">{{act_item.ginfo.name}} <i>{{act_item.ginfo.kind*1?lang.people_Kroom:lang.people_song}}</i></div>
              <div class="price">
                <span><em>{{act_item.price}}</em></span> <i class="icon"></i><del>{{act_item.max_price}}{{lang.list1_icon}}</del>
              </div>
              <div class="giftPupTips">{{lang.list2_buyFail}}</div>
            </div>
          </div>
          <!-- 確認拼團彈窗 -->
          <div class="selectType1" v-if="selectType==1">
            <div class="selectSet">
              <span>{{lang.list1_buyNums}}</span>
              <div class="nums">1</div>
            </div>
            <div class="selectSet">
              <span>{{lang.list1_pay}}</span>
              <div class="nums">{{act_item.price}}{{lang.list1_icon}}</div>
            </div>
            <div class="peopleList">
              <div class="peopleTips" v-html="lang.list2_reNums.replace('#',act_item.surplus)"></div>
              <div class="pList">
                <img v-lazy="item.avatar" v-for="(item,index) in act_item.users" alt="" :key="index">
                <img src="../img/pDefault.png" v-for="(item,index2) in act_item.surplus*1" alt="" :key="index2+'x'">
              </div>
            </div>
            <div class="go" @click="selectType = 2">{{lang.list2_addGroup}}</div>
          </div>
          <!-- 確認支付彈窗 -->
          <div class="selectType2" v-else-if="selectType == 2">
            <div class="buyTips">
              {{lang.list2_addFailTips1.replace('$',act_item.price)}}
            </div>
            <div class="btn">
              <span class="no" @click="closePup()">{{lang.list1_no}}</span>
              <span class="qurey" @click="buy()">{{lang.list1_query}}</span>
            </div>
          </div>
          <!-- 拼團成功，已發禮物 -->
          <div class="selectType2" v-else-if="selectType == 3">
            <div class="buyTips">{{lang.list2_addFailTips2}}</div>
            <div class="go" @click="showGetGift = false">{{lang.list2_nextGroup}}</div>
          </div>
          <!-- 拼團成功，未發禮物 -->
          <div class="selectType2" v-else-if="selectType == 4">
            <div class="buyTips" v-html="lang.list1_buyTips.replace('#',buyGiftData.surplus).replace('$',buyGiftData.price).replace('%',act_item.ginfo.name)"></div>
            <div class="go" @click="showFriendsPup()">{{lang.group_inivte}}</div>
          </div>
          <!-- 拼團失敗 -->
          <div class="selectType2" v-else-if="selectType == 5">
            <div class="buyTips">{{errTips}}</div>
            <div class="go" @click="showGetGift = false">{{lang.list2_nextGroup}}</div>
          </div>
        </div>
      </transition>
    </div>
    <!-- 儲值 -->
    <div class="mask" v-show="showNoCoiosPup">
      <transition name="slide">
        <div class="giftItemPup" v-show="showNoCoiosPup">
          <i class="close" @click="showNoCoiosPup = false"></i>
          <div class="noCoins" v-html="lang.list1_notCoins"></div>
          <div class="go no" @click="stored()">{{lang.list1_goStored}}</div>
        </div>
      </transition>
    </div>
    <!-- 好友 -->
    <div class="mask" v-show="showFriends">
      <transition name="slide">
        <Friends v-if="showFriends" :order_id="order_id" />
      </transition>
    </div>
  </div>
</template>
<script>
import Friends from "./Friends"
import { search, join } from "../apis"
import { mapState } from "vuex"

export default {
  components: { Friends },
  data () {
    return {
      giftList: [],
      loaded: false,
      more: true,
      selectIndex: 0,
      showSelect: false,
      showGetGift: false,
      selectType: 1,
      showNoCoiosPup: false,
      showFriends: false,
      act_item: {},
      buyGiftData: {},
      errTips: '',
      order_id: null
    }
  },
  computed: {
    ...mapState(['gift', 'step'])
  },

  created () {
    search().then(res => {
      console.log(res)
      this.giftList = res.data.response_data.list
    })
  },
  mounted () {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    setGindex (index) {
      if (this.selectIndex == index) {
        this.selectIndex = -1
      } else {
        this.selectIndex = index
      }

    },
    onScroll () {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          getList(this.hList.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.$emit('addhList', res.data.response_data.list)
            }
          })
        }
      }
    },
    showGetGiftPup (val) {
      if (this.step != 1) { return }
      console.log(val)
      this.act_item = val
      this.showGetGift = true
    },
    closePup () {
      this.showGetGift = false
      this.selectType = 1
    },
    buy () {
      join(this.act_item.id).then(res => {
        if (res.data.response_status.code == 0) {
          this.buyGiftData = res.data.response_data.data
          let nums = this.buyGiftData.surplus * 1
          if (nums == 0) {
            this.selectType = 3
          } else {
            this.selectType = 4
          }

        } else {
          if (res.data.response_status.code == 10006) {
            this.showNoCoiosPup = true
            return
          }
          // this.toast(res.data.response_status.error)
          this.selectType = 5
          this.errTips = res.data.response_status.error
        }
      })
    },
    search () {
      let gid = this.gift[this.selectIndex] ? this.gift[this.selectIndex].gid : false
      search(gid).then(res => {
        this.showSelect = false
        this.giftList = res.data.response_data.list
      })
    },
    refresh () {
      this.search()
    },

    stored () {
      location.href = "walletConfig://"
    },
    showFriendsPup () {
      this.order_id = this.buyGiftData.id
      this.showFriends = true
    },
  }

}
</script>
<style lang='scss'
 scoped>
.noData {
  text-align: center;
  margin: 0.3rem auto;
}
.giftGruop {
  width: 7.02rem;
  max-height: 12rem;
  margin: 0.32rem auto 0.6rem;
  background: #ffffff;
  border-radius: 0.12rem;
  padding: 0.32rem 0;
  .select {
    width: 6rem;
    height: 0.6rem;
    background: #fff6ee;
    border-radius: 0.3rem;
    margin: 0 auto;
    padding: 0 0.28rem;
    line-height: 0.6rem;
    color: rgba(133, 90, 55, 1);
    font-size: 0.26rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.26rem;
      height: 0.26rem;
      background: url(../img/selectIcon.png);
      background-size: 100% 100%;
    }
  }
  .scrollable {
    max-height: 11.55rem;
    margin-top: 0.15rem;
    overflow-x: hidden;
    overflow-y: scroll;
    li {
      height: 1.6rem;
      display: flex;
      align-items: center;
      color: rgba(133, 90, 55, 1);
      position: relative;
      .msg {
        width: 3.8rem;
        .giftName {
          display: flex;
          align-items: center;
          // justify-content: center;
          font-size: 0.32rem;
          color: rgba(133, 90, 55, 1);
          i {
            padding: 0 0.08rem;
            height: 0.3rem;
            line-height: 0.3rem;
            border: 1px solid #ff7959;
            border-radius: 0.06rem;
            font-size: 0.22rem;
            color: rgba(255, 121, 89, 1);
            margin-left: 0.05rem;
            display: block;
            white-space: nowrap;
          }
        }
        .pNums {
          font-size: 0.26rem;
        }
        .price {
          font-size: 0.18rem;
          display: flex;
          align-items: center;
          // justify-content: center;
          span {
            color: rgba(255, 121, 89, 1);
            em {
              color: rgba(255, 121, 89, 1);
              font-size: 0.26rem;
              font-weight: 600;
              margin-left: 0.05rem;
            }
          }
          i {
            width: 0.28rem;
            height: 0.28rem;
            background: url(../img/coins.png);
            background-size: 100% 100%;
            margin: 0 0.06rem;
          }
          del {
            font-size: 0.18rem;
          }
        }
      }
      .imgBox {
        width: 1.2rem;
        height: 1.2rem;
        background: rgba(255, 245, 237, 0.92);
        border-radius: 0.06rem;
        margin: 0 0.14rem 0 0.2rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .buy {
        width: 1.36rem;
        height: 0.48rem;
        background: linear-gradient(-90deg, #ff885a, #ff6957);
        border-radius: 0.24rem;
        text-align: center;
        line-height: 0.48rem;
        color: #fff;
        font-size: 0.24rem;
      }
      &.over {
        .itemNums,
        .buy {
          background: rgba(188, 188, 188, 1);
        }
      }
    }
    li::before {
      content: '';
      display: block;
      width: 5.1rem;
      height: 0.015rem;
      position: absolute;
      bottom: 0;
      right: 0.3rem;
      background: RGBA(255, 229, 226, 1);
    }
  }
  .selectGiftList {
    width: 6.66rem;
    height: 5.8rem;
    background: #ffffff;
    border-radius: 0.12rem;
    position: relative;
    .close {
      display: block;
      width: 0.27rem;
      height: 0.27rem;
      background: url(../img/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.32rem;
      right: 0.26rem;
    }
    .selectItem {
      height: 0.8rem;
      line-height: 0.8rem;
      padding: 0 0.34rem;
      color: #855a37;
      em {
        font-size: 0.26rem;
      }
    }
    ul {
      padding: 0 0.3rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 0.3rem;
      li {
        width: 1.8rem;
        height: 0.56rem;
        background: linear-gradient(
          -90deg,
          rgba(255, 136, 90, 0.1),
          rgba(255, 105, 87, 0.1)
        );
        border-radius: 0.28rem;
        color: rgba(255, 121, 89, 1);
        font-size: 0.26rem;
        text-align: center;
        line-height: 0.56rem;
        margin-bottom: 0.34rem;
        &.act {
          color: #fff;
          background: linear-gradient(-90deg, #ff885a, #ff6957);
        }
      }
    }
    .ok {
      width: 100%;
      height: 0.9rem;
      line-height: 0.91rem;
      text-align: center;
      position: absolute;
      bottom: 0;
      color: rgba(133, 90, 55, 1);
      text-align: center;

      border-top: 0.015rem solid rgba(133, 90, 55, 0.2);
    }
  }
  .getGift {
    width: 6.6rem;
    // height: 7.1rem;
    padding-bottom: 0.32rem;
    background: #ffffff;
    border-radius: 0.12rem;
    position: relative;
    .giftItemMsg {
      height: 2.24rem;
      display: flex;
      align-items: center;
      .imgBox {
        width: 1.6rem;
        height: 1.6rem;
        background: rgba(255, 245, 237, 0.92);
        border-radius: 0.06rem;
        margin: 0 0.14rem 0 0.2rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .msg {
        width: 3.8rem;
        .giftName {
          display: flex;
          align-items: center;
          // justify-content: center;
          font-size: 0.32rem;
          color: rgba(133, 90, 55, 1);
          i {
            padding: 0 0.08rem;
            height: 0.3rem;
            line-height: 0.3rem;
            border: 1px solid #ff7959;
            border-radius: 0.06rem;
            font-size: 0.22rem;
            color: rgba(255, 121, 89, 1);
            margin-left: 0.05rem;
            display: block;
            white-space: nowrap;
          }
        }
        .price {
          font-size: 0.18rem;
          display: flex;
          align-items: center;
          // justify-content: center;
          span {
            color: rgba(255, 121, 89, 1);
            em {
              color: rgba(255, 121, 89, 1);
              font-size: 0.26rem;
              font-weight: 600;
              margin-left: 0.05rem;
            }
          }
          i {
            width: 0.28rem;
            height: 0.28rem;
            background: url(../img/coins.png);
            background-size: 100% 100%;
            margin: 0 0.06rem;
          }
          del {
            font-size: 0.18rem;
          }
        }
        .giftPupTips {
          font-size: 0.18rem;
          color: rgba(188, 168, 155, 1);
        }
      }
    }
    .selectSet {
      height: 0.9rem;
      padding: 0 0.32rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: rgba(133, 90, 55, 1);
      font-size: 0.26rem;
      .numsInput {
        display: flex;
        align-items: center;
        justify-content: center;
        input {
          width: 0.84rem;
          height: 0.36rem;
          line-height: 0.36rem;
          background: #fff6ee;
          border-radius: 0.06rem;
          border: none;
          text-align: center;
        }
        .reduex {
          margin-right: 0.05rem;
        }
        .add {
          margin-left: 0.05rem;
        }
      }
    }
    .peopleList {
      padding: 0 0.32rem;
      margin-top: 0.3rem;
      .peopleTips {
        font-size: 0.26rem;
        color: rgba(133, 90, 55, 1);
        em {
          font-size: 0.26rem;
          color: rgba(255, 107, 87, 1);
        }
      }
      .pList {
        margin-top: 0.2rem;
        img {
          width: 0.56rem;
          height: 0.56rem;
          margin-right: 0.12rem;
          border-radius: 50%;
        }
      }
    }
    .go {
      width: 5.2rem;
      height: 0.8rem;
      background: linear-gradient(-90deg, #ff885a, #ff6957);
      border-radius: 0.4rem;
      text-align: center;
      line-height: 0.8rem;
      color: #fff;
      font-size: 0.32rem;
      margin: 0.4rem auto 0;
      &.no {
        margin: 0 auto;
      }
    }
    .close {
      display: block;
      width: 0.27rem;
      height: 0.27rem;
      background: url(../img/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.32rem;
      right: 0.26rem;
    }
  }
}
.selectType2 {
  .buyTips {
    height: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(133, 90, 55, 1);
    font-size: 0.26rem;
    padding: 0 0.2rem;
    em {
      color: rgba(255, 121, 89, 1);
    }
    &.left {
      display: block;
      justify-content: flex-start;
      padding: 0 0.3rem;
      height: 0.8rem;
      margin-top: 0.15rem;
    }
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      width: 2.8rem;
      height: 0.8rem;
      background: linear-gradient(
        -90deg,
        rgba(255, 136, 90, 0.1),
        rgba(255, 105, 87, 0.1)
      );
      border-radius: 0.4rem;
      text-align: center;
      line-height: 0.8rem;
      color: rgba(255, 133, 90, 1);
      &.qurey {
        color: #fff;
        background: linear-gradient(-90deg, #ff885a, #ff6957);
        margin-left: 0.43rem;
      }
    }
  }
}
.giftItemPup {
  width: 6.6rem;
  // height: 6.5rem;
  padding-bottom: 0.3rem;
  background: #ffffff;
  border-radius: 0.12rem;
  position: relative;
  .close {
    display: block;
    width: 0.27rem;
    height: 0.27rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.32rem;
    right: 0.26rem;
  }
  .giftItemMsg {
    height: 2.24rem;
    display: flex;
    align-items: center;
    .imgBox {
      width: 1.6rem;
      height: 1.6rem;
      background: rgba(255, 245, 237, 0.92);
      border-radius: 0.06rem;
      margin: 0 0.14rem 0 0.2rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .msg {
      width: 3.8rem;
      .giftName {
        display: flex;
        align-items: center;
        // justify-content: center;
        font-size: 0.32rem;
        color: rgba(133, 90, 55, 1);
        i {
          padding: 0 0.08rem;
          height: 0.3rem;
          line-height: 0.3rem;
          border: 1px solid #ff7959;
          border-radius: 0.06rem;
          font-size: 0.22rem;
          color: rgba(255, 121, 89, 1);
          margin-left: 0.05rem;
          white-space: nowrap;
          display: block;
          white-space: nowrap;
        }
      }
      .price {
        font-size: 0.18rem;
        display: flex;
        align-items: center;
        // justify-content: center;
        span {
          color: rgba(255, 121, 89, 1);
          em {
            color: rgba(255, 121, 89, 1);
            font-size: 0.26rem;
            font-weight: 600;
            margin-left: 0.05rem;
          }
        }
        i {
          width: 0.28rem;
          height: 0.28rem;
          background: url(../img/coins.png);
          background-size: 100% 100%;
          margin: 0 0.06rem;
        }
        del {
          font-size: 0.18rem;
        }
      }
      .giftPupTips {
        font-size: 0.18rem;
        color: rgba(188, 168, 155, 1);
      }
    }
  }
  .selectSet {
    height: 0.9rem;
    padding: 0 0.32rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgba(133, 90, 55, 1);
    font-size: 0.26rem;
    .numsInput {
      display: flex;
      align-items: center;
      justify-content: center;
      input {
        width: 0.84rem;
        height: 0.36rem;
        line-height: 0.36rem;
        background: #fff6ee;
        border-radius: 0.06rem;
        border: none;
        text-align: center;
      }
      .reduex {
        margin-right: 0.05rem;
      }
      .add {
        margin-left: 0.05rem;
      }
    }
  }
  .go {
    width: 5.2rem;
    height: 0.8rem;
    background: linear-gradient(-90deg, #ff885a, #ff6957);
    border-radius: 0.4rem;
    text-align: center;
    line-height: 0.8rem;
    color: #fff;
    font-size: 0.32rem;
    margin: 0.4rem auto 0;
    &.no {
      margin: 0 auto;
    }
  }
  .selectType2 {
    .buyTips {
      height: 1.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(133, 90, 55, 1);
      font-size: 0.26rem;
      em {
        color: rgba(255, 121, 89, 1);
      }
      &.left {
        display: block;
        justify-content: flex-start;
        padding: 0 0.3rem;
        height: 0.8rem;
        margin-top: 0.15rem;
      }
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        width: 2.8rem;
        height: 0.8rem;
        background: linear-gradient(
          -90deg,
          rgba(255, 136, 90, 0.1),
          rgba(255, 105, 87, 0.1)
        );
        border-radius: 0.4rem;
        text-align: center;
        line-height: 0.8rem;
        color: rgba(255, 133, 90, 1);
        &.qurey {
          color: #fff;
          background: linear-gradient(-90deg, #ff885a, #ff6957);
          margin-left: 0.43rem;
        }
      }
    }
  }
  .noCoins {
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: rgba(133, 90, 55, 1);
    font-size: 0.32rem;
  }
}
</style>
