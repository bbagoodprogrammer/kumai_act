<template>
  <div class="rankGroups">
    <!-- 三個類別 -->
    <div class="typeMainTabs">
      <i class="liner"></i>
      <!-- <em>{{getDate(stime1,1)}}-{{getDate(etime1,1)}}</em> -->
      <span class="tab1" @click="setShowType(1)" :class="{act:showType == 1}"><strong>守護家族</strong> </span>
      <span class="tab2" @click="setShowType(2)" :class="{act:showType == 2}"><strong>家族PK</strong> </span>
      <span class="tab3" @click="setShowType(3)" :class="{act:showType == 3}"><strong>家族爭霸</strong></span>
    </div>
    <!-- 倒計時 -->
    <div class="downTimebox">
      <div class="timeTips">
        <i class="left"></i>
        <p v-if="actStatus == 0">赛段结束倒计时</p>
        <p v-else-if="actStatus == 1">赛段开始倒计时</p>
        <p v-else>赛段已结束</p>
        <i class="right"></i>
      </div>
      <!-- surplusTime.day &&-->
      <div class="timeDown" v-if=" rank.second > 0">
        <div class="day">
          <strong>
            <img :src="require(`../assets/img/number/${surplusTime.day.slice(0,1)}.png`)" alt="">
            <img :src="require(`../assets/img/number/${surplusTime.day.slice(1)}.png`)" alt="">
          </strong>
          <em>天</em>
        </div>
        <div class="hours">
          <strong>
            <img :src="require(`../assets/img/number/${surplusTime.hour.slice(0,1)}.png`)" alt="">
            <img :src="require(`../assets/img/number/${surplusTime.hour.slice(1)}.png`)" alt="">
          </strong>
          <em>時</em>
        </div>
        <div class="min">
          <strong>
            <img :src="require(`../assets/img/number/${surplusTime.minute.slice(0,1)}.png`)" alt="">
            <img :src="require(`../assets/img/number/${surplusTime.minute.slice(1)}.png`)" alt="">
          </strong>
          <em>分</em>
        </div>
        <div class="second">
          <strong>
            <img :src="require(`../assets/img/number/${surplusTime.second.slice(0,1)}.png`)" alt="">
            <img :src="require(`../assets/img/number/${surplusTime.second.slice(1)}.png`)" alt="">
          </strong>
          <em>秒</em>
        </div>
      </div>
    </div>
    <!-- 文案提示 -->
    <p v-if="showType == 1" class="tankTips">本賽段閃耀值=守護值+家族成員作品/K房收禮魅力值</p>
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs" v-if="showType == 1">
      <div class="tabs">
        <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">家族守護任務</a>
        <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">家族排名</a>
      </div>
      <!-- <a @click.prevent="onRefresh" href="" v-if="tab == nowDay && !isShare && actStatus===1" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh">刷新</a> -->
    </div>

    <!-- 日榜 -->
    <div class="tasks" v-if="showType ==1 && mainTab == 0">
      <div class="taskHeader">
        <span class="name">守護任務</span>
        <span class="score">守護值</span>
        <span class="bar">進度</span>
      </div>
      <ul class="taskList">
        <li v-for="(item,index) in task" :key="index">
          <span class="name">{{taskName[item.action]}}</span>
          <span class="score">{{item.chance}}</span>
          <span class="bar">{{item.schule >= item.limit?'已達成':`${item.schule}/${item.limit}`}}</span>
        </li>
      </ul>
    </div>
    <ul v-else-if="showType ==1 && mainTab == 1" class="list day">
      <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goPeople(item.uid,item.live)">
        <div class="rank">{{item.rank}}</div>
        <div class="uerImg">
          <!-- <img v-if="item.info.level" :src="require(`../assets/img/fLv/${item.info.level}.png`)" class="nob" alt=""> -->
          <!-- <i class="vip" v-else-if="item.vip > 0">VIP{{item.vip}}</i>
          <span class="imgBg" v-if="item.nob ==  0"></span> -->
          <img v-lazy="item.info.avatar" alt="" class="imgItem">
          <span class="fLv" :class="{lv2:item.info.level >5 && item.info.level <=10,lv3:item.info.level >10 && item.info.level <=15,lv4:item.info.level >15}">
            <i class="num">{{item.info.level}}</i>
            <strong>家族</strong>
          </span>
        </div>
        <div class="userMsg">
          <div class="name">{{item.info.familyname}} </div>
          <div class="totalScore"> <i></i> {{item.score}}</div>
        </div>
        <div class="score">
          <i>+</i>
          <div class="star"><i></i> {{item.gift}}</div>
          <div class="num"><i></i> {{item.task}}</div>
        </div>
        <span class="award" v-if="item.join"></span>
      </li>
    </ul>
    <ul v-else-if="showType ==2" class="stage2List">
      <li v-for="(item,index) in rank.list" :key="index" :class="[{min:item.empty},'rank'+item.rank]">
        <div class="rank">{{item.rank}}</div>
        <div class="PKmsg">
          <i class="up left" v-if="item.pk_data&&item.pk_data.left.win"></i>
          <i class="up right" v-if="item.pk_data.right&&item.pk_data.right.win"></i>
          <div class="familyMsg">
            <div class="family1 family">
              <img v-lazy="item.pk_data.left.avatar" class="fImg" alt="" @click.stop="showFamily(item.pk_data.left.fid)">
              <!-- <div class="msg">
                <div class="nick">{{item.pk_data.left.name}}</div>
                <div class="star"><i></i><strong>{{item.pk_data.left.score}}</strong></div>
              </div> -->
            </div>
            <div class="fLiner" v-if="!item.empty">
              <span class="left" :style="{width:getWidth(item.pk_data.left.score,item.pk_data.right.score)}"><i class="giftBox"></i></span>
              <!-- <span class="right"></span> -->
            </div>
            <div class="family2 family">
              <!-- <p class="noOpponents" v-if="item.empty">幸運輪空，直接晉級</p>
              <div class="msg" v-else>
                <div class="nick">{{item.pk_data.right.name}}</div>
                <div class="star"><i></i><strong>{{item.pk_data.right.score}}</strong></div>
              </div> -->
              <img v-lazy="item.pk_data.right.avatar" class="fImg2" alt="" v-if="!item.empty" @click.stop="showFamily(item.pk_data.right.fid)">
            </div>
          </div>

        </div>
      </li>
    </ul>
    <ul v-else class="list stage3List">
      <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank">

        <div class="rank">{{item.rank}}</div>
        <div class="uerImg">
          <!-- <span class="imgBg"></span> -->
          <img v-lazy="item.avatar" alt="" class="imgItem" @click.stop="showFamily(item.fid)">
        </div>
        <div class="userMsg">
          <div class="name" :class="'lv'+item.level"><strong>{{item.name}} </strong> </div>
          <div class="score"><i></i> <strong>{{item.score}}</strong> </div>
        </div>
        <div class="userList">
          <div class="userItem" v-for="(item2,index2) in item.users" :key="index2">
            <span class="userImgBox" @click="goPeople(item2.uid)">
              <span :class="'user'+ (index2+1)"></span>
              <img v-lazy="item2.avatar" alt="">
            </span>
            <strong>{{item2.score}}</strong>
          </div>
        </div>
      </li>
    </ul>
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">加載中...</div>
    <div v-if="rank.none && rank.list.length == 0 " class="scrollNone">
      目前暫無歌友上榜</br>
      虛位以待，等你來哦！
    </div>
    <div v-if="mainTab==0 && tab > nowDay" class="dengdai">敬請期待！</div>
    <!--  -->
    <div class="mask" v-show="showFcards">
      <transition name="slide">
        <div class="familyCard" v-if="showFcards">
          <i class="close" @click="closeCards()"></i>
          <div class="title">家族名片</div>
          <div class="msg">
            <img v-lazy="cardsMsg.family.avatar" alt="" @click="goFroom()">
            <div class="nick">{{cardsMsg.family.familyname}}</div>
            <div class="id">家族ID：<strong>{{cardsMsg.family.fid}}</strong></div>
            <div class="score"><i></i><strong>{{cardsMsg.family.score}}</strong> </div>
          </div>
          <div class="fUserList">
            <ul>
              <li v-for="(item,index) in cardsMsg.list" :key="index" @click="goPeople(item.userinfo.uid)">
                <div class="rank" :class="'rank' + item.rank">{{item.rank}}</div>
                <div class="avBox">
                  <span :class="'user' + item.rank"></span>
                  <img v-lazy="item.userinfo.avatar" alt="">
                </div>
                <div class="nick">{{item.userinfo.nick}}</div>
                <div class="score">
                  <i></i>
                  <strong>{{item.score}}</strong>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import getUrlString from '../utils/getString.js';
