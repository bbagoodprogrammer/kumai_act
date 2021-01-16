<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:showType== 0}" @click="tabClick(0)">Aturan acara</span>
      <span :class="{act:showType== 1}" @click="tabClick(1)"> Hadiah acara</span>
    </div>
    <div class="rules" v-show="showType == 0">
      <p class="actTime">Waktu acara : Tgl 17 Jan, 18:00 - tgl 2 Feb, 21:00</p>
      <h5>Aturan peringkat nilai kekayaan</h5>
      <p>1.Setelah pendaftaran utk ikut acara, nilai kekayaan yang diperoleh dengan menggali mineral dan menyelamatkan penambang<span>Nilai kekayaan=total nilai kekayaan yg dihadiahi melalui menggali mineral dan menyelamatkan penambang</span></p>
      <img src="../../assets/img/ruleImg1.png" alt="" class="ruleImg1">
      <p>2.Jika nilai kekayaan yg didapatkan adalah sama, maka siapa yang pertama mencapai nilai kekayaan itu,peringkat siapa akan di depan</p>
      <p>3.Daftar ini menampilkan hasil kompetisi pengguna dari Top 100 </p>
      <h5>Penjelasan tugas</h5>
      <p>1.Tugas top up:Anda bisa mendapatkan 1 kali utk gali ketika setiap top up 50 koin emas, dapatkan nilai kekayaan melalui menggali mineral dan menyelamatkan penambang, dan menukarnya dengan hadiah</p>
      <p>2.Tugas harian:Nyanyian publik apapun kemarin yg dipublikasikan belum dihapus. Pada pukul 12:00 tiap hari akan cek nyanyian umum dari kemarin, jika nyanyian tersebut belum dihapus, maka akan mendapatkan 1 kali utk gali</p>
      <h5>Cara gali</h5>
      <div class="block1">
        <p>1.Mineral dalam dapat digali setelah mineral dangkal menyelesaikan gali ; Ketika semua mineral digali dan penambang diselamatkan, maka gali berakhir, Anda bisa membuka putaran baru penggalian</p>
        <p>2.Selesaikan <i class="red">5</i> kali gali utk setiap kolom,akan dapat menyelamatkan penambang 1 kali, menyelamatkan penambang dapat mendapatkan nilai kekayaan</p>
        <p>3.Berbagai mineral memiliki rentang kekayaan tertentu, nilai kekayaan permata misterius mengambang</p>
        <p>4.Semua jumlah penggalian dan adegan penggalian akan dihapus setelah pukul 24:00:00 hari ini,silakan gunakan sesegera mungkin</p>
        <p>5.Peringkat nilai kekayaan didasarkan pada akumulasi selama acara, siapa yg pertama mencapai nilai itu,peringkat siapa akan di depan</p>
      </div>
      <h5> Lainnya </h5>
      <p class="otherTips">Selama acara, jika pengguna ditemukan menggunakan cara yang tidak benar untuk berpartisipasi dalam acara, pihak Wekara berhak untuk membatalkan/diskualifikasi pengguna tanpa memberi tahu terlebih dahulu. Jika situasi serius maka pihak resmi wekara akan membekukan akun tersebut,termasuk tetapi tidak terbatas pada:</p>
      <p>1）Penyalahgunaan atau meminjam akun orang lain untuk berpartisipasi dalam acara;</p>
      <p>2）Pengguna yang sama mendaftar beberapa akun tuyul untuk berpartisipasi dalam acara;</p>
      <p>3）Berpartisipasi dalam acara melalui pelanggaran lain.</p>
      <p class="otherTips2">Jika pengguna ditemukan menggunakan cara yang tidak benar untuk berpartisipasi dalam acara, apakah peserta atau tidak,pihak Wekara akan secara permanen membekukan semua akun besar atau kecil dari pelanggar. Setelah acara berakhir,pihak Wekara berhak untuk mengambil kembali semua hadiah dari pengguna/pelanggar ini.</p>
    </div>
    <div class="wards" v-show="showType == 1">
      <p class="actTime">Waktu acara : Tgl 17 Jan, 18:00 - tgl 2 Feb, 21:00</p>
      <h5 class="title1">Hadiah harian</h5>
      <p class="centerTips">Nilai kekayaan yg dihadiahi tiap hari=total nilai kekayaan hari ini </p>
      <img src="../../assets/img/ruleImg2.png" alt="" class="ruleImg2">
      <p>1.Hadiah harian akan didasarkan pada nilai kekayaan yang diakumulasi setiap hari,hadiah harian akan dihitung lagi setelah pukul 24:00:00 tiap hari;Nilai kekayaan akumulasi harian mencapai level tertentu, Anda dapat menerima paket hadiah yang berbeda, klik untuk menerima, paket hadiah akan dikirim ke akunmu pada hari ini</p>
      <p>2.Selama acara, paket hadiah yang level berbeda hanya dapat ditebus sekali per hari untuk hadiah level yang sama. Jika tidak diterima pada hari itu, hadiah akan secara otomatis dihapus</p>
      <p>3.Setiap 5 hari berturut-turut untuk menyelesaikan semua tugas harian, Anda bisa mendapatkan mount Ferrari (5 hari), hadiah secara otomatis dikirim ke akunmu, silakan cek ~</p>
      <h5>Hadiah peringkat kekayaan</h5>
      <div class="topGift">
        <h6>Top 1:</h6>
        <p>Lencana taipan mineral(30 hari)+30000 Nilai kekayaan bangsawan(Senilai 30000 koin emas) + Mount Red Eagle Fighting (30 hari)+Hadiah ransel nyanyian harta karun emas(666 koin emas)+4000 koin emas +5000 kacang emas</p>
        <h6>Top 2:</h6>
        <p>Lencana taipan mineral(30 hari)+10000 Nilai kekayaan bangsawan(Senilai 10000 koin emas) + Mount Red Eagle Fighting (30 hari)+Hadiah ransel nyanyian harta karun emas(666 koin emas)+3000 koin emas +3000 kacang emas</p>
        <h6>Top 3:</h6>
        <p>Lencana taipan mineral(30 hari)+7000 Nilai kekayaan bangsawan(Senilai 7000 koin emas)+ Mount Red Eagle Fighting (30 hari)+Hadiah ransel nyanyian harta karun emas(666 koin emas)+2000 koin emas +2500 kacang emas</p>
        <h6>Top 4-5:</h6>
        <p>Lencana taipan mineral(30 hari) + Mount Red Eagle Fighting (15 hari)+Hadiah ransel nyanyian harta karun emas(666 koin emas)+1500 koin emas +2000 kacang emas</p>
        <h6>Top 6-10 :</h6>
        <p>Mount Red Eagle Fighting (15 hari)+Hadiah ransel nyanyian harta karun emas(666 koin emas)+1000 koin emas +1000 kacang emas</p>
      </div>
      <h5>Aturan penggunaan hadiah</h5>
      <div class="giftRules">
        <p>1、Kupon bonus utk top up dalam hadiah promosi hanya berlaku pd pukul 23:59:59 hari ini setelah kamu menerima.Jika pengguna yang sama menerima beberapa kupon bonus utk top up yg tanpa batas nilai top up pada hari yang sama, kupon dapat ditumpangkan utk digunakan. Bonus koin emas akan segera dikembalikan ke akunmu setelah top up </p>
        <p>2、Hadiah ransel yang didapatkan berlaku selama 7 hari, silakan gunakannya dalam periode validitas.</p>
        <p>3、Versi Android dari hadiah ransel dapat dilihat di Saya - Ransel, dan ketika Anda memberikan hadiah, Anda dapat memilih hadiah ransel untuk sawer.</p>
      </div>
    </div>
    <p class="lastTips">Hak interpretasi akhir dari acara ini dipegang oleh penyelenggara acara</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showType: 0
    }
  },
  created() {
    document.title = 'Aturan&Hadiah'
    sessionStorage.setItem("need-refresh", true);
  },
  methods: {
    tabClick(val) {
      this.showType = val
    }
  }
}
</script>

