<template>
  <div class="taskList">
    <p class="tips">{{lang.taskTips1}}</p>
    <div class="taskItem">
      <div class="bg">
        <div class="top"></div>
        <div class="con"></div>
        <div class="bottom"></div>
      </div>
      <div class="list">
        <div class="taskTitle">
          <span class="name">{{lang.taskTips2}}</span>
          <span class="coins"> <i></i></span>
          <span class="bar">{{lang.taskTips3}}</span>
        </div>
        <ul>
          <li v-for="(item,index) in shcule" :key="index">
            <span class="name">{{taskName[item.action]}}</span>
            <span class="coins">{{item.chance}}</span>
            <span class="bar">
              <em class="suc" v-if="item.schule >=item.limit">
                {{lang.taskTips4}}
              </em>
              <em class="no" v-else>
                <strong>{{item.schule}}/{{item.limit}}</strong>
                <i class="act" :style="{width:item.schule/item.limit *100 +'%'}"></i>
              </em>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      taskName: {
        login: 'Sign-in tiap hari',
        publicWork: 'Rilis nyanyian publik yang tidak dikumpulkan',
        noDel: 'Nyanyian publik yang tidak dikumpulkan yang diriliskan kemarin belum dihapus',
        like5: 'Suka 5 nyanyian',
        stayKtv: 'Tinggal di kamar karaoke yang tidak terkunci selama 20 menit',
        sing: 'Ambil mik di kamar karaoke yang tidak terkunci melebihi 60 detik',
        sendBean: 'Kirim hadiah dengan nilai lebih dari 100 kacang emas',
        getGift: 'Dapatkan nilai pesona hadiah koin emas senilai 1000',
        charge: 'Top up 100 koin emas',
        sendGift: 'Kirim hadiah dengan nilai lebih dari 50 koin emas'
      },
      rotatePx: 0,    //刷新旋转动画
    }
  },
  computed: {
    ...mapState(['shcule'])
  },
  methods: {
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      this.$parent.$parent.getDefaultData()
    }
  }
}
</script>
<style lang="scss">
.taskList {
  .tips {
    text-align: center;
    font-size: 0.28rem;
    margin: 0.27rem 0 0.25rem;
    padding: 0 0.3rem;
  }
  .taskItem {
    width: 7.27rem;
    height: 12.58rem;
    position: relative;
    margin: 0 auto;
    .bg {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      .top {
        width: 100%;
        height: 1.56rem;
        background: url(../assets/img/listBgHeader.png);
        background-size: 100% 100%;
      }
      .con {
        width: 100%;
        flex: 1;
        background: url(../assets/img/listBgCon.png);
        background-size: 100% auto;
      }
      .bottom {
        width: 100%;
        height: 0.65rem;
        background: url(../assets/img/listBgBotton.png);
        background-size: 100% 100%;
      }
    }
    .list {
      width: 6.67rem;
      height: 11rem;
      position: absolute;
      top: 0;
      left: 0;
      padding: 0.39rem 0.3rem;
      .taskTitle,
      li {
        height: 1.1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: center;
        font-size: 0.28rem;
        border-bottom: 0.02rem solid RGBA(115, 101, 170, 1);
        box-sizing: border-box;
        span {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .name {
          width: 3.12rem;
          font-size: 0.25rem;
          padding: 0 0.1rem;
        }
        .coins {
          width: 1.11rem;
          i {
            display: inline-block;
            width: 0.47rem;
            height: 0.48rem;
            background: url(../assets/img/coins.png);
            background-size: 100% 100%;
          }
        }
        .bar {
          flex: 1;
        }
      }
      .taskTitle {
        height: 1rem;
      }
      li {
        .coins {
          border-left: 0.02rem solid RGBA(115, 101, 170, 1);
          border-right: 0.02rem solid RGBA(115, 101, 170, 1);
        }
        .bar {
          position: relative;
          .suc {
            width: 1.72rem;
            height: 0.56rem;
            line-height: 0.56rem;
            background: linear-gradient(-90deg, #5cb5ed, #fe36e4);
            border-radius: 0.28rem;
          }
          .no {
            width: 1.72rem;
            height: 0.56rem;
            line-height: 0.56rem;
            background: url(../assets/img/statusBg.png);
            background-size: 100% 100%;
            border-radius: 0.28rem 0 0 0.28rem;
            position: relative;
            strong {
              display: block;
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              top: 0;
              z-index: 2;
            }
            .act {
              display: block;
              max-width: 100%;
              height: 100%;
              background: linear-gradient(-90deg, #5cb5ed, #fe36e4);
              border-radius: 0.28rem 0 0 0.28rem;
              position: absolute;
              left: 0;
              top: 0;
            }
          }
        }
      }
      li:last-child {
        border: none;
      }
    }
  }
}
</style>
