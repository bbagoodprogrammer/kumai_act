 <template>
  <div class="lanCon">
    <div class="landBox">
      <land v-for="(item,index) in land_info" :key="index" :info="item" :userLv="userLv"></land>
    </div>
    <div class="functionBtn">
      <div class="getWater" :class="{black:!userMsg.registered}" @click="showTasks()">
        <strong>剩餘水瓶：{{userMsg.water_count}}</strong>
      </div>
      <div class="getFunction" :class="{black:!userMsg.registered}" @click="showProp()"></div>
    </div>
    <!-- 升級彈窗 -->
    <div class="mask" v-if="upgrading">
      <transition name="slide">
        <div class="surprise" v-show="upgrading">
          <i class="close" @click="closeUpgrading()"></i>
          <img :src="require(`../assets/img/supriseDeer/title${userLv}.png`)" alt="" class="title">
          <div class="userLv">
            <i>LV{{userLv}}</i>
            <em>成長值達到{{lvArr[userLv - 1]}}</em>
          </div>
          <img :src="require(`../assets/img/supriseDeer/deer${userLv}.png`)" alt="" class="deerImg">
          <div class="deerTips">
            {{supriseMsg[userLv -1]}}
          </div>
          <div class="shareBtn" @click="share()" :class="'share'+userLv"></div>
        </div>
      </transition>
    </div>
    <!-- 水瓶任務 -->
    <div class="mask" v-show="showDayTasks">
      <transition name="slide">
        <DayTasks v-if="showDayTasks" @closeTaskList="closeTaskList" />
      </transition>
    </div>
    <!-- 道具任務 -->
    <div class="mask" v-show="showPropList">
      <transition name="slide">
        <PropList v-if="showPropList" @closePropList="closePropList" />
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import Land from "./Land"
import DayTasks from "./DayTasks"
import PropList from "./PropList"
import api from "../api/apiConfig"
import share from "../utils/share"
import { globalBus } from '../utils/eventBus'
export default {
  components: { Land, DayTasks, PropList },
  data() {
    return {
      upgrading: false,
      supriseMsg: [
        '',
        '每天照鏡子自己顏值忽高忽低的,第一眼美第二眼更美',
        '我只想談個戀愛，又不是要統治世界，這麼難嗎！',
        '同一首歌，我會美聲唱法、民族唱法、流行唱法和走音唱法',
        '我自言自語六級、心裡話八級、熬夜杯九次奪冠、這麼厲害的我！'
      ],
      first: true,
      showDayTasks: false,
      showPropList: false,
    }
  },
  computed: {
    ...mapState(['land_info', 'userMsg', 'lvArr', 'propMissions']),
    userLv() {
      for (let i = this.lvArr.length; i >= 0; i--) {
        if (this.userMsg.deer_exp >= this.lvArr[i]) {
          return i + 1
        }
      }
      return this.userMsg.deer_level
    }
  },
  watch: {
    userLv(val) {
      if (this.first) {
        this.first = false
        return
      }
      setTimeout(() => {
        this.upgrading = true
      }, 2200)
      this.vxc('updatAniImg', val)
    }
  },
  created() {
    globalBus.$on('shareSuc', (callback) => {
      this.closeUpgrading()
    })
  },
  methods: {
    closeUpgrading() {
      this.upgrading = false
    },
    showTasks() {
      if (this.userMsg.registered) {
        this.showDayTasks = true
      }
    },
    closeTaskList() {
      this.showDayTasks = false
    },
    showProp() {
      if (this.userMsg.registered) {
        api.propTasks().then(res => {
          this.vxc('setPropMissions', res.data.response_data)
          this.showPropList = true
        })
      }
    },
    closePropList() {
      this.showPropList = false
    },
    share() {
      var obj = {
        name: this.userMsg.nick,
        lv: this.userLv,
        avatar: this.userMsg.avatar
      }
      var t = window.btoa(window.encodeURIComponent(JSON.stringify(obj)))//编码
      //var d = JSON.parse(window.decodeURIComponent(window.atob(encodeData)))
      share({
        from: `2_${this.userLv * 100}`,
        url: `http://activity.udateapp.com/static_html/2020/raisingDeer/index.html?type=2&t=${t}`,
        title: '我正在養梅花鹿，很好玩！也送你一隻鹿寶寶',
        desc: '我正在養梅花鹿，很好玩！也送你一隻鹿寶寶',
        image: 'http://activity.udateapp.com/static_html/2020/raisingDeer/share.jpg'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.lanCon {
  width: 6.88rem;
  height: 8.94rem;
  margin: 0 auto;
  background: url(../assets/img/landBox.png);
  background-size: 100% 100%;
  position: relative;
}
.functionBtn {
  width: 6.88rem;
  height: 1rem;
  position: absolute;
  bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .getWater {
    width: 2.76rem;
    height: 0.95rem;
    background: url(../assets/img/getWater2.png);
    background-size: 100% 100%;
    position: relative;
    &.black {
      background: url(../assets/img/getWater1.png);
      background-size: 100% 100%;
    }
    strong {
      display: block;
      white-space: nowrap;
      text-align: center;
      width: 1.8rem;
      font-size: 0.18rem;
      position: absolute;
      bottom: 0.08rem;
      right: 0.2rem;
    }
  }
  .getFunction {
    width: 2.76rem;
    height: 0.95rem;
    background: url(../assets/img/getFunc2.png);
    background-size: 100% 100%;
    margin-left: 0.4rem;
    &.black {
      background: url(../assets/img/getFunc1.png);
      background-size: 100% 100%;
    }
  }
}
.surprise {
  width: 6rem;
  height: 9.12rem;
  padding: 0 0.23rem;
  background: rgba(226, 255, 194, 1);
  border: 0.04rem solid rgba(202, 255, 148, 1);
  border-radius: 0.1rem;
  position: absolute;
  left: 0.46rem;
  top: 0.7rem;
  .close {
    display: block;
    width: 0.32rem;
    height: 0.32rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.25rem;
    top: 0.25rem;
  }
  .title {
    width: 4.59rem;
    height: 0.43rem;
    display: block;
    margin: 0.72rem auto 0.33rem;
  }
  .userLv {
    display: flex;
    justify-content: center;
    i {
      display: block;
      width: 0.9rem;
      height: 0.41rem;
      background: #b6ea7d;
      border-radius: 0.5rem;
      text-align: center;
      line-height: 0.41rem;
      color: #5f962d;
      font-size: 0.24rem;
      font-weight: bold;
    }
    em {
      color: #5f962d;
      font-weight: bold;
      margin-left: 0.15rem;
    }
  }
  .deerImg {
    width: 3.64rem;
    height: 3.59rem;
    display: block;
    margin: 0 auto;
  }
  .deerTips {
    width: 5.54rem;
    padding: 0 0.15rem;
    height: 1.09rem;
    background: #d3f8ab;
    color: #48850f;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-top: 0.3rem;
  }
  .shareBtn {
    width: 5.4rem;
    height: 1.02rem;
    margin: 0.56rem auto 0;
    &.share2 {
      background: url(../assets/img/shareDeer/shareBtns2.png);
      background-size: 100% 100%;
    }
    &.share3 {
      background: url(../assets/img/shareDeer/shareBtns3.png);
      background-size: 100% 100%;
    }
    &.share4 {
      background: url(../assets/img/shareDeer/shareBtns4.png);
      background-size: 100% 100%;
    }
    &.share5 {
      background: url(../assets/img/shareDeer/shareBtns5.png);
      background-size: 100% 100%;
    }
  }
}

.deerTips:before {
  content: "\0020";
  width: 0.67rem;
  height: 0.29rem;
  background: url(../assets/img/supriseDeer/deerSho.png);
  background-size: 100% 100%;
  position: absolute;
  top: -0.5rem;
  left: 0;
}
</style>
