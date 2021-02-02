<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="tabClick(0)" :class="{current:tab==0}" href="">قواعد النشاط</a>
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">جوائز النشاط</a>
    </div>
    <div class="actTime">وقت النشاط:16:00 5\2 -23:00 14\2 (بتوقيت دبي)</div>
    <div class="ruleTips" v-show="tab == 0">
      <h5>قواعد النشاط:</h5>
      <p>1. النشاط يتطلب التسجيل للمشاركة ، ويتم احتساب القيمة بعد التسجيل</p>
      <p>2. تنقسم القائمة إلى قائمة الأغنياء و القائمة المحظوظة</p>
      <p class="rankTips">
        قائمة غنية: احسب المبلغ الإجمالي لحزمة حمراء بعملات المرسلة من قبل المستخدمين المشاركين واعرض أفضل 100</br>
        القائمة المحظوظة: احسب العدد الإجمالي للحزمة الحمراء التي تلقاها المستخدمون المشاركون واعرض أفضل 100
      </p>
      <h5 class="other">ملاحظة:</h5>
      <p>1. ترسل غرفة الغناء المشفرة حزمة حمراء بدون تسجيل بيانات النشاط</p>
      <p>2. يمكن لكل مستخدم استخدام حساب واحد فقط للمشاركة في النشاط</p>
      <p>3. ستؤدي المشاركة في النشاط التي تحتوي على أي انتهاكات إلى فقدان الأهلية ومكافآت النشاط. وفي الحالات الشديدة ، سيتم حظر الحساب</p>
    </div>
    <div class="wardTips" v-show="tab == 1">
      <h5>جوائز النشاط:</h5>
      <h6>قائمة الأغنياء</h6>
      <p>المرتبة الأولى: شارة ملك الحزمة الحمراء(30 يوم) + سيارة GTR ل(30 يوم)+موضوع في غرفة الغناء: الغابة السحرية(30 يوم) + 4000 عملة</p>
      <p>المرتبة الثانية: شارة ملك الحزمة الحمراء(21 يوم) + سيارة GTR ل(21 يوم)+موضوع في غرفة الغناء: الغابة السحرية(21 يوم) + 2500 عملة</p>
      <p>المرتبة الثالثة: شارة ملك الحزمة الحمراء(21 يوم) + سيارة GTR ل(21 يوم)+موضوع في غرفة الغناء: الغابة السحرية(21 يوم) + 1000 عملة</p>
      <p>المرتبة 4 حتى 10: شارة ملك الحزمة الحمراء(15 يوم) + سيارة GTR ل(15 يوم)+موضوع في غرفة الغناء: الغابة السحرية(15 يوم) + 500 عملة</p>
      <p>المرتبة 11 حتى 20: سيارة GTR ل(7 أيام) + 200 عملة + 1000 فول</p>
      <h6>القائمة المحظوظة</h6>
      <p>المرتبة الأولى: شارة محظوظة للحزمة الحمراء(30 يوم) + سيارة الدخول المنطاد الرومانسي(30 يوم) + 3000 فول</p>
      <p>المرتبة الثانية: شارة محظوظة للحزمة الحمراء(21 يوم) + سيارة الدخول المنطاد الرومانسي(21 يوم) + 2000 فول</p>
      <p>المرتبة الثالثة: شارة محظوظة للحزمة الحمراء(15 يوم) + سيارة الدخول المنطاد الرومانسي(15 يوم) + 1000 فول</p>
      <p>المرتبة 4 حتى 10: شارة محظوظة للحزمة الحمراء(7 أيام) + 500 فول</p>
      <h5>ملاحظة:</h5>
      <p>1. سنصدر الجوائز خلال 7 أيام بعد إنتهاء النشاط</p>
      <p>2. صلاحية الهدايا في الجوائز هي 7 أيام، يرجي استخدام أثناء الصلاحية</p>
    </div>
    <p class="lastTips">التفسير النهائي لهذا النشاط ينتمي إلى المنظم</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 0
    }
  },
  methods: {
    tabClick(val) {
      this.tab = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #ae172e;
  direction: rtl;
}
.rule {
  padding: 0.51rem 0.25rem;
  .tabs {
    display: flex;
    width: 7rem;
    height: 0.85rem;
    background: url(../../assets/img/tab.png);
    background-size: 100% 100%;
    margin: 0 auto 0.26rem;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 3.5rem;
      height: 0.85rem;
      color: #ae4800;
      font-size: 0.3rem;
      font-weight: bold;
      &.current {
        background: url(../../assets/img/tab1.png);
        background-size: 100% 100%;
      }
    }
  }
  .actTime {
    text-align: center;
    margin: 0.49rem auto 0.45rem;
    color: #faeac5;
  }
  .ruleTips {
    h5 {
      color: #f4cf77;
      font-size: 0.36rem;
      margin-bottom: 0.37rem;
      font-weight: bold;
    }
    p {
      font-size: 0.24rem;
      color: #f3d4d8;
      padding-left: 0.25rem;
      margin-top: 0.2rem;
    }
    .rankTips {
      font-size: 0.22rem;
      color: #f3d4d8;
      padding-left: 0.4rem;
    }
    .other {
      margin-top: 0.97rem;
    }
  }
  .wardTips {
    h5 {
      color: #f4cf77;
      font-size: 0.36rem;
      margin-top: 0.5rem;
      font-weight: bold;
    }
    h6 {
      color: #faeac5;
      font-size: 0.24rem;
      margin-top: 0.45rem;
      padding-left: 0.35rem;
    }
    p {
      color: #f3d4d8;
      font-size: 0.22rem;
      padding-left: 0.5rem;
      margin-top: 0.15rem;
    }
  }
  .lastTips {
    text-align: center;
    color: #faeac5;
    font-size: 0.24rem;
    margin-top: 1.5rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
