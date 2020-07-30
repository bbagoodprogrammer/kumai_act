<template>
  <div class="box">
    <div class="header"></div>
    <h3>投票描述</h3>
    <div class="describeBox">
      <textarea name="" v-model="describe" id="describe" placeholder="輸入描述，可幫助房間的用戶理解投票目的"></textarea>
      <span class="describeNum">{{describe.length}}/300</span>
    </div>
    <h3 class="optionTitle">投票選項 <u class="optionType" @click="setOptionType()">{{optionType?'使用麥上用戶':'自定義選項'}}</u></h3>
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
    <div class="commitBtn act" @click="commit()">發起</div>
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
          avatar: '',
          nick: 'ddddddddddddddddddddd'
        },
        {
          avatar: '',
          nick: 'ddddddddddddddddddddd'
        }
      ]
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
      console.log(this.option)
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
          console.log(this.$refs.holder)
          this.timeWidth = Math.max(20, this.$refs.holderTop.clientWidth)
          this.holderWidth = Math.max(20, this.$refs.holderTop.clientWidth)
        }, 0)

      });
    },
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


