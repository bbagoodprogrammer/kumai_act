<template>
  <div class="rule">
    <h1>Aturan acara</h1>
    <h6>Waktu acara</h6>
    <p>{{timeStr}}</p>
    <h6>Aturan mendaftar</h6>
    <p>1.Semua pengguna bisa mendaftar,gak bisa mendaftar ulangi.peralatan dan alamat IP yg sama atau akun yg sama hanya bisa mendaftar 1 kali.Pengguna yg udah buka VIP bisa cek jumlah yg kikis hadiah setelah mendaftar;pengguna yg bukan VIP kembalikan halaman acara bisa cek jumlah yg kikis hadiah setelah membeli VIP.</p>
    <p>2. Pengguna baru yg diundang utk bantuan juga bisa mendaftar,jumlah yg kikis hadiah dalam paket hadiah bantuan bisa digunakan utk kikis hadiah, membeli VIP bisa tambah jumlah kikis hadiah.</p>
    <h6>Aturan acara</h6>
    <p>1.Selama acara, setelah memdafatar sukses,refresh level VIP yg sekerang, menerima jumlah kali, bisa mulai kikis hadiah,kalau mengikis tugas mesterius,maka perlu menerima hadiah setelah menyelesaikan tugas,hadiah lain langsung dikirim,hadiah khusus akan dikirim ke ransel,nilai member akan langsung tambahkan ke level VIP, koin emas dan kacang emas akan dikirim ke dompet. </p>
    <p>2.Selama acara,jumlah utk kikis hadiah belum digunakan habis,bisa klik kartu kikis utk mengikis hadiah,ketika jumlahnya habis,bisa mendapatkan jumlah yg kikis hadiah melalui membeli VIP,VIP yg waktu berbeda dibeli maka jumlah utk mengikis juga berbeda.</p>
    <p>3.Kode undang berlaku selama 3 hari setelah undian tugasnya.</p>
    <!-- <p>4. Mỗi nhiệm vụ bí ẩn cần 1 người dùng mới đăng ký sau khi sự kiện bắt đầu hỗ trợ, mỗi tài khoản cùng máy và địa chỉ chỉ được hỗ trợ 1 lần, người được mới sẽ có 1 phần quà hỗ trợ sau khi hỗ trợ thành công. Người dùng cào trúng Nhiệm vụ bí ẩn cần hoàn thành mỗi nhiệm vụ theo hướng dẫn mới có thể nhận quà, mỗi mã mời có hiệu lực 3 ngày.</p> -->
    <h6>Aturan jumlah kali :</h6>
    <p>1. Selama acara, pengguna VIP yg mendaftar dengan sukses bisa mendapatkan jumlah kali utk kikis hadiah dengan gratis menurut formulir berikut pada pukul 00:00:00 setiap hari , setelah kirimkan jumlah kali utk kikis hadiah yg gratis, jumlah utk kikis hadiah dengan gratis tidak akan tambah lagi kalo member meningkat level pada hari ini(apapun bagaimana meningkat level)</p>
    <p>2.Selama acara,semua jumlah utk kikis hadiah (termasuk jumlah utk kikis yg gratis dan melalui beli VIP) hanya berlaku pada hari ini,jumlahnya yg belum digunakan akan dihapus pada pukul 00:00:00,silakan gunakan habis sebelum dihapus.</p>
    <img src="../../assets/img/taskImg.png" alt="">
    <p class="last2Tips">Setiap hari akan dikirim secara otomatis selama acara.</p>
    <p class="lastTips">Hak interpretasi akhir dari acara ini dipegang oleh penyelenggara acara</p>
  </div>
</template>

<script>
import getDate from "../../utils/getDate"
export default {
  data() {
    return {
      time: {}
    }
  },
  created() {
    this.time = JSON.parse(sessionStorage.getItem('time'))
    sessionStorage.setItem("need-refresh", true);
  },
  computed: {
    timeStr() {
      return getDate(new Date(this.time.stime * 1000), '~') + '~' + getDate(new Date(this.time.etime * 1000), '~')
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #4900ad;
}
.rule {
  padding: 0.53rem 0.39rem 0.25rem;
  h1 {
    color: #fff79b;
    font-weight: bold;
    font-size: 0.36rem;
    text-align: center;
  }
  h6 {
    color: #a1f3ff;
    font-size: 0.28rem;
    margin-top: 0.39rem;
    font-weight: bold;
  }
  p {
    color: #ffddff;
    font-size: 0.26rem;
    margin-top: 0.22rem;
    padding-left: 0.25rem;
  }
  img {
    width: 5.99rem;
    height: 7.98rem;
    margin: 0.31rem 0 0 0.25rem;
  }
  .last2Tips {
    text-align: center;
    line-height: 0.5rem;
  }
  .lastTips {
    color: #b37bff;
    text-align: center;
    margin-top: 0.7rem;
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
