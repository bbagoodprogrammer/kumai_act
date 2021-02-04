<template>
  <div class="rule">
    <div class="taskTabs">
      <span class="p1Tab1" :class="{act:type==1}" @click="tabClick(1)">جوائز النشاط</span>
      <span class="p1Tab2" :class="{act:type==2}" @click="tabClick(2)">قواعد النشاط</span>
    </div>
    <div class="gifts" v-if="type == 1">
      <h5>وقت النشاط</h5>
      <p>{{actTime}}</p>
      <h5>جوائز النشاط</h5>
      <div class="giftsItem">
        <!-- <div class="item" v-for="(item,index) in 28" :key="index">
          <div class="imgBg">
         
          </div>
          <strong v-html="giftName[index]"></strong>
        </div> -->
      </div>
      <h5>الجوائز الممكنة</h5>
      <img src="./img/ruleImg2.png" alt="" class="ruleImg2">
      <p>
        كلما ارتفع مستوى صندوق هدايا محظوظ ، زادت سخاء الجائزة ؛ في المرة الخامسة التي تتلقى مكافأة من سوبر صندوق هدايا محظوظ ، يجب أن تفوز بالملصقة النادرة.
      </p>
      <h5>مكافآت لأفضل 10 في قائمة حظ سعيد</h5>
      <h6>المرتبة الأولى:</h6>
      <p>شارة حظ سعيد(30 يوم) + بطاقة مشهد ليلي ديناميكي(30 يوم) + سيارة يونيكورن ملون(30 يوم) + 2000 عملة + 1500 فول + (30 يوم) VIP</p>
      <h6>المرتبة الثانية:</h6>
      <p>شارة حظ سعيد(21 يوم) + بطاقة مشهد ليلي ديناميكي(21 يوم) + سيارة يونيكورن ملون(21 يوم) + 1000 عملة + 1000 فول + (21 يوم) VIP</p>
      <h6>المرتبة الثالثة:</h6>
      <p>شارة حظ سعيد(21 يوم) + بطاقة مشهد ليلي ديناميكي(21 يوم) + سيارة يونيكورن ملون(21 يوم) + 700 عملة + 800 فول + (21 يوم) VIP </p>
      <h6>المرتبة الرابعة حتى الخامسة:</h6>
      <p>شارة حظ سعيد(15 يوم) + سيارة يونيكورن ملون(15 يوم) + 500 عملة + 500 فول + (15 يوم) VIP</p>
      <h6>المرتبة السادسة حتى العاشرة:</h6>
      <p>سيارة يونيكورن ملون(15 يوم) + 200 عملة + 300 فول + (15 يوم) VIP</p>
      <h5>مكافآت لأفضل 10 في قائمة داعمين</h5>
      <h6>المرتبة الأولى:</h6>
      <p>شارة الداعم(30 يوم) + بطاقة مشهد ليلي ديناميكي(30 يوم) + سيارة يونيكورن ملون(30 يوم) + 2000 عملة + 1500 فول + (30 يوم) VIP</p>
      <h6>المرتبة الثانية:</h6>
      <p>شارة الداعم(21 يوم) + بطاقة مشهد ليلي ديناميكي(21 يوم) + سيارة يونيكورن ملون(21 يوم) + 1000 عملة + 1000 فول + (21 يوم) VIP</p>
      <h6>المرتبة الثالثة:</h6>
      <p>شارة الداعم(21 يوم) + بطاقة مشهد ليلي ديناميكي(21 يوم) + سيارة يونيكورن ملون(21 يوم) + 700 عملة + 800 فول + (21 يوم) VIP</p>
      <h6>المرتبة الرابعة حتى الخامسة:</h6>
      <p>شارة الداعم(15 يوم) + سيارة يونيكورن ملون(15 يوم) + 500 عملة + 500 فول + (15 يوم) VIP </p>
      <h6>المرتبة السادسة حتى العاشرة:</h6>
      <p>سيارة يونيكورن ملون(15 يوم) + 200 عملة + 300 فول + (15 يوم) VIP</p>
    </div>
    <div class="ruleItem" v-else>
      <h5>وقت النشاط</h5>
      <p>{{actTime}}</p>
      <h5>قواعد النشاط</h5>
      <h6 class="minTop">تسجيل النشاط</h6>
      <p>1. النشاط يتطلب التسجيل للمشاركة ، ويتم احتساب القيمة بعد التسجيل</p>
      <!-- <P>2、如何送出作品福運禮盒：在作品頁點擊禮物按鈕——點擊活動——選擇對應的福運禮盒送出</P> -->
      <h5>قواعد ترتيب قائمة</h5>
      <h6>قائمة حظ سعيد:</h6>
      <p>1. قم بالترتيب وفقًا لإجمالي قيمة سحر الهدايا على صندوق هدايا محظوظ الثلاثة المختلفة الذي تم حصل عليها بعد التسجيل</p>
      <p>2. اعرض أفضل 100 في القائمة. إذا كانت الدرجات هي نفسها ، فسيكون أول من يصل في المقدمة</p>
      <h6>قائمة داعمين</h6>
      <p>1. مرتبة حسب عدد العملات الذهبية التي تم إنفاقها في 3 أنواع من صندوق هدايا محظوظ المرسل بعد التسجيل</p>
      <p>2. اعرض أفضل 100 في القائمة. إذا كانت الدرجات هي نفسها ، فسيكون أول من يصل في المقدمة</p>
      <h5>قواعد مكافأة اليومية</h5>
      <p>
        1. احصل على 3 من صندوق هدايا محظوظ مختلف (صندوق هدايا محظوظ ، وصندوق هدايا محظوظ مميز ، وجوائز سوبر صندوق هدايا محظوظ ) كل يوم(أعمال فقط) ، يمكنك الحصول على المكافأة المقابلة. <br />
        2. كلما ارتفع مستوى صندوق هدايا محظوظ ، زادت سخاء الجائزة ؛ في المرة الخامسة التي تتلقى مكافأة من سوبر صندوق هدايا محظوظ ، يجب أن تفوز بالملصقة النادرة(نوتي بول ديلي 1)<br />
        3. يمكنك الحصول عليها مرة واحدة في اليوم ، فقط في نفس اليوم
      </p>
    </div>
    <p class="lastTips">التفسير النهائي لهذا النشاط ينتمي إلى المنظم</p>
  </div>
