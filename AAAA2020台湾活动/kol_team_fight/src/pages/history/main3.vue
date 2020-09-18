<template>
  <div class="history">
    <div class="tabs" :class="{act:type == 1}">
      <span class="tab1" @click="tabClick(0)"><i :class="{act:type==0}"></i></span>
      <span class="tab2" v-if="host" @click="tabClick(1)"><i :class="{act:type==1}"></i></span>
      <span class="tab3" v-if="!host" @click="tabClick(1)"><i :class="{act:type==1}"></i></span>
    </div>
    <div class="tipsBox">
      <p v-if="type==0 && host">以下為詳細申請記錄，通過者即可加入你的戰隊</p>
      <p v-else-if="type== 1 && host">以下為詳細邀請記錄，展示出你發出的戰隊邀請</p>
      <p v-else-if="type== 0 && !host"> 顯示你發出的戰隊申請，每個人最多加入5個戰隊</p>
      <p v-else>以下戰隊邀請你加入，每個人最多加入5個戰隊</p>
    </div>
    <div class="listHeader" :class="{min:!host}">
      <span class="av">{{host?'頭像':'隊長頭像'}}</span>
      <span class="nick">{{host?'暱稱':'戰隊名稱'}}</span>
      <div class="peopleNum" v-if="!host">隊員數</div>
      <span class="time">{{type ==1?"申請時間":"邀請時間"}}</span>
      <span class="do">操作</span>
    </div>
    <TabsScrollLoadList ref="scroll" :host="host" />
    <msg-toast></msg-toast>
    <Loading />
  </div>
</template>
<script>
import getString from "../../utils/getString"
import TabsScrollLoadList from "../../components/TabsScrollLoadList"
import Loading from "../../components/Loading"
import MsgToast from "../../components/commonToast"
export default {
  components: { TabsScrollLoadList, Loading, MsgToast },
  data() {
    return {
      type: 0,
      host: null
    }
  },
  created() {
    this.host = getString('host') == 'true' ? 1 : 0
  },
  methods: {
    tabClick(val) {
      this.type = val
      this.$refs.scroll.mainTabClick(val)
    },
  }
}
</script>
<style lang="scss">
body {
  background: rgba(5, 25, 67, 1);
}
.history {
  padding: 0.39rem 0.33rem;
  .tabs {
    width: 6.84rem;
    height: 1.06rem;
    background: url(../../assets/img/hsitoryTab1.png);
    background-size: 100%100%;
    display: flex;
    align-items: center;
    span {
      height: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      &.tab1 {
        i {
          display: block;
          width: 1.45rem;
          height: 0.34rem;
          background: url(../../assets/img/tabName2.png);
          background-size: 100% 100%;
          &.act {
            width: 1.64rem;
            height: 0.53rem;
            background: url(../../assets/img/tabName1.png);
            background-size: 100% 100%;
          }
        }
      }
      &.tab2 {
        i {
          display: block;
          width: 1.45rem;
          height: 0.34rem;
          background: url(../../assets/img/tabName4.png);
          background-size: 100% 100%;
          &.act {
            width: 1.64rem;
            height: 0.53rem;
            background: url(../../assets/img/tabName3.png);
            background-size: 100% 100%;
          }
        }
      }
      &.tab3 {
        i {
          display: block;
          width: 1.45rem;
          height: 0.34rem;
          background: url(../../assets/img/tabName6.png);
          background-size: 100% 100%;
          &.act {
            width: 1.64rem;
            height: 0.53rem;
            background: url(../../assets/img/tabName5.png);
            background-size: 100% 100%;
          }
        }
      }
    }
    &.act {
      background: url(../../assets/img/hsitoryTab2.png);
      background-size: 100% 100%;
    }
  }
  .tipsBox {
    margin: 0.22rem 0 0.3rem;
    text-align: center;
    font-size: 0.24rem;
    color: rgba(246, 210, 123, 1);
  }
  .listHeader {
    display: flex;
    align-items: center;
    font-size: 0.24rem;
    color: rgba(105, 193, 255, 1);
    &.min {
      .nick {
        width: 1.3rem;
      }
      // .time {
      //   width: 1.2rem;
      // }
    }
    span {
      text-align: center;
    }
    .av {
      width: 1rem;
    }
    .nick {
      width: 1.5rem;
    }
    .time {
      width: 1.7rem;
    }
    .do {
      flex: 1;
    }
  }
}
.queryPup {
  width: 6.25rem;
  height: 4.02rem;
  background: url(../../assets/img/pupBg.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    display: block;
    width: 0.67rem;
    height: 0.67rem;
    background: url(../../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    bottom: -1.5rem;
    left: 2.8rem;
  }
  p {
    height: 2.33rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .btnBox {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    span {
      width: 2.32rem;
      height: 0.92rem;
      line-height: 0.8rem;
      text-shadow: rgba(55, 30, 13, 1) 0.02rem 0 0,
        rgba(55, 30, 13, 1) 0 0.02rem 0, rgba(55, 30, 13, 1) -0.02rem 0 0,
        rgba(55, 30, 13, 1) 0 -0.02rem 0;
      &.ok {
        background: url(../../assets/img/ok.png);
        background-size: 100% 100%;
      }
      &.no {
        margin-left: 0.84rem;
        background: url(../../assets/img/no.png);
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
@import "../../assets/scss/common.scss";
</style>
