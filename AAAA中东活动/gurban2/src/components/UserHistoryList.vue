<template>
  <div class="historyList">
    <div class="historyListCon">
      <a href="" class="cloas" @click.prevent="cloas()"></a>
      <p>مظروفي الأحمر</p>
      <ul class="listBox scrollable">
        <li v-for="(item,index) in historyList" :key="index">
          <span class="tm">{{item.tm}}</span>
          <span class="luckBox">
            <span class="luck" v-if="item.is_lucky == 1">أفضل الحظ <i></i></span>
          </span>
          <span class="coins">{{item.coins}} عملة ذهبية</span>
        </li>
        <!-- <li>
          <span class="tm">2019/8/08</span>
          <span class="luck">أفضل الحظ <i></i></span>
          <span class="coins">عملة ذهبية 99</span>
        </li> -->
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from "../api/apiConfig"
export default {
  data() {
    return {
      more: true,
      loaded: false
    }
  },
  computed: {
    ...mapState(['historyList'])
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.getHistory(this.historyList.length).then(res => {
            this.more = true
            if (res.data.response_data.record.length === 0) {
              this.loaded = true
            } else {
              this.$store.commit('addHistoryList', res.data.response_data.record)
            }
          })
        }
      }
    },
    cloas() {
      this.$emit('cloasList')
    }
  }
}
</script>
<style scoped lang="scss">
.historyList {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: RGB(0, 0, 0, 0.8);
  .historyListCon {
    width: 4.9rem;
    height: 6.39rem;
    padding: 0.29rem 0.32rem 0;
    background: url(../assets/img/makeListBg.png) no-repeat;
    background-size: contain;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    p {
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 80%;
      color: #fff562;
      font-weight: bold;
      text-align: center;
    }
    .listBox {
      margin-top: 0.1rem;
      max-height: 5rem;
      padding-left: 0.15rem;
      overflow: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      li {
        height: 0.74rem;
        border-bottom: 0.01rem solid #ff8e33;
        display: flex;
        align-items: center;
        font-size: 80%;
        color: #ffdc4f;
        .tm {
          width: 1.5rem;
          color: #fff;
        }
        .luckBox {
          width: 1.6rem;
          .luck {
            width: 1.6rem;
            display: flex;
            align-items: center;
            i {
              display: block;
              width: 0.3rem;
              height: 0.28rem;
              background: url(../assets/img/star.png);
              background-size: 100% 100%;
            }
          }
        }

        .coins {
          flex: 1;
        }
      }
    }
    .listBox::-webkit-scrollbar {
      width: 0.06rem;
      background: #b03e00;
    }
    .listBox::-webkit-scrollbar-thumb {
      background: #fec203;
    }
  }
  .cloas {
    display: block;
    width: 0.54rem;
    height: 0.54rem;
    background: url(../assets/img/cloas.png) no-repeat;
    background-size: contain;
    position: absolute;
    top: -0.8rem;
    right: 0rem;
  }
}
</style>
