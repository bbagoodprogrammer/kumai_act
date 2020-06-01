<template>
  <div class="rule">
    <h1>القواعد</h1>
    <p class="time">الوقت:12:00 13\4 -23:00 24\4 (بتوقيت دبي)</p>
    <h6>القواعد:</h6>
    <p>1.أثناء النشاط، بعد تسجيلك، عندما نقاطك المكسوب من خلال إكمال المهام اليومية تصل إلى النقاط المطلوبة، ستحصل على فرص لاختيار الورق. 5 فرص لكل يوم على أقصى الحد لكل مستخدم، وستحذف الفرص اليومية في 00:00 اليوم القادم، تفضل باستخدامها في الموعد</p>
    <p>2.يمكن الحصول على جائزة واحدة كل مرة بعد اختيار الورق. وستتضاعف الجائزة بعد استخدام بطاقة التضاعف. ستصل الجوائز إلى حسابك فورا تلقائيا.</p>
    <p>3.ستبدأ تذكرة إعادة العملات للشحن فعالة بعد تلقيها.</p>
    <h6>وصف لاستخدام البطاقتين:</h6>
    <p>1.بطاقة الإزاحة، بعد نقرها للاستخدام، سيتم إزاحة نوع الجائزة الذي تختاره، وثم تنقر أوراقا باقية لاختيار الورق الذي توده </br> بطاقة التضاعف، بعد نقرها للاستخدام، ثم تنقر الأوراق مباشرا</p>
    <p>2.من اللازم أن تستخدم البطاقتين أثناء اليوم الذي تشتريها فيه، إلا ستحذف اليوم القادم</p>
    <p>3.استخدام البطاقتين قبل اختيار الأوراق، وهي فعالة للجولة الحالية</p>
    <p>4.يمكن أن تشتري بطاقة واحدة من بطاقة التضاعف أو بطاقة الإزاحة يوميا</p>
    <h6>وصف للجوائز:</h6>
    <p>1.كل الهدايا صلاحيتها 14 يوما، تفضل باستخدامها أثناء الصلاحية</p>
    <p>2.ستصل تذاكر إعادة العملات للشحن إلى حقيبتك تلقائيا، وهي فعالة أثناء 24 ساعة، تفضل باستخدامها أثناء الصلاحية</p>
    <h5>الجوائز الممكنة</h5>
    <img src="../../assets/img/giftImg.png" alt="">
    <p class="footerMsg">التفسير النهائي لهذا النشاط ينتمي إلى المنظم</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
body {
  background-color: #af6f4c;
  direction: rtl;
}
.rule {
  padding: 0.6rem 0.37rem;
  h1 {
    font-size: 0.36rem;
    font-weight: 800;
    text-align: center;
  }
  h6 {
    color: #ffe2a5;
    font-weight: 600;
    margin-top: 0.46rem;
  }
  h5 {
    font-size: 0.36rem;
    font-weight: 800;
    text-align: center;
    margin: 0.95rem 0 0.53rem;
  }
  img {
    width: 6.35rem;
    height: 7.04rem;
    margin: 0 auto;
  }
  p {
    font-size: 0.24rem;
    color: #ffe2a5;
    font-weight: 600;
    margin-top: 0.3rem;
    padding-left: 0.25rem;
  }
  .time {
    font-size: 0.24rem;
    font-weight: 600;
    text-align: center;
    margin-top: 0.2rem;
  }
  .footerMsg {
    text-align: center;
    font-size: 80%;
    color: #e8bea6;
    font-weight: 600;
    margin-top: 0.8rem;
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