<style lang="scss">
body {
  background: #331106;
}
.red {
  color: red !important;
}
.rule {
  padding: 0.27rem 0.23rem;
  .tabs {
    width: 7.01rem;
    height: 0.95rem;
    display: flex;
    justify-content: space-between;
    span {
      display: block;
      width: 3.46rem;
      height: 0.95rem;
      background: url(../../assets/img/rule2.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.95rem;
      color: #5a2412;
      &.act {
        background: url(../../assets/img/rule1.png);
        background-size: 100% 100%;
      }
    }
  }
  .actTime {
    margin-top: 0.27rem;
    text-align: center;
    color: #eb9358;
    font-size: 0.24rem;
    font-weight: 700;
  }
  h5 {
    margin: 0.5rem auto 0.36rem;
    text-align: center;
    color: #fddd4e;
    font-weight: 700;
  }
  p {
    font-size: 0.24rem;
    color: #eb9358;
    font-weight: 500;
    span {
      display: block;
      text-indent: 0.25rem;
    }
  }
  .rules {
    .block1 {
      p {
        margin-bottom: 0.2rem;
      }
    }
    .ruleImg1 {
      width: 4.41rem;
      height: 3.93rem;
      margin: 0.16rem 0 0 0.24rem;
    }
    .otherTips {
      margin-bottom: 0.25rem;
    }
    .otherTips2 {
      margin-top: 0.25rem;
    }
  }
  .wards {
    .title1 {
      margin-bottom: 0.14rem;
    }
    .centerTips {
      text-align: center;
    }
    .ruleImg2 {
      width: 7.01rem;
      height: 5rem;
      margin: 0.2rem auto 0.14rem;
    }
    .topGift {
      h6 {
        font-size: 0.24rem;
        font-weight: 600;
        color: #eb9358;
        margin: 0.28rem 0 0.15rem;
      }
      p {
        padding-left: 0.39rem;
      }
    }
    .giftRules {
      p {
        margin-bottom: 0.25rem;
      }
    }
  }
  .lastTips {
    text-align: center;
    font-weight: 500;
    color: #9f6151;
    font-size: 0.24rem;
    margin-top: 0.74rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
