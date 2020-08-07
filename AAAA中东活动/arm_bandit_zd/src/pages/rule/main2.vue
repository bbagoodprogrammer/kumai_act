<template>
  <div class="rule">
    <h5>القواعد</h5>
    <p class="ruleTitle">الوقت:</p>
    <p class="time">{{timer}}</p>
    <ol>
      <li>1.ستحصل على نقد الفتحة الواحدة بعد شحن عملة واحدة لاشتراك في اليانصيب. الجوائز في 400 نقد الفتحة و2000 نقد الفتحة و5000 نقد الفتحة مختلفة، تنفق نقود أكثر، وتكون الجوائز أوفر. ونسبة كسب الجائزة الفريدة أكبر!</li>
      <li>2.ستحصل على ثلاث جوائز في اليانصيب الواحد، ستصل إلى حسابك الجوائز الثلاث تلقائيا. عندما تكون جائزة ما بطاقة التضاعف، فسيتضاعف عدد الجائزتين الأخرين.</li>
      <li>3.ستكون تذاكر إعادة العملات للشحن وإعادة العملات لإرسال الهدايا فعالة فورا بعد كسبها. وستحصل على العملات المعادة بعد أن تليق بشروطها!</li>
      <li>4.جائزة السيارة الخاصة ل400 نقد الفتحة هي دراجة نارية(سبعة أيام)، جائزة السيارة الخاصة ل2000 نقد الفتحة هي دراجة نارية(سبعة أيام)، جائزة السيارة الخاصة ل5000 نقد الفتحة هي طائرة الهجوم الحمراء(سبعة أيام)</li>
      <li>5.بعد جري اليانصيب لعشرين مرة في نمط 5000 نقد الفتحة، ستكسب سيارة فيراري(ثلاثون يوما) بالتأكيد!</li>
    </ol>
    <p class="waordsMsg">الجوائز الممكنة</p>
    <div class="wardsBox clearfix">
      <ul>
        <li>
          <span>
            <img :src="require('../../assets/img/car2.png')" alt="">
          </span>
          <p>دراجة نارية</p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/car4.png')" alt="">
          </span>
          <p>طائرة الهجوم الحمراء</p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/car3.png')" alt="">
          </span>
          <p>سيارة فيراري</p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/ward6.png')" alt="">
          </span>
          <p>
            تذكرة إعادة العملات
            لإرسال الهدايا
          </p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/ward4.png')" alt="">
          </span>
          <p>
            تذكرة إعادة
            العملات للشحن
          </p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/car1.png')" alt="">
          </span>
          <p>سيارة GTR</p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/ward12.png')" alt="">
          </span>
          <p>عملات كثيرة</p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/ward21.png')" alt="">
          </span>
          <p>بطاقة التضاعف </p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/ward10.png')" alt="">
          </span>
          <p>نقد الفتحة</p>
        </li>
      </ul>
    </div>
    <p class="footerMsg">التفسير النهائي للنشاط ينتمي إلى المنظم</p>
  </div>
</template>

<script>
import getDate from "../../utils/getDate.js"
export default {
  data() {
    return {
      stime: 0,
      etime: 0
    }
  },
  created() {
    this.stime = sessionStorage.getItem('stime')
    this.etime = sessionStorage.getItem('etime')
  },
  computed: {
    timer() {
      return getDate(new Date(Number(this.stime * 1000)), "rule") + ' ~ ' + getDate(new Date(Number(this.etime * 1000)), "rule")
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #9d4b14;
  direction: rtl;
}
.rule {
  padding: 0.35rem 0.45rem;
  .ruleTitle {
    margin-top: 0.1rem;
  }
  .time {
    direction: ltr;
    text-align: right;
  }
  h5 {
    color: #fdfdac;
    font-size: 160%;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0.36rem;
  }
  > p {
    font-size: 80%;
    color: #fee78c;
  }
  ol {
    li {
      margin-top: 0.2rem;
      padding-right: 0.38rem;
      font-size: 80%;
      line-height: 0.28rem;
      position: relative;
    }
    li::after {
      content: "";
      width: 0.12rem;
      height: 0.12rem;
      position: absolute;
      right: 0rem;
      top: 0.1rem;
      background-color: #ffd900;
      border-radius: 50%;
    }
  }
  .waordsMsg {
    margin-top: 0.5rem;
  }
  .wardsBox {
    width: 5.5rem;
    margin: 0 0 0 0;
    li {
      width: 1.52rem;
      height: 1.8rem;
      float: left;
      margin: 0.2rem 0 0 0.3rem;
      span {
        display: block;
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 0.2rem;
        background-color: #ae662a;
        text-align: center;
        margin: 0 auto;
        img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
      p {
        font-size: 70%;
        text-align: center;
        margin-top: 0.12rem;
        color: wardsBox;
      }
    }
  }
  .footerMsg {
    text-align: center;
    font-size: 80%;
    color: #c7906c;
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
