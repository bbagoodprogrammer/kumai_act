<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:showType == 'rules'}" @click="clickTab('rules')">Aturan acara</span>
      <span :class="{act:showType == 'wards'}" @click="clickTab('wards')">Hadiah acara</span>
    </div>
    <p class="actTime">Waktu acara：Tgl 13 Jun,pukul 18:00:00 - tgl 30 Jun,pukul 21:00:00</p>
    <div class="ward" v-show="showType == 'wards'">
      <h3>Hadiah Panggilan</h3>
      <div class="wardImg"></div>
      <!-- <div class="giftBox"> -->
      <!-- <div v-for="(item,index) in giftArr" :key="index">
          <div class="giftImg">
            <span class="giftBg"></span>
            <img :src="require(`../../assets/img/luckGift/${index+1}.png`)" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div> -->
      <!-- </div> -->
      <h3 class="bg2">Hadiah Daftar Harian</h3>
      <p>Top 1-100 pengguna dari Daftar Harian bisa membagikan hadiah koin emas, dan jumlah hadiah koin emas yg dibagi akan berdasarkan pada total nilai panggilan hari ini dan peringkat pengguna.</p>
      <p>Top 1 - 10,membagikan dengan rata-rata 30% koin emas pada hari ini</p>
      <p>Top 11 - 30,membagikan dengan rata-rata 40% koin emas pada hari ini</p>
      <p>Top 31 - 100,akan pilih 20 orang utk membagikan dengan rata-rata 30% koin emas</p>
      <h3 class="bg2">Hadiah Daftar Total</h3>
      <h6>Top 1 :</h6>
      <p>Lencana summoner lampu ajaib (30 hari) + Mount debut akbar(30 hari) +Hadiah ransel kamar karaoke lampu ajaib Aladdin (666 koin emas) + 3000 koin emas + 5000 kacang emas</p>
      <h6>Top 2:</h6>
      <p>Lencana summoner lampu ajaib (15 hari) + Mount debut akbar(30 hari) +Hadiah ransel kamar karaoke lampu ajaib Aladdin (666 koin emas) + 2000 koin emas + 3000 kacang emas</p>
      <h6>Top 3 :</h6>
      <p> Lencana summoner lampu ajaib (7 hari) + Mount debut akbar(30 hari) +Hadiah ransel kamar karaoke lampu ajaib Aladdin (666 koin emas) + 1000 koin emas + 2500 kacang emas</p>
      <h6>Top 4 - 5 : </h6>
      <p> Lencana summoner lampu ajaib (7 hari) + Mount debut akbar(15 hari) +Hadiah ransel kamar karaoke lampu ajaib Aladdin (666 koin emas) + 800 koin emas + 2000 kacang emas</p>
      <h6>Top 6 - 10 :</h6>
      <p>Mount debut akbar (9 hari) +Hadiah ransel kamar karaoke lampu ajaib Aladdin (666 koin emas) + 500 koin emas + 1000 kacang emas</p>
      <h3 class="bg2">Aturan penggunaan hadiah</h3>
      <div class="lastRule">
        <p>1. Kupon bonus utk top up dalam hadiah panggilan hanya <strong class="red">berlaku pd pukul 23:59:59 hari ini</strong> setelah kamu menerima.Jika pengguna yg sama menerima beberapa kupon bonus utk top up yg tanpa batas nilai top up pada hari yang sama, kupon dapat ditumpangkan utk digunakan. Bonus koin emas akan segera dikirim ke akunmu <strong class="red">setelah top up </strong> </p>
        <p>2.Hadiah ransel yg didapatkan berlaku selama 7 hari, silakan gunakannya dalam periode validitas.</p>
        <p>3.Versi Android dari hadiah ransel dapat dilihat di Saya - Ransel, dan ketika Anda memberikan hadiah, Anda dapat memilih hadiah ransel untuk sawer.</p>
        <p>4.Jika mount tidak bisa digunakan,silakan perbarui ke versi terbaru</p>
      </div>
    </div>
    <div class="rules" v-show="showType == 'rules'">
      <h3>Mendaftar acara</h3>
      <p class="singUpTips">Klik "Segera Mendaftar" untuk berpartisipasi dalam acara, data tugas akan dihitung dan dicatatan setelah mendaftar.</p>
      <h3>Penjelasan tugas </h3>
      <p><strong>Tugas harian:</strong>Nyanyian publik apapun kemarin yg dipublikasikan belum dihapus. <strong class="red">Pada pukul 12:00 tiap hari akan cek nyanyian umum dari kemarin,</strong> jika nyanyian tersebut belum dihapus, maka akan mendapatkan 10 nilai panggilan</p>
      <p><strong>Tugas top up:</strong>Anda bisa menukar 10 nilai panggilan ketika setiap top up 30 koin emas, kalau tidak cukup 30 koin emas akan gak bisa menukar nilai panggilan</p>
      <h3 class="bg2">Cara tentang memanggil lampu ajaib</h3>
      <p>Memanggil lampu ajaib hanya bisa menggunakan nilai panggilan hari ini,total nilai panggilan hanya untuk peringkat
        </br>Gunakan nilai panggilan yang berbeda,maka mendapatkan hadiah akan juga berbeda
      </p>
      <h3 class="bg2">Aturan tentang membagikan koin emas</h3>
      <p>1.Jumlah koin emas yang bisa dibagi setiap hari terkait dengan nilai panggilan yang diakumulasikan oleh semua pengguna yang berpartisipasi pada hari ini.Semakin banyak nilai panggilan yang diakumulasikan oleh pengguna yang berpartisipasi dalam acara hari ini, semakin banyak koin emas yang dapat dibagi</p>
      <span class="img1"></span>
      <p>2.Top 1-100 pengguna dari Daftar Harian bisa membagikan hadiah koin emas, dan jumlah hadiah koin emas yg dibagi akan berdasarkan pada peringkatnya</p>
      <span class="img2"></span>
      <p>3.Acara ini akan menarik daftar pemenang pada pukul 24:00:00 hari ini, dan hadiah akan secara otomatis dikirim ke akun, silakan cek~</p>
      <h3 class="bg2">Aturan peringkat nilai panggilan</h3>
      <p>1.Peringkat nilai panggilan yg didapatkan setelah menyelesaikan tugas
        <span>Peringkat Daftar Harian : peringkat dari nilai panggilan hari ini</span>
        <span>Peringkat Dafar Total : peringkat dari total nilai panggilan </span>
      </p>
      <p>2.Jika nilai panggilan yang didapatkan adalah sama, maka siapa yang pertama mencapai nilai panggilan itu,peringkat siapa akan di depan</p>
      <p>3.Daftar ini menampilkan hasil kompetisi pengguna dari Top 1- 100 </p>
      <p>4.Gunakan nilai panggilan utk memanggil elf lampu ajaib, tidak mempengaruhi peringkat</p>
      <h3>Lainnya</h3>
      <p>Selama acara, jika pengguna ditemukan menggunakan cara yang tidak benar untuk berpartisipasi dalam acara, pihak Wekara berhak untuk membatalkan/diskualifikasi pengguna tanpa memberi tahu terlebih dahulu. Jika situasi serius maka pihak resmi wekara akan membekukan akun tersebut,termasuk tetapi tidak terbatas pada:</p>
      <p>1)Penyalahgunaan atau meminjam akun orang lain untuk berpartisipasi dalam acara;</p>
      <p>2) Pengguna yang sama mendaftar beberapa akun tuyul untuk berpartisipasi dalam acara;</p>
      <p>3) Berpartisipasi dalam acara melalui pelanggaran lain.</p>
      <p class="other">Jika pengguna ditemukan menggunakan cara yang tidak benar untuk berpartisipasi dalam acara, apakah peserta atau tidak,pihak Wekara akan secara permanen membekukan semua akun besar atau kecil dari pelanggar. Setelah acara berakhir,pihak Wekara berhak untuk mengambil kembali semua hadiah dari pelanggar ini.</p>
    </div>
    <div class="tips">Hak interpretasi akhir dari acara ini dipegang oleh penyelenggara acara</div>
  </div>
