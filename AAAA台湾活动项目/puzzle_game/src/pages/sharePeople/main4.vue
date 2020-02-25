<template>
  <div class="share">
    <div class="shareCon">
      <div class="shareTips">
        <h3>選擇要助力的好友</h3>
        <div class="tips2">
          <p>每日最多幫3個好友贏積分，每日最多被3個好友幫忙贏積分；</p>
          <p>幫1位好友贏積分1次，自己也可增加10積分</p>
        </div>
      </div>
      <div class="shareBtn">
        <input type="number" name="" id="" placeholder="搜尋好友ID" v-model="uid" onfocus="this.scrollIntoView(true);this.scrollIntoViewIfNeeded();" @focus="focus()">
        <span class=" go" @click="shareUid()">確定</span>
      </div>
      <ul class="rankList">
        <li v-for="(item,index) in peopleList" :key="index" :class="'rank'+item.rank" @click="gpPeople(item.uid)">
          <span class="itemRank">{{item.rank}}</span>
          <div class="imgBox">
            <img v-lazy="item.avatar" alt="">
          </div>
          <div class="uerMsg">
            <div class="name">{{item.nick}}</div>
            <div class="uid">感恩值：<em> {{item.score}}</em></div>
          </div>
          <div class="scoreBox">
            <span v-if="item.owner_praises > 0">已助力{{item.owner_praises}}積分</span>
            <span v-else-if="item.receiver_praise == 3">已被3人助力</span>
            <span v-else-if="item.owner_praises == 0" class="btn" @click.stop="getPoint(item.uid,index)">幫他贏積分</span>
          </div>
        </li>
      </ul>
    </div>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
    <Loading></Loading>
  </div>
