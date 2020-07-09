<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:showType == 'rules'}" @click="clickTab('rules')">قواعد النشاط</span>
      <span :class="{act:showType == 'wards'}" @click="clickTab('wards')">مكافآت النشاط</span>
    </div>
    <p class="actTime">وقت النشاط: الوقت:12:00 12\7 -23:00 27\7 (بتوقيت دبي)</p>
    <div class="ward" v-show="showType == 'wards'">
      <div class="wardImg"></div>
      <h3>مكافأة الاستدعاء</h3>
      <div class="giftBox">
        <div v-for="(item,index) in giftArr" :key="index">
          <div class="giftImg">
            <span class="giftBg"></span>
            <img :src="require(`../../assets/img/luckGift/${index+1}.png`)" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div>
      </div>
      <h3>المكافأة لقائمة اليومية</h3>
      <p>مستخدمون في مرتبة 100 الأوائل لهم فرصة لتقسيم العملات</p>
      <p>عدد عملات التقسيم يوميا وفقا لقيمة الاستدعاء التراكمية من كل المستخدمين الذين تموا التسجيل في النشاط و يختلف عدد العملة المحصولة وفقا لمرتبة المستخدم</p>
      <p>مرتبة 10 الأوائل: تقسيم %30 عملة بالتساوي من عدد إجمالي يوميا</p>
      <p>مرتبة 11-30: تقسيم %40 عملة بالتساوي من عدد إجمالي يوميا</p>
      <p>مرتبة 31-100: يختار 20 شخص عشوانيا لتقسيم %30 عملة بالتساوي من عدد إجمالي يوميا</p>
      <h3>المكافأة لقائمة الإجمالية</h3>
      <h6>المرتبة الأولى:</h6>
      <p>شارة مستدعي المصباح السحري(30 يوم)+مركبة دخول التنين الطائرة(30 يوم)+ 5 هدايا من المصباح السحري(واحد=99 عملة)+20000 عملة+5000 فول</p>
      <h6>المرتبة الثانية:</h6>
      <p>شارة مستدعي المصباح السحري(15 يوم)+مركبة دخول التنين الطائرة(30 يوم)+ 3 هدايا من المصباح السحري(واحد=99 عملة)+15000 عملة+3000 فول</p>
      <h6>المرتبة الثالثة:</h6>
      <p>شارة مستدعي المصباح السحري(7 يوم)+مركبة دخول التنين الطائرة(30 يوم)+ 3 هدايا من المصباح السحري(واحد=99 عملة)+10000 عملة+2500 فول</p>
      <h6>المرتبة الرابعة حتى الخامسة:</h6>
      <p>شارة مستدعي المصباح السحري(7 يوم)+مركبة دخول التنين الطائرة(15 يوم)+ 2 هدايا من المصباح السحري(واحد=99 عملة)+7000 عملة+2000 فول</p>
      <h6>المرتبة السادسة حتى العاشرة:</h6>
      <p>مركبة دخول التنين الطائرة(9 يوم)+1 هدية من المصباح السحري(واحد=99 عملة)+3000 عملة+1000 فول</p>
      <h3>قواعد استخدام المكافآت</h3>
      <div class="lastRule">
        <p>1. تذكرة إعادة العملات للشحن في هدايا الاستدعاء صلاحيتها حتى 23:59:59 يوميا، إعادة العملات ستصل إلى الحساب فورا بعد الشحن.</p>
        <p>2. هدايا الحقيبة في المكافأت صلاحيتها 7 أيام، يرجي استخدام قبل إنتهاء صلاحيتها.</p>
        <p>3. يمكن شوف هدايا الحقيبة في أنا-الحقيبة و إختيار هدايا الحقيبة مباشرا لإهداء لما تريد الإهداء في غرفة.</p>
        <p>4. لو لا يمكن استخدام مركبة دخول، يرجي تحديث التطبيق حتى الأحدث.</p>
      </div>
    </div>
    <div class="rules" v-show="showType == 'rules'">
      <h3>تسجيل النشاط</h3>
      <p class="singUpTips">انقر "تسجيل الآن" لمشاركة في النشاط، معطيات المهمات غير فعالية إلا بعد التسجيل</p>
      <h3>وصف المهمات</h3>
      <p>1. المهمة اليومية: العمل الذي نشرته أمس غير محذوف، سوف يتم الكشف تلقائيا عنه في ساعة 12 كل يوم، اذا لم حذفته سوف تحصل على 10 قيمة الاستدعاء</p>
      <p>2. مهمة الشحن: شحن كل 200 عملة=10 قيمة الاستدعاء</p>
      <h3>الوصف لاستدعاء المصباح السحري</h3>
      <p>1. يمكن استدعاء المصباح السحري باستخدام قيمة الاستدعاء اليومية، قيمة الاستدعاء التراكمية فقط للترتيب</p>
      <p>2. تختلف المكافآت باختلاف عدد قيمة الاستدعاء التي استخدمتها</p>
      <h3>قواعد تقسيم العملات</h3>
      <p>1. عدد عملات التقسيم يوميا وفقا لقيمة الاستدعاء التراكمية من كل المستخدمين الذين تموا التسجيل في النشاط، كلما كانت قيمة الاستدعاء التراكمية أكثر كلما تكون عملة التقسيم أكثر</p>
      <span class="img1"></span>
      <p>2. مستخدمون في مرتبة 100 الأوائل لهم فرصة لتقسيم العملات، يختلف عدد العملة المحصولة وفقا لمرتبة المستخدم.</p>
      <span class="img2"></span>
      <p>3.سوف نختار المستخدمين لحصول على العملات من مستخدمين في مرتبة 100 الأوائل ساعة 00:00 يوم قادم و تصل المكافآت إلى الحساب تلقائيا، يرجي التحقق~</p>
      <h3>قواعد الترتيب عن قيمة الاستدعاء</h3>
      <p>1.الترتيب لقيمة الاستدعاء عن طريق إمكال المهمات بعد تسجيل:
        <span>الترتيب لقائمة اليومية: ترتيب القيمة يوميا</span>
        <span>الترتيب لقائمة الإجمالية: ترتيب القيمة إجماليا</span>
      </p>
      <p>2.اذا كانت عدد قيمة الاستدعاء هو نفس بين مستخدمين، مستخدم وصل إلى هذا عدد أولا المرتبة له أمام الآخر</p>
      <p>3.القائمة تعرض نتيجة المسابقة لمستخدمين في مرتبة 100 الأوائل</p>
      <p>4.لا يتأثر الترتيب بعد استخدام قيمة الاستدعاء لاستدعاء المصباح السحري</p>
      <h3>الوصف الآخر</h3>
      <p>أثناء المسابقة ، إذا تبين أن المستخدم يستخدم وسائل غير مناسبة للمشاركة في النشاط ، فإن Super Voice لنا الحق في إلغاء حقوق المتسابقين أو عدم الأهلية للمتسابقين أو حظر الحساب على المخالفين دون إشعار مسبق. هنا التصرفات الممنوعة لكن لا تقتصر عليها:</p>
      <p>1) اختلاس أو اقتراض حسابات أشخاص آخرين للمشاركة في النشاط.</p>
      <p>2) يسجل نفس المستخدم حسابات متعددة للمشاركة في النشاط.</p>
      <p>3) المشاركة في النشاط من خلال الانتهاكات الأخرى.</p>
      <p class="other">إذا كان الإجراء الرئيسي هو الاحتيال ، سوف يتم حظر كل حساب لهذا المستخدم إلى الأبد ، فإن Super Voice لنا الحق في سحب جميع مكافآت المستخدم بعد النشاط</p>
    </div>
    <div class="tips">التفسير النهائي لهذا النشاط ينتمي إلى المنظم</div>
  </div>
