<template>
  <div class="rules">
    <div class="ruleHeader">
      <div class="tabs">
        <span @click="closeRule()" class="closeIcon"></span>
        القواعد
        <em class="liner"></em>
        <i class="linerItem"></i>
      </div>
    </div>
    <div class="ruleItem">
      <div class="item">
        <span class="Tip"></span>
        <p>يمكن جري اليانصيب لمرة واحدة بعد نقر "GO"، ويمكن جري اليانصيب لعشر مرات(أوفر الجوائز وأكبر النسبة للحصول على الجائزة الفاخرة)</p>
        <div class="ruleGo"></div>
      </div>
      <div class="item item2">
        <span class="Tip2"></span>
        <p>الحصول على النتيجة اليانصيب وتوزيع الجوائز على مواقع مختلفة من الحساب وفقًا لنوع الجوائز</p>
        <div class="ruleWard"></div>
        <h6>وصف لمواقع الجوائز</h6>
        <p>هدايا للحقيبة: وجودها في【أنا - حقيبة】، يمكن إهداء هذه الهدايا في غرف الدردشة</p>
        <p>السيارة للدخول: وجودها في【أنا - مركبات لدخول】، ستظهر صلاحية هذه السيارة في صفحة مركبات لدخول</p>
        <p>تذكرة الهدايا: وجودها في 【أنا - حقيبة】، ستظهر صلاحية هذه التذكرة في صفحة تذكرة الهدايا</p>
        <p>VIP: وجودها في 【أنا - مركز VIP】، ستظهر صلاحيته في مركز VIP</p>
        <p>فول ذهبي وعملة ذهبية: وجودها في 【أنا - الشحن】</p>
      </div>
      <div class="item item3">
        <span class="Tip3"></span>
        <p>الاشتراك في اليانصيب من القرص الدوار الذهبي بصرف العملات، الاشتراك في اليانصيب من القرص الدوار الفضي بصرف الفولات، يمكن اختيار درجات مختلفة لليانصيب من خلال نقر القرص الدوار الفضي أو الذهبي</p>
        <div class="lastImgBox">
          <div class="imgTop">
            <span class="gold">القرص الدوار الذهبي</span>
            <i class="arrow"></i>
            <span class="silver">القرص الدوار الفضي</span>
            <em class="liner"></em>
            <i class="linerItem"></i>
          </div>
          <div class="imgBtoom">
            <div class="imgl"></div>
            <div class="imgr"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    closeRule() {
      this.$emit('closeRules')
    }
  }
}
</script>
<style lang="scss" scoped>
.rules {
  width: 7.5rem;
  height: 7.5rem;
  background: #4f0078;
  overflow-x: hidden;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  overflow: hidden;
  padding-bottom: 1.5rem;
  .ruleHeader {
    .tabs {
      width: 6.17rem;
      height: 0.96rem;
      margin: 0 auto;
      text-align: center;
      line-height: 0.96rem;
      font-size: 120%;
      color: #fff9a0;
      position: relative;
      /* display: flex;
      align-items: center;
      justify-content: center; */
      .closeIcon {
        display: block;
        width: 0.18rem;
        height: 0.3rem;
        background: url(../assets/img/backArrow.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.34rem;
        right: -0.42rem;
        transform: rotate(180deg);
      }
      .liner {
        display: block;
        width: 100%;
        height: 0.02rem;
        position: absolute;
        bottom: 0;
        background: rgba(255, 255, 255, 1);
        opacity: 0.05;
      }
      .linerItem {
        display: block;
        width: 0.68rem;
        height: 0.02rem;
        background: #dcd097;
        opacity: 0.5;
        position: absolute;
        left: 2.75rem;
        bottom: 0;
      }
    }
  }
  .ruleItem {
    padding: 0.25rem 0.68rem 0 0.48rem;
    height: 7.7rem;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    .item {
      position: relative;
      .Tip {
        display: block;
        width: 0.35rem;
        height: 0.35rem;
        background: url(../assets/img/ruleTips1.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.1rem;
        right: -0.45rem;
      }
      .Tip2 {
        display: block;
        width: 0.35rem;
        height: 0.35rem;
        background: url(../assets/img/ruleTips2.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.1rem;
        right: -0.45rem;
      }
      .Tip3 {
        display: block;
        width: 0.35rem;
        height: 0.35rem;
        background: url(../assets/img/ruleTips3.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.1rem;
        right: -0.45rem;
      }
    }
    .item2 {
      margin-bottom: 0.54rem;
      h6 {
        color: #bbfdff;
        font-size: 85%;
      }
      p {
        color: #e1c7ff;
        margin-top: 0.15rem;
      }
    }
    .item3 {
      padding-bottom: 0.5rem;
      p {
        font-size: 80%;
        color: #fbf7ff;
      }
      .lastImgBox {
        .imgTop {
          height: 1rem;
          line-height: 1rem;
          display: flex;
          position: relative;
          span {
            display: block;
            width: 50%;
            text-align: center;
            &.gold {
              font-size: 110%;
              color: #fff9a0;
            }
            &.silver {
              font-size: 100%;
              // color: #fff9a0;
            }
          }
          .liner {
            display: block;
            width: 100%;
            height: 0.02rem;
            position: absolute;
            bottom: 0;
            background: rgba(255, 255, 255, 1);
            opacity: 0.05;
          }
          .linerItem {
            display: block;
            width: 0.68rem;
            height: 0.02rem;
            background: #dcd097;
            opacity: 0.5;
            position: absolute;
            left: 4.4rem;
            bottom: 0;
          }
          .arrow {
            display: block;
            width: 0.53rem;
            height: 0.64rem;
            background: url(../assets/img/arrow.png);
            background-size: 100% 100%;
            position: absolute;
            left: 2.84rem;
            top: 0.5rem;
          }
        }
        .imgBtoom {
          margin-top: 0.21rem;
          display: flex;
          justify-content: center;
          .imgl {
            width: 2.68rem;
            height: 2.71rem;
            background: url(../assets/img/silverTrun.png);
            background-size: 100% 100%;
            margin-left: 0.31rem;
          }
          .imgr {
            width: 2.68rem;
            height: 2.71rem;
            background: url(../assets/img/goldTrun.png);
            background-size: 100% 100%;
          }
        }
      }
    }
    .ruleGo {
      width: 2.91rem;
      height: 2.94rem;
      background: url(../assets/img/ruleGo.png);
      background-size: 100% 100%;
      margin: 0.49rem auto;
    }
    .ruleWard {
      width: 3.88rem;
      height: 3.06rem;
      background: url(../assets/img/ruleWard.png);
      background-size: 100% 100%;
      margin: 0.48rem auto 0.38rem;
    }
    p {
      color: #fbf7ff;
      font-size: 72%;
    }
  }
  .ruleItem::-webkit-scrollbar {
    width: 0;
  }
}
</style>
