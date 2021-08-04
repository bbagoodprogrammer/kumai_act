<template>
  <div class="explain">
    <div class="explainMsg1">
      貴族是尊貴身份的彰顯，分為游俠、騎士、子爵、伯爵、侯爵、公爵6個等級，自然月內消費金幣達到條件即獲得貴族，享有眾多專屬特權。
    </div>
    <div class="tableTitle">
      <strong>貴族等級</strong>
      <i></i>
    </div>
    <div class="lvList">
      <div class="lvHeader">
        <span>貴族</span>
        <span>貴族值要求</span>
        <span>擁有特權</span>
      </div>
      <ul>
        <li v-for="(item,index) in lvConfig" :key="index" :class="{black:index%2 ==0 }">
          <div class="lvMsg">
            <div class="icon" :class="'icon' + item.lv"></div>
            <div class="name">{{item.name}}</div>
          </div>
          <div class="score"><em>{{item.score}} </em>萬</div>
          <div class="nums"><em>{{item.privilegeNums}}</em>個</div>
        </li>
      </ul>
    </div>
    <div class="tableTitle">
      <strong>貴族升級</strong>
      <i></i>
    </div>
    <div class="upgradeMsg">
      <p>1、每個自然月1號開始累積貴族值，應用內每消費1金幣增加1點貴族值，贈送背包禮物、特殊活動消費的金幣不算入，贈送幸運星禮物消費1金幣=0.8貴族值，21點下注消費金幣1金幣=0.2貴族值；參與官方活動玩法時，消耗1金幣=0.05～0.1貴族值；</p>
      <p>2、當月達成貴族即獲得對應的特權，並保留至下個月月底；當月升級貴族則特權獎勵及時生效；當月達成貴族比上月低則月底結算後降級處理；</p>
      <p>3、獲得的虛擬物品獎勵有效時間與貴族有效時間一致，同類型獎勵升級貴族時將替換升級獎勵。</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lvConfig: [
        {
          lv: 6,
          score: "300",
          privilegeNums: 9,
          name: '公爵'
        },
        {
          lv: 5,
          score: "150",
          privilegeNums: 8,
          name: '侯爵'
        },
        {
          lv: 4,
          score: "80",
          privilegeNums: 6,
          name: '伯爵'
        },
        {
          lv: 3,
          score: "30",
          privilegeNums: 4,
          name: '子爵'
        },
        {
          lv: 2,
          score: "10",
          privilegeNums: 3,
          name: '騎士'
        },
        {
          lv: 1,
          score: "2",
          privilegeNums: 2,
          name: '游俠'
        }
      ]
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