<template>
  <div class="rule">
    <h1>Aturan acara</h1>
    <p class="time">Waktu acara:Pukul 18:00 tgl 24 Mar.~ 21:00 tgl 3 Apr.</p>
    <h6>Aturan acara:</h6>
    <p>1.Selama acara, setelah mendaftar dan selesaikan tugas tantangan,energinya mencapai nilai tertentu,akan sentuh kesnempatan buka kartu,1000 energi bisa tukar 1 kali kesempatan yg buka kartu, setaip pengguna paling banyak ada 5 kesempatan utk buka kartu setiap hari,kesempatan utk buka kartu hari ini akan direset pada pukul 00:00,silakan gunakan pada waktu yg tepat. </p>
    <p>2.Buka kartu setiap kali bisa dapat 1 hadiah, gunakan kartu Double bisa biarkan hadiahnya menjadi dobel, hadiahnya akan dikirim waktu nyata,beli kartu alat peraga bisa meningkat kualitas hadiah. </p>
    <p>3.Kupon bonus utk top up dan kupon bonus utk sawer yg didapat dari acara ini akan dihitung nilai setelah undian kuponnmya,penuh persyaratan akan kirim koin emas</p>
    <h6>Instruksi pengunaan alat peraga:</h6>
    <p>1.Kartu utk kecualikan , klik dan gunakan , jenis hadiah yg dibuka bisa kecualikan,klik buka kartu lagi
      Kartu Double, l;angsung klik kartunya setelah klik gunakan</p>
    <p>2. alat peraga acara harus digunakan padi hari ini,pukul 00:00 hari berikutnya alat peraga akan dihapus</p>
    <p>3. alat peraga digunakan sebelum buka kartu, berfungsi bagi hasil buka kartu kali ini.</p>
    <p>4. setiap org setiap hari hanya bisa dapat 1 kartu kecualikan dan 1 kartu Double.</p>
    <h6>Instruksi pengunaan hadiah</h6>
    <p>1.Hadiah ransel yang didapatkan berlaku selama 14 hari, silakan gunakannya dalam periode validitas.</p>
    <p>2.Kupon bonus utk top up dan kupon bonus utk sawer akan secara otomatis dikirim ke ransel, ,hanya berlaku selama 24 jam,kalau konsumsi koinnya akan kembali segera,tolong menggunakannya pada tepat waktu</p>
    <p>3.Versi Android dari hadiah ransel dapat dilihat di Saya - Ransel, dan ketika Anda memberikan hadiah, Anda dapat memilih hadiah ransel untuk sawer.</p>
    <h5>Hadiah yg mungkin dapat</h5>
    <img src="../../assets/img/giftImg.png" alt="">
    <p class="footerMsg">Hak interpretasi akhir dari acara ini dipegang oleh penyelenggara acara</p>
  </div>
</template>

<script>
export default {
  created() {
    sessionStorage.setItem("need-refresh", true);
  }
}
</script>

<style lang="scss">
body {
  background-color: #af6f4c;
}
.rule {
  padding: 0.6rem 0.37rem;
  h1 {
    font-size: 0.36rem;
    font-weight: 800;
    text-align: center;
  }
  h6 {
    color: #ffe2a5;
    font-weight: 600;
    margin-top: 0.46rem;
  }
  h5 {
    font-size: 0.36rem;
    font-weight: 800;
    text-align: center;
    margin: 0.95rem 0 0.53rem;
  }
  img {
    width: 6.35rem;
    height: 7.04rem;
    margin: 0 auto;
  }
  p {
    font-size: 0.24rem;
    color: #ffe2a5;
    font-weight: 600;
    margin-top: 0.3rem;
    padding-left: 0.25rem;
  }
  .time {
    font-size: 0.24rem;
    font-weight: 600;
    text-align: center;
    margin-top: 0.2rem;
  }
  .footerMsg {
    text-align: center;
    font-size: 80%;
    color: #e8bea6;
    font-weight: 600;
    margin-top: 0.8rem;
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