</template>

<script>
import giftArr from "../../config/gift"
export default {
  data() {
    return {
      showType: 'rules',
      giftArr: giftArr
    }
  },
  created() {
    document.title = 'Hadiah aturan'
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
  background-color: #48008c;
}
.red {
  color: red;
}
.actTime {
  font-size: 0.24rem;
  color: #dac4ff;
  margin: 0.29rem 0 0.28rem;
  text-align: center;
}
.rule {
  padding: 0.28rem 0;
  .tabs {
    width: 6.71rem;
    height: 0.74rem;
    background: url(../../assets/img/tabsBg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    span {
      display: block;
      width: 3.75rem;
      height: 0.85rem;
      text-align: center;
      line-height: 0.85rem;
      &.act {
        background: url(../../assets/img/tuleTabaAct.png);
        background-size: 100% 100%;
      }
    }
  }
  .singUpTips {
    text-align: center;
  }
  h3 {
    width: 2.7rem;
    height: 0.39rem;
    line-height: 0.39rem;
    background: url(../../assets/img/ruleTitleBg2.png);
    background-size: 100% 100%;
    text-align: center;
    color: #ffda8d;
    font-size: 0.26rem;
    font-weight: 500;
    margin: 0.32rem auto 0.27rem;
    &.bg2 {
      width: 4.83rem;
      background: url(../../assets/img/ruleTitleBg1.png);
      background-size: 100% 100%;
    }
  }
  p {
    color: #dac4ff;
    font-size: 0.24rem;
    span {
      display: block;
      text-indent: 0.5rem;
    }
    strong {
      font-size: 0.24rem;
      color: #ffda8d;
    }
    em {
      color: #ffe191;
      font-size: 0.36rem;
    }
  }
  h6 {
    color: #dac4ff;
    padding: 0 0.27rem;
    margin-top: 0.3rem;
    font-size: 0.24rem;
  }
  .ward {
    p {
      padding: 0 0.27rem;
    }
  }
  .rules {
    padding: 0 0.22rem 0.7rem;
  }
  .tips {
    margin-top: 0.25rem;
    color: #bdbbff;
    font-size: 0.22rem;
    margin-top: 1.3rem;
    text-align: center;
  }
  .img1 {
    display: block;
    width: 4rem;
    height: 2.09rem;
    background: url(../../assets/img/ruleImg1.png);
    background-size: 100% 100%;
    margin: 0.14rem 0 0.28rem;
  }
  .img2 {
    display: block;
    width: 4.71rem;
    height: 1.66rem;
    background: url(../../assets/img/ruleImg2.png);
    background-size: 100% 100%;
    margin: 0.14rem 0 0.28rem;
  }
  .other {
    margin-top: 0.5rem;
  }
  .wardImg {
    width: 7.25rem;
    height: 7.99rem;
    background: url(../../assets/img/giftBox.png);
    background-size: 100% 100%;
    margin: 0 auto;
  }
  .lastRule {
    p {
      margin-bottom: 0.3rem;
    }
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
// .giftBox {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   flex-wrap: wrap;
//   margin-top: 0.05rem;
//   padding: 0 1rem;
//   .giftImg {
//     width: 1.4rem;
//     height: 1.4rem;
//     position: relative;
//     .giftBg {
//       display: block;
//       width: 100%;
//       height: 100%;
//       background: url(../../assets/img/gitBg.png);
//       background-size: 100% 100%;
//       position: absolute;
//     }
//     img {
//       width: 100%;
//       height: 100%;
//       position: absolute;
//     }
//   }
//   strong {
//     display: block;
//     height: 0.3rem;
//     text-align: center;
//     font-size: 0.22rem;
//     font-weight: 500;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     line-height: 0.28rem;
//     margin-top: 0.05rem;
//   }
// }
@import "../../assets/scss/common.scss";
</style>
