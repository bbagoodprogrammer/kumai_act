<template>
  <div class="actRules">
    <div class="totalTips" v-if="is_admin">
      <h6>Pedoman mendaftardan mengadakan pesta:</h6>
      <div class="tipsBox">
        <p>1、Pemilik dan admin kamar karaoke bisa mendaftar dan mengadakan pesta. Klik tombol 【mendaftar lakukan pesta】dan Lengkapi formulir aplikasi. Aplikasi harus diajukan dalam 5-30 hari sebelum dimulainya acara. Durasi setiap acara dibatasi hingga 1-3 jam. Setiap kamar Karaoke dapat mengajukan hingga 4 acara per bulan.</p>
        <p>2、Jika acara ini mengharuskan teman untuk mendaftar sebagai tamu sebelumnya,tolong pilihan 【mendaftar】. Rincian pendaftaran bisa dilihat di 【pesta saya】, dan bisa hubungi teman yg sudah daftar dengan cepat.</p>
        <p>3、Setelah berhasil diajukan, Harap bersabar dan tunggu hasil ulasan resmi. Rincian spesifik bisa lihat di dalam 【pesta saya】</p>
        <p>4、Klik Ubah Rencana bisa mengubah rencana yg belum diaudit dan tidak disetujui didalam 【pesta saya】. Rencana yg sudah disetujui tidak diubah.</p>
        <p>5、Rencana yg tidak disetujui bisa diubah dan diajukan satu kali lagi. Kalau Rencana baru masih tidak disetujui, tidak bisa diubah lagi.</p>
        <p>6、Acara yg sedang diadakan akan ditampilkan di atas daftar pesta, Cover K-room akan ditambah tag acara otomatis</p>
        <p>7、K-room yg sama itu tidak aktif diselenggarakan atau diadakan (Termasuk disetel sebagai pribadi selama acara tersebut) mencapai 4 kali, tidak bisa minta mengadakan acara lagi</p>
        <p>8、Setiap acara akan dapatkan poin pesta yg sesuai, cara hitungnya sebagai berikut:</p>
        <img src="../../assets/img/ruleImg1.png" alt="" class="ruleImg1">
        <p class="ps">PS:
          Skor perencanaan dibelikan resmi wantu tinjau, Semakin lengkap rencana acaranya, semakin baru gameplaynya, semakin tinggi skornya. Bisa lihat perencanaan acara resmi
        </p>
        <p>9、Yg mencapai poin yg ditentukan (3000/8000) atau masuk top 10 teratas akan memdapatkan hadiah resmi, K-room resmi tidak berpartisipasi dalam peringkat</p>
        <img src="../../assets/img/ruleImg2.png" alt="" class="ruleImg2">
        <img src="../../assets/img/ruleImg3.png" alt="" class="ruleImg3">
        <!-- <p class="ps">PS：於每週/月初結算上週/月獎勵，官方人員將於3天內聯絡房主統計發放獎勵，逾期未提交視為自動放棄</p> -->
      </div>
      <h6>Pedoman penonton pesta</h6>
      <div class="tipsBox">
        <p>1、Setiap pengguna akan memdapatkan 30 kacang emas setelah ikuti 2 acara di daftar pesta pd setiap hari, Berhenti mengikuti tidak valid, Hadiah hanya untuk satu akun</p>
        <p>2、Pengguna akan dapatkan 30 kacang emas setelah online 20 menit di K-room yg sedang melakukan acara, Setiap pengguna cuma bisa mengambil satu kali per acara</p>
        <p>3、Setelah perhatian acara, bisa terima pengingat pesan acara 5 menit sebelum acara dimulai. Jangan lewatkan pesta yang indah</p>
        <p>4、Kalau acara itu yg ada fungsi pendaftaran, Anda bisa melengkapi formulir aplikasi setelah klik mendaftar. Sponsor acara akan memberitahu hasil pendaftaran Anda. Anda bisa mengikuti acaranya setelah berhasil daftar</p>
        <p>5、Lebih banyak berbagi dan perhatian bisa menarik teman teman untuk berpesta bersama</p>
        <p>6、Konten aktivitas spesifik ditentukan oleh sponsor acara, dan Tidak terkait dengan resmi. Kalau Anda ada pertanyaan dalam acaranya, Anda bisa berkonsultasi dengan sponsor acara terkait</p>
      </div>
    </div>
    <div v-else>
      <h6>Pedoman mendaftardan mengadakan pesta:</h6>
      <div class="tipsBox">
        <p>1、Setiap pengguna akan memdapatkan 30 kacang emas setelah ikuti 2 acara di daftar pesta pd setiap hari, Berhenti mengikuti tidak valid, Hadiah hanya untuk satu akun</p>
        <p>2、Pengguna akan dapatkan 30 kacang emas setelah online 20 menit di K-room yg sedang melakukan acara, Setiap pengguna cuma bisa mengambil satu kali per acara</p>
        <p>3、Setelah perhatian acara, bisa terima pengingat pesan acara 5 menit sebelum acara dimulai. Jangan lewatkan pesta yang indah</p>
        <p>4、Kalau acara itu yg ada fungsi pendaftaran, Anda bisa melengkapi formulir aplikasi setelah klik mendaftar. Sponsor acara akan memberitahu hasil pendaftaran Anda. Anda bisa mengikuti acaranya setelah berhasil daftar</p>
        <p>5、Lebih banyak berbagi dan perhatian bisa menarik teman teman untuk berpesta bersama</p>
        <p>6、Konten aktivitas spesifik ditentukan oleh sponsor acara, dan Tidak terkait dengan resmi. Kalau Anda ada pertanyaan dalam acaranya, Anda bisa berkonsultasi dengan sponsor acara terkait</p>
      </div>
    </div>
    <p class="lastTips">Hak interpretasi akhir dari acara ini dipegang oleh penyelenggara acara</p>
  </div>
</template>
<script>
import getString from "../../utils/getString"
export default {
  data() {
    return {
      is_admin: false
    }

  },
  created() {
    this.is_admin = getString('is_admin')
  }
}
</script>
<style lang="scss">
@import "../../assets/scss/common.scss";
body {
  background: rgba(65, 23, 122, 1);
  .actRules {
    padding: 0.5rem 0.58rem 0.2rem 0.33rem;
  }
  .tipsBox {
    padding-left: 0.28rem;
  }
  h6 {
    color: rgba(191, 255, 254, 1);
    font-weight: 600;
    font-size: 0.26rem;
    margin-bottom: 0.25rem;
  }
  p {
    font-size: 0.24rem;
    color: rgba(191, 255, 254, 1);
  }
  .ps {
    font-size: 0.24rem;
    color: rgba(191, 255, 254, 1);
    margin: 0.24rem 0 0.48rem;
  }
  .ruleImg1 {
    width: 6.21rem;
    height: 6.08rem;
    margin-top: 0.32rem;
  }
  .ruleImg2 {
    width: 6.21rem;
    height: 3.58rem;
    margin-top: 0.32rem;
  }
  .ruleImg3 {
    width: 6.21rem;
    height: 3.58rem;
    margin-top: 0.32rem;
  }
  .lastTips {
    color: rgba(168, 132, 216, 1);
    font-size: 0.24rem;
    margin: 0.66rem auto 0;
    text-align: center;
  }
}
</style>
