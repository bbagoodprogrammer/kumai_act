<template>
  <div class="rankGroups">
    <!-- 三個類別 -->
    <div class="typeMainTabs">
      <i class="left" @click="rollAmi('left')"></i>
      <div class="tabItem" ref="giftBox">
        <span class="gItem" :class="{act: nowTab == index + 1}" @click="setShowType( index + 1)" v-for="(item,index) in actArr" :key="index">{{item.name}}<em>{{item.tm}}</em> </span>
      </div>
      <i class="right" @click="rollAmi('right')"></i>
    </div>
    <div class="giftArr">
      <span class="giftItem" v-for="(item,index) in nowInitData.gifts" :key="index">
        <div class="imgBox">
          <img :src="item.image" alt="">
          <i class="type" :class="{kroom:item.kind == 1}"></i>
        </div>
        <strong>{{item.name}}</strong>
      </span>
    </div>
    <div class="actTips">
      <p>在比賽期間向選手送以上禮物，選手可獲得10%的人氣加成喔</p>
      <p v-if="nowTab != 4"><span>高光時刻：</span>比賽期間每日21:00:00~21:10:00送出的禮物可以獲得10%的人氣值加成</p>
    </div>
    <div class="downTimebox">
      <div class="timeTips">
        <p v-if="nowTab < showType"> {{timeTipsArr[nowTab][2]}}</p>
        <p v-else-if="nowTab == showType"> {{timeTipsArr[nowTab][nowInitData.activityStep]}}</p>
        <p v-else>{{timeTipsArr[nowTab][0]}}</p>
        <i class="tipsIcon" @click="showRankTips = true"></i>
      </div>
      <!-- v-if="surplusTime&& !surplusTime.end" -->
      <div class="timeDown">
        <div class="day">
          <strong>{{surplusTime.day}}</strong>
          <em>天</em>
        </div>
        <div class="hours">
          <strong>{{surplusTime.hour}}</strong>
          <em>時</em>
        </div>
        <div class="min">
          <strong>{{surplusTime.minute}}</strong>
          <em>分</em>
        </div>
        <div class="second">
          <strong>{{surplusTime.second}}</strong>
          <em>秒</em>
        </div>
      </div>
      <div class="rankTips" v-if="nowTab != 4 && rank.list.length"></div>
    </div>
    <ul v-if="nowTab ==1" class="stage1List">
      <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goPeople(item.uid)">
        <div class="imgBox">
          <span class="avBg" v-if="item.rank <=3"></span>
          <img v-else-if="item.frame &&item.frame != ''" :src="item.frame" class="frame">
          <img v-lazy="item.avatar" alt="">
          <span class="rank" v-if="item.rank>3">No.{{item.rank}}</span>
        </div>
        <div class="userMsg">
          <div class="nick">{{item.nick}}</div>
          <div class="uid">ID:{{item.uid}}</div>
          <div class="star"><i></i><em>{{item.score}}</em> </div>
        </div>
        <div class="score">
          <div class="work"><i></i><em>{{item.work}}</em> </div>
          <div class="ktv"><i></i><em>{{item.ktv}}</em></div>
          <div class="room"><i></i><em>{{item.room}}</em></div>
        </div>
      </li>
    </ul>
    <ul v-else-if="nowTab ==2" class="stage2List">
      <li v-for="(item,index) in rank.list" :key="index" :class="[{min:item.empty},'rank'+item.rank]">
        <span class="rank" :class="{textL:item.rank <=3}">{{item.rank}}</span>
        <div class="pkUser">
          <div class="userItem" v-for="(item2,index2) in item.users" :key="index2">
            <div class="imgBox" @click.stop="showPkMsg(item.users)">
              <img v-if="item2.frame &&item2.frame != ''" :src="item2.frame" class="frame">
              <img v-lazy="item2.avatar" alt="" class="av" :class="{bor:!item2.frame ||item2.frame == ''}">
              <i class='upIcon' :class="{lose:item2.cancel,up:item2.up}" v-if="item2.cancel || item2.up"></i>
            </div>
            <strong class="nick">{{item2.nick}}</strong>
            <div class="score"><i></i><em>{{item2.total}}</em></div>

          </div>
          <span class="vs"></span>
        </div>
      </li>
    </ul>
    <ul v-else-if="nowTab ==3" class="stage3List">
      <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goGroup(item.tid)">
        <div class="grouplist">
          <div class="title" :class="'title'+item.tid"></div>
          <div class="groupScore">
            <div class="score"><i></i><em>{{item.score}}</em></div>
            <div class="groupT">前{{item.count}}名可晋级</div>
          </div>
        </div>
        <div class="peopleList">
          <div class="userItem" v-for="(item2,index2) in item.users" :key="index2">
            <div class="imgBox" @click.stop="showUserMsg(item2)">
              <img v-if="item2.frame &&item2.frame != ''" :src="item2.frame" class="frame">
              <img v-lazy="item2.avatar" alt="" class="av">
            </div>
            <strong class="nick">{{item2.nick}}</strong>
            <div class="score"><i></i><em>{{item2.score}}</em></div>
          </div>
        </div>
      </li>
    </ul>
    <div class="stage4List" v-else>
      <div class="listTop">
        <div class="kRoom">
          <img :src="nowInitData.room?nowInitData.room.pic_url:''" alt="">
          <div class="roomMsg">
            <div class="rname">{{nowInitData.room?nowInitData.room.rname:''}}</div>
            <div class="rid">ID:{{nowInitData.room?nowInitData.room.rid:''}}</div>
          </div>
          <div class="goBtn" @click="goRoom(nowInitData.room.rid)">進入決賽K房</div>
        </div>
        <!-- <div v-if="!rank.loadCount && rank.loading" class="scrollLoading">加載中...</div> -->
        <div class="userList">
          <div class="userItem" v-for="(item,index) in lastlistTop" :key="index" :class="'item'+item.rank">
            <div class="imgBox" @click.stop="showUserMsg(item)">
              <span class="avBg"></span>
              <img v-lazy="item.avatar" alt="" class="av">
            </div>
            <strong class="nick">{{item.nick}}</strong>
            <div class="score"><i></i><em>{{item.score}}</em></div>
          </div>
        </div>
      </div>
      <div class="listTips"></div>
      <!-- v-if="nowTab == 4 && showType == 4" -->
      <ul class="lastList">
        <li v-for="(item,index) in lastlist" :key="index" :class="'rank'+item.rank">
          <div class="imgBox" @click.stop="goPeople(item.uid)">
            <span class="avBg" v-if="item.rank <=3"></span>
            <img v-else-if="item.frame &&item.frame != ''" :src="item.frame" class="frame">
            <img v-lazy="item.avatar" alt="">
            <span class="rank" v-if="item.rank>3">No.{{item.rank}}</span>
          </div>
          <div class="userMsg">
            <div class="nick">{{item.nick}}</div>
            <div class="uid">ID:{{item.uid}}</div>
            <div class="star"><i></i><em>{{item.score}}</em> </div>
          </div>
          <div class="score">
            <div class="work"><i></i><em>{{item.work}}</em> </div>
            <div class="ktv"><i></i><em>{{item.ktv}}</em></div>
            <div class="room"><i></i><em>{{item.room}}</em></div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div class="listTipsBox">
      <div v-if="rank.loading" class="scrollLoading">加載中...</div>
      <div v-else-if="nowTab > showType && actStatus == 1" class="dengdai">敬請期待！</div>
      <div v-else-if="rank.none && rank.list.length == 0 " class="scrollNone">
        目前暫無歌友上榜</br>
        虛位以待，等你來哦！
      </div>

    </div>
    <!--榜单提示彈窗 -->
    <div class="mask" v-show="showRankTips">
      <transition name="slide">
        <div class="pupTips" v-show="showRankTips">
          <i class="close" @click.stop="showRankTips = !showRankTips"></i>
          <h5>{{pupTipsMsg.title}}</h5>
          <p v-html="pupTipsMsg.msg"></p>
          <h5 class="ps">ps:</h5>
          <p v-html="pupTipsMsg.msg2"></p>
        </div>
      </transition>
    </div>
    <!-- 1V1个人信息 -->
    <div class="mask" v-show="showPkMsgPup">
      <transition name="slide">
        <div class="pkUserPup" v-show="showPkMsgPup">
          <i class="close" @click.stop="showPkMsgPup = false"></i>
          <div class="userItem" :class="{icon:index2== 0}" v-for="(item2,index2) in pkUsers" :key="index2">
            <div class="imgBox" @click="goPeople(item2.uid)">
              <img v-if="item2.frame &&item2.frame != ''" :src="item2.frame" class="frame">
              <img v-lazy="item2.avatar" alt="" class="av" :class="{bor:!item2.frame ||item2.frame == ''}">
              <i class='up' :class="{lose:item2.cancel,up:item2.up}" v-if="item2.cancel || item2.up"></i>
            </div>
            <strong class="nick">{{item2.nick}}</strong>
            <div class="uid">ID:{{item2.uid}}</div>
            <div class="score"><i></i><em>{{item2.total}}</em></div>
            <div class="work tcenter">{{item2.work}}</div>
            <div class="ktv tcenter">{{item2.ktv}}</div>
            <div class="room tcenter">{{item2.room}}</div>
          </div>
          <span class="vs"></span>
        </div>
      </transition>
    </div>
    <!-- 其他单人个人信息弹窗 -->
    <div class="mask" v-show="showUserMsg2">
      <transition name="slide">
        <div class="userMsg_2" v-show="showUserMsg2" :class="'rank'+userItem2.rank" @click="goPeople(userItem2.uid)">
          <i class="close" @click.stop="showUserMsg2 = false"></i>
          <div class="imgBox">
            <span class="avBg" v-if="userItem2.rank <=3"></span>
            <img v-else-if="userItem2.frame &&userItem2.frame != ''" :src="userItem2.frame" class="frame">
            <img v-lazy="userItem2.avatar" alt="">
            <span class="rank" v-if="userItem2.rank>3">No.{{userItem2.rank}}</span>
          </div>
          <div class="userMsg">
            <div class="nick">{{userItem2.nick}}</div>
            <div class="uid">ID:{{userItem2.uid}}</div>
            <div class="star"><i :class="{store:nowTab == 4}"></i><em>{{userItem2.total !==undefined ?userItem2.total:userItem2.score}}</em> </div>
          </div>
          <div class="score" :class="{store:nowTab == 4}">
            <div class="work"><i></i><em>{{userItem2.work}}</em> </div>
            <div class="ktv"><i></i><em>{{userItem2.ktv}}</em></div>
            <div class="room"><i></i><em>{{userItem2.room}}</em></div>
          </div>
        </div>
      </transition>
    </div>

    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import getString from '../utils/getString.js';
