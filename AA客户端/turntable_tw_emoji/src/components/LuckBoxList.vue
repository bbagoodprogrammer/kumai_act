<template>
  <div class="luckBoxList">
    <div class="list">
      <p v-if="loading" class="loading">加载中...</p>
      <div class="item" v-for="(item,index) in list" :key="index">
        <span>
          <div class="imgBox">
            <img :src="item.picture" alt="">
          </div>
          <!-- <i>x{{item.num}}</i> -->
          <span><em>{{item.name}}</em></span>
        </span>
      </div>
    </div>
    <Footer :user_wallet="user_wallet" :type="type" />
  </div>
</template>
<script>
import Footer from "./Footer"
import api from "../api/apiConfig"
export default {
  components: { Footer },
  props: ['type'],
  data() {
    return {
      list: [],
      loading: false,
      user_wallet: {},
    }
  },
  created() {
    if (this.type) {
      this.user_wallet = JSON.parse(sessionStorage.getItem('user_wallet'))
    } else {
      this.user_wallet = this.userMsg
    }
    let boxGiftBox = sessionStorage.getItem('boxGiftBox')
    if (boxGiftBox) {
      this.list = JSON.parse(sessionStorage.getItem('boxGiftBox'))
    } else {
      this.loading = true
      api.getDefault(1).then(res => {
        this.loading = false
        const { response_data, response_status } = res.data
        this.list = response_data.gift_list
        sessionStorage.setItem('boxGiftBox', JSON.stringify(response_data.gift_list))
      })
    }
  }
}
</script>
<style lang= "scss">
.luckBoxList {
  margin-top: 0.4rem;
  .list {
    padding: 0 0.4rem;
    height: 7.15rem;
    /* overflow-x: hidden; */
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    .loading {
      text-align: center;
    }
    .item {
      display: inline-block;
      vertical-align: top;
      width: 33%;
      /* margin: 0 0.35rem 0.24rem 0; */
      > span {
        display: block;
        width: 2rem;
        /* height: 2.14rem; */
        margin: 0 auto;
        .imgBox {
          width: 1.8rem;
          height: 1.8rem;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 0.16rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          img {
            width: 1.5rem;
            height: 1.5rem;
          }
        }
        span {
          width: 120%;
          margin-left: -0.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          em {
            max-width: 1.6rem;
            height: 0.45rem;
            line-height: 0.45rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: block;
            text-align: center;
            font-size: 0.22rem;
            margin-top: 0.05rem;
          }
          i {
            font-size: 0.22rem;
          }
        }
      }
    }
    .item:nth-child(3n) {
      margin-right: 0;
    }
  }
}
</style>
