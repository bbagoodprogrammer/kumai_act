<template>
  <div class="page pageRule rule">
    <div class="container">
      <p class="title">活動時間</p>
      <p class="tip pb36">
        <span class="starttime">{{ stime }}</span> -
        <span class="endtime">{{ etime }}</span>
      </p>
      <p class="title">活動說明</p>
      <ul>
        <li>
          <p>
            1.
            活動期間內用戶可在該活動頁面通過金豆購買抽獎機會，每天限量15次抽獎機會
          </p>
        </li>
        <li>
          <p>
            2. 通過“換一批”可選擇不同檔次的抽獎獎品；點擊“抽獎
            GO”可單次抽獎，點擊“連抽5次”可一次性連續抽獎5次~
          </p>
        </li>
        <li>
          <p>
            3.
            金幣、金豆、背包禮物、頭像框、座駕獎勵立即抽中後立即到賬，消費返利券和儲值返利券的金幣獎勵次日到賬
          </p>
        </li>
        <li>
          <p>
            4.
            儲值返利券使用說明：獲獎當天儲值任意金幣，在次日可獲得對應的金幣返利（不可疊加返利比例）。若一天同時獲得多張儲值返利券，按照所獲得的儲值返利券的最高比例來返利。返利券僅獲得當天有效
          </p>
        </li>
        <li>
          <p>
            5.
            金幣消費返利券使用說明：獲得當天消費滿一定金幣，在次日獲得對應的金幣返利，一張券只可以返利一次。若一天同時獲得多張金幣消費返利券，按照所獲得的金幣消費返利券的最大面額來返還，返利券僅獲得當天有效
          </p>
        </li>
        <li><p>6.本活動和蘋果公司無關</p></li>
        <li><p>7.活動送出的所有背包禮物有效期均為7天</p></li>
      </ul>
      <p class="copy">該活動最終解釋權歸活動主辦方所有</p>
    </div>
  </div>
</template>

<script>
import { getTimeObj } from "../../utils";
export default {
  data() {
    return {
      tab: 1,
      mainTab: 0,
      stime: 0,
      etime: 0,
    };
  },
  created() {
    this.stime = this.lang.time
      .replace("%y", getTimeObj(this.$route.query.stime).year)
      .replace("%mo", getTimeObj(this.$route.query.stime).month)
      .replace("%d", getTimeObj(this.$route.query.stime).day)
      .replace("%h", getTimeObj(this.$route.query.stime).hour)
      .replace("%m", getTimeObj(this.$route.query.stime).minute)
      .replace("%s", getTimeObj(this.$route.query.stime).second);
    this.etime = this.lang.time
      .replace("%y", getTimeObj(this.$route.query.etime).year)
      .replace("%mo", getTimeObj(this.$route.query.etime).month)
      .replace("%d", getTimeObj(this.$route.query.etime).day)
      .replace("%h", getTimeObj(this.$route.query.etime).hour)
      .replace("%m", getTimeObj(this.$route.query.etime).minute)
      .replace("%s", getTimeObj(this.$route.query.etime).second);
  },
  methods: {
    mainTabClick(tab) {
      this.mainTab = tab;
    },
  },
};
</script>


<style lang="scss">
.pageRule {
  background: #fffdec;
  .container {
    padding: 0.24rem;
    .title {
      font-size: 0.32rem;
      color: #ff8022;
      padding-bottom: 0.16rem;
    }
    .tip {
      font-size: 0.28rem;
      color: #333;
    }
    .pb36 {
      padding-bottom: 0.36rem;
    }
    ul {
      li {
        padding-bottom: 0.28rem;
        p {
          font-size: 0.28rem;
          line-height: 0.4rem;
          color: #333;
        }
      }
    }
  }
  .copy {
    font-size: 0.28rem;
    padding: 0.12rem 0 1.08rem;
    text-align: center;
  }
}
</style>