<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="tabClick(0)" :class="{current:tab==0}" href="">Aturan</a>
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">Hadiah</a>
    </div>
    <h6 class="time">Waktu acara : tgl 18 Jun, pukul 18:00 - tgl 26 Jun,pukul 22:00</h6>
    <div class="ruleTips" v-show="tab == 0">
      <h6>Aturan</h6>
      <p>1. semua pengguna bisa mendaftar utk ikut acara.</p>
      <p>2.setelah mendaftar acara, pengguna bisa mendapat nilai kejutan melalui sawer di kamar karaoke、nyanyian、kamar obrolan,nilai kejutan mencapai tingkat yg ditentukan bisa buka kotak,tapi setiap org setiap hari hanya bisa menbuka kotak 1 kali, hadiah dari kotaknya akan dikirim secara otomatis.</p>
      <p>
        3.Aturan peringkat
        <strong>Daftar harian: Nilai kejutan=Total nilai pesona dari hadiah koin emas yang sawer di kamar karaoke/nyanyian/ kamar obrolan, peringkatnya akan menurut nilai kejutan diperingkat dari nilai tinggi sampai nilai rendah, peringkat daftar harian akan dihapus setelah pukul 24:00 dan akan memeringkat lagi,peringkat daftar harian hanya tampilkan top 1~100.</strong>
        <strong>Daftar total： Akumulasi nilai kejutan harian selama acara, peringkatnya akan menurut nilai kejutan diperingkat dari nilai tinggi sampai nilai rendah, peringkat daftar total akan tampilkan top 1~100.</strong>
      </p>
      <h6>Waktu daftar harian:</h6>
      <p class="dayTime">
        Day1: 18:00 18/6 - 00:00 19/6</br>
        Day2：00:00 19/6- 00:00 20/6</br>
        Day3：00:00 20/6- 00:00 21/6</br>
        Day4：00:00 21/6- 00:00 22/6</br>
        Day5：00:00 22/6- 00:00 23/6</br>
        Day6：00:00 23/6- 00:00 24/6</br>
        Day7：00:00 24/6- 00:00 25/6</br>
        Day8: 00:00 25/6- 00:00 26/6</br>
        Day9: 00:00 26/6- 22:00 26/6
      </p>
      <h6>Level beruntung:</h6>
      <p class="dayTime">
        Lv1: 500 nilai kejutan</br>
        Lv2: 1000 nilai kejutan</br>
        Lv3: 2000 nilai kejutan</br>
        Lv4: 5000 nilai kejutan</br>
        Lv5: 8000 nilai kejutan</br>
        Lv6: 10000 nilai kejutan</br>
        Super kotak: Akumulasi 100000 nilai kejutan selama acara.</br>
        Perhatikan:nilai kejutan akan dihapus setelah pukul 24:00 hari ini, tolong buka kotak pada tepat waktu.
      </p>
      <h6>Perhatikan:</h6>
      <p>1.kalau menemukan pengguna ada perilaku yg gak teratur,misalnya kirim hadiah dengan akun lain kpd akun sendiri,atas situasi yg tanpa pemberitahuan,penyelenggara berhak yg hapus nilai perbandingan
        dan ambil hadiah semua kembali yg di dalam acara ini, dan menglarang pengguna ini ikut acara .</p>
      <p>2.Hadiah daftar harian: top 1~3 masing-masing hadiahi 15%、12%、10% kupon utk top up dan akan dikirim oleh sistem secara otomatis pada pukul 24 hari ini,hadiah daftar harian akan dikirim ketika acara selesai.</p>
      <p>3. Hadiah ransel yang didapatkan berlaku selama 14 hari, silakan gunakannya dalam periode validitas.</p>
      <p>4. ketika mencapai level yg bisa buka beberapa kotak ,maka akan default langsung buka tokat yg level yg paling tinggi.</p>
    </div>
    <div class="giftTips" v-show="tab ==1">
      <div class="giftBox">
        <span>
          <img src="../../assets/img/ruleGift/1.png" alt="">
          <strong> Lencana beruntung</strong>
        </span>
        <span>
          <img src="../../assets/img/ruleGift/2.png" alt="">
          <strong>Hak istimewat
            bangsawan kaisar</strong>
        </span>
        <span>
          <img src="../../assets/img/ruleGift/3.png" alt="">
          <strong>Hak istimewat
            bangsawan duke</strong>
        </span>
        <span>
          <img src="../../assets/img/ruleGift/4.png" alt="">
          <strong>Mount mobil badai </strong>
        </span>
        <span>
          <img src="../../assets/img/ruleGift/5.png" alt="">
          <strong>Koin emas</strong>
        </span>
        <span>
          <img src="../../assets/img/ruleGift/6.png" alt="">
          <strong>Kacang emas</strong>
        </span>
      </div>
      <h6>Hadiah level</h6>
      <p>nilai kejutan sampai level yg ditentukan bisa menbuka kotak,tapi setiap akun setiap hari hanya bisa buka tokatnya 1 kali,ketika mencapai level yg bisa buka beberapa kotak ,maka akan default langsung buka tokat yg level yg paling tinggi.Hadiah akan dikirim ke akun secara otomatis,rekam akan bisa dilihat dalam Momen kejutan. </p>
      <h6>Hadiah daftar harian</h6>
      <p> top 1~3 masing-masing hadiahi 15%、12%、10% kupon utk top up dan akan dikirim oleh sistem secara otomatis pada pukul 24 hari ini,hadiah daftar harian akan dikirim ketika acara selesai.</p>
      <h6>Hadiah daftar total:</h6>
      <p>Top 1: lencana beruntung (30 hari ) +hak istimewa bangsawan kaisar (31 hari )+ mount mobil badai (14 hari ) + 1000 koin emas+ 5000 kacang emas</p>
      <p>Top 2: lencana beruntung (30 hari ) + hak istimewa bangsawan duke(31 hari )+ mount mobil badai (14 hari )+800 koin emas+ 3000 kacang emas</p>
      <p>Top 3: lencana beruntung (30 hari ) + hak istimewa bangsawan duke(31 hari )+ mount mobil badai (14 hari )+600 koin emas+ 2000 kacang emas</p>
      <p>Top 4~10: lencana beruntung (30 hari ) + 200 koin emas + 1000 kacang emas</p>
      <h6>Perhatikan:</h6>
      <p>1. Kupon bonus utk top up setelah dikirim ke ransel ,hanya berlaku selama 24 jam, tolong menggunakannya pada tepat waktu. </p>
      <p>2. Hadiah ransel yang didapatkan berlaku selama 14 hari, silakan gunakannya dalam periode validitas.</p>
      <p>3. hadiah dari daftar total akan dikirim dalam 7 hari setelah acara selesai.</p>
    </div>
    <p class="lastTips">Hak interpretasi akhir dari acara ini dipegang oleh penyelenggara acara!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 0
    }
  },
  methods: {
    tabClick(val) {
      this.tab = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #290d70;
  .rule {
    padding: 0.36rem 0.27rem 0;
    .tabs {
      width: 6.98rem;
      height: 0.98rem;
      background: url(../../assets/img/tabs.png);
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        display: block;
        width: 3.66rem;
        height: 0.9rem;
        text-align: center;
        line-height: 0.9rem;
        color: #fddc55;
        font-weight: 700;
        font-size: 0.32rem;
        &.current {
          color: #a24e04;
          background: url(../../assets/img/actTabs.png);
          background-size: 100% 100%;
        }
      }
    }
    .time {
      text-align: center;
      font-weight: 600;
      color: #81f8fe;
      margin-top: 0.5rem;
    }
    h6 {
      font-weight: 600;
      color: #81f8fe;
      margin: 0.5rem 0 0.2rem;
    }
    p {
      font-size: 0.24rem;
      font-weight: 500;
      margin-top: 0.15rem;
      padding-left: 0.2rem;
      line-height: 0.4rem;
      strong {
        font-size: 0.24rem;
        display: block;
        padding-left: 0.15rem;
      }
    }
    .ruleTips {
      margin-top: 0.61rem;
      .dayTime {
        line-height: 0.5rem;
      }
    }
    .giftTips {
      .giftBox {
        padding: 0 0.37rem;
        margin-top: 0.15rem;
        span {
          display: inline-block;
          vertical-align: top;
          width: 1.6rem;
          margin: 0.29rem 0.6rem 0 0;
          img {
            display: block;
            width: 1.6rem;
            height: 1.6rem;
          }
          strong {
            display: block;
            text-align: center;
            color: #fff3d2;
            font-size: 0.24rem;
            font-weight: 600;
            margin-top: 0.15rem;
          }
        }
        span:nth-child(3),
        span:nth-child(6) {
          margin-right: 0;
        }
      }
    }
    .lastTips {
      text-align: center;
      margin: 0.94rem 0 0.15rem;
      color: #4f43cd;
      font-size: 0.24rem;
      font-weight: 500;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
