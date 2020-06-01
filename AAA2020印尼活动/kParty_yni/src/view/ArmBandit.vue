<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="tipsBox" :class="{top:isShare}">
        <span class="ruleTips" :class="{top:isShare}" @click="showRules()">{{lang.rules}}</span>
        <span class="ruleTips ruleTips2" :class="{top:isShare}" @click="goBar()" v-if="is_admin">{{lang.myAct}}</span>
      </div>
      <div class="actTitle"></div>
    </div>
    <Actlist />
    <act-footer></act-footer>
    <div class="mask" v-show="showRule">
      <transition name="slide">
        <div class="rules" v-if="showRule">
          <i class="close" @click="closeRule()"></i>
          <div class="type1" v-if="is_admin">
            <h6>Pedoman mendaftardan mengadakan pesta:</h6>
            <p>1、Pemilik dan admin kamar karaoke bisa mendaftar lakukan pesta. Klik tombol 【mendaftar dan mengadakan pesta】dan Lengkapi formulir aplikasi. Aplikasi harus diajukan dalam 5-30 hari sebelum dimulainya acara. Durasi setiap acara dibatasi hingga 1-3 jam. Setiap kamar Karaoke dapat mengajukan hingga 4 acara per bulan.</p>
            <p>2、Jika acara ini mengharuskan teman untuk mendaftar sebagai tamu sebelumnya,tolong pilihan 【mendaftar】. Rincian pendaftaran bisa dilihat di 【pesta saya】, dan bisa hubungi teman yg sudah daftar dengan cepat.</p>
            <p>3、Setelah berhasil diajukan, Harap bersabar dan tunggu hasil ulasan resmi. Rincian spesifik bisa lihat di dalam 【pesta saya】</p>
            <p>4、Klik Ubah Rencana bisa mengubah rencana yg belum diaudit dan tidak disetujui didalam 【pesta saya】. Rencana yg sudah disetujui tidak diubah.</p>
            <p>5、Rencana yg tidak disetujui bisa diubah dan diajukan satu kali lagi. Kalau Rencana baru masih tidak disetujui, tidak bisa diubah lagi.</p>
            <h6>Pedoman penonton pesta:</h6>
            <p>1、Setelah perhatian acara, bisa terima pengingat pesan acara 5 menit sebelum acara dimulai. Jangan lewatkan pesta yang indah</p>
            <p>2、Kalau acara itu yg ada fungsi pendaftaran, Anda bisa melengkapi formulir aplikasi setelah klik mendaftar. Sponsor acara akan memberitahu hasil pendaftaran Anda. Anda bisa mengikuti acaranya setelah berhasil daftar</p>
            <p>3、Lebih banyak berbagi dan perhatian bisa menarik teman teman untuk berpesta bersama</p>
            <p>4、Konten aktivitas spesifik ditentukan oleh sponsor acara, dan Tidak terkait dengan resmi. Kalau Anda ada pertanyaan dalam acaranya, Anda bisa berkonsultasi dengan sponsor acara terkait</p>
            <p class="lastTips">Hak interpretasi akhir dari acara ini dipegang oleh penyelenggara acara</p>
          </div>
          <div class="type2" v-else>
            <h6>Pedoman penonton pesta:</h6>
            <p>1、Setelah perhatian acara, bisa terima pengingat pesan acara 5 menit sebelum acara dimulai. Jangan lewatkan pesta yang indah</p>
            <p>2、Kalau acara itu yg ada fungsi pendaftaran, Anda bisa melengkapi formulir aplikasi setelah klik mendaftar. Sponsor acara akan memberitahu hasil pendaftaran Anda. Anda bisa mengikuti acaranya setelah berhasil daftar</p>
            <p>3、Lebih banyak berbagi dan perhatian bisa menarik teman teman untuk berpesta bersama</p>
            <p>4、Konten aktivitas spesifik ditentukan oleh sponsor acara, dan Tidak terkait dengan resmi. Kalau Anda ada pertanyaan dalam acaranya, Anda bisa berkonsultasi dengan sponsor acara terkait</p>
            <p class="lastTips">Hak interpretasi akhir dari acara ini dipegang oleh penyelenggara acara</p>
          </div>
        </div>
      </transition>
    </div>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
    <div class="goTop" @click="scorllGO()"></div>
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import Actlist from "../components/Actlist"
import { fail } from 'assert';
export default {
  components: { MsgToast, ActFooter, Actlist },
  data() {
    return {
      isShare: false, //是否分享
      isMore: true,   //加载更多
      activite: 1,    //活动状态
      showT: false,  //提示弹窗显示
      tastMsg: "提示信息",  //基础弹窗提示信息
      userState: 0,   //用户状态（是否报名）
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      showRule: false,
      is_admin: null
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  mounted() {
  },
  methods: {
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      this.isShare = getString('token') ? false : true
      this.vxc('setShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
      api.getDefault().then(res => {
        const { response_status, response_data } = res.data
        if (response_status.code == 0) {
          const { is_admin, list } = response_data
          this.is_admin = is_admin
          this.vxc('setActStatus', 1)
          this.vxc('setIs_admin', is_admin)
          this.vxc('setList', list)
        } else {
          this.toast(response_status.error)
        }
      })
    },
    downApp() {
      APP()
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
    },
    goBar() {
      let regstr = getString('token')
      location.href = `./index3.html?token=${regstr}`
    },
    showRules() {
      this.showRule = true
    },
    closeRule() {
      this.showRule = false
    },
    scorllGO() {
      this.timer = setInterval(() => {
        var scorllTop = document.documentElement.scrollTop || document.body.scrollTop
        var step = scorllTop / 10
        window.scrollTo(0, scorllTop - step)
        if (scorllTop < 1) {//速度小于3或者滚动条到底了
          clearInterval(this.timer)
        }
      }, 10)
    },
  }
}
</script>
<style lang='scss'>
body::-webkit-scrollbar {
  width: 0;
}
.box {
  max-width: 750px;
  overflow-x: hidden;
  position: relative;
  margin: auto;
  background: #5b16ba url(../assets/img/banner.png) center 0 no-repeat;
  background-size: 100% auto;
  .shareBar {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    .bar {
      width: 7.5rem;
      height: 1.2rem;
      margin: auto;
      background: url(../assets/img/share_bar.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .header {
    height: 5.1rem;
    position: relative;
    .tipsBox {
      position: absolute;
      right: 0;
      top: 0.12rem;
      &.top {
        top: 1.5rem;
      }
      .ruleTips {
        display: block;
        width: 1.89rem;
        height: 0.53rem;
        background: url(../assets/img/ruleTips.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.53rem;
        font-size: 0.26rem;
        text-indent: 0.15rem;
        margin-bottom: 0.11rem;
      }
      .ruleTips2 {
        width: 1.42rem;
        margin-left: 0.47rem;
      }
    }
    .actTitle {
      width: 3.04rem;
      height: 0.39rem;
      background: url(../assets/img/actTitleTips.png);
      background-size: 100% 100%;
      position: absolute;
      bottom: 0.16rem;
      left: 2.23rem;
    }
  }
  .guaBox {
    position: relative;
  }
  .rules {
    width: 5.32rem;
    padding: 0 0.29rem 0.26rem;
    background: rgba(104, 30, 181, 1);
    border-radius: 0.4rem;
    position: relative;
    .close {
      display: block;
      width: 0.58rem;
      height: 0.58rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: -0.7rem;
    }
    h6 {
      font-size: 0.26rem;
      margin: 0.24rem 0 0.14rem;
    }
    p {
      font-size: 0.24rem;
      color: #bffffe;
    }
    .type1 {
      height: 9rem;
      overflow-y: scroll;
    }
    .lastTips {
      text-align: center;
      font-size: 0.24rem;
      color: #a884d8;
      margin-top: 0.28rem;
    }
  }
}
.goTop {
  display: block;
  width: 0.94rem;
  height: 0.94rem;
  position: fixed;
  right: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/goTop.png) no-repeat;
  background-size: contain;
  z-index: 1000;
}
.refresh {
  display: block;
  width: 0.94rem;
  height: 0.94rem;
  position: fixed;
  left: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  z-index: 1000;
}
</style>


