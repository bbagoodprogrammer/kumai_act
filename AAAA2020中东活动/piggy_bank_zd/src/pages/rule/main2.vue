<template>
  <div class="rule">
    <div class="mainTabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">قواعد</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">جوائز </a>
    </div>
    <div class="rule" v-show="mainTab == 0">
      <h3 class="noTop">وقت المسابقة:</h3>
      <p class="time">2020/10/21 12:00--2020/10/30 23:00(بتوقيت دبي)</p>
      <h3>التسجيل النشاط</h3>
      <p>سيتم تسجيل جميع المشرفين الرسميين تلقائيًا قبل بداية النشاط، لن يتوجب عليهم الدخول إلى صفحة النشاط للتسجيل .</p>
      <p>بعد بداية النشاط،سيعتبر المستخدم الذي يهدي الهدية للمشرفين من في البث المباشر بمثابة تسجيل ناجح،لن يتوجب عليهم الدخول إلى صفحة النشاط للتسجيل.</p>
      <h3>مهام المشرفين وقواعد الترتيب</h3>
      <p>يحصل المشرف على النقاط المقابلة من خلال إكمال المهام اليومية. يعتمد ترتيب المشرف على النقاط الإجمالية التي حصل عليها المشرف خلال النشاط. المهام اليومية كما يلي ، وسيتم إعادة تعيين تقدم المهمة الساعة 00:00 في اليوم التالي:</p>
      <img src="../../assets/img/taskImg.png" alt="" class="taskImg">
      <p>إذا وصلت نقاط المهمة إلى الحد الأعلى لنقاط في اليوم فلا يمكن تكتسب نقاط المهمة أكثر </br>
        إذا كانت النقاط هي نفسها ، فسيتم ترتيب المشرف التي وصلت أولاً أعلى</br>
        مهمة المدة: سيحصل المشرف على النقاط المقابلة إذا كان وقت البث المباشر يفي بالشروط خلال النشاط</br>
        معجبون جديدون: سيحصل المشرف على النقاط المقابلة إذا كان عدد المعجبين الجدد يفي بالشروط خلال النشاط(محدود عنوان الهاتف وعنوان IP) </br>
        عدد الأشخاص الذين يقدمون الهدايا: سيحصل المشرف على النقاط المقابلة (محدود عنوان الهاتف وعنوان IP) إذا تم استيفاء عدد الأشخاص الذين يقدمون الهدايا يفي بالشروط خلال النشاط</br>
        عدد العملات الذهبية المستلمة: سيحصل المشرف على النقاط المقابلة إذا كان عدد العملات الذهبية التي يتم استلامها أثناء البث المباشر كل يوم يفي بالشروط</br>
        يتم احتساب أعلى النقاط أكملها المشرف فقط لكل مهمة </br>
        وسيتم إعادة تعيين تقدم المهمة الساعة 00:00 في اليوم التالي: ، ولن يتم إعادة تعيين إجمالي نقاط الأنشطة خلال فترة النشاط.
      </p>
      <h3>قواعد القائمة الميليونير:</h3>
      <p>سيدخل القائمة الميليونيراذا تهدي الهدايا بالعملات الذهبية للمشرفين الرسميين في البث المباشرخلال النشاط.</br>
        يعتمد ترتيب القائمة الميليونير بالعملات الذهبية التي ترسل للمشرفين الرسميين في البث المباشرخلال النشاط.</br>
        إذا كانت العملات التي تهدي هي نفسها ، فسيتم ترتيب القائمة الميليونير التي وصلت أولاً أعلى
      </p>
      <h6>جوائز </h6>
      <p>إذا المستخدم يستخدم الوسائل غير المناسبة للمشاركة أثناء النشاط، يحق للمسؤول إلغاء المؤهل دون إشعار مسبق ، سيتم حظر رقم حساب المشارك في الحالات الشديدة </p>
    </div>
    <div class="gift" v-show="mainTab == 1">
      <h3>جوائز المشرف</h3>
      <p>عندما يقدم المستخدم هدية بالعملات الذهبية إلى المشرف الرسمي في البث المباشرخلال النشاط، ستضيف عملة ذهبية واحدة إلى علبة العملات للمشرفين كل 10 عملات ذهبية .</br>
        عدد العملات في علبة العملات للمشرفين في نهاية النشاط هو العدد النهائي ولا يمكن زيادته</br>
        مراكز 1-10 من القائمة المشرفين يقسمون عدد العملات النهائي من علبة العملات
      </p>
      <div class="score">
        <p> مركز أول:25٪؜</p>
        <p> مركز ثاني:20٪؜</p>
        <p> مركز ثالث:15٪؜</p>
        <p> مركز رابع و خامس:10٪؜</p>
        <p> مركز سادس الي مركز عاشر:4٪؜</p>
      </div>
      <p>سيحصل المشرفين الحادي عشر إلى العشرين على زيادة النقاط إضافية في النشاط مرة تالية</p>
      <div class="score">
        <p> مركز الحادي عشر:20٪؜</p>
        <p>مركز الثاني عشر:18٪؜</p>
        <p>مركز الثالث عشر:15٪؜</p>
        <p>مركز الرابع عشر الي مركز السادس عشر:12٪؜</p>
        <p>مركز السابع عشر الي مركز العشرين :10٪؜</p>
      </div>
      <h3>جوائز القائمة الميليونير</h3>
      <div class="anthorWards">
        <p>المركز الأول: 8٪ من العملات الذهبية الإجمالية التي تهدي الهدايا للمشرفين في البث المباشر+ الطائرة (30 يومًا)</p>
        <p>المركز الثاني: 7٪ من العملات الذهبية الإجمالية التي تهدي الهدايا للمشرفين في البث المباشر+ الطائرة (21 أيام)</p>
        <p>المركز الثالث: 6٪ من العملات الذهبية الإجمالية التي تهدي الهدايا للمشرفين في البث المباشر+ الطائرة (21 أيام)</p>
        <p>المركز الرابع الي المركز الخامس: 5٪ من العملات الذهبية الإجمالية التي تهدي الهدايا للمشرفين في البث المباشر+ الطائرة (14 أيام)</p>
        <p>المركز السادس الي المركز العاشر: 4٪ من العملات الذهبية الإجمالية التي تهدي الهدايا للمشرفين في البث المباشر+ الطائرة (14 أيام)</p>
      </div>
      <h3>المهم</h3>
      <p>سنحسب جوائز المشرف لعملكم</p>
      <p>سيتم ارسل المكافآت الأخرى في سبعة أيام بعد انتهاء النشاط</p>
    </div>
    <p class="lastTips">التفسير النهائي لهذا النشاط ينتمي إلى المنظم</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainTab: 0
    }
  },
  methods: {
    mainTabClick(tab) {
      this.mainTab = tab;
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #0e7571;
  direction: rtl;
  .rule {
    padding: 0.25rem 0.3rem;
    .noTop {
      margin-top: -0.2rem;
    }
    h3 {
      text-align: center;
      color: #64ffe0;
      font-size: 0.36rem;
      font-weight: bold;
      margin: 0.33rem 0 0.2rem 0;
    }
    p {
      font-size: 0.24rem;
      color: #b7fff1;
      font-weight: 500;
      margin-top: 0.09rem;
    }
    .time {
      text-align: center;
    }
    .taskImg {
      width: 6.73rem;
      height: 2.37rem;
      margin: 0.18rem auto;
    }
    h6 {
      color: #b7fff1;
      margin-top: 0.3rem;
    }
    .lastTips {
      text-align: center;
      color: #003230;
      font-size: 0.24rem;
      margin: 0.32rem 0 0.15rem 0;
      font-weight: 500;
    }
    .score {
      margin-left: 0.4rem;
    }
    .anthorWards {
      p {
        margin-bottom: 0.35rem;
      }
    }
  }
  .mainTabs {
    width: 6.91rem;
    height: 0.89rem;
    background: url(../../assets/img/tabsBg.png);
    background-size: 100% 100%;
    margin: 0.22rem auto;
    display: flex;
    a {
      display: block;
      width: 3.66rem;
      height: 0.89rem;
      text-align: center;
      white-space: nowrap;
      font-size: 0.36rem;
      color: #1cdde3;
      font-weight: bold;
      line-height: 0.89rem;
      &.current {
        color: #fff;
        background: url(../../assets/img/actTab.png);
        background-size: 100% 100%;
      }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
