<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:type==1}" @click="tabClick(1)">Hadiah acara</span>
      <span :class="{act:type==2}" @click="tabClick(2)">Aturan acara</span>
    </div>
    <div class="gift" v-if="type == 1">
      <h3>Hadiah acara</h3>
      <img src="../../assets/img/gift.png" alt="" class="giftImg">
      <h6>Hadiah arena periode ini dari Top 10</h6>
      <p>Top 1 </p>
      <p>Lencana trainee musik+300 koin emas + VIP(15 hari) +1000 kacang emas</p>
      <p>Top 2 </p>
      <p>Lencana trainee musik+200 koin emas + VIP(15 hari) +600 kacang emas</p>
      <p>Top 3 </p>
      <p>Lencana trainee musik+100 koin emas +VIP(15 hari) +400 kacang emas</p>
      <p>Top 4 - 10 </p>
      <p>Lencana trainee musik+50 koin emas +VIP(15 hari) +200 kacang emas</p>
      <h6>Hadiah pertandingan season ini dari Top 100</h6>
      <p>Top 1-3 : Godfather Musik</p>
      <p>Lencana godfather musik +600 koin emas + VIP(15 hari) +1200 kacang emas</p>
      <p>Top 4 - 10 : Talent Musik</p>
      <p>Lencana talent musik + 500 koin emas + VIP(15 hari) +1000 kacang emas</p>
      <p>Top 11 - 50 : Bintang Musik</p>
      <p>Lencana bintang musik + 300 koin emas + VIP(15 hari) + 600 kacang emas</p>
      <p>Top 51 - 100 : Master Musik</p>
      <p>Lencana master musik + 100 koin emas + VIP(15 hari) + 300 kacang emas</p>
      <h6>Hadiah utk upload lagu:</h6>
      <p>Pengguna akan menerima 1 hadiah ransel ketika setiap kali kirim 1 lagu arena,pengguna yang ikut acara harus memiliki setidaknya 1 lagu online setelah acara berakhir, dan mereka akan dptkan 50 kacang emas.</p>

      <!-- <h6>提交參賽作品獎勵：</h6>
      <p>用戶每提交一首打擂歌曲（僅限每日提交的第一首）可獲得1個隨機背包禮物：小星星背包禮物（60金豆）/國際郵票背包禮物（90金豆）/薄荷糖背包禮物（120金豆）/潤喉糖背包禮物（1金幣）/撩一下背包禮物（1金幣）/小情書背包禮物（2金幣）/波板糖背包禮物（3金幣）/草莓水果茶背包禮物（5金幣）</p> -->
      <h6>Hadiah juri:</h6>
      <p>Kalo juri menilai 30 grup lagu setiap hari ,maka setiap grup lagu akan mendapatkan 5 kacang emas.<br />
        Kalo 8 grup menang dgn berturut-turut yg kamu vote dalam periode saat ini,
        kamu bisa secara acak mendapatkan hadiah ransel kotak musik (360 kacang emas ) / hadiah ransel permen kapas (1 koin emas) / 2 hari VIP /Mount Eagle Fighting (2 hari)<br />
        Ketika setiap vote 50 group, kamu akan mendapatkan hadiah nyanyian Malaikat hati* 1 (7 hari), dan kamu hanya memiliki 1 kesempatan untuk mendapatkannya di setiap periode (hadiah akan dikirim ke ransel dalam waktu 7 hari setelah acara berakhir)</p>
      <h6>Judul juri dan hadiah hak istimewa :</h6>
      <img src="../../assets/img/chTab.png" alt="" class="chTabImg">
      <p>Tips:</p>
      <p>1. Judul akan ditampilkan di periode berikutnya</p>
      <p>2.Misalnya kamu dapatkan Judul telinga emas di periode ini, maka dlm periode berikutnya kamu tiap kali vote 1 tiket sama dgn pengguna biasa vote 2 tiket </p>
      <p>3. Judul juri dan hak istimewa vote yg didapatkan dlm periode ini hanya berlaku pd periode berikutnya</p>
      <h6>Deskripsi hadiah:</h6>
      <p>1.Hadiah ransel berlaku selama 14 hari</p>
      <p>2. Hadiah kacang emas dari Juri akan segera kirim, hadiah utk vote dgn berturut-turut akan dikirim oleh sistem setelah acara berakhir. Hadiah utk Top 10 pemain dlm periode acara ini akan dikirim dalam selama 7 hari setelah acara berakhir, hadiah utk Top 100 pemain dlm pertandingan season ini akan dikirim dalam selama 7 hari setelah pertandingan season acara berakhir</p>
    </div>
    <div class="ruleTips" v-else>
      <div class="actTime">
        <p>Waktu arena periode ini :</p>
        <p class="timeItem">{{stime}}-{{etime}}</p>
        <p>Waktu mendaftar arena periode ini :</p>
        <p class="timeItem">{{pstime}}-{{petime}}</p>
        <p>Waktu mencocokkan lawan periode ini :</p>
        <p class="timeItem">10: 00: 00-22: 00: 00, mencocokkan 1 kali lawan setiap 2 jam dlm periode waktu yg mencocokkan, yaitu 10:00:00, 12:00:00, 14:00:00, 16:00:00, 18 : 00: 00, 20:00:00, 22:00:00; Tapi pd hari terakhir pertandingan hanya akan mencocokkan lawan pd pukul 10:00:00 dan 12:00:00, dan tidak mencocokkan lawan lagi setelah waktu itu.</p>
        <!-- <p>Waktu arena pertandingan season ini :</p>
        <p class="timeItem">{{zsetime}}-{{zeetime}}，Tiap Jumat~ Senin minggu depan</p> -->
        <!-- <p>活動時間規律說明：</p>
        <div class="timeTips">
          <p>每期時間：</p>
          <p>每週五18:00:00-每週一20:00:00</p>
          <p>賽季時間：</p>
          <p>每3個自然月為一個賽季</p>
        </div> -->
      </div>
      <h3>Aturan acara</h3>
      <h6>Aturan ikut acara:</h6>
      <div class="mTips">
        <p>1.Anda perlu menyanyikan lagu resmi yg ditentukan(yaitu Anda perlu menyanyikan lagu iringan yg melompat setelah Klik Lagu Arena)setelah pukul {{stime}} utk berpartisipasi dalam acara, menyanyikan lagu iringan lain tidak bisa ikut acara.</p>
        <p>2. Jenis nyanyian yg ikut acara hanya terbatas pada solo.</p>
        <p>3. Satu lagu iringan hanya dapat dipilih 1 nyanyian untuk ikut acara.</p>
        <p class="red">4. Beberapa lagu iringan dapat dipilih untuk berpartisipasi dalam arena di setiap periode. Lagu yang dinyanyikan harus lagu yang lengkap (durasi lagu paling lama 30 S lebih pendek dari durasi pengiring), jika tidak lagu tersebut tidak dapat dikirim utk ikut acara.</p>
        <p>5. Kamu berhasil memilih lagu arena dan mencocokkan lawan untuk ikut acara, kalo kamu hapus lagu arena ini akan dianggap abstain otomatis. Hasil lagu arena akan tidak dihitung dari kedua pihak, dan pihak lain akan berpartisipasi di babak berikutnya utk ikut acara.</p>
        <p>6、Sistem akan secara otomatis mencocokkan dua kontestan dari lagu yg sama untuk membentuk grup yg sama, dan lagu tersebut akan ditampilkan ke juri publik untuk pemungutan suara. Kontestan dengan suara lebih banyak utk per lagu akan menang sampai acara berakhir.</p>
        <p>7. Jika dalam sebuah lagu, jumlah total suara dari dua kontestan melebihi 50, dan salah satu pihak mendapatkan 80% atau lebih jumlah suara (yaitu, jumlah suara yang diperoleh oleh salah satu pihak /total suara untuk lagu tersebut * 100 %>= 80%), pemenang bisa menambah 2 poin, dan yang kalah tidak kurang poin. Jika total suara lagu ini tidak mencapai 50 atau jumlah suara yang diperoleh oleh pihak menang tidak mencapai 80% , maka pemenang hanya bisa menambah 1 poin, dan yang kalah tidak kurang poin. Jika suara vote sama, kedua pihak yang akan tidak menambah atau mengurangi poin, dan pengguna yang berikan suara juga tidak dihitung sebagai pemenang.</p>
        <p>8. Setelah lagu dikirimkan, jika kamu hapus 1 lagu arena yg ikut acara selama acara , 1 poin akan dipotong.</p>
        <!-- <p class="red">9、歌曲提交後，若活動期間刪除一首打擂歌曲，則分數扣2分</p> -->
      </div>
      <h6>Aturan peringkat utk Daftar arena:</h6>
      <p>1.Peringkat akan menurut skor yg didapatkan dlm periode ini , jika skor sama, maka peringkat dgn jumlah vote lebih banyak akan berada di depan.</p>
      <h6>Aturan peringkat utk Daftar Raja Penyanyi season ini</h6>
      <p>1. Peringkat Daftar Raja Penyanyi season ini akan menurut level , yaitu total skor yg diperoleh di semua periode; jika level sama, maka peringkat dgn jumlah vote lebih banyak akan berada di depan.</p>
      <p>2. Setiap pertandingan season mulai, level yg default pemain adalah Lv.0. Setiap periode pertandingan arena kamu akan naik 1 level ketika tiap kali dptkan 1 poin ,kalo kalah juga gak kurangi poin dan level.</p>
      <h3>Lainnya</h3>
      <p>Selama acara, jika pengguna ditemukan menggunakan cara yang tidak benar untuk berpartisipasi dalam acara, pihak Wekara berhak untuk membatalkan/diskualifikasi pengguna tanpa memberi tahu terlebih dahulu. Jika situasi serius maka pihak resmi wekara akan membekukan akun tersebut,termasuk tetapi tidak terbatas pada:</p>
      <p>1.Nyanyian yang ikut acara bukan penyanyi asli (bernyanyi dengan sendiri) atau membajak nyanyian orang lain;</p>
      <p>2.Penyalahgunaan atau meminjam akun orang lain untuk berpartisipasi dalam acara;</p>
      <p>3. Pengguna yang sama mendaftar beberapa akun tuyul untuk berpartisipasi dalam acara;</p>
      <p>4.Selama acara membuat komentar kurang sopan, iklan dan lain lain pada nyanyian yang ikut acara ;</p>
      <p>5.Berpartisipasi dalam acara melalui pelanggaran lain.</p>
      <!-- <p>6）本期打擂歌單會在上期的打擂歌單預告上進行細微調整 </p> -->
      <p class="mt">Jika ditemukan kecurangan,apakah peserta atau tidak,pihak Wekara akan secara permanen membekukan semua akun besar atau kecil dari pelanggar. Setelah acara berakhir,pihak Wekara berhak untuk mengambil kembali semua hadiah dari pelanggar ini.</p>
    </div>
    <p class="lastTips">Hak interpretasi akhir dari acara ini dipegang oleh penyelenggara acara</p>
  </div>
