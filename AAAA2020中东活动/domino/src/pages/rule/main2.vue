<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="tabClick(0)" :class="{current:tab==0}" href="">قواعد النشاط</a>
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">مكافآت النشاط</a>
    </div>
    <div class="wards" v-show="tab==1">
      <div class="wards1">
        <img src="../../assets/img/giftBox.png" alt="" class="giftBox">
        <p class="tips">صندوق الكنز في الخلف أغلى~ بعد إطاحة كل أحجار الدومينو(يعني تخليص الدومينو) ستحصل على أكبر صندوق الكنز، الكنوز في انتظارك!</p>
        <h5>الكنوز يمكن حصول عليها في صندوق الكنز</h5>
        <div class="luckBox">
          <span v-for="(item,index) in giftArr" :key="index">
            <span class="imgBox">
              <img :src="require(`../../assets/img/gift/${item.type}.png`)" alt="">
            </span>
            <strong>{{item.name}}</strong>
          </span>
        </div>
      </div>
      <div class="wards2">
        <img src="../../assets/img/luckGift2.png" alt="" class="luckGift2">
        <p class="wardsTips">يشير العلم الصغير إلى أن شخصا ما قد وصل إلى هذا السلم~ عندما انتهى النشاط، كل المستخدمين الذين صعدوا أعلى السلمين الاثنين الاوائل يمكن لهم حصول على حقيبة كنوز اللعبة~</p>
        <div class="luckBox">
          <span v-for="(item,index) in giftArr2" :key="index">
            <img :src="require(`../../assets/img/gift/${item.type}.png`)" alt="">
            <strong>{{item.name}}</strong>
          </span>
        </div>
      </div>
      <div class="luckRule">
        <h5>ملاحظة:</h5>
        <p>1.سيصدر النظام كنوزا في صندوق الكنز تلقائيا بعد فتحه، يرجي الفحصة~ سوف تُصدَر حقيبة كنوز اللعبة لسلم تخليص الدومينو بعد إنتهاء النشاط، يرجي الانتباه إلى الرسالة.</p>
        <p>2.يمكن أن تستخدم تذكرة إعادة العملات للإهداء و تذكرة إعادة العملات للشحن بعد حصول عليها، صلاحية تذكرة إعادة العملات للإهداء هي 48 ساعة، صلاحية تذكرة إعادة العملات للشحن هي 7 يوما، تفضل الاستخدام أثناء صلاحيتها~</p>
      </div>
      <p class="lastTips">التفسير النهائي لهذا النشاط ينتمي إلى المنظم</p>
    </div>
    <div class="rules" v-show="tab==0">
      <p class="time">الوقت:12:00 28\6 -23:00 12\7 (بتوقيت دبي)</p>
      <div class="ruleTips">
        <p>1. يمكن حصول على النجوم عن طريق إكمال المهمات، تختلف عدد النجم الذي يمكن حصول عليه باختلاف المهمات، بعد جمع كل 3 نجوم يمكن أن تطيح أحجار الدومينو مرة واحدة. ستحذف النجوم التي لم تستخدم في 00:00 اليوم القادم، يرجي استخدامها قبل 00:00 اليوم القادم.</p>
        <p>2. كل مرة بعد إطاحة أحجار الدومينو سيُفتَح صندوق الكنز و تحصل على كل الكنوز فيه، صندوق الكنز في الخلف أغلى~
          بعد إطاحة كل أحجار الدومينو(يعني تخليص الدومينو) ستحصل على أكبر صندوق الكنز."</p>
        <p>3. بعد إطاحة أحجار الدومينو ثلاث مرات سيسقط كل أحجار الدومينو، اذا سقطوا بعد المرة الثالثة ستكون تنجح باللعبة اليوم(يعني تخليص الدومينو)، يمكن تخليص الدومينو مرة واحدة كل يوم.</p>
        <p> بعد كل مرة تخليص الدومينو يمكن أن تصعد السلم الواحد. وقت النشاط هو 15 يوما و درجات السلم هي 15 درجة، عندما انتهى النشاط، كل المستخدمين الذين صعدوا أعلى السلمين الاثنين الاوائل يمكن لهم حصول على حقيبة كنوز اللعبة~ يمكن أن تعرف اي درجة وصلت إليها الآن في القائمة تحت سلم تخليص الدومينو.</p>
      </div>
      <p class="lastTips">التفسير النهائي لهذا النشاط ينتمي إلى المنظم</p>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 0,
      giftArr: [
        {
          type: 4,
          name: `هدايا رائعة`
        },
        {
          type: 7,
          name: `تذكرة إعادة العملات للإهداء`
        },
        {
          type: 3,
          name: `عملات كثيرة`
        },
        {
          type: 1,
          name: `فول كثير`
        }
      ],
      giftArr2: [
        {
          type: 6,
          name: `مركبات رائعة`
        },
        {
          type: 3,
          name: `عملات كثيرة`
        },
        {
          type: 1,
          name: `فول كثير`
        },
        {
          type: 5,
          name: `شارة ملك اللعبة`
        },
        {
          type: 2,
          name: `تذكرة إعادة العملات للشحن`
        },
        {
          type: 4,
          name: `هدايا رائعة`
        },
      ]
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
  background-color: #3f21ba;
  direction: rtl;
}
.rule {
  padding: 0.19rem 0.24rem 0;
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
      color: #ffd4f4;
      font-weight: 700;
      font-size: 0.32rem;
      &.current {
        color: #ffffff;
        text-shadow: #ce4eb3 0.03rem 0 0, #ce4eb3 0 0.03rem 0,
          #ce4eb3 -0.03rem 0 0, #ce4eb3 0 -0.03rem 0;
        background: url(../../assets/img/rulesActTab.png);
        background-size: 100% 100%;
      }
    }
  }
  .wards {
    .wards1 {
      width: 7.11rem;
      height: 6.66rem;
      margin: 0.35rem auto 0.22rem;
      background: url(../../assets/img/wards1.png);
      background-size: 100% 100%;
      padding-top: 0.36rem;
      .giftBox {
        width: 5.33rem;
        height: 2.69rem;
        display: block;
        margin: 0 auto;
      }
      .tips {
        text-align: center;
        font-size: 0.28rem;
        color: #adc4ff;
        margin-top: 0.15rem;
      }
      h5 {
        text-align: center;
        font-weight: bold;
        font-size: 0.36rem;
        color: #ffcb40;
        margin: 0.1rem 0;
      }
      .luckBox {
        display: flex;
        justify-content: space-between;
        padding: 0 0.35rem;
        span {
          width: 1.48rem;
          height: 1.48rem;
          .imgBox {
            display: block;
            width: 1.48rem;
            height: 1.48rem;
            background: url(../../assets/img/giftImgBg.png);
            background-size: 100% 100%;
            position: relative;
            img {
              width: 1.48rem;
              height: 1.48rem;
              display: block;
              margin: 0 auto;
              position: absolute;
              z-index: 1;
            }
          }
          strong {
            display: block;
            width: 120%;
            margin-right: -0.15rem;
            white-space: nowrap;
            color: #7ecef4;
            font-size: 0.24rem;
            text-align: center;
            margin-top: 0.15rem;
          }
        }
      }
    }
    .wards2 {
      width: 7.11rem;
      height: 7.7rem;
      margin: 0.22rem auto 0.29rem;
      background: url(../../assets/img/wards2.png);
      background-size: 100% 100%;
      padding-top: 0.36rem;
      .luckGift2 {
        width: 3.13rem;
        height: 2.3rem;
        display: block;
        margin: 0 auto;
      }
      .wardsTips {
        font-size: 0.26rem;
        color: #adc4ff;
        text-align: center;
        padding: 0 0.1rem;
      }
      .luckBox {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 0 0.7rem;
        span {
          margin-top: 0.2rem;
          img {
            width: 1.48rem;
            height: 1.48rem;
            display: block;
            margin: 0 auto;
          }
          strong {
            display: block;
            color: #7ecef4;
            font-size: 0.24rem;
            text-align: center;
            margin-top: 0.13rem;
          }
        }
      }
    }
    .luckRule {
      h5 {
        font-size: 0.4rem;
        color: #bee1ff;
      }
      p {
        font-size: 0.28rem;
        color: #bee1ff;
        font-weight: 500;
      }
    }
  }
  .rules {
    .time {
      text-align: center;
      color: #adc4ff;
      font-size: 0.4rem;
      margin: 0.39rem 0 0.6rem;
    }
    .ruleTips {
      color: #adc4ff;
      font-size: 0.28rem;
      font-weight: 500;
      p {
        margin-bottom: 0.15rem;
      }
    }
    .lastTips {
      margin-top: 5rem;
    }
  }
  .lastTips {
    text-align: center;
    margin: 1.08rem 0 0.31rem;
    color: #7351ff;
    font-size: 0.28rem;
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

@import "../../assets/scss/common.scss";
</style>
