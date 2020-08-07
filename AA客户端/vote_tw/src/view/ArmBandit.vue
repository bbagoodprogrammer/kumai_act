<template>
  <div class="box">
    <div class="header"></div>
    <h3>投票描述</h3>
    <div class="describeBox">
      <textarea name="" v-model="describe" id="describe" maxlength="300" placeholder="輸入描述，可幫助房間的用戶理解投票目的"></textarea>
      <span class="describeNum">{{describe.length}}/300</span>
    </div>
    <h3 class="optionTitle">投票選項 <u class="optionType" @click="setOptionType()">{{optionType?'自定義選項':'使用麥上用戶'}}</u></h3>
    <div v-if="!optionType">
      <div class="optionBox" v-for="(item,index) in option" :key="index">
        <i class="close" @click="delOption(index)" v-if="index != 0">x</i>
        <input type="text" maxlength="20" :placeholder="getp(index)" v-model="item.value" class="optionItem">
      </div>
      <div class="addOptions">
        <div class="add" @click="addOptions()">
          <i class="addIcon" v-if="!optionOver"></i>
          <span v-else>添加選項</span>
        </div>
        <p>最多20個選項，每個選項最多20個字</p>
      </div>
    </div>
    <div class="peopleList" v-else>
      <ul>
        <li class="pelpleItem" v-for="(item,index) in peopleList" :key="index">
          <i class="close" @click="delpeople(index)">x</i>
          <img v-lazy="item.avatar" alt="">
          <div class="nick">{{item.nick}}</div>
        </li>
      </ul>
    </div>
    <h3>投票設置</h3>
    <div class="pelpleType">
      <span class="title">誰可以投票</span>
      <span class="total" @click="setPeopleType(1)"><i :class="{act:peopleType == 1}"></i><strong>所有人</strong></span>
      <span class="other" @click="setPeopleType(2)"><i :class="{act: peopleType == 2}"></i><strong>麥上用戶</strong></span>
    </div>
    <div class="setLv">
      <div class="lvBox">
        <span>等級要求</span>
        <div id="lv">
          <input type="number" :style="{width:holderWidth+'px'}" v-model="choiceLv">
          <span v-if="choiceLv != ''">級</span>
        </div>
      </div>
      <p>选择多少级别以上可投票(不填不限制）</p>
    </div>
    <div class="setLv">
      <div class="lvBox">
        <span>投票時間</span>
        <div id="lv">
          <input type="number" :style="{width:timeWidth+'px'}" v-model="choiceTime">
          <span v-if="choiceTime != ''">分鐘</span>
        </div>
      </div>
      <p>选择多少分钟以后结束(不填不限制）</p>
    </div>
    <div class="commitBtn" :class="{act:couldCommit}" @click="commit()">發起</div>
    <div class="holder" ref="holderTop">
      <span ref="holder">{{choiceLv}}</span>
      <span ref="time">{{choiceTime}}</span>
    </div>
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import { callApp } from "../utils"
import store from "../store/stores"
export default {
  data() {
    return {
      holderWidth: 0,
      timeWidth: 0,
      describe: '',
      optionType: false,
      peopleType: 1,
      choiceLv: '',
      choiceTime: '',
      option: [
        {
          value: ''
        },
        {
          value: ''
        },
      ],
      peopleList: [
        {
          avatar: "http://img.17sing.tw/uc/img/head_100926_1576642434.png",
          nick: 'hsingfankkkkkkkkkkkk',
          uid: 100926
        },
        {
          avatar: "http://img.17sing.tw/uc/img/head_100926_1576642434.png",
          nick: 'hsingfankkkkkkkkkkkk',
          uid: 100926
        }
      ],
      rid: 0
    }
  },
  computed: {
    optionOver() {
      let isOver = true
      this.option.forEach(element => {
        if (element.value == '') {
          isOver = false
          return
        }
      });
      return isOver
    },
    options() {
      let arr = []
      if (!this.optionType) {
        this.option.forEach(element => {
          if (element.value != '') {
            arr.push(element.value)
          }
        });
      } else {
        this.peopleList.forEach(element => {
          arr.push(element.uid)
        });
      }
      return arr
    },
    couldCommit() {
      var c = false
      if (this.describe != '' && this.options.length >= 2) {
        c = true
      }
      return c
    }
  },
  watch: {
    choiceLv(val) {
      this.updateHolderWidth(2)
    },
    choiceTime(val) {
      this.updateHolderWidth(3)
    }
  },
  created() {
    window.setMicUids = async (res) => { //定义回调函数，让客户端来执行，获取productList数据
      var tempData = JSON.parse(res);
      this.peopleList = tempData.uids
    }
    this.getDefaultData()
  },
  mounted() {
    this.updateHolderWidth()
  },
  methods: {
    getDefaultData(val) { //初始化
      // api.getDefault().then(res => {
      //   const { response_status, response_data } = res.data
      //   if (response_status.code == 0) {

      //   } else {
      //     this.toast(response_status.error)
      //   }
      // })
    },
    addOptions() {
      if (this.option.length < 20) {
        this.option.push({
          value: ''
        })
      }
    },
    delOption(index) {
      this.option.splice(index, 1)
    },
    setPeopleType(val) {
      this.peopleType = val
    },
    delpeople(index) {
      this.peopleList.splice(index, 1)
    },
    setOptionType() {
      if (!this.optionType) {
        callApp('getMicUids');
      }
      this.optionType = !this.optionType
    },
    downApp() {
      APP()
    },
    goRule() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}`
    },
    getp(index) {
      return `選項${index + 1}`
    },
    commit() {
      let option_type = !this.optionType ? 1 : 2
      // let options = 
      if (this.describe == '') {
        this.toast("請填寫投票描述！")
      } else if (this.options.length <= 1) {
        this.toast("請填寫足夠的投票選項！")
      } else {
        store.dispatch("setloading", true) // 打开loading
        api.commitVote(this.describe, option_type, this.options, this.peopleType, this.choiceLv, this.choiceTime).then(res => {
          store.dispatch("setloading", false) // 打开loading
          if (res.data.response_data) {
            this.toast("投票已發起成功")
            setTimeout(() => {
              this.closeWeb()
            }, 800)
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      }
    },
    updateHolderWidth(index) {
      this.$nextTick(() => {
        setTimeout(() => {
          if (index == 2) {
            this.holderWidth = Math.max(20, this.$refs.holder.clientWidth * 1)
            return
          } else if (index == 3) {
            this.timeWidth = Math.max(20, this.$refs.time.clientWidth * 1)
            return
          }
          this.timeWidth = Math.max(20, this.$refs.holderTop.clientWidth)
          this.holderWidth = Math.max(20, this.$refs.holderTop.clientWidth)
        }, 0)

      });
    },
    closeWeb() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.JSInterface.closeWeb();
      } else {
        closeWeb();
      }
    }

  }
}
</script>
<style lang='scss'>
body::-webkit-scrollbar {
  width: 0;
}
.header {
  height: 0.8rem;
}
.box {
  max-width: 750px;
  overflow-x: hidden;
  position: relative;
  margin: auto;
  padding: 0 0.3rem;
}
.describeBox {
  position: relative;
  .describeNum {
    position: absolute;
    bottom: 0.26rem;
    right: 0.2rem;
    color: rgba(186, 186, 186, 1);
    font-size: 0.28rem;
  }
}
h3 {
  height: 0.88rem;
  line-height: 0.88rem;
  color: rgba(26, 26, 26, 1);
  font-size: 0.34rem;
  font-weight: bold;
  text-indent: 0.1rem;
}
#describe {
  width: 6.3rem;
  height: 1.62rem;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(230, 230, 230, 1);
  border-radius: 0.1rem;
  padding: 0.24rem 0.3rem;
}
.optionTitle {
  margin-top: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .optionType {
    color: rgba(9, 22, 255, 1);
    font-size: 0.3rem;
    font-weight: normal;
  }
}
.peopleList {
  .pelpleItem {
    width: 6.9rem;
    height: 0.8rem;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(230, 230, 230, 1);
    border-radius: 0.1rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.3rem;
    position: relative;
    .close {
      display: block;
      width: 0.32rem;
      height: 0.32rem;
      background: RGBA(253, 68, 69, 1);
      border-radius: 50%;
      text-align: center;
      line-height: 0.32rem;
      position: absolute;
      right: -0.16rem;
      top: -0.16rem;
    }
    img {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      margin-left: 0.19rem;
    }
    .nick {
      margin-left: 0.11rem;
      color: rgba(55, 55, 55, 1);
      max-width: 6.7rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
.optionBox {
  position: relative;
  .close {
    display: block;
    width: 0.32rem;
    height: 0.32rem;
    background: RGBA(253, 68, 69, 1);
    border-radius: 50%;
    text-align: center;
    line-height: 0.32rem;
    position: absolute;
    right: -0.16rem;
    top: -0.16rem;
  }
}
.optionItem,
.add {
  width: 6.3rem;
  height: 0.8rem;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(230, 230, 230, 1);
  border-radius: 0.1rem;
  font-size: 0.3rem;
  margin-bottom: 0.3rem;
  padding: 0 0.3rem;
  color: rgba(55, 55, 55, 1);
}
.add {
  margin-bottom: 0.12rem;
}
.addOptions {
  position: relative;
  margin-bottom: 0.4rem;
  input {
    margin-bottom: 0.12rem;
  }
  .add {
    display: flex;
    align-items: center;
    justify-content: center;
    .addIcon {
      width: 0.32rem;
      height: 0.32rem;
      background: url(../assets/img/addIcon.png);
      background-size: 100% 100%;
    }
  }
  p {
    font-size: 0.28rem;
    text-indent: 0.1rem;
    color: rgba(216, 216, 216, 1);
  }
}
.pelpleType {
  height: 0.62rem;
  display: flex;
  align-items: center;
  padding-left: 0.1rem;
  .title {
    color: rgba(155, 155, 155, 1);
  }
  span {
    color: rgba(62, 62, 62, 1);
    display: flex;
    align-items: center;
    &.total {
      margin-left: 0.8rem;
    }
    &.other {
      margin-left: 0.6rem;
    }
    i {
      display: block;
      width: 0.36rem;
      height: 0.31rem;
      background: url(../assets/img/setBlack.png);
      background-size: 100% 100%;
      margin-right: 0.06rem;
      &.act {
        background: url(../assets/img/set.png);
        background-size: 100% 100%;
      }
    }
  }
}
.setLv {
  margin-top: 0.2rem;
  padding-left: 0.1rem;
  .lvBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    #lv {
      display: flex;
      align-items: center;
      width: 5.19rem;
      max-width: 5.19rem;
      height: 0.8rem;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(230, 230, 230, 1);
      border-radius: 0.1rem;
      padding-left: 0.2rem;
      font-size: 0.28rem;
      input {
        height: 100%;
      }
      span {
        color: rgba(55, 55, 55, 1);
      }
    }
    span {
      color: rgba(144, 144, 144, 1);
      margin-left: 0.1rem;
    }
  }
  p {
    color: rgba(216, 216, 216, 1);
    font-size: 0.28rem;
    padding-left: 1.41rem;
    margin: 0.1rem 0 0.3rem 0;
  }
}
.commitBtn {
  width: 3.7rem;
  height: 0.8rem;
  background: rgba(230, 230, 230, 1);
  border: 1px solid rgba(0, 0, 0, 0);
  text-align: center;
  line-height: 0.8rem;
  font-size: 0.32rem;
  margin: 0.5rem auto 1.1rem;
  border-radius: 0.8rem;
  &.act {
    border: 1px solid rgba(0, 0, 0, 0);
    background: linear-gradient(
      313deg,
      rgba(252, 2, 116, 1) 0%,
      rgba(252, 82, 40, 1) 100%
    );
  }
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: rgba(216, 216, 216, 1);
}
input:-moz-placeholder,
textarea:-moz-placeholder {
  color: rgba(216, 216, 216, 1);
}
input::-moz-placeholder,
textarea::-moz-placeholder {
  color: rgba(216, 216, 216, 1);
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: rgba(216, 216, 216, 1);
}
.holder {
  width: 5.19rem;
  visibility: hidden;
  position: fixed;
  z-index: -1;
  span {
    display: inline-block;
    font-size: 0.3rem;
  }
}
</style>


