<template>
  <div class="gradeGift">
    <div class="title">{{lang.GradeGift}}</div>
    <!-- <div class="socre">
      <span>
        <strong>我的等級</strong>
        <em>{{gradeObj.grade}}</em>
      </span>
      <span>
        <strong>我的分數</strong>
        <em>{{score}}</em>
      </span>
      <span>
        <strong>解鎖下一等級還差{{gradeObj.dcukScore}}</strong>
      </span>
    </div> -->
    <div class="wardImg"></div>
    <div class="listTitle">
      <span class="grade">{{lang.Lv}}</span>
      <span class="score">{{lang.TargetScore}}</span>
      <span class="ward">{{lang.giftItem}}</span>
      <span class="state">{{lang.ReceivingSituation}}</span>
    </div>
    <ul>
      <li v-for="(item,index) in newLv" :key="index">
        <span class="grade">{{lang.Lv}}{{item.lv}}</span>
        <span class="score">{{item.score}}</span>
        <span class="ward">
          <span v-for="(item2,index2) in item.gift" :key="index2">
            <em><img :src="getImg(item2.type)">X{{item2.num}}</em>
          </span>
        </span>
        <span class="state">
          <span v-if="item.is_get==1" class="noSuc">{{lang.Received}}</span>
          <span v-else-if="gradeObj.grade<item.lv" class="suo"></span>
          <span v-else-if="item.is_get == 0" class="suc" :class="{black:item.lv > gradeObj.grade}" @click="getGift(item,index)">{{lang.Receive}}</span>
        </span>
      </li>
    </ul>
    <Loading></Loading>
  </div>
</template>
<script>
import { findValueUseTwoSplit, newObj } from "../../utils/getGrade"
import api from "../../api/apiConfig"
import Loading from "../../components/Loading"
import { gradeGidt } from "../../config/ward.js"
import lang from "../../config/lang"
export default {
  components: {
    Loading
  },
  data() {
    return {
      lv_list: [],
      score: 0,
      lang: lang
    }
  },
  computed: {
    gradeObj() {
      return findValueUseTwoSplit(this.score)
    },
    newLv() {
      let newLv = this.lv_list.map((item, index) => {
        return { ...item, ...newObj[index] };
      });
      return newLv
    }
  },
  created() {
    api.giftState().then(res => {
      const data = res.data.response_data
      this.lv_list = data.lv_list
      this.score = data.score
    })
    sessionStorage.setItem("need-refresh", true);
  },
  methods: {
    getGift(item, index) {
      if (this.gradeObj.grade >= item.lv) {
        api.getGift(item.lv).then(res => {
          if (res.data.response_status.code == 0) {
            let objItem = JSON.parse(JSON.stringify(this.lv_list[index]))   //修改数组出发计算属性获取新数组
            objItem.is_get = 1
            this.lv_list.splice(index, 1, objItem)
          }
        })
      }
    },
    getImg(type) {
      return gradeGidt[type]
    }
  }
}
</script>
<style lang="scss">
body {
  background: #d94343;
}
.gradeGift {
  padding: 0.47rem 0.25rem 0.35rem;
  .title {
    font-size: 120%;
    text-align: center;
    color: #fce302;
  }
  .wardImg {
    width: 5.8rem;
    height: 4.49rem;
    background: url(../../assets/img/wardImg.png);
    background-size: 100% 100%;
    margin: 0.23rem auto 0.68rem;
  }
  .socre {
    display: flex;
    height: 1.2rem;
    span {
      display: block;
      em {
        display: block;
      }
    }
  }
  .listTitle {
    display: flex;
    color: #ffa365;
    font-size: 80%;
    text-align: center;
    .grade {
      width: 0.8rem;
      padding-left: 0.1rem;
    }
    .score {
      width: 1.05rem;
    }
    .ward {
      flex: 1;
      padding-left: 0.12rem;
      text-align: left;
    }
    .state {
      width: 1.3rem;
    }
  }
  ul {
    li {
      width: 7rem;
      height: 0.83rem;
      background: url(../../assets/img/giftBg.png);
      background-size: 100% 100%;
      margin-top: 0.04rem;
      display: flex;
      align-items: center;
      span {
        display: block;
        text-align: center;
        font-size: 80%;
      }
      .grade {
        width: 0.8rem;
        color: #abffe2;
        padding-left: 0.1rem;
      }
      .score {
        width: 1.05rem;
      }
      .ward {
        flex: 1;
        padding-left: 0.12rem;
        display: flex;
        align-items: center;
        color: #ffe690;
        text-align: left;
        span {
          margin-right: 0.11rem;
          em {
            display: flex;
            align-items: center;
            font-size: 0.24rem;
          }
          img {
            display: inline-block;
            width: 0.39rem;
            height: 0.39rem;
            margin-right: 0.05rem;
          }
        }
      }
      .state {
        width: 1.15rem;
        color: #c23e47;
        .suo {
          display: block;
          width: 0.38rem;
          height: 0.4rem;
          background: url(../../assets/img/suo.png);
          background-size: 100% 100%;
          margin: 0 auto;
        }
        .suc {
          display: block;
          width: 1.11rem;
          height: 0.57rem;
          background: url(../../assets/img/exchange2.png);
          background-size: 100% 100%;
          text-align: center;
          line-height: 0.57rem;
          color: #b98300;
          font-size: 86%;
        }
        .noSuc {
          color: #c23e47;
          font-size: 100%;
        }
      }
    }
  }
}

@import "../../assets/scss/common.scss";
</style>
