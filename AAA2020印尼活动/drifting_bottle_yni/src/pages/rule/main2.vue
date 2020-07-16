<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:showType==1}" @click="tabClick(1)">Aturan Acara</span>
      <span :class="{act:showType==2}" @click="tabClick(2)">Hadiah Acara</span>
    </div>
    <div class="ruleTips" v-if="showType==1">
      <h5>Proses Acara:</h5>
      <div class="time">
        <p>Waktu Acara：tgl 17 Juli ,pukul 18:00 ~ tgl 28 Juli,pukul 21:00</p>
        <p>Waktu melempar botol: tgl 17 Juli ,pukul 18:00 ~ tgl 28 Juli,pukul 18:00 </p>
        <p>Waktu ambil botol:tgl 18 Juli ,pukul 00:00 ~ tgl 28 Juli,pukul 21:00 </p>
      </div>
      <h5>Aturan melempar botol:</h5>
      <p>1.Anda bisa memilih nyanyianmu atau nyanian yg Anda sukai utk melakukan melempar botol, beli 1 kali akan rekomendasikan 1 nyanyian, gratis utk pertama kali melempar botol dengan biasa setiap hari.<br /> <strong class="red">Tips:Setiap hari lagu botol yg dilempar harus lagu solo dan dipublikasikan selama 72 jam pd akhir-akhir ini, dan lagunya belum berpartisipasi dalam acara lain</strong> </p>
      <p>2.Melempar dengan gratis,sistem akan secara cerdas mengalokasikan jumlah orang yang mendengarkan lagu dan durasinya, mencocokkan dengan audiens yang paling mungkin tertarik pd nyanyian ini utk lakukan melempar, dan nyanyian yg berkualitas akan mendapatkan lebih banyak jumlah kali utk eksposur ~<br /> <strong class="red">Tips:Setiap nyanyian hanya dapat memiliki 1 kesempatan utk melempar dengan gratis, harap hargai kesempatan ini ~</strong> </p>
      <p>3.Melempar dengan khusus:Anda dapat mengatur jumlah botol yg akan dilemparkan, botol premium yg dilemparkan dengan khusus bisa mendapatkan waktu dengarkan lebih lama, dan nyanyian yg berkualitas akan mendapatkan lebih banyak jumlah kali utk eksposur ~<br /><strong class="red">Tips:Jumlah orang yg dilempar maksudnya jumlah kali eksposur , belum tentu sama dengan jumlah pendengar</strong></p>
      <p>4.Hasil nyanyian yg dilemparkan dapat dilihat dalam Catatan Lempar, Anda dapat melihat jumlah pendengar dan pengikut</p>
      <p>5.Selama melempar, lagu dihapus atau dikuncii, yang akan membuat orang lain tidak dapat mengambilnya</p>
      <h5>Aturan ambil botol:</h5>
      <p>1.Setiap pengguna bisa ambil 6 kali dgn gratis tiap hari</p>
      <p>2.Setiap putaran akan secara acak mengambil 1-6 botol, termasuk botol puing, botol premium dan botol biasa. Botol puing tidak ada lagu,bisa langsung buang kembali ke laut ketika Anda ambilnya.Mendengarkan lagu2 setelah botol lagu diambil,Anda bisa mendapatkan hadiah berbeda.</p>
      <p>3.Setiap lagu layak didengarkan dgn hati2. Jika ditemukan kecurangan atau komentar jahat, Wekara berhak utk membatalkan hadiahmu dalam acara dan membatalkan skor acara.</p>
      <h5>Lainnya: </h5>
      <p>Selama acara, jika pengguna ditemukan menggunakan cara yg tidak benar utk berpartisipasi dalam acara, pihak Wekara berhak utk membatalkan pengguna tanpa memberi tahu terlebih dahulu. Jika situasi serius maka pihak Wekara akan membekukan akun tersebut,termasuk tetapi tidak terbatas pada:</p>
      <div class="other">
        <p>1.Penyalahgunaan atau meminjam akun orang lain utk berpartisipasi dalam acara;</p>
        <p>2. Pengguna yg sama mendaftar beberapa akun tuyul utk berpartisipasi dalam acara;</p>
        <p>3.Berpartisipasi dalam acara melalui pelanggaran lain;</p>
        <p>4.Selama acara,konten,kata pengantar dan komentar dari nyanyian yg ikut acara melibatkan fitnah, penyalahgunaan, serangan, penghinaan, dan sindiran</p>
        <p>5.Selama acara membuat komentar kurang sopan, iklan dan lain lain pd nyanyian yg ikut acara ;</p>
        <p>6.Jika seseorang melaporkan bahwa lagu botol yg dilemparkan belum dinyanyikan dan benar, maka lagu ini akan didiskualifikasi, dan jika situasinya serius, pengguna ini yg melemparkan botol akan didiskualifikasi dari acara.</p>
        <p>7. Nyanyian yg ikut acara bukan penyanyi asli (bernyanyi dengan sendiri) atau membajak nyanyian orang lain</p>
      </div>
      <p>Jika ditemukan kecurangan,apakah peserta atau tidak,pihak Wekara akan secara permanen membekukan semua akun besar atau kecil dari pelanggar. Setelah acara berakhir,pihak Wekara berhak untuk mengambil kembali semua hadiah dari pengguna/pelanggar ini.</p>
    </div>
    <div class="wardsTips" v-else>
      <h5>Hadiah utk melempar botol</h5>
      <p>Peringkat menurut jumlah pendengar, waktu mendengarkan, dan tambah jumlah follower dari nyanyian ini</p>
      <p>Setelah acara berakhir, daftar lagu akan diumumkan ~</p>
      <h5>Peringkat lagu dari Top 1~10 </h5>
      <div class="giftBox">
        <span v-for="(item,index) in tenGift" :key="index">
          <img :src="require(`../../assets/img/gift/${item.img}.png`)" alt="">
          <strong>{{item.name}}</strong>
        </span>
      </div>
      <h5>Peringkat lagu dari Top 11~100 </h5>
      <div class="giftBox2">
        <span v-for="(item,index) in otherGift" :key="index">
          <img :src="require(`../../assets/img/gift/${item.img}.png`)" alt="">
          <strong>{{item.name}}</strong>
        </span>
      </div>
      <p>Deskripsi hadiah:</p>
      <p>Jika pengguna yg sama memiliki beberapa lagu dalam daftar, Wekara akan pilih 1 nyanyian dengan skor tertinggi utk kirim hadiah</p>
      <h5>Hadiah utk ambil botol </h5>
      <p>Jika Anda mengambil botol biasa dan mendengarkan lagu selama 20S, Anda akan mendapatkan 2 kacang emas.Jika Anda mengambil botol premium dan mendengarkan lagu selama 30S, Anda akan mendapatkan 5 kacang emas atau koin emas yg berbeda.Dan hadiah koin emas secara acak jatuh selama mengambil botol ~</p>
      <p class="red">Tips: Hadiah ransel yg didapatkan hanya berlaku selama 7 hari, silakan gunakannya sesegera mungkin ~</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showType: 1,
      tenGift: [
        {
          img: 0,
          name: '100 koin emas'
        },
        {
          img: 1,
          name: 'Hadiah ransel botol melayang yg mimpi'
        },
        {
          img: 2,
          name: 'Lencana drifter berkualitas '
        },
        {
          img: 3,
          name: 'VIP (1 bulan)'
        },
      ],
      otherGift: [
        {
          img: 4,
          name: '500Kacang emas'
        },
        {
          img: 2,
          name: 'Lencana drifter berkualitas'
        },
        {
          img: 3,
          name: 'VIP (1 bulan)'
        },
      ]
    }
  },
  created() {
    document.title = 'Hadiah Aturan'
  },
  methods: {
    tabClick(val) {
      this.showType = val
    }
  }
}
</script>

