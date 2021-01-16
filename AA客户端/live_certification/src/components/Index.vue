<template>
  <div class="page">
    <div class="process">
      <span v-for="(item,index) in processTitle" :key="index">{{item}}</span>
      <div class="liner">
        <span class="store" :class="[{act:(stage!=4&& stage>= (index+1) ) || (stage==4 && index== 0)},'store' + index]" v-for="(item,index) in processTitle" :key="index"></span>
      </div>
    </div>
    <!-- 上傳身份證 -->
    <div class="stage1" v-if="stage == 1">
      <div class="uploadPhoto">
        <div class="uploadTips">
          <h3>{{lang.page_cardTips}}</h3>
          <div class="msg">{{lang.page_cardTips2}}</div>
        </div>
        <div class="uploadImg">
          <div class="imgBg" @click="callApp(1)" v-if="!idcard_img">
            <i class="addIcon"></i>
          </div>
          <img :src="idcard_img" alt="" v-else>
        </div>
      </div>
      <div class="uploadPhoto noBg">
        <div class="uploadTips">
          <h3>{{lang.page_examples}}</h3>
          <div class="msg">{{lang.page_examples_tip1}}</div>
        </div>
        <div class="uploadImg">
          <div class="imgBg card">
            <!-- <i class="addIcon"></i> -->
          </div>
        </div>
      </div>
      <div class="lastTips">
        {{lang.page_examples_tip2}}
      </div>
      <div class="nextBtn" :class="{act:idcard_img}" @click="idCardNext()">{{lang.page_next}}</div>
    </div>
    <!-- 上傳直播封面 -->
    <div class="stage2" v-else-if="stage == 2">
      <div class="uploadImg">
        <div class="imgBg" v-if="!liveImg" @click="callApp(2)">
          <span class="upTips">{{lang.page_upCover}}</span>
        </div>
        <img :src="liveImg" alt="" v-else>
      </div>
      <div class="tips">
        {{lang.page_upCover_tip1}}
        <span @click="goSkill()">{{lang.page_upCover_tip2}}</span>
      </div>
      <div class="commitTips">
        {{lang.page_upCover_tip3}}
        <span>{{lang.page_upCover_tip4}}</span>
      </div>
      <div class="nextBtn mt" :class="{act:liveImg}" @click="uploadImg()">{{lang.page_upCover_commit}}</div>
    </div>
    <!-- 第三階段 -->
    <div class="stage3" v-else-if="stage == 3">
      <div class="commitTips">
        <span class="tipsIcon" :class="{err:commitStatus == 0}"></span>
        <p class="commitMsg" v-html="commitMsg[commitStatus].replace('$',reject_reason)"></p>
      </div>
      <div class="nextBtn mt2 act" v-if="commitStatus== 0" @click="stage = 1">{{lang.page_upCover_tip6}}</div>
    </div>
    <!-- 身份已經驗證 -->
    <div class="stage3" v-else-if="stage == 4">
      <div class="commitTips">
        <span class="tipsIcon ipone"></span>
        <p class="commitMsg" v-html="commitMsg[2]"></p>
      </div>
      <div class="nextBtn mt2 act" @click="stage = 2">{{lang.page_next}}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getApplyStatus, applyAnchor } from '../apis';
