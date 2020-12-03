<template>
  <div class="rule">
    <div class="header">
      <!-- <i class="black" @click="closeWeb()"></i>簽到規則說明 -->
    </div>
    <div class="tips">
      <h6>وصف القاعدة:</h6>
      <p>1、يمكن لجميع المستخدمين المشاركة في نشاط تسجيل الدخول</p>
      <p>2、يمكن للحساب تسجيل الدخول مرة واحدة يوميًا وتجميع عدد أيام تسجيل الدخول المتتالية.</p>
      <p>3、يستغرق تسجيل الوصول 7 أيام كدورة ، وبعد تسجيل الخروج أو تسجيل الوصول لمدة 7 أيام ، ستتم إعادة الدخول في دورة جديدة.</p>
      <p>4、في كل مرة تقوم فيها بتسجيل الدخول ، يمكنك الحصول على مكافآت ثابتة ومكافآت إضافية.المكافآت الثابتة هي مكافآت الفاصوليا الذهبية ، والمكافآت الإضافية هي مكافآت التقليب (اليوم 1 إلى 6) ومكافآت صندوق الكنز (اليوم 7). للميداليات الذهبية وصناديق الكنز فرصة للحصول عليها هدية مفاجئة.</p>
      <p>5、يمكنك التقليب مرة واحدة كل يوم عند تسجيل الدخول. إذا أكملت مهمة المشاركة ، يمكنك التقليب مرة أخرى ، باستثناء اليوم السابع من الدورة.</p>
      <p>6、يدعم تسجيل الدخول الإضافي العدد الإجمالي لأيام تسجيل الدخول ولا يؤثر على دورة تسجيل الدخول.</p>
      <p>7、أثناء حدث تسجيل الدخول ، إذا كان المستخدم ينتهك مبدأ حسن النية أو ينتهك القواعد (مثل الغش ، والمراجحة الخبيثة ، والضرب متعدد الحسابات ، وما إلى ذلك) ، فإن النظام الأساسي سينهي الحساب ويحق له سحب المكافأة بمجرد اكتشافها.</p>
      <p>8、يُعتبر أي شخص يشارك في حدث تسجيل الدخول على أنه يقبل جميع قواعد الحدث ويتبع البيانات واللوائح القانونية ذات الصلة للمنصة. يحق للمنصة إجراء التعديلات المناسبة على قواعد الحدث ضمن النطاق الذي يسمح به القانون.</p>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    document.title = `وصف قواعد تسجيل الدخول`
  },
  methods: {
    closeWeb() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      try {
        if (isAndroid) {
          window.JSInterface.closeWeb();
        } else {
          closeWeb();
        }
      } catch (e) {

      }
    }
  }
}
</script>

<style lang="scss">
body {
  background: #f2f2f2;
}
.rule {
  direction: rtl;
  .header {
    height: 0.88rem;
    line-height: 0.88rem;
    // background: #fff;
    font-size: 0.36rem;
    text-align: center;
    position: relative;
    color: #111111;
    .black {
      display: block;
      width: 0.18rem;
      height: 0.32rem;
      background: url(../../assets/img/arr.png);
      background-size: 100% 100%;
      position: absolute;
      left: 0.28rem;
      top: 0.28rem;
    }
  }
  .tips {
    padding: 0.3rem;
    h6 {
      color: #111;
      font-size: 0.32rem;
    }
    p {
      font-size: 0.26rem;
      color: #666666;
      margin-top: 0.14rem;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