<style lang="scss">
.red {
  color: orange;
}
body {
  background-color: rgba(16, 128, 208, 1);
}
.rule {
  padding: 0.25rem 0.26rem;
  .tabs {
    width: 6.88rem;
    height: 0.98rem;
    display: flex;
    align-items: center;
    padding: 0 0.05rem;
    background: url(../../assets/img/ruleTabs.png);
    background-size: 100% 100%;
    span {
      width: 3.66rem;
      height: 0.9rem;
      text-align: center;
      line-height: 0.9rem;
      color: rgba(255, 220, 42, 1);
      font-weight: 700;
      font-size: 0.32rem;
      &.act {
        color: rgba(174, 72, 0, 1);
        background: url(../../assets/img/ruleAct.png);
        background-size: 100% 100%;
      }
    }
  }
  .ruleTips {
    padding-left: 0.3rem;
    h5 {
      font-weight: 800;
      color: rgba(255, 211, 168, 1);
      margin: 0.4rem 0 0.25rem;
    }
    .time,
    .other {
      p {
        margin: 0;
      }
    }
    .other {
      margin-bottom: 0.3rem;
    }
    p {
      padding-left: 0.33rem;
      font-size: 0.24rem;
      color: rgba(181, 218, 255, 1);
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
  }
  .wardsTips {
    padding-bottom: 1.5rem;
    h5 {
      text-align: center;
      font-weight: 800;
      color: rgba(255, 211, 168, 1);
      margin: 0.28rem 0 0.24rem 0;
    }
    p {
      color: rgba(181, 218, 255, 1);
      font-size: 0.24rem;
      font-weight: 600;
    }
    .giftBox,
    .giftBox2 {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 1.6rem;
      span {
        margin-bottom: 0.26rem;
      }
      img {
        width: 1.6rem;
        height: 1.6rem;
        display: block;
      }
      strong {
        width: 1.6rem;
        display: block;
        color: rgba(218, 209, 255, 1);
        font-size: 0.24rem;
        font-weight: 600;
        margin-top: 0.15rem;
        text-align: center;
      }
    }
    .giftBox2 {
      padding: 0 0.55rem;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
