<template>
  <div class="page pageRule" :style="{height:viewHeight+'px'}">
    <div class="title"><i class="back" @click="$router.go(-1)"></i> Keterangan permainan</div>
    <div class="tipsItem">
      <p><i>1</i>
        Pemulai undian membayar sejumlah koin emas untuk membeli hadiah yang sesuai dan mengatur hadiah kualifikasi undian. Ketika pengguna di kamar itu memberikan hadiah yang sesuai, dia dapat berpartisipasi dalam undian. Setiap memberikan hadiah, pengguna akan mendapat satu kesempatan untuk undian. Semakin banyak peluang, sebesar mungkin jadi pemenang. Hitung mundur undian berakhir akan segera buka undian. Salah satu peserta akan dipilih untuk dapatkan hadiah yang sesuai dari undian ini.
      </p>
      <p><i>2</i>
        Hadiah dapat ditetapkan sebagai VIP, hadiah, mount, bingkai kursi, setiap undian hanya satu jenis yang dapat diatur.
      </p>
      <p><i>3</i>Hadiah kualifikasi undian adalah hadiah yang ditentukan, dan detailnya menurut apa yang ditampilkan dalam daftar pilihan.</p>
      <p><i>4</i>Hitung mundur undian harus diatur untuk setiap undian. Hitung mundur bisa 2 menit, 5 menit, 10 menit, 30 menit, 60 menit. Hitungan mundur akan segera dimulai setelah undian memulai. Untuk berpartisipasi dalam undian, pengguna harus mengirimkan hadiah kualifikasi undian dalam waktu hitung mundur.
      </p>
      <p><i>5</i>Anda dapat mengatur siapa yang dapat berpartisipasi dalam undian, menentukan semua orang di kamar atau pengguna yg di mikrofon. Saat diatur semua orang, semua pengguna di kamar itu dapat berpartisipasi dalam undian. Saat diatur pengguna yg di mikrofon, hanya pengguna yang sedang menggunakan mikrofon yang dapat berpartisipasi dalam undian. Kebanyakan digunakan dalam mode multi-pemain.
      </p>
      <p><i>6</i>
        Setiap kamar dapat memulai sebanyak satu undian pada waktu yang sama. Jika ada undian yang sedang berlangsung, Anda harus menunggu pengundian ini berakhir baru dapat memulai pengundian berikutnya.
      </p>
      <p><i>7</i>
        Undian yang telah dimulai tidak dapat ditarik kembali, dan koin emas yang telah dibayarkan tidak dapat dikembalikan. Jika saat hitung mundur undian berakhir dan tidak ada yang berpartisipasi dalam pengundian, hadiahnya menjadi milik pemulai undian.
      </p>
    </div>
  </div>
</template>

<script>
import { lang } from './config';

export default {
  computed: {
    lang: () => lang,
    viewHeight: () => window.innerHeight,
  },
};
</script>

<style lang="scss">
.pageRule {
  width: 7.5rem;
  height: 9.88rem;
  background: linear-gradient(
    0deg,
    rgba(84, 173, 255, 1) 0%,
    rgba(122, 75, 255, 1) 100%
  );
  border-radius: 0.32rem 0.32rem 0 0;
  display: flex;
  flex-direction: column;
  .title {
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    font-size: 0.42rem;
    font-weight: 600;
    position: relative;
    .back {
      display: block;
      width: 0.17rem;
      height: 0.29rem;
      background: url(./img/back2.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.36rem;
      left: 0.3rem;
    }
  }
  .tipsItem {
    margin-top: 0.08rem;
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    padding: 0 0.28rem 0.3rem 0.73rem;
    p {
      position: relative;
      i {
        display: block;
        width: 0.34rem;
        height: 0.34rem;
        background: url(./img/pNum.png);
        background-size: 100% 100%;
        font-size: 0.24rem;
        text-align: center;
        line-height: 0.34rem;
        position: absolute;
        left: -0.43rem;
        top: 0;
      }
      font-size: 0.26rem;
      margin-top: 0.3rem;
    }
  }
}
</style>