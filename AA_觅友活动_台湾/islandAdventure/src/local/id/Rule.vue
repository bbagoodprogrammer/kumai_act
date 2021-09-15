<template>
  <div class="ruleMsg">
    <div class="tm">Waktu acara：{{aTimer}}</div>
    <h6>Cara main</h6>
    <p>
      1. Sebuah pulau dibuka di setiap periode. Peserta dapat memperoleh keong setelah selesaikan tugas yang ditentukan di pulau. Keong dapat ditukar dengan sekop untuk menggali harta, dan maksimal 10
      sekop dapat ditukar per hari.<br />
      2. Peserta juga dapat menggunakan koin emas untuk menukar sekop emas untuk menggali harta karun, tidak ada batasan berapa kali untuk menukarkan sekop emas setiap hari<br />
      3. Setiap kali Anda menggunakan sekop untuk menggali harta karun, dapat meningkatkan potensi tuan pulau.Ketika pulau ditutup, peserta dengan potensi tuan pulau tertinggi di total top akan
      menjadi tuan periode saat ini.(Ketika potensi tuan pulau sama, peserta yang mencapai lebih dulu diprioritaskan). Dapatkan hadiah tuan pulau: Tuan Pulau Emas-sertifikasi(15 hari), Aku Tuan
      Pulau-bingkai avatar(10 hari), Pulau mercusuar-hadiah efek khusus *1(masa berlaku 7 hari), Top 2-3: Pulau mercusuar-hadiah efek khusus *1(masa berlaku 7 hari)
    </p>
    <div class="giftList">
      <div class="giftItem" v-for="(item,index) in gift" :key="index">
        <div class="imgBox">
          <img :src="item.img" alt="">
        </div>
        <strong>{{item.name}}</strong>
      </div>
    </div>
    <h6>Hadiah</h6>
    <img src="./img/table1.png" alt="" class="table1">
    <img src="./img/table2.png" alt="" class="table2">
    <p>Jika Anda menggunakan sekop emas untuk menggali harta karun sebanyak 600 kali dan gagal menggali Adegan terbaik-hadiah ransel, itu akan terkena untuk ke-601 kali</p>
    <p>*Masa berlaku hadiah ransel yang diberikan selama acara adalah 7 hari</p>
    <h6>Lainnya</h6>
    <p>-Selama acara, jika seorang peserta ditemukan berpartisipasi dalam acara dengan cara yang tidak pantas, AloChat berhak mendiskualifikasi peserta atau pelanggar yang berpartisipasi dari daftar
      peringkat, memblokir akunnya, dan ambil kembalikan semua hadiah peserta sesuai dengan seriusnya keadaan tanpa pemberitahuan sebelumnya, termasuk namun tidak terbatas pada:<br />
      a）Komentar jahat, rumor, sindiran, dll kepada peserta yang berpartisipasi selama acara<br />
      b）Akuisisi ilegal koin emas atau hadiah yang ditunjuk<br />
    </p>
    <p> -Acara ini tak berhubungan dengan Apple</p>
    <p> *Hak interpretasi akhir acara adalah milik penyelenggara</p>
  </div>
</template>

<script>

import getDate from "../../utils/getDate"
import { mapState } from "vuex"
export default {
  data () {
    return {
      gift: [
        {
          name: 'Tuan Pulau Emas-sertifikasi',
          img: require("../../img/ruleImg/gift1.png")
        },
        {
          name: 'Aku Tuan Pulau-bingkai avatar',
          img: require("../../img/ruleImg/gift2.png")
        },
        {
          name: 'Pulau mercusuar-hadiah efek khusus',
          img: require("../../img/ruleImg/gift3.png")
        }
      ]
    }
  },
  computed: {
    ...mapState(['activity']),
    aTimer () {
      if (AREA == 'tw') {
        return getDate(new Date(this.activity.stime * 1000), 1) + '-' + getDate(new Date(this.activity.etime * 1000), 1)
      } else if (AREA == 'vn') {
        return getDate(new Date(this.activity.stime * 1000), 2) + '-' + getDate(new Date(this.activity.etime * 1000), 2)
      } else if (AREA == 'id') {
        return getDate(new Date(this.activity.stime * 1000), 3) + '-' + getDate(new Date(this.activity.etime * 1000), 3)
      }

    }
  }
}
</script>

<style lang="scss">
body {
  background: #FFE3A6 !important;
  .ruleMsg {
    padding: 0.48rem 0.29rem;
  }
  .giftList {
    padding: 0 0.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.2rem 0;
    .giftItem {
      width: 2.2rem;
    }
    .imgBox {
      width: 1.88rem;
      height: 1.88rem;
      background: url(./img/imgBox.png);
      background-size: 100% 100%;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    strong {
      width: 100%;
      display: block;
      text-align: center;
      font-size: 0.26rem;
      color: #7D3F0A;
    }
  }
  .tm {
    text-align: center;
    color: #A67247;
    margin-bottom: 0.29rem;
  }
  h6 {
    color: #7D3F0A;
    font-size: 0.28rem;
    font-weight: bold;
  }
  p {
    color: #A67247;
    font-size: 0.28rem;
  }
  .table1 {
    display: block;
    width: 5.83rem;
    height: 3.89rem;
    margin: 0.29rem auto;
  }
  .table2 {
    display: block;
    width: 5.85rem;
    height: 5.33rem;
    margin: 0.29rem auto;
  }
}
</style>