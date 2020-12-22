<template>
  <div class="rules">
    <p class="activeTime">Waktu acara : Tgl 22 Dec, 18:00 - tgl 1 Jan, 21:00</p>
    <h5>Aturan Acara</h5>
    <div class="actSingUp">
      <h5>Mendaftar Acara:</h5>
      <p>1.Klik "Segera Mendaftar" untuk berpartisipasi dalam acara, hadiah yang didapatkan dari nyanyian yang diposting dan kamar karaoke akan dihitung setelah mendaftar. (Kamu tidak perlu mengunggah/upload lagu di halaman acara setelah mendaftar).</p>
      <p>2.Hanya hadiah yang didapatkan dari nyanyian solo , duet, MV duet yang diposting secara publik bisa dihitung dalam hasil/nilai ( hadiah yang didapatkan dari vocal 5 menit,nyanyian yang koleksi tidak dihitung dalam hasil/nilai).</p>
      <p>3.Jika kamu menghapus nyanyian yang diposting selama acara, maka hasilnya/nilai hadiah yang didapatkan dari nyanyian ini akan dibatalkan.</p>
      <h5>Aturan ranking dari Top Hegemon Nyanyian:</h5>
      <p>1.Selama acara ranking menurut nilai pesona hadiah tertentu yang didapatkan dari nyanyian terbuka yang diposting/diumumkan setelah mendaftar. </p>
      <p>2.Hadiah tertentu untuk acara ini adalah ikat kepala kartun (10 koin emas), Bumper car (188 koin emas), Kincir Ria (388 koin emas).</p>
      <p>3.Jika nilai pesona hadiah tertentu yang didapatkan yang sama, maka siapa yang pertama mencapai nilai pesona itu,peringkat siapa akan di depan.</p>
      <h5>Aturan ranking dari Top Hegemon Kamar Karaoke:</h5>
      <p>1.Selama acara ranking menurut nilai pesona hadiah tertentu yang didapatkan dalam kamar karaoke setelah mendaftar. </p>
      <p>2.Hadiah tertentu untuk acara ini adalah Fan kartun (10 koin emas), Pirate ship (188 koin emas), Roller coaster(388 koin emas).</p>
      <p>3.Jika nilai pesona hadiah tertentu yang didapatkan yang sama, maka siapa yang pertama mencapai nilai pesona itu,peringkat siapa akan di depan.</p>
      <h5>Aturan ranking dari Top Hegemon Popularitas:</h5>
      <p>1.Ranking menurut total jumlah orang yang memberikan/sawer hadiah yang tertentu dalam kamar karaoke atau dalam nyanyian yang diposting/diumumkan setelah mendaftar.</p>
      <p>2.Hadiah dari pengguna yang sama, baik dalam nyanyian atau kamar karaoke, hanya dihitung 1 kali.</p>
      <p>3.Jika total jumlah orang yang memberikan/sawer hadiah yang sama, maka siapa yang pertama mencapai nilai pesona itu,peringkat siapa akan di depan.</p>
      <p>4.Beberapa UID dari perangkat yang sama memberikan hadiah,hanya dihitung 1 kali</p>
      <h5>Aturan tentang kembalikan koin emas:</h5>
      <p>1.Jika memberikan/sawer hadiah ikat kepala kartun (10 koin emas), Bumper car (188 koin emas), Kincir Ria (388 koin emas) ke nyanyian terbuka yang diposting/diumumkan setelah mendaftar ikut acara,maka sistem akan kembilikan 5% koin emas dari jumlah koin emas hadiah kepada orang yang sawer pada besok pukul 0:00:00. Misalnya,hari ini kamu sawer hadiah Bumper car senilai 188 koin emas,maka sistem akan memberikan bonus 10 koin emas kepada kamu pada besok pukul 0:00:00</p>
      <p>2.Jika memberikan/sawer hadiah Fan kartun (10 koin emas), Pirate ship (188 koin emas), Roller coaster(388 koin emas) kepada pengguna yang bernyanyi di kamar karaoke setelah mendaftar ikut acara,maka sistem akan kembilikan 5% koin emas dari jumlah koin emas hadiah kepada orang yang sawer pada besok pukul 0:00:00. Misalnya,hari ini kamu sawer hadiah Pirate ship senilai 188 koin emas,maka sistem akan memberikan bonus 10 koin emas kepada kamu pada besok pukul 0:00:00</p>
    </div>
    <h5>Lainnya:</h5>
    <div>
      <p>Selama acara, jika pengguna ditemukan menggunakan cara yang tidak benar untuk berpartisipasi dalam acara, pihak Wekara berhak untuk membatalkan/diskualifikasi pengguna tanpa memberi tahu terlebih dahulu. Jika situasi serius maka pihak resmi wekara akan membekukan akun tersebut,termasuk tetapi tidak terbatas pada:</p>
      <div class="list">
        <p>1.Nyanyian yang ikut acara bukan penyanyi asli (bernyanyi dengan sendiri) atau membajak nyanyian orang lain</p>
        <p>2.Penyalahgunaan atau meminjam akun orang lain untuk berpartisipasi dalam acara;</p>
        <p>3. Pengguna yang sama mendaftar beberapa akun tuyul untuk berpartisipasi dalam acara;</p>
        <p>4.Selama acara membuat komentar kurang sopan, iklan dan lain lain pada nyanyian yang ikut acara ;</p>
        <p>5.Berpartisipasi dalam acara melalui pelanggaran lain.</p>
      </div>
      <p>Jika pengguna ditemukan menggunakan cara yang tidak benar untuk berpartisipasi dalam acara, apakah peserta atau tidak,pihak Wekara akan secara permanen membekukan semua akun besar atau kecil dari pelanggar. Setelah acara berakhir,pihak Wekara berhak untuk mengambil kembali semua hadiah pengguna/pelanggar ini.</p>
      <p class="lastMsg">Hak interpretasi akhir dari acara ini dipegang oleh penyelenggara acara</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.rules {
  padding-bottom: 1rem;
  p {
    margin-top: 0.1rem;
    line-height: 0.36rem;
    font-size: 80%;
  }
  .activeTime {
    color: #6ffff3;
    text-align: center;
    margin-top: 0.51rem;
  }
  > h5 {
    text-align: center;
    font-size: 120%;
    color: #ffed6a;
    margin-top: 0.57rem;
  }
  .actSingUp {
    > h5 {
      color: #6ffff3;
      font-size: 80%;
      margin-top: 0.2rem;
    }
  }
  .list {
    p {
      text-indent: 0.2rem;
    }
  }
  .lastMsg {
    margin-top: 1rem;
    text-align: center;
  }
}
</style>
