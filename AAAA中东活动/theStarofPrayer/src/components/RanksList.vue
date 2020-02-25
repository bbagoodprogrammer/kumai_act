<template>
  <div class="ranks">
    <div class="tabBox">
      <a href="" class="giftGivingRank" :class="{active:showCom === 'giving'}" @click.prevent="changTab('giving')">قائمة المصباح السحري </a>
      <a href="" class="receivingGifts" :class="{active:showCom === 'receiving'}" @click.prevent="changTab('receiving')">قائمة النذر</a>
    </div>
    <component :is="showCom" keep-alive></component>
  </div>
</template>

<script>
import giving from "../components/GivingRank"
import receiving from "../components/ReceivingRank"
import api from "../api/apiConfig"
import { mapState } from 'vuex'
export default {
  components: { giving, receiving },
  data() {
    return {
      showCom: 'giving',
      first: true,
      isMore: true,
      load1: false,
      load2: false
    }
  },
  watch: {
    showCom(val) {
      this.$store.commit('changNowTab', this.showCom)
    }
  },
  computed: {
    ...mapState(['songliRank', 'shouliRank'])
  },
  methods: {
    changTab(val) {
      if (val === 'receiving' && this.first) { //第一次切换榜单
        api.songliRank('send', 0).then((res) => {
          var songliRank = res.data.response_data.user_rank
          var songliMsg = res.data.response_data.owner_msg
          this.$store.commit('changSongliRank', songliRank)
          this.$store.commit('changSongliMsg', songliMsg)
          this.first = false
          this.showCom = val
        })
      } else {
        this.showCom = val
      }
    },
    onScroll() { //滾動加載
      const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
      if (scrollToBottom) { //加載更多合併數組存入vuex
        if (this.showCom === "giving" && this.isMore && this.shouliRank.length >= 20 && !this.load1) {
          this.isMore = false
          var from = this.shouliRank.length
          api.songliRank('receiver', from, 'more').then((res) => {
            this.isMore = true
            var newArr = res.data.response_data.user_rank
            var fArr = this.shouliRank
            if (newArr.length > 0) {
              fArr = fArr.concat(newArr)
              this.$store.commit('changShouliRank', fArr)
            } else {
              this.load1 = true
            }
          })
        } else if (this.showCom === "receiving" && this.isMore && this.songliRank.length >= 20 && !this.load2) {
          this.isMore = false
          var from = this.songliRank.length
          api.songliRank('send', from, 'more').then((res) => {
            this.isMore = true
            var newArr = res.data.response_data.user_rank
            var fArr = this.songliRank
            if (newArr.length > 0) {
              fArr = fArr.concat(newArr)
              this.$store.commit('changSongliRank', fArr)
            } else {
              this.load2 = true
            }
          })
        }
      }
    }
  },
  mounted() {
    if (this.isShare) return
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
  },
}
</script>

<style lang="scss">
.ranks {
  padding-bottom: 1.5rem;
}
.tabBox {
  width: 6.75rem;
  height: 0.9rem;
  margin: 0.45rem auto 0;
  padding: 0 0.1rem;
  background: url(../assets/img/tabBg.png) no-repeat;
  background-size: contain;
  display: flex;
  a {
    display: inline-block;
    width: 3.51rem;
    height: 0.76rem;
    text-align: center;
    line-height: 0.76rem;
    color: #d5bdff;
    margin-top: 0.07rem;
    &.active {
      background: url(../assets/img/tabItemBg.png);
      background-size: 100% 100%;
      color: #fff;
    }
  }
}
</style>