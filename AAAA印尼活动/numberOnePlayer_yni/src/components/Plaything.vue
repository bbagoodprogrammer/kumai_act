<template>
  <div class="taskAndRank">
    <div class="tabs">
      <a href="" @click.prevent="tabClick('playing1',0)" class="tab1" :class="{act: showCom == 'playing1'}">{{lang.tabs1}}</a>
      <a href="" @click.prevent="tabClick('playing3',2)" class="tab3" :class="{act: showCom == 'playing3'}"> {{lang.tabs2}}</a>
      <!-- <a href="" @click.prevent="tabClick('playing2',1)" class="tab2" :class="{act: showCom == 'playing2'}">{{lang.tabs3}}</a> -->
      <span class="liner"></span>
    </div>
    <keep-alive>
      <component :is="showCom"></component>
    </keep-alive>
  </div>
</template>

<script>
import playing1 from "../components/Playing1"
// import playing2 from "../components/Playing2"
import playing3 from "../components/Turntable"
import api from "../api/apiConfig"
import { mapState } from "vuex"
import lang from "../config/lang"
export default {
  components: { playing1, playing3 },
  data() {
    return {
      showCom: 'playing1'
    }
  },
  computed: {
    ...mapState(['ticketState'])
  },
  methods: {
    tabClick(val, index) {
      if (index == 1 && this.ticketState.length == 0) {
        api.ticketState().then(res => {
          const ticketState = res.data.response_data.ticket_list
          this.$store.commit('changTicketState', ticketState)
          this.showCom = val
        })
      } else {
        this.showCom = val
      }
    }
  }
}
</script>

<style lang="scss">
.taskAndRank {
  .tabs {
    height: 0.92rem;
    padding: 0 0.24rem;
    display: flex;
    justify-content: space-between;
    position: relative;
    .liner {
      display: block;
      width: 7rem;
      height: 0.08rem;
      background: url(../assets/img/mainTabLine.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.46rem;
      left: 0.24rem;
    }
    a {
      display: block;
      width: 3.5rem;
      height: 0.92rem;
      background: url(../assets/img/mainTab.png);
      background-size: 100% 100%;
      text-align: center;
      font-size: 93%;
      color: #ffd145;
      position: relative;
      z-index: 10;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      &.act {
        background: url(../assets/img/mainTabBg2.png);
        background-size: 100% 100%;
        color: #b98300;
      }
    }
  }
}
</style>