<template>
  <div class="page pageRule" :style="{height:viewHeight+'px'}">
    <div class="title"><i class="back" @click="$router.go(-1)"></i> وصف اللعب</div>
    <div class="tipsItem">
      <p><i>1</i>
        يدفع منشئ السحب المحظوظ مبلغًا معينًا من الذهب لشراء الجوائز المقابلة ويحدد هدايا تأهيل السحب. عندما يقدم المستخدمون في الغرفة الهدايا المقابلة ، يمكنهم المشاركة في اليانصيب. يمكن أن تحصل كل هدية على فرصة في السحب. وكلما زادت فرص السحب ، زادت فرصة الفوز. سيبدأ السحب فورًا بعد العد التنازلي للسحب ، وسيتم اختيار أحد المشاركين كفائز ، وسيحصل على الجائزة المقابلة في السحب.
      </p>
      <p><i>2</i>
        يمكن تعيين الجوائز على أنها VIP ، هدية ، سيارة ، هيكل مقعد ، ويمكن تعيين نوع واحد فقط لكل سحب.
      </p>
      <p><i>3</i> الهدايا المؤهلة لليانصيب هي هدايا مخصصة ، وتسود الهدايا المحددة الواردة في قائمة الاختيار.</p>
      <p><i>4</i> يجب ضبط مؤقت العد التنازلي لكل سحب. يمكن تحديد مؤقت العد التنازلي من دقيقتين و 5 دقائق و 10 دقائق و 30 دقيقة و 60 دقيقة. سيبدأ العد التنازلي عند إصدار السحب. يجب على مستخدمي الغرفة إرسال هدايا تأهيل السحب خلال وقت العد التنازلي للمشاركة في السحب.
      </p>
      <p><i>5</i> يمكنك تعيين من يمكنه المشاركة في اليانصيب. حدد جميع الأشخاص الموجودين في الغرفة أو المستخدمين الموجودين على الميكروفون. وعندما يتم تعيين المالك ، يمكن لجميع المستخدمين في الغرفة المشاركة في اليانصيب. وعندما يتم تحديد المستخدم ، يمكن للمستخدمين على الميكروفون المشاركة في اليانصيب ، يتم استخدامه في الغالب في وضع اللعب المتعدد في غرفة الترفيه.
      </p>
      <p><i>6</i>
        يمكن لكل غرفة أن تبدأ يانصيبًا على الأكثر في نفس الوقت. إذا كان هناك يانصيب قيد التقدم ، فلا يمكن بدء اليانصيب التالي إلا بعد انتهاء السحب.
      </p>
      <p><i>7</i>
        اليانصيب الذي تم البدء فيه غير قابل للإلغاء ، والعملات الذهبية المدفوعة غير قابلة للاسترداد.إذا لم يشارك أحد في اليانصيب في نهاية العد التنازلي لليانصيب ، فإن الجائزة تعود إلى الراعي.
      </p>
    </div>
  </div>
</template>

<script>
import { lang } from './config';

export default {
  computed: {
    lang: () => lang,
    viewHeight: () => window.innerHeight,
  },
};
</script>

<style lang="scss">
.pageRule {
  width: 7.5rem;
  height: 9.88rem;
  background: linear-gradient(
    0deg,
    rgba(84, 173, 255, 1) 0%,
    rgba(122, 75, 255, 1) 100%
  );
  border-radius: 0.32rem 0.32rem 0 0;
  display: flex;
  flex-direction: column;
  .title {
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    font-size: 0.42rem;
    font-weight: 600;
    position: relative;
    .back {
      display: block;
      width: 0.17rem;
      height: 0.29rem;
      background: url(./img/back2.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.36rem;
      left: 0.3rem;
    }
  }
  .tipsItem {
    margin-top: 0.08rem;
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    padding: 0 0.73rem 0.3rem 0.28rem;
    p {
      position: relative;
      i {
        display: block;
        width: 0.34rem;
        height: 0.34rem;
        background: url(./img/pNum.png);
        background-size: 100% 100%;
        font-size: 0.24rem;
        text-align: center;
        line-height: 0.34rem;
        position: absolute;
        right: -0.43rem;
        top: 0;
      }
      font-size: 0.26rem;
      margin-top: 0.3rem;
    }
  }
}
</style>