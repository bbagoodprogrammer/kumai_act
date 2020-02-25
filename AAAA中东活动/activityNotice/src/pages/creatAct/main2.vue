<template>
  <div class="creatAct">
    <common-heard :title="title"></common-heard>
    <div class="actMsg">
      <div class="roomID">
        <div class="inputTitle">
          <em class="title">رقم الغرفة الذي يقام النشاط فيه</em>
          <em class="tips">(مهم جدا)</em>
          <i>*</i>
        </div>
        <div class="ingputItem">
          <input type="text" placeholder="املأ رقم الغرفة بالضبط" maxlength="10" v-model="roomId">
        </div>
      </div>
      <div class="actTheme">
        <div class="inputTitle">
          <em class="title">موضوع النشاط</em>
          <i>*</i>
        </div>
        <div class="ingputItem">
          <input type="text" placeholder="املأ موضوع النشاط" maxlength="10" v-model="actTheme">
          <span class="strNum">{{actTheme.length}}/10</span>
        </div>
      </div>
      <div class="actExplain">
        <div class="inputTitle">
          <em class="title">وصف النشاط</em>
          <i>*</i>
        </div>
        <div class="ingputItem">
          <textarea v-model="actExplain" placeholder="املأ وصف النشاط" maxlength="140"></textarea>
          <span class="strNum">{{actExplain.length}}/140</span>
        </div>
      </div>
      <div class="actTime">
        <div class="inputTitle">
          <em class="title">وقت النشاط (بتوقيت دبي)</em>
          <i>*</i>
        </div>
        <date-time></date-time>
      </div>
      <div class="actRules">
        <div class="inputTitle">
          <em class="title">قواعد النشاط</em>
        </div>
        <div class="ingputItem">
          <textarea v-model="rules" placeholder="املأ قواعد النشاط" maxlength="300"></textarea>
          <span class="strNum">{{rules.length}}/300</span>
        </div>
      </div>
      <div class="actWards">
        <div class="inputTitle">
          <em class="title">مكافأة النشاط</em>
          <i>*</i>
        </div>
        <div class="ingputItem">
          <textarea v-model="wards" placeholder="املأ قواعد النشاط" maxlength="140"></textarea>
          <span class="strNum">{{wards.length}}/140</span>
        </div>
      </div>
      <div class="upType">شكل نشر النشاط</div>
      <div class="typeItem">
        <span class="singUp">التسجيل</span>
        <span class="subscribe">ضرب الموعد</span>
      </div>
      <div class="tipsMsg">
        <div class="titel">ملاحظات</div>
        <p>1. التسجيل : يعني أن المستخدم بحاجة إلى ملء معلومات التسجيل، ثم يختار المنشئ للنشاط المستخدمين المشاركين في النشاط وفقًا لمعلومات التسجيل المملوءة؛</p>
        <p>2.ضرب الموعد: يعني أنه يمكن المستخدم تلقي تذكير من مساعد الغناء للاشتراك في النشاط بعد ضرب الموعد للنشاط قبل 5 دقائق من بداية النشاط. </p>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeard from "../../components/CommonHeard"
import DateTime from "../../components/DateTime"
export default {
  components: { CommonHeard, DateTime },
  data() {
    return {
      title: `إنشاء النشاط`,
      roomId: '',
      actTheme: '',
      actExplain: '',
      rules: '',
      wards: ''
    }
  }
}
</script>

