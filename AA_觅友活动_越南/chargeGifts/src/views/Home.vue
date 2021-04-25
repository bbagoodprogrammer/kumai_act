<template>
  <div class="home__container">
    <div class="header">
      <div class="rule" @click="goRule">{{lang.rule}}</div>
      <div class="state" @click="goRecord">{{lang.record}}</div>
    </div>
    
    <img class="store_coin" src="../assets/images/store_coin.png" />

    <div class="main">
      
      <div class="award__des">{{lang.award_des}}</div>
      <div class="store__des" v-html="getStoreHtml"></div>

      <div class="main__box">
        
        <div class="">
          <div class="item__box" v-for="(item, index) in list" :key="index">

            <div v-if="item.prizes.length == 1">
              <div class="prize__box">
                <div class="prize__img__box" :class="{select_img: item.prizes[0].showLightImg}">
                  <img class="prize__img" :src="item.prizes[0].image" />
                </div>
                <div class="prize__info">
                  <div class="info__box">
                    <div>{{lang.acc_store.replace('%s', item.amount)}}</div>
                    <!-- <div v-if="item.prizes[0].count" class="info__name">{{lang.name.replace('{0}', item.prizes[0].name).replace('{1}', item.prizes[0].count)}}</div>
                    <div v-else-if="item.prizes[0].day" class="info__name">{{lang.name1.replace('{0}', item.prizes[0].name).replace('{1}', item.prizes[0].day)}}</div> -->
                    <div class="info__name">{{item.prizes[0].name}}</div>
                  </div>
                  <div class="btn store__btn" v-if="item.status == 0" @click="goStore">{{lang.go_store}}</div>
                  <div class="btn receive__btn" v-if="item.status == 1" @click="receiveRewards(item,index)">{{lang.receive_rewards}}</div>
                  <div class="btn received__btn" v-if="item.status == 2">{{lang.received_rewards}}</div>
                </div>
              </div>
            </div>

            <div v-if="item.prizes.length > 1">
              <div class="info__target">{{lang.acc_store.replace('%s', item.amount)}}</div>
              <div class="mul__prize__box">
                <div class="prize__item" v-for="(prize, prizeIndex) in item.prizes" :key="prizeIndex">
                  <div class="prize__img__box" :class="{select_img: prize.showLightImg}">
                    <img class="prize__img" :src="prize.image" />
                  </div>
                  <!-- <span v-if="prize.count" class="prize__name">{{lang.name.replace('{0}', prize.name).replace('{1}', prize.count)}}</span>
                  <span v-else-if="prize.day" class="prize__name">{{lang.name1.replace('{0}', prize.name).replace('{1}', prize.day)}}</span> -->
                  <span class="prize__name">{{prize.name}}</span>
                </div>
                <div class="btn store__btn btn__mul__prize" v-if="item.status == 0" @click="goStore">{{lang.go_store}}</div>
                <div class="btn receive__btn btn__mul__prize" v-if="item.status == 1" @click="receiveRewards(item,index)">{{lang.receive_rewards}}</div>
                <div class="btn received__btn btn__mul__prize" v-if="item.status == 2">{{lang.received_rewards}}</div>
              </div>
            </div>

          </div>
        </div>
        <div class="liner">
          <div class="liner__color">
            <span class="actLiner" :style="{height:actLinerWidth}"></span>
          </div>
        </div>
      </div>

    </div>

    <div class="statement">{{lang.statement}}</div>

    <RuleDialog v-if="ruleVisible" :visible.sync="ruleVisible">
      <div class="rule__dialog">
        <div class="title">{{lang.rule}}</div>
        <div class="des">{{lang.rule_des1}}</div>
        <div class="des">{{lang.rule_des2.replace('%s', ruleCoin)}}</div>
        <span class="explain">{{lang.rule_explain}}</span>
      </div>
    </RuleDialog>

    <Dialog v-if="recordVisible" :visible.sync="recordVisible">
      <div class="record__dialog">
        <div class="title">{{lang.record}}</div>
        <div class="list__box">
          <div class="list__item" v-for="(item, index) in recordList" :key="index">
            <div class="date">{{item.date}}</div>
            <div class="record" v-for="(record, recordIndex) in item.records" :key="recordIndex">
              <div class="prize__title">{{lang.acc_store.replace('%s', record.amount)}}</div>
              <div class="prize__des">{{record.prize}}</div>
              <div class="prize__time">{{record.time}}</div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>

    <ReceiveDialog v-if="receiveVisible" :visible.sync="receiveVisible" :prizes="prizes" />

    <img v-if="state == 1" @click="handlereFresh" class="refresh" :class="{rotate: refreshing}" src="../assets/images/refresh.png" />

  </div>
