<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="tabClick(0)" :class="{current:tab==0}" href="">Aturan acara</a>
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">Hadiah acara</a>
    </div>
    <div class="actTime">Waktu acara: Jam 18:00 tgl 10 Jan.~ Jam 21:00 tgl 17 Jan.</div>
    <div class="ruleTips" v-show="tab == 0">
      <h5>Aturan acara:</h5>
      <p>1.Acara ini perlu didaftar utk ikut, stlh daftar baru hitung nilai</p>
      <p>"2.Daftar tersebut terbagi menjadi Top Master dan Top Beruntung<br />
        Top Master: Hitung jumlah total koin emas angpau yg peserta kirim. Tampilkan top 100 teratas<br />
        Top Beruntung: Hitung Jumlah angpau hadiah yg peserta terima. Tampilkan top 100 teratas"</p>
      <!-- <p class="rankTips">
        Hitung jumlah total koin emas angpau yg peserta kirim. Tampilkan top 100 teratas</br>
        Hitung Jumlah angpau hadiah yg peserta terima. Tampilkan top 100 teratas
      </p> -->
      <h5 class="other">Perhatian:</h5>
      <p>1.Angpau yg dikirim di Kroom yg dikunci tidak akan dihitung</p>
      <p>2.Setiap pengguna cuma bisa pakai satu akun utk ikut acara</p>
      <p>3.Yg mengikut acara kalau ada pelanggaran apapun, Kualifikasi acara dan hadiah acaranya akan dibatalkan. Yg parah, akunnya akan diblokir.</p>
    </div>
    <div class="wardTips" v-show="tab == 1">
      <h5>Hadiah acara：</h5>
      <h6>Top Master</h6>
      <p>Top 1: Lencana master Angpau (30 hari)+Mount happy New Year (30 hari)+Bingkai 2021 (30 hari)+Bonus 10% koin emas dr Jumlah total koin yg kirim angpau</p>
      <p>Top 2: Lencana master Angpau （30 hari)+Mount happy New Year (30 hari)+Bingkai 2021 (30 hari)+Bonus 8% koin emas dr Jumlah total koin yg kirim angpau</p>
      <p>Top 3: Lencana master Angpau （30 hari)+Mount happy New Year (30 hari)+Bingkai 2021 (30 hari)+Bonus 5% koin emas dr Jumlah total koin yg kirim angpau</p>
      <p>Top 4~5: Lencana master Angpau （30 hari)+Mount happy New Year (15 hari)+Bingkai 2021 (15 hari)+Bonus 3% koin emas dr Jumlah total koin yg kirim angpau</p>
      <p>Top 6~10: Lencana master Angpau （30 hari)+Mount happy New Year (7 hari)+Bingkai 2021 (7 hari)+Bonus 2% koin emas dr Jumlah total koin yg kirim angpau</p>
      <h6>Top Beruntung</h6>
      <p>Top 1: Lencana raja beruntung（30 hari)+Mount happy New Year (30 hari)+3000 kacang emas</p>
      <p>Top 2: Lencana raja beruntung（30 hari)+Mount happy New Year (30 hari)+2000 kacang emas</p>
      <p>Top 3: Lencana raja beruntung（30 hari)+Mount happy New Year (30 hari)+1000 kacang emas</p>
      <p>Top 4~10: Lencana raja beruntung（15 hari)+Mount happy New Year (15 hari)+800 kacang emas</p>
      <p>Top 11~20: Lencana raja beruntung（7 hari)+Mount happy New Year (7 hari)+500 kacang emas</p>
      <h5>Aturan acara:</h5>
      <p>1.Hadiah ransel semua berlaku 14 hari kerja</p>
      <p>2.Hadiah ransel berlaku 7 hari, Silakan gunakan secepat mungkin</p>
    </div>
    <p class="lastTips">Hak interpretasi acara dipegang oleh penyelenggara acara</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 0
    }
  },
  methods: {
    tabClick(val) {
      this.tab = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #ae172e;
}
.rule {
  padding: 0.51rem 0.25rem;
  .tabs {
    display: flex;
    width: 7rem;
    height: 0.85rem;
    background: url(../../assets/img/tab.png);
    background-size: 100% 100%;
    margin: 0 auto 0.26rem;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 3.5rem;
      height: 0.85rem;
      color: #ae4800;
      font-size: 0.3rem;
      font-weight: bold;
      &.current {
        background: url(../../assets/img/tab1.png);
        background-size: 100% 100%;
      }
    }
  }
  .actTime {
    text-align: center;
    margin: 0.49rem auto 0.45rem;
    color: #faeac5;
  }
  .ruleTips {
    h5 {
      color: #f4cf77;
      font-size: 0.36rem;
      margin-bottom: 0.37rem;
      font-weight: bold;
    }
    p {
      font-size: 0.24rem;
      color: #f3d4d8;
      padding-left: 0.25rem;
      margin-top: 0.2rem;
    }
    .rankTips {
      font-size: 0.22rem;
      color: #f3d4d8;
      padding-left: 0.4rem;
    }
    .other {
      margin-top: 0.97rem;
    }
  }
  .wardTips {
    h5 {
      color: #f4cf77;
      font-size: 0.36rem;
      margin-top: 0.5rem;
      font-weight: bold;
    }
    h6 {
      color: #faeac5;
      font-size: 0.24rem;
      margin-top: 0.45rem;
      padding-left: 0.35rem;
    }
    p {
      color: #f3d4d8;
      font-size: 0.22rem;
      padding-left: 0.5rem;
      margin-top: 0.15rem;
    }
  }
  .lastTips {
    text-align: center;
    color: #faeac5;
    font-size: 0.24rem;
    margin-top: 1.5rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
