<template>
  <div class="rules">
    <p class="activeTime">Tgl 20 Aug. 18:00:00- Tgl 30 Aug. 21:00:00</p>
    <h5>Mendaftar acara</h5>
    <div class="actSingUp">
      <p>1. Klik "Segera mendaftar" untuk berpartisipasi dalam acara tersebut, data akan dihitung ke dalam hasil acara setelah Anda mengklik "Segera mendaftar".(Setelah mendaftar acara, gak usah upload nyanyian di halaman acara)</p>
      <p>2. Hanya hadiah yang didapatkan dari nyanyian solo(termasuk MV) , duet, MV duet yang diposting secara publik bisa dihitung dalam hasil/nilai ( hadiah yang didapatkan dari vocal 5 menit,nyanyian yang koleksi tidak dihitung dalam hasil/nilai).</p>
      <p>3.Nyanyian dihapus selama acara, maka nilai nyanyian ini yg didapatkan akan dibatalkan.</p>
    </div>
    <h5> Aturan peringkat daftar hegemoni nyanyian</h5>
    <div class="wardRankTips">
      <p>1、 Ini akan menurut nilai pesona hadiah khusus yang didapatkan dari nyanyian yg diposting setelah pendaftaran untuk melakukan peringkat.</p>
      <p>2.Hadiah nyanyian khusus dari acara ini ada Bendera (10 koin emas ),Kotak hadiah Muharram(68koin emas ), Mesjid bulan(299 koin emas )</p>
      <p>3、 Jika nilai pesona hadiah khusus yang didapatkan adalah sama, maka siapa yang pertama mencapai nilai pesona itu,peringkat siapa akan di depan.</p>
    </div>
    <h5> Aturan peringkat daftar hegemoni kamar karaoke</h5>
    <div class="kRoomTips">
      <p>1、Ini akan menurut nilai pesona hadiah khusus yang didapatkan dari kamar karaoke setelah pendaftaran untuk melakukan peringkat.</p>
      <p>2、Hadiah khusus dari acara ini adaBerdoa(10 koin emas),Makanan penutup(68 koin emas), Obor (299 koin emas). </p>
      <p>3、Jika nilai pesona hadiah khusus yang didapatkan adalah sama, maka siapa yang pertama mencapai nilai pesona itu,peringkat siapa akan di depan.</p>
    </div>
    <h5> Aturan peringkat daftar hegemoni popularitas</h5>
    <div class="peopleTips">
      <p>1、Ini akan menurut total jumlah orang yg sawer hadiah tertentu di kamar karaoke atau nyanyian yg diposting setelah pendaftaran untuk melakukan peringkat</p>
      <p>2、Pengguna yg bersama,walaupun mengantar hadiah di nyanyian atau di kamar karaoke,hanya dihitung 1 kali.</p>
      <p>3、Kalo jumlah pengguna yg mengantar hadiah itu sama,maka siapa yang pertama mencapai nilai pesona itu,peringkat siapa akan di depan.</p>
    </div>
    <h5> Aturan hadiah koin emas kembali</h5>
    <div class="coinsTips">
      <p>1.Kalau kamu mengantar hadiah Bendera(10 koin emas ),Kotak hadiah Muharram (68koin emas ),Mesjib bulan(299 koin emas ) ke nyanyian terbuka yg diposting dari pengguna yg ikut acara,kamu akan bisa dikembalikan 5% koin emas yg harga hadiahnya pada pukul 24:00 hari ini. Kalo hari ini kamu sawer Mesjib bulan(299 koin emas )*1, kamu akan bisa mendapatkan 15 koin emas pd 24:00 hari ini.</p>
      <p>2. Kalau kamu mengantar hadiah Berdoa(10 koin emas),Makanan penutup(68koin emas), Obor (299 koin emas) kepada pengguna yg ikut acara di kamar karaoke,kamu akan bisa dikembalikan 5% koin emas yg harga hadiahnya pada pukul 24:00 hari ini. Kalo hari ini kamu sawer Obor (299 koin emas)*1, kamu akan bisa mendapatkan 15 koin emas pd 24:00 hari ini.</p>
    </div>
    <h5> Lainnya</h5>
    <p>Selama acara, jika pengguna ditemukan menggunakan cara yang tidak benar untuk berpartisipasi dalam acara, pihak Wekara berhak untuk membatalkan/diskualifikasi pengguna tanpa memberi tahu terlebih dahulu. Jika situasi serius maka pihak resmi wekara akan membekukan akun tersebut, termasuk tetapi tidak terbatas pada:</p>
    <p>1.Nyanyian yang ikut acara bukan penyanyi asli (tidak bernyanyi dengan sendiri) atau membajak nyanyian orang lain;</p>
    <p>2.Penyalahgunaan atau meminjam akun orang lain untuk berpartisipasi dalam acara;</p>
    <p>3.Pengguna yang sama mendaftar beberapa akun tuyul untuk berpartisipasi dalam acara;</p>
    <p>4.Selama acara membuat komentar kurang sopan, iklan dan lain lain pada nyanyian yang ikut acara ;</p>
    <p>5.Berpartisipasi dalam acara melalui pelanggaran lain.</p>
    <p class="tips2">Jika pengguna ditemukan menggunakan cara yang tidak benar untuk berpartisipasi dalam acara, apakah peserta atau tidak,pihak Wekara akan secara permanen membekukan semua akun besar atau kecil dari pelanggar. Setelah acara berakhir,pihak Wekara berhak untuk mengambil kembali semua hadiah dari pengguna/pelanggar ini.</p>
    <p class="btnMsg">Hak interpretasi akhir dari acara ini dipegang oleh penyelenggara acara.</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.rules {
  padding-bottom: 0.4rem;
  .activeTime {
    text-align: center;
    font-weight: 0.24rem;
    font-weight: 600;
    margin-top: 0.38rem;
    color: #fb7fff;
  }
  > h5 {
    text-align: center;
    color: #fffea4;
    margin: 0.46rem auto 0.18rem;
    font-weight: 600;
    width: 5.9rem;
  }
  p {
    color: #7acdec;
    font-weight: 600;
    font-size: 0.22rem;
    line-height: 0.36rem;
  }
  .tips2 {
    margin-top: 0.3rem;
  }
  .btnMsg {
    margin-top: 0.75rem;
    text-align: center;
    font-size: 0.24rem;
    font-weight: 600;
    color: #7acdec;
  }
}
</style>
