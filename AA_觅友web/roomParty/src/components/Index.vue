<template>
  <div class="page pageIndex">
    <div class="pageCon">
      <div class="title">
        <strong>房間活動</strong>
        <i class="qurey" @click="$router.push({name:'Rule'})"></i>
        <i class="creatBtn" @click="$router.push({name:'CreatAct'})" v-if="isOwner">發佈</i>
      </div>
      <ul class="actList">
        <li v-for="(item,index) in list" :key="index" :class="'themeType'+item.themeType">
          <i class="typeTips">{{typeTips[item.themeType]}}</i>
          <div class="actMsg">
            <div class="partyImg">
              <img :src="image" alt="">
              <div class="peopleNums">
                <i></i>
                <strong>{{item.joinUser}}</strong>
              </div>
            </div>
            <div class="actTips">
              <div class="topic">{{item.topic}}</div>
              <div class="tm">{{item.beginTime}} - {{item.endTime}}</div>
              <div class="status" :class="'status'+item.status">
                <em v-if="item.status == 0">活動預告中</em>
                <em v-else-if="item.status == 1">活動準備中</em>
                <em v-else-if="item.status==2">活動進行中</em>
              </div>
            </div>
          </div>
          <div class="notStart" v-if="item.status == 0">
            <Clamp :content="item.bulletin" />
            <div class="jojinBtn">
              <div class="jojinPeople">
                <div class="peopleAv">
                  <img v-lazy="item.avatar" alt="" v-for="(item,index) in item.userList" :key="index">
                </div>
                <strong>已報名:{{item.joinUser}}人</strong>
              </div>
              <div class="btns">
                <div class="done" v-if="isOwner">
                  <span class="del" @click="del(item.actId,index)"></span>
                  <span class="edit" @click="editAct(item)"></span>
                </div>
                <div class="jojinAct" :class="{ed:item.isJoin}" v-else>
                  <em v-if="!item.isJoin" @click="jojin(item.actId,index)">參與</em>
                  <em v-else>已參與</em>
                </div>
              </div>
            </div>
          </div>
          <div class="actStart" v-else>
            <div class="actData">
              <div class="taskActive">
                <span>{{item.taskActive}}</span>
                <strong>活躍用戶</strong>
              </div>
              <div class="fireworks">
                <span>{{item.fireworksCnt}}</span>
                <strong>煙火獎勵</strong>
              </div>
              <div class="coinsCnt">
                <span>{{item.coinsCnt}}</span>
                <strong>金幣流水</strong>
              </div>
            </div>
            <div class="actDataBar">
              <div class="barTitle">活動獎勵</div>
              <ul>
                <li v-for="(item2,index2) in taskName" :key="index2">
                  <div class="taskName">{{item2.name.replace('%s',item[item2.limit])}}</div>
                  <div class="taskBar">
                    <i class="giftIcon" :class="[{geted:item[index2] / item[item2.limit] >= 1},'task' + index2]"></i>
                    <div class="actBar" :style="{width:item[index2] / item[item2.limit]  * 100+ '%'}">
                      <i class="barLinght"></i>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="ownerOper" v-if="isOwner">
              <strong>剩餘:{{item.fireworks}}次</strong>
              <span class="launch" :class="{ed:item.fireworks <= 0}" @click="launch(item.actId,item.fireworks,index)">發射煙花 </span>
              <span>
                <em v-if="item.status == 1" @click="start(item.actId,index)">開始活動</em>
                <em v-else-if="item.status == 2" @click="end(item.actId,index)">結束活動</em>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { actList, jojinAct, delAct, startAct, endAct, lightFireworks } from "../apis"
import { getUrlString } from "../utils"
import Clamp from "./Clamp"
import { closeWeb } from "../utils/miyouCallApp"