</template>

<script>
import Dialog from "@/components/Dialog.vue";
import RuleDialog from "@/components/RuleDialog.vue";
import ReceiveDialog from "@/components/ReceiveDialog.vue";
import lang from '@/config/lang';
import { getUrlString, loadImages, dateFormat, toast } from '@/utils';
import { InitData, Test, ReceiveRewards, Records } from '../request'
import callApp from '../utils/callApp'

export default {
  name: 'Home',

  components: {
    Dialog,
    RuleDialog,
    ReceiveDialog
  },

  data() {
    return {
      ruleVisible: false,
      recordVisible: false,
      receiveVisible: false,
      state: 1,
      list:[],
      processList: [],
      amount: 0,
      ruleCoin: '',
      recordList: [],
      prizes: '',
      refreshing: false
    }
  },

  computed: {
    lang: () => lang,
    actLinerWidth() {
      if (this.processList.length == 0) {
        return '0%'
      }
      const maxAmount = this.processList[this.processList.length - 1].amount
      const minAmount = this.processList[0].amount
      for (let i = this.processList.length - 1; i >= 0; i--) {
        if (this.amount >= maxAmount) {
          return "100%"
        } else if (this.amount < minAmount) {
          return "0%"
        } else if (this.amount >= this.processList[i].amount) {
          let c = this.processList[i + 1].amount - this.processList[i].amount
          let t = this.amount - this.processList[i].amount
          let a = t/c * 4.334
          return (4.334 * (i) + a )+ 'rem'
        }
      }
    },
    getStoreHtml () {
      return `${this.lang.current_store.replace('{0}', `<span>${this.amount}</span>`)}`
    }
  },


  created() {
    this.initData()
  },

  mounted() {
    loadImages(
        require('../assets/images/receive_dialog_bg.png'),
        require('../assets/images/dialog_bg.png')
    );
  },

  methods: {

    handlereFresh() {
      this.refreshing = true
      this.clear()
      setTimeout(() => {
        this.refreshing = false
      }, 1000)
      this.initData()
    },

    async initData () {
      let res = await InitData()
      let {response_status, response_data} = res.data
      if (response_status.code === 0) {
        this.handleTasks(response_data.tasks)
        this.amount = response_data.amount
        this.state = response_data.step
      }
    },

    clear () {
      // this.state = 0
      this.list = []
      this.processList = []
      this.amount = 0
      this.ruleCoin = ''
      this.recordList = []
      this.prizes = ''
    },

    handleTasks (tasks) {
      let list = []
      let ruleCoins = []
      for (const i in tasks) {
        // 处理名称
        tasks[i].prizes.forEach(item => {
          let name
          if (item.count) {
            name = this.lang.name.replace('{0}', item.name).replace('{1}', item.count)
          }
          if (item.day) {
            name = this.lang.name1.replace('{0}', item.name).replace('{1}', item.day)
          }
          if (item.type == 'gift') {
            name = name.replace('{2}', this.lang.gift)
          } else if(item.type == 'car') {
            name = name.replace('{2}', this.lang.car)
          } else {
            name = name.replace('{2}', this.lang.frame)
          }
          item.name = name
        })

        list.push({
          ...tasks[i],
          amount: i
        })
        ruleCoins.push(i)
      }

      // 处理底图
      list[0].prizes[0].showLightImg = true
      list[4].prizes[0].showLightImg = true
      list[5].prizes[1].showLightImg = true
      list[6].prizes[0].showLightImg = true
      list[6].prizes[1].showLightImg = true

      this.list = list
      console.log('list=>', this.list)
      this.ruleCoin = ruleCoins.join('、')
      this.processList = [...this.list]
      this.processList.unshift({
        amount: 0
      })
    },

    async receiveRewards (item, index) {
      let res = await ReceiveRewards({amount: item.amount})
      let {response_status, response_data} = res.data
      if (response_status.code === 0) {
        this.prizes = item.prizes
        this.receiveVisible = true
        item.status = 2
      } else {
        toast(response_status.error)
      }
    },

    goRule () {
      this.ruleVisible = true
    },

    async goRecord () {
      let res = await Records()
      let {response_status, response_data} = res.data
      if (response_status.code === 0) {
        let today = dateFormat('m-dd', new Date()) //今天
        let list = []
        response_data.list.forEach(item => {
          let listItem = {
            date: '',
            records: []
          }
          let date = dateFormat('m-dd', new Date(item.time  * 1000))

          let arr = date.split('-')
          let langDate = lang.date.replace('{0}', arr[0]).replace('{1}', arr[1])
          if (today == date) {
            listItem.date = lang.today
          } else {
            listItem.date = langDate
          }

          let listItemIndex = list.findIndex(item => item.date == listItem.date)
          if (listItemIndex == -1) {
            list.push(listItem)
          }

          // 把奖励转字符串
          let prizeArr = []
          item.prizes.forEach(item => {
            let name
            if (item.count) {
              name = this.lang.name.replace('{0}', item.name).replace('{1}', item.count)
            }
            if (item.day) {
              name = this.lang.name1.replace('{0}', item.name).replace('{1}', item.day)
            }
            if (item.type == 'gift') {
              name = name.replace('{2}', this.lang.gift)
            } else if(item.type == 'car') {
              name = name.replace('{2}', this.lang.car)
            } else {
              name = name.replace('{2}', this.lang.frame)
            }
            prizeArr.push(name)
          })
          item.prize = prizeArr.join('、')
          item.time = dateFormat('HH:MM', new Date(item.time  * 1000))

          let index = list.findIndex(item => item.date == listItem.date)
          if (index > -1) {
            list[index].records.push(item)
          }
        })
        this.recordList = list
        console.log('recordList=>', this.recordList)
        this.recordVisible = true
      }
    },

    goStore () {
      callApp.wallet()
    }

  }
}
</script>

