<template>
  <div class="pList">
    <div class="totalListItem" v-for="(item,index) in list " :key="index">
      <!-- 人物评选榜单 -->
      <div class="itemTop" :class="'list'+item.act_id" v-if="item.act_id ==0">
        <div class="hasPeople" v-if="item.show">
          <div class="listItem" v-for="(item,index) in item.show_data " :key="index">
            <div class="title">{{peopleTitle[index]}}</div>
            <div class="imgBox" :class="{br:index== 2 || index==3}" @click="goUser(item[0])">
              <img class="pd" src="../assets/img/title/default_3.png" alt="" v-if="index==0|| index== 1">
              <img :src="item[0].avatar" alt="" class="av">
              <span class="mv" v-if="index==3"><i>mv</i></span>
            </div>
            <strong class="nick has">{{item[0].nick}}</strong>
            <div class="more" @click="showMore(item)">查看更多</div>
          </div>
        </div>
        <div class="not" v-else>
          <div class="listItem" v-for="(item,index) in peopleDefaultList_0" :key="index">
            <div class="title">{{peopleTitle[index]}}</div>
            <div class="imgBox">
              <img :src="item[0].avatar" alt="" class="av">
              <span class="mv" v-if="index==3"><i>mv</i></span>
            </div>
            <strong class="nick">{{item[0].nick}}</strong>
          </div>
        </div>
      </div>
      <!-- K房男女神榜单 -->
      <div class="kroomList" v-else-if="item.act_id ==3">
        <div class="noData">
          <div class="man" :class="{girl:index==1}" v-for="(item,index) in item.show?item.show_data:kroomDefault" :key="index">
            <ul class="userList">
              <li v-for="(item2,index2) in item" :key="index2" :class="'item' + index2">
                <img :src="item2.avatar" alt="" class="defaultAv" v-if="!item.show">
                <div class="imgBox" :class="'top' + item2.rank" v-else @click="goUser(item2)">
                  <span class="avBg"></span>
                  <img v-lazy="item2.avatar" alt="" class="av">
                </div>
                <strong class="nick" :class="{act:item.show}">{{item2.nick}}</strong>
              </li>
            </ul>
            <div class="more" @click="showMore(item[index])" v-if="item.show">查看更多</div>
          </div>
        </div>
      </div>
      <!-- 其他榜单 -->
      <div class="otherList" :class="'list'+item.act_id" v-else-if="item.act_id != 8 &&item.act_id != 1">
        <ul class="userList">
          <li v-for="(item2,index2) in showActList(item)" :key="index2" :class="'item' + index2">
            <img :src="item2.avatar" alt="" class="defaultAv" v-if="!item.show">
            <div class="imgBox" :class="[{fstyle:item.act_id == 7},'top' + item2.rank]" v-else @click="goUser(item2)">
              <span class="avBg"></span>
              <img v-lazy="item2.avatar" alt="" class="av">
            </div>
            <strong class="nick" :class="{act:item.show}">{{item2.nick}}</strong>
          </li>
        </ul>
        <div class="more" @click="showMore(item.show_data[0])" v-if="item.show">查看更多</div>
      </div>
      <!-- 查看更多 -->
      <div class="mask" v-show="showListPup">
        <transition name="slide">
          <div class="listPup" v-show="showListPup">
            <i class="close" @click="closeListPup()"></i>
            <ul>
              <li v-for="(item,index) in pupListData " :key="index">
                <span class="rank">{{item.rank}}</span>
                <div class="imgBox" :class="{song:!item.uid}" @click="goUser(item)">
                  <span class="default"></span>
                  <img :src="item.avatar" alt="" class="av">
                </div>
                <div class="nick">{{item.nick}}</div>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>

  </div>
