<template>
  <div class="rule">
    <div class="topTabs">
      <span :class="{act:tab == 1}" @click="tabClick(1)">Hadiah acara</span>
      <span :class="{act:tab == 2}" @click="tabClick(2)">Aturan acara</span>
    </div>
    <div class="ruleTips" v-if="tab == 1">
      <h5>Waktu acara</h5>
      <p class="tm">Tgl 12 Mar, 18:00:00 - tgl 21 Mar, 21:00:00</p>
      <img src="../../assets/img/rule/gifts.png" alt="" class="gift">
      <h5>Hadiah pengundian level-dapatkan 3 hadiah utk setiap mengundian</h5>
      <img src="../../assets/img/rule/gifts2.png" alt="" class="img1">
      <p class="mb">1.Tiap hari mencapai level yg sesuai , Anda dapat menerima hadiah yg sesuai,tiap hari dapat menerimanya 1 kali, menerima hadiah hanya berlaku pada hari ini</p>
      <p>2.Undian ke-7 kali untuk Lv.4 pasti dptkan hadiah lencana</p>
      <h5>Hadiah Kemenangan Top Harian Pesona</h5>
      <img src="../../assets/img/rule/gifts3.png" alt="" class="img3">
      <p>Tips : Secara acak 10 org dari Top 100 Daftar Harian Pesona akan bisa mendapatkan 50 koin emas. Daftar pemenang akan diundian pada pukul 12 setiap malam, hari terakhir acara akan diundian pd
        akhir acara, dan hadiah ransel pemenang akan secara otomatis dikirim ke akun</p>
      <h5>Hadiah utk sponsor</h5>
      <p>Selama acara, Top 1 yg mensponsori jumlah kali angpau yg paling banyak akan dptkan hadiah penamaan dgn “Tepuk tangan utkmu” selama 30 hari. Jika jumlahnya sama, yang siapa pertama mencapai
        jumlahnya ,maka peringkat siapa akan di depan.</p>
      <h5>Hadiah Top 10 utk Daftar Total Pesona</h5>
      <p>Top 1:<br />Sertifikasi juru bicara pesona Mar(30 hari) + Paket hadiah besar juru bicara pesona(1 lagu dgn label juru bicara pesona direkomendasikan di beranda+2000 koin emas) +Lencana juru
        bicara pesona Mar(30 hari) + Bingkai avatar bunga semi (30 hari)+ Mount karpet merah(30 hari)+ VIP (30 hari)+Hadiah ransel glamor (109 koin emas) * 3+ 2500 koin emas+ 7000 kacang emas</p>
      <p>Top 2:<br />Lencana juru bicara pesona Mar(30 hari) + Bingkai avatar bunga semi (30 hari)+ Mount Karpet merah (30 hari)+ VIP (30 hari)+Hadiah ransel glamor (109 koin emas) * 2+ 2000 koin
        emas+ 5000 kacang emas</p>
      <p>Top 3:<br />Lencana juru bicara pesona Mar(30 hari) + Bingkai avatar bunga semi (30 hari)+ Mount Karpet merah (30 hari)+ VIP (30 hari)+Hadiah ransel glamor (109 koin emas) * 2+1500 koin emas+
        4000 kacang emas</p>
      <p>Top 4-5:<br />Lencana juru bicara pesona Mar(30 hari)+ Mount Karpet merah (30 hari)+ VIP (30 hari)+Hadiah ransel glamor (109 koin emas) * 1+1000 koin emas+ 3000 kacang emas</p>
      <p>Top 6-10:<br />Mount Karpet merah (30 hari)+ VIP (30 hari)+Hadiah ransel glamor (109 koin emas) * 1+800 koin emas+ 2000 kacang emas</p>
      <!-- <p>第十一-二十名：<br />元宵節快樂背包禮物（129金幣）*1+600金幣+600金豆</p> -->
      <h5>Aturan penggunaan hadiah</h5>
      <p>1. Hadiah ransel yang didapatkan oleh acara ini berlaku selama 14 hari, mohon digunakannya dalam periode yang berlaku.</p>
      <p>2.Kupon bonus sawer secara otomatis dikirim ke ransel. Kupon ini berlaku selama 24 jam setelah dapatkannya.Bonus koin emas akan segera kirim ke akunmu.</p>
    </div>
    <div class="giftItem" v-else>
      <h5 class="mb">Waktu acara</h5>
      <p>Tgl 12 Mar, 18:00:00 - tgl 21 Mar, 21:00:00</p>
      <h4>Aturan acara</h4>
      <h6>Mendaftar acara</h6>
      <p>1.Setelah klik "Segera Mendaftar", upload nyanyian umum apapun yg diposting setelah pukul 18:00:00 pada 12 Mar di halaman acara (kecuali vocal 5 menit ), bisa upload beberapa nyanyian utk
        ikut acara, hadiah dan like yg didapatkan dari nyanyian yang diposting akan dihitung setelah mendaftar. Jika nyanyian yg ikut acara dihapus, total nilai pesona hadiah dan jumlah like yg
        diperoleh dari nyanyian tersebut akan tidak dihitung.</p>
      <h5>Aturan peringkat acara</h5>
      <h6>Total Daftar Pesona</h6>
      <p>1.Peringkat berdasarkan pd total nilai bintang yg diperoleh setelah pendaftaran. <br />
        2.Cara utk dapatkan nilai bintang: Nilai bintang= dapatkan jumlah klik like X10 + menerima nilai pesona hadiah koin emas dari nyanyian yg ikut acara.<br />
        <span>Jumlah klik like: </span>hanya 30 like bisa hitung dalam skor<br />
        <span>Nilai pesona hadiah koin emas :</span>: Nyanyian yg ikut acara tiap kali menerima 1 koin emas hadiah, sama dgn 10 nilai pesona.<br />
        <span>Tambahkan nilai bintang:</span>：Ketika 1 angpau yg disponsori, nilai bintang ditambah 2%, batas atasnya 10%<br />
        3. Jika nilai bintang yg didapatkan adalah sama, maka siapa yang pertama mencapai nilai bintang itu,peringkat siapa akan di depan

      </p>
      <h6>Top Harian Pesona</h6>
      <p>
        1. Peringkat Daftar Harian Pesona menurut nilai bintang dari Daftar Haria <br />
        2.Jika nilai bintang harian yang didapatkan adalah sama, maka siapa yang pertama mencapai nilai bintang harian itu,peringkat siapa akan di depan.Top 100 nilai bintang harian bisa masuk Daftar
        Harian Pesona .<br />
        3.Secara acak 10 org dari Top 100 Daftar Harian Pesona akan bisa mendapatkan 50 koin emas<br />
        4. Probabilitas menang = nilai bintang daftar harian pengguna/ Top 100 total nilai bintang dari Daftar Harian pd hari ini
      </p>
      <h6>Cara pengundian level:</h6>
      <p>
        1. Total 5 peti harta,nilai bintang mencapai 100,1000,5000,10000,30000 akan bisa menerima hadiah peti harta yg sesuai,tiap kali undian akan dptkan 3 hadiah, hadiah akan dikirm ke akunmu
        setelah menerima,tiap org hanya bisa ambil 1 kali hadiah dlm peti harta yg sama, silakan menerima hadiah pd waktu tepat~<br />
        2.Waktu berlalu utk menerima hadiah peti harta sebelum acara berakhir,silakan undian dan menerima hadiah pd waktu tepat~<br />
        <!-- 3、所有老虎機抽獎有效期為活動結束前，請及時抽獎唷~ -->
      </p>
      <h6>Aturan ambil angpau:</h6>
      <p>
        Selama acara berlangsung, untuk setiap 1000 hadiah "Tepuk tangan utkmu" (10 koin emas) yang diterima dengan label "Kontes Juru Bicara Pesona",angpau keberuntungan dengan total 666 koin emas
        akan didistribusikan, dan jumlahnya angpau akan didistribusikan 200 pada setiap kali, Siapapun yang datang lebih awal akan mendapatkan<br />
        2.Setelah klik”Reservasi ambil angpau”,ketika akan buka angpau , kamu bisa menerima pengingat sistem,kalo klik “ Batalkan Reservasi’, pengingat sistem utk ambil angpau akan gak bisa diterima.
      </p>
      <h5>Lainnya</h5>
      <p class="mg">Selama acara, jika pengguna ditemukan menggunakan cara yang tidak benar untuk berpartisipasi dalam acara, pihak Wekara berhak untuk membatalkan/diskualifikasi pengguna tanpa
        memberi tahu terlebih dahulu. Jika situasi serius maka pihak resmi wekara akan membekukan akun tersebut,termasuk tetapi tidak terbatas pada:</p>
      <p>
        1.Nyanyian yang ikut acara bukan penyanyi asli (bernyanyi dengan sendiri) atau membajak nyanyian orang lain; <br />
        2.Penyalahgunaan atau meminjam akun orang lain untuk berpartisipasi dalam acara;<br />
        3. Pengguna yang sama mendaftar beberapa akun tuyul untuk berpartisipasi dalam acara;<br />
        4.Selama acara membuat komentar kurang sopan, iklan dan lain lain pada nyanyian yang ikut acara ; <br />
        5.Berpartisipasi dalam acara melalui pelanggaran lain.
      </p>
      <p>Jika ditemukan kecurangan,apakah peserta atau tidak,pihak Wekara akan secara permanen membekukan semua akun besar atau kecil dari pelanggar. Setelah acara berakhir,pihak Wekara berhak untuk
        mengambil kembali semua hadiah dari pelanggar ini.</p>
    </div>
    <p class="lastTips">Hak interpretasi akhir dari acara ini dipegang oleh penyelenggara acara</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: 1
    }
  },
  created () {
    document.title = '規則&獎勵'
  },
  methods: {
    tabClick (val) {
      this.tab = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: RGBA(255, 126, 108, 1);
  .red {
    color: rgba(252, 245, 193, 1);
  }
  .mg {
    margin: 0 !important;
  }
  .tm {
    padding-left: 0 !important;
  }
  .rule {
    padding: 0 0.14rem;
    h5,
    h4 {
      color: rgba(254, 249, 120, 1);
      font-weight: bold;
      font-size: 0.32rem;
    }
    h6 {
      color: #fef978;
      padding-left: 0.7rem;
    }
    h4 {
      margin-top: 0.47rem;
    }
    h5 {
      margin: 0.65rem 0 0.2rem;
    }
    p {
      font-size: 0.28rem;
      font-weight: 500;
      padding-left: 0.5rem;
      margin-bottom: 0.4rem;
      em {
        font-size: 0.28rem;
        font-weight: 500;
      }
    }
    .gift {
      width: 7.08rem;
      height: 5.16rem;
      margin: 0.27rem auto 0;
    }
    .img1 {
      width: 7.02rem;
      height: 2.26rem;
      margin: 0 auto;
    }
    .img2 {
      width: 7.02rem;
      height: 6.01rem;
      margin: 0 auto 0.34rem;
    }
    .img3 {
      width: 7.18rem;
      height: 2.13rem;
      margin: 0 auto;
    }
    .mg {
      margin-bottom: 0.5rem;
    }
    .mb {
      margin-bottom: 0;
    }
    .mt {
      margin-top: 0.2rem;
    }
    .lastTips {
      margin: 0.93rem 0 1.11rem;
      text-align: center;
    }
  }
}
.topTabs {
  width: 6.4rem;
  height: 0.88rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(../../assets/img/rankTabs.png);
  background-size: 100% 100%;
  margin: 0.38rem auto 0;
  span {
    width: 3.15rem;
    height: 0.85rem;
    text-align: center;
    line-height: 0.88rem;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.28rem;
    &.act {
      font-size: 0.32rem;
      color: rgba(126, 26, 6, 1);
      background: url(../../assets/img/rank/topTabsAct.png);
      background-size: 100% 100%;
    }
  }
}
@import '../../assets/scss/common.scss';
</style>
