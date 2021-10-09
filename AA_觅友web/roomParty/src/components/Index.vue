<template>
  <div class="page pageIndex">
    <div class="pageCon">
      <div class="title">
        <strong>房間活動</strong>
        <i class="qurey" @click="$router.push({name:'Rule'})"></i>
        <i class="creat" @click="$router.push({name:'CreatAct'})">發佈</i>
      </div>
      <ul class="actList">
        <li v-for="(item,index) in list" :key="index" :class="'themeType'+item.themeType">
          <div class="actMsg">
            <img :src="image" alt="">
            <div class="actTips">
              <div class="topic">{{item.topic}}</div>
              <div class="tm">{{item.beginTime}} - {{item.endTime}}</div>
              <div class="status">
                <em>活動預告中</em>
                <!-- <em>活動準備中</em>
                <em>活動進行中</em> -->
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { actList } from "../apis"
import { getUrlString } from "../utils"

export default {
  data () {
    return {
      image: '',
      "list": [
        {
          "actId": 1,//活动id
          "status": 0,//0预告中，1准备中，2进行中
          "beginTime": "2021-09-29 10:10:00",//开始时间yyyy-MM-dd HH:mm:ss
          "endTime": "2021-09-29 10:10:00",//结束时间yyyy-MM-dd HH:mm:ss
          "bulletin": "公告",
          "topic": "话题",
          "themeType": 1,//主题类型，1为緣分配對、2为團戰PK、3为生日派對、4为浪漫婚禮
          "activeCnt": 0,//活跃用户总数
          "fireworks": 0,//烟火奖励
          "coinsCnt": 0,//金币流水
          "taskCoinLoop": 0,//房间金币每增加X
          "taskCoinLoopLimit": 1000,//房间金币每增加X进度上限
          "taskActive": 0,//房间活跃数
          "taskActiveLimit": 1000,//房间活跃数进度上限
          "taskCoins": 0,//房间金币达到数
          "taskCoinsLimit": 1000,//房间金币达到上限
          "isJoin": true,//是否参与，true表示参与
          "joinUser": 10,//参与人数
          "userList": [//用户列表，最多3个
            {
              "uid": 12334,//用户id
              "avatar": "http://XXX"//用户头像
            }
          ]
        },
        {
          "actId": 1,//活动id
          "status": 0,//0预告中，1准备中，2进行中
          "beginTime": "2021-09-29 10:10:00",//开始时间yyyy-MM-dd HH:mm:ss
          "endTime": "2021-09-29 10:10:00",//结束时间yyyy-MM-dd HH:mm:ss
          "bulletin": "公告",
          "topic": "话题",
          "themeType": 2,//主题类型，1为緣分配對、2为團戰PK、3为生日派對、4为浪漫婚禮
          "activeCnt": 0,//活跃用户总数
          "fireworks": 0,//烟火奖励
          "coinsCnt": 0,//金币流水
          "taskCoinLoop": 0,//房间金币每增加X
          "taskCoinLoopLimit": 1000,//房间金币每增加X进度上限
          "taskActive": 0,//房间活跃数
          "taskActiveLimit": 1000,//房间活跃数进度上限
          "taskCoins": 0,//房间金币达到数
          "taskCoinsLimit": 1000,//房间金币达到上限
          "isJoin": true,//是否参与，true表示参与
          "joinUser": 10,//参与人数
          "userList": [//用户列表，最多3个
            {
              "uid": 12334,//用户id
              "avatar": "http://XXX"//用户头像
            }
          ]
        }
      ]
    }
  },
  created () {
    let rid = getUrlString('rid') || ''
    actList(rid, 1).then(res => {
      const { image, isOwner, list, online } = res.data.response_data
      this.image = image
    })
  }
}
</script>

<style lang="scss">
.pageCon {
  height: 9.18rem;
  background: url(../img/bg.png) no-repeat;
  background-size: 100% auto;
  padding-top: 0.13rem;
  overflow-y: scroll;
  > .title {
    text-align: center;
    height: 0.88rem;
    line-height: 0.88rem;
    color: #2C2B36;
    position: relative;
    strong {
      font-size: 0.32rem;
      font-weight: bold;
    }
    .qurey {
      display: block;
      width: 0.48rem;
      height: 0.48rem;
      background: url(../img/qurey.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.2rem;
      left: 0.3rem;
    }
    .creat {
      display: block;
      width: 1.16rem;
      height: 0.54rem;
      background: linear-gradient(90deg, #7A68F8 0%, #9585FF 100%);
      border-radius: 0.3rem;
      text-align: center;
      line-height: 0.54rem;
      color: #fff;
      position: absolute;
      top: 0.2rem;
      right: 0.3rem;
      font-size: 0.26rem;
    }
  }
  .actList {
    width: 6.9rem;
    margin: 0.23rem auto 0;
    li {
      min-height: 3.38rem;
      padding: 0.29rem 0.32rem 0.35rem;
      border-radius: 0.2rem;
      .actMsg {
        height: 1.4rem;
        display: flex;
        align-items: center;
        > img {
          width: 1.4rem;
          height: 1.4rem;
          background: rgba(0, 0, 0, 0);
          border: 0.04rem solid #FFFFFF;
          border-radius: 0.2rem;
        }
        .actTips {
          margin-left: 0.22rem;
          .topic {
            font-size: 0.32rem;
            font-weight: 600;
          }
          .tm {
            font-size: 0.24rem;
            margin: 0.1rem 0;
          }
          .status {
            width: 1.59rem;
            height: 0.36rem;
            background: linear-gradient(
              92deg,
              rgba(209, 208, 220, 0.2) 0%,
              rgba(255, 255, 255, 0) 100%
            );
            border-radius: 0.2rem 0 0 0.2rem;
            text-align: center;
            line-height: 0.36rem;
            em {
              font-size: 0.2rem;
            }
          }
        }
      }
      &.themeType1 {
        background: linear-gradient(180deg, #FF77BB 0%, #F567AF 100%);
      }
      &.themeType2 {
        background: linear-gradient(180deg, #FB8A9D 0%, #FC5773 100%);
      }
      &.themeType3 {
        background: linear-gradient(180deg, #CC7CF5 0%, #BE58F2 100%);
      }
      &.themeType4 {
        background: linear-gradient(180deg, #B5A2FF 0%, #967BFF 100%);
      }
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>