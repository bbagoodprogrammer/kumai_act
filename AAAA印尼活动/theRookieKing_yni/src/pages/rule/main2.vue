<template>
  <div class="rules">
    <div class="mainTabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">Aturan Acara</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">Hadiah Acara</a>
    </div>
    <div class="rule" v-if="mainTab === 0">
      <p class="time">Waktu Acara: {{totalTime}}</p>
      <h5>Aturan Acara:</h5>
      <p>1.Acara ini hanya pengguna dengan level penyanyi ≤4 bisa berpartisipasi</p>
      <p>2.Setelah pengguna mendaftar, akan menurut berikutnya sebagai skor daftar untuk melakukan peringkat :nilai pesona koin emas + nilai pesona kacang emas (termasuk nilai pesona hadiah ransel dari kamar karaoke) yang didapatkan oleh pengguna di kamar karaoke apapun selama kontes. Catatan: Nilai pesona yang didapatkan dengan bernyanyi di kamar pribadi yang terkunci atau menggunakan kata sandi akan tidak dihitung .</p>
      <p>3.Pengguna dengan skor dari Daftar Harian ≥5000 bisa mendapatkan 200 kacang emas, kacang emas akan dikirim secara otomatis oleh sistem;</p>
      <p class="days">4.Waktu spesifik dari Daftar Harian sebagai berikutnya:</p>
      <div v-html="actTime" class="daysTime"></div>
      <h5 class="zhuyi">Tips:</h5>
      <p>Jika Wekara menemukan kecurangan yang dilakukan pengguna utk meningkatkan nilai skor selama acara seperti penggunaan akun tuyul dalam jumlah besar,maka Wekara akan diskualifikasi pengguna atau membekukan akun tanpa memberi tahu sebelumnya.</p>
      <p class="jies">Hak interpretasi acara dipegang oleh penyelenggara acara</p>
    </div>
    <div class="rule" v-else>
      <p class="time">Waktu Acara: {{totalTime}}</p>
      <h5>Hadiah dari Daftar Total:</h5>
      <p class="ruleone">Top 1 : Hak istimewa bangsawan kaisar ( 1 bulan) + Lencana Newcomer King ( 14 hari ) + 2000 Koin emas + 5000 Kacang emas</p>
      <p>Top 2 : Hak istimewa bangsawan duke ( 1 bulan) + Lencana Newcomer King ( 14 hari ) + 1500 Koin emas + 3000 Kacang emas</p>
      <p>Top 3 : Hak istimewa bangsawan duke ( 1 bulan) + Lencana Newcomer King ( 14 hari ) + 1000 Koin emas + 2000 Kacang emas</p>
      <p>Top 4 ~ 10 : 500 Koin emas + 1000 Kacang emas</p>
      <p class="jies">Hak interpretasi acara dipegang oleh penyelenggara acara</p>
    </div>
    <Loading></Loading>
  </div>
</template>

<script>
import api from "../../api/apiConfig"
import getDate from "../../utils/getDate"
import Loading from "../../components/Loading"
export default {
  components: { Loading },
  data() {
    return {
      mainTab: 0,
      actTime: '',
      totalTime: ''
    }
  },
  created() {
    api.getDaysTime().then((res) => {
      const { days, stime, etime } = res.data.response_data
      for (var item in days) {
        var stimeIt = getDate(new Date(days[item].stime * 1000), '~')
        var etimeIt = getDate(new Date(days[item].etime * 1000), '~')
        this.actTime += `<p>Day${item}:${stimeIt} ~ ${etimeIt}</p>`
      }
      //活动总时间
      var totalStime = getDate(new Date(stime * 1000), '~')
      var totalEtime = getDate(new Date(etime * 1000), '~')
      this.totalTime += `${totalStime} ~ ${totalEtime}`
    })
  },
  methods: {
    mainTabClick(tab) {
      this.mainTab = tab
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #0c003b;
}
.rules {
  padding: 0.39rem 0.63rem 0;
  .mainTabs {
    width: 6.23rem;
    height: 0.8rem;
    margin: 0 auto;
    background: url(../../assets/img/tabsBg.png) no-repeat;
    background-size: contain;
    a {
      display: inline-block;
      width: 49%;
      height: 0.8rem;
      text-align: center;
      line-height: 0.8rem;
      color: #ca9dfd;
      font-weight: bold;
      &.current {
        color: #5b00b6;
        background: url(../../assets/img/actBg.png);
        background-size: 100% 100%;
      }
    }
  }
  .daysTime {
    padding-left: 0.2rem;
  }
  .rule {
    .ruleone {
      margin-top: 0.2rem;
    }
    .time {
      color: #bb81fb;
      font-size: 88%;
      margin: 0.57rem 0 0.2rem 0;
    }
    h5 {
      font-size: 88%;
      font-weight: bold;
    }
    p {
      font-size: 88%;
      line-height: 0.34rem;
    }
    .zhuyi {
      margin-top: 0.65rem;
    }
    .jies {
      color: #453192;
      font-size: 75%;
      text-align: center;
      margin-top: 1rem;
    }
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
