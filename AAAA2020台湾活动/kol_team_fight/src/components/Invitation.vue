<template>
  <div class="invitation">
    <div class="title">邀請戰隊成員</div>
    <div class="shareBtn">
      <input type="number" v-model="searchUid">
      <i @click="search()"></i>
    </div>
    <div class="fList">
      <ul class="invList scrollable">
        <li v-for="(item,index) in friend_list" :key="index">
          <img v-lazy="item.avatar" alt="">
          <div class="nick">{{item.nick}}</div>
          <div class="uid">{{item.uid}}</div>
          <div class="status">
            <em class="inv" v-if="item.status == 2 || item.status == 3" @click="invite(item.status,index,item.uid)">邀請</em>
            <em class="ed" v-else-if="item.status == 0">已邀請</em>
            <em class="added" v-else>已加入</em>
          </div>
        </li>
      </ul>
      <p>可邀請好友加入戰隊，列表展示近2週登陸的好友信息</p>
    </div>
    <div class="mask" v-show="searchPeople">
      <transition name="slise">
        <div class="queryPup" v-if="searchPeople">
          <i class="close" @click="closePeoplePup()"></i>
          <div class="peopleMsg">
            <img v-lazy="peopleMsg.info.avatar" alt="">
            <div class="nick">{{peopleMsg.info.nick}}</div>
            <div class="uid">{{peopleMsg.info.uid}}</div>
          </div>
          <div class="btnBox">
            <span class="ok" v-if="peopleMsg.status == 2 || peopleMsg.status == 3" @click="invite(peopleMsg.status,null,peopleMsg.info.uid)">邀請</span>
            <em class="ed" v-else-if="peopleMsg.status == 0">已邀請</em>
            <em class="added" v-else>已加入</em>
          </div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="refuse">
      <transition name="slide">
        <div class="queryPup" v-show="refuse">
          <i class="close" @click="closeRefuse()"></i>
          <p>
            該好友已拒絕上一次邀請是否再次<br />
            發出邀請？
          </p>
          <div class="btnBox">
            <span class="ok" @click="inviteGet()">確定</span>
            <span class="no" @click="closeRefuse()">取消</span>
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
      refuse: false,
      index: null,
      uid: 0,
      searchUid: '',
      searchPeople: false,
      peopleMsg: { info: {} },
      loaded: false,
      more: true
    }
  },
  computed: {
    ...mapState(['friend_list'])
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    invite(status, index, uid) {
      this.index = index
      this.uid = uid
      if (status == 2) {
        this.refuse = true
      } else {
        this.inviteGet()
      }
    },
    inviteGet() {
      api.invite(this.uid).then(res => {
        if (res.data.response_status.code == 0) {
          if (this.index != null) {
            this.vxc('setInvited', this.index)
          }
          if (this.peopleMsg.info.uid) {
            this.peopleMsg.status = 0
          }
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    search() {
      if (this.searchUid != '') {
        api.searchMate(this.searchUid).then(res => {
          if (res.data.response_status.code == 0) {
            this.peopleMsg = res.data.response_data
            this.uid = this.peopleMsg.info.uid
            this.searchPeople = true
          } else {
            this.vxc('setToast', {
              msg: res.data.response_status.error
            })
          }
        })
      }
    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.friendList(this.friend_list.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.vxc('addFriendList', res.data.response_data.list)
            }
          })
        }
      }
    },
    closeRefuse() {
      this.uid = 0
      this.index = null
      this.refuse = false
    },
    closePeoplePup() {
      this.uid = 0
      this.index = null
      this.searchPeople = false
    }
  }
}
</script>
<style lang="scss">
.invitation {
  .title {
    width: 5.83rem;
    height: 0.7rem;
    background: url(../assets/img/inivationTitle.png);
    background-size: 100% 100%;
    font-size: 0.36rem;
    line-height: 0.6rem;
    text-align: center;
    margin: 0 auto;
    text-shadow: rgba(28, 81, 179, 1) 0.02rem 0 0,
      rgba(28, 81, 179, 1) 0 0.02rem 0, rgba(28, 81, 179, 1) -0.02rem 0 0,
      rgba(28, 81, 179, 1) 0 -0.02rem 0;
  }
  .shareBtn {
    width: 3.23rem;
    height: 0.5rem;
    background: #144c85;
    border: 0.03rem solid #4d9bc0;
    border-radius: 0.23rem;
    display: flex;
    align-items: center;
    margin: 0.21rem auto 0;
    input {
      width: 2.5rem;
      margin-left: 0.22rem;
      color: rgba(77, 155, 192, 1);
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
  .fList {
    width: 6.84rem;
    height: 2.28rem;
    background: url(../assets/img/iList.png);
    background-size: 100% 100%;
    margin: 0.27rem auto 0;
    .invList {
      height: 1.8rem;
      overflow-y: scroll;
      li {
        display: flex;
        height: 0.6rem;
        align-items: center;
        color: rgba(173, 221, 255, 1);
        font-size: 0.26rem;
        img {
          width: 0.48rem;
          height: 0.48rem;
          border-radius: 50%;
          margin-left: 0.6rem;
        }
        .nick {
          width: 1.8rem;
          margin-left: 0.12rem;
          max-width: 1.8rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .uid {
          width: 1rem;
          margin-left: 0.2rem;
        }
        .status {
          width: 1.27rem;
          height: 0.48rem;
          margin-left: 1.1rem;
          em {
            display: block;
            width: 100%;
            height: 100%;
            background: url(../assets/img/btnStatus3.png);
            background-size: 100% 100%;
            font-size: 0.24rem;
            text-align: center;
            line-height: 0.48rem;
            color: #fff;
            font-style: italic;
            &.inv {
              color: rgba(173, 221, 255, 1);
              background: url(../assets/img/btnStatus1.png);
              background-size: 100% 100%;
            }
          }
        }
      }
    }
    p {
      text-align: center;
      font-size: 0.24rem;
      color: rgba(105, 193, 255, 1);
    }
  }
  .peopleMsg {
    height: 2.5rem;
    display: flex;
    align-items: center;
    color: rgba(173, 221, 255, 1);
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      margin: 0 0.28rem 0 0.65rem;
    }
    .nick {
      margin-left: 0.28rem;
      width: 2.2rem;
      max-width: 2.2rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .uid {
      margin-left: 0.5rem;
    }
  }
  .btnBox {
    em {
      display: block;
      width: 2.22rem;
      height: 0.8rem;
      background: url(../assets/img/no2.png);
      background-size: 100% 100%;
      font-size: 0.24rem;
      text-align: center;
      line-height: 0.7rem;
      margin: 0 auto;
      color: #fff;
      text-shadow: rgba(45, 45, 45, 1) 0.02rem 0 0,
        rgba(45, 45, 45, 1) 0 0.02rem 0, rgba(45, 45, 45, 1) -0.02rem 0 0,
        rgba(45, 45, 45, 1) 0 -0.02rem 0;
      &.inv {
        text-shadow: rgba(28, 81, 179, 1) 0.02rem 0 0,
          rgba(28, 81, 179, 1) 0 0.02rem 0, rgba(28, 81, 179, 1) -0.02rem 0 0,
          rgba(28, 81, 179, 1) 0 -0.02rem 0;
        color: rgba(173, 221, 255, 1);
        background: url(../assets/img/ok.png);
        background-size: 100% 100%;
      }
    }
  }
}
</style>
7