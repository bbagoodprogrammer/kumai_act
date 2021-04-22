<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:type==1}" @click="tabClick(1)">Hadiah acara</span>
      <span :class="{act:type==2}" @click="tabClick(2)">Aturan acara</span>
    </div>
    <div class="actTime">Waktu acara:{{timer}}</div>
    <div class="ruleItem" v-if="type==1">
      <h3>Hadiah daftar Kelahiran Bintang:</h3>
      <h6>Top 1 famili</h6>
      <p>1.Semua anggota famili dapatkan Lencana Famili bintang(1 bulan)</p>
      <p>2.10000 poin Level famili + Tema room "famili bintang"(30 hari)</p>
      <p>3.Semua anggota famili dapatkan 1500 kacang emas</p>
      <!-- <p>4.所有家族成員獎勵500金豆</p> -->
      <p>4.top 10 teratas dlm daftar kelahiran Bintang:</p>
      <p>top 1: VIP (3 bulan) + Mount Happy new year(30 hari) + 1000 koin + 3000 kacang</p>
      <p>top 2: VIP (3 bulan) + Mount Happy new year(30 hari) + 500 koin + 2000 kacang</p>
      <p>top 3: VIP (3 bulan) + Mount Happy new year(30 hari) + 300 koin + 1000 kacang</p>
      <p>top 4-10: VIP (3 bulan) + Mount Happy new year(30 hari) + 100 koin + 500 kacang</p>
      <h6>Top 2 famili</h6>
      <p>1.Semua anggota famili dapatkan Lencana Famili bintang(1 bulan)</p>
      <p>2.8000 poin Level famili + Tema room "famili bintang"(30 hari)</p>
      <p>3.Semua anggota famili dapatkan 1000 kacang emas</p>
      <p>4.top 10 teratas dlm daftar kelahiran Bintang:</p>
      <p>top 1: VIP (2 bulan) + Mount Happy new year(30 hari) + 800 koin + 2000 kacang</p>
      <p>top 2: VIP (2 bulan) + Mount Happy new year(30 hari) + 500 koin + 1500 kacang</p>
      <p>top 3: VIP (2 bulan) + Mount Happy new year(30 hari) + 300 koin + 1000 kacang</p>
      <p>top 4-10: VIP (2 bulan) + Mount Happy new year(30 hari) + 100 koin + 500 kacang</p>
      <h6>Top 3 famili</h6>
      <p>1.Semua anggota famili dapatkan Lencana Famili bintang(1 bulan)</p>
      <p>2.5000 poin Level famili + Tema room "famili bintang"(30 hari)</p>
      <p>3.Semua anggota famili dapatkan 800 kacang emas</p>
      <p>4.top 10 teratas dlm daftar kelahiran Bintang:</p>
      <p>top 1: VIP (1 bulan) + Mount Happy new year(30 hari) + 500 koin + 1500 kacang</p>
      <p>top 2: VIP (1 bulan) + Mount Happy new year(30 hari) + 300 koin + 1000 kacang</p>
      <p>top 3: VIP (1 bulan) + Mount Happy new year(30 hari) + 200 koin + 800 kacang</p>
      <p>top 4-10: VIP (1 bulan) + Mount Happy new year(30 hari) + 100 koin + 500 kacang</p>
      <h6>Top 4-10 famili</h6>
      <p>1.Semua anggota famili dapatkan Lencana Famili bintang(1 bulan)</p>
      <p>2.2000 poin Level famili + Tema room "famili bintang"(30 hari)</p>
      <p>3.Semua anggota famili dapatkan 500 kacang emas</p>
      <p>4.top 10 teratas dlm daftar kelahiran Bintang:</p>
      <p>top 1: VIP (1 bulan) + Mount Happy new year(30 hari) + 300 koin + 1000 kacang</p>
      <p>top 2: VIP (1 bulan) + Mount Happy new year(30 hari) + 200 koin + 800 kacang</p>
      <p>top 3: VIP (1 bulan) + Mount Happy new year(30 hari) + 100 koin + 500 kacang</p>
      <p>top 4-10: VIP (1 bulan) + Mount Happy new year(30 hari) + 50 koin + 200 kacang</p>
      <h3>Hadiah Top Penjaga Famili</h3>
      <p>top 1: Lencana Master penjaga (30 hari) + 15% Kopun topup + Mount Happy new year(30 hari) + 10000 kacang</p>
      <p>top 2: Lencana Master penjaga (30 hari) + 12% Kopun topup + Mount Happy new year(20 hari) + 5000 kacang</p>
      <p>top 3: Lencana Master penjaga (30 hari) + 10% Kopun topup + Mount Happy new year(10 hari) + 3000 kacang</p>
      <p>top 4-10: Lencana Master penjaga (30 hari) + 5% Kopun topup + 2000 kacang</p>
      <h3>Hadiah paket keluarga</h3>
      <img src="../../assets/img/giftImg.png" alt="" class="giftBox">
      <p class="giftTIps">Semua hadiah paket hadiah dikirimkan secara acak oleh sistem, daftar ini cuma tampilkan salah satu hadiah langka.</p>
      <h3 class="other">Perhatian:</h3>
      <p>1.Jik anggota famili yg promosi tidak cukup 10 org dalam top Kelahiran Bintang, hadiah berlebih dianggap tidak valid.</p>
      <p>2.Jika poin famili udah mencapai nilai penuh, hadiah ini dianggap tidak valid.</p>
      <p>3.Kenaikan jumlah maksimal Kroom akan dihitung sejak tanggal pemberian hadiahnya</p>
      <p>4.Dalam waktu 7 hari kerja setelah acara, staff akan menghubungi kepala keluarga untuk menghitung informasi reward Kegagalan mengirimkan dalam batas waktu akan dianggap otomatis ditinggalkan.
      </p>
      <p>5.Statistik informasi anggota keluarga akan berlaku di akhir acara, dan hadiah akan diberikan dalam waktu 7 hari kerja setelah acara berakhir.</p>
      <p>6.Harap perbarui ke versi terbaru perangkat lunak untuk hadiah acara dan hadiah efek khusus, jika tidak, Anda mungkin melewatkan efek khusus yang cantik</p>
    </div>
    <div class="wardItem" v-else>
      <h3>Aturan acara</h3>
      <p>Kontes bintang famili dibagi menjadi 3 periode: "Bintang bersinar"--"Bersaing kemuliaan"--"Kelahiran Bintang",Acara terbatas untuk pengguna famili</p>
      <h3>Bintang bersinar</h3>
      <p>1.Waktu kontes:<em class="tm">3/29 12:00-4/1 22:00</em> </p>
      <p>2.Pengguna famili klik mendaftar utk ikut acara, Nilai bintang = nilai pesona koin yg teriam di nyanyian/Kroom + nilai tugas bintang, yg masuk top 300 teratas akan bisa promosi dan wakilkan
        famili utk mengikut tantangan bintang famili</p>
      <p>3.Peringkat Harian Starlight didasarkan pada nilai bintang hari itu. 100 teratas dapat berpartisipasi dalam lotere, dan 20 hadiah ransel Bintang bersina(68 koin emas) akan diundi setiap hari.
        Kemungkinan menang=nilai bintang hari itu/total nilai bintang dr top 100 teratas</p>
      <p>4.Jika Anda mundur dari Famili selama periode Bintang bersinar, data daftar akan dihapus, dan Anda tidak akan berpartisipasi dalam lotere. Jika bergabung kembali dengan Famili,nilai bintang
        akan dihitung kembali.</p>
      <h3>Bersaing kemulian</h3>
      <p>
        1.Waktu kontes:<em class="tm">4/1 22:05-4/5 18:00</em><br />
        2.Dipromosikan dr famili yang sama membentuk tim untuk mengikuti PK atas nama familinya(Pertandingan acak), Pemenang ditentukan berdasarkan total nilai bintang, dan pemenang maju dan
        mendapatkan paket hadiah famili. Nilai bintang = nilai pesona koin yg teriam di nyanyian/Kroom + nilai tugas bintang<br />
        3.Di berakhir kontes,Kedua pemain dengan skor yang sama akan tersingkir pada waktu yang bersamaan. Jika PK gagal, tapi Total nilai bintang yang lebih besar dari atau sama dengan 100.000 juga
        bisa promosi.<br />
        4.Total nilai bintang dari pengguna yang dipromosikan yang keluar dari keluarga tidak akan dipotong. Saat bergabung dengan keluarga lagi, data sebelum keluar dapat terus terkumpul. Bergabung
        dengan keluarga lain akan dianggap tidak dipromosikan dan tidak dapat terus berpartisipasi dalam aktivitas.<br />
        5.Setiap hadiah famili berisi 30 hadiah, dan setiap orang bisa mendapatkan maksimal 1, yang akan secara otomatis dibagikan ke keluarga yang dipromosikan di akhir tahapan

      </p>
      <h3>Kelahiran Bintang</h3>
      <p>1.Waktu kontes:<em class="tm">4/5 18:05-4/7 22:00</em> <br />
        2.Nilai bintang = nilai pesona koin yg teriam di nyanyian/Kroom + nilai tugas bintang, dan dapatkan bonus 10% nilai pd jam 19~21 hari terakhir<br />
        3.Peringkat berdasarkan total nilai bintang,Famili yg masuk top 10 teratas dan Perwakilan famili menjadi bintang famili, bisa dapatkan hadiah besar<br />
        4.Ketika total nilai bintang mencapai nilai yang ditentukan, keluarga akan ditingkatkan, dan sistem akan secara otomatis mengirim paket hadiah pembesar saat meningkatkan, Level Ⅰ, Ⅱ, Ⅲ sesuai
        dengan nilai bintang 80000，100000，500000. Jumlah hadiah paket hadiah masing-masing adalah 30, 50, dan 100 (semua hadiah paket hadiah otomatis dikeluarkan, dan semakin tinggi nilai bintang
        dalam keluarga, semakin besar kemungkinan pengguna akan menerima hadiah langka)<br />
        5.Total nilai bintang dari pengguna yang dipromosikan yang keluar dari keluarga tidak akan dipotong. Saat bergabung dengan keluarga lagi, data sebelum keluar dapat terus terkumpul. Bergabung
        dengan keluarga lain akan dianggap tidak dipromosikan dan tidak dapat terus berpartisipasi dalam aktivitas.
      </p>
      <h3 class="other">Perhatian:</h3>
      <p>
        1.Peringkatan Top Penjaga Famili berdasarkan nilai pesona koin yg sawer utk pengguna terdaftar selama acara, top 10 teratas akan mendapatkan hadiah besar. Jika skor yg sama, kedatangan pertama
        akan berperingkat lebih tinggi<br />
        2.Detail yg paket hadiah famili dikirim akan ditampilkan di halaman Detail undian, bisa klik utk lihatnya.<br />
        3.Hadiah harian "Bintang bersinar" akan dibagikan pada jam 24 setiap hari, dan pada jam 22 di hari terakhir<br />
        4.Tidak perlu mengupload karya setelah pendaftaran untuk tahap "Bintang bersinar". Semua pekerjaan umum yang diterima oleh individu akan dihitung. Jika karya dihapus selama acara, nilai pesona
        total dari karya yang dihapus pada tahap yang sesuai akan menjadi tidak valid<br />
        5.Tahap kelahiran bintang perlu mengunggah karya yang dirilis selama acara berlangsung, dan pemberian karya akan dihitung<br />
        6.Semua hadiah paket hadiah didistribusikan secara otomatis dan acak oleh sistem, dan setiap orang bisa mendapatkan hingga 1 hadiah setiap kali<br />
        7.Selama event, jika ada perilaku brushing point, kualifikasi dan hadiah akan dibatalkan, dan yang serius akan ditangani.
      </p>
    </div>
    <p class="lastTips">Hak interpretasi akhir dari acara ini dipegang oleh penyelenggara acara!</p>
  </div>
