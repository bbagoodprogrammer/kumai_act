<template>
  <div class="page pageHistory">
    <div class="title"><i class="back" @click="$router.go(-1)"></i> Lịch sử </div>
    <InnerScrollLoadList class="scrollable" :url="url" :parse="parse">
      <template slot-scope="{list, loading, none}">
        <ul>
          <li v-for="(item,index) in list" :key="index" @click="goDetail(item)">
            <!--  <strong>{{item.prise_str}}</strong> -->
            <div class="name">
              <strong class="nick">{{item.creator_nick}}</strong> mở, phần thưởng: <strong class="mg">{{item.prise_name}}</strong>
            </div>
            <div class="time">{{item.end_date}} mở thưởng, nhấn để xem chi tiết.</div>
            <i class="arr"></i>
          </li>
        </ul>
        <p class="lastTips">Chỉ hiện lịch sử 3 ngày gần đây</p>
        <div v-show="loading" class="scrollLoading">{{lang.list_loading}}</div>
        <div v-show="none" class="scrollNone">{{lang.list_empty}}</div>
      </template>
    </InnerScrollLoadList>
  </div>
</template>

<script>
import { lang, urls } from './config';
import { toast } from './utils';
import InnerScrollLoadList from './components/common/InnerScrollLoadList';

export default {
  computed: {
    lang: () => lang,
    url: () => urls.getHistory,
  },
  methods: {
    parse(data) {
      const { response_status, response_data } = data;
      if (response_status && response_status.error === '') {
        //   response_data
        return response_data
        // [
        //   {
        //     "id": "2",
        //     "rid": "15",
        //     "creator_id": "6200105",
        //     "creator_nick": "点",
        //     "creator_avatar": "http://img.17sing.tw/uc/img/head_2233806_1515642255.png",
        //     "prise_str": "放心情 x1",
        //     "prise_name": "放心情",
        //     "prise_days": "3",
        //     "prise_pic": "http://img.17sing.tw/uc/gift/image_1523434682.png",
        //     "ticket_gid": "3",
        //     "ticket_gname": "放飛",
        //     "ticket_gpic": "http://img.17sing.tw/uc/gift/image_1523434682.png",
        //     "winner_id": "0",
        //     "winner_nick": "",
        //     "winner_avatar": "",
        //     "end_date": "2020-08-12 10:14"
        //   },
        //   {
        //     "id": "1",
        //     "rid": "15",
        //     "creator_id": "6200105",
        //     "creator_nick": "点",
        //     "creator_avatar": "http://img.17sing.tw/uc/img/head_2233806_1515642255.png",
        //     "prise_str": "VIP30天",
        //     "prise_name": "VIP30天",
        //     "prise_days": "30",
        //     "prise_pic": "http://img.17sing.tw/uc/activity/0b1bacd77f221d77636cab8113f9103f_1591005781.png",
        //     "ticket_gid": "2",
        //     "ticket_gname": "放心情",
        //     "ticket_gpic": "http://img.17sing.tw/uc/gift/image_1523434682.png",
        //     "winner_id": "0",
        //     "winner_nick": "",
        //     "winner_avatar": "",
        //     "end_date": "2020-08-12 10:14"
        //   }
        // ]
      } else {
        const { code, error } = response_status;
        if (error) {
          toast(error);
        }
      }
      return [];
    },
    goDetail(item) {
      this.$router.push({ name: 'historyDetail', params: { item } })
    }
  },
  components: {
    InnerScrollLoadList,
  },
};
</script>

<style lang="scss">
.pageHistory {
  width: 7.5rem;
  height: 9.88rem;
  background: linear-gradient(
    0deg,
    rgba(84, 173, 255, 1) 0%,
    rgba(122, 75, 255, 1) 100%
  );
  border-radius: 0.32rem 0.32rem 0 0;
  display: flex;
  flex-direction: column;
  .title {
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    font-size: 0.42rem;
    font-weight: 600;
    position: relative;
    border-bottom: 1px solid RGBA(133, 149, 255, 1);
    .back {
      display: block;
      width: 0.17rem;
      height: 0.29rem;
      background: url(./img/back2.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.36rem;
      left: 0.3rem;
    }
  }
  .scrollable {
    margin-top: 0.04rem;
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    ul {
      padding: 0 0.3rem;
      li {
        height: 1.28rem;
        border-bottom: 1px solid RGBA(133, 149, 255, 1);
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        .name {
          display: flex;
          align-items: center;
          .nick {
            max-width: 3rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-right: 0.1rem;
            color: #ffff00;
            font-weight: 600;
          }
          strong {
            color: #fff;
            &.mg {
              margin-left: 0.1rem;
              color: #ffff00;
              font-weight: 600;
            }
          }
        }
        .time {
          font-size: 0.26rem;
          margin-top: 0.1rem;
        }
        .arr {
          display: block;
          width: 0.12rem;
          height: 0.2rem;
          background: url(./img/arr3.png);
          background-size: 100% 100%;
          position: absolute;
          top: 0.54rem;
          right: 0.29rem;
        }
      }
    }
  }
  .scrollLoading,
  .scrollNone {
    text-align: center;
    margin-top: 1rem;
  }
  .lastTips {
    text-align: center;
    font-size: 0.24rem;
    margin: 0.23rem 0 0.3rem;
  }
}
</style>