</template>

<script>

import getDate from "../../utils/getDate"
import { mapState } from "vuex"
export default {
  data() {
    return {
      type: 1,
    }
  },
  computed: {
    ...mapState(['stime', 'etime']),
    actTime() {
      console.log(this.stime)
      return getDate(new Date(this.stime * 1000), 5) + '-' + getDate(new Date(this.etime * 1000), 5)
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
  direction: rtl;
  .rule {
    background-color: RGBA(73, 28, 95, 1);
    padding: 0.37rem 0.18rem 0.6rem;
    .taskTabs {
      display: flex;
      justify-content: center;
      span {
        display: block;
        width: 3.55rem;
        height: 0.88rem;
        text-align: center;
        line-height: 0.84rem;
        color: rgba(255, 255, 255, 0.6);
      }
      .p1Tab1 {
        background: url(../../img/tab2.png);
        background-size: 100% 100%;
        &.act {
          color: rgba(255, 255, 255, 1);
          background: url(../../img/tab1.png);
          background-size: 100% 100%;
        }
      }

      .p1Tab2 {
        background: url(../../img/tab3.png);
        background-size: 100% 100%;
        &.act {
          color: rgba(255, 255, 255, 1);
          background: url(../../img/tab4.png);
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
        color: #ffa0a9;
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
      width: 7.02rem;
      height: 7.4rem;
      background: url(./img/ruleImg1.png);
      background-size: 100% 100%;
    }
    .ruleImg2 {
      width: 7.02rem;
      height: 2.8rem;
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
    .gifts {
      h6 {
        color: #fff;
      }
    }
  }
  .lastTips {
    text-align: center;
    margin: 1.25rem 0;
    font-size: 0.28rem;
  }
}
// @import "../../assets/scss/common.scss";
</style>
