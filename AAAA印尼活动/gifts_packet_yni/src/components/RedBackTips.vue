<template>
  <div class="redBackTips">
    <div class="tipsCon">
      <div class="tips1">
        <p>1.Update versi Wekara terbaru, akan bisa mengalami fungsi Aangpau di Kroom apapun!</p>
        <img src="../assets/img/t1.png" alt="" class="img1">
        <img src="../assets/img/t2.png" alt="" class="img2">
      </div>
      <div class="tips2">
        <p>2.Selain hadiah dlm Angpau berbeda, jg punya efek spesial yang keren!</p>
        <h6>*Panggilan teman</h6>
        <p>Teman teman yg Saling follow dan pengguna yg koleksi Kroom itu akan menerima info yg ambil angpau. Lebih banyak yg saling follow, lebih banyak koleksi Kroom akaun meningkatkan kemungkinan menangkan angpau!</p>
        <img src="../assets/img/t3.png" alt="" class="img3">
        <h6>*Antrian naik</h6>
        <p>Antrian Kroom yg kirim angpau akan dinaikkan selama 10 menit,ditampilkan di belakang Kroom resmi, Ekspos ke lebih banyak pengguna!</p>
        <h6>*Naik kapasitas kamar</h6>
        <p>Kroom akan bisa menampung 500 org dlm waktu 60 menit sejak pengiriman angpau. Kapasitas asli Kroom akan dipulihkan stlh waktunya habis. Harus dimiliki untuk berpesta!</p>
        <h6>*Label angpau</h6>
        <p>Stlh kirim angpau, yg berada Label angpau di list Kroom itu berarti ada angpau bisa diambil</p>
        <h6></h6>
        <img src="../assets/img/t4.png" alt="" class="img4">
      </div>
      <div class="tips3">
        <h6>*Mode Eksklusi</h6>
        <p>Hari raya dan acara khusus ada angpau mode Eksklusi. Juga ada permainan baru angpau saat liburan</p>
        <img src="../assets/img/t5.png" alt="" class="img5">
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang= "scss" scoped>
.redBackTips {
  width: 7rem;
  padding-top: 0.2rem;
  margin: 0 auto;
  padding-bottom: 0.52rem;
  h6 {
    font-size: 0.24rem;
    color: #ffea63;
  }
  .tipsCon {
    .tips1,
    .tips2,
    .tips3 {
      padding: 0.31rem 0.41rem;
      border-radius: 0.1rem;
      p {
        color: #ffd8a6;
        font-size: 0.24rem;
      }
      .img1 {
        width: 5.96rem;
        height: 5.58rem;
        margin-top: 0.28rem;
      }
      .img2 {
        width: 5.9rem;
        height: 9.2rem;
        margin-top: 0.04rem;
      }
    }
    .tips1,
    .tips2 {
      background: url(../assets/img/tipsBg.png) no-repeat;
      background-size: 100% auto;
    }
    .tips2 {
      margin-top: 0.46rem;
      h6 {
        margin-top: 0.27rem;
      }
      p:first-child {
        margin: 0;
      }
      .img3 {
        width: 6.24rem;
        height: 1.87rem;
        margin-top: 0.1rem;
      }
      .img4 {
        width: 5.96rem;
        height: 7.81rem;
        margin-top: 0.2rem;
      }
    }
    .tips3 {
      padding-top: 0;
      .img5 {
        width: 5.9rem;
        height: 9.2rem;
        margin-top: 0.2rem;
      }
    }
  }
}
</style>