</template>
<script>
import api from "../api/apiConfig"
export default {
  data() {
    return {
      list: [],
      peopleTitle: ['最佳男歌手', "最佳女歌手", "最佳單曲", "最佳MV"],
      kroomDefault: [
        [
          {
            "uid": '',
            "avatar": require("../assets/img/top1.png"),
            "nick": "虚位以待",
            "rank": 1
          },
          {
            "uid": '',
            "avatar": require("../assets/img/top2.png"),
            "nick": "虚位以待",
            "rank": 1
          },
          {
            "uid": '',
            "avatar": require("../assets/img/top3.png"),
            "nick": "虚位以待",
            "rank": 1
          }
        ],
        [
          {
            "uid": '',
            "avatar": require("../assets/img/top1.png"),
            "nick": "虚位以待",
            "rank": 1
          },
          {
            "uid": '',
            "avatar": require("../assets/img/top2.png"),
            "nick": "虚位以待",
            "rank": 1
          },
          {
            "uid": '',
            "avatar": require("../assets/img/top3.png"),
            "nick": "虚位以待",
            "rank": 1
          }
        ]
      ],
      peopleDefaultList_0: [
        [
          {
            "uid": '',
            "avatar": require("../assets/img/title/default_3.png"),
            "nick": "虚位以待",
            "rank": 1
          }
        ],
        [
          {
            "uid": '',
            "avatar": require("../assets/img/title/default_3.png"),
            "nick": "虚位以待",
            "rank": 1
          }
        ],
        [
          {
            "uid": '',
            "avatar": require("../assets/img/title/default_2.png"),
            "nick": "虚位以待",
            "rank": 1
          }
        ],
        [
          {
            "uid": '',
            "avatar": require("../assets/img/title/default_2.png"),
            "nick": "虚位以待",
            "rank": 1
          }
        ]
      ],
      pupListData: [],
      showListPup: false
    }
  },
  created() {
    api.allList().then(res => {
      this.list = res.data.response_data.list
    })
  },
  methods: {
    showActList(item) {
      if (item.show) {
        if (item.act_id == 4 || item.act_id == 5) {
          return item.show_data[0].slice(0, 1)
        } else {
          return item.show_data[0]
        }
      } else {
        if (item.act_id == 4 || item.act_id == 5) {
          return this.kroomDefault[0].slice(0, 1)
        } else {
          return this.kroomDefault[0]
        }
      }
    },
    closeListPup() {
      this.showListPup = false
    },
    goUser(item) {
      if (item.uid) {
        location.href = `uid:${item.uid}`
      } else if (item.fid) {
        location.href = `fid:${item.fid}`
      } else if (item.sid) {
        console.log(item.sid)
        location.href = 'songid:{"songlist":[' + item.sid + '],"index":0}';
      }
    },
    showMore(item) {
      this.pupListData = item
      this.showListPup = true
    },
  }
}
</script>
<style lang="scss">
.pList {
  .totalListItem {
    margin-bottom: 0.39rem;
    .itemTop {
      display: flex;
      align-items: center;
      .hasPeople,
      .not {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .listItem {
          width: 3rem;
          height: 3.8rem;
          background: url(../assets/img/title/listItem.png);
          background-size: 100% 100%;
          margin-top: 0.64rem;
          position: relative;
          .title {
            height: 0.45rem;
            line-height: 0.5rem;
            font-size: 0.28rem;
            font-weight: 500;
            text-align: center;
            color: rgba(255, 184, 108, 1);
          }
          .imgBox {
            width: 1.6rem;
            height: 1.6rem;
            position: relative;
            margin: 0 auto;
            margin: 0.45rem auto 0;
            .mv {
              display: block;
              width: 1.6rem;
              height: 1.6rem;
              background: url(../assets/img/title/mv.png);
              background-size: 100% 100%;
              position: absolute;
              top: 0;
              left: 0;
              i {
                display: block;
                width: 0.6rem;
                line-height: 0.3rem;
                text-align: center;
                font-size: 0.24rem;
                color: rgba(48, 17, 21, 1);
                font-weight: 500;
              }
            }
            .av {
              display: block;
              width: 1.6rem;
              height: 1.6rem;
            }
          }
          .nick {
            display: block;
            text-align: center;
            color: rgba(255, 237, 193, 0.3);
            margin-top: 0.29rem;
            &.has {
              padding: 0 0.2rem;
              color: rgba(255, 237, 193, 1);
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          .more {
            width: 1.8rem;
            height: 0.56rem;
            background: url(../assets/img/actBtn.png);
            background-size: 100% 100%;
            text-align: center;
            line-height: 0.56rem;
            font-size: 0.28rem;
            color: rgba(108, 44, 0, 1);
            font-weight: 600;
            position: absolute;
            left: 0.6rem;
            bottom: -0.25rem;
          }
        }
      }
      .hasPeople {
        .imgBox {
          &.br {
            .av {
              width: 1.6rem !important;
              height: 1.6rem !important;
              border-radius: 0.16rem;
              left: 0;
              top: 0;
            }
            .mv {
              z-index: 5;
            }
          }
          .pd {
            width: 1.6rem;
            height: 1.6rem;
            position: absolute;
          }
          .av {
            width: 1.5rem !important;
            height: 1.5rem !important;
            border-radius: 50%;
            position: absolute;
            left: 0.05rem;
            top: 0.05rem;
            z-index: 5;
          }
        }
      }
      &.list0 {
        width: 6.26rem;
        height: 10.33rem;
        padding: 0 0.32rem;
        background: url(../assets/img/title/title0.png);
        background-size: 100% 100%;
        margin: 0 auto;
      }
    }
    .kroomList {
      .man {
        width: 6.9rem;
        height: 2.84rem;
        background: url(../assets/img/title/title3_1.png);
        background-size: 100% 100%;
        margin: 0.35rem auto;
        padding-top: 1.69rem;
        position: relative;
        .userList {
          padding: 0 0.64rem;
          display: flex;
          align-items: center;
          justify-content: center;
          li {
            margin-right: 0.7rem;
            .defaultAv {
              width: 1.4rem;
              height: 1.4rem;
              display: block;
            }
            .imgBox {
              width: 1.4rem;
              height: 1.4rem;
              margin: 0 auto;
              position: relative;
              .avBg {
                width: 100%;
                height: 100%;
                position: absolute;
                z-index: 2;
              }
              .av {
                width: 100%;
                height: 100%;
                position: absolute;
                border-radius: 50%;
              }
              &.top1 {
                .avBg {
                  background: url(../assets/img/title/p1.png);
                  background-size: 100% 100%;
                }
              }
              &.top2 {
                .avBg {
                  background: url(../assets/img/title/p2.png);
                  background-size: 100% 100%;
                }
              }
              &.top3 {
                .avBg {
                  background: url(../assets/img/title/p3.png);
                  background-size: 100% 100%;
                }
              }
            }
            strong {
              display: block;
              text-align: center;
            }
            .nick {
              display: block;
              width: 1.5rem;
              font-size: 0.28rem;
              color: rgba(255, 237, 193, 0.3);
              margin-top: 0.39rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              &.act {
                color: rgba(255, 237, 193, 1);
              }
            }
            &.item0 {
              order: 2;
            }
            &.item1 {
              order: 1;
            }
            &.item2 {
              order: 3;
            }
          }
          li:last-child {
            margin-right: 0;
          }
        }
        &.girl {
          background: url(../assets/img/title/title3_2.png);
          background-size: 100% 100%;
        }
        .more {
          width: 1.8rem;
          height: 0.56rem;
          background: url(../assets/img/actBtn.png);
          background-size: 100% 100%;
          text-align: center;
          line-height: 0.56rem;
          font-size: 0.28rem;
          color: rgba(108, 44, 0, 1);
          font-weight: 600;
          position: absolute;
          left: 2.5rem;
          bottom: -0.25rem;
        }
      }
    }
    .otherList {
      width: 6.9rem;
      height: 2.73rem;
      padding-top: 1.8rem;
      margin: 0 auto;
      position: relative;
      .userList {
        padding: 0 0.64rem;
        display: flex;
        align-items: center;
        justify-content: center;
        li {
          margin-right: 0.7rem;
          .defaultAv {
            width: 1.4rem;
            height: 1.4rem;
            display: block;
          }
          .imgBox {
            width: 1.4rem;
            height: 1.4rem;
            margin: 0 auto;
            position: relative;
            .avBg {
              width: 100%;
              height: 100%;
              position: absolute;
              z-index: 2;
            }
            .av {
              width: 100%;
              height: 100%;
              position: absolute;
              border-radius: 50%;
            }
            &.top1 {
              order: 1;
              .avBg {
                background: url(../assets/img/title/p1.png);
                background-size: 100% 100%;
              }
            }
            &.top2 {
              .avBg {
                background: url(../assets/img/title/p2.png);
                background-size: 100% 100%;
              }
            }
            &.top3 {
              .avBg {
                background: url(../assets/img/title/p3.png);
                background-size: 100% 100%;
              }
            }
            &.fstyle {
              .av {
                border-radius: 0.16rem;
              }
              &.top1 {
                order: 1;
                .avBg {
                  background: url(../assets/img/title/f1.png);
                  background-size: 100% 100%;
                }
              }
              &.top2 {
                .avBg {
                  background: url(../assets/img/title/f2.png);
                  background-size: 100% 100%;
                }
              }
              &.top3 {
                .avBg {
                  background: url(../assets/img/title/f3.png);
                  background-size: 100% 100%;
                }
              }
            }
          }
          strong {
            display: block;
            text-align: center;
          }
          .nick {
            display: block;
            width: 1.5rem;
            font-size: 0.28rem;
            color: rgba(255, 237, 193, 0.3);
            margin-top: 0.39rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            &.act {
              color: rgba(255, 237, 193, 1);
            }
          }
          &.item0 {
            order: 2;
          }
          &.item1 {
            order: 1;
          }
          &.item2 {
            order: 3;
          }
        }
        li:last-child {
          margin-right: 0;
        }
      }
      .more {
        width: 1.8rem;
        height: 0.56rem;
        background: url(../assets/img/actBtn.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.56rem;
        font-size: 0.28rem;
        color: rgba(108, 44, 0, 1);
        font-weight: 600;
        position: absolute;
        left: 2.5rem;
        bottom: -0.25rem;
      }
      &.list2 {
        background: url(../assets/img/title/title2.png);
        background-size: 100% 100%;
      }
      &.list6 {
        background: url(../assets/img/title/title6.png);
        background-size: 100% 100%;
      }
      &.list4 {
        background: url(../assets/img/title/title4.png);
        background-size: 100% 100%;
      }
      &.list7 {
        background: url(../assets/img/title/title7.png);
        background-size: 100% 100%;
      }
      &.list5 {
        background: url(../assets/img/title/title5.png);
        background-size: 100% 100%;
      }
    }
    .listPup {
      width: 6.74rem;
      height: 8rem;
      padding-top: 1.31rem;
      background: url(../assets/img/title/listPup.png);
      background-size: 100% 100%;
      position: relative;
      .close {
        display: block;
        width: 0.8rem;
        height: 0.8rem;
        background: url(../assets/img/close.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: -1rem;
        left: 2.96rem;
      }
      ul {
        width: 6rem;
        height: 7.35rem;
        margin: 0.15rem auto;
        overflow-y: scroll;
        li {
          height: 1.1rem;
          display: flex;
          align-items: center;
          margin-bottom: 0.39rem;
          .rank {
            width: 1.18rem;
            text-align: center;
            font-size: 0.4rem;
            color: rgba(255, 225, 163, 1);
          }
          .imgBox {
            width: 1.08rem;
            height: 1.08rem;
            position: relative;
            .default {
              position: absolute;
              width: 1.08rem;
              height: 1.08rem;
              background: url(../assets/img/title/av1.png);
              background-size: 100% 100%;
              z-index: 1;
            }
            .av {
              position: absolute;
              width: 1.08rem;
              height: 1.08rem;
              border-radius: 50%;
            }
            &.song {
              .default {
                background: url(../assets/img/title/av2.png);
                background-size: 100% 100%;
              }
              .av {
                border-radius: 0.16rem;
              }
            }
          }
          .nick {
            max-width: 3rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 0.32rem;
            margin-left: 0.3rem;
          }
        }
      }
    }
  }
  .totalListItem:first-child {
    margin-top: 0.59rem;
  }
}
</style>
