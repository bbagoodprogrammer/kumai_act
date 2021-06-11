<template>
  <div class="record__container">
    <div class="navigator">
      <img @click="$router.go(-1)" src="../img/arrow.png" />
      {{ lang.treasure_record }}
    </div>
    <InnerScrollLoadList class="record__main" :url="url" :parse="parse" :max="100">
      <template slot-scope="{ list, loading, none }">
        <ul>
          <li v-for="(item, index) in list" :key="index">
            <div class="record_left">
              <div class="time">{{ item.huntTime }}</div>
              <div class="use_map">
                {{ lang.use_map.replace("%s", item.mapNum) }}
              </div>
            </div>
            <div class="record_right">
              <div
                class="box"
                v-for="(prize, imgIndex) in item.prizeList"
                :key="imgIndex"
              >
                <img class="award__img" :src="prize.image" />
                <div class="imgs" v-if="prize.num > 1" v-html="getImgs(prize.num)"></div>
              </div>
            </div>
          </li>
        </ul>
        <div v-show="loading" class="scrollLoading">{{lang.loading}}</div>
        <div v-show="none" class="scrollNone">{{lang.not_record}}</div>
        <div v-if="list.length >= 100" class="record_100">{{ lang.record_100 }}</div>
      </template>
    </InnerScrollLoadList>
  </div>
</template>

<script>
import { urls } from '../config';
import { dateFormat } from "../utils/index";
import InnerScrollLoadList from "../components/common/InnerScrollLoadList";
import { toast } from '../utils'
import calcAwardNumImg from '../utils/calcAwardNumImg.js'

export default {
  name: "Explain",

  components: {
    InnerScrollLoadList,
  },

  data() {
    return {
      url: urls.getMyHuntRecord,
    };
  },

  methods: {
    parse(data) {
      const { response_status, response_data } = data;
      if (response_status && response_status.error === "") {
        return response_data.list;
      } else {
        const { error } = response_status;
        if (error) {
          toast(error);
        }
      }
      return [];
    },

    getImgs (num) {
      return calcAwardNumImg(num, 28)
    },

    handleTime(time) {
      let year = dateFormat("YYYY", new Date(time * 1000));
      let month = dateFormat("mm", new Date(time * 1000));
      let day = dateFormat("dd", new Date(time * 1000));
      let hour = dateFormat("HH", new Date(time * 1000));
      let minute = dateFormat("MM", new Date(time * 1000));
      let second = dateFormat("SS", new Date(time * 1000));
      return this.lang.record_time
        .replace("{0}", year)
        .replace("{1}", month)
        .replace("{2}", day)
        .replace("{3}", hour)
        .replace("{4}", minute)
        .replace("{5}", second);
    },
  },

  computed: {
    lang: () => _lang,
  },
};
</script>

<style lang="scss">
.record__container {
  width: 100%;
  height: 9.3rem;
  background: #7a68f8;
  border-radius: 0.2rem 0.2rem 0rem 0rem;
  box-sizing: border-box;
  padding-top: 0.3rem;
  .navigator {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.36rem;
    font-weight: 400;
    height: 0.5rem;
    color: #ffffff;
    opacity: 1;
    position: relative;
    margin-bottom: 0.3rem;
    img {
      width: 0.42rem;
      height: 0.42rem;
      position: absolute;
      left: 0.2rem;
    }
  }
  .record__main {
    height: 8.2rem;
    overflow: auto;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    padding-top: 0.02rem;
    box-sizing: border-box;
    li:first-child{
      margin-top: 0rem;
    }
    li {
      display: flex;
      margin-top: 0.16rem;
      .record_left {
        flex: 1;
        .time {
          height: 0.33rem;
          font-size: 0.24rem;
          font-weight: 400;
          line-height: 0.33rem;
          color: #ffffff;
          opacity: 0.6;
        }
        .use_map {
          font-size: 0.28rem;
          font-weight: 400;
          line-height: 0.4rem;
          color: #ffffff;
          opacity: 1;
        }
      }
      .record_right {
        width: 4rem;
        flex-shrink: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        .box {
          width: 0.8rem;
          height: 0.8rem;
          margin-left: 0.2rem;
          margin-bottom: 0.26rem;
          position: relative;
          .award__img {
            width: 0.8rem;
            height: 0.8rem;
          }
          .imgs {
            position: absolute;
            // width: 0.5rem;
            height: 0.28rem;
            right: 0;
            top: 0;
            img:not(:first-child) {
              margin-left: -0.04rem;
            }
          }
        }
      }
    }
    .record_100, .scrollLoading, .scrollNone {
      height: 0.37rem;
      font-size: 0.26rem;
      font-weight: 400;
      color: #ffffff;
      opacity: 0.3;
      text-align: center;
      margin-bottom: 0.3rem;
      margin-top: 0.3rem;
    }
  }
}
</style>