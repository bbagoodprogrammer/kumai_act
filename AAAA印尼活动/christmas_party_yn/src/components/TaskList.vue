<template>
  <div class="taskList">
    <div class="rankListCon">
      <span class="close"></span>
      <div class="rankTitle">
        <span class="day">Tugas Natal Harian</span>
        <span class="point">Poin <i></i></span>
        <span class="du">Kemajuan</span>
      </div>
      <ul>
        <li v-for="(item,index,i) in daily_tasks" :key="index" :class="{act:i %2 == 0}">
          <span class="day">
            <div>{{rankName[item.task_name]}}
              <em class="num" v-if="item.task_list.length > 1">
                <strong v-for="(item2,index2) in item.task_list" :key="index2"> <i v-if="index2 !=0">-</i> <em :class="{success:item.finish_count >= item2.counts}">{{item2.counts}}</em></strong>
              </em>
              <!-- <img src="../assets/img/taskImg.png" alt="" v-if="item.task_name== 'sendSpecialGift'"> -->
            </div>
          </span>
          <!--  <em v-if="item.task_list.length > 1">*{{item.task_list.length}}</em>  -->
          <span class="point">{{item.star}}</span>
          <span class="du">
            <span class="state">
              <span v-show="item.finish_count <item.task_count" class="nosuc"><em>{{item.finish_count}}</em>/{{item.task_count}}</span>
              <span v-show="item.finish_count == item.task_count" class="suc">Telah mencapai </span>
              <b v-if="item.task_list.length > 1" @click="showWhole(item.finish_count,item.task_list)">Cek semua</b>
            </span>
          </span>
        </li>
      </ul>
    </div>
    <transition name="slide">
      <div class="whole" v-if="wholePup">
        <div class="wholeCon">
          <span class="close" @click="closeWholePup()"></span>
          <div class="title">Tahap saat ini</div>
          <div class="intrgral">
            <span>0</span>
            <span v-for="(item,index) in nowTask_list" :key="index">
              {{item.send_counts}}
            </span>
          </div>
          <div class="line">
            <div class="actLine" :style="{width:lineWidth}"></div>
            <span v-for="(item,index) in 4" :key="index" :class="['item'+item,{act:(sucStep+1)>=index || index== 0}]">
            </span>
          </div>
          <div class="count">
            <span>0</span>
            <span v-for="(item,index) in nowTask_list" :key="index">
              {{item.counts}}
            </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      rankName: {
        login: "Login halaman acara",
        publicWork: "Publikasikan 1 nyanyian secara publik pada hari ini ",
        last_publicWork: "Nyanyian publik apapun yang dipublikasikan pada sehari sebelumnya belum dihapus",
        praise: "Untuk nyanyian yang beda klik kali like",
        share: "Share nyanyian yang publik ke situs web lain",
        online: "Stay di kamar karaoke lebih dari 15 menit pada hari ini",
        kmic_start: "Bernyanyi 1 kali di kamar karaoke apapun pada hari ini",
        sendBean: "Sawer kacang emas kepada nyanyian/kamar karaoke pada hari ini",
        charge: "Hari ini total top up koin emas mencapai",
        sendCoin: "Hari ini total memberikan hadiah dengan koin emas kepada nyanyian/kamar karaoke mencapai",
        // praise: "給10個不同的作品點讚",
      },
      wholePup: false,
      nowTask_list: [],
      finish_count: 0
    }
  },
  computed: {
    ...mapState(["daily_tasks"]),
    lineWidth() {
      return (this.finish_count / this.nowTask_list[this.nowTask_list.length - 1].counts) * 100 + '%'
    },
    sucStep() {
      for (var i = this.nowTask_list.length - 1; i >= 0; i--) {
        if (this.finish_count >= this.nowTask_list[i].counts) {
          return i
        }
      }
      return -1
    }
  },
  methods: {
    showWhole(finish_count, task_list) {
      this.nowTask_list = task_list
      this.finish_count = finish_count
      this.wholePup = true
    },
    closeWholePup() {
      this.wholePup = false
    }
  }
}
</script>
<style lang= "scss" scoped>
.rankListCon:after {
  position: absolute;
  left: 0;
  top: -0.2rem;
  left: 0.6rem;
  content: "";
  width: 0;
  height: 0;
  border-left: 0.3rem solid transparent;
  border-right: 0.3rem solid transparent;
  border-bottom: 0.2rem solid #ffae00;
}
.rankListCon {
  width: 6.83rem;
  /* height: 7.32rem; */
  border: 0.04rem solid #ffae00;
  border-radius: 0.06rem;
  margin: 0.44rem auto;
  position: relative;
  .rankTitle {
    height: 0.7rem;
    display: flex;
    color: #ffd88c;
    text-align: center;
    line-height: 0.7rem;
    background: #ee525a;
    .day {
      width: 4.8rem;
      text-align: left;
      padding-left: 0.14rem;
    }
    .point {
      width: 0.7rem;
    }
    .du {
      flex: 1;
    }
  }
  li {
    display: flex;
    min-height: 0.6rem;
    background: #d3495c;
    display: flex;
    align-items: center;
    text-align: center;
    color: #fff8e0;
    font-size: 80%;
    padding: 0.05rem 0;
    em {
      font-size: 80%;
    }
    &.act {
      background: #dc536b;
    }
    .day {
      width: 4.8rem;
      text-align: left;
      padding-left: 0.14rem;
    }
    .point {
      width: 0.7rem;
    }
    .du {
      flex: 1;
      .nosuc {
        em {
          font-size: 100%;
        }
      }
      b {
        display: block;
        font-size: 80%;
        color: #ffae00;
        white-space: nowrap;
        text-decoration: underline;
      }
    }
  }
}
.whole {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  .wholeCon {
    width: 5.49rem;
    height: 2.56rem;
    background: rgba(234, 71, 78, 1);
    border: 0.04rem solid rgba(255, 196, 130, 1);
    border-radius: 0.4rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title {
      font-size: 120%;
      color: #ffefd7;
      text-align: center;
      margin-top: 0.2rem;
    }
    .close {
      display: block;
      width: 0.5rem;
      height: 0.5rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: -0.9rem;
    }
    .intrgral {
      margin: 0.28rem auto 0;
      width: 4.29rem;
      display: flex;
      position: relative;
      color: #ffd08c;
      font-size: 80%;
      span {
        text-align: left;
      }
      span:nth-child(1) {
        width: 1.41rem;
        text-indent: 0.1rem;
      }
      span:nth-child(2) {
        width: 1.41rem;
        text-indent: 0.1rem;
      }
      span:nth-child(3) {
        width: 1.41rem;
        text-indent: 0.2rem;
      }
    }
    .count {
      margin: 0.28rem auto 0;
      width: 4.29rem;
      display: flex;
      position: relative;
      font-size: 80%;
      span {
        text-align: left;
      }
      span:nth-child(1) {
        width: 1.41rem;
        text-indent: 0.1rem;
      }
      span:nth-child(2) {
        width: 1.41rem;
        text-indent: 0.1rem;
      }
      span:nth-child(3) {
        width: 1.41rem;
        text-indent: 0.2rem;
      }
    }
    .line {
      width: 4.29rem;
      height: 0.12rem;
      background: rgba(165, 58, 64, 1);
      border-radius: 0.06rem;
      margin: 0.23rem auto;
      position: relative;
      .actLine {
        width: 6rem;
        height: 0.12rem;
        position: absolute;
        left: 0;
        top: 0;
        background: #ffd08c;
        z-index: 10;
        border-radius: 0.06rem;
      }
      span {
        display: block;
        width: 0.33rem;
        height: 0.33rem;
        border-radius: 50%;
        background: #a53a40;
        position: absolute;
        top: -0.1rem;
        z-index: 10;
        &.act {
          background: #ffd08c;
        }
        &.item1 {
          left: 0;
        }
        &.item2 {
          left: 1.41rem;
        }
        &.item3 {
          left: 2.82rem;
        }
        &.item4 {
          right: 0rem;
        }
      }
    }
  }
}
</style>
