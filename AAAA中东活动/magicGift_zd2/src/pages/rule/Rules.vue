<template>
  <div class="rules">
    <p class="activeTime">الوقت:14:30 في يوم 26 من سبتمبر-16:00 في يوم 3 من أكتوبر بتوقيت دبي</p>
    <h5>القواعد</h5>
    <div class="actSingUp">
      <h5>التسجيل:</h5>
      <p>1. انقر "التسجيل الآن" لاشتراك المسابقة</p>
      <p>2. بالنسبة إلى قائمة هدايا الأعمال، يجب عليك أن ترفع أي أعمالك المنشورة العامة في إعلان المسابقة بعد نقر "التسجيل الآن". يمكنك أن ترفع أعمالا عديدة لاشتراك المسابقة، وسيجري إحصاء هدايا الأعمال بعد تسجيلك. إذا تحذف أعمالك المشتركة أثناء المسابقة، فدرجاتك لهذه الأعمال تكون تافهة</p>
      <h5>قواعد الترتيب لقائمة هدايا الأعمال</h5>
      <p>1. بعد اشتراك المسابقة، أعمالك المشتركة في المسابقة(ذات علامة مسابقة الهدايا)، سيجري ترتيبها حسب قيمة السحر من الهدايا المتلقاة المحددة</p>
      <p>2. الهدايا المحددة للأعمال هي طوف من الخيزران(10 عملات) وكشك الهاتف(58 عملة) وروبوت القط(528 عملة)</p>
      <p>3. إذا تحصلون على نفس قيمة السحر للهدايا المحددة، فيُضَع ترتيب من توصل إلى هذه القيمة قبل اآخرين أمامهم</p>
      <p>4. تظهر القائمة درجات أفضل 100 فقط</p>
      <h5>قواعد الترتيب لقائمة هدايا في غرفة الغناء</h5>
      <p>1. بعد التسجيل، سيجري الترتيب حسب قيمة السحر من الهدايا المتلقاة المحددة في غرفة الغناء </p>
      <p>2. الهدايا المحددة للأعمال هي دوراياكي(10 عملات) والباب التعسفي(58 عملة) وآلة الزمن(528 عملة)</p>
      <p>3. إذا تحصلون على نفس قيمة السحر للهدايا المحددة، فيُضَع ترتيب من توصل إلى هذه القيمة قبل اآخرين أمامهم</p>
      <p>4. تظهر القائمة درجات أفضل 100 فقط</p>
      <!-- <h5>金幣返還獎勵規則：</h5>
      <p>1、向報名活動後發佈的公開作品贈送椰子水（10金幣）、玩具水槍（100金幣）、雪糕車（600金幣），次日凌晨返禮物金幣數的5%金幣。如當天贈送1個價值600金幣的雪糕車禮物，則在次日凌晨獎勵30金幣</p>
      <p>2、向報名活動後在K房上麥的用戶贈送冰淇淋（10金幣）、沙灘椅（100金幣）、海景房（600金幣）禮物，次日凌晨返禮物金幣數的5%金幣。如當天贈送1個價值600金幣的海景房禮物，則在次日凌晨獎勵30金幣</p> -->
    </div>
    <h5>الآخر</h5>
    <div>
      <p>أثناء المسابقة ، إذا تبين أن المستخدم يستخدم الوسائل غير المناسبة للمشاركة في النشاط ، يحق للمسؤول إلغاء المؤهل دون إشعار مسبق ، وفي الحالات الشديدة ، سيتم حظر رقم حساب المشارك ، بما في ذلك على سبيل المثال لا الحصر:</p>
      <div class="list">
        <p>1）أعمالك المشتركة لا تغنيها نفسك أو تستخدم تسجيل الآخرين</p>
        <p>2）تسرق حساب الآخرين أو تستعيره لاشتراك في المسابقة</p>
        <p>3）تفتح حسابات كثيرة لاشتراك في المسابقة</p>
        <p>4）تعلق على آخر المستخدمين بالكلمات السيئة أو ترسلهم إعلانات في فترة النشاط</p>
        <p>5）تشترك في النشاط عن طريق غير لائق</p>
      </div>
      <p>إذا تغش في المسابقة، لحق للمنظم أن يحظر كل حساباتك، ويلغي جوائزك التي تكتسب في المسابقة</p>
      <p>التفسير النهائي لهذا النشاط ينتمي إلى المنظم</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.rules {
  padding-bottom: 1rem;
  p {
    margin-top: 0.1rem;
    line-height: 0.36rem;
    font-size: 80%;
    color: #c3bfff;
  }
  .activeTime {
    color: #c3bfff;
    text-align: center;
    margin-top: 0.51rem;
  }
  > h5 {
    text-align: center;
    font-size: 120%;
    color: #ffbb8d;
    margin-top: 0.57rem;
  }
  .actSingUp {
    > h5 {
      color: #6ffff3;
      font-size: 80%;
      margin-top: 0.2rem;
    }
  }
  .list {
    p {
      text-indent: 0.2rem;
    }
  }
}
</style>
