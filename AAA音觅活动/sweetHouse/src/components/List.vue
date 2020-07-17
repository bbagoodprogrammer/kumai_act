<template>
  <div class="list">
    <div class="title"></div>
    <ul class="caiList">
      <li>
        <div class="name">薄荷檸檬水
          <span class="score">清爽值:50</span>
        </div>
        <div class="msg">
          <img src="" alt="">
          <i class="deng"></i>
          <div class="cai">
            <span><i></i><strong>13/3</strong></span>
            <span><i></i><strong>13/3</strong></span>
            <span><i></i><strong>13/3</strong></span>
          </div>
          <div class="creatBtn" @click="showTask()">
            獲取材料
          </div>
          <div class="creatBtn status2" @click="creatDesserts()">
            去製作
          </div>
          <div class="overTips">已合成X份</div>
        </div>
      </li>
    </ul>
    <div class="mask" v-show="showTasks">
      <transition name="slide">
        <div class="tabs" v-if="showTasks">
          <i class="close" @click="closeTask()"></i>
          <div class="tabItem">
            <div class="item" v-for="(item,index) in tabArr" :key="index" :class="[{act:showType == item.type},'type'+item.type]">
              <span @click="tabClick(item.type)"></span>
              <strong>{{item.msg}}</strong>
            </div>
          </div>
          <div class="typeTips">
            <span class="icon" :class="'icon'+showType"></span>
            <div class="msg">
              <div class="typeTipsTitle">{{tabArr[showType-1].msg}}</div>
              <div class="tipsMsg">
                {{tabArr[showType-1].tips}}
              </div>
            </div>
          </div>
          <div class="taskList">
            <ul>
              <li v-for="(item,index) in tasksList" :key="index">
                <div class="taskMsg">
                  <div class="name">{{item.name}}</div>
                  <div class="gift">每次獎勵 <i :class="'icon'+showType"></i> x10,每天一次</div>
                  <div class="giftBar">
                    <i class="store" v-for="(item2,index2) in item.nodel" :key="index2" :class="'store'+index2"></i>
                    <span class="actLiner"></span>
                  </div>
                </div>
                <div class="status">
                  <div class="btn">去完成(1/3)</div>
                  <div class="oneLiner">
                    <div class="num">0/30</div>
                    <div class="liner">
                      <span class="numActLiner"></span>
                    </div>
                  </div>
                  <span class="share" @click="showSharePup()">已邀請X人>></span>
                </div>
              </li>
            </ul>
          </div>
          <p class="lastTips">完成任務後請盡快領取哦~任務每天0點更新</p>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showShare">
      <transition name="slide">
        <div class="sharePup" v-if="showShare">
          <i class="close" @click="closeSharePup()"></i>
          <p class="giftTips">邀請活動新玩家，每成功邀請1人獎勵 <i></i> x5</p>
          <ul class="peopleList">
            <li v-for="(item,index) in peopleList" :key="index">
              <div class="userRank">{{item.rank}}</div>
              <div class="imgBox">
                <span class="avBg" v-if="item.rank<=3"></span>
                <img v-lazy="item.avatar" alt="">
              </div>
              <div class="nick">{{item.nick}}</div>
              <div class="score">清爽值<em>{{item.score}}</em></div>
            </li>
          </ul>
          <div class="inivitBtn" @click="showPelple()"></div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showPeople">
      <transition name="slide">
        <div class="peoplePup" v-if="showPeople">
          <i class="close" @click="closePeople()"></i>
          <ul class="pList">
            <li v-for="(item,index) in peopleList" :key="index">
              <div class="userRank">{{item.rank}}</div>
              <div class="imgBox">
                <span class="avBg" v-if="item.rank<=3"></span>
                <img v-lazy="item.avatar" alt="">
              </div>
              <div class="nick">
                <div>{{item.nick}}</div>
                <div class="tips">還沒有夏日甜品屋</div>
              </div>
              <div class="shareBtn"></div>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showCreatPup">
      <transition name="slide">
        <div class="dessertsPup" :class="'creat'+creatType" v-show="showCreatPup">
          <i class="close" @click="closeCreatPup()"></i>
          <div class="creatQuyer" v-if="creatType == 1">
            <div class="title">製作確定</div>
            <div class="con">
              <div class="desserts">
                <img src="" alt="">
                <strong>夏日清爽甜品</strong>
              </div>
              <div class="creatNum">
                <div class="setNum">
                  <span class="redux"></span>
                  <input type="number" v-model="cNum" name="" id="">
                  <span class="add"></span>
                </div>
                <p class="tips">還可製作總數N份</p>
                <p class="overNum">超過可製作數量</p>
              </div>
            </div>
            <div class="creatBtn">
              <span class="cancel">取消</span>
              <span class="ok">確定</span>
            </div>
          </div>
          <div class="creatSuc" v-else-if="creatType == 2">
            <canvas id="creatAni"></canvas>
            <p class="doing">夏日清爽甜品製作中......10s</p>
          </div>
          <div class="creatIng" v-else-if="creatType == 3">
            <div class="title">製作成功</div>
            <div class="dessertsImg"></div>
            <p class="creatName">夏日清爽甜品x3</p>
            <p class="creatScore">增加清爽值：120</p>
            <div class="goPack">去背包查看</div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showType: 1,
      showTasks: false,
      showShare: false,
      showPeople: false,
      showCreatPup: false,
      creatType: 3,
      cNum: 1,
      tabArr: [
        {
          type: 1,
          msg: '水果',
          tips: '可用於製作薄荷檸檬水、卡通冰激凌、桃桃雪域、茫茫夏日綿綿冰'
        },
        {
          type: 2,
          msg: '奶製品',
          tips: '可用於製作卡通冰激凌、珍珠奶茶、桃桃雪域、茫茫夏日綿綿冰'
        },
        {
          type: 3,
          msg: '繽紛小料',
          tips: '可用於製作珍珠奶茶、桃桃雪域、茫茫夏日綿綿冰'
        }
      ],
      tasksList: [
        {
          name: '儲值任意金額',
          score: '99',
          status: '',
          nodel: [
            {

            },
            {

            },
            {

            },
          ]
        },
        {
          name: '儲值任意金額',
          score: '99',
          status: '',
        },
        {
          name: '儲值任意金額',
          score: '99',
          status: '',
        }
      ],
      peopleList: [
        {
          rank: 1,
          avatar: '',
          nick: 'xxxxxx',
          score: 55555,
        },
        {
          rank: 2,
          avatar: '',
          nick: 'xxxxxx',
          score: 55555,
        },
        {
          rank: 3,
          avatar: '',
          nick: 'xxxxxx',
          score: 55555,
        },
        {
          rank: 4,
          avatar: '',
          nick: 'xxxxxx',
          score: 55555,
        }
      ],
    }
  },
  methods: {
    tabClick(val) {
      this.showType = val
    },
    showPelple() {
      this.showPeople = true
    },
    closePeople() {
      this.showPeople = false
    },
    showSharePup() {
      this.showShare = true
    },
    closeSharePup() {
      this.showShare = false
    },
    showTask() {
      this.showTasks = true
    },
    closeTask() {
      this.showTasks = false
    },
    closeCreatPup() {
      this.showCreatPup = false
    },
    creatDesserts() {
      this.showCreatPup = true
    },
  }
}
</script>
<style lang="scss">
.list {
  width: 6.68rem;
  height: 13.81rem;
  background: url(../assets/img/listBg.png);
  background-size: 100% 100%;
  margin: 0.81rem auto 0;
  padding: 0.26rem 0.2rem 0;
  position: relative;
  > .title {
    width: 4.67rem;
    height: 1.47rem;
    background: url(../assets/img/title2.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.85rem;
    z-index: 10;
    left: 1.22rem;
  }
  .caiList {
    z-index: 10;
    li {
      width: 6.15rem;
      height: 2.69rem;
      padding: 0 0.19rem 0 0.35rem;
      background: url(../assets/img/listItem.png);
      background-size: 100% 100%;
      margin-bottom: 0.11rem;
      position: relative;
      .name {
        height: 0.92rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.4rem;
        color: rgba(57, 114, 166, 1);
        font-weight: 500;
        .score {
          width: 1.6rem;
          height: 0.34rem;
          background: rgba(158, 196, 245, 0.6);
          border-radius: 0.17rem;
          font-size: 0.26rem;
          text-align: center;
          color: #fff;
        }
      }
      .msg {
        height: 1.6rem;
        display: flex;
        align-items: center;
        img {
          width: 1.4rem;
          height: 1.4rem;
          background: red;
        }
        .deng {
          width: 0.22rem;
          height: 0.21rem;
          background: url(../assets/img/deng.png);
          background-size: 100% 100%;
          margin: 0 0.16rem;
        }
        .cai {
          width: 2.3rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          span {
            display: flex;
            align-items: center;
            position: relative;
            i {
              width: 0.37rem;
              height: 0.38rem;
              margin-right: 0.24rem;
              background: orange;
            }
          }
          span:before {
            content: "";
            display: block;
            width: 0.22rem;
            height: 0.22rem;
            background: url(../assets/img/add.png);
            background-size: 100% 100%;
            position: absolute;
            bottom: -0.23rem;
            left: 0.08rem;
          }
          span:last-child:before {
            display: none;
          }
        }
        .creatBtn {
          width: 1.86rem;
          height: 0.62rem;
          background: url(../assets/img/creat1.png);
          background-size: 100% 100%;
          text-align: center;
          font-size: 0.28rem;
          color: rgba(37, 186, 74, 1);
          line-height: 0.62rem;
          font-weight: 500;
          &.status2 {
            color: rgba(114, 0, 91, 1);
            background: url(../assets/img/creat2.png);
            background-size: 100% 100%;
          }
        }
        .overTips {
          position: absolute;
          right: 0.43rem;
          bottom: 0.23rem;
          font-size: 0.26rem;
          font-weight: 500;
        }
      }
    }
  }
  .tabs {
    width: 7.1rem;
    height: 9.68rem;
    background: url(../assets/img/tabs.png);
    background-size: 100% 100%;
    position: relative;
    padding-top: 1.51rem;
    .tabItem {
      padding: 0 0.82rem;
      display: flex;
      justify-content: space-between;
      .item {
        width: 1.54rem;
        position: relative;
        &.act {
          span {
            width: 2.23rem;
            height: 2.23rem;
            margin: -0.4rem 0 0 -0.4rem;
          }
          strong {
            margin-top: -0.1rem;
          }
        }
        &.type1 {
          span {
            background: url(../assets/img/tabs/tab1.png);
            background-size: 100% 100%;
          }
          &.act {
            span {
              background: url(../assets/img/tabs/tab1Act.png);
              background-size: 100% 100%;
            }
          }
        }
        &.type2 {
          span {
            background: url(../assets/img/tabs/tab2.png);
            background-size: 100% 100%;
          }
          &.act {
            span {
              background: url(../assets/img/tabs/tab2Act.png);
              background-size: 100% 100%;
            }
          }
        }
        &.type3 {
          span {
            background: url(../assets/img/tabs/tab3.png);
            background-size: 100% 100%;
          }
          &.act {
            span {
              background: url(../assets/img/tabs/tab3Act.png);
              background-size: 100% 100%;
            }
          }
        }
        span {
          display: block;
          width: 1.54rem;
          height: 1.54rem;
        }
        strong {
          display: block;
          text-align: center;
          font-size: 0.26rem;
          margin-top: 0.2rem;
        }
      }
    }
    .typeTips {
      width: 6.24rem;
      height: 1.53rem;
      background: url(../assets/img/tabs/tabBg.png);
      background-size: 100% 100%;
      margin: 0.16rem auto 0;
      display: flex;
      align-items: center;
      .icon {
        width: 1.47rem;
        height: 1.45rem;
        margin-top: -0.1rem;
        &.icon1 {
          background: url(../assets/img/tabs/tab1Tip.png);
          background-size: 100% 100%;
        }
        &.icon2 {
          background: url(../assets/img/tabs/tab2Tip.png);
          background-size: 100% 100%;
        }
        &.icon3 {
          background: url(../assets/img/tabs/tab3Tip.png);
          background-size: 100% 100%;
        }
      }
      .msg {
        flex: 1;
        margin-top: -0.1rem;
        padding-right: 0.2rem;
        .typeTipsTitle {
          font-size: 0.28rem;
        }
        .tipsMsg {
          font-size: 0.26rem;
          line-height: 0.3rem;
        }
      }
    }
    .taskList {
      margin: 0 auto 0;
      padding: 0 0.6rem 0 0.4rem;
      ul {
        li {
          width: 5.94rem;
          height: 1.17rem;
          background: url(../assets/img/taskItemBg.png);
          background-size: 100% 100%;
          padding: 0.1rem 0.15rem 0.25rem;
          display: flex;
          align-items: center;
          .taskMsg {
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 0.18rem;
            .name {
              font-size: 0.28rem;
              font-weight: 500;
            }
            .gift {
              font-size: 0.26rem;
              font-weight: 500;
              i {
                display: inline-block;
                width: 0.3rem;
                height: 0.3rem;
                vertical-align: bottom;
                &.icon1 {
                  background: url(../assets/img/gift/giftIcon1.png);
                  background-size: 100% 100%;
                }
                &.icon2 {
                  background: url(../assets/img/gift/giftIcon2.png);
                  background-size: 100% 100%;
                }
                &.icon3 {
                  background: url(../assets/img/gift/giftIcon3.png);
                  background-size: 100% 100%;
                }
              }
            }
            .giftBar {
              width: 2.87rem;
              height: 0.12rem;
              background: rgba(104, 179, 255, 1);
              box-shadow: 0 0.01rem 0.09rem 0 rgba(8, 78, 126, 0.38);
              border-radius: 0.06rem;
              margin-top: 0.08rem;
              position: relative;
              .store {
                display: block;
                width: 0.17rem;
                height: 0.17rem;
                background: url(../assets/img/gift/store.png);
                background-size: auto 100%;
                position: absolute;
                z-index: 10;
                top: -0.04rem;
                &.store0 {
                  left: 0.76rem;
                }
                &.store1 {
                  left: 1.7rem;
                }
                &.store2 {
                  right: 0;
                }
              }
              .actLiner {
                width: 50%;
                height: 100%;
                position: absolute;
                background: url(../assets/img/gift/actLiner.png);
                background-size: auto 100%;
                border-radius: 0.06rem;
              }
            }
          }
          .status {
            width: 1.7rem;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .btn {
              width: 1.55rem;
              height: 0.52rem;
              background: url(../assets/img/creat2.png);
              background-size: auto 100%;
              text-align: center;
              line-height: 0.52rem;
              font-size: 0.24rem;
              color: rgba(114, 0, 91, 1);
              font-weight: 600;
            }
            .oneLiner {
              text-align: center;
              .liner {
                width: 1.2rem;
                height: 0.12rem;
                background: rgba(104, 179, 255, 1);
                box-shadow: 0 0.01rem 0.09rem 0 rgba(8, 78, 126, 0.38);
                border-radius: 0.06rem;
                position: relative;
                .numActLiner {
                  display: block;
                  width: 50%;
                  height: 100%;
                  position: absolute;
                  background: url(../assets/img/gift/actLiner.png);
                  background-size: auto 100%;
                  border-radius: 0.06rem;
                }
              }
            }
            .share {
              font-size: 0.24rem;
              color: rgba(255, 21, 54, 1);
              font-weight: 600;
            }
          }
        }
      }
    }
    .lastTips {
      text-align: center;
      font-size: 0.24rem;
      margin-top: 0.7rem;
    }
  }
  .sharePup {
    width: 7.1rem;
    height: 9.55rem;
    background: url(../assets/img/shareBg.png);
    background-size: 100% 100%;
    position: relative;
    padding-top: 1.67rem;
    .giftTips {
      text-align: center;
      margin-bottom: 0.1rem;
      i {
        display: inline-block;
        width: 0.3rem;
        height: 0.3rem;
        vertical-align: middle;
        background: url(../assets/img/gift/giftIcon2.png);
        background-size: 100% 100%;
      }
    }
    .peopleList {
      height: 7.5rem;
      overflow-y: scroll;
      li {
        width: 6.37rem;
        display: flex;
        align-items: center;
        height: 1.21rem;
        margin: 0 auto;
        background: url(../assets/img/peopleListItem.png);
        background-size: 100% 100%;
        margin-bottom: 0.1rem;
        .userRank {
          width: 0.6rem;
          margin-left: 0.14rem;
          text-align: center;
          font-weight: 800;
        }
        .imgBox {
          width: 0.95rem;
          height: 0.94rem;
          margin-left: 0.15rem;
          position: relative;
          .avBg {
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
          }
          img {
            display: block;
            width: 0.8rem;
            height: 0.8rem;
            margin: 0.07rem 0 0 0.06rem;
          }
        }
        .nick {
          width: 3rem;
          color: rgba(240, 249, 254, 1);
          font-size: 0.38rem;
          font-weight: 500;
          margin-left: 0.17rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .score {
          width: 1.3rem;
          font-size: 0.24rem;
          font-weight: 500;
          em {
            font-size: 0.28rem;
            font-weight: 500;
            display: block;
          }
        }
      }
    }
    .inivitBtn {
      width: 3.66rem;
      height: 0.86rem;
      background: url(../assets/img/inivitBtn.png);
      background-size: 100% 100%;
      margin: 0.15rem auto 0;
    }
  }
  .peoplePup {
    width: 7.1rem;
    height: 9.55rem;
    background: url(../assets/img/peoplePupBg.png);
    background-size: 100% 100%;
    position: relative;
    padding-top: 1.67rem;
    li {
      width: 6.37rem;
      display: flex;
      align-items: center;
      height: 1.21rem;
      margin: 0 auto;
      background: url(../assets/img/listItembg.png);
      background-size: 100% 100%;
      margin-bottom: 0.1rem;
      .userRank {
        width: 0.6rem;
        margin-left: 0.14rem;
        text-align: center;
        font-weight: 800;
      }
      .imgBox {
        width: 0.95rem;
        height: 0.94rem;
        margin-left: 0.15rem;
        position: relative;
        .avBg {
          display: block;
          width: 100%;
          height: 100%;
          position: absolute;
        }
        img {
          display: block;
          width: 0.8rem;
          height: 0.8rem;
          margin: 0.07rem 0 0 0.06rem;
        }
      }
      .nick {
        width: 2.5rem;
        .tips {
          font-size: 0.24rem;
        }
      }
      .shareBtn {
        width: 1.82rem;
        height: 0.62rem;
        background: url(../assets/img/share1.png);
        background-size: 100% 100%;
      }
    }
  }
  .dessertsPup {
    width: 5.32rem;
    height: 4.02rem;
    background: url(../assets/img/desserts.png);
    background-size: 100% 100%;
    position: relative;
    .title {
      height: 0.94rem;
      text-align: center;
      line-height: 1.1rem;
      font-size: 0.4rem;
      font-weight: 600;
      color: rgba(41, 182, 255, 1);
    }
    .creatQuyer {
      .con {
        display: flex;
        padding: 0 0.77rem 0 0.59rem;
        height: 1.85rem;
        .desserts {
          img {
            display: block;
            width: 1.51rem;
            height: 1.51rem;
            background: red;
            margin: 0 auto;
          }
          strong {
            display: block;
            margin-top: 0.1rem;
            white-space: nowrap;
            font-size: 0.24rem;
            color: rgba(41, 182, 255, 1);
          }
        }
        .creatNum {
          margin-left: 0.65rem;
          .setNum {
            display: flex;
            width: 1.75rem;
            height: 0.52rem;
            .redux {
              width: 0.53rem;
              height: 0.52rem;
              background: url(../assets/img/reduxNum.png);
              background-size: 100% 100%;
            }
            input {
              width: 0.67rem;
              border: none;
              outline: none;
              background: #fff;
              color: rgba(59, 188, 255, 1);
              font-size: 0.4rem;
              text-align: center;
            }
            .add {
              width: 0.53rem;
              height: 0.52rem;
              background: url(../assets/img/addNum.png);
              background-size: 100% 100%;
            }
          }
          .tips {
            white-space: nowrap;
            font-size: 0.24rem;
            color: rgba(41, 182, 255, 1);
            margin-top: 0.3rem;
          }
          .overNum {
            white-space: nowrap;
            font-size: 0.24rem;
            color: rgba(255, 53, 86, 1);
          }
        }
      }
      .creatBtn {
        padding: 0 0.12rem;
        margin-top: 0.45rem;
        height: 0.67rem;
        display: flex;
        span {
          flex: 1;
          text-align: center;
          line-height: 0.67rem;
        }
        .cancel {
          color: rgba(133, 213, 254, 1);
          background: RGBA(228, 247, 254, 1);
          border-radius: 0 0 0 0.3rem;
        }
        .ok {
          background: RGBA(126, 212, 255, 1);
          border-radius: 0 0 0.3rem 0;
        }
      }
    }
    .creatSuc {
      #creatAni {
        display: block;
        width: 2.37rem;
        height: 2.37rem;
        background: red;
        margin: 0.52rem auto 0;
      }
      .doing {
        text-align: center;
        font-size: 0.24rem;
        color: rgba(89, 187, 237, 1);
        margin-top: 0.3rem;
      }
    }
    .creatIng {
      padding: 0 0.12rem;
      .dessertsImg {
        width: 1.51rem;
        height: 1.51rem;
        background: red;
        margin: 0 auto;
      }
      .creatName {
        text-align: center;
        color: rgba(89, 187, 237, 1);
        font-size: 0.24rem;
        font-weight: 500;
      }
      .creatScore {
        text-align: center;
        color: rgba(241, 92, 103, 1);
        font-size: 0.28rem;
        font-weight: bold;
      }
      .goPack {
        height: 0.69rem;
        line-height: 0.69rem;
        text-align: center;
        background: RGBA(137, 214, 254, 1);
        border-radius: 0 0 0.3rem 0.3rem;
      }
    }
    .close {
      width: 0.36rem;
      height: 0.37rem;
      top: 0.35rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
    }
  }
}
.close {
  display: block;
  width: 0.51rem;
  height: 0.51rem;
  background: url(../assets/img/close2.png);
  background-size: 100% 100%;
  position: absolute;
  right: 0.34rem;
  top: 1rem;
  z-index: 10;
}
</style>
