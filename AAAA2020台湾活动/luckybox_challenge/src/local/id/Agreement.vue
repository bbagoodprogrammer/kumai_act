<template>
  <div class="rule">
    <div class="taskTabs">
      <span class="p1Tab1" :class="{act:type==1}" @click="tabClick(1)">Hadiah Aktivitas</span>
      <span class="p1Tab2" :class="{act:type==2}" @click="tabClick(2)">Aturan aktivitas</span>
    </div>
    <div class="gifts" v-if="type == 1">
      <h5>Waktu Aktivitas</h5>
      <p>{{actTime}}</p>
      <h5>Hadiah Aktivitas</h5>
      <div class="giftsItem">
        <!-- <div class="item" v-for="(item,index) in 28" :key="index">
          <div class="imgBg">
         
          </div>
          <strong v-html="giftName[index]"></strong>
        </div> -->
      </div>
      <h5>Hadiah harian akan didapatkan</h5>
      <img src="./img/ruleImg2.png" alt="" class="ruleImg2">
      <p>
        Semakin tinggi level Kotak Hadiah Lucky, semakin bagus hadiahnya; Untuk ke-5 kalinya menerima hadiah kotak super, kamu pasti memenangkan bingkai Pises
      </p>
      <h5>Hadiah Top 10 Peringkat Lucky</h5>
      <h6>Top 1</h6>
      <p>Lencana Lucky(30 hari)+Bingkai Pises(30 hari)+Mount Kapal Terbang(30 hari)+VIP(30 hari)+10% koin emas dari Kotak Lucky yg diterima+10% kacang emas dari Kotak Lucky yg diterima</p>
      <h6>Top 2</h6>
      <p>Lencana Lucky(20 hari)+Bingkai Pises(20 hari)+Mount Kapal Terbang(20 hari)+VIP(30 hari)+8% koin emas dari Kotak Lucky yg diterima+8% kacang emas dari Kotak Lucky yg diterima</p>
      <h6>Top 3</h6>
      <p>Lencana Lucky(15 hari)+Bingkai Pises(15 hari)+Mount Kapal Terbang(15 hari)+VIP(30 hari)+5% koin emas dari Kotak Lucky yg diterima+5% kacang emas dari Kotak Lucky yg diterima</p>
      <h6>Top 4-5</h6>
      <p>Lencana Lucky(15 hari)+Mount Kapal Terbang(15 hari)+VIP(30 hari)+3% koin emas dari Kotak Lucky yg diterima+3% kacang emas dari Kotak Lucky yg diterima</p>
      <h6>Top 6-10</h6>
      <p>Mount Kapal Terbang(15 hari)+VIP(30 hari)+1% koin emas dari Kotak Lucky yg diterima+1% kacang emas dari Kotak Lucky yg diterima</p>
      <h5>Hadiah Top 10 Peringkat Dukung</h5>
      <h6>Top 1</h6>
      <p>Lencana Dukung(30 hari)+Bingkai Pises(30 hari)+Mount Kapal Terbang(30 hari)+VIP(30 hari)+10% koin emas dari Kotak Lucky yg dikirim+10% kacang emas dari Kotak Lucky yg dikirim</p>
      <h6>Top 2</h6>
      <p>Lencana Dukung(20 hari)+Bingkai Pises(20 hari)+Mount Kapal Terbang(20 hari)+VIP(30 hari)+8% koin emas dari Kotak Lucky yg dikirim+8% kacang emas dari Kotak Lucky yg dikirim</p>
      <h6>Top 3</h6>
      <p>Lencana Dukung(15 hari)+Bingkai Pises(15 hari)+Mount Kapal Terbang(15 hari)+VIP(30 hari)+5% koin emas dari Kotak Lucky yg dikirim+5% kacang emas dari Kotak Lucky yg dikirim</p>
      <h6>Top 4-5</h6>
      <p>Lencana Dukung(15 hari)+Mount Kapal Terbang(15 hari)+VIP(30 hari)+3% koin emas dari Kotak Lucky yg dikirim+3% kacang emas dari Kotak Lucky yg dikirim</p>
      <h6>Top 6-10</h6>
      <p>Mount Kapal Terbang(15 hari)+VIP(30 hari)+1% koin emas dari Kotak Lucky yg dikirim+1% kacang emas dari Kotak Lucky yg dikirim</p>
    </div>
    <div class="ruleItem" v-else>
      <h5>Waktu Aktivitas:</h5>
      <p>{{actTime}}</p>
      <h5>Aturan aktivitas</h5>
      <h6 class="minTop">Pendaftaran aktivitas:</h6>
      <p>1. Setelah mengklik "Daftar Segera", pendaftaran akan berhasil, dan data aktivitas baru akan terhitung</p>
      <!-- <P>2、如何送出作品福運禮盒：在作品頁點擊禮物按鈕——點擊活動——選擇對應的福運禮盒送出</P> -->
      <h5>Aturan peringkat</h5>
      <h6>Peringkat Lucky:</h6>
      <p>1. Diurutkan berdasarkan total nilai pesona hadiah dari 3 jenis kotak hadiah lucky yang diterima setelah pendaftaran</p>
      <p>2. Tunjukkan 100 teratas dalam daftar, jika nilainya sama, yang pertama datang di depan</p>
      <h6>Peringkat Dukung:</h6>
      <p>1. Diurutkan berdasarkan julmah koin emas yang dihabiskan di 3 jenis kotak hadiah lucky yang dikirim setelah pendaftaran</p>
      <p>2. Tunjukkan 100 teratas dalam daftar, jika nilainya sama, yang pertama datang di depan</p>
      <h5>Aturan hadiah harian</h5>
      <p>
        1. Setiap hari Anda menerima kotak hadiah lucky, kotak premium, dan kotak super nyanyian, Anda dapat menerima hadiah yang sesuai<br />
      </p>
      <p>
        2. Semakin tinggi level Kotak Hadiah Lucky, semakin bagus hadiahnya; Untuk ke-5 kalinya menerima hadiah kotak super, kamu pasti memenangkan bingkai Pises; Setiap hadiah dapat diterima sekali
        sehari, hanya pada hari yang sama
      </p>
    </div>
    <p class="lastTips">Hak interpretasi acara dipegang oleh penyelenggara acara</p>
  </div>