import downTime from '../utils/downTime.js'
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import getDate from "../utils/getDate"
import tipsMsg from "../config/tipsMsg"
// 为了清晰显示各字段以及提供更灵活的配置，不采用mixin实现
// store.js 每项包含以下字段（需要修改的字段只有loadOnce，其它为当前榜单加载状态）：loadCount loading loadEnd none list <loadOnce>
// 如果不需要设置loadOnce，直接设置空对象即可rankGroups:{}
// state: {
//     rankGroups: {
//     },
// },
// mutations: {
//     updateRankGroups(state, obj) {
//         if (obj && typeof obj.key != 'undefined') {
//             const key = obj.key;
//             delete obj['key'];
//             state.rankGroups = Object.assign({}, state.rankGroups, {[key]: Object.assign({}, state.rankGroups[key], obj)});
//         }
//     },
// }
export default {
  components: {},
  data() {
    return {
      mainTab: 0,
      tab: 0,
      nowTab: 1,
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
      actArr: [
        {
          name: '海選',
          tm: '11.30~12.02'
        },
        {
          name: '1v1對戰',
          tm: '12.03~12.05'
        },
        {
          name: '團戰',
          tm: '12.06~12.08'
        },
        {
          name: '出道決戰',
          tm: '12.09~12.11'
        }
      ],
      timeTipsArr: {
        1: {
          0: '海選開始倒計時',
          1: '海選結束倒計時',
          2: '海選已結束'
        },
        2: {
          0: '1V1對戰開始倒計時',
          1: '1V1對戰結束倒計時',
          2: '1V1對戰已結束'
        },
        3: {
          0: '團戰開始倒計時',
          1: '團戰結束倒計時',
          2: '團戰已結束'
        },
        4: {
          0: '出道決戰開始倒計時',
          1: '出道決戰結束倒計時',
          2: '出道決戰已結束'
        }
      },
      first: true,
      showRankTips: false,
      userItem2: {},
      showUserMsg2: false,
      showPkMsgPup: false,
      pkUsers: []
    }
  },
  computed: {
    ...mapState(['rankGroups', "initGrounps", "isShare", "actStatus", "showType"]),
    rankKey() {
      return this.nowTab
    },
    rankApi() {
      if (this.isShare) {
      } else {
        let apiArr = {
          1: "/posc2020/auditionRank.php?from={from}&token={token}",
          2: "/posc2020/pkRank.php?from={from}&token={token}",
          3: "/posc2020/teamRank.php?from={from}&token={token}",
          4: "/posc2020/upgradeRank.php?from={from}&token={token}"
        }
        let token = getString('token')
        return apiArr[this.nowTab].replace('{token}', token)
      }
    },
    rankSize() {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    rank() {
      const rankConf = this.rankGroups[this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      // && rankConf.second > 0
      return rankConf;
    },
    nowInitData() {
      return this.initGrounps[this.nowTab] ? this.initGrounps[this.nowTab] : { gifts: {} }
    },
    lastlistTop() {
      if (this.rank.list.length) {
        return this.rank.list.slice(0, 11)
      } else if (this.nowTab == 4) {
        let arr = []
        for (let i = 0; i < 11; i++) {
          arr.push({
            nick: '虛位以待',
            avatar: '',
            score: '???',
            rank: i + 1
          })
        }
        return arr
      } else {
        return []
      }
    },
    lastlist() {
      if (this.rank.list.length) {
        return this.rank.list.slice(11)
      } else {
        return []
      }
    },
    pupTipsMsg() {
      return tipsMsg[this.nowTab]
    }
  },
  mounted() {
    this.init()
    // 如果默认展示的Tabs依赖服务器配置，把此方法移到watch中去调用（watch更新Tabs值后调onScroll）
    // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    init(val) {
      api.getDefault(val ? val : 0).then(res => {
        let data = res.data.response_data
        this.vxc('setActStatus', data.step)
        this.vxc('setNowShowType', data.currentTab)
        if (data.currentTab == 4) {
          this.$refs.giftBox.scrollTo(1000, 0)
        }
        if (!val) {
          this.first = false
          this.nowTab = data.currentTab
          this.vxc('setNowTab', data.currentTab)
          this.vxc('setActStatus', data.step)
          this.vxc('setKol', data.kol)
          this.$nextTick(() => {
            this.onScroll();
          })
        }
        this.vxc('setInitGroup', {
          key: val ? val : data.currentTab,
          data
        })
        // this.vxc("changGroupsUserMsg", {//初始当前日榜个人信息
        //   key: val ? val : data.currentTab,
        //   msg: data.owner
        // })
        this.downTimeGo('time' + (val ? val : data.currentTab), data.downTime)
      })
    },
    setShowType(val) {
      this.nowTab = val
      this.vxc('setNowTab', val)
      if (!this.nowInitData.currentTab) {
        this.init(val)
        this.$nextTick(() => {
          this.onScroll()
        });
      } else {
        this.downTimeGo('time' + val, this.nowInitData.downTime)
      }
    },
    onScroll() {
      if (!this.rank.loading && !this.rank.loadEnd && !this.first) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeigh;
        if (scrollToBottom || notFull || !this.rank.loadCount) {
          const key = this.rankKey;

          const set = (k, v) => {
            this.$store.commit('updateRankGroups', { key, [k]: v });
          };

          set('loading', true);
          axios.get(this.rankApi.replace('{from}', this.rank.list.length)).then(res => {
            set('loading', false);

            const { response_status, response_data } = res.data;

            if (response_status.code != 0) {
              set('loadEnd', true);
              return;
            }
            const arr = response_data.list;
            //跟随榜单变换个人信息
            // if (response_data.rank) {
            //   this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
            //     key: this.rankKey,
            //     msg: response_data.owner_msg
            //   })
            // }
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
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动
      this.init(this.nowTab)
      this.onRefresh()
    },
    onRefresh() {
      if (this.rank.loading) return
      // this.rotatePx = 540 * ++this.rotatec  //旋转动画
      this.$store.commit('updateRankGroups', {
        key: this.nowTab,
        loadCount: 0,
        loadEnd: false,
        loading: false,
        none: false,
        list: [],
      });
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
    goRoom(rid) {
      location.href = `rid:${rid}`
    },
    getDate(time, type) {
      return getDate(new Date(time * 1000), type)
    },
    goPeople(uid, live) {
      location.href = `uid:${uid}`
    },
    goGroup(tid) {
      let token = getString('token')
      location.href = `./index3.html?token=${token}&tid=${tid}`
    },
    rollAmi(t) {
      clearInterval(this.timer)
      let scorllEnd = document.getElementsByClassName('gItem')[0].getBoundingClientRect().width * 2
      let scorllLeft = this.$refs.giftBox.scrollLeft
      let c = t == 'right' ? scorllEnd : -scorllEnd
      this.timer = setInterval(() => {
        scorllLeft = this.$refs.giftBox.scrollLeft
        this.$refs.giftBox.scrollTo(scorllLeft + (c / 6), 0)
        c -= c / 6
        if ((t == 'left' && c > -10) || (t == 'right' && c < 1)) {
          clearInterval(this.timer)
        }
      }, 25)
    },
    showUserMsg(item) {
      console.log(item)
      this.showUserMsg2 = true
      this.userItem2 = item
    },
    showPkMsg(users) {
      console.log(users)
      this.pkUsers = users
      this.showPkMsgPup = true
    }
  },
}
</script>

<style lang="scss">
.rankGroups {
  margin-top: 0.16rem;
  // padding-bottom: 2rem;
  .typeMainTabs {
    width: 7.14rem;
    height: 1.17rem;
    background: url(../assets/img/tabs.png);
    background-size: 100% 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .left {
      width: 0.72rem;
      height: 0.72rem;
      background: url(../assets/img/left.png);
      background-size: 100% 100%;
      margin: 0 0 0 0.12rem;
    }
    .right {
      width: 0.72rem;
      height: 0.72rem;
      background: url(../assets/img/right.png);
      background-size: 100% 100%;
      margin: 0 0.12rem 0 0;
    }
    .tabItem {
      flex: 1;
      white-space: nowrap;
      overflow-x: scroll;
      span {
        display: inline-block;
        width: 1.82rem;
        height: 0.77rem;
        padding-top: 0.05rem;
        text-align: center;
        color: rgba(255, 191, 92, 1);
        font-size: 0.32rem;
        font-weight: 600;
        em {
          display: block;
          font-size: 0.2rem;
          color: rgba(255, 192, 92, 1);
          margin-top: -0.02rem;
        }
        &.act {
          color: rgba(178, 79, 40, 1);
          background: url(../assets/img/tab_act.png);
          background-size: 100% 100%;
          em {
            color: rgba(178, 79, 40, 1);
          }
        }
      }
    }
    .tabItem::-webkit-scrollbar {
      display: none;
    }
  }

  .giftArr {
    padding: 0 0.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.22rem;
    span {
      width: 1.56rem;
      .imgBox {
        width: 1.56rem;
        height: 1.56rem;
        background: url(../assets/img/giftItemBg.png);
        background-size: 100% 100%;
        position: relative;
        img {
          display: block;
          width: 100%;
          height: 100%;
          margin: 0 auto;
        }
        i {
          display: block;
          width: 0.54rem;
          height: 0.31rem;
          background: url(../assets/img/workIcon.png);
          background-size: 100% 100%;
          position: absolute;
          right: 0.18rem;
          top: 0.18rem;
          &.kroom {
            background: url(../assets/img/kroomIcon.png);
            background-size: 100% 100%;
          }
        }
      }
      strong {
        display: block;
        text-align: center;
        font-size: 0.24rem;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
  .actTips {
    text-align: center;
    color: rgba(254, 254, 254, 0.6);
    margin-top: 0.3rem;
    p {
      font-size: 0.24rem;
      margin-bottom: 0.2rem;
      span {
        display: inline-block;
        color: rgba(255, 205, 118, 1);
      }
    }
  }
  // .timeTips {

  // }
  .downTimebox {
    margin: 0 auto;
    width: 7.5rem;
    height: 3.62rem;
    text-align: center;
    background: url(../assets/img/timeBg.png);
    background-size: 100% 100%;
    position: relative;
    padding-top: 0.39rem;
    .timeTips {
      text-align: center;
      color: rgba(255, 205, 118, 1);
      font-size: 0.32rem;
      display: flex;
      align-items: center;
      justify-content: center;
      > p {
        font-size: 80%;
        color: rgba(238, 172, 104, 1);
      }
      i {
        width: 0.42rem;
        height: 0.42rem;
        background: url(../assets/img/icon.png);
        background-size: 100% 100%;
        margin: 0.06rem 0 0 0.05rem;
      }
    }
    .timeDown {
      padding: 0 1.3rem;
      margin: 0.26rem auto 0;
      display: flex;
      justify-content: space-between;
      > div {
        height: 100%;
        display: flex;
        align-items: flex-end;
        strong {
          display: block;
          width: 0.86rem;
          height: 0.86rem;
          background: url(../assets/img/timeItemBg.png);
          background-size: 100% 100%;
          text-align: center;
          line-height: 0.86rem;
          font-size: 0.48rem;
          color: rgba(255, 250, 164, 1);
          font-weight: bold;
        }
        em {
          height: 0.3rem;
          font-size: 0.2rem;
          color: rgba(238, 172, 104, 1);
          margin: 0 0 0.15rem 0.05rem;
        }
      }
    }
    .rankTips {
      width: 7.06rem;
      height: 1.78rem;
      background: url(../assets/img/rankTips.png);
      background-size: 100% 100%;
      margin: 0 auto;
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
  .stage2List {
    width: 7.06rem;
    position: relative;
    z-index: 10;
    margin: -0.6rem auto;
    li {
      height: 2.5rem;
      margin-bottom: 0.06rem;
      background: url(../assets/img/type2_top4.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      .rank {
        width: 1rem;
        height: 1rem;
        text-align: center;
        line-height: 1rem;
        margin: -1rem 0 0 0.5rem;
        font-size: 0.4rem;
        font-weight: 600;
      }
      .pkUser {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 0.7rem;
        position: relative;
        .userItem {
          width: 1.5rem;
          .imgBox {
            width: 1.2rem;
            height: 1.2rem;
            position: relative;
            margin: 0 auto;
            .frame {
              width: 2.04rem;
              height: 2.04rem;
              position: absolute;
              left: -0.42rem;
              top: -0.42rem;
              z-index: 20;
            }
            .av {
              width: 1.2rem;
              height: 1.2rem;
              border-radius: 50%;
              display: block;
              margin: 0 auto;
              position: absolute;
              &.bor {
                border: 0.04rem solid rgba(255, 208, 80, 1);
                box-sizing: border-box;
              }
            }
            .upIcon {
              display: block;
              width: 0.8rem;
              height: 0.8rem;
              z-index: 21;
              position: absolute;
              right: -0.2rem;
              bottom: -0.2rem;
              &.up {
                background: url(../assets/img/up.png);
                background-size: 100% 100%;
              }
              &.lose {
                background: url(../assets/img/lose.png);
                background-size: 100% 100%;
              }
            }
          }
          .nick {
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.26rem;
            margin: 0.1rem 0 0.08rem;
            text-align: center;
          }
          .score {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 0.3rem;
            i {
              width: 0.28rem;
              height: 0.26rem;
              background: url(../assets/img/star.png);
              background-size: 100% 100%;
              margin-top: -0.05rem;
            }
            em {
              color: rgba(254, 242, 140, 1);
              font-size: 0.26rem;
              margin-left: 0.06rem;
              // text-align: center;
            }
          }
        }
        .vs {
          display: block;
          width: 0.51rem;
          height: 0.4rem;
          background: url(../assets/img/vs.png);
          background-size: 100% 100%;
          position: absolute;
          left: 1.8rem;
          top: 0.6rem;
        }
      }
      .textL {
        text-indent: -999rem;
      }
      &.rank1 {
        background: url(../assets/img/type2_top1.png);
        background-size: 100% 100%;
      }
      &.rank2 {
        background: url(../assets/img/type2_top2.png);
        background-size: 100% 100%;
      }
      &.rank3 {
        background: url(../assets/img/type2_top3.png);
        background-size: 100% 100%;
      }
    }
  }
  .stage1List,
  .lastList {
    width: 7.06rem;
    position: relative;
    z-index: 10;
    margin: -0.6rem auto;
    li {
      height: 1.6rem;
      background: url(../assets/img/type1_bg.png);
      background-size: 100% 100%;
      margin-bottom: 0.04rem;
      display: flex;
      align-items: center;
      .imgBox {
        width: 1.2rem;
        height: 1.2rem;
        position: relative;
        margin: 0 0.15rem 0 0.14rem;
        .frame {
          width: 1.5rem;
          height: 1.5rem;
          position: absolute;
          top: -0.16rem;
          left: -0.16rem;
          z-index: 10;
        }
        .avBg {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 2;
        }
        img {
          width: 0.88rem;
          height: 0.88rem;
          border-radius: 50%;
          position: absolute;
          left: 0.16rem;
          top: 0.16rem;
        }
        .rank {
          display: block;
          width: 0.73rem;
          height: 0.28rem;
          line-height: 0.28rem;
          background: url(../assets/img/rankBg.png);
          background-size: 100% 100%;
          position: absolute;
          bottom: 0.15rem;
          left: 0.24rem;
          z-index: 20;
          color: rgba(251, 250, 185, 1);
          font-size: 0.18rem;
          font-weight: 600;
          text-align: center;
        }
      }
      .userMsg {
        width: 3rem;
        .nick,
        .uid {
          font-size: 0.28rem;
          color: rgba(255, 255, 255, 0.6);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .star {
          display: flex;
          align-items: center;
          i {
            width: 0.36rem;
            height: 0.33rem;
            background: url(../assets/img/star.png);
            background-size: 100% 100%;
            margin-right: 0.09rem;
          }
          em {
            color: rgba(255, 220, 112, 1);
            font-weight: 600;
          }
        }
      }
      .score {
        margin-left: 0.6rem;
        > div {
          display: flex;
          align-items: center;
          i {
            width: 0.46rem;
            height: 0.26rem;
            margin-right: 0.08rem;
          }
          em {
            color: rgba(254, 254, 254, 0.6);
            font-size: 0.24rem;
          }
          &.work {
            i {
              background: url(../assets/img/work.png);
              background-size: 100% 100%;
            }
          }
          &.ktv {
            margin: 0.12rem 0;
            i {
              background: url(../assets/img/ktv.png);
              background-size: 100% 100%;
            }
          }
          &.room {
            i {
              background: url(../assets/img/room.png);
              background-size: 100% 100%;
            }
          }
        }
      }
      &.rank1 {
        .avBg {
          background: url(../assets/img/type1_top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        .avBg {
          background: url(../assets/img/type1_top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        .avBg {
          background: url(../assets/img/type1_top3.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .stage3List {
    width: 7.06rem;
    position: relative;
    z-index: 10;
    margin: -0.6rem auto;
    li {
      height: 2.65rem;
      background: url(../assets/img/type3_top4.png);
      background-size: 100% 100%;
      margin-bottom: 0.04rem;
      padding-top: 0.15rem;
      // align-items: center;
      .grouplist {
        height: 0.6rem;
        display: flex;
        align-items: center;
        .title {
          width: 2.25rem;
          height: 0.56rem;
          margin-left: 1.68rem;
          &.title1 {
            background: url(../assets/img/groupTitle1.png);
            background-size: 100% 100%;
          }
          &.title2 {
            background: url(../assets/img/groupTitle2.png);
            background-size: 100% 100%;
          }
          &.title3 {
            background: url(../assets/img/groupTitle3.png);
            background-size: 100% 100%;
          }
          &.title4 {
            background: url(../assets/img/groupTitle4.png);
            background-size: 100% 100%;
          }
        }
        .groupScore {
          margin: 0.1rem 0 0 1.38rem;
          .score {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 0.3rem;
            i {
              width: 0.28rem;
              height: 0.26rem;
              background: url(../assets/img/star.png);
              background-size: 100% 100%;
              margin-top: -0.05rem;
            }
            em {
              color: rgba(254, 242, 140, 1);
              font-size: 0.26rem;
              margin-left: 0.06rem;
              // text-align: center;
            }
          }
          .groupT {
            font-size: 0.2rem;

            color: rgba(255, 255, 255, 0.6);
          }
        }
      }
      .peopleList {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 3.84rem;
        margin: 0.23rem 0 0 2.22rem;
        .userItem {
          width: 1rem;
          margin-right: 0.42rem;
          .imgBox {
            width: 0.88rem;
            height: 0.88rem;
            position: relative;
            display: block;
            margin: 0 auto;
            .frame {
              width: 1.5rem;
              height: 1.5rem;
              position: absolute;
              top: -0.31rem;
              left: -0.31rem;
              z-index: 10;
            }
            .av {
              width: 0.88rem;
              height: 0.88rem;
              border-radius: 50%;
              display: block;
              margin: 0 auto;
            }
          }
          .nick {
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.26rem;
            margin: 0.06rem 0 0.04rem;
            text-align: center;
          }
          .score {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 0.3rem;
            i {
              width: 0.28rem;
              height: 0.26rem;
              background: url(../assets/img/star.png);
              background-size: 100% 100%;
              margin-top: -0.05rem;
            }
            em {
              color: rgba(254, 242, 140, 1);
              font-size: 0.26rem;
              margin-left: 0.06rem;
              // text-align: center;
            }
          }
        }
        .userItem:last-child {
          margin-right: 0;
        }
      }
      &.rank1 {
        background: url(../assets/img/type3_top1.png);
        background-size: 100% 100%;
      }
      &.rank2 {
        background: url(../assets/img/type3_top2.png);
        background-size: 100% 100%;
      }
      &.rank3 {
        background: url(../assets/img/type3_top3.png);
        background-size: 100% 100%;
      }
    }
  }
  .stage4List {
    margin-top: -1.7rem;
    position: relative;
    z-index: 10;
    .lastList {
      margin-top: -1rem;
    }
    .listTop {
      width: 7.14rem;
      height: 12.8rem;
      background: url(../assets/img/list4Top.png);
      background-size: 100% 100%;
      margin: 0 auto;
      .scrollLoading {
        font-size: 0.4rem;
        margin-top: 0.8rem;
      }
      .kRoom {
        height: 1.54rem;
        display: flex;
        align-items: center;
        position: relative;
        img {
          width: 1rem;
          height: rem;
          border-radius: 0.08rem;
          margin: 0 0.2rem 0 0.38rem;
          border: 0.02rem solid rgba(255, 205, 98, 1);
          box-sizing: border-box;
        }
        .roomMsg {
          width: 1.8rem;
          .rid {
          }
        }
        .goBtn {
          width: 2.36rem;
          height: 1.02rem;
          background: url(../assets/img/goBtn.png);
          background-size: 100% 100%;
          text-align: center;
          line-height: 1.02rem;
          color: rgba(121, 54, 0, 1);
          font-size: 0.26rem;
          margin-left: 1.1rem;
        }
      }
      .userList {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding-top: 0.72rem;
        .userItem {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-bottom: 0.1rem;
          .imgBox {
            position: relative;
            .avBg {
              width: 100%;
              height: 100%;
              position: absolute;
              z-index: 5;
            }
            .av {
              width: 1.2rem;
              height: 1.2rem;
              border-radius: 50%;
              display: block;
              margin: 0 auto;
              position: absolute;
            }
          }
          .nick {
            width: 100%;
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.26rem;
            margin: 0.04rem 0 0.05rem;
            text-align: center;
          }
          .score {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 0.3rem;
            i {
              width: 0.32rem;
              height: 0.28rem;
              background: url(../assets/img/store.png);
              background-size: 100% 100%;
              margin-top: -0.05rem;
            }
            em {
              color: rgba(254, 242, 140, 1);
              font-size: 0.26rem;
              margin-left: 0.06rem;
              // text-align: center;
            }
          }
          &.item1 {
            width: 100%;
            .imgBox {
              width: 2rem;
              height: 2rem;
            }
            .avBg {
              background: url(../assets/img/lastTop1.png);
              background-size: 100% 100%;
            }
            .av {
              width: 1.6rem;
              height: 1.6rem;
              left: 0.2rem;
              top: 0.2rem;
            }
          }
          &.item2,
          &.item3 {
            width: 40%;
            .imgBox {
              width: 2rem;
              height: 2rem;
            }
            .avBg {
              background: url(../assets/img/lastTop2.png);
              background-size: 100% 100%;
            }
            .av {
              width: 1.6rem;
              height: 1.6rem;
              left: 0.2rem;
              top: 0.2rem;
            }
          }
          &.item4,
          &.item5,
          &.item6 {
            width: 33%;
            .imgBox {
              width: 1.6rem;
              height: 1.6rem;
            }
            .avBg {
              background: url(../assets/img/lastTop3.png);
              background-size: 100% 100%;
            }
            .av {
              width: 1.2rem;
              height: 1.2rem;
              left: 0.2rem;
              top: 0.2rem;
            }
          }
          &.item7,
          &.item8,
          &.item9,
          &.item10,
          &.item11 {
            width: 20%;
            .imgBox {
              width: 1.4rem;
              height: 1.4rem;
            }
            .avBg {
              background: url(../assets/img/lastTop4.png);
              background-size: 100% 100%;
            }
            .av {
              width: 1rem;
              height: 1rem;
              left: 0.2rem;
              top: 0.2rem;
            }
          }
        }
      }

      .kRoom::before {
        content: "";
        display: block;
        width: 6.46rem;
        height: 0.02rem;
        background: rgba(255, 255, 255, 0.2);
        position: absolute;
        bottom: 0;
        left: 0.34rem;
      }
    }
    .listTips {
      width: 7.06rem;
      height: 1.78rem;
      background: url(../assets/img/lastListTips.png);
      background-size: 100% 100%;
      margin: 0.43rem auto;
    }
    .star {
      i {
        background: url(../assets/img/store.png) !important;
        background-size: 100% 100% !important;
      }
    }
    .score {
      .ktv {
        i {
          width: 0.78rem;
          background: url(../assets/img/ktv2.png) !important;
          background-size: 100% 100% !important;
        }
      }
      .room {
        i {
          width: 0.78rem;
          background: url(../assets/img/ktv3.png) !important;
          background-size: 100% 100% !important;
        }
      }
    }
  }
}

.userMsg_2 {
  width: 7.06rem;
  height: 1.6rem;
  background: url(../assets/img/type1_bg.png);
  background-size: 100% 100%;
  margin-bottom: 0.04rem;
  display: flex;
  align-items: center;
  position: relative;
  .imgBox {
    width: 1.2rem;
    height: 1.2rem;
    position: relative;
    margin: 0 0.15rem 0 0.14rem;
    .frame {
      width: 1.5rem;
      height: 1.5rem;
      position: absolute;
      top: -0.16rem;
      left: -0.16rem;
      z-index: 10;
    }
    .avBg {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 2;
    }
    img {
      width: 0.88rem;
      height: 0.88rem;
      border-radius: 50%;
      position: absolute;
      left: 0.16rem;
      top: 0.16rem;
    }
    .rank {
      display: block;
      width: 0.73rem;
      height: 0.28rem;
      line-height: 0.28rem;
      background: url(../assets/img/rankBg.png);
      background-size: 100% 100%;
      position: absolute;
      bottom: 0.15rem;
      left: 0.24rem;
      z-index: 20;
      color: rgba(251, 250, 185, 1);
      font-size: 0.18rem;
      font-weight: 600;
      text-align: center;
    }
  }
  .userMsg {
    width: 3rem;
    .nick,
    .uid {
      font-size: 0.28rem;
      color: rgba(255, 255, 255, 0.6);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .star {
      display: flex;
      align-items: center;
      i {
        width: 0.36rem;
        height: 0.33rem;
        background: url(../assets/img/star.png);
        background-size: 100% 100%;
        margin-right: 0.09rem;
        &.store {
          background: url(../assets/img/store.png);
          background-size: 100% 100%;
        }
      }
      em {
        color: rgba(255, 220, 112, 1);
        font-weight: 600;
      }
    }
  }
  .score {
    margin-left: 0.6rem;
    > div {
      display: flex;
      align-items: center;
      i {
        width: 0.46rem;
        height: 0.26rem;
        margin-right: 0.08rem;
      }
      em {
        color: rgba(254, 254, 254, 0.6);
        font-size: 0.24rem;
      }
      &.work {
        i {
          background: url(../assets/img/work.png);
          background-size: 100% 100%;
        }
      }
      &.ktv {
        margin: 0.12rem 0;
        i {
          background: url(../assets/img/ktv.png);
          background-size: 100% 100%;
        }
      }
      &.room {
        i {
          background: url(../assets/img/room.png);
          background-size: 100% 100%;
        }
      }
    }
    &.store {
      .ktv {
        i {
          width: 0.78rem;
          background: url(../assets/img/ktv2.png);
          background-size: 100% 100%;
        }
      }
      .room {
        i {
          width: 0.78rem;
          background: url(../assets/img/ktv3.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  &.rank1 {
    .avBg {
      background: url(../assets/img/type1_top1.png);
      background-size: 100% 100%;
    }
  }
  &.rank2 {
    .avBg {
      background: url(../assets/img/type1_top2.png);
      background-size: 100% 100%;
    }
  }
  &.rank3 {
    .avBg {
      background: url(../assets/img/type1_top3.png);
      background-size: 100% 100%;
    }
  }
}

.pkUserPup {
  width: 5.06rem;
  height: 4.01rem;
  padding: 0 1rem;
  background: url(../assets/img/pkMsgPup.png);
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0.7rem;
  position: relative;
  .close {
    left: 2.7rem;
  }
  .userItem {
    width: 1.5rem;
    .imgBox {
      width: 1.2rem;
      height: 1.2rem;
      margin: 0 auto;
      position: relative;
      .frame {
        width: 2.04rem;
        height: 2.04rem;
        position: absolute;
        left: -0.42rem;
        top: -0.42rem;
        z-index: 20;
      }
      .av {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        display: block;
        margin: 0 auto;
        position: absolute;
        &.bor {
          border: 0.04rem solid rgba(255, 208, 80, 1);
          box-sizing: border-box;
        }
      }
      .up {
        display: block;
        width: 0.8rem;
        height: 0.8rem;
        z-index: 21;
        position: absolute;
        right: -0.2rem;
        bottom: -0.2rem;
        &.up {
          background: url(../assets/img/up.png);
          background-size: 100% 100%;
        }
        &.lose {
          background: url(../assets/img/lose.png);
          background-size: 100% 100%;
        }
      }
    }
    .tcenter {
      height: 0.3rem;
      line-height: 0.3rem;
      text-align: center;
      color: rgba(254, 254, 254, 0.6);
      font-size: 0.24rem;
    }
    .work {
      margin-top: 0.1rem;
    }
    .ktv {
      margin: 0.15rem 0;
    }
    .room,
    .work,
    .ktv {
      position: relative;
    }
    .nick {
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.26rem;
      margin: 0.1rem 0 0.08rem;
      text-align: center;
    }
    .uid {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.26rem;
    }
    .score {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 0.3rem;
      i {
        width: 0.28rem;
        height: 0.26rem;
        background: url(../assets/img/star.png);
        background-size: 100% 100%;
        margin-top: -0.05rem;
      }
      em {
        color: rgba(254, 242, 140, 1);
        font-size: 0.26rem;
        margin-left: 0.06rem;
        // text-align: center;
      }
    }
    &.icon {
      .work::before {
        content: "";
        display: block;
        width: 0.46rem;
        height: 0.26rem;
        background: url(../assets/img/work.png);
        background-size: 100% 100%;
        position: absolute;
        right: -0.8rem;
      }
      .ktv::before {
        content: "";
        display: block;
        width: 0.46rem;
        height: 0.26rem;
        background: url(../assets/img/ktv.png);
        background-size: 100% 100%;
        position: absolute;
        right: -0.8rem;
      }
      .room::before {
        content: "";
        display: block;
        width: 0.46rem;
        height: 0.26rem;
        background: url(../assets/img/room.png);
        background-size: 100% 100%;
        position: absolute;
        right: -0.8rem;
      }
    }
  }
  .vs {
    display: block;
    width: 0.51rem;
    height: 0.4rem;
    background: url(../assets/img/vs.png);
    background-size: 100% 100%;
    position: absolute;
    left: 2.85rem;
    top: 0.79rem;
  }
}

.listTipsBox {
  margin: 0.4rem auto 0;
  position: relative;
  z-index: 30;
}
.pupTips {
  width: 6.53rem;
  // height: 7.87rem;
  background: url(../assets/img/pupMsgBg.png);
  background-size: 100% 100%;
  padding: 0.4rem 0.24rem 0.25rem;
  position: relative;
  h5 {
    text-align: center;
    color: rgba(253, 203, 125, 1);
    font-size: 0.32rem;
    margin-bottom: 0.2rem;
  }
  p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.28rem;
  }
  .ps {
    text-align: left;
    margin: 0.2rem 0 0;
  }
}

.close {
  display: block;
  width: 0.8rem;
  height: 0.8rem;
  background: url(../assets/img/close.png);
  background-size: 100% 100%;
  position: absolute;
  bottom: -1rem;
  left: 3.1rem;
}

.dengdai {
  text-align: center;
}
.scrollLoading {
  text-align: center;
  color: #ffefd7;
  font-size: 80%;
  margin-top: 0.8rem;
}
.scrollNone {
  text-align: center;
  color: #ffefd7;
  font-size: 80%;
  margin-top: 0.8rem;
}
.refresh {
  display: block;
  width: 0.94rem;
  height: 1rem;
  position: fixed;
  right: 0.08rem;
  bottom: 2rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: all 1s;
  text-indent: -999rem;
  z-index: 10000;
}
</style>
