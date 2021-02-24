<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="mainTab=0" :class="{current:mainTab==0}" class="tab1">Aturan acara</a>
      <a @click.prevent="mainTab=1" :class="{current:mainTab==1}" class="tab2">Hadiah acara</a>
    </div>
    <div class="ruleItem" v-if="mainTab == 0">
      <h5>Waktu acara</h5>
      <p>Jam 18:00 tgl 26 Feb. ~ Jam 21:00 tgl 7 Mar.</p>
      <h5>Aturan acara</h5>
      <p>1.Acara ini perlu didaftar utk ikut, stlh daftar baru hitung nilai</p>
      <p>2.Daftar tersebut terbagi menjadi Top Master dan Top Kroom Populer</p>
      <p>Top Master: Pemeringkatan berdasarkan koin emas yang dikonsumsi oleh pengguna dalam angpau hadiah dan kotak hadiah keberuntungan selama acara</p>
      <p>Top Beruntung: Pemeringkatan berdasarkan nilai pesona yang dihasilkan oleh angpau hadiah dan kotak hadiah keberuntungan di kamar selama acara, Setiap kali roket dibuka di dalam ruangan, skornya bertambah 800</p>
      <h5>Perhatian:</h5>
      <p>1.Data acara di Kroom yg dikunci tidak akan dihitung</p>
      <p>2.Setiap pengguna cuma bisa pakai satu akun utk ikut acara</p>
      <p>3.Yg mengikut acara kalau ada pelanggaran apapun, Kualifikasi acara dan hadiah acaranya akan dibatalkan. Yg parah, akunnya akan diblokir.</p>
    </div>
    <div class="gift" v-else>
      <h5>Waktu acara</h5>
      <p>Jam 18:00 tgl 26 Feb. ~ Jam 21:00 tgl 7 Mar.</p>
      <h5>Hadiah acara</h5>
      <p>Top Master Kroom</p>
      <p>Top 1: Lencana Master Kroom Populer (30 hari) + Mount Debut akbar(30 hari) + VIP (3 bulan)+ 1000 koin emas + 3000 kacang emas</p>
      <p>Top 2: Lencana Master Kroom Populer (30 hari) + Mount Debut akbar(30 hari) + VIP (3 bulan)+ 800 koin emas + 2000 kacang emas</p>
      <p>Top 3: Lencana Master Kroom Populer (30 hari) + Mount Debut akbar(30 hari) + VIP (3 bulan)+ 600 koin emas + 1000 kacang emas</p>
      <p>Top 4~5: Lencana Master Kroom Populer (15 hari) + Mount Debut akbar(15 hari) + VIP (2 bulan)+ 300 koin emas + 800 kacang emas</p>
      <p>Top 6~10: Lencana Master Kroom Populer (7 hari) + Mount Debut akbar(7 hari) + VIP (1 bulan)+ 100 koin emas + 500 kacang emas</p>
      <p class="mt">Top Kroom Populer</p>
      <p>Top 1: VIP (2 bulan)+ Bingkai Hutan jamur (30 hari) + 2000 kacang emas + Tema Kroom Populer (30 hari)</p>
      <p>Top 2: VIP (2 bulan) + Bingkai Hutan jamur (15 hari) + 1500 kacang emas + Tema Kroom Populer (30 hari)</p>
      <p>Top 3: VIP (2 bulan) + Bingkai Hutan jamur (15 hari) + 1000 kacang emas + Tema Kroom Populer (30 hari)</p>
      <p>Top 4~10: VIP (1 bulan) + Bingkai Hutan jamur (7 hari) + 800 kacang emas + Tema Kroom Populer (30 hari)</p>
      <h5>Perhatian:</h5>
      <p>1.Data acara di Kroom yg dikunci tidak akan dihitung</p>
      <p>2.Setiap pengguna cuma bisa pakai satu akun utk ikut acara</p>
      <p>3.Yg mengikut acara kalau ada pelanggaran apapun, Kualifikasi acara dan hadiah acaranya akan dibatalkan. Yg parah, akunnya akan diblokir.</p>
    </div>

    <p class="lastTips">Hak interpretasi acara dipegang oleh penyelenggara acara</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mainTab: 0
    }
  }
}
</script>
<style lang="scss" scoped>
body {
  background: rgba(30, 6, 99, 1);
  .mt {
    margin-top: 0.8rem;
  }
  .rule {
    padding-top: 0.38rem;
  }
  .tabs {
    width: 7.5rem;
    height: 0.96rem;
    background: url(../../img/tabs.png);
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      display: block;
      width: 3.78rem;
      height: 0.88rem;
      text-align: center;
      line-height: 0.84rem;
      font-size: 0.36rem;
      color: #fff;
      &.current {
        color: rgba(87, 61, 197, 1);
        height: 1.13rem;
        margin-top: 0.2rem;
        background: url(../../img/tabs_act.png);
        background-size: 100% 100%;
      }
    }
  }
  .ruleItem,
  .gift {
    padding: 0 0.23rem;
  }
  h5 {
    color: rgba(255, 241, 162, 1);
    font-size: 0.28rem;
    font-weight: 600;
    margin: 0.38rem 0 0.2rem;
  }
  p {
    color: rgba(199, 240, 255, 1);
    font-size: 0.24rem;
    margin: 0.15rem 0;
  }
  .lastTips {
    margin-top: 3rem;
    text-align: center;
  }
}
</style>
