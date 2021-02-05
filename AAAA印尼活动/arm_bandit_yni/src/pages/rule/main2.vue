<template>
  <div class="rule">
    <h5>Aturan Acara</h5>
    <p>Waktu Acara :{{actTime}}</p>
    <!-- <p>Waktu Acara : pukul 18:00 tgl 25 Nov ~ pukul 21:00 tgl 9 Dec</p> -->
    <ol>
      <li>Selama acara, kalau Anda top up 1 koin emas , Anda akan mendapatkan 1 koin harimau,koin harimau dapat ditukar dengan undian di halaman ini. Semakin banyak koin harimau yang dihabiskan, hadiah yang Anda dapatkan dalam mode undian akan semakin kaya, dan semakin besar kemungkinan utk mendapatkan hadiah yang berharga!</li>
      <li>Setiap kali undian bisa mendapatkan 3 hadiah sekaligus, dan hadiah akan dikirim ke akun secara real- time.Ketika hadiah undian yang Anda dapatkan salah satunya Double Card, maka 2 hadiah lainnya akan digandakan!</li>
      <li>Kupon bonus untuk top up dan kupon bonus untuk sawer yang didapatkan dalam acara akan dihitung nilai setelah Anda undian/mendapatkan kupon , dan koin emas akan dikirim setelah persyaratan dipenuhi!</li>
      <li>Ketika mode undian dengan 200 koin harimau / kali penuh 20 kali pasti bisa undian/mendapatkan akun UID yang baik dengan 7 digit/angka.Kalau Anda berhasil undian akun UID yang baik dengan 7 digit/angka,silakan hubungi Wekara Resmi (akun ID 10),pilih dan konfirmasikan ID yang baik dengan 7 digit yang diberikan oleh Wekara Resmi.</li>
      <li>Ketika mode undian dengan 200 koin harimau / kali penuh 222 kali pasti bisa undian/mendapatkan akun UID unik dengan 4 digit/angka. Kalau Anda berhasil undian akun UID yang baik dengan 4 digit/angka, silakan hubungi Wekara Resmi (akun ID 10), pilih dan konfirmasikan ID yang baik dengan 4 digit yang diberikan oleh Wekara Resmi.</li>
    </ol>
    <p class="waordsMsg">Hadiah yang bisa diterima</p>
    <div class="wardsBox clearfix">
      <ul>
        <li>
          <span>
            <img :src="require('../../assets/img/ward18.png')" alt="">
          </span>
          <p>Mount Mobil Keren</p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/ward19.png')" alt="">
          </span>
          <p>Vip</p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/ward12.png')" alt="">
          </span>
          <p>Koin emas besar-besaran</p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/ward4.png')" alt="">
          </span>
          <p>Kupon bonus untuk top up</p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/ward7.png')" alt="">
          </span>
          <p>Kupon bonus untuk sawer</p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/ward8.png')" alt="">
          </span>
          <p>Koin harimau</p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/ward21.png')" alt="">
          </span>
          <p>Double Card</p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/ward15.png')" alt="">
          </span>
          <p>Kacang emas besar-besaran</p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/ward20.png')" alt="">
          </span>
          <p>akun UID yang baik dengan 4 digit/angka</p>
        </li>
      </ul>
    </div>
    <p class="footerMsg">Hak interpretasi acara dipegang oleh penyelenggara acara</p>
  </div>
</template>

<script>
import getDate from "../../utils/getDate"
export default {
  computed: {
    actTime() {
      const timeObj = JSON.parse(sessionStorage.getItem('timeObj'))
      return getDate(new Date(timeObj.stime * 1000), 'rule') + '~' + getDate(new Date(timeObj.etime * 1000), 'rule')
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #2b0057;
}
.rule {
  padding: 0.35rem 0.45rem;
  h5 {
    color: #fdfdac;
    font-size: 160%;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0.36rem;
  }
  > p {
    font-size: 80%;
    color: #5dffe2;
  }
  ol {
    li {
      margin-top: 0.2rem;
      padding-left: 0.38rem;
      font-size: 80%;
      line-height: 0.28rem;
      position: relative;
    }
    li::after {
      content: "";
      width: 0.12rem;
      height: 0.12rem;
      position: absolute;
      left: 0rem;
      top: 0.1rem;
      background-color: #ffd900;
      border-radius: 50%;
    }
  }
  .waordsMsg {
    margin-top: 1rem;
  }
  .wardsBox {
    width: 6.5rem;
    margin: 0.4rem auto;
    li {
      width: 33.3%;
      float: left;
      height: 2rem;
      // margin:.2rem .3rem 0 0;
      span {
        display: block;
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 0.2rem;
        background-color: #ab02de;
        text-align: center;
        margin: 0 auto;
        img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
      p {
        width: 2.1rem;
        font-size: 80%;
        text-align: center;
        // white-space:nowrap;
        margin-top: 0.12rem;
      }
    }
  }
  .footerMsg {
    text-align: center;
    font-size: 80%;
    color: #f7d8ff;
    margin-top: 0.6rem;
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
