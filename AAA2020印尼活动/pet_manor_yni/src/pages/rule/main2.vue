<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">Hadiah acara</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">Aturan acara</a>
    </div>
    <p class="actTime">Waktu acara : Tgl 1 Jan, 18:00 - tgl 15 Jan, 21:00</p>
    <div class="wards" v-if="mainTab == 0">
      <h5>Hadiah acara</h5>
      <img src="../../assets/img/wardsImg.png" alt="" class="wardImg">
      <h5>Hadiah utk Daftar Total dari Pet </h5>
      <h6>Top 1:</h6>
      <p>Lencana tuan manor(30 hari)+Mount Bugatti(31 hari)+Nilai kekayaan bangsawan Duke+Set pet nyanyian *2 + 3000 koin emas + 10000 kacang emas</p>
      <h6>Top 2:</h6>
      <p>Lencana tuan manor(30 hari)+Mount Bugatti(31 hari)+Nilai kekayaan bangsawan Marquis+Set pet nyanyian *2 + 2000 koin emas + 8000 kacang emas</p>
      <h6>Top 3:</h6>
      <p>Lencana tuan manor(30 hari)+Mount Bugatti(31 hari)+Nilai kekayaan bangsawan Earl+Set pet nyanyian *2 + 1500 koin emas + 5000 kacang emas</p>
      <h6>Top 4-5:</h6>
      <p>Lencana tuan manor(30 hari)+Mount Bugatti(31 hari)+Set pet nyanyian *2 + 1000 koin emas + 3000 kacang emas</p>
      <h6>Top 6 - 10:</h6>
      <p>Lencana tuan manor(30 hari)+Mount Bugatti(31 hari)+Set pet nyanyian *2 + 500 koin emas + 1000 kacang emas</p>
      <h5>Hadiah utk Top pet eksklusif</h5>
      <img src="../../assets/img/wardsTab.png" alt="" class="tab">
      <h5>Aturan hadiah</h5>
      <p>1.Hadiah ransel yg didapatkan berlaku selama 7 hari, silakan gunakannya sebelum kadaluarsa.</p>
      <p>2.Mount yg didapatkan dalam acara ini bisa dilihat di 【Saya - Mount untuk masuk kamar】.</p>
      <p>3.Versi Android dari hadiah ransel dapat dilihat di Saya - Ransel, dan ketika Anda memberikan hadiah, Anda dapat memilih hadiah ransel untuk sawer</p>
      <p>4.Hadiah daftar akan dikirim dalam 7 hari setelah acara berakhir.</p>
    </div>
    <div class="ruleTips" v-else>
      <!-- <h5>萌寵總榜獎勵</h5> -->
      <h6 class="order">Aturan acara</h6>
      <p>1.Klik "Segera Mendaftar" akan bisa menjadi Tuan Manor, data akan dihitung setelah mendaftar. </p>
      <p>2.Menerima hadiah pet yg tertentu artinya berhasil mengumpulkan pet ini di nyanyian atau kamar karaoke.Hadiah pet termasuk ayam kuning kecil (10 koin emas ), gajah pink kecil (68 koin emas ),singa kecil (149 koin emas )dari kamar karaoke, bebek lucu (10 koin emas ), kuda nil kecil (68 koin emas ),harimau kecil (149 koin emas )dari nyanyian.</p>
      <p>3.Berhasil menerima 6 pet lucu akan bisa menjadi Tuan Manor kehormatan dan mendapatkan sertifikat kehormatan. Semakin cepat Anda menyelesaikan sertifikat kehormatan, semakin peringkat di depan.</p>
      <p>4.Top pesona pet akan menurut total pesona hadiah dari semua pet yg didapatkan utk peringkat.Setiap mengumpulkan lengkap 6 pet lucu, akan tambahkan 1000 nilai pesona dengan extra.</p>
      <p>5.Top pet eksklusif akan menurut jumlah hadiah pet yang tertentu yg didapatkan.Top 10 akan mendapatkan hadiah yg besar</p>
      <h6 class="order">Tips:</h6>
      <p>Setiap pengguna hanya dapat ikut acara dengan satu akun,kalau meningkatkan nilai skor dengan cara yg gak cocok, akan membatalkan kualifikasi dan hadiah</p>
    </div>
    <p class="lastTips" :class="{mt:mainTab==1}">Hak interpretasi acara ini dipegang penyelenggara acara</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainTab: 0
    }
  },
  methods: {
    mainTabClick(val) {
      this.mainTab = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: rgba(32, 88, 123, 1);
}
.rule {
  padding: 0.26rem 0.34rem;
  .tabs {
    width: 6.41rem;
    height: 0.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(../../assets/img/tabs.png);
    background-size: 100% 100%;
    margin: 0 auto;
    a {
      display: block;
      width: 3.24rem;
      height: 100%;
      text-align: center;
      line-height: 0.9rem;
      color: rgba(200, 249, 205, 1);
      font-size: 0.28rem;
      font-weight: 600;
      &.current {
        color: rgba(32, 88, 123, 1);
        background: url(../../assets/img/actTab.png);
        background-size: 100% 100%;
      }
    }
  }
  .actTime {
    text-align: center;
    color: #7bdc9c;
    font-weight: 0.26rem;
    font-weight: 500;
    margin-top: 0.41rem;
  }
  h5 {
    margin: 0.41rem 0 0.22rem;
    text-align: center;
    font-size: 0.36rem;
    color: rgba(174, 255, 201, 1);
    font-weight: 600;
  }
  h6 {
    color: rgba(123, 220, 156, 1);
    font-weight: 600;
    margin-top: 0.3rem;
  }
  p {
    color: rgba(123, 220, 156, 1);
    font-size: 0.24rem;
  }
  .wardImg {
    display: block;
    width: 5.06rem;
    height: 6.62rem;
    margin: 0 auto;
  }
  .tab {
    display: block;
    width: 6.74rem;
    height: 8.2rem;
    margin: 0 auto;
  }
  .lastTips {
    margin-top: 0.89rem;
    text-align: center;
    font-size: 0.26rem;
    color: rgba(238, 255, 215, 1);
    &.mt {
      margin-top: 3rem;
    }
  }
  .order {
    color: rgba(123, 220, 156, 1);
    margin: 0.58rem 0 0.36rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