</template>

<script>

import getDate from "../../utils/getDate"
import { mapState } from "vuex"
export default {
  data () {
    return {
      type: 1,
    }
  },
  computed: {
    ...mapState(['stime', 'etime']),
    actTime () {
      console.log(this.stime)
      return getDate(new Date(this.stime * 1000), 5) + '-' + getDate(new Date(this.etime * 1000), 5)
    }
  },
  methods: {
    tabClick (val) {
      this.type = val
    }
  }
}
</script>

<style lang="scss">
body {
  .rule {
    background-color: RGBA(73, 28, 95, 1);
    padding: 0.37rem 0.18rem 0.6rem;
    .taskTabs {
      display: flex;
      justify-content: center;
      span {
        display: block;
        width: 3.55rem;
        height: 0.88rem;
        text-align: center;
        line-height: 0.84rem;
        color: rgba(255, 255, 255, 0.6);
      }
      .p1Tab1 {
        background: url(../../img/tab3.png);
        background-size: 100% 100%;
        &.act {
          color: rgba(255, 255, 255, 1);
          background: url(../../img/tab4.png);
          background-size: 100% 100%;
        }
      }

      .p1Tab2 {
        background: url(../../img/tab2.png);
        background-size: 100% 100%;
        &.act {
          color: rgba(255, 255, 255, 1);
          background: url(../../img/tab1.png);
          background-size: 100% 100%;
        }
      }
    }
    .gifts,
    .ruleItem {
      margin-top: 0.1rem;
      padding: 0 0.08rem;
      h5 {
        font-size: 0.32rem;
        color: rgba(254, 249, 120, 1);
        font-weight: bold;
        margin-top: 0.4rem;
      }
      h6 {
        font-size: 0.28rem;
        color: #ffa0a9;
        padding-left: 0.64rem;
        margin-top: 0.5rem;
      }
      p {
        font-size: 0.28rem;
        padding-left: 0.64rem;
      }
      .ps {
        font-size: 0.31rem;
        padding-left: 0;
      }
      img {
        margin: 0.18rem auto;
      }
      .img1 {
        width: 7.02rem;
        height: 14.18rem;
      }
      .img2 {
        width: 7.02rem;
        height: 7.02rem;
      }
      .img3 {
        width: 7.02rem;
        height: 18.36rem;
      }
    }
    .giftsItem {
      width: 7.02rem;
      height: 7.41rem;
      background: url(./img/ruleImg1.png);
      background-size: 100% 100%;
    }
    .ruleImg2 {
      width: 7.02rem;
      height: 2.8rem;
    }
    .minTop {
      margin-top: 0.29rem !important;
    }
    .ytime {
      color: rgba(252, 245, 193, 1);
    }
    .other {
      margin-bottom: 0.28rem;
    }
    .gifts {
      h6 {
        color: #fff;
      }
    }
  }
  .lastTips {
    text-align: center;
    margin: 1.25rem 0;
    font-size: 0.28rem;
  }
}
// @import "../../assets/scss/common.scss";
</style>