</template>

<script>
import getDate from "../../utils/getDate"
export default {
  data() {
    return {
      type: 1,
      time: {}
    }
  },
  created() {
    document.title = 'Aturan hadiah'
    this.time = JSON.parse(sessionStorage.getItem('time'))
    console.log(this.time)
  },
  computed: {
    stime() {
      return getDate(new Date(this.time.stime * 1000), 3)
    },
    etime() {
      return getDate(new Date(this.time.etime * 1000), 3)
    },
    pstime() {
      return getDate(new Date(this.time.pstime * 1000), 3)
    },
    petime() {
      return getDate(new Date(this.time.petime * 1000), 3)
    },
    zsetime() {
      return getDate(new Date(this.time.zsetime * 1000), 3)
    },
    zeetime() {
      return getDate(new Date(this.time.zeetime * 1000), 3)
    },
    rStime() {
      return getDate(new Date(this.time.stime * 1000), 1)
    },
    rEtime() {
      return getDate(new Date(this.time.etime * 1000), 1)
    }
  },
  methods: {
    tabClick(val) {
      this.type = val
    }
  }
}
</script>

<style lang="scss">
body {
  background: rgba(117, 67, 240, 1);
  .mTips {
    p {
      margin-bottom: 0.07rem;
    }
  }
  .red {
    color: red !important;
  }
  .rule {
    padding: 0.29rem 0.44rem;
    .tabs {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 6.22rem;
      height: 0.88rem;
      background: url(../../assets/img/tabs.png);
      background-size: 100% 100%;
      margin: 0 auto;
      span {
        width: 3.26rem;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
        color: rgba(255, 220, 42, 1);
        font-weight: bold;
        &.act {
          color: rgba(174, 72, 0, 1);
          background: url(../../assets/img/actTab.png);
          background-size: 100% 100%;
        }
      }
    }
    h3 {
      text-align: center;
      margin: 0.3rem 0 0.2rem;
    }
    h6 {
      font-size: 0.26rem;
      margin: 0.49rem 0 0.25rem;
    }
    p {
      color: rgba(229, 222, 255, 1);
      font-size: 0.24rem;
      padding-left: 0.22rem;
    }
    .giftImg {
      width: 6.56rem;
      height: 4.38rem;
      display: block;
    }
    .chTabImg {
      width: 5.65rem;
      height: 4.22rem;
      margin: 0 0 0.25rem 0.22rem;
    }
    .lastTips {
      color: rgba(209, 190, 255, 1);
      margin: 0.78rem 0 0.92rem;
      text-align: center;
    }
    .ruleTips {
      h6 {
        margin: 0.35rem 0 0.25rem;
      }
      .actTime {
        margin-top: 0.6rem;
        .timeItem {
          margin-bottom: 0.3rem;
        }
        .timeTips {
          padding-left: 0.45rem;
        }
      }
    }
    .mt {
      margin-top: 0.3rem;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
