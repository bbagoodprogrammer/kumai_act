<template>
  <div class="rule">
    <div class="tabs">
      <span class="tab1" @click="changTab('tab1')" :class="{actTab:showTab == 'tab1'}">القواعد</span>
      <span class="tab2" @click="changTab('tab2')" :class="{actTab:showTab == 'tab2'}">الجوائز</span>
    </div>
    <p class="actTime">{{actTime}}</p>
    <div class="ruleMsg" v-show="showTab == 'tab1'">
      <h5>كيف يجري النشاط:</h5>
      <p>1.انقر"نشر طلب الأغنية" واكتب رغبتك. لكل شخص خمس فرص لنشر الرغبة</p>
      <p>2.انقر وتقطف رغبة الآخرين، نوافق ضمنيا على إعطاء أول أغنية عامة نشرتها بعد قطف الرغبة لمن يرسل هذه الرغبتية. الرغبة التي تم قطفها لا تعرض في قائمة الرغبات، يمكن وجودها في تفاصيل الرغبة</p>
      <p>3.يمكن وجود رغبتك المرسلة في تفاصيل الرغبة وعملية إمكالها.</p>
      <p>4.لا يمكن أن تشترك في هذا النشاط بحسابات كثيرة.</p>
      <p>5.أثناء النشاط، إذا يوجد عشرة أشخاص يعطون درجة واحدة لأغانيك أو تحذف أغانيك الرغبية لخمس مرات، فستُمنع من قطف رغبة الآخرين. وفي نفس الوقت، سنمسح نقاطك في قائمة إكمال الرغبة، ولا يمكنك دخول هذه القائمة</p>
      <h5>الملاحظات:</h5>
      <p>قطف الرغبات أو إهداء الهدايا أو نشر الأعمال ثم حذفها بشكل سيء، من يفعل هكذا، سنلغي موهله لاشتراك في النشاط أو نحظر حسابه أبدا.</p>
    </div>
    <div class="ward" v-show="showTab == 'tab2'">
      <h5>الجوائز:</h5>
      <p>
        1.إذا تقطف رغبة واحدة وإعطاء أغنيتها بنجاح، فستحصل على نوع من هدايا الحقيبة عشوائيا(كل شخص يمكن الحصول على ثلاث هدايا يوميا)
      </p>
      <h6>جوائز لمراكز 100-1 لقائمة إكمال الرغبة</h6>
      <div class="title">المراكز10-1</div>
      <div class="ward1Box">
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward1.png" alt="">
          </div>
          <em>
            شارة سفير الرغبة
          </em>
        </span>
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward2.png" alt="">
          </div>
          <em>
            سيارة طائرة الهجوم الحمراء
          </em>
        </span>
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward3.png" alt="">
          </div>
          <em>
            500 عملة
          </em>
        </span>
      </div>
      <div class="title">المراكز 100-11</div>
      <div class="ward1Box">
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward4.png" alt="">
          </div>
          <em>
            شارة الملاك الدافئ
          </em>
        </span>
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward5.png" alt="">
          </div>
          <em>
            هدية rose*50
          </em>
        </span>
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward6.png" alt="">
          </div>
          <em>
           1000 فول
          </em>
        </span>
      </div>
      <h6>جوائز لمراكز 100-1 لقائمة إرسال الرغبة</h6>
      <div class="ward2Box">
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward7.png" alt="">
          </div>
          <em>
            شارة شعبية الرغبة
          </em>
        </span>
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward6.png" alt="">
          </div>
          <em>
            1000 فول
          </em>
        </span>
      </div>
      <p class="tips1">*شارة وسيارة صلاحيتها 31 يوم</p>
      <p class="tips2">التفسير النهائي لهذا النشاط ينتمي إلى المنظم</p>
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
      this.actTime = `الوقت: ` + getDate(new Date(resData.stime * 1000), 'pai') + ' ~ ' + getDate(new Date(resData.etime * 1000), 'pai')
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
  direction: rtl;
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
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3.56rem;
      height: 0.75rem;
      color: #a739da;
      font-size: 103%;
      text-align: center;
      transition: all 0.2s;
      &.actTab {
        color: #fefefe;
        font-size: 113%;
        background: url(../../assets/img/avtTab.png);
        background-size: 100% 100%;
      }
      &.tab1 {
        margin: 0.1rem 0.1rem 0 0 ;
      }
      &.tab2 {
        margin: 0.1rem 0 0 0.12rem;
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
      text-align: right;
      padding-left: 0.2rem;
    }
    .tips2 {
      margin-top: 0.3rem;
      font-size: 70%;
      color: #e8b7ff;
      margin-top: 0.48rem;
      text-align: center;
    }
  }
  h5 {
    color: #1dfadf;
    font-size: 110%;
    font-weight: bold;
    // text-align: left;
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
