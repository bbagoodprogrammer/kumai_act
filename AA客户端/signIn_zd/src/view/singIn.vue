<template>
  <div class="box">
    <!-- <div class="header">
      <i class="black" @click="closeWeb()"></i> 連續徽章說明
    </div> -->
    <div class="singTotalDay">
      <strong>لقد قمت بتسجيل الوصول لمدة <em> {{data.days}} </em> أيام متتالية</strong>
      <span class="retroactive" :class="{black:!data.compensate.date}" @click="showP()">تسجيل تكميلي</span>
    </div>
    <div class="badge">
      <h3 class="title"> <em> شارات تسجيل دخول متتالية </em><strong>({{actNum}}/{{maxLength}})</strong></h3>
      <div class="badBox">
        <span v-for="(item,index) in data.medalTask" :key="index">
          <img :src="item.url" alt="">
          <strong :class="{black:item.finish == 0}"> {{item.days}} أيام تسجيل الوصول المتتالية</strong>
        </span>
      </div>
    </div>
    <div class="tips">
      <h6>وصف:</h6>
      <p>هذا هو عدد الأيام التي قمت بتسجيل الوصول فيها على التوالي لآخر مرة. إذا كان هناك فاصل ، فسيتم إعادة حسابه</p>
      <p>يمكن الحصول على شارات تسجيل الوصول المستمر تلقائيًا عندما يفي عدد أيام تسجيل الوصول المتتالية بالمتطلبات. ويمكن عرض الشارات التي تم الحصول عليها وارتداؤها في شاراتي</p>
      <p>عندما يفوت المستخدم عن طريق الخطأ تسجيل الدخول ، يمكنه إنفاق العملات الذهبية لإنشاء علامة تكميلية. ويمكن إجراء كل تسجيل دخول إضافي لمدة يوم واحد. سيزداد عدد العملات الذهبية التي يتم إنفاقها لكل تسجيل دخول إضافي بنحو 20٪ مقارنةً بآخر تسجيل خروج إضافي. على سبيل المثال ، تكلفة اليوم الإضافي الأول 100 قطعة ذهبية ، وتكلفة تسجيل الدخول الإضافي الثاني 120 قطعة ذهبية في اليوم ، وتكلفة تسجيل الدخول التكميلي الثالث 140 قطعة ذهبية في اليوم ، ويتم تقريب الأرقام الفردية ، وهكذا. يرجى الانتباه إلى عملية تسجيل الوصول المستمرة ، ومحاولة تجنب تفويت تسجيل الوصول.</p>
      <p>لا يؤثر تسجيل الدخول الإضافي على دورة تسجيل الدخول لمدة 7 أيام</p>
    </div>
    <div class="mask" v-show="showPup">
      <transition name="slide">
        <div class="retroactivePup" v-if="showPup">
          <div class="title">
            هل تنفق {{data.compensate.coins}} عملة ذهبية من أجل تسجيل الدخول الإضافي؟
          </div>
          <div class="tips">
            تاريخ تسجيل الوصول الذي فاتك مؤخرًا: {{data.compensate.date}}
            </br>بعد تسجيل الدخول الإضافي ، يكون عدد أيام تسجيل الدخول المتتالية هو {{data.compensate.days}} أيام
          </div>
          <div class="btnBox">
            <span class="re" @click="closeP()">إلغاء</span>
            <span class="ok" @click="sateSingUp()">تحديد</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import api from "../api/apiConfig"
export default {
  data() {
    return {
      showPup: false,
      data: {
        compensate: {}
      }
    }
  },
  created() {
    this.getDefaultData()
  },
  computed: {
    actNum() {
      let num = 0
      for (let key in this.data.medalTask) {
        if (this.data.medalTask[key].finish == 1) {
          num++
        }
      }
      return num
    },
    maxLength() {
      if (this.data.medalTask) {
        return Object.keys(this.data.medalTask).length
      }
    }
  },
  methods: {
    getDefaultData(val) { //初始化
      api.getDefault().then(res => {
        if (res.status == 200) {
          this.data = res.data.response_data
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    sateSingUp() {
      api.sateSingIn().then(res => {
        if (res.data.response_data && res.data.response_data.msg == 'ok') {
          this.getDefaultData()
          this.toast(`تسجيل الوصول الإضافي ناجح ، أيام تسجيل وصول متتالية +1`)
          this.showPup = false
        } else {
          this.toast(res.data.response_status.error)  //`補簽失敗，請確保賬戶金幣充足`
          this.showPup = false
        }
      })
    },
    showP() {
      if (!this.data.compensate.date) return
      this.showPup = true
    },
    closeP() {
      this.showPup = false
    },
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
<style lang='scss'>
body::-webkit-scrollbar {
  width: 0;
}
body {
  background: #f2f2f2;
}
.box {
  max-width: 750px;
  overflow-x: hidden;
  position: relative;
  margin: auto;
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
      background: url(../assets/img/arr.png);
      background-size: 100% 100%;
      position: absolute;
      left: 0.28rem;
      top: 0.28rem;
    }
  }
  .singTotalDay {
    margin-top: 0.2rem;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.32rem;
    color: #111111;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    strong {
      text-indent: 0.28rem;

      em {
        font-size: 0.45rem;
        color: #ff6a3e;
        font-weight: 600;
        vertical-align: bottom;
      }
    }
    .retroactive {
      width: 1.5rem;
      height: 0.64rem;
      line-height: 0.64rem;
      font-size: 0.26rem;
      color: #fff;
      text-align: center;
      background: rgba(255, 106, 62, 1);
      margin-left: 0.3rem;
      border-radius: 0.5rem;
      white-space: nowrap;
      &.black {
        background: #ccc;
      }
    }
  }
  .badge {
    height: 7.3rem;
    background: #fff;
    margin-top: 0.2rem;
    .title {
      height: 0.8rem;
      line-height: 0.8rem;
      padding-right: 0.28rem;
      em {
        font-weight: 800;
        font-size: 0.3rem;
        color: #111111;
      }
      strong {
        text-align: center;
        color: #999;
        font-size: 0.24rem;
        vertical-align: bottom;
        margin-left: 0.1rem;
      }
    }
    .badBox {
      padding: 0 0.53rem;
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      span {
        width: 33%;
        height: 2rem;
        img {
          width: 1.4rem;
          height: 1.4rem;
          display: block;
          margin: 0.03rem auto;
        }
        strong {
          display: block;
          color: #111111;
          font-size: 0.24rem;
          text-align: center;
          margin-top: 0.04rem;
          &.black {
            opacity: 0.4;
          }
        }
      }
    }
  }
  > .tips {
    color: #999999;
    padding: 0.3rem 0.32rem 0 0.28rem;
    p {
      margin-top: 0.13rem;
      font-size: 0.24rem;
    }
  }
  .retroactivePup {
    width: 5.2rem;
    // height: 2.81rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.12rem;
    position: relative;
    .title {
      color: #111111;
      font-size: 0.36rem;
      margin: 0.35rem auto 0;
      text-align: center;
    }
    .tips {
      font-size: 0.24rem;
      color: #666;
      text-align: center;
      margin: 0.12rem 0;
    }
    .btnBox {
      width: 100%;
      height: 0.8rem;
      // position: absolute;
      // bottom: 0;
      border-top: 0.15px solid #dddddc;
      display: flex;
      span {
        flex: 1;
        text-align: center;
        line-height: 0.8rem;
        font-size: 0.28rem;
        &.re {
          color: #111;
        }
        &.ok {
          color: #ff693e;
          border-left: 0.15px solid #dddddc;
        }
      }
    }
  }
}
</style>


