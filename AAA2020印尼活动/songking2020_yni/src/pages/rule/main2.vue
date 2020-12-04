<template>
  <div class="rule">
    <div class="topTabs">
      <span :class="{act:tab == 1}" @click="tabClick(1)">Hadiah acara</span>
      <span :class="{act:tab == 2}" @click="tabClick(2)">Aturan acara</span>
    </div>
    <div class="ruleTips" v-if="tab == 1">
      <h5>Waktu acara</h5>
      <p>Tgl 4 Dec,18:00 - tgl 13 Dec,21:00</p>
      <img src="../../assets/img/rule/gifts.png" alt="" class="gift">
      <h5>Hadiah peti harta </h5>
      <img src="../../assets/img/rule/img1.png" alt="" class="img1">
      <h5>Hadiah angpau</h5>
      <p>1.Selama acara,nyanyian dgn label “Kontes King Penyanyi Pesona” tiap kali menerima 150 hadiah mendukungmu(15 koin emas), 108 koin emas angpau dgn keberuntungan akan bisa dibuka,setiap kali 50 org bisa ambil angpau,siapa cepat akan bisa ambil.</p>
      <!-- <h5>歡歌榜飆升獎勵</h5>
      <p>1、帶有“年度魅力歌王大賽”標籤的參賽作品，在發佈後48小時內，收到50000金幣魅力值的禮物，可在APP內的歡歌榜分數飆升20%</p> -->
      <h5>Hadiah utk Top pesona</h5>
      <p class="mg">Top 1：<br />Sertifikasi King Penyanyi Pesona(1 bulan)+Lencana King Penyanyi Pesona(1 bulan)+7 digit yg keren+Bingkai avatar King Penyanyi Pesona(1 bulan)+Mount karpet merah(1 bulan)+Hadiah efek khusus rusa sika(666 koin emas)*3+2000 koin emas+5000 kacang emas</p>
      <p class="mg">Top 2:<br />Sertifikasi King Penyanyi Pesona(1 bulan)+Lencana King Penyanyi Pesona(1 bulan)+7 digit yg keren+Bingkai avatar King Penyanyi Pesona(1 bulan)+Mount karpet merah(1 bulan)+Hadiah efek khusus rusa sika(666 koin emas)*2+1500 koin emas+3000 kacang emas </p>
      <p class="mg">Top 3:<br />Sertifikasi King Penyanyi Pesona(1 bulan)+Lencana King Penyanyi Pesona(1 bulan)+7 digit yg keren+Bingkai avatar King Penyanyi Pesona(1 bulan)+Mount karpet merah(1 bulan)+Hadiah efek khusus rusa sika(666 koin emas)*2+1000 koin emas+2000 kacang emas</p>
      <p class="mg">Top 4-5:<br /> Lencana King Penyanyi Pesona(1 bulan)+7 digit yg keren+Binkai avatar King Penyanyi(1 bulan)+Mount karpet merah(1 bulan)+Hadiah efek khusus rusa sika(666 koin emas)*2+800 koin emas +2000 kacang emas</p>
      <p class="mg">Top 6-10:<br /> Lencana King Penyanyi Pesona(1 bulan)+7 digit yg keren+Binkai avatar King Penyanyi(1 bulan)+Mount karpet merah(1 bulan)+Hadiah efek khusus rusa sika(666 koin emas)*1+600 koin emas +1000 kacang emas</p>
      <h5>Aturan penggunaan hadiah</h5>
      <p>1.Hadiah ransel yg didapatkan oleh acara ini berlaku selama 14 hari, mohon digunakannya dalam periode yang berlaku.</p>
      <p>2.Hadiah acara akan dikirim selama 14 hari setelah acara berakhir.</p>
    </div>
    <div class="giftItem" v-else>
      <h5 class="mb">Waktu acara</h5>
      <p>Tgl 4 Dec,18:00 - tgl 13 Dec,21:00</p>
      <h4>Aturan acara</h4>
      <h5 class="mt">Mendaftar acara</h5>
      <p>1.Setelah klik "Segera Mendaftar", upload nyanyian umum apapun yg diposting (kecuali vocal 5 menit ) di halaman acara, bisa upload beberapa nyanyian untuk ikut acara, hadiah yang didapatkan dari nyanyian yang diposting akan dihitung setelah mendaftar. Jika kamu menghapus nyanyian yang diposting selama acara, maka nilai pesona hadiah dan jumlah klik like yg didapatkan dari nyanyian ini akan dibatalkan.</p>
      <h4>Aturan Peringkat Daftar Acara</h4>
      <h5 class="mt">Top pesona</h5>
      <p class="mg">1.Peringkat berdasarkan total nilai bersinar yg diperoleh setelah pendaftaran.</p>
      <p class="mg">2.Cara utk dapatkan nilai bersinar:</p>
      <p class="mg">Nilai bersinar = dapatkan jumlah klik like X10 + menerima nilai pesona hadiah koin emas dari nyanyian yg ikut acara.</p>
      <p class="mg">Jumlah klik like: hanya 30 like bisa hitung dalam skor.</p>
      <p class="mg">Nilai pesona hadiah koin emas : Nyanyian yg ikut acara tiap kali menerima 1 koin emas hadiah, sama dgn 10 nilai pesona.</p>
      <p class="mg">Meningkat nilai pesona dari hadiah tertentu:Hadiah tertentu utk acara ini adalah Mendukungmu (15 koin emas) ,Akordeo (168 Koin emas), Unicorn pelangi (499 koin emas),Balon cinta(888 koin emas ).Jika nyanyianmu menerima hadiah tertentu ini, nilai pesona akan meningkat 5%.</p>
      <p class="mg">Meningkat nilai pesona selama Waktu Tertentu: kalo nyanyian yg ikut acara menerima hadiah nyanyian apapun pd pukul 21:00 - 21:10 selama acara,nilai pesona akan meningkat 10%.</p>
      <!-- <p class="mg">3、2020年1-10月作品總收金幣禮魅力值排名前100名的歌友，可獲得魅力歌王榜魅力值加成，具體加成如下：</p>
      <img src="../../assets/img/rule/img2.png" alt="" class="img2"> -->
      <p>3.Jika nilai bersinar yg didapatkan adalah sama, maka siapa yang pertama mencapai nilai bersinar itu,peringkat siapa akan di depan</p>
      <p>4. Daftar ini menampilkan hasil kompetisi pengguna dari Top 100 </p>
      <h5>Cara utk dapatkan hadiah peti harta</h5>
      <p>1. Total 6 peti harta,nilai bersinar mencapai 100,1000,5000,10000,30000 akan bisa menerima hadiah peti harta yg sesuai, hadiah akan dikirm ke akunmu setelah menerima,silakan menerima hadiah pd waktu tepat~ Setiap org hanya bisa ambil 1 kali hadiah dalam peti harta yg sama.</p>
      <p>2.Waktu berlalu utk menerima hadiah peti harta sebelum acara berakhir,silakan menerima hadiah pd waktu tepat~</p>
      <img src="../../assets/img/rule/img1.png" alt="" class="img1 mt">
      <h5>Aturan ambil angpau</h5>
      <p>1. Selama acara,nyanyian dgn label “Kontes King Penyanyi Pesona” tiap kali menerima 150 hadiah mendukungmu(15 koin emas), 108 koin emas angpau dgn keberuntungan akan bisa dibuka,setiap kali 50 org bisa ambil angpau,siapa cepat akan bisa ambil.</p>
      <p>2.Setelah klik”Reservasi ambil hadiah”,ketika akan buka angpau , kamu bisa menerima pengingat sistem,kalo klik “ Batalkan Reservasi’,angpau pengingat sistem akan gak bisa diterima.</p>
      <h5>Lainnya</h5>
      <p>Selama acara, jika pengguna ditemukan menggunakan cara yang tidak benar untuk berpartisipasi dalam acara, pihak Wekara berhak untuk membatalkan/diskualifikasi pengguna tanpa memberi tahu terlebih dahulu. Jika situasi serius maka pihak resmi wekara akan membekukan akun tersebut,termasuk tetapi tidak terbatas pada:</p>
      <p>1.Nyanyian yang ikut acara bukan penyanyi asli (bernyanyi dengan sendiri) atau membajak nyanyian orang lain;</p>
      <p>2.Penyalahgunaan atau meminjam akun orang lain untuk berpartisipasi dalam acara;</p>
      <p>3. Pengguna yang sama mendaftar beberapa akun tuyul untuk berpartisipasi dalam acara;</p>
      <p>4.Selama acara membuat komentar kurang sopan, iklan dan lain lain pada nyanyian yang ikut acara ;</p>
      <p class="mg">5.Berpartisipasi dalam acara melalui pelanggaran lain.</p>
      <p>Jika ditemukan kecurangan,apakah peserta atau tidak,pihak Wekara akan secara permanen membekukan semua akun besar atau kecil dari pelanggar. Setelah acara berakhir,pihak Wekara berhak untuk mengambil kembali semua hadiah dari pelanggar ini.</p>
    </div>
    <p class="lastTips">Hak interpretasi akhir dari acara ini dipegang oleh penyelenggara acara</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 1
    }
  },
  created() {
    document.title = 'Hadiah&Aturan'
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
  background-color: RGBA(34, 33, 30, 1);
  .red {
    color: rgba(252, 245, 193, 1);
  }
  .rule {
    padding: 0 0.14rem;
    h5,
    h4 {
      color: rgba(254, 249, 120, 1);
      font-weight: bold;
      font-size: 0.32rem;
    }
    h4 {
      text-align: center;
      margin-top: 0.67rem;
    }
    h5 {
      margin: 0.65rem 0 0.2rem;
    }
    p {
      font-size: 0.28rem;
      font-weight: 500;
      padding-left: 0.7rem;
      em {
        font-size: 0.28rem;
        font-weight: 500;
      }
    }
    .gift {
      width: 7.22rem;
      height: 10.27rem;
      margin: 0.27rem auto 0;
    }
    .img1 {
      width: 7.02rem;
      height: 7.87rem;
      margin: 0 auto;
    }
    // .img2 {
    //   width: 7.02rem;
    //   height: 6.01rem;
    //   margin: 0 auto 0.34rem;
    // }
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
  align-self: center;
  background: url(../../assets/img/rank/topTabsBg.png);
  background-size: 100% 100%;
  margin: 0.38rem auto 0;
  span {
    width: 3.2rem;
    height: 0.8rem;
    text-align: center;
    line-height: 0.88rem;
    color: rgba(144, 133, 118, 1);
    font-size: 0.28rem;
    &.act {
      font-size: 0.32rem;
      color: rgba(126, 26, 6, 1);
      background: url(../../assets/img/rank/topTabsAct.png);
      background-size: 100% 100%;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
