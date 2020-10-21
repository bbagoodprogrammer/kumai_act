<template>
  <div class="rule">
    <div class="header">
      <!-- <i class="black" @click="closeWeb()"></i>簽到規則說明 -->
    </div>
    <div class="tips">
      <h6>Keterangan aturan:</h6>
      <p>1、Semua pengguna bisa mengikuti acara sign-in</p>
      <p>2、Akun yg sama cuma bisa sign-in satu kali tiap hari, dan akumulasi jumlah hari sign-in kelanjutan</p>
      <p>3、Sign-in membutuhkan waktu 7 hari sebagai satu siklus, Setelah sign-in keputusan atau sign-in selama 7 hari, akan kembali memasuki siklus baru </p>
      <p>4、Setiap sign-in bisa mendapatkan hadiah tertentu dan hadiah extra,hadiah tertentu adalah hadiah kacang emas,hadiah extra adalah hadiah balikan kartu (hari ke-1 sampai hari ke-6) dan hadiah peti harta karun (hari ke 7),kartu emas dan peti harta karun akan ada kesempatan utk dapatkan hadiah kejutan</p>
      <p>5、Setiap hari bisa buka satu kartu setelah sign-in,jika tugas berbagi diselesaikan, akan bisa buka satu kartu lagi,kecuali hari ke-7 siklus</p>
      <p>6、Tambahan sign in cuma mendukung tambah total jumlah hari sign-in kelanjutan,tidak mempengaruhi siklus sign-in</p>
      <p>7、Selama acara sign in, jika pengguna melanggar prinsip itikad baik atau melanggar aturan (misalnya curang utk menerima, menerima dengan cara tidak cocok, pakai banyak akun utk menerima,dll.),platform akan membekukan akun dan berhak menarik hadiah setelah ditemukan.</p>
      <p>8、Pengguna yg berpartisipasi dalam acara sign in dianggap menerima semua aturan acara dan mengikuti pernyataan hukum dan peraturan platform yg relevan.Platform berhak untuk membuat penyesuaian yang cocok dengan aturan acara dalam ruang lingkup yang diizinkan oleh hukum.</p>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    document.title = `Keterangan aturan sign-in`
  },
  methods: {
    closeWeb() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      try {
        if (isAndroid) {
          window.JSInterface.closeWeb();
        } else {
          closeWeb();
        }
      } catch (e) {

      }
    }
  }
}
</script>

<style lang="scss">
body {
  background: #f2f2f2;
}
.rule {
  .header {
    height: 0.88rem;
    line-height: 0.88rem;
    // background: #fff;
    font-size: 0.36rem;
    text-align: center;
    position: relative;
    color: #111111;
    .black {
      display: block;
      width: 0.18rem;
      height: 0.32rem;
      background: url(../../assets/img/arr.png);
      background-size: 100% 100%;
      position: absolute;
      left: 0.28rem;
      top: 0.28rem;
    }
  }
  .tips {
    padding: 0.3rem;
    h6 {
      color: #111;
      font-size: 0.32rem;
    }
    p {
      font-size: 0.26rem;
      color: #666666;
      margin-top: 0.14rem;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
