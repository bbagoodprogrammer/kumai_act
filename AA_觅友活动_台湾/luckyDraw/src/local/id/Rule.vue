<template>
  <div class="page pageRule rule">
    <div class="container">
      <p class="title">Waktu acara</p>
      <p class="tip pb36">
        <span class="starttime">{{ stime }}</span> -
        <span class="endtime">{{ etime }}</span>
      </p>
      <p class="title">Deskripsi acara</p>
      <ul>
        <li>
          <p>
            1. Pengguna dapatkan kesempatan undian berhadiah dengan pembelian kacang emas di halaman acara, dan maksimal 15 kali kesempatan undian berhadiah per hari.
          </p>
        </li>
        <li>
          <p>
            2. Dapat memilih tingkat undian berhadiah yang berbeda melalui "Ganti". Klik "Go", dapatkan satu kali untuk mengundian. Klik "Undian x5", dapatkan 5 kali berturut-turut untuk mengundian~
          </p>
        </li>
        <li>
          <p>
            3. Koin emas, kacang emas, hadiah ransel, bingkai avatar, dan hadiah mount akan segera dapatkan setelah ditarik. Hadiah koin emas untuk kupon bonus konsumsi dan kupon bonus top up akan
            masuk ke akun Anda pada keesokan harinya.
          </p>
        </li>
        <li>
          <p>
            4. Keterangan untuk menggunakan kupon bonus top up: Top up koin emas apa pun pada hari penghargaan, dan dapatkan bonus koin emas yang sesuai pada hari berikutnya (Rasio bonus tidak dapat
            ditumpangkan). Jika beberapa kupon bonus top up diperoleh pada waktu yang sama dalam sehari, bonus kembali akan didasarkan pada rasio tertinggi kupon bonus top up yang diperoleh. Kupon
            bonus hanya berlaku pada hari diperoleh.
          </p>
        </li>
        <li>
          <p>
            5. Keterangan penggunaan kupon bonus konsumsi koin emas: Jika Anda menghabiskan sejumlah koin emas pada hari penghargaan, Anda akan mendapatkan bonus koin emas yang sesuai pada hari
            berikutnya. Satu kupon hanya dapatakan bonus kembali satu kali saja. Jika beberapa kupon bonus konsumsi koin emas diperoleh pada waktu yang sama dalam sehari, kupon tersebut akan
            dikembalikan sesuai dengan denominasi maksimum kupon bonus konsumsi koin emas yang diperoleh. Kupon bonus hanya berlaku pada hari diperoleh.
          </p>
        </li>
        <li>
          <p>6. Acara ini tidak ada hubungan dengan Apple</p>
        </li>
        <li>
          <p>7. Semua hadiah ransel yang diberikan oleh acara berlaku selama 7 hari</p>
        </li>
      </ul>
      <p class="copy">Hak interpretasi akhir acara adalah milik penyelenggara acara</p>
    </div>
  </div>
</template>

<script>
import { getTimeObj } from "../../utils";
export default {
  data () {
    return {
      tab: 1,
      mainTab: 0,
      stime: 0,
      etime: 0,
    };
  },
  created () {
    this.stime = this.lang.time
      .replace("%y", getTimeObj(this.$route.query.stime).year)
      .replace("%mo", getTimeObj(this.$route.query.stime).month)
      .replace("%d", getTimeObj(this.$route.query.stime).day)
      .replace("%h", getTimeObj(this.$route.query.stime).hour)
      .replace("%m", getTimeObj(this.$route.query.stime).minute)
      .replace("%s", getTimeObj(this.$route.query.stime).second);
    this.etime = this.lang.time
      .replace("%y", getTimeObj(this.$route.query.etime).year)
      .replace("%mo", getTimeObj(this.$route.query.etime).month)
      .replace("%d", getTimeObj(this.$route.query.etime).day)
      .replace("%h", getTimeObj(this.$route.query.etime).hour)
      .replace("%m", getTimeObj(this.$route.query.etime).minute)
      .replace("%s", getTimeObj(this.$route.query.etime).second);
  },
  methods: {
    mainTabClick (tab) {
      this.mainTab = tab;
    },
  },
};
</script>


<style lang="scss">
.pageRule {
  background: #fffdec;
  .container {
    padding: 0.24rem;
    .title {
      font-size: 0.32rem;
      color: #ff8022;
      padding-bottom: 0.16rem;
    }
    .tip {
      font-size: 0.28rem;
      color: #333;
    }
    .pb36 {
      padding-bottom: 0.36rem;
    }
    ul {
      li {
        padding-bottom: 0.28rem;
        p {
          font-size: 0.28rem;
          line-height: 0.4rem;
          color: #333;
        }
      }
    }
  }
  .copy {
    font-size: 0.28rem;
    padding: 0.12rem 0 1.08rem;
    text-align: center;
  }
}
</style>