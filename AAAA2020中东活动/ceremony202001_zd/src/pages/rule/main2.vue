<template>
  <div class="rule">
    <div class="taskTabs">
      <span class="p1Tab1" :class="{act:type==1}" @click="tabClick(1)"></span>
      <span class="p1Tab2" :class="{act:type==2}" @click="tabClick(2)"></span>
    </div>
    <div class="gifts" v-if="type == 1">
      <h5>وقت النشاط</h5>
      <p>وقت النشاط:12:00 24\11 -20:00 30\12 و 20:00 31\12 -23:00 31\12 (بتوقيت دبي)</p>
      <h5>مكافآت النشاط</h5>
      <div class="giftsItem">
        <div class="item" v-for="(item,index) in 25" :key="index">
          <div class="imgBg">
            <img :src="require(`../../assets/img/ruleGifts/${item}.png`)" alt="">
          </div>
          <strong v-html="giftName[index]"></strong>
        </div>
      </div>
      <h5>اليانصيب-جوائز قائمة كرنفال سوبر فويس</h5>
      <h6 class="minTop">المرتبة الأولى:</h6>
      <p>شارة كرنفال سوبر فويس(2 شهر) + سيارة لدخول: سجادة حمراء(2 شهر) + 3000 عملة + 6000 فول</p>
      <h6>المرتبة الثانية:</h6>
      <p>شارة كرنفال سوبر فويس(1 شهر) + سيارة لدخول: سجادة حمراء(1 شهر) + 2000 عملة + 4000 فول</p>
      <h6>المرتبة الثالثة:</h6>
      <p>شارة كرنفال سوبر فويس(1 شهر) + سيارة لدخول: سجادة حمراء(1 شهر) + 1500 عملة + 3000 فول</p>
      <h6>المرتبة الرابعة حتى العاشرة:</h6>
      <p>شارة كرنفال سوبر فويس(21 يوما) + سيارة لدخول: سجادة حمراء(21 يوما) + 1000 عملة + 2000 فول</p>
      <h6>المرتبة الحادية عشر حتى العشرين:</h6>
      <p>شارة كرنفال سوبر فويس(15 يوما) + سيارة لدخول: سجادة حمراء(15 يوما) + 500 عملة + 1000 فول</p>
      <h5>مليونير- جوائز الدرجة</h5>
      <img src="../../assets/img/rules/img1.png" alt="" class="img1">
      <p class="ps">ملاحظة: الجوائز المقابلة لكل درجة لا يمكن أن يستلم أكثر من مرة واحدة</p>
      <h5>مليونير- جوائز قائمة مليونير</h5>
      <h6 class="minTop">المرتبة الأولى:</h6>
      <p>شارة مليونير سوبر(2 شهر) + سيارة لدخول: سجادة حمراء(2 شهر) + إطار الصورة الرمزية لمليونير(2 شهر) + VIP(ثلاثين يوما) + هدية عجلة فيريس(999 عملة)*3 + 3000 عملة + 6000 فول</p>
      <h6>المرتبة الثانية:</h6>
      <p>شارة مليونير سوبر(1 شهر) + سيارة لدخول: سجادة حمراء(1 شهر) + إطار الصورة الرمزية لمليونير(1 شهر) + VIP(ثلاثين يوما) + هدية عجلة فيريس(999 عملة)*3 + 2000 عملة + 4500 فول</p>
      <h6>المرتبة الثالثة:</h6>
      <p>شارة مليونير سوبر(1 شهر) + سيارة لدخول: سجادة حمراء(1 شهر) + إطار الصورة الرمزية لمليونير(1 شهر) + VIP(ثلاثين يوما) + هدية عجلة فيريس(999 عملة)*2 + 1500 عملة + 3000 فول</p>
      <h6>المرتبة الرابعة حتى الخامسة:</h6>
      <p>شارة مليونير سوبر(21 يوما) + سيارة لدخول: سجادة حمراء(21 يوما) + إطار الصورة الرمزية لمليونير(21 يوما) + VIP(ثلاثين يوما) + هدية عجلة فيريس(999 عملة)*2 + 1000 عملة + 2000 فول</p>
      <h6>المرتبة السادسة حتى العاشرة:</h6>
      <p>شارة مليونير سوبر(15 يوما) + سيارة لدخول: سجادة حمراء(15 يوما) + إطار الصورة الرمزية لمليونير(15 يوما) + VIP(ثلاثين يوما) + هدية عجلة فيريس(999 عملة)*1 + 500 عملة + 1500 فول</p>
      <!-- <h5>禮物冠名-解鎖獎勵</h5>
      <img src="../../assets/img/rules/img2.png" alt="" class="img2">
      <p class="ps">PS.每個等級的獎勵限領取一次</p>
      <h5>禮物冠名-各禮物冠軍榜單獎勵</h5>
      <img src="../../assets/img/rules/img3.png" alt="" class="img3"> -->

    </div>
    <div class="ruleItem" v-else>
      <h5>وقت النشاط</h5>
      <p>وقت النشاط:12:00 24\11 -20:00 30\12 و 20:00 31\12 -23:00 31\12 (بتوقيت دبي)</p>
      <h5>قواعد النشاط</h5>
      <h6 class="minTop">تسجيل النشاط</h6>
      <p>1. يمكن أن يشارك في نشاط اليانصيب و مليونير عن طريق نقر"تسجيل الآن"، ستحتسب معطيات النشاط بعد تسجيل النشاط، نشاط إعادة %15 عملات لشحن لا يتطلب التسجيل.</p>
      <h5>اليانصيب</h5>
      <h6 class="minTop">اليانصيب-القواعد</h6>
      <p>
        1. يمكن حصول على عملات الحفلة عن طريق إكمال مهمات يومية، ستضاف عملات الحفلة إلى حسابك تلقائيا، صلاحية عملات الحفلة حتى انتهاء النشاط.<br />
        2. يقوم باليانصيب باستخدام عملات الحفلة، الجوائز ستصل إليك فوريا بعد حصولك عليها.<br />
      </p>
      <h6>اليانصيب-القواعد لترتيب قائمة كرنفال سوبر فويس</h6>
      <p>1. الترتيب وفقا لنقاط الكرنفال الذي حصلت عليه بعد التسجيل، نقاط الكرنفال= عدد عملات الحفلة التي استخدمتها. إذا كانت النقاط هو نفسه ، فإن أول ما يتم الوصول إليه هو أولاً.</p>
      <h5>مليونير</h5>
      <h6 class="minTop">مليونير-القواعد</h6>
      <p>1. يهدي هدية بقيمة 1 عملة يمكن حصول على 10 نقاط الثروة، و يمكن أن يستلم الجوائز في صندوق الكنز المقابلة اذا وصل نقاط الثروة إلى 5000، 50000، 300000، 1000000، 2000000، 3000000، 5000000، 10000000.</p>
      <h6>مليونير-القواعد لترتيب قائمة مليونير</h6>
      <p>1. الترتيب وفقا للقيمة السحرية من الهدايا التي أهديتها بعد التسجيل. إذا كانت النقاط هو نفسه ، فإن أول ما يتم الوصول إليه هو أولاً.</p>
      <!-- <h5>禮物冠名</h5>
      <h6 class="minTop">禮物冠名-規則</h6>
      <p>1、設置6個盛典特定禮物，獲得該特定禮物數量最高的用戶，獲得該禮物冠名權</p>
      <h6>禮物冠名-6個盛典特定禮物冠名榜單排名規則</h6>
      <p>1、根據報名後收到該特定禮物的數量排名，若分數相同，先達到的排名在前面</p> -->
      <h5>إعادة %15 عملات لشحن</h5>
      <h6 class="minTop">إعادة %15 عملات لشحن-القواعد</h6>
      <p>
        1. في يوم 25 من ديسمبر عيد الميلاد المسيحي، كل مستخدم يستطيع الحصول على إعادة %15 عملات من قيمة شحن الكيفية(لا تشمل على العملات التي يهديها النظام).<br />
        2. سوف تصل إليك العملات المعادة على الفور بعد جري الشحن.
      </p>
      <h6>إعادة %15 عملات لشحن-القواعد لترتيب الشحن</h6>
      <p>1. الترتيب وفقا لعدد العملات التي تم الشحن في يوم 25 من ديسمبر عيد الميلاد المسيحي.</p>
      <!-- <h5>高光時刻</h5>
      <h6 class="minTop">高光時刻-規則</h6>
      <p>1、以下活動指定時間段，21:00:00-21:10:00獲得的分數額外加成10%</p>
      <h6>年度魅力歌王大賽</h6>
      <p class="ytime">11月16日-11月24日</p>
      <h6>年度K房男神女神賽</h6>
      <p class="ytime">11月23日-12月3日</p>
      <h6>年度C位爭奪賽</h6>
      <p class="ytime">11月30日-12月11日</p>
      <h6>年度最強家族戰 </h6>
      <p class="ytime">12月22日-12月24日</p> -->
      <h5 class="other">تعليمات أخرى</h5>
      <p>
        1. ستصدر مكافآت القائمة بعد 14 يوم إنتهاء النشاط<br />
        2. أثناء النشاط، إذا نجدك تغش في النشاط، سنلغي موهلك للاشتراك والمكافآت التي تحصل عليها. بالنسبة إلى الحالة الخطيرة، سنحطر حسابه إلى الأبد<br />
      </p>
    </div>
    <p class="lastTips">التفسير النهائي لهذا النشاط ينتمي إلى المنظم</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 1,
      giftName: [
        'شارة حفلة كرنفال سوبر فويس',
        'شارة مليونير',
        'سيارة لدخول: سجادة حمراء',
        'إطار الصورة الرمزية لمليونير',
        'VIP',
        'هدية عجلة فيريس',
        'عملات كثيرة',
        'سيارة المنطاد الرومانسي',
        'شارة غني صغير',
        'شارة غني',
        'شارة غني كبير',
        'سيارة لدخول: طائرة',
        'هدية حب من أول نظرة',
        'هدية نجمة لامعة',
        'إطار الصورة الرمزية لغني',
        'إطار الصورة الرمزية لغني كبير',
        'هدية مسدس نقود',
        'هدية قنبلة موسيقى',
        'سيارة برادي',
        'تذكرة الشحن',
        'هدية بالون',
        'تذكرة الاهداء',
        'هدية برافو عليك',
        'هدية شوكولاتة بلورية',
        'فول كثير',
        // '儲值返利券',
        // '送禮返利券',
        // '海量金幣',
        // '海量金豆'
      ]
    }
  },
  methods: {
    tabClick(val) {
      this.type = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: RGBA(35, 27, 40, 1);
  direction: rtl;
  .rule {
    padding: 0.37rem 0.18rem 0;
    .taskTabs {
      display: flex;
      justify-content: center;
      span {
        width: 3.54rem;
        height: 0.88rem;
      }
      .p1Tab1 {
        background: url(../../assets/img/rules/ruleTab1.png);
        background-size: 100% 100%;
        &.act {
          background: url(../../assets/img/rules/ruleTab1_act.png);
          background-size: 100% 100%;
        }
      }

      .p1Tab2 {
        background: url(../../assets/img/rules/ruleTab2.png);
        background-size: 100% 100%;
        &.act {
          background: url(../../assets/img/rules/ruleTab2_act.png);
          background-size: 100% 100%;
        }
      }
    }
    .gifts,
    .ruleItem {
      margin-top: 0.1rem;
      padding: 0 0.08rem;
      h5 {
        font-size: 0.32rem;
        color: rgba(254, 249, 120, 1);
        font-weight: bold;
        margin-top: 0.4rem;
      }
      h6 {
        font-size: 0.28rem;
        color: rgba(255, 128, 34, 1);
        padding-left: 0.64rem;
        margin-top: 0.5rem;
      }
      p {
        font-size: 0.28rem;
        padding-left: 0.64rem;
      }
      .ps {
        font-size: 0.31rem;
        padding-left: 0;
      }
      img {
        margin: 0.18rem auto;
      }
      .img1 {
        width: 7.02rem;
        height: 14.18rem;
      }
      .img2 {
        width: 7.02rem;
        height: 7.02rem;
      }
      .img3 {
        width: 7.02rem;
        height: 18.36rem;
      }
    }
    .giftsItem {
      width: 6.31rem;
      height: 15.57rem;
      padding: 0.81rem 0.48rem 0;
      background: url(../../assets/img/ruleGifts/rulebg.png);
      background-size: 100% 100%;
      margin-left: -0.15rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        width: 25%;
        .imgBg {
          width: 1.4rem;
          height: 1.4rem;
          background: url(../../assets/img/luckBg.png);
          background-size: 100% 100%;
          margin: 0 auto;
          img {
            width: 1.4rem;
            height: 1.4rem;
            margin: 0 auto;
          }
        }
        strong {
          display: block;
          width: 100%;
          height: 0.6rem;
          font-size: 0.24rem;
          text-align: center;
        }
      }
    }
    .minTop {
      margin-top: 0.29rem !important;
    }
    .ytime {
      color: rgba(252, 245, 193, 1);
    }
    .other {
      margin-bottom: 0.28rem;
    }
  }
  .lastTips {
    text-align: center;
    margin: 1.25rem 0 0.6rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
