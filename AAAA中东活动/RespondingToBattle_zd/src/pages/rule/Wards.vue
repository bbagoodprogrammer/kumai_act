<template>
  <div class="wards">
    <p class="activeTime"><strong>وقت بدء النشاط:</strong>12:00 في يوم 12 من أكتوبر-16:00 في يوم 19 من أكتوبر بتوقيت دبي</p>
    <h4>الجوائز</h4>
    <div class="wardTop">
      <div class="topTitle">قائمة الملوك الشعبية:</div>
      <h5>المركز الأول:</h5>
      <p>شارة الملك الشعبية(30 يومًا) + هدية التركيز الكامل للحقيبة * 1 (1255عملة ذهبية ) + 1500 عملة ذهبية + 2000 فول ذهبي</p>
      <h5>المركز الثاني:</h5>
      <p>شارة الملك الشعبية (30 يومًا) + هدية التركيز الكامل للحقيبة * 1 (1255 عملة ذهبية ) + 1000 عملة ذهبية + 1500 فول ذهبي</p>
      <h5>المركز الثالث:</h5>
      <p>شارة الملك الشعبية (30 يومًا) + هدية التركيز الكامل للحقيبة * 1 (1255 عملة ذهبية) + 500 عملة ذهبية + 1000 فول ذهبي</p>
      <h5>المركز 4-10:</h5>
      <p>شارة الملك الشعبية (30 يومًا) + 500 عملة ذهبية + 500 فول ذهبي</p>
    </div>
    <div class="kRoomTop">
      <div class="topTitle">قائمة ملوك الدعم：</div>
      <h5>المركز الأول:</h5>
      <p> شارة الوصي (30 يومًا) + 800 عملة ذهبية + 1000 فول ذهبي</p>
      <h5>المركز الثاني:</h5>
      <p>شارة الوصي (30 يومًا) + 500 عملة ذهبية + 800 فول ذهبي</p>
      <h5>المركز الثالث:</h5>
      <p> شارة الوصي (30 يومًا) + 300عملة ذهبية + 500 فول ذهبي</p>
      <h5>المركز 4-10:</h5>
      <p> شارة الوصي (30 يومًا) + 100 عملة ذهبية + 200 فول ذهبي</p>
    </div>
    <div class="fanhuan">
      <h5> ملاحظة:</h5>
      <p> سوف تُعطَى هذه الجوائز أثناء خمسة الأيام بعد انتهاء النشاط</p>
    </div>
    <div class="bottmMsg">
      التفسير النهائي لهذا النشاط ينتمي إلى منظم الحدث
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.wards {
  p {
    font-size: 80%;
    line-height: 0.36rem;
  }
  .activeTime {
    margin-top: 0.51rem;
    text-align: right;
    font-size: 80%;
    strong {
      display: block;
      text-align: right;
      color: #ffefbb;
      font-weight: 600;
      margin-bottom: 0.24rem;
    }
  }
  h4 {
    margin-top: 0.7rem;
    color: #ffefbb;
    font-weight: 600;
  }
  > h5 {
    text-align: center;
    font-size: 120%;
    color: #ffed6a;
    margin-top: 0.57rem;
  }
  .wardTop {
    .topTitle {
      font-size: 88%;
      color: #19ffe7;
      margin-top: 0.3rem;
    }
    > h5 {
      font-size: 75%;
      margin-top: 0.2rem;
    }
    p {
      font-size: 80%;
    }
  }
  .kRoomTop {
    .topTitle {
      font-size: 88%;
      color: #19ffe7;
      margin-top: 0.5rem;
    }
    > h5 {
      font-size: 75%;
      margin-top: 0.2rem;
    }
    p {
      font-size: 80%;
    }
  }
  .fanhuan {
    margin-top: 0.45rem;
    > h5 {
      font-size: 75%;
      margin-top: 0.2rem;
      color: #19ffe7;
    }
    p {
      font-size: 80%;
    }
  }
  .bottmMsg {
    text-align: center;
    font-size: 80%;
    color: #f4a2ff;
    margin-top: 0.87rem;
  }
}
</style>