import { getUrlString } from "../utils"
import { getUploadImg } from "../utils/getUploadImg"
import store from "../store"
export default {
  data() {
    return {
      stage: 1,
      commitStatus: 0, //0  已拒绝 1 已提交
      // processTitle: ['證件照', '直播封面圖', '提交審核'],
      // commitMsg: {
      //   0: '你的申請被拒絕 <br/>原因：B',
      //   1: '已成功提交申請<br/>請耐心等待，我們會盡快為你審核',
      //   2: '身份驗證已提交<br/> 無需重複提交，請直接進入下一步'
      // },
      reject_reason: '',  //已拒绝信息
      liveImg: '', //直播照片
      idcard_img: '', //身份证照片
    }
  },
  computed: {
    processTitle() {
      return this.lang.processTitle
    },
    commitMsg() {
      return this.lang.commitMsg
    }
  },
  created() {
    getApplyStatus().then(res => {
      //status 6已申请过（审核中），7已申请过（已拒绝），8未申请认证
      //reject_reason 此字段仅当 status = 7 时有效，拒绝原因：0无原因，1证件照不符合要求，2封面图不符合要求，3账号存在异常
      //idcard_verified 此字段仅当 status in (5,7,8) 时有效，1表示已验证过证件照，0表示未验证过
      if (res.data.response_data) {
        const { status, idcard_verified, reject_reason } = res.data.response_data
        this.reject_reason = reject_reason
        if (status == 7 || status == 6) {
          this.stage = 3
          status == 7 ? this.commitStatus = 0 : this.commitStatus = 1
        } else if (status == 8 && idcard_verified == 1) {
          this.stage = 4
        }
        // this.stage = 2
      } else {
        this.toast(res.data.response_status.error)
      }
    })
  },
  methods: {
    idCardNext() {
      if (!this.idcard_img) {
        this.toast(this.lang.page_commit_tip1)
      } else {
        this.stage = 2
      }
    },
    uploadImg() {
      if (!this.liveImg) {
        this.toast(this.lang.page_commit_tip2)
      } else {
        store.commit('updateLoading', true);
        applyAnchor(this.idcard_img, this.liveImg).then(res => {
          store.commit('updateLoading', false);
          if (res.data.response_data) {
            this.stage = 3
            this.commitStatus = 1
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      }

    },
    goSkill() {
      this.$router.push({ path: 'Skill' })
    },
    async callApp(type) {
      var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i); //ios终端
      let uid = getUrlString('uid')
      let token = getUrlString('token')
      let callback = type == 1 ? 'idCard' : 'liveCover'
      const resData = await getUploadImg({
        callback,
        lwRatio: 1,
        maxWidth: 1000,
        minWidth: 100
      })
      if (resData.code == 0) {
        if (type == 1) {
          this.idcard_img = resData.base64
        } else {
          this.liveImg = resData.base64
        }
      } else {
        this.toast(resData.error)
      }
      // window.Native.JSCall('onUploadPhoto', { 'uid': uid, 'token': token, 'callback': callBackKey, lwRatio: 1 }, (res) => {
      //   let resData = JSON.parse(res)
      //   if (resData.code == 0) {
      //     if (type == 1) {
      //       this.idcard_img = resData.base64
      //     } else {
      //       this.liveImg = resData.base64
      //     }
      //   } else {
      //     this.toast(resData.error)
      //   }
      // })
      // } else {
      //   JSInterface.uploadPhoto();
      //   this.loadImg(type)
      // WebView.loadUrl("javascript:onCreateFamilyComplete()");
      // JSInterface.onCreateFamilyComplete();
      // }
    },
    // async loadImg(type) {
    //   const base64ImgData = await onUploadPhoto()
    //   if (base64ImgData.code == 0) {
    //     if (type == 1) {
    //       this.idcard_img = base64ImgData.base64
    //     } else {
    //       this.liveImg = base64ImgData.base64
    //     }
    //   } else {
    //     this.toast(base64ImgData.error)
    //   }
    // }
  },
}
</script>

<style lang="scss" scoped>
.page {
  background: #ffffff;
  position: relative;
  .process {
    height: 1.28rem;
    display: flex;
    position: relative;
    > span {
      flex: 1;
      padding-top: 0.71rem;
      text-align: center;
      font-size: 0.28rem;
      color: #999999;
      &.act {
        color: rgba(17, 17, 17, 1);
      }
    }
    .liner {
      width: 5.08rem;
      height: 0.02rem;
      background: #eeeeee;
      position: absolute;
      top: 0.38rem;
      left: 1.21rem;
      .store {
        display: block;
        width: 0.1rem;
        height: 0.1rem;
        background: #ff8a8a;
        box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.16);
        border-radius: 50%;
        position: absolute;
        top: -0.04rem;
        &.store0 {
          left: 0;
          &.act {
            top: -0.13rem;
            left: -0.13rem;
          }
        }
        &.store1 {
          left: 2.49rem;
          &.act {
            top: -0.13rem;
            left: 2.36rem;
          }
        }
        &.store2 {
          right: 0;
          &.act {
            top: -0.13rem;
            right: -0.13rem;
          }
        }
        &.act {
          width: 0.28rem;
          height: 0.28rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        &.act::before {
          content: "";
          display: block;
          width: 0.1rem;
          height: 0.1rem;
          background: #ffffff;
          box-shadow: 0 0.01ren 0 rgba(0, 0, 0, 0.16);
          border-radius: 50%;
        }
      }
    }
  }
  .stage1 {
    .uploadPhoto {
      width: 6.9rem;
      height: 2.9rem;
      background: #ffffff;
      box-shadow: 0 0.04rem 0.2rem rgba(0, 0, 0, 0.1);
      border-radius: 0.2rem;
      margin: 0.3rem auto 0;
      display: flex;
      align-items: center;
      &.noBg {
        margin: 0.5rem auto 0;
        box-shadow: none;
      }
      .uploadTips {
        margin-left: 0.3rem;
        flex: 1;
        h3 {
          font-size: 0.32rem;
          font-weight: 500;
          color: rgba(17, 17, 17, 1);
        }
        .msg {
          color: rgba(153, 153, 153, 1);
          line-height: 0.45rem;
          margin-top: 0.1rem;
        }
      }
      .uploadImg {
        width: 3.78rem;
        height: 2.42rem;
        margin: 0 0.4rem 0 0.18rem;
        background: url(../img/uploadImgBg.png);
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        > img {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
        }
        .imgBg {
          width: 3.68rem;
          height: 2.32rem;
          background: #f3f7f9;
          border-radius: 0.12rem;
          display: flex;
          align-items: center;
          justify-content: center;
          &.card {
            width: 3.63rem;
            height: 2.3rem;
            background: url(../img/card2.png);
            background-size: 100% 100%;
          }
          .addIcon {
            display: block;
            width: 1.12rem;
            height: 1.12rem;
            background: url(../img/icon_add.png);
            background-size: 100% 100%;
          }
        }
      }
    }
    .lastTips {
      font-size: 0.28rem;
      color: #666;
      padding: 0 0.51rem;
      margin-top: 0.4rem;
    }
  }
  .stage2 {
    .uploadImg {
      width: 4rem;
      height: 4rem;
      background: #ffffff;
      border-radius: 0.12rem;
      margin: 0.3rem auto 0;
      position: relative;
      > img {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
      .imgBg {
        width: 100%;
        height: 100%;
        background: url(../img/card3.png);
        background-size: 100% 100%;
        position: relative;
        .upTips {
          width: 100%;
          height: 0.6rem;
          color: #fff;
          text-align: center;
          position: absolute;
          bottom: 0;
        }
      }
    }
    .tips {
      padding: 0 0.43rem;
      font-size: 0.28rem;
      color: rgba(102, 102, 102, 1);
      margin-top: 0.3rem;
      span {
        color: rgba(103, 160, 226, 1);
      }
    }
    .commitTips {
      text-align: center;
      font-size: 0.26rem;
      margin-top: 2.11rem;
      span {
        color: rgba(103, 160, 226, 1);
      }
    }
  }
  .stage3 {
    .commitTips {
      margin: 0.3rem auto 0;
      .tipsIcon {
        display: block;
        width: 1.6rem;
        height: 1.6rem;
        margin: 0 auto;
        background: url(../img/status_success.png);
        background-size: 100% 100%;
        &.err {
          background: url(../img/status_danger.png);
          background-size: 100% 100%;
        }
        &.ipone {
          background: url(../img/bind_ok.png);
          background-size: 100% 100%;
        }
      }
      .commitMsg {
        margin-top: 0.3rem;
        text-align: center;
        font-size: 0.28rem;
        color: rgba(102, 102, 102, 1);
        line-height: 0.48rem;
      }
    }
  }
  .nextBtn {
    width: 6.4rem;
    height: 0.86rem;
    text-align: center;
    line-height: 0.86rem;
    border-radius: 0.43rem;
    margin: 1.27rem auto 0;
    background: RGBA(216, 216, 216, 1);
    color: #fff;
    font-size: 0.32rem;
    font-weight: 500;
    &.act {
      background: linear-gradient(313deg, #fc0274 0%, #fc5228 100%);
    }
    &.mt {
      margin: 0.19rem auto 0;
    }
    &.mt2 {
      margin: 6.04rem auto 0;
    }
  }
}
</style>