</template>

<script>
import getDate from "../../utils/getDate"
export default {
  data () {
    return {
      type: 1,
      stime: '',
      etime: ''
    }
  },
  computed: {
    timer () {
      return getDate(new Date(this.stime * 1000), 3) + '-' + getDate(new Date(this.etime * 1000), 3)
    }
  },
  created () {
    document.title = 'Kontes Bintang Famili'
    this.stime = sessionStorage.getItem('stime')
    this.etime = sessionStorage.getItem('etime')
  },
  methods: {
    tabClick (val) {
      this.type = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: rgba(29, 14, 9, 1);
}
.giftBox {
  width: 5.34rem;
  height: 3.13rem;
  display: block;
  margin: 0 auto;
}
.giftTIps {
  text-align: center;
}
.red {
  color: orange !important;
  font-weight: 600;
}
.rule {
  padding: 0.54rem 0.26rem;
  font-weight: 500;
  .tabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 6.76rem;
    height: 0.78rem;
    padding: 0 0.07rem;
    background: url(../../assets/img/tabs.png);
    background-size: 100% 100%;
    span {
      width: 3.33rem;
      height: 0.64rem;
      text-align: center;
      line-height: 0.64rem;
      color: rgba(142, 105, 63, 1);
      &.act {
        color: rgba(29, 14, 9, 1);
        background: url(../../assets/img/actTabs.png);
        background-size: 100% 100%;
      }
    }
  }
  h3 {
    text-align: center;
    font-size: 0.28rem;
    color: rgba(255, 213, 154, 1);
    margin: 0.41rem 0 0.33rem;
  }
  h6 {
    color: rgba(255, 106, 57, 1);
    font-size: 0.26rem;
    text-align: center;
    margin: 0.2rem 0 0.25rem;
  }
  p {
    color: rgba(207, 135, 110, 1);
    font-size: 0.24rem;
  }
  .other {
    text-align: left;
    color: rgba(255, 96, 40, 1);
    font-size: 0.28rem;
  }
  .wardImg {
    width: 6.5rem;
    height: 6.11rem;
    display: block;
    margin: 0 auto;
  }
  .actTime {
    text-align: center;
    color: rgba(238, 172, 104, 1);
    font-weight: 500;
    font-size: 0.28rem;
    margin-top: 0.27rem;
  }
  .ruleItem,
  .wardItem {
    padding: 0 0.59rem;
  }
  .tm {
    color: rgba(255, 107, 58, 1);
    font-size: 0.24rem;
  }
  .lastTips {
    text-align: center;
    color: rgba(124, 67, 48, 1);
    margin-top: 1.53rem;
  }
}
@import '../../assets/scss/common.scss';
</style>