<style lang="scss">
.home__container {
  background: #FF5813;
  min-height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  .refresh {
    width: 103px;
    height: 103px;
    position: fixed;
    left: 45px;
    bottom: 50px;
    z-index: 300;
  }
  .rotate {
    animation: rotate 1s ease;
  }
  @keyframes rotate {
    from {transform: rotate(0deg);}
	  to {transform: rotate(1080deg);}
  }
  .header {
    width: 750px;
    height: 545px;
    background-image: url('../assets/images/header_bg.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .rule {
      width: 147px;
      height: 59px;
      background-image: url('../assets/images/action_btn_bg.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 66px;
      position: absolute;
      right: -3px;
      top: 349px;
      font-size: 19px;
      font-weight: bold;
      color: #7D2D14;
    }
    .state {
      width: 147px;
      height: 59px;
      background-image: url('../assets/images/action_btn_bg.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 66px;
      position: absolute;
      right: -3px;
      top: 420px;
      font-size: 19px;
      font-weight: bold;
      color: #7D2D14;
    }
  }

  .store_coin {
      position: relative;
      top: 25px;
      z-index: 0;
      width: 740px;
      height: 190px;
      left: 50%;
      transform: translateX(-50%);
      margin-top: -75px;
    }

  .main {
    width: 725px;
    background: #FDDFB1;
    margin: 0 auto;
    border-radius: 30px;
    position: relative;
    z-index: 100;
    top: -10px;
    padding-bottom: 60px;
    margin-top: -2px;
    .award__des {
      font-size: 23px;
      font-weight: bold;
      color: #814A02;
      padding-top: 30px;
      padding-bottom: 20px;
      text-align: center;
    }
    .store__des {
      font-size: 23px;
      font-weight: bold;
      color: #814A02;
      padding-bottom: 30px;
      text-align: center;
      span {
        color: red;
      }
    }
    .main__box {
      display: flex;
      height: 100%;
      position: relative;
      z-index: 100;
      
      .item__box {
        width: 580px;
        position: relative;
        z-index: 10;
        margin-left: 25px;
        background: radial-gradient(circle at right top, transparent 20px, #ffffff 0) top right / 51% 51% no-repeat,
          radial-gradient(circle at left top, transparent 20px, #ffffff 0) top left / 51% 51% no-repeat,
          radial-gradient(circle at right bottom, transparent 20px, #ffffff 0) bottom right / 51% 51% no-repeat,
          radial-gradient(circle at left bottom, transparent 20px, #ffffff 0) bottom left / 51% 51% no-repeat;
      }
      .item__box::before {
        content: '';
        width:160px;
        height: 16px;
        background: url('../assets/images/hori_liner.png');
        background-size: 100% 100%;
        position: absolute;
        right: -100px;
        top: -6px;
        z-index: 2000;
      }
      .item__box::after {
        content: '';
        width: 540px;
        border-bottom: 1px dashed #F4B147;
        position: absolute;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0px;
        margin: auto;
      }
      .item__box:last-child {
        background: radial-gradient(circle at right top, transparent 20px, #ffffff 0) top right / 51% 100% no-repeat,
          radial-gradient(circle at left top, transparent 20px, #ffffff 0) top left / 51% 100% no-repeat;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
      }
      .item__box:first-child {
        background: 
          radial-gradient(circle at right bottom, transparent 20px, #ffffff 0) bottom right / 51% 100% no-repeat,
          radial-gradient(circle at left bottom, transparent 20px, #ffffff 0) bottom left / 51% 100% no-repeat;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
      }
      .item__box:first-child::before {
        width:0;
        height: 0;
      }
      .item__box:last-child::after {
        border: none;
      }

      .liner {
        width: 60px;
        position: absolute;
        top: -11px;
        bottom: -11px;
        right: 30px;
        border: 6px solid #FEBC00;
        border-radius: 35px;
        padding-top: 5px;
        padding-bottom: 5px;
        .liner__color {
          width: 50px;
          height: 100%;
          background: #D4A869;
          border-radius: 35px;
          margin-left: 5px;
          position: relative;
          .actLiner {
            display: block;
            width: 50px;
            border-radius: 35px;
            position: absolute;
            left: 0px;
            top: 0px;
            background: url('../assets/images/actLiner.png');
            background-size: 100% 100%;
          }
        }
        
      }
    }
  }

  .info__target {
    font-size: 26px;
    font-weight: bold;
    color: #F93D38;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 25px;
  }

  .mul__prize__box {
    display: flex;
    flex-wrap: wrap;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 120px;
    .prize__item {
      width: 166px;
      margin-left: 10px;
      margin-right: 10px;
      text-align: center;
      .prize__img__box {
        width: 166px;
        height: 166px;
        background: url('../assets/images/prize__box_bg.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        .prize__img {
          width: 150px;
          height: 150px;
        }
      }
      .select_img {
        background: url('../assets/images/select_img.png');
      }
      .prize__name {
        display: block;
        font-size: 26px;
        font-weight: 400;
        color: #A14D0F;
        margin-top: 15px;
      }
    }
  }

  .prize__box {
    display:flex;
    padding: 50px 0px 50px 40px;
    .prize__img__box {
      width: 225px;
      height: 225px;
      background: url('../assets/images/prize__box_bg.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      .prize__img {
        width: 200px;
        height: 200px;
      }
    }

    .select_img {
        background: url('../assets/images/select_img.png');
      }

    .prize__info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      flex: auto;
      .info__box {
        text-align: center;
        font-size: 26px;
        font-weight: bold;
        color: #F93D38;
        margin-top: 30px;
        .info__name {
          font-size: 26px;
          font-weight: 400;
          color: #A14D0F;
          margin-top: 15px;
        }
      }
  
    }
  }

  .btn {
    width: 220px;
    height: 62px;
    text-align: center;
    line-height: 62px;
    font-size: 23px;
    font-weight: bold;
  }
  .store__btn {
    background: url('../assets/images/go_store_bg.png');
    background-size:100% 100%;
    background-repeat: no-repeat;
    color: #FFFFFF;
  }
  .receive__btn {
    background: url('../assets/images/receive.png');
    background-size:100% 100%;
    background-repeat: no-repeat;
    color: #7D2D14;
  }
  .received__btn {
    background: url('../assets/images/received.png');
    background-size:100% 100%;
    background-repeat: no-repeat;
    color: #FFFFFF;
  }
  .btn__mul__prize {
    position: absolute;
    right: 30px;
    bottom: 30px;
  }

  .statement {
    font-size: 26px;
    text-align: center;
    padding-top: 30px;
    padding-bottom: 60px;
    color: #912203;
  }

  .rule__dialog {
    .title {
      color: #814A02;
      text-align: center;
      font-size: 48px;
      font-weight: bold;
      padding-top: 42px;
    }
    .des {
      line-height: 42px;
      color: #97672F;
      font-size: 30px;
      padding: 45px 80px 0 80px;
    }
    .explain {
      width: 500px;
      color: #966528;
      font-size: 26px;
      position: absolute;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .record__dialog {
    .title {
      color: #814A02;
      text-align: center;
      font-size: 48px;
      font-weight: bold;
      margin-top: 45px;
      height: 60px;
    }
    .list__box {
      height: 500px;
      overflow-y: auto;
      margin-left: 80px;
      margin-right: 80px;
      .list__item:first-child {
        margin-top: 30px;
      }
      .list__item {
        margin-top: 70px;
        .date {
          font-size: 35px;
          font-weight: 400;
          color: #814A02;
          font-weight: 500;
        }
        .record {
          display: flex;
          // justify-content:space-between;
          margin-top: 20px;
          font-size: 26px;
          //font-family: Adobe Heiti Std;
          font-weight: normal;
          color: #97672F;
          line-height: 42px;
          .prize__title {
            width: 255px;
          }
          .prize__des {
            //background: red;
            width: 255px;
          }
          .prize__time {
            flex: auto;
            text-align: right;
          }
        }
      }
    }
  }

}
</style>
