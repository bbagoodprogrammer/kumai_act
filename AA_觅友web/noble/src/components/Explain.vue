<template>
  <div class="explain">
    <div class="explainMsg1">
      {{lang.explainTips}}
    </div>
    <div class="tableTitle">
      <strong>{{lang.explainTitle}}</strong>
      <i></i>
    </div>
    <div class="lvList">
      <div class="lvHeader">
        <span>{{lang.explainLvHeader1}}</span>
        <span>{{lang.explainLvHeader2}}</span>
        <span>{{lang.explainLvHeader3}}</span>
      </div>
      <ul>
        <li v-for="(item,index) in lvConfig" :key="index" :class="{black:index%2 ==0 }">
          <div class="lvMsg">
            <div class="icon" :class="'icon' + item.lv"></div>
            <div class="name">{{item.name}}</div>
          </div>
          <div class="score"><em>{{item.score}} </em>{{lang.thousand}}</div>
          <div class="nums"><em>{{item.privilegeNums}}</em>{{lang.num}}</div>
        </li>
      </ul>
    </div>
    <div class="tableTitle">
      <strong>{{lang.explainTipsListTitle}}</strong>
      <i></i>
    </div>
    <div class="upgradeMsg">
      <p>{{lang.explainTipsList1}}</p>
      <p>{{lang.explainTipsList2}}</p>
      <p>{{lang.explainTipsList3}}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    lvConfig () {
      return this.lang.lvConfig
    }
  }
}
</script>

<style lang="scss" scoped>
.explain {
  padding: 0.3rem 0.3rem 0.84rem;
  .explainMsg1 {
    font-size: 0.24rem;
    color: rgba(255, 255, 255, 0.4);
    line-height: 0.44rem;
  }
  .tableTitle {
    height: 0.42rem;
    margin-top: 0.67rem;
    position: relative;
    strong {
      position: absolute;
      font-weight: bold;
      color: #FFC86D;
      z-index: 2;
    }
    i {
      display: block;
      width: 1.3rem;
      height: 0.14rem;
      background: linear-gradient(90deg, #795F35, #181B23);
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
  .lvList {
    margin-top: 0.2rem;
    .lvHeader {
      height: 0.9rem;
      display: flex;
      align-items: center;
      span {
        height: 100%;
        line-height: 0.9rem;
        flex: 1;
        text-align: center;
        font-size: 0.24rem;
        color: rgba(255, 255, 255, 0.5);
      }
    }
    ul {
      li {
        height: 1.85rem;
        display: flex;
        align-items: center;
        justify-content: center;
        > div {
          flex: 1;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lvMsg {
          flex-direction: column;
          .icon {
            width: 1.15rem;
            height: 0.89rem;
            &.icon6 {
              background: url(../img/lv/lv6.png);
              background-size: 100% 100%;
            }
            &.icon5 {
              background: url(../img/lv/lv5.png);
              background-size: 100% 100%;
            }
            &.icon4 {
              background: url(../img/lv/lv4.png);
              background-size: 100% 100%;
            }
            &.icon3 {
              background: url(../img/lv/lv3.png);
              background-size: 100% 100%;
            }
            &.icon2 {
              background: url(../img/lv/lv2.png);
              background-size: 100% 100%;
            }
            &.icon1 {
              background: url(../img/lv/lv1.png);
              background-size: 100% 100%;
            }
          }
          .name {
            font-size: 0.26rem;
            color: rgba(255, 255, 255, 0.6);
            margin-top: 0.14rem;
          }
        }
        .score,
        .nums {
          font-size: 0.24rem;
          color: rgba(255, 255, 255, 0.4);
          em {
            font-size: 0.4rem;
            color: #FFC86D;
            font-weight: 600;
            margin-right: 0.11rem;
          }
        }
        &.black {
          background: #1E212C;
        }
      }
    }
  }
  .upgradeMsg {
    margin-top: 0.43rem;
    p {
      margin-bottom: 0.4rem;
      font-size: 0.28rem;
      line-height: 0.5rem;
      color: rgba(255, 255, 255, 0.6);
    }
    p:last-child {
      margin: 0;
    }
  }
}
</style>