export default {
  components: { Clamp },
  data () {
    return {
      image: '',
      isOwner: -1,
      taskName: {
        'taskCoinLoop': {
          limit: 'taskCoinLoopLimit',
          name: '房間金幣流水每增加%s',
        },
        'taskActive': {
          limit: 'taskActiveLimit',
          name: '房間活躍用戶達到%s',
        },
        'taskCoins': {
          limit: 'taskCoinsLimit',
          name: '房間金幣流水達到%s',
        }
      },
      list: [],
      typeTips: {
        1: '交友配對',
        2: '团战PK',
        3: '生日派對',
        4: '爛漫婚禮',
      }
    }
  },
  created () {
    actList(1).then(res => {
      const { image, isOwner, list, online } = res.data.response_data
      this.image = image
      this.isOwner = isOwner
      this.list = list
      this.vxc('setIsOwner', isOwner)
      this.vxc('setListLength', list.length)
      //   if (!list.length) {
      //     this.$router.push({ name: 'Rule' })
      //   }
    })
  },
  methods: {
    start (id, index) {
      startAct(id).then(res => {
        if (res.data.response_data) {
          this.toast(`當前活動已開啟`)
          this.$set(this.list[index], 'status', 2)
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    end (id, index) {
      endAct(id).then(res => {
        if (res.data.response_data) {
          this.toast(`當前活動已結束！`)
          this.list.splice(index, 1)
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    launch (id, nums, index) {
      if (nums > 0) {
        lightFireworks(id).then(res => {
          if (res.data.response_data) {
            this.toast(`煙火已發射！`)
            this.$set(this.list[index], 'fireworks', nums - 1)
            closeWeb()
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      }
    },
    jojin (id, index) {
      jojinAct(id).then(res => {
        if (res.data.response_data) {
          this.toast(`已參與`)
          this.$set(this.list[index], 'isJoin', true)
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    del (id, index) {
      delAct(id).then(res => {
        if (res.data.response_data) {
          this.toast(`當前活動已取消！`)
          this.list.splice(index, 1)
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    editAct (item) {
      this.vxc('setEditAct', item)
      this.$router.push({ name: 'CreatAct' })

    }
  }
}
</script>

<style lang="scss">
.pageCon {
  height: 8.3rem;
  background: url(../img/bg.png) no-repeat;
  background-size: 100% auto;
  padding-top: 0.88rem;
  overflow-y: scroll;
  > .title {
    width: 100%;
    background: #fff;
    text-align: center;
    height: 0.88rem;
    line-height: 0.88rem;
    color: #2C2B36;
    position: relative;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    strong {
      font-size: 0.32rem;
      font-weight: bold;
    }
    .qurey {
      display: block;
      width: 0.48rem;
      height: 0.48rem;
      background: url(../img/qurey.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.2rem;
      left: 0.3rem;
    }
    .creatBtn {
      display: block;
      width: 1.16rem;
      height: 0.54rem;
      background: linear-gradient(90deg, #7A68F8 0%, #9585FF 100%);
      border-radius: 0.3rem;
      text-align: center;
      line-height: 0.54rem;
      color: #fff;
      position: absolute;
      top: 0.2rem;
      right: 0.3rem;
      font-size: 0.26rem;
    }
  }
  .actList {
    width: 6.9rem;
    margin: 0.23rem auto 0;
    > li {
      min-height: 3.38rem;
      padding: 0.29rem 0.32rem 0.35rem;
      border-radius: 0.2rem;
      position: relative;
      margin-bottom: 0.2rem;
      .typeTips {
        min-width: 1.12rem;
        height: 0.46rem;
        font-size: 0.24rem;
        text-align: center;
        line-height: 0.46rem;
        background: linear-gradient(
          270deg,
          #FFFFFF 0%,
          rgba(255, 255, 255, 0.44) 100%
        );
        border-radius: 0 0.2rem 0 0.2rem;
        position: absolute;
        top: 0;
        right: 0;
      }
      .actMsg {
        height: 1.4rem;
        display: flex;
        align-items: center;
        position: relative;
        .partyImg {
          width: 1.4rem;
          height: 1.4rem;
          position: relative;
          img {
            width: 1.4rem;
            height: 1.4rem;
            background: rgba(0, 0, 0, 0);
            border: 0.04rem solid #FFFFFF;
            border-radius: 0.2rem;
            box-sizing: border-box;
          }
          .peopleNums {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 0.28rem;
            display: flex;
            align-items: center;
            i {
              width: 0.24rem;
              height: 0.24rem;
              background: url(../img/peopleNumsIcon.png);
              background-size: 100% 100%;
              margin-left: 0.12rem;
            }
            strong {
              font-size: 0.2rem;
            }
          }
        }
        .actTips {
          margin-left: 0.22rem;
          .topic {
            font-size: 0.32rem;
            font-weight: 600;
          }
          .tm {
            font-size: 0.24rem;
            margin: 0.1rem 0;
          }
          .status {
            width: 1.59rem;
            height: 0.36rem;
            border-radius: 0.2rem 0 0 0.2rem;
            text-align: center;
            line-height: 0.36rem;
            em {
              font-size: 0.2rem;
            }
            &.status0 {
              background: linear-gradient(
                92deg,
                rgba(209, 208, 220, 0.2) 0%,
                rgba(255, 255, 255, 0) 100%
              );
            }
            &.status1 {
              background: linear-gradient(
                92deg,
                #7A68F8 0%,
                rgba(122, 104, 248, 0) 100%
              );
            }
            &.status2 {
              background: linear-gradient(
                92deg,
                #FFA143 0%,
                rgba(255, 161, 67, 0) 100%
              );
            }
          }
        }
      }
      .notStart {
        .jojinBtn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.32rem;
          .jojinPeople {
            display: flex;
            align-items: center;
            background: linear-gradient(
              87deg,
              rgba(255, 255, 255, 0.2) 0%,
              rgba(255, 255, 255, 0) 100%
            );
            border-radius: 0.5rem 0 0 0.5rem;
            .peopleAv {
              display: flex;
              align-items: center;
              img {
                width: 0.52rem;
                height: 0.52rem;
                border-radius: 50%;
                box-sizing: border-box;
                border: 0.02rem solid #F7F7F7;
              }
              img:nth-child(2),
              img:nth-child(3) {
                margin-left: -0.16rem;
              }
            }
            strong {
              font-size: 0.24rem;
              color: rgba(255, 255, 255, 0.7);
              margin-left: 0.14rem;
            }
          }
          .btns {
            .jojinAct {
              width: 1.65rem;
              height: 0.62rem;
              background: linear-gradient(
                180deg,
                #FFFFFF 0%,
                rgba(255, 255, 255, 0.61) 100%
              );
              border-radius: 0.32rem;
              text-align: center;
              line-height: 0.62rem;
              font-size: 0.26rem;
              font-weight: bold;
              color: rgba(252, 87, 115, 1);
              &.ed {
                background: rgba(0, 0, 0, 0.2);
                color: rgba(255, 255, 255, 0.8);
              }
            }
            .done {
              display: flex;
              align-items: center;
              justify-content: space-between;
              .del,
              .edit {
                width: 0.44rem;
                height: 0.44rem;
                background-image: url(../img/del.png);
                background-size: 100% 100%;
              }
              .edit {
                background-image: url(../img/edit.png);
                background-size: 100% 100%;
                margin-left: 0.3rem;
              }
            }
          }
        }
      }
      .actStart {
        .actData {
          height: 1.48rem;
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          > div {
            height: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            span {
              font-weight: bold;
              font-size: 0.32rem;
            }
            strong {
              font-size: 0.24rem;
              color: rgba(255, 255, 255, 0.7);
            }
          }
        }
        .actDataBar {
          .barTitle {
            font-size: 0.26rem;
            color: rgba(255, 255, 255, 0.5);
            margin: 0.3rem 0 0.19rem;
          }
          ul {
            li {
              .taskName {
                font-size: 0.24rem;
              }
              .taskBar {
                width: 5.88rem;
                height: 0.24rem;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 0.18rem;
                margin: 0.09rem 0 0.19rem;
                position: relative;
                .giftIcon {
                  display: block;
                  width: 0.54rem;
                  height: 0.54rem;
                  position: absolute;
                  right: -0.38rem;
                  top: -0.15rem;
                  border-radius: 50%;
                  &.tasktaskCoinLoop,
                  &.tasktaskActive {
                    background: rgba(255, 255, 255, 0.2)
                      url(../img/fireIcon.png);
                    background-size: 100% 100%;
                    &.geted {
                      background: #FFB66D url(../img/fireIcon.png);
                      background-size: 100% 100%;
                    }
                  }
                  &.tasktaskCoins {
                    background: rgba(255, 255, 255, 0.2) url(../img/giftBox.png);
                    background-size: 100% 100%;
                    &.geted {
                      background: #FFB66D url(../img/giftBox.png);
                      background-size: 100% 100%;
                    }
                  }
                }
                .actBar {
                  border-radius: 0.18rem;
                  max-width: 100%;
                  height: 100%;
                  position: absolute;
                  top: 0;
                  left: 0;
                  background: linear-gradient(90deg, #FFA143 0%, #FFB66D 100%);
                  overflow: hidden;
                  .barLinght {
                    width: 100%;
                    height: 100%;
                    background: url(../img/barLinght.png);
                    background-size: auto 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                  }
                }
              }
            }
          }
        }
        .ownerOper {
          padding: 0 0.51rem 0.35rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.32rem;
          position: relative;
          strong {
            width: 2.44rem;
            position: absolute;
            left: 0.5;
            bottom: 0rem;
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.2rem;
            text-align: center;
          }
          > span {
            width: 2.44rem;
            height: 0.62rem;
            background: linear-gradient(
              180deg,
              #FFFFFF 0%,
              rgba(255, 255, 255, 0.61) 100%
            );
            border-radius: 0.32rem;
            text-align: center;
            line-height: 0.62rem;
            font-size: 0.26rem;
            font-weight: bold;
            position: relative;
            color: rgba(252, 87, 115, 1);
            &.launch {
              &.ed {
                background: rgba(0, 0, 0, 0.2);
                color: rgba(255, 255, 255, 0.8);
              }
            }

            em {
              font-size: 0.26rem;
              font-weight: bold;
            }
          }
        }
      }
      &.themeType1 {
        background: linear-gradient(180deg, #FF77BB 0%, #F567AF 100%);
        .typeTips,
        .ownerOper span {
          color: #F567AF;
        }
      }

      &.themeType2 {
        background: linear-gradient(180deg, #FB8A9D 0%, #FC5773 100%);
        .typeTips,
        .ownerOper span {
          color: #FC5773;
        }
      }
      &.themeType3 {
        background: linear-gradient(180deg, #CC7CF5 0%, #BE58F2 100%);
        .typeTips,
        .ownerOper span {
          color: #BE58F2;
        }
      }
      &.themeType4 {
        background: linear-gradient(180deg, #B5A2FF 0%, #967BFF 100%);
        .typeTips,
        .ownerOper span {
          color: #967BFF;
        }
      }
      &.themeType1::before {
        content: '';
        display: block;
        width: 2.84rem;
        height: 1.68rem;
        background-image: url(../img/themeType1.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.2rem;
        right: 0;
      }
      &.themeType2::before {
        content: '';
        display: block;
        width: 2.84rem;
        height: 1.68rem;
        background-image: url(../img/themeType2.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.2rem;
        right: 0;
      }
      &.themeType3::before {
        content: '';
        display: block;
        width: 2.84rem;
        height: 1.68rem;
        background-image: url(../img/themeType3.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.2rem;
        right: 0;
      }
      &.themeType4::before {
        content: '';
        display: block;
        width: 2.84rem;
        height: 1.68rem;
        background-image: url(../img/themeType4.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.2rem;
        right: 0;
      }
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>