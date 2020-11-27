<template>
  <div class="rule">
    <div class="taskTabs">
      <span class="p1Tab1" :class="{act:type==1}" @click="tabClick(1)"></span>
      <span class="p1Tab2" :class="{act:type==2}" @click="tabClick(2)"></span>
    </div>
    <div class="gifts" v-if="type == 1">
      <h5>Waktu Acara</h5>
      <p>19 November 09: 00-3 Desember 21:00</p>
      <h5>Hadiah Acara</h5>
      <div class="giftsItem">
        <div class="item" v-for="(item,index) in 24" :key="index">
          <div class="imgBg">
            <img :src="require(`../../assets/img/ruleGifts/${item}.png`)" alt="">
          </div>
          <strong v-html="giftName[index]"></strong>
        </div>
      </div>
      <h5>Undian dapat hadiah - Hadiah Peringkat</h5>
      <h6 class="minTop">No.1:</h6>
      <p>Lencana Karnaval (1 bulan) + Mount Karpet Merah (1 bulan) + 3000 koin emas + 6000 kacang emas</p>
      <h6>No.2:</h6>
      <p>Lencana Karnaval (1 bulan) + Mount Karpet Merah (1 bulan) + 2000 koin emas + 4000 kacang emas</p>
      <h6>No.3:</h6>
      <p>Lencana Karnaval (1 bulan) + Mount Karpet Merah (1 bulan) + 1500 koin emas + 3000 kacang emas</p>
      <h6>No.4-10:</h6>
      <p>Lencana Karnaval (1 bulan) + Mount Karpet Merah (1 bulan) + 1000 koin emas + 2000 kacang emas</p>
      <h6>No.11-30</h6>
      <p>Lencana Karnaval (15 hari) + Mount Karpet Merah (1 bulan) + 500 koin emas + 1000 kacang emas</p>
      <h5>MVP Penolong - Hadiah Level</h5>
      <img src="../../assets/img/rules/img1.png" alt="" class="img1">
      <p class="ps">Catatan: Hadiah peti harta untuk setiap level hanya dapat diklaim sekali</p>
      <h5>MVP Penolong - Hadiah Peringkat</h5>
      <h6 class="minTop">No.1：</h6>
      <p>Lencana MVP Penolong (1 bulan) + Mount Karpet Merah (1 bulan) + VIP (1 bulan) + I Love You (388 koin emas) * 3 + 6000 koin emas + 6000 kacang emas</p>
      <h6>No.2：</h6>
      <p>Lencana MVP Penolong (1 bulan) + Mount Karpet Merah (1 bulan) + VIP (1 bulan) + I Love You (388 koin emas) * 3 + 4500 koin emas + 4500 kacang emas</p>
      <h6>No.3：</h6>
      <p>Lencana MVP Penolong (1 bulan) + Mount Karpet Merah (1 bulan) + VIP (1 bulan) + I Love You (388 koin emas) * 3 + 3000 koin emas + 3000 kacang emas</p>
      <h6>No.4-5：</h6>
      <p>Lencana MVP Penolong (1 bulan) + Mount Karpet Merah (1 bulan) + VIP (1 bulan) + I Love You (388 koin emas) * 3 + 2000 koin emas + 2000 kacang emas</p>
      <h6>No.6-10：</h6>
      <p>Lencana MVP Penolong (1 bulan) + Mount Karpet Merah (1 bulan) + VIP (1 bulan) + I Love You (388 koin emas) * 3 + 1500 koin emas + 1500 kacang emas</p>
      <!-- <h5>禮物冠名-解鎖獎勵</h5>
      <img src="../../assets/img/rules/img2.png" alt="" class="img2">
      <p class="ps">PS.每個等級的獎勵限領取一次</p>
      <h5>禮物冠名-各禮物冠軍榜單獎勵</h5>
      <img src="../../assets/img/rules/img3.png" alt="" class="img3"> -->
      <h5 class="other">Aturan penggunaan hadiah</h5>
      <p>
        1. Hadiah acara akan dikirimkan dalam 14 hari kerja setelah acara berakhir<br />
        2. Hadiah ransel berlaku selama 7 hari<br />
      </p>
    </div>
    <div class="ruleItem" v-else>
      <h5>Waktu Acara</h5>
      <p>19 November 09: 00-3 Desember 21:00</p>
      <h5>Aturan Acara</h5>
      <h6 class="minTop">Pendaftaran Acara</h6>
      <p>1. Klik "Daftar sekarang" untuk mengikuti Undian Dapat Hadiah dan MVP Penolong. Data acara akan dihitung setelah mengklik pendaftaran; Top up bonus 10% dapat berpartisipasi tanpa daftar</p>
      <h5>Undian Dapat Hadiah</h5>
      <h6 class="minTop">Undian Dapat Hadiah - Aturan Undian</h6>
      <p>
        1. Anda bisa mendapatkan Koin Karnaval dengan menyelesaikan tugas harian, dan Koin Karnaval akan otomatis dikirimkan ke akun Anda, dan koin hanya berlaku selama periode acara<br />
        2. Koin Karnaval dapat digunakan untuk undian, dan hadiah akan dimasukkan ke akun segera<br />
      </p>
      <h6>Undian Dapat Hadiah - Aturan Peringkat</h6>
      <p>1. Menurut nilai karnaval yang diperoleh setelah pendaftaran, nilai karnaval = jumlah koin karnaval yang digunakan. Jika nilainya sama, yang pertama mencapai peringkat teratas</p>
      <h5>MVP Penolong</h5>
      <h6 class="minTop">MVP Penolong-Aturan</h6>
      <p>1. Kirimkan 1 koin emas akan dapatkan 1 nilai penolong, dan nilai penolong mencapai 100, 500, 1000, 2000, 5000, 10000, 30000, 50000 akan menerima hadiah kotak harta yang sesuai</p>
      <h6>MVP Penolong - Aturan Peringkat</h6>
      <p>1. Menurut nilai pesona dari hadiah koin emas yang dikirimkan dalam nyanyian dan kamar karaoke setelah pendaftaran. Jika nilainya sama, yang pertama mencapai peringkat teratas</p>
      <!-- <h5>禮物冠名</h5>
      <h6 class="minTop">禮物冠名-規則</h6>
      <p>1、設置6個盛典特定禮物，獲得該特定禮物數量最高的用戶，獲得該禮物冠名權</p>
      <h6>禮物冠名-6個盛典特定禮物冠名榜單排名規則</h6>
      <p>1、根據報名後收到該特定禮物的數量排名，若分數相同，先達到的排名在前面</p> -->
      <h5>Top Up Bonus 10%</h5>
      <h6 class="minTop">Top Up Bonus 10% - Aturan</h6>
      <p>
        1. Pada 27 dan 28 November, Anda top up koin emas berapapun akan dapatkan bonus 10% (tidak termasuk koin emas dari sistem)<br />
        2. Selama acara, koin bonus akan segera dimasukkan setelah setiap top up berhasil.
      </p>
      <h6>Top Up Bonus 10% - Aturan Peringkat</h6>
      <p>1. Pada 27 November dan 28 November, akan ada 1 peringkat untuk top up bonus 10%, peringkat Anda akan sesuai dengan jumlah koin emas yang top up pada hari itu</p>
      <!-- <h5>高光時刻</h5>
      <h6 class="minTop">高光時刻-規則</h6>
      <p>1、以下活動指定時間段，21:00:00-21:10:00獲得的分數額外加成10%</p>
      <h6>年度魅力歌王大賽</h6>
      <p class="ytime">11月16日-11月24日</p>
      <h6>年度K房男神女神賽</h6>
      <p class="ytime">11月23日-12月3日</p>
      <h6>年度C位爭奪賽</h6>
      <p class="ytime">11月30日-12月11日</p>
      <h6>年度最強家族戰 </h6>
      <p class="ytime">12月22日-12月24日</p> -->
      <h5 class="other">Keterangan lain</h5>
      <p>Selama acara, jika pengguna ditemukan telah menggunakan cara yang tidak tepat untuk berpartisipasi dalam aktivitas, Wekara berhak untuk menjatuhkan hukuman seperti pembatalan kualifikasi mereka atau larangan akun pada kontestan dan pelanggar berdasarkan keadaan serius tanpa pemberitahuan sebelumnya, termasuk namun tidak terbatas pada:</p>
      <p>
        1) Menyalahgunakan atau meminjam akun orang lain yang ada untuk berpartisipasi dalam aktivitas;<br />
        2) Pengguna yang sama mendaftarkan banyak akun untuk berpartisipasi dalam aktivitas;<br />
        3) Memberi komentar, iklan yang berbahaya pada nyanyian atau peserta selama acara;<br />
        4) Berpartisipasi dalam acara melalui pelanggaran lainnya.Jika pemain adalah penipu proaktif, terlepas dari apakah itu kontestan atau bukan, semua akun pengguna diblokir secara permanen, Wekara memiliki hak untuk mengambil kembali semua hadiah pengguna setelah acara selesai
      </p>
    </div>
    <p class="lastTips">Hak interpretasi terakhir acara ini adalah milik Wekara</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 1,
      giftName: [
        'Hadiah Rose flower',
        'Hadiah Mobil mini',
        'Hadiah Cupid\'s Arrow',
        'Mount Kapal Terbang',
        'Kacang emas besar-besaran',
        'Kupon sawer',
        'Penolong Junior',
        'Penolong Menengah',
        'Penolong Maju',
        'Koin emas besar-besaran',
        'Kupon top up',
        'Lencana MVP Penolong',
        'Mount Karpet Merah',
        'VIP',
        'Hadiah I Love You',
        'Mount obil klasik',
        'Lencana Karnaval',
        'Mount Singa',
        'Kuda Terbang',
        'Malam Cinta',
        'Gelembung Impian',
        'Mimpi Balon Udara Panas',
        'Ginger bon',
        'Anggur',
        // 'GTR座駕',
        // '儲值返利券',
        // '送禮返利券',
        // '海量金幣',
        // '海量金豆'
      ]
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
  background-color: RGBA(35, 27, 40, 1);
  .rule {
    padding: 0.37rem 0.18rem 0;
    .taskTabs {
      display: flex;
      justify-content: center;
      span {
        width: 3.54rem;
        height: 0.88rem;
      }
      .p1Tab1 {
        background: url(../../assets/img/rules/ruleTab1.png);
        background-size: 100% 100%;
        &.act {
          background: url(../../assets/img/rules/ruleTab1_act.png);
          background-size: 100% 100%;
        }
      }

      .p1Tab2 {
        background: url(../../assets/img/rules/ruleTab2.png);
        background-size: 100% 100%;
        &.act {
          background: url(../../assets/img/rules/ruleTab2_act.png);
          background-size: 100% 100%;
        }
      }
    }
    .gifts,
    .ruleItem {
      margin-top: 0.1rem;
      padding: 0 0.08rem;
      h5 {
        font-size: 0.32rem;
        color: rgba(254, 249, 120, 1);
        font-weight: bold;
        margin-top: 0.4rem;
      }
      h6 {
        font-size: 0.28rem;
        color: rgba(255, 128, 34, 1);
        padding-left: 0.64rem;
        margin-top: 0.5rem;
      }
      p {
        font-size: 0.28rem;
        padding-left: 0.64rem;
      }
      .ps {
        font-size: 0.31rem;
        padding-left: 0;
      }
      img {
        margin: 0.18rem auto;
      }
      .img1 {
        width: 7.02rem;
        height: 15.28rem;
      }
      .img2 {
        width: 7.02rem;
        height: 7.02rem;
      }
      .img3 {
        width: 7.02rem;
        height: 18.36rem;
      }
    }
    .giftsItem {
      width: 6.31rem;
      height: 15.57rem;
      padding: 0.81rem 0.48rem 0;
      background: url(../../assets/img/ruleGifts/rulebg.png);
      background-size: 100% 100%;
      margin-left: -0.15rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        width: 25%;
        .imgBg {
          width: 1.4rem;
          height: 1.4rem;
          background: url(../../assets/img/luckBg.png);
          background-size: 100% 100%;
          margin: 0 auto;
          img {
            width: 1.4rem;
            height: 1.4rem;
            margin: 0 auto;
          }
        }
        strong {
          display: block;
          width: 100%;
          height: 0.6rem;
          font-size: 0.24rem;
          text-align: center;
        }
      }
    }
    .minTop {
      margin-top: 0.29rem !important;
    }
    .ytime {
      color: rgba(252, 245, 193, 1);
    }
    .other {
      margin-bottom: 0.28rem;
    }
  }
  .lastTips {
    text-align: center;
    margin: 1.25rem 0 0.6rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
