<template>
  <div class="page pageIndex">
    <div class="default_type" v-if="type==1">
      <div class="sex_default_img" :class="{woman:sex == 1}"></div>
      <h3 class="tips_title">{{lang.tips_title}}</h3>
      <div class="tips">
        <div class="tips_item" v-for="(item,index) in img_tipsArr" :key="index">
          <i>{{index+1}}</i>
          <span>{{item}}</span>
        </div>
      </div>
      <div class="photograph" @click="playPhoto('user_cover')">
        {{lang.photograph}}
      </div>
    </div>
    <div class="has_img" v-else-if="type == 2">
      <div class="img_change">
        <div class="nowImg">
          <img :src="avatar" alt="">
          <span class="img_tips" @click="eidpersonalDetails()"> {{lang.nowImg}} <i></i></span>
        </div>
        <div class="changImg">
          <img :src="new_avatar" alt="">
          <span class="img_tips" @click="playPhoto('user_cover')">{{lang.changImg}}<i></i></span>
        </div>
      </div>
      <div class="chang_title">
        {{lang.chang_title}}
      </div>
      <div class="commit" @click="upload()">{{lang.commit}}</div>
    </div>
    <div class="suc_tips" v-else-if="type == 3">
      <img src="../img/suc_icon.png" alt="" class="suc_icon">
      <div class="suc_title">
        {{lang.suc_title}}
      </div>
      <div class="suc_tips"> {{lang.suc_tips}}</div>
    </div>
    <div class="suc_tips" v-else-if="type == 4">
      <img src="../img/examine.png" alt="" class="examine">
      <div class="suc_title mt">
        {{lang.examineIng}}
      </div>
      <div class="suc_tips"> {{lang.examine_tips}}</div>
    </div>
    <!-- <input type="file" name="" id="" capture="camera" class="file_img" ref="file_img" accept="image/*" @change="photo($event)"> -->
  </div>
</template>

<script>


import { commitImg, auditRealStatus } from "../apis"
import { uploadPhoto } from "../utils/uploadPhotoMiyou"
import store from "../store"
import { mapState } from "vuex"

window.refreshHomePage = function () {
  store.dispatch('getInitInfo');
  //   window.location.reload(true)
}

export default {
  data () {
    return {
      //   sex: 0,
      type: -1, //1初始狀態, 2已提交照片  3已通過
      //   img_tipsArr: [
      //     '請模仿示意圖拍攝認證照片；',
      //     '真人認證照片需和頭像保持一致，否則無效；',
      //     '通過認證後，聊天粉鑽收益翻倍；',
      //     '拍攝照片僅作認證審核作用，官方將嚴格保密；'
      //   ],
      //avatar: '',
      new_avatar: '',
      blob: '',
      //   errorTips: {
      //     10001: '图片不能超过2M',
      //     10002: '图片手势认证失败',
      //     10003: '图片不符合（最小 300*300 像素，最大 4096*4096 像素。图片短边不得低于 300 像素。最大2MB）要求',
      //     10004: '图片上传失败',
      //     10005: '请求频繁'
      //   }
    }
  },
  computed: {
    ...mapState(['avatar', 'sex']),
    img_tipsArr () {
      return this.lang.img_tipsArr
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      //   getInitInfo().then(res => {
      //     this.avatar = res.data.response_data.avatar
      //     this.sex = res.data.response_data.sex
      //   })
      //审核状态
      auditRealStatus().then(res => {
        if (res.data.response_data) {
          let status = res.data.response_data.status //0不通过，1审核中,2通过 3手势错误
          if (status == 2) {
            this.type = 3
          } else if (status == 1) {
            this.type = 4
          } else {
            this.type = 1
          }
        }
      })
    },
    async playPhoto (key) {
      let obj = {
        callback: key,
        cameraFacing: 1  //调用前置摄像头
      }
      uploadPhoto(obj).then(res => {
        if (res.base64) {
          this.type = 2
          //   if (res.callback == 'user_avatar') {
          //     this.avatar = res.base64
          //   } else
          if (res.callback == 'user_cover') {
            this.new_avatar = res.base64
          }
        }
      })
      //   const file = el.target.files[0]
      //   var type = file.type.split('/')[0];
      //   var filesize = file.size;
      //   //   alert(filesize)
      //   if (type === 'image') {
      //     //将图片img转化为base64
      //     var reader = new FileReader();
      //     reader.readAsDataURL(file);
      //     reader.onloadend = () => {
      //       let dataURL = reader.result;
      //       this.new_avatar = dataURL
      //       //   this.blob = this.dataURItoBlob(dataURL);
      //       if (filesize > 2101440) {
      //         this.toast('上傳圖片不得大於2M,請重新上傳！');
      //       } else {
      //         this.type = 2
      //       }
      //     };
      //   } else {
      //     this.toast('上傳了非圖片');
      //   }
    },
    // playPhoto () {
    //   //   this.$refs.file_img.click()
    //   this.photo()
    // },
    // dataURItoBlob (dataURI) {
    //   // base64 解码
    //   let byteString = window.atob(dataURI.split(',')[1]);
    //   let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    //   let T = mimeString.split('/')[1];
    //   let ab = new ArrayBuffer(byteString.length);
    //   let ia = new Uint8Array(ab);
    //   for (let i = 0; i < byteString.length; i++) {
    //     ia[i] = byteString.charCodeAt(i);
    //   }
    //   return new Blob([ab], { type: mimeString });
    // },
    upload () {
      store.commit("updateLoading", true);
      commitImg(this.new_avatar).then(res => {
        store.commit("updateLoading", false);
        if (res.data.response_data === 0) {
          this.type = 4
        } else {
          //   this.toast(this.errorTips[res.data.response_status.code])
          this.toast(res.data.response_status.error)
        }
      })
    },
    eidpersonalDetails () {
      const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      if (ios) {
        sendJsData('app://eidpersonalDetails');
      } else {
        javascript: JSInterface.sendJsData('app://eidpersonalDetails');
        // javascript:JSInterface.sendJsData('app://gotoPage?data={"page":"com.utalk.hsing.activity.UserInfoActivity","datas":[]}');
      }
    }
  }
}
</script>

