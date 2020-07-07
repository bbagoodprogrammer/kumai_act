<template>
  <div class="cards">
    <div class="light" v-if="showLinght"></div>
    <div class="cardItems">
      <cardItem v-for="(item,index) in newReword" :key="index" :item="item" />
    </div>
  </div>
</template>
<script>
import cardItem from "../components/CardItem"
import { mapState } from "vuex"
export default {
  components: { cardItem },
  data() {
    return {
      showT: false,
      imgindex: 0,
      timer: null,
      showAm: false,
      defalute: [     //默認刮獎狀態
        { posi: 1 },
        { posi: 2 },
        { posi: 3 },
        { posi: 4 },
        { posi: 5 },
        { posi: 6 },
        { posi: 7 },
        { posi: 8 },
        { posi: 9 },
      ]
    }
  },
  computed: {
    ...mapState(['my_record', 'showLinght']),
    newReword() {
      return this.mergeArr('posi', this.defalute, this.my_record)
    }
  },
  methods: {
    mergeArr(prop, ...arr) {
      if (!prop || !arr) return [];
      const map = {};
      arr.forEach(item => {
        item.forEach(info => {
          if (!info) return;
          const id = info[prop];
          map[id] = { ...map[id], ...info }
        })
      })
      return Object.keys(map).map(key => map[key])
    }
  }
}
</script>
<style lang="scss" scoped>
.cards {
  width: 5.93rem;
  height: 5.93rem;
  background: url(../assets/img/cardsBg.png);
  background-size: 100% 100%;
  margin: 0 auto;
  padding: 0.54rem 0.45rem;
  position: relative;
  overflow: hidden;
  // position: relative;
  .light {
    width: 6.67rem;
    height: 7.53rem;
    position: absolute;
    top: -753px;
    left: 0;
    background: url(../assets/img/light.png);
    background-size: 100% 100%;
    animation: late 1s linear infinite;
  }
  @keyframes late {
    to {
      top: 200px;
    }
  }
}
</style>
