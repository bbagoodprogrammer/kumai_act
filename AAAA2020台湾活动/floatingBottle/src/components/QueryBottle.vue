<template>
  <div class="querySong">
    <i class="closeQuery" @click="closeQueryPup()"></i>
    <p class="queryTips">系統會智能分配收聽歌曲的人數、市場，匹配最可能對該作品感興趣的聽眾進行投放，優質作品將得到更多的投放次數~</p>
    <div class="song">
      <img v-lazy="querySong.avatar" alt="">
      <div class="songMsg">
        <div class="name">{{querySong.name}}</div>
        <div class="songScore">
          <span>收聽：{{querySong.listen}}</span>
          <span>評論：{{querySong.comms}}</span>
          <span>贊：{{querySong.like}}</span>
        </div>
      </div>
    </div>
    <div class="query">
      <div class="firstCom" v-if="first">
        <p>每位用戶每天首次投瓶免費，是否確認對此作品投瓶？</p>
        <button @click="qurey()">確認投瓶</button>
      </div>
      <div class="defaultCom" v-else>
        <div class="title">定制投瓶</div>
        <div class="pNum">
          <span>投放人數</span>
          <div class="numSelect" @click="showSelect()">
            <input type="text" v-model="pNum" readonly>
            <ul class="options" :class="{showHeight:showOption}">
              <li v-for="(item,index) in optionArr " :key="index" @click="selectChange(item)">{{item}}</li>
            </ul>
          </div>
        </div>
        <div class="dPrice">
          <span>投放價格</span>
          <div class="price">{{price}}</div>
        </div>
        <button @click="qurey()">確認投瓶</button>
      </div>
    </div>
    <div class="mask" v-show="showQuery">
      <transition name="slide">
        <div class="queryPup" v-show="showQuery">
          <i class="close" @click="closeComitPup()"></i>
          <p>{{queryType==1?`您將使用${price}投瓶此作品？`:`對不起，你的金幣餘額不足夠投瓶，請前去儲值~`}} </p>
          <div class="btnBox" v-if="queryType == 1">
            <span @click="cancel()">取消</span>
            <span @click="commitSong()">確定</span>
          </div>
          <div class="stored" @click="stored()" v-else>
            前去儲值
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import api from "../api/apiConfig"
import { mapState } from "vuex"
export default {
  props: ["querySong"],
  data() {
    return {
      pNum: 30,
      showOption: false,
      showQuery: false,
      optionArr: [30, 200, 500],
      queryType: 1
    }
  },
  computed: {
    ...mapState(['userMsg', 'first']),
    price() {
      if (this.pNum == 200) {
        return 55
      } else if (this.pNum == 500) {
        return 135
      } else {
        return 9
      }
    },
    type() {
      if (this.first) {
        return 1
      } else if (this.pNum == 200) {
        return 3
      } else if (this.pNum == 500) {
        return 4
      } else {
        return 2
      }
    }
  },
  methods: {
    showSelect() {
      this.showOption = !this.showOption
    },
    selectChange(val) {
      this.pNum = val
    },
    qurey() {
      if (this.first) {
        this.commitSong()
      } else if (this.userMsg.wallet >= this.price) {
        this.showQuery = true
      } else {
        this.showQuery = true
        this.queryType = 2
      }
    },
    cancel() {
      this.showQuery = false
    },
    stored() {
      location.href = "walletConfig://"
    },
    commitSong() {
      let workId = this.querySong.sid
      api.throwBottle(this.type, workId).then(res => {
        if (res.data.response_status.code == 0) {
          this.toast(`已投遞成功`)
          this.$parent.$parent.showDsongPup = false //關閉彈窗
          this.vxc('reduexCoins', this.price)
          this.vxc('setFirst', false)
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    closeComitPup() {
      this.showQuery = false
    },
    closeQueryPup() {
      this.$parent.showQueryBottle = false
    }
  }
}
</script>
<style lang="scss">
.querySong {
  width: 6rem;
  height: 7rem;
  background: #fff;
  position: relative;
  .closeQuery {
    width: 0.6rem;
    height: 0.6rem;
    background: red;
    position: absolute;
    right: 0.3rem;
    top: 0.3rem;
  }
  .queryTips {
    text-align: center;
  }
  .song {
    display: flex;
    align-items: center;
    border: 0.015rem solid #ccc;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    .status {
      display: block;
      width: 0.2rem;
      height: 0.2rem;
      background: orange;
      margin: 0.3rem 0 0 0.3rem;
    }
  }
  .defaultCom {
    .title {
      height: 0.5rem;
      background: blue;
      text-align: center;
    }
    .pNum {
      display: flex;
      .numSelect {
        width: 1.3rem;
        position: relative;
        input {
          width: 100%;
          text-align: center;
          outline: none;
          border: none;
          background: none;
        }
        .options {
          transition: all 0.1s ease-in;
          height: 0;
          overflow: hidden;
          position: absolute;
          top: 0.4rem;
          left: 0.3rem;
          li {
            text-align: center;
          }
          &.showHeight {
            height: 1.2rem;
          }
        }
      }
    }
  }
  .queryPup {
    background: #fff;
    position: relative;
    .close {
      width: 0.6rem;
      height: 0.6rem;
      background: red;
      position: absolute;
      right: 0.3rem;
      top: 0.3rem;
    }
  }
}
</style>
