<template>
  <div class="tab1">
    <ul class="scrollable">
      <li v-for="(item,index) in rankList2.list" :key="index" :class="{nv:item.sex == 1}" @click="goUser(item.uid)">
        <div class="imgBox" :class="'rank'+index" v-if="index <= 2">
          <img :src="require('../../assets/img/top'+(++index)+'.png')" alt="" class="img2">
          <img v-lazy="item.avatar" alt="" class="img1">
        </div>
        <div class="imgBox2" :class="'rank'+index" v-else>
          <img v-lazy="item.avatar" alt="" class="img1">
        </div>
        <div class="userMsg">
          <div class="songName">{{item.nick}}</div>
          <div class="userName"><em>{{item.uid}}</em></div>
        </div>
        <div class="score">
          <!-- <i></i> -->
          {{item.score}}
        </div>
      </li>
      <p v-show="loading" class="tips">في التحميل...</p>
      <p v-if="rankList2.list && rankList2.list.length == 0" class="tips">لا يوجد المستخدم يدخل في القائمة!</p>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from "../../api/apiConfig"
export default {
  data() {
    return {
      loaded: false,
      more: true,
      loading: false
    }
  },
  computed: {
    ...mapState(['rankList2'])
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
          this.loading = true
          api.hearList('2', this.rankList2.list.length).then(res => {
            this.more = true
            this.loading = false
            let list = res.data.response_data.list
            if (list.length > 0) {
              this.$store.commit('addRanklist2', list)
            } else {
              this.loaded = true
            }
          })
        }
      }
    },
    goUser(uid) {
      location.href = `uid:${uid}`
    }
  }

}
</script>
<style lang="scss" scoped>
.tab1 {
  ul {
    height: 10rem;
    margin-top: 0.22rem;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    li {
      width: 6.54rem;
      height: 1.83rem;
      margin: 0 auto 0.18rem;
      background: url(../../assets/img/nan.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      &.nv {
        background: url(../../assets/img/nv.png);
        background-size: 100% 100%;
      }
      .imgBox {
        width: 1.92rem;
        height: 1.78rem;
        position: relative;
        margin-top: -0.3rem;
        .img1 {
          width: 1.29rem;
          height: 1.29rem;
          border-radius: 50%;
          position: absolute;
          top: 0.3rem;
          left: 0.32rem;
        }
        .img2 {
          width: 1.92rem;
          height: 1.78rem;
          position: absolute;
          z-index: 20;
        }
      }
      .imgBox2 {
        width: 1.51rem;
        height: 1.51rem;
        margin: -0.3rem 0.2rem 0;
        background: url(../../assets/img/nanBg.png);
        background-size: 100% 100%;
        .img1 {
          width: 1.29rem;
          height: 1.29rem;
          border-radius: 50%;
          margin: 0.1rem 0.1rem;
        }
      }
      .userMsg {
        width: 3.2rem;
        margin-left: 0.19rem;
        color: #fffde3;
        font-size: 113%;
        .songName {
          max-width: 3.2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .score {
        display: flex;
        align-items: center;
        color: #fffde3;
        font-size: 113%;
        i {
          display: inline-block;
          width: 0.46rem;
          height: 0.4rem;
          background: url(../../assets/img/xin3.png);
          background-size: 100% 100%;
          margin-right: 0.1rem;
        }
      }
    }
  }
  ul::-webkit-scrollbar {
    width: 0rem;
  }
  .tips {
    text-align: center;
  }
}
</style>
