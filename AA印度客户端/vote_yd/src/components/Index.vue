<template>
  <div class="box">
    <!-- <div class="header"></div> -->
    <h3>{{lang.page_describe}}</h3>
    <div class="describeBox">
      <textarea name="" v-model="describe" id="describe" maxlength="300" :placeholder="lang.page_describe_tips"></textarea>
      <span class=" describeNum">{{describe.length}}/300</span>
    </div>
    <h3 class="optionTitle">{{lang.page_option}} <u class="optionType" @click="setOptionType()">{{optionType?lang.page_option_type1:lang.page_option_type2}}</u></h3>
    <div v-if="!optionType">
      <div class="optionBox" v-for="(item,index) in option" :key="index">
        <i class="close" @click="delOption(index)" v-if="index != 0">x</i>
        <input type="text" maxlength="20" :placeholder="getp(index)" v-model="item.value" class="optionItem">
      </div>
      <div class="addOptions">
        <div class="add" @click="addOptions()">
          <i class="addIcon" v-if="!optionOver"></i>
          <span v-else>{{lang.page_option_add}}</span>
        </div>
        <p>{{lang.page_option_addTips}}</p>
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
    <h3>{{lang.page_set}}</h3>
    <div class="pelpleType">
      <span class="title">{{lang.page_set_title}}</span>
      <span class="total" @click="setPeopleType(1)"><i :class="{act:peopleType == 1}"></i><strong>{{lang.page_set_type1}}</strong></span>
      <span class="other" @click="setPeopleType(2)"><i :class="{act: peopleType == 2}"></i><strong>{{lang.page_set_type2}}</strong></span>
    </div>
    <div class="setLv">
      <div class="lvBox">
        <span>{{lang.page_lv_title}}</span>
        <div id="lv">
          <input type="number" onkeyup="value=value.replace(/[^\d]/g,'')" onblur="value=value.replace(/[^\d]/g,'')" :style="{width:holderWidth+'px'}" v-model="choiceLv">
          <span v-if="choiceLv != ''">{{lang.page_lv}}</span>
        </div>
      </div>
      <p>{{lang.page_lv_tips}}</p>
    </div>
    <div class="setLv">
      <div class="lvBox">
        <span>{{lang.page_time}}</span>
        <div id="lv">
          <input type="number" onkeyup="value=value.replace(/[^\d]/g,'')" onblur="value=value.replace(/[^\d]/g,'')" :style="{width:timeWidth+'px'}" v-model="choiceTime">
          <span v-if="choiceTime != ''">{{lang.page_min}}</span>
        </div>
      </div>
      <p>{{lang.page_time_tips}}</p>
    </div>
    <div class="commitBtn" :class="{act:couldCommit}" @click="commit()">{{lang.page_go}}</div>
    <div class="holder" ref="holderTop">
      <span ref="holder">{{choiceLv}}</span>
      <span ref="time">{{choiceTime}}</span>
    </div>
  </div>
</template>

<script>

import { getUrlString } from "../utils"
import api from "../apis"
import { callApp } from "../utils"
import store from "../store"
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
      peopleList: [],
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
    goRule() {
      let regstr = getUrlString('token')
      location.href = `./index2.html?token=${regstr}`
    },
    getp(index) {
      return `${this.lang.page_option_nums}${index + 1}`
    },
    commit() {
      let option_type = !this.optionType ? 1 : 2
      // let options = 
      console.log(this.describe)
      if (this.describe == '') {
        this.toast(this.lang.page_commit_tip1)
      } else if (this.options.length <= 1) {
        this.toast(this.page_commit_tip2)
      } else {
        store.commit("updateLoading", true) // 打开loading
        api.commitVote(this.describe, option_type, this.options, this.peopleType, this.choiceLv, this.choiceTime).then(res => {
          store.commit("updateLoading", false) // 打开loading
          if (res.data.response_data) {
            this.toast(this.page_commit_tip3)
            setTimeout(() => {
              this.closeWeb()
            }, 300)
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
      background: url(../img/addIcon.png);
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
      margin-left: 0.4rem;
    }
    &.other {
      margin-left: 0.3rem;
    }
    i {
      display: block;
      width: 0.36rem;
      height: 0.31rem;
      background: url(../img/setBlack.png);
      background-size: 100% 100%;
      margin-right: 0.06rem;
      &.act {
        background: url(../img/set.png);
        background-size: 100% 100%;
      }
    }
    strong {
      flex: 1;
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
      width: 4.7rem;
      max-width: 4.7rem;
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
      flex: 1;
    }
  }
  p {
    color: rgba(216, 216, 216, 1);
    font-size: 0.28rem;
    padding-left: 1.88rem;
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


