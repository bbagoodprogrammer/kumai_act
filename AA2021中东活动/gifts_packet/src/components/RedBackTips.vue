<template>
  <div class="redBackTips">
    <div class="tipsCon">
      <div class="tips1">
        <p>1. يمكنك تجربة ميزة الحزمة الحمراء في أي غرفة الغناء(يرسل و يحصل)!</p>
        <img src="../assets/img/t1.png" alt="" class="img1">
        <img src="../assets/img/t2.png" alt="" class="img2">
      </div>
      <div class="tips2">
        <p>2. بالإضافة إلى الهدايا في حزمة حمراء مختلفة ، تحتوي الحزم الحمراء أيضًا على تأثيرات خاصة رائعة!</p>
        <h6>يدعو أصدقاء</h6>
        <p>يمكن للأصدقاء الذين يتابعون بعضهم البعض والمستخدمين الذين يجمعون الغرفة التي يرسل الحزمة الحمراء تلقي أخبار انتزاع الحزمة الحمراء في المرة الأولى. يمكن لمزيد من المعجبين المشتركين والمزيد من المفضلين زيادة احتمالية الفوز بالحزم الحمراء!</p>
        <img src="../assets/img/t3.png" alt="" class="img3">
        <h6>ارتفاع ترتيب الغرفة</h6>
        <p>غرفة الغناء التي أرسلت الحزمة الحمراء ارتفعت خلال 10 دقائق ، وبعد عرضها في غرفة الغناء الرسمية ، تعرضت لمزيد من المستخدمين!</p>
        <h6>توسيع عدد الغرفة إلى 500(60 دقيقة)</h6>
        <p>يمكن غرفة الغناء أن تستوعب 500 شخص في غضون 60 دقيقة بعد إرسال الحزمة الحمراء ، وستتم استعادة السعة الأصلية غرفة الغناء بعد انتهاء الوقت.</p>
        <h6>علامة الحزمة الحمراء</h6>
        <p>بعد إرسال الحزمة الحمراء ، ستكون هناك علامة مغلف حمراء في قائمة غرفة الغناء ، مما يعني وجود حزمة حمراء للاستيلاء عليه</p>
        <h6></h6>
        <img src="../assets/img/t4.png" alt="" class="img4">
      </div>
      <div class="tips3">
        <h6>أسلوب حصري</h6>
        <p>هناك أنماط خاصة للحزم الحمراء للمهرجانات والمناسبات الخاصة ، وهناك أيضًا حزمة حمراء جديدة للأعياد</p>
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
