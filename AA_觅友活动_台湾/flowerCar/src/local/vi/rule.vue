<template>
  <div class="ruleTips">
    <div class="tabs">
      <a class="tab1" @click.prevent="mainTab=0" :class="{current:mainTab==0}" href="">Quy tắc</a>
      <a class="tab2" @click.prevent="mainTab=1" :class="{current:mainTab==1}" href="">Thưởng</a>
    </div>
    <div class="ruleItem" v-if="mainTab == 0">
      <p>1.Thời gian: 20/6 19：00-26/6 23:59:59</p>
      <p>2.Xe Hoa Du Hành: mỗi ngày Top 1 BXH Hoa Thần và Hot được ngồi xe hoa du hành, đồng thời cộng 5% điểm Hoa Thần/Hot, điểm cộng thêm chỉ tính vào BXH tổng, không cộng vào BXH hôm sau </p>
      <p>3.BXH Hoa Thần<br />Không cần báo danh, idol nhận quà chỉ định nhận điểm Hoa Thần và được xếp hạng, quà chỉ định 1 Xu=1 điểm hoa thần；Xếp hạng theo điểm từ cao đến thấy, chỉ hiện thị
        top 50, điểm bằng nhau người đạt trước sẽ ưu tiên xếp cao hơn. </p>
      <div class="giftList giftList1">
        <div class="giftItem" v-for="(item,index) in giftList1" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong v-html="item.name"></strong>
        </div>
      </div>
      4.B1:B19i nhận quà chỉ định nhận điểm Hot và được xếp hạng；Xếp hạng theo điểm từ cao đến thấp, chỉ hiện thị top 50, điểm bằng nhau người đạt trước sẽ ưu tiên xếp cao hơn. </p>
      <p>5.Nhiệm vụ BXH Hot<br />Số người vào phòng: Tại phòng của idol, mỗi khi có người khác vào phòng, Hot+1 (cùng 1 idol vào phòng nhiều lần điểm Hot chỉ +1), mỗi ngày giới hạn
        100<br /> Số fan tăng: mỗi khi idol tăng 1 fan (chưa từng theo dõi), điểm hot+2, mỗi ngày giới hạn 200 <br />Số người tặng quà: idol ở phòng bất kỳ được tặng quà, điểm hot+2, không
        giới hạn (gồm quà đậu, quà xu, quà mị lực)<br />*Nhiệm vụ reset vào 0 giờ mỗi ngày</p>
      <p>
        6.Lưu ý:<br />
        *Trong sự kiện, khi phát hiện idol gian lận, chúng tôi sẽ hủy bỏ tư cách tham gia của idol mà không cần thông báo, bao gồm nhưng không giới hạn:<br />
        a）Gian lận để nhận được phần thưởng, hack xu<br />
        b）Trong quá trình sự kiện nếu có hành động công kích xúc phạm người khác<br />
        *Quà chỉ có hiệu lực 7 ngày *Sự kiện không liên quan đến công ty Apple.
      </p>
    </div>
    <div class="giftTips" v-else>
      <div class="giftList gift2">
        <div class="giftItem" v-for="(item,index) in giftList2" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div>
      </div>
      <p>
        1.Quà BXH Hoa Thần<br />
        Hạng 1: Hoa Thần tháng 6-Chứng nhận (15 ngày)+Thuyền Ánh Sao-Xe (15 ngày)+Hoa Hạ Lấp Lánh-Quà túi*1<br />
        Hạng 2: Kẹo Cute-Xe (10 ngày)+Hoa Hạ Lấp Lánh-Quà túi*1<br />
        Hạng 3: Pháo Hoa Pha Lê-Xe (7 ngày)+Hoa Hạ Lấp Lánh-Quà túi*1
      </p>
      <div class="giftList gift2">
        <div class="giftItem" v-for="(item,index) in giftList3" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div>
      </div>
      <p>
        2.Quà BXH Hot<br />
        Hạng 1: Hoa Thần Tiềm Lực-Chứng nhận (15 ngày)+Tường Vi Nở Rộ-Khung ảnh (15 ngày)+Hoa Hạ Lấp Lánh-Quà túi*1<br />
        Hạng 2: Bướm Hoa-Khung ảnh (10 ngày)+Hoa Hạ Lấp Lánh-Quà túi*1<br />
        Hạng 3: Hoa rơi-Khung ảnh (7 ngày)
      </p>
      <p>
        3.Quà Fan<br />
        Fan Top 1 của người Top 1 Hoa Thần:<br />
        Fan Top Đầu-Khung ảnh (15 ngày)+Fan Top Đầu-Chứng nhận (15 ngày)+Hoa Hạ Lấp Lánh-Quà túi*1<br />
        Fan Top 1 của người Top 2 Hoa Thần:<br />
        Fan Top Đầu-Khung ảnh (10 ngày)+Fan Top Đầu-Chứng nhận (15 ngày)+Hoa Hạ Lấp Lánh-Quà túi*1<br />
        Fan Top 1 của người Top 3 Hoa Thần:<br />
        Fan Top Đầu-Khung ảnh (5 ngày)+Fan Top Đầu-Chứng nhận (5 ngày)
      </p>
      <p>
        4.Lưu ý<br />
        *Trong sự kiện, khi phát hiện idol gian lận, chúng tôi sẽ hủy bỏ tư cách tham gia của idol mà không cần thông báo, bao gồm nhưng không giới hạn:<br />
        a）Gian lận để nhận được phần thưởng, hack xu<br />
        b）Trong quá trình sự kiện nếu có hành động công kích xúc phạm người khác<br />
        *Quà chỉ có hiệu lực 7 ngày
        *Sự kiện không liên quan đến công ty Apple.
      </p>
    </div>
    <div class="blue">*Quyền quyết định cuối cùng thuộc về ban tổ chức</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mainTab: 0,
      giftList1: [
        {
          img: require('../../img/rule_gift/gift_1.png'),
          name: 'Mây Rực Rỡ<br/>+200 Điểm hoa thần'
        },
        {
          img: require('../../img/rule_gift/gift_2.png'),
          name: 'Hoa đá<br/>+1290 Điểm hoa thần'
        },
        {
          img: require('../../img/rule_gift/gift_3.png'),
          name: 'Tiếng Hot Hương Hoa<br/>+10000 Điểm hoa thần'
        }
      ],
      giftList2: [
        {
          img: require('../../img/rule_gift/gift_4.png'),
          name: 'Hoa Thần tháng 6'
        },
        {
          img: require('../../img/rule_gift/gift_5.png'),
          name: 'Hoa Hạ Lấp Lánh-Quà túi'
        },
        {
          img: require('../../img/rule_gift/gift_6.png'),
          name: 'Thuyền Ánh Sao-Xe'
        },
        {
          img: require('../../img/rule_gift/gift_7.png'),
          name: 'Kẹo Cute-Xe '
        },
        {
          img: require('../../img/rule_gift/gift_8.png'),
          name: 'Pháo Hoa Pha Lê-Xe'
        }
      ],
      giftList3: [
        {
          img: require('../../img/rule_gift/gift_13.png'),
          name: 'Hoa Thần Tiềm Lực-Chứng nhận'
        },
        {
          img: require('../../img/rule_gift/gift_9.png'),
          name: 'Hoa Hạ Lấp Lánh-Quà túi'
        },
        {
          img: require('../../img/rule_gift/gift_10.png'),
          name: 'Tường Vi Nở Rộ-Khung ảnh'
        },
        {
          img: require('../../img/rule_gift/gift_11.png'),
          name: 'Bướm Hoa-Khung ảnh'
        },
        {
          img: require('../../img/rule_gift/gift_12.png'),
          name: 'Hoa rơi-Khung ảnh'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.blue {
  margin: 0;
  text-align: center;
  font-size: 0.28rem;
}
.ruleTips {
  background: rgba(156, 85, 244, 1);
  padding: 0.4rem 0.29rem 0.25rem;
  .tabs {
    padding: 0 0.7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > a {
      display: block;
      width: 2.58rem;
      height: 0.97rem;
      text-align: center;
      line-height: 0.97rem;
      font-weight: 500;
      position: relative;
      font-size: 0.4rem;
      background: url(../../img/dayTab.png);
      background-size: 100% 100%;
      &.current {
        background: url(../../img/dayTab_act.png);
        background-size: 100% 100%;
      }
    }
  }
  p {
    color: rgba(232, 222, 255, 1);
    font-size: 0.28rem;
    margin: 0.32rem auto;
  }
  .giftList {
    padding: 0 0.38rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &.giftList1 {
      strong {
        height: 0.95rem;
      }
    }
    .giftItem {
      width: 1.91rem;
      margin-bottom: 0.25rem;
    }
    .imgBox {
      width: 1.91rem;
      height: 1.91rem;
      background: #661FAD;
      border-radius: 0.1rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    strong {
      width: 100%;
      height: 0.6rem;
      display: block;
      text-align: center;
      font-size: 0.26rem;
      color: rgba(232, 222, 255, 1);
      margin-top: 0.1rem;
    }
    &.gift2 {
      margin-top: 0.3rem;
      flex-wrap: wrap;
      .giftItem:nth-child(1) {
        margin-left: 1rem;
      }
      .giftItem:nth-child(2) {
        margin-right: 1rem;
      }
    }
  }
}
</style>