<template>
  <div class="ruleMsg">
    <div class="tm">活動時間：{{aTimer}}</div>
    <h6>活動玩法</h6>
    <p>
      1、每期開放一個海島，玩家完成島上的指定任務可以獲得海螺，海螺可用於兌換鐵鏟子挖寶，每天最多可以兌換10個鐵鏟子<br />
      2、玩家亦可使用金幣兌換金鏟子挖寶，每日金鏟子兌換鏟子次數不限<br />
      3、每次使用鏟子挖寶都可以增加島主潛力，在海島關閉時，島主總榜中，島主潛力最高的玩家成為本期島主（島主潛力相同時，先達到的玩家優先排序），獲得島主獎勵：黃金海島島主-認證（15天）、我是島主-頭像框（10天）、燈塔島-特效禮物*1（有效期7天），第二-三名：燈塔島-特效禮物*1（有效期7天）
    </p>
    <div class="giftList">
      <div class="giftItem" v-for="(item,index) in gift" :key="index">
        <div class="imgBox">
          <img :src="item.img" alt="">
        </div>
        <strong>{{item.name}}</strong>
      </div>
    </div>
    <h6>挖寶獎勵</h6>
    <img src="./img/table1.png" alt="" class="table">
    <img src="./img/table2.png" alt="" class="table">
    <p>*若用金鏟子挖寶600次均沒有挖到最佳現場-背包禮物，在第601次必中</p>
    <p>*活動中送出背包禮物的有效期均為7天</p>
    <h6>其他 </h6>
    <p>-活動中，若發現玩家用不正當手段參與活動，小音有權在不事先通知的情況下按情節嚴重對參與玩家、違規者取消上榜資格、封禁帳號、收回該玩家所有獎勵等處罰，包括但不限於：<br />
      a）活動期間對參與玩家惡意評論、造謠、影射等<br />
      b）非法獲得金幣或指定禮物<br />
    </p>
    <p> -次活動與蘋果公司無關 </p>
    <p> *活動最終解釋權歸主辦方所有</p>
  </div>
</template>

<script>

import getDate from "../../utils/getDate"
import { mapState } from "vuex"
export default {
  data () {
    return {
      gift: [
        {
          name: '黃金海岸島主-認證',
          img: require("../../img/ruleImg/gift1.png")
        },
        {
          name: '我是島主-頭像框',
          img: require("../../img/ruleImg/gift2.png")
        },
        {
          name: '燈塔島-特效禮物',
          img: require("../../img/ruleImg/gift3.png")
        }
      ]
    }
  },
  computed: {
    ...mapState(['activity']),
    aTimer () {
      if (AREA == 'tw') {
        return getDate(new Date(this.activity.stime * 1000), 1) + '-' + getDate(new Date(this.activity.etime * 1000), 1)
      } else if (AREA == 'vn') {
        return getDate(new Date(this.activity.stime * 1000), 2) + '-' + getDate(new Date(this.activity.etime * 1000), 2)
      }

    }
  }
}
</script>

<style lang="scss">
body {
  background: #FFE3A6 !important;
  .ruleMsg {
    padding: 0.48rem 0.29rem;
  }
  .giftList {
    padding: 0 0.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.2rem 0;
    .giftItem {
      width: 2.2rem;
    }
    .imgBox {
      width: 1.88rem;
      height: 1.88rem;
      background: url(./img/imgBox.png);
      background-size: 100% 100%;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    strong {
      width: 100%;
      display: block;
      text-align: center;
      font-size: 0.26rem;
      color: #7D3F0A;
    }
  }
  .tm {
    text-align: center;
    color: #A67247;
    margin-bottom: 0.29rem;
  }
  h6 {
    color: #7D3F0A;
    font-size: 0.28rem;
    font-weight: bold;
  }
  p {
    color: #A67247;
    font-size: 0.28rem;
  }
  .table {
    display: block;
    width: 5.85rem;
    height: 3.98rem;
    margin: 0.29rem auto;
  }
}
</style>