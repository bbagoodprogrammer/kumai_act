<template>
  <div class="result">
    <div class="resultCon">
      <i href="" class="close" @click="closeResult()"></i>
      <p class="titale">Kết quả</p>
      <p class="tips">Nếu 3 xúc xắc cùng điểm, đặt lớn nhỏ chẵn lẻ đều bị trừ điểm đặt</p>
      <div class="listToby">
        <span class="time">Thời gian đặt</span>
        <span class="openres">Kết quả</span>
        <span class="down">Tình hình đặt</span>
        <span class="wd">điểm thắng</span>
      </div>
      <ul class="scrollable">
        <li v-for="(item,index) in bettingRecord" :key="index">
          <span class="time">{{item.tm}}</span>
          <span class="openres" v-if="item.dices.length >0">{{(item.dices).join(',')}}</span>
          <span class="openres" v-else>???</span>
          <span class="down">
            <em v-for="(item,key,index) in item.bets" :key="index">{{lang([item.key])}} : {{item.b}}</em>
          </span>
          <span class="wd" v-if="item.dices.length >0" :class="{win:item.b > 0}"><i v-if="item.b > 0">+</i>{{item.b}}</span>
          <span class="wd2" v-else>?</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import result from "../config/lang"
import api from '../api/apiConfig'
export default {
  data() {
    return {
      more: true,
      loaded: false
    }
  },
  computed: {
    ...mapState(['bettingRecord'])
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
          api.bettingRecord(this.bettingRecord.length).then((res) => {
            this.more = true
            if (res.data.response_data.record.length === 0) {
              this.loaded = true
            } else {
              this.$store.commit('addBettingRecord', res.data.response_data.record)
            }
          })
        }
      }
    },
    lang(val) {
      return result[val[0]]
    },
    closeResult() {
      this.$emit('closeResult')
    }
  }
}
</script>
<style lang="scss">
.result {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  .resultCon {
    width: 6.8rem;
    padding: 0.52rem 0.2rem;
    background-color: #0f2123;
    position: absolute;
    top: 2.8rem;
    left: 50%;
    transform: translate(-50%, 0);
    .close {
      display: block;
      width: 0.62rem;
      height: 0.62rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: -1rem;
      right: 0rem;
    }
    .titale {
      font-size: 160%;
      color: #ffde5c;
      font-weight: bold;
      text-align: center;
    }
    .tips {
      font-size: 80%;
      color: #22808a;
      text-align: center;
      margin-top: 0.2rem;
    }
    .listToby {
      height: 0.74rem;
      line-height: 0.74rem;
      margin-top: 0.15rem;
      color: #22808a;
      display: flex;
      font-size: 90%;
      text-align: center;
      border-bottom: 0.01rem solid #205c63;
      white-space: nowrap;
      span {
        margin-left: 0.08rem;
      }
      .time {
        width: 1.77rem;
      }
      .openres {
        width: 0.98rem;
      }
      .down {
        width: 1.9rem;
        padding-left: 0.45rem;
      }
      .wd {
        flex: 1;
        word-wrap: break-word;
        word-break: normal;
      }
    }
    ul {
      height: 6rem;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch; //有回弹效果
      -webkit-overflow-scrolling: auto; //滑到哪停到哪
      li {
        min-height: 1rem;
        padding: 0.1rem 0;
        display: flex;
        align-items: center;
        font-size: 80%;
        text-align: center;
        color: #f3ef75;
        border-bottom: 0.01rem solid #205c63;
        span {
          margin-left: 0.08rem;
        }
        .time {
          width: 1.77rem;
        }
        .openres {
          width: 0.98rem;
        }
        .down {
          width: 2.85rem;
          em {
            display: block;
            width: 100%;
            font-size: 80%;
          }
        }
        .wd {
          flex: 1;
          color: #3bffa5;
          &.win {
            color: #ff632d;
          }
          i {
            font-size: 80%;
            color: #ff632d;
          }
        }
        .wd2 {
          flex: 1;
          color: #f3ef75;
        }
      }
    }
    ul::-webkit-scrollbar {
      width: 0.06rem;
      margin-left: 0.1rem;
    }
    ul::-webkit-scrollbar-thumb {
      background: #22808a;
    }
  }
}
</style>
