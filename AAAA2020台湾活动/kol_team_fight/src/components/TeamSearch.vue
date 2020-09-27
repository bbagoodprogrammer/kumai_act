<template>
  <div class="teamSearch">
    <div class="shareBtn">
      <input type="number" v-model="searchUid" placeholder="可輸入戰隊長UID快速搜尋並加入心儀戰隊">
      <i @click="search()"></i>
    </div>
    <div class="mask" v-show="showitemList">
      <transition name="slide">
        <div class="searchList" v-if="showitemList">
          <div class="itemMsg">
            <span class='rank'>{{itemMsg.list.rank}}</span>
            <img v-lazy="itemMsg.list.info.avatar" alt="">
            <div class="msg">
              <div class="nick">{{itemMsg.list.info.nick}}</div>
              <div class="score"> <i></i>{{itemMsg.list.score}}</div>
            </div>
            <div class="peopleList">
              <span v-for="(item2,index2) in itemMsg.list.list" :key="index2">
                <img v-lazy="item2.avatar" alt="" @click="goPeople(item2.uid)">
                <strong>{{item2.score}}</strong>
              </span>
            </div>
          </div>
          <p class="addTips"> 每人最多加入5個戰隊,是否確認加入？ ({{myRank.length}}/5)</p>
          <div class="btnBox">
            <span class="ok" @click="application(itemMsg.list.info.uid)">確定</span>
            <span class="no" @click="closePup()">取消</span>
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
  data() {
    return {
      searchUid: '',
      itemMsg: {},
      showitemList: false
    }
  },
  computed: {
    ...mapState(['myRank', 'kol', 'userMsg'])
  },
  methods: {
    application(uid) {
      if (!this.userMsg.registered) {
        this.vxc('setToast', {
          msg: "請點擊報名參與活動"
        })
      } else {
        api.application(uid).then(res => {
          if (res.data.response_status.code == 0) {
            this.showitemList = false
            this.toast(`申請成功,請等待隊長審核`)
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      }
    },
    search() {
      api.searchLeader(this.searchUid).then(res => {
        if (res.data.response_status.code == 0) {
          this.itemMsg = res.data.response_data
          this.showitemList = true
        } else {
          this.vxc('setToast', {
            msg: res.data.response_status.error
          })
        }
      })
    },
    closePup() {
      this.showitemList = false
    }
  }
}
</script>
<style lang="scss">
.teamSearch {
  .shareBtn {
    width: 5.38rem;
    height: 0.5rem;
    background: #144c85;
    border: 0.03rem solid #4d9bc0;
    border-radius: 0.23rem;
    display: flex;
    align-items: center;
    margin: 0.21rem auto 0;
    input {
      width: 4.5rem;
      margin-left: 0.22rem;
      color: rgba(77, 155, 192, 1);
      font-size: 0.22rem;
    }
    input::-webkit-input-placeholder {
      color: rgba(78, 156, 192, 1);
      font-size: 0.22rem;
    }
    i {
      width: 0.29rem;
      height: 0.29rem;
      background: url(../assets/img/cha.png);
      background-size: 100% 100%;
      margin-left: 0.05rem;
    }
  }
  .searchList {
    width: 6.25rem;
    height: 4.02rem;
    background: url(../assets/img/pupBg.png);
    background-size: 100% 100%;
    .itemMsg {
      height: 1.91rem;
      display: flex;
      align-items: center;
      margin-bottom: 0.2rem;
      border-bottom: 1px solid #6b8dce;
      .rank {
        width: 0.7rem;
        text-align: center;
        font-size: 0.4rem;
        color: rgba(243, 165, 78, 1);
      }
      > img {
        width: 1rem;
        height: 1rem;
        border: 0.02rem solid rgba(255, 255, 255, 0.6);
        border-radius: 50%;
      }
      .msg {
        width: 1.3rem;
        margin: 0 0.15rem;
        .nick {
          font-size: 0.26rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .score {
          display: flex;
          align-items: center;
          color: rgba(255, 231, 184, 1);
          font-size: 0.25rem;
          i {
            width: 0.49rem;
            height: 0.52rem;
            background: url(../assets/img/fire.png);
            background-size: 100% 100%;
          }
        }
      }
    }
    .addTips {
      text-align: center;
      padding: 0 0.3rem;
      font-size: 0.24rem;
      color: rgba(106, 194, 255, 1);
    }
  }
  .peopleList {
    width: 2.06rem;
    height: 0.91rem;
    padding: 0 0.14rem;
    margin-top: 0.15rem;
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 0.08rem;
    .pItem {
      display: flex;
      align-items: center;
    }
    span {
      width: 0.7rem;
      margin-top: 0.05rem;
      img {
        width: 0.48rem;
        height: 0.48rem;
        border-radius: 50%;
        display: block;
        margin: 0 auto;
      }
      strong {
        display: block;
        text-align: center;
        color: rgba(255, 231, 184, 1);
        font-size: 0.17rem;
        text-align: center;
        margin-top: 0.02rem;
      }
      .add {
        strong {
          color: #fff;
        }
      }
    }
    .goKroom {
      text-align: center;
      font-size: 0.24rem;
      margin-top: 0.05rem;
    }
  }
  .btnBox {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 0.2rem;
    span {
      width: 2.32rem;
      height: 0.92rem;
      line-height: 0.8rem;
      text-shadow: rgba(55, 30, 13, 1) 0.02rem 0 0,
        rgba(55, 30, 13, 1) 0 0.02rem 0, rgba(55, 30, 13, 1) -0.02rem 0 0,
        rgba(55, 30, 13, 1) 0 -0.02rem 0;
      &.ok {
        background: url(../assets/img/ok.png);
        background-size: 100% 100%;
      }
      &.no {
        margin-left: 0.84rem;
        background: url(../assets/img/no.png);
        background-size: 100% 100%;
      }
    }
    span:first-child {
      text-shadow: rgba(28, 81, 179, 1) 0.02rem 0 0,
        rgba(28, 81, 179, 1) 0 0.02rem 0, rgba(28, 81, 179, 1) -0.02rem 0 0,
        rgba(28, 81, 179, 1) 0 -0.02rem 0;
    }
  }
}
</style>
