<template>
  <div class="wardsListBox">
    <div class="listBox">
      <div class="tilte"></div>
      <div class="list">
        <div class="listTop">
          <span class="rank">الترتيب</span>
          <span class="name">لقب</span>
          <span class="id">UID</span>
          <span class="people">عدد مانح الهدايا</span>
          <span class="gool">تكامل القيمة الشعبية</span>
        </div>
        <ul class="scrollable" :class="{minh:wardsList.length == 0}">
          <li v-for="(item,index) in wardsList" :key=index>
            <span class="rank">{{item.rank}}</span>
            <span class="name">{{item.nick}}</span>
            <span class="id">{{item.uid}}</span>
            <span class="people">{{item.score}}</span>
            <span class="gool">{{item.scaling*100+'%'}}</span>
          </li>
        </ul>
        <div v-if="wardsList.length == 0" class="noList">لا توجد بيانات حتى الآن</div>
        <p class="listMsg">عندما تغني ، إذا حصلت على الخمسة الأوائل في ترتيب عدد مانح الهدايا ، فستزداد قيمة شعبيتك بنسبة 1٪ -5٪.</p>
      </div>
      <a href="" class="close" @click.prevent="closeList()"></a>
    </div>
    <div class="listFooter" v-if="showUsermsg">
      <div class="top">
        <span>{{wardsListUserMsg.nick}}</span>
        <span>عدد مانح الهدايا: {{wardsListUserMsg.score}}</span>
      </div>
      <div class="bottom">
        <span>الترتيب：{{wardsListUserMsg.rank}}</span>
        <span>تكامل القيمة الشعبية：{{wardsListUserMsg.scaling*100+'%'}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../api/apiConfig"
import { mapState } from "vuex"
export default {
  data() {
    return {
      more: true,
      loaded: false
    }
  },
  computed: {
    ...mapState(["wardsList", "wardsListUserMsg"]),
    showUsermsg() {
      if (this.wardsListUserMsg) {
        return this.wardsListUserMsg.registered
      }
    }
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  destroyed() {
    this.loaded = false
  },
  methods: {
    closeList() {
      this.$emit("closeList")
    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.getWardsList(this.wardsList.length).then((res) => {
            this.more = true
            if (res.data.response_data.rank.length === 0) {
              this.loaded = true
            } else {
              var newList = this.wardsList
              newList = newList.concat(res.data.response_data.rank)
              this.$store.commit('changwardsList', newList)
            }
          })
        }
      }
    }
  }
}
</script>
<style lang="scss">
.wardsListBox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  ::-webkit-scrollbar {
    width: 0.05rem;
    background: #8011ceff;
  }
  ::-webkit-scrollbar-thumb {
    width: 0.05rem;
    background: #b48ffeff;
  }
  z-index: 10000;
  .listBox {
    width: 6.6rem;
    height: 7.24rem;
    padding: 0.86rem 0.53rem 0;
    margin: 1.4rem auto 0;
    background: url(../assets/img/wardsListBg.png);
    background-size: 100% 100%;
    position: relative;
    .tilte {
      width: 4.85rem;
      height: 1.54rem;
      background: url(../assets/img/wardsListTitle.png);
      background-size: 100% 100%;
      position: absolute;
      left: 1.4rem;
      top: -0.4rem;
    }
    .list {
      .listTop {
        width: 6.36rem;
        display: flex;
        justify-content: space-between;
        span {
          font-size: 80%;
          color: #fff6d9;
          text-align: center;
          &.rank {
            width: 0.5rem;
          }
          &.name {
            width: 1.65rem;
            margin-left: 0.2rem;
            max-width: 1.65rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          &.id {
            width: 1rem;
          }
          &.people {
            width: 1.5rem;
          }
          &.gool {
            flex: 1;
          }
        }
      }
      ul {
        margin-top: 0.2rem;
        height: 4.4rem;
        overflow-y: scroll;
        &.minh {
          height: 0.5rem;
        }
        li {
          width: 6.36rem;
          height: 0.3rem;
          line-height: 0.3rem;
          display: flex;
          align-items: center;
          background: url(../assets/img/minListBg.png);
          background-size: 100% 100%;
          margin-top: 0.04rem;
          span {
            display: inline-block;
            text-align: center;
            font-size: 73%;
            color: #eeeeee;
            &.rank {
              width: 0.5rem;
            }
            &.name {
              width: 1.65rem;
              margin-left: 0.2rem;
              max-width: 1.65rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            &.id {
              width: 1rem;
            }
            &.people {
              width: 1.5rem;
            }
            &.gool {
              margin-left: 0.4rem;
              flex: 1;
            }
          }
        }
      }
      .noList {
        text-align: center;
        font-size: 80%;
        color: #fff6d9;
      }
      .listMsg {
        color: #eeeeeeff;
        text-align: center;
        margin: 0.5rem auto 0;
        font-size: 80%;
      }
    }
    .close {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      left: 3.55rem;
      bottom: -0.52rem;
    }
  }
  .listFooter {
    height: 1.55rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: url(../assets/img/footer.png);
    background-size: 100% 100%;
    .top {
      margin-top: 0.63rem;
      color: #fdfdfdff;
      padding: 0 0.9rem;
      span {
        float: left;
        display: inline-block;
        width: 49%;
        text-align: left;
        line-height: 0.4rem;
      }
      span:first-child {
        text-align: center;
        max-width: 3rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .bottom {
      color: #d2c4f6ff;
      font-size: 80%;
      padding: 0 0.9rem;
      span {
        float: left;
        display: inline-block;
        width: 49%;
        text-align: left;
        line-height: 0.4rem;
      }
      span:first-child {
        text-align: center;
      }
    }
  }
}
</style>
