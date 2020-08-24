<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="tabClick(0)" :class="{current:tab==0}" href="">القواعد</a>
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">الجوائز</a>
    </div>
    <h6 class="time">الوقت: 8/25 12:00-9/4 23:00(تتوقيت دبي) </h6>
    <div class="ruleTips" v-show="tab == 0">
      <h6>القواعد</h6>
      <p>1.يمكن لجميع المستخدمين الاشتراك في هذا النشاط</p>
      <p>2.بعد تسجيلك، يمكن أن تحصل على نقاط الدهشة عن طريق إهداء الهدايا في الأعمال وغرفة الغناء والدردشة. عندما تصل نقاط دهشة إلى النقاط المطلوبة، فيمكن أن تفتح المربع الأعمى المدهش. لكن لا يمكن أن تفتح المربع الأعمى إلا لمرة واحدة كل يوم. فمن الأحسن أن تهتم بدرجة المربع لأن أعلى الدرجة يعني أكبر الجوائز. ستصل الجوائز في المربع الأعمى إلى حسابك تلقائيا</p>
      <p>
        3.الترتيب:
        <strong>القائمة اليومية:نقاط الدهشة= إجمالي قيم سحر الهدايا التي تهديها من الأعمال وغرفة الغناء وغرفة الدردشة، الترتيب حسب نقاط الدهشة اليومية. ستحذف البيانات في القائمة اليومية في 00:00 كل اليوم وثم يتم إعادة الترتيب. تظهر المراكز 100-1 فقط</strong>
        <strong>القائمة العامة:الترتيب حسب إجمالي نقاط الدهشة اليومية. تظهر المراكز 100-1 فقط</strong>
      </p>
      <h6>وقت القائمة اليومية:</h6>
      <p class="dayTime">
        اليوم الأول: 12:00 25\8 -00:00 26\8 </br>
        اليوم الثاني: 00:00 26\8 -00:00 27\8 </br>
        اليوم الثالث: 00:00 27\8 -00:00 28\8 </br>
        اليوم الرابع: 00:00 28\8 -00:00 29\8</br>
        اليوم الخامس: 00:00 29\8 -00:00 30\8</br>
        اليوم السادس: 00:00 30\8 -00:00 31\8</br>
        اليوم السابع: 00:00 31\8 -00:00 1\9</br>
        اليوم الثامن: 00:00 1\9 -00:00 2\9</br>
        اليوم التاسع: 00:00 2\9 -00:00 3\9</br>
        اليوم العاشر: 00:00 3\9 -00:00 4\9</br>
        اليوم الأحد عشر: 00:00 4\9 -23:00 4\9</br>
      </p>
      <h6>4.درجات الهدشة:</h6>
      <p class="dayTime">
        الدرجة الأولى: 100 نقاط الدهشة</br>
        الدرجة الثانية: 500 نقاط الدهشة</br>
        الدرجة الثالثة: 2000 نقاط الدهشة</br>
        الدرجة الرابعة: 5000 نقاط الدهشة</br>
        الدرجة الخامسة: 10000 نقاط الدهشة</br>
        الدرجة السادسة: 30000 نقاط الدهشة</br>
        المربع الأعلى الدهشة: إجمالي نقاط الدهشة اليومية تصل إلى 300000</br>
        الملاحظ:نقاط الدهشة اليومية ستحف في 00:00 في اليوم القادم، تفضل بفتح المربع الأعمى بالموعد
      </p>
      <h6>الملاحظات:</h6>
      <p>1.وقت النشاط هو يقوم على توقيت دبي، فتفضل بانتباه الوقت، لا يفوتك الوقت لفتح المربع الأعمى</p>
      <p>2.إذا يجد المنظم أنك تجري إجراءات غير لائقة لكسب أكثر النقاط، فللمنظم حق أن يحذف نقاطك ويستعيد جوائزك ويلغي موهلك لاشتراك في النشاط</p>
    </div>
    <div class="giftTips" v-show="tab ==1">
      <div class="giftBox">
        <span>
          <img src="../../assets/img/ruleGift/1.png" alt="">
          <strong>شارة الحظ</strong>
        </span>
        <span>
          <img src="../../assets/img/ruleGift/4.png" alt="">
          <strong>سيارة تين طائر</strong>
        </span>
        <span>
          <img src="../../assets/img/ruleGift/2.png" alt="">
          <strong>هدية المطرقة</strong>
        </span>
        <span>
          <img src="../../assets/img/ruleGift/5.png" alt="">
          <strong>عملات</strong>
        </span>
        <span>
          <img src="../../assets/img/ruleGift/6.png" alt="">
          <strong>فول</strong>
        </span>

      </div>
      <h6>الجوائز للدرجات </h6>
      <p>يمكن أن تفتح المربع الأعمى المدهش بعد وصول درجتك إلى المطلوب، لكن لا يمكن أن تفتح المربع إلا لمرة واحدة، عندما يمكن أن تفتح أكثر من مربع واحد، فستفتح المربع بأعلى الدرجة تلقائيا. الجوائز في المربع ستصل إلى الحساب تلقائيا، يمكن أن تنظر تفاصيل المربع في أوقات الدهشة</p>
      <h6>الجوائز للقائمة اليومية</h6>
      <p>للمراكز 3-1 فقط، تذكرة إعادة %15 عملات للشحن للمركز الأول وتذكرة إعادة %12 عملات للشحن للمركز الثاني وتذكرة إعادة %10 عملات للشحن للمركز الثالث. ستعطى هذه التذاكر إلى حسابات الفائزين في 00:00 في اليوم القادم. وستعطى بعد انتهاء النشاط فورا في آخر يوم المسابقة</p>
      <h6>3.الجوائز للقائمة العامة:</h6>
      <p>المركز الأول:شارة الحظ(30 يوما)+سيارة تين طائر(30 يوما)+هدية المطرقة*30+10000 عملة+3000 فول</p>
      <p>المركز الثاني:شارة الحظ(30 يوما)+سيارة تين طائر(30 يوما)+هدية المطرقة*20+8000 عملة+2000 فول</p>
      <p>المركز الثالث:شارة الحظ(30 يوما)+سيارة تين طائر(30 يوما)+هدية المطرقة*10+5000 عملة+1000 فول</p>
      <p>المراكز 10-4:شارة الحظ(30 يوما)+3000 عملة+500 فول</p>
      <h6>الملاحظات:</h6>
      <p>1.تذكرة إعادة العملات للشحن هي فعالة ليوم واحد، تفضل باستخدامها أثناء صلاحيتها</p>
      <p>2.صلاحية الهدايا هي 14 يوما</p>
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
  background-color: #290d70;
  direction: rtl;
  .rule {
    padding: 0.36rem 0.27rem 0;
    .tabs {
      width: 6.98rem;
      height: 0.98rem;
      background: url(../../assets/img/tabs.png);
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        display: block;
        width: 3.66rem;
        height: 0.9rem;
        text-align: center;
        line-height: 0.9rem;
        color: #fddc55;
        font-weight: 700;
        font-size: 0.32rem;
        &.current {
          color: #a24e04;
          background: url(../../assets/img/actTabs.png);
          background-size: 100% 100%;
        }
      }
    }
    .time {
      text-align: center;
      font-weight: 600;
      color: #81f8fe;
      margin-top: 0.5rem;
    }
    h6 {
      font-weight: 600;
      color: #81f8fe;
      margin: 0.5rem 0 0.2rem;
    }
    p {
      font-size: 0.24rem;
      font-weight: 500;
      margin-top: 0.15rem;
      padding-left: 0.2rem;
      line-height: 0.4rem;
      strong {
        font-size: 0.24rem;
        display: block;
        padding-left: 0.15rem;
      }
    }
    .ruleTips {
      margin-top: 0.61rem;
      .dayTime {
        line-height: 0.5rem;
      }
    }
    .giftTips {
      .giftBox {
        padding: 0 0.37rem;
        margin-top: 0.15rem;
        text-align: center;
        span {
          display: inline-block;
          vertical-align: top;
          width: 1.6rem;
          margin: 0.29rem 0 0 0.6rem;
          img {
            display: block;
            width: 1.6rem;
            height: 1.6rem;
          }
          strong {
            display: block;
            text-align: center;
            color: #fff3d2;
            font-size: 0.24rem;
            font-weight: 600;
            margin-top: 0.15rem;
          }
        }
        span:nth-child(3),
        span:nth-child(6) {
          margin-left: 0;
        }
      }
    }
    .lastTips {
      text-align: center;
      margin: 0.94rem 0 0.15rem;
      color: #4f43cd;
      font-size: 0.24rem;
      font-weight: 500;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
