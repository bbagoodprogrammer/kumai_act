<template>
  <div class="rule">
    <div class="tabs">
      <span class="tab1" @click="changTab('tab1')" :class="{actTab:showTab == 'tab1'}">Aturan Acara</span>
      <span class="tab2" @click="changTab('tab2')" :class="{actTab:showTab == 'tab2'}">Hadiah Acara</span>
    </div>
    <p class="actTime">{{actTime}}</p>
    <div class="ruleMsg" v-show="showTab == 'tab1'">
      <h5>Cara untuk bermain:</h5>
      <p>1.Pengguna mengklik dan posting keinginan, menulis keinginannya. Setiap orang hanya memiliki 5 kesempatan untuk posting keinginan dalam sehari.</p>
      <p>2.Klik catatan tempel keinginan dan ambil keinginan dari pihak lain. Setelah mengambil keinginan,nyanyian umum pertama akan dikirim kepada pengguna ini,keinginan yang diambil akan tidak muncul dalam daftar keinginan,tetapi bisa dicek dalam catatan keinginan.</p>
      <p>3.Orang yang buat keinginan/pemohon bisa cek catatan keinginan pada tepat waktu untuk mengetahui kemajuan keinginannya yang diselesaikan.</p>
      <p>4. Setelah ambil keinginan,silakan mengantar lagu keinginan sebelum lewati 6 jam, jika tidak keinginan ini akan menjadi keterangan ditunggu ambil ,kamblikan daftar keinginan.</p>
      <p>5.Setiap hari paling banyak bisa menbantu pengguna lain 10 keinginan</p>
      <p>6.Pengguna dengan perangkat yang sama tidak dapat berpartisipasi dalam acara ini (tidak bisa membuat keinginan dan mengambil keinginan).</p>
      <p>7.Selama acara, dinilai 1 mencapai 10 kali,atau hapus lagu keinginan mencapai 5 kali ,akan dilarang untuk mengambil keinginan orang lain, skor dari Daftar Kirim Keinginan akan dihapus ke 0,dan keluar kontes daftar ini.</p>
      <h5>Tips:</h5>
      <p>Pengguna yang dengan sengaja/jahat untuk mengambil keinginan dan sawer hadiah akan memicu mekanisme dengan fungsi yang membekukan akun. Pada saat yang sama, mereka akan diturun dari daftar peringkat. Jika situasi serius, maka pihak wekara akan membekukan akun tersebut.</p>
    </div>
    <div class="ward" v-show="showTab == 'tab2'">
      <h5>Hadiah:</h5>
      <p>
        1.Setiap kali Anda mengambil keinginan, dan berhasil mengirim lagu, Anda akan menerima 1 hadiah ransel (Setiap orang menerima sebanyak 3 buah dalam sehari,berbagai hadiah ransel dikirimkan secara acak)
      </p>
      <h6>Hadiah untuk Top 100 pengguna dari Top kirim keinginan</h6>
      <div class="title">Top 10</div>
      <div class="ward1Box">
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward1.png" alt="">
          </div>
          <em>
            Lencana duta keinginan
          </em>
        </span>
        <span>
          <div class="imgBox">
            <img src="../../assets/img/vip.png" alt="">
          </div>
          <em>
            VIP(1 bulan)
          </em>
        </span>
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward3.png" alt="">
          </div>
          <em>
            500 Koin emas
          </em>
        </span>
      </div>
      <div class="title">Top 11 ~ 100</div>
      <div class="ward1Box">
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward4.png" alt="">
          </div>
          <em>
            Lencana angel yg hangat
          </em>
        </span>
        <span>
          <div class="imgBox">
            <img src="../../assets/img/vip.png" alt="">
          </div>
          <em>
            VIP(1 bulan)
          </em>
        </span>
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward6.png" alt="">
          </div>
          <em>
            1000 Kacang emas
          </em>
        </span>
      </div>
      <h6>Hadiah untuk Top 100 pengguna dari Top selesaikan keinginan</h6>
      <div class="ward2Box">
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward7.png" alt="">
          </div>
          <em>
            Lencana popular king utk keinginan
          </em>
        </span>
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward6.png" alt="">
          </div>
          <em>
            1000 Kacang emas
          </em>
        </span>
      </div>
      <p class="tips1">Lencana, bangsawan berlaku selama 31 hari</p>
      <p class="tips2">Hak interpretasi acara dipegang oleh penyelenggara acara</p>
    </div>
    <loading></loading>
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
      showTab: 'tab1',
      actTime: ''
    }
  },
  created() {
    api.getTime().then(res => {
      let resData = res.data.response_data
      this.actTime = `Waktu Acara: ` + getDate(new Date(resData.stime * 1000), 'pai') + ' ~ ' + getDate(new Date(resData.etime * 1000), 'pai')
    })
  },
  methods: {
    changTab(tab) {
      this.showTab = tab
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #2d0080;
}
.rule {
  padding: 0.35rem 0.45rem;
  .tabs {
    width: 6.73rem;
    height: 0.95rem;
    background: url(../../assets/img/tabsBg.png);
    background-size: 100% 100%;
    display: flex;
    span {
      display: inline-block;
      width: 3.56rem;
      height: 0.75rem;
      color: #a739da;
      font-size: 103%;
      line-height: 0.75rem;
      text-align: center;
      transition: all 0.2s;
      &.actTab {
        color: #fefefe;
        font-size: 113%;
        background: url(../../assets/img/avtTab.png);
        background-size: 100% 100%;
      }
      &.tab1 {
        margin: 0.1rem 0 0 0.1rem;
      }
      &.tab2 {
        margin: 0.1rem 0.12rem 0 0;
      }
    }
  }
  .ruleMsg {
    padding: 0 0.3rem;
  }
  .ward {
    padding: 0 0.3rem;
    h6 {
      font-size: 80%;
      color: #1dfadf;
      margin-top: 0.2rem;
      font-weight: bold;
    }
    .title {
      color: #1dfadf;
      font-weight: bold;
      text-align: center;
      margin-top: 0.2rem;
    }
    .ward1Box {
      display: flex;
      margin-top: 0.15rem;
      span {
        width: 33%;
        .imgBox {
          margin: 0 auto;
          width: 1.7rem;
          height: 1.7rem;
          background: url(../../assets/img/wardBg.png);
          background-size: 100% 100%;
        }
        img {
          display: block;
          width: 1.7rem;
          height: 1.7rem;
          margin: 0 auto;
        }
        em {
          margin-top: 0.05rem;
          display: block;
          font-size: 70%;
          color: #e8b7ff;
          text-align: center;
        }
      }
    }
    .ward2Box {
      display: flex;
      justify-content: center;
      margin-top: 0.15rem;
      span {
        width: 33%;
        .imgBox {
          margin: 0 auto;
          width: 1.7rem;
          height: 1.7rem;
          background: url(../../assets/img/wardBg.png);
          background-size: 100% 100%;
        }
        img {
          display: block;
          width: 1.7rem;
          height: 1.7rem;
          margin: 0 auto;
        }
        em {
          margin-top: 0.05rem;
          display: block;
          font-size: 70%;
          color: #e8b7ff;
          text-align: center;
        }
      }
    }
    .tips1 {
      margin-top: 0.3rem;
      font-size: 70%;
      color: #e8b7ff;
      text-align: left;
      padding-left: 0.2rem;
    }
    .tips2 {
      margin-top: 0.3rem;
      font-size: 70%;
      color: #e8b7ff;
      margin-top: 0.48rem;
    }
  }
  h5 {
    color: #1dfadf;
    font-size: 110%;
    font-weight: bold;
    text-align: left;
    margin: 0.21rem 0 0.1rem;
  }
  p {
    font-size: 70%;
    color: #e8b7ff;
  }
  .actTime {
    padding: 0 0.2rem;
    color: #1dfadf;
    margin: 0.1rem;
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
