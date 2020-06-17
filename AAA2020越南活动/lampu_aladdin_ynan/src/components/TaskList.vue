<template>
  <div class="taskList">
    <div class="rankListCon">
      <div class="rankTitle">
        <span class="day">Nhiệm vụ ngày</span>
        <span class="point">Pháp lực </span>
        <span class="du">Tiến độ</span>
      </div>
      <ul>
        <li v-for="(item,index) in daily_tasks" :key="index">
          <span class="day">
            <div>{{item.desc}}</div>
          </span>
          <span class="point">{{item.chance}}</span>
          <span class="du">
            <span class="state">
              <span v-show="item.schule <item.limit" class="nosuc"> <em>{{item.schule}}</em>/{{item.limit}}</span>
              <span v-show="item.schule == item.limit" class="suc">Đã xong </span>
            </span>
          </span>
        </li>
      </ul>
    </div>
    <div class="listBtn"></div>
    <div class="stored">
      <div class="av">
        <span class="defaluteAV"></span>
        <img v-lazy="av" class="userAv" alt="">
      </div>
      <div class="storedMsg">
        <div class="title">Nhiệm vụ nạp</div>
        <div class="tips">Mỗi 30 xu nạp nhận 10 pháp lực </br>Hôm nay đã nạp {{charge}} xu</div>
      </div>
      <div class="storeBtn" @click="goStore()">Nạp ngay</div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      finish_count: 0
    }
  },
  computed: {
    ...mapState(["daily_tasks", "av", "charge"])
  },
  methods: {
    goStore() {
      location.href = "walletConfig://"
    }
  }
}
</script>
<style lang= "scss" scoped>
.rankListCon {
  width: 7.05rem;
  /* height: 7.32rem; */
  margin: 0 auto;
  position: relative;
  background: url(../assets/img/listBg.png);
  background-size: 100% auto;
  .rankTitle {
    height: 0.6rem;
    display: flex;
    color: #3a1000;
    text-align: center;
    line-height: 0.7rem;
    font-size: 0.24rem;
    white-space: nowrap;
    padding: 0 0.21rem 0 0.41rem;
    font-weight: 600;
    .day {
      width: 4.2rem;
      text-align: left;
    }
    .point {
      width: 1.2rem;
    }
    .du {
      flex: 1;
    }
  }
  li {
    display: flex;
    min-height: 0.5rem;
    display: flex;
    align-items: center;
    text-align: center;
    color: #784114;
    font-size: 0.24rem;
    padding: 0.05rem 0.21rem 0 0.41rem;
    font-weight: 600;
    text-align: center;
    position: relative;
    em {
      font-size: 80%;
    }
    .day {
      width: 4.2rem;
      text-align: left;
    }
    .point {
      width: 1.2rem;
    }
    .du {
      flex: 1;
      .nosuc {
        font-size: 0.24rem;
        em {
          color: #ff7132;
          font-size: 0.24rem;
        }
      }
      .suc {
        color: #ff7132;
        white-space: nowrap;
      }
    }
  }
  li:last-child::before {
    display: none;
  }
  li:before {
    content: "";
    display: block;
    width: 6.09rem;
    height: 0.06rem;
    opacity: 0.48;
    background: #e4b758;
    position: absolute;
    bottom: 0;
  }
}
.listBtn {
  width: 7.05rem;
  height: 0.59rem;
  margin: 0 auto;
  background: url(../assets/img/listBtn.png);
  background-size: 100% 100%;
}
.stored {
  height: 1.5rem;
  display: flex;
  align-items: center;
  .av {
    width: 0.75rem;
    height: 0.75rem;
    position: relative;
    margin: 0 0.1rem 0 0.2rem;
    .userAv {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .defaluteAV {
      display: block;
      width: 0.75rem;
      height: 0.75rem;
      background: url(../assets/img/userAvDefault.png);
      background-size: 100% 100%;
      position: absolute;
    }
  }
  .storedMsg {
    .title {
      font-weight: 700;
    }
    .tips {
      color: #ffc274;
      font-weight: 500;
      font-size: 0.24rem;
      line-height: 0.25rem;
    }
  }
  .storeBtn {
    width: 2.14rem;
    height: 0.66rem;
    background: url(../assets/img/storeBtn.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.66rem;
    font-size: 0.24rem;
    color: #fdf144;
    margin-left: 0.5rem;
  }
}
</style>
