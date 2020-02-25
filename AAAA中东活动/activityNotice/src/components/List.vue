<template>
  <div class="listCon">
    <ul class="list">
      <li v-for="(item,index) in list" :key="index" :class="{noAct:item.actState==0}">
        <div class="actMsg">
          <div class="roomImg">
            <img v-lazy="item.img" alt="">
            <em>ID:{{item.rid}}</em>
          </div>
          <div class="msg">
            <div class="actTitle">موضوع النشاط: {{item.title}}</div>
            <div class="actCon">وصف النشاط:{{item.actCom}}</div>
          </div>
          <div class="btn" @click="btnClick(item.actState,item.rid,item.singUp)" :class="{singUp:item.singUp==1 && item.actState==0,subscribe:item.singUp == 0 && item.actState==0}"></div>
        </div>
        <div class="actState">
          <div class="state">
            <div class="start" v-show="item.actState == 0">
              <i class="dou"></i>
              <em>البدء من {{item.time}} (بتوقيت دبي)</em>
            </div>
            <div class="noStart" v-show="item.actState == 1">
              <i class="du"></i>
              <em>691 يجري الآن</em>
            </div>
          </div>
          <div class="goDetails">تفاصيل النشاط >></div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          img: "",
          rid: 111111,
          title: "dddd",
          actCom: "ggggggg",
          peopelNum: 999,
          actState: 1,   //活动开始未开始
          time: "2019-11-19",
          isGuanfang: 0,
          singUp: 0,     //是否报名
        },
        {
          img: "",
          rid: 222222,
          title: "ddddssss",
          actCom: "gggggggssss",
          peopelNum: 999,
          actState: 0,
          time: "2019-11-19",
          isGuanfang: 1,
          singUp: 0,     //是否报名
        },
        {
          img: "",
          rid: 222222,
          title: "ddddssss",
          actCom: "gggggggssss",
          peopelNum: 999,
          actState: 0,
          time: "2019-11-19",
          isGuanfang: 1,
          singUp: 1,     //是否报名
        }
      ],
      isMore: true,
      loaded: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    btnClick(state, rid, singUp) {   //跳房间，报名，订阅，
      if (state == 1) {
        location.href = `rid:${rid}`
      } else if (singUp == 1) {
        this.$router.push({ path: '/singUp' })
      } else {
        this.$router.push({ path: '/subscribe' })
      }
    },
    onScroll() {
      if (this.isMore) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
        if (scrollToBottom && !this.loaded) { //加載更多
          this.isMore = false
          api.getRank(3, this.list.length).then((res) => {
            this.isMore = true
            var newArr = res.data.response_data.list
            if (newArr.length > 0) {
              this.list = this.list.concat(newArr)
            } else if (newArr.length == 0 && this.list.length > 20) {
              this.loaded = true
            }
          })
        }
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.list {
  padding: 0 0.26rem;
  li {
    height: 2.27rem;
    background: url(../assets/img/listBg.png);
    background-size: 100% 100%;
    margin-bottom: 0.27rem;
    .actMsg {
      height: 1.68rem;
      border-radius: 0.5rem;
      padding: 0 0.31rem 0 0.28rem;
      display: flex;
      align-items: center;
      .roomImg {
        width: 1.22rem;
        height: 1.22rem;
        border-radius: 0.1rem;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        em {
          display: block;
          width: 1.22rem;
          height: 0.27rem;
          line-height: 0.27rem;
          text-align: center;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 0 0 0.1rem 0.1rem;
          position: absolute;
          bottom: 0;
          font-size: 71%;
        }
      }
      .msg {
        margin-right: 0.1rem;
        width: 3.7rem;
        div {
          max-width: 3.7rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .btn {
        width: 1.22rem;
        height: 0.53rem;
        background: url(../assets/img/goRoom.png);
        background-size: 100% 100%;
        margin-right: 0.15rem;
        &.singUp {
          background: url(../assets/img/singUp.png);
          background-size: 100% 100%;
        }
        &.subscribe {
          background: url(../assets/img/Subscribe.png);
          background-size: 100% 100%;
        }
      }
    }
    .actState {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 0.5rem;
      .state {
        flex: 1;
        margin-right: 0.28rem;
        em {
          font-size: 80%;
          white-space: nowrap;
        }
        .start,
        .noStart {
          display: flex;
          align-items: center;
        }
        .dou {
          display: block;
          width: 0.3rem;
          height: 0.3rem;
          margin-left: 0.11rem;
          background: url(../assets/img/dou.png);
          background-size: 100% 100%;
        }
        .du {
          display: block;
          width: 0.3rem;
          height: 0.3rem;
          margin-left: 0.11rem;
          background: url(../assets/img/du.png);
          background-size: 100% 100%;
        }
      }
      .goDetails {
        font-size: 80%;
        margin-left: 0.28rem;
      }
    }
    &.noAct {
      background: url(../assets/img/listBg2.png);
      background-size: 100% 100%;
    }
  }
}
</style>