</template>

<script>
import giftArr from "../../config/gift"
export default {
  data() {
    return {
      showType: 'rules',
      giftArr: giftArr
    }
  },
  created() {
    document.title = 'القواعد و المكافآت'
  },
  methods: {
    clickTab(val) {
      this.showType = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #48008c;
  direction: rtl;
}
.actTime {
  font-size: 0.24rem;
  color: #dac4ff;
  margin: 0.29rem 0 0.28rem;
  text-align: center;
}
.rule {
  padding: 0.28rem 0;
  .tabs {
    width: 6.71rem;
    height: 0.74rem;
    background: url(../../assets/img/tabsBg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    span {
      display: block;
      width: 3.75rem;
      height: 0.85rem;
      text-align: center;
      line-height: 0.85rem;
      &.act {
        background: url(../../assets/img/tuleTabaAct.png);
        background-size: 100% 100%;
      }
    }
  }
  .singUpTips {
    text-align: center;
  }
  h3 {
    width: 2.98rem;
    height: 0.39rem;
    line-height: 0.39rem;
    background: url(../../assets/img/ruleTitleBg.png);
    background-size: 100% 100%;
    text-align: center;
    color: #ffda8d;
    font-size: 0.26rem;
    font-weight: 700;
    margin: 0.32rem auto 0.27rem;
  }
  p {
    color: #dac4ff;
    font-size: 0.24rem;
    span {
      display: block;
      text-indent: 0.5rem;
    }
    strong {
      font-size: 0.24rem;
      color: #ffda8d;
    }
    em {
      color: #ffe191;
      font-size: 0.36rem;
    }
  }
  h6 {
    color: #dac4ff;
    padding: 0 0.27rem;
    margin-top: 0.3rem;
    font-size: 0.24rem;
  }
  .ward {
    p {
      padding: 0 0.27rem;
    }
  }
  .rules {
    padding: 0 0.22rem 0.7rem;
  }
  .tips {
    margin-top: 0.25rem;
    color: #bdbbff;
    font-size: 0.22rem;
    margin-top: 1.3rem;
    text-align: center;
  }
  .img1 {
    display: block;
    width: 3.14rem;
    height: 1.78rem;
    background: url(../../assets/img/ruleImg1.png);
    background-size: 100% 100%;
    margin: 0.14rem 0 0.28rem;
    margin: 0 auto;
  }
  .img2 {
    display: block;
    width: 3.87rem;
    height: 2.09rem;
    background: url(../../assets/img/ruleImg2.png);
    background-size: 100% 100%;
    margin: 0.14rem 0 0.28rem;
    margin: 0 auto;
  }
  .other {
    margin-top: 0.5rem;
  }
  .giftBox {
    width: 5.87rem;
    height: 7.05rem;
    background: url(../../assets/img/giftBox.png);
    background-size: 100% 100%;
    margin: 0 auto;
    padding: 0.47rem 0.69rem;
  }
  .lastRule {
    p {
      margin-bottom: 0.3rem;
    }
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
.giftBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 0.05rem;
  padding: 0 1rem;
  .giftImg {
    width: 1.4rem;
    height: 1.4rem;
    position: relative;
    .giftBg {
      display: block;
      width: 100%;
      height: 100%;
      background: url(../../assets/img/gitBg.png);
      background-size: 100% 100%;
      position: absolute;
    }
    img {
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
  strong {
    display: block;
    width: 1.4rem;
    height: 0.3rem;
    text-align: center;
    font-size: 0.22rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0.28rem;
    margin-top: 0.05rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
