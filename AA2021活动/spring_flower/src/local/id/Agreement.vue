<template>
  <div class="rule">
    <div class="tabs">
      <a class="tab1" @click.prevent="mainTab=0" :class="{current:mainTab==0}" href="">Penghargaan Aktivitas</a>
      <a class="tab2" @click.prevent="mainTab=1" :class="{current:mainTab==1}" href=""> Aturan aktivitas</a>
    </div>
    <div class="actTime">
      Waktu：18:00:00 tgl 15 April ~ 21:00:00 tgl 3 Mei
    </div>
    <div class="ruleList" v-if="mainTab == 0">
      <h5>Penghargaan Aktivitas</h5>
      <div class="giftArr">
        <div class="giftItem" v-for="(item,index) in giftArr" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div>
      </div>
      <h5>Penghargaan Pencapaian</h5>
      <img src="./img/table2.png" alt="" class="table">
      <h5>Penghargaan Top 10</h5>
      <h6>Top 1:</h6>
      <p>Lencana Tukang Kebun Terbaik(30 hari) + Rusa Matahari(30 hari) + Hadiah Ransel Karangan Bunga * 10 + 5000 koin emas + 8000 kacang emas</p>
      <h6>Top 2:</h6>
      <p>Lencana Tukang Kebun Terbaik(20 hari) + Rusa Matahari(20 hari) + Hadiah Ransel Karangan Bunga * 8 + 3000 koin emas + 5000 kacang emas</p>
      <h6>Top 3:</h6>
      <p>Lencana Tukang Kebun Terbaik(20 hari) + Rusa Matahari(20 hari) + Hadiah Ransel Karangan Bunga * 6 + 1000 koin emas + 3000 kacang emas</p>
      <h6>Top 4-6:</h6>
      <p> Lencana Tukang Kebun Terbaik(15 hari) + Rusa Matahari(15 hari) + Hadiah Ransel Karangan Bunga * 4 + 800 koin emas + 2000 kacang emas</p>
      <h6>Top 7-10:</h6>
      <p>Lencana Tukang Kebun Terbaik(7 hari) + Rusa Matahari(10 hari) + Hadiah Ransel Karangan Bunga * 2 + 500 koin emas + 1000 kacang emas</p>
      <h5 class="mt">Aturan penggunaan penghargaan</h5>
      <p>1. Kupon top-up bonus koin emas berlaku dalam waktu 24 jam setelah diterima, dan dapat digunakan dalam tumpukan, dan koin emas bonus akan dikirimkan ke akun Anda segera</p>
      <p>2. Hadiah ransel berlaku selama 7 hari, silakan gunakan dalam waktu yang berlaku</p>
    </div>
    <div class="giftItme" v-else>
      <h5>Aturan aktivitas</h5>
      <h6>Pendaftaran aktivitas</h6>
      <p>Klik "Daftar Segera" untuk berpartisipasi dalam aktivitas ini, dan data setelah mengklik "Daftar Segera" akan dihitung ke dalam hasil aktivitas</p>
      <h6>Aturan peringkat aktivitas</h6>
      <p>1. Diurutkan berdasarkan jumlah total bunga keinginan yang berhasil dipanen oleh pengguna selama periode acara (termasuk jumlah bunga yang dikonsumsi), bunga yang belum dipanen di taman bunga
        tidak termasuk dalam jumlah total</p>
      <p>2. Jika jumlah bunga keinginan yang diperoleh sama, yang pertama mencapai jumlah tersebut akan menempati peringkat pertama</p>
      <p>3. Daftar tersebut menunjukkan hasil aktivitas dari 100 pengguna teratas, dan hadiah daftar akan dikeluarkan dalam waktu 7 hari setelah aktivitas berakhir</p>
      <h5>Strategi penanaman</h5>
      <h6>1. Buku Biji</h6>
      <p>(1) Biji biasa:</p>
      <p>Setiap biji biasa setelah panen akan dapatkan 5 bunga keinginan dengan waktu pertumbuhan 10 menit, diperoleh melalui tugas check-in tukang kebun.</p>
      <p>(2) Biji putih:</p>
      <p>Setiap biji putih setelah panen akan dapatkan 15 bunga keinginan dengan waktu pertumbuhan 10 menit. Setiap taman bunga dapat menanam hingga 5 biji sekaligus, diperoleh dengan top-up.</p>
      <p class="se">* Koin emas yg top-up hanya dihitung untuk hari itu dan disetel ulang pada pukul 00:00 setiap hari</p>
      <h6>2. Instruksi penanaman</h6>
      <p>1) Klik pada taman bunga kosong dan pilih [Biji biasa] atau [Biji putih] untuk ditanam</p>
      <p>2) Setelah penanaman berhasil, benih akan memasuki hitungan mundur pertumbuhan; bila banyak [biji putih] ditanam, waktu tumbuhnya menjadi 10 menit * jumlah tanam</p>
      <p>3) Ketika hitungan mundur untuk pertumbuhan benih berakhir, bunga keinginan sudah matang, klik bunga keinginan yang matang untuk berhasil panen. Untuk setiap 20 bunga keinginan yang
        terkumpul, Anda dapat menarik 1 kali:</p>
      <p class="se">* Setelah acara selesai, penanaman, percepatan, dan pemetikan tidak boleh dilakukan</p>
      <h6>3. Instruksi percepatan</h6>
      <p>(1) Mengkonsumsi [Berkah Dewa Bunga] sekali untuk mengurangi 10 menit waktu tumbuh dari taman bunga target; bila waktu pertumbuhan yang tersisa kurang dari 10 menit, bunga keinginan taman
        bunga akan segera matang.</p>
      <p>(2) Kesempatan [Berkah Dewa Bunga] diperoleh dengan top-up.</p>
      <h6>4. Perluasan taman</h6>
      <p>Pengguna dapat membayar untuk memperluaskan taman bunga dengan koin emas. Dalam acara, setiap orang dapat memperluas hingga 3 taman bunga, dan taman bunga yang diperluas tersebut berlaku
        selama acara berlangsung.</p>
      <h5 class="mt">Undian</h5>
      <p>Selama acara, Anda dapat mengkonsumsi 20 bunga keinginan tiap kali untuk menggoyang vas bunga keinginan untuk mendapatkan hadiah. Hadiah akan secara otomatis dikirim ke akun.</p>
      <h5 class="mt">Keterangan lainnya</h5>
      <p>Selama acara, jika pengguna ditemukan telah menggunakan cara yang tidak tepat untuk berpartisipasi dalam aktivitas, Wekara berhak untuk menjatuhkan hukuman seperti diskualifikasi atau
        pelarangan akun pada kontestan dan pelanggar berdasarkan keadaan serius tanpa pemberitahuan sebelumnya, termasuk namun tidak terbatas pada :</p>
      <p>1) Karya dari acara tersebut aslinya tidak dinyanyikan atau dibajak oleh orang lain;</p>
      <p>2) Menyalahgunakan atau meminjam akun orang lain yang ada untuk berpartisipasi dalam aktivitas;</p>
      <p>3) Pengguna yang sama mendaftarkan banyak akun untuk berpartisipasi dalam aktivitas;</p>
      <p>4) Komentar, iklan, dll. yang berbahaya pada nyanyian selama kompetisi;</p>
      <p>5) Berpartisipasi dalam kegiatan melalui pelanggaran lainnya.</p>
      <p>Jika pengguna bercurang prakarsa, terlepas dari apakah itu peserta atau bukan, semua akun pengguna diblokir secara permanen, Wekara memiliki hak untuk menarik semua hadiah pengguna setelah
        acara tersebut.</p>
    </div>
    <p class="lastTips lastMt">Hak interpretasi terakhir acara ini adalah milik penyelenggara acara</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      mainTab: 0,
      giftArr: [
        {
          name: 'Rusa Matahari',
          img: require('../../img/ruleGift/gift_9.png')
        },
        {
          name: 'Lencana Tukang Kebun Terbaik',
          img: require('../../img/ruleGift/gift_2.png')
        },
        {
          name: 'Hadiah Ransel Pot Bunga',
          img: require('../../img/ruleGift/gift_3.png')
        },
        {
          name: 'Hadiah Ransel Karangan Bunga',
          img: require('../../img/ruleGift/gift_4.png')
        },
        {
          name: 'Bingkai Roket Super',
          img: require('../../img/ruleGift/gift_5.png')
        },
        {
          name: 'VIP',
          img: require('../../img/ruleGift/gift_6.png')
        },
        {
          name: 'Koin emas',
          img: require('../../img/ruleGift/gift_7.png')
        },
        {
          name: 'Kacang emas',
          img: require('../../img/ruleGift/gift_8.png')
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.se {
  color: RGBA(179, 249, 255, 1);
}
.lastTips {
  text-align: center;
  color: rgba(196, 202, 255, 1);
}
.mt {
  margin-top: 0.3rem;
}
.lastMt {
  margin-top: 3rem;
}
.table {
  display: block;
  width: 6.5rem;
  height: 2.89rem;
  margin: 0 auto 0.25rem;
}
.giftArr {
  width: 6.5rem;
  height: 4.34rem;
  background: url(../../img/ruleGiftListBg.png);
  background-size: 100% 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  padding-top: 0.35rem;
  margin-bottom: 0.25rem;
  .giftItem {
    height: 1.6rem;
    width: 25%;
  }
  .imgBox {
    width: 1.3rem;
    height: 1.3rem;
    background: #5447BE;
    border-radius: 0.2rem;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  strong {
    display: block;
    text-align: center;
    color: rgba(196, 202, 255, 1);
    font-size: 0.22rem;
  }
}
h5 {
  font-size: 0.28rem;
  color: rgba(255, 219, 125, 1);
  text-align: center;
  margin-bottom: 0.25rem;
}
h6 {
  color: rgba(255, 219, 125, 1);
  font-size: 0.28rem;
  margin-top: 0.15rem;
}

.rule {
  background: rgba(121, 118, 237, 1);
  padding: 0.37rem 0.22rem;
}
p {
  margin-top: 0.15rem;
  color: #fed8ff;
  font-size: 0.22rem;
}
.tabs {
  width: 6.8rem;
  height: 0.88rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background: url(../../img/tabs.png);
  background-size: 100% 100%;
  a {
    display: block;
    width: 3.56rem;
    height: 100%;
    text-align: center;
    line-height: 0.9rem;
    font-size: 0.32rem;
    color: rgba(165, 147, 255, 1);
    // transition: all 0.1s linear;
    &.current {
      color: rgba(255, 255, 255, 1);
      background: url(../../img/tabs_act.png);
      background-size: 100% 100%;
    }
  }
}
.actTime {
  font-size: 0.26rem;
  text-align: center;
  color: rgba(255, 219, 125, 1);
  margin: 0.34rem auto;
}
</style>
