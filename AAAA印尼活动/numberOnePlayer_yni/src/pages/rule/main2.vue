<template>
  <div class="rule">
    <div class="tabs">
      <span @click="tabClick(1)" :class="{act:show== 1}">Hadiah acara</span>
      <span @click="tabClick(2)" :class="{act:show== 2}"> Aturan acara</span>
    </div>
    <div class="actTime">Waktu acara ： pukul 18:00:00 tgl 17 Jan – pukul 21:00:00 tgl 31 Jan</div>
    <div class="wards" v-show="show == 1">
      <h3> Hadiah acara </h3>
      <div class="wardImg2"></div>
      <h3> Hadiah Top 10 dari Daftar pemain terkuat</h3>
      <h6>Top 1:</h6>
      <p>Lencana pemain terkuat (30 hari)+mount GTR mars(30 hari)+3000koin emas+10000 kacang emas </p>
      <h6>Top 2:</h6>
      <p>Lencana pemain terkuat (30 hari)+mount GTR mars(30 hari)+2000koin emas+8000 kacang emas </p>
      <h6>Top 3:</h6>
      <p>Lencana pemain terkuat (30 hari)+mount GTR mars(30 hari)+1000koin emas+5000 kacang emas</p>
      <h6>Top 4-5:</h6>
      <p>Mount GTR mars(30 hari)+800koin emas+2000 kacang emas </p>
      <h6>Top 6-10:</h6>
      <p>Mount GTR mars(30 hari)+500koin emas+1000 kacang emas </p>
      <h3>Hadiah Top 10 dari Daftar hamster bahagia</h3>
      <h6>Top 1:</h6>
      <p>Lencana pemain terkuat (15 hari)+mount GTR mars(30 hari)+1000koin emas+8000 kacang emas </p>
      <h6>Top 2:</h6>
      <p>Lencana pemain terkuat (15 hari)+mount GTR mars(30 hari)+800koin emas+6000 kacang emas </p>
      <h6>Top 3:</h6>
      <p>Lencana pemain terkuat (15 hari)+mount GTR mars(30 hari)+600koin emas+4000 kacang emas </p>
      <h6>Top 4-5:</h6>
      <p>Mount GTR mars(30 hari)+300koin emas+1600 kacang emas </p>
      <h6>Top 6-10:</h6>
      <p>Mount GTR mars(30 hari)+200koin emas+900 kacang emas </p>
      <h3>Hadiah level memukul hamster</h3>
      <div class="wardImg3"></div>
      <h3>Aturan penggunaan tentang hadiah</h3>
      <div class="wardRule">
        <p>1.Kupon penuh 100 bonus 10 koin emas yg didapat melalui undian berlaku selama 24 jam, koin emasnya akan kirim ke akun setelah konsumsi.</p>
        <p>2.Kupon 3% bonus utk top up dan kupon 2% bonus utk top up yg didapat melalui undian berlaku selama 24 jam, kuota kuponnya bisa ditumpuk,bonus koin emasnya akan dikirim ke akun setelah setiap kali top up.</p>
      </div>
    </div>
    <div class="rules" v-show="show==2">
      <h3>Aturan acara</h3>
      <h6>Pendaftaran acara:</h6>
      <p>1.Klik "Segera mendaftar" untuk berpartisipasi dalam acara tersebut, data akan dihitung ke dalam hasil acara setelah Anda mengklik "Segera mendaftar".</p>
      <h6>Aturan peringkat dari daftar pemain</h6>
      <p>1.Ini akan menurut nilai main yang didapatkan setelah pendaftaran untuk melakukan peringkat. Jumlah koin game yg total digunakan sebagai nilai main.</p>
      <p>2.Bisa dapatkan koin game melalui selesaikan tugas harian,membantu teman penyanyi dan dibantu oleh teman penyanyi; bisa gunakan koin game dalam 2 proyek acara berikut: memukul hamster,roda keberuntungan besar. </p>
      <p>3.Jika nilai main yang didapatkan adalah sama, maka siapa yang pertama mencapai nilai main itu,maka peringkat siapa akan di depan.</p>
      <p>4.Daftar ini menampilkan hasil kompetisi pengguna dari Top 100.</p>
      <h6>Aturan peringkat dari daftar hamster bahagia</h6>
      <p>1、Setelah pendaftaran,peringkat akan menurut skor yang didapatkan dari memukul hamster.</p>
      <p>2、Jika nilai main yang didapatkan adalah sama, maka siapa yang pertama mencapai nilai main itu,maka peringkat siapa akan di depan.</p>
      <p>3、Daftar ini menampilkan hasil kompetisi pengguna dari Top 100.</p>
      <h6>Cara yg dapatkan koin game</h6>
      <p>
        Bisa dapatkan koin game melalui selesaikan tugas harian,membantu teman penyanyi dan dibantu oleh teman penyanyi.
        Koin game secara otomatis dikirim,koin game yg didapatkan setiap hari akan direset.
      </p>
      <h6>Selesaikan tugas harian dan dapatkan nilai:</h6>
      <p>Tugas harian dan koin game sesuainya berikut:</p>
      <div class="taskImg"></div>
      <p class="ps">Tips: Tugas dengan sawer kacang emas dan koin emas dalam nyanyian/kamar karaoke/kamar obrolan akan dihitung</p>
      <h6>Dapatkan koin game melalui membantu teman </h6>
      <p>1.Setiap hari paling banyak bisa membantu 3 teman,sehari bisa dibantu oleh sebanyak 3 teman</p>
      <p>2.Membantu teman 1 kali, saling dapat menambahkan 5 koin game</p>
      <h3>Cara menggunakan koin game</h3>
      <h6>Memukul hamster</h6>
      <p>1. gunakan 20 koin game bisa tukar 1 kali game memukul hamster,mencapai nilai yg sesuai bisa dapatkan hadiah yg sesuai</p>
      <h6>Roda keberuntungan besar</h6>
      <p>Setiap kali undian perlu bayar 20 koin game,hadiah yg menang segera dikirim ke akun.</p>
      <h3> Lainnya</h3>
      <div class="jinggao">
        Selama acara, jika pengguna ditemukan menggunakan cara yang tidak benar untuk berpartisipasi dalam acara, pihak Wekara berhak untuk membatalkan/diskualifikasi pengguna tanpa memberi tahu terlebih dahulu. Jika situasi serius maka pihak resmi wekara akan membekukan akun tersebut,termasuk tetapi tidak terbatas pada:
        <p>1）Penyalahgunaan atau meminjam akun orang lain untuk berpartisipasi dalam acara;</p>
        <p>2）Pengguna yang sama mendaftar beberapa akun tuyul untuk berpartisipasi dalam acara;</p>
        <p>3）Selama acara membuat komentar kurang sopan, iklan dan lain lain pada nyanyian yang ikut acara.</p>
        <p>4）Berpartisipasi dalam acara melalui pelanggaran lain.</p>
        Jika pengguna ditemukan menggunakan cara yang tidak benar untuk berpartisipasi dalam acara, apakah peserta atau tidak,pihak Wekara akan secara permanen membekukan semua akun besar atau kecil dari pelanggar. Setelah acara berakhir,pihak Wekara berhak untuk mengambil kembali semua hadiah dari pengguna/pelanggar ini.
      </div>
    </div>
    <p class="lastTips">Hak interpretasi akhir dari acara ini dipegang oleh penyelenggara acara</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: 1
    }
  },
  methods: {
    tabClick(val) {
      this.show = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #d94343;
}
.rule {
  padding: 0.29rem 0.41rem;
  .tabs {
    display: flex;
    justify-content: space-between;
    span {
      display: block;
      width: 3.3rem;
      height: 0.81rem;
      color: #ffd145;
      font-size: 93%;
      background: url(../../assets/img/ruleBg.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.81rem;
      &.act {
        color: #b98300;
        background: url(../../assets/img/ruleBgAct.png);
        background-size: 100% 100%;
      }
    }
  }
  .actTime {
    font-size: 80%;
    color: #ffa365;
    margin: 0.21rem auto 0;
    text-align: center;
  }
  h3 {
    margin: 0.46rem 0 0.31rem;
    text-align: center;
    color: #ffdc7f;
  }
  .wardImg2 {
    width: 6.41rem;
    height: 6.26rem;
    background: url(../../assets/img/wardImg2.png);
    background-size: 100% 100%;
    margin: 0 auto;
  }
  .wardImg3 {
    width: 5.8rem;
    height: 4.49rem;
    background: url(../../assets/img/wardImg.png);
    background-size: 100% 100%;
    margin: 0 auto;
  }
  h6,
  p {
    font-size: 70%;
    color: #ffddc7;
  }
  .wardRule {
    p {
      margin-top: 0.15rem;
    }
  }
  > p {
    padding-left: 0.4rem;
  }
  .lastTips {
    font-size: 80%;
    text-align: center;
    color: #e68d51;
    margin-top: 0.8rem;
  }
  .taskImg {
    width: 6.38rem;
    height: 6.81rem;
    background: url(../../assets/img/taskImg.png);
    background-size: 100% 100%;
    margin: 0.1rem 0 0 0.4rem;
  }

  .ps {
    color: #ffc29a;
  }
  .wards {
    p {
      margin-bottom: 0.15rem;
    }
  }
  .rules {
    h6 {
      font-size: 90%;
      margin-top: 0.25rem;
      font-weight: 700;
    }
    p {
      font-size: 70%;
      padding-left: 0.4rem;
      font-weight: 500;
    }
    .jinggao {
      font-size: 0.2rem;
      color: #ffddc7;
      p {
        font-size: 0.2rem !important;
      }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