<style lang="scss">
.file_img {
  display: none;
}
.pageIndex {
  .default_type {
    padding-top: 0.6rem;
    .tips_title {
      min-height: 0.5rem;
      font-size: 0.36rem;
      font-weight: bold;
      color: #2C2B36;
      text-align: center;
      margin: 0.6rem auto 0.3rem;
    }
    .tips {
      padding: 0 0.3rem;
      color: rgba(114, 88, 254, 1);
      font-size: 0.26rem;
      .tips_item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 0.1rem;
        line-height: 0.4rem;
        i {
          width: 0.3rem;
          height: 0.3rem;
          line-height: 0.29rem;
          background: url(../img/num_tips.png);
          background-size: 100% 100%;
          text-align: center;
          color: #fff;
          font-size: 0.24rem;
          margin: 0.1rem 0.1rem 0 0;
        }
        span {
          flex: 1;
        }
      }
    }
    .photograph {
      width: 5rem;
      height: 0.88rem;
      background: linear-gradient(90deg, #7A68F8 0%, #9585FF 100%);
      box-shadow: 0 0.05rem 0.16rem rgba(122, 104, 248, 0.25);
      border-radius: 0.44rem;
      text-align: center;
      line-height: 0.88rem;
      font-size: 0.32rem;
      //   margin: 1.36rem auto 0;
      position: fixed;
      bottom: 0.5rem;
      left: 1.25rem;
    }
  }
  .has_img {
    padding-top: 0.6rem;
    .img_change {
      padding: 0 0.3rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > div {
        width: 3.35rem;
        height: 3.35rem;
        border-radius: 0.2rem;
        overflow: hidden;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .img_tips {
          padding: 0 0.26rem;
          height: 0.6rem;
          background: #BCBBC7;
          border-radius: 0 0.2rem 0 0.2rem;
          display: flex;
          font-size: 0.28rem;
          align-items: center;
          position: absolute;
          bottom: 0;
          left: 0;
          i {
            width: 0.42rem;
            height: 0.42rem;
            background: url(../img/change_icon.png);
            background-size: 100% 100%;
          }
        }
      }
      .changImg {
        .img_tips {
          background: linear-gradient(180deg, #18DEBF 0%, #1BE5E6 100%);
        }
      }
    }
    .chang_title {
      font-size: 0.36rem;
      font-weight: bold;
      line-height: 0.54rem;
      color: #2C2B36;
      text-align: center;
      padding: 0 0.51rem;
      margin: 1.17rem auto 0;
    }
    .commit {
      width: 5rem;
      height: 0.88rem;
      background: linear-gradient(90deg, #7A68F8 0%, #9585FF 100%);
      box-shadow: 0 0.05rem 0.16rem rgba(122, 104, 248, 0.25);
      border-radius: 0.44rem;
      text-align: center;
      line-height: 0.88rem;
      font-size: 0.32rem;
      //   margin: 2.9rem auto 0;
      position: fixed;
      bottom: 0.5rem;
      left: 1.25rem;
    }
  }
  .suc_tips {
    .suc_icon {
      width: 2rem;
      height: 2rem;
      margin: 1.5rem auto 0;
    }
    .suc_title {
      font-size: 0.36rem;
      color: #2C2B36;
      font-weight: bold;
      text-align: center;
      margin-top: 2.38rem;
      &.mt {
        margin-top: 1.5rem;
      }
    }
    .suc_tips {
      font-size: 0.26rem;
      color: #BCBBC7;
      text-align: center;
      margin-top: 0.3rem;
      line-height: 0.46rem;
    }
    .examine {
      width: 5rem;
      height: 3.8rem;
      margin: 0.6rem auto 0;
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>