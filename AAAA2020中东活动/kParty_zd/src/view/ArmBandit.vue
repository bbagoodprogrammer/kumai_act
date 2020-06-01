<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="tipsBox" :class="{top:isShare}">
        <span class="ruleTips" :class="{top:isShare}" @click="showRules()">{{lang.rules}}</span>
        <span class="ruleTips ruleTips2" :class="{top:isShare}" @click="goBar()" v-if="is_admin">{{lang.myAct}}</span>
      </div>
      <div class="actTitle"></div>
    </div>
    <Actlist />
    <act-footer></act-footer>
    <div class="mask" v-show="showRule">
      <transition name="slide">
        <div class="rules" v-if="showRule">
          <i class="close" @click="closeRule()"></i>
          <div class="type1" v-if="is_admin">
            <h6>التفسير عن تقديم الطلب لإقامة الحفلة:</h6>
            <p>1. يمكن لصاحب الغرفة أو مدير الغرفة أن يقدم الطلب لإقامة الحفلة، انقر "تقديم الطلب لإقامة الحفلة" و املأ استمارة الطلب لإقامة الحفلة. يجب علىيك طلب النشاط قبل يومين إثنين إلى 30 يوما بداية النشاط، يجب على وقت كل النشاط أكثر من ساعة و أقل من 10 ساعات.</p>
            <p>2. يرجي إنتظار نتيجة المراجعة بصبر بعد تقديم الطلب بنجاح، يمكن تحقق التفاصيل في صفحة "الحفلة لي".</p>
            <p>3. انقر "تعديل النشاط" في صفحة "الحفلة لي"، يمكن تعديل تفاصيل النشاط الذي يكون في انتظار المراجعة و فشل نتيجة المراجعة، النشاط الذي اجتازت المراجعة لا يمكن التعديل.</p>
            <p>4. اذا فشل نتيجة المراجعة للنشاط يمكن تقديم الطلب مرة ثانية بعد تعديل تفاصيل النشاط، لا يمكن التعديل مرة ثالثة بعد تقديم الطلب.</p>
            <p>5.وقت البداية و الانتهاء للنشاط الذي لازم تختاره في صفحة تقديم الطلب، يرجي اختيار الوقت بتوقيت دبي، لكن بعد ان اجتازت المراجعة للنشاط، وقت النشاط لكل نشاط سوف يظهر في قائمة الحفلات هو الوقت في منطقتك~ لا تنس النشاط~</p>
            <!-- <p>5、方案審核未通過可重新修改提交一次，再次提交未通過不可進行修改</p> -->
            <h6>التفسير للمتفرجين في الحفلة:</h6>
            <p>1. انقر"متابعة" لتتابع النشاط سوف تتلقى تذكير الرسالة قبل خمس دقائق بداية الحفلة، لن فاتتك الحفلة الرائعة!</p>
            <p>2. تشارك النشاط و يكون المتابعة أكثر سوف يجذب الأشخاص الأكثر لمشاركة في الحفلة.</p>
            <p>3. تفاصيل محتويات النشاط تحدد بالمنظم، جوائز النشاط سوف يعطي بمنظم النشاط يعني الشخص الذي قدم الطلب لإقامة النشاط (اذا كان النشاط لديه جوائز)، لا علاقة لsuper voice، اذا كان هناك يوجد أي سؤال عن النشاط يمكن التواصل مع منظم النشاط.</p>
            <p>4. وقت النشاط لكل نشاط في قائمة الحفلات هو الوقت في منطقتك~ لا تنس النشاط~</p>
            <h5>قواعد إعادة العملة الذهبية للاستهلاك</h5>
            <p>1. اذا كان مبلغ العملة الذهبية الإجمالي للاستهلاك يصل إلى 4000 عملة ذهبية في هذه الغرفة أثناء النشاط الواحد(يعني 40000 قيمة السحر بالعملة الذهبية)، يمكن تقدم بالطلب لإعادة %10 عملة ذهبية.</p>
            <p>غرفة الكاريوكي لتقدم بالطلب لإعادة عملة ذهبية، يرجي التوصل مع أمين: 1000(UID)</p>
            <p>غرفة الدردسة لتقدم بالطلب لإعادة عملة ذهبية، يرجي التوصل مع يوسف: 5808556(UID)</p>
            <p class="lastTips">التفسير النهائي لنشاط الحفلات الرائعة للغرف ينتمي إلى المنظم</p>
          </div>
          <div class="type2" v-else>
            <h6>التفسير للمتفرجين في الحفلة:</h6>
            <p>1. يمكن لصاحب الغرفة أو مدير الغرفة أن يقدم الطلب لإقامة الحفلة.</p>
            <p>2. انقر"متابعة" لتتابع النشاط سوف تتلقى تذكير الرسالة قبل خمس دقائق بداية الحفلة، لن فاتتك الحفلة الرائعة!</p>
            <p>3. تشارك النشاط و يكون المتابعة أكثر سوف يجذب الأشخاص الأكثر لمشاركة في الحفلة.</p>
            <p>4. تفاصيل محتويات النشاط تحدد بالمنظم، جوائز النشاط سوف يعطي بمنظم النشاط يعني الشخص الذي قدم الطلب لإقامة النشاط (اذا كان النشاط لديه جوائز)، لا علاقة لsuper voice، اذا كان هناك يوجد أي سؤال عن النشاط يمكن التواصل مع منظم النشاط.</p>
            <p>5. وقت النشاط لكل نشاط في قائمة الحفلات هو الوقت في منطقتك~ لا تنس النشاط~</p>
            <p class="lastTips">التفسير النهائي لنشاط الحفلات الرائعة للغرف ينتمي إلى المنظم</p>
          </div>
        </div>
      </transition>
    </div>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
    <div class="goTop" @click="scorllGO()"></div>
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import Actlist from "../components/Actlist"
import { fail } from 'assert';
export default {
  components: { MsgToast, ActFooter, Actlist },
  data() {
    return {
      isShare: false, //是否分享
      isMore: true,   //加载更多
      activite: 1,    //活动状态
      showT: false,  //提示弹窗显示
      tastMsg: "提示信息",  //基础弹窗提示信息
      userState: 0,   //用户状态（是否报名）
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      showRule: false,
      is_admin: null
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  mounted() {
  },
  methods: {
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      this.isShare = getString('token') ? false : true
      this.vxc('setShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
      api.getDefault().then(res => {
        const { response_status, response_data } = res.data
        if (response_status.code == 0) {
          const { is_admin, list } = response_data
          this.is_admin = is_admin
          this.vxc('setActStatus', 1)
          this.vxc('setIs_admin', is_admin)
          this.vxc('setList', list)
        } else {
          this.toast(response_status.error)
        }
      })
    },
    downApp() {
      APP()
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
    },
    goBar() {
      let regstr = getString('token')
      location.href = `./index3.html?token=${regstr}`
    },
    showRules() {
      this.showRule = true
    },
    closeRule() {
      this.showRule = false
    },
    scorllGO() {
      this.timer = setInterval(() => {
        var scorllTop = document.documentElement.scrollTop || document.body.scrollTop
        var step = scorllTop / 10
        window.scrollTo(0, scorllTop - step)
        if (scorllTop < 1) {//速度小于3或者滚动条到底了
          clearInterval(this.timer)
        }
      }, 10)
    },
  }
}
</script>
<style lang='scss'>
body::-webkit-scrollbar {
  width: 0;
}
.box {
  max-width: 750px;
  overflow-x: hidden;
  position: relative;
  margin: auto;
  background: #5b16ba url(../assets/img/banner.png) center 0 no-repeat;
  background-size: 100% auto;
  direction: rtl;
  .shareBar {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    .bar {
      width: 7.5rem;
      height: 1.2rem;
      margin: auto;
      background: url(../assets/img/share_bar.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .header {
    height: 5.1rem;
    position: relative;
    .tipsBox {
      position: absolute;
      right: 0;
      top: 0.12rem;
      &.top {
        top: 1.5rem;
      }
      .ruleTips {
        display: block;
        width: 2.3rem;
        height: 0.53rem;
        background: url(../assets/img/ruleTips.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.53rem;
        font-size: 0.26rem;
        // text-indent: 0.15rem;
        margin-bottom: 0.11rem;
      }
      .ruleTips2 {
        width: 1.42rem;
        margin-left: 0.47rem;
        background: url(../assets/img/ruleTips2.png);
        background-size: 100% 100%;
      }
    }
    .actTitle {
      width: 3.04rem;
      height: 0.39rem;
      background: url(../assets/img/actTitleTips.png);
      background-size: 100% 100%;
      position: absolute;
      bottom: 0.16rem;
      left: 2.23rem;
    }
  }
  .guaBox {
    position: relative;
  }
  .rules {
    width: 5.32rem;
    padding: 0 0.29rem 0.26rem;
    background: rgba(104, 30, 181, 1);
    border-radius: 0.4rem;
    position: relative;
    .type1 {
      height: 9rem;
      overflow-y: scroll;
    }
    .close {
      display: block;
      width: 0.58rem;
      height: 0.58rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: -0.7rem;
    }
    h6 {
      font-size: 0.26rem;
      margin: 0.24rem 0 0.14rem;
    }
    p {
      font-size: 0.24rem;
      color: #bffffe;
    }
    .lastTips {
      text-align: center;
      font-size: 0.24rem;
      color: #a884d8;
      margin-top: 0.28rem;
    }
  }
}
.goTop {
  display: block;
  width: 0.94rem;
  height: 0.94rem;
  position: fixed;
  right: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/goTop.png) no-repeat;
  background-size: contain;
  z-index: 1000;
}
.refresh {
  display: block;
  width: 0.94rem;
  height: 0.94rem;
  position: fixed;
  left: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  z-index: 1000;
}
</style>