<style lang="scss">
body {
  direction: rtl;
  .actMsg {
    margin-top: 0.3rem;
    padding: 0 0.3rem 0.55rem;
    .roomID {
      height: 1.7rem;
      padding: 0 0.24rem;
      box-shadow: 0 0 0.15rem 0 rgba(0, 0, 0, 0.1);
      .ingputItem {
        width: 6.4rem;
        height: 0.31rem;
        display: flex;
        input {
          width: 6.4rem;
          height: 0.51rem;
          border: none;
          outline: none;
          padding-right: 0.14rem;
          background: rgba(242, 242, 242, 1);
        }
      }
    }
    .actTheme {
      height: 1.7rem;
      padding: 0 0.24rem;
      margin-top: 0.3rem;
      box-shadow: 0 0 0.15rem 0 rgba(0, 0, 0, 0.1);
      .ingputItem {
        width: 6.4rem;
        height: 0.71rem;
        display: flex;
        input {
          width: 6.4rem;
          height: 0.51rem;
          border: none;
          outline: none;
          padding-right: 0.14rem;
          background: rgba(242, 242, 242, 1);
        }
        .strNum {
          background: rgba(242, 242, 242, 1);
          color: #818181;
          font-size: 60%;
          line-height: 0.6rem;
          padding-left: 0.15rem;
        }
      }
    }
    .actExplain {
      height: 3.3rem;
      padding: 0 0.24rem;
      margin-top: 0.3rem;
      box-shadow: 0 0 0.15rem 0 rgba(0, 0, 0, 0.1);
      .ingputItem {
        position: relative;
        textarea {
          width: 6.26rem;
          height: 1.91rem;
          background: rgba(242, 242, 242, 1);
          border: none;
          outline: none;
          resize: none;
        }
        .strNum {
          color: #818181;
          font-size: 60%;
          position: absolute;
          left: 0.15rem;
          bottom: 0.15rem;
        }
      }
    }
    .actTime {
      height: 2.36rem;
      padding: 0 0.24rem;
      margin-top: 0.3rem;
      box-shadow: 0 0 0.15rem 0 rgba(0, 0, 0, 0.1);
    }
    .actRules {
      height: 4.11rem;
      padding: 0 0.24rem;
      margin-top: 0.3rem;
      box-shadow: 0 0 0.15rem 0 rgba(0, 0, 0, 0.1);
      .ingputItem {
        position: relative;
        textarea {
          width: 6.26rem;
          height: 2.72rem;
          background: rgba(242, 242, 242, 1);
          border: none;
          outline: none;
          resize: none;
        }
        .strNum {
          color: #818181;
          font-size: 60%;
          position: absolute;
          left: 0.15rem;
          bottom: 0.15rem;
        }
      }
    }
    .actWards {
      height: 3.3rem;
      padding: 0 0.24rem;
      margin-top: 0.3rem;
      box-shadow: 0 0 0.15rem 0 rgba(0, 0, 0, 0.1);
      .ingputItem {
        position: relative;
        textarea {
          width: 6.26rem;
          height: 1.91rem;
          background: rgba(242, 242, 242, 1);
          border: none;
          outline: none;
          resize: none;
        }
        .strNum {
          color: #818181;
          font-size: 60%;
          position: absolute;
          left: 0.15rem;
          bottom: 0.15rem;
        }
      }
    }
    input,
    textarea {
      color: #000;
      padding: 0.1rem 0.1rem 0.1rem 0;
    }
    .inputTitle {
      height: 0.76rem;
      display: flex;
      align-items: center;
      .title {
        color: #484848;
        font-size: 108%;
      }
      .tips {
        color: #818181;
        font-size: 80%;
      }
      i {
        color: #ff5c4e;
        font-size: 80%;
      }
    }
    .upType {
      height: 1.04rem;
      background: url(../../assets/img/typeBg.png);
      background-size: 100% 100%;
      font-size: 110%;
      text-align: center;
      line-height: 1.04rem;
    }
    .typeItem {
      width: 6rem;
      margin: 0.55rem auto 0;
      height: 0.64rem;
      display: flex;
      justify-content: space-between;
      span {
        width: 2.16rem;
        height: 0.64rem;
        background: url(../../assets/img/typeItem.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.64rem;
        font-size: 113%;
      }
    }
    .tipsMsg {
      margin-top: 0.55rem;
      font-size: 96%;
      color: #333333;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
