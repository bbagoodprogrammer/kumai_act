<template>
  <div class="rule">
    <h1>القواعد</h1>
    <h6>الوقت:{{timeStr}}</h6>
    <h6>قواعد التسجيل</h6>
    <p>1.يمكن لكل المستخدمين التسجيل، لا يمكن التسجيل المكررة و التسجيل الثاني لنفس الجهاز أو الحساب من IP واحد. يمكن للمستخدمين الذين يفتحون VIP قبل التسجيل أن يشوفوا المرة الحالية ليكشط صورة بعد التسجيل؛يمكن للمستخدمين الذين لم يفتح VIP قبل التسجيل أن يشوفوا المرة الحالية ليكشط صورة بعد شراء VIP و فتح صفحة النشاط.</p>
    <p>2.يمكن التسجيل للمستخدمين الذين يساعدون أصدقائهم و هم ساعدوا بنجاح و يمكن لهم أن يكشط صورة باستخدام المرة مجانا في اليوم الثاني بعد التسجيل وفقا لمستوى VIP ، أو يشتري VIP الآن لحصول على مرة.</p>
    <h6>قواعد النشاط</h6>
    <p>1.أثناء النشاط سيتم تحديث مستوى VIP بعد التسجيل، يمكن فتح الصورة بعد استلام مرة.اذا كشطت مهمة المفاجأة فمن اللازم أن تكمل المهمة قبل حصول على المكافأة, أما المكافآت الأخرى فهي ستصل إليك تلقائيا، الهدية الخاصة ستصل إلى الحقيبة، قيمة تجربة VIP ستضاف إلى مستوى VIP، الفول و العملات ستضاف إلى المحفظة.</p>
    <p>2.أثناء النشاط يمكن كشط الصورة بنقرها عندما كان هناك يوجد المرة الباقية؛عندما نفدت كل المرات يمكن شراء VIP لحصول على مرة، تختلف المرة المحصولة باختلاف مدة VIP التي اشتريتها.</p>
    <p>3.صلاحية كلمة الدعوة ثلاثة أيام.</p>
    <p>4.صلاحية تذكرة الشحن و تذكرة الإهداء التي حصلت في النشاط هي 24 ساعة، تفضل استخدام أثناء صلاحيتها!</p>
    <h6>قواعد المرة:</h6>
    <p>1.أثناء النشاط سيحصل كل المستخدمين الذين تمّوا التسجيل بنجاح على مرة مجانا وفقا للاستمارة التالية.</p>
    <p>2.لا يمكن أن يرتقي مستوى VIP أثناء النشاط عن طريق شراءVIP (اي مدة لشراء)، فلا يمكن زيادة المرة مجانا. لكن اذا كان الحساب الخاص بك ارتقى بسبب قيمة النمو التراكمية أثناء النشاط ستضاف المرة مجانا.</p>
    <img src="../../assets/img/taskImg.png" alt="">
    <p class="last2Tips">أثناء النشاط، ستحذف المرة المجانا التلقائية في ساعة 00:00 اليوم القادم</p>
    <p class="lastTips">التفسير النهائي لهذا النشاط ينتمي إلى المنظم</p>
  </div>
</template>

<script>
import getDate from "../../utils/getDate"
export default {
  data() {
    return {
      time: {}
    }
  },
  created() {
    this.time = JSON.parse(sessionStorage.getItem('time'))
  },
  computed: {
    timeStr() {
      return getDate(new Date(this.time.stime * 1000), '~') + '~' + getDate(new Date(this.time.etime * 1000), '~')
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #2b2621;
  direction: rtl;
}
.rule {
  padding: 0.53rem 0.39rem 0.25rem;
  h1 {
    color: #fff79b;
    font-weight: bold;
    font-size: 0.36rem;
    text-align: center;
  }
  h6 {
    color: #fecb6a;
    font-size: 0.28rem;
    margin-top: 0.39rem;
    font-weight: bold;
  }
  p {
    color: #f7ead7;
    font-size: 0.26rem;
    margin-top: 0.22rem;
    padding-left: 0.25rem;
  }
  img {
    width: 5.99rem;
    height: 7.98rem;
    margin: 0.31rem 0 0 0.25rem;
  }
  .last2Tips {
    text-align: center;
    line-height: 0.5rem;
  }
  .lastTips {
    color: #c5b7a4;
    text-align: center;
    margin-top: 0.7rem;
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