</template>
<script>
import api from "../../api/apiConfig"
import Loading from "../../components/Loading"
import MsgToast from "../../components/commonToast"
export default {
  components: { Loading, MsgToast },
  data() {
    return {
      peopleList: [],
      isMore: true,
      loaed: false,
      uid: '',
      copyRank: [],
      tastMsg: '',
      showT: false,
      userMsg: ''
    }
  },
  created() {
    if (JSON.parse(sessionStorage.getItem('userMsg'))) {
      this.userMsg = JSON.parse(sessionStorage.getItem('userMsg'))
    }
    api.sharePeopl(0).then(res => {
      this.peopleList = res.data.response_data.user_rank
      this.copyRank = JSON.parse(JSON.stringify(this.peopleList))
    })
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
    sessionStorage.setItem("need-refresh", true);
  },
  watch: {
    uid(val) {
      if (val == '') {
        this.peopleList = this.copyRank
      }
    }
  },
  methods: {
    shareUid() {
      if (this.uid == '') {
        this.tastMsg = `请输入搜尋ID！`
        this.showT = true
      } else {
        if (this.uid != this.userMsg.uid) {
          api.chaUid(this.uid).then(res => {
            let newRank = res.data.response_data.user_rank
            if (newRank.length > 0) {
              // this.copyRank = JSON.parse(JSON.stringify(this.peopleList))
              this.peopleList = newRank
            } else {
              this.tastMsg = `沒有搜尋到該用戶</br>請先確認該用戶是否成功參賽唷！`
              this.showT = true
            }
          })
        } else {
          this.tastMsg = `不能搜尋自己哦！`
          this.showT = true
        }
      }

    },
    getPoint(uid, index) {  //点赞加积分
      if (this.userMsg.send_praise >= 3) { //當天點讚次數不足
        this.tastMsg = `助力失敗！今日助力好友次數已達到上限,歡迎明天繼續助力好友贏積分哦！`
        this.showT = true
      } else {
        api.praise(uid).then(res => {
          if (res.data.response_status.code == 0) {
            this.peopleList[index].owner_praises += res.data.response_data.score
            this.peopleList[index].receiver_praise += 1
            this.tastMsg = `助力成功！幫好友增加了${res.data.response_data.score}積分，感恩！`
            this.showT = true
            this.userMsg.send_praise += 1
          } else {
            this.tastMsg = res.data.response_status.error
            this.showT = true
          }
        })
      }
    },
    onScroll() {
      if (this.isMore) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
        if (scrollToBottom && !this.loaed) { //加載更多
          this.isMore = false
          api.sharePeopl(this.peopleList.length).then((res) => {
            this.isMore = true
            var newArr = res.data.response_data.user_rank
            if (newArr.length > 0) {
              this.peopleList = this.peopleList.concat(newArr)
            } else {
              this.loaed = true
            }
          })
        }
      }
    },
    gpPeople(uid) {
      location.href = `uid:${uid}`
    },
    closeToast() {
      this.showT = false
    },
    focus() {
      this.uid = ''
    }
  }
}
</script>
<style lang="scss">
body {
  background: #cb4a45;
  .shareCon {
    padding: 0.47rem 0.19rem;
    .shareTips {
      h3 {
        text-align: center;
        color: #ffc867;
        font-size: 113%;
      }
      .tips2 {
        margin-top: 0.2rem;
        p {
          color: #ffd9c4;
          font-size: 80%;
          text-align: center;
        }
      }
    }
    .shareBtn {
      width: 5.15rem;
      height: 0.8rem;
      background: url(../../assets/img/shareBtn.png);
      background-size: 100% 100%;
      margin: 0.38rem auto;
      display: flex;
      align-items: center;
      input {
        background: none;
        border: none;
        width: 3.2rem;
        height: 0.7rem;
        line-height: 0.7rem;
        margin: 0.05rem 0 0 0.5rem;
        color: #ffc867;
      }
      input::-webkit-input-placeholder {
        color: #ffc867;
      }
      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #ffc867;
      }
      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #ffc867;
      }
      input:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #ffc867;
      }
      .go {
        display: block;
        width: 1.5rem;
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: center;
      }
    }
    .rankList {
      margin-top: 0.39rem;
      li {
        width: 7.1rem;
        height: 1.33rem;
        background: url(../../assets/img/listItem.png);
        background-size: 100% 100%;
        margin-top: 0.1rem;
        display: flex;
        align-items: center;
        .itemRank {
          width: 0.75rem;
          line-height: 0.65rem;
          height: 0.65rem;
          color: #af3600;
          font-size: 120%;
          margin-left: 0.06rem;
          text-align: center;
        }
        .imgBox {
          width: 0.88rem;
          height: 0.88rem;
          img {
            width: 0.88rem;
            height: 0.88rem;
            border-radius: 50%;
            border: 0.02rem solid rgba(255, 232, 195, 1);
          }
        }
        .uerMsg {
          width: 2.4rem;
          height: 0.8rem;
          margin-left: 0.13rem;
          .name {
            height: 50%;
            line-height: 0.4rem;
            max-width: 2.4rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .uid {
            height: 50%;
            margin-top: 0.05rem;
            line-height: 0.4rem;
            font-size: 80%;
            color: #ffe897;
            font-weight: 600;
            em {
              color: #ffd9c4;
              font-size: 0.3rem;
            }
          }
        }
        .scoreBox {
          width: 2.2rem;
          height: 0.76rem;
          margin: 0.2rem 0 0 0.3rem;
          span {
            display: block;
            color: #ffc867;
            font-size: 86%;
            text-align: center;
            line-height: 0.6rem;
            font-weight: 600;
          }
          .btn {
            height: 100%;
            color: #661714;

            background: url(../../assets/img/sharePeople.png);
            background-size: 100% 100%;
          }
        }
        &.rank1 {
          background: url(../../assets/img/top1Bg.png);
          background-size: 100% 100%;
          .itemRank {
            background: url(../../assets/img/rank1.png);
            background-size: 100% 100%;
            text-indent: -999rem;
          }
        }
        &.rank2 {
          background: url(../../assets/img/top2Bg.png);
          background-size: 100% 100%;
          .itemRank {
            background: url(../../assets/img/rank2.png);
            background-size: 100% 100%;
            text-indent: -999rem;
          }
        }
        &.rank3 {
          background: url(../../assets/img/top2Bg.png);
          background-size: 100% 100%;
          .itemRank {
            background: url(../../assets/img/rank3.png);
            background-size: 100% 100%;
            text-indent: -999rem;
          }
        }
      }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
