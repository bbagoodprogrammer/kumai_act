<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:showType == 'wards'}" @click="clickTab('wards')">Hadiah Acara</span>
      <span :class="{act:showType == 'rules'}" @click="clickTab('rules')">Aturan Acara</span>
    </div>
    <div class="ward" v-show="showType == 'wards'">
      <p class="actTime">Waktu Acara:Pukul 18:00:00 tgl 19 Dec - pukul 21:00:00 tgl 26 Dec</p>
      <div class="wardImg"></div>
      <h3>Hadiah Top 10 dari Daftar Total Karnaval</h3>
      <div class="rankTop10">
        <h6>Top 1 :</h6>
        <p>Lencana Merry Christmas (30 hari ) + Hak istimewa bangsawan kaisar (31 hari ) + Mount rusa natal (30 hari ) + Hadiah efek khusus di kamar karaoke untuk Merry Christmas (Senilai 666 koin emas ) + 5000 Koin emas + 5000 Kacang emas</p>
        <h6>Top 2 :</h6>
        <p>Lencana Merry Christmas (30 hari ) +Hak istimewa bangsawan duke (31 hari ) + Mount rusa natal (30 hari ) + Hadiah efek khusus di kamar karaoke untuk Merry Christmas (Senilai 666 koin emas ) + 3000 Koin emas + 3000 Kacang emas</p>
        <h6>Top 3 :</h6>
        <p>Lencana Merry Christmas (30 hari ) +Hak istimewa bangsawan duke (31 hari ) + Mount rusa natal (30 hari ) + Hadiah efek khusus di kamar karaoke untuk Merry Christmas (Senilai 666 koin emas ) + 2500 Koin emas + 2500 Kacang emas</p>
        <h6>Top 4 - 5 :</h6>
        <p>Lencana Merry Christmas (30 hari ) + Mount rusa natal (30 hari ) + Hadiah efek khusus di kamar karaoke untuk Merry Christmas (Senilai 666 koin emas ) + 2000 Koin emas + 2000 Kacang emas</p>
        <h6>Top 6 - 10:</h6>
        <p>Mount rusa natal (30 hari ) + Hadiah efek khusus di kamar karaoke untuk Merry Christmas (Senilai 666 koin emas ) + 1000 Koin emas + 1000 Kacang emas</p>
      </div>
      <h3>Hadiah pemenang dari Daftar Harian Karnaval</h3>
      <div class="wardImg2"></div>
      <h3>Hadiah Paket Natal Harian</h3>
      <div class="dayBar">
        <h6>Nilai karnaval mencapai 70 pada hari ini :</h6>
        <p>Anda akan mendapatkan 100 kacang emas, kalau selama beberapa hari berturut-turut mencapai nilai 70 , akan mendapatkan lebih banyak kacang emas. Jumlah kacang emas yang didapatkan= 100 + 10 * Jumlah hari berturut-turut mencapai nilai 70
          </br>Misalnya: Hari pertama Anda mencapai, Anda akan mendapatkan 110 kacang emas. Ketika hari kedua Anda mencapai, Anda akan mendapatkan 120 kacang emas……Ketika hari kedelapan Anda mencapai , Anda akan mendapatkan 180 kacang emas</p>
        <h6>Nilai karnaval mencapai 90 pada hari ini :</h6>
        <p>Hadiah mungkin adalah : Hadiah ransel kepingan salju natal * 1 (2 koin emas), VIP (3 hari), Mount airship romantis (3 hari), Mount Red Eagle Fighting (3 hari)</p>
        <h6>Nilai karnaval mencapai 130 pada hari ini :</h6>
        <p>Anda akan mendapatkan salah satu dari hadiah ransel suit natal yang baru dibuat (masing-masing bernilai 10 koin emas). Ada total 8 hadiah ransel suit natal. Setiap hari hadiah yang dikirim selama acara tidak diulang,jangan lewatkan acara ~</p>
        <h6>Nilai karnaval mencapai 150 pada hari ini :</h6>
        <p>Wekara akan memberikan 1 hadiah*2 dengan acak dari 3 buah hadiah yang didapatkan pada hari ini.</br>
          Misalnya, hari ini Anda mendapatkan 3 buah hadiah adalah 150 kacang emas, VIP (3 hari), hadiah ransel kaus kaki natal (10 koin emas) * 1, maka Anda mungkin secara acak mendapatkan 300 kacang emas, VIP (6 hari), atau hadiah ransel kaus kaki natal (10 koin emas) * 2</p>
      </div>
      <h3>Aturan penggunaan tentang hadiah</h3>
      <p>1、Hadiah ransel yang didapatkan berlaku selama 30 hari, silakan gunakannya dalam periode validitas.</p>
      <p>2、Versi Android dari hadiah ransel dapat dilihat di Saya - Ransel, dan ketika Anda memberikan hadiah, Anda dapat memilih hadiah ransel untuk sawer.</p>
    </div>
    <div class="rules" v-show="showType == 'rules'">
      <p class="actTime">Waktu Acara:Pukul 18:00:00 tgl 19 Dec - pukul 21:00:00 tgl 26 Dec</p>
      <h3>Aturan Acara</h3>
      <h6>Mendaftar Acara:</h6>
      <p>1.Klik "Segera mendaftar" untuk berpartisipasi dalam acara tersebut, data akan dihitung ke dalam hasil acara setelah Anda mengklik "Segera mendaftar".</p>
      <p>2.Anda bisa upload nyanyian publik apapun (kecuali vocal 5 menit) dalam halaman acara setelah mengklik"Segera mendaftar", Anda bisa upload beberapa nyanyian untuk ikut acara.Hadiah dari nyanyian akan dihitung setelah pendaftaran. Jika Anda menghapus nyanyian yang diposting selama acara, maka hasilnya/nilai hadiah yang didapatkan dari nyanyian ini akan dibatalkan.</p>
      <h3>Aturan peringkat dari daftar acara</h3>
      <h6>Daftar Total Karnaval:</h6>
      <p>1. Ini akan menurut nilai karnaval yang didapatkan setelah pendaftaran untuk melakukan peringkat. Nilai karnaval = nilai kumulatif poin + nilai pesona dari hadiah koin emas yang didapatkan dari kamar karaoke atau nyanyian</p>
      <p>2. Nilai kumulatif poin didapatkan dengan menyelesaikan tugas harian</p>
      <p>3. Hadiah koin emas yang didapatkan dalam kamar karaoke atau nyanyian akan dihitung dalam daftar. Setiap kali kamu mendapatkan hadiah 1 koin emas ,akan dikonversi menjadi 10 nilai karnaval</p>
      <p>4. Jika nilai karnaval yang didapatkan adalah sama, maka siapa yang pertama mencapai nilai karnaval itu,peringkat siapa akan di depan</p>
      <p>5. Daftar ini menampilkan hasil kompetisi pengguna dari Top 100 </p>
      <h6>Daftar Harian Karnaval:</h6>
      <p>1、Pengguna yang nilai karnaval harian lebih dari atau sama dengan nilai 3000 bisa memasuki Daftar Harian Karnaval</p>
      <p>2、Pengguna yang memasuki Daftar Harian Karnaval akan memiliki kesempatan untuk mendapatkan hadiah ransel suit natal (120 koin emas) * 1 + mount rusa natal (7 hari). Winning rate = nilai karnaval kamu dari Daftar Harian/nilai total karnaval dari Daftar Harian pada hari ini. Nilai karnaval dari daftar harian semakin tinggi, maka Winning rate akan semakin besar</p>
      <p>3、Jumlah pemenang dalam sehari adalah 20% dari total jumlah orang yang masuk dalam Daftar Harian pada hari ini. Banyak hadiah, jangan lewatkan yuk</p>
      <p>4、Daftar pemenang akan diundian/diambil pada pukul 12:00 setiap hari malam. Ketika hari terakhir acara akan melakukan undian/ambil setelah acara berakhir. Hadiah rasel dan mount yang didapatkan akan secara otomatis dikirim ke akun</p>
      <p>Tips : Pengguna yang masuk peringkat depan dari Daftar Harian tidak akan lagi memberikan hadiah bonus dengan ekstra</p>
      <h6>Cara yang mendapatkan poin</h6>
      <p>1. Poin bisa didapatkan dengan menyelesaikan tugas yang tertentu setiap hari, setelah menyelesaikan tugas, poin akan secara otomatis dikirim, dan poin yang didapatkan akan dihapus setiap hari
        </br>Tugas tantangan harian dan poin terkait adalah sebagai berikut:</p>
      <div class="tasKImg"></div>
      <h6>Menerima hadiah natal harian:</h6>
      <p>1、Poin yang dicapai setiap hari dibagi menjadi 4 level: poin pada hari ini mencapai 70, 90, 130, 150. Setiap kali Anda mencapai level, Anda akan bisa menerima hadiah yang sesuai, dan hadiah akan secara otomatis dikirim setelah menerima</p>
      <p>2、Hadiah natal yang didapatkan ketika kamu mencapai poin ,hanya berlaku pada hari ini, silakan menerima pada tepat waktu ~</p>
      <h3>Lainnya</h3>
      <p>Selama acara, jika pengguna ditemukan menggunakan cara yang tidak benar untuk berpartisipasi dalam acara, pihak Wekara berhak untuk membatalkan/diskualifikasi pengguna tanpa memberi tahu terlebih dahulu. Jika situasi serius maka pihak resmi wekara akan membekukan akun tersebut,termasuk tetapi tidak terbatas pada:</p>
      <p>1.Nyanyian yang ikut acara bukan penyanyi asli (bernyanyi dengan sendiri) atau membajak nyanyian orang lain;</p>
      <p>2.Penyalahgunaan atau meminjam akun orang lain untuk berpartisipasi dalam acara;</p>
      <p>3. Pengguna yang sama mendaftar beberapa akun tuyul untuk berpartisipasi dalam acara;</p>
      <p>4.Selama acara membuat komentar kurang sopan, iklan dan lain lain pada nyanyian yang ikut acara ;</p>
      <p>5.Berpartisipasi dalam acara melalui pelanggaran lain.</p>
      <div class="tips">Jika pengguna ditemukan menggunakan cara yang tidak benar untuk berpartisipasi dalam acara, apakah peserta atau tidak,pihak Wekara akan secara permanen membekukan semua akun besar atau kecil dari pelanggar. Setelah acara berakhir,pihak Wekara berhak untuk mengambil kembali semua hadiah dari pengguna/pelanggar ini.</div>
      <div class="tips">Hak interpretasi akhir dari acara ini dipegang oleh penyelenggara acara</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showType: 'wards'
    }
  },
  methods: {
    clickTab(val) {
      this.showType = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #cf3052;
}
.actTime {
  font-size: 80%;
  color: #ffefd7;
  margin: 0.36rem 0 0.28rem;
  text-align: center;
}
.rule {
  padding-top: 0.28rem;
  .tabs {
    width: 6.67rem;
    height: 0.88rem;
    background: url(../../assets/img/tabsBg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    span {
      display: block;
      width: 3.57rem;
      height: 0.85rem;
      text-align: center;
      line-height: 0.85rem;
      &.act {
        background: url(../../assets/img/tuleTabaAct.png);
        background-size: 100% 100%;
      }
    }
  }

  h3 {
    height: 0.9rem;
    line-height: 0.9rem;
    background: url(../../assets/img/h3Bg.png);
    background-size: 100% 100%;
    margin: 0.29rem auto 0;
    text-align: center;
    color: #ffeabe;
    white-space: nowrap;
  }
  h6 {
    color: #ffae00;
    font-size: 80%;
    margin-top: 0.2rem;
  }
  p {
    color: #ffd3dc;
    font-size: 73%;
  }
  .rules {
    padding: 0 0.22rem 0.7rem;
  }
  .ward {
    padding: 0 0.22rem 0.7rem;
    .wardImg {
      width: 7.05rem;
      height: 4.92rem;
      background: url(../../assets/img/wardImg.png);
      background-size: 100% 100%;
      margin: 0 auto;
    }
    p {
      color: #ffd3dc;
      font-size: 73%;
    }
    .rankTop10 {
      h6 {
        color: #ffae00;
        font-size: 80%;
        margin-top: 0.2rem;
      }
      p {
        color: #ffd3dc;
        font-size: 73%;
      }
    }
    .dayBar {
      h6 {
        color: #ffae00;
        font-size: 80%;
        margin-top: 0.2rem;
      }
      p {
        color: #ffd3dc;
        font-size: 73%;
      }
    }
    .wardImg2 {
      width: 6.6rem;
      height: 6.67rem;
      background: url(../../assets/img/wardImg2.png);
      background-size: 100% 100%;
      margin: 0 auto;
    }
  }
  .tips {
    margin-top: 0.25rem;
    color: #ffd3dc;
    font-size: 73%;
  }
  .tasKImg {
    width: 6.83rem;
    height: 6.93rem;
    background: url(../../assets/img/taskImg.png);
    background-size: 100% 100%;
    margin: 0.15rem auto;
  }
  .clearfix:after {
    content: "";
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }
}
@import "../../assets/scss/common.scss";
</style>
