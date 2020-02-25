<template>
  <div class="works">
    <h5>وقت النشاط</h5>
    <p class="time">12:00 في يوم 7 من نوفمبر - 23:00 في يوم 14 من نوفمبر(توقيت دبي)</p>
    <h5>الجوائز لاقتسام حلاوة المولد من العبد</h5>
    <p>أثناء النشاط ، يتم تجميع النجوم التي تحصل عليها في لوحة حلاوة المولد من العبد، كلما تتراكم 600 نجمة، يمكنك أن تشترك في اقتسام حلاوة المولد من العبد. 200 عملة ذهبية لكل مرة. يمكن للجميع الاشتراك!</p>
    <h5>الجوائز لقائمة ترتيب النجوم</h5>
    <div class="wardItem">
      <div class="rank">المركز الأول</div>
      <div>
        <p>1. شارة نجمة الأعياد(لثلاثين يوما)</p>
        <p>2. هدية السكر المكعب*30 (لثلاثين يوما)</p>
        <p>3. هدية حلاوة المولد من العبد*30 (لثلاثين يوما)</p>
        <p>4. 1000 عملة ذهبية</p>
        <p>5. 1000 فول ذهبي</p>
      </div>
    </div>
    <div class="wardItem">
      <div class="rank">المركز الثاني</div>
      <div>
        <p>1. شارة نجمة الأعياد(لخمسة عشر يوما)</p>
        <p>2. هدية السكر المكعب*20 (لثلاثين يوما)</p>
        <p>3. هدية حلاوة المولد من العبد*20 (لثلاثين يوما)</p>
        <p>4. 800 عملة ذهبية</p>
        <p>5. 800 فول ذهبي</p>
      </div>
    </div>
    <div class="wardItem">
      <div class="rank">المركز الثالث</div>
      <div>
        <p>1. شارة نجمة الأعياد(لسبعة أيام)</p>
        <p>2. هدية السكر المكعب*10 (لثلاثين يوما)</p>
        <p>3. هدية حلاوة المولد من العبد*10 (لثلاثين يوما)</p>
        <p>4. 600 عملة ذهبية</p>
        <p>5. 600 فول ذهبي</p>
      </div>
    </div>
    <div class="wardItem">
      <div class="rank">المراكز 4-10</div>
      <div>
        <p>1. شارة نجمة الأعياد(لثلاثة أيام)</p>
        <p>2. هدية السكر المكعب*10 (لثلاثين يوما)</p>
        <p>3. 500 عملة ذهبية</p>
        <p>4. 500 فول ذهبي</p>
      </div>
    </div>
    <h5>وصف للجوائز</h5>
    <p>1. ستُعَطى هدية السكر المكعب وحلاوة المولد من العبد في حقيبة الفائزين. يمكن للمستخدمين بنظام أندرويد أن يستخدموا هذه الهدايا بعد تحميل أحدث طبعة لSuper Voice</p>
    <p>3. سوف تُعطَى هذه الهدايا أثناء سبعة الأيام بعد انتهاء النشاط</p>
    <p class="lastMsg">التفسير النهائي لهذا النشاط ينتمي إلى المنظم</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
h5 {
  margin-top: 0.63rem;
  color: #ffdc4f;
  font-weight: bold;
}
.time {
  margin-top: 0.19rem;
  font-size: 80%;
  color: #ffe9bd;
}
p {
  margin-top: 0.19rem;
  color: #ffe9bd;
}
.wardItem {
  width: 6.4rem;
  padding: 0.15rem 0;
  background: url(../../assets/img/ruleItems.png);
  background-size: 100% 100%;
  margin-top: 0.15rem;
  display: flex;
  align-items: center;
  .rank {
    width: 2rem;
    font-size: 93%;
    margin-right: 0.1rem;
  }
  p {
    font-size: 80%;
    color: #ffe9bd;
  }
}
.lastMsg {
  margin-top: 1.53rem;
  color: #8b7cf1;
  text-align: center;
}
</style>
