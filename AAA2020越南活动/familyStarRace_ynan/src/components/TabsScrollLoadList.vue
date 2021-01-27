<template>
  <div class="rankGroups">
    <!-- 三個類別 -->
    <div class="typeMainTabs">
      <i class="liner"></i>
      <span class="tab1" @click="setShowType(1)" :class="{act:showType == 1}"><strong>Sao Lấp Lánh</strong> <em>{{getDate(stime1,1)}}-{{getDate(etime1,1)}}</em> </span>
      <span class="tab2" @click="setShowType(2)" :class="{act:showType == 2}"><strong>Sao Sáng Nhất</strong><em>{{getDate(stime2,1)}}-{{getDate(etime2,1)}}</em> </span>
      <span class="tab3" @click="setShowType(3)" :class="{act:showType == 3}"><strong>Sao Xuất Hiện</strong><em>{{getDate(stime3,1)}}-{{getDate(etime3,1)}}</em> </span>
    </div>
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs" v-if="showType == 1">
      <div class="tabs">
        <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">BXH Ngày</a>
        <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">BXH Tổng</a>
      </div>
      <!-- <a @click.prevent="onRefresh" href="" v-if="tab == nowDay && !isShare && actStatus===1" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh">刷新</a> -->
    </div>
    <!-- <div v-if="mainTab==0" class="tabs">
      <a @click.prevent="tabClick(0)" :class="{current:tab==0}" href="">日榜1</a>
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">日榜2</a>
      <a @click.prevent="tabClick(2)" :class="{current:tab==2}" href="">日榜3</a>
    </div> -->
    <div class="downTimebox">
      <div v-if="mainTab == 0 &&  showType ==1" class="timeTips">
        <p v-if="tab == nowDay && actStatus == 1">- Đếm ngược dừng BXH Ngày -</p>
        <p v-else-if="(tab > nowDay || actStatus == 0) && nowShowType == 1">- Đếm ngược mở BXH Ngày -</p>
        <p class="noTime" v-else>- Bảng ngày đã kết thúc -</p>
      </div>
      <div class="timeTips" v-else-if="mainTab == 1 &&  showType ==1">
        <p v-if="actStatus == 0 ">- Đếm ngược mở BXH Tổng -</p>
        <p v-else-if="actStatus == 1&& nowShowType == 1">- Đếm ngược dừng BXH Tổng - </p>
        <p v-else>- Bảng tổng đã kết thúc - </p>
      </div>
      <div class="timeTips" v-else-if="showType ==2">
        <p v-if="actStatus == 0 || nowShowType == 1">- Đếm ngược mở vòng Sao Sáng Nhất -</p>
        <p v-else-if="actStatus == 1&& nowShowType == 2">- Đếm ngược hết vòng Sao Sáng Nhất - </p>
        <p v-else>- Vòng Sao Sáng Nhất đã kết thúc - </p>
      </div>
      <div class="timeTips" v-else-if="showType ==3">
        <p v-if="actStatus == 0|| nowShowType == 1|| nowShowType == 2">- Đếm ngược mở vòng thi Ngôi Sao Xuất Hiện -</p>
        <p v-else-if="actStatus == 1&& nowShowType == 3">- Đếm ngược dừng vòng thi Ngôi Sao Xuất Hiện - </p>
        <p v-else>- Ngôi Sao Gia Tộc đã kết thúc - </p>
      </div>
      <!-- surplusTime.day &&-->
      <div class="timeDown" v-if=" rank.second > 0">
        <div class="day">
          <strong>{{surplusTime.day}}</strong>
          <em>ngày</em>
        </div>
        <div class="hours">
          <strong>{{surplusTime.hour}}</strong>
          <em>giờ</em>
        </div>
        <div class="min">
          <strong>{{surplusTime.minute}}</strong>
          <em>phút</em>
        </div>
        <div class="second">
          <strong>{{surplusTime.second}}</strong>
          <em>giây</em>
        </div>
      </div>
      <p class="rankTips" v-if="showType==1 && mainTab == 0">Điểm sao = Điểm mị quà xu nhận tại phòng hát/tác phẩm + Điểm nhiệm vụ. </p>
      <p class="rankTips" v-if="showType==1 && mainTab == 1">
        Điểm sao = Điểm mị quà xu nhận tại phòng hát/tác phẩm + Điểm nhiệm vụ.<br />
        Dựa vào tổng điểm sao trong vòng thi Sao Lấp Lánh, top 500 vào vòng sau
      </p>
      <p class="rankTips" v-if="showType==2">Điểm sao = Điểm mị quà xu nhận tại phòng hát/tác phẩm + Điểm nhiệm vụ.<br />
        Thí sinh vào vòng sau cùng gia tộc tạo thành 1 đội, đại diện gia tộc tham gia thi đấu.<br />
        phe thắng vào vòng sau và nhận túi quà Gia Tộc.
      </p>
      <p class="rankTips" v-if="showType==3">
        Gia tộc tăng cấp được thưởng túi quà, cấp I, II, III tương ứng điểm sao 10k, 100k, 500k.<br />
        Điểm sao = Điểm mị quà xu nhận tại phòng hát/tác phẩm + Điểm nhiệm vụGia tộc tăng cấp được thưởng túi quà, 20-22h ngày cuối cùng được tăng 10%.
      </p>
    </div>
    <!-- 日榜 -->
    <DayTabs v-if="mainTab == 0 && showType== 1" @changeClick="tabClick" :tab="tab"></DayTabs>
    <!-- <p class="scoreTips" v-else>榜單時間：{{actTime}}</p> -->
    <img src="../assets/img/dayGiftImg.png" alt="" class="dayGiftImg" v-if="showType ==1 && mainTab==0">
    <ul v-if="showType ==1" class="list day">
      <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goPeople(item.uid,item.live)">
        <div class="rank">{{item.rank}}</div>
        <div class="uerImg">
          <img v-if="item.nob > 0" :src="require(`../assets/img/nob/${item.nob}.png`)" class="nob" alt="">
          <i class="vip" v-else-if="item.vip > 0">VIP{{item.vip}}</i>
          <span class="imgBg" v-if="item.nob ==  0"></span>
          <img v-lazy="item.avatar" alt="" class="imgItem">
        </div>
        <div class="userMsg">
          <div class="name"><strong>{{item.nick}} </strong> <i class="live" v-if="item.live"></i> </div>
          <div class="score">{{item.fname}}</div>
        </div>
        <div class="score">
          <div class="star"><i></i> {{item.score}}</div>
          <div class="num" v-if="mainTab==0">Tỷ lệ trúng {{item.pro}}%</div>
        </div>
        <span class="award" v-if="mainTab==0 && item.is_prize"></span>
      </li>
    </ul>
    <ul v-else-if="showType ==2" class="stage2List">
      <li v-for="(item,index) in rank.list" :key="index" :class="[{min:item.empty},'rank'+item.rank]">
        <i class="jinji left" v-if="item.pk_data&&item.pk_data.left.win"></i>
        <i class="jinji right" v-if="item.pk_data.right&&item.pk_data.right.win"></i>
        <div class="familyMsg">
          <div class="family1 family">
            <img v-lazy="item.pk_data.left.avatar" class="fImg" alt="" @click.stop="showFamily(item.pk_data.left.fid)">
            <div class="msg">
              <div class="nick">{{item.pk_data.left.name}}</div>
              <div class="star"><i></i><strong>{{item.pk_data.left.score}}</strong></div>
            </div>
          </div>
          <div class="family2 family">
            <p class="noOpponents" v-if="item.empty">Không cần đấu，Qua vòng</p>
            <div class="msg" v-else>
              <div class="nick">{{item.pk_data.right.name}}</div>
              <div class="star"><i></i><strong>{{item.pk_data.right.score}}</strong></div>
            </div>
            <img v-lazy="item.pk_data.right.avatar" class="fImg2" alt="" v-if="!item.empty" @click.stop="showFamily(item.pk_data.right.fid)">
          </div>
        </div>
        <div class="fLiner" v-if="!item.empty">
          <span class="left" :style="{width:getWidth(item.pk_data.left.score,item.pk_data.right.score)}"><i class="giftBox"></i></span>
          <span class="right"></span>
        </div>
        <div class="fPeopleList" v-if="!item.empty">
          <div class="left">
            <div class="userItem" v-for="(item2,index2) in item.pk_data.left.users" :key="index2">
              <span class="userImgBox" @click="goPeople(item2.uid)">
                <span :class="'user'+ (index2+1)"></span>
                <img v-lazy="item2.avatar" alt="">
              </span>
              <strong>{{item2.score}}</strong>
            </div>
          </div>
          <i class="vs"></i>
          <div class="rigth">
            <div class="userItem" v-for="(item2,index2) in item.pk_data.right.users" :key="index2">
              <span class="userImgBox" @click="goPeople(item2.uid)">
                <span :class="'user'+ (index2+1)"></span>
                <img v-lazy="item2.avatar" alt="">
              </span>
              <strong>{{item2.score}}</strong>
            </div>
          </div>
        </div>
        <div class="fPeopleList" v-else>
          <div class="left">
            <div class="userItem" v-for="(item2,index2) in item.pk_data.left.users" :key="index2">
              <span class="userImgBox" @click="goPeople(item2.uid)">
                <span :class="'user'+ (index2+1)"></span>
                <img v-lazy="item2.avatar" alt="">
              </span>
              <strong>{{item2.score}}</strong>
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
    <div v-if="rank.loading" class="scrollLoading">Đang cập nhật...</div>
    <div v-if="rank.none && rank.list.length == 0 " class="scrollNone">
      Hiện nay chưa có bạn bè lên bảng</br>
      Sự kiện đang chờ bạn tham gia!
    </div>
    <div v-if="mainTab==0 && tab > nowDay" class="dengdai">Hãy vui lòng chờ đón!</div>
    <!--  -->
    <div class="mask" v-show="showFcards">
      <transition name="slide">
        <div class="familyCard" v-if="showFcards">
          <i class="close" @click="closeCards()"></i>
          <div class="title">Thẻ gia tộc</div>
          <div class="msg">
            <img v-lazy="cardsMsg.family.avatar" alt="" @click="goFroom()">
            <div class="nick">{{cardsMsg.family.familyname}}</div>
            <div class="id">ID gia tộc: <strong>{{cardsMsg.family.fid}}</strong></div>
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
      cardsMsg: {}
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
    }
  },
  computed: {
    ...mapState(['rankGroups', "nowShowType", "nowDay", "oneNowDay", "dateArr", "inited", "isShare", "actStatus", "showType", "timeObj"]),
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
            dayApi = `/family_star/list${this.showType}.php?from={from}&time={tm}`;
          } else {
            dayApi = `/family_star/list${this.showType}.php?from={from}&time=0`;
          }
        } else {
          dayApi = `/family_star/list${this.showType}.php?from={from}`;
        }
        // var totalApi = `/family_star/list${this.showType}.php?token={token}&from={from}`;
        // var api = this.rankKey == 'total' ? totalApi : dayApi;
        const token = getUrlString('token') || '';
        return dayApi.replace('{token}', token).replace('{tm}', this.getNowDate())
      } else {
        var dayApi = ''
        if (this.showType == 1) {
          if (this.mainTab == 0) {
            dayApi = `/family_star/list${this.showType}.php?token={token}&from={from}&time={tm}`;
          } else {
            dayApi = `/family_star/list${this.showType}.php?token={token}&from={from}&time=0`;
          }
        } else {
          dayApi = `/family_star/list${this.showType}.php?token={token}&from={from}`;
        }
        // var totalApi = `/family_star/list${this.showType}.php?token={token}&from={from}`;
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
      if (!this.rank.loading && !this.rank.loadEnd) {
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
      console.log(live)
      location.href = `uid:${uid}`
    },
    showFamily(fid) {
      let type = this.showType == 2 ? 0 : 1
      api.fCards(type, fid).then(res => {
        console.log(res)
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
      strong {
        font-size: 0.28rem;
      }
      em {
        display: block;
        font-size: 0.22rem;
        margin-top: 0.05rem;
      }
      &.tab1 {
        background: url(../assets/img/tab1.png);
        background-size: 100% 100%;
        &.act {
          color: rgba(255, 255, 255, 1);
          background: url(../assets/img/tab1Act.png);
          background-size: 100% 100%;
        }
      }
      &.tab2 {
        background: url(../assets/img/tab2.png);
        background-size: 100% 100%;
        &.act {
          color: rgba(255, 255, 255, 1);
          background: url(../assets/img/tab2Act.png);
          background-size: 100% 100%;
        }
      }
      &.tab3 {
        background: url(../assets/img/tab3.png);
        background-size: 100% 100%;
        &.act {
          color: rgba(255, 255, 255, 1);
          background: url(../assets/img/tab3Act.png);
          background-size: 100% 100%;
        }
      }
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
      width: 6.76rem;
      height: 0.78rem;
      padding: 0 0.07rem;
      background: url(../assets/img/tabs.png);
      background-size: 100% 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.13rem auto 0;
      > a {
        display: block;
        width: 3.33rem;
        height: 0.64rem;
        text-align: center;
        line-height: 0.64rem;
        // background: url(../assets/img/dayTitle.png);
        // background-size: 100% 100%;
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
  // .scoreTips {
  //   text-align: center;
  //   color: #9AFEFF;
  //   font-size: 80%;
  //   margin: 0.2rem 0 0.11rem 0;
  // }
  .timeTips {
    > p {
      margin-top: 0.11rem;
      width: 6.98rem;
      font-size: 80%;
      color: rgba(238, 172, 104, 1);
    }
  }
  .downTimebox {
    margin: 0 auto;
    width: 6.98rem;
    text-align: center;
    // background: url(../assets/img/timeBg.png);
    // background-size: 100% 100%;
    position: relative;
    .timeDown {
      width: 4.64rem;
      height: 0.76rem;
      padding: 0 0.25rem;
      margin: 0.12rem auto 0;
      background: url(../assets/img/timeBg.png);
      background-size: 100% 100%;
      display: flex;
      justify-content: space-between;
      > div {
        height: 100%;
        line-height: 0.76rem;
        display: inline-block;
        strong {
          font-size: 0.48rem;
          font-weight: bold;
        }
        em {
          font-size: 0.22rem;
          color: rgba(238, 172, 104, 1);
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
  .dayGiftImg {
    width: 6.98rem;
    height: 2.42rem;
    display: block;
    margin: 0.27rem auto 0;
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
      height: 1.18rem;
      margin-bottom: 0.2rem;
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
        .imgBg {
          width: 1rem;
          height: 1.01rem;
          background: url(../assets/img/av4.png);
          background-size: 100% 100%;
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
        .name,
        .rName {
          height: 0.4rem;
          display: flex;
          align-items: center;
          strong {
            max-width: 1.85rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 0.26rem;
          }
          .live {
            width: 0.78rem;
            height: 0.33rem;
            background: url(../assets/img/live.png);
            background-size: 100% 100%;
            margin-left: 0.06rem;
          }
        }
        .rNick {
          color: #ff8cfe;
          margin-top: -0.05rem;
        }
        .score {
          display: flex;
          align-items: center;
          color: rgba(255, 231, 184, 1);
          font-size: 0.22rem;
          font-weight: 500;
          i {
            display: block;
            margin-right: 0.1rem;
            width: 0.22rem;
            height: 0.25rem;
            background: url(../assets/img/coins.png);
            background-size: 100% 100%;
          }
        }
      }
      > .score {
        flex: 1;
        .star {
          font-size: 0.32rem;
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
          font-size: 0.22rem;
          color: rgba(255, 231, 184, 1);
        }
      }
      .award {
        display: block;
        width: 0.97rem;
        height: 0.77rem;
        background: url(../assets/img/award.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: 0;
        right: 1.81rem;
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
        background: url(../assets/img/listItem2.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        background: url(../assets/img/listItem2.png);
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
      height: 2.95rem;
      margin-bottom: 0.2rem;
      background: url(../assets/img/stage2ListBg.png);
      background-size: 100% 100%;
      position: relative;
      .jinji {
        display: block;
        width: 1.45rem;
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
      &.min {
        height: 2.61rem;
        background: url(../assets/img/stage2ListMinBg.png);
        background-size: 100% 100%;
        .fPeopleList {
          width: 6.16rem;
          height: 1.04rem;
          background: url(../assets/img/minFpeople.png);
          background-size: 100% 100%;
          .left {
            justify-content: center;
            .userItem {
              margin: 0 0.13rem;
            }
            strong {
              display: block;
              text-align: center;
            }
          }
        }
      }
      .familyMsg {
        height: 1.4rem;
        padding: 0 0.3rem;
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
        width: 6.3rem;
        height: 0.16rem;
        display: flex;
        align-items: center;
        margin: 0 auto;
        span {
          height: 100%;
        }
        .left {
          width: 50%;
          background: linear-gradient(
            90deg,
            rgba(255, 144, 83, 1) 0%,
            rgba(255, 58, 58, 1) 39%
          );
          border-radius: 0.08rem 0 0 0.08rem;
          position: relative;
          .giftBox {
            position: absolute;
            width: 0.53rem;
            height: 0.54rem;
            background: url(../assets/img/giftBox.png);
            background-size: 100% 100%;
            right: -0.27rem;
            top: -0.24rem;
          }
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
      .fPeopleList {
        width: 6.08rem;
        height: 1.04rem;
        background: url(../assets/img/fPeopleBg.png);
        background-size: 100% 100%;
        margin: 0.13rem auto 0;
        display: flex;
        align-items: center;
        > div {
          flex: 1;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          &.left {
            margin-left: -0.16rem;
          }
          &.right {
            margin-right: -0.16rem;
          }
          .userItem {
            position: relative;
            margin-right: 0.13rem;
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
        .vs {
          width: 1.4rem;
          height: 1.38rem;
          background: url(../assets/img/vs.png);
          background-size: 100% 100%;
        }
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