import DayTabs from "../components/DayTabs"
import downTime from '../utils/downTime.js'
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import getDate from "../utils/getDate"


export default {
  components: { DayTabs },
  props: ['stime1', 'stime2', 'stime3', 'etime1', 'etime2', 'etime3'],
  data() {
    return {
      mainTab: 0,
      tab: 0,
      surplusTime: {},//日榜剩余时间
      timer: null,
      timer2: null,
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      firstTask: true,
      showPeopleList: false,
      actIndex: 0,
      uidCon: 0,
      peopleArr: [],
      showFcards: false,
      cardsMsg: {},
      taskName: {
        login: '登入本活動頁面完成1次家族簽到',
        mic: '每日在家族K房單次上麥超過60S',
        work: '每日發佈1首公開作品',
        praise: '每日點讚2位家族成員的作品',
        share: '每日分享2位家族成員的作品',
        sendGift: '每日贈送2個家族禮物',
        mark: ''
      }
    }
  },
  watch: {
    nowDay(val) {
      this.tab = val
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
  },
  computed: {
    ...mapState(['rankGroups', 'task', "nowShowType", "nowDay", "oneNowDay", "dateArr", "inited", "isShare", "actStatus", "showType", "timeObj"]),
    rankKey() {
      // return ['one', 'two', 'three'][this.tab];
      if (this.showType == 2 || this.showType == 3) {
        return 'total'
      }
      return this.mainTab == 1 ? 'total' : this.tab;
    },
    rankApi() {
      if (this.isShare) {
        var dayApi = ''
        if (this.showType == 1) {
          if (this.mainTab == 0) {
            dayApi = `/family2020ceremony/list${this.showType}.php?from={from}&time={tm}`;
          } else {
            dayApi = `/family2020ceremony/list${this.showType}.php?from={from}&time=0`;
          }
        } else {
          dayApi = `/family2020ceremony/list${this.showType}.php?from={from}`;
        }
        // var totalApi = `/family2020ceremony/list${this.showType}.php?token={token}&from={from}`;
        // var api = this.rankKey == 'total' ? totalApi : dayApi;
        const token = getUrlString('token') || '';
        return dayApi.replace('{token}', token).replace('{tm}', this.getNowDate())
      } else {
        var dayApi = ''
        if (this.showType == 1) {
          if (this.mainTab == 0) {
            dayApi = `/family2020ceremony/list${this.showType}.php?token={token}&from={from}&time={tm}`;
          } else {
            dayApi = `/family2020ceremony/list${this.showType}.php?token={token}&from={from}&time=0`;
          }
        } else {
          dayApi = `/family2020ceremony/list${this.showType}.php?token={token}&from={from}`;
        }
        // var totalApi = `/family2020ceremony/list${this.showType}.php?token={token}&from={from}`;
        // var api = this.rankKey == 'total' ? totalApi : dayApi;
        const token = getUrlString('token') || '';
        return dayApi.replace('{token}', token).replace('{tm}', this.getNowDate())
      }
    },
    rankSize() {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    rank() {
      const rankConf = this.rankGroups[this.showType][this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      // && rankConf.second > 0
      if (rankConf.second) {
        this.downTimeGo('time' + this.showType + this.rankKey, rankConf.second)
      }
      return rankConf;
    },
    actTime() {
      return getDate(new Date(this.timeObj.stime * 1000), '2') + ' ~ ' + getDate(new Date(this.timeObj.etime * 1000), '2')
    },
    timeStr() {
      return
    }
  },
  mounted() {
    this.onScroll(); // 如果默认展示的Tabs依赖服务器配置，把此方法移到watch中去调用（watch更新Tabs值后调onScroll）
    // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    setShowType(val) {
      if (val !== this.showType) {
        this.vxc('setShowType', val)
        if (val == 1) {
          this.tab = this.oneNowDay
          this.mainTab = 0
        } else {
          this.tab = 'total'
        }
        this.vxc("changTab", this.rankKey)
        this.$nextTick(() => {
          if (!this.rank.loadCount) {
            this.onScroll();
          }
        });
      }
    },
    mainTabClick(tab) { //总榜切换
      this.mainTab = tab;
      this.vxc("changTab", this.rankKey)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    tabClick(tab) { //日榜切换
      this.tab = tab;
      var nowTab = this.rankKey >= this.oneNowDay ? this.oneNowDay : this.rankKey //存当天选择的tab索引用于底部个人信息查找
      this.vxc("changTab", nowTab)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    onScroll() {
      // if (this.tab > this.nowDay) return (this.tab > this.nowDay && this.rankKey !== 'total') || 
      if (this.inited === 0) { //初始化是少一次請求,是日榜的时候和不是总榜的时候返回
        return
      }
      if (!this.rank.loading && !this.rank.loadEnd && !(this.mainTab == 0 && this.showType == 1)) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeigh;
        if (scrollToBottom || notFull) {
          const key = this.rankKey;

          const set = (k, v) => {
            let obj = {
              type: this.showType,
              data: { key, [k]: v }
            }
            this.$store.commit('updateRankGroups', obj);
          };

          set('loading', true);
          axios.get(this.rankApi.replace('{from}', this.rank.list.length)).then(res => {
            set('loading', false);

            const { response_status, response_data } = res.data;

            if (response_status.code != 0) {
              set('loadEnd', true);
              return;
            }
            // console.log(this.showType, this.rankKey, response_data.c_time)
            if (this.showType == 1) {
              //console.log(this.$parent.computedInitSecond(this.showType, this.rankKey, response_data.c_time))
              set('second', this.$parent.computedInitSecond(this.showType, this.rankKey, response_data.c_time))
            } else if (this.showType == 2 || this.showType == 3) {

              set('second', this.$parent.computedInitSecond(this.showType, this.rankKey, response_data.c_time))
            }
            const arr = response_data.list;
            //跟随榜单变换个人信息
            if (response_data.rank) {
              let userObj = {
                type: this.showType,
                data: { //当前日榜信息
                  key: this.rankKey,
                  msg: response_data.rank ? response_data.rank : {}
                }
              }
              this.vxc('updateGroupsUserMsg', userObj)
            }
            if (arr.slice) {
              const loadCount = typeof this.rank.loadCount == 'undefined' ? 0 : this.rank.loadCount;
              set('loadCount', loadCount + 1);
              if (arr.length) {
                set('list', this.rank.list.concat(arr));
                const noMore = !isNaN(this.rankSize) && arr.length < parseInt(this.rankSize);
                if (this.rank.loadOnce || noMore) {
                  set('loadEnd', true);
                } else {
                  this.$nextTick(this.onScroll);
                }
              } else {
                set('loadEnd', true);
              }
              this.$nextTick(() => {
                if (this.rank.loadCount > 0 && this.rank.list.length === 0) {
                  set('none', true);
                }
              });
            } else {
              set('loadEnd', true);
            }
          }).catch(err => {
            set('loading', false);
            set('loadEnd', true);
          });
        }
      }
    },
    onRefresh() {
      if (this.rank.loading) return
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      let obj = {
        type: this.showType,
        data: { //当前日榜信息
          key: this.rankKey,
          loadCount: 0,
          loadEnd: false,
          loading: false,
          none: false,
          list: []
          // second: response_data.data.current_time
        }
      }
      this.vxc('updateRankGroups', obj)
      this.$nextTick(this.onScroll);
    },
    downTimeGo(timeName, val) {
      clearInterval(this.timer)
      if (!downTime(timeName)) {
        downTime(timeName, val);
      }
      this.surplusTime = downTime(timeName);
      this.timer = setInterval(() => {
        this.surplusTime = downTime(timeName);
        if (this.surplusTime && this.surplusTime.end) {
          clearInterval(this.timer)
          // this.$store.commit("changday_down_time", 0)  //當天剩餘時間
        }
      }, 1000)
    },
    getWidth(score1, score2) {
      return score1 / (score1 + score2) * 100 + '%'
    },
    getDate(time, type) {
      return getDate(new Date(time * 1000), type)
    },
    closePeople() {
      this.actIndex = 0
      this.showPeopleList = false
    },
    goPeople(uid, live) {
      if (live) {
        location.href = `rid:${live}`
        return
      }
      location.href = `uid:${uid}`
    },
    showFamily(fid) {
      let type = this.showType == 2 ? 0 : 1
      api.fCards(type, fid).then(res => {
        this.cardsMsg = res.data.response_data
        this.showFcards = true
      })
    },
    getNowDate() {
      return getDate(new Date(this.dateArr[this.tab - 1] * 1000), 4)
    },
    closeCards() {
      this.showFcards = false
    },
    goFroom() {
      location.href = `fid:${this.cardsMsg.family.fid}`
    }
  },
}
</script>

<style lang="scss">
.rankGroups {
  margin-top: 0.16rem;
  padding-bottom: 2rem;
  .typeMainTabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 6.98rem;
    height: 0.98rem;
    // background: url(../assets/img/tasBg.png);
    // background-size: 100% 100%;
    margin: 0 auto;
    position: relative;
    .liner {
      width: 3.28rem;
      height: 0.01rem;
      border: 0.01rem solid rgba(255, 223, 89, 1);
      z-index: 1;
      position: absolute;
      left: 1.7rem;
    }
    > span {
      width: 2.26rem;
      height: 0.91rem;
      text-align: center;
      color: rgba(117, 66, 8, 1);
      font-weight: 500;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 2;
      background: url(../assets/img/tab1.png);
      background-size: 100% 100%;
      color: rgba(165, 120, 89, 1);
      font-weight: 600;
      &.act {
        color: rgba(65, 44, 6, 1);
        background: url(../assets/img/tab1Act.png);
        background-size: 100% 100%;
      }
      strong {
        font-size: 0.28rem;
      }
      em {
        display: block;
        font-size: 0.22rem;
        margin-top: 0.05rem;
      }
    }
  }
  .tasks {
    width: 6.52rem;
    height: 5.08rem;
    background: url(../assets/img/taskBg.png);
    background-size: 100% 100%;
    margin: 0.22rem auto 0;
    .taskHeader {
      display: flex;
      height: 0.75rem;
      line-height: 0.75rem;
      text-align: center;
      font-size: 0.26rem;
    }
    .taskList {
      li {
        height: 0.69rem;
        line-height: 0.69rem;
        display: flex;
        text-align: center;
        font-size: 0.22rem;
        color: rgba(255, 243, 164, 1);
        .name {
          text-indent: 0.47rem;
        }
        .bar {
          color: rgba(103, 255, 242, 1);
        }
      }
    }
    .name {
      width: 3.5rem;
      text-indent: 0.83rem;
      white-space: nowrap;
    }
    .score {
      width: 1.5rem;
    }
    .bar {
      flex: 1;
    }
  }
  > li {
    padding: 0.5rem 0;
  }
  .mainTabs {
    margin: 0.15rem 0 0.25rem;
    padding: 0 0.37rem;
    height: 0.88rem;
    margin: 0 auto;
    display: flex;
    .tabs {
      width: 7.02rem;
      height: 0.81rem;
      // padding: 0 0.07rem;
      background: url(../assets/img/tabs.png);
      background-size: 100% 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.13rem auto 0;
      > a {
        display: block;
        width: 3.55rem;
        height: 0.82rem;
        text-align: center;
        line-height: 0.82rem;
        color: rgba(142, 105, 63, 1);
        font-weight: 500;
        &.current {
          color: #fff;
          background: url(../assets/img/actTabs.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .timeTips {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 247, 197, 1);
    margin: 0.28rem 0 0.4rem;
    i {
      width: 1.11rem;
      height: 0.19rem;
      &.left {
        background: url(../assets/img/left.png);
        background-size: 100% 100%;
        margin-right: 0.25rem;
      }
      &.right {
        background: url(../assets/img/right.png);
        background-size: 100% 100%;
        margin-left: 0.25rem;
      }
    }
  }
  .downTimebox {
    margin: 0 auto;
    text-align: center;
    position: relative;
    .timeDown {
      padding: 0 0.87rem;
      margin: 0.12rem auto 0;
      display: flex;
      justify-content: space-between;
      > div {
        height: 100%;
        display: inline-block;
        strong {
          font-size: 0.48rem;
          font-weight: bold;
          display: block;
          width: 1.15rem;
          height: 1.15rem;
          background: url(../assets/img/timeItemBg.png);
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 0.38rem;
            height: 0.59rem;
          }
        }
        em {
          display: block;
          font-size: 0.24rem;
          color: rgba(140, 101, 57, 1);
          margin: 0.1rem 0 0.22rem;
        }
      }
    }
    .noTime {
      line-height: 0.45rem;
    }
    .rankTips {
      margin-top: 0.25rem;
      font-size: 0.24rem;
      color: rgba(142, 105, 63, 1);
      span {
        display: block;
      }
    }
  }
  .tankTips {
    text-align: center;
    font-size: 0.24rem;
    color: rgba(255, 181, 104, 1);
  }
  .list {
    margin: 0.19rem auto;
    width: 7.1rem;
    &.stage3List {
      .uerImg {
        .imgItem {
          width: 0.96rem;
          height: 0.96rem;
          border-radius: 0.16rem;
        }
      }
      .userMsg {
        width: 2.3rem;
        margin-right: 0.15rem;
        .name {
          width: 1.44rem;
          height: 0.54rem;
          padding-left: 0.63rem;
          background: url(../assets/img/lv0.png);
          background-size: 100% 100%;
          &.lv1 {
            background: url(../assets/img/lv1.png);
            background-size: 100% 100%;
          }
          &.lv2 {
            background: url(../assets/img/lv2.png);
            background-size: 100% 100%;
          }
          &.lv3 {
            background: url(../assets/img/lv3.png);
            background-size: 100% 100%;
          }
        }
        .score {
          display: flex;
          align-items: center;
          margin-top: 0.06rem;
          i {
            width: 0.4rem;
            height: 0.38rem;
            background: url(../assets/img/star.png);
            background-size: 100% 100%;
          }
          strong {
            font-size: 0.26rem;
          }
        }
      }
      .userList {
        flex: 1;
        justify-content: center;
        .userItem {
          margin-right: 0.13rem;
        }
      }
    }
    li {
      height: 1.61rem;
      margin-bottom: 0.13rem;
      background: url(../assets/img/listItem1.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      position: relative;
      .rank {
        width: 0.75rem;
        height: 0.65rem;
        font-size: 0.46rem;
        color: rgba(243, 165, 77, 1);
        text-align: center;
        line-height: 0.72rem;
        margin-left: 0.13rem;
      }
      .uerImg {
        width: 1rem;
        height: 1.01rem;
        position: relative;
        margin: 0 0.15rem 0 0.08rem;
        .fLv {
          display: block;
          width: 1.06rem;
          height: 0.37rem;
          background: url(../assets/img/fLv/1.png);
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          position: absolute;
          left: 0;
          bottom: -0.05rem;
          z-index: 10;
          .num {
            width: 0.32rem;
            height: 0.32rem;
            line-height: 0.32rem;
            text-align: center;
            font-size: 0.12rem;
            color: #e63ba8;
            margin-left: 0.05rem;
          }
          strong {
            flex: 1;
            font-size: 0.18rem;
            margin-left: 0.1rem;
            margin-top: 0.01rem;
          }
          &.lv2 {
            background: url(../assets/img/fLv/2.png);
            background-size: 100% 100%;
            .num {
              color: #a939ff;
            }
          }
          &.lv3 {
            background: url(../assets/img/fLv/3.png);
            background-size: 100% 100%;
            .num {
              margin-left: 0.04rem;
              color: #a939ff;
            }
          }
          &.lv4 {
            background: url(../assets/img/fLv/4.png);
            background-size: 100% 100%;
            .num {
              margin-left: 0.09rem;
              color: #4f5ff4;
            }
          }
        }
        .imgBg {
          width: 1rem;
          height: 1.01rem;
          background: url(../assets/img/av4.png);
          background-size: 100% 100%;
          position: absolute;
          z-index: 10;
        }
        .imgItem {
          width: 1rem;
          height: 1rem;
          border-radius: 0.2rem;
          border: 0.03rem solid rgba(251, 253, 148, 1);
          box-sizing: border-box;
          position: absolute;
          top: 0.035rem;
          left: 0.03rem;
        }
        .nob {
          width: 1.2rem;
          height: 1.2rem;
          position: absolute;
          top: -0.1rem;
          left: -0.1rem;
          z-index: 10;
        }
        .vip {
          display: block;
          width: 0.8rem;
          height: 0.3rem;
          background: #fc6161;
          font-size: 0.24rem;
          color: #fffca1;
          position: absolute;
          bottom: 0rem;
          border-radius: 0.3rem;
          text-align: center;
          line-height: 0.3rem;
          left: 0.1rem;
          z-index: 11;
        }
      }
      .userMsg {
        width: 2.7rem;
        margin-right: 0.45rem;
        .name {
          width: 2.29rem;
          height: 0.67rem;
          background: url(../assets/img/fNameBg.png);
          background-size: 100% 100%;
          line-height: 0.8rem;
          text-indent: 0.45rem;
          font-style: italic;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .totalScore {
          display: flex;
          align-items: center;
          color: rgba(255, 251, 128, 1);
          font-size: 0.26rem;
          font-weight: 500;
          margin-top: 0.05rem;
          i {
            display: block;
            margin-right: 0.06rem;
            width: 0.43rem;
            height: 0.39rem;
            background: url(../assets/img/store.png);
            background-size: 100% 100%;
          }
        }
      }
      > .score {
        flex: 1;
        color: rgba(137, 63, 30, 1);
        font-size: 0.26rem;
        position: relative;
        margin-top: 0.1rem;
        > i {
          font-size: 0.26rem;
          color: rgba(137, 63, 30, 1);
          position: absolute;
          left: -0.3rem;
          top: 0.27rem;
        }
        .star {
          display: flex;
          align-items: center;
          i {
            width: 0.4rem;
            height: 0.38rem;
            background: url(../assets/img/star.png);
            background-size: 100% 100%;
            margin-right: 0.1rem;
          }
        }
        .num {
          display: flex;
          align-items: center;
          margin-top: 0.15rem;
          i {
            width: 0.35rem;
            height: 0.41rem;
            background: url(../assets/img/fire.png);
            background-size: 100% 100%;
            margin-right: 0.1rem;
          }
        }
      }
      .award {
        display: block;
        width: 1.09rem;
        height: 0.4rem;
        background: url(../assets/img/up.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0;
        right: 0.17rem;
        z-index: 0;
      }
      .userList {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .userItem {
          position: relative;
          .userImgBox {
            display: block;
            width: 0.62rem;
            height: 0.68rem;
            margin: 0 auto;
            position: relative;
            span {
              display: block;
              width: 0.62rem;
              height: 0.68rem;
              position: absolute;
              z-index: 2;
            }
            .user1 {
              background: url(../assets/img/user1.png);
              background-size: 100% 100%;
            }
            .user2 {
              background: url(../assets/img/user2.png);
              background-size: 100% 100%;
            }
            .user3 {
              background: url(../assets/img/user3.png);
              background-size: 100% 100%;
            }
            img {
              width: 0.6rem;
              height: 0.6rem;
              border-radius: 50%;
              position: absolute;
              top: 0.07rem;
              left: 0.01rem;
            }
          }
          strong {
            display: block;
            text-align: center;
            color: rgba(255, 250, 238, 1);
            font-size: 0.2rem;
          }
        }
      }
      &.rank1 {
        background: url(../assets/img/listItem2.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        background: url(../assets/img/listItem3.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        background: url(../assets/img/listItem3.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .stage2List {
    width: 6.9rem;
    margin: 0.23rem auto 0;
    li {
      display: flex;
      align-items: center;
      height: 2.17rem;
      margin-bottom: 0.2rem;
      background: url(../assets/img/stage2ListBg.png);
      background-size: 100% 100%;
      position: relative;
      .rank {
        width: 0.9rem;
        text-align: center;
        color: rgba(69, 19, 0, 1);
        font-size: 0.42rem;
        font-weight: bold;
        opacity: 0.5;
      }
      .PKmsg {
        flex: 1;
        margin-left: 0.2rem;
        position: relative;
        padding-right: .15rem;
        .up {
          display: block;
          width: 1.18rem;
          height: 0.38rem;
          background: url(../assets/img/jinji.png);
          background-size: 100% 100%;
          position: absolute;
          top: 0.13rem;
          &.left {
            left: 0;
            background: url(../assets/img/jinji2.png);
            background-size: 100% 100%;
          }
          &.right {
            right: 0;
          }
        }
        .familyMsg {
          height: 1.4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .family {
            display: flex;
            align-items: center;
            img {
              width: 1rem;
              height: 1rem;
              border-radius: 0.16rem;
            }
            .msg {
              margin-left: 0.14rem;
              .nick {
                height: 0.5rem;
                max-width: 2rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              .star {
                display: flex;
                align-items: center;
                font-size: 0.24rem;
                color: rgba(255, 251, 237, 1);
                i {
                  width: 0.31rem;
                  height: 0.29rem;
                  background: url(../assets/img/star.png);
                  background-size: 100% 100%;
                  margin-right: 0.06rem;
                }
              }
            }
          }
        }
        .fLiner {
          width: 3.48rem;
          height: 0.16rem;
          display: flex;
          align-items: center;
          margin: 0 auto;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 0.08rem;
          span {
            height: 100%;
          }
          .left {
            width: 50%;
            background: linear-gradient(90deg, #ff5bb1 0%, #ff3838 100%);
            position: relative;
            border-radius: 0.08rem;
            // .giftBox {
            //   position: absolute;
            //   width: 0.53rem;
            //   height: 0.54rem;
            //   background: url(../assets/img/giftBox.png);
            //   background-size: 100% 100%;
            //   right: -0.27rem;
            //   top: -0.24rem;
            // }
          }
          .right {
            flex: 1;
            border-radius: 0 0.08rem 0.08rem 0;
            background: linear-gradient(
              90deg,
              rgba(255, 141, 40, 1) 39%,
              rgba(255, 208, 106, 1) 100%
            );
          }
        }
        .family2 {
          .msg {
            margin-right: 0.14rem;
          }
          .noOpponents {
            font-size: 0.24rem;
            color: rgba(255, 245, 129, 1);
          }
        }
      }

      &.rank1 {
        background: url(../assets/img/stage2ListTop1.png);
        background-size: 100% 100%;
      }
      &.rank2,
      &.rank3 {
        background: url(../assets/img/stage2ListTop2.png);
        background-size: 100% 100%;
      }
    }
  }
}
.familyCard {
  width: 4.62rem;
  height: 6.49rem;
  background: url(../assets/img/familyCard.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    display: block;
    width: 0.6rem;
    height: 0.57rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: 0;
  }
  .title {
    height: 0.65rem;
    line-height: 0.65rem;
    text-align: center;
  }
  .msg {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: rgba(137, 63, 30, 1);
    margin-top: 0.1rem;
    img {
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 0.16rem;
    }
    .nick {
      font-size: 0.32rem;
      font-weight: 600;
      margin-top: 0.08rem;
    }
    .id {
      font-size: 0.24rem;
      margin-top: -0.05rem;
    }
    .score {
      display: flex;
      align-items: center;
      margin-top: 0.1rem;
      i {
        width: 0.4rem;
        height: 0.38rem;
        background: url(../assets/img/star.png);
        background-size: 100% 100%;
        margin-right: 0.09rem;
      }
    }
  }
  .fUserList {
    width: 3.4rem;
    height: 2.39rem;
    background: rgba(65, 36, 12, 0.15);
    border-radius: 0.12rem;
    margin: 0.1rem auto;
    overflow-y: scroll;
    li {
      height: 0.8rem;
      display: flex;
      align-items: center;
      padding-right: 0.05rem;
      .rank {
        width: 0.4rem;
        text-align: center;
        font-size: 0.24rem;
        color: #e99d2c;
        &.rank1 {
          color: rgba(252, 255, 1, 1);
        }
        &.rank2 {
          color: rgba(227, 229, 231, 1);
        }
        &.rank3 {
          color: rgba(255, 171, 89, 1);
        }
      }
      .avBox {
        display: block;
        width: 0.62rem;
        height: 0.68rem;
        position: relative;
        margin-right: 0.08rem;
        span {
          display: block;
          width: 0.62rem;
          height: 0.68rem;
          position: absolute;
          z-index: 2;
        }
        .user1 {
          background: url(../assets/img/user1.png);
          background-size: 100% 100%;
        }
        .user2 {
          background: url(../assets/img/user2.png);
          background-size: 100% 100%;
        }
        .user3 {
          background: url(../assets/img/user3.png);
          background-size: 100% 100%;
        }
        img {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          position: absolute;
          top: 0.07rem;
          left: 0.01rem;
        }
      }
      .nick {
        width: 1rem;
        font-size: 0.24rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .score {
        display: flex;
        align-items: center;
        color: rgba(255, 226, 163, 1);

        strong {
          font-size: 0.24rem;
        }
        i {
          width: 0.4rem;
          height: 0.38rem;
          background: url(../assets/img/star.png);
          background-size: 100% 100%;
          margin-right: 0.09rem;
        }
      }
    }
  }
}
.peopleList {
  width: 6.62rem;
  height: 6.14rem;
  background: url(../assets/img/peopleList.png);
  background-size: 100% 100%;
  position: relative;
  .noData {
    margin: 1.43rem auto 0;
    text-align: center;
    font-weight: 500;
    color: #ffcac8;
  }
  ul {
    width: 5.81rem;
    height: 4rem;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    margin: 1.43rem auto 0;
    li {
      height: 1.27rem;
      display: flex;
      align-items: center;
      background: url(../assets/img/peopleBg.png);
      background-size: 100% 100%;
      .rank {
        width: 0.75rem;
        height: 0.65rem;
        margin-left: 0.17rem;
        font-size: 0.46rem;
        color: #feb0ff;
        text-align: center;
        line-height: 0.72rem;
        margin-left: 0.13rem;
      }
      .userImg {
        width: 1.21rem;
        height: 1.01rem;
        position: relative;
        margin-left: 0.21rem;
        .imgBg {
          position: absolute;
          z-index: 10;
        }
        .imgItem {
          width: 0.94rem;
          height: 0.94rem;
          position: absolute;
          top: 0.035rem;
          left: 0.03rem;
          border-radius: 50%;
        }
      }
      .name {
        width: 2rem;
        max-width: 2rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .score {
        display: flex;
        align-items: center;
        margin-left: 0.3rem;
        i {
          display: block;
          width: 0.22rem;
          height: 0.25rem;
          background: url(../assets/img/coins.png);
          background-size: 100% 100%;
        }
        em {
          font-size: 0.22rem;
          color: #ffed82;
          margin-left: 0.06rem;
        }
      }
      &.act {
        background: url(../assets/img/peopleBg2.png);
        background-size: 100% 100%;
      }
      &.rank0 {
        .rank {
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
        .imgBg {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../assets/img/av1.png);
          background-size: 100% 100%;
          top: -0.23rem;
          left: -0.06rem;
        }
      }
      &.rank1 {
        .rank {
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
        .imgBg {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../assets/img/av2.png);
          background-size: 100% 100%;
          top: -0.23rem;
          left: -0.06rem;
        }
      }
      &.rank2 {
        .rank {
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
        .imgBg {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../assets/img/av3.png);
          background-size: 100% 100%;
          top: -0.23rem;
          left: -0.06rem;
        }
      }
    }
  }
  .goUerBtn {
    width: 2.76rem;
    height: 0.99rem;
    background: url(../assets/img/singUp.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.99rem;
    font-size: 0.36rem;
    font-weight: 500;
    position: absolute;
    bottom: -0.38rem;
    left: 1.93rem;
  }
  .close {
    display: block;
    width: 0.95rem;
    height: 0.95rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.45rem;
    right: 0.25rem;
  }
}
.dengdai {
  text-align: center;
}
.scrollLoading {
  text-align: center;
  color: #ffefd7;
  font-size: 80%;
}
.scrollNone {
  text-align: center;
  color: #ffefd7;
  font-size: 80%;
}
#refresh {
  display: block;
  width: 0.94rem;
  height: 1rem;
  position: fixed;
  right: 0.08rem;
  bottom: 1.35rem;
  // background: url(../assets/img/refresh.png) no-repeat;
  // background-size: contain;
  transition: all 1s;
  text-indent: -999rem;
  z-index: 100;
}
</style>
